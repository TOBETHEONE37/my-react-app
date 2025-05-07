import TTSEditor from "./tts/TTSEditor";
import ZoneSelector from "./zone/ZoneSelector";
import {useCallback, useEffect, useRef, useState} from "react";
import TTSApi from "../api/tts/TTSApi";
import TTSPreset from "./tts/TTSPreset";
import {Preset} from "../api/tts/Models";
import React from "react";

type type = 'Broadcasts' | 'Emergency' | 'Ready'
const MainTTS = () => {
    const {
        emergency,
        broadcasts,
        stopBroadcasts,
        getPresetList,
        removePreset,
        broadcastsHealthCheck
    } = TTSApi

    // TTS 생성 관련 작업
    const [preset, setPreset] = useState<Preset | null>(null);
    const [flag, setFlag] = useState(false);
    // Zone 관련 작업
    const [selectedZones, setSelectedZones] = useState<number[]>([]);
    // 프리셋 관련 작업
    const [presetList, setPresetList] = useState<Preset[]>([]);
    // 방송 상태 true(방송중) or false(대기중)
    const [isBroadcasts, setIsBroadcasts] = useState<type>('Ready');

    useEffect(() => {
        // 최신 preset 가져오는 작업
        // Multi User Case 고려
        // Single User라면 수정 필요
        getPresetList()
            .then(setPresetList)
            .catch(() => alert("Preset Api Error"))
    }, [flag])

    const fetchHealthCheck = () => {
        broadcastsHealthCheck()
            .then(res => !res && setIsBroadcasts('Ready'))
            .catch(() => alert("Health Check Error"))
    }

    useEffect(() => {
        // 처음 실행 + 1초마다 polling
        const intervalId = setInterval(fetchHealthCheck, 1000);
        return () => clearInterval(intervalId); // cleanup on unmount
    }, []);

    const generatePreset = (preset:Preset) => {
        setFlag(res => !res)
        setPreset(preset)
    }

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

    const addAllZone = (zoneIds: number[]) => {
        let res: number[] = [];
        if(zoneIds.length !== selectedZones.length) {
            res = [...zoneIds]
        }
        setSelectedZones(res);
    }

    const onClickEmergency = () => {
        emergency()
            .then((res) => {
                setIsBroadcasts('Emergency')
                alert(`Emergency ${res}`)
            })
            .catch(() => alert("Emergency Error"))
    }

    const onClickBroadcasts = () => {
        broadcasts(selectedZones, preset)
            .then((res) => {
                setIsBroadcasts('Broadcasts')
                console.log(res)
            })
            .catch(() => alert("Broadcasts Error"))
    }

    const onClickStopBroadcasts = () => {
        stopBroadcasts(selectedZones)
            .then((res) => console.log(res))
            .catch(() => alert("Broadcasts Stop Error"))
    }

    const applyPreset = (preset: Preset) => {
        setPreset(preset)
    }

    const remove = (id: number) => {
        removePreset(id)
            .then(() => {
                if(!!preset && preset.id === id) {
                    setPreset(null)
                }
                const res = [...presetList]
                setPresetList(res.filter(preset=>preset.id !== id))
            })
    }

    return (
        <div className="p-4 bg-gray-100 min-h-screen">
            <div className="mt-4 flex justify-between mb-4">
                <h2 className="text-xl font-bold mb-4">방송 장비 관리 시스템</h2>
                <div className="flex justify-end gap-2">
                    <button
                        className="bg-red-500 text-white py-2 px-4 rounded"
                        onClick={onClickEmergency}
                    >소방 버튼</button>
                    <button
                        className="bg-green-500 text-white py-2 px-4 rounded"
                        onClick={onClickBroadcasts}
                    >시작</button>
                    <button
                        className="bg-red-500 text-white py-2 px-4 rounded"
                        onClick={onClickStopBroadcasts}
                    >종료</button>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
                {/* 음원 제어 영역 */}
                <TTSEditor
                    preset={preset}
                    generatePreset={generatePreset}
                />
                {/* 방송 상태 영역 */}
                <div className="bg-gray-200 rounded-xl p-4 shadow flex items-center justify-center">
                    <div className="text-center">
                        <div className={`text-3xl font-bold ${isBroadcasts !== 'Ready' ? `${isBroadcasts === 'Broadcasts' ? 'text-green-500' : 'text-red-500'} animate-pulse` : 'text-black'}`}>
                            BGM
                        </div>
                        <div className={`text-sm ${isBroadcasts !== 'Ready' ? isBroadcasts === 'Broadcasts' ? 'text-green-500' : 'text-red-500' : 'text-black'}`}>
                            {isBroadcasts ? '방송 중' : '방송 준비중'}
                        </div>
                    </div>
                </div>
                <ZoneSelector
                    selectedZones={selectedZones}
                    addZone={addZone}
                    addAllZone={addAllZone}
                />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4">
                {/* 프리셋 영역 */}
                <TTSPreset
                    selectedPreset={preset}
                    presetList={presetList}
                    applyPreset={applyPreset}
                    removePreset={remove}
                />
            </div>
        </div>
    )
}
export default MainTTS;
