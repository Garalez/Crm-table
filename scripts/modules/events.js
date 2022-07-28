import {totalPricePage} from './priceCalcs.js';
import {createModalError, errorText} from './error.js';
import {showModal} from './modal.js';
import {serverAddress} from '../index.js';
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
      const {overlay, modalForm, modalFieldset, modalInputs, modalTotalPrice,
        modalIdNumber, modalImage} = await showModal();

      modalForm.append(errorModal);

      if (target.classList.contains('table__btn_edit')) {
        const idCell = target.parentNode.parentNode.children[0].textContent;

        httpRequest(`${serverAddress}/${idCell}`, {
          method: 'GET',
          callback(err, data) {
            if (err) {
              console.warn(new Error(err), data);
              if (err === 422 || err === 404 || err >= 500) {
                modalFieldset.append(errorText(`Ошибка : ${err}`));
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

      modalImage.addEventListener('change', () => {
        if (modalImage.files.length > 0) {
          const src = URL.createObjectURL(modalImage.files[0]);

          if (modalImage.files[0].size > 1000000) {
            const weightLimit = 'Изображение не должно превышать размер 1 Мб';

            modalFieldset.append(errorText(weightLimit));
          } else {
            modalFieldset.style.gridTemplateAreas = `
            "name description"
            "category description"
            "units count"
            "discount price" 
            ". file" 
            "file-add file-add"`;

            const imageWrapper = document.createElement('div');
            imageWrapper.classList.add('image-container');
            imageWrapper.style.display = 'flex';
            imageWrapper.style.justifyContent = 'center';

            const imagePreview = document.createElement('img');
            imagePreview.style.height = '200px';
            imagePreview.src = src;

            imageWrapper.append(imagePreview);
            modalFieldset.append(imageWrapper);
          }
        }
      });

      modalForm.name.addEventListener('input', () => {
        modalForm.name.value = modalForm.name.value.replace(/[^а-я ]/gi, '');
      });

      modalForm.category.addEventListener('input', () => {
        modalForm.category.value = modalForm.category.value.replace(/[^а-я ]/gi, '');
      });

      modalForm.description.addEventListener('input', () => {
        modalForm.description.value = modalForm.description.value.replace(/[^а-я ]/gi, '');
      });

      modalForm.units.addEventListener('input', () => {
        modalForm.units.value = modalForm.units.value.replace(/[^а-я]/gi, '');
      });

      modalForm.count.addEventListener('input', () => {
        modalForm.count.value = modalForm.count.value.replace(/\D/g, '');
      });

      modalForm.discount_count.addEventListener('input', () => {
        modalForm.discount_count.value = modalForm.discount_count.value.replace(/\D/g, '');
      });

      modalForm.price.addEventListener('input', () => {
        modalForm.price.value = modalForm.price.value.replace(/\D/g, '');
      });

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

        if (modalForm.description.value.length < 80 || modalForm.name.value ||
            modalForm.category.value || modalForm.units.value ||
            modalForm.count.value || modalForm.price.value) {
          if (modalForm.description.value.length < 80) {
            modalForm.description.setAttribute('title',
                'Введено меньше 80 символов');
            modalForm.description.focus();
          }
          return;
        } else {
          httpRequest(serverAddress, {
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
                console.warn(new Error(err), data);
                if (err === 422 || err === 404 || err >= 500) {
                  errorText(err);
                } else {
                  errorModal.classList.add('active');
                }
              } else {
                while (tBody.lastElementChild) {
                  tBody.removeChild(tBody.lastElementChild);
                }
                httpRequest(serverAddress, {
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
        }
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

