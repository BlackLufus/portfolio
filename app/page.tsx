"use client";
import "../styles/general.css";
import "../styles/main.css"
import "../styles/theme-settings.css"
import "../styles/frame.css"
import "../styles/content/overview.css";
import "../styles/content/about_me.css";
import "../styles/content/Project.css";
import "../styles/content/education.css";
import { ReactNode, useEffect, useRef, useState } from "react";
import DesktopWebsite from "./task_bar/desktop_website";
import DarkMode from "./task_bar/darkmode";
import TimeAndDate from "./task_bar/time";
import Language from "./task_bar/language";
import StartButton from "./task_bar/start_button";
import Task, { TaskId } from "./task_bar/tasks/task";
import Overview from "./window/content/overview";
import AboutMe from "./window/content/about_me";
import Projects from "./window/content/projects";
import Education from "./window/content/eduction";
import loadData, { DataType } from "./load_data";
import IconSvg from "./widgets/icon_svg";

interface GeneralData {
  firstname: string;
  lastname: string;
  about_me: string;
  projects: string;
  education: string;
  contact: string;
  year: string;
  all_rights_reserved: string;
  link_text: string;
  linkedin_link: string;
  github_link: string;
}

export default function Home() {

  const [data, setGeneralData] = useState<GeneralData | null>(null);
  const [darkmode, setDarkmodeState] = useState(true);
  const [websiteState, setWebsiteState] = useState(true);
  const [openComponents, setOpenComponents] = useState<React.ReactNode[]>([]);

  const webpage_container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadData<GeneralData>(DataType.GENERAL).then((res) => {
        setGeneralData(res);
    });
  }, []);

  const handleDarkmode = (state: boolean) => {
    setDarkmodeState(state);
  }

  async function handleTaskClick(taskId: TaskId) {
    const frame = async (taskId: TaskId): Promise<ReactNode> => {
      switch (taskId) {
        case TaskId.OVERVIEW:
          return <Overview title="Übersicht" icon_url="images/home.png" />
        case TaskId.ABOUTME:
          return <AboutMe title="Über mich" icon_url="images/person.png" />
        case TaskId.PROJECTS:
          return <Projects title="Projekte" icon_url="images/project.png"/>
        case TaskId.EDUCATION:
          return <Education title="Bildung und Berufserfahrung" icon_url="images/education.png" />
        case TaskId.CONTACT:
          return <AboutMe title="Kontakt" icon_url="images/contact.png" />
      }
    }
    const node = await frame(taskId);
    setOpenComponents((prev) => [...prev, node]);
  }

  const handleWebsiteClick = (state: boolean) => {
    setWebsiteState(state);
  }

  if (!data) return(
    <div>
      Data is loading, please hold on.
    </div>
  )

  return (
    websiteState
    ? <div className="webpage">
      <img className="webpage_background" src="/images/bubbles.png" alt="" />
      <div ref={webpage_container} className="webpage_container">
        <div className="webpage_header">
          <div className="webpage_header_name_container">
            <span className="webpage_header_name_firstname">
              {data.firstname}
            </span>
            <span className="webpage_header_name_lastname">
              {data.lastname}
            </span>
            <span className="webpage_header_name_lastname_short">
              {data.lastname.split("")[0]}.
            </span>
          </div>
          <ul className="webpage_header_menu_ulist">
            <li className="webpage_header_menu_ulist_item">
              <a className="webpage_header_menu_ulist_a" href="#about_me">{data.about_me}</a>
            </li>
            <li className="webpage_header_menu_ulist_item">
              <a className="webpage_header_menu_ulist_a" href="#projects">{data.projects}</a>
            </li>
            <li className="webpage_header_menu_ulist_item">
              <a className="webpage_header_menu_ulist_a" href="#education">{data.education}</a>
            </li>
            <li className="webpage_header_menu_ulist_item">
              <a className="webpage_header_menu_ulist_a" href="#contact">{data.contact}</a>
            </li>
          </ul>
          <div className="webpage_header_buttons">
            <DesktopWebsite state={true} onClick={handleWebsiteClick}></DesktopWebsite>
            <DarkMode state={darkmode} onclick={handleDarkmode}/>
          </div>
        </div>
        <Overview title="Übersicht" icon_url="images/home.png" raw />
        <AboutMe title="Über mich" icon_url="images/person.png" raw />
        <Projects title="Projekte" icon_url="images/project.png" raw />
        <Education ref={webpage_container} title="Bildung und Berufserfahrung" icon_url="images/education.png" raw={true} />
        <div className="webpage_footer">
          <div className="webpage_footer_left">
            <div>
              <span className="webpage_footer_name">
                {data.firstname} {data.lastname}
              </span>
            </div>
            <div>
              <span className="webpage_footer_copyright">
                {data.year} &copy; {data.all_rights_reserved}
              </span>
            </div>
          </div>
          <div className="webpage_footer_right">
            <div className="webpage_footer_title_container">
              <span className="webpage_footer_title">
                {data.link_text}
              </span>
            </div>
            <div className="webpage_footer_links">
              <a className="webpage_footer_link_href" href={data.github_link}>
                <IconSvg
                    src="svg/github.svg"
                    className="webpage_footer_link_icon"
                  />
              </a>
              <a className="webpage_footer_link_href" href={data.linkedin_link}>
                <IconSvg 
                    src="svg/linkedin.svg"
                    className="webpage_footer_link_icon"
                  />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    : <div>
      <main id="desktop" className="desktop">
        <img className="background_image" src="images/bubbles.png" alt="bubbles" loading="lazy" />
        <div id="desktop_application" className="desktop_application">
          {openComponents.map((comp, index) => (
            <div key={index}>{comp}</div>
          ))}
        </div>
        <div className="desktop_task">
          <Task task_id={TaskId.OVERVIEW} open_task={handleTaskClick}/>
          <Task task_id={TaskId.ABOUTME} open_task={handleTaskClick}/>
          <Task task_id={TaskId.PROJECTS} open_task={handleTaskClick}/>
          <Task task_id={TaskId.EDUCATION} open_task={handleTaskClick}/>
          <Task task_id={TaskId.CONTACT} open_task={handleTaskClick}/>
        </div>
      </main>
      <footer>
        <div className="task_button">
          <StartButton/>
        </div>
        <div className="task_apps">
          <p>
            Footer
          </p>
        </div>
        <div className="task_right">
          <Language/>
          <DarkMode state={darkmode} onclick={handleDarkmode} />
          <DesktopWebsite state={websiteState} onClick={handleWebsiteClick} />
          <TimeAndDate/>
        </div>
      </footer>
    </div>
  );
}
