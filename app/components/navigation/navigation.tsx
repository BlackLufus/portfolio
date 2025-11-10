import { useEffect, useRef, useState } from "react";
import { LanguageCode } from "@/global/languageSubscriber";
interface NaviProbs {
    firstname: string;
    lastname: string;
    aboutMeTitle: string;
    projectTitle: string;
    educationTitle: string;
    contactTitle: string;
    pageState: boolean;
    handlePageClick: () => void;
    languageState: LanguageCode;
    handleLanguageClick: () => void;
    darkmodeState: boolean;
    handleDarkmodeClick: () => void;
}

export default function Navi({firstname, lastname, aboutMeTitle, projectTitle, educationTitle, contactTitle, pageState, handlePageClick, languageState, handleLanguageClick, darkmodeState, handleDarkmodeClick}: NaviProbs) {

    const naviRef = useRef<HTMLDivElement>(null);
    const naviMenuWrapper = useRef<HTMLDivElement>(null);
    const [menuState, setMenuState] = useState<boolean>(false);
    const [viewWidth, setViewWidth] = useState<number>(window.innerWidth)

    const handleMenuToggleClick = () => {
        setMenuState(!menuState);
        naviMenuWrapper.current!.className = `navi_menu_wrapper ${viewWidth <= 1100 ? menuState ? "hide" : "show" : ""}`
    }

    const handleNaviClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
    }

    const handleWindowClick = () => {
        if (menuState) handleMenuToggleClick()
    }

    const handleWindowResize = () => {
        setViewWidth(window.innerWidth)
        if (window.innerWidth > 1100 && menuState) handleMenuToggleClick()
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
        <nav ref={naviRef} className="navi" onClick={handleNaviClick}>
            <div className={`navi_bar_wrapper ${menuState ? "show": ""}`}>
                <div className="nav_bar_left">
                    <span className="navi_name gradient_text">
                        {firstname} {lastname}
                    </span>
                    <span className="navi_name_short gradient_text">
                        {firstname} {lastname.split("")[0]}.
                    </span>
                </div>
                <ul className="navi_menu_bar_list">
                    <li className="navi_menu_bar_item">
                        <a className="navi_menu_bar_item_a" href="#about_me">{aboutMeTitle}</a>
                    </li>
                    <li className="navi_menu_bar_item">
                        <a className="navi_menu_bar_item_a" href="#projects">{projectTitle}</a>
                    </li>
                    <li className="navi_menu_bar_item">
                        <a className="navi_menu_bar_item_a" href="#education">{educationTitle}</a>
                    </li>
                    <li className="navi_menu_bar_item">
                        <a className="navi_menu_bar_item_a" href="#contact">{contactTitle}</a>
                    </li>
                </ul>
                <div className="navi_bar_right">
                    {
                        (viewWidth >= 768)
                        ? <div className="navi_bar_item nav_bar_desktop_wrapper" onClick={handlePageClick}>
                            <svg className="nav_bar_darkmode_svg" fill={darkmodeState ? "#000" : "#fff"} width="40px" height="40px" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16 20a1 1 0 0 1-1 1 1 1 0 0 1-1-1 1 1 0 0 1 1-1 1 1 0 0 1 1 1zM2.5 17h25c.277 0 .5.223.5.5s-.223.5-.5.5h-25c-.277 0-.5-.223-.5-.5s.223-.5.5-.5zm-1-14C.678 3 0 3.678 0 4.5v17c0 .822.678 1.5 1.5 1.5H12v3H9.5c-.277 0-.5.223-.5.5s.223.5.5.5h11c.277 0 .5-.223.5-.5s-.223-.5-.5-.5H18v-3h10.5c.822 0 1.5-.678 1.5-1.5v-17c0-.822-.678-1.5-1.5-1.5zm0 1h27c.286 0 .5.214.5.5v17c0 .286-.214.5-.5.5h-27c-.286 0-.5-.214-.5-.5v-17c0-.286.214-.5.5-.5zM13 23h4v3h-4z"/>
                            </svg>
                        </div>
                        : null
                    }
                    {
                        (viewWidth >= 768)
                        ? <div className="navi_bar_item nav_bar_langauge_wrapper" onClick={handleLanguageClick}>
                            <div className={`nav_bar_langauge ${languageState == LanguageCode.DE ? "show" : ""}`}>
                                <span className="nav_bar_langauge_span">
                                    DE
                                </span>
                            </div>
                            <div className={`nav_bar_langauge ${languageState == LanguageCode.EN ? "show" : ""}`}>
                                <span className="nav_bar_langauge_span">
                                    EN
                                </span>
                            </div>
                        </div>
                        : null
                    }
                    <div onClick={handleDarkmodeClick} className="navi_bar_item nav_bar_darkmode_wrapper">
                        <div className={`nav_bar_darkmode ${darkmodeState ? "" : "show"}`}>
                            <svg className="nav_bar_darkmode_svg" fill="#fff" width="40px" height="40px" viewBox="0 -4.5 33 33" xmlns="http://www.w3.org/2000/svg">
                                <path d="m6.57 10.402h.012c1.121 0 2.15.392 2.957 1.047l-.009-.007c.154.124.353.2.569.2.287 0 .543-.132.71-.339l.001-.002c.124-.154.2-.353.2-.569 0-.287-.133-.543-.34-.71l-.002-.001c-.539-.433-1.164-.788-1.842-1.035l-.046-.015c1.285-1.881 3.417-3.101 5.834-3.108h.001c3.867.003 7.005 3.124 7.034 6.984v.003c-.82.145-1.54.495-2.129.995l.006-.005c-.196.168-.32.416-.32.694 0 .224.081.429.215.588l-.001-.001c.168.196.416.32.694.32.224 0 .429-.081.588-.215l-.001.001c.457-.389 1.055-.625 1.707-.625 1.46.002 2.644 1.185 2.646 2.645-.001 1.461-1.185 2.645-2.645 2.646h-15.84c-2.62-.003-4.743-2.127-4.746-4.747.004-2.619 2.126-4.741 4.745-4.744zm17.892-8.503c-.087.281-.162.622-.212.971l-.004.037c-.042.287-.066.619-.066.956 0 3.493 2.579 6.384 5.937 6.874l.038.004c.291.043.626.068.967.068h.062-.003c-.985 2.036-2.974 3.447-5.306 3.593l-.018.001c-.602-.723-1.418-1.249-2.349-1.483l-.031-.007v-.017c-.001-2.989-1.483-5.631-3.752-7.233l-.028-.019c.847-1.959 2.608-3.381 4.729-3.739l.037-.005zm-17.892 19.815h15.84c2.466-.003 4.464-2.001 4.466-4.467-.002-.396-.055-.779-.153-1.144l.007.031c3.284-.533 5.88-2.967 6.646-6.117l.011-.056c.015-.062.024-.133.024-.206 0-.239-.092-.457-.243-.62l.001.001c-.167-.18-.404-.292-.668-.292-.049 0-.096.004-.143.011l.005-.001-.362.056c-.266.049-.573.077-.886.077-.252 0-.499-.018-.741-.053l.028.003c-2.505-.362-4.408-2.494-4.408-5.07 0-.25.018-.495.052-.736l-.003.027c.094-.658.299-1.251.597-1.786l-.013.026c.082-.129.132-.286.136-.454v-.001c0-.007 0-.016 0-.025 0-.486-.381-.883-.86-.908h-.002c-.125-.007-.272-.011-.419-.011-3.263 0-6.077 1.928-7.363 4.706l-.021.05c-1.024-.452-2.219-.715-3.475-.715-.003 0-.006 0-.009 0-3.311.008-6.195 1.823-7.721 4.511l-.023.044c-.102-.005-.203-.013-.305-.013-3.625.004-6.562 2.942-6.566 6.566.004 3.625 2.941 6.563 6.566 6.568z"/>
                            </svg>
                        </div>
                        <div className={`nav_bar_darkmode ${darkmodeState ? "show" : ""}`}>
                            <svg className="nav_bar_darkmode_svg" fill="#000" width="40" height="40px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 1.25C12.4142 1.25 12.75 1.58579 12.75 2V4C12.75 4.41421 12.4142 4.75 12 4.75C11.5858 4.75 11.25 4.41421 11.25 4V2C11.25 1.58579 11.5858 1.25 12 1.25ZM3.66865 3.71609C3.94815 3.41039 4.42255 3.38915 4.72825 3.66865L6.95026 5.70024C7.25596 5.97974 7.2772 6.45413 6.9977 6.75983C6.7182 7.06553 6.2438 7.08677 5.9381 6.80727L3.71609 4.77569C3.41039 4.49619 3.38915 4.02179 3.66865 3.71609ZM20.3314 3.71609C20.6109 4.02179 20.5896 4.49619 20.2839 4.77569L18.0619 6.80727C17.7562 7.08677 17.2818 7.06553 17.0023 6.75983C16.7228 6.45413 16.744 5.97974 17.0497 5.70024L19.2718 3.66865C19.5775 3.38915 20.0518 3.41039 20.3314 3.71609ZM12 7.75C9.65279 7.75 7.75 9.65279 7.75 12C7.75 14.3472 9.65279 16.25 12 16.25C14.3472 16.25 16.25 14.3472 16.25 12C16.25 9.65279 14.3472 7.75 12 7.75ZM6.25 12C6.25 8.82436 8.82436 6.25 12 6.25C15.1756 6.25 17.75 8.82436 17.75 12C17.75 15.1756 15.1756 17.75 12 17.75C8.82436 17.75 6.25 15.1756 6.25 12ZM1.25 12C1.25 11.5858 1.58579 11.25 2 11.25H4C4.41421 11.25 4.75 11.5858 4.75 12C4.75 12.4142 4.41421 12.75 4 12.75H2C1.58579 12.75 1.25 12.4142 1.25 12ZM19.25 12C19.25 11.5858 19.5858 11.25 20 11.25H22C22.4142 11.25 22.75 11.5858 22.75 12C22.75 12.4142 22.4142 12.75 22 12.75H20C19.5858 12.75 19.25 12.4142 19.25 12ZM17.0255 17.0252C17.3184 16.7323 17.7933 16.7323 18.0862 17.0252L20.3082 19.2475C20.6011 19.5404 20.601 20.0153 20.3081 20.3082C20.0152 20.6011 19.5403 20.601 19.2475 20.3081L17.0255 18.0858C16.7326 17.7929 16.7326 17.3181 17.0255 17.0252ZM6.97467 17.0253C7.26756 17.3182 7.26756 17.7931 6.97467 18.086L4.75244 20.3082C4.45955 20.6011 3.98468 20.6011 3.69178 20.3082C3.39889 20.0153 3.39889 19.5404 3.69178 19.2476L5.91401 17.0253C6.2069 16.7324 6.68177 16.7324 6.97467 17.0253ZM12 19.25C12.4142 19.25 12.75 19.5858 12.75 20V22C12.75 22.4142 12.4142 22.75 12 22.75C11.5858 22.75 11.25 22.4142 11.25 22V20C11.25 19.5858 11.5858 19.25 12 19.25Z"/>
                            </svg>
                        </div>
                    </div>
                    {
                        (viewWidth <= 1100)
                        ? <div className="navi_bar_item navi_menu_button_wrapper" onClick={handleMenuToggleClick}>
                            <div className={`navi_menu_button_line ${menuState ? "first": "normal"}`}></div>
                            <div className={`navi_menu_button_line ${menuState ? "hide": "normal"}`}></div>
                            <div className={`navi_menu_button_line ${menuState ? "last": "normal"}`}></div>
                        </div>
                        : null
                    }
                </div>
            </div>
            {
                (viewWidth < 1100)
                ? <div inert={!menuState} ref={naviMenuWrapper} className="navi_menu_wrapper">
                    <ul className="navi_menu_list">
                        <a href="#about_me">
                            <li className="navi_menu_item">
                                <svg className="navi_menu_svg" fill="#000000" width="40px" height="40px" viewBox="-3 0 19 19" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12.517 12.834v1.9a1.27 1.27 0 0 1-1.267 1.267h-9.5a1.27 1.27 0 0 1-1.267-1.267v-1.9A3.176 3.176 0 0 1 3.65 9.667h5.7a3.176 3.176 0 0 1 3.167 3.167zM3.264 5.48A3.236 3.236 0 1 1 6.5 8.717a3.236 3.236 0 0 1-3.236-3.236z"/>
                                </svg>
                                <span className="navi_menu_span">
                                    {aboutMeTitle}
                                </span>
                            </li>
                        </a>
                        <a href="#projects">
                            <li className="navi_menu_item">
                                <svg className="navi_menu_svg" fill="#000000" height="40px" width="40px" version="1.2" baseProfile="tiny" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                                    <path d="M218.8,52.1H110.2v-0.9c0.1-0.5,0.1-1.1,0.1-1.6V38.2c0-7.8-6.4-14.2-14.2-14.2H85.9H33.4H23.3c-7.8,0-14.2,6.4-14.2,14.2
                                        v10.1v1.2V75v130.7c0,15.5,12.6,28,28.1,28.1h181.6c15.5,0,28.1-12.6,28.1-28.1V80.2C246.9,64.7,234.3,52.1,218.8,52.1z
                                        M218.8,215.1H37.2c-5.2-0.1-9.3-4.2-9.4-9.4V80.3c0.1-5.2,4.2-9.3,9.4-9.4h181.6c5.2,0.1,9.3,4.2,9.4,9.4v125.4h0
                                        C228.1,210.9,224,215,218.8,215.1z M170.2,108.3c0-11.2,9.1-20.4,20.4-20.4s20.4,9.1,20.4,20.4c0,11.2-9.1,20.4-20.4,20.4h-0.1
                                        c0,0,0,0,0,0C179.2,128.7,170.2,119.5,170.2,108.3z M158.8,149.9l54.7,52.5h-173l51-103.7l33.8,75.3L158.8,149.9z"/>
                                </svg>
                                <span className="navi_menu_span">
                                    {projectTitle}
                                </span>
                            </li>
                        </a>
                        <a href="#education">
                            <li className="navi_menu_item">
                                <svg className="navi_menu_svg" width="40px" height="40px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.673 5.606a3326.02 3326.02 0 0 1-5.671-2.674L.138 8.524l2.03.98L2 9.531V20h1v-9.626l.72-.124.28.135v5.288c0 .914 5.206 3.533 6.249 4.049a3.89 3.89 0 0 0 3.48-.026C20 16.486 20 15.895 20 15.673v-5.288l3.854-1.857s-3.8-1.801-6.181-2.922zM19 15.504a51.526 51.526 0 0 1-5.726 3.302 2.884 2.884 0 0 1-2.582.02A40.184 40.184 0 0 1 5 15.521v-4.655l7 3.373 7-3.373zm-7-2.373L5.416 9.958l6.469-1.115-.17-.987-7.85 1.354-1.403-.676 9.537-4.495c.825.393 8.523 4.014 9.542 4.494z"/><path fill="none" d="M0 0h24v24H0z"/>
                                </svg>
                                <span className="navi_menu_span">
                                    {educationTitle}
                                </span>
                            </li>
                        </a>
                        <a href="#contact">
                            <li className="navi_menu_item">
                                <svg className="navi_menu_svg" fill="#000000" height="40px" width="40px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <g>
                                    <g>
                                        <path d="M12,20H0v-3.5c0-2.4,1.3-4.5,3.2-5.6C2.5,10.2,2,9.2,2,8.1c0-2.2,1.8-4,4-4s4,1.8,4,4c0,1.1-0.4,2.1-1.2,2.8
                                            c1.9,1.1,3.2,3.3,3.2,5.6V20z M2,18h8v-1.5c0-2.4-1.8-4.5-4-4.5c-2.1,0-4,2.1-4,4.5V18z M6,6C4.9,6,4,6.9,4,8s0.9,2,2,2s2-0.9,2-2
                                            S7.1,6,6,6z M24,17H14v-2h10V17z M21,13h-7v-2h7V13z M24,9H14V7h10V9z"/>
                                    </g>
                                </g>
                                </svg>
                                <span className="navi_menu_span">
                                    {contactTitle}
                                </span>
                            </li>
                        </a>
                        {
                            (viewWidth <= 768)
                            ? <a onClick={handlePageClick}>
                                <li className="navi_menu_item">
                                    <svg className="navi_menu_svg" fill="#000" width="40px" height="40px" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M16 20a1 1 0 0 1-1 1 1 1 0 0 1-1-1 1 1 0 0 1 1-1 1 1 0 0 1 1 1zM2.5 17h25c.277 0 .5.223.5.5s-.223.5-.5.5h-25c-.277 0-.5-.223-.5-.5s.223-.5.5-.5zm-1-14C.678 3 0 3.678 0 4.5v17c0 .822.678 1.5 1.5 1.5H12v3H9.5c-.277 0-.5.223-.5.5s.223.5.5.5h11c.277 0 .5-.223.5-.5s-.223-.5-.5-.5H18v-3h10.5c.822 0 1.5-.678 1.5-1.5v-17c0-.822-.678-1.5-1.5-1.5zm0 1h27c.286 0 .5.214.5.5v17c0 .286-.214.5-.5.5h-27c-.286 0-.5-.214-.5-.5v-17c0-.286.214-.5.5-.5zM13 23h4v3h-4z"/>
                                    </svg>
                                    <span className="navi_menu_span">
                                        Desktop View
                                    </span>
                                </li>
                            </a>
                            : null
                        }
                        {
                            (viewWidth <= 768)
                            ? <a onClick={handleLanguageClick}>
                                <li className="navi_menu_item">
                                    <div className="navi_bar_item nav_bar_langauge_wrapper">
                                        <div className={`nav_bar_langauge ${languageState == LanguageCode.DE ? "show" : ""}`}>
                                            <span className="nav_bar_langauge_span">
                                                DE
                                            </span>
                                        </div>
                                        <div className={`nav_bar_langauge ${languageState == LanguageCode.EN ? "show" : ""}`}>
                                            <span className="nav_bar_langauge_span">
                                                EN
                                            </span>
                                        </div>
                                    </div>
                                    <span className="navi_menu_span">
                                        Sprache
                                    </span>
                                </li>
                            </a>
                            : null
                        }
                    </ul>
                </div>
                : null
            }
        </nav>
    )
}