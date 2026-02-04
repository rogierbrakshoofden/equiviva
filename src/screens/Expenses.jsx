import React from 'react';
import { colors } from '../styles/designSystem';
import { ChevronLeft, ChevronRight, Sliders, TrendingUp } from 'lucide-react';

function Expenses() {
  return (
    <div className="screen" style={{ backgroundColor: colors.light }}>
      <div style={{ padding: '24px', paddingTop: '8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <button style={{
              background: `rgba(155,139,126,0.15)`,
              border: 'none',
              borderRadius: 18,
              width: 36,
              height: 36,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: colors.taupe,
            }}>
              <ChevronLeft size={18} />
            </button>
            <span style={{ color: colors.charcoal, fontSize: 18, fontWeight: 700 }}>March 2024</span>
            <button style={{
              background: `rgba(155,139,126,0.15)`,
              border: 'none',
              borderRadius: 18,
              width: 36,
              height: 36,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: colors.taupe,
            }}>
              <ChevronRight size={18} />
            </button>
          </div>
          <button style={{
            background: `rgba(155,139,126,0.15)`,
            border: 'none',
            borderRadius: '20px',
            padding: '8px 14px',
            display: 'flex',
            gap: '8px',
            alignItems: 'center',
            cursor: 'pointer',
            color: colors.taupe,
            fontSize: 13,
            fontWeight: 500,
          }}>
            <Sliders size={16} />
            Filter
          </button>
        </div>

        <div style={{ marginBottom: '32px' }}>
          <div style={{ color: colors.taupe, fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', marginBottom: '4px' }}>TOTAL SPENT</div>
          <div style={{ color: colors.charcoal, fontSize: 56, fontWeight: 700 }}>€2,845</div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '8px' }}>
            <TrendingUp size={14} color={colors.vet} />
            <span style={{ color: colors.taupe, fontSize: 13, fontWeight: 500 }}>+12% vs last month</span>
          </div>
        </div>

        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '20px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
          marginBottom: 24,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
            <span style={{ color: colors.charcoal, fontSize: 15, fontWeight: 700 }}>By Category</span>
            <a href="#" style={{ color: colors.burgundy, fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>Details</a>
          </div>
          
          {[
            { name: 'Veterinary', amount: '€980', color: colors.vet, width: '34%' },
            { name: 'Farrier', amount: '€720', color: colors.farrier, width: '25%' },
            { name: 'Feed & Supplements', amount: '€645', color: colors.feed, width: '23%' },
            { name: 'Training', amount: '€500', color: colors.training, width: '18%' },
          ].map((cat, i) => (
            <div key={i} style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flex: 1 }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: cat.color }} />
                  <span style={{ color: colors.charcoal, fontSize: 14, fontWeight: 600 }}>{cat.name}</span>
                </div>
                <span style={{ color: colors.charcoal, fontSize: 14, fontWeight: 700, fontFamily: 'JetBrains Mono' }}>{cat.amount}</span>
              </div>
              <div style={{ height: 6, backgroundColor: `${cat.color}33`, borderRadius: 3, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: cat.width, backgroundColor: cat.color, borderRadius: 3 }} />
              </div>
            </div>
          ))}
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span style={{ color: colors.taupe, fontSize: 11, fontWeight: 600, letterSpacing: '1.5px' }}>CATEGORY FILTER</span>
          </div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 24, overflowX: 'auto', paddingBottom: 8 }}>
            {['All', 'Vet', 'Farrier', 'Feed', 'Training'].map((pill, i) => (
              <button
                key={i}
                style={{
                  padding: '8px 16px',
                  borderRadius: 20,
                  border: 'none',
                  background: i === 0 ? colors.charcoal : 'white',
                  color: i === 0 ? 'white' : colors.taupe,
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  boxShadow: i === 0 ? 'none' : '0 2px 8px rgba(0,0,0,0.06)',
                }}
              >
                {pill}
              </button>
            ))}
          </div>

          <div style={{ color: colors.taupe, fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', marginBottom: '16px' }}>RECENT TRANSACTIONS</div>
          <div style={{
            background: 'white',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
          }}>
            {[
              { vendor: 'Equine Veterinary Clinic', date: 'Mar 18', note: 'Annual checkup', amount: '€320', color: colors.vet },
              { vendor: 'Farrier Services', date: 'Mar 15', note: 'Front shoes', amount: '€180', color: colors.farrier },
              { vendor: 'Premium Feed Co', date: 'Mar 14', note: 'Monthly delivery', amount: '€125', color: colors.feed },
              { vendor: 'Riding Academy', date: 'Mar 12', note: 'Dressage lesson', amount: '€85', color: colors.training },
            ].map((tx, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                padding: '16px',
                borderBottom: i < 3 ? `1px solid ${colors.taupe}22` : 'none',
              }}>
                <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: tx.color, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <h4 style={{ color: colors.charcoal, fontSize: 14, fontWeight: 700, margin: 0 }}>{tx.vendor}</h4>
                  <p style={{ color: colors.taupe, fontSize: 12, margin: '2px 0 0 0', fontWeight: 500 }}>{tx.date} · {tx.note}</p>
                </div>
                <div style={{ color: colors.charcoal, fontSize: 14, fontWeight: 700, fontFamily: 'JetBrains Mono' }}>{tx.amount}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Expenses;