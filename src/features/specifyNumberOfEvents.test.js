import React from 'react';
import App from '../App';
import { mockData } from '../mock-data';
import { mount, shallow } from 'enzyme';
import EventList from '../EventList';

import { loadFeature, defineFeature } from 'jest-cucumber';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, (test) => {
  test('When user hasn’t specified a number show all events', ({
    given,
    when,
    then,
  }) => {
    let AppWrapper;
    given('the main page is open', () => {
      AppWrapper = mount(<App />);
    });

    when('the user has not done any interactions', () => {});

    then(
      /^the default number of events shown should be (\d+)$/,
      (default_num_events_shown) => {
        AppWrapper.update();
        expect(AppWrapper.state('numberOfEvents')).toBe(
          parseInt(default_num_events_shown)
        );
      }
    );

    test('User can change the number of events they want to see', ({
      given,
      when,
      then,
    }) => {
      let AppWrapper;
      given('the main page is open', () => {
        AppWrapper = mount(<App />);
      });

      when(
        /^the user changes the number of events to (\d+)$/,
        (num_events_specified) => {
          AppWrapper.find('.numberOfEvents')
            .at(0)
            .simulate('change', {
              target: { value: parseInt(num_events_specified) },
            });
        }
      );

      then(
        /^the event list should be of length (\d+)$/,
        (num_of_events_specified) => {
          AppWrapper.update();
          expect(AppWrapper.find('.event')).toHaveLength(
            parseInt(num_of_events_specified)
          );
        }
      );
    });
  });
});
