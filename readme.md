# Brief
- As a user, when I type in a company name I should be shown a list of matching companies.
- As a user, when I select a company from the list, I should be shown the details of the company.
- As a user, when I type in an ABN I should be shown the matching company.
- For the above information, connect to an [external business lookup API](https://abr.business.gov.au/json/)


# Installation
1. Download or clone the repository to your local machine from github

2. Grab the packages from yarn
```
yarn
```
3. Serve it to localhost
```
yarn serve
```
4. Webpack should launch the dev server automatically, if it doesnt, launch the [localhost](http://localhost:8000)

# Testing
## Informal Testing

Once the app is open, type in the search bar to find some results. It can be a little slow.

## Formal testing (unit)

With the app installed on your local machine ask yarn to run the tests for you:
```
yarn test
```
The coverage of these tests isnt large - I ran out of time, and got a little stuck with testing JSONP requests.

# Key Features
* Name search will retrieve (using JSONP) a maximum of 5 results
* Will update after each typed character (but only when more than 3 characters typed)
* ABN search can include spaces. Will return an exact match only
* Regex of the search string will decide if the user is searching in Name or ABN mode
* Error messaging if an invalid ABN is typed
* Error messaging if no results are found

# Future improvements
* Choke the number of searches so that if the user is typing quickly there arent many requests sent, slowing down the network
* Logic to ignore irrelevant requests which return after the user has changed the search terms
* Better date formatting

# Bugs
* Entity type name and Name type are mapped to the same display field for the two different search modes, but are in fact different data attributes. A better solution needs to be found
* Multiple business names arent supported on the show page
* Receiving slow requests after navigating away from the search page results in an update on an unmounted component
