"use client";

import React, { useEffect, useRef, useState } from "react";
import EducationCard, { EducationData } from "./education.card";
import EducationTimeLinePoint from "./education.timeline.point";
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
            // console.log(scrolled_into_view, ">", element_height - epsilon, "||", scroll_top + viewport_height, ">=", scroll_height - epsilon);
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
                        <div className="education_timeline_point">
                            <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M11.5528 1.10557C11.8343 0.964809 12.1657 0.964809 12.4472 1.10557L22.4472 6.10557C22.862 6.31298 23.0798 6.77838 22.9732 7.22975C22.8667 7.68112 22.4638 8 22 8H1.99998C1.5362 8 1.13328 7.68112 1.02673 7.22975C0.920172 6.77838 1.13795 6.31298 1.55276 6.10557L11.5528 1.10557ZM6.23604 6H17.7639L12 3.11803L6.23604 6ZM5.99998 9C6.55226 9 6.99998 9.44772 6.99998 10V15C6.99998 15.5523 6.55226 16 5.99998 16C5.44769 16 4.99998 15.5523 4.99998 15V10C4.99998 9.44772 5.44769 9 5.99998 9ZM9.99998 9C10.5523 9 11 9.44772 11 10V15C11 15.5523 10.5523 16 9.99998 16C9.44769 16 8.99998 15.5523 8.99998 15V10C8.99998 9.44772 9.44769 9 9.99998 9ZM14 9C14.5523 9 15 9.44772 15 10V15C15 15.5523 14.5523 16 14 16C13.4477 16 13 15.5523 13 15V10C13 9.44772 13.4477 9 14 9ZM18 9C18.5523 9 19 9.44772 19 10V15C19 15.5523 18.5523 16 18 16C17.4477 16 17 15.5523 17 15V10C17 9.44772 17.4477 9 18 9ZM2.99998 18C2.99998 17.4477 3.44769 17 3.99998 17H20C20.5523 17 21 17.4477 21 18C21 18.5523 20.5523 19 20 19H3.99998C3.44769 19 2.99998 18.5523 2.99998 18ZM0.999976 21C0.999976 20.4477 1.44769 20 1.99998 20H22C22.5523 20 23 20.4477 23 21C23 21.5523 22.5523 22 22 22H1.99998C1.44769 22 0.999976 21.5523 0.999976 21Z"/>
                            </svg>
                        </div>
                        <EducationCard data={data} class_name={""} />
                    </React.Fragment>
                ))}
            </div>
        </div>
    )
}