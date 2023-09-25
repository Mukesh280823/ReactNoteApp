import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from "axios";
import Swal from 'sweetalert2';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";



const styles = {
    showPasswordButton: {
        margin: "0px 350px",
        position: 'relative',
        '&.password-button': {
            position: 'absolute',
            padding: "10px 20px",
        },
        '&.confirm-password-button': {
        },
    },
    container: {
        maxWidth: '400px',
        margin: '0 auto',
        marginTop: '130px',
        padding: '20px',
        border: '1px solid #eaeaea',
        borderRadius: '5px',
        backgroundColor: '#fff',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    heading: {
        textAlign: 'center',
        color: '#333',
        fontSize: '24px',
        marginBottom: '20px',
    },
    input: {
        width: "380px",
        padding: '0px',
        marginBottom: '20px',
        border: '1px solid #eaeaea',
        borderRadius: '5px',
        fontSize: '16px',
        backgroundColor: 'rgb(240, 240, 240)',
    },
    error: {
        color: 'red',
        fontSize: '14px',
        marginTop: '-10px',
        width:'200px',
        marginBottom: '15px',
    },
    submitButton: {
        width: '100%',
        padding: '15px',
        backgroundColor: 'rgb(249, 86, 95)',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '18px',
        transition: 'background-color 0.3s ease-in-out',
    },
    loginLink: {
        textAlign: 'center',
        marginTop: '15px',
    },
    loginLinkAnchor: {
        color: '#007bff',
        textDecoration: 'none',
    },
    loginLinkAnchorHover: {
        textDecoration: 'underline',
    },
};
function RegistrationForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
      
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };
    const [formErrors, setFormErrors] = useState({});

    const handleInputChange = (e) => {

        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {

        const errors = {};
    
        if (!formData.name) {
            errors.name = "Name is required";
        } else if (!/^[A-Za-z]+$/.test(formData.name)) {
            errors.name = "Use only Alphabets";
        }
        if (!formData.email) {
            errors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errors.email = "Invalid Email format";
        }
        const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&*!])[A-Za-z\d@#$%^&*!]{6,}$/;
        if (!formData.password) {
            errors.password = "Password is required";
        } else if (!passwordPattern.test(formData.password)) {
            errors.password = "At Least 6 digits , upperCase ,LowerCase, Special Character";
        }
        if (!formData.confirmPassword) {
            errors.confirmPassword = "Confirm Password is required";
        } else if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = "Password do not Matched";
        }
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isFormValid = validateForm();
        if (isFormValid) {
            console.log("dggchsh", formData);
            const { name, email, password } = formData;
            try {
                const response = await axios.post('http://localhost:8000/register', { name, email, password  }).then(responsdData => {
                    if (responsdData.data.message === 'User registered successfully') {
                        toast.success(" User registered successfully");
                        navigate('/'); // Navigate to the login page on success
                        Swal.fire({
                            title: 'User registered successfully',
                            showClass: {
                              popup: 'animate__animated animate__fadeInDown'
                            },
                            hideClass: {
                              popup: 'animate__animated animate__fadeOutUp'
                            }
                          })
                    } else {
                        Swal({
                            text: `${responsdData.data.message}`,
                            icon: "error",
                            button: "OK",
                        });
                        console.log('Registration error:', responsdData.data.message);
                    }
                });
            } catch (error) {
                console.log('Network error:', error);
            }
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Sign Up </h2>
            <form onSubmit={handleSubmit} method='POST'>
                <Box
                    component="form"
                    sx={{
                        "& > :not(style)": { m: 1, width: "25ch" }
                    }}
                    noValidate
                    autoComplete="off"
                >  
                    <div>
                        <TextField
                            id="name"
                            label="Name"
                            variant="outlined"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            style={styles.input}
                        />

                        {formErrors.name && <p style={{ ...styles.error, fontFamily: "Arial" }}>{formErrors.name}</p>}
                    </div>
                    <div>
                        <TextField
                            id="email"
                            label="Email"
                            variant="outlined"
                            type="text"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            style={styles.input}
                        />

                        {formErrors.email && <p style={{ ...styles.error, fontFamily: "Arial" }}>{formErrors.email}</p>}
                    </div>
                    <div style={{ position: "relative" }}>
                        <TextField
                            id="password"
                            label="Password"
                            variant="outlined"
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={formData.password}
                            placeholder='Example- Admin@123'
                            onChange={handleInputChange}
                            style={styles.input}
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            style={{ position: "absolute", marginLeft: "340px", marginTop: "-60px" }}

                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                        {formErrors.password && <p style={{ ...styles.error, fontFamily: "Arial" }}>{formErrors.password}</p>}
                    </div>
                    <div style={{ position: "relative" }}>
                        <TextField
                            id="confirmPassword"
                            label="Confirm Password"
                            variant="outlined"
                            type={showConfirmPassword ? 'text' : 'password'}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            style={styles.input}
                        />
                        <button
                            type="button"
                            onClick={toggleConfirmPasswordVisibility}
                            // style={styles.showPasswordButton}
                            style={{ position: "absolute", marginLeft: "340px", marginTop: "-60px" }}
                        >
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                        {formErrors.confirmPassword && (
                            <p style={{ ...styles.error, fontFamily: "Arial" }}>{formErrors.confirmPassword}</p>
                        )}
                    </div>
                    <button
                        type="submit"
                        style={styles.submitButton}
                        onClick={handleSubmit}
                    >
                        Sign Up
                    </button>

                </Box>  </form>
            <div style={styles.loginLink}>
                <p style={{ fontFamily: "Arial" }}>
                    Already have an account?{' '}
                    <Link
                        to="/login"
                        style={{ ...styles.loginLinkAnchor, fontFamily: "Arial" }}
                    >
                        Sign In
                    </Link>
                </p>
            </div>

        </div>
    );
}

export default RegistrationForm;
