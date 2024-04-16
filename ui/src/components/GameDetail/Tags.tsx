import { Link } from "react-router-dom";

interface IProps<T> {
  elements?: T[];
  displayKey: keyof T;
  title: string;
  urlSlugGenerator?: (el: T) => string;
}

const TAG_CLASSNAMES =
  "bg-primary-brand-color-light py-1 px-3 rounded-full flex items-center justify-center";

const GameDetailTags = <T,>({
  elements = [],
  title,
  displayKey,
  urlSlugGenerator
}: IProps<T>) => {
  return (
    <section className="w-full">
      <span className="font-semibold underline sm:inline block sm:text-left text-center">{title}</span>
      <div className="flex items-center sm:justify-normal justify-center gap-2 mt-2 flex-wrap">
        {elements.map((el) =>
          urlSlugGenerator ? (
            <Link
              to={urlSlugGenerator(el)}
              key={`tag-${title}-${el[displayKey]}`}
              className={TAG_CLASSNAMES}
            >
              <span className="text-sm whitespace-nowrap">
                {el[displayKey] as any}
              </span>
            </Link>
          ) : (
            <div
              key={`tag-${title}-${el[displayKey]}`}
              className={TAG_CLASSNAMES + " cursor-default"}
            >
              <span className="text-sm whitespace-nowrap">
                {el[displayKey] as any}
              </span>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default GameDetailTags;
