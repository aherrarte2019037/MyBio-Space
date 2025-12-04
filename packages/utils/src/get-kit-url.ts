export const getKitUrl = (slug: string) => {
  const baseUrl =
    process.env.NODE_ENV === "development" ? "http://localhost:3001" : "https://kyt.one";

  return `${baseUrl}/${slug}`;
};
