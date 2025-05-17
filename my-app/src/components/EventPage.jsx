import { useParams } from "react-router-dom";
import Header from "./Header";
import EventCard from "./EventCard";
import ArtistCard from "./ArtistCard"; 
import "../styles/eventpage.css";

export default function EventPage({ events }) {
  const { attractionId } = useParams();

  const filteredEvents = events.filter(event =>
    event._embedded?.attractions?.some(attr => attr.id === attractionId)
  );

  if (filteredEvents.length === 0) {
    return (
      <>
        <Header />
        <main>
          <p>Fant ingen arrangementer for denne festivalen.</p>
        </main>
      </>
    );
  }

  const festivalName = filteredEvents[0]._embedded.attractions.find(attr => attr.id === attractionId)?.name;

  const genres = Array.from(new Set(
    filteredEvents
      .map(event => event.classifications?.[0]?.genre?.name)
      .filter(Boolean)
  ));

  const allArtists = filteredEvents.flatMap(event => event._embedded?.attractions || []);
  const uniqueArtistsMap = new Map();
  allArtists.forEach(artist => {
    if (!uniqueArtistsMap.has(artist.id)) {
      uniqueArtistsMap.set(artist.id, artist);
    }
  });
  const uniqueArtists = Array.from(uniqueArtistsMap.values());

  return (
    <>
      <Header />
      <main>
        <h1>{festivalName}</h1>
        <h2>Sjanger:</h2>
        <ul>
          {genres.map((genre, idx) => (
            <li key={idx}>{genre}</li>
          ))}
        </ul>

        <h3>Festivalplass:</h3>
        <section className="image-container">
          {filteredEvents.map(event => (
            <div key={event.id} className="event-wrapper">
              <EventCard event={event} />
              <div className="button-row">
                <button>Kjøp</button>
                <button>Legg til i ønskeliste</button>
              </div>
            </div>
          ))}
        </section>

        <h3>Artister:</h3>
        <section className="artist-container">
          {uniqueArtists.map(artist => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </section>
      </main>
    </>
  );
}
