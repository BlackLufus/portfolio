"use client";

import Image from "next/image";

interface DesktopWebsiteProbs {
    state: boolean
    onClick: (newState: boolean) => void
}

export default function DesktopWebsite({state, onClick}:DesktopWebsiteProbs) {

    const handleClick = () => {
        onClick(!state);
    }

    return (
        <div id="desktop_website" className="desktop_website" onClick={handleClick}>
            {state
                ? <div>
                    <Image
                        src="../images/desktop.png"
                        alt=""
                    />
                </div>
                : <div>
                    <Image
                        src="../images/website.png"
                        alt=""
                    />
                </div>
                }
        </div>
    );
}
