# Url-shortener Backend Challenge

This is a URL-shortener backend application with an endpoint (/url) that receives a URL through through an HTTP POST request, generates a shortened URL, and sends it to the client using Socket.io library. The client will acknowledge the receipt of the shortened URL through a callback. If the acknowledgment is not received, the server will retry sending the shortened URL through timeouts and retries. The client will then be able to make a GET request using the shortened URL's code and the server will return a JSON object with a key called "url" pointing to the original URL.

It includes the following:

- Backend with REST API (Express.js) and WebSockets (Socket.IO) 
- Routes to generate short URLs and retrieve full URLs
- Custom logger for efficient logging
- Security: Helmet for HTTP header security and CORS setup
- Custom error middleware
- Middleware to sanitize requests with only whats defined in the schema.
- TypeScript

## Usage
- Re-name the file .env.sample to .env
- Run the scripts from the project root directory to install dependencies and run the project itself
- To fetch the full url, path parameters are used with the Get request where the value is the code from the shortened URL - Example: "http://localhost:8080/a2b345w68s" where code=a2b345w68s  
- For the socket.io connection, the event to listen to on the client is SHORTENED_URL 

### Install Dependencies

```
# server
npm install
```

### Run backend application

```
# Run server (:8080)
npm run dev

# Build app
npm run build
```
