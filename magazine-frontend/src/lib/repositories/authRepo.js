import api from "../api/axios";

export async function loginUser({ email, password }) {
  const response = await api.post("/auth/login", { email, password });
  const { accessToken, refreshToken, user } = response.data.data;
  localStorage.setItem("auth", JSON.stringify({ token: accessToken, refreshToken, user }));
  return { token: accessToken, refreshToken, user };
}

export async function registerUser({ userName, email, password }) {
  const response = await api.post("/auth/register", { userName, email, password });
  return response.data.data;
}

export async function logoutUser() {
  localStorage.removeItem("auth");
  try {
    const stored = JSON.parse(localStorage.getItem("auth") || "{}");
    const refreshToken = stored?.refreshToken;
    const token = stored?.token;
    if (refreshToken && token) {
      await api.post(
        "/auth/logout",
        { refreshToken },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    }
  } catch {}
}


export async function verifyEmail(token) {
  const response = await api.get(`/auth/verify-email/${token}`);
  return response.data;
}

export async function resendVerification(email) {
  const response = await api.post("/auth/resend-verification", { email });
  return response.data;
}

export async function refreshAccessToken() {
  const stored = JSON.parse(localStorage.getItem("auth") || "{}");
  const refreshToken = stored?.refreshToken;
  if (!refreshToken) throw new Error("No refresh token found");
  const response = await api.post("/auth/refresh-token", { refreshToken });
  const { accessToken, user } = response.data.data;
  localStorage.setItem("auth", JSON.stringify({ token: accessToken, refreshToken, user }));
  return { token: accessToken, user };
}