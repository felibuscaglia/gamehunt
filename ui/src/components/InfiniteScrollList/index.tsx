import { IInfiniteScrollListElement } from "lib/interfaces";
import InfiniteScroll from "react-infinite-scroll-component";
import Logo from "../Logo";
import Element from "./Element";

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
  const endMessage = elements.length ? (
    <></>
  ) : (
    <div className="mt-20 flex items-center justify-center gap-4 h-full">
      <Logo />
      <h4 className="text-center text-xl font-bold">Nothing here yet...</h4>
    </div>
  );

  return (
    <InfiniteScroll
      dataLength={elements.length}
      hasMore={hasMore}
      next={fetchData}
      loader={<h4>Loading...</h4>}
      endMessage={endMessage}
      height={300}
    >
      {elements.map((el) => (
        <Element {...el} key={`infinite-scroll-element-${el.name}`} />
      ))}
    </InfiniteScroll>
  );
};

export default InfiniteScrollList;
