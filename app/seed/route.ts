import { db } from '@vercel/postgres';
import { songs, albums, artists, album_artists, song_albums, song_artists } from '../lib/placeholder-data';

const client = await db.connect();

async function seedSongs() {
  await client.sql`
    CREATE TABLE IF NOT EXISTS songs (
      song_id SERIAL PRIMARY KEY,
      song_name VARCHAR(255) NOT NULL
    );
  `;

  const insertedSongs = await Promise.all(
    songs.map(async (song) => {
      return client.sql`
        INSERT INTO songs (song_id, song_name)
        VALUES (${song.song_id}, ${song.song_name})
        ON CONFLICT (song_id) DO NOTHING;
      `;
    }),
  );

  return insertedSongs;
}

async function seedAlbums() {

  await client.sql`
    CREATE TABLE IF NOT EXISTS albums (
      album_id SERIAL PRIMARY KEY,
      album_name VARCHAR(255) NOT NULL,
      release_date DATE NOT NULL
    );
  `;

  const insertedAlbums = await Promise.all(
    albums.map(
      (album) => client.sql`
        INSERT INTO albums (album_id, album_name, release_date)
        VALUES (${album.album_id}, ${album.album_name}, ${album.release_date})
        ON CONFLICT (album_id) DO NOTHING;
      `,
    ),
  );

  return insertedAlbums;
}

async function seedArtists() {
  await client.sql`
    CREATE TABLE IF NOT EXISTS artists (
      artist_id SERIAL PRIMARY KEY,
      artist_name VARCHAR(255) NOT NULL,
      is_alive VARCHAR(255) NOT NULL
    );
  `;

  const insertedArtists = await Promise.all(
    artists.map(
      (artist) => client.sql`
        INSERT INTO artists (artist_id, artist_name, is_alive)
        VALUES (${artist.artist_id}, ${artist.artist_name}, ${artist.is_alive})
        ON CONFLICT (artist_id) DO NOTHING;
      `,
    ),
  );

  return insertedArtists;
}

async function seedAlbum_Artists() {
  await client.sql`
    CREATE TABLE IF NOT EXISTS album_artists (
      album_id INT NOT NULL,
      artist_id INT NOT NULL,
      FOREIGN KEY (album_id) REFERENCES albums(album_id),
      FOREIGN KEY (artist_id) REFERENCES albums(artist_id),
      PRIMARY KEY (album_id, artist_id)
    );
  `;

  const insertedAlbum_Artists = await Promise.all(
    album_artists.map(
      (album_artist) => client.sql`
        INSERT INTO album_artists (album_id, artist_id)
        VALUES (${album_artist.album_id}, ${album_artist.artist_id})
        ON CONFLICT (album_id, artist_id) DO NOTHING;
      `,
    ),
  );

  return insertedAlbum_Artists;
}

async function seedSong_Albums() {
  await client.sql`
    CREATE TABLE IF NOT EXISTS song_albums (
      song_id INT NOT NULL,
      album_id INT NOT NULL,
      FOREIGN KEY (song_id) REFERENCES songs(song_id),
      FOREIGN KEY (album_id) REFERENCES albums(album_id),
      PRIMARY KEY (song_id, album_id)
    );
  `;

  const insertedSong_Albums = await Promise.all(
    song_albums.map(
      (song_album) => client.sql`
        INSERT INTO song_albums (song_id, album_id)
        VALUES (${song_album.song_id}, ${song_album.album_id})
        ON CONFLICT (song_id, album_id) DO NOTHING;
      `,
    ),
  );

  return insertedSong_Albums;
}

async function seedSong_Artists() {
  await client.sql`
    CREATE TABLE IF NOT EXISTS song_artists (
      song_id INT NOT NULL,
      artist_id INT NOT NULL,
      is_main_artist VARCHAR(255) NOT NULL,
      FOREIGN KEY (song_id) REFERENCES songs(song_id),
      FOREIGN KEY (artist_id) REFERENCES albums(artist_id),
      PRIMARY KEY (song_id, artist_id)
    );
  `;

  const insertedSong_Artists = await Promise.all(
    song_artists.map(
      (song_artist) => client.sql`
        INSERT INTO song_albums (song_id, artist_id, is_main_artist)
        VALUES (${song_artist.song_id}, ${song_artist.artist_id}, ${song_artist.is_main_artist})
        ON CONFLICT (song_id, artist_id) DO NOTHING;
      `,
    ),
  );

  return insertedSong_Artists;
}

export async function GET() {
  // return Response.json({
  //   message:
  //     'Uncomment this file and remove this line. You can delete this file when you are finished.',
  // });
  try {
    await client.sql`BEGIN`;
    await seedSongs();
    await seedAlbums();
    await seedArtists();
    await seedAlbum_Artists();
    await seedSong_Albums();
    await seedSong_Artists();
    await client.sql`COMMIT`;

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    await client.sql`ROLLBACK`;
    return Response.json({ error }, { status: 500 });
  }
}
