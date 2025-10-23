import Education from "@/window/content/eduction";
import Projects from "@/window/content/projects";
import AboutMe from "@/window/content/about_me";
import Overview from "@/window/content/overview";
import { ReactNode } from "react";

export enum TaskId {
    OVERVIEW = 0,
    ABOUTME = 1,
    PROJECTS = 2,
    EDUCATION = 3,
    CONTACT = 4
}

interface TaskProps {
    task_id: TaskId;
    open_task: (task: TaskId) => void;
}

export default function Task({task_id, open_task}: TaskProps) {

    const click = () => {
        open_task(task_id)
    }

    const tasks = {
        [TaskId.OVERVIEW]: {
            name: "Übersicht",
            image: "images/home.png",
        },
        [TaskId.ABOUTME]: {
            name: "Über mich",
            image: "images/person.png",
        },
        [TaskId.PROJECTS]: {
            name: "Projekte",
            image: "images/project.png",
        },
        [TaskId.EDUCATION]: {
            name: "Bildung und Berufserfahrung",
            image: "images/education.png",
        },
        [TaskId.CONTACT]: {
            name: "Kontakt",
            image: "images/contact.png",
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