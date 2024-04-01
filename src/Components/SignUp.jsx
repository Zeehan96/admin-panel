import React, { useState } from 'react';
import Logo from '../images/Logo.png';
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });
    const [validPassword, setValidPassword] = useState({
        lowercase: false,
        uppercase: false,
        number: false,
        minLength: false
    });
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handlePasswordChange = (event) => {
        const newPassword = event.target.value;
        setFormData({ ...formData, password: newPassword });

        const lowerCaseLetters = /[a-z]/g;
        const upperCaseLetters = /[A-Z]/g;
        const numbers = /[0-9]/g;

        setValidPassword({
            lowercase: newPassword.match(lowerCaseLetters) !== null,
            uppercase: newPassword.match(upperCaseLetters) !== null,
            number: newPassword.match(numbers) !== null,
            minLength: newPassword.length >= 8
        });
    };

    const handleClickShowPassword = () => setShowPassword(!showPassword);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSignUp = async (event) => {
        event.preventDefault();
        const { firstName, lastName, email, password } = formData;

        // Reset errors
        setErrors({});
        setSuccessMessage('');

        const reqObj = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password,
            status: true
        };

        const headers = { "Content-Type": "application/json" };

        try {
            const response = await axios.post("http://146.190.164.174:4000/api/admin/signup_admin", reqObj, { headers });
            if (response.status === 200) {
                localStorage.setItem('token', response.data.token);
                setSuccessMessage('Account created successfully!');
                navigate('/');
            } else {
                console.error('Error fetching data:', response.statusText);
            }
        } catch (error) {
            console.error('SignUp error:', error.response);

            if (error.response && error.response.data && error.response.data.errors) {
                setErrors(error.response.data.errors);
            } else if (error.response && error.response.data && error.response.data.message) {
                setErrors({ general: error.response.data.message });
            } else {
                setErrors({ general: 'An unexpected error occurred. Please try again later.' });
            }
        }
    };

    return (
        <div className='signup'>
            <div className="container-fluid">
                <div className="row align-items-center">
                    <div className="col-7">
                        <img src={Logo} alt="" className='logo' />
                        <div className="container mt-5 relax">
                            <div className="signup-form w-50">
                                <h1>Get started with a Forever Free plan</h1>
                                <p>Sign up in seconds. No credit card required.</p>
                                <form onSubmit={handleSignUp}>
                                    <TextField label="First Name" name="firstName" type="text" sx={{ mt: 2, width: '50ch' }} 
                                        onChange={handleInputChange}
                                        error={!!errors.firstName}
                                        helperText={errors.firstName}
                                        required />
                                    <TextField label="Last Name" name="lastName" type="text" sx={{ mt: 2, width: '50ch' }}
                                        onChange={handleInputChange}
                                        error={!!errors.lastName}
                                        helperText={errors.lastName}
                                        required />
                                    <TextField label="Email" name="email" type="email" sx={{ mt: 2, width: '50ch' }} 
                                        onChange={handleInputChange}
                                        error={!!errors.email}
                                        helperText={errors.email}
                                        required />
                                    <FormControl sx={{ mt: 2, width: '50ch' }} variant="outlined">
                                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                        <OutlinedInput id="outlined-adornment-password" name="password" type={showPassword ? 'text' : 'password'} onChange={handlePasswordChange}
                                            endAdornment={<InputAdornment position="end">
                                                <IconButton aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword} edge="end">
                                                    {showPassword ?
                                                        <VisibilityOff /> :
                                                        <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                            }
                                            label="Password"
                                            error={!!errors.password}
                                            helperText={errors.password}
                                            required
                                        />
                                    </FormControl>
                                    <div className="d-flex justify-content-between mt-3">
                                        <div className="radio">
                                            <div className={`circle ${validPassword.lowercase ? 'valid' : 'invalid'}`}></div>
                                            <p>One lowercase character</p>
                                        </div>
                                        <div className="radio">
                                            <div className={`circle ${validPassword.number ? 'valid' : 'invalid'}`}></div>
                                            <p>One Number</p>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-between mt-3">
                                        <div className="radio">
                                            <div className={`circle ${validPassword.uppercase ? 'valid' : 'invalid'}`}></div>
                                            <p>One uppercase character</p>
                                        </div>
                                        <div className="radio">
                                            <div className={`circle ${validPassword.minLength ? 'valid' : 'invalid'}`}></div>
                                            <p>8 characters minimum</p>
                                        </div>
                                    </div>
                                    <p className='mt-3'>By clicking, you agree to Terms of Use, Privacy Policy and Anti-Spam Policy.</p>
                                    {Object.values(errors).some(error => error !== '') && (
                                        <Alert severity="error">
                                            {Object.values(errors).map((error, index) => (
                                                <div key={index}>{error}</div>
                                            ))}
                                        </Alert>
                                    )}
                                    {successMessage && (
                                        <Alert severity="success">
                                            <AlertTitle>Successfully create account</AlertTitle>
                                            {successMessage}
                                        </Alert>
                                    )}
                                    <Button variant="contained" type='submit'
                                        sx={{ mt: 1, width: '55ch', backgroundColor: "#00A95A" }}>
                                        Sign Up</Button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-5 background-color">
                        <Link className='color' to='/login'>
                            <Button variant="contained" sx={{ mb: 5, width: '45ch', backgroundColor: "#00A95A" }}>Back for Login</Button>
                        </Link>
                        <h2>Try Advanced features htmlFor 30 days</h2>
                        <p>Your 30-day trial of Advanced features includes:</p>
                        <div className="singn-icon ">
                            <i className="fa-solid fa-check"></i>
                            <p>Access to premium features</p>
                        </div>
                        <div className="sign-text">
                            <p>Live Chat, template library, auto resend, promotion pop-ups, Al writing assistant and more</p>
                        </div>
                        <div className="singn-icon">
                            <i className="fa-solid fa-check"></i>
                            <p>Access to main features</p>
                        </div>
                        <div className="sign-text">
                            <p>Email automation, landing pages, website builder and more</p>
                        </div>
                        <div className="singn-icon">
                            <i className="fa-solid fa-check"></i>
                            <p>Up to 1,000 subscribers</p>
                        </div>
                        <div className="singn-icon mt-4">
                            <i className="fa-solid fa-check"></i>
                            <p>Send up to 12,000 emails per month</p>
                        </div>
                        <div className="singn-icon mt-4">
                            <i className="fa-solid fa-check"></i>
                            <p>24/7 live chat support</p>
                        </div>
                        <div className="singn-icon mt-4">
                            <i className="fa-solid fa-check"></i>
                            <p>Upgrade anytime</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
