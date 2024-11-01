import Form from '@/app/ui/artists/edit-form';
import Breadcrumbs from '@/app/ui/artists/breadcrumbs';
import { fetchArtistById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
 
export default async function Page(props: { params: Promise<{ artist_id: string }> }) {
  const params = await props.params;
  const artist_id = params.artist_id;
  const [artist] = await Promise.all([
    fetchArtistById(artist_id),
  ]);

  if (!artist) {
    console.log('Failed in edit page');
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Artists', href: '/dashboard/artists' },
          {
            label: 'Edit Artist',
            href: `/dashboard/artists/${artist_id}/edit`,
            active: true,
          },
        ]}
      />
      <Form artist={artist} />
    </main>
  );
}