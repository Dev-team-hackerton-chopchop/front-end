const handleSubmit = async (e) => {
  e.preventDefault(); // 페이지 리로드 방지
  setLoading(true); // 로딩 상태 활성화
  setError(''); // 이전 오류 상태 초기화

  try {
    // 로그인 API 요청 보내기 (경로 수정)
    const response = await axios.post('http://127.0.0.1:8000/auth/login/', {
      username: formData.username,
      password: formData.password,
    });

    if (response.status === 201) {
      // 로그인 성공 시 토큰 저장 (예시)
      const token = response.data.token;
      localStorage.setItem('authToken', token);

      // 홈 페이지로 이동
      navigate('/home');
    } else {
      // 다른 상태 코드에 대한 처리
      setError('로그인에 실패했습니다.');
    }
  } catch (error) {
    // 오류 처리
    setError('로그인 요청 중 오류가 발생했습니다.');
    console.error('로그인 요청 중 오류가 발생했습니다.', error);

    // 서버에서 반환된 오류 메시지 처리 (예시)
    if (error.response && error.response.data && error.response.data.detail) {
      setError(error.response.data.detail);
    } else {
      setError('서버에 문제가 발생했습니다.');
    }
  } finally {
    setLoading(false); // 로딩 상태 비활성화
  }
};
