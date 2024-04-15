import { IconPlus } from "@tabler/icons-react";
import Notification from "components/Notification";
import AuthGuard from "guards/Auth";
import { API_PATHS } from "lib/constants";
import { INotification } from "lib/interfaces";

const NotificationsScreen = () => {
  return (
    <AuthGuard<INotification[]>
      apiPath={API_PATHS.GET_USER_NOTIFICATIONS}
      pageHeadWithMarginBottom={false}
    >
      {(notifications) => (
        <section className="flex-grow bg-primary-brand-color-extra-light">
          <div className="w-10/12 mx-auto py-8">
            <h2 className="text-2xl font-semibold">Notifications</h2>
            {notifications.length ? (
              <div className="flex flex-col gap-4 mt-4 w-3/4">
                {notifications.map((notification) => (
                  <Notification
                    notification={notification}
                    key={`notification-${notification.id}`}
                  />
                ))}
              </div>
            ) : (
              <div
                className="flex items-center justify-center gap-2 mt-10 absolute inset-1/2 w-full"
                style={{ transform: "translate(-50%, -50%)" }}
              >
                <IconPlus size={20} />
                <p className="text-xl font-medium">Nothing here yet...</p>
              </div>
            )}
          </div>
        </section>
      )}
    </AuthGuard>
  );
};

export default NotificationsScreen;
