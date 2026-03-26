# BOCRA Prototype

A React-based web application prototype for the Botswana Communications Regulatory Authority (BOCRA).

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (version 18 or higher) - [Download Node.js](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn** package manager
- **Visual Studio Code** - [Download VSCode](https://code.visualstudio.com/)

### Recommended VSCode Extensions

Install the following VSCode extensions for the best development experience:

- **ES7+ React/Redux/React-Native snippets** - Provides React code snippets
- **ESLint** - Integrates ESLint into VSCode
- **Prettier - Code formatter** - Automatic code formatting
- **Tailwind CSS IntelliSense** - Autocomplete for Tailwind CSS classes
- **Auto Rename Tag** - Automatically renames paired HTML/JSX tags

## Installation

### Step 1: Clone or Download the Project

If you haven't already, clone or download this project to your local machine.

### Step 2: Open the Project in VSCode

1. Open Visual Studio Code
2. Go to **File** → **Open Folder** (or **Open** on macOS)
3. Navigate to the project directory and select it
4. Click **Open**

### Step 3: Open the Integrated Terminal

1. In VSCode, press `Ctrl + `` ` `` (backtick) to open the integrated terminal
2. Alternatively, go to **Terminal** → **New Terminal**

### Step 4: Install Dependencies

Run the following command in the terminal to install all required dependencies:

```bash
npm install
```

This will install:
- **React** and **React DOM** - Core React libraries
- **Lucide React** - Icon library
- **Vite** - Build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **ESLint** - Code linting tool
- **PostCSS** and **Autoprefixer** - CSS processing tools

### Step 5: Start the Development Server

After the installation is complete, start the development server:

```bash
npm run dev
```

The application will start and you should see output similar to:

```
  VITE v6.0.5  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.1.100:5173/
  ➜  press h + enter to show help
```

### Step 6: Open the Application in Your Browser

Click on the `http://localhost:5173/` link in the terminal, or manually open your browser and navigate to:

```
http://localhost:5173
```

The BOCRA prototype should now be running in your browser!

## Available Scripts

In the project directory, you can run the following commands:

| Command | Description |
|---------|-------------|
| `npm run dev` | Starts the development server with hot module replacement (HMR) |
| `npm run build` | Builds the app for production to the `dist` folder |
| `npm run preview` | Previews the production build locally |
| `npm run lint` | Runs ESLint to check for code quality issues |

## Project Structure

```
bocra/
├── public/                 # Static assets
│   ├── images/            # Image assets
│   ├── bocra-building.jpeg
│   ├── favicon.svg
│   └── icons.svg
├── src/                   # Source code
│   ├── assets/           # Project assets
│   ├── components/       # Reusable components
│   │   └── layout/      # Layout components (Header, Footer)
│   ├── context/          # React Context providers
│   ├── pages/            # Page components
│   ├── App.jsx           # Main application component
│   ├── index.css         # Global styles
│   └── main.jsx          # Application entry point
├── .gitignore            # Git ignore rules
├── eslint.config.js      # ESLint configuration
├── index.html            # HTML entry point
├── package.json          # Project dependencies and scripts
├── postcss.config.js     # PostCSS configuration
├── tailwind.config.js    # Tailwind CSS configuration
└── vite.config.js        # Vite configuration
```

## Technologies Used

- **React 18** - JavaScript library for building user interfaces
- **Vite 6** - Next-generation frontend build tool
- **Tailwind CSS 3** - Utility-first CSS framework
- **Lucide React** - Beautiful & consistent icons
- **ESLint** - Code linting and quality tool
- **PostCSS** - CSS transformation tool

## Troubleshooting

### Port Already in Use

If port 5173 is already in use, Vite will automatically try the next available port. Check the terminal output for the actual URL.

### Dependencies Installation Fails

If `npm install` fails, try the following:

1. Clear npm cache:
   ```bash
   npm cache clean --force
   ```

2. Delete `node_modules` folder and `package-lock.json`:
   ```bash
   rm -rf node_modules package-lock.json
   ```

3. Reinstall dependencies:
   ```bash
   npm install
   ```

### VSCode Not Recognizing Imports

If VSCode doesn't recognize imports or shows errors:

1. Restart the TypeScript server: Press `Ctrl + Shift + P` and type "TypeScript: Restart TS Server"
2. Reload VSCode: Press `Ctrl + Shift + P` and type "Developer: Reload Window"

### Hot Module Replacement Not Working

If changes don't automatically reflect in the browser:

1. Check if the development server is running
2. Try refreshing the browser manually
3. Restart the development server with `npm run dev`

## Building for Production

To create a production build:

```bash
npm run build
```

This will create a `dist` folder with optimized production files. You can preview the production build locally with:

```bash
npm run preview
```

## License

This project is proprietary to BOCRA (Botswana Communications Regulatory Authority).

## Support

For issues or questions, please contact the development team.
