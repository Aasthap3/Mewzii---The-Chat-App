import React from "react";


const Footer = () => (
  <footer className="bg-base-300 pt-12 pb-8 px-4 mt-20 border-t border-base-200">
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-8">
      {/* About */}
      <div>
        <h3 className="font-bold text-lg mb-2 text-primary">Mewzii Chat</h3>
        <p className="text-base-content/70 mb-2">A modern, secure, and customizable chat platform for everyone.</p>
        <div className="flex gap-3 mt-4">
          <a href="#" aria-label="Twitter" className="text-primary hover:text-primary-focus text-2xl"><i className="fa-brands fa-twitter"></i></a>
          <a href="#" aria-label="Instagram" className="text-primary hover:text-primary-focus text-2xl"><i className="fa-brands fa-instagram"></i></a>
          <a href="#" aria-label="Github" className="text-primary hover:text-primary-focus text-2xl"><i className="fa-brands fa-github"></i></a>
        </div>
      </div>
      {/* Quick Links */}
      <div>
        <h4 className="font-semibold mb-2">Quick Links</h4>
        <ul className="space-y-1">
          <li><a href="/" className="link link-hover">Home</a></li>
          <li><a href="/login" className="link link-hover">Login</a></li>
          <li><a href="/register" className="link link-hover">Register</a></li>
        </ul>
      </div>
      {/* Resources */}
      <div>
        <h4 className="font-semibold mb-2">Resources</h4>
        <ul className="space-y-1">
          <li><a href="#" className="link link-hover">Blog</a></li>
          <li><a href="#" className="link link-hover">Help Center</a></li>
          <li><a href="#" className="link link-hover">API Docs</a></li>
        </ul>
      </div>
      {/* Legal */}
      <div>
        <h4 className="font-semibold mb-2">Legal</h4>
        <ul className="space-y-1">
          <li><a href="#" className="link link-hover">Privacy Policy</a></li>
          <li><a href="#" className="link link-hover">Terms of Service</a></li>
          <li><a href="#" className="link link-hover">Contact</a></li>
        </ul>
      </div>
    </div>
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 border-t border-base-200 pt-6">
      <div className="text-base-content/70">&copy; {new Date().getFullYear()} Mewzii Chat. All rights reserved.</div>
      <div className="flex gap-4 text-base-content/60 text-sm">
        <span>Made with <span className="text-error">♥</span> by Team Mewzii</span>
      </div>
    </div>
  </footer>
);

export default Footer;
