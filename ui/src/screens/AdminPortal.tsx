import { IconCategory } from "@tabler/icons-react";
import AdminPanel from "components/AdminPanel";
import AuthGuard from "guards/Auth";
import SidebarLayout from "layouts/Sidebar";
import { API_PATHS, UI_PATHS } from "lib/constants";
import { ICategory, ISidebarSection } from "lib/interfaces";
import { useLocation, useNavigate } from "react-router-dom";

const currLocationInfo = (pathname: string) => {
  const info = {
    apiPath: "",
    index: 0,
    title: "",
  };

  switch (pathname) {
    case UI_PATHS.EDIT_CATEGORIES:
      info.apiPath = `${API_PATHS.GET_ADMIN_CATEGORIES}?limit=20&offset=0`;
      info.title = "Categories";
      break;
    case UI_PATHS.EDIT_USERS:
      info.apiPath = `${API_PATHS.GET_ADMIN_CATEGORIES}?limit=20&offset=0`;
      info.index = 1;
      break;
  }

  return info;
};

const SIDEBAR_SECTIONS: ISidebarSection[] = [
  {
    text: "Categories",
    icon: IconCategory,
    path: UI_PATHS.EDIT_CATEGORIES,
  },
  {
    text: "Users",
    icon: IconCategory,
    path: UI_PATHS.EDIT_USERS,
  },
];

const AdminPortalScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const currentLocationInfo = currLocationInfo(location.pathname);

  return (
    <AuthGuard<ICategory[]> apiPath={currentLocationInfo.apiPath}>
      {(content, setContent) => (
        <SidebarLayout
          title={currentLocationInfo.title}
          selectedSectionIndex={currentLocationInfo.index}
          sections={SIDEBAR_SECTIONS}
          onSectionClick={(index: number) =>
            navigate(SIDEBAR_SECTIONS[index].path || "")
          }
        >
          <AdminPanel content={content} setContent={setContent} />
        </SidebarLayout>
      )}
    </AuthGuard>
  );
};

export default AdminPortalScreen;
