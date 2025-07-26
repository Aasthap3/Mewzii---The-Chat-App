import React from "react";

const features = [
  {
    title: "Real-time Messaging",
    desc: "Chat instantly with friends and groups.",
    icon: "💬",
  },
  {
    title: "Custom Themes",
    desc: "Switch between beautiful daisyUI themes.",
    icon: "🎨",
  },
  {
    title: "Secure Login",
    desc: "Your data is protected with modern authentication.",
    icon: "🔒",
  },
  {
    title: "Social Sign In",
    desc: "Sign up or login with Google for convenience.",
    icon: "🔗",
  },
  {
    title: "Responsive Design",
    desc: "Looks great on any device, mobile or desktop.",
    icon: "📱",
  },
  {
    title: "Profile Customization",
    desc: "Personalize your profile and avatar.",
    icon: "🖼️",
  },
];

const Features = () => (
  <section className="my-16 px-4 bg-base-100">
    <h2 className="text-3xl font-bold text-center mb-10">Features</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
      {features.map(f => (
        <div key={f.title} className="card bg-base-200 shadow-md p-6 border border-base-300 hover:scale-[1.03] transition-transform">
          <div className="text-4xl mb-2">{f.icon}</div>
          <h3 className="font-bold text-xl mb-1">{f.title}</h3>
          <p className="text-base-content/70">{f.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

export default Features;
