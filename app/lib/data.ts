import { sql } from '@vercel/postgres';
import {
  Song,
  Album,
  Artist,
  Album_Artists,
  Song_Albums,
  Song_Artists,
  ArtistsTable,
  ArtistForm,
  ArtistField,
  SongsTable,
  SongForm,
  AlbumField,
  AlbumsTable,
  AlbumForm
} from './definitions';

export async function fetchRevenue() {
  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    //USE WITH REVENUE TABLE TO HAVE ALBUMs/MONTH

    console.log('Fetching song data...');

    // const data = await sql<Revenue>`SELECT * FROM revenue`;

    console.log('Data fetch completed after 3 seconds.');

    // return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchLatestInvoices() {
  try {
    // const data = await sql<LatestInvoiceRaw>`
    //   SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
    //   FROM invoices
    //   JOIN customers ON invoices.customer_id = customers.id
    //   ORDER BY invoices.date DESC
    //   LIMIT 5`;

    // const latestInvoices = data.rows.map((invoice) => ({
    //   ...invoice,
    //   amount: formatCurrency(invoice.amount),
    // }));
    // return latestInvoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

export async function fetchCardData() {
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    // const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
    // const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
    // const invoiceStatusPromise = sql`SELECT
    //      SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
    //      SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
    //      FROM invoices`;

    // const data = await Promise.all([
    //   invoiceCountPromise,
    //   customerCountPromise,
    //   invoiceStatusPromise,
    // ]);

    // const numberOfInvoices = Number(data[0].rows[0].count ?? '0');
    // const numberOfCustomers = Number(data[1].rows[0].count ?? '0');
    // const totalPaidInvoices = formatCurrency(data[2].rows[0].paid ?? '0');
    // const totalPendingInvoices = formatCurrency(data[2].rows[0].pending ?? '0');

    // return {
    //   numberOfCustomers,
    //   numberOfInvoices,
    //   totalPaidInvoices,
    //   totalPendingInvoices,
    // };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

// My stuff

// export async function fetchArtistPages(query: string) {
//   try {
//     const count = await sql`SELECT COUNT(*)
//     FROM artists
//     WHERE
//       artists.artist_name ILIKE ${`%${query}%`} OR
//       artists.is_alive ILIKE ${`%${query}%`}
//   `;

//     const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
//     return totalPages;
//   } catch (error) {
//     console.error('Database Error fetchArtistPages:', error);
//     throw new Error('Failed to fetch total number of artists.');
//   }
// }

// Stored Procedure version
export async function fetchArtistPages(query: string) {
  try {
    const result = await sql`
      SELECT get_artist_pages(${query}, ${ITEMS_PER_PAGE}) AS total_pages;
    `;
    
    const totalPages = result.rows[0].total_pages;
    return totalPages;
  } catch (error) {
    console.error('Database Error fetchArtistPages:', error);
    throw new Error('Failed to fetch total number of artist pages.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredArtists(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const artists = await sql<ArtistsTable>`
      SELECT
        artists.artist_id,
        artists.artist_name,
        artists.is_alive
      FROM artists
      WHERE
        artists.artist_name ILIKE ${`%${query}%`} OR
        artists.is_alive ILIKE ${`%${query}%`}
      ORDER BY artists.artist_id DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return artists.rows;
  } catch (error) {
    console.error('Database Error fetchFilteredArtists:', error);
    throw new Error('Failed to fetch artists.');
  }
}

// export async function fetchArtistById(artist_id: string) {
//   try {
//     const data = await sql<ArtistForm>`
//       SELECT
//         artists.artist_id,
//         artists.artist_name,
//         artists.is_alive
//       FROM artists
//       WHERE artists.artist_id = ${Number(artist_id)};
//     `;

//     const artist = data.rows.map((artist) => ({
//       ...artist,
//     }));

//     return artist[0];
//   } catch (error) {
//     console.error(`Database Error fetchArtistById with id ${artist_id}:`, error);
//     throw new Error('Failed to fetch Artist.');
//   }
// }

// Stored procedure version
export async function fetchArtistById(artist_id: string) {
  try {
    const result = await sql`
      SELECT * FROM get_artist_by_id(${Number(artist_id)});
    `;
    
    const artist = result.rows[0];
    return artist;
  } catch (error) {
    console.error(`Database Error fetchArtistById with id ${artist_id}:`, error);
    throw new Error('Failed to fetch Artist.');
  }
}

// export async function fetchSongPages(query: string) {
//   try {
//     const count = await sql`SELECT COUNT(*)
//     FROM songs
//     LEFT JOIN song_albums ON songs.song_id = song_albums.song_id
//     LEFT JOIN albums ON song_albums.album_id = albums.album_id
//     LEFT JOIN song_artists ON songs.song_id = song_artists.song_id
//     LEFT JOIN artists ON song_artists.artist_id = artists.artist_id
//     WHERE
//       (artists.artist_name ILIKE ${`%${query}%`} OR
//       songs.song_name ILIKE ${`%${query}%`} OR
//       albums.album_name ILIKE ${`%${query}%`}) AND
//       is_main_artist ILIKE 'main';
//   `;

//     const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
//     return totalPages;
//   } catch (error) {
//     console.error('Database Error fetchSongPages:', error);
//     throw new Error('Failed to fetch total number of songs.');
//   }
// }

// Stored procedure version
export async function fetchSongPages(query: string) {
  try {
    const result = await sql`
      SELECT get_song_pages(${query}, ${ITEMS_PER_PAGE}) AS total_pages;
    `;
    
    const totalPages = result.rows[0].total_pages;
    return totalPages;
  } catch (error) {
    console.error('Database Error fetchSongPages:', error);
    throw new Error('Failed to fetch total number of song pages.');
  }
}

export async function fetchArtists() {
  try {
    const data = await sql<ArtistField>`
      SELECT
        artist_id,
        artist_name
      FROM artists
      ORDER BY artist_name ASC
    `;

    const artists = data.rows;
    return artists;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all artists.');
  }
}

export async function fetchFilteredSongs(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const songs = await sql<SongsTable>`
      SELECT
        songs.song_id,
        songs.song_name,
        artists.artist_name,
        albums.album_name
      FROM songs
      LEFT JOIN song_albums ON songs.song_id = song_albums.song_id
      LEFT JOIN albums ON song_albums.album_id = albums.album_id
      LEFT JOIN song_artists ON songs.song_id = song_artists.song_id
      LEFT JOIN artists ON song_artists.artist_id = artists.artist_id
      WHERE
        (artists.artist_name ILIKE ${`%${query}%`} OR
        songs.song_name ILIKE ${`%${query}%`} OR
        albums.album_name ILIKE ${`%${query}%`}) AND
        is_main_artist ILIKE 'main'
      ORDER BY songs.song_id DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset};
    `;

    songs.rows.forEach((song, index) => {
      if (song.album_name === null) {
        song.album_name = 'None';
      }
    });
    return songs.rows;
  } catch (error) {
    console.error('Database Error fetchFilteredSongs:', error);
    throw new Error('Failed to fetch songs.');
  }
}

export async function fetchSongById(song_id: string) {
  try {
    const data = await sql<SongForm>`
      SELECT
        songs.song_id,
        songs.song_name,
        artists.artist_id,
        albums.album_id
      FROM songs
      LEFT JOIN song_albums ON songs.song_id = song_albums.song_id
      LEFT JOIN albums ON song_albums.album_id = albums.album_id
      LEFT JOIN song_artists ON songs.song_id = song_artists.song_id
      LEFT JOIN artists ON song_artists.artist_id = artists.artist_id
      WHERE songs.song_id = ${Number(song_id)};
    `;

    const song = data.rows.map((song) => ({
      ...song,
    }));

    return song[0];
  } catch (error) {
    console.error(`Database Error fetchSongById with id ${song_id}:`, error);
    throw new Error('Failed to fetch Song.');
  }
}

export async function fetchAlbums() {
  try {
    const data = await sql<AlbumField>`
      SELECT
        album_id,
        album_name
      FROM albums
      ORDER BY album_name ASC;
    `;

    const albums = data.rows;
    return albums;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all albums.');
  }
}

export async function fetchFilteredAlbums(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const albums = await sql<AlbumsTable>`
      SELECT
        albums.album_id,
        albums.album_name,
        albums.release_date,
        artists.artist_name
      FROM albums
      LEFT JOIN album_artists ON albums.album_id = album_artists.album_id
      LEFT JOIN artists ON artists.artist_id = album_artists.artist_id
      WHERE
        albums.album_name ILIKE ${`%${query}%`} OR
        albums.release_date::text ILIKE ${`%${query}%`} OR
        artists.artist_name ILIKE ${`%${query}%`}
      ORDER BY albums.album_id DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset};
    `;

    return albums.rows;
  } catch (error) {
    console.error('Database Error fetchFilteredAlbums:', error);
    throw new Error('Failed to fetch albums.');
  }
}

// export async function fetchAlbumPages(query: string) {
//   try {
//     const count = await sql`
//     SELECT COUNT(*)
//     FROM albums
//     LEFT JOIN album_artists ON albums.album_id = album_artists.album_id
//     LEFT JOIN artists ON artists.artist_id = album_artists.artist_id
//     WHERE
//       albums.album_name ILIKE ${`%${query}%`} OR
//       albums.release_date::text ILIKE ${`%${query}%`} OR
//       artists.artist_name ILIKE ${`%${query}%`};
//   `;

//     const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
//     return totalPages;
//   } catch (error) {
//     console.error('Database Error fetchAlbumPages:', error);
//     throw new Error('Failed to fetch total number of albums.');
//   }
// }

// Stored procedure version
export async function fetchAlbumPages(query: string) {
  try {
    const result = await sql`
      SELECT get_album_pages(${query}, ${ITEMS_PER_PAGE}) AS total_pages;
    `;
    
    const totalPages = result.rows[0].total_pages;
    return totalPages;
  } catch (error) {
    console.error('Database Error fetchAlbumPages:', error);
    throw new Error('Failed to fetch total number of album pages.');
  }
}

export async function fetchAlbumById(album_id: string) {
  try {
    const data = await sql<AlbumForm>`
      SELECT
        albums.album_id,
        albums.album_name,
        albums.release_date,
        artists.artist_id
      FROM albums
      LEFT JOIN album_artists ON albums.album_id = album_artists.album_id
      LEFT JOIN artists ON album_artists.artist_id = artists.artist_id
      WHERE albums.album_id = ${Number(album_id)};
    `;

    const album = data.rows.map((album) => ({
      ...album,
    }));

    return album[0];
  } catch (error) {
    console.error(`Database Error fetchAlbumById with id ${album_id}:`, error);
    throw new Error('Failed to fetch Album.');
  }
}