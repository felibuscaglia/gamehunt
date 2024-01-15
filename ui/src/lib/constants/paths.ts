export const UI_PATHS = {
  HOME: "/",
  LOGIN: "/login",
  SIGN_UP: "/sign-up",
  TERMS: "/terms-and-conditions",
  PRIVACY_POLICY: "/privacy-policy",
  RECOVER_PASSWORD: "/recover-password",
  SUBMIT_GAME: "/games/new",
  NOTIFICATIONS: "/notifications",
  EDIT_CATEGORIES: "/admin/categories",
  EDIT_USERS: "/admin/users",
};

export const API_PATHS = {
  LOGIN: "/auth/login",
  SIGN_OUT: "/auth/sign-out",
  SIGN_UP: "/auth/sign-up",
  REFRESH_TOKENS: "/auth/refresh",
  GET_ME: "/users/me",
  SUBMIT_GAME: "/games",
  GET_DRAFT_USER_GAMES: "/games/user?onlyDrafts=1",
  GET_CATEGORIES: "/categories",
  GET_ADMIN_CATEGORIES: "/admin/categories",
};
