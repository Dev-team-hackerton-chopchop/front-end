import React, { useEffect, useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function HomePage() {
  const [walletAddress, setWalletAddress] = useState('');

  useEffect(() => {
    // 사용자 프로필 정보를 가져오는 API 호출
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://your-api-domain/users/profile/'); // API URL을 실제 값으로 변경하세요
        if (response.status === 200) {
          setWalletAddress(response.data.xrpl_wallet_address); // 프로필 데이터에서 지갑 주소를 설정
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

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
      {walletAddress && (
        <div style={{ position: 'absolute', top: '10px', right: '10px', fontSize: '12px', color: 'gray' }}>
          Wallet Address: {walletAddress}
        </div>
      )}
    </>
  );
}


