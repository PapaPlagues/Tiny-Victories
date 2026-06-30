import { API_URL } from '../../../config/config';

const handleResponse = async (res) => {
    const data = await res.json();

    if (!res.ok) {
        throw new Error(data?.error || "Something went wrong");
    }

    return data;
};

// GET all posts
export const getPosts = async ({ token }) => {
    const res = await fetch(`${API_URL}/posts`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return handleResponse(res);
};

// GET single post
export const getPost = async (id) => {
    const res = await fetch(`${API_URL}/posts/${id}`);
    return handleResponse(res);
};

// CREATE post
export const createPost = async ({
    token,
    title,
    content,
    published,
    image,
    tags,
}) => {
    const formData = new FormData();

    formData.append("title", title);
    formData.append("content", content);
    formData.append("published", published);

    if (image) formData.append("image", image);
    if (tags) formData.append("tags", JSON.stringify(tags));

    const res = await fetch(`${API_URL}/posts`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: formData,
    });

    return handleResponse(res);
};

// UPDATE post (PATCH)
export const updatePost = async (id, { token, ...payload }) => {
    const formData = new FormData();

    Object.entries(payload || {}).forEach(([key, value]) => {
        if (value === undefined || value === null) return;

        if (key === "tags") {
            formData.append("tags", JSON.stringify(value));
        } else {
            formData.append(key, value);
        }
    });

    const res = await fetch(`${API_URL}/posts/${id}`, {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: formData,
    });

    return handleResponse(res);
};

// DELETE post
export const deletePost = async (id, { token }) => {
    const res = await fetch(`${API_URL}/posts/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return handleResponse(res);
};