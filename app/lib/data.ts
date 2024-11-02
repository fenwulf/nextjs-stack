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

// const ITEMS_PER_PAGE = 6;
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  // try {
  //   const invoices = await sql<InvoicesTable>`
  //     SELECT
  //       invoices.id,
  //       invoices.amount,
  //       invoices.date,
  //       invoices.status,
  //       customers.name,
  //       customers.email,
  //       customers.image_url
  //     FROM invoices
  //     JOIN customers ON invoices.customer_id = customers.id
  //     WHERE
  //       customers.name ILIKE ${`%${query}%`} OR
  //       customers.email ILIKE ${`%${query}%`} OR
  //       invoices.amount::text ILIKE ${`%${query}%`} OR
  //       invoices.date::text ILIKE ${`%${query}%`} OR
  //       invoices.status ILIKE ${`%${query}%`}
  //     ORDER BY invoices.date DESC
  //     LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
  //   `;

  //   return invoices.rows;
  // } catch (error) {
  //   console.error('Database Error:', error);
  //   throw new Error('Failed to fetch invoices.');
  // }
}

export async function fetchInvoicesPages(query: string) {
  // try {
  //   const count = await sql`SELECT COUNT(*)
  //   FROM invoices
  //   JOIN customers ON invoices.customer_id = customers.id
  //   WHERE
  //     customers.name ILIKE ${`%${query}%`} OR
  //     customers.email ILIKE ${`%${query}%`} OR
  //     invoices.amount::text ILIKE ${`%${query}%`} OR
  //     invoices.date::text ILIKE ${`%${query}%`} OR
  //     invoices.status ILIKE ${`%${query}%`}
  // `;

  //   const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
  //   return totalPages;
  // } catch (error) {
  //   console.error('Database Error:', error);
  //   throw new Error('Failed to fetch total number of invoices.');
  // }
}

export async function fetchInvoiceById(id: string) {
  // try {
  //   const data = await sql<InvoiceForm>`
  //     SELECT
  //       invoices.id,
  //       invoices.customer_id,
  //       invoices.amount,
  //       invoices.status
  //     FROM invoices
  //     WHERE invoices.id = ${id};
  //   `;

  //   const invoice = data.rows.map((invoice) => ({
  //     ...invoice,
  //     // Convert amount from cents to dollars
  //     amount: invoice.amount / 100,
  //   }));

  //   return invoice[0];
  // } catch (error) {
  //   console.error('Database Error:', error);
  //   throw new Error('Failed to fetch invoice.');
  // }
}

export async function fetchCustomers() {
  // try {
  //   const data = await sql<CustomerField>`
  //     SELECT
  //       id,
  //       name
  //     FROM customers
  //     ORDER BY name ASC
  //   `;

  //   const customers = data.rows;
  //   return customers;
  // } catch (err) {
  //   console.error('Database Error:', err);
  //   throw new Error('Failed to fetch all customers.');
  // }
}

export async function fetchFilteredCustomers(query: string) {
  // try {
  //   const data = await sql<CustomersTableType>`
	// 	SELECT
	// 	  customers.id,
	// 	  customers.name,
	// 	  customers.email,
	// 	  customers.image_url,
	// 	  COUNT(invoices.id) AS total_invoices,
	// 	  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
	// 	  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
	// 	FROM customers
	// 	LEFT JOIN invoices ON customers.id = invoices.customer_id
	// 	WHERE
	// 	  customers.name ILIKE ${`%${query}%`} OR
  //       customers.email ILIKE ${`%${query}%`}
	// 	GROUP BY customers.id, customers.name, customers.email, customers.image_url
	// 	ORDER BY customers.name ASC
	//   `;

  //   const customers = data.rows.map((customer) => ({
  //     ...customer,
  //     total_pending: formatCurrency(customer.total_pending),
  //     total_paid: formatCurrency(customer.total_paid),
  //   }));

  //   return customers;
  // } catch (err) {
  //   console.error('Database Error:', err);
  //   throw new Error('Failed to fetch customer table.');
  // }
}

// My stuff

export async function fetchArtistPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM artists
    WHERE
      artists.artist_name ILIKE ${`%${query}%`} OR
      artists.is_alive ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error fetchArtistPages:', error);
    throw new Error('Failed to fetch total number of artists.');
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

export async function fetchArtistById(artist_id: string) {
  try {
    const data = await sql<ArtistForm>`
      SELECT
        artists.artist_id,
        artists.artist_name,
        artists.is_alive
      FROM artists
      WHERE artists.artist_id = ${Number(artist_id)};
    `;

    const artist = data.rows.map((artist) => ({
      ...artist,
    }));

    return artist[0];
  } catch (error) {
    console.error(`Database Error fetchArtistById with id ${artist_id}:`, error);
    throw new Error('Failed to fetch Artist.');
  }
}

export async function fetchSongPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM songs
    LEFT JOIN song_albums ON songs.song_id = song_albums.song_id
    LEFT JOIN albums ON song_albums.album_id = albums.album_id
    LEFT JOIN song_artists ON songs.song_id = song_artists.song_id
    LEFT JOIN artists ON song_artists.artist_id = artists.artist_id
    WHERE
      (artists.artist_name ILIKE ${`%${query}%`} OR
      songs.song_name ILIKE ${`%${query}%`} OR
      albums.album_name ILIKE ${`%${query}%`}) AND
      is_main_artist ILIKE 'main';
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error fetchSongPages:', error);
    throw new Error('Failed to fetch total number of songs.');
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
        artists.artist_id
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