import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
  Box
} from "@mui/material";

const EditPopup = ({ open, onClose, form, setForm, editId, handleSave, isViewMode }) => {
  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: 4,
          background: "linear-gradient(135deg, #1e293b, #0f172a)",
          color: "#fff",
          fontFamily: "'Poppins', sans-serif"
        }
      }}
    >
      <DialogTitle>
        <Typography
          variant="h5"
          sx={{ fontWeight: 600, letterSpacing: 0.5 }}
        >
          {editId ? "Edit Employee" : "Add Employee"}
        </Typography>
        <Typography variant="body2" sx={{ color: "#94a3b8" }}>
          Manage employee details
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Box mt={2}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Full Name"
                value={form.name}
              onChange={isViewMode ? undefined : handleChange("name")}
                variant="outlined"
                InputLabelProps={{ style: { color: "#cbd5f5" } }}
                InputProps={{
                  style: {
                    color: "#fff",
                    backgroundColor: "#1e293b",
                    borderRadius: 8
                  }
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                value={form.email}
                 onChange={isViewMode ? undefined : handleChange("email")}
                InputLabelProps={{ style: { color: "#cbd5f5" } }}
                InputProps={{
                  style: {
                    color: "#fff",
                    backgroundColor: "#1e293b",
                    borderRadius: 8
                  }
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Department"
                value={form.department}
               onChange={isViewMode ? undefined : handleChange("department")}
                InputLabelProps={{ style: { color: "#cbd5f5" } }}
                InputProps={{
                  style: {
                    color: "#fff",
                    backgroundColor: "#1e293b",
                    borderRadius: 8
                  }
                }}
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        
        <Button
          onClick={onClose}
          sx={{
            color: "#94a3b8",
            textTransform: "none"
          }}
        >
          Cancel
        </Button>
{!isViewMode && (
        <Button
          onClick={handleSave}
          variant="contained"
          sx={{
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            borderRadius: 2,
            textTransform: "none",
            px: 3,
            fontWeight: 500,
            "&:hover": {
              background: "linear-gradient(135deg, #4f46e5, #7c3aed)"
            }
          }}
        >
          {editId ? "Update" : "Save"}
        </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default EditPopup;