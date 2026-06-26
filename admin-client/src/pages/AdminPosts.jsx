import '../styles/AdminPosts.css';
import { useEffect, useState } from "react";
import { API_URL } from "../config/config";
import PostList from "../components/PostList";
import { useOutletContext } from "react-router";

const AdminPosts = () => {
    const {posts, setPosts } = useOutletContext();
    
    const token = localStorage.getItem("token");

    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch(`${API_URL}/posts`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (!res.ok) {
                    console.log("Failed to fetch posts");
                    return;
                }

                const data = await res.json();
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
            <h1>Posts</h1>

            {loading && <p>Loading posts...</p>}

           <PostList posts={posts}/>
        </main>
    );
};

export default AdminPosts;