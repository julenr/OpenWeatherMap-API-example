import React from 'react';

import { Cities, City, Title, Degrees, Historic } from './styled';

export default ({ data }) =>
  <Cities>
    {Object.keys(data).map((city, idx) =>
      <City key={idx}>
        <Title>{city}</Title>
        <Degrees>{data[city][0]}˚</Degrees>
        <div>Histórico</div>
        <Historic>
          {data[city].map((temp, idx) => <div key={idx}>{temp}˚</div>)}
        </Historic>
      </City>
    )}
  </Cities>;
