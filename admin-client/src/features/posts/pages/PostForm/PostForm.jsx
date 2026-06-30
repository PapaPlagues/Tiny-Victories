import './PostFormPage.css';
import { useState, useEffect } from "react";
import { useOutletContext, useParams, useNavigate } from "react-router";

import {
    getPost,
    createPost,
    updatePost,
} from '../../api/postService';

import FormFields from './FormFields';
import FormActions from './FormActions';

const initialFormState = {
    title: "",
    content: "",
    image: null,
    imageUrl: null,
    imagePreview: null,
    tags: [],
    published: false,
};

const PostForm = ({ mode }) => {
    const { setPosts } = useOutletContext();
    const { postId } = useParams();
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const [form, setForm] = useState(initialFormState);
    const [error, setError] = useState(null);

    useEffect(() => {
    if (!postId) {
        setForm(initialFormState);
        return;
    }

    const loadPost = async () => {
        const data = await getPost(postId);

        setForm({
            title: data.title || "",
            content: data.content || "",
            image: null,
            imageUrl: data.imageUrl || null,
            imagePreview: null,
            tags: data.tags || [],
            published: data.published || false,
        });
    };

    loadPost();
}, [postId]);

    const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
        let post;

        const payload = {
            title: form.title,
            content: form.content,
            published: form.published,
            tags: form.tags,
            image: form.image,
        };

        if (mode === "create") {
            post = await createPost({
                token,
                ...payload,
            });

            setPosts(prev => [...prev, post]);
        } else {
            post = await updatePost(postId, {
                token,
                ...payload,
            });

            setPosts(prev =>
                prev.map(p => (p.id === post.id ? post : p))
            );
        }

        navigate("/admin");

    } catch (err) {
        console.error("Submit error:", err);
        setError(err.message || "Failed to save post");
    }
};

    return (
        <div className="post-form-page">

            <div className="post-form-container">

                <h1 className="form-title">
                    {mode === "edit"
                        ? "Edit Post"
                        : "Create Post"}
                </h1>

                {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}

                <form
                    className="post-form"
                    onSubmit={handleSubmit}
                >

                    <FormFields
                        form={form} setForm={setForm}
                    />

                    <FormActions
                        mode={mode}
                        onCancel={() => navigate("/admin")}
                    />

                </form>

            </div>

        </div>
    );
};

export default PostForm;