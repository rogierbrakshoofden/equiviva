import React from 'react';
import { colors } from '../styles/designSystem';
import './Home.css';

function Home() {
  return (
    <div className="screen home-screen">
      <div className="hero" style={{ backgroundImage: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.5) 100%)' }}>
        <div className="status-bar">
          <span className="time">9:41</span>
          <div className="status-icons">
            <span>📶</span>
            <span>📡</span>
            <span>🔋</span>
          </div>
        </div>
        <div className="hero-content">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h1 style={{ color: 'white', fontSize: 48, fontWeight: 700, margin: 0 }}>Midnight Star</h1>
              <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: 14, margin: '4px 0 0 0' }}>Dutch Warmblood · 8 years · 16.2hh</p>
            </div>
            <button style={{
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              borderRadius: 24,
              width: 40,
              height: 40,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: 20,
            }}>👤</button>
          </div>
        </div>
      </div>

      <div className="content-area">
        <section className="upcoming-section">
          <div className="section-header">
            <span className="section-label" style={{ color: colors.taupe }}>UPCOMING</span>
            <a href="#" style={{ color: colors.burgundy, fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>View all</a>
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
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <div style={{ backgroundColor: colors.vet, width: 10, height: 10, borderRadius: '50%' }}></div>
                <div>
                  <div style={{ color: colors.taupe, fontSize: 12, fontWeight: 500 }}>Vet visit</div>
                  <div style={{ color: colors.charcoal, fontSize: 24, fontWeight: 700 }}>12 days</div>
                </div>
              </div>
            </div>
            <div className="small-card" style={{ borderColor: `${colors.feed}33` }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <div style={{ backgroundColor: colors.feed, width: 10, height: 10, borderRadius: '50%' }}></div>
                <div>
                  <div style={{ color: colors.taupe, fontSize: 12, fontWeight: 500 }}>Supplements</div>
                  <div style={{ color: colors.charcoal, fontSize: 24, fontWeight: 700 }}>Today</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="expense-section">
          <div className="section-header">
            <div>
              <div className="section-label" style={{ color: colors.taupe }}>MARCH EXPENSES</div>
              <div style={{ color: colors.charcoal, fontSize: 48, fontWeight: 700, marginTop: 4 }}>€2,845</div>
            </div>
            <div style={{ color: colors.taupe, fontSize: 13, fontWeight: 500 }}>+12% vs Feb</div>
          </div>

          <div className="tx-list">
            <div className="tx-item">
              <div style={{ backgroundColor: colors.farrier, width: 12, height: 12, borderRadius: '50%', flexShrink: 0 }}></div>
              <div className="tx-content">
                <div style={{ color: colors.charcoal, fontWeight: 600, fontSize: 14 }}>Farrier Services</div>
                <div style={{ color: colors.taupe, fontSize: 12 }}>Mar 15</div>
              </div>
              <div style={{ color: colors.charcoal, fontWeight: 700, fontSize: 14 }}>€180</div>
            </div>
            <div className="tx-item">
              <div style={{ backgroundColor: colors.feed, width: 12, height: 12, borderRadius: '50%', flexShrink: 0 }}></div>
              <div className="tx-content">
                <div style={{ color: colors.charcoal, fontWeight: 600, fontSize: 14 }}>Premium Feed Co</div>
                <div style={{ color: colors.taupe, fontSize: 12 }}>Mar 14</div>
              </div>
              <div style={{ color: colors.charcoal, fontWeight: 700, fontSize: 14 }}>€125</div>
            </div>
            <div className="tx-item">
              <div style={{ backgroundColor: colors.vet, width: 12, height: 12, borderRadius: '50%', flexShrink: 0 }}></div>
              <div className="tx-content">
                <div style={{ color: colors.charcoal, fontWeight: 600, fontSize: 14 }}>Equine Veterinary</div>
                <div style={{ color: colors.taupe, fontSize: 12 }}>Mar 12</div>
              </div>
              <div style={{ color: colors.charcoal, fontWeight: 700, fontSize: 14 }}>€320</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
