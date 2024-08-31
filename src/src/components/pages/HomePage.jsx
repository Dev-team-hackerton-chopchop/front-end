import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <>
      <div className="text-center">
        <h1 className="main-title home-page-title">Web3 Voting system</h1>
      </div>
      <Nav
        activeKey="/home"
        className="justify-content-center"
        style={{ marginBottom: '20px' }}
      >
        <Nav.Item>
          <Nav.Link as={Link} to="/">Logout</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/create">Create vote</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/View">Cast vote</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/close">View closed vote</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/Transaction">XRP transaction view</Nav.Link>
        </Nav.Item>
      </Nav>
      <div className="text-center" style={{ marginTop: '20px' }}>
        <p style={{ fontSize: '14px', color: 'black', fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
          This is an innovative voting system using XRP. Our goal is to have transparency, security, and global accessibility as a new voting system using blockchain.
        </p>
      </div>
    </>
  );
}



