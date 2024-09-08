// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ExplorePage from './components/ExplorePage';
import FilterCard from './components/FilterCard';
import CardDetails from './components/CardDetails';
import ListPage from './components/ListPage';
import AIChallenege from './components/AIChallenege';
import EditCardForm from './components/EditCardForm';
import { filterCard } from './lib/FilterCardData';
import CreateChallengeForm from './components/CreateChallengeForm';

function App() {
  const [filters, setFilters] = useState({ status: 'all', level: 'all' });
  const [cards, setCards] = useState(filterCard);

  const updateCards = (updatedCard) => {
    const updatedCards = cards.map((card) => (card.id === updatedCard.id ? updatedCard : card));
    setCards(updatedCards);
  };

  const addChallenge = (newChallenge) => {
    const challengeWithDefaultStatus = {
      ...newChallenge,
      status: 'upcoming', // Set default status
    };
    setCards((prevCards) => [...prevCards, challengeWithDefaultStatus]);
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
          <Route path="/create-challenge" element={<CreateChallengeForm addChallenge={addChallenge} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
