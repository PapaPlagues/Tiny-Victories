import '../styles/Login.css';

const Login = () => {


    return(
    <>
       <main className="login-page">
            <div className="login-card">
                <h1>Admin Login</h1>
                <p>Sign in to manage blog posts and comments.</p>

                <form action="" className="login-form">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email" 
                            type="email"
                            placeholder="admin@email.com"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
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