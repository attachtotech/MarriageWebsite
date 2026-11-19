import {useCallback, useState} from 'react';
import {createClient} from '@supabase/supabase-js';

export interface RsvpPayload {
  guestName: string;
  contact: string;
  guestCount: number;
  attendance: 'attending' | 'declining';
  selectedEvents: string[];
  dietary: string;
  message: string;
}

export interface RsvpSubmission extends RsvpPayload {
  id: string;
  createdAt: string;
}

const STORAGE_KEY = 'wedding_rsvp_submissions_v1';
const LAST_KEY = 'royal_wedding_last_rsvp_v1';

function getOptionalSupabase() {
  const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;
  if (!url || !key) return null;
  return createClient(url, key);
}

function readStoredRsvps(): RsvpSubmission[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function useRSVP() {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submittedRecord, setSubmittedRecord] = useState<RsvpSubmission | null>(() => {
    if (typeof window === 'undefined') return null;
    try {
      const cached = window.localStorage.getItem(LAST_KEY);
      return cached ? (JSON.parse(cached) as RsvpSubmission) : null;
    } catch {
      return null;
    }
  });

  const submitRsvp = useCallback(async (payload: RsvpPayload): Promise<RsvpSubmission | null> => {
    setSubmitting(true);
    setError(null);

    try {
      const record: RsvpSubmission = {
        ...payload,
        id: `rsvp_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
        createdAt: new Date().toISOString(),
      };

      const supabase = getOptionalSupabase();
      if (supabase) {
        const {error: supaError} = await supabase.from('rsvps').insert({
          guest_name: record.guestName,
          contact: record.contact,
          guest_count: record.guestCount,
          attendance: record.attendance,
          selected_events: record.selectedEvents,
          dietary: record.dietary,
          message: record.message,
        });
        if (supaError) {
          console.warn('Supabase insert skipped, storing locally:', supaError.message);
        }
      }

      const existing = readStoredRsvps();
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify([record, ...existing]));
      window.localStorage.setItem(LAST_KEY, JSON.stringify(record));
      setSubmittedRecord(record);
      return record;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to save your RSVP right now.');
      return null;
    } finally {
      setSubmitting(false);
    }
  }, []);

  const resetSubmission = useCallback(() => {
    setSubmittedRecord(null);
    setError(null);
    try {
      window.localStorage.removeItem(LAST_KEY);
    } catch {
      // Ignore storage errors
    }
  }, []);

  return {
    submitting,
    error,
    submittedRecord,
    submitRsvp,
    resetSubmission,
  };
}
