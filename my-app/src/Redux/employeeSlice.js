// src/redux/employeeSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { Axios } from "axios";
// 🔥 Fetch API
export const fetchEmployees = createAsyncThunk(
  "employee/fetchEmployees",
  async () => {
    try {
      console.log("Fetching with Axios...");

      const response = await axios.get("https://dummyjson.com/users");

      // 🔍 FULL RESPONSE
      console.log("FULL RESPONSE:", response);

      // 🔍 ONLY DATA
      console.log("DATA:", response.data);

      // 🔍 USERS ARRAY
      console.log("USERS:", response.data.users);

      const mappedUsers = response.data.users.map((user) => ({
        id: user.id,
        name: user.firstName + " " + user.lastName,
        department: user.company?.department || "General",
        email: user.email,
        active: true,
      }));

      console.log("MAPPED USERS:", mappedUsers);

      return mappedUsers;

    } catch (error) {
      console.error("API ERROR:", error);
      throw error;
    }
  }
);

const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    employees: [],
    loading: false,
  },

  reducers: {
    addEmployee: (state, action) => {
      state.employees.push(action.payload);
    },

    deleteEmployee: (state, action) => {
      state.employees = state.employees.filter(
        (emp) => emp.id !== action.payload
      );
    },

    updateEmployee: (state, action) => {
      state.employees = state.employees.map((emp) =>
        emp.id === action.payload.id ? action.payload : emp
      );
    },
     setStatus: (state, action) => {
      const { id, status } = action.payload;

      state.employees = state.employees.map((emp) =>
        emp.id === id ? { ...emp, active: status } : emp
      );
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { addEmployee, deleteEmployee, updateEmployee, setStatus } =
  employeeSlice.actions;

export default employeeSlice.reducer;