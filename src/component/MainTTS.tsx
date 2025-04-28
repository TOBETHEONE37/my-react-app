import TTSEditor from "./tts/TTSEditor";
import ZoneSelector from "./zone/ZoneSelector";
import {useState} from "react";


const MainTTS = () => {
    const [audioUrl, setAudioUrl] = useState('');
    const [selectedZones, setSelectedZones] = useState<number[]>([]);

    const addZone = (zoneId: number) => {
        const res = [...selectedZones];
        if(res.some(i => i === zoneId )) {
            setSelectedZones(res.filter(i => i !== zoneId ))
        }
        else {
            res.push(zoneId)
            setSelectedZones(res)
        }
    };

    return (
        <div className="p-4 bg-gray-100 min-h-screen">
            <h2 className="text-xl font-bold mb-4">방송 장비 관리 시스템</h2>
            <div className="grid grid-cols-3 gap-4">
                {/* 음원 제어 영역 */}
                <TTSEditor
                    audioUrl={audioUrl}
                    setAudioUrl={setAudioUrl}
                />
                {/* 방송 상태 영역 */}
                <div className="bg-gray-200 rounded-xl p-4 shadow flex items-center justify-center">
                    <div className="text-center">
                        <div className="text-3xl font-bold">BGM</div>
                        <div className="text-sm">방송 상태</div>
                    </div>
                </div>
                <ZoneSelector
                    selectedZones={selectedZones}
                    addZone={addZone}
                />
            </div>

            <div className="mt-4 flex justify-end gap-2">
                <button className="bg-red-500 text-white py-2 px-4 rounded">소방 버튼</button>
                <button className="bg-green-500 text-white py-2 px-4 rounded">시작</button>
                <button className="bg-red-500 text-white py-2 px-4 rounded">종료</button>
            </div>
        </div>
    )
}
export default MainTTS;
