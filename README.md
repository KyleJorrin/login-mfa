# Alkira UI Developer Test: Login + MFA

## Technologies Used
*   **React (Vite):** Core framework for building the user interface.
*   **React Router DOM:** Client-side routing to manage the navigation between Start, Login, MFA Authentication, and Dashboard screens.
*   **Tailwind CSS:** Utility-first CSS framework for rapid and responsive styling.
*   **Context API:** Native React state management used to simulate a global database and user session state without requiring a backend.
*   **Vitest & React Testing Library:** Testing framework and utilities for running component-level unit tests and simulating user interactions.

## Setup and Installation
To run this project, you must have Node.js installed on your machine. 

1.  Clone this repository from GitHub.
2.  Open your terminal and navigate into the root directory of the project (`cd login-MFA`).
3.  Run the following command to download all required dependencies:
    `npm install`

## Local Run Instructions
1.  Start the local development server by running:
    `npm run dev`
2.  Open your browser and navigate to the provided localhost URL (typically `http://localhost:5173`).
3.  To execute the unit tests and verify form validation, input sanitization testing methods, and access control logic, run:
    `npm test`

## Mock User Credentials & Roles
The application uses a simulated database with predefined users. You can use the following credentials to test the role-based access control.

**Admin Role (Read/Write Access)**
*   Email: `jenniT123@gmail.com` | Password: `adminadmin`
*   Email: `rob24@hotmail.com` | Password: `other42world`

**Standard User Role (Read-Only Access)**
*   Email: `johndoe578@stuff.net` | Password: `password`
*   Email: `boy@boy.com` | Password: `boy`

## How to Test the Sign Up, Login & MFA Flow
1.  **Sign Up:** Navigate to the Sign Up screen and enter a new email and password to create an account. The application will validate the input and add the user to the simulated database.
2.  **Login:** Navigate to the Login screen and enter either your newly created credentials or a set of mock credentials from the list above. 
3.  Upon successful validation, the application will redirect you to the MFA verification screen.
4.  A simulated 6-digit One-Time Password (OTP) is generated. To view this code, click the mail icon located on the screen to open the mock inbox.
5.  Enter the 6-digit code into the verification input.
6.  Upon successful verification, you will be redirected to the Protected Dashboard.
7.  *Role Verification:* If logged in as an Admin, you will see "Add Item" and "Delete" buttons. If logged in as a User (including newly signed-up accounts), these actions are hidden. 

## Key Design Decisions & Assumptions
*   **Context over Redux:** React's native Context API was chosen over external state management libraries to keep the architecture lightweight and maintainable.
*   **Simulated Backend:** The `UserContext` serves as a mock database. It handles user authentication, registration, and OTP storage to fulfill the requirements without needing an actual server or database.
*   **Mock MFA Implementation:** Instead of integrating a third-party SMS or Email API, a localized "Mail" component was built to act as the user's inbox during the MFA step, allowing reviewers to test the complete flow seamlessly. 
*   **Client-Side Protection:** The dashboard is protected using conditional React Router navigation (`<Navigate replace="{true}" to="/"/>`); if a user is not authenticated in the context, they are forcefully redirected away from protected routes.

## Known Limitations
*   **Volatile State:** Because the application relies on React Context for state management rather than persistent storage or a backend database, refreshing the browser page will completely reset the application. Any newly registered users, created cards, or active login sessions will be lost on refresh.
*   **Frontend Security:** The role-based access control and route protections are strictly client-side. In a production environment, these permissions and token validations would be enforced by a backend server.
