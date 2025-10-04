
"use client";

import { FaGlobe, FaAndroid, FaApple, FaRegClock, FaTv, FaRocket } from "react-icons/fa";

export default function Tecnologias() {

  return (
    <section className="tecnologias-section relative py-12 px-4 overflow-hidden rounded-xl">
      {/* Fondo degradado y partículas */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f2027] via-[#2c5364] to-[#00c6ff] opacity-90 pointer-events-none z-0" />
      {/* Puedes agregar aquí un componente de partículas si lo deseas */}

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
        <h2 className="tecnologias-title text-center text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-lg">
          Tecnologías que impulsan tu proyecto
        </h2>
        <p className="tecnologias-subtitle text-center text-lg md:text-xl text-white/80 mb-8 max-w-2xl">
          Expertos en las herramientas que transforman ideas en soluciones digitales.
        </p>

        <div className="tecnologias-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 w-full mb-8">
          <div className="tecnologia-card flex flex-col items-center bg-white/10 backdrop-blur-md rounded-2xl p-5 shadow-lg transition-transform hover:scale-105 hover:bg-white/20 cursor-pointer">
            <FaGlobe className="icon-tecnologia w-10 h-10 text-[#00c6ff] drop-shadow" />
            <span className="mt-3 text-base font-semibold text-white">Website</span>
          </div>
          <div className="tecnologia-card flex flex-col items-center bg-white/10 backdrop-blur-md rounded-2xl p-5 shadow-lg transition-transform hover:scale-105 hover:bg-white/20 cursor-pointer">
            <FaAndroid className="icon-tecnologia w-10 h-10 text-[#3ddc84] drop-shadow" />
            <span className="mt-3 text-base font-semibold text-white">Android</span>
          </div>
          <div className="tecnologia-card flex flex-col items-center bg-white/10 backdrop-blur-md rounded-2xl p-5 shadow-lg transition-transform hover:scale-105 hover:bg-white/20 cursor-pointer">
            <FaApple className="icon-tecnologia w-10 h-10 text-[#fff] drop-shadow" />
            <span className="mt-3 text-base font-semibold text-white">iOS</span>
          </div>
          <div className="tecnologia-card flex flex-col items-center bg-white/10 backdrop-blur-md rounded-2xl p-5 shadow-lg transition-transform hover:scale-105 hover:bg-white/20 cursor-pointer">
            <FaRegClock className="icon-tecnologia w-10 h-10 text-[#ffd700] drop-shadow" />
            <span className="mt-3 text-base font-semibold text-white">Watch</span>
          </div>
          <div className="tecnologia-card flex flex-col items-center bg-white/10 backdrop-blur-md rounded-2xl p-5 shadow-lg transition-transform hover:scale-105 hover:bg-white/20 cursor-pointer">
            <FaTv className="icon-tecnologia w-10 h-10 text-[#00c6ff] drop-shadow" />
            <span className="mt-3 text-base font-semibold text-white">Tv</span>
          </div>
          <div className="tecnologia-card flex flex-col items-center bg-white/10 backdrop-blur-md rounded-2xl p-5 shadow-lg transition-transform hover:scale-105 hover:bg-white/20 cursor-pointer">
            <FaRocket className="icon-tecnologia w-10 h-10 text-[#ff5e62] drop-shadow" />
            <span className="mt-3 text-base font-semibold text-white">IA</span>
          </div>
        </div>

        {/* <button className="tecnologias-cta bg-[#00c6ff] hover:bg-[#0072ff] text-white font-bold py-3 px-8 rounded-full shadow-lg transition-colors text-lg">
          Ver portafolio
        </button> */}
      </div>
    </section>
  );
}