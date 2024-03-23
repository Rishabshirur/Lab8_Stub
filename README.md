# Ticketmaster API Application

This is a web application that utilizes the Ticketmaster Discovery API to search for venues and display their details.

### Routes
- **GET /**: Main page/route providing a search form to start a search of the API.
- **POST /searchvenues**: Page/route to search through the API using a keyword search and return up to 10 matching results.
- **GET /venuedetails/:id**: Page/route to show all the details of the venue with the provided ID.

### Running the Application
- Start the server with `npm start`.
- Access the application in your browser at `http://localhost:3000`.

### Endpoints
- **Search Venues**: `https://app.ticketmaster.com/discovery/v2/venues?keyword=${searchVenueTerm}&apikey=${API_KEY}&countryCode=US`
- **Single Venue by ID**: `https://app.ticketmaster.com/discovery/v2/venues/VENUE_ID_HERE?&apikey=${API_KEY}&countryCode=US`
