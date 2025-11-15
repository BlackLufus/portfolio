import Image from "next/image";

export enum TaskId {
    OVERVIEW = 0,
    ABOUTME = 1,
    PROJECTS = 2,
    EDUCATION = 3,
    CONTACT = 4
}

interface TaskProps {
    task_id: TaskId;
    title: string;
    icon: string;
    open_task: (task: TaskId) => void;
}

export default function Task({task_id, title, icon, open_task}: TaskProps) {

    const click = () => {
        open_task(task_id)
    }

    return(
        <div className="task" onClick={click}>
            <div>
                <Image src={icon} alt="" />
            </div>
            <div>
                <span>
                    {title}
                </span>
            </div>
        </div>
    );
}