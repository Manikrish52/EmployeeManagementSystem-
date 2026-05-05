import { useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../Redux/authSlice";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    userId: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!form.userId.trim()) {
      newErrors.userId = "User ID is required";
    }

    if (!form.password.trim()) {
      newErrors.password = "Password is required";
    }

    if (form.password && form.password.length < 4) {
      newErrors.password = "Password must be at least 4 characters";
    }

    return newErrors;
  };

  const handleLogin = () => {
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    if (form.userId === "admin" && form.password === "1234") {
      dispatch(
        login({
          user: { userId: form.userId },
          token: "fake-token",
        })
      );
      navigate("/Dashboard");
    } else {
      setErrors({ general: "Invalid user ID or password" });
    }
  };

  return (
    <div className="login_container">
      <div className="login_box">
        <h2>Employee Login</h2>

        <div className="input_group">
          <label style={{fontSize:"14px", fontWeight:600}}>User ID</label>
          <input
            type="text"
            value={form.userId}
            onChange={(e) =>
              setForm({ ...form, userId: e.target.value })
            }
          />
          {errors.userId && <p className="error" style={{fontWeight:600, fontSize:"13px"}}>{errors.userId}</p>}
        </div>

       <div className="input_group">
  <label style={{fontSize:"14px", fontWeight:600}}>Password</label>

  <input
    type={showPassword ? "text" : "password"}
    value={form.password}
    onChange={(e) =>
      setForm({ ...form, password: e.target.value })
    }
  />

  {errors.password && <p className="error" style={{fontWeight:600, fontSize:"13px"}}>{errors.password}</p>}

  <div style={{ marginTop: "8px" }}>
    <label style={{ fontSize: "14px", cursor: "pointer" }}>
      <input
        type="checkbox"
        checked={showPassword}
        onChange={() => setShowPassword(!showPassword)}
        style={{ marginRight: "6px" }}
      />
      Show Password
    </label>
  </div>

</div>

        {errors.general && <p className="error" style={{fontWeight:600, fontSize:"13px"}}>{errors.general}</p>}

        <button className="login-btn" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;