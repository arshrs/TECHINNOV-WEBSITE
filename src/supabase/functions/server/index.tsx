import { Hono } from 'npm:hono'
import { cors } from 'npm:hono/cors'
import { logger } from 'npm:hono/logger'
import { createClient } from 'npm:@supabase/supabase-js@2'
import * as kv from './kv_store.tsx'

const app = new Hono()

app.use('*', cors())
app.use('*', logger(console.log))

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
)

// Helper function to generate unique IDs
function generateId() {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

// Create admin user route
app.post('/make-server-3fe7e8be/signup', async (c) => {
  try {
    const { email, password, name } = await c.req.json()
    
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    })

    if (error) {
      console.log(`Error creating user during signup: ${error.message}`)
      return c.json({ error: error.message }, 400)
    }

    console.log(`Successfully created user: ${email}`)
    return c.json({ success: true, user: data.user })
  } catch (error) {
    console.log(`Server error during signup: ${error}`)
    return c.json({ error: 'Internal server error during signup' }, 500)
  }
})

// Submit project request route
app.post('/make-server-3fe7e8be/submit-project', async (c) => {
  try {
    const formData = await c.req.json()
    
    // Generate unique ID for this submission
    const submissionId = generateId()
    
    // Store submission in KV store
    const submissionKey = `submission:${submissionId}`
    await kv.set(submissionKey, {
      ...formData,
      id: submissionId,
      submittedAt: new Date().toISOString()
    })
    
    // Also store in an index for easy retrieval
    const allSubmissions = await kv.get('submissions:index') || []
    allSubmissions.push(submissionId)
    await kv.set('submissions:index', allSubmissions)
    
    console.log(`Project submission stored with ID: ${submissionId}`)
    
    // Note: Email sending would require additional setup with a service like Resend or SendGrid
    // For now, we're just logging that an email would be sent
    console.log(`Email notification would be sent to harshdawne@gmail.com and arsh.rs@somaiya.edu`)
    console.log(`Submission details:`, formData)
    
    return c.json({ 
      success: true, 
      message: 'Project request submitted successfully!',
      submissionId 
    })
  } catch (error) {
    console.log(`Error submitting project request: ${error}`)
    return c.json({ error: 'Failed to submit project request' }, 500)
  }
})

// Get all submissions (requires auth)
app.get('/make-server-3fe7e8be/submissions', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1]
    const { data: { user }, error } = await supabase.auth.getUser(accessToken)
    
    if (!user?.id || error) {
      console.log(`Unauthorized attempt to access submissions`)
      return c.json({ error: 'Unauthorized' }, 401)
    }
    
    // Get all submission IDs
    const submissionIds = await kv.get('submissions:index') || []
    
    // Fetch all submissions
    const submissions = []
    for (const id of submissionIds) {
      const submission = await kv.get(`submission:${id}`)
      if (submission) {
        submissions.push(submission)
      }
    }
    
    // Sort by date (newest first)
    submissions.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
    
    console.log(`Admin ${user.email} retrieved ${submissions.length} submissions`)
    return c.json({ submissions })
  } catch (error) {
    console.log(`Error retrieving submissions: ${error}`)
    return c.json({ error: 'Failed to retrieve submissions' }, 500)
  }
})

// Health check
app.get('/make-server-3fe7e8be/health', (c) => {
  return c.json({ status: 'ok', message: 'Techinnov server is running' })
})

Deno.serve(app.fetch)
