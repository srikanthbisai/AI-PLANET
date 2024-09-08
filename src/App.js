import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ExplorePage from './components/ExplorePage';
import FilterCard from './components/FilterCard';
import CardDetails from './components/CardDetails'; // Import the new component
import ListPage from './components/ListPage';
import AIChallenege from './components/AIChallenege';

function App() {
  const [filters, setFilters] = useState({ status: 'all', level: 'all' });

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <>
              <ListPage/>
              <AIChallenege/>
                <ExplorePage setFilters={setFilters} />
                <FilterCard filters={filters} />
              </>
            }
          />
          {/* Define the route for the card details page */}
          <Route path="/card/:id" element={<CardDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
