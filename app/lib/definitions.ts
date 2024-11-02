// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type Song = {
  song_id: number;
  song_name: string;
};

export type Album = {
  album_id: number;
  album_name: string;
  release_date: string;
};

export type Artist = {
  artist_id: number;
  artist_name: string;
  is_alive: 'alive' | 'passed';
}

export type Album_Artists = {
  album_id: number;
  artist_id: number;
}

export type Song_Albums = {
  song_id: number;
  album_id: number;
}

export type Song_Artists = {
  song_id: number;
  artist_id: number;
  is_main_artist: 'main' | 'feature';
}

export type SongsTable = {
  song_id: number;
  song_name: string;
  album_id: number | null;
  album_name: string | null;
  artist_id: number;
  artist_name: string;
}

export type AlbumsTable = {
  album_id: number;
  album_name: string;
  release_date: string;
}

export type ArtistsTable = {
  artist_id: number;
  artist_name: string;
  is_alive: 'alive' | 'passed';
}

export type ArtistForm = {
  artist_id: number;
  artist_name: string;
  is_alive: 'alive' | 'passed';
};

export type ArtistField = {
  artist_id: number;
  artist_name: string;
};

export type SongForm = {
  song_id: number;
  artist_id: number;
  song_name: string;
  artist_name: string;
  album_name: string;
};