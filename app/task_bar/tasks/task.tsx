import Education from "@/window/content/eduction";
import Projects from "@/window/content/projects";
import Scroll from "@/window/content/scroll";

export enum TaskId {
    PROJECTS = 0,
    EDUCATION = 1,
    SCROLL = 10,
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
        [TaskId.SCROLL]: {
            name: "Scroll",
            image: "images/education.png",
            component: <Scroll title="Scrol" icon_url="images/education.png" />
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