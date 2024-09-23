
# E-learnr - Course Management System

This project - 'e-Learnr' is a **Course Management System** built with **Vue.js**, **Pinia**, and **json-server**. The project is designed to display course details, manage departments and courses, and show course chapters and completion progress dynamically.

`It is currently based on specific instructions and a given design.`

![e-learnr-homepage](/src/assets/eLearnrHome.png)

## Features
- Fetch data from a mock API using `json-server`
- Display course details including instructors, resources, reviews, and discussions
- Dynamic course completion progress based on chapters
- Vue.js components to organize the course structure (Sidebar, Tabs, etc.)
- Pinia for state management
- Axios for API requests

## Project Setup

### 1. Install Dependencies
Ensure you have **Node.js** and **npm** installed on your system. Run the following commands to install the dependencies:
```bash
npm install
```
```bash
npm install json-server
```

Create a `.env` file and insert the following in it:
```bash
VITE_API_BASE_URL=http://localhost:3001
```

### 2. Run the Mock API
This project uses `json-server` to mock the API for fetching departments and courses. You will find the `elearncourses.json` file in the `data/` directory, which contains sample department and course data.

To start the `json-server`, run:
```bash
npx json-server --watch ./data/elearncourses.json --port 3001
```
This will serve the mock API at `http://localhost:3001/departments`.

### 3. Run the Development Server
Once the dependencies are installed, you can start the Vue development server:
```bash
npm run dev
```
This will start the application at `http://localhost:3000/`.

### 4. View the Application
Open your browser and visit `http://localhost:3000/` to view the application. You can navigate between courses and view the dynamic sidebar showing course progress.

## Folder Structure

- **src/**: Contains the core Vue.js components and store files.
  - `App.vue`: Main application component.
  - `components/`: Contains individual Vue components (Sidebar, CourseHeader, etc.).
  - `views/`: Contains the primary views such as `CourseOptionView.vue`.
  - `stores/`: Pinia store setup for managing course and department data (`courseStore.ts`).
  - `router/`: Vue Router setup for navigation.
  - `utils/`: Utilities setup for typescript types (`types.ts`).
- **data/**: Contains `elearncourses.json`, which stores the mock data for the json-server.
- **public/**: Static assets like images.

## Data Structure

The application pulls data from `elearncourses.json` via `json-server`. Here is an example of the data structure:

```json
  {
    "departments": [
    {
      "id": "dept01",
      "name": "Computer Science",
      "courses": [
        {
          "id": "course01",
          "title": "Introduction to Programming",
          "lecturer": "Dr. Alice Johnson",
          "image": "/src/assets/ictguy.jpeg",
          "video": "/src/assets/courseVideo2.mp4",
          "description": "Learn the fundamentals of programming using Python...",
          "reviews": [
            {
              "user": "Student A",
              "image": "/src/assets/user.jpeg",
              "rating": 5,
              "comment": "Excellent course for beginners!"
            },
            {
              "user": "Student B",
              "image": "/src/assets/user4.jpeg",
              "rating": 0,
              "comment": "Good content, but needs more examples."
            }
          ],
          "discussions": [
            {
              "user": "Student A",
              "image": "/src/assets/user.jpeg",
              "comment": "What is the best way to start coding? I find that there are many different ways to start coding."
            },
            {
              "user": "Student C",
              "image": "/src/assets/user4.jpeg",
              "comment": "Can we get additional resources? It's really important for students to have a great understanding of programming."
            }
          ],
          "resources": [
            {
              "title": "Python Official Documentation",
              "url": "https://docs.python.org/3/"
            }
          ],
          "instructors": [
            {
              "name": "Dr. Alice Johnson",
              "bio": "Senior Lecturer in Computer Science with 10 years of experience.",
              "image": "/src/assets/instructor1.jpeg"
            }
          ],
          "chapters": [
            {
              "title": "Getting Started",
              "status": "completed"
            },
            {
              "title": "Data Types and Variables",
              "status": "completed"
            },
            {
              "title": "Data Types and Variables",
              "status": "in progress"
            },
            {
              "title": "Control Structures",
              "status": "locked"
            }
          ]
        }
      ]
    }
  ]
}
```

More information in the `PROJECT_DOCUMENTATION.md` file.

Happy Hacking!