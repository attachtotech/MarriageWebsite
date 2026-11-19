import {useEffect, useState} from 'react';

export interface CountdownState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

function calculateTimeLeft(targetIso: string): CountdownState {
  const targetMs = new Date(targetIso).getTime();
  const nowMs = Date.now();
  const diff = targetMs - nowMs;

  if (Number.isNaN(targetMs) || diff <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isPast: true,
    };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return {
    days,
    hours,
    minutes,
    seconds,
    isPast: false,
  };
}

export function useCountdown(targetIso: string): CountdownState {
  const [timeLeft, setTimeLeft] = useState<CountdownState>(() => calculateTimeLeft(targetIso));

  useEffect(() => {
    setTimeLeft(calculateTimeLeft(targetIso));
    const timer = window.setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetIso));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [targetIso]);

  return timeLeft;
}
