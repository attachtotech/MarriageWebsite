import React, {useEffect, useRef, useState} from 'react';
import {Pause, Play, Volume2, VolumeX} from 'lucide-react';
import {gsap} from '../../animations/gsapConfig';
import {weddingConfig} from '../../data/weddingConfig';
import {useReducedMotion} from '../../hooks/useReducedMotion';

interface AudioControllerProps {
  externalStartTrigger: number;
  visible?: boolean;
}

/**
 * Provides subtle background wedding music.
 * Plays weddingConfig.musicUrl if configured; otherwise generates a serene,
 * warm Raag Yaman-inspired harmonic tanpura drone via Web Audio API.
 * Never autoplays before explicit visitor interaction.
 */
export const AudioController: React.FC<AudioControllerProps> = ({
  externalStartTrigger,
  visible = true,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.35);
  const [expanded, setExpanded] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const audioElRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const oscNodesRef = useRef<OscillatorNode[]>([]);

  const effectiveGain = isMuted ? 0 : volume;

  const stopSynthesizer = () => {
    oscNodesRef.current.forEach((osc) => {
      try {
        osc.stop();
        osc.disconnect();
      } catch {
        // Ignore stopped oscillator
      }
    });
    oscNodesRef.current = [];
    if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
      audioCtxRef.current.suspend().catch(() => {});
    }
  };

  const startSynthesizer = async () => {
    const AudioCtx = window.AudioContext || (window as unknown as {webkitAudioContext: typeof AudioContext}).webkitAudioContext;
    if (!AudioCtx) return;

    if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') {
      audioCtxRef.current = new AudioCtx();
    }
    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') {
      await ctx.resume();
    }

    stopSynthesizer();

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
    masterGain.gain.linearRampToValueAtTime(effectiveGain * 0.14, ctx.currentTime + 1.2);

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(620, ctx.currentTime);

    filter.connect(masterGain);
    masterGain.connect(ctx.destination);
    masterGainRef.current = masterGain;

    // Gentle Tanpura drone harmonics (Sa - Pa - Sa' - Ga) in warm C# tuning
    const freqs = [138.59, 207.65, 277.18, 349.23];
    const created: OscillatorNode[] = [];

    freqs.forEach((hz, idx) => {
      const osc = ctx.createOscillator();
      const voiceGain = ctx.createGain();
      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(hz, ctx.currentTime);
      voiceGain.gain.setValueAtTime(idx === 0 ? 0.42 : 0.22 / (idx + 0.5), ctx.currentTime);
      osc.connect(voiceGain);
      voiceGain.connect(filter);
      osc.start();
      created.push(osc);
    });

    oscNodesRef.current = created;
  };

  const startPlayback = async () => {
    if (weddingConfig.musicUrl) {
      if (!audioElRef.current) {
        const el = new Audio(weddingConfig.musicUrl);
        el.loop = true;
        audioElRef.current = el;
      }
      audioElRef.current.volume = effectiveGain;
      try {
        await audioElRef.current.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    } else {
      await startSynthesizer();
      setIsPlaying(true);
    }
  };

  const pausePlayback = () => {
    if (weddingConfig.musicUrl && audioElRef.current) {
      audioElRef.current.pause();
    } else {
      stopSynthesizer();
    }
    setIsPlaying(false);
  };

  useEffect(() => {
    if (externalStartTrigger > 0 && !isPlaying) {
      startPlayback();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [externalStartTrigger]);

  useEffect(() => {
    if (audioElRef.current) {
      audioElRef.current.volume = effectiveGain;
    }
    if (masterGainRef.current && audioCtxRef.current) {
      masterGainRef.current.gain.setTargetAtTime(
        effectiveGain * 0.14,
        audioCtxRef.current.currentTime,
        0.08,
      );
    }
  }, [effectiveGain]);

  useEffect(() => {
    return () => {
      if (audioElRef.current) {
        audioElRef.current.pause();
      }
      stopSynthesizer();
    };
  }, []);

  useEffect(() => {
    if (!visible || reducedMotion || !wrapRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        wrapRef.current,
        {y: 18, opacity: 0},
        {y: 0, opacity: 1, duration: 0.7, delay: 0.35, ease: 'power3.out'},
      );
    }, wrapRef);

    return () => ctx.revert();
  }, [visible, reducedMotion]);

  return (
    <div
      ref={wrapRef}
      className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-30 flex items-center gap-2 bg-[#F8F5EC]/95 text-[#651E2B] border border-[#C59A52] px-2.5 py-1.5 md:px-3.5 md:py-2 shadow-md"
      aria-label="Wedding soundtrack controls"
    >
      <button
        type="button"
        onClick={() => (isPlaying ? pausePlayback() : startPlayback())}
        aria-label={isPlaying ? 'Pause ambient music' : 'Play ambient music'}
        className="min-w-[36px] min-h-[36px] inline-flex items-center justify-center hover:text-[#43131F] cursor-pointer"
      >
        {isPlaying ? <Pause className="w-4 h-4 md:w-4.5 md:h-4.5" /> : <Play className="w-4 h-4 md:w-4.5 md:h-4.5" />}
      </button>

      <button
        type="button"
        onClick={() => setExpanded((prev) => !prev)}
        className="inline-flex items-center gap-1.5 font-ui text-[10px] md:text-xs tracking-[0.18em] uppercase pr-1 cursor-pointer whitespace-nowrap"
      >
        {isPlaying && !isMuted && !reducedMotion && (
          <span className="inline-flex items-end gap-[2px] h-3" aria-hidden="true">
            <span className="w-[2px] bg-[#C6A36A] animate-pulse h-2" />
            <span className="w-[2px] bg-[#C6A36A] animate-pulse h-3" style={{animationDelay: '150ms'}} />
            <span className="w-[2px] bg-[#C6A36A] animate-pulse h-1.5" style={{animationDelay: '300ms'}} />
          </span>
        )}
        <span>{isPlaying ? 'Sound On' : 'Music'}</span>
      </button>

      {expanded && (
        <div className="flex items-center gap-2 pl-2 border-l border-[#C59A52]/40">
          <button
            type="button"
            onClick={() => setIsMuted((prev) => !prev)}
            aria-label={isMuted ? 'Unmute music' : 'Mute music'}
            className="min-w-[32px] min-h-[32px] inline-flex items-center justify-center cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
          <label htmlFor="wedding-audio-volume" className="sr-only">
            Music volume
          </label>
          <input
            id="wedding-audio-volume"
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={isMuted ? 0 : volume}
            onChange={(e) => {
              const next = Number(e.target.value);
              setVolume(next);
              if (next > 0 && isMuted) setIsMuted(false);
            }}
            className="w-16 accent-[#651E2B] cursor-pointer"
          />
        </div>
      )}
    </div>
  );
};
