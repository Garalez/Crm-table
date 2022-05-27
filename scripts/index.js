/* eslint-disable max-len */
/* eslint-disable guard-for-in */
/* eslint-disable no-unused-vars */
'use strict';

const modalGoods = document.querySelector('.overlay');
const panelBtnOpenModal = document.querySelector('.panel__add-goods');
const modalGoodsTitle = document.querySelector('.modal__title');
const modalGoodsIdNumber = document.querySelector('.vendor-code__id');
const modalGoodsIdNumberBtn = document.querySelector('.vendor-code__btn');
const modalGoodsForm = document.querySelector('.modal__form');
const modalGoodsDiscountCheckbox = document.querySelector('#discount');
const modalGoodsDiscountInput = document.querySelector('.modal__input_discount');
const modalGoodsTotalCost = document.querySelector('.modal__total-price');
const modalGoodsInputs = document.querySelectorAll('.modal__input');
const crmTotalPrice = document.querySelector('.crm__total-price');
const tBody = document.querySelector('.table__body');

const arr = [
  {
    'id': 253842678,
    'title': 'Смартфон Xiaomi 11T 8/128GB',
    'category': 'mobile-phone',
    'units': 'шт',
    'count': 3,
    'price': '$27000',
    'totalprice': '$81000',
    'images': {
      'small': 'img/smrtxiaomi11t-m.jpg',
      'big': 'img/smrtxiaomi11t-b.jpg',
    },
  },
  {
    'id': 296378448,
    'title': 'Радиоуправляемый автомобиль Cheetan',
    'category': 'toys',
    'units': 'шт',
    'count': 1,
    'price': '$4000',
    'totalprice': '$4000',
    'images': {
      'small': 'img/cheetancar-m.jpg',
      'big': 'img/cheetancar-b.jpg',
    },
  },
  {
    'id': 215796548,
    'title': 'ТВ приставка MECOOL KI',
    'category': 'tv-box',
    'units': 'шт',
    'count': 4,
    'price': '$12400',
    'totalprice': '$49600',
    'images': {
      'small': 'img/tvboxmecool-m.jpg',
      'big': 'img/tvboxmecool-b.jpg',
    },
  },
  {
    'id': 246258248,
    'title': 'Витая пара PROConnect 01-0043-3-25',
    'category': 'cables',
    'units': 'шт',
    'count': 420,
    'price': '$22',
    'totalprice': '$9240',
    'images': {
      'small': 'img/lan_proconnect43-3-25.jpg',
      'big': 'img/lan_proconnect43-3-25-b.jpg',
    },
  },
];

const createRow = () => {
  const tableBody = document.querySelector('.table__body');
  arr.forEach(() => {
    const createTableRow = document.createElement('tr');
    tableBody.append(createTableRow);
    createTableRow.classList.add('test');
  });
};

const renderGoods = () => {
  const tableRow = document.querySelectorAll('.test');
  arr.forEach((obj, idx) => {
    for (const key in obj) {
      const createTableCell = document.createElement('td');
      createTableCell.classList.add('table__cell');
      tableRow[idx].append(createTableCell);
      createTableCell.textContent = obj[key];
      if (key === 'images') {
        createTableCell.classList.add('table__cell_btn-wrapper');
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
};

const totalPricePage = () => {
  let sum = 0;
  for (let i = 0; i < tBody.rows.length; i++) {
    const row = tBody.rows[i];
    const cellValue = Number(row.cells[6].textContent.replace(/[^0-9]/g, ''));
    sum += cellValue;
  }
  return crmTotalPrice.textContent = `$${sum}`;
};

const modalEvents = () => {
  const openModal = () => {
    modalGoods.classList.add('active');
  };

  const closeModal = () => {
    modalGoods.classList.remove('active');
  };

  panelBtnOpenModal.addEventListener('click', openModal);

  modalGoods.addEventListener('click', e => {
    const target = e.target;
    if (target === modalGoods ||
        target.closest('.modal__close')) {
      closeModal();
    }

    if (target === modalGoodsDiscountCheckbox) {
      modalGoodsDiscountInput.toggleAttribute('disabled');
    }

    if (!modalGoodsDiscountCheckbox.checked) {
      modalGoodsDiscountInput.value = '';
    }

    if (target.closest('.vendor-code__btn')) {
      const newIdNumber = prompt('Введите новый id');
      modalGoodsIdNumber.textContent = newIdNumber;
    }
  });

  modalGoodsInputs.forEach(elem => {
    elem.addEventListener('blur', () => {
      modalGoodsTotalCost.textContent =
      `$${+modalGoodsForm.count.value * +modalGoodsForm.price.value}`;
    });
  });
  return {
    closeModal,
  };
};

const addNewProduct = () => {
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


const formControl = (closeModal) => {
  modalGoodsForm.addEventListener('submit', e => {
    e.preventDefault();
    addNewProduct();
    modalGoodsForm.reset();
    modalGoodsTotalCost.textContent = '$0';
    totalPricePage();
    closeModal();
  });
};


const init = () => {
  createRow();
  renderGoods();
  totalPricePage();
  const {closeModal} = modalEvents();
  formControl(closeModal);
};
init();
