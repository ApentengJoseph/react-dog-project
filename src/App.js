import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [dogs, setDogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [breed, setBreed] = useState('');
  const [allBreeds, setAllBreeds] = useState([]);

  useEffect(() => {
    fetchBreeds();
    fetchRandomDogs();
  }, []);

  const fetchBreeds = async () => {
    try {
      const response = await axios.get('https://dog.ceo/api/breeds/list/all');
      setAllBreeds(Object.keys(response.data.message));
    } catch (error) {
      setError('Failed to fetch breeds');
    }
  };

  const fetchRandomDogs = async () => {
    try {
      const response = await axios.get('https://dog.ceo/api/breeds/image/random/25');
      setDogs(response.data.message);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch dog images');
      setLoading(false);
    }
  };

  const fetchDogsByBreed = async (breed) => {
    if (!breed) return;
    setLoading(true);
    try {
      const response = await axios.get(`https://dog.ceo/api/breed/${breed}/images`);
      setDogs(response.data.message);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch dog images because they were not compitable');
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchDogsByBreed(breed);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container">
      <h1>Dog Images</h1>
      <div className="search-container">
        <input
          type="text"
          list="breeds"
          placeholder="Enter breed"
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
        />
        <datalist id="breeds">
          {allBreeds.map((breed, index) => (
            <option key={index} value={breed} />
          ))}
        </datalist>
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="grid-container">
        {dogs.map((dog, index) => (
          <div className="grid-item" key={index}>
            <img src={dog} alt="Dog" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
