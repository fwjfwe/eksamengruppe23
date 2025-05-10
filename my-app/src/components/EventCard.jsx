const EventCard = ({ event }) => {
    const imageUrl = event.images?.[0]?.url;
    const name = event.name;
    const city = event._embedded?.venues?.[0]?.city?.name || "Ukjent by";
    const country = event._embedded?.venues?.[0]?.country?.name || "Ukjent land";
    const date = event.dates?.start?.localDate || "Ukjent dato";

    return (
        <article className="event-card">
            {imageUrl && <img src={imageUrl} alt={name} />}
            <h4>{name}</h4>
            <p>{city}, {country}</p>
            <p>Dato: {date}</p>
        </article>
    );
};

export const EventGallery = ({ events }) => {
    return (
        <>
            <h1>Sommerens festivaler!</h1>
            <section className="image-container">
                {events.map((event) => (
                    <article key={event.id}>
                        {event.images?.[0]?.url && (
                            <figure>
                                <img className="image" src={event.images[0].url} alt={event.name} />
                                <h4>{event.name}</h4>
                            </figure>
                        )}
                    </article>
                ))}
            </section>
        </>
    );
};

export default EventCard;
