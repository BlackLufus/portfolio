"use client";
import Frame from "../frame";
import { ReactNode } from "react";

interface OverviewProps {
    title: string,
    icon_url: string,
    raw?: boolean
}

export default function Overview({title, icon_url, raw=false}: OverviewProps) {

    const terminate = () => {
        console.log("General: terminated");
    };

    const build = (): ReactNode => {
        return(
            <div className="overview">
                <div className="overview_information">
                    <div className="overview_header">
                        <span>
                            Fullstack Entwickler
                        </span>
                    </div>
                    <div className="overview_description">
                        <span>
                            Ich ent­wick­le mo­der­ne, re­spon­si­ve Web­an­wen­dun­gen mit mo­derns­ten Tech­no­lo­gi­en. Spe­zia­li­siert auf Re­act, Next.js und Full-Stack-Ent­wick­lung, um au­ßer­ge­wöhn­li­che di­gi­ta­le Er­leb­nis­se zu schaf­fen.
                        </span>
                    </div>
                    <div className="overview_buttons">
                        <div className="overview_button_my_project">
                            <a href="">Meine Projekte</a>
                        </div>
                        <div className="overview_button_contact">
                            <a href="">Kontakt</a>
                        </div>
                    </div>
                </div>
                <div className="overview_image">
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
