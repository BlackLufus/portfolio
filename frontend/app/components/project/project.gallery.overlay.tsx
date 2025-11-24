import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { setTimeout } from "timers";
import Point from "@/miscs/point";
import { GalleryData } from "./project.details.gallery";

interface LightBoxOverlayProbs {
    gallery: Array<GalleryData>;
    start: number;
    onClose: () => void;
}

enum SliderState {
    LEFT = -1,
    NONE = 0,
    RIGHT = 1
}

export default function LightBoxOverlay( {start, gallery, onClose}: LightBoxOverlayProbs) {

    const zoomImgRef = useRef<HTMLImageElement>(null);
    const imageContainerRef = useRef<HTMLImageElement>(null);
    const [index, setIndex] = useState(start);
    const [translateX, setTranslateX] = useState(0);
    const [translateY, setTranslateY] = useState(0);
    const [scale, setScale] = useState(1);
    const [slideState, setSlideState] = useState(SliderState.NONE);
    const [touchStartX, setTouchStartX] = useState<number>(-1);
    const [touchDeltaX, setTouchDeltaX] = useState(0);

    // General dragging variables
    const [isDragging, setDraggingState] = useState(false);
    const lastCursorX = useRef(0);
    const lastCursorY = useRef(0);
    
    // Variables for touches propose
    const initialDistanceRef = useRef(0);
    const initialScaleRef = useRef(1);
    const lastMidpoint = useRef<Point>(new Point(0, 0));

    // Variables for scale propose
    const SCALE_STEP = 0.13625;
    const MAX_SCALE = SCALE_STEP * 40;
    const MIN_SCALE = 1;

    // Handle on left slide
    const onLeftClick = () => {
        if (slideState != SliderState.NONE || index == 0) return;
        if (scale != 1) {
            setScale(1);
        }
        setSlideState(SliderState.LEFT);
        setTimeout(() => {
            setSlideState(SliderState.NONE);
            setIndex(index-1);
        }, 350);
    }

    // Handle on right slide
    const onRightClick = () => {
        if (slideState != SliderState.NONE || index == gallery.length - 1) return;
        if (scale != 1) {
            setScale(1);
        }
        setSlideState(SliderState.RIGHT);
        setTimeout(() => {
            setSlideState(SliderState.NONE);
            setIndex(index+1);
        }, 350);
    }

    // Handle on zoom
    const onZoom = (value: number) => {
        let newScale = scale + (value < 0 ? SCALE_STEP : -SCALE_STEP);

        if (newScale > MAX_SCALE) newScale = MAX_SCALE;
        if (newScale < MIN_SCALE) newScale = MIN_SCALE;

        setScale(value == 0 ? 1 : newScale);
    }

    // Reference for zoom animtation
    const timeoutRef = useRef<number>(0);

    // Animate zoom when button is pressed.
    const setZoomAnimation = () => {
        const img = zoomImgRef.current;
        if (!img) return;

        img.classList.add("scaling");

        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = window.setTimeout(() => {
            img.classList.remove("scaling");
        }, 350);
    }

    // Get distance between two touches
    const getDistance = (touches: TouchList) => {
        const [a, b] = [touches[0], touches[1]];
        const dx = a.clientX - b.clientX;
        const dy = a.clientY - b.clientY;
        return Math.sqrt(dx*dx + dy*dy);
    };

    // Calculate middle point between two touches
    const getMidpoint = (touches: TouchList) => {
        const x = (touches[0].clientX + touches[1].clientX) / 2;
        const y = (touches[0].clientY + touches[1].clientY) / 2;
        return new Point(x, y);
    };

    const onTouchStart = (e: TouchEvent) => {
        e.preventDefault();

        // How many touches are recognize on screen?
        if (e.touches.length === 1) {
            setTouchStartX(e.touches[0].clientX);
            lastCursorX.current = e.touches[0].clientX;
            lastCursorY.current = e.touches[0].clientY;
            setDraggingState(true);
        } else if (e.touches.length === 2) {
            initialDistanceRef.current = getDistance(e.touches);
            initialScaleRef.current = scale;

            lastMidpoint.current = getMidpoint(e.touches);
            setDraggingState(true);
        }
    };

    // Handle touch move
    const onTouchMove = (e: TouchEvent) => {
        e.preventDefault();

        // How many touches are recognize on screen?
        if (e.touches.length === 1) {

            // When scale is 1 and 
            if (scale == 1 && touchStartX != Infinity) {

                // Get current x position
                const clientX = e.touches[0].clientX;
                setTouchDeltaX(clientX - touchStartX);

                // Check if distance is over threshold
                const threshold = 75;
                if (touchDeltaX > threshold) {
                    onLeftClick();
                    setTouchStartX(Infinity);
                } else if (touchDeltaX < -threshold) {
                    onRightClick();
                    setTouchStartX(Infinity);
                }
            }

            const dx = e.touches[0].clientX - lastCursorX.current;
            const dy = e.touches[0].clientY - lastCursorY.current;
            setTranslate(dx + translateX, dy + translateY);
            lastCursorX.current = e.touches[0].clientX;
            lastCursorY.current = e.touches[0].clientY;
        } else if (e.touches.length === 2) {
            const currentDistance = getDistance(e.touches);
            let newScale = initialScaleRef.current * (currentDistance / initialDistanceRef.current);
            if (newScale > MAX_SCALE) newScale = MAX_SCALE;
            if (newScale < MIN_SCALE) newScale = MIN_SCALE;
            setScale(newScale);

            const currentMid = getMidpoint(e.touches);
            const dx = currentMid.x - lastMidpoint.current.x;
            const dy = currentMid.y - lastMidpoint.current.y;
            setTranslate(dx + translateX, dy + translateY);
            lastMidpoint.current = currentMid;
        }
    };

    // Handle touch end
    const onTouchEnd = (e: TouchEvent) => {
        if (e.touches.length === 0) setDraggingState(false);
        else if (e.touches.length === 1) {
            lastCursorX.current = e.touches[0].clientX;
            lastCursorY.current = e.touches[0].clientY;
        }
        setTouchStartX(Infinity);
        setTouchDeltaX(0);
    };

    // Event on mouse wheel move
    const onMouseWheelMove = (e: WheelEvent) => {
        e.stopPropagation();
        onZoom(e.deltaY);
    }

    // handle mouse down
    const onMouseDown = (e: MouseEvent) => {
        setDraggingState(true);
        lastCursorX.current = e.clientX;
        lastCursorY.current = e.clientY;
    };
    
    // handle mouse move
    const onMouseMove = (e: MouseEvent) => {
        if (!isDragging) return;

        const dx = e.clientX - lastCursorX.current;
        const dy = e.clientY - lastCursorY.current;

        setTranslate(dx + translateX, dy + translateY)

        lastCursorX.current = e.clientX;
        lastCursorY.current = e.clientY;
    }

    // set translate (x and y direction)
    const setTranslate = (x: number, y: number) => {
        const imgContainer = imageContainerRef.current;
        if (!imgContainer) return;

        // Get max width and height
        const maxWidth = imgContainer.clientWidth;
        const maxHeigh = imgContainer.clientHeight;

        const img = zoomImgRef.current;
        if (!img) return;

        // Get img width and height
        const actualWidth = img.getBoundingClientRect().width;
        const actualHeigth = img.getBoundingClientRect().height;

        const maxTranslateX = Math.max((actualWidth - maxWidth) / 2, 0);
        const maxTranslateY = Math.max((actualHeigth - maxHeigh) / 2, 0);

        // console.log(Math.abs(y), "<", maxTranslateY)
        setTranslateX(Math.abs(x) < maxTranslateX ? x : x < 0 ? -maxTranslateX : maxTranslateX)
        setTranslateY(Math.abs(y) < maxTranslateY ? y : y < 0 ? -maxTranslateY : maxTranslateY)
    }

    // Handle on mouse up
    const onMouseUp = () => {
        setDraggingState(false);
    };

    // Handle on key down
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

        const img = zoomImgRef.current;
        if (!img) return;

        img.addEventListener("wheel", onMouseWheelMove, { passive: false });

        img.addEventListener("touchstart", onTouchStart, { passive: false });
        img.addEventListener("touchmove", onTouchMove, { passive: false });
        img.addEventListener("touchend", onTouchEnd);

        img.addEventListener("mousedown", onMouseDown);
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);

        return () => {
            window.removeEventListener('keydown', onKeydown);
            
            img.removeEventListener("wheel", onMouseWheelMove);
            img.removeEventListener("mousedown", onMouseDown);
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);

            img.removeEventListener("touchstart", onTouchStart);
            img.removeEventListener("touchmove", onTouchMove);
            img.removeEventListener("touchend", onTouchEnd);
        }
    });

    useEffect(() => {
        setTranslate(translateX, translateY);
    }, [scale])

    return createPortal(

        <div className="light_box_overlay_wrapper">
            <div className="light_box_overlay_content">
                <div 
                    ref={imageContainerRef}
                    className={`light_box_overlay_image_container ${slideState != SliderState.NONE ? "slide" : ""}`}
                    style={
                            {
                                "--start": "0", 
                                "--stop": slideState == SliderState.LEFT ? "100vw" : "-100vw"
                            } as React.CSSProperties
                        }>
                    <img 
                        ref={zoomImgRef}
                        style={
                            {
                                "--translateX": `${translateX}px`, 
                                "--translateY": `${translateY}px`, 
                                "--scale": `${scale}`,
                            } as React.CSSProperties
                        }
                        className={`light_box_overlay_image ${isDragging ? "dragging" : ""}`}
                        src={gallery[index].url} 
                        alt="" />
                </div>
                { slideState != SliderState.NONE && (<div 
                    className="light_box_overlay_image_container slide"
                    style={
                            {
                                // Move from 
                                "--start": slideState == SliderState.LEFT ? "-100vw" : "100vw", 
                                "--stop": "0"
                            } as React.CSSProperties
                        }>
                    <img 
                        className={`light_box_overlay_image ${isDragging ? "dragging" : ""}`}
                        src={gallery[(slideState == SliderState.LEFT ? index-1 : index+1)].url} 
                        alt="" />
                </div>)}
            </div>
            <div className="light_box_overlay_close_container">
                <div className="light_box_overlay_counter">
                    <span className="light_box_overlay_counter_text">
                        {index + 1}/{gallery.length}
                    </span>
                </div>
                <div className="light_box_overlay_zoom_bar">
                    <div
                        className="light_box_overlay_zoom" 
                        onClick={() => {
                            setZoomAnimation();
                            setTranslateX(0);
                            setTranslateY(0);
                            onZoom(1);
                        }}>
                        <svg width="30px" height="30px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16 0c8.844 0 16 7.156 16 16s-7.156 16-16 16-16-7.156-16-16 7.156-16 16-16zM16 30.031c7.719 0 14-6.313 14-14.031s-6.281-14-14-14-14 6.281-14 14 6.281 14.031 14 14.031zM14.906 17h-5.906c-0.563 0-1-0.438-1-1s0.438-1 1-1h14c0.563 0 1 0.438 1 1s-0.438 1-1 1h-8.094z"></path>
                        </svg>
                    </div>
                    <div
                        className="light_box_overlay_zoom middle" 
                        onClick={() => {
                            setZoomAnimation();
                            setTranslateX(0);
                            setTranslateY(0);
                            onZoom(0);
                        }}>
                        <svg width="40px" height="40px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22.154 2.554L16.707 8H21v1h-6V3h1v4.293l5.446-5.447zm-19.6 19.6L8 16.707V21h1v-6H3v1h4.293l-5.447 5.446zm19.6-.707L16.707 16H21v-1h-6v6h1v-4.293l5.446 5.446zM1.846 2.554L7.293 8H3v1h6V3H8v4.293L2.554 1.846z"/>
                        </svg>
                    </div>
                    <div
                        className="light_box_overlay_zoom" 
                        onClick={() => {
                            setZoomAnimation();
                            onZoom(-1);
                        }}>
                        <svg width="30px" height="30px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16 0c-8.836 0-16 7.163-16 16s7.163 16 16 16c8.837 0 16-7.163 16-16s-7.163-16-16-16zM16 30.032c-7.72 0-14-6.312-14-14.032s6.28-14 14-14 14 6.28 14 14-6.28 14.032-14 14.032zM23 15h-6v-6c0-0.552-0.448-1-1-1s-1 0.448-1 1v6h-6c-0.552 0-1 0.448-1 1s0.448 1 1 1h6v6c0 0.552 0.448 1 1 1s1-0.448 1-1v-6h6c0.552 0 1-0.448 1-1s-0.448-1-1-1z"></path>
                        </svg>
                    </div>
                </div>
                <div 
                    className="light_box_overlay_close"
                    onClick={onClose}>
                </div>
                <div 
                    className={`${index != 0 ? "light_box_overlay_left" : ""}`}
                    onClick={onLeftClick}/>
                <div 
                    className={`${index != gallery.length - 1 ? "light_box_overlay_right" : ""}`}
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