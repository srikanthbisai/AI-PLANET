import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ExplorePage from './components/ExplorePage';
import FilterCard from './components/FilteredCards';
import CardDetails from './components/CardDetails';
import ListPage from './components/ListPage';
import AIChallenege from './components/AIChallenege';
import EditCardForm from './components/EditCardForm';
import CreateChallengeForm from './components/CreateChallengeForm';
import { filterCard } from './lib/filterCardData'; // This import seems not to be necessary, adjust as needed


function App() {
  const [filters, setFilters] = useState({ status: 'all', level: 'all' });
  const [cards, setCards] = useState(filterCard); // Initializing with the existing JSON card data

  const updateCards = (updatedCard) => {
    const updatedCards = cards.map((card) => (card.id === updatedCard.id ? updatedCard : card));
    setCards(updatedCards);
  };

  const addChallenge = (newChallenge) => {
    setCards((prevCards) => [...prevCards, newChallenge]); // Add new challenge to the cards array
  };

  const deleteCard = (id) => {
    setCards((prevCards) => prevCards.filter((card) => card.id !== id)); // Remove card with the specified ID
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
          <Route path="/card/:id" element={<CardDetails cards={cards} deleteCard={deleteCard} />} />
          <Route path="/card/:id/edit" element={<EditCardForm cards={cards} updateCards={updateCards} />} />
          <Route path="/create-challenge" element={<CreateChallengeForm addChallenge={addChallenge} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
