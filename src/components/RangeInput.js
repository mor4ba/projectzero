import { useState } from "react";

export default function RangeInput({ min, max, step, id, name, left, right }) {
  const [value, setValue] = useState(1);

  return (
    <div className="relative flex flex-row nowrap w-fit px-12 gap-x-12">
      <span className="left relative left-0">{left}</span>
      <input
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
      <span className="right relative right-0">{right}</span>
    </div>
  );
}
