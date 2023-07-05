const GetDateTimestamp = (date: Date): number => {
  const normalized = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    0,
    0,
    0,
    0,
  );
  return normalized.getTime() - normalized.getTimezoneOffset() * 60000;
};

export default GetDateTimestamp;
