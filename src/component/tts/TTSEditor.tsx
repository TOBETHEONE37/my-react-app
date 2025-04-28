import {useState} from "react";
import axios from "axios";
import TTSApi from "../../api/tts/TTSApi";

interface Props {
    audioUrl: string;
    setAudioUrl: (audioUrl: string) => void;
}

const TTSEditor = ({
    audioUrl, setAudioUrl
                   }: Props) => {
    const { generateTtsFile } = TTSApi;
    const [text, setText] = useState('');

    const generateSpeech = () => {
        generateTtsFile(text)
            .then(setAudioUrl)
            .catch((error) => alert('TTS 생성 중 오류가 발생했습니다.'));
    };

    return (
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
            {audioUrl && audioUrl !== '' && (
                <audio controls src={audioUrl} className="mt-2 w-full" />
            )}
        </div>
    )
}
export default TTSEditor;
