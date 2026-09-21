import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ShoppingBag, Flame } from 'lucide-react';

export const DualSwitcher = ({ className = '' }) => {
  const location = useLocation();
  const isMarketplace = location.pathname.startsWith('/marketplace');
  const isJourney = location.pathname.startsWith('/fitness-journey');

  return (
    <div className={`dual-switcher-nav ${className}`}>
      <NavLink
        to="/marketplace"
        className={`switch-pill ${isMarketplace ? 'active-market' : ''}`}
        title="Switch to FitSphere Marketplace"
      >
        <ShoppingBag size={15} />
        <span>Marketplace</span>
      </NavLink>

      <NavLink
        to="/fitness-journey"
        className={`switch-pill ${isJourney ? 'active-journey' : ''}`}
        title="Switch to FitSphere Fitness Journey"
      >
        <Flame size={15} />
        <span>Fitness Journey</span>
      </NavLink>
    </div>
  );
};
