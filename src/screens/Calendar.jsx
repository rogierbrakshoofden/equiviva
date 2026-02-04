import React from 'react';
import { colors } from '../styles/designSystem';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';

function Calendar() {
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const dates = [18, 19, 20, 21, 22, 23, 24];
  const eventDates = { 20: true, 22: true, 23: true };
  const currentDate = 22;
  const currentTime = 9;

  const events = [
    { time: '10:00', endTime: '11:30', title: 'Annual Vaccination', location: 'Equine Health Centre', color: colors.vet },
    { time: '12:00', endTime: '13:00', title: 'Farrier Appointment', location: 'Home stable', color: colors.farrier },
    { time: '14:00', endTime: '15:00', title: 'Dressage Lesson', location: 'Riding Academy', color: colors.training },
  ];

  const hours = Array.from({ length: 8 }, (_, i) => i + 8);

  return (
    <div className="screen" style={{ backgroundColor: colors.light }}>
      <div style={{ padding: '24px', paddingTop: '8px' }}>
        <div style={{ marginBottom: '24px' }}>
          <div style={{ color: colors.taupe, fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', marginBottom: '2px' }}>MARCH 2024</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontFamily: 'Cormorant Garamond', fontSize: 40, fontWeight: 700, color: colors.charcoal, margin: 0 }}>Friday, March 22</h2>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button style={{ background: `rgba(155,139,126,0.15)`, border: 'none', borderRadius: 18, width: 36, height: 36, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ChevronLeft size={18} color={colors.taupe} />
              </button>
              <button style={{ background: `rgba(155,139,126,0.15)`, border: 'none', borderRadius: 18, width: 36, height: 36, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ChevronRight size={18} color={colors.taupe} />
              </button>
            </div>
          </div>
        </div>

        {/* Calendar Grid */}
        <div style={{
          background: 'white',
          borderRadius: 20,
          padding: '20px',
          marginBottom: '24px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
        }}>
          {/* Day headers */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 8, marginBottom: 16 }}>
            {weekDays.map((day) => (
              <div key={day} style={{ textAlign: 'center', color: colors.taupe, fontSize: 12, fontWeight: 600 }}>
                {day}
              </div>
            ))}
          </div>

          {/* Date grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 8 }}>
            {dates.map((date) => (
              <div
                key={date}
                style={{
                  aspectRatio: '1',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 12,
                  backgroundColor: date === currentDate ? colors.charcoal : 'transparent',
                  color: date === currentDate ? 'white' : colors.charcoal,
                  cursor: 'pointer',
                  position: 'relative',
                  fontSize: 16,
                  fontWeight: 600,
                }}
              >
                {date}
                {eventDates[date] && (
                  <div style={{
                    position: 'absolute',
                    bottom: 4,
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    backgroundColor: colors.burgundy,
                  }} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Timeline Section */}
        <div style={{
          background: 'white',
          borderRadius: 20,
          padding: '20px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, paddingBottom: 16, borderBottom: `1px solid ${colors.taupe}33` }}>
            <span style={{ color: colors.charcoal, fontSize: 15, fontWeight: 700 }}>Today's Schedule</span>
            <span style={{ color: colors.taupe, fontSize: 13, fontWeight: 500 }}>3 events</span>
          </div>

          {/* Time grid */}
          <div style={{ display: 'flex', gap: 12 }}>
            {/* Time labels */}
            <div style={{ width: 45, flexShrink: 0 }}>
              {hours.map((hour) => (
                <div
                  key={hour}
                  style={{
                    height: 80,
                    display: 'flex',
                    alignItems: 'flex-start',
                    color: colors.taupe,
                    fontSize: 11,
                    fontWeight: 500,
                  }}
                >
                  {hour === 12 ? '12 PM' : hour > 12 ? `${hour - 12} PM` : `${hour} AM`}
                </div>
              ))}
            </div>

            {/* Timeline with events */}
            <div style={{ flex: 1, position: 'relative' }}>
              {/* Hour dividers */}
              {hours.map((hour) => (
                <div
                  key={`divider-${hour}`}
                  style={{
                    height: 80,
                    borderBottom: `1px solid ${colors.taupe}22`,
                  }}
                />
              ))}

              {/* NOW indicator */}
              <div
                style={{
                  position: 'absolute',
                  top: `${(currentTime - 8) * 80 + 20}px`,
                  left: 0,
                  right: 0,
                  height: 2,
                  backgroundColor: colors.burgundy,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <div style={{
                  position: 'absolute',
                  left: -8,
                  width: 14,
                  height: 14,
                  borderRadius: '50%',
                  backgroundColor: colors.burgundy,
                  border: '3px solid white',
                  boxShadow: '0 2px 8px rgba(139,64,73,0.3)',
                }} />
                <div style={{
                  position: 'absolute',
                  right: 8,
                  background: colors.burgundy,
                  color: 'white',
                  padding: '2px 10px',
                  borderRadius: 12,
                  fontSize: 10,
                  fontWeight: 700,
                }}>
                  NOW
                </div>
              </div>

              {/* Events */}
              {events.map((event, idx) => {
                const [startHour, startMin] = event.time.split(':').map(Number);
                const topPosition = (startHour - 8) * 80 + (startMin / 60) * 80;

                return (
                  <div
                    key={idx}
                    style={{
                      position: 'absolute',
                      top: `${topPosition}px`,
                      left: 0,
                      right: 0,
                      backgroundColor: event.color,
                      borderRadius: 12,
                      padding: 14,
                      color: 'white',
                      height: 60,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      marginRight: 12,
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    }}
                  >
                    <div>
                      <div style={{ fontSize: 10, fontWeight: 500, opacity: 0.85 }}>{event.time} - {event.endTime}</div>
                      <h4 style={{ margin: '4px 0 0 0', fontSize: 14, fontWeight: 600 }}>{event.title}</h4>
                    </div>
                    <div style={{ display: 'flex', gap: 6, alignItems: 'center', fontSize: 11, opacity: 0.9 }}>
                      <MapPin size={12} />
                      <span>{event.location}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calendar;
