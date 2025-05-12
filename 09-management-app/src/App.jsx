import { useState, useRef } from "react";
import SideBar from "./components/SideBar";
import WorkArea from "./components/WorkArea";
import {formatDate} from "./utils";

const initialProjects = [
  {
    id: 1,
    name: "Project 1",
    date: "2023-10-01",
    description: "Description of Project 1",
    tasks: [
      { id: 1, name: "Task 1"},
      { id: 2, name: "Task 2"},
    ],
  },
  {
    id: 2,
    name: "Project 2",
    date: "2023-10-11",
    description: "Description of Project 2",
    tasks: [
      { id: 3, name: "Task 3"},
      { id: 4, name: "Task 4"},
    ],
  },
];

function App() {
  const [projects, setProjects] = useState(initialProjects);
  const [currentProject, setCurrentProject] = useState(null);

  function newProject() {
    const project = {
      id: Date.now(),
      date: formatDate(new Date()),
      name: "New Project",
      description: "Description of New Project",
      tasks: [],
    };
    setCurrentProject(project)
    setProjects(prev => [...prev, project])
  }

  function showProject(id) {
    const project = projects.find(proj => proj.id === id);
    setCurrentProject(project);
  }

  function saveProject(project) {
    const id = project.id;
    const idx = projects.findIndex(proj => proj.id === id);
    if (idx === -1) {
      // new project
      setProjects(prev => [...prev, project])
    } else {
      // updating an existing project
      setProjects(prev => prev.map(item => (item.id === id ? project : item)))
    }
    setCurrentProject(project);
  }

  function deleteProject(id) {
    const idx = projects.findIndex(proj => proj.id === id);
    if (idx !== -1) {
      setProjects(prev => prev.filter(item => (item.id !== id)));
    }
    setCurrentProject(null);
  }

  const projectMethods = {
    new: newProject,
    show: showProject,
    save: saveProject,
    delete: deleteProject
  };

  return (
    <main className="flex h-screen my-8">
      <SideBar projects={projects} currentProject={currentProject} projectMethods={projectMethods}/>
      <WorkArea currentProject={currentProject} projectMethods={projectMethods}/>
    </main>
  );
}

export default App;
