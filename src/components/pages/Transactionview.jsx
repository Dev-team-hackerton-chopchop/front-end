import React from 'react';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS 추가

export default function VoteTable() {
  return (
    <div className="container mt-5">
      <h1 style={{ textAlign: 'left', fontSize: '36px', fontWeight: 'bold' }}>Trust + BY RIPPLE</h1>
      <Table striped bordered hover className="mt-4">
        <thead>
          <tr style={{ backgroundColor: 'skyblue', fontWeight: 'bold', color: 'black' }}>
            <th>#</th>
            <th>Timestamp</th>
            <th>From</th>
            <th>To</th>
            <th>Memo</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>2024-08-30 12:34:56</td>
            <td>John Doe</td>
            <td>Jane Smith</td>
            <td>First Vote</td>
          </tr>
          <tr>
            <td>2</td>
            <td>2024-08-30 13:22:45</td>
            <td>Emily Johnson</td>
            <td>Michael Brown</td>
            <td>Second Vote</td>
          </tr>
          <tr>
            <td>3</td>
            <td>2024-08-30 14:15:32</td>
            <td>Chris Evans</td>
            <td>Natasha Romanoff</td>
            <td>Third Vote</td>
          </tr>
        </tbody>
      </Table>
      <footer className="mt-5">
        <Link to="/home">Back to Homepage</Link>
      </footer>
    </div>
  );
}
