import React from "react";

export default function Contact({ dict }) {
  const { email, phone, address, wechatQr } = dict.contactInfo;
  return (
    <div className="space-y-6 text-center text-gray-300">
      <div>
        <p className="font-semibold">Email:</p>
        <a href={`mailto:${email}`} className="hover:underline">{email}</a>
      </div>
      <div>
        <p className="font-semibold">Phone:</p>
        <a href={`tel:${phone}`} className="hover:underline">{phone}</a>
      </div>
      <div>
        <p className="font-semibold">Address:</p>
        <p>{address}</p>
      </div>
      <div className="flex justify-center">
        <img src={wechatQr} alt="WeChat QR Code" className="w-32 h-32 object-cover" />
      </div>
    </div>
  );
}
