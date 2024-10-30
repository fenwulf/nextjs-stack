// Modified from ->
// https://nextjs.org/learn/dashboard-app/fetching-data
const songs = [
  {
    song_id: '1',
    song_name: 'New Patek'
  },
  {
    song_id: '2',
    song_name: 'No Lie'
  },
  {
    song_id: '3',
    song_name: 'Paranoid'
  },
  {
    song_id: '4',
    song_name: 'Solo'
  },
];

const albums = [
  {
    album_id: '1',
    album_name: 'Whole Lotta Red',
    release_date: '12/25/2020',
  },
  {
    album_id: '2',
    album_name: 'Eternal Atake',
    release_date: '03/06/2020',
  },
  {
    album_id: '3',
    album_name: 'HNDRXX',
    release_date: '07/27/2017',
  },
  {
    album_id: '4',
    album_name: 'A Great Chaos',
    release_date: '10/13/2023'
  }
];

const artists = [
  {
    artist_id: '1',
    artist_name: 'Playboi Carti',
    is_alive: true,
  },
  {
    artist_id: '2',
    artist_name: 'Future',
    is_alive: true,
  },
  {
    artist_id: '3',
    artist_name: 'Ken Carson',
    is_alive: true,
  },
  {
    artist_id: '4',
    artist_name: 'Lil Uzi Vert',
    is_alive: true,
  },
  {
    artist_id: '5',
    artist_name: 'Juice WRLD',
    is_alive: false,
  },
  {
    artist_id: '6',
    artist_name: 'Destroy Lonely',
    is_alive: true
  }
];

const album_artists = [
  {
    album_id: '1',
    artist_id: '1'
  },
  {
    album_id: '2',
    artist_id: '4'
  },
  {
    album_id: '3',
    artist_id: '2'
  },
  {
    album_id: '4',
    artist_id: '3'
  },
];

const song_albums = [
  {
    song_id: '4',
    album_id: '3'
  },
  {
    song_id: '3',
    album_id: '4'
  },
  {
    song_id: '1',
    album_id: null
  },
  {
    song_id: '2',
    album_id: null
  },
];

const song_artists = [
  {
    song_id: '1',
    artist_id: '4',
    is_main_artist: true
  },
  {
    song_id: '2',
    artist_id: '1',
    is_main_artist: true
  },
  {
    song_id: '3',
    artist_id: '3',
    is_main_artist: true
  },
  {
    song_id: '4',
    artist_id: '2',
    is_main_artist: true
  },
  {
    song_id: '3',
    artist_id: '6',
    is_main_artist: false
  },
];

export { songs, albums, artists, album_artists, song_albums, song_artists };
