"use client";
import "../styles/main.css"
import "../styles/theme-settings.css"
import "../styles/frame.css"
import "../styles/content/overview.css";
import "../styles/content/about_me.css";
import "../styles/content/Project.css";
import "../styles/content/education.css";
import { ReactNode, useState } from "react";
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

export default function Home() {

  const [darkmode, setDarkmodeState] = useState(true);
  const [websiteState, setWebsiteState] = useState(true);
  const [openComponents, setOpenComponents] = useState<React.ReactNode[]>([]);

  const handleDarkmode = (state: boolean) => {
    setDarkmodeState(state);
  }

  function handleTaskClick(frame: ReactNode) {
    if (frame) {
      setOpenComponents(prev => [...prev, frame]);
    }
  }

  function handleWebsiteClick (state: boolean) {
    setWebsiteState(state);
  }

  return (
    websiteState
    ? <div id="webpage" className="webpage">
      <img className="webpage_background" src="/images/bubbles.png" alt="" />
      <div className="webpage_container">
        <div className="webpage_header">
          <div className="webpage_header_name">
            <span>
              Firstname
            </span>
            <span>
              Lastname
            </span>
          </div>
          <div className="webpage_header_buttons">
            <DesktopWebsite state={true} onClick={handleWebsiteClick}></DesktopWebsite>
            <DarkMode state={darkmode} onclick={handleDarkmode}/>
          </div>
        </div>
        <Overview title="Übersicht" icon_url="images/home.png" raw />
        <AboutMe title="Über mich" icon_url="images/person.png" raw />
        <Projects title="Projekte" icon_url="images/project.png" raw />
        <Education title="Bildung und Berufserfahrung" icon_url="images/education.png" raw={true} />
        <div className="webpage_footer">  
          <div>
            <span>
              Firstname Lastname
            </span>
          </div>
          <div>
            <span>
              2025 &copy; Alle Rechte Vorbehalten
            </span>
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
        <div id="desktop_task" className="desktop_task">
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
