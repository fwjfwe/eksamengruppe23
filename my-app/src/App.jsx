import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import Header from "./components/Header";
import EventPage from "./components/EventPage";
import CategoryPage from "./components/CategoryPage";
import Dashboard from "./components/Dashboard";

function App() {
  const [events, setEvents] = useState([]);

  const getEvents = async () => {
    const attractionIds = [
      "K8vZ917_YJf",
      "K8vZ917K7fV",
      "K8vZ917bJC7",
      "K8vZ917oWOV",
    ];

    const attractionIdParams = attractionIds.map(id => `attractionId=${id}`).join("&");

    try {
      const response = await fetch(
        `https://app.ticketmaster.com/discovery/v2/events?apikey=oUxracsATFhH1Gkva2GRyOTWWWR7uOgl&${attractionIdParams}&locale=*&countryCode=NO`
      );

      if (!response.ok) {
        console.error("API Error:", response.status, response.statusText);
        return;
      }

      const data = await response.json();
      const allEvents = data._embedded?.events || [];
      setEvents(allEvents);
    } catch (error) {
      console.error("Skjedde noe dritt ved fetch", error);
    }
  };

  useEffect(() => {
    getEvents(); // Only runs once on mount
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home events={events} setEvents={setEvents} />} />
        <Route path="/event/:attractionId" element={<EventPage events={events} />} />
        <Route path="/category/:slug" element={<CategoryPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
