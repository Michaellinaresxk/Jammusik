import React from 'react';

const AnimatedBrandLogo = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <svg
        width="69"
        height="53"
        viewBox="0 0 69 53"
        fill="none"
        className="mb-2">
        <defs>
          <linearGradient
            id="primaryGradient"
            x1="0%"
            y1="100%"
            x2="0%"
            y2="0%">
            <stop offset="0%" stopColor="#56B5A6" />
            <stop offset="100%" stopColor="#7CD6C7" />
          </linearGradient>
        </defs>

        <path
          d="M15.3333 42.4H23V10.6H15.3333V42.4Z"
          fill="url(#primaryGradient)"
          className="bar-animation bar-2"
        />
        <path
          d="M30.6667 53H38.3333V0H30.6667V53Z"
          fill="url(#primaryGradient)"
          className="bar-animation bar-3"
        />
        <path
          d="M0 31.8H7.66667V21.2H0V31.8Z"
          fill="url(#primaryGradient)"
          className="bar-animation bar-1"
        />
        <path
          d="M46 42.4H53.6667V10.6H46V42.4Z"
          fill="url(#primaryGradient)"
          className="bar-animation bar-4"
        />
        <path
          d="M61.3333 21.2V31.8H69V21.2H61.3333Z"
          fill="url(#primaryGradient)"
          className="bar-animation bar-5"
        />
      </svg>

      <style jsx>{`
        .bar-animation {
          transform-origin: center bottom;
          transform-box: fill-box;
        }

        .bar-1 {
          animation: pulse1 1.2s ease-in-out infinite;
        }

        .bar-2 {
          animation: pulse2 1.4s ease-in-out infinite;
        }

        .bar-3 {
          animation: pulse3 1.6s ease-in-out infinite;
        }

        .bar-4 {
          animation: pulse4 1.3s ease-in-out infinite;
        }

        .bar-5 {
          animation: pulse5 1.5s ease-in-out infinite;
        }

        @keyframes pulse1 {
          0%,
          100% {
            transform: scaleY(1);
          }
          50% {
            transform: scaleY(0.6);
          }
        }

        @keyframes pulse2 {
          0%,
          100% {
            transform: scaleY(1);
          }
          50% {
            transform: scaleY(1.2);
          }
        }

        @keyframes pulse3 {
          0%,
          100% {
            transform: scaleY(1);
          }
          50% {
            transform: scaleY(1.4);
          }
        }

        @keyframes pulse4 {
          0%,
          100% {
            transform: scaleY(1);
          }
          50% {
            transform: scaleY(1.3);
          }
        }

        @keyframes pulse5 {
          0%,
          100% {
            transform: scaleY(1);
          }
          50% {
            transform: scaleY(0.7);
          }
        }

        .bar-animation:hover {
          filter: brightness(1.2);
          transition: filter 0.3s ease;
        }
      `}</style>
    </div>
  );
};

export default AnimatedBrandLogo;
