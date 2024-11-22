import Form from '@/app/ui/artists/create-form';
import Breadcrumbs from '@/app/ui/artists/breadcrumbs';
// import { fetchCustomers } from '@/app/lib/data';

export const dynamic = 'force-dynamic';
 
export default async function Page() {
  // const customers = await fetchCustomers();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Artists', href: '/dashboard/artists' },
          {
            label: 'Create Artist',
            href: '/dashboard/artists/create',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}