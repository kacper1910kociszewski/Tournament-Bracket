import { useState } from 'react';
import { TextField, Button, Typography, Box, Alert, CircularProgress } from '@mui/material';
import { authService } from '../../services/authService';

const RegisterComponent = ({ onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    nickname: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (error) setError('');
  };

  const validateForm = () => {
    if (!formData.nickname.trim()) {
      return 'Nickname is required';
    }
    if (formData.nickname.length < 3) {
      return 'Nickname must be at least 3 characters long';
    }
    if (!formData.email) {
      return 'Email is required';
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      return 'Email is invalid';
    }
    if (formData.password.length < 6) {
      return 'Password must be at least 6 characters long';
    }
    if (formData.password !== formData.confirmPassword) {
      return 'Passwords do not match';
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError('');

    const result = await authService.registerWithEmail(
      formData.email,
      formData.password,
      formData.nickname
    );

    setLoading(false);

    if (result.success) {
      // console.log('Registration successful:', result.user);
      // You can redirect to dashboard or show success message
    } else {
      setError(result.error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%'}}>
      {error && (
        <Alert severity="error" sx={{ mb: 1, mt: 0}}>
          {error}
        </Alert>
      )}

      <TextField
        fullWidth
        name="nickname"
        label="Nickname"
        value={formData.nickname}
        onChange={handleChange}
        variant="outlined"
        disabled={loading}
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
        name="email"
        label="Email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        variant="outlined"
        disabled={loading}
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
        name="password"
        label="Password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        variant="outlined"
        disabled={loading}
        sx={{
          mb: 1,
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
        name="confirmPassword"
        label="Confirm Password"
        type="password"
        value={formData.confirmPassword}
        onChange={handleChange}
        variant="outlined"
        disabled={loading}
        sx={{
          mb: 1,
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
        disabled={loading}
        sx={{
          mt: 2,
          mb: 1,
          py: 1.5,
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          color: '#ffffff',
          fontWeight: 'bold',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
          },
          '&:disabled': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          },
        }}
      >
        {loading ? <CircularProgress size={18} /> : 'Create Account'}
      </Button>

      <Typography 
        variant="body2" 
        align="center"
        sx={{ 
          color: 'rgba(255, 255, 255, 0.7)',
          mt: 1
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