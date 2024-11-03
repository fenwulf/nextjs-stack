// import { CustomerField } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  StarIcon,
  UserCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createAlbum } from '@/app/lib/actions';
import { ArtistField } from '@/app/lib/definitions';

export default function Form({ artists }: { artists: ArtistField[]}) {
  return (
    <form action={createAlbum}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Artist Name */}
        <div className="mb-4">
          <label htmlFor="artist" className="mb-2 block text-sm font-medium">
            Choose artist
          </label>
          <div className="relative">
            <select
              id="artist"
              name="artist_id"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
            >
              <option value="" disabled>
                Select a artist
              </option>
              {artists.map((artist) => (
                <option key={artist.artist_id} value={artist.artist_id}>
                  {artist.artist_name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Album Name */}
        <div className="mb-4">
          <label htmlFor="album_name" className="mb-2 block text-sm font-medium">
            Update album name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="album_name"
                name="album_name"
                type="string"
                placeholder="Enter album name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Release Date */}
        <div className="mb-4">
          <label htmlFor="release_date" className="mb-2 block text-sm font-medium">
            Choose release date
          </label>
          <div className="relative">
            <input
              id="release_date"
              name="release_date"
              type="date"
              defaultValue={""}
              placeholder="Select a date"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <ClockIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/albums"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Album</Button>
      </div>
    </form>
  );
}
