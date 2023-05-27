import React from 'react';
import { mockData } from '../mock-data';
import { shallow } from 'enzyme';
import Event from '../Event';

import { loadFeature, defineFeature } from 'jest-cucumber';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, (test) => {
  test('An event element is collapsed by default', ({ given, when, then }) => {
    let EventWrapper;
    given('an event is shown', () => {
      EventWrapper = shallow(<Event event={mockData[0]} />);
    });

    when('the user has not done any interactions', () => {});

    then('the event should be collapsed', () => {
      expect(EventWrapper.find('.eventDetails li')).toHaveLength(0);
    });
  });

  test('User can expand an event to see its details', ({
    given,
    when,
    then,
  }) => {
    let EventWrapper;
    given('an event is shown', () => {
      EventWrapper = shallow(<Event event={mockData[0]} />);
    });

    when('the user clicks on show details of event', () => {
      EventWrapper.find('.showDetails').simulate('click');
    });

    then('the details should be shown', () => {
      expect(EventWrapper.find('.eventDetails li')).toHaveLength(4);
    });
  });

  test('User can collapse an event to hide its details', ({
    given,
    when,
    then,
  }) => {
    let EventWrapper;
    given('an event is shown with expanded details', () => {
      EventWrapper = shallow(<Event event={mockData[0]} />);
      EventWrapper.setState({
        collapsed: false,
      });
    });

    when('the user clicks on show details of event', () => {
      EventWrapper.find('.showDetails').simulate('click');
    });

    then('the details should collapse', () => {
      expect(EventWrapper.find('.eventDetails li')).toHaveLength(0);
    });
  });
});
