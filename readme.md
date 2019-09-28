The solution needs to include a quick readme file describing exact steps we should take to execute and test the application. We will not be able to test your project in a Windows environment, please target OS.X or Linux.

Key Features
* Name search (5 max)
* Will update after each typed character (but only when more than 3 characters typed)
* ABN search - can include spaces. Will return an exact match only
* error messaging if an invalid ABN is typed
* error messaging if no results are found

Future improvements
* Choke the number of searches so that if the user is typing quickly there arent many requests sent
* Logic to ignore irrelevant requests which return after the user has changed the search terms
* Better date formatting


Bugs
* Entity type name and Name type are mapped together for the two differe search modes, but are in fact different data attributes. A better solution needs to be found
* multiple business names arent supported on the show page
* receiving slow requests after navigating away from the search page results in an update on an unmounted component
