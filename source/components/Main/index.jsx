import React from 'react';

export default ({ data }) =>
  <span>
    {data[0].map((city, idx) =>
      <div key={idx}>
        <div>{city.name}</div>
        <div>{city.temp}</div>
      </div>
    )}
  </span>;
