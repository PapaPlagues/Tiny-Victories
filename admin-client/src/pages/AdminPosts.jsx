import { Link } from "react-router";
import '../styles/AdminPosts.css';
import { useEffect, useState } from "react";

const AdminPosts = () => {
    const [backendData, setBackendData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchPosts = async () => {
        try{
            setLoading(true);
            setError(null);

            const response = await fetch(API_URL)

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
        };

        fetchPosts();
    }, [API_URL]);




    return (
        <main id="posts-body">
            <div className="admin-header">
                <h1>Posts Dashboard</h1>

                <Link
                    to="/admin/posts/new"
                    className="btn"
                    id="main-btn"
                >
                    + New Post
                </Link>
            </div>

            <div className="post-table">
                <div className="post-row">
                    <div>
                        <h3>My First Blog Post</h3>
                        <p>Published</p>
                    </div>

                    <div className="post-actions">
                        <button className="btn" id="secondary-btn">
                            Edit
                        </button>

                        <button className="btn" id="secondary-btn">
                            Unpublish
                        </button>

                        <button className="btn" id="secondary-btn">
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default AdminPosts;