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
  const dataList = document.createElement('datalist');
  dataList.setAttribute('id', 'category-list');

  crmGoods.addEventListener('click', async e => {
    const target = e.target;
    if (target.classList.contains('table__btn_edit') ||
      target.classList.contains('panel__add-goods')) {
      const {overlay, modalForm, modalFieldset, modalInputs, modalTotalPrice,
        modalIdNumber, modalImage, modalTitle,
        modalSubmitBtn} = await showModal();

      modalForm.append(errorModal);

      httpRequest(`${serverAddress}/category`, {
        method: 'GET',
        callback(err, data) {
          console.log(err);
          dataList.innerHTML = '';

          data.forEach(elem => {
            const dataOption = document.createElement('option');
            dataList.append(dataOption);
            dataOption.value = elem;
          });
          document.body.append(dataList);
          modalForm.category.setAttribute('list', 'category-list');
        },
      });

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
        modalForm.name.value = modalForm.name.
            value.replace(/[^а-яA-Z0-9 ]/gi, '');
      });

      modalForm.category.addEventListener('input', () => {
        modalForm.category.value = modalForm.category.
            value.replace(/[^а-яA-Z ]/gi, '');
      });

      modalForm.description.addEventListener('input', () => {
        modalForm.description.value = modalForm.description.
            value.replace(/[^а-яA-Z0-9 ]/gi, '');
      });

      modalForm.units.addEventListener('input', () => {
        modalForm.units.value = modalForm.units.value.replace(/[^а-я]/gi, '');
      });

      modalForm.count.addEventListener('input', () => {
        modalForm.count.value = modalForm.count.value.replace(/\D/g, '');
      });

      modalForm.discount_count.addEventListener('input', () => {
        modalForm.discount_count.value = modalForm.discount_count.
            value.replace(/\D/g, '');
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

      errorModal.addEventListener('click', e => {
        const target = e.target;
        if (target === errorModal ||
            target.closest('.modal__error')) {
          errorModal.classList.remove('active');
        }
      });

      if (target.classList.contains('table__btn_edit')) {
        const idCellNumber = target.parentNode.parentNode.
            children[0].textContent;

        modalTitle.textContent = 'Изменить товар';
        modalSubmitBtn.textContent = 'Изменить товар';

        httpRequest(`${serverAddress}/goods/${idCellNumber}`, {
          method: 'GET',
          callback(err, data) {
            overlay.classList.add('active');
            if (err) {
              console.warn(new Error(err), data);
              if (err === 422 || err === 404 || err >= 500) {
                modalFieldset.append(errorText(`Ошибка : ${err}`));
              } else {
                errorModal.classList.add('active');
              }
            } else {
              modalIdNumber.textContent = idCellNumber;
              modalForm.name.value = data.title;
              modalForm.category.value = data.category;
              modalForm.units.value = data.units;
              modalForm.count.value = data.count;
              modalForm.price.value = data.price;
              modalForm.description.value = data.description;
              modalTotalPrice.textContent = `$${data.price * data.count}`;

              modalForm.addEventListener('submit', e => {
                e.preventDefault();

                if (modalForm.description.value.length < 80 ||
                  !modalForm.name.value || !modalForm.category.value ||
                  !modalForm.units.value || !modalForm.count.value ||
                  !modalForm.price.value) {
                  if (modalForm.description.value.length < 80) {
                    modalForm.description.setAttribute('title',
                        'Введено меньше 80 символов');
                    modalForm.description.focus();
                  }
                  return;
                } else {
                  httpRequest(`${serverAddress}/goods/${idCellNumber}`, {
                    method: 'PATCH',
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
                        tBody.innerHTML = '';

                        httpRequest(`${serverAddress}/goods`, {
                          method: 'GET',
                          callback: renderGoods,
                        });

                        totalPricePage();
                        overlay.remove();
                      }
                    },
                    headers: {
                      'Content-Type': 'application/json',
                    },
                  });
                }
              });
            }
          },
        });
      }

      if (target.classList.contains('panel__add-goods')) {
        overlay.classList.add('active');
        modalForm.append(errorModal);

        modalForm.addEventListener('submit', e => {
          e.preventDefault();

          if (modalForm.description.value.length < 80 ||
            !modalForm.name.value || !modalForm.category.value ||
            !modalForm.units.value || !modalForm.count.value ||
            !modalForm.price.value) {
            if (modalForm.description.value.length < 80) {
              modalForm.description.setAttribute('title',
                  'Введено меньше 80 символов');
              modalForm.description.focus();
            }
            return;
          } else {
            httpRequest(`${serverAddress}/goods`, {
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
                  tBody.innerHTML = '';

                  httpRequest(`${serverAddress}/goods`, {
                    method: 'GET',
                    callback: renderGoods,
                  });

                  totalPricePage();
                  overlay.remove();
                }
              },
              headers: {
                'Content-Type': 'application/json',
              },
            });
          }
        });
      }
    }
  });
};

export const tbodyEvents = () => {
  tBody.addEventListener('click', tableElem => {
    const bodyTarget = tableElem.target;
    if (bodyTarget.closest('.table__btn_del')) {
      document.body.insertAdjacentHTML('beforeend', `
      <div class="overlay active">
        <div class="overlay__modal modal">
          <button class="modal__close">
            <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="m2 2 20 20M2 22 22 2" stroke="currentColor" stroke-width="3" stroke-linecap="round" /></svg>
          </button>
          <div class="modal_top">
            <h2 class="modal__title">Вы точно хотите удалить товар?</h2>
          </div>
          <div class="buttons__wrapper">
            <button class="modal__accept modal__submit">Да!</button>
            <button class="modal__decline modal__submit">Нет</button>
          </div>
        </div>
      </div>
      `);

      const deleteOverlay = document.querySelector('.overlay');
      const modalBtnAccept = document.querySelector('.modal__accept');
      const modalBtnDecline = document.querySelector('.modal__decline');
      modalBtnAccept.style.width = '40%';
      modalBtnDecline.style.width = '40%';

      deleteOverlay.addEventListener('click', e => {
        const target = e.target;
        if (target === deleteOverlay ||
          target.closest('.modal__close') ||
          target.closest('.modal__decline')) {
          deleteOverlay.remove();
        }

        if (target.closest('.modal__accept')) {
          const idCellNumber = bodyTarget.parentNode.parentNode.
              children[0].textContent;

          httpRequest(`${serverAddress}/goods/${idCellNumber}`, {
            method: 'DELETE',
          });

          deleteOverlay.remove();
          bodyTarget.closest('tr').remove();
          totalPricePage();
        }
      });
    }

    if (bodyTarget.closest('.table__btn_pic')) {
      const left = (screen.width / 2);
      const top = (screen.height / 2);
      const winPos = `top=${top - 300},left=${left - 300},width=600,height=600`;
      open(`${bodyTarget.dataset.pic}`, '', winPos);
    }
  });
};


export const panelEvents = () => {
  const searchInput = document.querySelector('.panel__input');
  const getData = () => {
    httpRequest(`${serverAddress}/goods`, {
      method: 'GET',
      callback(err, data) {
        tBody.innerHTML = '';
        const filteredData = data.filter(obj => obj.title.
            includes(searchInput.value));
        renderGoods(err, filteredData);
      },
    });
  };

  let debounceTimer;

  const debounce = (callback, time) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(callback, time);
  };

  searchInput.addEventListener('input', () => {
    debounce(getData, 300);
  });
};


