import * as React from 'react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import LoginComponent from '../components/auth/LoginComponent';
import RegisterComponent from '../components/auth/RegisterComponent';
import SocialLoginComponent from '../components/auth/SocialLoginComponent';
import { Typography } from '@mui/material';

function Auth() {
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(true);

  // Set initial state based on current route
  useEffect(() => {
    // Check if current path includes 'register'
    if (location.pathname.includes('/register')) {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, [location.pathname]);

  const handleSwitchToRegister = () => {
    setIsLogin(false);
  };

  const handleSwitchToLogin = () => {
    setIsLogin(true);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container 
        maxWidth={false}
        disableGutters
        sx={{
          minHeight: '100vh',
          width: '100%',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #0c0c0c 0%, #3c3c3c 50%, #8b8b8b 100%)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: { xs: 1, sm: 2 },
        }}
      >
        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
          justifyContent: 'center',
          alignItems: 'center',
          gap: { xs : 3, lg: 6 },
          width: '100%',
          maxWidth: '1400px',
          height: { lg: '80vh' },
          padding: { xs: 1, sm: 2 },
          boxSizing: 'border-box',
        }}>
          {/* Info Box */}
          <Box sx={{
            flex: 1.2,
            padding: { xs: 3, lg: 6 },
            minHeight: { xs: 'auto', lg: '100%' },
            width: '100%',
            maxWidth: '100%',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '16px',
            boxShadow: `
              0 8px 32px rgba(0, 0, 0, 0.4),
              0 0 0 1px rgba(255, 255, 255, 0.1),
              inset 0 0 0 1px rgba(255, 255, 255, 0.05)
            `,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            boxSizing: 'border-box',
          }}>
            <Typography 
              variant="h3" 
              component="h1"
              sx={{ 
                color: '#ffffff',
                fontWeight: 'bold',
                mb: 4,
                fontSize: { xs: '1.75rem', md: '2.5rem' }
              }}
            >
              Tournament Bracket Builder
            </Typography>
            
            <Typography 
              variant="h5"
              sx={{ 
                color: 'rgba(255, 255, 255, 0.9)',
                lineHeight: 1.6,
                mb: 4,
                fontSize: { xs: '1rem', md: '1.3rem' }
              }}
            >
              Create and manage tournament brackets with real-time collaboration.
            </Typography>
            
            <Typography 
              variant="h6"
              sx={{ 
                color: 'rgba(255, 255, 255, 0.8)',
                lineHeight: 1.8,
                fontSize: { xs: '0.9rem', md: '1.1rem' }
              }}
            >
              • Single elimination brackets<br/>
              • Real-time updates<br/>
              • Player management<br/>
              • Team collaboration<br/>
              • Mobile responsive
            </Typography>
          </Box>

          {/* Form Box */}
          <Box sx={{ 
            flex: 1,
            padding: { xs: 3, lg: 5 },
            minHeight: { xs: 'auto', lg: '100%' },
            width: '100%',
            maxWidth: '100%',
            minWidth: { xs: '100%', md: '450px' },
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '16px',
            boxShadow: `
              0 8px 32px rgba(0, 0, 0, 0.4),
              0 0 0 1px rgba(255, 255, 255, 0.1),
              inset 0 0 0 1px rgba(255, 255, 255, 0.05)
            `,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            boxSizing: 'border-box',
          }}>
            <Typography 
              variant="h3" 
              component="h1"
              sx={{ 
                color: '#ffffff',
                fontWeight: 'bold',
                textAlign: 'center',
                mb: { xs: 3, lg: 5 },
                fontSize: { xs: '1.75rem', md: '2.5rem' },
                textShadow: '0 2px 4px rgba(0,0,0,0.3)'
              }}
            >
              {isLogin ? "Sign In" : "Create Account"}
            </Typography>

            {isLogin ? (
              <LoginComponent onSwitchToRegister={handleSwitchToRegister} />
            ) : (
              <RegisterComponent onSwitchToLogin={handleSwitchToLogin} />
            )}
            
            <SocialLoginComponent />
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default Auth;