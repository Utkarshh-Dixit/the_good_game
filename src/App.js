import React from 'react';
import './App.css';
import BeerCards from './BeerCards';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Beer Catalog</h1>
      </header>
      <main>
        <BeerCards />
      </main>
    </div>
  );
}

export default App;
