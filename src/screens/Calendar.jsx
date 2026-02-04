import React from 'react';
import { colors } from '../styles/designSystem';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';

function Calendar() {
  return (
    <div className="screen" style={{ backgroundColor: colors.light }}>
      <div style={{ padding: '24px', paddingTop: '8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <div style={{ color: colors.taupe, fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', marginBottom: '2px' }}>MARCH 2024</div>
            <h2 style={{ fontFamily: 'Cormorant Garamond', fontSize: 28, fontWeight: 600, color: colors.charcoal, margin: 0 }}>Friday, March 22</h2>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button style={{ background: `rgba(155,139,126,0.15)`, border: 'none', borderRadius: 18, width: 36, height: 36, cursor: 'pointer' }}>
              <ChevronLeft size={18} color={colors.taupe} />
            </button>
            <button style={{ background: `rgba(155,139,126,0.15)`, border: 'none', borderRadius: 18, width: 36, height: 36, cursor: 'pointer' }}>
              <ChevronRight size={18} color={colors.taupe} />
            </button>
          </div>
        </div>

        <div style={{
          background: 'white',
          borderRadius: 20,
          padding: '20px 0',
          boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
          marginBottom: '24px',
        }}>
          <div style={{ padding: '0 20px', display: 'flex', justifyContent: 'space-between', marginBottom: '16px', borderBottom: `1px solid ${colors.taupe}33` }}>
            <span style={{ color: colors.charcoal, fontSize: 15, fontWeight: 600, paddingBottom: 16 }}>Today\'s Schedule</span>
            <span style={{ color: colors.taupe, fontSize: 13, fontWeight: 500 }}>3 events</span>
          </div>

          {[
            { time: '10:00 - 11:30 AM', title: 'Annual Vaccination', location: 'Equine Health Centre', color: colors.vet },
            { time: '12:00 - 1:00 PM', title: 'Farrier Appointment', location: 'Home stable', color: colors.farrier },
            { time: '2:00 - 3:00 PM', title: 'Dressage Lesson', location: 'Riding Academy', color: colors.training },
          ].map((event, i) => (
            <div key={i} style={{
              background: event.color,
              color: 'white',
              borderRadius: 12,
              padding: 14,
              margin: '0 20px 12px',
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
            }}>
              <div style={{ fontSize: 10, fontWeight: 500, opacity: 0.8 }}>{event.time}</div>
              <h4 style={{ margin: 0, fontSize: 15, fontWeight: 600 }}>{event.title}</h4>
              <div style={{ display: 'flex', gap: 6, alignItems: 'center', fontSize: 12, opacity: 0.9 }}>
                <MapPin size={12} />
                <span>{event.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Calendar;