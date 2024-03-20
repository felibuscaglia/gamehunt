import { HttpStatusCode } from "axios";
import { authClient, apiClient } from "lib/axios/apiClient";
import { API_PATHS, UI_PATHS } from "lib/constants/paths";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAxiosAuth = () => {
  const navigate = useNavigate();

  const refreshTokens = async () => {
    try {
      await apiClient.post(API_PATHS.REFRESH_TOKENS);
    } catch (err) {
      throw new Error("Unable to refresh tokens");
    }
  };

  useEffect(() => {
    const responseInterceptor = authClient.interceptors.response.use(
      (res) => res,
      async (err) => {
        const prevRequest = err.config;
        if (
          err.response?.status === HttpStatusCode.Unauthorized &&
          !prevRequest.sent
        ) {
          prevRequest.sent = true;

          try {
            await refreshTokens();
          } catch (err) {}

          return authClient(prevRequest);
        }

        if (
          err.response?.status === HttpStatusCode.Unauthorized &&
          prevRequest.url !== API_PATHS.GET_ME
        ) {
          navigate(UI_PATHS.HOME);
        } else {
          return Promise.reject(err);
        }
      }
    );

    return () => {
      authClient.interceptors.response.eject(responseInterceptor);
    };
  }, [navigate]);

  return authClient;
};

export default useAxiosAuth;
