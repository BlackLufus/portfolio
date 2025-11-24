"use client";
import { ReactNode, useEffect, useRef, useState } from "react";
import loadData, { DataType } from "./services/load_data";
import StartButton from "./components/tasks/start_button";
import Loading from "./widgets/loader";
import Navi from "./components/navigation/navigation";
import Overview, { OverviewConfig } from "./components/overview/overview";
import AboutMe, { AboutMeConfig } from "./components/aboutme/aboutme";
import Skill from "./components/skills/skill";
import Project, { ProjectConfig } from "./components/project/project";
import Education, { EducationConfig } from "./components/education/eduction";
import Contact, { ContactConfig } from "./components/contact/contact";
import Footer from "./components/footer/footer";
import Task, { TaskId } from "./components/tasks/taskbar";
import LanguageManager, { LanguageCode } from "./global/languageSubscriber";
import DarkmodeThemeManager, { ColorThemeManager, DarkmodeCode } from "./global/dataThemeManager";
import DeviceTask from "./components/tasks/deviceTask";
import LanguageTask from "./components/tasks/languageTask";
import DarkModeTask from "./components/tasks/darkmodeTask";
import DeviceManager, { DeviceCode } from "./global/deviceManager";
import TimeAndDateTask from "./components/tasks/time";

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
  const [deviceCode, setDeviceCode] = useState<DeviceCode>(DeviceCode.WEBSITE);
  const [darkmodeTheme, setDarkmodeTheme] = useState<string | null>(null);
  const [colorTheme, setColorTheme] = useState(0);
  const [languageCode, setLanguageCode] = useState<LanguageCode | null>(null);
  const [openComponents, setOpenComponents] = useState<React.ReactNode[]>([]);

  const webpageContainerRef = useRef<HTMLDivElement>(null);

  async function handleTaskClick(taskId: TaskId) {
    const frame = async (taskId: TaskId): Promise<ReactNode> => {
      switch (taskId) {
        case TaskId.OVERVIEW:
          return <Overview firstname={data!.firstname} lastname={data!.lastname} config={data?.overview} />
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

  const handleDeviceChanged = (code: DeviceCode) => {
    if (code == DeviceCode.WEBSITE) {
      setOpenComponents([]);
    }
    setDeviceCode(code);
  }

  const handleDarkmodeThemeChanged = (code: DarkmodeCode) => {
    setDarkmodeTheme(code);
  }

  const handleColorThemeChanged = (index: number) => {
    setColorTheme(index);
  }

  const handleLanguageChanged = (code: LanguageCode) => {
    setLanguageCode(code);
  }

  useEffect(() => {
    const darkmodeCode = DarkmodeThemeManager.load();
    DarkmodeThemeManager.subscribe(handleDarkmodeThemeChanged);
    DarkmodeThemeManager.sendNotification(darkmodeCode);

    const colorIndex = ColorThemeManager.load();
    ColorThemeManager.subscribe(handleColorThemeChanged);
    ColorThemeManager.sendNotification(colorIndex);

    const languageCode = LanguageManager.load();
    LanguageManager.subscribe(handleLanguageChanged);
    LanguageManager.sendNotification(languageCode);

    DeviceManager.subscribe(handleDeviceChanged);

    return () => {
      DarkmodeThemeManager.unsubscribe(handleDarkmodeThemeChanged)
      ColorThemeManager.unsubscribe(handleColorThemeChanged);
      LanguageManager.unsubscribe(handleLanguageChanged);
      DeviceManager.unsubscribe(handleDeviceChanged);
    }
  }, []);

  useEffect(() => {
    if (languageCode != null) {
      loadData<GeneralData>(DataType.GENERAL, languageCode).then((res) => {
        setGeneralData(res);
      });
    }
  }, [languageCode]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", darkmodeTheme!);
  }, [darkmodeTheme]);

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
    deviceCode == DeviceCode.WEBSITE
    ? <>
      <main ref={webpageContainerRef} className="webpage_wrapper">
        <Navi
          firstname={data.firstname}
          lastname={data.lastname}
          aboutMeTitle={data.about_me.title}
          projectTitle={data.project.title}
          educationTitle={data.education.title}
          contactTitle={data.contact.title}
          desktopViewTitle={data.desktop_view}
          languageTitle={data.language} />
        <Overview 
          firstname={data.firstname}
          lastname={data.lastname}/>
        <AboutMe />
        <Skill />
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
    : <>
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
          <LanguageTask className="task_action" />
          <DarkModeTask className="task_action" />
          <DeviceTask className="task_action" />
          <TimeAndDateTask />
        </div>
      </footer>
    </>
  );
}
