import { IconSearch } from "@tabler/icons-react";
import InfiniteScrollList from "components/InfiniteScrollList";
import TextInput from "components/Inputs/Text";
import useAxiosAuth from "lib/hooks/useAxiosAuth";
import {
  IAdminFormProps,
  IGameMode,
  IGenre,
  IPlatform,
  ISubgenre,
} from "lib/interfaces";
import { useState } from "react";

interface IProps {
  content: Array<IGenre | ISubgenre | IPlatform | IGameMode>;
  setContent: (updatedContent: IGenre[] | IPlatform[] | IGameMode[]) => void;
  editMode: boolean;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  fetchContentApiPath: string;
  entityName: string;
  formComponent: React.FC<IAdminFormProps>;
}

const CONTENT_REQUEST_LIMIT = 20;

const AdminPanel: React.FC<IProps> = ({
  content,
  setContent,
  editMode,
  setEditMode,
  entityName,
  fetchContentApiPath,
  formComponent: Form,
}) => {
  entityName = entityName.toLowerCase().slice(0, entityName.length - 1);

  const [offset, setOffset] = useState(1);
  const [hasMoreContent, setHasMoreContent] = useState(
    content.length === CONTENT_REQUEST_LIMIT
  );

  const authApiClient = useAxiosAuth();

  const fetchData = () => {
    authApiClient
      .get<Array<IGenre | ISubgenre | IGameMode | IPlatform>>(
        `${fetchContentApiPath}?limit=${CONTENT_REQUEST_LIMIT}&offset=${offset}`
      )
      .then(({ data: newContent }) => {
        setOffset(offset + 1);
        setHasMoreContent(newContent.length === CONTENT_REQUEST_LIMIT);
        setContent(content.concat(newContent));
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="w-full min-h-96 h-full">
      {editMode ? (
        <Form
          exitEditMode={() => setEditMode(false)}
          appendNew={(newElement: IGenre | ISubgenre | IGameMode | IPlatform) =>
            setContent(content.concat(newElement))
          }
          entityName={entityName}
        />
      ) : (
        <>
          <section className="w-full flex flex-row-reverse mb-8">
            <div className="w-1/3">
              <TextInput
                icon={IconSearch}
                value=""
                onChange={() => {}}
                id=""
                placeholder={`Search ${entityName} by name...`}
                textSize="small"
              />
            </div>
          </section>
          <InfiniteScrollList
            elements={content}
            hasMore={hasMoreContent}
            fetchData={fetchData}
          />
        </>
      )}
    </div>
  );
};

export default AdminPanel;
