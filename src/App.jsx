import React, { useState, useEffect, useContext, useReducer, useRef, useLayoutEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ModeContext } from './ModeContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AddProfile from './pages/AddProfile';
import About from './pages/About';
import NotFound from './pages/NotFound';
import ProfileDetail from './pages/ProfileDetail';
import EditProfile from './pages/EditProfile';
import Login from './pages/Login';
import Register from './pages/Register';
import Logout from './pages/Logout';
import headshot1 from './assets/headshot1.png'; 
import headshot2 from './assets/headshot2.png';
import headshot3 from './assets/headshot3.png';
import headshot4 from './assets/headshot4.png';
import headshot5 from './assets/headshot5.png';
import headshot6 from './assets/headshot6.png';
import headshot7 from './assets/headshot7.png';
import headshot8 from './assets/headshot8.png';
import './index.css';

// Reducer for managing profiles state
const profilesReducer = (state, action) => {
  switch (action.type) {
    case 'SET_PROFILES':
      return { ...state, profiles: action.payload };
    case 'ADD_PROFILE':
      return { ...state, profiles: [...state.profiles, action.payload] };
    default:
      return state;
  }
};

const initialState = {
  profiles: [
    { id: '1', name: 'Isabelle', role: 'Web Developer', image: headshot1 },
    { id: '2', name: 'Tom Nook', role: 'UI/UX Designer', image: headshot2 },
    { id: '3', name: 'KK Slider', role: 'Sound Designer', image: headshot3 },
    { id: '4', name: 'Celeste', role: 'Animation and VFX', image: headshot4 },
    { id: '5', name: 'Mabel', role: 'Animation and VFX', image: headshot5 },
    { id: '6', name: 'Rover', role: 'Web Developer', image: headshot6 },
    { id: '7', name: 'Harriet', role: 'UI/UX Designer', image: headshot7 },
    { id: '8', name: 'Kappn', role: 'Illustrator', image: headshot8 },
  ],
};

const App = () => {
  const { mode, toggleMode } = useContext(ModeContext); // Use ModeContext for theme management

  // useReducer for managing profiles
  const [state, dispatch] = useReducer(profilesReducer, initialState);
  const { profiles } = state;

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('');

  // Fetching profiles from API
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/profiles');
        const profilesData = await response.json();
        dispatch({ type: 'SET_PROFILES', payload: [...initialState.profiles, ...profilesData] });
      } catch (error) {
        console.error('Error fetching profiles:', error);
      }
    };
    fetchProfiles();
  }, []);

  const addProfile = (profile) => {
    dispatch({ type: 'ADD_PROFILE', payload: profile });
  };

  return (
    <div className={`app ${mode}`}> {/* Use mode from ModeContext */}
      <header>
        <Navbar theme={mode} toggleTheme={toggleMode} /> {/* Pass toggleMode from ModeContext */}
      </header>
      <main>
        <Routes>
          <Route 
            path="/" 
            element={
              <Home 
                profiles={profiles} 
                searchTerm={searchTerm} 
                setSearchTerm={setSearchTerm} 
                selectedRole={selectedRole} 
                setSelectedRole={setSelectedRole} 
              />
            } 
          />
          <Route path="/add-profile" element={<AddProfile addProfile={addProfile} theme={mode} />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile/:id" element={<ProfileDetail profiles={profiles} theme={mode} />} />
          <Route path="/profile/:id/edit" element={<EditProfile profiles={profiles} setProfiles={setProfiles} theme={mode} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
