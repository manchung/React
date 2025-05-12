import ProjectForm from "./ProjectForm";
import noProjectImg from "../assets/no-projects.png";

export default function WorkArea({currentProject, projectMethods}) {
  const buttonClass =
    "bg-stone-800 text-stone-50 px-6 py-2 rounded-md hover:bg-stone-950";
  return (
    <>
      {currentProject && (
        <div className="w-[35rem] h-full bg-white px-12 mt-16">
          <ProjectForm
            project={{ ...currentProject }}
            projectMethods={projectMethods}
          />
        </div>
      )}
      {!currentProject && (
        <div className="mt-24 text-center w-2/3">
          <img
            className="w-16 h-16 object-contain mx-auto"
            src={noProjectImg}
          />
          <h2 className="text-xl font-bold text-stone-500 my-4">
            No Project Selected
          </h2>
          <p className="text-stone-400 mb-4">
            Select a project or get started with a new one
          </p>
          <p className="mt-8">
            <button
              onClick={projectMethods.new}
              className={buttonClass}
            >
              Create new project
            </button>
          </p>
        </div>
      )}
    </>
  );
}
