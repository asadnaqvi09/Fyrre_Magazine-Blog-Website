import api from '../api/axios';

export async function toggleLike(blogId) {
    const response = await api.put(`/blog/${blogId}/like`);
    return response.data.data;
}