import styled from "styled-components";

export default function ShowRating({ count, range, left, right, title }) {
  const sum =
    Math.floor(count.reduce((partialSum, a) => partialSum + a, 0) * 100) / 100;
  const median = (sum / count.length).toFixed(2);
  const perc = (median / range) * 100;

  const StyledSpan = styled.span`
    width: ${perc}%;
  `;

  return (
    <>
      <h3>{title}</h3>
      <div className="rating__container flex flex-row justify-between">
        <span class="left">{left}</span>
        <div className="range relative bg-white w-20 b-white b-2">
          <StyledSpan className="marker h-full bg-gradient-to-r from-green-400 to-blue-500 absolute left-0"></StyledSpan>
        </div>
        <span className="right">{right}</span>
      </div>
    </>
  );
}
