"use client";

import { useEffect, useState } from "react";

export default function TimeAndDate() {

    const [,setNow] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setNow(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const getTime = () => {
        const today = new Date();
        const seconds = today.getSeconds().toString().padStart(2, "0");
        const minutes = today.getMinutes().toString().padStart(2, "0");
        const hour = today.getHours().toString().padStart(2, "0");
        return `${hour}:${minutes}:${seconds}`;
    }

    const getDate = () => {
        const today = new Date();
        const day = today.getDate().toString().padStart(2, "0");
        const month = (today.getMonth() + 1).toString().padStart(2, "0");
        const year = today.getFullYear();
        return `${day}.${month}.${year}`;
    }

    return(
        <div className="time_and_date">
            <div>
                <div>
                    <span>{getTime()}</span>
                </div>
                <div>
                    <span>{getDate()}</span>
                </div>
            </div>
        </div>
    );
}