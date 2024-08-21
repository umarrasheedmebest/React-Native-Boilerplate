const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

/** email validator */
export const validateEmail = (email) => {
    return emailRegex.test(email);
}

/** converting amount into dollar */
export const getAmountInDollarFormat = (value) => {
    // Create a NumberFormat instance for currency formatting
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
    });

    return formatter.format(value);
}

/** creating form data from provided boject */
export const getFormData = object => Object.keys(object).reduce((formData, key) => {
    formData.append(key, object[key]);
    return formData;
}, new FormData());

export const getSubstring = (text, length) => {
    return `${text.substring(0, length)}...`;
}
