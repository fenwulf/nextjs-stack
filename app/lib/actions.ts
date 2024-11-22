'use server'; // server actions exports

import { z } from 'zod'; // typescript validation tool
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { error } from 'console';

const ArtistSchema = z.object({
  artist_id: z.number(),
  artist_name: z.string(),
  is_alive: z.enum(['alive', 'passed']),
});

// Use Zod to update the expected types
const CreateArtist = ArtistSchema.omit({ artist_id: true}); //modified zod schema to use to validate with
const UpdateArtist = ArtistSchema.omit({ artist_id: true});

export async function createArtist(formData: FormData) {
  // const rawFormData = { // without zod validation
  const { artist_name, is_alive } = CreateArtist.parse({
    artist_name: formData.get('artist_name'),
    is_alive: formData.get('is_alive'),
  });
  // Test it out:
  // console.log(rawFormData);

  try {
    await sql`
      INSERT INTO artists (artist_name, is_alive)
      VALUES (${artist_name}, ${is_alive})
    `;
  } catch (error) {
    console.error("Error in createArtist:", error);
    return {
      message: 'Database Error createArtist action: Failed to Create Artist'
    };
  }

  revalidatePath('/dashboard/artists'); //clear cache/update artists page
  redirect('/dashboard/artists');
}
 
export async function updateArtist(artist_id: string, formData: FormData) {
  const { artist_name, is_alive } = UpdateArtist.parse({
    // customerId: formData.get('customerId'),
    artist_name: formData.get('artist_name'),
    is_alive: formData.get('is_alive'),
  });
 
  try {
    await sql`
      UPDATE artists
      SET artist_name = ${artist_name}, is_alive = ${is_alive}
      WHERE artist_id = ${artist_id}
    `;
  } catch (error) {
    console.error("Error in updateArtist:", error);
    return {
      message: 'Database Error updateArtist action: Failed to Update Artist.'
    };
  }
 
  revalidatePath('/dashboard/artists');
  redirect('/dashboard/artists');
}

export async function deleteArtist(artist_id: string) {

  try {
    // Deletes all associated things with artist
    const albumIdsResult = await sql`
      SELECT album_id FROM album_artists WHERE artist_id = ${artist_id}
    `;
    const songIdsResult = await sql`
      SELECT song_id FROM song_artists WHERE artist_id = ${artist_id}
    `;

    const album_ids = albumIdsResult.rows.map(row => row.album_id);
    const song_ids = songIdsResult.rows.map(row => row.song_id);

    await sql`
      DELETE FROM song_artists WHERE artist_id = ${artist_id}
    `;
    await sql`
      DELETE FROM album_artists WHERE artist_id = ${artist_id}
    `;
    if (song_ids.length > 0) {
      await sql`
        DELETE FROM song_albums WHERE song_id IN (${song_ids.join(', ')})
      `;
    }
    
    if (song_ids.length > 0) {
      await sql`
        DELETE FROM songs WHERE song_id IN (${song_ids.join(', ')})
      `;
    }
    if (album_ids.length > 0) {
      await sql`
        DELETE FROM albums WHERE album_id IN (${album_ids.join(', ')})
      `;
    }

    await sql`DELETE FROM artists WHERE artist_id = ${artist_id}`;
    revalidatePath('/dashboard/artists');
  } catch (error) {
    return {
      message: 'Database Error deleteArtist action: Failed to Delete Artist.'
    };
  }
}

const SongSchema = z.object({
  song_id: z.number(),
  artist_id: z.number(),
  album_id: z.number(),
  song_name: z.string(),
});

// Use Zod to update the expected types
const CreateSong = SongSchema.omit({ song_id: true}); //modified zod schema to use to validate with
const UpdateSong = SongSchema.omit({ song_id: true});

export async function createSong(formData: FormData) {
  // const rawFormData = { // without zod validation
  const { artist_id, album_id, song_name } = CreateSong.parse({
    artist_id: Number(formData.get('artist_id')),
    album_id: Number(formData.get('album_id')),
    song_name: formData.get('song_name'),
  });

  try {
    const data = await sql`
      INSERT INTO songs (song_name)
      VALUES (${song_name})
      RETURNING song_id;
    `;
    console.log("Made to song artists 1");
    const song_id = data.rows[0].song_id;
    
    await sql`
    INSERT INTO song_artists (song_id, artist_id, is_main_artist)
    VALUES (${song_id}, ${artist_id}, 'main')
    ON CONFLICT (song_id, artist_id) DO NOTHING;
    `;
    
    if (album_id != 0) {
      await sql`
      INSERT INTO song_albums (song_id, album_id)
      VALUES (${song_id}, ${album_id})
      ON CONFLICT (song_id, album_id) DO NOTHING;
      `;
    }

  } catch (error) {
    return {
      message: 'Database Error createSong action: Failed to Create Song'
    };
  }
  revalidatePath('/dashboard/songs'); //clear cache/update songs page
  redirect('/dashboard/songs');
}
 
