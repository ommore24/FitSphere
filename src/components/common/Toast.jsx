import React from 'react';
import { useCart } from '../../context/CartContext';
import { CheckCircle, Info } from 'lucide-react';

export const Toast = () => {
  const { toast } = useCart();
  if (!toast) return null;

  const isSuccess = toast.type === 'success';

  return (
    <div className={`toast-fixed ${isSuccess ? 'toast-success' : 'toast-info'}`}>
      {isSuccess ? (
        <CheckCircle size={18} color="var(--accent-primary)" />
      ) : (
        <Info size={18} color="var(--accent-cyan)" />
      )}
      <span>{toast.message}</span>
    </div>
  );
};
