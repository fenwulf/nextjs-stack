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
      message: 'Database Error: Failed to Create Artist'
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
      message: 'Database Error: Failed to Update Artist.'
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
      message: 'Database Error: Failed to Delete Artist.'
    };
  }
}