import {totalPricePage} from './priceCalcs.js';
import {addNewProduct} from './editElements.js';
import selectors from './selectors.js';
const {
  modalGoodsIdNumber,
  modalGoodsForm,
  modalGoodsDiscountCheckbox,
  modalGoodsDiscountInput,
  modalGoodsTotalCost,
  modalGoodsInputs,
  modalGoods,
  panelBtnOpenModal,
} = selectors;

export const modalEvents = () => {
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

export const formControl = (closeModal) => {
  modalGoodsForm.addEventListener('submit', e => {
    e.preventDefault();
    addNewProduct();
    modalGoodsForm.reset();
    modalGoodsTotalCost.textContent = '$0';
    totalPricePage();
    closeModal();
  });
};

