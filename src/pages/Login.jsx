import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, clearMessages } from '../redux/authSlice';
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  CircularProgress,
  Snackbar,
  Alert,
  Paper,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const { user, loading, error, success } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(form));
  };

  useEffect(() => {
    if (user) {
      const timer = setTimeout(() => {
        navigate('/user-dashboard');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [user, navigate]);

  const handleClose = () => {
    dispatch(clearMessages());
  };

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
          Login to Your Account
        </Typography>

        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" gap={3}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              required
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
              variant="outlined"
              type="password"
              fullWidth
              required
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
              fullWidth
              disabled={loading}
              sx={{
                fontWeight: 'bold',
                py: 1.2,
                borderRadius: 2,
                background: 'linear-gradient(to right, #1976d2, #2196f3)',
                '&:hover': {
                  background: 'linear-gradient(to right, #1565c0, #1e88e5)',
                },
              }}
            >
              {loading ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : 'Login'}
            </Button>
          </Box>
        </form>

        <Typography
          variant="body2"
          align="center"
          sx={{ mt: 3, color: '#555' }}
        >
          New User?{' '}
          <Link to="/register" style={{ color: '#1976d2', fontWeight: 500 }}>
            Register here
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
        open={!!error}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleClose}
          severity="error"
          sx={{ width: '100%', backgroundColor: '#ffebee', color: '#b71c1c' }}
        >
          {error}
        </Alert>
      </Snackbar>

      {/* Success Snackbar */}
      <Snackbar
        open={!!success}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          sx={{ width: '100%', backgroundColor: '#e8f5e9', color: '#2e7d32' }}
        >
          {success}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Login;
