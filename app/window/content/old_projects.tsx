// "use client";
// import Frame from "../frame";
// import React, { useEffect } from "react";
// import Project, { Link } from "./elements/Project";

// class Projects extends Frame {

//     public constructor() {

//         super("Projekte", "images/project.png", () => this.terminate());
//     }

//     public build(): React.ReactNode {
//         useEffect(() => {
//             console.log("asd")
//             super.addEventListeners();
//         });
//         return super.build(
//             <div className="application">
//                 <div className="application_title">
//                     <h1>
//                         Pro­jek­te
//                     </h1>
//                 </div>
//                 <div className="application_description">
//                     <span>
//                         Ent­de­cken Sie mein An­wen­dungs­port­fo­lio, wel­ches mei­ne Kennt­nis­se in der Front­end-, Ba­ckend-, Full-Stack- so­wie App-Ent­wick­lung zeigt.
//                     </span>
//                 </div>
//                 <div className="application_content">
//                     <div className="application_content_project">
//                         <Project title={"Port­fo­lio Web­site"} description={"Die­se Web­site ist eine Prä­sen­ta­ti­on mei­ner Pro­jek­te, Fä­hig­kei­ten und Er­fah­run­gen in der Soft­ware­ent­wick­lung. Sie zeich­net sich durch ein mo­der­nes De­sign mit ei­nem kla­ren Lay­out und in­tui­ti­ver Na­vi­ga­ti­on aus."} labels={["React", "Next.js", "TypeScript", "Framemotion"]} links={[new Link("Details", "https://google.com")]}/>
//                         <Project title={"Neural Network (Number Detector)"} description={"Ein Projekt um die tiefen geheimnisse Neuronaler Netze zu erknungen. Diese Projekt dient ausschließlich zur bildungszwecken."} labels={["Neurnale Netze", "KI", "Python", "numpy"]} links={[new Link("Details", "https://google.com")]}/>
//                         {Project({ title: "Projekt Title", description: "Das ist eine Beispiel beschreibung eines Projektes, bla bla bla bla bla blabla bla bla bla bla bla.", labels: ["test1", "test2", "test3", "test1", "test2", "test3"], links: [new Link("Google", "google.com")] })}
//                         {Project({ title: "Test", description: "Das ist eine Beispiel beschreibung eines Projektes", labels: ["test1", "test2", "test3", "test1"], links: [new Link("Google", "google.com")] })}
//                         {Project({ title: "Test", description: "Das ist eine Beispiel beschreibung eines Projektes", labels: ["test1", "test2", "test3", "test1"], links: [new Link("Google", "google.com")] })}
//                         {Project({ title: "Test", description: "Das ist eine Beispiel beschreibung eines Projektes", labels: ["test1", "test2", "test3", "test1"], links: [new Link("Google", "google.com")] })}
//                         {Project({ title: "Test", description: "Das ist eine Beispiel beschreibung eines Projektes", labels: ["Vogel", "Schildkröte", "Katze", "Maus", "Hund", "Schwein", "Fisch", "Kuh", "Huhn"], links: [new Link("Google", "google.com")] })}
//                     </div>
//                 </div>
//             </div>
//         )
//     }

//     /**
//      * Terminates the Video Cam frame by stopping the image stream and unsubscribing from the WebSocket.
//      * @returns {void}
//      */
//     private terminate = (): void => {
//         console.log("VideoCam: Terminate Node");
        
//     }

// }

// export default Projects