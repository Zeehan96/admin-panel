import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { TextField, Snackbar, Button } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Autocomplete from '@mui/material/Autocomplete';

const AddCustomer = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        industryType: '',
        customerType: ''
    });
    const [successAlert, setSuccessAlert] = useState(false);
    const [errorAlert, setErrorAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');


    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        const { firstName, lastName, email, password, industryType, customerType } = formData;

        event.preventDefault();
        try {
            const response = await axios.post(`http://146.190.164.174:4000/api/customer/signup_customer`, {
                first_name: firstName,
                last_name: lastName,
                email: email,
                password: password,
                industry_type: industryType,
                customer_type: customerType,
            });
            console.log('Customer added successfully:', response.data);
          
            setSuccessAlert(true);
        } catch (error) {
            console.error('Error adding customer:', error.response);
            setErrorAlert(true);
            setErrorMessage(error.response.data.message);
        }
    };

    const handleCloseAlert = () => {
        setSuccessAlert(false);
        setErrorAlert(false);
        setErrorMessage('');
    };

    const navigate = useNavigate();
    const handleCancel = () => {
        navigate("/customer");
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="container">
                    <h1 style={{ marginBottom: "50px" }}>Add Customer</h1>
                    <div className="row">
                        <div className="col-lg-6">
                            <TextField
                                fullWidth
                                name="firstName"
                                className="first-name"
                                id="outlined-basic"
                                label="First Name"
                                type="text"
                                variant="outlined"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                required
                                style={{ marginBottom: '30px' }}
                            />
                            <TextField
                                fullWidth
                                name="email"
                                className="email"
                                id="outlined-basic"
                                label="Email"
                                type="email"
                                variant="outlined"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                style={{ marginBottom: '30px' }}
                            />
                            <Autocomplete
                                fullWidth
                                options={['Software', 'Healthcare', 'Education']}  
                                renderInput={(params) => <TextField {...params} label="Industry Type" variant="outlined" />}
                                value={formData.industryType}
                                onChange={(event, newValue) => {
                                    setFormData({ ...formData, industryType: newValue });
                                }}
                                style={{ marginBottom: '30px' }}
                            />
                        </div>
                        <div className="col-lg-6">
                            <TextField
                                fullWidth
                                name='lastName'
                                className="last-name"
                                id="outlined-basic"
                                label="Last Name"
                                type="text"
                                variant="outlined"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                required
                                style={{ marginBottom: '30px' }}
                            />
                            <FormControl
                                fullWidth
                                className="password"
                                variant="outlined"
                                style={{ marginBottom: '30px' }}
                            >
                                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                />
                            </FormControl>
                            <Autocomplete
                                fullWidth
                                options={['App', 'Web']}  
                                renderInput={(params) => <TextField {...params} label="Customer Type" variant="outlined" />}
                                value={formData.customerType}
                                onChange={(event, newValue) => {
                                    setFormData({ ...formData, customerType: newValue });
                                }}
                                style={{ marginBottom: '30px' }}
                            />
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                        <Button onClick={handleCancel} variant="outlined" style={{ marginRight: '1rem', color: "#00A95A", border: "1px #00A95A" }}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="contained" style={{ backgroundColor: "#00A95A", }}>
                            Save
                        </Button>
                    </div>
                </div>
            </form>
            <Snackbar
                open={successAlert}
                autoHideDuration={6000}
                onClose={handleCloseAlert}
                message="Customer added successfully"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            />
            <Snackbar
                open={errorAlert}
                autoHideDuration={6000}
                onClose={handleCloseAlert}
                message={errorMessage}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            />
        </>
    );
}

export default AddCustomer;