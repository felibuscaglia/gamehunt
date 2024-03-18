interface IProps {
  url: string;
}

const Thumbnail: React.FC<IProps> = ({ url }) => {
  return (
    <div
      className="h-20 w-20 rounded bg-center bg-cover bg-no-repeat"
      style={{ backgroundImage: `url('${url}')` }}
    />
  );
};

export default Thumbnail;
