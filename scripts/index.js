import {totalPricePage} from './modules/priceCalcs.js';
import {httpRequest} from './modules/data.js';
import {renderGoods} from './modules/render.js';
import {modalEvents, tbodyEvents, panelEvents} from './modules/events.js';
import './modules/data.js';


export const serverAddress = 'https://hidden-castle-31466.herokuapp.com/api';

{
  const init = () => {
    httpRequest(`${serverAddress}/goods`, {
      method: 'GET',
      callback: renderGoods,
    });
    tbodyEvents();
    totalPricePage();
    modalEvents();
    panelEvents();
  };
  init();
}
