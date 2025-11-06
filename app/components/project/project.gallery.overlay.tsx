import { Key, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { GalleryData } from "./project.details";

interface LightBoxOverlayProbs {
    gallery: Array<GalleryData>;
    start: number;
    onClose: () => void;
}

export default function LightBoxOverlay( {start, gallery, onClose}: LightBoxOverlayProbs) {

    const [index, setIndex] = useState(start);

    const onLeftClick = () => {
        if (index == 0) return;
        setIndex(index-1);
    }

    const onRightClick = () => {
        if (index == gallery.length - 1) return;
        setIndex(index+1);
    }

    const onKeydown = (e: KeyboardEvent) => {
        e.preventDefault();
        if (e.key == "ArrowLeft") {
            onLeftClick();
        }
        else if (e.key == "ArrowRight") {
            onRightClick();
        }
        else if (e.key == "Escape") {
            onClose();
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', onKeydown);

        return () => window.removeEventListener('keydown', onKeydown);
    });

    return createPortal(

        <div className="light_box_overlay_wrapper">
            <div className="light_box_overlay_content">
                <div className="light_box_overlay_image_container">
                    <img 
                        className="light_box_overlay_image" 
                        src={gallery[index].url} 
                        alt="" />
                    <div 
                        className="light_box_overlay_left"
                        onClick={onLeftClick} />
                    <div 
                        className="light_box_overlay_right" 
                        onClick={onRightClick} />
                </div>
            </div>
            <div className="light_box_overlay_close_container">
                <div 
                    className="light_box_overlay_close"
                    onClick={onClose}>
                </div>
            </div>
            <div className="light_box_overlay_description_container">
                <span className="light_box_overlay_description">
                    {gallery[index].description}
                </span>
            </div>
        </div>,
        document.body
    )
}