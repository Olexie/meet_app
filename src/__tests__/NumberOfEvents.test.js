import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents/> component', () => {
  let NumberOfEventsWrapper;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(<NumberOfEvents updateEvents={() => {}} />);
  });

  test('correct details rendered', () => {
    expect(NumberOfEventsWrapper.find('.numberOfEvents')).toHaveLength(1);
  });

  test('Default input is 1', () => {
    expect(NumberOfEventsWrapper.state('query')).toBe(1);
  });

  test('Value changes correctly', () => {
    NumberOfEventsWrapper.find('.numberOfEvents').simulate('change', {
      target: { value: 32 },
    });
    expect(NumberOfEventsWrapper.state('query')).toBe(32);
  });
});
