import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../Redux/authSlice";
import employeeSlice from "../Redux/employeeSlice";


const store = configureStore({
  reducer: {
    authSlice: authSlice,
    employeeSlice: employeeSlice,
    employees: employeeSlice,
  },
});

export default store;