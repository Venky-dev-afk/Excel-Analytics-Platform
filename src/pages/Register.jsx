import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, clearMessages } from '../redux/authSlice';
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Snackbar,
  Alert,
  Paper,
} from '@mui/material';
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, success } = useSelector((state) => state.auth);

  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(registerUser(form));
  };

  useEffect(() => {
    if (error) setOpenError(true);

    if (success) {
      setOpenSuccess(true);
      setForm({ name: '', email: '', password: '' });

      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  }, [error, success]);

  useEffect(() => {
    return () => {
      dispatch(clearMessages());
    };
  }, [dispatch]);

  const getErrorMessage = (msg) =>
    typeof msg === 'string' && msg.trim() !== '' ? msg : 'Something went wrong!';

  return (
    <Container maxWidth="xs" sx={{ mt: 18 }}>
      <Paper
        elevation={6}
        sx={{
          p: 4,
          borderRadius: '16px',
          backgroundColor: '#ffffffdd',
          backdropFilter: 'blur(8px)',
        }}
      >
        <Typography
          variant="h5"
          align="center"
          fontWeight="bold"
          gutterBottom
          sx={{ mb: 3, color: '#1976d2' }}
        >
          Create Your Account
        </Typography>

        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" gap={3}>
            <TextField
              label="Name"
              fullWidth
              required
              variant="outlined"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              sx={{
                '& .MuiInputBase-root': {
                  backgroundColor: '#f3f4f6',
                  borderRadius: 1,
                },
              }}
            />
            <TextField
              label="Email"
              fullWidth
              required
              variant="outlined"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              sx={{
                '& .MuiInputBase-root': {
                  backgroundColor: '#f3f4f6',
                  borderRadius: 1,
                },
              }}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              required
              variant="outlined"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              sx={{
                '& .MuiInputBase-root': {
                  backgroundColor: '#f3f4f6',
                  borderRadius: 1,
                },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{
                mt: 2,
                fontWeight: 'bold',
                background: 'linear-gradient(to right, #1976d2, #2196f3)',
                borderRadius: 2,
                py: 1.2,
                '&:hover': {
                  background: 'linear-gradient(to right, #1565c0, #1e88e5)',
                },
              }}
            >
              Register
            </Button>
          </Box>
        </form>

        <Typography
          variant="body2"
          align="center"
          sx={{ mt: 3, color: '#555' }}
        >
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#1976d2', fontWeight: 500 }}>
            Login
          </Link>
        </Typography>
        <Typography variant="body2" align='right' sx={{ mt: 3, color: '#555' }}>
          <Button
            variant="text"
            onClick={() => navigate('/')}
            sx={{
              mt: 1,
              fontSize: '0.875rem',
              color: '#1976d2',
              textTransform: 'none',
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            ← Back
          </Button>
        </Typography>
      </Paper>

      {/* Error Snackbar */}
      <Snackbar
        open={openError}
        autoHideDuration={4000}
        onClose={() => setOpenError(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setOpenError(false)}
          severity="error"
          sx={{ width: '100%', backgroundColor: '#ffebee', color: '#b71c1c' }}
        >
          {getErrorMessage(error)}
        </Alert>
      </Snackbar>

      {/* Success Snackbar */}
      <Snackbar
        open={openSuccess}
        autoHideDuration={4000}
        onClose={() => setOpenSuccess(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setOpenSuccess(false)}
          severity="success"
          sx={{ width: '100%', backgroundColor: '#e8f5e9', color: '#2e7d32' }}
        >
          {success || 'Registered successfully!'}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Register;
