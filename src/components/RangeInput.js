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
    <div className="relative grid grid-cols-3 gap-2 nowrap w-fit gap-4">
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
      <span className="right relative text-right">{right}</span>
    </div>
  );
}
