// START: IMPORTS
import React, { useState } from "react";
import "./App.css";

// Start: Import Interfaces
import { ITask } from "./Interfaces";
// End: Import Interfaces

// Start: Import Components
import TodoTask from "./components/TodoTask";
// End: Import Components
// END: IMPORTS

// START: COMPONENT
const App: React.FC = () => {
  // Start: States
  const [task, setTask] = useState<string>("");
  const [deadline, setDeadline] = useState<number>(0);
  const [todoList, setTodoList] = useState<ITask[]>([]);
  // End: States

  // Start: Methods
  /**
   * @name handleChange()
   * @param event
   */
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === "task") {
      setTask(event.target.value);
    } else {
      setDeadline(Number(event.target.value));
    }
  };

  /**
   * @name addTask()
   */
  const addTask = (): void => {
    const newTask = { taskName: task, deadline: deadline };
    setTodoList([...todoList, newTask]);

    setTask("");
    setDeadline(0);
  };

  /**
   * @name completeTask()
   * @param taskNameToDelete
   */
  const completeTask = (taskNameToDelete: string) => {
    setTodoList(
      todoList.filter((task) => {
        return task.taskName !== taskNameToDelete;
      })
    );
  };
  // End: Methods

  // Start: Inner Components
  const listTodosComponent = todoList.map((task: ITask, key: number) => {
    return <TodoTask key={key} task={task} completeTask={completeTask} />;
  });
  // End: Inner Components

  // Start: Template
  return (
    <div className="App">
      {/* Start: Header */}
      <div className="header">
        <input
          type="text"
          placeholder="Task..."
          value={task}
          name="task"
          onChange={handleChange}
        />
        <input
          type="number"
          name="deadline"
          value={deadline}
          placeholder="Deadline (in Days)..."
          onChange={handleChange}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      {/* End: Header */}

      {/* Start: Todo List */}
      <div className="todoList">{listTodosComponent}</div>
      {/* End: Todo List */}
    </div>
  );
  // End: Template
};
// END: COMPONENT

export default App;
