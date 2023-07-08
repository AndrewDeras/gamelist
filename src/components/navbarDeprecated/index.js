import React from 'react';

const Navbar = ({ selectedGenre, handleGenreChange, handleSearch, searchQuery, handleSearchQueryChange, uniqueGenres }) => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a href='/' className="navbar-brand">Free Games To Play</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <select className="form-select" value={selectedGenre} onChange={handleGenreChange}>
                <option value="">All genres</option>
                {uniqueGenres.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
            </li>
          </ul>
          <form onSubmit={handleSearch} className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search by title"
              aria-label="Search"
              value={searchQuery}
              onChange={handleSearchQueryChange}
            />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
  );
};

