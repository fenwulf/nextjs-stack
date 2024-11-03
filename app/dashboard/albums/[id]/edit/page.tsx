import Form from '@/app/ui/songs/edit-form';
import Breadcrumbs from '@/app/ui/songs/breadcrumbs';
import { fetchSongById, fetchArtists, fetchAlbums } from '@/app/lib/data';
import { notFound } from 'next/navigation';
// id = artist_id, kept as id for routing directory simplicity
export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  // console.log(`Attempting to edit artist with id: ${params.id}`);
  // console.log(`Params: ${params}`);
  const id = params.id;
  const [song, artists, albums] = await Promise.all([
    fetchSongById(id),
    fetchArtists(),
    fetchAlbums()
  ]);

  if (!song) {
    console.log(`Failed in edit page fetching by id:${song}`);
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Songs', href: '/dashboard/songs' },
          {
            label: 'Edit Song',
            href: `/dashboard/songs/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form song={song} artists={artists} albums={albums} />
    </main>
  );
}