import Image from 'next/image';
import { UpdateSong, DeleteSong } from '@/app/ui/songs/buttons';
import { fetchFilteredSongs } from '@/app/lib/data';

export default async function SongsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const songs = await fetchFilteredSongs(query, currentPage);

  // artists?.forEach((artist) => console.log(`In table (artist): ${String(artist.artist_id)}`));

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {songs?.map((song) => (
              <div
                key={song.song_id}
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
                      <p>{song.song_name}</p>
                      <p>{song.album_name}</p>
                      <p>{song.artist_name}</p>
                    </div>
                    {/* <p className="text-sm text-gray-500">{artist.email}</p> */}
                  </div>
                  {/* <ArtistLifeStatus status={song.is_alive} /> */}
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  {/* <div>
                    <p className="text-xl font-medium">
                      {formatCurrency(invoice.amount)}
                    </p>
                    <p>{formatDateToLocal(invoice.date)}</p>
                  </div> */}
                  <div className="flex justify-end gap-2">
                    <UpdateSong song_id={String(song.song_id)} />
                    <DeleteSong song_id={String(song.song_id)} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Song
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Artist
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Album
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {songs?.map((song) => (
                <tr
                  key={song.song_id}
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
                      <p>{song.song_name}</p>
                    {/* </div> */}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {song.artist_name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {song.album_name}
                  </td>
                  {/* <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(invoice.date)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <ArtistLifeStatus status={artist.is_alive} />
                  </td> */}
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateSong song_id={String(song.song_id)} />
                      <DeleteSong song_id={String(song.song_id)} />
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
