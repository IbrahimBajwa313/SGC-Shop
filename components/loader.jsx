export default function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
      <div className="loader"></div>
      <style jsx>{`
        .loader {
          width: 6rem; /* Adjusted size */
          height: 6rem; /* Adjusted size */
          background-color: #3b82f6; /* Blue color */
          border-radius: 50%; /* Make it a circle */
          animation: blink 1.5s infinite ease-in-out;
        }

        @keyframes blink {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.3;
          }
        }
      `}</style>
    </div>
  );
}
