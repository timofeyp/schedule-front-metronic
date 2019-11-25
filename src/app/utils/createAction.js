/**
 * @see analog https://github.com/afitiskin/redux-saga-routines
 */
const createAction = (actionType, namespace, additional = []) => {
  if (typeof actionType !== 'string') {
    throw new Error('must be a string');
  }
  const separator = namespace ? '/' : '';
  const generate = routine =>
    `${namespace}${separator}${actionType}_${routine}`;
  const routines = [
    ...additional.map(a => a.toUpperCase()),
    'TRIGGER',
    'REQUEST',
    'SUCCESS',
    'FAILURE',
    'FULFILL',
  ];
  const result = {};
  routines.forEach(r => {
    result[r] = generate(r);
  });
  routines.forEach(r => {
    result[r.toLowerCase()] = payload => ({
      type: result[r],
      payload,
    });
  });
  return result;
};

export default createAction;
