import React from 'react';
import { colors } from '../styles/designSystem';
import { Syringe, Pill, Stethoscope } from 'lucide-react';

function Health() {
  return (
    <div className="screen" style={{ backgroundColor: colors.light }}>
      <div style={{ padding: '24px', paddingTop: '8px' }}>
        <div style={{ marginBottom: '24px' }}>
          <div style={{ color: colors.taupe, fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', marginBottom: '4px' }}>HEALTH RECORD</div>
          <h1 style={{ fontFamily: 'Cormorant Garamond', fontSize: 36, fontWeight: 600, color: colors.charcoal, margin: 0 }}>Midnight Star</h1>
          <p style={{ color: colors.taupe, fontSize: 14, margin: '4px 0 0 0' }}>Dutch Warmblood · 8 years · 16.2hh</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
          <div style={{ background: 'white', borderRadius: 16, padding: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
            <Syringe size={20} color={colors.vet} style={{ marginBottom: 8 }} />
            <div style={{ color: colors.charcoal, fontSize: 24, fontWeight: 600 }}>4 days</div>
            <div style={{ color: colors.taupe, fontSize: 11, fontWeight: 500 }}>Until next vaccine</div>
          </div>
          <div style={{ background: 'white', borderRadius: 16, padding: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
            <Pill size={20} color={colors.feed} style={{ marginBottom: 8 }} />
            <div style={{ color: colors.charcoal, fontSize: 24, fontWeight: 600 }}>12 days</div>
            <div style={{ color: colors.taupe, fontSize: 11, fontWeight: 500 }}>Dewormer due</div>
          </div>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span style={{ color: colors.taupe, fontSize: 11, fontWeight: 600, letterSpacing: '1.5px' }}>UPCOMING</span>
            <a href="#" style={{ color: colors.burgundy, fontSize: 13, fontWeight: 500, textDecoration: 'none' }}>View all</a>
          </div>
          <div style={{ background: 'white', borderRadius: 16, padding: 20, boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
            <div style={{ color: colors.taupe, fontSize: 12, fontWeight: 500, marginBottom: 4 }}>Vet visit</div>
            <h3 style={{ fontFamily: 'Cormorant Garamond', fontSize: 22, fontWeight: 600, color: colors.charcoal, margin: '4px 0' }}>Annual Vaccination</h3>
            <p style={{ color: colors.taupe, fontSize: 13, margin: 0 }}>March 22, 2024 · 10:00 AM</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Health;