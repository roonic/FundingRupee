// // components/ThankYouPage.jsx
// import React, { useEffect, useRef } from 'react';
// // import piggyBank from '../images/piggybank.gif'; // You can use a Lottie animation or GIF
// // import coinSound from '../sounds/coin-drop.mp3';

// const ThankYouPage = () => {
//   const audioRef = useRef(null);

//   useEffect(() => {
//     if (audioRef.current) {
//       audioRef.current.play();
//     }
//   }, []);

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-100 to-blue-100 text-center px-4">
//       <h1 className="text-4xl font-bold text-green-700 mb-4 animate-bounce">
//         Thank You!
//       </h1>
//       <p className="text-lg text-gray-700 mb-8 max-w-md">
//         Your generosity means the world to us and those in need. Every rupee counts, and you've just made a difference.
//       </p>

//       <img 
//         // src={piggyBank} 
//         // alt="Piggy bank animation" 
//         className="w-64 h-64 mb-6" 
//       />

//       {/* <audio ref={audioRef} src={coinSound} preload="auto" /> */}

//       <button
//         onClick={() => window.location.href = '/'}
//         className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
//       >
//         Go to Homepage
//       </button>
//     </div>
//   );
// };

// export default ThankYouPage;
