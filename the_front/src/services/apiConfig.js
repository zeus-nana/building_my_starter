import { BASE_URL } from "../constants.js";

export const API_CONFIG = {
  BASE_URL: BASE_URL,
  ENDPOINTS: {
    AUTH: {
      LOGIN: "auth/login",
      LOGOUT: "auth/logout",
    },
    USERS: {
      USERS: "/users",
      RESET_USER_PASSWORD: "/reset-user-password",
    },
    ADMIN: {
      USERS: "/admin/users",
      ACTIVATE_USER: "/admin/activate-user",
      DEACTIVATE_USER: "/admin/deactivate-user",
      RESET_USER_PASSWORD: "/admin/reset-user-password",
      LOGIN: "/admin/login",
    },
  },
};
