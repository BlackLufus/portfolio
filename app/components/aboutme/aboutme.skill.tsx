import { useEffect, useRef, useState } from "react";
import SkillCard, { SkillCardData } from "./aboutme.skill.card";
import EventListener from "@/miscs/EventListener";
import loadData, { DataType } from "@/services/load_data";
import Loading from "@/widgets/loader";
import LanguageNotifier, { LanguageCode } from "@/global/languageSubscriber";

export interface SkillData {
    title: string;
    description: string;
    level_description: string;
    skill_card_list: SkillCardData[];
}

export default function Skill() {

    const [data, setSkillData] = useState<SkillData | null>(null);
    const skillsUlRef = useRef<HTMLUListElement>(null);
    const [languageCode, setLanguageCode] = useState<LanguageCode>(LanguageCode.DE);

    const handleLanguageChange = (code: LanguageCode) => {
        setLanguageCode(code);
        setSkillData(null);
    }

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
        setSelectedBox(scrollLeft + viewWidth >= scrollWidth - 2 ? numBoxes - 1 : currentBoxIndex);
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
            `skill`
        );
        EventListener.addEventListener(
            skillsUlRef.current,
            'scroll',
            () => {
                onScrollLeftChange();
            },
            false,
            `skill`
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
                    `skill_mousemove`,
                    { passive: false },
                );

                EventListener.addEventListener(
                    window,
                    'mouseup',
                    () => {
                        EventListener.removeAllListeners(`skill_mousemove`);
                    },
                    true,
                    `skill_mousemove`
                );
                EventListener.addEventListener(
                    window,
                    'blur',
                    () => {
                        EventListener.removeAllListeners(`skill_mousemove`);
                    },
                    true,
                    `skill_mousemove`
                );
            },
            false,
            `skill`
        );
    }

    useEffect(() => {
        if (!data) {
            loadData<SkillData>(DataType.SKILLS, languageCode).then((res) => {
                setSkillData(res);
            });
        }
        else {
            addEventListeners();
            onScrollLeftChange();
            calcNumBoxes();
        }

        LanguageNotifier.subscribe(handleLanguageChange);   

        return (() => {
            LanguageNotifier.unsubscribe(handleLanguageChange)
            EventListener.removeAllListeners('skills_ul_ref_mousemove');
            EventListener.removeAllListeners('skills_ul_ref');
        })
    }, [data]);

    if (!data) {
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
        <div className="about_me_skills">
            <div className="about_me_skills_title">
                <span className="header3">
                    {data?.title}
                </span>
            </div>
            <div className="about_me_skills_description">
                <span className="description2">
                    {data?.description}
                </span>
            </div>
            {
                data
                ? <ul ref={skillsUlRef} className="about_me_skills_container">
                    {data.skill_card_list.map((cardData, index) => (
                        <SkillCard
                            key={index}
                            title={cardData.title}
                            logo={cardData.logo}
                            description={cardData.description}
                            level_text={data.level_description}
                            percent={cardData.percent}
                        />
                    ))}
                </ul>
                : null
            }
            {
                data || numBoxes != Infinity
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
    )
}