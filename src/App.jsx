import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Workouts from './components/Workouts/Workouts';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      primary: {
        main: '#e94560',
      },
      secondary: {
        main: '#ff6b6b',
      },
      background: {
        default: isDarkMode ? '#0a0a1a' : '#f5f5f5',
        paper: isDarkMode ? '#1a1a2e' : '#ffffff',
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", sans-serif',
    },
  });

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calories" element={<div>Calories Calculator</div>} />
          <Route path="/weight" element={<div>Weight Tracking</div>} />
          <Route path="/diet" element={<div>Diet Plan</div>} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;