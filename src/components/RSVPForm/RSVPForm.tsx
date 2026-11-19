import React, {useEffect, useRef, useState} from 'react';
import {CalendarPlus, CheckCircle2, Download, RotateCcw} from 'lucide-react';
import {gsap} from '../../animations/gsapConfig';
import {weddingEvents} from '../../data/events';
import {weddingConfig} from '../../data/weddingConfig';
import {useReducedMotion} from '../../hooks/useReducedMotion';
import {useRSVP} from '../../hooks/useRSVP';
import {downloadIcsCalendar, getGoogleCalendarUrl} from '../../utils/calendar';
import {OrnamentalDivider} from '../Ornaments/IndianOrnaments';

const DIETARY_OPTIONS = [
  'Standard Vegetarian',
  'Jain Vegetarian (No Onion/Garlic)',
  'Vegan',
  'Gluten-Free',
  'No Restrictions',
];

export const RSVPForm: React.FC = () => {
  const {submitting, error, submittedRecord, submitRsvp, resetSubmission} = useRSVP();
  const formRef = useRef<HTMLFormElement>(null);
  const confirmRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || submittedRecord || !formRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-rsvp-row]',
        {y: 14, opacity: 0},
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.07,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 84%',
            toggleActions: 'play none none reverse',
          },
        },
      );
    }, formRef);

    return () => ctx.revert();
  }, [reducedMotion, submittedRecord]);

  useEffect(() => {
    if (reducedMotion || !submittedRecord || !confirmRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        confirmRef.current,
        {scale: 0.96, y: 14, opacity: 0},
        {scale: 1, y: 0, opacity: 1, duration: 0.65, ease: 'power3.out'},
      );
    }, confirmRef);

    return () => ctx.revert();
  }, [reducedMotion, submittedRecord]);

  const [guestName, setGuestName] = useState('');
  const [contact, setContact] = useState('');
  const [attendance, setAttendance] = useState<'attending' | 'declining'>('attending');
  const [guestCount, setGuestCount] = useState(2);
  const [selectedEvents, setSelectedEvents] = useState<string[]>(
    weddingEvents.map((e) => e.name),
  );
  const [dietary, setDietary] = useState('Standard Vegetarian');
  const [message, setMessage] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);

  const toggleEvent = (eventName: string) => {
    setSelectedEvents((prev) =>
      prev.includes(eventName)
        ? prev.filter((item) => item !== eventName)
        : [...prev, eventName],
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (guestName.trim().length < 2) {
      setValidationError('Please enter your full name.');
      return;
    }
    if (contact.trim().length < 3) {
      setValidationError('Please provide an email address or mobile number.');
      return;
    }
    if (attendance === 'attending' && selectedEvents.length === 0) {
      setValidationError('Please select at least one celebration.');
      return;
    }

    await submitRsvp({
      guestName,
      contact,
      guestCount: attendance === 'attending' ? guestCount : 0,
      attendance,
      selectedEvents: attendance === 'attending' ? selectedEvents : [],
      dietary,
      message,
    });
  };

  if (submittedRecord) {
    return (
      <div
        ref={confirmRef}
        className="bg-[#F8F5EC] text-[#352720] border border-[#C59A52] px-5 sm:px-8 py-7 text-center relative"
      >
        <div className="pointer-events-none absolute inset-2 border border-[#651E2B]/20" aria-hidden="true" />
        <div className="relative z-10 max-w-md mx-auto">
          <CheckCircle2 className="w-8 h-8 text-[#651E2B] mx-auto mb-2.5" aria-hidden="true" />
          <h3 className="font-display type-section text-[#651E2B]">
            {submittedRecord.attendance === 'attending'
              ? `We Await You, ${submittedRecord.guestName}`
              : `With Gratitude, ${submittedRecord.guestName}`}
          </h3>
          <OrnamentalDivider className="my-3.5" variant="gold" />

          <p className="font-body type-body text-[#352720]/85">
            {submittedRecord.attendance === 'attending'
              ? `Confirmed for ${submittedRecord.guestCount} ${
                  submittedRecord.guestCount === 1 ? 'guest' : 'guests'
                } (${submittedRecord.selectedEvents.join(', ')}).`
              : 'Your warm wishes have been saved.'}
          </p>

          <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-2.5">
            <a
              href={getGoogleCalendarUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto min-h-[40px] inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#651E2B] hover:bg-[#43131F] text-[#F8F5EC] border border-[#C59A52] font-ui text-[10px] tracking-[0.16em] uppercase transition-colors whitespace-nowrap"
            >
              <CalendarPlus className="w-3.5 h-3.5 text-[#D8B77C]" aria-hidden="true" />
              <span>Google Calendar</span>
            </a>
            <button
              type="button"
              onClick={downloadIcsCalendar}
              className="w-full sm:w-auto min-h-[40px] inline-flex items-center justify-center gap-2 px-4 py-2 border border-[#651E2B]/45 text-[#651E2B] hover:bg-[#EAE0CF] font-ui text-[10px] tracking-[0.16em] uppercase transition-colors cursor-pointer whitespace-nowrap"
            >
              <Download className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Download .ICS</span>
            </button>
          </div>

          <button
            type="button"
            onClick={resetSubmission}
            className="mt-4 inline-flex items-center gap-1.5 font-body italic text-sm text-[#651E2B]/80 hover:text-[#651E2B] cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Update response</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className="bg-[#F8F5EC] text-[#352720] border border-[#C59A52] px-5 sm:px-8 py-6 sm:py-8 relative shadow-lg"
    >
      <div className="pointer-events-none absolute inset-2 border border-[#651E2B]/20" aria-hidden="true" />

      <div className="relative z-10">
        <div data-rsvp-row className="text-center mb-5">
          <p className="font-ui text-[10px] tracking-[0.22em] uppercase text-[#651E2B]">
            Kindly Reply by {weddingConfig.rsvpDeadline}
          </p>
          <h3 className="mt-1 font-display type-section font-medium text-[#651E2B]">
            RSVP
          </h3>
        </div>

        {(validationError || error) && (
          <div
            role="alert"
            className="mb-4 px-3.5 py-2 bg-[#651E2B]/10 border border-[#651E2B] text-[#651E2B] font-body type-body"
          >
            {validationError || error}
          </div>
        )}

        <div data-rsvp-row className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
          <div>
            <label
              htmlFor="rsvp-name"
              className="block font-ui text-[10px] tracking-[0.16em] uppercase text-[#651E2B] mb-1"
            >
              Guest Name *
            </label>
            <input
              id="rsvp-name"
              type="text"
              required
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              placeholder="Full name"
              className="w-full min-h-[40px] px-3 py-2 bg-[#FFFFFF] border border-[#C59A52]/65 text-[#352720] font-body type-body focus:border-[#651E2B] focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="rsvp-contact"
              className="block font-ui text-[10px] tracking-[0.16em] uppercase text-[#651E2B] mb-1"
            >
              Email or Phone *
            </label>
            <input
              id="rsvp-contact"
              type="text"
              required
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="Email or mobile number"
              className="w-full min-h-[40px] px-3 py-2 bg-[#FFFFFF] border border-[#C59A52]/65 text-[#352720] font-body type-body focus:border-[#651E2B] focus:outline-none"
            />
          </div>

          <div>
            <span className="block font-ui text-[10px] tracking-[0.16em] uppercase text-[#651E2B] mb-1">
              Attendance *
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setAttendance('attending')}
                className={`min-h-[40px] px-2 py-1.5 border font-ui text-[10px] tracking-[0.08em] uppercase transition-colors cursor-pointer whitespace-nowrap ${
                  attendance === 'attending'
                    ? 'bg-[#651E2B] text-[#F8F5EC] border-[#651E2B]'
                    : 'bg-[#FFFFFF] text-[#352720] border-[#C59A52]/60 hover:border-[#651E2B]'
                }`}
              >
                Joyfully Accepts
              </button>
              <button
                type="button"
                onClick={() => setAttendance('declining')}
                className={`min-h-[40px] px-2 py-1.5 border font-ui text-[10px] tracking-[0.08em] uppercase transition-colors cursor-pointer whitespace-nowrap ${
                  attendance === 'declining'
                    ? 'bg-[#651E2B] text-[#F8F5EC] border-[#651E2B]'
                    : 'bg-[#FFFFFF] text-[#352720] border-[#C59A52]/60 hover:border-[#651E2B]'
                }`}
              >
                Unable to Attend
              </button>
            </div>
          </div>

          <div>
            <label
              htmlFor="rsvp-guests"
              className="block font-ui text-[10px] tracking-[0.16em] uppercase text-[#651E2B] mb-1"
            >
              Guests
            </label>
            <select
              id="rsvp-guests"
              disabled={attendance === 'declining'}
              value={attendance === 'declining' ? 0 : guestCount}
              onChange={(e) => setGuestCount(Number(e.target.value))}
              className="w-full min-h-[40px] px-3 py-2 bg-[#FFFFFF] border border-[#C59A52]/65 text-[#352720] font-body type-body disabled:opacity-50 focus:border-[#651E2B] focus:outline-none"
            >
              {attendance === 'declining' ? (
                <option value={0}>0 Guests</option>
              ) : (
                [1, 2, 3, 4, 5, 6].map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? 'Guest' : 'Guests'}
                  </option>
                ))
              )}
            </select>
          </div>
        </div>

        {attendance === 'attending' && (
          <div data-rsvp-row className="mt-4">
            <span className="block font-ui text-[10px] tracking-[0.16em] uppercase text-[#651E2B] mb-1.5">
              Events Attending *
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {weddingEvents.map((ev) => {
                const checked = selectedEvents.includes(ev.name);
                return (
                  <label
                    key={ev.id}
                    className={`min-h-[40px] flex items-center gap-2 px-2.5 py-1.5 border cursor-pointer transition-colors ${
                      checked
                        ? 'bg-[#EAE0CF]/70 border-[#651E2B] text-[#651E2B]'
                        : 'bg-[#FFFFFF] border-[#C59A52]/50 text-[#352720]/80'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleEvent(ev.name)}
                      className="accent-[#651E2B] w-3.5 h-3.5 shrink-0"
                    />
                    <span className="font-body text-sm leading-tight">{ev.name}</span>
                  </label>
                );
              })}
            </div>
          </div>
        )}

        <div data-rsvp-row className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
          <div>
            <label
              htmlFor="rsvp-dietary"
              className="block font-ui text-[10px] tracking-[0.16em] uppercase text-[#651E2B] mb-1"
            >
              Dietary Preference
            </label>
            <select
              id="rsvp-dietary"
              value={dietary}
              onChange={(e) => setDietary(e.target.value)}
              className="w-full min-h-[40px] px-3 py-2 bg-[#FFFFFF] border border-[#C59A52]/65 text-[#352720] font-body type-body focus:border-[#651E2B] focus:outline-none"
            >
              {DIETARY_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="rsvp-message"
              className="block font-ui text-[10px] tracking-[0.16em] uppercase text-[#651E2B] mb-1"
            >
              Blessings or Note
            </label>
            <input
              id="rsvp-message"
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Warm wishes or flight arrival"
              className="w-full min-h-[40px] px-3 py-2 bg-[#FFFFFF] border border-[#C59A52]/65 text-[#352720] font-body type-body focus:border-[#651E2B] focus:outline-none"
            />
          </div>
        </div>

        <div data-rsvp-row className="mt-6 text-center">
          <button
            type="submit"
            disabled={submitting}
            className="w-full sm:w-auto min-h-[42px] px-8 py-2.5 bg-[#651E2B] hover:bg-[#43131F] disabled:opacity-60 text-[#F8F5EC] border border-[#C59A52] font-ui text-[11px] tracking-[0.2em] uppercase transition-colors cursor-pointer whitespace-nowrap"
          >
            {submitting ? 'Saving Response...' : 'Confirm RSVP'}
          </button>
        </div>
      </div>
    </form>
  );
};
