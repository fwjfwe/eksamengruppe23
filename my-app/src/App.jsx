import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import Header from "./components/Header";
import EventPage from "./components/EventPage";
import CategoryPage from "./components/CategoryPage";

function App() {
  const [events, setEvents] = useState([]);

  const getEvents = () => {
    const ids = [
      "Z698xZb_Z16v7eGkFy",
      "Z698xZb_Z16vfkqIjU",
      "Z698xZb_Z17q339",
      "Z698xZb_Z17qfaA",
    ];
    
    const idsString = ids.join(',');

    fetch(`https://app.ticketmaster.com/discovery/v2/events?apikey=oUxracsATFhH1Gkva2GRyOTWWWR7uOgl&id=${idsString}&locale=*&countryCode=NO`)
      .then((res) => res.json())
      .then((data) => {
        const allEvents = data._embedded?.events || [];
        setEvents(allEvents);
      })
      .catch((error) => {
        console.error("Skjedde noe dritt ved fetch", error);
      });
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home events={events} setEvents={setEvents} />} />
      <Route path="/event/:id" element={<EventPage />} />
      <Route path="/category/:slug" element={<CategoryPage />} />
      <Route path="/Header" element={<Header />} />
    </Routes>
  );
}

export default App