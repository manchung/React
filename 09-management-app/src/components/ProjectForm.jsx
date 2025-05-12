import { useState, useRef } from "react";
import DeleteModal from "./DeleteModal";
import Input from "./Input";

export default function ProjectForm({ project, projectMethods }) {
  const [edit, setEdit] = useState(false);
  const [nameInput, dateInput, descriptionInput, taskInput, deleteDialog] = [
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
  ];

  function onEdit() {
    if (edit) {
      project = {
        ...project,
        name: nameInput.current.value,
        date: dateInput.current.value,
        description: descriptionInput.current.value,
      };
      projectMethods.save(project);
    }
    setEdit((prev) => !prev);
  }

  function addTask() {
    project = {
      ...project,
      tasks: [
        ...project.tasks,
        { id: Date.now(), name: taskInput.current.value},
      ],
    };
    projectMethods.save(project);
    taskInput.current.value = "";
  }

  function clearTask(taskId) {
    project = {
      ...project,
      tasks: project.tasks.filter((item) => item.id != taskId),
    };
    projectMethods.save(project);
  }

  function onDelete() {
    deleteDialog.current.showModal();
  }

  const buttonClass =
    "bg-stone-800 text-stone-50 px-6 py-2 rounded-md hover:bg-stone-950";
  const inputClass =
    "w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600";
  const pClass = "flex flex-col gap-1 my-4";
  const labelClass = "text-sm font-bold uppercase text-stone-500";

  const displayFormHead = (
    <>
      <DeleteModal
        ref={deleteDialog}
        project={project}
        projectMethods={projectMethods}
      />
      <div className="w-[35rem] mt-16 ">
      <header className="pb-4 mb-4 border-b-2 border-stone-300">
        <div className="flex item-center justify-between">
          <h1 className="text-3xl font-bold text-stone-600 mb-2">{project.name}</h1>
          <button className="text-stone-600 hover:text-stone-950" onClick={onDelete}>
            DELETE
          </button>
        </div>
        <p className="mb-4 text-stone-400">{project.date}</p>
        <p className="text-stone-600 whitespace-pre-wrap">{project.description}</p>
      </header>
      </div>
    </>
  );

  const editFormHead = (
    <>
    <div className="w-[35rem] mt-16 ">
      <h1 className="text-3xl font-bold">Edit Project</h1>
      <form className="flex flex-col">
        <p className={pClass}>
          <Input
            ref={nameInput}
            defaultValue={project.name}
            title="Project Name"
          />
        </p>
        <p className={pClass}>
          <Input
            ref={dateInput}
            defaultValue={project.date}
            title="Due Date"
            type="date"
          />
        </p>
        <p className={pClass}>
          <Input
            ref={descriptionInput}
            defaultValue={project.description}
            title="Project Description"
            textarea
          />
        </p>
      </form>
      </div>
    </>
  );

  return (
    <>
      {edit ? editFormHead : displayFormHead}
      <div className="w-[35rem] flex flex-col items-end justify-end gap-4 my-4">
        <button onClick={onEdit} className={buttonClass}>
          {edit ? "Save" : "Edit"}
        </button>
      </div>

      <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>
      <div className="flex items-center gap-4">
      <input
        ref={taskInput}
        type="text"
        placeholder="Add Task"
        className="w-64 px-2 py-1 rounded-sm bg-stone-200"
      />
      <button onClick={addTask} className="text-stone-700 hover:text-stone-950">
        Add Task
      </button>
      </div>
      <ul className="p-4 mt-8 rounded-md bg-stone-100">
        {project.tasks.length === 0 && <p className="text-stone-800 my-4">This project does not have any tasks yet.</p>}
      {project.tasks.map((task) => (
        <li key={task.id} className="flex justify-between my-4">
          <span className="">{task.name}</span>
          <button onClick={() => clearTask(task.id)} className="text-stone-700 hover:text-red-500">
            Clear
          </button>
        </li>
      ))}
      </ul>
    </>
  );
}
