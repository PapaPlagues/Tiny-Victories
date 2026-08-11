import { API_URL } from '../../../config/config';

const normalizeTags = (tags) => {
    if (!tags) return [];

    if (Array.isArray(tags)) {
        return tags
            .map((tag) => (typeof tag === 'string' ? tag : tag?.name))
            .filter(Boolean)
            .map((tag) => String(tag).trim())
            .filter(Boolean);
    }

    if (typeof tags === 'string') {
        return tags
            .split(',')
            .map((tag) => tag.trim())
            .filter(Boolean);
    }

    return [];
};


const authHeaders = (token) => token ? { Authorization: `Bearer ${token}` } : {};

const handleResponse = async (res) => {
    const data = await res.json();

    if (!res.ok) {
        const errorMsg = data?.error || `HTTP ${res.status}: Something went wrong`;
        console.error("API Error:", { status: res.status, error: data });
        throw new Error(errorMsg);
    }

    return data;
};

// GET all posts
export const getPosts = async ({ token }) => {
    const res = await fetch(`${API_URL}/posts`, {
        headers: authHeaders(token),
    });

    return handleResponse(res);
};

// GET single post
export const getPost = async (id, { token } = {}) => {
    const res = await fetch(`${API_URL}/posts/${id}`, {
        headers: authHeaders(token),
    });
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
    const normalizedTags = normalizeTags(tags);
    const formData = new FormData();

    formData.append("title", title);
    formData.append("content", content);
    formData.append("published", published);

    if (image) {
        formData.append("image", image);
    }
    if (normalizedTags.length > 0) formData.append("tags", JSON.stringify(normalizedTags));

    const res = await fetch(`${API_URL}/posts`, {
        method: "POST",
        headers: authHeaders(token),
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
            formData.append("tags", JSON.stringify(normalizeTags(value)));
        } else {
            formData.append(key, value);
        }
    });

    const res = await fetch(`${API_URL}/posts/${id}`, {
        method: "PATCH",
        headers: authHeaders(token),
        body: formData,
    });

    return handleResponse(res);
};

// DELETE post
export const deletePost = async (id, { token }) => {
    const res = await fetch(`${API_URL}/posts/${id}`, {
        method: "DELETE",
        headers: authHeaders(token),
    });

    return handleResponse(res);
};

// DELETE comment
export const deleteComment = async(id, commentId, token) => {
    const res = await fetch(`${API_URL}/posts/${id}/comments/${commentId}`, {
        method: "DELETE",
        headers: authHeaders(token),
    });

    return handleResponse(res);
}
