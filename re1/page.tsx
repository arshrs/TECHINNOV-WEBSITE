// app/re/page.tsx
import AdsListing from '@/components/AdsListing'; 
// Note: If '@/' doesn't work, try: import AdsListing from '../../components/AdsListing';

export default function PreviewPage() {
  return (
    <main>
      <AdsListing />
    </main>
  );
}