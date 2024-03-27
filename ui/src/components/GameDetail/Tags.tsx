import { Link } from "react-router-dom";

interface IProps<T> {
  elements?: T[];
  displayKey: keyof T;
  title: string;
  baseUrl: string;
}

const GameDetailTags = <T,>({
  elements = [],
  title,
  displayKey,
  baseUrl,
}: IProps<T>) => {
  return (
    <section className="flex items-center gap-4">
      <span className="font-semibold w-2/12">{title}: </span>
      {elements.map((el) => (
        <Link
          to={`/${baseUrl}/${el["urlSlug" as keyof T]}`}
          key={`tag-${title}-${el[displayKey]}`}
          className="bg-primary-brand-color-light py-1 px-3 rounded-full flex items-center justify-center"
        >
          <span className="text-sm whitespace-nowrap">{el[displayKey] as any}</span>
        </Link>
      ))}
    </section>
  );
};

export default GameDetailTags;
