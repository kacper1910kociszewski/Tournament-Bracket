import * as React from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

const RegisterComponent = ({ onSwitchToLogin }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle registration logic here
    console.log('Register submitted');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
      <TextField
        fullWidth
        label="Nickname"
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
        Create Account
      </Button>

      <Typography 
        variant="body2" 
        align="center"
        sx={{ 
          color: 'rgba(255, 255, 255, 0.7)',
          mt: 2,
          fontSize: '1rem'
        }}
      >
        Already have an account?{' '}
        <Typography
          component="span"
          variant="body2"
          onClick={onSwitchToLogin}
          sx={{
            color: '#ffffff',
            fontWeight: 'bold',
            cursor: 'pointer',
            textDecoration: 'underline',
            '&:hover': {
              color: 'rgba(255, 255, 255, 0.8)',
            }
          }}
        >
          Sign in
        </Typography>
      </Typography>
    </Box>
  );
};

export default RegisterComponent;