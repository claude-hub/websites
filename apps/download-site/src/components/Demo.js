'use client'

import { useEffect } from "react";

const Test = () => {

  const handleClick = (event) => {
    console.log('====', window.dataLayer);
    (window.dataLayer || []).push({
      event: 'click_fullscreen',
      ecommerce: { value: 'fullscreen' }
    })
  }

  return (
    <div>
      <br />
      <button
        id="click"
        onClick={handleClick}
      >
        Click me 埋点
      </button>
    </div>
  );
}

export default Test
