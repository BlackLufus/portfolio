"use client";
import Frame from "../frame";
import { ReactNode } from "react";

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
                <div className="about_me_information">
                    <div className="about_me_header">
                        <span>
                            Fullstack Entwickler
                        </span>
                    </div>
                    <div className="about_me_description">
                        <span>
                            Ich ent­wick­le mo­der­ne, re­spon­si­ve Web­an­wen­dun­gen mit mo­derns­ten Tech­no­lo­gi­en. Spe­zia­li­siert auf Re­act, Next.js und Full-Stack-Ent­wick­lung, um au­ßer­ge­wöhn­li­che di­gi­ta­le Er­leb­nis­se zu schaf­fen.
                        </span>
                    </div>
                    <div className="about_me_buttons">
                        <div className="about_me_button_my_project">
                            <a href="">Meine Projekte</a>
                        </div>
                        <div className="about_me_button_contact">
                            <a href="">Kontakt</a>
                        </div>
                    </div>
                </div>
                <div className="about_me_image">
                    <img src="images/squirrel.png" alt="" />
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
