import React, { useState } from 'react';
import Home from './screens/Home';
import Expenses from './screens/Expenses';
import Health from './screens/Health';
import Calendar from './screens/Calendar';
import Profile from './screens/Profile';
import BottomNav from './components/BottomNav';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('home');

  const renderScreen = () => {
    switch (activeTab) {
      case 'home':
        return <Home />;
      case 'expenses':
        return <Expenses />;
      case 'health':
        return <Health />;
      case 'calendar':
        return <Calendar />;
      case 'profile':
        return <Profile />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="app">
      <div className="screen-container">
        {renderScreen()}
      </div>
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}

export default App;
