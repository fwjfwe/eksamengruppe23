import { Link } from "react-router-dom";

const EventCard = ({ event }) => {
  if (!event) return <div className="event-card">No event data</div>;

  const imageUrl = event.images?.[0]?.url || 'https://via.placeholder.com/300';
  const name = event.name || 'Ukjent navn';
  const city = event._embedded?.venues?.[0]?.city?.name || "Ukjent by";
  const country = event._embedded?.venues?.[0]?.country?.name || "Ukjent land";
  const date = event.dates?.start?.localDate || "Ukjent dato";
  const attractionId = event._embedded?.attractions?.[0]?.id || event.id;

  return (
    <article className="event-card">
      <img src={imageUrl} alt={name} />
      <div className="event-info">
        <h4>{name}</h4>
        <p>{city}, {country}</p>
        <p>Dato: {date}</p>
        <Link to={`/event/${attractionId}`}>
          <button>Les mer</button>
        </Link>
      </div>
    </article>
  );
};

export const EventGallery = ({ events = [] }) => {
  const uniqueEventsMap = new Map();

  events.forEach(event => {
    const attractionName = event._embedded?.attractions?.[0]?.name || event.name;
    if (attractionName && !uniqueEventsMap.has(attractionName)) {
      uniqueEventsMap.set(attractionName, event);
    }
  });

  const uniqueEvents = Array.from(uniqueEventsMap.values());

  if (uniqueEvents.length === 0) {
    return <p>Ingen arrangementer å vise</p>;
  }

  return (
    <>
      <h1>Sommerens festivaler!</h1>
      <section className="image-container">
        {uniqueEvents.map((event) => {
          const attractionId = event._embedded?.attractions?.[0]?.id || event.id;
          const imageUrl = event.images?.[0]?.url || 'https://via.placeholder.com/300';
          const name = event.name || 'Ukjent navn';

          return (
            <article key={event.id}>
              <figure>
                <img className="image" src={imageUrl} alt={name} />
                <h4>{name}</h4>
                <Link to={`/event/${attractionId}`}>
                  <button>Les mer om {name}</button>
                </Link>
              </figure>
            </article>
          );
        })}
      </section>
    </>
  );
};

export default EventCard;