import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Workouts from './components/Workouts/Workouts';
import Calories from './components/Calories/Calories';

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
          <Route path="/calories" element={<Calories />} />
          <Route path="/workouts" element={<Workouts />} />
          {/* <Route path="/weight" element={<Weight />} /> */}
          {/* <Route path="/diet" element={<Diet />} /> */}
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;