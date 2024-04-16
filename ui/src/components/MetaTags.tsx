import { Helmet } from "react-helmet-async";

interface IProps {
  description: string;
  title: string;
  image?: string;
}

const MetaTags: React.FC<IProps> = ({ description, title, image }) => {
  return (
    <Helmet prioritizeSeoTags>
      <meta name="description" content={description} />
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={window.location.href} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && (
        <>
          <meta property="og:image" content={image} />
          <meta name="twitter:image" content={image} />
        </>
      )}
    </Helmet>
  );
};

export default MetaTags;
