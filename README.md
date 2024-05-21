# Sensor Monitoring Dashboard

## Overview
This project is a React-based web application designed for visualizing and monitoring sensor data in real-time. It provides users with an interactive map displaying sensor locations and a sidebar for detailed sensor information. Users can filter sensor data by date and analyze trends through graphical representations.

## Features
- Real-time monitoring of sensor data
- Interactive map display of sensor locations
- Detailed sensor information in the sidebar
- Filtering sensor data by date
- Graphical representation of sensor data trends

## Technologies Used
- React.js
- Axios for HTTP requests
- WebSocket for real-time data updates
- Chart.js for data visualization
- Map component for interactive map display

## Frontend Project
This is the front-end part of our project, designed to provide a user interface for interacting with our system.

## Installation
To get started, follow these steps:
1. Clone this repository to your local machine:
    ```sh
    git clone https://github.com/CodeVerse-IRISI/Front_AquaSonic.git
    ```
2. Navigate to the project directory:
    ```sh
    cd Front_AquaSonic
    ```
3. Install dependencies using npm:
    ```sh
    npm install
    ```

## Usage
Once the dependencies are installed, you can start the development server by running:
```sh
 npm start
 ```
## File Structure
Here's a description of the main files in the project and their utilities:

1. src/components/Sidebar.js: Displays detailed information about the selected sensor and allows filtering of data by date.
2. src/components/Notification.js: Manages notifications for detected leaks.
3. src/components/LeakStatus.js: Monitors real-time leaks and displays corresponding notifications.
4. src/components/Map.js: Shows the interactive map with sensor locations and handles sensor interactions.
5. src/components/ChartComponent.js: Manages the display of sensor data charts.
6.src/components/Graph.js: Displays sensor data in graphical form.

## Features
- Displays a map with sensor points.
- Clicking on a sensor point reveals sensor information.
- Sensor status is visually represented by color (green for normal, red for abnormal).

## Contributing
   We welcome contributions from the community! If you'd like to contribute to this project, please fork the repository, make your changes, and submit a pull request.

## License
   This project is licensed under the MIT License - see the LICENSE file for details.
