import moment from 'moment';

const term = process.env.TERM;
const colorizeDefault = !!term && term!=='dumb';

export default {
  timestamp: () =>{
    return moment().utc().format('MM/DD/YYYY HH:mm:ss') + ' UTC';
  },
  prettyPrint: true,
  level: 'info',
  handleExceptions: true,
  colorize: colorizeDefault,
  silence: false,
  json: false,
  stringify: true,
  showLevel: true
};
