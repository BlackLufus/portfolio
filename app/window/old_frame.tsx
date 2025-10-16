"use client";
import React, { useEffect, useRef, useState } from "react";
import EventListener from "../miscs/EventListener";
import Point from "../miscs/point";

class FrameError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "FrameError";
        Object.setPrototypeOf(this, FrameError.prototype);
    }
}

class Frame {

    private static zCounter: number = 1000;
    private static id = 0;

    private frameRef = useRef<HTMLDivElement>(null);
    private frameHeaderRef = useRef<HTMLDivElement>(null);
    private terminateEvent?: () => void;
    protected id = Frame.id++;
    private titleText: string;
    private iconUrl: string;
    private dragOffsetX: number = 0;
    private dragOffsetY: number = 0;

    /**
     * Basic Frame for all content Objects
     * @param {string} titleText 
     * @param {React.ReactNode} contentElement 
     * @param {method} terminateEvent 
     */
    constructor(titleText: string, iconUrl: string, terminateEvent?: () => void) {
        this.titleText = titleText;
        this.iconUrl = iconUrl;

        this.terminateEvent = terminateEvent;

        Frame.zCounter++;
    }

    public build(content: React.ReactNode): React.ReactNode {
        return (
            <div ref={this.frameRef} className="frame" style={{ zIndex: 1000 }}>
                <header className="frame_header">
                    <div ref={this.frameHeaderRef}>
                        <div>
                            <img src={this.iconUrl} alt="" />
                        </div>
                        <span className="frame_title">
                            {this.titleText}
                        </span>
                    </div>
                    <button className="frame_close" onClick={() => {this.dispose()}}/>
                </header>
                <main className="frame_content">
                    <img src="images/colors.jpg" alt="bubbles" />
                    {content}
                </main>
            </div>
        );
    }

    /**
     * Sets all necessary event listeners
     * @returns {void}
     */
    protected addEventListeners(): void {
        EventListener.addEventListener(
            this.frameRef.current,
            'mousedown',
            this.focus,
            false,
            `frame-${this.id}`
        )
        EventListener.addEventListener(
            this.frameHeaderRef.current!,
            'mousedown',
            (rootEvent: any) => {

                this.focus(rootEvent);

                // 🟡 Offset merken
                if (!this.frameRef.current) return;
                this.dragOffsetX = rootEvent.clientX - this.frameRef.current.offsetLeft;
                this.dragOffsetY = rootEvent.clientY - this.frameRef.current.offsetTop;

                EventListener.addEventListener(
                    document,
                    'mousemove',
                    (e: MouseEvent) => {
                        const rawPoint = new Point(
                            e.clientX - this.dragOffsetX,
                            e.clientY - this.dragOffsetY
                        );
                        const clampedPoint = this.getFramePosition(rawPoint);

                        if (!this.frameRef.current) return;
                        this.frameRef.current.style.left = `${clampedPoint.x}px`;
                        this.frameRef.current.style.top = `${clampedPoint.y}px`;
                    },
                    false,
                    `frame-${this.id}-mousemove`,
                    { passive: false },
                );

                EventListener.addEventListener(
                    window,
                    'mouseup',
                    () => {
                        EventListener.removeAllListeners(`frame-${this.id}-mousemove`);
                    },
                    true,
                    `frame-${this.id}-mousemove`
                );
                EventListener.addEventListener(
                    window,
                    'blur',
                    () => {
                        EventListener.removeAllListeners(`frame-${this.id}-mousemove`);
                    },
                    true,
                    `frame-${this.id}-mousemove`
                );
            },
            false,
            `frame-${this.id}`
        );
    }

    /**
     * Gets the current position from the frame
     * @param {Point} point 
     * @returns {Point}
     */
    private getFramePosition(point: Point): Point {

        const desktop = document.getElementById('desktop');

        if (!desktop) {
            throw new FrameError("No element with ID 'playground' found.");
        }
        if (point.x < 0) {
            point.x = 0;
        }
        else if (point.x > desktop.offsetWidth - this.frameRef.current!.offsetWidth) {
            point.x = desktop.offsetWidth - this.frameRef.current!.offsetWidth;
        }
        if (point.y < 0) {
            point.y = 0;
        }
        else if (point.y > desktop.offsetHeight - this.frameHeaderRef.current!.offsetHeight) {
            point.y = desktop.offsetHeight - this.frameHeaderRef.current!.offsetHeight;
        }
        return point;
    }

    /**
     * Shows the current frame
     * @returns {void}
     */
    public show(): void {
        if (this.frameRef.current != null) {
            const playground = document.getElementById('desktop');
            if (!playground) {
                throw new FrameError("No element with ID 'playground' found.");
            }
            else if (playground.contains(this.frameRef.current)) {
                throw new FrameError("Frame already in playground");
            }
            else {
                playground.appendChild(this.frameRef.current);
            }
        }
    }

    public focus(event: MouseEvent): void {
        const target = event.target as HTMLElement;
        const frame = target.closest('.frame') as HTMLElement | null;

        console.log(`${frame?.style.zIndex} != ${Frame.zCounter-1} ${(frame?.style.zIndex != `${Frame.zCounter-1}`)}`);

        if (frame && frame.style.zIndex != `${Frame.zCounter-1}`) {
            console.log(`zIndex: ${frame.style.zIndex}`)
            frame.style.zIndex = (Frame.zCounter++).toString();
            console.log(frame.style.zIndex)
        }
    }

    /**
     * Dispose a frame, removes it from playground and removes all event listeners
     * @returns {void}
     */
    public dispose(): void {
        if (this.frameRef.current) {
            if (this.terminateEvent) {
                this.terminateEvent();
            }
            this.frameRef.current?.remove()
            EventListener.removeAllListeners(`frame-${this.id}`);
        }
    }
}

export default Frame;