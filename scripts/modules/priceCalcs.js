import selectors from './selectors.js';
const {
  tBody,
  crmTotalPrice,
} = selectors;

export const totalPricePage = () => {
  let sum = 0;
  for (let i = 0; i < tBody.rows.length; i++) {
    const row = tBody.rows[i];
    const cellValue = Number(row.cells[6].textContent.replace(/[^0-9]/g, ''));
    sum += cellValue;
  }
  return crmTotalPrice.textContent = `$${sum}`;
};


