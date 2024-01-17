import { IconCategory } from "@tabler/icons-react";
import AdminPanel from "components/AdminPanel";
import AuthGuard from "guards/Auth";
import SidebarLayout from "layouts/Sidebar";
import { API_PATHS, UI_PATHS } from "lib/constants";
import { IGenre, ISidebarSection } from "lib/interfaces";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const currLocationInfo = (pathname: string) => {
  const info = {
    apiPath: "",
    index: 0,
    title: "",
  };

  switch (pathname) {
    case UI_PATHS.EDIT_GENRES:
      info.apiPath = `${API_PATHS.GET_ADMIN_GENRES}?limit=20&offset=0`;
      info.title = "Genres";
      break;
    case UI_PATHS.EDIT_USERS:
      info.apiPath = `${API_PATHS.GET_ADMIN_GENRES}?limit=20&offset=0`;
      info.index = 1;
      break;
  }

  return info;
};

const SIDEBAR_SECTIONS: ISidebarSection[] = [
  {
    text: "Genres",
    icon: IconCategory,
    path: UI_PATHS.EDIT_GENRES,
  },
  {
    text: "Users",
    icon: IconCategory,
    path: UI_PATHS.EDIT_USERS,
  },
];

const AdminPortalScreen = () => {
  const [editMode, setEditMode] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const currentLocationInfo = currLocationInfo(location.pathname);

  const handleSidebarBtnClick = () => {
    if (!editMode) {
      setEditMode(true);
    }
  };

  return (
    <AuthGuard<IGenre[]> apiPath={currentLocationInfo.apiPath}>
      {(content, setContent) => (
        <SidebarLayout
          title={currentLocationInfo.title}
          selectedSectionIndex={currentLocationInfo.index}
          sections={SIDEBAR_SECTIONS}
          btnText="New"
          onBtnClick={handleSidebarBtnClick}
          onSectionClick={(index: number) =>
            navigate(SIDEBAR_SECTIONS[index].path || "")
          }
        >
          <AdminPanel
            content={content}
            setContent={setContent}
            editMode={editMode}
            setEditMode={setEditMode}
          />
        </SidebarLayout>
      )}
    </AuthGuard>
  );
};

export default AdminPortalScreen;
