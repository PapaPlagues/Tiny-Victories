import './AdminPosts.css';
import { useEffect, useState } from "react";
import { API_URL } from "../../../../config/config";
import PostList from "../../components/PostList/PostList";
import { useOutletContext } from "react-router";
import { getPosts, deletePost } from '../../api/postService';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';


const AdminPosts = () => {
    const {posts, setPosts} = useOutletContext();

    const [loading, setLoading] = useState(true);
    const [deleteId, setDeleteId] = useState(null);
    const [error, setError] = useState(null);

    const token = localStorage.getItem("token");
    
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                let posts = await getPosts({ token });
                setPosts(posts);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }  
        };

        fetchPosts();
    }, [API_URL, token]);

    const handleDelete = async () => {
        try {
            setError(null);
            await deletePost(deleteId, { token });

            setPosts(prev =>
                prev.filter(p => p.id !== deleteId)
            );

        } catch (err) {
            console.error("Delete error:", err);
            setError(err.message || "Failed to delete post");
        } finally {
            setDeleteId(null);
        }
    };

   
  

    return (
        <main id="posts-body">
            <h1>Posts</h1>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            {loading && <p>Loading posts...</p>}

           <PostList
                posts={posts}
                onDelete={(id) => setDeleteId(id)}
            />

            <ConfirmModal
                isOpen={deleteId !== null}
                title="Delete Post"
                message="Are you sure you want to delete this post? This cannot be undone."
                confirmText="Delete"
                onCancel={() => setDeleteId(null)}
                onConfirm={handleDelete}
            />
        </main>
    );
};

export default AdminPosts;