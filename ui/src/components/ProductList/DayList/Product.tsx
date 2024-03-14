import { IconChevronUp, IconMessageCircle } from "@tabler/icons-react";
import { IGame } from "lib/interfaces";

interface IProps {
    game: IGame;
    index: number;
}

const DayListProduct: React.FC<IProps> = ({ index }) => {
  return (
    <div className="px-2 py-4 w-full flex items-center justify-between">
      <section className="flex items-center gap-2">
        <strong className="text-3xl text-primary-brand-color-light">#{index + 1}</strong>
        <div
          className="bg-center bg-cover bg-no-repeat h-12 w-12 rounded"
          style={{
            backgroundImage: `url('https://ph-files.imgix.net/f8168651-b212-4903-a0f0-443dacdbed8e.png?auto=compress&codec=mozjpeg&cs=strip&auto=format&w=48&h=48&fit=crop&dpr=2')`,
          }}
        />
        <div>
          <p className="flex items-center gap-1">
            <strong>Hello8</strong>
            <span>—</span>
            <span>
              Say Hello to 8 Billion viewers with AI video translation
            </span>
          </p>
          <div className="flex items-center gap-4">
            <div>
              <IconMessageCircle
                size={13}
                stroke={1.5}
                className="inline mr-px"
              />
              <span className="text-xs">12</span>
            </div>
            <span>&#8226;</span>
          </div>
        </div>
      </section>
      <button className="text-gray-700 hover:text-primary-brand-color-medium h-12 w-12 flex-col flex items-center justify-center rounded border border-gray-100 hover:border-primary-brand-color-light">
        <IconChevronUp stroke={1.5} />
        <span className="text-xs font-semibold !text-gray-700">692</span>
      </button>
    </div>
  );
};

export default DayListProduct;
