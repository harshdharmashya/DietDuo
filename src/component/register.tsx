import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./firebase";
import { setDoc, doc } from "firebase/firestore";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { BicepsFlexed, ChartColumnIncreasing, Eye, EyeOff, Salad } from "lucide-react";
import "../CSS/login.css"
import axios from "axios";

function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        last: '',
        email: '',
        password: '',
        confirmPassword: '',
        profilePic: '',
    });

    const handleRegister = async (e: any) => {
        e.preventDefault();
        setLoading(true);

        const { name, last, email, password, confirmPassword, profilePic } = formData;

        if (password !== confirmPassword) {
            setError('Passwords do not match!');
            return;
        }
        try {
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/register`, {
                name,
                last,
                email,
                password,
                profilePic,
            });

            console.log("Backend response:", res.data);
            const token = res.data?.token || res.data?.jwt || res.data?.accessToken || res.data?.access_token || res.data?.data?.token;
            if (token) {
                localStorage.setItem('token', token);
            } else {
                localStorage.setItem('token', typeof res.data === 'string' ? res.data : JSON.stringify(res.data));
            }

            toast.success("User Registered Successfully!!");
            setTimeout(() => {
                window.location.href = "/login";
            }, 1000);
        } catch (error: any) {
            console.log({ error });
            toast.error(error.response?.data?.message || error?.message || "Failed to register");
            setLoading(false);
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
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                    disabled={loading}
                                />
                            </div>
                            <div className="login-field">
                                <label className="login-label">Last name</label>
                                <input
                                    type="text"
                                    className="login-input"
                                    onChange={(e) => setFormData({ ...formData, last: e.target.value })}
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        <div className="login-field">
                            <label className="login-label">Email address</label>
                            <input
                                type="email"
                                className="login-input"
                                placeholder="you@example.com"
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                                disabled={loading}
                            />
                        </div>

                        <div className="login-field">
                            <label className="login-label">Password</label>
                            <div className="login-input-wrap">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="login-input"
                                    placeholder="Create a password"
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    required
                                    disabled={loading}
                                />
                                <button
                                    type="button"
                                    className="login-eye"
                                    onClick={() => setShowPassword(!showPassword)}
                                    aria-label="Toggle password"
                                    disabled={loading}
                                >
                                    {showPassword ? (
                                        <EyeOff style={{ stroke: "#000" }} />
                                    ) : (
                                        <Eye style={{ stroke: "#000" }} />
                                    )}
                                </button>
                            </div>
                        </div>
                        <div className="login-field">
                            <label className="login-label">Confirm Password</label>
                            <div className="login-input-wrap">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="login-input"
                                    placeholder="Confirm your password"
                                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                    required
                                    disabled={loading}
                                />
                                <button
                                    type="button"
                                    className="login-eye"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    aria-label="Toggle password"
                                    disabled={loading}
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff style={{ stroke: "#000" }} />
                                    ) : (
                                        <Eye style={{ stroke: "#000" }} />
                                    )}
                                </button>
                            </div>
                        </div>

                        <button type="submit" className="login-btn" disabled={loading} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
                            {loading ? (
                                <>
                                    <div className="spinner-border spinner-border-sm" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                    Creating account...
                                </>
                            ) : (
                                "Create account"
                            )}
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