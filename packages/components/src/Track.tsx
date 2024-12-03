'use client'

import { useEffect } from "react";

const Track = () => {

  useEffect(() => {
    console.log('track');
    const isVisited = localStorage.getItem('visited');
    if (isVisited !== null) {
      return;
    }
    localStorage.setItem('visited', 'true');
    // @ts-ignore
    (window.dataLayer || []).push({
      event: 'first_start_loading',
      time: new Date().getTime(),
      is_loaded: true
    })

  }, [])

  return null;
}

export default Track;
