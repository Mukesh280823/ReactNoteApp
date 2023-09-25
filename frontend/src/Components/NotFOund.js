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
        errors.password = "At Least 6 digits , upperCase , LowerCase, Special Character";
    }
    if (!formData.confirmPassword) {
        errors.confirmPassword = "Confirm Password is required";
    } else if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = "Password do not Matched";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
};