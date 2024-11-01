// import CardWrapper, { Card } from '@/app/ui/dashboard/cards';
// import ReleaseChart from '@/app/ui/dashboard/release-chart';
// import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
import { 
  //fetchRevenue, //commented for suspense
  // fetchLatestInvoices, //commented for suspense
  fetchCardData
} from '@/app/lib/data';
import { Suspense } from 'react';
import {
  RevenueChartSkeleton, 
  LatestInvoicesSkeleton,
  CardsSkeleton
} from '@/app/ui/skeletons';
 
export default async function Page() {
  // request waterfall (sequential)
  //const revenue = await fetchRevenue(); // moved so I can use suspense only on this
  // const latestInvoices = await fetchLatestInvoices(); //also moved for suspense use
  // const {
  //   numberOfCustomers,
  //   numberOfInvoices,
  //   totalPaidInvoices,
  //   totalPendingInvoices
  // } = await fetchCardData(); //using suspense and wrapper

  // // parallel fetching with promise.all
  // const [revenue, latestInvoices, cardData] = await Promise.all([
  //   fetchRevenue(),
  //   fetchLatestInvoices(),
  //   fetchCardData()
  // ]);
  
  // const {
  //   numberOfCustomers,
  //   numberOfInvoices,
  //   totalPaidInvoices,
  //   totalPendingInvoices
  // } = cardData;

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* <Card title="Collected" value={totalPaidInvoices} type="collected" />
        <Card title="Pending" value={totalPendingInvoices} type="pending" />
        <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
        <Card
          title="Total Customers"
          value={numberOfCustomers}
          type="customers"
        /> */}
        {/* <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense> */}
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        {/* <RevenueChart revenue={revenue}  /> commented for suspense*/}
        {/* <Suspense fallback={<RevenueChartSkeleton />}>
          <ReleaseChart />
        </Suspense> */}
        {/* <LatestInvoices latestInvoices={latestInvoices} /> commented for suspense */}
        {/* <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoices />
        </Suspense> */}
        Hi
      </div>
    </main>
  );
}