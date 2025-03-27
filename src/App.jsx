import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('https://my-backend-production-72f8.up.railway.app/') // 🚩 백엔드 URL 넣기
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        console.error('API 호출 중 오류 발생:', error);
      });
  }, []);

  return (
    <div>
      <h1>백엔드에서 받아온 메시지:</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;
