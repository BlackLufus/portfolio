"use client";
import React, { useEffect, useRef } from "react";
import EventListener from "../miscs/EventListener";
import Point from "../miscs/point";

interface FrameProps {
  title: string;
  icon_url: string;
  onClose?: () => void;
  children: React.ReactNode;
}

class FrameError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "FrameError";
        Object.setPrototypeOf(this, FrameError.prototype);
    }
}

class FrameAttributes {
    public static id: number = 0;
    public static zCounter: number = 1000;
}

export default function Frame({ title, icon_url, onClose, children }: FrameProps) {
    const frameRef = useRef<HTMLDivElement>(null);
    const frameHeaderRef = useRef<HTMLDivElement>(null);
    const zCounter= FrameAttributes.zCounter++;
    const dragOffset = new Point(0, 0);
    const id = FrameAttributes.id++;

    /**
     * Dispose a frame, removes it from playground and removes all event listeners
     * @returns {void}
     */
    const dispose = () => {
        if (onClose) {
            onClose();
        }
        if (frameRef.current) {
            frameRef.current.remove()
            EventListener.removeAllListeners(`frame-${id}`);
        }
    }

    /**
     * Gets the current position from the frame
     * @param {Point} point 
     * @returns {Point}
     */
    const getFramePosition = (point: Point): Point => {

        const desktop = document.getElementById('desktop');

        if (!desktop) {
            throw new FrameError("No element with ID 'playground' found.");
        }
        if (point.x < 0) {
            point.x = 0;
        }
        else if (point.x > desktop.offsetWidth - frameRef.current!.offsetWidth) {
            point.x = desktop.offsetWidth - frameRef.current!.offsetWidth;
        }
        if (point.y < 0) {
            point.y = 0;
        }
        else if (point.y > desktop.offsetHeight - frameHeaderRef.current!.offsetHeight) {
            point.y = desktop.offsetHeight - frameHeaderRef.current!.offsetHeight;
        }
        return point;
    }

    const focus = (event: MouseEvent): void => {
        const target = event.target as HTMLElement;
        const frame = target.closest('.frame') as HTMLElement | null;

        console.log(`${frame?.style.zIndex} != ${FrameAttributes.zCounter-1} ${(frame?.style.zIndex != `${FrameAttributes.zCounter-1}`)}`);

        if (frame && frame.style.zIndex != `${FrameAttributes.zCounter-1}`) {
            console.log(`zIndex: ${frame.style.zIndex}`)
            frame.style.zIndex = (FrameAttributes.zCounter++).toString();
            console.log(frame.style.zIndex)
        }
    }

    /**
     * Sets all necessary event listeners
     * @returns {void}
     */
    const addEventListeners = ():void => {
        EventListener.addEventListener(
            frameRef.current,
            'mousedown',
            focus,
            false,
            `frame-${id}`
        )
        EventListener.addEventListener(
            frameHeaderRef.current!,
            'mousedown',
            (rootEvent: MouseEvent) => {

                focus(rootEvent);

                // 🟡 Offset merken
                if (!frameRef.current) return;
                dragOffset.x = rootEvent.clientX - frameRef.current.offsetLeft;
                dragOffset.y = rootEvent.clientY - frameRef.current.offsetTop;

                EventListener.addEventListener(
                    document,
                    'mousemove',
                    (e: MouseEvent) => {
                        const rawPoint = new Point(
                            e.clientX - dragOffset.x,
                            e.clientY - dragOffset.y
                        );
                        const clampedPoint = getFramePosition(rawPoint);

                        if (!frameRef.current) return;
                        frameRef.current.style.left = `${clampedPoint.x}px`;
                        frameRef.current.style.top = `${clampedPoint.y}px`;
                    },
                    false,
                    `frame-${id}-mousemove`,
                    { passive: false },
                );

                EventListener.addEventListener(
                    window,
                    'mouseup',
                    () => {
                        EventListener.removeAllListeners(`frame-${id}-mousemove`);
                    },
                    true,
                    `frame-${id}-mousemove`
                );
                EventListener.addEventListener(
                    window,
                    'blur',
                    () => {
                        EventListener.removeAllListeners(`frame-${id}-mousemove`);
                    },
                    true,
                    `frame-${id}-mousemove`
                );
            },
            false,
            `frame-${id}`
        );
    }

    useEffect(() => {
        addEventListeners();
    });

    return (
        <div ref={frameRef} className="frame" style={{ zIndex: zCounter }}>
            <div className="frame_background">
                <img src="images/colors.jpg" alt="bubbles" className="frame_background" />
            </div>
            <header className="frame_header">
                <div ref={frameHeaderRef}>
                    <div>
                        <img src={icon_url} alt="" />
                    </div>
                    <span className="frame_title">
                        {title}
                    </span>
                </div>
                <button className="frame_close" onClick={() => {dispose()}}/>
            </header>
            <main className="frame_content">
                <div>
                    {children}
                </div>
            </main>
        </div>
    );
}