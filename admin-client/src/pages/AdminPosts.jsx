import '../styles/AdminPosts.css';
import { useEffect, useState } from "react";
import { API_URL } from "../config/config";
import PostList from "../components/PostList";
import { useOutletContext } from "react-router";
import { getPosts } from '../services/postService';

const AdminPosts = () => {
    const {posts, setPosts } = useOutletContext();
    
    const token = localStorage.getItem("token");

    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                let posts = await getPosts(token);

                setPosts(posts);
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