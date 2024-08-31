import React from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="text-center">
      <h1 className="main-title home-page-title">Web3 Voting system</h1>
      <Link to="/create">
        <button className="primary-button">create vote</button>
      </Link>
    </div>
  );
}
