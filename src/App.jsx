import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [text, setText] = useState('');
  const [audioUrl, setAudioUrl] = useState('');

  const generateSpeech = () => {
    axios.post('https://my-backend-production-72f8.up.railway.app/tts/', { text })
      .then(response => {
        const fullAudioUrl = `https://my-backend-production-72f8.up.railway.app${response.data.audio_url}`;
        setAudioUrl(fullAudioUrl);
      })
      .catch(error => {
        console.error('TTS 생성 중 에러:', error);
      });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>TTS 방송 장비 테스트</h2>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={5}
        placeholder="여기에 음성으로 변환할 텍스트를 입력하세요."
        style={{ width: '100%', padding: '10px' }}
      />
      <br />
      <button onClick={generateSpeech}>음성 생성하기</button>

      {audioUrl && (
        <div>
          <h4>생성된 음성 듣기:</h4>
          <audio controls src={audioUrl}>
            이 브라우저는 오디오 재생을 지원하지 않습니다.
          </audio>
        </div>
      )}
    </div>
  );
}

export default App;
