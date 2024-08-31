import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS 추가

export default function Closedvote() {
  const [votes, setVotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 서버에서 투표 데이터 불러오기
  const fetchVotes = async () => {
    try {
      const response = await axios.get('http://localhost:8000/posts/');
      setVotes(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load votes');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVotes();

    // 일정 간격으로 데이터 갱신
    const interval = setInterval(fetchVotes, 10000); // 10초마다 데이터 갱신

    return () => clearInterval(interval); // 컴포넌트가 언마운트될 때 간격 제거
  }, []);

  // 투표 마감 여부를 확인하는 함수
  const isVoteClosed = (endDate) => {
    const now = new Date();
    const voteEndDate = new Date(endDate);
    return now > voteEndDate;
  };

  if (loading) {
    return <p>Loading vote results...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container mt-5">
      <h2>Vote Results</h2>
      <div className="row">
        {votes.filter(vote => isVoteClosed(vote.end_date)).map((vote) => (
          <div className="col-md-4 mb-4" key={vote.pk}>
            <Card>
              <Card.Body>
                <Card.Title>{vote.title}</Card.Title>
                <Card.Text>{vote.content}</Card.Text>
                <Card.Text>Likes: {vote.likes}</Card.Text>
                <Card.Text>Dislikes: {vote.dislikes}</Card.Text>
                <Card.Footer className="text-muted">
                  Ended on: {new Date(vote.end_date).toLocaleString()}
                </Card.Footer>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

      <footer className="mt-5">
        <Link to="/home">Back to Homepage</Link>
      </footer>
    </div>
  );
}
