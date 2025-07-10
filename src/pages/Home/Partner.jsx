import React from 'react';
import samsung from'../../assets/p1.png';
import cisco from '../../assets/p2.png';
import hp from'../../assets/p3.png';
import citi from '../../assets/p4.png';
import brac from '../../assets/p5.png';

const Partner = () => {
  const logos = [samsung, cisco,hp, citi, brac];

  return (
    <section className="py-8">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-gray-600 text-xl mb-6">
          Trusted by over <strong>15,000 companies</strong> and millions of learners around the world
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 px-4">
          {logos.map((logo, idx) => (
            <img
              key={idx}
              src={logo}
              alt={`Partner logo ${idx + 1}`}
              className="h-12 w-12"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partner;