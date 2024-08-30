import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import axios from 'axios';

import '../../App.css';

export default function CreateVote() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [publishedDate, setPublishedDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [nickname, setNickname] = useState('');
  const [department, setDepartment] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);

    // Profile data as JSON string
    const profileData = JSON.stringify({
      nickname: nickname,
      department: department,
    });
    formData.append('profile', profileData);

    if (image) {
      formData.append('image', image);
    }
    formData.append('published_date', publishedDate);
    formData.append('end_date', endDate);

    try {
      const response = await axios.post('http://localhost:8000/posts/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        navigate('/Middle');
      } else {
        setError('Failed to create vote.');
      }
    } catch (error) {
      console.error('Error creating vote:', error);
      setError('Error creating vote.');
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

      <Row className="mt-3">
        <Col className="custom-col">
          <Form.Group controlId="formNickname">
            <Form.Label>Nickname:</Form.Label>
            <Form.Control 
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="Enter your nickname"
              required
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col className="custom-col">
          <Form.Group controlId="formDepartment">
            <Form.Label>Department:</Form.Label>
            <Form.Control 
              type="text"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              placeholder="Enter your department"
              required
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col className="custom-col">
          <Form.Group controlId="formImage">
            <Form.Label>Image:</Form.Label>
            <Form.Control 
              type="file"
              onChange={handleImageChange}
              accept="image/*"
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col className="custom-col">
          <Form.Group controlId="formPublishedDate">
            <Form.Label>Published Date:</Form.Label>
            <Form.Control 
              type="datetime-local"
              value={publishedDate}
              onChange={(e) => setPublishedDate(e.target.value)}
              required
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col className="custom-col">
          <Form.Group controlId="formEndDate">
            <Form.Label>End Date:</Form.Label>
            <Form.Control 
              type="datetime-local"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
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