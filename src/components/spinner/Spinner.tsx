import type React from 'react';
import './Spinner.css';

export const Spinner: React.FC = () => (
  <div className="spinner-overlay">
    <div className="spinner" />
  </div>
);
