export const formatDateString = (dateString: string) => {
  const parts = dateString.split(/[^0-9]/);
  return `${parts[2]}.${parts[1]}.${parts[0]} ${parts[3]}:${parts[4]}`;
};
