import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./Todolist";
import {v1} from "uuid";


export type FilterValueType = "all" | "active" | "completed";

function App() {

    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: true},
        {id: v1(), title: "Redux", isDone: false},
        {id: v1(), title: "RestAPI", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false}
    ]);

    let [filter, setFilter] = useState<FilterValueType>("all")


    function removeTask(id: string) {
        let filteredTask = tasks.filter(t => t.id !== id);
        setTasks(filteredTask);
    };

    function changeFilter(value: FilterValueType) {
        setFilter(value);
    };

    function addTask(title: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        setTasks([newTask, ...tasks])
    };

    function changeStatus(taskId: string, isDone: boolean) {
        let task = tasks.find(task => task.id === taskId);
        if (task) {
            task.isDone = isDone;
            setTasks([...tasks]);
        }
    };

    let taskForToDoList = tasks;
    if (filter === "active") {
        taskForToDoList = tasks.filter(t => t.isDone === false)
    }
    if (filter === "completed") {
        taskForToDoList = tasks.filter(t => t.isDone === true)
    }

    return (
        <div className="App">
            <TodoList
                title="What to learn"
                tasks={taskForToDoList}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeStatus={changeStatus}
                filter={filter}
            />
        </div>
    );
};

export default App;
