import { IconSearch } from "@tabler/icons-react";
import InfiniteScrollList from "components/InfiniteScrollList";
import TextInput from "components/Inputs/Text";
import { API_PATHS } from "lib/constants";
import useAxiosAuth from "lib/hooks/useAxiosAuth";
import { ICategory } from "lib/interfaces";
import { useState } from "react";
import Form from "./Form";

interface IProps {
  content: ICategory[];
  setContent: (updatedContent: ICategory[]) => void;
  editMode: boolean;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const CONTENT_REQUEST_LIMIT = 20;

const AdminPanel: React.FC<IProps> = ({
  content,
  setContent,
  editMode,
  setEditMode,
}) => {
  const [offset, setOffset] = useState(0);
  const [hasMoreContent, setHasMoreContent] = useState(
    content.length === CONTENT_REQUEST_LIMIT
  );

  const axiosAuth = useAxiosAuth();

  const fetchData = () => {
    axiosAuth
      .get<ICategory[]>(
        `${API_PATHS.GET_ADMIN_CATEGORIES}?limit=${CONTENT_REQUEST_LIMIT}&offset=${offset}`
      )
      .then(({ data: newContent }) => {
        setOffset(offset + 1);
        setHasMoreContent(newContent.length === CONTENT_REQUEST_LIMIT);
        setContent(content.concat(newContent));
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="w-full min-h-96">
      {editMode ? (
        <Form
          exitEditMode={() => setEditMode(false)}
          appendNewCategory={(newCategory: ICategory) =>
            setContent(content.concat(newCategory))
          }
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
                placeholder="Search categories by name..."
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
