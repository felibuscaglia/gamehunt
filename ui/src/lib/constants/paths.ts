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
  EDIT_PLATFORMS: "/admin/platforms",
  EDIT_GAME_MODES: "/admin/game-modes",
  GENRE_DETAIL: "/genres/:genreUrlSlug",
  SUBGENRE_DETAIL: "/genres/:subgenreUrlSlug",
  GAME_DETAIL: "/game/:gameUrlSlug",
  NOT_FOUND: "/not-found",
  USER_SETTINGS: "/settings",
  USER_PROFILE: "/profile/:username",
};

export const API_PATHS = {
  LOGIN: "/auth/login",
  SIGN_OUT: "/auth/sign-out",
  SIGN_UP: "/auth/sign-up",
  REFRESH_TOKENS: "/auth/refresh",
  GET_ME: "/users/me",
  PATCH_ME: "/users/me",
  GET_ME_WITH_DETAILS: "/users/me?includeDetails=1",
  GET_USERS: "/users",
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
  BULK_UPLOAD_IMAGES: "/images/bulk",
  GET_ADMIN_PLATFORMS: "/admin/platforms",
  GET_PLATFORMS: "/platforms",
  GET_ADMIN_GAME_MODES: "/admin/game-modes",
  GET_GAME_MODES: "/game-modes",
  SAVE_PLATFORM: "/platforms",
  SAVE_GAME_MODE: "/game-modes",
  SAVE_GAME: "/games/:gameId",
  PUBLISH_GAME: "/games/:gameId/publish",
  CREATE_GAME_LINK: "/game-links",
  DELETE_GAME_LINK: "/game-links/:gameLinkId",
  GET_TRENDING_SUBGENRES: "/subgenres/trending",
  GET_GAMES_BY_DAY: "/games?date=:date",
  GET_GAME_BY_URL_SLUG: "/games/:gameUrlSlug",
  UPVOTE_GAME: "/games/:gameId/upvote",
  DOWNVOTE_GAME: "/games/:gameId/downvote",
  SAVE_COMMENT: "/comments",
  GET_USER_PROFILE_BY_USERNAME: "/users/:username/profile",
};
