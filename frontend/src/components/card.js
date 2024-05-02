// Card.jsx

import React from 'react';
import './card.css'
const Card = (props) => {
 
  return (
    <div>
      {/* Iterate over each inner array in props.arr */}
      {props.arr.map((innerArr, index) => {
        // Check if innerArr is not empty and contains at least one non-empty value
        if (innerArr.length > 0 && innerArr.some(value => value !== '')) {
          return (
            <div key={index} className="sprint">
              {/* Render innerArr values */}
              <h3>Sprint {index+1}</h3>
              {innerArr.map((value, innerIndex) => (
                // Check if value is not empty before rendering
                value !== '' && <div key={innerIndex}>{value}</div>
              ))}
            </div>
          );
        } else {
          return null; // Skip rendering if innerArr is empty or contains only empty values
        }
      })}
    </div>
  );
};

export default Card;
