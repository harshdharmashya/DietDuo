import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "./firebase";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import "../CSS/login.css"

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in Successfully");
      window.location.href = "/";
      // toast.success("User logged in Successfully", {
      //   position: "top-center",
      // });
    } catch (error) {
      // console.log(toast.error("hello"));

      // toast.error(toast.error("bye"), {
      //   position: "bottom-center",
      // });
    }
  };

  return (
    <div className="login-section">
      <h3 style={{display:"block",margin:'2% auto',width:'130px'}}>𝓓𝓲𝓮𝓽𝓓𝓾𝓸</h3>
    <form className="form" onSubmit={handleSubmit}>
      <h4>Login</h4>

      <div className="mb-3">
        <label>Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="d-grid">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
      <p className="forgot-password text-right">
        New user <Link to="/register">Register Here</Link>
      </p>
    </form>
    </div>
  );
}

export default Login;