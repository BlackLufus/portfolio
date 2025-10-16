"use client";

import { useEffect, useState } from "react";

export default function DarkMode() {
    const [isDarkMode, setIsDarkMode] = useState(true);

    useEffect(() => {
        document.documentElement.setAttribute(
            'data-theme', 
            isDarkMode ? 'dark' : 'light'
        );
        console.log(isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    const toggleMode = () => {
        setIsDarkMode(!isDarkMode);
        console.log("Mode toggled");
    };

    return (
        <div id="dark_mode" className="dark_mode" onClick={toggleMode}>
            <div>
                <div>
                    <img
                        src="../images/night.png"
                        alt="moon"
                        className={isDarkMode ? "" : "hidden_image"}
                    />
                </div>
                <div>
                    <img
                        src="../images/day.png"
                        alt="sun"
                        className={isDarkMode ? "hidden_image" : ""}
                    />
                </div>
            </div>
        </div>
    );
}
