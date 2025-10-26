import React from 'react';
import Spline from '@splinetool/react-spline';

const HeroSection = () => {
  return (
    <section className="relative h-[60vh] w-full overflow-hidden rounded-3xl bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Soft gradient veil for readability without blocking interactions */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(24,24,27,0.2),rgba(2,6,23,0.8))]" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-widest text-white/70 backdrop-blur">
          <span className="h-2 w-2 rounded-full bg-fuchsia-400 shadow-[0_0_20px_4px_rgba(217,70,239,0.6)]" />
          Realtime AI Voice Interface
        </div>
        <h1 className="mt-6 text-4xl font-semibold leading-tight text-slate-100 md:text-6xl">
          Your On‑Device AI, with Memory
        </h1>
        <p className="mt-4 max-w-2xl text-slate-300/90">
          Talk, type, and attach context. Run models locally, through Ollama, or connect to a remote device — all from a single elegant interface.
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
