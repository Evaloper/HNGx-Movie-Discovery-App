import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '../../atoms/Icons';
import './index.scss';
import logo from './../../../assets/tv.png';

const apiUrl = 'https://api.themoviedb.org/3';
const apiKey = import.meta.env.VITE_API_KEY;

export const NavBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (searchQuery === '') {
      setShowSuggestions(false);
      return;
    }

    const timer = setTimeout(async () => {
      const response = await fetch(
        `${apiUrl}/search/movie?api_key=${apiKey}&query=${searchQuery}`
      );
      const data = await response.json();
      setSearchResults(data.results);
      setShowSuggestions(true);
    }, 300); // Adjust the debounce delay as needed (e.g., 300ms)

    return () => clearTimeout(timer); // Clear the timer on unmount and input changes
  }, [searchQuery]);

  const handleClick = () => {
    window.location.reload();
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <nav className="navbar flex justify-between items-center mx-24 max-[980px]:mx-10 max-[500px]:mx-4 ">
        <Link className="logo flex items-center" onClick={handleClick} to="/">
          <img src={logo} alt="MovieBox Logo" />
          <p className="logo-name">MovieBox</p>
        </Link>
        <div className="search">
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              type="search"
              placeholder="What do you want to watch"
              className="input"
              id="search"
              value={searchQuery}
              onChange={handleInputChange}
            />
          </form>
          <Icon name="search" className="search-icon " />
          <div className='search-result-container'>
            {showSuggestions && (
              <div className="search-results">
                {searchResults.map((movie) => (
                  <Link
                    key={movie.id}
                    to={`/movies/${movie.id}`}
                    className="search-result flex"
                    rel="noopener noreferrer"
                  >
                    <div className="search-result-content">
                      <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        className="search-result-image"
                      />
                      <div className='search-result-details'>
                        <h2>{movie.title}</h2>
                        <p>{movie.release_date}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="signin-menu flex items-center">
          <p className="sign-in">Sign in</p>
          <Icon name="menu" />
        </div>
      </nav>
    </>
  );
};
