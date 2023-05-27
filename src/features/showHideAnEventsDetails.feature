Feature: Show hide an event details

Scenario: An event element is collapsed by default
Given an event is shown
When the user has not done any interactions
Then the event should be collapsed

Scenario: User can expand an event to see its details
Given an event is shown
When the user clicks on show details of event
Then the details should be shown

Scenario: User can collapse an event to hide its details
Given an event is shown with expanded details
When the user clicks on show details of event
Then the details should collapse
