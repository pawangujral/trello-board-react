import React from "react";
import List from "./list";
import Add from "./add";
import {TaskContext} from "./../../context/taskContext/taskStore";
import Button from "./../../components/button";
import {taskType} from "./../../utils/types";
import "./tasks.css"; 

const defaultState = {
    id: null,
    title: "",
    description: "",
    createDate: null,
    tags: "",
    status: ""
}

const Tasks: React.FC = () => {
    const {tasks} = React.useContext(TaskContext);
    const [startTasks, setStartTasks] = React.useState<taskType[]>([]);
    const [inProgressTasks, setInProgressTasks] = React.useState<taskType[]>([]);
    const [completedTasks, setCompletedTasks] = React.useState<taskType[]>([]);
    const [openModal, setModal] = React.useState<boolean>(false);
    const [modalData, setModalData] = React.useState<taskType>(defaultState);

    React.useEffect(() => {
        (() => {
            console.log(tasks);
            const startData = tasks.filter(task => task.status === "start");
            const progressData = tasks.filter(task => task.status === "inProgress");
            const comepletedData = tasks.filter(task => task.status === "completed");

            setStartTasks(startData);
            setInProgressTasks(progressData);
            setCompletedTasks(comepletedData);
        })();
    },[tasks]); 

    // handle add new task fn
    const handleModal = (open: boolean) => {
        setModalData(defaultState);
        setModal(!openModal);
    }

    // Handle Card Edit fn
    const handleEdit = (event: React.MouseEvent<HTMLButtonElement>, data: taskType) => {
        setModalData(data);
        setModal(true);
    }

    return (
        <div className="wrapper">
            <div className="title-bar">
                <h1>My Tasks</h1>
                <Button title="add task" handleClick={e => handleModal(true)}/>
            </div>

            <main>
                <div className="tasks-list-wrapper">
                    <List title="To do" data={startTasks} handleEdit={handleEdit}/> 
                    <List title="In progress..." data={inProgressTasks} handleEdit={handleEdit}/>
                    <List title="Completed" data={completedTasks} handleEdit={handleEdit}/>
                </div>
                {openModal && <Add handleModal={handleModal} preFill={modalData}/>}
            </main>
        </div>
    )
};

export default Tasks;