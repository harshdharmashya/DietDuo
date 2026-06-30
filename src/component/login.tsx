import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { Link } from "react-router-dom";
import "../CSS/login.css"
import { BicepsFlexed, ChartColumnIncreasing, Eye, EyeOff, Salad } from "lucide-react";
// TODO: React hot toast integrate
// TODO: loader on buttons
// TODO: alignment of flex grid content 
// TODO: AI intergrate
// TODO: show skeltion on loading instead of loader 
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in Successfully");
      window.location.href = "/";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-section">

      {/* Left panel */}
      <div className="login-left">
        <div className="login-left-content">
          <h1 className="login-brand">𝓓𝓲𝓮𝓽𝓓𝓾𝓸</h1>
          <p className="login-tagline">Your personal diet & workout companion</p>
          <div className="login-features">
            <div className="login-feature-item"><Salad size={20} /> Personalised meal plans</div>
            <div className="login-feature-item"><BicepsFlexed size={20} /> Workout scheduling</div>
            <div className="login-feature-item"><ChartColumnIncreasing size={20} /> Track your progress</div>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="login-right">
        <div className="login-card">
          <h2 className="login-title">Welcome back</h2>
          <p className="login-subtitle">Sign in to continue your journey</p>

          <form onSubmit={handleSubmit} className="login-form">

            <div className="login-field">
              <label className="login-label">Email address</label>
              <input
                type="email"
                className="login-input"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="login-field">
              <label className="login-label">Password</label>
              <div className="login-input-wrap">
                <input
                  type={showPassword ? "text" : "password"}
                  className="login-input"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="login-eye"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password"
                >
                  {showPassword ? (
                    <EyeOff style={{ stroke: "#000" }} />
                  ) : (
                    <Eye style={{ stroke: "#000" }} />
                  )}
                </button>
              </div>
            </div>

            <button type="submit" className="login-btn">
              Sign in
            </button>

            <p className="login-register">
              New here? <Link to="/register">Create an account</Link>
            </p>

          </form>
        </div>
      </div>

    </div>
  );
}

export default Login;