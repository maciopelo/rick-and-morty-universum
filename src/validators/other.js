export const parseText = (text) => {
  return text
    .replace(/\s+!/g, "! ")
    .replace(/\s+\?/g, "? ")
    .replace(/\s+\./g, ". ")
    .replace(/\s+,/g, ", ")
    .replace(/,/g, ", ")
    .replace(/\s+:/g, ": ")
    .replace(/-/g, " - ")
    .replace(/(\r\n|\r|\n){1}/g, "$1")
    .replace(/(\r\n|\r|\n){2,}/g, "$1\n")
    .split("\n")
    .map((line, idx) => {
      let parsedLine = line;

      if (idx === 0)
        parsedLine = `${line[0].toUpperCase()}${line.substring(1)}`;

      return (
        <span>
          {parsedLine}
          <br />
        </span>
      );
    });
};
