"use client";

import { useEffect, useState } from "react";

export default function Language() {
    const [language, setLanguage] = useState("de");
    
    useEffect(() => {
        console.log(language);
        document.documentElement.setAttribute(
            'lang', 
            language
        );
    }, [language]);

    const toggleMode = () => {
        setLanguage(document.documentElement.getAttribute('lang') === 'en' ? 'de' : 'en');
        console.log("Mode toggled");
    };

    console.log(language)

    return (
        <div id="language" className="language" onClick={toggleMode}>
            <div>
                <div>
                    <span className={language === 'en' ? "hidden_language" : ""}>
                        DE
                    </span>
                </div>
                <div>
                    <span className={language === 'de' ? "hidden_language" : ""}>
                        EN
                    </span>
                </div>
            </div>
        </div>
    );
}