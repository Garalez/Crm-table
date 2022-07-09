import {totalPricePage} from './priceCalcs.js';
import {createModalError, errorText} from './error.js';
import {URL} from '../index.js';
import {httpRequest} from './data.js';
import {renderGoods} from './render.js';
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
  const errorModal = createModalError();

  modalGoodsForm.addEventListener('submit', e => {
    e.preventDefault();

    httpRequest(URL, {
      method: 'POST',
      body: {
        id: modalGoodsIdNumber.textContent,
        title: modalGoodsForm.name.value,
        category: modalGoodsForm.category.value,
        units: modalGoodsForm.units.value,
        count: modalGoodsForm.count.value,
        price: modalGoodsForm.price.value,
        description: modalGoodsForm.description.value,
      },
      callback(err, data) {
        if (err) {
          console.warn(err, data);
          if (err.status === 422 || err.status === 404 || err.status >= 500) {
            errorText(err);
          } else {
            errorModal.classList.add('active');
          }
        } else {
          while (tBody.lastElementChild) {
            tBody.removeChild(tBody.lastElementChild);
          }
          httpRequest(URL, {
            method: 'GET',
            callback: renderGoods,
          });
          totalPricePage();
          modalGoodsForm.reset();
          closeModal();
          modalGoodsTotalCost.textContent = '$0';
        }
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });

  errorModal.addEventListener('click', e => {
    const target = e.target;
    if (target === errorModal ||
        target.closest('.modal__error')) {
      errorModal.classList.remove('active');
    }
  });
};

export const removeRow = () => {
  tBody.addEventListener('click', e => {
    const target = e.target;
    if (target.closest('.table__btn_del')) {
      target.closest('tr').remove();
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

