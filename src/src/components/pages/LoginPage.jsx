import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../App.css';
import BackgroundImage from '../../assets/images/background-img2.png';

export default function SignInPage() {
  const navigate = useNavigate();

  // 폼 데이터를 상태로 관리
  const [formData, setFormData] = useState({
    username: '',
    password: '',
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

    try {
      // 서버에서 저장된 사용자 정보 불러오기
      const response = await axios.get('http://127.0.0.1:8000/users/'); // 등록된 사용자 목록을 가져옴

      const users = response.data; // 사용자 데이터
      const user = users.find(
        (u) => u.username === formData.username && u.password === formData.password
      );

      if (user) {
        // 로그인 성공 시 홈 페이지로 이동
        navigate('/home');
      } else {
        // 사용자 정보가 일치하지 않는 경우
        setError('잘못된 사용자 이름 또는 비밀번호입니다.');
      }
    } catch (error) {
      // 오류 처리
      setError('로그인 요청 중 오류가 발생했습니다.');
      console.error('로그인 요청 중 오류가 발생했습니다.', error);

      if (error.response && error.response.data && error.response.data.detail) {
        setError(error.response.data.detail);
      } else {
        setError('서버에 문제가 발생했습니다.');
      }
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

  return (
    <div style={headerStyle} className="text-center">
      <h2>Sign in to us</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <p>
          <label>Username</label>
          <br />
          <input
            type="text"
            name="username"
            value={formData.username}
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
          <button id="sub_btn" type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </p>
      </form>
      <footer>
        <p>
          First time? <Link to="/register">Create an account</Link>.
        </p>
        <p>
          <Link to="/">Back to Homepage</Link>.
        </p>
      </footer>
    </div>
  );
}
