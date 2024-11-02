'use client';

import { AlbumField, ArtistField, SongForm } from '@/app/lib/definitions';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  StarIcon,
  UserCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateSong } from '@/app/lib/actions'; // server action

export default function EditSongForm({
  song,
  artists,
  albums
}: {
  song: SongForm;
  artists: ArtistField[];
  albums: AlbumField[];
}) {
  const updateSongWithId = updateSong.bind(null, String(song.song_id)); // bind artist id to pass it, bound as first parameter as formData is always last with server actions

  return (
    <form action={updateSongWithId}>
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
              defaultValue={song.artist_id}
            >
              <option value="" disabled>
                Select an artist
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
          <label htmlFor="album" className="mb-2 block text-sm font-medium">
            Choose album
          </label>
          <div className="relative">
            <select
              id="album"
              name="album_id"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={song.album_id}
            >
              <option value="" disabled>
                Select an album
              </option>
              <option value="">None</option>
              {albums.map((album) => (
                <option key={album.album_id} value={album.album_id}>
                  {album.album_name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Song Name */}
        <div className="mb-4">
          <label htmlFor="song_name" className="mb-2 block text-sm font-medium">
            Update song name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="song_name"
                name="song_name"
                type="string"
                defaultValue={song.song_name}
                placeholder="Enter song name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Life Status */}
        {/* <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the artist's life status
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="alive"
                  name="is_alive"
                  type="radio"
                  value="alive"
                  defaultChecked={artist.is_alive === 'alive'}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="alive"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Alive <CheckIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="passed"
                  name="is_alive"
                  type="radio"
                  value="passed"
                  defaultChecked={artist.is_alive === 'passed'}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="passed"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Passed <XMarkIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
        </fieldset> */}
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/songs"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Edit Song</Button>
      </div>
    </form>
  );
}
