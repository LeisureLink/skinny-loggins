import moment from 'moment';
export default {
  timestamp: () =>{
    return moment().utc().format('MM/DD/YYYY HH:mm:ss') + ' UTC';
  },
  prettyPrint: true,
  level: 'info',
  handleExceptions: true,
  colorize: true
};
