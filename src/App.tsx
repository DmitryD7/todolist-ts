import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./Todolist";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';


export type FilterValueType = "all" | "active" | "completed";

type ToDoListType = {
    id: string,
    title: string,
    filter: FilterValueType,
};

type TasksStateType = {
    [key: string]: Array<TaskType>,
};

function App() {

    let toDoListID1 = v1();
    let toDoListID2 = v1();

    let [toDoLists, setToDoLists] = useState<Array<ToDoListType>>([
        {id: toDoListID1, title: "What to learn", filter: "all"},
        {id: toDoListID2, title: "What to buy", filter: "all"},
    ]);

    let [tasks, setTasks] = useState<TasksStateType>({
        [toDoListID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: true},
            {id: v1(), title: "Redux", isDone: false},
            {id: v1(), title: "RestAPI", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false}
        ],
        [toDoListID2]: [
            {id: v1(), title: "Cheese", isDone: true},
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Bananas", isDone: true},
            {id: v1(), title: "Apples", isDone: false},
        ],
    });

    function removeTask(id: string, toDoListID: string) {
        let todoListTasks = tasks[toDoListID];
        tasks[toDoListID] = todoListTasks.filter(t => t.id !== id);
        setTasks({...tasks});
    };

    function changeFilter(id: string, value: FilterValueType) {
        let toDoList = toDoLists.find(tl => tl.id === id);
        if (toDoList) {
            toDoList.filter = value;
            setToDoLists([...toDoLists]);
        }
        ;
    };

    function addTask(title: string, toDoListID: string) {
        let newTask = {
            id: v1(),
            title: title,
            isDone: false
        };
        let todoListTasks = tasks[toDoListID];
        tasks[toDoListID] = [newTask, ...todoListTasks];
        setTasks({...tasks});
    };

    function changeStatus(taskId: string, isDone: boolean, toDoListID: string) {
        let task = tasks[toDoListID].find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
            setTasks({...tasks});
        }
    };

    function removeToDoList(id: string) {
        setToDoLists(toDoLists.filter(tl => tl.id !== id));
        delete tasks[id];
        setTasks({...tasks});
    };

    function addToDoList(title:string) {
        let newToDoListID = v1();
        let newToDoList: ToDoListType = {
            id: newToDoListID,
            title: title,
            filter: "all"
        };
        setToDoLists([newToDoList, ...toDoLists]);
        setTasks({
            ...tasks,
            [newToDoListID]: []
        });
    };

    function changeTaskTitle(id: string, title: string, toDoListID: string) {
        let task = tasks[toDoListID].find(t => t.id === id);
        if (task) {
            task.title = title;
            setTasks({...tasks});
        };
    };
    function changeTodosTitle(id: string, title: string) {
        let todoList = toDoLists.find(t => t.id === id);
        if (todoList) {
            todoList.title = title;
            setToDoLists([...toDoLists]);
        };
    };


    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" >
                        ToDo-Lists
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px', margin: '10px'}}>
                    <AddItemForm addItem={addToDoList}/>
                </Grid>
                <Grid container spacing={10}>
                    {toDoLists.map(tl => {
                    let taskForToDoList = tasks[tl.id];
                    if (tl.filter === "active") {
                        taskForToDoList = tasks[tl.id].filter(t => t.isDone === false)
                    }
                    if (tl.filter === "completed") {
                        taskForToDoList = tasks[tl.id].filter(t => t.isDone === true)
                    }
                    return (
                        <Grid item>
                            <Paper style={{padding: '10px'}}><TodoList
                                key={tl.id}
                                id={tl.id}
                                title={tl.title}
                                tasks={taskForToDoList}
                                removeTask={removeTask}
                                changeFilter={changeFilter}
                                addTask={addTask}
                                changeStatus={changeStatus}
                                filter={tl.filter}
                                removeToDoList={removeToDoList}
                                changeTaskTitle={changeTaskTitle}
                                changeTodosTitle={changeTodosTitle}
                            /></Paper>
                        </Grid>
                    )
                })}
                </Grid>
            </Container>
        </div>
    );
};

export default App;
