export default function Pin({ typeOf, tooltip }) {
  let color = "red";
  switch (typeOf) {
    case "bar":
      color = "sky-600";
      break;
    case "club":
      color = "red-600";
      break;
    case "restaurant":
      color = "green-600";
      break;
    case "other":
      color = "yellow-500";
      break;
  }

  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      viewBox="0 0 24 24"
      className={`fill-${color} pin cursor-pointer z-10`}
    >
      <title>{tooltip}</title>
      <path d="M12 0c-4.142 0-7.5 3.358-7.5 7.5 0 7.5 7.5 16.5 7.5 16.5s7.5-9 7.5-16.5c0-4.142-3.358-7.5-7.5-7.5zM12 12.094c-2.537 0-4.594-2.057-4.594-4.594s2.057-4.594 4.594-4.594 4.594 2.057 4.594 4.594-2.057 4.594-4.594 4.594zM9.094 7.5c0-1.605 1.301-2.906 2.906-2.906s2.906 1.301 2.906 2.906c0 1.605-1.301 2.906-2.906 2.906s-2.906-1.301-2.906-2.906z"></path>
    </svg>
  );
}
