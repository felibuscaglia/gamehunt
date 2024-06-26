import MetaTags from "components/MetaTags";
import Notification from "components/Notification";
import AuthGuard from "guards/Auth";
import { API_PATHS, APP_DESCRIPTION, APP_NAME } from "lib/constants";
import { INotification } from "lib/interfaces";

const NotificationsScreen = () => {
  return (
    <AuthGuard<INotification[]>
      apiPath={API_PATHS.GET_USER_NOTIFICATIONS}
      pageHeadWithMarginBottom={false}
    >
      {(notifications) => (
        <>
          <MetaTags
            title={`Notifications | ${APP_NAME}`}
            description={APP_DESCRIPTION}
          />
          <section className="flex-grow bg-primary-brand-color-extra-light">
            <div className="w-11/12 sm:w-10/12 mx-auto py-8">
              <h2 className="text-2xl font-semibold">Notifications</h2>
              <div className="flex flex-col gap-4 mt-4 sm:w-3/4">
                {notifications.length ? (
                  notifications.map((notification) => (
                    <Notification
                      notification={notification}
                      key={`notification-${notification.id}`}
                    />
                  ))
                ) : (
                  <div
                    className="bg-white rounded p-5 w-3/4 text-center"
                    style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0 1px 2px 0" }}
                  >
                    <span>
                      👋 <br />
                      No notifications yet.
                    </span>
                  </div>
                )}
              </div>
            </div>
          </section>
        </>
      )}
    </AuthGuard>
  );
};

export default NotificationsScreen;
