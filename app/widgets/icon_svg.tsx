"use client"
import { useEffect, useState } from "react";

interface IconProbs {
    src: string;
    className: string;
}

export default function IconSvg({src, className}:IconProbs) {

    const [svg, setSvg] = useState("");

    useEffect(() => {
        fetch(src)
        .then(res => res.text())
        .then(setSvg);
    }, []);
    
    return(
        <div 
            className={className}
            dangerouslySetInnerHTML={{__html: svg}}
        />
    )
}