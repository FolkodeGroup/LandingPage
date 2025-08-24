
"use client";
import { FaGlobe, FaAndroid, FaApple, FaRegClock, FaTv, FaRocket } from "react-icons/fa";

export default function Tecnologias() {
  return (
    <section className="text-inverse section-tecnologias px-4 py-6">
      <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
        Tecnologías en las que Trabajamos
      </h2>

      <div className="pt-4">
        <div className="cards-tecnologias flex flex-wrap justify-center gap-4 sm:gap-6 mx-auto">
          <div className="li-tecnologias flex flex-col items-center border rounded-xl p-3 sm:p-4 w-24 sm:w-28 md:w-32">
            <FaGlobe className="icon-tecnologia w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10" color="#fff" />
            <span className="mt-2 text-xs sm:text-sm md:text-base">Website</span>
          </div>

          <div className="li-tecnologias flex flex-col items-center border rounded-xl p-3 sm:p-4 w-24 sm:w-28 md:w-32">
            <FaAndroid className="icon-tecnologia w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10" color="#fff" />
            <span className="mt-2 text-xs sm:text-sm md:text-base">Android</span>
          </div>

          <div className="li-tecnologias flex flex-col items-center border rounded-xl p-3 sm:p-4 w-24 sm:w-28 md:w-32">
            <FaApple className="icon-tecnologia w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10" color="#fff" />
            <span className="mt-2 text-xs sm:text-sm md:text-base">IOS</span>
          </div>

          <div className="li-tecnologias flex flex-col items-center border rounded-xl p-3 sm:p-4 w-24 sm:w-28 md:w-32">
            <FaRegClock className="icon-tecnologia w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10" color="#fff" />
            <span className="mt-2 text-xs sm:text-sm md:text-base">Watch</span>
          </div>

          <div className="li-tecnologias flex flex-col items-center border rounded-xl p-3 sm:p-4 w-24 sm:w-28 md:w-32">
            <FaTv className="icon-tecnologia w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10" color="#fff" />
            <span className="mt-2 text-xs sm:text-sm md:text-base">Tv</span>
          </div>

          <div className="li-tecnologias flex flex-col items-center border rounded-xl p-3 sm:p-4 w-24 sm:w-28 md:w-32">
            <FaRocket className="icon-tecnologia w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10" color="#fff" />
            <span className="mt-2 text-xs sm:text-sm md:text-base">IA</span>
          </div>
        </div>
      </div>
    </section>
  );
}