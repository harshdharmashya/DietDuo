import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./firebase";
import { setDoc, doc } from "firebase/firestore";
import { Link } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import { BicepsFlexed, ChartColumnIncreasing, Eye, EyeOff, Salad } from "lucide-react";
import "../CSS/login.css"

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");

    const handleRegister = async (e: any) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            const user = auth.currentUser;
            console.log(user);
            if (user) {
                await setDoc(doc(db, "Users", user.uid), {
                    email: user.email,
                    firstName: fname,
                    lastName: lname,
                    photo: ""
                });
            }
            setMessage("User Registered Successfully!!");
            setOpen(true);
        } catch (error: any) {
            console.log({ error });
            setMessage(error?.message);
            setOpen(true);
        }
    };

    const handleClose = () => setOpen(false);

    return (
        <div className="login-section">
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message={message}
            />

            {/* Left panel */}
            <div className="login-left">
                <div className="login-left-content">
                    <h1 className="login-brand">𝓓𝓲𝓮𝓽𝓓𝓾𝓸</h1>
                    <p className="login-tagline">Your personal diet & workout companion</p>
                    <div className="login-features">
                        <div className="login-feature-item"><Salad size={20}/> Personalised meal plans</div>
                        <div className="login-feature-item"><BicepsFlexed size={20} /> Workout scheduling</div>
                        <div className="login-feature-item"><ChartColumnIncreasing size={20} /> Track your progress</div>
                    </div>
                </div>
            </div>

            {/* Right panel */}
            <div className="login-right">
                <div className="login-card">
                    <h2 className="login-title">Create an account</h2>
                    <p className="login-subtitle">Fill in your details to get started</p>

                    <form onSubmit={handleRegister} className="login-form">

                        {/* Name row */}
                        <div className="login-name-row">
                            <div className="login-field">
                                <label className="login-label">First name</label>
                                <input
                                    type="text"
                                    className="login-input"
                                    onChange={(e) => setFname(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="login-field">
                                <label className="login-label">Last name</label>
                                <input
                                    type="text"
                                    className="login-input"
                                    onChange={(e) => setLname(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="login-field">
                            <label className="login-label">Email address</label>
                            <input
                                type="email"
                                className="login-input"
                                placeholder="you@example.com"
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
                                    placeholder="Create a password"
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
                            Create account
                        </button>

                        <p className="login-register">
                            Already have an account? <Link to="/login">Sign in</Link>
                        </p>

                    </form>
                </div>
            </div>

        </div>
    );
}

export default Register;