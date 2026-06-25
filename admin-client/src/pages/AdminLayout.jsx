import { Outlet, Link } from "react-router";
import "../styles/AdminLayout.css";

const AdminLayout = () => {
    return (
        <div className="admin-layout">

            <aside className="admin-sidebar">
                <h2>Dashboard</h2>

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
                <Outlet />
            </main>

        </div>
    );
};

export default AdminLayout;