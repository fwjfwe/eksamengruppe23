// src/api/categorypageapi.jsx
const API_KEY = 'oUxracsATFhH1Gkva2GRyOTWWWR7uOgl';
const BASE_URL = 'https://app.ticketmaster.com/discovery/v2';

export async function fetchCategoryContent(filters) {
  const query = new URLSearchParams({ apikey: API_KEY, size: 20 });

  if (filters.keyword) query.append('keyword', filters.keyword);
  if (filters.city) query.append('city', filters.city);
  if (filters.countryCode) query.append('countryCode', filters.countryCode);
  if (filters.date) query.append('startDateTime', `${filters.date}T00:00:00Z`);
  if (filters.classificationName) query.append('classificationName', filters.classificationName);

  const url = `${BASE_URL}/events.json?${query.toString()}`;
  console.log('[Ticketmaster Fetch] Requesting:', url);

  try {
    const res = await fetch(url);
    console.log('[Ticketmaster Fetch] Status:', res.status);
    const data = await res.json();
    console.log('[Ticketmaster Fetch] Response JSON:', data);

    const events = data._embedded?.events || [];

    // Extract attractions and venues from events
    const attractions = [];
    const venues = [];

    events.forEach(event => {
      const eventAttractions = event._embedded?.attractions || [];
      const eventVenues = event._embedded?.venues || [];

      eventAttractions.forEach(attr => {
        if (!attractions.find(a => a.id === attr.id)) {
          attractions.push(attr);
        }
      });

      eventVenues.forEach(venue => {
        if (!venues.find(v => v.id === venue.id)) {
          venues.push(venue);
        }
      });
    });

    console.log('[Ticketmaster Fetch] Found:', {
      events: events.length,
      attractions: attractions.length,
      venues: venues.length,
    });

    return {
      events,
      attractions,
      venues
    };
  } catch (error) {
    console.error('[Ticketmaster Fetch] Error fetching data:', error);
    return { events: [], attractions: [], venues: [] };
  }
}

