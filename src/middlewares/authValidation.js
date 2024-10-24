const validateRegister = (req, res, next) => {
    const { user_name, user_mail, user_pass } = req.body;
    const errors = [];

    // Validate username
    if (!user_name || user_name.trim() === '') {
        errors.push('Username is required');
    }

    // Validate email
    if (!user_mail || user_mail.trim() === '') {
        errors.push('Email is required');
    } else if (!isValidEmail(user_mail)) {
        errors.push('Please provide a valid email address');
    }

    // Validate password
    if (!user_pass || user_pass.trim() === '') {
        errors.push('Password is required');
    } else if (user_pass.length < 6) {
        errors.push('Password must be at least 6 characters long');
    }

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors
        });
    }

    next();
};

const validateLogin = (req, res, next) => {
    const { user_mail, user_pass } = req.body;
    const errors = [];

    // Validate email
    if (!user_mail || user_mail.trim() === '') {
        errors.push('Email is required');
    }

    // Validate password
    if (!user_pass || user_pass.trim() === '') {
        errors.push('Password is required');
    }

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors
        });
    }

    next();
};

// Helper function to validate email format
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

module.exports = {
    validateRegister,
    validateLogin
};