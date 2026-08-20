# 🥗 DietDuo

**DietDuo** is a personalized **diet and workout planning web application** built with React and TypeScript. It helps users discover meals and workouts, customize their choices based on preferences, and create personalized meal and workout schedules.

The project started as a learning project and has been continuously improved with better UI, state management, authentication, personalization, and API integration.

## 🚀 Live Demo

**[DietDuo Live Demo](https://dietduo.netlify.app/)**

## 📂 Repository

**[GitHub Repository](https://github.com/harshdharmashya/DietDuo)**

---

## ✨ Features

### 🔐 Authentication

* User registration and login
* JWT-based authentication
* Protected user functionality
* Token-based API authorization
* Logout functionality
* Authentication state restoration after page refresh

> **Note:** The initial version of DietDuo used Firebase Authentication. The authentication system was later migrated to JWT-based authentication to provide more control over the application's backend authentication flow.

### 🍱 Personalized Meal Planning

* Browse different types of meals
* Breakfast, lunch and dinner meal sections
* Vegetarian / Non-Vegetarian meal selection
* View meal health score
* View diet and nutrition tags
* View detailed meal information
* Add meals to a personalized schedule
* Persist selected meal plans

### 🏋️ Workout Planning

* Browse workout options
* Select workouts according to user requirements
* Add workouts to a personalized schedule
* Manage scheduled workouts
* Persist workout plans

### 📅 Schedule Management

* Create personalized meal schedules
* Create personalized workout schedules
* View planned meals and workouts
* Restore saved plans when the application is reopened
* Support for user-specific schedules

### 🎨 Modern UI

* Responsive design for desktop, tablet and mobile
* Reusable React components
* Interactive meal cards
* Detailed meal modal
* Loading skeletons
* Toast notifications
* Responsive navigation
* Animated UI elements
* Health score visualization
* Improved user experience and accessibility

---

## 🛠️ Tech Stack

### Frontend

* **React.js**
* **TypeScript**
* **Vite**
* **React Router DOM**

### State Management

* **Redux Toolkit**
* **React Redux**
* React Hooks

### API & Authentication

* **Axios**
* REST APIs
* **JWT Authentication**
* Bearer Token Authorization

### UI & Styling

* **Material UI**
* **Tailwind CSS**
* Custom CSS
* Bootstrap
* Styled Components
* Framer Motion
* Lucide React
* Font Awesome

### Data Visualization

* MUI X Charts
* Chart.js

### Other Libraries

* React Toastify
* AOS
* Three.js / React Three Fiber

---

## 🏗️ Application Architecture

```text
                    ┌──────────────────┐
                    │      User        │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │   React + Vite   │
                    │   TypeScript     │
                    └────────┬─────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
              ▼              ▼              ▼
        Authentication     Redux        React Router
              │              │              │
              ▼              ▼              ▼
             JWT       Meal/Workout       Pages
                         State
                             │
                             ▼
                    ┌──────────────────┐
                    │    Axios / REST  │
                    │       APIs       │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │     Backend      │
                    │   JWT / APIs     │
                    └──────────────────┘
```

---

## 🔐 Authentication Flow

DietDuo currently uses JWT-based authentication.

### Login Flow

```text
User enters email & password
            ↓
       Login API
            ↓
   Backend validates user
            ↓
       JWT generated
            ↓
    Token returned to UI
            ↓
       Token stored
            ↓
 Authenticated application
```

### Protected API Flow

```text
React Application
       ↓
Retrieve JWT
       ↓
Authorization Header
       ↓
Bearer <JWT>
       ↓
Backend validates token
       ↓
Return user-specific data
```

The application uses the JWT to identify the authenticated user and load personalized meal and workout schedules.

---

## 🥗 Meal Filtering

Users can select between **Vegetarian** and **Non-Vegetarian** meals.

The application filters the recipe data based on the `vegetarian` property returned by the API.

```text
User selects Veg
      ↓
foodType = "veg"
      ↓
Filter recipes
      ↓
vegetarian === true
      ↓
Display vegetarian meals
```

For non-vegetarian meals:

```text
User selects Non-Veg
      ↓
foodType = "non-veg"
      ↓
Filter recipes
      ↓
vegetarian !== true
      ↓
Display non-vegetarian meals
```

---

## 🍽️ Meal Details

Each meal card provides:

* Meal image
* Meal name
* Health score
* Diet tags
* Preparation time
* Dietary preferences
* Vegetarian / Vegan information
* Dairy-free information
* Gluten-free information

Users can open a detailed modal without leaving the current page.

---

## 📊 State Management

Redux Toolkit is used to manage application-level state.

Major state areas include:

* Meal data
* Meal schedules
* Workout schedules
* User-related application state

React Hooks such as:

```text
useState
useEffect
useMemo
useSelector
useDispatch
```

are also used throughout the application.

---

## 💾 Data Persistence

DietDuo supports persistence for personalized meal and workout plans.

The application can:

1. Load user-specific data from the backend.
2. Read locally persisted data when available.
3. Merge available meal/workout data.
4. Hydrate Redux state.
5. Continue displaying the user's personalized plan.

This also provides a better experience when users refresh or reopen the application.

---

## 📱 Responsive Design

The application is designed to work across:

* Desktop
* Laptop
* Tablet
* Mobile devices

Responsive layouts are implemented using:

* CSS media queries
* Bootstrap
* Material UI
* Tailwind CSS
* Responsive component layouts

---

## 📁 Project Structure

```text
DietDuo/
│
├── public/
│
├── src/
│   │
│   ├── component/
│   │   ├── Home/
│   │   ├── Meal/
│   │   ├── Workout/
│   │   ├── login.tsx
│   │   ├── register.tsx
│   │   ├── profile.tsx
│   │   ├── Modalcard.tsx
│   │   └── ...
│   │
│   ├── Redux/
│   │   ├── frontSlice
│   │   ├── Usermeal
│   │   └── workoutSlice
│   │
│   ├── CSS/
│   │   ├── Meal.css
│   │   ├── Profile.css
│   │   ├── login.css
│   │   ├── workout.css
│   │   └── ...
│   │
│   ├── Images/
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── store.ts
│
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/harshdharmashya/DietDuo.git
```

### 2. Navigate to the project

```bash
cd DietDuo
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file in the project root:

```env
VITE_BACKEND_URL=your_backend_api_url
```

Replace `your_backend_api_url` with your backend API URL.

### 5. Start the development server

```bash
npm run dev
```

The application will be available at the local Vite development URL.

---

## 🏭 Production Build

To create a production build:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

---

## 🧪 Code Quality

Run ESLint with:

```bash
npm run lint
```

---

## 🔄 Project Evolution

DietDuo has evolved through multiple development stages.

### Version 1 — Initial Learning Project

* React + TypeScript
* Basic meal and workout functionality
* Firebase Authentication
* Basic UI
* React Router
* Local state management

### Version 2 — Application Improvements

* Improved UI/UX
* Reusable components
* Redux Toolkit integration
* API integration
* Meal/workout scheduling
* Responsive layouts
* Loading states
* Better user experience

### Version 3 — Current Architecture

* Migrated Firebase Authentication to JWT
* Backend-based authentication
* Protected REST APIs
* Bearer token authorization
* Vegetarian / Non-Vegetarian filtering
* Improved meal details
* Improved meal/workout persistence
* Enhanced responsive UI
* Better loading and feedback states
* Continued component and code improvements

---

## 🎯 What I Learned

Building and continuously improving DietDuo helped me strengthen my understanding of:

* React component architecture
* TypeScript
* React Hooks
* Redux Toolkit
* REST API integration
* JWT authentication
* Protected APIs
* State persistence
* Responsive UI development
* Reusable components
* API error handling
* Frontend performance
* UI/UX improvement
* Refactoring an existing application

One of the most valuable parts of the project was **iterating on an existing application instead of building everything from scratch again**. I initially used Firebase Authentication and later migrated the project to JWT-based authentication as my backend knowledge improved.

---

## 🔮 Future Improvements

Planned improvements include:

* AI-powered personalized meal recommendations
* More advanced nutrition tracking
* Calorie and macro tracking
* User progress dashboard
* Personalized workout recommendations
* Meal search and advanced filtering
* Better backend validation
* Improved authentication security
* Automated testing
* More comprehensive analytics

---

## 👨‍💻 Author

**Harsh Dharmashya**

Software Developer | React.js | TypeScript | Node.js

* GitHub: [harshdharmashya](https://github.com/harshdharmashya)
* Portfolio: [Developer Portfolio](https://harsh-website-developer-portfolio.vercel.app/)

---

## ⭐ If you like the project

If you find DietDuo useful or interesting, consider giving the repository a ⭐ on GitHub.
