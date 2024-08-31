import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import axios from 'axios';

import '../../App.css';

export default function CreateVote() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setLoading(true);
    setError('');

    const voteData = {
      title: title,
      content: content,
    };

    try {
      // Step 1: Create a post and get the post_id from the response
      const postResponse = await axios.post('http://localhost:8000/posts/', voteData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (postResponse.status === 201) {
        const postId = postResponse.data.id; // Assuming the API returns the new post ID

        // Step 2: Use the post_id to register a vote
        const voteResponse = await axios.post(`http://localhost:8000/posts/posts/${postId}/vote/`, {}, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (voteResponse.status === 201) {
          navigate('/Middle');
        } else {
          setError('Failed to register vote.');
        }
      } else {
        setError('Failed to create post.');
      }
    } catch (error) {
      console.error('Error creating post or vote:', error);
      setError('Error creating post or vote.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="custom-container">
      <h2>Create a New Vote</h2>

      {error && <p className="error">{error}</p>}

      <Row>
        <Col className="custom-col">
          <Form.Group controlId="formTitle">
            <Form.Label>Title:</Form.Label>
            <Form.Control 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter vote title" 
              required
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col className="custom-col">
          <Form.Group controlId="formContent">
            <Form.Label>Content:</Form.Label>
            <Form.Control 
              as="textarea" 
              rows={3}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter vote content" 
              required
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col className="custom-col">
          <Button 
            variant="primary" 
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Vote'}
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
