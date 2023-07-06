export const utcTimestampToDate = (timestamp: number) => {
  return new Date(new Date(timestamp).toString().substring(0, 28));
};
