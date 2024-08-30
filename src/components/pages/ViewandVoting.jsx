import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS 추가
import votecard from '../../assets/images/votecard.png'

export default function ViewandVoting() {
  const [votes, setVotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 서버에서 투표 데이터 불러오기
  useEffect(() => {
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

    fetchVotes();
  }, []);

  // 투표 처리 핸들러
  const handleVote = async (id, type) => {
    try {
      const voteToUpdate = votes.find(vote => vote.pk === id);
      const updatedVote = {
        ...voteToUpdate,
        likes: type === 'agree' ? voteToUpdate.likes + 1 : voteToUpdate.likes,
        dislikes: type === 'disagree' ? voteToUpdate.dislikes + 1 : voteToUpdate.dislikes,
      };

      await axios.patch(`http://localhost:8000/posts/${id}/`, {
        likes: updatedVote.likes,
        dislikes: updatedVote.dislikes
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setVotes(votes.map(vote => (vote.pk === id ? updatedVote : vote)));
    } catch (err) {
      setError('Failed to submit your vote');
    }
  };

  // 투표 마감 여부를 확인하는 함수
  const isVoteClosed = (endDate) => {
    const now = new Date();
    const voteEndDate = new Date(endDate);
    return now > voteEndDate;
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
                {!isVoteClosed(vote.end_date) && (
                  <div>
                    <Button variant="success" onClick={() => handleVote(vote.pk, 'agree')} className="me-2">
                      Like {vote.likes}
                    </Button>
                    <Button variant="danger" onClick={() => handleVote(vote.pk, 'disagree')}>
                      Dislike {vote.dislikes}
                    </Button>
                  </div>
                )}
                {isVoteClosed(vote.end_date) && (
                  <p>Vote has ended.</p>
                )}
                <Card.Footer className="text-muted">
                  Ends on: {new Date(vote.end_date).toLocaleString()}
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
