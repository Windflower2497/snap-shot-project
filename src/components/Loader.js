import React from 'react';
import loader from './loader.gif';

const Loader = () => {
  return (
    <div className="loader">
        <img src={loader} alt="loader" height="150px"/>
    </div>
  );
}

export default Loader;
