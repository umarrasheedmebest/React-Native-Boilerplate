import { useCallback, useContext, useRef, useState } from 'react';
import { AuthContext } from '@contexts/authContext';
import { useCreateTransaction } from '@queries/queries';
import { getFormatedDateForApi } from '@utils/dateTime';
import {
    ENTER_A_MERCHANT_MESSAGE,
    ENTER_AN_AMOUNT_MESSAGE,
    SELECT_A_DATE_MESSAGE
} from '@constants/messages';
import { Platform } from 'react-native';

/** business logic for AddTransaction screen */
const AddTransactionServiceComponent = ({
    children,
}) => {
    const { mutate: createTransactionRequest, isPending: isLoading } = useCreateTransaction();
    const [error, setError] = useState('');
    const { userAuthToken } = useContext(AuthContext);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [date, setDate] = useState(new Date());
    const amountRef = useRef(null);
    const [formData, setFormData] = useState({
        merchant: '',
        amount: '',
    });
    const [errors, setErrors] = useState({});

    //on date change handler
    const onDateChange = useCallback((event, selectedDate) => {
        setShowDatePicker(Platform.OS === 'ios');
        const currentDate = selectedDate;
        setDate(currentDate);
    }, [date]);

    //hide ios picker with extra button
    const iOSDateDone = () => {
        setShowDatePicker(false);
    }

    // Handle input change and validate
    const validateField = (name, value) => {
        let newErrors = { ...errors };

        if (name === 'merchant' && value == '') {
            newErrors.merchant = ENTER_A_MERCHANT_MESSAGE;
        } else if (name === 'amount' && value == '') {
            newErrors.amount = ENTER_AN_AMOUNT_MESSAGE;
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

    const validateAndAddTransaction = async () => {
        const { merchant, amount } = formData;
        let newErrors = {};

        // Validate on submit
        if (merchant == '') newErrors.merchant = ENTER_A_MERCHANT_MESSAGE;
        if (amount == '') newErrors.amount = ENTER_AN_AMOUNT_MESSAGE;

        setErrors(newErrors);

        if (!Object.keys(newErrors).length) {
            createTransactionRequest({
                authToken: userAuthToken,
                created: getFormatedDateForApi(date),
                merchant: merchant,
                amount: amount,
                setError
            });
            resetVariables();
        }
    }

    //resetting the variable after successfull call
    const resetVariables = () => {
        setDate(new Date());
        setFormData({
            merchant: '',
            amount: '',
        });
        setErrors({});
        iOSDateDone();
    };

    const handleShowDatepicker = () => {
        setShowDatePicker(true);
    };

    return children({
        showDatePicker,
        date,
        onDateChange,
        handleShowDatepicker,
        validateAndAddTransaction,
        isLoading,
        iOSDateDone,
        error,
        amountRef,
        formData,
        errors,
        handleInputChange,
        handleBlur
    });
}

export default AddTransactionServiceComponent;
