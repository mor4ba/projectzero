import styled from "styled-components";

export const StyledSpan = styled.span`
  width: ${(props) => props.perc}%;
`;

export default function ShowRating({ count, range, left, right, title }) {
  const sum =
    Math.floor(count.reduce((partialSum, a) => partialSum + a, 0) * 100) / 100;
  const median = (sum / count.length).toFixed(2);
  const perc = (median / range) * 100;

  return (
    <div className="rating rating__wrapper w-full flex flex-col gap-2 border-b-2 border-white pb-4">
      <h3 className="self-center">{title}</h3>
      <div className="rating__container grid grid-cols-3 justify-between gap-4">
        <span className="left">{left}</span>
        <div className="range relative w-full bg-white w-20 b-white b-2 border h-6">
          <StyledSpan
            perc={perc}
            className="marker h-full bg-gradient-to-r from-green-400 to-blue-500 absolute left-0"
          ></StyledSpan>
        </div>
        <span className="right text-right">{right}</span>
      </div>
    </div>
  );
}
