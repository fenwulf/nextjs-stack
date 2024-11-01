import Image from 'next/image';
import { UpdateArtist, DeleteArtist } from '@/app/ui/artists/buttons';
import { ArtistLifeStatus } from '@/app/ui/artists/status';
import { fetchFilteredArtists } from '@/app/lib/data';

export default async function ArtistsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const artists = await fetchFilteredArtists(query, currentPage);

  // artists?.forEach((artist) => console.log(`In table (artist): ${String(artist.artist_id)}`));

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {artists?.map((artist) => (
              <div
                key={artist.artist_id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="flex items-center">
                      {/* <Image
                        src={artist.artist_name}
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={`${invoice.name}'s profile picture`}
                      /> */}
                      <p>{artist.artist_name}</p>
                    </div>
                    {/* <p className="text-sm text-gray-500">{artist.email}</p> */}
                  </div>
                  <ArtistLifeStatus status={artist.is_alive} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  {/* <div>
                    <p className="text-xl font-medium">
                      {formatCurrency(invoice.amount)}
                    </p>
                    <p>{formatDateToLocal(invoice.date)}</p>
                  </div> */}
                  <div className="flex justify-end gap-2">
                    <UpdateArtist artist_id={String(artist.artist_id)} />
                    <DeleteArtist artist_id={String(artist.artist_id)} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Artist
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Living
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {artists?.map((artist) => (
                <tr
                  key={artist.artist_id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    {/* <div className="flex items-center gap-3"> */}
                      {/* <Image
                        src={invoice.image_url}
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt={`${invoice.name}'s profile picture`}
                      /> */}
                      <p>{artist.artist_name}</p>
                    {/* </div> */}
                  </td>
                  {/* <td className="whitespace-nowrap px-3 py-3">
                    {invoice.email}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatCurrency(invoice.amount)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(invoice.date)}
                  </td> */}
                  <td className="whitespace-nowrap px-3 py-3">
                    <ArtistLifeStatus status={artist.is_alive} />
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateArtist artist_id={String(artist.artist_id)} />
                      <DeleteArtist artist_id={String(artist.artist_id)} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
