import React from 'react';
import './loading.css';

export default function RLoader() {
  return (
    <div className="mx-auto max-w-7xl flex items-center justify-center h-screen">
      <div className="container">
        <div className="loading" />
        <div className="loading" />
        <div className="loading" />
        <div className="loading" />
        <div className="loading" />
      </div>
    </div>
  );
}
