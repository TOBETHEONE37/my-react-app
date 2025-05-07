import React from "react";

const zones: number[] = [...Array(16)].map((v, i) => i + 1);

interface Props {
    selectedZones: number[];
    addZone: (zoneId: number) => void;
    addAllZone: (zoneIds: number[]) => void;
}

const ZoneSelector = ({
    selectedZones, addZone, addAllZone
   }: Props)=>  {
    return (
        <div className="p-4 bg-gray-100 rounded-lg">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">지역 선택</h2>
                <button
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition"
                    onClick={() => addAllZone(zones)}
                >
                    전체 선택
                </button>
            </div>

            <div className="grid grid-cols-4 gap-3">
                {zones.map(zoneId => (
                    <button
                        key={zoneId}
                        type="button"
                        onClick={() => addZone(zoneId)}
                        className={`p-4 rounded-md text-center font-medium transition
                          ${selectedZones.indexOf(zoneId) > -1 ? 'bg-blue-500 text-white' : 'bg-white text-gray-800'}
                          hover:bg-blue-100
                        `}
                    >
                        Zone {zoneId}
                    </button>
                ))}
            </div>
            {/* 선택된 값 보여주기 (선택사항) */}
            <div className="mt-4">
                <p className="text-sm text-gray-600">선택한 지역: {selectedZones.join(', ')}</p>
            </div>
        </div>
    );
}
export default ZoneSelector;

