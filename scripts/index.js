/* eslint-disable guard-for-in */
/* eslint-disable no-unused-vars */
'use strict';

const modalGoods = document.querySelector('.overlay');
const modalGoodsBtnClose = document.querySelector('.modal__close');
const panelBtnOpenModal = document.querySelector('.panel__add-goods');
const modalGoodsTitle = document.querySelector('.modal__title');
const modalGoodsIdNumber = document.querySelector('.vendor-code__id');
const modalGoodsIdNumberBtn = document.querySelector('.vendor-code__btn');
const modalGoodsForm = document.querySelector('.modal__form');
const modalGoodsDiscountCheckbox = document.querySelector('#discount');
const modalGoodsDiscountInput = document.querySelector('[name=discount_count]');
const modalGoodsTotalCost = document.querySelector('.modal__total');
const tBody = document.querySelector('.table__body');

<<<<<<< HEAD
panelBtnOpenModal.addEventListener('click', () => {
  modalGoods.classList.add('active');
});

modalGoods.addEventListener('click', e => {
  const target = e.target;
  if (target === modalGoods ||
      target.closest('.modal__close')) {
    modalGoods.classList.remove('active');
  }
=======
modalGoodsBtnClose.addEventListener('click', () => {
  modalGoods.classList.remove('active');
});

panelBtnOpenModal.addEventListener('click', () => {
  modalGoods.classList.add('active');
>>>>>>> parent of a460133 (ready)
});

modalGoodsDiscountCheckbox.addEventListener('click', () => {
  modalGoodsDiscountInput.toggleAttribute('disabled');
});

const arr = [
  {
    'id': 253842678,
    'title': 'Смартфон Xiaomi 11T 8/128GB',
    'category': 'mobile-phone',
    'units': 'шт',
    'count': 3,
    'price': 27000,
    'totalprice': 81000,
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
    'price': 4000,
    'totalprice': 4000,
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
    'price': 12400,
    'totalprice': 12400,
    'images': {
      'small': 'img/tvboxmecool-m.jpg',
      'big': 'img/tvboxmecool-b.jpg',
    },
  },
  {
    'id': 246258248,
    'title': 'Витая пара PROConnect 01-0043-3-25',
    'category': 'cables',
    'units': 'v',
    'count': 420,
    'price': 22,
    'totalprice': 22,
    'images': {
      'small': 'img/lan_proconnect43-3-25.jpg',
      'big': 'img/lan_proconnect43-3-25-b.jpg',
    },
  },
];

const createRow = (arr) => {
  const tableBody = document.querySelector('.table__body');
  arr.forEach(() => {
    const createTableRow = document.createElement('tr');
    tableBody.append(createTableRow);
    createTableRow.classList.add('test');
  });
};
createRow(arr);

const renderGoods = (arr) => {
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
renderGoods(arr);

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
    console.log(arr);
  }
});


