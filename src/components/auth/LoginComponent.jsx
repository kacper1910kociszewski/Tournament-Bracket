import { useState } from 'react';
import { TextField, Button, Typography, Box, Alert, CircularProgress } from '@mui/material';
import { authService } from '../../services/authService';

const LoginComponent = ({ onSwitchToRegister }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) setError('')
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    const result = await authService.loginWithEmail(formData.email, formData.password);

    setLoading(false);

    if (result.success) {
      console.log('Login successful:', result.user);
      // Redirect to the dashboard
    } else {
      setError(result.error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TextField
        fullWidth
        name="email"
        label="Email"
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
        disabled={loading}
        sx={{
          mt: 2,
          mb: 2,
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
        {loading ? <CircularProgress size={24} /> : 'Sign In'}
      </Button>

      <Typography 
        variant="body2" 
        align="center"
        sx={{ 
          color: 'rgba(255, 255, 255, 0.7)',
          mt: 2
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