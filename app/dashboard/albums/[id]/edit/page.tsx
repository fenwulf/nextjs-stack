import Form from '@/app/ui/albums/edit-form';
import Breadcrumbs from '@/app/ui/albums/breadcrumbs';
import { fetchAlbumById, fetchArtists } from '@/app/lib/data';
import { notFound } from 'next/navigation';
// id = artist_id, kept as id for routing directory simplicity
export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  // console.log(`Attempting to edit artist with id: ${params.id}`);
  // console.log(`Params: ${params}`);
  const id = params.id;
  const [album, artists] = await Promise.all([
    fetchAlbumById(id),
    fetchArtists(),
  ]);

  if (!album) {
    console.log(`Failed in edit page fetching by id:${album}`);
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Albums', href: '/dashboard/albums' },
          {
            label: 'Edit Album',
            href: `/dashboard/albums/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form album={album} artists={artists}/>
    </main>
  );
}