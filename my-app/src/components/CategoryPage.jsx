import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AttractionCard from '../components/AttractionCard.jsx';
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

  const [savedAttractions, setSavedAttractions] = useState([]);

  const handleSave = (id) => {
    setSavedAttractions(prev =>
      prev.includes(id)
        ? prev.filter(savedId => savedId !== id)
        : [...prev, id]
    );
  };

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
            </select>
          </label>
          <label>
            By:
            <select name="city" defaultValue={filters.city}>
              <option value="">Velg by</option>
              <option value="Oslo">Oslo</option>
              <option value="Stockholm">Stockholm</option>
              <option value="Berlin">Berlin</option>
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

      <section>
        <h2>Attraksjoner</h2>
        <div className="image-container">
          {data.attractions.map(a => (
            <AttractionCard
              key={a.id}
              item={a}
              onSave={handleSave}
              isSaved={savedAttractions.includes(a.id)}
            />
          ))}
        </div>
      </section>

    <section>
      <h2>Arrangementer</h2>
      <div className="image-container">
        {data.attractions.map(a => (
          <AttractionCard
            key={`event-attraction-${a.id}`}
            item={a}
            onSave={handleSave}
            isSaved={savedAttractions.includes(a.id)}
          />
        ))}
      </div>
    </section>

    <section>
      <h2>Venues</h2>
      <div className="venue-container">
        {data.venues.map(v => (
          <div className="venue-card" key={`venue-${v.id}`}>
            <AttractionCard
              item={v}
              onSave={handleSave}
              isSaved={savedAttractions.includes(v.id)}
            />
          </div>
        ))}
        {data.attractions.map(a => (
          <div className="venue-card" key={`venue-attraction-${a.id}`}>
            <AttractionCard
              item={a}
              onSave={handleSave}
              isSaved={savedAttractions.includes(a.id)}
            />
          </div>
        ))}
      </div>
    </section>



    </div>
  );
}
