import { useRef, useState } from 'react';
import { validateEmail } from '@utils/common';
import { useLogin } from '@queries/queries';
import {
    INVALID_EMAIL_ERROR,
    INVALID_EMAIL_OR_PASSWORD_ERROR,
    PASSWORD_ERROR
} from '@constants/messages';
import { PARTNER_NAME, PARTER_PASSOWRD } from 'react-native-dotenv';

/** business logic for Login screen */
const LoginServiceComponent = ({
    children,
}) => {
    const { mutate: loginRequest, isPending: isLoading, error: loginError, } = useLogin();
    const loginErrorMessage = INVALID_EMAIL_OR_PASSWORD_ERROR;
    const passwordRef = useRef(null);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});

    // Handle input change and validate
    const validateField = (name, value) => {
        let newErrors = { ...errors };

        if (name === 'email' && !validateEmail(value)) {
            newErrors.email = INVALID_EMAIL_ERROR;
        } else if (name === 'password' && value.length < 6) {
            newErrors.password = PASSWORD_ERROR;
        } else {
            newErrors[name] = ''; // Clear error if valid
        }

        setErrors(newErrors);
    };

    // Handle input change
    const handleInputChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    // Handle input blur event
    const handleBlur = (name, value) => {
        validateField(name, value);
    };

    const validateAndSignIn = async () => {
        const { email, password } = formData;
        let newErrors = {};

        // Validate on submit
        if (!validateEmail(email)) newErrors.email = INVALID_EMAIL_ERROR;
        if (password.length < 6) newErrors.password = PASSWORD_ERROR;

        setErrors(newErrors);

        if (!Object.keys(newErrors).length) {
            loginRequest({
                partnerName: PARTNER_NAME,
                partnerPassword: PARTER_PASSOWRD,
                partnerUserID: email,
                partnerUserSecret: password,
            });
        }
    }

    return children({
        validateAndSignIn,
        loginErrorMessage,
        loginError,
        isLoading,
        passwordRef,
        handleInputChange,
        formData,
        errors,
        handleBlur
    });
}

export default LoginServiceComponent;
