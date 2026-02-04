import React from 'react';
import { Home, Receipt, HeartPulse, Calendar, Plus } from 'lucide-react';
import { colors } from '../styles/designSystem';
import './BottomNav.css';

function BottomNav({ activeTab, onTabChange }) {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'expenses', label: 'Expenses', icon: Receipt },
    { id: 'health', label: 'Health', icon: HeartPulse },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
  ];

  return (
    <nav className="bottom-nav">
      <div className="nav-content">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              className={`nav-item ${isActive ? 'active' : ''}`}
              onClick={() => onTabChange(item.id)}
              style={{
                color: isActive ? colors.burgundy : colors.taupe,
              }}
            >
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              <span className="nav-label">{item.label}</span>
            </button>
          );
        })}
        <button
          className="nav-fab"
          style={{ backgroundColor: colors.burgundy }}
        >
          <Plus size={20} color="white" />
        </button>
      </div>
    </nav>
  );
}

export default BottomNav;