import React from 'react';
import { colors } from '../styles/designSystem';
import './Home.css';

function Home() {
  return (
    <div className="screen home-screen">
      <div className="hero" style={{ backgroundImage: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.5) 100%)' }}>
        <div className="status-bar">
          <span className="time">9:41</span>
          <div className="status-icons"></div>
        </div>
        <div className="hero-content">
          <h1 style={{ color: 'white' }}>Midnight Star</h1>
          <p style={{ color: 'rgba(255,255,255,0.8)' }}>Dutch Warmblood · 8 years</p>
        </div>
      </div>

      <div className="content-area">
        <section className="upcoming-section">
          <div className="section-header">
            <span className="section-label" style={{ color: colors.taupe }}>UPCOMING</span>
            <a href="#" style={{ color: colors.burgundy }}>View all</a>
          </div>
          
          <div className="metric-card">
            <div className="metric-left">
              <div className="metric-label" style={{ color: colors.taupe }}>Next farrier visit</div>
              <div className="metric-value" style={{ color: colors.charcoal }}>4 days</div>
            </div>
            <div className="metric-icon" style={{ backgroundColor: colors.farrier }}>⚒</div>
          </div>

          <div className="small-cards">
            <div className="small-card" style={{ borderColor: `${colors.vet}33` }}>
              <div style={{ backgroundColor: colors.vet, width: 8, height: 8, borderRadius: '50%' }}></div>
              <div>
                <div style={{ color: colors.taupe, fontSize: 12 }}>Vet visit</div>
                <div style={{ color: colors.charcoal, fontSize: 20, fontWeight: 600 }}>12 days</div>
              </div>
            </div>
            <div className="small-card" style={{ borderColor: `${colors.feed}33` }}>
              <div style={{ backgroundColor: colors.feed, width: 8, height: 8, borderRadius: '50%' }}></div>
              <div>
                <div style={{ color: colors.taupe, fontSize: 12 }}>Supplements</div>
                <div style={{ color: colors.charcoal, fontSize: 20, fontWeight: 600 }}>Today</div>
              </div>
            </div>
          </div>
        </section>

        <section className="expense-section">
          <div className="section-header">
            <div>
              <div className="section-label" style={{ color: colors.taupe }}>MARCH EXPENSES</div>
              <div style={{ color: colors.charcoal, fontSize: 36, fontWeight: 600, marginTop: 4 }}>€2,845</div>
            </div>
            <div style={{ color: colors.taupe, fontSize: 13 }}>+12% vs Feb</div>
          </div>

          <div className="tx-list">
            <div className="tx-item">
              <div style={{ backgroundColor: colors.farrier, width: 10, height: 10, borderRadius: '50%' }}></div>
              <div className="tx-content">
                <div style={{ color: colors.charcoal, fontWeight: 500 }}>Farrier Services</div>
                <div style={{ color: colors.taupe, fontSize: 12 }}>Mar 15</div>
              </div>
              <div style={{ color: colors.charcoal, fontWeight: 600 }}>€180</div>
            </div>
            <div className="tx-item">
              <div style={{ backgroundColor: colors.feed, width: 10, height: 10, borderRadius: '50%' }}></div>
              <div className="tx-content">
                <div style={{ color: colors.charcoal, fontWeight: 500 }}>Premium Feed Co</div>
                <div style={{ color: colors.taupe, fontSize: 12 }}>Mar 14</div>
              </div>
              <div style={{ color: colors.charcoal, fontWeight: 600 }}>€125</div>
            </div>
            <div className="tx-item">
              <div style={{ backgroundColor: colors.vet, width: 10, height: 10, borderRadius: '50%' }}></div>
              <div className="tx-content">
                <div style={{ color: colors.charcoal, fontWeight: 500 }}>Equine Veterinary</div>
                <div style={{ color: colors.taupe, fontSize: 12 }}>Mar 12</div>
              </div>
              <div style={{ color: colors.charcoal, fontWeight: 600 }}>€320</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
