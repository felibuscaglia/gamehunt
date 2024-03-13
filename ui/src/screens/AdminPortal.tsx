import { IconCategory, IconDeviceGamepad2, IconDeviceGamepad3 } from "@tabler/icons-react";
import AdminPanel from "components/AdminPanel";
import AdminPanelGameModeForm from "components/AdminPanel/Forms/GameMode";
import AdminPanelGenreForm from "components/AdminPanel/Forms/Genre";
import AdminPanelPlatformForm from "components/AdminPanel/Forms/Platform";
import AdminPanelSubgenreForm from "components/AdminPanel/Forms/Subgenre";
import AuthGuard from "guards/Auth";
import SidebarLayout from "layouts/Sidebar";
import { API_PATHS, UI_PATHS } from "lib/constants";
import { IGameMode, IGenre, IPlatform, ISidebarSection, ISubgenre } from "lib/interfaces";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const currLocationInfo = (pathname: string) => {
  switch (pathname) {
    case UI_PATHS.EDIT_SUBGENRES:
      return {
        apiPath: `${API_PATHS.GET_ADMIN_SUBGENRES}?limit=20&offset=0`,
        index: 1,
        title: "Subgenres",
        fetchDataPath: API_PATHS.GET_ADMIN_SUBGENRES,
        form: AdminPanelSubgenreForm,
      };
    case UI_PATHS.EDIT_PLATFORMS:
      return {
        apiPath: `${API_PATHS.GET_ADMIN_PLATFORMS}?limit=20&offset=0`,
        index: 2,
        title: "Platforms",
        fetchDataPath: API_PATHS.GET_ADMIN_PLATFORMS,
        form: AdminPanelPlatformForm,
      };
    case UI_PATHS.EDIT_GAME_MODES:
      return {
        apiPath: `${API_PATHS.GET_ADMIN_GAME_MODES}?limit=20&offset=0`,
        index: 3,
        title: "Game modes",
        fetchDataPath: API_PATHS.GET_ADMIN_GAME_MODES,
        form: AdminPanelGameModeForm,
      };
    default:
      return {
        apiPath: `${API_PATHS.GET_ADMIN_GENRES}?limit=20&offset=0`,
        title: "Genres",
        fetchDataPath: API_PATHS.GET_ADMIN_GENRES,
        form: AdminPanelGenreForm,
        index: 0,
      };
  }
};

const SIDEBAR_SECTIONS: ISidebarSection[] = [
  {
    text: "Genres",
    icon: IconCategory,
    path: UI_PATHS.EDIT_GENRES,
  },
  {
    text: "Subgenres",
    icon: IconCategory,
    path: UI_PATHS.EDIT_SUBGENRES,
  },
  {
    text: "Platforms",
    icon: IconDeviceGamepad3,
    path: UI_PATHS.EDIT_PLATFORMS,
  },
  { 
    text: "Game modes",
    icon: IconDeviceGamepad2,
    path: UI_PATHS.EDIT_GAME_MODES
  }
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

  const handleSectionClick = (index: number) => {
    navigate(SIDEBAR_SECTIONS[index].path || "");
    setEditMode(false);
  };

  return (
    <AuthGuard<Array<IGenre | ISubgenre | IPlatform | IGameMode>> apiPath={currentLocationInfo.apiPath}>
      {(content, setContent) => (
        <SidebarLayout
          title={currentLocationInfo.title}
          selectedSectionIndex={currentLocationInfo.index}
          sections={SIDEBAR_SECTIONS}
          btnText="New"
          onBtnClick={handleSidebarBtnClick}
          onSectionClick={handleSectionClick}
        >
          <AdminPanel
            content={content}
            setContent={setContent}
            editMode={editMode}
            setEditMode={setEditMode}
            fetchContentApiPath={currentLocationInfo.fetchDataPath}
            entityName={currentLocationInfo.title}
            formComponent={currentLocationInfo.form}
          />
        </SidebarLayout>
      )}
    </AuthGuard>
  );
};

export default AdminPortalScreen;
