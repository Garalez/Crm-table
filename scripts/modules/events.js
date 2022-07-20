import {totalPricePage} from './priceCalcs.js';
import {createModalError, errorText} from './error.js';
import {showModal} from './modal.js';
import {URL} from '../index.js';
import {httpRequest} from './data.js';
import {renderGoods} from './render.js';
import selectors from './selectors.js';
const {
  tBody,
  crmGoods,
} = selectors;

export const modalEvents = () => {
  const errorModal = createModalError();

  crmGoods.addEventListener('click', async e => {
    const target = e.target;
    if (target.classList.contains('table__btn_edit') ||
      target.classList.contains('panel__add-goods')) {
      const {overlay, modalForm, modalInputs, modalTotalPrice,
        modalIdNumber} = await showModal();

      modalForm.append(errorModal);

      if (target.classList.contains('table__btn_edit')) {
        const idCell = target.parentNode.parentNode.children[0].textContent;
        httpRequest(`${URL}/${idCell}`, {
          method: 'GET',
          callback(err, data) {
            if (err) {
              console.warn(err, data);
              if (err.status === 422 || err.status === 404 || err.status >= 500) {
                errorText(err);
              } else {
                errorModal.classList.add('active');
              }
            } else {
              modalIdNumber.textContent = idCell;
              modalForm.name.value = data.title;
              modalForm.category.value = data.category;
              modalForm.units.value = data.units;
              modalForm.count.value = data.count;
              modalForm.price.value = data.price;
              modalForm.description.value = data.description;
              modalTotalPrice.textContent = `$${data.price * data.count}`;
            }
          },
        });
      }

      modalInputs.forEach(elem => {
        elem.addEventListener('blur', () => {
          modalTotalPrice.textContent =
          `$${+modalForm.count.value * +modalForm.price.value}`;
        });
      });

      overlay.addEventListener('click', e => {
        const target = e.target;
        if (target === overlay ||
          target.closest('.modal__close')) {
          overlay.remove();
        }

        if (target === modalForm.discount) {
          modalForm.discount_count.toggleAttribute('disabled');
        }

        if (!modalForm.discount.checked) {
          modalForm.discount_count.value = '';
        }

        if (target.closest('.vendor-code__btn')) {
          const newIdNumber = prompt('Введите новый id');
          modalIdNumber.textContent = newIdNumber;
        }
      });

      modalForm.addEventListener('submit', e => {
        e.preventDefault();

        httpRequest(URL, {
          method: 'POST',
          body: {
            id: modalIdNumber.textContent,
            title: modalForm.name.value,
            category: modalForm.category.value,
            units: modalForm.units.value,
            count: modalForm.count.value,
            price: modalForm.price.value,
            description: modalForm.description.value,
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
              modalForm.reset();
              overlay.remove();
              modalTotalPrice.textContent = '$0';
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

