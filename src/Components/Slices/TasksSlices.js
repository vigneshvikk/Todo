import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  tasksList: [],
  selectedTask: {},
  isLoading: false,
  error: "",
};

const BASE_URL = "http://localhost:8002/tasks";

// get
export const getTaskFromServer = createAsyncThunk(
  "task/getTaskFromServer",
  async (_, { rejectWithValue }) => {
    const response = await fetch(BASE_URL);
    if (response.ok) {
      const jsonResponse = await response.json();
      return jsonResponse;
    } else {
      return rejectWithValue({ error: "No Tasks Found" });
    }
  }
);

//post
export const addTaskToServer = createAsyncThunk(
  "task/addTaskToServer",
  async (task, { rejectWithValue }) => {
    const options = {
      method: "POST",
      body: JSON.stringify(task),
      headers: {
        "Content-type": "application/json;charset=UTF-8",
      },
    };
    const response = await fetch(BASE_URL, options);
    if (response.ok) {
      const jsonResponse = await response.json();
      return jsonResponse;
    } else {
      return rejectWithValue({ error: "Task Not Added" });
    }
  }
);

//patch
export const updateTaskInServer = createAsyncThunk(
  "task/updateTaskInServer",
  async (task, { rejectWithValue }) => {
    const options = {
      method: "PATCH",
      body: JSON.stringify(task),
      headers: {
        "Content-type": "application/json;charset=UTF-8",
      },
    };
    const response = await fetch(BASE_URL + "/" + task.id, options);
    if (response.ok) {
      const jsonResponse = await response.json();
      return jsonResponse;
    } else {
      return rejectWithValue({ error: "Task Not Updated" });
    }
  }
);

//delete
export const deleteTaskFromServer = createAsyncThunk(
  "task/deleteTaskFromServer",
  async (task, { rejectWithValue }) => {
    const options = {
      method: "DELETE",
      body: JSON.stringify(task),
      headers: {
        "Content-type": "application/json;charset=UTF-8",
      },
    };
    const response = await fetch(BASE_URL + "/" + task.id, options);
    if (response.ok) {
      const jsonResponse = await response.json();
      return jsonResponse;
    } else {
      return rejectWithValue({ error: "Task Not Deleted" });
    }
  }
);

const tasksSlice = createSlice({
  name: "tasksSlice",
  initialState,
  reducers: {
    removeTaskFromList: (state, action) => {
      state.tasksList = state.tasksList.filter(
        (task) => task.id !== action.payload.id
      );
    },

    setSelectedTask: (state, action) => {
      state.selectedTask = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getTaskFromServer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTaskFromServer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.tasksList = action.payload;
      })
      .addCase(getTaskFromServer.rejected, (state, action) => {
        state.error = action.payload.error;
        state.isLoading = false;
        state.tasksList = [];
      })

      .addCase(addTaskToServer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addTaskToServer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.tasksList.push(action.payload);
      })
      .addCase(addTaskToServer.rejected, (state, action) => {
        state.error = action.payload.error;
        state.isLoading = false;
      })

      .addCase(updateTaskInServer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTaskInServer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.tasksList = state.tasksList.map((task) =>
          task.id === action.payload.id ? action.payload : task
        );
      })
      .addCase(updateTaskInServer.rejected, (state, action) => {
        state.error = action.payload.error;
        state.isLoading = false;
      })

      .addCase(deleteTaskFromServer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTaskFromServer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
      })
      .addCase(deleteTaskFromServer.rejected, (state, action) => {
        state.error = action.payload.error;
        state.isLoading = false;
      });
  },
});

export const {
  addTaskToList,
  removeTaskFromList,
  updateTaskInList,
  setSelectedTask,
} = tasksSlice.actions;

export default tasksSlice.reducer;
