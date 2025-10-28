"use client";

import { useEffect } from "react";

interface DarkmodeProbs {
    state: boolean,
    onclick: (newState: boolean) => void
}

export default function DarkMode({state, onclick}:DarkmodeProbs) {

    useEffect(() => {
        document.documentElement.setAttribute(
            'data-theme', 
            state ? 'dark' : 'light'
        );
        console.log(state ? 'dark' : 'light');
    }, [state]);
    
    const handleClick = () => {
        onclick(!state)
    };

    return (
        <div id="dark_mode" className="dark_mode" onClick={handleClick}>
            <div>
                {
                    state
                    ? <div>
                        <img
                            src="../images/night.png"
                            alt="moon"
                            // className={isDarkMode ? "" : "hidden_image"}
                        />
                    </div>
                    : <div>
                        <img
                            src="../images/day.png"
                            alt="sun"
                            // className={isDarkMode ? "hidden_image" : ""}
                        />
                    </div>
                }
            </div>
        </div>
    );
}
