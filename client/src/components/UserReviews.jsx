import React from "react";

const reviews = [
  {
    name: "Aastha P.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    review: "Mewzii Chat is so easy to use and the design is beautiful! I love chatting with my friends here.",
    rating: 5,
  },
  {
    name: "Rahul S.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    review: "The real-time messaging is super fast. The Google login is a great touch!",
    rating: 5,
  },
  {
    name: "Priya K.",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    review: "I like the themes and how I can customize my profile. Highly recommended!",
    rating: 4,
  },
];

const UserReviews = () => (
  <section className="py-16 px-4 bg-gradient-to-br from-base-200 to-base-100">
    <h2 className="text-3xl font-bold text-center mb-10">What Our Users Say</h2>
    <div className="flex flex-col md:flex-row gap-8 justify-center items-center max-w-5xl mx-auto">
      {reviews.map(r => (
        <div key={r.name} className="card bg-base-100 shadow-lg p-6 border border-base-300 w-full md:w-1/3 flex flex-col items-center">
          <img src={r.avatar} alt={r.name} className="w-20 h-20 rounded-full mb-4 border-2 border-primary" />
          <h3 className="font-semibold text-lg mb-2">{r.name}</h3>
          <p className="text-base-content/70 mb-2 text-center">"{r.review}"</p>
          <div className="flex gap-1">
            {Array.from({ length: r.rating }).map((_, i) => (
              <span key={i} className="text-warning text-xl">★</span>
            ))}
            {Array.from({ length: 5 - r.rating }).map((_, i) => (
              <span key={i} className="text-base-300 text-xl">★</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default UserReviews;
