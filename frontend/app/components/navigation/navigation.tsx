import { useEffect, useRef, useState } from "react";
import LanguageTask from "../tasks/languageTask";
import DarkmodeTask from "../tasks/darkmodeTask";
import DeviceTask from "../tasks/deviceTask";
import { ColorThemeManager } from "@/global/dataThemeManager";
import PaletteTask from "../tasks/paletteTask";

interface NaviProbs {
    firstname: string;
    lastname: string;
    aboutMeTitle: string;
    projectTitle: string;
    educationTitle: string;
    contactTitle: string;
    desktopViewTitle: string;
    languageTitle: string;
}

export default function Navi({firstname, lastname, aboutMeTitle, projectTitle, educationTitle, contactTitle, desktopViewTitle}: NaviProbs) {

    const naviRef = useRef<HTMLDivElement>(null);
    const navBarRef = useRef<HTMLDivElement>(null);
    const [menuState, setMenuState] = useState<boolean>(false);
    const [viewWidth, setViewWidth] = useState<number>(window.innerWidth)

    const handleMenuToggleClick = () => {
        setMenuState(!menuState);
        navBarRef.current!.className = `nav_bar ${viewWidth <= 966 ? menuState ? "hide" : "show" : ""}`
    }

    const handleNaviClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
    }

    const handleWindowClick = () => {
        if (menuState) handleMenuToggleClick()
    }

    const handleWindowResize = () => {
        setViewWidth(window.innerWidth)
        if (window.innerWidth > 966 && menuState) handleMenuToggleClick()
    }

    useEffect(() => {
        window.addEventListener("click", handleWindowClick)
        window.addEventListener("resize", handleWindowResize);
        
        return () => {
            window.removeEventListener("click", handleWindowClick)
            window.removeEventListener('resize', handleWindowResize)
        }
    }, [menuState])

    return(
    <header>
        {
            (viewWidth < 966)
            ? <div inert={!menuState} ref={navBarRef} className="nav_bar">
                <a className="nav_bar_link" href="#about_me">
                    <svg fill="#000000" width="30px" height="30px" viewBox="-3 0 19 19" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.517 12.834v1.9a1.27 1.27 0 0 1-1.267 1.267h-9.5a1.27 1.27 0 0 1-1.267-1.267v-1.9A3.176 3.176 0 0 1 3.65 9.667h5.7a3.176 3.176 0 0 1 3.167 3.167zM3.264 5.48A3.236 3.236 0 1 1 6.5 8.717a3.236 3.236 0 0 1-3.236-3.236z"/>
                    </svg>
                    <span>
                        {aboutMeTitle}
                    </span>
                </a>
                <a className="nav_bar_link" href="#projects">
                    <svg fill="#000000" height="40px" width="40px" version="1.2" baseProfile="tiny" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                        <path d="M218.8,52.1H110.2v-0.9c0.1-0.5,0.1-1.1,0.1-1.6V38.2c0-7.8-6.4-14.2-14.2-14.2H85.9H33.4H23.3c-7.8,0-14.2,6.4-14.2,14.2
                            v10.1v1.2V75v130.7c0,15.5,12.6,28,28.1,28.1h181.6c15.5,0,28.1-12.6,28.1-28.1V80.2C246.9,64.7,234.3,52.1,218.8,52.1z
                            M218.8,215.1H37.2c-5.2-0.1-9.3-4.2-9.4-9.4V80.3c0.1-5.2,4.2-9.3,9.4-9.4h181.6c5.2,0.1,9.3,4.2,9.4,9.4v125.4h0
                            C228.1,210.9,224,215,218.8,215.1z M170.2,108.3c0-11.2,9.1-20.4,20.4-20.4s20.4,9.1,20.4,20.4c0,11.2-9.1,20.4-20.4,20.4h-0.1
                            c0,0,0,0,0,0C179.2,128.7,170.2,119.5,170.2,108.3z M158.8,149.9l54.7,52.5h-173l51-103.7l33.8,75.3L158.8,149.9z"/>
                    </svg>
                    <span>
                        {projectTitle}
                    </span>
                </a>
                <a className="nav_bar_link" href="#education">
                    <svg width="40px" height="40px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.673 5.606a3326.02 3326.02 0 0 1-5.671-2.674L.138 8.524l2.03.98L2 9.531V20h1v-9.626l.72-.124.28.135v5.288c0 .914 5.206 3.533 6.249 4.049a3.89 3.89 0 0 0 3.48-.026C20 16.486 20 15.895 20 15.673v-5.288l3.854-1.857s-3.8-1.801-6.181-2.922zM19 15.504a51.526 51.526 0 0 1-5.726 3.302 2.884 2.884 0 0 1-2.582.02A40.184 40.184 0 0 1 5 15.521v-4.655l7 3.373 7-3.373zm-7-2.373L5.416 9.958l6.469-1.115-.17-.987-7.85 1.354-1.403-.676 9.537-4.495c.825.393 8.523 4.014 9.542 4.494z"/><path fill="none" d="M0 0h24v24H0z"/>
                    </svg>
                    <span>
                        {educationTitle}
                    </span>
                </a>
                <a className="nav_bar_link" href="#contact">
                    <svg fill="#000000" height="40px" width="40px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g>
                            <g>
                                <path d="M12,20H0v-3.5c0-2.4,1.3-4.5,3.2-5.6C2.5,10.2,2,9.2,2,8.1c0-2.2,1.8-4,4-4s4,1.8,4,4c0,1.1-0.4,2.1-1.2,2.8
                                    c1.9,1.1,3.2,3.3,3.2,5.6V20z M2,18h8v-1.5c0-2.4-1.8-4.5-4-4.5c-2.1,0-4,2.1-4,4.5V18z M6,6C4.9,6,4,6.9,4,8s0.9,2,2,2s2-0.9,2-2
                                    S7.1,6,6,6z M24,17H14v-2h10V17z M21,13h-7v-2h7V13z M24,9H14V7h10V9z"/>
                            </g>
                        </g>
                    </svg>
                    <span>
                        {contactTitle}
                    </span>
                </a>
            </div>
            : null
        }
        <nav ref={naviRef} onClick={handleNaviClick}>
            <div className={`container navi_bar_wrapper ${menuState ? "show": ""}`}>
                <a className="navi_name gradient_text" href={window.location.origin}>
                    {firstname} {lastname}
                </a>
                <ul className="nav_link_wrapper">
                    <li className="nav_link_item">
                        <a href="#about_me">{aboutMeTitle}</a>
                    </li>
                    <li className="nav_link_item">
                        <a href="#projects">{projectTitle}</a>
                    </li>
                    <li className="nav_link_item">
                        <a href="#education">{educationTitle}</a>
                    </li>
                    <li className="nav_link_item">
                        <a href="#contact">{contactTitle}</a>
                    </li>
                </ul>
                <div className="navi_bar_right">
                    <DeviceTask />
                    <PaletteTask />
                    <LanguageTask />
                    <DarkmodeTask />
                    {
                        (viewWidth <= 966)
                        ? <div className="nav_action nav_bar_menu_item" onClick={handleMenuToggleClick}>
                            <div className={`nav_bar_menu_line ${menuState ? "first": "normal"}`}></div>
                            <div className={`nav_bar_menu_line ${menuState ? "hide": "normal"}`}></div>
                            <div className={`nav_bar_menu_line ${menuState ? "last": "normal"}`}></div>
                        </div>
                        : null
                    }
                </div>
            </div>
        </nav>
    </header>
    )
}