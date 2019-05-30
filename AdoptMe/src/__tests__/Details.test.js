import React from 'react';
import { create } from 'react-test-renderer';
import Details from '../Details';
import { exportAllDeclaration } from '@babel/types';

test('snapshot', () => {
  const c = create(<Details />);
  expect(c.toJSON()).toMatchSnapshot();
});
