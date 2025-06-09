import React from "react";

export default function Services({ services }) {
  return (
    <div className="grid md:grid-cols-3 gap-8">
      {services.map((svc, i) => (
        <div key={i} className="p-6 bg-gray-800 rounded-lg shadow-inner hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-semibold mb-2 text-emerald-300">{svc.title}</h3>
          <p className="text-gray-300">{svc.desc}</p>
        </div>
      ))}
    </div>
  );
}
