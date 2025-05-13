export const ucword = (str: string) => {
  return (
    (str &&
      str
        .replace(/_/g, " ")
        .toLowerCase()
        .replace(/\b[a-z]/g, function (letter) {
          return letter.toUpperCase();
        })) ||
    ""
  );
};
