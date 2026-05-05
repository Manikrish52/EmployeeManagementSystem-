import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Dashboard from "./Dashboard";
import EmployeeList from "./EmployeeList";
import EmployeeProfile from "./EmployeeProfileList";

const Router = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/Dashboard"
        element={
          <Dashboard />
        }
      />
      <Route
        path="/profile"
        element={<EmployeeProfile />} />
      <Route
        path="/employees"
        element={
          <EmployeeList />
        }
      />
    </Routes>
  );
};

export default Router;