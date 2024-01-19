import { IconCategory } from "@tabler/icons-react";
import AdminPanel from "components/AdminPanel";
import AdminPanelGenreForm from "components/AdminPanel/Forms/Genre";
import AdminPanelSubgenreForm from "components/AdminPanel/Forms/Subgenre";
import AuthGuard from "guards/Auth";
import SidebarLayout from "layouts/Sidebar";
import { API_PATHS, UI_PATHS } from "lib/constants";
import { IGenre, ISidebarSection, ISubgenre } from "lib/interfaces";
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
    <AuthGuard<Array<IGenre | ISubgenre>> apiPath={currentLocationInfo.apiPath}>
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
