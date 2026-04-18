import api from "../api/axios";

export async function getTags() {
  const response = await api.get("/tag/all_tags");
  return response.data.data.tags;
}

export async function createTag(data) {
  const response = await api.post("/tag/createTag", data);
  return response.data.data.tag;
}

export async function updateTag(tagId, data) {
  const response = await api.patch(`/tag/updateTag/${tagId}`, data);
  return response.data.data.tag;
}

export async function deleteTag(tagId) {
  const response = await api.delete(`/tag/deleteTag/${tagId}`);
  return response.data.data.tag;
}