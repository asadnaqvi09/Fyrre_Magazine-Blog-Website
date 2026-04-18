import api from "../api/axios";

export const fetchSettings = async () => {
  const response = await api.get("/setting/settings");
  return response.data.data;
};

export const updateSettings = async (settingId, data) => {
  const response = await api.put(`/setting/updateSetting/${settingId}`, data);
  return response.data.data;
};