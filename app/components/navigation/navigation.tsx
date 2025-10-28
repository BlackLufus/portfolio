import DarkMode from "@/components/taskbar/darkmode";
import DesktopWebsite from "@/components/taskbar/desktop_website";

interface NaviProbs {
    firstname: string;
    lastname: string;
    aboutMeTitle: string;
    projectTitle: string;
    educationTitle: string;
    contactTitle: string;
    pageState: boolean;
    handlePageClick: () => void;
    darkmodeState: boolean;
    handleDarkmodeClick: () => void;
}

export default function Navi({firstname, lastname, aboutMeTitle, projectTitle, educationTitle, contactTitle, pageState, handlePageClick, darkmodeState, handleDarkmodeClick}: NaviProbs) {
    return(
        <div className="navi">
            <div className="navi_name_container">
                <span className="navi_name_firstname">
                    {firstname}
                </span>
                <span className="navi_name_lastname">
                    {lastname}
                </span>
                <span className="navi_name_lastname_short">
                    {lastname.split("")[0]}.
                </span>
            </div>
            <ul className="navi_menu_ulist">
                <li className="navi_menu_ulist_item">
                    <a className="navi_menu_ulist_a" href="#about_me">{aboutMeTitle}</a>
                </li>
                <li className="navi_menu_ulist_item">
                    <a className="navi_menu_ulist_a" href="#projects">{projectTitle}</a>
                </li>
                <li className="navi_menu_ulist_item">
                    <a className="navi_menu_ulist_a" href="#education">{educationTitle}</a>
                </li>
                <li className="navi_menu_ulist_item">
                    <a className="navi_menu_ulist_a" href="#contact">{contactTitle}</a>
                </li>
            </ul>
            <div className="navi_buttons">
                <DesktopWebsite state={pageState} onClick={handlePageClick}></DesktopWebsite>
                <DarkMode state={darkmodeState} onclick={handleDarkmodeClick}/>
            </div>
        </div>
    )
}