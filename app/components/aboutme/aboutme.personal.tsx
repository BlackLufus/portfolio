interface PersonalProps {
    icon: string,
    text: string
}

export default function Personal({icon, text}:PersonalProps) {


    return(
        <div className="personal">
            {/* <div className="personal_image_container">
                <img className="personal_image" src={icon} alt="" />
            </div> */}
            <div className="personal_text_container">
                <span className="personal_text">
                    {text}
                </span>
            </div>
        </div>
    );
}