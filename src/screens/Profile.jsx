import React from 'react';
import { colors } from '../styles/designSystem';
import { ArrowLeft, Settings, Camera, Bell, CreditCard, Download, Info, LogOut } from 'lucide-react';

function Profile() {
  return (
    <div className="screen" style={{ backgroundColor: colors.light }}>
      <div style={{ padding: '24px', paddingTop: '8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
          <button style={{ background: `rgba(155,139,126,0.15)`, border: 'none', borderRadius: 20, width: 40, height: 40, cursor: 'pointer' }}>
            <ArrowLeft size={20} color={colors.charcoal} />
          </button>
          <span style={{ color: colors.charcoal, fontSize: 17, fontWeight: 600 }}>Profile</span>
          <button style={{ background: `rgba(155,139,126,0.15)`, border: 'none', borderRadius: 20, width: 40, height: 40, cursor: 'pointer' }}>
            <Settings size={20} color={colors.charcoal} />
          </button>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{ width: 100, height: 100, borderRadius: 50, backgroundColor: colors.sand, margin: '0 auto 16px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 40 }}>👤</span>
            <button style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              background: colors.burgundy,
              border: 'none',
              borderRadius: '50%',
              width: 32,
              height: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}>
              <Camera size={16} color="white" />
            </button>
          </div>
          <h2 style={{ fontFamily: 'Cormorant Garamond', fontSize: 28, fontWeight: 600, color: colors.charcoal, margin: '0 0 4px' }}>Emma Richardson</h2>
          <p style={{ color: colors.taupe, fontSize: 14, margin: 0 }}>emma.richardson@email.com</p>
          <p style={{ color: colors.taupe, fontSize: 12, margin: '4px 0 0' }}>Member since January 2023</p>
        </div>

        <div style={{ background: 'white', borderRadius: 16, overflow: 'hidden', marginBottom: '28px' }}>
          <button style={{ width: '100%', padding: '0 16px', height: 56, display: 'flex', gap: 14, alignItems: 'center', border: 'none', background: 'none', cursor: 'pointer', borderBottom: `1px solid ${colors.taupe}33` }}>
            <div style={{ background: `rgba(139,64,73,0.1)`, width: 36, height: 36, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ color: colors.burgundy }}>✏️</div>
            </div>
            <div style={{ flex: 1, textAlign: 'left' }}>
              <div style={{ color: colors.charcoal, fontSize: 15, fontWeight: 500 }}>Edit Profile</div>
              <div style={{ color: colors.taupe, fontSize: 12 }}>Name, email, phone</div>
            </div>
          </button>
          <button style={{ width: '100%', padding: '0 16px', height: 56, display: 'flex', gap: 14, alignItems: 'center', border: 'none', background: 'none', cursor: 'pointer' }}>
            <div style={{ background: `rgba(74,95,127,0.1)`, width: 36, height: 36, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Bell size={18} color={colors.farrier} />
            </div>
            <div style={{ flex: 1, textAlign: 'left' }}>
              <div style={{ color: colors.charcoal, fontSize: 15, fontWeight: 500 }}>Notifications</div>
              <div style={{ color: colors.taupe, fontSize: 12 }}>Reminders, alerts, updates</div>
            </div>
          </button>
        </div>

        <div style={{ marginBottom: '28px' }}>
          <div style={{ color: colors.taupe, fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', marginBottom: '14px' }}>MY HORSES</div>
          <div style={{ background: 'white', borderRadius: 16, padding: 16, boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
            <div style={{ display: 'flex', gap: 16 }}>
              <div style={{ width: 72, height: 72, borderRadius: 12, backgroundColor: colors.sand, flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <h4 style={{ fontFamily: 'Cormorant Garamond', fontSize: 20, fontWeight: 600, color: colors.charcoal, margin: 0 }}>Midnight Star</h4>
                <p style={{ color: colors.taupe, fontSize: 13, margin: '4px 0 0' }}>Dutch Warmblood</p>
                <div style={{ color: colors.taupe, fontSize: 12, marginTop: 4 }}>8 years · 16.2hh</div>
              </div>
            </div>
          </div>
        </div>

        <button style={{
          width: '100%',
          padding: '16px',
          background: `rgba(139,64,73,0.1)`,
          border: 'none',
          borderRadius: 14,
          display: 'flex',
          gap: 8,
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          color: colors.burgundy,
          fontSize: 15,
          fontWeight: 600,
          marginBottom: '32px',
        }}>
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default Profile;