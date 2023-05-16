Meet App

Is a serverless, progressive web application (PWA). It is built using TDD technique.
Upcoming events are retrieved from Google Calendar API

Objective

The app is designed to help users to find, schedule, and accept attendance for the selected events in the city of their choice.


USER STORIES, SCENARIOS 


Key feature 1: Filter events by city

User story: As a user, I would like to be able to filter events by city so that I can see the list of events that take place in that city.

Scenario 1: When user hasn’t searched for a specific city – app should show upcoming events from all the cities.

                      Given: The app has loaded
                       When : the user opens the app
                        Then : the user should see a list of all upcoming events

Scenario 2:  User should see a list of suggestions when searching for the city.

                   Given: User opened the main page of the app
                   When : the user starts typing the name of the city in search box
                   Then : the user should see a list of city suggestions that match what they type

Scenario 3:  User can select a city from the suggested list.

                   Given: the user was typing “London” in the search box
                   When : the user selected a city (“London, UK”) from the list
                   Then : the users city should be updated to that city (“London, UK”)
                                And the user will receive a list of upcoming events for selected city




Key feature 2: Show/hide event details.

User story: As a user, I would like to be able to show/hide event details so that I can see more/less information about an event.


Scenario 1:  According to default settings, a “show details” element is collapsed.

                   Given: User selected a city
                   When : the user sees the list of upcoming events 
                   Then : the user won’t see the details of the events

Scenario 2:  User should be able to expand the “show details”.

                   Given: User selected an event
                   When : the user presses the button “show details” on specific event
                   Then : the user will see the details for the specific event (e.g, time, place)

Scenario 3:  User should be able to hide the details by collapsing “show details”.

                   Given: User expanded the details for the specific event
                   When : the user pushes the button “close”
                   Then : the event details are becoming hidden




Key feature 3: Specify number of events.

User story: As a user, I would like to be able to specify the number of events I want to view in the app so that I can see more or fewer events in the events list at once.

Scenario 1:  User didn’t specify the number of events they want to see, so by default the app will show 50 first events.

                   Given: User selected the city and received a list of upcoming events
                   When : the user didn’t selects a number of events they want to be shown
                   Then : the user will receive a list of 50 upcoming events

Scenario 2:  User want to see more upcoming events than the default setting.

                   Given: User receives the list of the events
                   When : the user puts the higher number on the input (e.g, 70)
                   Then : the user will receive the list with higher number of upcoming events

Scenario :  User wants to see less events than the default setting

                   Given: User receives a list of upcoming events
                   When : the user puts lower number on the input field (e.g, 10)
                   Then : the user will receive the list with lower number of upcoming events




Key feature 4:  Use the app when offline.

User story: As a user, I would like to be able to use the app when offline so that I can see the events I viewed the last time I was online.

Scenario 1:  User should see data which was previously loaded, when the app is offline.

                   Given: User previously searched for events in the chosen city
                   When : the user is opening the app while being offline
                   Then : the user will see the data which was loaded las time while the app was      online

Scenario 2:  User should see an error message when changing the settings while offline (e,g searching for new events, changing the city etc).

                   Given: User opened the app offline and the data from last session has been opened
                   When : the user tries to search for the events in a new city
                   Then : the user will receive an error message indicating that internet connection is required


Key feature 5: View a chart showing the number of upcoming events by city.

User story: As a user, I would like to be able to see a chart showing the upcoming events in each city so that I know what events are organized in which city.

Scenario 1:  The chart with upcoming events according to category.

                   Given: User received a list of all upcoming events
                   When : the user presses the button “Categorize” and selects a desired category
                   Then : the user will see a chart, showing list of upcoming events for the chosen city, according to chosen category
