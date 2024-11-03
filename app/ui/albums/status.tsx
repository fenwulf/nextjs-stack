import { BeakerIcon, CheckIcon, ClockIcon, FireIcon, XMarkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export function ArtistLifeStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        {
          'bg-gray-100 text-gray-500': status === 'passed',
          'bg-green-500 text-white': status === 'alive',
        },
      )}
    >
      {status === 'passed' ? (
        <>
          Passed
          <XMarkIcon className="ml-1 w-4 text-gray-500" />
        </>
      ) : null}
      {status === 'alive' ? (
        <>
          Alive
          <CheckIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
    </span>
  );
}

export function ArtistSongStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        {
          'bg-gray-100 text-gray-500': status === 'feature',
          'bg-green-500 text-white': status === 'main',
        },
      )}
    >
      {status === 'feature' ? (
        <>
          Feature
          <BeakerIcon className="ml-1 w-4 text-gray-500" />
        </>
      ) : null}
      {status === 'main' ? (
        <>
          Main
          <FireIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
    </span>
  );
}