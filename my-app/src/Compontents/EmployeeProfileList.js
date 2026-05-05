import { Grid, IconButton, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
const EmployeeProfile = () => {
    const user = useSelector((state) => state.auth?.user);
    const employees = useSelector((state) => state.employee?.employees || []);

    const employeeDetails = employees.find(
        (emp) => emp.email === user?.userId
    );
    const navigate = useNavigate();
    console.log("EMPLOYEE DETAILS:", employeeDetails);
    return (
        <Grid >

            <Grid sx={{ height: "70px", background: "linear-gradient(90deg, #ff416c, #ff4b2b)", padding: "0px 20px", }} >
                <Grid style={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: "100%" }}>
                    <Grid>
                        <Typography sx={{ color: "#fff", fontSize: "20px", fontWeight: "bold", }}>  Employee Profile</Typography>
                    </Grid>
                    <Grid sx={{ display: "flex", alignItems: "center", }}>

                        <IconButton onClick={() => navigate(-1)}>
                            <CloseIcon />
                        </IconButton>
                    </Grid>
                </Grid>

                <Typography sx={{ fontSize: "24px", fontWeight: "bold" }}>

                </Typography>



            </Grid>

            <Grid sx={{ background: "#f1f5f9", padding: "15px", borderRadius: "10px", mb: 2 }}>
                <Typography>👤 Personal Details</Typography>

                <Typography>Name: {employeeDetails?.name || "Admin"}</Typography>
                <Typography>Email: {employeeDetails?.email || "Admin@yopmail.com"}</Typography>
            </Grid>

            <Grid sx={{ background: "#f1f5f9", padding: "15px", borderRadius: "10px" }}>
                <Typography>💼 Work Details</Typography>

                <Typography>Department: {employeeDetails?.department || "General"}</Typography>
                <Typography>Status: {employeeDetails?.active ? "Active" : "Inactive"}</Typography>
            </Grid>

        </Grid>
    );
};

export default EmployeeProfile;