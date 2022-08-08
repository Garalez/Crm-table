import {totalPricePage} from './priceCalcs.js';
import selectors from './selectors.js';
const {tBody} = selectors;

export const renderGoods = (err, data) => {
  if (err) {
    console.warn(err, data);
    return;
  }
  data.map(item => {
    const createRow = document.createElement('tr');

    const idCell = document.createElement('td');
    idCell.textContent = item.id;

    const nameCell = document.createElement('td');
    nameCell.classList.add('table__cell_left', 'table__cell_name');
    nameCell.textContent = item.title;

    const categoryCell = document.createElement('td');
    categoryCell.classList.add('table__cell_left');
    categoryCell.textContent = item.category;

    const unitsCell = document.createElement('td');
    unitsCell.textContent = item.units;

    const countCell = document.createElement('td');
    countCell.textContent = item.count;

    const priceCell = document.createElement('td');
    priceCell.textContent = `$${item.price}`;

    const totalCostCell = document.createElement('td');
    totalCostCell.textContent = `$${item.count * item.price}`;

    const createEditCell = document.createElement('td');
    createEditCell.classList.add('table__cell_btn-wrapper');

    const btnPic = document.createElement('button');
    const btnEdit = document.createElement('button');
    const bntDel = document.createElement('button');
    bntDel.classList.add('table__btn', 'table__btn_del');
    btnEdit.classList.add('table__btn', 'table__btn_edit');
    btnPic.classList.add('table__btn', 'table__btn_pic');
    btnPic.setAttribute('data-pic', `../../img/fire.jpg`);
    createEditCell.replaceChildren(btnPic);
    createEditCell.append(btnEdit);
    createEditCell.append(bntDel);

    createRow.append(idCell, nameCell, categoryCell,
        unitsCell, countCell, priceCell, totalCostCell, createEditCell);
    tBody.append(createRow);

    createRow.childNodes.forEach(elem => {
      elem.classList.add('table__cell');
    });
  });

  totalPricePage();
};
