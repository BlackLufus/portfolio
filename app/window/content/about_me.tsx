"use client";
import Frame from "../frame";
import { ReactNode } from "react";
import PersonalPanel from "./elements/personal_panel";

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
                    <span>
                        Über mich
                    </span>
                </div>
                <div className="about_me_description">
                    <span>
                        Ein Full­stack-Ent­wick­ler, der sich auf Re­act- und Next.js-An­wen­dun­gen spe­zia­li­siert hat und ein Auge für De­sign hat.
                    </span>
                </div>
                <div className="about_me_additional">
                    <div className="about_me_">
                       <div className="about_me_personal">
                            <div className="about_me_personal_title">
                                <span>
                                    Persönliches
                                </span>
                            </div>
                            <div className="about_me_personal_description">
                                <span>
                                    Krea­ti­ver Den­ker mit ei­ner Lei­den­schaft für ele­gan­te Lö­sun­gen und Lie­be zum De­tail
                                </span>
                            </div>
                            <div className="about_me_personal_panels">
                                <PersonalPanel icon="images/project.png" text="Problemlöser" />
                                <PersonalPanel icon="images/project.png" text="Kreativer Denker" />
                                <PersonalPanel icon="images/project.png" text="Schneller Lerner" />
                                <PersonalPanel icon="images/project.png" text="Detailorientiert" />
                            </div>
                        </div>
                    </div>
                    <div className="">
                        awdawd
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
