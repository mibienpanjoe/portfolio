import React from 'react'
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import {WindowControls} from "#components/index.js";
import useWindowStore from "#store/window.js";


const Text = () => {
    const { windows } = useWindowStore();
    const data = windows?.txtfile?.data;

    if (!data) return null;

    const { name, image, subtitle, description } = data;

    return <>
        <div id="window-header">
            <WindowControls target="txtfile"/>
            <h2>{name}</h2>
        </div>

        <div className="p-4 space-y-4 bg-white">
            {image && (
                <div className="w-full flex justify-center">
                    <img src={image} alt={name} className="w-40 h-40 object-cover rounded-lg"/>
                </div>
            )}

            {subtitle && <p className="text-sm text-gray-600 text-center">{subtitle}</p>}

            <div className="space-y-3">
                {Array.isArray(description) && description.map((para, idx) => (
                    <p key={idx} className="text-sm leading-6 text-gray-800">{para}</p>
                ))}
            </div>
        </div>
    </>
}

const TextWindow = WindowWrapper(Text , "txtfile");
export default TextWindow;
