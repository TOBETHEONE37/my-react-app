import React from "react";
import {Preset} from "../../api/tts/Models";

interface Props {
    selectedPreset: Preset | null;
    presetList: Preset[];
    applyPreset: (preset: Preset) => void;
    removePreset: (id: number) => void;
}

const TTSPreset = ({
    selectedPreset,
    presetList,
    applyPreset,
    removePreset
                   }: Props) => {
    return (
        <div className="bg-gray-200 rounded-xl p-4 shadow">
            <h3 className="font-semibold mb-2">저장된 프리셋</h3>
            <div className="h-[400px] overflow-auto">
                <div className="grid grid-cols-4 gap-0 border border-gray-300">
                    <div className="font-semibold p-2 border-r border-b text-center">Id</div>
                    <div className="col-span-2 font-semibold p-2 border-r border-b text-center">Text</div>
                    <div className="font-semibold p-2 border-b text-center">버튼</div>
                    {presetList.map((preset) => {
                        const isSelected = selectedPreset?.id === preset.id
                        return (
                            <>
                                <div key={preset.id} className="p-2 border-r text-center">
                                    {preset.id}
                                </div>
                                <div className="col-span-2 p-2 border-r text-center">
                                    {preset.text}
                                </div>
                                <div className="p-2 text-center">
                                    <button
                                        className={" text-white py-1 px-3 rounded transition" + (isSelected ? ' bg-gray-700' : ' bg-blue-500 hover:bg-blue-600') }
                                        disabled={isSelected}
                                        onClick={() => applyPreset(preset)}
                                    >
                                        적용
                                    </button>
                                    <button
                                        className={" text-white py-1 px-3 rounded transition bg-red-500 hover:bg-red-600 ml-1" }
                                        onClick={() => removePreset(preset.id)}
                                    >
                                        X
                                    </button>
                                </div>
                            </>
                        )
                    })}
                </div>
            </div>
        </div>

    )
}
export default TTSPreset;
