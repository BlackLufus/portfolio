"use client";

import React, { useEffect, useRef, useState } from "react";
import EducationPanel, { EducationData } from "./education_panel";
import EducationTimeLinePoint from "./education_timeline_point";
import EventListener from "@/miscs/EventListener";


interface TimelineProps {
    id: number;
    ref: React.RefObject<HTMLDivElement | null>;
    education_data_list: EducationData[];
}

export default function EducationTimeline({id, ref, education_data_list}:TimelineProps ) {

    const containerRef = useRef<HTMLDivElement>(null);

    const [scrollPercent, setScrollPercent] = useState(0);

    useEffect(() => {
        const handleScroll = () => {

            // Gets scroll container
            const scroll_container = ref.current!;
            // Gets timeline element
            const timeline_element = containerRef.current!;

            const scroll_top = scroll_container.scrollTop;
            const scroll_height = scroll_container.scrollHeight;
            const viewport_height = scroll_container.clientHeight;
            const viewport_buffer = viewport_height / 2;

            const element_top = timeline_element.offsetTop;
            const element_height = timeline_element.scrollHeight;

            const scrolled_into_view = scroll_top + viewport_height - element_top - viewport_buffer;
            const total_scrollable_height = element_top + element_height - element_top;

            const current_scroll_value = (scrolled_into_view / total_scrollable_height) * 100;

            const epsilon = 1;
            console.log(scrolled_into_view, ">", element_height - epsilon, "||", scroll_top + viewport_height, ">=", scroll_height - epsilon);
            if (scrolled_into_view <= 0 || scroll_top == 0) {
                setScrollPercent(0);
            }
            else if (scrolled_into_view > element_height || scroll_top + viewport_height >= scroll_height - epsilon) {
                setScrollPercent(100);
            }
            else {
                setScrollPercent(current_scroll_value);
            }
        }

        EventListener.addEventListener(
            ref.current!,
            'scroll',
            handleScroll,
            false,
            `education_timeline-${id}`
        );

        return () => EventListener.removeAllListeners(`education_timeline-${id}`);
    });

    return(
        <div ref={containerRef} className="education_content">
            <div className="education_timeline" style={{"--fill-height": `${scrollPercent}%`} as React.CSSProperties} >
                {education_data_list.map((data, index) => (
                    <React.Fragment key={index}>
                        <EducationTimeLinePoint />
                        <EducationPanel data={data} class_name={""} />
                    </React.Fragment>
                ))}
            </div>
        </div>
    )
}