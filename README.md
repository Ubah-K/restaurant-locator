# Restaurant Locator

## Project Overview
- The Restaurant Locator is a web interface that allows users to enter a postcode to find restaurants nearby based on their location. Using queries from the API provided to retrieve and display the restaurant data, and displaying only the name of the restaurant, cuisine, the rating, and address, and limiting it to 10 restaurants.

## How to build, compile and run the solution:
**Prerequisites:**
- `Install Node.js`

**Clone the repository using git clone:**
- `git@github.com:Ubah-K/restaurant-locator.git`

**To navigate to the directory:**
- `cd restaurant-locator`

**To ensure all the required dependencies have been installed:**
- `npm install`

**To run the restaurant locator web interface, launch the server:**
- `npm start`

**Accessing the solution:**
- [Access the Restaurant Locator here](http://localhost:3005)

## Assumptions:
1. The API provided would be reliable to return the restaurant data when users enter any valid UK postcode, displaying data returned from the API without the need to implement additional data validation.

2. Expected a consistent data structure from the API given, the assumption relied on the JSON properties to display all the information needed such as the name, cuisine, ratings and the address, displaying the restaurant information correctly. 

## Things that where not clear: 
1. Initially, it was unclear how to handle the cross-origin resourcing sharing (CORS) restriction when accessing the API through the client-side directly. The need to implement a server-side using Node.js, which subsequently managed the CORS restriction but also helped in securing the API by not exposing them on the client-side. 

2. It was unclear how the API’s behaviour in response to handling any error such as empty inputs or invalid postcode. Therefore, implementing error handling on the backend to manage any errors, assuring the user interface remains user-friendly by display appropriate error message.  

## Proposed improvements to the solution:
1. Implement functionalities to filter the results based on the cuisines, ratings, or other data, allowing the users to find the restaurant that match their preferences directly on the web interface. 

2. Displaying the interface effectively on different devices, this will enhance the web interface for consistency for user experience across website on desktop as well mobile platforms. 
