import React from 'react'
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import {WindowControls} from "#components/index.js";
import {photosLinks, gallery} from "#constants/index.js";
import useWindowStore from "#store/window.js";


const Photos = () => {
    const { openWindow } = useWindowStore();

    const openImage = (item) => {
        if(!item) return;
        const { id, img } = item;
        openWindow("imgfile", { name: `Photo ${id}`, imageUrl: img });
    }

    return <>
        <div id="window-header">
            <WindowControls target="photos"/>
            <h2 className="font-bold text-sm text-center w-full">Photos</h2>
        </div>

        <div className="flex bg-white h-full">
            <aside className="sidebar">
                <h2>Photos</h2>
                <ul>
                    {photosLinks.map(({id, icon, title}) => (
                        <li key={id}>
                            <img src={icon} alt={title} />
                            <p>{title}</p>
                        </li>
                    ))}
                </ul>
            </aside>

            <section className="gallery flex-1">
                <ul>
                    {gallery.map((item) => (
                        <li key={item.id} onClick={() => openImage(item)}>
                            <img src={item.img} alt={`Photo ${item.id}`} />
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    </>
}

const PhotosWindow = WindowWrapper(Photos , "photos");
export default PhotosWindow;
