import { useCallback } from "react";
import { useAuthContext } from "../../components/App/Auth/AuthProvider";
import ApiError from "../error/ApiError";
import AppError from "../error/AppError";
import { handleErrors } from "../helpers/api";

const useAuthApi = () => {
  const { auth, logout } = useAuthContext();

  const authFetch = useCallback(
    (url, config = {mode:"cors"}) => {
      // add authorization header
      // hier zit een fout!!!!
      console.log("test")
      console.log(auth)
      console.log("url: " + url + " config: " + JSON.stringify(config))

      if (auth && auth.token) {
        config.headers = {
          ...(config.headers || {}),
          Authorization: `Bearer ${auth.token}`,
        };

      }

      return fetch(url, config)
        .then(handleErrors)
        .catch((error) => {
          if (error instanceof ApiError) {
            if (error.isUnauthorized()) {
              logout();
            }
            throw error;
          } else {
            throw new AppError(error);
          }
        });
    },
    [logout, auth]
  );

  return {
    authFetch,
  };
};

export default useAuthApi;
