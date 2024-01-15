import InfiniteScrollList from "components/InfiniteScrollList";
import { API_PATHS } from "lib/constants";
import useAxiosAuth from "lib/hooks/useAxiosAuth";
import { ICategory } from "lib/interfaces";
import { useState } from "react";

interface IProps {
  content: ICategory[];
  setContent: (updatedContent: ICategory[]) => void;
}

const CONTENT_REQUEST_LIMIT = 20;

const AdminPanel: React.FC<IProps> = ({ content, setContent }) => {
  const [offset, setOffset] = useState(0);
  const [hasMoreContent, setHasMoreContent] = useState(content.length === CONTENT_REQUEST_LIMIT);

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

  console.log({ hasMoreContent });

  return (
    <div>
      <InfiniteScrollList
        elements={content}
        hasMore={hasMoreContent}
        fetchData={fetchData}
      />
    </div>
  );
};

export default AdminPanel;
