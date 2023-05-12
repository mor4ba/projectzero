import { useState } from "react";

export default function RangeInput({
  min,
  max,
  step,
  id,
  name,
  left,
  right,
  start,
}) {
  const [value, setValue] = useState(5);

  return (
    <fieldset className="rating__input relative grid grid-cols-3 nowrap w-full gap-4 md:px-4 justify-center items-center">
      <input
        className="order-2"
        type="range"
        name={name}
        id={id}
        min={min}
        max={max}
        value={value}
        step={step}
        onChange={({ target: { value: radius } }) => {
          setValue(radius);
        }}
      />
      <span className=" h-fit left order-1 relative justify-self-end">
        {left}
      </span>
      <span className="  h-fit right relative  order-3 text-right">
        {right}
      </span>
    </fieldset>
  );
}
