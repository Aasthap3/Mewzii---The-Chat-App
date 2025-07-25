import React from "react";

const AboutPage = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 px-4">
    <div className="max-w-2xl w-full text-center mt-16">
      <h1 className="text-4xl font-bold mb-4">About <span className="text-primary">Mewzii Chat</span></h1>
      <p className="mb-6 text-lg text-base-content/70">
        Mewzii is a modern chat app built with the MERN stack. Enjoy real-time messaging, beautiful themes, and a friendly interface. Your privacy and experience are our top priorities.
      </p>
      <h2 className="text-2xl font-semibold mt-8 mb-4">Features</h2>
      <ul className="list-disc list-inside text-left mx-auto max-w-md mb-6 text-base-content/80">
        <li>Real-time 1:1 and group chat</li>
        <li>Customizable daisyUI themes</li>
        <li>Secure authentication</li>
        <li>Responsive, mobile-friendly design</li>
        <li>Open source and easy to extend</li>
      </ul>
    </div>
  </div>
);

export default AboutPage;
