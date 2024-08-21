import moment from 'moment';

/** formatted date for transaction list */
export const getFormatedDateForTransactions = (date) => {
    return moment(date).format("MMM Do, YYYY");
}

/**  formatted date for api */
export const getFormatedDateForApi = () => {
    return moment().format('YYYY-MM-DD');
}
