import { IInfiniteScrollListElement } from "lib/interfaces";
import InfiniteScroll from "react-infinite-scroll-component";

interface IProps {
  elements: IInfiniteScrollListElement[];
  hasMore: boolean;
  fetchData: () => void;
}

const InfiniteScrollList: React.FC<IProps> = ({
  elements,
  hasMore,
  fetchData,
}) => {
  return (
    <InfiniteScroll
      dataLength={elements.length}
      hasMore={hasMore}
      next={fetchData}
      loader={<h4>Loading...</h4>}
    >
      {elements.map((el) => (
        <div className="bg-red-900">{el.name}</div>
      ))}
    </InfiniteScroll>
  );
};

export default InfiniteScrollList;
