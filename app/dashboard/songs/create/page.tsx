import Form from '@/app/ui/songs/create-form';
import Breadcrumbs from '@/app/ui/songs/breadcrumbs';
import { fetchArtists, fetchAlbums } from '@/app/lib/data';

export const dynamic = 'force-dynamic';
 
export default async function Page() {
  const artists = await fetchArtists();
  const albums = await fetchAlbums();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Songs', href: '/dashboard/songs' },
          {
            label: 'Create Song',
            href: '/dashboard/songs/create',
            active: true,
          },
        ]}
      />
      <Form artists={artists} albums={albums}/>
    </main>
  );
}