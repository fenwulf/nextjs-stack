import Form from '@/app/ui/albums/create-form';
import Breadcrumbs from '@/app/ui/albums/breadcrumbs';
import { fetchArtists } from '@/app/lib/data';
 
export default async function Page() {
  const artists = await fetchArtists();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Albums', href: '/dashboard/albums' },
          {
            label: 'Create Album',
            href: '/dashboard/albums/create',
            active: true,
          },
        ]}
      />
      <Form artists={artists}/>
    </main>
  );
}