export async function updateSong(song_id: string, formData: FormData) {
  const { artist_id, album_id, song_name } = UpdateSong.parse({
    artist_id: Number(formData.get('artist_id')),
    album_id: Number(formData.get('album_id')),
    song_name: formData.get('song_name'),
  });
 
  try {
    await sql`
      UPDATE songs
      SET song_name = ${song_name}
      WHERE song_id = ${Number(song_id)}
    `;
    await sql`
      UPDATE song_artists
      SET artist_id = ${artist_id}
      WHERE song_id = ${Number(song_id)}
    `;

    const data = await sql`
      SELECT COUNT(*)
      FROM song_albums
      WHERE song_id = ${Number(song_id)}
    `;

    const count = Number(data.rows[0].count);

    // console.log(`Test for album_id and count return: ${album_id}, ${count}`);

    if (count == 0 && album_id != 0) { // If there are no existing album links for a song, and the album_id has been changed to an existing album, then insert new entry
      await sql`
        INSERT INTO song_albums (song_id, album_id)
        VALUES (${Number(song_id)}, ${album_id})
        ON CONFLICT (song_id, album_id) DO NOTHING
      `;
    } else if (count == 1 && album_id != 0) { //already has an existing entry, just update to new album_id
      await sql`
        UPDATE song_albums
        SET album_id = ${album_id}
        WHERE song_id = ${Number(song_id)}
      `;
    } else if (count == 1 && album_id == 0) { //changed to None from an existing album, remove from table
      await sql`
        DELETE FROM song_albums
        WHERE song_id = ${Number(song_id)}
      `;
    }

    
  } catch (error) {
    return {
      message: 'Database Error updateSong action: Failed to Update Song.'
    };
  }
 
  revalidatePath('/dashboard/songs');
  redirect('/dashboard/songs');
}

export async function deleteSong(song_id: string) {

  try {
    const data = await sql`
      SELECT COUNT(*)
      FROM song_albums
      WHERE song_id = ${Number(song_id)}
    `;

    const count = Number(data.rows[0].count);

    if (count != 0) { // Has associated album, delete from song_albums table
      await sql`
        DELETE FROM song_albums
        WHERE song_id = ${Number(song_id)}
      `;
    }

    await sql`
      DELETE FROM song_artists
      WHERE song_id = ${Number(song_id)}
    `;

    await sql`DELETE FROM songs WHERE song_id = ${Number(song_id)}`;

    revalidatePath('/dashboard/songs');
  } catch (error) {
    console.error("Error in deleteSong:", error);
    return {
      message: 'Database Error deleteSong action: Failed to Delete Song.'
    };
  }
}

const AlbumSchema = z.object({
  album_id: z.number(),
  artist_id: z.number(),
  album_name: z.string(),
  release_date: z.string()
});

// Use Zod to update the expected types
const CreateAlbum = AlbumSchema.omit({ album_id: true}); //modified zod schema to use to validate with
const UpdateAlbum = AlbumSchema.omit({ album_id: true});

export async function createAlbum(formData: FormData) {
  // const rawFormData = { // without zod validation
  const { artist_id, album_name, release_date } = CreateAlbum.parse({
    artist_id: Number(formData.get('artist_id')),
    album_name: formData.get('album_name'),
    release_date: formData.get('release_date'),
  });

  try {
    const data = await sql`
      INSERT INTO albums (album_name, release_date)
      VALUES (${album_name}, ${release_date})
      RETURNING album_id;
    `;

    const album_id = data.rows[0].album_id;
    console.log("Album ID: ", album_id);
    
    await sql`
    INSERT INTO album_artists (album_id, artist_id)
    VALUES (${album_id}, ${artist_id})
    ON CONFLICT (album_id, artist_id) DO NOTHING;
    `;

  } catch (error) {
    console.error("Error in createAlbum:", error);
    return {
      message: 'Database Error createAlbum action: Failed to Create Album'
    };
  }

  revalidatePath('/dashboard/albums'); //clear cache/update songs page
  redirect('/dashboard/albums');
}
 
export async function updateAlbum(album_id: string, formData: FormData) {
  const { artist_id, album_name, release_date } = UpdateAlbum.parse({
    artist_id: Number(formData.get('artist_id')),
    album_name: formData.get('album_name'),
    release_date: formData.get('release_date')
  });
 
  try {
    await sql`
      UPDATE albums
      SET album_name = ${album_name}, release_date = ${release_date}
      WHERE album_id = ${Number(album_id)}
    `;

    await sql`
      UPDATE album_artists
      SET artist_id = ${artist_id}
      WHERE album_id = ${Number(album_id)}
    `;
    
  } catch (error) {
    return {
      message: 'Database Error updateAlbum action: Failed to Update Album.'
    };
  }
 
  revalidatePath('/dashboard/albums');
  redirect('/dashboard/albums');
}

export async function deleteAlbum(album_id: string) {

  try {
    await sql`
      DELETE FROM song_albums
      WHERE album_id = ${Number(album_id)}
    `;

    await sql`
      DELETE FROM album_artists
      WHERE album_id = ${Number(album_id)}
    `;

    await sql`
      DELETE FROM albums
      WHERE album_id = ${Number(album_id)}
    `;

    revalidatePath('/dashboard/albums');
  } catch (error) {
    console.error("Error in deleteAlbum:", error);
    return {
      message: 'Database Error deleteAlbum action: Failed to Delete Album.'
    };
  }
}