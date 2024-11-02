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
    return {
      message: 'Database Error updateArtist action: Failed to Update Artist.'
    };
  }
 
  revalidatePath('/dashboard/artists');
  redirect('/dashboard/artists');
}

export async function deleteArtist(artist_id: string) {

  try {
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
  song_name: z.string(),
});

// Use Zod to update the expected types
const CreateSong = SongSchema.omit({ song_id: true}); //modified zod schema to use to validate with
const UpdateSong = SongSchema.omit({ song_id: true});

export async function createSong(formData: FormData) {
  // const rawFormData = { // without zod validation
  const { song_name } = CreateSong.parse({
    song_name: formData.get('song_name'),
  });
  // Test it out:
  // console.log(rawFormData);

  try {
    await sql`
      INSERT INTO songs (song_name, is_alive)
      VALUES (${song_name})
    `;
  } catch (error) {
    return {
      message: 'Database Error createSong action: Failed to Create Song'
    };
  }

  revalidatePath('/dashboard/songs'); //clear cache/update songs page
  redirect('/dashboard/songs');
}
 
export async function updateSong(song_id: string, formData: FormData) {
  const { artist_id, song_name } = UpdateSong.parse({
    artist_id: Number(formData.get('artist_id')),
    song_name: formData.get('song_name'),
  });
 
  try { //THINK THRU UPDATE LOGIC
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
    await sql`DELETE FROM songs WHERE song_id = ${song_id}`;
    revalidatePath('/dashboard/songs');
  } catch (error) {
    return {
      message: 'Database Error deleteSong action: Failed to Delete Song.'
    };
  }
}