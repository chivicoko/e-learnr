
  # Project Documentation

  ## Overview

  This project 'e-Learnr' is a Vue.js-based course management application, utilizing Pinia for state management, Axios for API communication, and TailwindCSS for styling. The app connects to a mock API hosted by `json-server`, which provides data for departments and their associated courses. Users can view individual courses, track progress through chapters, and see relevant information such as instructors, reviews, discussions, and resources.
  
  `It is currently based on specific instructions and a given design.`

  ![e-learnr-homepage](/src/assets/eLearnrHome.png)

  The UI is modeled from a dribble sample [here](https://dribbble.com/shots/16924486-E-Learning-Dashboard)

  ## Technology Stack

  - **Vue.js**: The JavaScript framework used for building the user interface.
  - **Pinia**: State management system integrated into the project to handle shared state across components.
  - **Axios**: Used to make HTTP requests to the mock API (json-server).
  - **TailwindCSS**: Utility-first CSS framework for styling components.
  - **json-server**: Mock API to simulate backend services and provide course data.

  ## Key Components

  ### 1. CourseOptionView.vue

  This component is the main view for displaying detailed information about a specific course. It features several subcomponents, which include:

  - `CourseHeader.vue`: Displays the header section of the course, including the title and description.
  - `VideoSection.vue`: Responsible for rendering video-related content and handling playback errors.
  - `TabComponent.vue`: Contains various tabs for different sections like reviews, discussions, and resources, and manages dynamic content based on the active tab.
  - `DescriptionSection.vue`: Displays a detailed description of the course.
  - `ReviewSection.vue`: Handles the review content of the course.
  - `DiscussionSection.vue`: Manages the display of discussions between students.
  - `ResourcesSection.vue`: Lists useful resources for the course.
  - `InstructorSection.vue`: Displays information about the instructor(s).


  ### 2. SidebarLeft.vue

  The `SidebarLeft` component is responsible for displaying course-specific information on the left sidebar. This sidebar includes:

  - **Instructor Information**: A brief bio and image of the course's instructor.
  - **Course Progress**: The user's progress through the course chapters. Each chapter has a status (completed, in progress, or locked), which dynamically updates based on user interaction.
  - **Chapter List**: Displays a list of chapters and their statuses in the sidebar.

  ### 3. Pinia Store (`useCourseStore`)

  #### State
  - **departments**: Holds the list of departments and their associated courses.
  - **title**: A placeholder title for the course section.
  - **loading**: Boolean flag for tracking the loading state during data fetching.

  #### Getters
  - **getDepartmentById**: Fetches a department by its ID.
  - **getCourseById**: Retrieves a course by its ID, within a given department.

  #### Actions
  - **getCourses**: Fetches department and course data from the mock API.
  - **getDepartmentByIdAction**: Retrieves a specific department, ensuring data is available in the state.
  - **getCourseByIdAction**: Fetches the relevant course information, calling the `getCourses` action if no data exists.

  ### 4. Progress Tracking

  The course progress is calculated based on the number of chapters that are completed. This is achieved by:
  - **completedChapters**: A computed property that filters out chapters marked as 'completed'.
  - **totalChapters**: A computed property that counts the total number of chapters.
  - **progress**: Calculates the user's progress as a percentage of completed chapters versus the total chapters.

  ## Data Structure

  The application relies on a JSON structure for its mock data, which includes details about departments, courses, instructors, reviews, discussions, resources, and chapters.

  ### Example JSON Structure for Departments


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
            "description": "Learn the fundamentals of programming using Python.",
            "reviews": [
              {
                "user": "Student A",
                "rating": 5,
                "comment": "Excellent course for beginners!"
              },
              {
                "user": "Student B",
                "rating": 4,
                "comment": "Good content, but needs more examples."
              }
            ],
            "discussions": [
              {
                "user": "Student A",
                "comment": "What is the best way to start coding?"
              },
              {
                "user": "Student C",
                "comment": "Can we get additional resources?"
              }
            ],
            "resources": [
              {
                "title": "Python Official Documentation",
                "url": "https://docs.python.org/3/"
              },
              {
                "title": "FreeCodeCamp",
                "url": "https://www.freecodecamp.org/"
              }
            ],
            "instructors": [
              {
                "name": "Dr. Alice Johnson",
                "bio": "Senior Lecturer in Computer Science with 10 years of experience.",
                "image": "/src/assets/instructor.jpeg"
              }
            ],
            "chapters": [
              {
                "title": "Getting Started",
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

  ## Mock API (json-server)

  The application uses `json-server` to simulate a backend API that provides data for departments and courses.

  ### Setting Up json-server

  To set up and run `json-server`, follow these steps:

  1. Install json-server:

    ```bash
    npm install json-server
    ```

  2. Create a JSON file (e.g., `elearncourses.json`) to hold the mock data.

  3. Run the json-server to serve the data:

    ```bash
    json-server --watch elearncourses.json --port 3001
    ```

  4. The mock API will be available at `http://localhost:3001`, providing endpoints such as:
    - `/departments`: Retrieves all departments and their courses.
    - `/departments/{id}`: Fetches a specific department by its ID.

  ## Axios Configuration

  In the Pinia store, Axios is used to fetch the course data :

  ```typescript
    async getCourses(): Promise<void> {
      this.loading = true;
      this.error = null;

      try {
        let res = await axios.get(`${import.meta.env.VITE_API_BASE_URL_A}/departments`);

        // Check for successful response and valid data format
        if (res.status === 200 && Array.isArray(res.data)) {
          this.departments = res.data;
        } else {
          throw new Error('Unexpected response format');
        }
      } catch (error: any) {
        this.error = error.message || 'Error fetching departments';
        console.error('Error fetching departments:', error);
      } finally {
        this.loading = false;
      }
    },
  ```

  And the code below is used for fetching specific groups of courses individually :

  ```typescript
    async getDepartmentByIdAction(id: string): Promise<Department | undefined> {
      if (!id) {
        console.error('Department ID is required');
        return undefined;
      }

      this.loading = true;
      this.error = null;

      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/departments/${id}`);

        // Check for successful response and valid data
        if (res.status === 200 && res.data) {
          const department = res.data as Department;
          
          const existingDepartment = this.getDepartmentById(id);
          if (!existingDepartment) {
            this.departments.push(department);
          }

          return department;
        } else {
          throw new Error(`No department found with ID: ${id}`);
        }
      } catch (error: any) {
        console.error(`Error fetching department with ID ${id}:`, error);
        return undefined;
      } finally {
        this.loading = false;
      }
    },
  ```

  The base URL is dynamically injected using `import.meta.env.VITE_API_BASE_URL` to allow for environment-specific configurations.

  ## Project Setup and Running

  ### 1. Install dependencies:

  ```bash
  npm install
  ```
  ```bash
  npm install json-server
  ```

  ### 2. Run the json-server:

  ```bash
  json-server --watch elearncourses.json --port 3001
  ```

  ### 3. Serve the Vue.js project:

  ```bash
  npm run dev
  ```
  `The project has been set to run on port 3000 While the json-server is to run on port 3001 because there was a conflict between running the project and the json-server. Becuase of this, I set three URLs for the sake of the local and live servers. Should incase anything happens, either of them must`

  ### 4. Create a `.env` file and insert the following in it:
  ```bash
  VITE_API_BASE_URL_A=http://localhost:3001
  ```

  The application will be available at `http://localhost:3000`.

  ## Future Enhancements

  - Add user authentication for accessing course materials.
  - Implement real-time updates for discussions and reviews.
  - Improve the user interface with more responsive design components.

  ## Conclusion

  This project demonstrates how to build a course management platform using Vue.js and Pinia, alongside a mock API provided by `json-server` based on specific instructions. It showcases modular components, state management, and dynamic progress tracking.
  This will be continuously updated and expanded.

  This is based on the given UI/UX dribbble design [here](https://dribbble.com/shots/16924486-E-Learning-Dashboard)

