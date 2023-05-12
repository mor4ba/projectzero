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
    <div className="rating rating__wrapper w-full flex flex-col gap-2 border-b-2 border-primary-grey pb-4">
      <h3 className="self-center border-0">{title}</h3>
      <div className="rating__container grid grid-cols-3 nowrap w-full gap-4 md:px-4 justify-center items-center">
        <span className="left justify-self-end h-fit">{left}</span>
        <div className="range relative w-full bg-white w-20 b-white b-2 border h-6 rounded-lg">
          <StyledSpan
            perc={perc}
            className={`marker h-full bg-gradient-to-r from-secondary-color to-tertiary-color absolute left-0 ${
              perc == "100"
                ? "rounded-lg"
                : "rounded-lg rounded-tr-none rounded-br-none"
            }`}
          ></StyledSpan>
        </div>
        <span className="right text-right h-fit">{right}</span>
      </div>
    </div>
  );
}
