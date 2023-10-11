export const generateSlug = (title: string, id: string): string => {
  if (!title) {
    return id;
  }

  const sanitizedTitle = title
    .normalize('NFD')
    .toLowerCase()
    .replace(/ł/g, 'l')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-') // remove duplicates dashes
    .substring(0, 50) //limit length to 50 chars
    .replace(/^-|-$/g, ''); // remove dashes from start and end

  return `${sanitizedTitle}-${id}`;
};
