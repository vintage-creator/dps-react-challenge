import React from 'react';
import dpsLogo from './assets/DPS.svg';
import './App.css';
import NameFilter from './NameFilter';
import CityFilter from './CityFilter';
import HighlightOldest from './HighlightOldest';
import { useUserData } from './useUserData';
import { formatDate } from './utils';

const App: React.FC = () => {
  const {
    filteredUsers,
    setNameFilter,
    setCityFilter,
    setHighlightOldest,
    cities,
    loading,
    error,
    getUsers,
  } = useUserData();

  const handleCityChange = (city: string) => {
    if (city === 'Select City') {
      setCityFilter('');
      getUsers();
    } else {
      setCityFilter(city);
    }
  };

  return (
    <>
      <div>
        <a href="https://www.digitalproductschool.io/" target="_blank" rel="noopener noreferrer">
          <img src={dpsLogo} className="logo" alt="DPS logo" />
        </a>
      </div>
      <div className="home-card">
        <div className="filter-container">
          <NameFilter onFilterChange={setNameFilter} />
          <CityFilter cities={cities} onCityChange={handleCityChange} />
          <HighlightOldest onHighlightChange={setHighlightOldest} />
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div className="table-wrapper">
            <table className="user-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>City</th>
                  <th>Birthday</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className={user.isOldest ? 'highlight' : ''}>
                    <td>
                      {user.firstName} {user.lastName}
                    </td>
                    <td>{user.city}</td>
                    <td>{formatDate(user.birthDate)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default App;
