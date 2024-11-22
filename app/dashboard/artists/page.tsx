import Pagination from '@/app/ui/artists/pagination';
import Search from '@/app/ui/search';
import ArtistsTable from '@/app/ui/artists/table';
import { CreateArtist } from '@/app/ui/artists/buttons';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchArtistPages } from '@/app/lib/data'; //change to fetch artists pages
 
export default async function Page(props: {
    searchParams?: Promise<{
      query?: string;
      page?: string;
    }>;
  }) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchArtistPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Artists</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search artists..." />
        <CreateArtist />
      </div>
        <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
          <ArtistsTable query={query} currentPage={currentPage} />
        </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}