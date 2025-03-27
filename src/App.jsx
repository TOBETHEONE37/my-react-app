import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [text, setText] = useState('');
  const [audioUrl, setAudioUrl] = useState('');

  const generateSpeech = () => {
    axios
      .post('https://my-backend-production-72f8.up.railway.app/tts/', { text })
      .then((response) => {
        const fullAudioUrl = `https://my-backend-production-72f8.up.railway.app${response.data.audio_url}`;
        setAudioUrl(fullAudioUrl);
      })
      .catch((error) => {
        alert('TTS 생성 중 오류가 발생했습니다.');
      });
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h2 className="text-xl font-bold mb-4">방송 장비 관리 시스템</h2>

      <div className="grid grid-cols-3 gap-4">
        {/* 음원 제어 영역 */}
        <div className="bg-gray-200 rounded-xl p-4 shadow">
          <h3 className="font-semibold mb-2">음원 제어</h3>
          <textarea
            className="w-full rounded p-2 text-white"
            rows={4}
            placeholder="방송할 내용을 입력"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            className="mt-2 bg-blue-500 text-white py-2 px-4 rounded"
            onClick={generateSpeech}
          >
            TTS 방송하기
          </button>
          {audioUrl && (
            <audio controls src={audioUrl} className="mt-2 w-full" />
          )}
        </div>

        {/* 방송 상태 영역 */}
        <div className="bg-gray-200 rounded-xl p-4 shadow flex items-center justify-center">
          <div className="text-center">
            <div className="text-3xl font-bold">BGM</div>
            <div className="text-sm">방송 상태</div>
          </div>
        </div>

        {/* 지역 선택 영역 */}
        <div className="bg-gray-200 rounded-xl p-4 shadow grid grid-cols-4 gap-2">
          <h3 className="col-span-4 font-semibold">지역 선택</h3>
          {[...Array(16)].map((_, i) => (
            <button key={i} className="bg-white rounded py-2 px-1 shadow">
              Zone {i + 1}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 flex justify-end gap-2">
        <button className="bg-green-500 text-white py-2 px-4 rounded">시작</button>
        <button className="bg-red-500 text-white py-2 px-4 rounded">종료</button>
      </div>
    </div>
  );
}

export default App;
