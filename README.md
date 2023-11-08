# URL Shortener

This is a brief description of the project.


## Setting up Variables

1. **Frontend Configuration**: create an `config.json` file in the frontend root directory with the following content:

   ```json
   {
     "API_BASE_URL": "http://localhost:3000",
     "CLERK_PUBLISHABLE_KEY": "YOUR_CLERK_PUBLISHABLE_KEY"
   }
   
   To obtain the Clerk Publishable Key, follow these steps:
   
- Visit the [Clerk Dashboard](https://dashboard.clerk.com) and sign in or create an account.
   - Create a new project or select an existing one.
   - In your project settings, navigate to the API Keys section.
   - Generate or copy the Publishable Key and replace `YOUR_CLERK_PUBLISHABLE_KEY` in your `config.json` with the key you obtained.

2. **Backend Configuration**: create an `.env` file in the backend root directory with the following content:

    **.env:**

    ```bash
    CLERK_SECRET_KEY = YOUR_CLERK_SECRET_KEY
    CLERK_API_URL = https://api.clerk.com/v1/users/
    MONGO_URL = mongodb+srv://username:<password>@cluster0.*****.mongodb.net/url-shortener
    PORT=3000
    ```
    - Replace YOUR_CLERK_SECRET_KEY in your .env file with the Clerk Secret Key you obtained.
    - To obtain the correct MONGO_URL, follow these steps:
        - Create a project or select an existing one in your MongoDB Atlas dashboard.
        - In your project settings, navigate to the "Clusters" section.
        - Click "Connect" to obtain the connection string. Replace <password> and other placeholders in the MongoDB URL with the actual credentials.

## Running the Application with Docker

To run the application using Docker, follow these steps:

1. **Install Docker**: If you haven't already, make sure you have Docker installed on your system. You can download it from [the official Docker website](https://www.docker.com/get-started).

2. **Build and Run the Docker Container**:

   Navigate to the directory containing your Dockerfile and run the following commands to build and run the Docker container:

   ```bash
   # Build the Docker image (replace 'url-shortener' with your preferred image name)
   docker build -t url-shortener .

   # Run the Docker container, mapping port 3000 from the container to your host machine
   docker run -p 3000:3000 url-shortener
