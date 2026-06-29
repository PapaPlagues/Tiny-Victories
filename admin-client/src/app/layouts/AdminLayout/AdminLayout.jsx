import { Outlet, Link, useNavigate } from "react-router";
import { useState } from "react";
import "./AdminLayout.css";

const AdminLayout = () => {
    const [posts, setPosts] = useState([]);
     const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate('/login');
    };


    return (
        <div className="admin-layout">

            <aside className="admin-sidebar">
                <h2>Dashboard</h2>

                <button className="logout-btn" onClick={handleLogout}>Log Out</button>

                <nav className="admin-nav">
                    <Link to="/admin" >
                        Posts
                    </Link>

                    <Link 
                        to="/admin/new" >
                        New Post
                    </Link>
                </nav>
            </aside>

            <main className="admin-content">
                <Outlet context={{posts, setPosts}}/>
            </main>

        </div>
    );
};

export default AdminLayout;