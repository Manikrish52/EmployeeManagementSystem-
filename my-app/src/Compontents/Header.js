import { Avatar, Grid, Typography } from "@mui/material";
import zIndex from "@mui/material/styles/zIndex";
import { useNavigate } from "react-router-dom";
const styles = {
    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(15, 23, 42, 0.7)", // dark navy overlay
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backdropFilter: "blur(4px)",
        zIndex: 9999,
    },
    popup: {
        background: "#1e293b",
        color: "#fff",
        fontWeight: 500,
        padding: "20px",
        borderRadius: "8px",
        textAlign: "center",
    },
};
const Header = (props) => {
    const { showPopup, setShowPopup, handleLogout } = props;
    const navigate = useNavigate();
    return (
        <div>
            <Grid sx={{ height: "70px", background: "linear-gradient(90deg, #ff416c, #ff4b2b)", padding: "0px 20px", }} >
                <Grid style={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: "100%" }}>
                    <Grid>
                        <Typography sx={{ color: "#fff", fontSize: "20px", fontWeight: "600", }}>Employee Dashboard</Typography>
                    </Grid>
                    <Grid sx={{ display: "flex", alignItems: "center", }}>
                        <Avatar onClick={() => navigate("/profile")} alt="Remy Sharp" src="/static/images/avatar/1.jpg" />

                        <button onClick={() => setShowPopup(true)} className="logoutIcon_btn">Logout</button>
                    </Grid>
                </Grid>

                {/* Popup */}
                {showPopup && (
                    <Grid style={styles.overlay}>
                        <Grid style={styles.popup}>

                            <Typography sx={{ fontSize: "18px", fontWeight: 600, mb: 1 }}>
                                Confirm Logout
                            </Typography>
                            <Typography>Are you sure you want to log out?</Typography>
                            <button className="logout_btn" onClick={handleLogout}>Yes</button>
                            <button className="logout_btn" onClick={() => setShowPopup(false)}>No</button>
                        </Grid>
                    </Grid>
                )}
            </Grid>
        </div>
    )
}
export default Header;