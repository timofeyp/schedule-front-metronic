import moment from 'moment';

export const defaultFilter = [
  {
    _id: 'Действующие атомные станции',
    value: 7,
    label: 'Ленинградская АЭС',
  },
  {
    _id: 'Дирекция строящихся атомных станций',
    value: 15,
    label: 'Ленинградская АЭС-2',
  },
];

export const startFromToday = () => moment().startOf('day');
export const endOfWeekFromToday = () =>
  moment()
    .add(6, 'day')
    .hour(23)
    .minute(59)
    .second(59)
    .millisecond(999);
