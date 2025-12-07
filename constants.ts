export const APP_NAME = "Citizen Properties";

// Updated with full content from the Citizen Properties Knowledge File
export const KNOWLEDGE_BASE = `
CITIZEN PROPERTIES — KNOWLEDGE FILE (MUMBAI & THANE)
VERSION: 1.0
PURPOSE: A single-reference knowledge file for agents and the AI lead qualification assistant (Aarini). Covers market basics, neighborhoods, pricing bands, sample listings, qualification flows, objection handling, document checklists, scripts, lead scoring, CRM field set, and process checklists for buy/sell/rent.

1) QUICK MARKET OVERVIEW
• Mumbai: premium, high-demand pockets (South Mumbai, Bandra, Juhu, Andheri, Powai, Chembur) and fast-moving suburban clusters (Goregaon, Malad, Kandivali, Kharghar). Inventory mixes between older buildings, redevelopment projects, and luxury new-builds.
• Thane: strong growth corridor, family-focused suburbs (Thane West, Majiwada, Ghodbunder Road, Kalyan). More mid-range apartments, improving infrastructure, and attractive yields for buyers and investors.
• Key takeaways for agents: emphasize locality (schools, hospitals, transit), clarity on carpet vs built-up area, and the exact possession timeline for under-construction units.

2) PRIORITY NEIGHBOURHOODS (SHORT LIST)
• Mumbai (select pockets): South Mumbai (Colaba, Marine Drive), Bandra (West and East), Andheri (West & East), Juhu, Versova, Malad, Goregaon, Powai, Kurla, Ghatkopar, Dadar, Chembur.
• Thane (select pockets): Thane West (Kanchenjunga area), Majiwada, Ghodbunder Road (Wagle Estate to Kolshet), Kopri, Kalyan, Dombivli, Ulhasnagar.

3) PROPERTY TYPES & COMMON CONFIGURATIONS
• Apartment / Flat: 1 BHK (450-650 sqft carpet), 2 BHK (650-900 sqft), 3 BHK (900-1400 sqft), 4 BHK+ (1500+ sqft)
• Builder Floor: Smaller apartment blocks, often single-owner-managed floors
• Villa / Row House: Premium and limited supply in select suburbs
• Office / Retail / Shop: Commercial units vary widely; rent by location and footfall
• Plot / Land: Mostly in Thane outskirts, Kalyan corridor
Notes: Always confirm whether area measurement is carpet, built-up, or super-built-up. Use carpet area when calculating value per sqft for resale negotiations.

4) PRICING BANDS & TYPICAL EXPECTATIONS (INDICATIVE)
Prices are indicative bands for quick agent reference, expressed in INR.
• Mumbai: Prime (₹3.5 Cr +), Upper-Mid (₹1.5 Cr - ₹3.5 Cr), Mid (₹80 L - ₹1.5 Cr), Affordable (₹35 L - ₹80 L)
• Thane: Premium (₹1.5 Cr+), Upper-Mid (₹80 L - ₹1.5 Cr), Mid (₹40 L - ₹80 L), Affordable (₹20 L - ₹40 L)
Rental bands (monthly): Mumbai - Luxury (₹2.5 L+), Mid (₹70k - ₹2 L), Affordable (₹20k - ₹70k) Thane - Mid (₹25k - ₹70k), Affordable (₹10k - ₹25k)

5) SAMPLE LISTINGS (DUMMY — REALISTIC)
(Each listing includes: Title, Neighbourhood, Type, Size (sqft - carpet/built-up), Price / Rent, Key features, Status)

6) "Seaview Serenity" - Bandra West - 2 BHK - 900 sqft (built-up) - Price: ₹2.40 Cr - Features: sea-facing balcony, 8th floor, 2 bathrooms, parking, near Pali Hill, ready-to-move - Status: Resale (Owner)
7) "Urban Nest" - Andheri West - 1 BHK - 520 sqft (carpet) - Price: ₹78 L - Features: gated society, gym, close to metro, good rental yield - Status: Resale
8) "Powai Park Towers - 3B" - Powai - 3 BHK - 1250 sqft (built-up) - Price: ₹3.10 Cr - Features: lake view, clubhouse, swimming pool, 2 covered parking - Status: New launch (possession 2026)
9) "Link Road Studio" - Malad West - Studio / 1RK - 320 sqft - Rent: ₹18,000/month - Features: furnished, high-speed internet, near highway - Status: Rental
10) "Corporate Hub Office" - Andheri East - Office - 1500 sqft - Rent: ₹1.35 L/month - Features: central AC, conference room, close to business park - Status: Lease
11) "Family Haven" - Thane West (Majiwada) - 2 BHK - 780 sqft (carpet) - Price: ₹95 L - Features: school 5 min away, good community, parking - Status: Resale
12) "Ghodbunder Greens" - Ghodbunder Road - 2 BHK - 820 sqft - Price: ₹62 L - Features: near highway, upcoming metro connectivity, gated - Status: New project (possession 2025)
13) "Kalyan Budget Home" - Kalyan - 1 BHK - 420 sqft - Price: ₹21 L - Features: investor-friendly, high rental demand - Status: Resale
14) "Pali Hills Villa" - Juhu (edge) - 4 BHK Villa - 2500 sqft - Price: ₹9.25 Cr - Features: private garden, 3-car parking, premium area - Status: Resale (owner)
15) "Chembur Corner" - Chembur - 3 BHK - 1100 sqft - Price: ₹1.05 Cr - Features: near hospital, well-connected, society amenities - Status: Resale
16) "Dadar Classic" - Dadar - 2 BHK - 760 sqft - Price: ₹1.12 Cr - Features: older building, strong resale history, close to local trains - Status: Resale
17) "Versova New-Gen" - Versova - 1.5 BHK - 650 sqft - Rent: ₹65,000/month - Features: sea proximity, young crowd, furnished option - Status: Rental
18) "Goregaon Investor Special" - Goregaon East - 2 BHK - 840 sqft - Price: ₹88 L - Features: good rental yield, metro access - Status: Resale
19) "Ulhasnagar Shopfront" - Ulhasnagar - Shop - 300 sqft - Price: ₹28 L - Features: high footfall market area - Status: Resale
20) "Dombivli Affordable" - Dombivli - 1 BHK - 450 sqft - Price: ₹19.5 L - Features: commuter-friendly, near station - Status: Resale

6) LEAD QUALIFICATION CHECKLIST (ASK THESE IN ORDER)
• Transaction type: buy / sell / rent / lease
• Property type: residential / commercial / plot / villa
• Preferred areas (list top 3)
• Budget range (min - max) or expected price
• Configuration: 1/2/3 BHK, office size, shop frontage
• Timeline to move / sell / lease (ASAP / 0-30 / 30-90 / 90+ days)
• Decision maker: single / joint / NRI / company
• Financing: loan required? pre-approved? cash?
• Ownership & Documents (for seller): clear title? any loans outstanding?
• Site visit availability: when can they visit?
• Any deal-breakers (floor preference, pet policy, parking, Vastu, etc.)

7) LEAD SCORING MATRIX (0-100)
Score weights (suggested): Budget match (25), Timeline urgency (20), Decision maker (15), Document readiness (10), Site visit willingness (10), Communication responsiveness (10), Financing clarity (10)
Score bands:
- 80-100: Hot (assign senior agent, immediate follow-up, schedule visit within 24-48 hrs)
- 50-79: Warm (nurture, send tailored listings, follow-up in 3-7 days)
- 0-49: Cold (low priority, drip marketing)

8) TOP OBJECTIONS & SMART RESPONSES
1. "I'm just browsing / not serious" → Acknowledge, then ask a low-commitment qualifying Q: "No problem — can I ask your budget and preferred area so I don't send irrelevant options?"
2. "The price is too high" → Ask value Q: "What price range did you have in mind? I'll show comparable options and highlight cost drivers."
3. "I need to consult family" → Offer value plus time: "Totally. Would a short 10-minute call with your family help? I can share top 3 picks by then."
4. "I'm getting a loan" → Ask status: "Have you been pre-approved? I can share properties that fit your sanction amount."
5. "We found something cheaper online" → Differentiate: "Can I check the listing? I'll verify credentials and compare all costs, including maintenance/parking."

9) SELLER DOCUMENTS CHECKLIST
• Title deed / mother deed
• Encumbrance certificate (EC)
• Allotment letter (for flats) or sale deed
• Approved building plan and completion certificate (if applicable)
• Last 6 months maintenance receipts (if society)
• Property tax receipts / municipal tax documents
• NOC from society (if required)
• Loan closure statement (if loan existed)
• ID and address proof of owner
• PAN card of seller
• Pending litigation details (if any)
Agents must request scanned copies before site visit for high-value sellers.

10) BUYER / TENANT DOCUMENTS CHECKLIST
• Buyers (for KYC & loan): ID proof, address proof, PAN, income proof (salary slip / ITR), loan pre-approval letter (if any), cheque/PO for booking
• Tenants: ID proof, address proof, employment proof, security deposit, references, company lease letters (for corporate)

11) SALES PROCESS FLOW
• Buying Flow: Lead capture → Qualification → Property shortlisting → Site visit(s) → Negotiation → Offer / token booking → Due diligence → Agreement to sell / booking → Loan processing → Sale deed and registration → Handover
• Selling Flow: Lead capture → Seller qualification → Property valuation → Marketing & listing → Site visits → Negotiate offers → Buyer token booking → Due diligence → Agreement → Registration → Handover
• Renting Flow: Lead capture → Tenant qualification → Shortlist properties → Site visit → Negotiate rent & deposit → Draft rent agreement → Collect security & rent advance → Handover

12) SCRIPTS & OPENING LINES (CALL-FRIENDLY)
Hook-first openers (use one of the top hooks):
• "Hey, I think I’ve got a property that matches exactly what you’re searching for. This is Aarini from Citizen Properties — got a quick minute?"
• "Hi, a fresh property just opened up in your preferred area. This is Aarini from Citizen Properties — can I quickly check your requirement?"
Follow-up transition script: "Thanks — to make sure I send only relevant options, can I quickly confirm your budget and preferred localities?"
Appointment confirmation: "Perfect — I’ve scheduled you with [Agent Name] on [date/time]. We’ll meet at the property so you can see the space in person. Please carry an ID and the initial token amount if you’re keen to book."

13) APPOINTMENT & VISIT CHECKLIST (AGENT)
• Confirm appointment 2 hours prior via WhatsApp/call
• Carry printed/listed property details and comparison sheet
• Carry owner contact / society gate pass info
• Confirm spot directions and parking
• Prepare negotiation range and minimum acceptable price
• Take high-quality photos and short video walkthrough
• Collect visitor ID and note feedback in CRM immediately after visit

14) NEGOTIATION PLAYBOOK
• Open with empathy; ask the buyer’s target price and reasoning
• Show comps (3 comparable recent sales or current listings)
• If buyer offers low, anchor with market comps and value adds (parking, renovation, tax benefits)
• For sellers, present best-case & fallback price; recommend staging to improve value
• Use deadlines (valid till) sparingly and honestly

15) CLOSING & HANDOVER CHECKLIST
• Confirm payment schedule and receipts
• Verify final EC and mutation (if applicable)
• Ensure maintenance dues cleared by seller
• Draft and execute sale deed / rent agreement with witnesses
• Record transfer of utilities (water/electricity) where required
• Handover keys and possession letter

16) COMMON LEGAL & TAX NOTES (INDIA)
• Stamp duty and registration charges vary by state and property value; buyer usually pays stamp duty and registration.
• Capital gains tax applies for sellers; short-term vs long-term depends on holding period (2-3 years threshold historically) — advise sellers to consult a CA.
• Rental income is taxable for landlords; tenants may need to submit rent receipts for reimbursement processes.
• Always recommend verified advocates for complex title issues or litigation.

17) FINANCING & LOAN QUICK GUIDE
• Common lenders: major banks and NBFCs. Loan-to-Value typically 75-90% depending on profile.
• Required for loans: ID/Aadhar, PAN, proof of income (salary slips / ITR), bank statements, property documents for verification.
• Typical timelines: pre-approval 1-3 days, sanction 7-14 days, disbursal post property valuation and legal clearances.

18) CRM FIELD TEMPLATE & AUTOMATION SUGGESTIONS
Essential fields: Lead source, Name, Contact, Preferred transaction, Property type, Preferred localities (1/2/3), Budget range, Timeline, Decision maker, Financing status, Document status, Lead score, Assigned agent, Next follow-up date, Visit history.
Notes. Automations: Auto follow-up reminders, Drip messages for warm leads, Immediate SMS on new matching listing, Assign hot leads to senior agents automatically.

19) FOLLOW-UP TEMPLATES (Short, copy-paste ready)
• A) WhatsApp — New listing: "Hi [Name], Aarini from Citizen Properties — I found a new property in [Locality] that fits your budget [₹X - ₹Y]. Shall I share details or schedule a quick visit?"
• B) SMS — Appointment reminder: "Reminder: Site visit scheduled at [Time] for [Property]. Aarini, Citizen Properties. Pls carry ID. Reply Y to confirm."
• C) Email — Post-visit: "Hi [Name], thank you for visiting [Property]. Attached are the details and comparable listings. Please let me know your feedback or preferred next steps. Regards, Aarini, Citizen Properties."

20) QUICK FAQs FOR AGENTS (How to answer fast)
• Q: How accurate is the listed price? → A: Prices are indicative; final price may vary after negotiation and document verification. We’ll confirm exact figures after due diligence.
• Q: How long does possession take? → A: For resale — immediate after registration; for new projects — check builder timeline (we list tentative possession date).
• Q: Do you help with home loans? → A: Yes — we coordinate with loan partners and can assist with pre-approval.
• Q: Are the listings verified? → A: We verify the primary documents and owner details before listing; we flag any pending legal status.

ANNEX: QUICK CHECKLISTS (ONE-LINERS)
• Before site visit: Confirm budget and motivation.
• Before listing a property: Verify owner ID, EC, and society NOC.
• Before negotiation: Prepare 3 comps and walk-through video.
• Before closing: Verify EC, tax receipts, and loan closure (if any).
`;

