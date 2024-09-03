import React, { useState, useEffect } from "react";
import { Range, getTrackBackground } from "react-range";
import "./rangeSlider.css"; // Assurez-vous de définir le style pour le slider

const RangeSlider = ({ min, max, onRangeChange }) => {
  const [values, setValues] = useState([min, max]);

  useEffect(() => {
    onRangeChange(values);
  }, [values, onRangeChange]);

  return (
    <div className="range-slider">
      <Range
        values={values}
        step={25}
        min={min}
        max={max}
        onChange={(newValues) => setValues(newValues)}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            className="range-track"
            style={{
              ...props.style,
              background: getTrackBackground({
                values,
                colors: ["#548BF4", "#ddd"],
                min,
                max,
              }),
            }}
          >
            {React.Children.map(children, (child, index) =>
              React.cloneElement(child, { key: index })
            )}
          </div>
        )}
        renderThumb={({ props, isDragged }) => {
          const { key, ...restProps } = props;
          return (
            <div
              {...restProps}
              className={`thumb ${isDragged ? "thumb-dragged" : ""}`}
            />
          );
        }}
      />
      <div className="range-labels">
        <span className="range-label-min">{values[0]}€</span>
        <span className="range-label-max">{values[1]}€</span>
      </div>
    </div>
  );
};

export default RangeSlider;
