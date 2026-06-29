import { API_URL } from '../../../config/config';

const handleReponse = async (res) => {
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
            "Authorization" : `Bearer ${token}`,
        },
    });

    return handleReponse(res);
}

// GET single post
export const getPost = async (id) => {
    const res = await fetch(`${API_URL}/posts/${id}`);
    return handleReponse(res);
};

// CREATE post
export const createPost = async ({ token, title, content, published }) => {
    const res = await fetch(`${API_URL}/posts`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
            title,
            content,
            published,
        }),
    });

    return handleReponse(res);
}

// UPDATE post (PATCH)
export const updatePost = async (id, { token, ...payload}) => {
    const res = await fetch(`${API_URL}/posts/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
    });

    return handleReponse(res);
};

// DELETE post
export const deletePost = async (id, { token }) => {
    const res = await fetch(`${API_URL}/posts/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${token}`,
        }
    });

    return handleReponse(res);
}