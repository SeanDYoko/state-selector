/*global CustomElement*/
import React from "react";
import ReactDom from "react-dom";
import CountrySelector from "./components/CountrySelector";
import "./custom-element.css";
import "./style.css";

CustomElement.init((element, _context) => {
  const data = element.value ? JSON.parse(element.value) : null;
  let kcData = null;

  if (data) {
    kcData = {
      countryCode: data.countryCode,
      stateCode: data.stateCode
    };
  }

  const components = (
    <CountrySelector
      data={kcData}
      disabled={element.disabled}
      customElementApi={CustomElement}
    />
  );

  ReactDom.render(components, document.getElementById("root"));
});

CustomElement.setHeight(250);
