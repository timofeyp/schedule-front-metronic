export const filterDef = localStorage.getItem('selectValues')
  ? JSON.parse(localStorage.getItem('selectValues'))
  : [];

export const showInfoValue = localStorage.getItem('infoValue')
  ? JSON.parse(localStorage.getItem('infoValue'))
  : false;

export const setFilter = values =>
  localStorage.setItem('selectValues', JSON.stringify(values));
