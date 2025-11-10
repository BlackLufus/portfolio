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
    const [isZoom, setZoom] = useState<boolean>(false);

    const onLeftClick = () => {
        if (index == 0) return;
        if (isZoom) {
            setZoom(!isZoom)
        }
        setIndex(index-1);
    }

    const onRightClick = () => {
        if (index == gallery.length - 1) return;
        if (isZoom) {
            setZoom(!isZoom)
        }
        setIndex(index+1);
    }

    const onZoomClick = () => {
        setZoom(!isZoom)
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
                        onClick={onZoomClick}
                        className={`light_box_overlay_image ${isZoom ? "light_box_zoom_minus" : "light_box_zoom_plus"}`}
                        src={gallery[index].url} 
                        alt="" />
                </div>
            </div>
            <div className="light_box_overlay_close_container">
                <div 
                    className="light_box_overlay_close"
                    onClick={onClose}>
                </div>
                <div 
                    className="light_box_overlay_left"
                    onClick={onLeftClick}/>
                <div 
                    className="light_box_overlay_right" 
                    onClick={onRightClick} />
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