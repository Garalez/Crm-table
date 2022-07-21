export const createModalError = () => {
  const errorOverlay = document.createElement('div');
  errorOverlay.classList.add('overlay', 'error-overlay');
  errorOverlay.style.background = 'transparent';

  const modalError = document.createElement('div');
  modalError.style.width = '350px';
  modalError.style.height = '350px';
  modalError.style.position = 'absolute';
  modalError.style.background = '#F2F0F9';
  modalError.style.display = 'flex';
  modalError.style.flexDirection = 'column';
  modalError.style.alignItems = 'center';
  modalError.style.paddingTop = '103px';
  modalError.style.boxShadow = '0px 0px 6px rgba(0, 0, 0, 0.25)';

  const modalErrorBtn = document.createElement('button');
  modalErrorBtn.classList.add('modal__error');
  modalErrorBtn.style.backgroundImage = 'url(./img/close.svg)';
  modalErrorBtn.style.width = '24px';
  modalErrorBtn.style.height = '24px';
  modalErrorBtn.style.position = 'absolute';
  modalErrorBtn.style.top = '20px';
  modalErrorBtn.style.right = '30px';
  modalErrorBtn.style.backgroundColor = 'transparent';
  modalErrorBtn.style.border = 'none';
  modalErrorBtn.style.color = '#6E6893';

  const xMark = document.createElement('p');
  xMark.style.backgroundImage = 'url(./img/error-cross.svg)';
  xMark.style.width = '90px';
  xMark.style.height = '90px';
  xMark.style.marginBottom = '33px';

  const modalErrorText = document.createElement('p');
  modalErrorText.textContent = 'Что-то пошло не так';
  modalErrorText.style.fontWeight = '700';
  modalErrorText.style.fontSize = '18px';
  modalErrorText.style.textTransform = 'uppercase';
  modalErrorText.style.color = '#6E6893';

  modalError.append(modalErrorBtn, xMark, modalErrorText);
  errorOverlay.append(modalError);

  return errorOverlay;
};

export const errorText = (err) => {
  const errorTxt = document.createElement('p');
  errorTxt.textContent = err;
  errorTxt.style.width = '100%';
  errorTxt.style.display = 'flex';
  errorTxt.style.justifyContent = 'center';
  errorTxt.style.alignItems = 'center';
  errorTxt.style.color = '#D80101';
  errorTxt.style.fontWeight = '700';
  errorTxt.style.fontSize = '14px';
  errorTxt.style.textTransform = 'uppercase';
  errorTxt.style.textAlign = 'center';

  return errorTxt;
};
