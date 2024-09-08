import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ExplorePage from './components/ExplorePage';
import FilterCard from './components/FilterCard';
import CardDetails from './components/CardDetails'; // Import the new component
import ListPage from './components/ListPage';
import AIChallenege from './components/AIChallenege';
import EditCardForm from './components/EditCardForm'; // Import the edit form
import { filterCard } from './lib/FilterCardData'; // Import the cards data

function App() {
  const [filters, setFilters] = useState({ status: 'all', level: 'all' });
  const [cards, setCards] = useState(filterCard); // Use the imported card data

  const updateCards = (updatedCard) => {
    // Update the cards array when the card is edited
    const updatedCards = cards.map((card) => (card.id === updatedCard.id ? updatedCard : card));
    setCards(updatedCards);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <ListPage />
                <AIChallenege />
                <ExplorePage setFilters={setFilters} />
                <FilterCard filters={filters} cards={cards} />
              </>
            }
          />
          <Route path="/card/:id" element={<CardDetails cards={cards} />} />
          <Route path="/card/:id/edit" element={<EditCardForm cards={cards} updateCards={updateCards} />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
