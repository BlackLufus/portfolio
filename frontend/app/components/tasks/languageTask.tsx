"use client";

import LanguageNotifier, { LanguageCode } from "@/global/languageSubscriber";

interface LanguageTaskProbs {
    className?: string
}

export default function LanguageTask( {className }: LanguageTaskProbs) {

    return (
        <div 
            className={`nav_action ${className != null ? className : ""}`}
            onClick={() => {
                LanguageNotifier.sendNotification(LanguageNotifier.code == LanguageCode.DE ? LanguageCode.EN : LanguageCode.DE);
            }}>
            <span className={`nav_action_item ${LanguageNotifier.code == LanguageCode.EN ? "show" : ""}`}>
                DE
            </span>
            <span className={`nav_action_item ${LanguageNotifier.code == LanguageCode.DE ? "show" : ""}`}>
                EN
            </span>
        </div>
    );
}