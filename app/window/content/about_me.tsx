"use client";
import Frame from "../frame";
import { ReactNode } from "react";
import PersonalPanel from "./elements/personal_panel";
import SkillItem, { SkillLevel } from "./elements/skill";

interface AboutMeProps {
    title: string,
    icon_url: string,
    raw?: boolean
}

export default function AboutMe({title, icon_url, raw=false}: AboutMeProps) {

    const terminate = () => {
        console.log("AboutMe: terminated");
    };

    const build = (): ReactNode => {
        return(
            <div className="about_me">
                <div className="about_me_title">
                    <span className="header2">
                        Über mich
                    </span>
                </div>
                <div className="about_me_description">
                    <span className="description1">
                        Ein Full­stack-Ent­wick­ler, der sich auf Re­act- und Next.js-An­wen­dun­gen spe­zia­li­siert hat und ein Auge für De­sign hat.
                    </span>
                </div>
                <div className="about_me_content">
                    <div className="about_me_personal_professional">
                       <div className="about_me_personal_container">
                            <div className="about_me_additional_title">
                                <span className="header3">
                                    Persönliches
                                </span>
                            </div>
                            <div className="about_me_personal_professional_description">
                                <span className="description2">
                                    Krea­ti­ver Den­ker mit ei­ner Lei­den­schaft für ele­gan­te Lö­sun­gen und Lie­be zum De­tail
                                </span>
                            </div>
                            <div className="about_me_personal_professional_panels">
                                <PersonalPanel icon="images/project.png" text="Problemlöser" />
                                <PersonalPanel icon="images/project.png" text="Kreativer Denker" />
                                <PersonalPanel icon="images/project.png" text="Schneller Lerner" />
                                <PersonalPanel icon="images/project.png" text="Detailorientiert" />
                            </div>
                        </div>
                        <div className="about_me_professional_container">
                            <div className="about_me_additional_title">
                                <span className="header3">
                                    Berufliches
                                </span>
                            </div>
                            <div className="about_me_personal_professional_description">
                                <span className="description2">
                                    Lie­fe­rung wir­kungs­vol­ler Lö­sun­gen bei gleich­zei­ti­ger Er­kun­dung neu­er Tech­no­lo­gi­en
                                </span>
                            </div>
                            <div className="about_me_personal_professional_panels">
                                <PersonalPanel icon="images/project.png" text="Problemlöser" />
                                <PersonalPanel icon="images/project.png" text="Kreativer Denker" />
                                <PersonalPanel icon="images/project.png" text="Schneller Lerner" />
                                <PersonalPanel icon="images/project.png" text="Detailorientiert" />
                            </div>
                        </div>
                    </div>
                    <div className="about_me_skills">
                        <div className="about_me_skills_title">
                            <span className="header3">
                                Meine Fähigkeiten
                            </span>
                        </div>
                        <div className="about_me_skills_description">
                            <span className="description2">
                                Ich habe mein Know-how in die­sen Tech­no­lo­gi­en ver­fei­nert, um mo­der­ne, ef­fi­zi­en­te Lö­sun­gen zu er­stel­len.
                            </span>
                        </div>
                        <ul className="about_me_skills_container">
                            <SkillItem title="Fähigkeit" description="Das ist eine beschreibung für eine Fähigkeit." level={SkillLevel.EXPERTE} />
                            <SkillItem title="Fähigkeit" description="Das ist eine beschreibung für eine Fähigkeit." level={SkillLevel.EXPERTE} />
                            <SkillItem title="Fähigkeit" description="Das ist eine beschreibung für eine Fähigkeit." level={SkillLevel.EXPERTE} />
                            <SkillItem title="Fähigkeit" description="Das ist eine beschreibung für eine Fähigkeit." level={SkillLevel.EXPERTE} />
                            <SkillItem title="Fähigkeit" description="Das ist eine beschreibung für eine Fähigkeit." level={SkillLevel.EXPERTE} />
                            <SkillItem title="Fähigkeit" description="Das ist eine beschreibung für eine Fähigkeit." level={SkillLevel.EXPERTE} />
                            <SkillItem title="Fähigkeit" description="Das ist eine beschreibung für eine Fähigkeit." level={SkillLevel.EXPERTE} />
                            <SkillItem title="Fähigkeit" description="Das ist eine beschreibung für eine Fähigkeit." level={SkillLevel.EXPERTE} />
                        </ul>
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
                {build()}
            </Frame>
        )
    )
}
