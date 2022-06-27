import {totalPricePage} from './priceCalcs.js';
import {addNewProduct} from './createElements.js';
import {arr} from '../index.js';
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
  tBody,
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
    }
    if (target.closest('.table__btn_pic')) {
      const left = (screen.width / 2);
      const top = (screen.height / 2);
      const winPos = `top=${top - 300},left=${left - 300},width=600,height=600`;
      open(`${target.dataset.pic}`, '', winPos);
    }
  });
};

