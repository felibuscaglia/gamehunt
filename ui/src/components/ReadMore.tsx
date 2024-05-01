import { useState } from "react";

interface IProps {
  text: string;
  limit?: number;
  classNames: string;
}

const ReadMore: React.FC<IProps> = ({ text, limit = 280, classNames }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div>
      <p className={classNames}>
        {isExpanded ? text : `${text.slice(0, limit)}... `}
        {text.length > limit && !isExpanded && (
          <button
            className={`underline`}
            onClick={() => setIsExpanded(true)}
          >
            Read more
          </button>
        )}
      </p>
    </div>
  );
};

export default ReadMore;
