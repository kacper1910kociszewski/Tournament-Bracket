import * as React from 'react';
import { Box, Button, Typography, Divider } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';

const SocialLoginComponent = () => {
  const handleGoogleLogin = () => {
    console.log('Google login clicked');
    // Add your Google OAuth logic here
  }; 

  const handleGitHubLogin = () => {
    console.log('GitHub login clicked');
    // Add your GitHub OAuth logic here
  };

  return (
    <Box sx={{ width: '100%', mt: 3 }}>
      {/* Divider with "or" text */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Divider sx={{ flex: 1, borderColor: 'rgba(255, 255, 255, 0.3)' }} />
        <Typography 
          variant="body2" 
          sx={{ 
            mx: 2, 
            color: 'rgba(255, 255, 255, 0.7)',
            fontWeight: 'bold'
          }}
        >
          OR
        </Typography>
        <Divider sx={{ flex: 1, borderColor: 'rgba(255, 255, 255, 0.3)' }} />
      </Box>

      {/* Google Login Button */}
      <Button
        fullWidth
        variant="outlined"
        startIcon={<GoogleIcon />}
        onClick={handleGoogleLogin}
        sx={{
          mb: 2,
          py: 1.5,
          borderColor: 'rgba(255, 255, 255, 0.4)',
          color: '#ffffff',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          fontWeight: 'bold',
          '&:hover': {
            borderColor: '#ffffff',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
          },
          transition: 'all 0.2s ease-in-out',
        }}
      >
        Continue with Google
      </Button>

      {/* GitHub Login Button */}
      <Button
        fullWidth
        variant="outlined"
        startIcon={<GitHubIcon />}
        onClick={handleGitHubLogin}
        sx={{
          py: 1.5,
          borderColor: 'rgba(255, 255, 255, 0.4)',
          color: '#ffffff',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          fontWeight: 'bold',
          '&:hover': {
            borderColor: '#ffffff',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
          },
          transition: 'all 0.2s ease-in-out',
        }}
      >
        Continue with GitHub
      </Button>
    </Box>
  );
};

export default SocialLoginComponent;