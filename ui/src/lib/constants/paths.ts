export const UI_PATHS = {
  HOME: "/",
  LOGIN: "/login",
  SIGN_UP: "/sign-up",
  TERMS: "/terms-and-conditions",
  PRIVACY_POLICY: "/privacy-policy",
  RECOVER_PASSWORD: "/recover-password",
  SUBMIT_GAME: "/games/new",
  NOTIFICATIONS: "/notifications",
  EDIT_GENRES: "/admin/genres",
  EDIT_SUBGENRES: "/admin/subgenres",
};

export const API_PATHS = {
  LOGIN: "/auth/login",
  SIGN_OUT: "/auth/sign-out",
  SIGN_UP: "/auth/sign-up",
  REFRESH_TOKENS: "/auth/refresh",
  GET_ME: "/users/me",
  SUBMIT_GAME: "/games",
  GET_DRAFT_USER_GAMES: "/games/user?onlyDrafts=1",
  GET_GENRES: "/genres",
  GET_GENRES_WITH_SUBGENRES: "/genres?includeSubgenres=true",
  GET_SUBGENRES: "/subgenres",
  CREATE_GENRE: "/genres",
  CREATE_SUBGENRE: "/subgenres",
  GET_ADMIN_GENRES: "/admin/genres",
  GET_ADMIN_SUBGENRES: "/admin/subgenres",
  UPLOAD_IMAGE: "/images",
  DELETE_IMAGE: "/images/:imageExternalId",
  BULK_UPLOAD_IMAGES: "/images/bulk"
};
