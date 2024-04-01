import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import Logo from '../images/Logo.png'
import { Link } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';




const ForgotPassword = () => {
const [loading, setLoading] = useState(false);
const [resetForm, setResetForm] = useState({
email: '',
password: '',
confirm_password: ''
});
const [resetSuccess, setResetSuccess] = useState(false);
const [errorMessage, setErrorMessage] = useState('');

const handleInputChange = (e) => {
const { name, value } = e.target;
setResetForm({
...resetForm,
[name]: value
});
};

const handleResetPassword = async (e) => {
const { confirm_password, email, password } = resetForm;
e.preventDefault();
try {
setLoading(true);
const reqObj = {
email: email,
password: password,
confirm_password: confirm_password
};
const response = await axios.post("http://146.190.164.174:4000/api/app_api/reset_password", reqObj);
if (response.status === 200) {
setResetSuccess(true);
} else {
console.error('Password reset failed:', response.data);
}
} catch (error) {
console.error('Error resetting password:', error.response);
if (error.response && error.response.data && error.response.data.message) {
setErrorMessage(error.response.data.message);
} else {
setErrorMessage('An error occurred while resetting the password.');
}
} finally {
setLoading(false);
}
};

return (
<>
    <div className="container-fluid">
        <div className="row align-items-center ">
            <div className="  col-7">
                <div className="image">
                    <Link to="/login"> <img src={Logo} alt="" className='img-fluid logo' /></Link>
                </div>
                {/* ============= Form ============= */}
                <div className="container mt-3 relax">
                    <div className="main-form  w-50">
                        <form onSubmit={handleResetPassword}>
                            <h2>Forgot Your Password?</h2>
                            <h6 className='text-success'>Enter your registered email to reset your password</h6>
                            <div className='mb-3 mt-4'>
                                <TextField label="Enter Email" type="email" name="email" value={resetForm.email}
                                    onChange={handleInputChange} variant="outlined" fullWidth required sx={{
                                            maxWidth: '100%',
                                            '& label.Mui-focused': {
                                                color: '#00A95A',
                                            },
                                            '& .MuiOutlinedInput-root': {
                                                '&.Mui-focused fieldset': {
                                                    borderColor: '#00A95A',
                                                },
                                            },
                                        }} />
                            </div>
                            <div className='mb-3'>
                                <TextField label="New Password" name='password' type="password"
                                    value={resetForm.password} onChange={handleInputChange} variant="outlined" fullWidth
                                    required sx={{
                                            maxWidth: '100%',
                                            '& label.Mui-focused': {
                                                color: '#00A95A',
                                            },
                                            '& .MuiOutlinedInput-root': {
                                                '&.Mui-focused fieldset': {
                                                    borderColor: '#00A95A',
                                                },
                                            },
                                        }} />
                            </div>
                            <div className='mb-3'>
                                <TextField label="Confirm New Password" name='confirm_password' type="password"
                                    value={resetForm.confirm_password} onChange={handleInputChange} variant="outlined"
                                    fullWidth required sx={{
                                            maxWidth: '100%',
                                            '& label.Mui-focused': {
                                                color: '#00A95A',
                                            },
                                            '& .MuiOutlinedInput-root': {
                                                '&.Mui-focused fieldset': {
                                                    borderColor: '#00A95A',
                                                },
                                            },
                                        }} />
                            </div>
                            <Button type="submit" variant="contained" sx={{
                                    backgroundColor: "#00A95A",
                                    '&:hover': {
                                        backgroundColor: "#00753e",
                                    }
                                }} fullWidth disabled={loading}>
                                {loading ?
                                <CircularProgress size={24} /> : "Reset Password"}
                            </Button>
                            {errorMessage && <p className='error-message'>{errorMessage}</p>}
                            {resetSuccess && <p className='m-2'>Password reset successfully!</p>}
                        </form>
                    </div>
                </div>
            </div>
            {/* ============ Right side Background ============== */}
            <div className=" col-sm-12 col-lg-5 d-flex d-none d-lg-flex back">
            </div>
        </div>
    </div>
</>
);
};

export default ForgotPassword;