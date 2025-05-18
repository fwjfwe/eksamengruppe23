import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AttractionCard from '../components/AttractionCard.jsx';
import EventCard from '../components/EventCard.jsx';
import { fetchCategoryContent } from '../api/categorypageapi.jsx';

const slugToClassification = {
  music: 'Music',
  sports: 'Sports',
  theater: 'Arts & Theatre'
};


export default function CategoryPage() {
  const { slug } = useParams();
  const classificationName = slugToClassification[slug] || "";
    console.log('[CategoryPage] URL slug is:', slug);


  const [data, setData] = useState({ attractions: [], events: [], venues: [] });
  const [filters, setFilters] = useState({
    date: '',
    countryCode: '',
    city: '',
    keyword: ''
  });

  useEffect(() => {
  if (!classificationName) {
    console.log('[CategoryPage] classificationName missing, skipping fetch');
    return;
  }

  console.log('[CategoryPage] Fetching category content with filters:', {
    ...filters,
    classificationName,
  });

  fetchCategoryContent({ ...filters, classificationName })
    .then(setData)
    .catch((err) => console.error('[CategoryPage] Fetch error:', err));
}, [filters, classificationName]);



  const onFilter = (e) => {
    e.preventDefault();
    const f = e.target;
    setFilters(fv => ({
      ...fv,
      date: f.date.value,
      countryCode: f.country.value,
      city: f.city.value
    }));
  };
  const onSearch = (e) => {
    e.preventDefault();
    const f = e.target;
    setFilters(fv => ({ ...fv, keyword: f.keyword.value }));
  };

  return (
    <div className="container">
      <h1>{slug.charAt(0).toUpperCase() + slug.slice(1)}</h1>

      <section>
        <h2>Filtrert søk</h2>
        <form onSubmit={onFilter}>
          <label>
            Dato:
            <input type="date" name="date" defaultValue={filters.date} />
          </label>
          <label>
            Land:
            <select name="country" defaultValue={filters.countryCode}>
              <option value="">Velg et land</option>
              <option value="NO">Norge</option>
              <option value="SE">Sverige</option>
              <option value="DE">Tyskland</option>
              <option value="FR">Frankrike</option>
            </select>
          </label>
          <label>
            By:
            <select name="city" defaultValue={filters.city}>
              <option value="">Velg by</option>
              <option value="Oslo">Oslo</option>
              <option value="Stockholm">Stockholm</option>
              <option value="Berlin">Berlin</option>
              <option value="Paris">Paris</option>
            </select>
          </label>
          <button type="submit">Filtrer</button>
        </form>
      </section>

      <section>
        <h2>Søk</h2>
        <form onSubmit={onSearch}>
          <input
            type="text"
            name="keyword"
            placeholder="Søk etter event, attraksjon eller spillested"
            defaultValue={filters.keyword}
          />
          <button type="submit">Søk</button>
        </form>
      </section>

      {/* Resultater */}
      <section>
        <h2>Attraksjoner</h2>
        <div className="attractions-grid">
          {data.attractions.map(a => (
            <AttractionCard key={a.id} item={a} />
          ))}
        </div>
      </section>

      <section>
        <h2>Arrangementer</h2>
        <div className="event-grid">
          {data.events.map(e => (
            <EventCard key={e.id} event={e} />
          ))}
        </div>
      </section>

      <section>
        <h2>Venues</h2>
        <div className="venues-grid">
          {data.venues.map(v => (
            <div key={v.id} className="venue-card">
              {v.images && v.images.length > 0 && (
                <img 
                  src={v.images[0].url} 
                  alt={v.name} 
                  style={{ width: '200px', height: 'auto', borderRadius: '8px' }}
                />
              )}
              <h3>{v.name}</h3>
              <p>{v.address?.line1 || ''}</p>
              <p>{v.city?.name || ''}, {v.country?.name || ''}</p>
            </div>
          ))}
        </div>
      </section>


    </div>
  );
}