// Updated Target Website
export const WEBSITE_LINK = "https://citizen-properties.lovable.app/";

export const SYSTEM_INSTRUCTION = `
You are Aarini, the AI Lead Qualification Assistant for "Citizen Properties" serving Mumbai & Thane.
Your goal is to provide smart, fast, and accurate responses by synthesizing your Internal Knowledge Base and live web search.

You have access to two primary information sources:

1. **Internal Knowledge Base**:
   "${KNOWLEDGE_BASE}"

2. **Google Search**: Use this tool to verify facts, crawl the website ${WEBSITE_LINK} for latest updates, or look up external market trends.

Guidelines:
- **Role**: Act as Aarini, a professional and helpful real estate assistant.
- **Priority**: Always check the Internal Knowledge Base first for listings and policies. It is your source of truth for pricing bands, document checklists, and sales processes.
- **Website Crawling**: If the user asks about the website or specific live details not in the PDF, use Google Search to find information about ${WEBSITE_LINK}.
- **Smart & Fast**: Be concise. Avoid long paragraphs. Use bullet points for listings or lists.
- **Listings**: Only recommend properties from the "Sample Listings" section of your Knowledge Base (e.g., Seaview Serenity, Urban Nest) unless you find new ones via Search on the official site.
- **Tone**: Professional, encouraging, and efficient.

IMPORTANT: At the very end of your response, ALWAYS provide 3 short, relevant follow-up questions for the user. 
Use the separator "---SUGGESTIONS---" followed by the 3 questions, each on a new line. Do not number them or use bullet points.
Example format at the end of response:
...hope this helps!
---SUGGESTIONS---
Show me 2BHKs in Bandra
What documents do I need?
Is the price negotiable?
`;