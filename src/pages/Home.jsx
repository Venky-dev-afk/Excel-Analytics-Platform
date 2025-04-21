import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { Close as CloseIcon } from '@mui/icons-material'; 

const Home = () => {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);

  const handleUploadClick = () => {
    const user = localStorage.getItem('user');
    if (!user) {
      setOpenDialog(true); 
    } else {
      // if you want to allow actual upload logic here
      console.log("User is logged in, proceed with upload");
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    navigate('/'); // redirect to login
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <AppBar position="static" color="primary">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" component="div">
            ExcelAnalytics
          </Typography>

          <Box>
            <Button
              component={Link}
              to="/login"
              variant="contained"
              color="secondary"
              sx={{
                mr: 2,
                '&:hover': {
                  backgroundColor: '#1565c0',
                },
              }}
            >
              Login
            </Button>

            <Button
              component={Link}
              to="/register"
              variant="contained"
              color="secondary"
              sx={{
                '&:hover': {
                  backgroundColor: '#1565c0',
                },
              }}
            >
              Register
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container
        maxWidth="md"
        sx={{
          mt: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Welcome! Upload your Excel file to get started.
        </Typography>

        <Button
          variant="contained"
          sx={{ mt: 4 }}
          onClick={handleUploadClick}
        >
          Upload Excel File
        </Button>
      </Container>

      {/* Dialog Box */}
      <Dialog 
        open={openDialog} 
        onClose={handleDialogClose} 
        sx={{
          '& .MuiDialog-paper': {
            backgroundColor: '#f3f4f6', 
            borderRadius: '15px', 
            padding: '20px',
            boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.15)',
            animation: 'fadeIn 0.3s ease-in-out', 
          },
        }}
      >
        {/* Close Button */}
        <IconButton
          sx={{
            position: 'absolute',
            right: '10px',
            top: '10px',
            color: '#aaa',
            '&:hover': { backgroundColor: 'transparent' },
          }}
          onClick={handleDialogClose}
        >
          <CloseIcon />
        </IconButton>

        <DialogTitle
          sx={{
            textAlign: 'center',
            color: '#d32f2f', // red color for the title
            fontWeight: 'bold',
          }}
        >
          Access Denied
        </DialogTitle>
        
        <DialogContent sx={{ textAlign: 'center' }}>
          <Typography variant="body1" sx={{ color: '#555', fontSize: '16px' }}>
            You have not logged in. Please log in to upload your file.
          </Typography>
        </DialogContent>
        
        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button
            onClick={()=>{navigate('/login')}}
            color="primary"
            variant="contained"
            sx={{
              backgroundColor: '#1976d2', // blue color
              '&:hover': { backgroundColor: '#1565c0' },
            }}
          >
            Go to Login
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Home;
