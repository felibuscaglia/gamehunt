import { Link } from "react-router-dom";

interface IProps<T> {
  elements?: T[];
  displayKey: keyof T;
  title: string;
  baseUrl: string;
}

const TAG_CLASSNAMES =
  "bg-primary-brand-color-light py-1 px-3 rounded-full flex items-center justify-center";

const GameDetailTags = <T,>({
  elements = [],
  title,
  displayKey,
  baseUrl,
}: IProps<T>) => {
  return (
    <section className="flex items-center gap-4">
      <span className="font-semibold w-2/12">{title}: </span>
      {elements.map((el) =>
        el["urlSlug" as keyof T] ? (
          <Link
            to={`/${baseUrl}/${el["urlSlug" as keyof T]}`}
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
    </section>
  );
};

export default GameDetailTags;
