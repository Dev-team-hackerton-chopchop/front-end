import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS 추가
import votecard from '../../assets/images/votecard.png';

export default function ViewandVoting() {
  const [votes, setVotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 서버에서 투표 데이터 불러오기
  useEffect(() => {
    const fetchVotes = async () => {
      try {
        // GET /posts/ API 호출
        const response = await axios.get('http://localhost:8000/posts/');
        setVotes(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load votes');
        setLoading(false);
      }
    };

    fetchVotes();
  }, []);

  // 좋아요 처리 핸들러
  const handleVote = async (id) => {
    try {
      const voteToUpdate = votes.find(vote => vote.pk === id);
      const updatedVote = {
        ...voteToUpdate,
        likes: voteToUpdate.likes + 1,
      };

      // PATCH /posts/{id}/ API 호출 - 좋아요 수 증가
      await axios.patch(`http://localhost:8000/posts/${id}/`, {
        likes: updatedVote.likes,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // 로컬 상태 업데이트
      setVotes(votes.map(vote => (vote.pk === id ? updatedVote : vote)));
    } catch (err) {
      setError('Failed to submit your vote');
    }
  };

  if (loading) {
    return <p>Loading votes...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container mt-5">
      <h2>Available Votes</h2>
      <div className="row">
        {votes.map((vote) => (
          <div className="col-md-4 mb-4" key={vote.pk}>
            <Card>
              <Card.Img variant="top" src={votecard} alt="Vote" /> {/* 이미지 경로 설정 */}
              <Card.Body>
                <Card.Title>{vote.title}</Card.Title>
                <Card.Text>{vote.content}</Card.Text>
                <Button 
                  variant="success" 
                  onClick={() => handleVote(vote.pk)} 
                  className="me-2">
                  Like {vote.likes}
                </Button>
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
