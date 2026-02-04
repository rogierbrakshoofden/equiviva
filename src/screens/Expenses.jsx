import React from 'react';
import { colors } from '../styles/designSystem';
import { ChevronLeft, ChevronRight, Sliders, TrendingUp } from 'lucide-react';

function Expenses() {
  return (
    <div className="screen" style={{ backgroundColor: colors.light }}>
      <div style={{ padding: '24px', paddingTop: '8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <ChevronLeft size={20} color={colors.taupe} />
            <span style={{ color: colors.charcoal, fontSize: 16, fontWeight: 600 }}>March 2024</span>
            <ChevronRight size={20} color={colors.taupe} />
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
          }}>
            <Sliders size={16} />
            Filter
          </button>
        </div>

        <div style={{ marginBottom: '32px' }}>
          <div style={{ color: colors.taupe, fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', marginBottom: '4px' }}>TOTAL SPENT</div>
          <div style={{ color: colors.charcoal, fontSize: 56, fontWeight: 600 }}>€2,845</div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '8px' }}>
            <TrendingUp size={14} color={colors.vet} />
            <span style={{ color: colors.taupe, fontSize: 13 }}>+12% vs last month</span>
          </div>
        </div>

        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '20px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
            <span style={{ color: colors.charcoal, fontSize: 15, fontWeight: 600 }}>By Category</span>
            <a href="#" style={{ color: colors.burgundy, fontSize: 13, fontWeight: 500, textDecoration: 'none' }}>Details</a>
          </div>
          
          {[
            { name: 'Veterinary', amount: '€980', color: colors.vet, width: '34%' },
            { name: 'Farrier', amount: '€720', color: colors.farrier, width: '25%' },
            { name: 'Feed & Supplements', amount: '€645', color: colors.feed, width: '23%' },
            { name: 'Training', amount: '€500', color: colors.training, width: '18%' },
          ].map((cat, i) => (
            <div key={i} style={{ marginBottom: '14px', lastChild: { marginBottom: 0 } }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flex: 1 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: cat.color }} />
                  <span style={{ color: colors.charcoal, fontSize: 14, fontWeight: 500 }}>{cat.name}</span>
                </div>
                <span style={{ color: colors.charcoal, fontSize: 14, fontWeight: 600, fontFamily: 'JetBrains Mono' }}>{cat.amount}</span>
              </div>
              <div style={{ height: 6, backgroundColor: `${cat.color}33`, borderRadius: 3, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: cat.width, backgroundColor: cat.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Expenses;