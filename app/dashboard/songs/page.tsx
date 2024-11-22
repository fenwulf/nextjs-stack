import Pagination from '@/app/ui/songs/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/songs/table';
import { CreateSong } from '@/app/ui/songs/buttons';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchSongPages } from '@/app/lib/data'; //change to fetch songs pages
 
export default async function Page(props: {
    searchParams?: Promise<{
      query?: string;
      page?: string;
    }>;
  }) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchSongPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Songs</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search songs..." />
        <CreateSong />
      </div>
        <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
          <Table query={query} currentPage={currentPage} />
        </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}