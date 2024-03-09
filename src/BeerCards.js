import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BeerCards.css';

function BeerCards() {
  const [beers, setBeers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('https://api.punkapi.com/v2/beers');
        setBeers(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  const filteredBeers = beers.filter(beer =>
    beer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChange = event => {
    setSearchTerm(event.target.value);
  };

  const toggleExpand = (id) => {
    setExpanded({
      ...expanded,
      [id]: !expanded[id]
    });
  };

  return (
    <div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by beer name..."
          value={searchTerm}
          onChange={handleChange}
        />
      </div>
      <div className="beer-cards-container">
        {filteredBeers.map(beer => (
          <div className="beer-card" key={beer.id}>
            <img src={beer.image_url} alt={beer.name} />
            <div className="beer-details">
              <h2>{beer.name}</h2>
              <p>Tagline: {beer.tagline}</p>
              <button onClick={() => toggleExpand(beer.id)}>
                {expanded[beer.id] ? 'View Less' : 'View More'}
              </button>
              {expanded[beer.id] && (
                <div>
                  <p>First Brewed: {beer.first_brewed}</p>
                  <p>ABV: {beer.abv}%</p>
                  <p>IBU: {beer.ibu}</p>
                  <p>Description: {beer.description}</p>
                  <h3>Food Pairing:</h3>
                  <ul>
                    {beer.food_pairing.map((pairing, index) => (
                      <li key={index}>{pairing}</li>
                    ))}
                  </ul>
                  <p>Brewers Tips: {beer.brewers_tips}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BeerCards;
