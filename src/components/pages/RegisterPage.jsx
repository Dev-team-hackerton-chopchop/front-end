import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../App.css';
import BackgroundImage from '../../assets/images/background-img3.png';

export default function SignUpPage() {
  const navigate = useNavigate();

  // 폼 데이터를 상태로 관리
  const [formData, setFormData] = useState({
    username: '', // 필드 이름을 'first_name'에서 'username'으로 변경
    email: '',
    password: '',
    password2: '', // 비밀번호 확인용 필드
    xrpl_wallet_address: '', // 지갑 주소 필드
  });

  // 로딩 및 오류 상태 관리
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // 입력값이 변경될 때 상태 업데이트
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault(); // 페이지 리로드 방지
    setLoading(true); // 로딩 상태 활성화
    setError(''); // 이전 오류 상태 초기화

    // 비밀번호와 비밀번호 확인이 일치하는지 확인
    if (formData.password !== formData.password2) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }

    try {
      // API 요청 보내기
      const response = await axios.post('http://your-api-domain/users/register/', {
        username: formData.username, // 필드 이름 수정
        email: formData.email,
        password: formData.password,
        password2: formData.password2, // 비밀번호 확인용 필드 전달
        xrpl_wallet_address: formData.xrpl_wallet_address, // 지갑 주소 전달
      });

      if (response.status === 201) {
        // 회원가입 성공 시 홈 페이지로 이동
        navigate('/home');
      } else {
        // 다른 상태 코드에 대한 처리
        setError(`회원가입에 실패했습니다. 상태 코드: ${response.status}`);
      }
    } catch (error) {
      // 오류 처리
      setError(`회원가입 요청 중 오류가 발생했습니다: ${error.response?.data?.detail || error.message}`);
      console.error('회원가입 요청 중 오류가 발생했습니다.', error);
    } finally {
      setLoading(false); // 로딩 상태 비활성화
    }
  };

  const headerStyle = {
    width: "100%",
    height: "100vh",
    backgroundImage: `url(${BackgroundImage})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    margin: 0, // 여백 제거
    padding: 0, // 여백 제거
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  };

  const formContainerStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.8)", // 반투명한 흰색 배경
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
  };

  return (
    <div style={headerStyle} className="text-center">
      <div style={formContainerStyle}>
        <h2>Join us</h2>
        <h5>Create your personal account</h5>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <p>
            <label>Username</label>
            <br />
            <input
              type="text"
              name="username" // 필드 이름 수정
              value={formData.username}
              onChange={handleChange}
              required
            />
          </p>
          <p>
            <label>Email address</label>
            <br />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </p>
          <p>
            <label>Password</label>
            <br />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </p>
          <p>
            <label>Confirm Password</label> {/* 비밀번호 확인 필드 */}
            <br />
            <input
              type="password"
              name="password2"
              value={formData.password2}
              onChange={handleChange}
              required
            />
          </p>
          <p>
            <label>XRPL Wallet Address</label> {/* 지갑 주소 필드 */}
            <br />
            <input
              type="text"
              name="xrpl_wallet_address"
              value={formData.xrpl_wallet_address}
              onChange={handleChange}
              required
            />
          </p>
          <p>
            <button id="sub_btn" type="submit" disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </button>
          </p>
        </form>
        <footer>
          <p>
            <Link to="/">Back to Homepage</Link>.
          </p>
        </footer>
      </div>
    </div>
  );
}
