import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from "./Header";

const CategoryPage = () => {
  const SEGMENTS = {
    music: 'KZFzniwnSyZfZ7v7nJ',
    sports: 'KZFzniwnSyZfZ7v7nE',
    theater: 'KnvZfZ7v7l1'
  };

  const COUNTRIES = {
    NO: 'Norway',
    SE: 'Sweden',
    DK: 'Denmark'
  };

  const { slug } = useParams();
  const [country, setCountry] = useState('NO');
  const [data, setData] = useState({ events: [], attractions: [], venues: [] });
  const [loading, setLoading] = useState(false);

  const fetchData = () => {
    setLoading(true);

    fetch(
      `https://app.ticketmaster.com/discovery/v2/suggest?apikey=oUxracsATFhH1Gkva2GRyOTWWWR7uOgl` +
      `&locale=*&countryCode=${country}` +
      `&segmentId=${SEGMENTS[slug]}`
    )
      .then(res => {
        if (!res.ok) throw new Error(`Network response was not ok: ${res.status}`);
        return res.json();
      })
      .then(json => {
        console.log("Respons fra Ticketmaster:", json);

        const venues = json._embedded?.venues || [];
        const suggestedEvents = json._embedded?.events || [];

        if (suggestedEvents.length === 0) {
          // No events found, update state and finish
          setData({ events: [], attractions: [], venues });
          setLoading(false);
          return;
        }

        // We fetch detailed event info for top 5 events sequentially
        const detailedEvents = [];
        const fetchNextEvent = (index) => {
          if (index >= Math.min(5, suggestedEvents.length)) {
            // After fetching all, update state
            setData({ events: detailedEvents, attractions: [], venues });
            setLoading(false);
            return;
          }

          const event = suggestedEvents[index];
          fetch(`https://app.ticketmaster.com/discovery/v2/events/${event.id}?apikey=oUxracsATFhH1Gkva2GRyOTWWWR7uOgl&locale=*`)
            .then(res => {
              if (!res.ok) throw new Error(`Failed to fetch event ${event.id}: ${res.status}`);
              return res.json();
            })
            .then(detail => {
              detailedEvents.push(detail);
              fetchNextEvent(index + 1);
            })
            .catch(err => {
              console.error(`Feil ved henting av event ${event.id}`, err);
              // Continue even if one fetch fails
              fetchNextEvent(index + 1);
            });
        };

        fetchNextEvent(0);
      })
      .catch(error => {
        console.error("Skjedde noe feil ved hovedfetch:", error);
        setData({ events: [], attractions: [], venues: [] });
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [slug, country]);

  return (
    <div style={{ padding: '1rem' }}>
      <Header />
      <h1>Filtrert søk</h1>

      <label htmlFor="country-select">Velg land:</label>
      <select
        id="country-select"
        value={country}
        onChange={e => setCountry(e.target.value)}
        style={{ display: 'block', marginBottom: '1rem' }}
      >
        {Object.entries(COUNTRIES).map(([code, name]) => (
          <option key={code} value={code}>{name}</option>
        ))}
      </select>

      <h2>Søk</h2>
      <input
        type="text"
        placeholder="Søk her..."
        style={{ width: '100%', padding: '0.5rem', marginBottom: '2rem' }}
      />

      {loading ? (
        <p>Laster...</p>
      ) : (
        <>
          {/* No attractions section since these IDs don't correspond to attractions */}
          <section>
            <h2>Arrangementer ({data.events.length})</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {data.events.map(event => (
                <div key={event.id} style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
                  <img
                    src={event.images?.[0]?.url}
                    alt={event.name}
                    style={{ width: '100%', maxWidth: '300px', borderRadius: '8px' }}
                  />
                  <h3>{event.name}</h3>
                  <p>
                    Dato: {event.dates?.start?.localDate || 'Ukjent'}<br />
                    Tid: {event.dates?.start?.localTime || 'Ukjent'}<br />
                    Land: {event._embedded?.venues?.[0]?.country?.name || 'Ukjent'}<br />
                    By: {event._embedded?.venues?.[0]?.city?.name || 'Ukjent'}<br />
                    Sted: {event._embedded?.venues?.[0]?.name || 'Ukjent'}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2>Spillesteder</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              {data.venues
                .filter(v => Array.isArray(v.images) && v.images.length > 0)
                .slice(0, 5)
                .map(venue => (
                  <div key={venue.id} style={{ width: '150px', textAlign: 'center' }}>
                    <img
                      src={venue.images[0].url}
                      alt={venue.name}
                      style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                    />
                    <p>{venue.name}</p>
                  </div>
                ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default CategoryPage;
