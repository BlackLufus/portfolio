"use client";

import { LanguageCode } from "@/global/languageSubscriber";

interface LanguageProbs {
    state: LanguageCode;
    onClick: () => void;
}

export default function Language( {state, onClick}: LanguageProbs ) {

    return (
        <div id="language" className="language" onClick={onClick}>
            <div>
                <div>
                    <span className={state == LanguageCode.EN ? "hidden_language" : ""}>
                        DE
                    </span>
                </div>
                <div>
                    <span className={state == LanguageCode.DE ? "hidden_language" : ""}>
                        EN
                    </span>
                </div>
            </div>
        </div>
    );
}