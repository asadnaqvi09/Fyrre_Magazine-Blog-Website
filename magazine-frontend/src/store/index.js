import { configureStore } from "@reduxjs/toolkit";
import { blogReducer } from "../features/blog/blogSlice";
import { authReducer } from "../features/auth/authSlice";
import { analyticsReducer } from "../features/analytics/analyticsSlice";
import { categoryReducer } from "../features/category/categorySlice";
import { settingReducer } from "../features/setting/settingSlice";
import { tagReducer } from "../features/tag/tagSlice";
import { userReducer } from "../features/user/userSlice";

export const store = configureStore({
  reducer: {
    blogs: blogReducer,
    auth: authReducer,
    analytics: analyticsReducer,
    category: categoryReducer,
    setting: settingReducer,
    tag: tagReducer,
    user: userReducer,
  }
});