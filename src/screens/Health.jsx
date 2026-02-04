import React from 'react';
import { colors } from '../styles/designSystem';
import { Syringe, Pill } from 'lucide-react';

function Health() {
  return (
    <div className="screen" style={{ backgroundColor: colors.light }}>
      <div style={{ padding: '24px', paddingTop: '8px' }}>
        <div style={{ marginBottom: '24px' }}>
          <div style={{ color: colors.taupe, fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', marginBottom: '4px' }}>HEALTH RECORD</div>
          <h1 style={{ fontFamily: 'Cormorant Garamond', fontSize: 40, fontWeight: 700, color: colors.charcoal, margin: 0 }}>Midnight Star</h1>
          <p style={{ color: colors.taupe, fontSize: 14, margin: '4px 0 0 0', fontWeight: 500 }}>Dutch Warmblood · 8 years · 16.2hh</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
          <div style={{ background: 'white', borderRadius: 16, padding: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
            <Syringe size={20} color={colors.vet} style={{ marginBottom: 8 }} />
            <div style={{ color: colors.charcoal, fontSize: 28, fontWeight: 700 }}>4 days</div>
            <div style={{ color: colors.taupe, fontSize: 11, fontWeight: 600, marginTop: 4 }}>Until next vaccine</div>
          </div>
          <div style={{ background: 'white', borderRadius: 16, padding: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
            <Pill size={20} color={colors.feed} style={{ marginBottom: 8 }} />
            <div style={{ color: colors.charcoal, fontSize: 28, fontWeight: 700 }}>12 days</div>
            <div style={{ color: colors.taupe, fontSize: 11, fontWeight: 600, marginTop: 4 }}>Dewormer due</div>
          </div>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span style={{ color: colors.taupe, fontSize: 11, fontWeight: 600, letterSpacing: '1.5px' }}>UPCOMING</span>
            <a href="#" style={{ color: colors.burgundy, fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>View all</a>
          </div>
          <div style={{ background: 'white', borderRadius: 16, padding: 20, boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
            <div style={{ color: colors.taupe, fontSize: 12, fontWeight: 500, marginBottom: 4 }}>Vet visit</div>
            <h3 style={{ fontFamily: 'Cormorant Garamond', fontSize: 26, fontWeight: 700, color: colors.charcoal, margin: '4px 0' }}>Annual Vaccination</h3>
            <p style={{ color: colors.taupe, fontSize: 13, margin: 0, fontWeight: 500 }}>March 22, 2024 · 10:00 AM</p>
          </div>
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span style={{ color: colors.taupe, fontSize: 11, fontWeight: 600, letterSpacing: '1.5px' }}>RECENT HISTORY</span>
            <a href="#" style={{ color: colors.burgundy, fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>Full timeline</a>
          </div>
          
          <div style={{ background: 'white', borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', padding: 20, position: 'relative' }}>
            <div style={{
              position: 'absolute',
              left: 20,
              top: 0,
              bottom: 0,
              width: 2,
              backgroundColor: colors.taupe,
              opacity: 0.2,
            }} />

            {[
              { title: 'Dental checkup', detail: 'Mar 10 · Dr. Sarah Mitchell', category: 'Vet', color: colors.vet },
              { title: 'Front shoes replaced', detail: 'Mar 5 · Tom\'s Farrier Services', category: 'Farrier', color: colors.farrier },
              { title: 'Dewormer administered', detail: 'Feb 28 · Equest Pramox', category: 'Meds', color: colors.feed },
              { title: 'Flu & Tetanus vaccine', detail: 'Feb 15 · Equine Health Centre', category: 'Vet', color: colors.vet },
            ].map((item, idx) => (
              <div key={idx} style={{ display: 'flex', gap: 16, marginBottom: idx < 3 ? 24 : 0, position: 'relative' }}>
                <div style={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  backgroundColor: item.color,
                  marginTop: 6,
                  flexShrink: 0,
                  zIndex: 1,
                  position: 'relative',
                }} />
                
                <div style={{ flex: 1 }}>
                  <h4 style={{ color: colors.charcoal, fontSize: 15, fontWeight: 700, margin: '0 0 4px 0' }}>{item.title}</h4>
                  <p style={{ color: colors.taupe, fontSize: 12, margin: 0, fontWeight: 500 }}>{item.detail}</p>
                  <div style={{
                    display: 'inline-block',
                    backgroundColor: item.color,
                    color: 'white',
                    padding: '2px 8px',
                    borderRadius: 8,
                    fontSize: 10,
                    fontWeight: 600,
                    marginTop: 6,
                  }}>
                    {item.category}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 24 }}>
          <div style={{ color: colors.taupe, fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', marginBottom: 12 }}>QUICK ACTIONS</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <button style={{
              background: 'white',
              border: `2px solid ${colors.burgundy}`,
              borderRadius: 12,
              padding: 16,
              cursor: 'pointer',
              color: colors.burgundy,
              fontWeight: 600,
              fontSize: 13,
            }}>Log Vet Visit</button>
            <button style={{
              background: 'white',
              border: `2px solid ${colors.burgundy}`,
              borderRadius: 12,
              padding: 16,
              cursor: 'pointer',
              color: colors.burgundy,
              fontWeight: 600,
              fontSize: 13,
            }}>Add Meds</button>
          </div>
          <button style={{
            width: '100%',
            background: 'white',
            border: `2px solid ${colors.burgundy}`,
            borderRadius: 12,
            padding: 16,
            cursor: 'pointer',
            color: colors.burgundy,
            fontWeight: 600,
            fontSize: 13,
            marginTop: 12,
          }}>Add Note</button>
        </div>
      </div>
    </div>
  );
}

export default Health;