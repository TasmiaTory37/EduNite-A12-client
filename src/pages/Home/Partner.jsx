import React from 'react';
import Marquee from 'react-fast-marquee';
import samsung from '../../assets/p1.png';
import cisco from '../../assets/p2.png';
import hp from '../../assets/p3.png';
import citi from '../../assets/p4.png';
import brac from '../../assets/p5.png';

const Partner = () => {
  const logos = [samsung, cisco, hp, citi, brac];

  return (
    <section className="py-10 md:py-12 lg:py-16">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p className="text-base-content text-base sm:text-lg md:text-xl mb-6">
          Trusted by over <strong>15,000 companies</strong> and millions of learners around the world
        </p>

        <Marquee pauseOnHover={true} speed={40} gradient={false}>
          {logos.map((logo, idx) => (
            <img
              key={idx}
              src={logo}
              alt={`Partner logo ${idx + 1}`}
              className="h-10 sm:h-12 w-auto mx-6 object-contain"
            />
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default Partner;
