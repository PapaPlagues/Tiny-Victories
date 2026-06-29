import './Login.css';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { API_URL } from "../../../../config/config";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            navigate("/admin");
        }
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {

            const res = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Login failed");
                return;
            }

            // store token
            localStorage.setItem("token", data.token);

            // redirect
            navigate("/admin");
        } catch(err) {
            console.error(err);
        }

    }

    return(
    <>
       <main className="login-page">
            <div className="login-card">
                <h1>Admin Login</h1>
                <p>Sign in to manage blog posts and comments.</p>

                {error && <p className="error-msg">{error}</p>}

                <form action="" className="login-form" onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            id="email" 
                            type="email"
                            placeholder="admin@email.com"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            id="password" 
                            type="password"
                            placeholder="••••••••"
                        />
                    </div>

                    <button type="submit" className="btn login-btn">
                        Login
                    </button>
                </form>

            </div>



       </main>
    </>
    )
};

export default Login;