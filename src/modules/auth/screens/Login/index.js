import React from 'react';
import { SafeAreaView } from 'react-native';
import globalStyles from '@styles/globalStyles';
import SimpleText from '@components/SimpleText';
import TextInputField from '@components/TextInputField';
import Loading from '@components/Loading';
import { LOGGIN_IN_MESSAGE } from '@constants/messages';
import Button from '@components/Button';

/** View logic for Login screen */

const LoginComponent = ({
    validateAndSignIn,
    loginErrorMessage,
    loginError,
    isLoading,
    passwordRef,
    handleInputChange,
    formData,
    errors,
    handleBlur
}) => {
    return (
        <SafeAreaView style={globalStyles.container}>
            <SimpleText title={"Expensify"} variant="heading" style={globalStyles.heading} />
            <TextInputField
                label="Email"
                value={formData.email}
                onChangeText={(value) => handleInputChange('email', value)}
                onBlur={() => handleBlur('email', formData.email)}
                width={0.9}
                isDynamic={true}
                blurOnSubmit={false}
                onSubmitEditing={() => passwordRef?.current?.focus()}
                autoFocus={true}
                returnKeyType="next"
                inputMode="email"
                keyboardType={"email-address"}
            />
            {errors?.email && <SimpleText title={errors?.email} variant="error" />}
            <TextInputField
                label="Password"
                value={formData.password}
                onChangeText={(value) => handleInputChange('password', value)}
                onBlur={() => handleBlur('password', formData.password)}
                secureTextEntry
                width={0.9}
                isDynamic={true}
                ref={passwordRef}
                blurOnSubmit={false}
                onSubmitEditing={validateAndSignIn}
                returnKeyType="done"
            />
            {errors?.password && <SimpleText title={errors?.password} variant="error" />}
            {loginError && <SimpleText title={loginErrorMessage} variant="error" />}
            {!isLoading && <Button
                title="Sign In"
                onPress={validateAndSignIn}
                width={0.9} // 90% of the screen width if isDynamic is true
                isDynamic={true}
            />}
            {isLoading && <Loading message={LOGGIN_IN_MESSAGE} />}
        </SafeAreaView>
    );
};

export default LoginComponent;
