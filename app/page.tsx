"use client";
import "../styles/main.css"
import "../styles/theme-settings.css"
import "../styles/frame.css"
import "../styles/content/projects.css";
import "../styles/content/elements/Project.css";
import { useEffect } from "react";
import Frame from "./window/frame";
import Projects from "./window/content/projects";

export default function Home() {

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
  })
  return (
    <div>
      <main id="desktop">
        <div>
          <p>
            Main
          </p>
          {/* {new Frame("asd",() => {}).build(null)} */}
          {new Projects().build()}
        </div>
      </main>
      <footer>
        <div className="task_button">
          A
        </div>
        <div className="task_apps">
          <p>
            Footer
          </p>
        </div>
        <div className="task_right">
          <div className="task_time">
            <div>
              <span>17:22</span>
            </div>
            <div>
              <span>15.10.2025</span>
            </div>
          </div>
          <div>
            A
          </div>
        </div>
      </footer>
    </div>
  );
}
