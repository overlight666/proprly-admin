export const truncateString = (string = "", maxLength = 12) => {
  return (
    <span data-tooltip-id="tooltip" data-tooltip-content={string}>
      {string.length > maxLength
        ? `${string.substring(0, maxLength)}…`
        : string}
    </span>
  );
};
