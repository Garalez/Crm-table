import {totalPricePage} from './modules/priceCalcs.js';
import {createRow, removeRow} from './modules/editElements.js';
import {renderGoods} from './modules/render.js';
import {modalEvents, formControl} from './modules/modal.js';

export const arr = [
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

{
  const init = () => {
    createRow();
    removeRow();
    renderGoods();
    totalPricePage();
    const {closeModal} = modalEvents();
    formControl(closeModal);
  };
  init();
}
