import * as React from 'react';

const style = require("./hello.style.scss");

export const HelloComponent = () => {
  return (
    <h2 className={style.header}>Hello component !</h2>
  );
}
