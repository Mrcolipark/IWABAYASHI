import emailjs from '@emailjs/browser';

const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

export function sendContactEmail(data) {
  const params = {
    from_name: data.name,
    from_email: data.email,
    company: data.company,
    phone: data.phone,
    subject: data.subject,
    message: data.message,
  };

  return emailjs.send(serviceId, templateId, params, {
    publicKey,
  });
}
