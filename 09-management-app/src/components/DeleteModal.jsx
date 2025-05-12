import { createPortal } from "react-dom";

export default function DeleteModal({ ref, project, projectMethods }) {
    
  const buttonClass =
    "bg-stone-800 text-stone-50 px-6 py-2 rounded-md hover:bg-stone-950 mx-2 ";
  return createPortal(
    <dialog ref={ref} className="backdrop:bg-stone-900/90 p-4 rounded-md shadow-md">
      <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-700">Are you sure you want to delete {project.name}?</h2>
      <form method="dialog" className="mt-4 text-right">
        <button onClick={() => projectMethods.delete(project.id)} className={buttonClass}>Yes</button>
        <button className={buttonClass}>No</button>
      </form>
    </dialog>,
    document.getElementById("modal-root")
  );
}
