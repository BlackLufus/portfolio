"use client";

import React, { useEffect, useRef, useState } from "react";
import EducationPanel, { EducationItem } from "./education_panel";
import EducationTimeLinePoint from "./education_timeline_point";
import EventListener from "@/miscs/EventListener";


interface TimelineProps {
    id: number | undefined;
    education_item_list: EducationItem[];
}

export default function EducationTimeline({id, education_item_list}:TimelineProps ) {

    const containerRef = useRef<HTMLDivElement>(null);

    const [scrollPercent, setScrollPercent] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scroll_container = document.getElementById(id == undefined ? "webpage" : `education_${id}`)!;
            const timeline_element = containerRef.current!;

            const scroll_top = scroll_container.scrollTop;
            const scroll_height = scroll_container.scrollHeight;
            const viewport_height = scroll_container.clientHeight;
            const viewport_buffer = viewport_height / 2;

            const element_top = timeline_element.offsetTop;
            const element_height = timeline_element.scrollHeight;

            let scrolled_into_view = scroll_top + viewport_height - element_top - viewport_buffer;
            let total_scrollable_height = element_top + element_height - element_top;

            let current_scroll_value = (scrolled_into_view / total_scrollable_height) * 100;

            if (scrolled_into_view <= 0 || scroll_top == 0) {
                setScrollPercent(0);
            }
            else if (scrolled_into_view > element_height || scroll_top + viewport_height >= scroll_height) {
                setScrollPercent(100);
            }
            else {
                setScrollPercent(current_scroll_value);
            }
        }

        EventListener.addEventListener(
            document.getElementById(id == undefined ? "webpage" : `education_${id}`),
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