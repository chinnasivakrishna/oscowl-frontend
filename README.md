
# To Do Application

## Overview
This is a React-based to-do application that allows users to register, log in, manage their profiles, and visualize project statuses through graphs. The app includes a sidebar for navigation and uses Cloudinary for image uploads.

### Key Features:
- **User Registration**: Create an account with a username, email, password, and profile image.
- **User Login**: Existing users can log in to access their dashboard.
- **Profile Management**: View and edit profile information.
- **Project Management**: Add new projects with descriptions and images.
- **Data Visualization**: Visualize project statuses using bar charts (powered by Chart.js).
- **Responsive Design**: User-friendly on various devices.

---

## Project Structure

```
├── src
│   ├── Components
│   │   ├── AddProject
│   │   │   ├── AddProject.jsx
│   │   │   └── AddProject.css
│   │   ├── Dashboard
│   │   │   ├── GraphPage.jsx
│   │   │   └── GraphPage.css
│   │   ├── Header
│   │   │   ├── Header.jsx
│   │   │   └── Header.css
│   │   ├── Login
│   │   │   ├── EmployeeLogin.jsx
│   │   │   └── EmployeeLogin.css
│   │   ├── Register
│   │   │   ├── Register.jsx
│   │   │   └── Register.css
│   │   ├── Profile
│   │   │   ├── Profile.jsx
│   │   │   └── Profile.css
│   │   ├── Sidebar
│   │   │   ├── Sidebar.jsx
│   │   │   └── Sidebar.css
│   │   └── Home
│   │       ├── Home.jsx
│   │       └── Home.css
│   ├── App.jsx
│   └── App.css
└── README.md
```

---

## Components

### 1. **App Component (App.jsx)**
- Root component that sets up routing and renders the main layout.

### 2. **Header Component (Header.jsx)**
- Displays the application logo, search bar, and authentication buttons (login/logout).

### 3. **Sidebar Component (Sidebar.jsx)**
- Provides navigation links to different sections of the application.

### 4. **Login Component (EmployeeLogin.jsx)**
- Handles user login functionality, including form validation and authentication.

### 5. **Register Component (Register.jsx)**
- Manages user registration, including form validation and image uploads.

### 6. **Profile Component (Profile.jsx)**
- Allows users to view and edit their profile information and upload a new profile image.

### 7. **AddProject Component (AddProject.jsx)**
- Enables users to create new projects with descriptions and images.

### 8. **GraphPage Component (GraphPage.jsx)**
- Displays project status distributions using bar charts powered by Chart.js.

---

## Styling
Each component has a corresponding CSS file to manage its styles:

- **App.css**: Styles the overall layout of the application.
- **Header.css**: Styles the header, including the logo and search bar.
- **Sidebar.css**: Styles the sidebar for navigation.
- **Login.css**: Styles the login form.
- **Register.css**: Styles the registration form.
- **Profile.css**: Styles the profile management section.
- **AddProject.css**: Styles the project creation form.
- **GraphPage.css**: Styles the graph visualization.

---

## Getting Started

### Prerequisites
Ensure that you have **Node.js** and **npm** installed on your system.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo/to-do-app.git
   ```

2. Navigate to the project directory:

   ```bash
   cd to-do-app
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

### Running the Application
To start the application in development mode:

```bash
npm start
```

This will open the app in your browser at [http://localhost:3000](http://localhost:3000).

---

## Usage

- **Register**: Go to the registration page to create a new account.
- **Login**: Log in with your credentials to access the app.
- **Manage Profile**: View and edit your profile information.
- **Add Projects**: Create new projects with descriptions and images.
- **View Graphs**: Navigate to the graph page to visualize project statuses in bar charts.

---

## Customization

### Adding New Features
To add new features:
1. Create a new component in the `Components` directory.
2. Update the routing in `App.jsx` to include the new component.

### Modifying Styles
To adjust the styles of a component, simply edit its corresponding CSS file.

---

## Contributing
If you'd like to contribute to this project, feel free to fork the repository and submit a pull request.

---

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

### Notes:
1. Make sure to replace `https://github.com/your-repo/to-do-app.git` with the actual URL of your GitHub repository.
2. The **LICENSE** section should refer to an actual `LICENSE` file in your repository, so ensure that file exists.

---

This version is cleaner and more organized, with clear section headers and bullet points to help readers easily navigate through the content. Let me know if you need further adjustments!
