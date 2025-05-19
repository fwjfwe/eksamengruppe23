import { useState, useEffect } from "react";
import EventCard from './EventCard';

export function Home({ events }) {
  // Filter unike events
  const uniqueEventsMap = new Map();

  events.forEach(event => {
    const attractionName = event._embedded?.attractions?.[0]?.name || event.name;
    if (attractionName && !uniqueEventsMap.has(attractionName)) {
      uniqueEventsMap.set(attractionName, event);
    }
  });

  const uniqueEvents = Array.from(uniqueEventsMap.values());

  return (
    <>
      <h1>Sommerens festivaler!</h1>

      {uniqueEvents.length === 0 ? (
        <p>Ingen arrangementer å vise</p>
      ) : (
        <section className="image-container">
          {uniqueEvents.map(event => (
            // Her sender vi en prop for å si at vi vil skjule by og dato i EventCard
            <EventCard key={event.id} event={event} hideDetails={true} />
          ))}
        </section>
      )}

      <City />
    </>
  );
}

export function City() {
  const cities = ["Berlin", "London", "Paris", "Oslo", "Stockholm"];
  const [events, setEvents] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);

  useEffect(() => {
    if (selectedCity) {
      console.log(`Fetching events for selected city: ${selectedCity}`);

      fetch(`https://app.ticketmaster.com/discovery/v2/events?apikey=oUxracsATFhH1Gkva2GRyOTWWWR7uOgl&locale=*&city=${selectedCity}`)
        .then((res) => res.json())
        .then((data) => {
          if (data._embedded?.events) {
            setEvents(data._embedded.events);
          } else {
            setEvents([]);
          }
        })
        .catch((err) => console.error(`Error fetching events:`, err));
    }
  }, [selectedCity]);

  return (
    <>
      <h1>Hva skjer i verdens storbyer!</h1>

      <nav className="button-container">
        {cities.map((city) => (
          <button key={city} onClick={() => setSelectedCity(city)}>
            {city}
          </button>
        ))}
      </nav>

      {selectedCity && (
        <>
          <h1>Hva skjer i {selectedCity}!</h1>

          <section className="image-container">
            {events.map((event) => (
              <EventCard key={event.id} event={event} hideButton={true} />
            ))}
          </section>
        </>
      )}
    </>
  );
}
