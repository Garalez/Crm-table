const modalGoodsIdNumber = document.querySelector('.vendor-code__id');
const modalGoodsForm = document.querySelector('.modal__form');
const modalGoodsDiscountCheckbox = document.querySelector('#discount');
const modalGoodsDiscountInput = document.querySelector(
    '.modal__input_discount');
const modalGoodsTotalCost = document.querySelector('.modal__total-price');
const modalGoodsInputs = document.querySelectorAll('.modal__input');
const modalGoods = document.querySelector('.overlay');
const panelBtnOpenModal = document.querySelector('.panel__add-goods');
const tBody = document.querySelector('.table__body');
const crmTotalPrice = document.querySelector('.crm__total-price');

export default {
  modalGoodsIdNumber,
  modalGoodsForm,
  modalGoodsDiscountCheckbox,
  modalGoodsDiscountInput,
  modalGoodsTotalCost,
  modalGoodsInputs,
  modalGoods,
  panelBtnOpenModal,
  tBody,
  crmTotalPrice,
};
