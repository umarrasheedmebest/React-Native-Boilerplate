import React from 'react';
import { StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import globalStyles, { colors } from '@styles/globalStyles';
import SimpleText from '@components/SimpleText';
import TextInputField from '@components/TextInputField';
import Button from '@components/Button';
import Loading from '@components/Loading';
import { getFormatedDateForTransactions } from '@utils/dateTime';
import { ADDING_TRANSACTION_MESSAGE } from '@constants/messages';
import DatePicker from '@components/DatePicker';
import { getAmountInDollarFormat } from '@utils/common';

/** View logic for AddTransaction screen */
const AddTransactionComponent = ({
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
}) => {
    return (
        <SafeAreaView style={globalStyles.container}>
            {/* created date picker same  as input field view to make look consitant */}
            <SimpleText
                title={"Date"}
            />
            <TouchableOpacity
                style={styles.date}
                onPress={() => handleShowDatepicker()}>
                <SimpleText
                    title={getFormatedDateForTransactions(date)}
                    style={{ marginTop: 0 }}
                />
            </TouchableOpacity>
            <TextInputField
                label="Merchant"
                value={formData.merchant}
                onChangeText={(value) => handleInputChange('merchant', value)}
                onBlur={() => handleBlur('merchant', formData.merchant)}
                maxLength={255}
                returnKeyType="next"
                blurOnSubmit={false}
                onSubmitEditing={() => amountRef?.current?.focus()}
                autoFocus={true}
            />
            {errors?.merchant && <SimpleText title={errors?.merchant} variant="error" />}
            <TextInputField
                label="Amount (in cents)"
                value={formData.amount}
                onChangeText={(value) => handleInputChange('amount', value)}
                onBlur={() => handleBlur('amount', formData.amount)}
                keyboardType="numeric"
                returnKeyType="done"
                blurOnSubmit={false}
                ref={amountRef}
                onSubmitEditing={validateAndAddTransaction}
            />
            {formData.amount && <SimpleText title={`Equivalent amount: ${getAmountInDollarFormat(formData.amount / 100)}`} />}
            {errors?.amount && <SimpleText title={errors?.amount} variant="error" />}
            {error && <SimpleText title={error} variant="error" />}
            {isLoading && <Loading message={ADDING_TRANSACTION_MESSAGE} />}
            {!isLoading && <Button
                title="Add Transaction"
                onPress={validateAndAddTransaction}
                width={0.9}
                isDynamic={true}
            />}
            {showDatePicker &&
                <DatePicker
                    onDateChange={onDateChange}
                    iOSDateDone={iOSDateDone}
                    date={date}
                />
            }
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    date: {
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
        marginHorizontal: 20,
        marginTop: 5,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: colors.lightGrey,
        height: 50,
        justifyContent: 'center',
    },
});

export default AddTransactionComponent;
