export default function fetchArtistProfile(token, artistId) {
  console.log(token, artistId);
  const options = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const url = `https://api.spotify.com/v1/artists/${artistId.id}`;

  return fetch(url, options).then((response) => response.json());
}
