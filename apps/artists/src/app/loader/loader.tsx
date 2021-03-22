import React from 'react';

import './loader.module.scss';

/* eslint-disable-next-line */
export interface LoaderProps {}

const  Loader = () => {
  return (
    <div>
      <div className="ui active transition visible inverted dimmer">
        <div className="content">
           <div className="ui inverted text loader">Cargando..</div>
        </div>
      </div> 
    </div>
  );
}

export default Loader;


 