import React from 'react';
import { colors } from '../styles/designSystem';
import { ArrowLeft, Settings, Camera, Bell, CreditCard, Download, Info, LogOut } from 'lucide-react';

function Profile() {
  return (
    <div className="screen" style={{ backgroundColor: colors.light }}>
      <div style={{ padding: '24px', paddingTop: '8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
          <button style={{ background: `rgba(155,139,126,0.15)`, border: 'none', borderRadius: 20, width: 40, height: 40, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ArrowLeft size={20} color={colors.charcoal} />
          </button>
          <span style={{ color: colors.charcoal, fontSize: 17, fontWeight: 700 }}>Profile</span>
          <button style={{ background: `rgba(155,139,126,0.15)`, border: 'none', borderRadius: 20, width: 40, height: 40, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
          <h2 style={{ fontFamily: 'Cormorant Garamond', fontSize: 32, fontWeight: 700, color: colors.charcoal, margin: '0 0 4px' }}>Emma Richardson</h2>
          <p style={{ color: colors.taupe, fontSize: 14, margin: 0 }}>emma.richardson@email.com</p>
          <p style={{ color: colors.taupe, fontSize: 12, margin: '4px 0 0' }}>Member since January 2023</p>
        </div>

        <div style={{ background: 'white', borderRadius: 16, overflow: 'hidden', marginBottom: '28px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
          <button style={{ width: '100%', padding: '0 16px', height: 56, display: 'flex', gap: 14, alignItems: 'center', border: 'none', background: 'none', cursor: 'pointer', borderBottom: `1px solid ${colors.taupe}33` }}>
            <div style={{ background: `rgba(139,64,73,0.1)`, width: 36, height: 36, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.burgundy, fontSize: 18 }}>
              ✏️
            </div>
            <div style={{ flex: 1, textAlign: 'left' }}>
              <div style={{ color: colors.charcoal, fontSize: 15, fontWeight: 600 }}>Edit Profile</div>
              <div style={{ color: colors.taupe, fontSize: 12, fontWeight: 500 }}>Name, email, phone</div>
            </div>
          </button>
          <button style={{ width: '100%', padding: '0 16px', height: 56, display: 'flex', gap: 14, alignItems: 'center', border: 'none', background: 'none', cursor: 'pointer' }}>
            <div style={{ background: `rgba(74,95,127,0.1)`, width: 36, height: 36, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Bell size={18} color={colors.farrier} />
            </div>
            <div style={{ flex: 1, textAlign: 'left' }}>
              <div style={{ color: colors.charcoal, fontSize: 15, fontWeight: 600 }}>Notifications</div>
              <div style={{ color: colors.taupe, fontSize: 12, fontWeight: 500 }}>Reminders, alerts, updates</div>
            </div>
          </button>
        </div>

        <div style={{ marginBottom: '28px' }}>
          <div style={{ color: colors.taupe, fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', marginBottom: '14px' }}>MY HORSES</div>
          <div style={{ background: 'white', borderRadius: 16, padding: 16, boxShadow: '0 4px 20px rgba(0,0,0,0.06)', marginBottom: 12 }}>
            <div style={{ display: 'flex', gap: 16 }}>
              <div style={{ width: 72, height: 72, borderRadius: 12, backgroundColor: colors.sand, flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <h4 style={{ fontFamily: 'Cormorant Garamond', fontSize: 24, fontWeight: 700, color: colors.charcoal, margin: 0 }}>Midnight Star</h4>
                <p style={{ color: colors.taupe, fontSize: 13, margin: '4px 0 0', fontWeight: 500 }}>Dutch Warmblood</p>
                <div style={{ color: colors.taupe, fontSize: 12, marginTop: 4, fontWeight: 500 }}>8 years · 16.2hh</div>
              </div>
            </div>
          </div>
          <button style={{
            width: '100%',
            padding: '14px',
            background: 'white',
            border: `2px dashed ${colors.taupe}66`,
            borderRadius: 14,
            display: 'flex',
            gap: 8,
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            color: colors.taupe,
            fontSize: 14,
            fontWeight: 600,
          }}>
            <span style={{ fontSize: 18 }}>+</span>
            Add Another Horse
          </button>
        </div>

        <div style={{ marginBottom: '28px' }}>
          <div style={{ color: colors.taupe, fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', marginBottom: 12 }}>APP SETTINGS</div>
          <div style={{ background: 'white', borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
            <button style={{ width: '100%', padding: '0 16px', height: 56, display: 'flex', gap: 14, alignItems: 'center', border: 'none', background: 'none', cursor: 'pointer', borderBottom: `1px solid ${colors.taupe}33` }}>
              <CreditCard size={18} color={colors.farrier} />
              <div style={{ flex: 1, textAlign: 'left' }}>
                <div style={{ color: colors.charcoal, fontSize: 15, fontWeight: 600 }}>Subscription</div>
                <div style={{ color: colors.taupe, fontSize: 12, fontWeight: 500 }}>Premium · Renews Apr 15</div>
              </div>
            </button>
            <button style={{ width: '100%', padding: '0 16px', height: 56, display: 'flex', gap: 14, alignItems: 'center', border: 'none', background: 'none', cursor: 'pointer', borderBottom: `1px solid ${colors.taupe}33` }}>
              <Download size={18} color={colors.farrier} />
              <div style={{ flex: 1, textAlign: 'left' }}>
                <div style={{ color: colors.charcoal, fontSize: 15, fontWeight: 600 }}>Export Data</div>
                <div style={{ color: colors.taupe, fontSize: 12, fontWeight: 500 }}>Download your records</div>
              </div>
            </button>
            <button style={{ width: '100%', padding: '0 16px', height: 56, display: 'flex', gap: 14, alignItems: 'center', border: 'none', background: 'none', cursor: 'pointer' }}>
              <Info size={18} color={colors.farrier} />
              <div style={{ flex: 1, textAlign: 'left' }}>
                <div style={{ color: colors.charcoal, fontSize: 15, fontWeight: 600 }}>Help & Support</div>
                <div style={{ color: colors.taupe, fontSize: 12, fontWeight: 500 }}>FAQ, contact us</div>
              </div>
            </button>
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
          fontWeight: 700,
        }}>
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default Profile;