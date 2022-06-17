/* eslint-disable guard-for-in */
import {arr} from '../index.js';

export const renderGoods = () => {
  const tableRow = document.querySelectorAll('.new-row');
  arr.forEach((obj, idx) => {
    for (const key in obj) {
      const createTableCell = document.createElement('td');
      createTableCell.classList.add('table__cell');
      tableRow[idx].append(createTableCell);
      createTableCell.textContent = obj[key];
      if (key === 'images') {
        const btnPic = document.createElement('button');
        const btnEdit = document.createElement('button');
        const bntDel = document.createElement('button');
        bntDel.classList.add('table__btn', 'table__btn_del');
        btnEdit.classList.add('table__btn', 'table__btn_edit');
        btnPic.classList.add('table__btn', 'table__btn_pic');
        createTableCell.replaceChildren(btnPic);
        createTableCell.append(btnEdit);
        createTableCell.append(bntDel);
      }
    }
  });
  tableRow.forEach(e => {
    const cells = e.childNodes;
    cells[1].classList.add('table__cell_left', 'table__cell_name');
    cells[2].classList.add('table__cell_left');
    cells[7].classList.add('table__cell_btn-wrapper');
  });
};


