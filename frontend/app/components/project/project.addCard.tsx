interface ProjectAddCardProps {
    index: number;
    onClick: (state: boolean) => void;
};

export default function ProjectAddCard({ index, onClick }: ProjectAddCardProps) {

    const delay = `${(index * 0.075)}s`;
    return (
        <li className="project_list_item" style={{"--delay": delay} as React.CSSProperties}>
            <div className="project_add_card" onClick={() => {
                onClick(true)
            }} />
        </li>
    );
}
