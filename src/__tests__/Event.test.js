import React from 'react';
import { shallow } from 'enzyme';
import Event from '../Event';
import { mockData } from '../mock-data';

describe('<Event /> component', () => {
  let EventWrapper, event;
  event = mockData[0];
  beforeAll(() => {
    EventWrapper = shallow(<Event event={event} />);
  });
  test('render details', () => {
    expect(EventWrapper.find('li')).toHaveLength(4);
  });

  test('correct details rendered', () => {
    const summary = EventWrapper.find('.summary');
    const eventDetails = EventWrapper.find('.eventDetails li');

    // expect(summary).toHaveLength(1);
    expect(summary.text()).toEqual(`summary: ${event.summary}`);
    expect(eventDetails.at(0).text()).toBe(`description: ${event.description}`);
    expect(eventDetails.at(1).text()).toBe(`location: ${event.location}`);
    expect(eventDetails.at(2).text()).toBe(
      `start: ${new Date(event.start.dateTime).toISOString()}`
    );
    expect(eventDetails.at(3).text()).toBe(
      `finish: ${new Date(event.end.dateTime).toISOString()}`
    );
  });

  test('toggle boolean', () => {
    const display = EventWrapper.find('.showDetails');
    display.simulate('click');
    expect(EventWrapper.state('collapsed')).toBe(false);
  });
});
