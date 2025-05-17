import Header from "./Header";
import { useState, useEffect } from "react";
import EventCard, { EventGallery } from './EventCard';

export function Home({ events }) {
    return (
        <>
            <header>
                <Header />
            </header>  
            <EventGallery events={events} />
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
                            <EventCard key={event.id} event={event} />
                        ))}
                    </section>
                </>
            )}
        </>
    );
}