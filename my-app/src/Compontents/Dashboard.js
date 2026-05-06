// src/components/EmployeeDashboard.js

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Button,
  TextField, Dialog, DialogTitle,
  DialogContent, DialogActions,
  Grid,
  colors,
  Typography,
  Switch,
  InputAdornment,
  IconButton,
  Checkbox,
  FormControlLabel,
  CircularProgress,
  Card
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  fetchEmployees,
  addEmployee,
  deleteEmployee,
  updateEmployee,
  setStatus
} from "../Redux/employeeSlice";
import employees from "../Redux/employeeSlice";
import EditPopup from "./EditPopup";
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ClearIcon from "@mui/icons-material/Clear";
import Header from "./Header";
import EmployeeProfile from "./EmployeeProfileList";
import EmployeeCard from "./EmployeeCard";
import BarChat from "./BarChat";
const Dashboard = () => {
  const dispatch = useDispatch();

  const [showPopup, setShowPopup] = useState(false);
  const navigation = useNavigate();
  const handleLogout = () => {
    navigation("/");
    setShowPopup(true);
  };

  const { employees, loading } = useSelector((state) => state?.employees);
  console.log("SELECTED EMPLOYEES:", employees);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [viewId, setViewId] = useState(false);
  const [addId, setAddId] = useState(null);
  const [isViewMode, setIsViewMode] = useState(false);

  const [form, setForm] = useState({
    name: "",
    department: "",
    email: "",
  });

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);



  const totalEmployees = employees.length;

  const activeCount = employees.filter(emp => emp.active).length;
  const inactiveCount = totalEmployees - activeCount;

  const departmentStats = employees.reduce((acc, emp) => {
    const dept = emp.department || "General";
    acc[dept] = (acc[dept] || 0) + 1;
    return acc;
  }, {});

  const recentActivities = employees.slice(0, 5).map(emp => ({
    message: `${emp.name} loaded`,
  }));
  console.log("departmentStats:", departmentStats);

  const filtered = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.department.toLowerCase().includes(search.toLowerCase())
  );


  const handleSave = () => {
    if (editId) {
      dispatch(updateEmployee({ ...form, id: editId }));
    } else {
      dispatch(
        addEmployee({
          id: Date.now(),
          ...form,
          active: true,
        })
      );
    }

    setOpen(false);
    setEditId(null);
    setForm({ name: "", department: "", email: "" });
  };
  const handleView = (emp) => {
    setForm(emp);
    setViewId(emp.id);
    setIsViewMode(true);
    setOpen(true);
  };
  const handleAdd = () => {
    setForm({ name: "", department: "", email: "" });
    setAddId(Date.now());
    setOpen(true);
    setIsViewMode(false);
  };

  const cardStyle = {
    background: "#fff",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",

  };
  const [deptFilter, setDeptFilter] = useState("");
  const departments = [...new Set(employees.map(emp => emp.department))];
  const [selectedDepts, setSelectedDepts] = useState([]);
  const cardHeaders = [{ id: "1", header: "Total Employees", color: "red", background: "linear-gradient(90deg, #ff416c, #ff4b2b)" }, { id: "2", header: "Active", color: "green", background: "linear-gradient(90deg, #00b09b, #96c93d)" }, { id: "3", header: "Inactive", color: "red", background: "linear-gradient(90deg, #ff416c, #ff4b2b)" }];

  // loader
  const [visibleCount, setVisibleCount] = useState(10);
  const [loadingMore, setLoadingMore] = useState(false);
  const loaderRef = useRef(null);
  const handleDeptChange = (dept) => {
    setSelectedDepts((prev) =>
      prev.includes(dept)
        ? prev.filter((d) => d !== dept)
        : [...prev, dept]
    );
  };

  useEffect(() => {
    setVisibleCount(10);
  }, [search]);
  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.department.toLowerCase().includes(search.toLowerCase())
  );


  const visibleEmployees = filteredEmployees.slice(0, visibleCount);
  const loadMore = () => {
    if (loadingMore) return;
    if (visibleCount >= filteredEmployees.length) return;

    setLoadingMore(true);

    setTimeout(() => {
      setVisibleCount((prev) => prev + 10);
      setLoadingMore(false);
    }, 400);
  };
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [filteredEmployees, visibleCount]);


  return (
    <div >
      <Header showPopup={showPopup} setShowPopup={setShowPopup} handleLogout={handleLogout} />
      {/* employee card */}
      <EmployeeCard totalEmployees={totalEmployees} activeCount={activeCount} inactiveCount={inactiveCount} cardHeaders={cardHeaders} />
      {/* bar chart */}
      <Grid container p={2} spacing={2} >
        <Grid item xs={12} md={6}  >
          <Card
            sx={{
              border: "1px solid #e0e0e0",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              borderRadius: "12px",
              padding: "10px"
            }}
          >
            <Typography sx={{ fontWeight: 600, fontSize: "16px" }}>Departments</Typography>
            <BarChat dataSource={departmentStats} type="department" />
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card
            sx={{
              border: "1px solid #e0e0e0",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              borderRadius: "12px",
              padding: "10px"
            }}  >

            <Typography sx={{ fontWeight: 600, fontSize: "16px" }}>Recent Activities</Typography>
            <BarChat dataSource={recentActivities} type="activity" />
          </Card>
        </Grid>
      </Grid>
      {/* search and add employee controls */}
      <Grid sx={{
        marginTop: "20px",
        marginLeft: "20px",
        display: "flex",
        gap: "10px",
        marginBottom: "20px",
        height: "30px"
      }}>
        <TextField
          className="Textfield_content"
          label="Search Employee"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            endAdornment: search && (
              <InputAdornment position="end">
                <IconButton onClick={() => setSearch("")} edge="end">
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button variant="contained" onClick={handleAdd} sx={{ textTransform: "none", height: "37px", background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)" }} >
          Add Employee
        </Button>
      </Grid>
      {/* table */}
      {loading && <p>Loading...</p>}

      <TableContainer component={Paper} className="table_content">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          {!loading ? (
            <TableBody >
              {visibleEmployees.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5}>No data found</TableCell>
                </TableRow>
              ) : visibleEmployees.map((emp) => (
                <TableRow key={emp.id}>
                  <TableCell>{emp.name}</TableCell>
                  <TableCell>{emp.email}</TableCell>
                  <TableCell>{emp.department}</TableCell>

                  <TableCell>
                    <span style={{ marginRight: "8px" }}>
                      {emp.active ? "Active" : "Inactive"}
                    </span>

                    <Switch
                      checked={emp.active}
                      onChange={(e) =>
                        dispatch(setStatus({ id: emp.id, status: e.target.checked }))
                      }
                      color="success"
                    />
                  </TableCell>

                  <TableCell>
                    <Button
                      className="btn_content"
                      onClick={() => handleView(emp)}
                      title="View"
                    >
                      <VisibilityIcon />
                    </Button>
                    <Button
                      className="btn_content"
                      title="edit"
                      onClick={() => {
                        setForm(emp);
                        setEditId(emp.id);
                        setOpen(true);
                        setIsViewMode(false);
                      }}
                    >
                      <EditIcon />
                    </Button>

                    <Button
                      title="Delete"
                      className="btn_content"
                      color="error"
                      onClick={() => {
                        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
                        if (confirmDelete) {
                          dispatch(deleteEmployee(emp.id));
                        }
                      }}
                    >
                      <DeleteIcon />
                    </Button>
                  </TableCell>
                </TableRow>

              ))}
            </TableBody>
          ) : (
            <TableBody>
              <TableRow>
                <TableCell colSpan={5}><CircularProgress /></TableCell>
              </TableRow>
            </TableBody>
          )}

        </Table>
      </TableContainer>
      <div
        ref={loaderRef}
        style={{
          height: "60px",
          textAlign: "center",
          padding: "10px"
        }}
      >
        {loadingMore && <p>Loading more employees...</p>}
      </div>

      <EditPopup open={open} onClose={() => setOpen(false)} editId={editId} form={form} setForm={setForm} handleSave={handleSave} isViewMode={isViewMode} />
    </div>
  );
};

export default Dashboard;