import Form from '@/app/ui/artists/edit-form';
import Breadcrumbs from '@/app/ui/artists/breadcrumbs';
import { fetchArtistById } from '@/app/lib/data';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

// id = artist_id, kept as id for routing directory simplicity
export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  // console.log(`Attempting to edit artist with id: ${params.id}`);
  // console.log(`Params: ${params}`);
  const id = params.id;
  const [artist] = await Promise.all([
    fetchArtistById(id),
  ]);

  if (!artist) {
    console.log(`Failed in edit page fetching by id:${artist}`);
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Artists', href: '/dashboard/artists' },
          {
            label: 'Edit Artist',
            href: `/dashboard/artists/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form artist={artist} />
    </main>
  );
}