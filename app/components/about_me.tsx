"use client";
import Frame from "./frame";
import { ReactNode, useEffect, useRef, useState } from "react";
import Personal from "./personal_panel";
import SkillItem from "./skill";
import EventListener from "@/miscs/EventListener";
import loadData, { DataType } from "@/services/load_data";
import Professional from "./professional";
import Loading from "@/widgets/loader";

interface CharacteristicsData {
    image: string;
    data?: string;
    text: string;
}

interface ProfessionalData {
    title: string;
    description: string;
    characteristics_list: CharacteristicsData[];
}

interface PersonalData {
    title: string;
    description: string;
    characteristics_list: CharacteristicsData[];
}

interface AboutMeData {
    title: string;
    description: string;
    personal: PersonalData;
    professional: ProfessionalData;
}

interface SkillData {
    title: string;
    logo: string;
    description: string;
    level_text: string;
    percent: number
}

interface SkillsData {
    title: string;
    description: string;
    level_description: string;
    skill_list: SkillData[];
}

interface AboutMeProps {
    title: string,
    icon_url: string,
    raw?: boolean
}

export default function AboutMe({title, icon_url, raw=false}: AboutMeProps) {

    const [about_me_data, setAboutMeData] = useState<AboutMeData | null>(null);
    const [skill_data, setSkillData] = useState<SkillsData | null>(null);
    const [data_loaded, setDataLoaded] = useState(false);

    const skillsUlRef = useRef<HTMLUListElement>(null);

    const itemSize:number = 280 + 20;
    const [numBoxes, setNumBoxes] = useState(1);
    let selectedBox = 0;

    const calcNumBoxes = () => {
        if (!skillsUlRef.current) return;
        // Gets Unsorted List element
        const container = skillsUlRef.current;
        // Gets total scroll width
        const scrollWidth = container.scrollWidth;
        // Gets visibile with of container element
        const viewWidth = container.clientWidth;

        // Calculates how many times SkillItem element fits to container element
        const itemFitInTotalViewWith = Math.floor(viewWidth / itemSize)

        // Calculates how far to scroll when clicken a box item
        const viewBoxSize = itemSize * itemFitInTotalViewWith;

        // Calculates the max boxes to fast scroll
        const numBoxes = Math.ceil(scrollWidth / viewBoxSize);
        setNumBoxes(numBoxes);
    }

    const onClickBox = (index: number) => {
        if (!skillsUlRef.current) return;
        // Gets Unsorted List element
        const container = skillsUlRef.current;
        // Gets visibile with of container element
        const viewWidth = container.clientWidth;

        // Calculates how many times SkillItem element fits to container element
        const itemFitInTotalViewWith = Math.floor(viewWidth / itemSize)

        // Calculates how far to scroll when clicken a box item
        const viewBoxSize = itemSize * itemFitInTotalViewWith;

        // Calculates new scroll size to scroll to
        const newScrollLeft = index * viewBoxSize;
        skillsUlRef.current.scrollTo({
            left: newScrollLeft,
            behavior: "smooth"
        });
    };

    const onScrollLeftChange = () => {
        if (!skillsUlRef.current) return;
        // Gets current scroll width
        const scrollLeft = skillsUlRef.current.scrollLeft;
        // Gets total scoll width
        const scrollWidth = skillsUlRef.current.scrollWidth;
        // Gets container element
        const container = skillsUlRef.current;
        // Gets visibile with of container element
        const viewWidth = container.clientWidth;
        
        // Calculates how many times SkillItem element fits to container element
        const itemFitInTotalViewWith = Math.floor(viewWidth / itemSize)

        // Calculates how far to scroll when clicken a box item
        const viewBoxSize = itemSize * itemFitInTotalViewWith;

        // Calculates which box to select or heighlight it
        const currentBoxIndex = Math.round(scrollLeft / viewBoxSize);

        // Calculates the max boxes to fast scroll
        const numBoxes = Math.ceil(scrollWidth / viewBoxSize);

        // Selects the box index
        setSelectedBox(scrollLeft + viewWidth >= scrollWidth ? numBoxes - 1 : currentBoxIndex);
    }

    const setSelectedBox = (index: number) => {
        const oldSelected = document.getElementById(`skills_custom_box_${selectedBox}`) as HTMLDivElement;
        if (oldSelected) {
            oldSelected.className = "skills_custom_box"
        }
        selectedBox = index;
        const newSelected = document.getElementById(`skills_custom_box_${selectedBox}`) as HTMLDivElement;
        if (!newSelected) return;
        newSelected.className = "skills_custom_box skills_custom_box_selected"
    }

    const addEventListeners = ():void => {
        EventListener.addEventListener(
            window,
            'resize',
            () => {
                calcNumBoxes();
            },
            false,
            `skills_ul_ref`
        );
        EventListener.addEventListener(
            skillsUlRef.current,
            'scroll',
            () => {
                onScrollLeftChange();
            },
            false,
            `skills_ul_ref`
        );
        EventListener.addEventListener(
            skillsUlRef.current,
            'mousedown',
            (rootEvent: MouseEvent) => {

                if (!skillsUlRef.current) return;
                const startX = rootEvent.pageX - skillsUlRef.current.offsetLeft;
                const scrollLeft = skillsUlRef.current.scrollLeft;
                
                EventListener.addEventListener(
                    document,
                    'mousemove',
                    (e: MouseEvent) => {

                        if (!skillsUlRef.current) return;
                        const x = e.pageX - skillsUlRef.current.offsetLeft;
                        const walk = (x - startX);
                        skillsUlRef.current.scrollLeft = scrollLeft - walk;
                    },
                    false,
                    `skills_ul_ref_mousemove`,
                    { passive: false },
                );

                EventListener.addEventListener(
                    window,
                    'mouseup',
                    () => {
                        EventListener.removeAllListeners(`skills_ul_ref_mousemove`);
                    },
                    true,
                    `skills_ul_ref_mousemove`
                );
                EventListener.addEventListener(
                    window,
                    'blur',
                    () => {
                        EventListener.removeAllListeners(`skills_ul_ref_mousemove`);
                    },
                    true,
                    `skills_ul_ref_mousemove`
                );
            },
            false,
            `skills_ul_ref`
        );
    }

    useEffect(() => {

        if (!data_loaded) {

            loadData<AboutMeData>(DataType.ABOUTME).then((res) => {
                setAboutMeData(res);
            });

            loadData<SkillsData>(DataType.SKILLS).then((res) => {
                setSkillData(res);
                setDataLoaded(true);
            });   
            return (() => {
                EventListener.removeAllListeners('skills_ul_ref_mousemove');
                EventListener.removeAllListeners('skills_ul_ref');
            })
        }
        else {
            addEventListeners();
            onScrollLeftChange();
            calcNumBoxes();
        }
    }, [data_loaded]);

    const terminate = () => {
        console.log("AboutMe: terminated");
    };7

    const build = (): ReactNode => {
        if (!data_loaded) {
            return(
                <Loading
                    width="50px"
                    height="50px"
                    justify_content="center"
                    text="Data is loading ..."
                />
            )
        }
        return(
            <div id="about_me" className={`about_me ${raw ? "" : "about_me_with_scrollbar"}`}>
                <div className="about_me_title">
                    <span className="header2">
                        {about_me_data?.title}
                    </span>
                </div>
                <div className="about_me_description">
                    <span className="description1">
                        {about_me_data?.description}
                    </span>
                </div>
                <div className="about_me_content">
                    <div className="about_me_personal_professional">
                       <div className="about_me_personal_container">
                            <div className="about_me_additional_title">
                                <span className="header3">
                                    {about_me_data?.personal.title}
                                </span>
                            </div>
                            <div className="about_me_personal_professional_description">
                                <span className="description2">
                                    {about_me_data?.personal.description}
                                </span>
                            </div>
                            <div className="about_me_personal_professional_panels">
                                {about_me_data?.personal.characteristics_list.map((data, index) => (
                                    <Personal 
                                        key={index}
                                        icon={data.image}
                                        text={data.text}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="about_me_personal_container">
                            <div className="about_me_additional_title">
                                <span className="header3">
                                    {about_me_data?.professional.title}
                                </span>
                            </div>
                            <div className="about_me_personal_professional_description">
                                <span className="description2">
                                    {about_me_data?.professional.description}
                                </span>
                            </div>
                            <div className="about_me_personal_professional_panels">
                                {about_me_data?.professional.characteristics_list.map((data, index) => (
                                    <Professional 
                                        key={index}
                                        data={data.data!}
                                        text={data.text}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="about_me_skills">
                        <div className="about_me_skills_title">
                            <span className="header3">
                                {skill_data?.title}
                            </span>
                        </div>
                        <div className="about_me_skills_description">
                            <span className="description2">
                                {skill_data?.description}
                            </span>
                        </div>
                        {
                            skill_data
                            ? <ul ref={skillsUlRef} className="about_me_skills_container">
                                {skill_data?.skill_list.map((data, index) => (
                                    <SkillItem 
                                        key={index}
                                        title={data.title}
                                        logo={data.logo}
                                        description={data.description}
                                        level_text={skill_data.level_description}
                                        percent={data.percent}
                                    />
                                ))}
                            </ul>
                            : null
                        }
                        {
                            skill_data || numBoxes != Infinity
                            ? <div className="skills_custom_scroll_bar">
                                {Array.from({ length: numBoxes }).map((_, i) => (
                                    <div
                                    key={i}
                                    id={`skills_custom_box_${i}`}
                                    onClick={() => onClickBox?.(i)}
                                    className="skills_custom_box"
                                    />
                                ))}
                            </div>
                            : null
                        }
                    </div>
                </div>
            </div>
        );
    }

    return(
        raw ? build() : (
            <Frame
                title={title}
                icon_url={icon_url}
                onClose={terminate}
            >
                { build() }
            </Frame>
        )
    )
}
