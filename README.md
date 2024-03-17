# Chad Piha DataProphet Assignment

## Description

This is a project that consists of a backend Python application and a frontend React application. The backend provides API endpoints using FastAPI, while the frontend is a web application built with React.

This project was built to visualize sensor data over time. It fetches data from a backend API and displays it in interactive charts.

## Features

- Data Visualization: Utilizes Plotly.js to render interactive line charts for numeric sensor data and scatter charts for text-based sensor data.
- Filtering: Allows users to filter data by selecting parameters from dropdown menus.

## Decisions Made

- Plotly.js: Chose Plotly.js for data visualization due to its versatility and interactivity. It offers a wide range of chart types and customization options.
- Axios for Data Fetching: Utilized Axios for making HTTP requests to the backend API. Axios provides a simple and efficient way to handle asynchronous data fetching.
- Choice of backend framework: FastAPI was chosen due to its simplicity, performance, and support for asynchronous programming. It provides automatic validation, serialization, and documentation of API endpoints, reducing development time.
- Database Selection: SQLite was chosen as the database due to its simplicity and ease of setup for development purposes. It allows rapid prototyping and testing without the need for a separate database server.
- Containerization: Docker was used to containerize the application, ensuring consistency across different development environments and OS's

## Prerequisites

- Docker: [Installation Guide](https://docs.docker.com/get-docker/)

## Installation

1. Clone this repository to your local machine.
2. Navigate to the root directory of the project.

## Running the Application

1. Open a terminal and navigate to the root directory of the project.
2. Run the following command to start the backend and frontend services:

`docker-compose up`

3. Access the frontend application in your web browser at `http://localhost:3000`.

## Usage

- The backend API is accessible at `http://localhost:8000`.
- You can populate the database by navigating to `http://localhost:8000/read-file`
- Use the frontend interface to interact with the backend API.
- The project uses a local database setup for development purposes.

## Assumptions

- I was unsure how to model the text data over time. I decided on a scatter plot however I am aware that results look skewed due as I was unsure what the y-axis values should have looked like. My alternative with simply displaying this data to a paginated table.

## Additional improvements given more time

- Backend

  - Test Case Implementations
  - Pagination
  - Rate Limiting
  - More robust error handling and input validation
  - Caching database results
  - Logging and monitoring

- Frontend
  - Test Case Implementations
  - Find an alternative way to display text data graph
  - Improved Error Handling & Caching graph data on errors
  - UI/UX Improvements
