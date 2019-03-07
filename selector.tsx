import '../../shared/custom-module.css';
import './style.less';
import { debounce } from '../../../common/utils/debounce';
import CountrySelector from './components/CountrySelector';
import React from 'react';
import ReactDom from 'react-dom';
import { KCdata } from './components/KCdata';

const updateDataInCloud = debounce((data: KCdata) => {
  CustomElement.setValue(JSON.stringify(data));
}, 300);

CustomElement.init((element, _context) => {
  const data = element.value ? JSON.parse(element.value) : null;
  let kcData: KCdata = null;

  if (data) {
    kcData = {
      countryCode: data.countryCode,
      stateCode: data.stateCode
    };
  }

  const components = (
    <CountrySelector data={kcData} disabled={element.disabled} customElementApi={CustomElement} />
  );

  ReactDom.render(components, document.querySelector('#reactapp'));
});
CustomElement.setHeight(250);


