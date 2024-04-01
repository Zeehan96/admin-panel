import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import { useState } from 'react';
import "../App.css"

const ChangePasswordForm = ({ token }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);


  const handleTogglePasswordVisibility = (field) => {
    switch (field) {
      case 'oldPassword':
        setShowOldPassword(!showOldPassword);
        break;
      case 'newPassword':
        setShowNewPassword(!showNewPassword);
        break;
      case 'confirmNewPassword':
        setShowConfirmNewPassword(!showConfirmNewPassword);
        break;
      default:
        break;
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      if (newPassword !== confirmNewPassword) {
        setErrorMessage('New password and confirm password must match');
        return;
      }
      const token=localStorage.getItem("token")
      const headers = {
        'Content-Type': 'application/json',
        'x-sh-auth': token,
      };
      const reqObj = {
        old_password: oldPassword,
        new_password: newPassword,
        confirm_password: confirmNewPassword,
      };
      const response = await axios.put(`http://146.190.164.174:4000/api/app_api/change_password`, reqObj, {
        headers: headers,
      });
      
      console.log('Password changed successfully',response.data);
      setOldPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
      setErrorMessage('');
      return true; // Return true on success
    } catch (error) {
      console.error('Error changing password:', error.response);
      setErrorMessage('Error changing password. Please try again.');
      return false; // Return false on failure
    }
  };

  return (
    <form onSubmit={handleChangePassword}>
      <TextField
        id="oldPassword"
        label="Old Password"
        type={showOldPassword ? 'text' : 'password'}
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
        fullWidth
        margin="normal"
        required
        sx={{
          maxWidth: '100%',
          '& label.Mui-focused': {
              color: '#00A95A',
          },
          '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': {
                  borderColor: '#00A95A',
              },
          },
      }}
        InputProps={{
          endAdornment: (
            <IconButton onClick={() => handleTogglePasswordVisibility('oldPassword')} edge="end">
              {showOldPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          ),
        }}
      />
      <TextField
        id="newPassword"
        label="New Password"
        type={showNewPassword ? 'text' : 'password'}
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        fullWidth
        margin="normal"
        required
        sx={{
          maxWidth: '100%',
          '& label.Mui-focused': {
              color: '#00A95A',
          },
          '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': {
                  borderColor: '#00A95A',
              },
          },
      }}
        InputProps={{
          endAdornment: (
            <IconButton onClick={() => handleTogglePasswordVisibility('newPassword')} edge="end">
              {showNewPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          ),
        }}
      />
      <TextField
        id="confirmNewPassword"
        label="Confirm New Password"
        type={showConfirmNewPassword ? 'text' : 'password'}
        value={confirmNewPassword}
        onChange={(e) => setConfirmNewPassword(e.target.value)}
        fullWidth
        margin="normal"
        required
        sx={{
          maxWidth: '100%',
          '& label.Mui-focused': {
              color: '#00A95A',
          },
          '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': {
                  borderColor: '#00A95A',
              },
          },
      }}
        InputProps={{
          endAdornment: (
            <IconButton onClick={() => handleTogglePasswordVisibility('confirmNewPassword')} edge="end">
              {showConfirmNewPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          ),
        }}
      />
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      <Button
        type="submit"
        variant="contained"
        sx={{ bgcolor: '#00A95A', '&:hover': { bgcolor: '#00753e' } }}
      >
        Change Password
      </Button>
    </form>
  );
};

export default ChangePasswordForm;