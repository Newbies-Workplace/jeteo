export const generateSlug = (title: string, id: string): string => {
  if (!title) {
    return id;
  }

  const sanitizedTitle = title
    .normalize('NFD')
    .replace(/[^a-zA-Z0-9]/g, '-')
    .toLowerCase()
    .replace(/-+/g, '-') // remove duplicates dashes
    .substring(0, 50) //limit length to 50 chars
    .replace(/^-|-$/g, ''); // remove dashes from start and end

  return `${sanitizedTitle}-${id}`;
};
