import { Link } from "react-router";
import '../styles/AdminPosts.css';
import { useEffect, useState } from "react";
import { useOutletContext} from "react-router";
import { API_URL } from "../config/config";

const AdminPosts = () => {
    const token = localStorage.getItem("token");

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch(`${API_URL}/posts`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                const data = await res.json();

                if (!res.ok) {
                    console.log("Failed to fetch posts");
                    return;
                }

                setPosts(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }  
        };

        fetchPosts();
    }, [API_URL, token]);
   
  

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

            {loading && <p>Loading posts...</p>}

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