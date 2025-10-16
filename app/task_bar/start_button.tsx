"use client";

import { useEffect, useState } from "react";

export default function StartButton() {
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
        <div id="start_button" className="start_button">
            <div>
                <img src="images/start.png" alt="" />
            </div>
        </div>
    );
}
