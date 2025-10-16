"use client";
import "../styles/main.css"
import "../styles/theme-settings.css"
import "../styles/frame.css"
import "../styles/content/projects.css";
import "../styles/content/elements/about_me.css";
import "../styles/content/elements/Project.css";
import "../styles/content/elements/education.css";
import { ReactNode, useEffect, useState } from "react";
import DarkMode from "./task_bar/darkmode";
import TimeAndDate from "./task_bar/time";
import Language from "./task_bar/language";
import StartButton from "./task_bar/start_button";
import Task, { TaskId } from "./task_bar/tasks/task";

export default function Home() {

  const [openComponents, setOpenComponents] = useState<React.ReactNode[]>([]);

  function handleTaskClick(frame: ReactNode) {
    if (frame) {
      setOpenComponents(prev => [...prev, frame]);
    }
  }
  return (
    <div>
      <main id="desktop" className="desktop">
        <img src="images/bubbles.png" alt="bubbles" loading="lazy" />
        <div id="desktop_application" className="desktop_application">
          {openComponents.map((comp, index) => (
            <div key={index}>{comp}</div>
          ))}
        </div>
        <div id="desktop_task" className="desktop_task">
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
          <DarkMode/>
          <TimeAndDate/>
        </div>
      </footer>
    </div>
  );
}
