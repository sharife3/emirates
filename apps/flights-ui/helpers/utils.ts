import moment from 'moment';

export const formatDate = (date: Date): string => {
  if (date) {
    return moment(date).format('HH:mm');
  }
  return '';
};
