import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./Slices/TasksSlices";
export const store = configureStore({
  reducer: { tasks: tasksReducer },
});
