import { IInfiniteScrollListElement } from "lib/interfaces";

const InfiniteScrollListElement: React.FC<IInfiniteScrollListElement> = ({
  name,
}) => {
  return (
    <div className="w-full border-b border-b-gray-200 py-4">
      <span className="font-bold">{name}</span>
    </div>
  );
};

export default InfiniteScrollListElement;
