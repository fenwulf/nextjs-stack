import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteArtist } from '@/app/lib/actions';

export function CreateArtist() {
  return (
    <Link
      href="/dashboard/artists/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Artist</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateArtist({ artist_id }: { artist_id: string }) {
  return (
    <Link
      href={`/dashboard/artists/${artist_id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteArtist({ artist_id }: { artist_id: string }) {
  const deleteArtistWithId = deleteArtist.bind(null, artist_id);

  return (
    <form action={deleteArtistWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}
