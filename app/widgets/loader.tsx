interface LoadingProbs {
    width: number | string;
    height: number | string;
    align_items?: string;
    justify_content?: string;
    center?: boolean;
    text?: string;
}

export default function Loading({width, height, align_items="normal", justify_content="left", center=false, text}: LoadingProbs) {
    return(
        <div 
            className={center ? "loader_wraper_center" : "loader_wraper"} 
            style={{
                alignItems: align_items,
                justifyContent: justify_content
            }}>
            <div className="loader_container">
                <span 
                    className="loader"
                    style={{width:width, height:height}}
                />
                <br/>
                <br/>
                {text
                ? <span className="loader_text">
                    {text}
                </span>
                : null
                }
            </div>
        </div>
    );
}