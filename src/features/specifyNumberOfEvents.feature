Feature: Specify number of events

Scenario: When user hasn’t specified a number show all events
Given the main page is open
When the user has not done any interactions
Then the default number of events shown should be 3

Scenario: User can change the number of events they want to see
Given the main page is open
When the user changes the number of events to 1
Then the event list should be of length 1
