import { useEffect, useRef, useState } from "react";
import SkillCard, { SkillCardData } from "./skill.card";
import loadData, { DataType } from "@/services/load_data";
import Loading from "@/widgets/loader";
import LanguageNotifier, { LanguageCode } from "@/global/languageSubscriber";
import CustomScrollBar from "@/widgets/customScrollBar";
import LanguageManager from "@/global/languageSubscriber";

export interface SkillData {
    title: string;
    description: string;
    level_description: string;
    skill_card_list: SkillCardData[];
}

export default function Skill() {

    const itemSize:number = 280 + 20;

    const [data, setSkillData] = useState<SkillData | null>(null);
    const skillsUlRef = useRef<HTMLUListElement>(null);
    const [languageCode, setLanguageCode] = useState<LanguageCode>(LanguageManager.code);

    const handleLanguageChange = (code: LanguageCode) => {
        setLanguageCode(code);
    }

    useEffect(() => {
        loadData<SkillData>(DataType.SKILLS, languageCode).then((res) => {
            setSkillData(res);
        });

        LanguageNotifier.subscribe(handleLanguageChange);   

        return () => LanguageNotifier.unsubscribe(handleLanguageChange);
    }, [languageCode]);

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
        <section>
            <div className="container">
                <h2>
                    {data?.title}
                </h2>
                <p className="section_intro">
                    {data?.description}
                </p>
                {
                    data
                    ? <ul ref={skillsUlRef} className="skill_ulist">
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
                    data
                    ? <CustomScrollBar
                        wrapperRef={skillsUlRef}
                        size={itemSize} />
                    : null
                }
            </div>
        </section>
    )
}