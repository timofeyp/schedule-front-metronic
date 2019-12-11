export const filterDef = localStorage.getItem('selectValues')
  ? JSON.parse(localStorage.getItem('selectValues'))
  : [];

export const isExtraInfo = localStorage.getItem('isExtraInfo')
  ? JSON.parse(localStorage.getItem('isExtraInfo'))
  : false;

export const setFilter = values =>
  localStorage.setItem('selectValues', JSON.stringify(values));

export const setExtraInfo = value =>
  localStorage.setItem('isExtraInfo', JSON.stringify(value));
