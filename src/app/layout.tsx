import '@/styles/globals.scss';
import { Providers } from '../components/providers/Providers';
import { CosmicResponse } from '../types/cms';

async function getSettings() {
  try {
    const res = await fetch('https://api.cosmicjs.com/v3/buckets/autolux-production/objects/696d50b0439a2d58af1da7d0?pretty=true&read_key=hXSHxMOEuwYH43zRWzbEniPSkb9u2Pltz1l8v2rdCK5UCu6cyp&depth=1&props=slug,title,metadata,type', { cache: 'no-store' });
    
    if (!res.ok) {
      console.error('Failed to fetch settings');
      return null;
    }
   
    const data: CosmicResponse = await res.json();
    return data.object.metadata;
  } catch (error) {
    console.error('Error fetching settings:', error);
    return null;
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const settings = await getSettings();

  return (
    <html lang="en">
      <body>
        <Providers settings={settings || undefined}>
          {children}
        </Providers>
      </body>
    </html>
  )
}
