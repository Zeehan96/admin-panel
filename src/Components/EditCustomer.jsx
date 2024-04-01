import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Snackbar, Button } from "@mui/material";
import Autocomplete from '@mui/material/Autocomplete';

const EditCustomer = ({ customerData }) => {
    const [formData, setFormData] = useState({
        firstName: customerData.first_name ? customerData.first_name : '',
        lastName: customerData.last_name ? customerData.last_name : '',
        email: customerData.user._email ? customerData.user._email : '',
        profileImage: customerData.profile_image ? customerData.profile_image : '',
        phoneNumber: customerData.phone_number ? customerData.phone_number : '',
        industryType: customerData.industry_type ? customerData.industry_type : ''
    });
    const [successAlert, setSuccessAlert] = useState(false);
    const [errorAlert, setErrorAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const { firstName, lastName, email, industryType, phoneNumber, profileImage } = formData;

        try {
            const token = localStorage.getItem("token");
            const headers = {
                'x-sh-auth': token,
            };

            const response = await axios.put(
                `http://146.190.164.174:4000/api/customer/edit_customer_by_admin/${customerData.user._id}`,
                {
                    first_name: firstName,
                    last_name: lastName,
                    email: email,
                    industry_type: industryType,
                    phone_number: phoneNumber,
                    profile_image: profileImage
                },
                { headers: headers }
            );

            console.log('Customer updated successfully:', response.data);

            setSuccessAlert(true);
        } catch (error) {
            console.error('Error updating customer:', error.response);
            setErrorAlert(true);
            setErrorMessage(error.response.data.message);
        }
    };

    const handleCloseAlert = () => {
        setSuccessAlert(false);
        setErrorAlert(false);
        setErrorMessage('');
    };

    const handleCancel = (event) => {
        event.preventDefault(); // Prevent the default action of the cancel button
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="container">
                    <h1 style={{ marginBottom: "50px" }}>Edit Customer</h1>
                    <div className="row">
                        <div className="col-lg-6">
                            <TextField fullWidth name="firstName" className="first-name" id="outlined-basic" label="First Name"
                                type="text" variant="outlined" value={formData.firstName} onChange={handleInputChange} required
                                style={{ marginBottom: '30px' }} />
                            <TextField fullWidth name="email" className="email" id="outlined-basic" label="Email" type="email"
                                variant="outlined" value={formData.email} disabled // Add disabled prop here
                                style={{ marginBottom: '30px' }} />
                            <Autocomplete fullWidth options={['Software', 'Healthcare', 'Education']} // Your suggestion list
                                renderInput={(params) =>
                                    <TextField {...params} label="Industry Type" variant="outlined" />}
                                value={formData.industryType}
                                onChange={(event, newValue) => {
                                    setFormData({ ...formData, industryType: newValue });
                                }}
                                style={{ marginBottom: '30px' }}
                            />
                        </div>
                        <div className="col-lg-6">
                            <TextField fullWidth name='lastName' className="last-name" id="outlined-basic" label="Last Name"
                                type="text" variant="outlined" value={formData.lastName} onChange={handleInputChange} required
                                style={{ marginBottom: '30px' }} />
                            <TextField fullWidth name='phoneNumber' className="phoneNumber" id="outlined-basic"
                                label="phoneNumber" type="number" variant="outlined" value={formData.phoneNumber}
                                onChange={handleInputChange} required style={{ marginBottom: '30px' }} />
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                        <Button variant="outlined" style={{ marginRight: '1rem', color: "#00A95A", border: "1px #00A95A" }} onClick={handleCancel}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="contained" style={{ backgroundColor: "#00A95A", }}>
                            Save
                        </Button>
                    </div>
                </div>
            </form>
            <Snackbar open={successAlert} autoHideDuration={6000} onClose={handleCloseAlert} message="Customer edit successfully" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} />
            <Snackbar open={errorAlert} autoHideDuration={6000} onClose={handleCloseAlert} message={errorMessage} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} />
        </>
    );
};

export default EditCustomer;
