import {totalPricePage} from './priceCalcs.js';
import {arr} from '../index.js';
import selectors from './selectors.js';
const {
  modalGoodsIdNumber,
  modalGoodsForm,
  modalGoodsTotalCost,
  tBody,
} = selectors;

export const createRow = () => {
  arr.forEach(() => {
    const createTableRow = document.createElement('tr');
    tBody.append(createTableRow);
    createTableRow.classList.add('new-row');
  });
};

export const addNewProduct = () => {
  const createRow = document.createElement('tr');
  tBody.append(createRow);

  const idCell = document.createElement('td');
  idCell.classList.add('table__cell');
  idCell.append(modalGoodsIdNumber.textContent);
  createRow.append(idCell);

  const nameCell = document.createElement('td');
  nameCell.classList.add('table__cell', 'table__cell_left', 'table__cell_name');
  idCell.after(nameCell);
  nameCell.append(modalGoodsForm.name.value);

  const categoryCell = document.createElement('td');
  categoryCell.classList.add('table__cell', 'table__cell_left');
  nameCell.after(categoryCell);
  categoryCell.append(modalGoodsForm.category.value);

  const unitsCell = document.createElement('td');
  unitsCell.classList.add('table__cell');
  categoryCell.after(unitsCell);
  unitsCell.append(modalGoodsForm.units.value);

  const quantityCell = document.createElement('td');
  quantityCell.classList.add('table__cell');
  unitsCell.after(quantityCell);
  quantityCell.append(modalGoodsForm.count.value);

  const priceCell = document.createElement('td');
  priceCell.classList.add('table__cell');
  quantityCell.after(priceCell);
  priceCell.append(`$${modalGoodsForm.price.value}`);

  const totalCostCell = document.createElement('td');
  totalCostCell.classList.add('table__cell');
  priceCell.after(totalCostCell);
  totalCostCell.append(modalGoodsTotalCost.textContent);

  const btnCell = document.createElement('td');
  btnCell.classList.add('table__cell', 'table__cell_btn-wrapper');
  totalCostCell.after(btnCell);

  const btnPic = document.createElement('button');
  const btnEdit = document.createElement('button');
  const bntDel = document.createElement('button');
  bntDel.classList.add('table__btn', 'table__btn_del');
  btnEdit.classList.add('table__btn', 'table__btn_edit');
  btnPic.classList.add('table__btn', 'table__btn_pic');
  btnCell.replaceChildren(btnPic);
  btnCell.append(btnEdit);
  btnCell.append(bntDel);

  const obj = {
    'id': Number(idCell.textContent),
    'title': nameCell.textContent,
    'category': categoryCell.textContent,
    'units': unitsCell.textContent,
    'count': quantityCell.textContent,
    'price': totalCostCell.textContent,
    'totalprice': totalCostCell.textContent,
  };
  arr.push(obj);
  console.log(arr);
};

export const removeRow = () => {
  tBody.addEventListener('click', e => {
    const target = e.target;
    const id = target.parentNode.parentNode.childNodes[0].textContent;
    if (target.closest('.table__btn_del')) {
      target.closest('tr').remove();
      arr.forEach((item, index) => {
        if (id === item.id.toString()) {
          arr.splice([index], 1);
        }
      });
      totalPricePage();
      console.log(arr);
    }
  });
};

