import React from 'react'
import { Link } from 'react-router-dom'
import icon from '../../../assets/icon.svg'


const Hello = () => {
  return (
    <div>
      <div className="Hello">
        <img width="200px" alt="icon" src={icon} />
      </div>
      <h1>My first desktop app</h1>
      <div className="Hello">
        <Link to='/photos'>
          <button type="button">
            <span role="img" aria-label="camera">
              📸
            </span>
           Photos
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Hello