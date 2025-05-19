import { Link } from "react-router-dom";

const EventCard = ({ event, hideDetails = false, hideButton = false }) => {
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

        {!hideDetails && (
          <>
            <p>{city}, {country}</p>
            <p>Dato: {date}</p>
          </>
        )}

        {!hideButton && (
          <Link to={`/event/${attractionId}`}>
            <button>Les mer om {name}</button>
          </Link>
        )}
      </div>
    </article>
  );
};

export default EventCard;
