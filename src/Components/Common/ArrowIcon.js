import React, { useRef, useEffect } from 'react';

const ArrowIcon = ({ width = 80, height = 20, color = "#000", strokeWidth = 10, style = {}, viewBox = "0 0 500 100" }) => {
  const arrowHeadWidth = strokeWidth * 3;
  const arrowHeadHeight = strokeWidth * 2;
  const lineLength = 430; // Length of the line

  return (
    <svg width={width} height={height} viewBox={viewBox} style={style}>
      <line
        x1="20"
        y1="50"
        x2="450"
        y2="50"
        stroke={color}
        strokeWidth={strokeWidth}
      />
      <polygon
        points={`
          450,50
          ${450 - arrowHeadWidth},${50 - arrowHeadHeight}
          ${450 - arrowHeadWidth},${50 + arrowHeadHeight}
        `}
        fill={color}
      />
    </svg>
  );
};


export default ArrowIcon;
