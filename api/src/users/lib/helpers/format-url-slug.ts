export const formatUrlSlug = (s: string) => {
  return s.toLowerCase().replace(/\s+/g, '-');
};
