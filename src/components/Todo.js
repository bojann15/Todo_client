import { Fragment, useState } from "react";

const Todo = ({ task, strikeUnstrike, submitEdit, handleDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newValue, setNewValue] = useState(task.title);

    return <div className="task-wrapper flex-wrapper">
        {!isEditing &&
            <Fragment><div onClick={() => strikeUnstrike(task)} style={{ flex: 7 }}>
                {task.completed === false ? (
                    <span>{task.title}</span>
                ) : (
                    <strike>{task.title}</strike>
                )}
            </div>
                <div style={{ flex: 1 }}>
                    <button onClick={() => setIsEditing(true)} className="btn btn-sm btn-outline-info">Edit</button>
                </div>
                <div style={{ flex: 1 }}>
                    <button onClick={() => handleDelete(task)} className="btn btn-sm btn-outline-dark delete">-</button>
                </div></Fragment>}
        {isEditing &&
            <Fragment>
                <div className="flex-wrapper">
                    <div style={{ flex: 6 }}>
                        <input value={newValue} onChange={(e) => {
                            setNewValue(e.target.value);
                        }} className="form-control" id="title" type="text" name="title" placeholder="Edit task" />
                    </div>
                    <div style={{ flex: 1 }}>
                        <input onClick={() => {
                            submitEdit({ ...task, title: newValue })
                            setIsEditing(false);
                        }} className="btn btn-warning" type="submit" name="Add" />
                    </div>
                </div>
            </Fragment>
        }
    </div>
}

export default Todo;