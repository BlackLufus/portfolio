"use client";
import "../styles/general.css";
import "../styles/main.css"
import "../styles/theme-settings.css"
import "../styles/frame.css"
import "../styles/nav.css";
import "../styles/components/numberdetector.css";
import "../styles/components/overview.css";
import "../styles/components/about_me.css";
import "../styles/components/project.css";
import "../styles/components/education.css";
import "../styles/components/contact.css";
import "../styles/components/footer.css";
import "../styles/components/form.css";
import { ReactNode, useEffect, useRef, useState } from "react";
import loadData, { DataType } from "./services/load_data";
import DesktopWebsite from "./components/taskbar/desktop_website";
import DarkMode from "./components/taskbar/darkmode";
import TimeAndDate from "./components/taskbar/time";
import Language from "./components/taskbar/language";
import StartButton from "./components/taskbar/start_button";
import Loading from "./widgets/loader";
import Navi from "./components/navigation/navigation";
import Overview, { OverviewConfig } from "./components/overview";
import AboutMe, { AboutMeConfig } from "./components/aboutme/aboutme";
import Project, { ProjectConfig } from "./components/project/project";
import Education, { EducationConfig } from "./components/education/eduction";
import Contact, { ContactConfig } from "./components/contact/contact";
import Footer from "./components/footer/footer";
import Task, { TaskId } from "./components/taskbar/taskbar";
import LanguageNotifier, { LanguageCode } from "./global/languageSubscriber";

interface GeneralData {
  firstname: string;
  lastname: string;
  overview: OverviewConfig;
  about_me: AboutMeConfig;
  project: ProjectConfig;
  education: EducationConfig;
  contact: ContactConfig;
  desktop_view: string;
  language: string;
  year: string;
  all_rights_reserved: string;
  link_text: string;
  linkedin_link: string;
  github_link: string;
  version: string;
}

export default function Home() {

  const [data, setGeneralData] = useState<GeneralData | null>(null);
  const [pageState, setWebsiteState] = useState(true);
  const [languageCode, setLanguageCode] = useState(LanguageNotifier.code);
  const [darkmodeState, setDarkmodeState] = useState(true);
  const [openComponents, setOpenComponents] = useState<React.ReactNode[]>([]);

  const webpageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadData<GeneralData>(DataType.GENERAL, languageCode).then((res) => {
        setGeneralData(res);
    });
  }, [languageCode]);

  async function handleTaskClick(taskId: TaskId) {
    const frame = async (taskId: TaskId): Promise<ReactNode> => {
      switch (taskId) {
        case TaskId.OVERVIEW:
          return <Overview config={data?.overview} />
        case TaskId.ABOUTME:
          return <AboutMe config={data?.about_me} />
        case TaskId.PROJECTS:
          return <Project config={data?.project} />
        case TaskId.EDUCATION:
          return <Education config={data?.education} />
        case TaskId.CONTACT:
          return <Contact config={data?.contact} />
      }
    }
    const node = await frame(taskId);
    setOpenComponents((prev) => [...prev, node]);
  }

  const handlePageClick = () => {
    if (!pageState) {
      setOpenComponents([]);
    }
    setWebsiteState(!pageState);
  }

  const handleLanguageClick = () => {
    const newLanguageCode = languageCode == LanguageCode.DE ? LanguageCode.EN : LanguageCode.DE;
    setLanguageCode(newLanguageCode)
    LanguageNotifier.sendNotification(newLanguageCode);
  }

  const handleDarkmodeClick = () => {
    document.documentElement.setAttribute(
        'data-theme', 
        darkmodeState ? 'dark' : 'light'
    );
    setDarkmodeState(!darkmodeState);
  }

  if (!data) return(
    <Loading 
      width="100px" 
      height="100px"
      align_items="center"
      justify_content="center"
      text="Data is loading ..."
    />
  )

  return (
    pageState
    ? <>
      <Navi
        firstname={data.firstname}
        lastname={data.lastname}
        aboutMeTitle={data.about_me.title}
        projectTitle={data.project.title}
        educationTitle={data.education.title}
        contactTitle={data.contact.title}
        desktopViewTitle={data.desktop_view}
        languageTitle={data.language}
        pageState={pageState}
        handlePageClick={handlePageClick}
        languageState={languageCode}
        handleLanguageClick={handleLanguageClick}
        darkmodeState={darkmodeState}
        handleDarkmodeClick={handleDarkmodeClick} />
      <main ref={webpageContainerRef} className="webpage_wrapper">
        <Overview />
        <AboutMe />
        <Project />
        <Education
          ref={webpageContainerRef} />
        <Contact />
        <Footer
          firstname={data.firstname}
          lastname={data.lastname}
          year={data.year}
          allRightsReserved={data.all_rights_reserved}
          linkTitle={data.link_text}
          githubLink={data.github_link}
          linkedInLink={data.linkedin_link}
          version={data.version} />
      </main>
    </>
    : <div>
      <main id="desktop" className="desktop">
        <img className="background_image" src="images/bubbles.png" alt="bubbles" loading="lazy" />
        <div id="desktop_application" className="desktop_application">
          {openComponents.map((comp, index) => (
            <div key={index}>{comp}</div>
          ))}
        </div>
        <div className="desktop_task">
          <Task 
            task_id={TaskId.OVERVIEW}  
            title={data.overview.title} 
            icon={data.overview.icon} 
            open_task={handleTaskClick} />
          <Task 
            task_id={TaskId.ABOUTME} 
            title={data.about_me.title} 
            icon={data.about_me.icon} 
            open_task={handleTaskClick} />
          <Task 
            task_id={TaskId.PROJECTS}  
            title={data.project.title} 
            icon={data.project.icon} 
            open_task={handleTaskClick} />
          <Task 
            task_id={TaskId.EDUCATION} 
            title={data.education.title} 
            icon={data.education.icon} 
            open_task={handleTaskClick} />
          <Task 
            task_id={TaskId.CONTACT} 
            title={data.contact.title} 
            icon={data.contact.icon} 
            open_task={handleTaskClick} />
        </div>
      </main>
      <footer className="task_bar">
        <div className="task_button">
          <StartButton/>
        </div>
        <div className="task_apps">
        </div>
        <div className="task_right">
          <Language
            state={languageCode}
            onClick={handleLanguageClick}/>
          <DarkMode 
            state={darkmodeState} 
            onclick={handleDarkmodeClick} />
          <DesktopWebsite 
            state={pageState} 
            onClick={handlePageClick} />
          <TimeAndDate />
        </div>
      </footer>
    </div>
  );
}
