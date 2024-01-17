import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import MyVerticallyCenteredModal from "./UpdateTask";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTaskFromServer,
  getTaskFromServer,
  removeTaskFromList,
  setSelectedTask,
} from "./Slices/TasksSlices";

function TaskList() {

  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTaskFromServer());
  }, [dispatch]);

  const { tasksList } = useSelector((state) => state.tasks);

  const [modalShow, setModalShow] = React.useState(false);

  const updateTask = (task) => {
    console.log("updatetask");
    dispatch(setSelectedTask(task));
    setModalShow(true);
  };

  const deleteTask = (task) => {
    console.log("deletetask");
    dispatch(deleteTaskFromServer(task))
      .unwrap()
      .then(() => {
        dispatch(removeTaskFromList(task));
      });
  };

  return (
    <section className="my-3 ">
      <Table striped bordered hover>
        <thead className="text-center">
          <tr>
            <th>No</th>
            <th id="title">Title</th>
            <th>Description</th>
            <th>Actions</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tasksList &&
            tasksList.map(
              (
                task,
                index //first taskList for check it have value or not ,if it have value taskList.map would be work.
              ) => (
                <tr className="text-center" key={task.id}>
                  <td>{index + 1}</td>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>
                    <Button
                      variant="primary"
                      className="mx-3"
                      onClick={() => updateTask(task)}
                    >
                      <i className="bi bi-pencil-fill"></i>
                    </Button>
                    <Button variant="primary" onClick={() => deleteTask(task)}>
                      <i className="bi bi-x-circle-fill"></i>
                    </Button>
                  </td>
                </tr>
              )
            )}
        </tbody>
      </Table>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </section>
  );
}

export default TaskList;
