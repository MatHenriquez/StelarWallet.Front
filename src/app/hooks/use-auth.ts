import { useEffect } from "react";
import { AxiosError } from "axios";
import axiosInstance from "@/utils/axios-instance";
import { useRouter } from "next/navigation";
import { API_ROUTES } from "@/app/constants/routes/api-routes";
import { CLIENT_ROUTES } from "@/app/constants/routes/front-routes";

const useAuth = () => {
  const router = useRouter();

  const handleRedirect = (currentUrl: string, isAuthenticated: boolean) => {
    const shouldRedirectToDashboard =
      currentUrl === CLIENT_ROUTES.AUTH.LOGIN ||
      currentUrl === CLIENT_ROUTES.AUTH.SIGNUP ||
      currentUrl === CLIENT_ROUTES.HOME;

    if (shouldRedirectToDashboard) {
      if (isAuthenticated) {
        router.push(CLIENT_ROUTES.DASHBOARD);
      } else if (
        !isAuthenticated &&
        currentUrl !== CLIENT_ROUTES.AUTH.LOGIN &&
        currentUrl !== CLIENT_ROUTES.AUTH.SIGNUP
      ) {
        router.push(CLIENT_ROUTES.AUTH.LOGIN);
      }
    } else if (!isAuthenticated) {
      router.push(CLIENT_ROUTES.AUTH.LOGIN);
    }
  };

  useEffect(() => {
    axiosInstance
      .get(API_ROUTES.AUTH.USER_TOKEN)
      .then((response) => {
        if (response.data) {
          handleRedirect(window.location.pathname, true);
        }
      })
      .catch((error: AxiosError) => {
        console.error(error);
        handleRedirect(window.location.pathname, false);
      });
  }, []);
};

export default useAuth;
