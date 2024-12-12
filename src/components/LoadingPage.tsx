import React from 'react'

const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center my-8">
      <video
        src="/video/trainAnimation3.mp4"
        className="rounded-full w-40 h-40  "
        autoPlay
        loop
        muted
        playsInline
      />
    </div>
  );
}

export default LoadingPage