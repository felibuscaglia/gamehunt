import PageHead from "components/PageHead";
import { apiClient } from "lib/axios/apiClient";
import {
  API_PATHS,
  PRIMARY_BRAND_COLOR,
  UNEXPECTED_ERROR_MSG,
} from "lib/constants";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PacmanLoader } from "react-spinners";
import { useAppDispatch, useAppSelector } from "store";
import { addUser } from "store/features/userSlice";

const ConfirmEmailScreen = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [emailConfirmed, setEmailConfirmed] = useState(false);

  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.user?.user);

  useEffect(() => {
    apiClient
      .post(API_PATHS.CONFIRM_EMAIL, { token: searchParams.get("token") })
      .then(() => {
        if (user) {
          dispatch(
            addUser({
              ...user,
              emailConfirmed: true,
            })
          );
        }

        setEmailConfirmed(true);
      })
      .catch((err) =>
        setError(err?.response?.data?.message || UNEXPECTED_ERROR_MSG)
      )
      .finally(() => setLoading(false));
  }, [searchParams]);

  return (
    <main className="h-screen flex flex-col">
      <PageHead withMarginBottom={false} />
      <section className="bg-primary-brand-color-light flex-grow flex items-center justify-center">
        <div className="bg-white rounded p-7 w-1/3 flex flex-col items-center">
          {loading && <PacmanLoader color={PRIMARY_BRAND_COLOR} />}
          {error && <p>{error}</p>}
          {emailConfirmed && <p>Email confirmed</p>}
        </div>
      </section>
    </main>
  );
};

export default ConfirmEmailScreen;
