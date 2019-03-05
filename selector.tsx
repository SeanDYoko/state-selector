import '../../shared/custom-module.css';
import './style.less';
import { debounce } from '../../../common/utils/debounce';
import CountrySelector from './components/CountrySelector'
import React from 'react'
import ReactDom from 'react-dom'
import KCdata from './components/KCdata';

const updateDataInCloud = debounce((data: KCdata) => {
  CustomElement.setValue(JSON.stringify(data));
}, 300);

CustomElement.init((element, _context) => {
  const kcData = Object.assign(new KCdata(), JSON.parse(element.value));
  
  const components = (
    <CountrySelector data={kcData} setData={updateDataInCloud} />
  );
  
  ReactDom.render(components, document.querySelector('#reactapp'));
});
CustomElement.setHeight(300);


