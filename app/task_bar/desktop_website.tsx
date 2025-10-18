"use client";

interface DesktopWebsiteProbs {
    state: boolean
    onClick: Function
}

export default function DesktopWebsite({state, onClick}:DesktopWebsiteProbs) {

    const handleClick = () => {
        onClick();
    }

    return (
        <div id="desktop_website" className="desktop_website" onClick={handleClick}>
            {state
                ? <div>
                    <img
                        src="../images/desktop.png"
                        alt=""
                    />
                </div>
                : <div>
                    <img
                        src="../images/website.png"
                        alt=""
                    />
                </div>
                }
        </div>
    );
}
