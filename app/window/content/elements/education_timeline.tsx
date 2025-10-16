"use client";

import React, { useEffect, useRef, useState } from "react";
import EducationPanel, { EducationItem } from "./education_panel";
import EducationTimeLinePoint from "./education_timeline_point";
import EventListener from "@/miscs/EventListener";


interface TimelineProps {
    id: number;
    education_item_list: EducationItem[];
}

export default function EducationTimeline({id, education_item_list}:TimelineProps ) {

    const containerRef = useRef<HTMLDivElement>(null);

    const [scrollPercent, setScrollPercent] = useState(0);

    useEffect(() => {

        const handleScroll = () => {
            console.log(`offsetHeight (Eduction): ${containerRef.current?.offsetHeight}`);
            console.log(`clientHeight (Eduction): ${containerRef.current?.clientHeight}`);
            console.log(`clientTop (Eduction): ${containerRef.current?.clientTop}`);
            console.log(`offsetTop (Eduction): ${containerRef.current?.offsetTop}`);
            console.log(`offsetHeight (Application): ${document.getElementById(`application_${id}`)!.offsetHeight}`);
            console.log(`clientHeight (Application): ${document.getElementById(`application_${id}`)!.clientHeight}`);
            console.log(`offsetParent (Application): ${document.getElementById(`application_${id}`)!.offsetParent}`);
            console.log(`offsetTop (Application): ${document.getElementById(`application_${id}`)!.offsetTop}`);
            console.log(`scrollTop (Application): ${document.getElementById(`application_${id}`)!.scrollTop}`);
            console.log(`scrollHeight (Application): ${document.getElementById(`application_${id}`)!.scrollHeight}`);
            
            const container = document.getElementById(`application_${id}`)!;
            const timeline = containerRef.current!;

            const scrollTop = container.scrollTop;
            const timelineTop = timeline.offsetTop;
            const timelineHeight = timeline.scrollHeight;
            const maxScroll = timelineTop + timelineHeight - container.clientHeight;

            const percent = Math.min(Math.max((scrollTop / maxScroll) * 100, 0), 100);
            // console.log(percent);
            setScrollPercent(percent);
        }

        EventListener.addEventListener(
            document.getElementById(`application_${id}`),
            'scroll',
            handleScroll,
            false,
            `education_timeline-${id}`
        );

        return () => EventListener.removeAllListeners(`education_timeline-${id}`);
    }, [scrollPercent]);

    return(
        <div ref={containerRef} className="education_content">
            <div className="education_timeline" style={{"--fill-height": `${scrollPercent}%`} as React.CSSProperties} >
                {education_item_list.map((item, index) => (
                    <React.Fragment key={index}>
                        <EducationTimeLinePoint />
                        <EducationPanel item={item} class_name={`education_content_${index % 2 ? "right" : "left"}`} />
                    </React.Fragment>
                ))}
            </div>
        </div>
    )
}