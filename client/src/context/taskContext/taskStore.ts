import React from "react";
import {taskType, contextType} from "./../../utils/types";

export const TASKS_DEFAULT_STATE: contextType = {
    tasks: []
};

export const TaskContext = React.createContext(TASKS_DEFAULT_STATE);