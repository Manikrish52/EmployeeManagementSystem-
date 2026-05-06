import {
    Avatar,
    Card,
    Grid,
    IconButton,
    Typography,
    Divider,
    Chip,
} from "@mui/material";
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

    return (
        <Grid>
            {/* Header */}
            <Grid
                sx={{
                    height: "80px",
                    background: "linear-gradient(135deg, #ff416c, #ff4b2b)",
                    px: 3,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    color: "#fff",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
                }}
            >
                <Typography sx={{ fontSize: "22px", fontWeight: "600" }}>
                    Employee Profile
                </Typography>

                <IconButton
                    onClick={() => navigate(-1)}
                    sx={{ color: "#fff" }}
                >
                    <CloseIcon />
                </IconButton>
            </Grid>

            <Card
                sx={{
                    maxWidth: 420,
                    margin: " auto",
                    marginTop: "20px",
                    padding: "25px",
                    borderRadius: "16px",
                    textAlign: "center",
                    boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
                }}
            >
                {/* Avatar */}
                <Avatar
                    src={employeeDetails?.profileImage || ""}
                    alt="Profile"
                    sx={{
                        width: 120,
                        height: 120,
                        margin: "0 auto",
                        border: "4px solid #fff",
                        boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                        bgcolor: !employeeDetails?.profileImage ? "#ff4b2b" : "transparent",
                        fontSize: "40px",
                        fontWeight: "bold",
                    }}
                >
                    {!employeeDetails?.profileImage &&
                        (employeeDetails?.name?.charAt(0)?.toUpperCase() || "A")}
                </Avatar>

                <Typography sx={{ mt: 2, fontSize: "20px", fontWeight: 600 }}>
                    {employeeDetails?.name || "Admin"}
                </Typography>

                <Typography sx={{ color: "gray", fontSize: "14px" }}>
                    {employeeDetails?.email || "Admin@yopmail.com"}
                </Typography>

                <Chip
                    label={employeeDetails?.active ? "Active" : "Inactive"}
                    color={employeeDetails?.active ? "success" : "default"}
                    size="small"
                    sx={{ mt: 1 }}
                />

                <Divider sx={{ my: 2 }} />

                <Typography
                    sx={{
                        fontWeight: 600,
                        fontSize: "16px",
                        mb: 1,
                        textAlign: "left",
                    }}
                >
                     Work Details
                </Typography>

                <Grid
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        px: 1,
                        py: 1,
                    }}
                >
                    <Typography color="text.secondary">Department</Typography>
                    <Typography fontWeight={500}>
                        {employeeDetails?.department || "General"}
                    </Typography>
                </Grid>

                <Grid
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        px: 1,
                        py: 1,
                    }}
                >
                    <Typography color="text.secondary">Status</Typography>
                    <Typography fontWeight={500}>
                        {employeeDetails?.active ? "Active" : "Inactive"}
                    </Typography>
                </Grid>
            </Card>
        </Grid>
    );
};

export default EmployeeProfile;