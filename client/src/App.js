import React, { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Login from './component/page/Login';
import { getHashObjFromUrl, getSpotify } from './utils/spotify';
import { useStateValue } from './StateProvider';
import { SET_TOKEN, SET_USER } from './reducer';
import Layout from './component/layout/Layout';

function App() {
  const navigate = useNavigate();

  const [{ token, isLoggedin }, dispatch] = useStateValue();
  const theme = createTheme({
    palette: {
      primary: {
        main: '#629677',
      },
      secondary: {
        main: '#629677',
      },
      background: {
        default: '#f3f7f6',
      },
    },
    typography: {
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    },
  });

  useEffect(() => {
    const tokenInUrl = getHashObjFromUrl().access_token;
    if (tokenInUrl) {
      // Clear URL hash (If using window.location.hash = "", a "#" sign will still exist in URL)
      window.history.replaceState(null, '', window.location.pathname + window.location.search);

      dispatch({ type: SET_TOKEN, token: tokenInUrl });
      sessionStorage.setItem('isLoggedin', true);
      navigate('home');
    }
  }, [dispatch, navigate]);

  const refreshToken = useCallback(async () => {
    // The Promise returned from fetch won't reject on HTTP error status
    const response = await fetch('/refresh_token');
    if (response.ok) {
      const respJson = await response.json();
      dispatch({ type: SET_TOKEN, token: respJson.token });
    }
  }, [dispatch]);

  useEffect(() => {
    if (!token && sessionStorage.getItem('isLoggedin')) {
      refreshToken();
    }
  }, [token, isLoggedin, refreshToken]);

  const getUserData = useCallback(async () => {
    if (token) {
      const user = await getSpotify(token, '/me');
      dispatch({ type: SET_USER, user });
    }
  }, [token, dispatch]);

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {token || sessionStorage.getItem('isLoggedin') ? <Layout /> : <Login />}
      </ThemeProvider>
    </div>
  );
}

export default App;
