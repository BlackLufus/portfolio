interface professionalProps {
    data: string;
    text: string;
}

export default function Professional({data, text}:professionalProps) {


    return(
        <div className="professional">
            <div className="professional_data_container">
                <span className="professional_data">
                    {data}
                </span>
                <span className="professional_text">
                    {text}
                </span>
            </div>
        </div>
    );
}