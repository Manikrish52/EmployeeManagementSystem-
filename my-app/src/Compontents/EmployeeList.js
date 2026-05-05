import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addEmployee, deleteEmployee } from "../Redux/employeeSlice";

const EmployeeList = () => {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employee.employees);

  const [name, setName] = useState("");

  const handleAdd = () => {
    dispatch(
      addEmployee({
        id: Date.now(),
        name,
        active: true,
      })
    );
    setName("");
  };

  return (
    <div>
      <h2>Employees</h2>

      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={handleAdd}>Add</button>

      <ul>
        {employees.map((emp) => (
          <li key={emp.id}>
            {emp.name}
            <button onClick={() => dispatch(deleteEmployee(emp.id))}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeList;