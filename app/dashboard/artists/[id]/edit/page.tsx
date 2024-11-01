import Form from '@/app/ui/artists/edit-form';
import Breadcrumbs from '@/app/ui/artists/breadcrumbs';
import { fetchArtistById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
 
export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const [artist] = await Promise.all([
    fetchArtistById(id),
  ]);

  if (!artist) {
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