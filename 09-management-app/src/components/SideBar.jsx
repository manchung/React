import { useState, useRef } from "react";

export default function SideBar({ projects, currentProject, projectMethods}) {
  return (
    <div className="w-1/3 h-full px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-3xl">
      <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200">
        Your Projects
      </h2>
      <button
        onClick={projectMethods.new}
        className="px-4 py-2 text-xs md:text-base rounded-md bg-stone-700 text-stone-400 hover:bg-stone-600 hover:text-stone-100"
      >
        + Add Project
      </button>
      <ul className="mt-8">
        {projects.map((project) => {
          let buttonClass = "w-full text-left px-2 py-2 rounded-sm my-1 text-stone-400 hover:text-stone-200 hover:bg-stone-800";
          if (project === currentProject) {
              buttonClass = "w-full text-left px-2 py-2 rounded-sm my-1 text-stone-50 hover:text-stone-200 hover:bg-stone-800";
          }
          return (
            <li key={project.id} className="">
              <button
                onClick={() => projectMethods.show(project.id)}
                className={buttonClass}
              >
                {project.name}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
