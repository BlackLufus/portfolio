import Education from "@/window/content/eduction";
import Projects from "@/window/content/projects";
import AboutMe from "@/window/content/about_me";

export enum TaskId {
    ABOUTME = 0,
    PROJECTS = 1,
    EDUCATION = 2,
    CONTACT = 3
}

interface TaskProps {
    task_id: TaskId;
    open_task: Function;
}

export default function Task({task_id, open_task}: TaskProps) {

    const click = () => {
        open_task(tasks[task_id].component)
    }

    const tasks = {
        [TaskId.PROJECTS]: {
            name: "Projekte",
            image: "images/project.png",
            component: <Projects title="Projekte" icon_url="images/project.png"/>
        },
        [TaskId.EDUCATION]: {
            name: "Bildung und Berufserfahrung",
            image: "images/education.png",
            component: <Education title="Bildung und Berufserfahrung" icon_url="images/education.png" />
        },
        [TaskId.ABOUTME]: {
            name: "Über mich",
            image: "images/person.png",
            component: <AboutMe title="Über mich" icon_url="images/person.png" />
        },
        [TaskId.CONTACT]: {
            name: "Kontakt",
            image: "images/contact.png",
            component: <AboutMe title="Kontakt" icon_url="images/contact.png" />
        }
    }

    return(
        <div className="task" onClick={click}>
            <div>
                <img src={tasks[task_id].image} alt="" />
            </div>
            <div>
                <span>
                    {tasks[task_id].name}
                </span>
            </div>
        </div>
    );
}