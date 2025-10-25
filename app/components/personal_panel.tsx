interface PersonalProps {
    icon: string,
    text: string
}

export default function PersonalPanel({icon, text}:PersonalProps) {


    return(
        <div className="personal">
            <div className="personal_image">
                <img src={icon} alt="" />
            </div>
            <div className="personal_text">
                <span>
                    {text}
                </span>
            </div>
        </div>
    );
}