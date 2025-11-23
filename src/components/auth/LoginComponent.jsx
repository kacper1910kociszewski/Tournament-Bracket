import * as React from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

const LoginComponent = ({ onSwitchToRegister }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login submitted');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}> {/* Changed from 25vw to 100% */}
      <TextField
        fullWidth
        label="Email"
        variant="outlined"
        sx={{
          mb: 3,
          '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
              borderColor: '#ffffff',
              borderWidth: '2px',
            },
          },
          '& .MuiInputLabel-root': {
            '&.Mui-focused': {
              color: '#ffffff',
              fontWeight: 'bold',
            },
            color: 'rgba(255, 255, 255, 0.8)',
          },
          '& .MuiOutlinedInput-root fieldset': {
            borderColor: 'rgba(255, 255, 255, 0.4)',
          },
          '& .MuiOutlinedInput-root:hover fieldset': {
            borderColor: 'rgba(255, 255, 255, 0.7)',
          },
          input: { 
            color: '#ffffff',
            fontSize: '16px'
          },
        }}
      />

      <TextField
        fullWidth
        label="Password"
        type="password"
        variant="outlined"
        sx={{
          mb: 3,
          '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
              borderColor: '#ffffff',
              borderWidth: '2px',
            },
          },
          '& .MuiInputLabel-root': {
            '&.Mui-focused': {
              color: '#ffffff',
              fontWeight: 'bold',
            },
            color: 'rgba(255, 255, 255, 0.8)',
          },
          '& .MuiOutlinedInput-root fieldset': {
            borderColor: 'rgba(255, 255, 255, 0.4)',
          },
          '& .MuiOutlinedInput-root:hover fieldset': {
            borderColor: 'rgba(255, 255, 255, 0.7)',
          },
          input: { 
            color: '#ffffff',
            fontSize: '16px'
          },
        }}
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{
          mt: 2,
          mb: 2,
          py: 1.8, // Increased padding
          fontSize: '1.1rem', // Larger font
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          color: '#ffffff',
          fontWeight: 'bold',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
          },
        }}
      >
        Sign In
      </Button>

      <Typography 
        variant="body2" 
        align="center"
        sx={{ 
          color: 'rgba(255, 255, 255, 0.7)',
          mt: 2,
          fontSize: '1rem' // Slightly larger
        }}
      >
        Don't have an account?{' '}
        <Typography
          component="span"
          variant="body2"
          onClick={onSwitchToRegister}
          sx={{
            color: '#ffffff',
            fontWeight: 'bold',
            cursor: 'pointer',
            textDecoration: 'underline',
            fontSize: '1rem',
            '&:hover': {
              color: 'rgba(255, 255, 255, 0.8)',
            }
          }}
        >
          Sign up
        </Typography>
      </Typography>
    </Box>
  );
};

export default LoginComponent;