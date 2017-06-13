import React from 'react';
import renderer from 'react-test-renderer';

import Cities from '..';

describe('Range component', () => {
  const data = {
    ciudad1: ['1', '2'],
    ciudad2: ['1', '2'],
    ciudad3: ['1', '2']
  };
  test('Snapshot', () => {
    const component = renderer.create(
      <Cities data={data} />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
