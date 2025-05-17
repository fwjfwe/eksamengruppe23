export default function ArtistCard({ artist }) {
  const image = artist.images?.[0]?.url || "https://via.placeholder.com/300x200?text=Artist";
  const name = artist.name || "Ukjent artist";

  return (
    <div className="artist-card">
      <img src={image} alt={name} />
      <h4>{name}</h4>
    </div>
  );
}
