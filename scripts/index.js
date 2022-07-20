import {totalPricePage} from './modules/priceCalcs.js';
import {httpRequest} from './modules/data.js';
import {renderGoods} from './modules/render.js';
import {modalEvents, removeRow} from './modules/events.js';
import './modules/data.js';


export const URL = 'https://hidden-castle-31466.herokuapp.com/api/goods';

{
  const init = () => {
    httpRequest(URL, {
      method: 'GET',
      callback: renderGoods,
    });
    removeRow();
    totalPricePage();
    modalEvents();
  };
  init();
}
