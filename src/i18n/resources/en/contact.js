export default {
  title: "Contact Us",
  subtitle: "We look forward to establishing cooperative relationships with you",
  
  info: {
    company: "IWABAYASHI Corporation",
    email: "info@iwabayashi.com",
    phone: "+81-3-1234-5678",
    address: "Iwabayashi Building 10F, 1-2-3 Akasaka, Minato-ku, Tokyo, Japan",
    businessHours: "Monday to Friday 9:00-18:00 (JST)"
  },

  sections: {
    contactInfo: "Contact Information",
    sendMessage: "Send Message",
    trafficInfo: "Transportation Information",
    frequentQuestions: "Frequently Asked Questions",
    ourLocation: "Our Location",
    detailedAddress: "Detailed Address",
    visitAppointment: "Visit Appointment"
  },

  form: {
    name: "Name",
    email: "Email Address",
    company: "Company Name",
    phone: "Phone Number",
    subject: "Subject",
    message: "Message",
    submit: "Send Message",
    sending: "Sending...",
    success: "Message sent successfully! We will reply to you as soon as possible.",
    error: "Sending failed, please try again later.",
    namePlaceholder: "Please enter your name",
    emailPlaceholder: "Please enter your email address",
    companyPlaceholder: "Please enter your company name",
    phonePlaceholder: "Please enter your phone number",
    subjectPlaceholder: "Please select a subject",
    messagePlaceholder: "Please describe your needs or questions in detail, we will reply to you as soon as possible...",
    subjects: [
      { value: "", label: "Please select a subject" },
      { value: "health-product-import", label: "Japanese Health Product Import Agency" },
      { value: "commodity-export", label: "Chinese Commodity Export" },
      { value: "supply-chain", label: "Supply Chain Management Services" },
      { value: "market-consulting", label: "Market Consulting Services" },
      { value: "partnership", label: "Partnership Discussion" },
      { value: "other", label: "Other Inquiries" }
    ]
  },

  contactMethods: {
    email: "Email Address",
    phone: "Phone Number",
    address: "Office Address",
    hours: "Business Hours"
  },

  traffic: [
    "Tokyo Metro Ginza Line, Marunouchi Line Akasaka-mitsuke Station 5-minute walk",
    "Tokyo Metro Chiyoda Line Akasaka Station 3-minute walk",
    "JR Chuo Line, Sobu Line Yotsuya Station 10-minute walk"
  ],

  mapActions: {
    viewOnMap: "View on Map",
    phoneAppointment: "Phone Appointment",
    emailAppointment: "Email Appointment"
  },

  locationDetails: {
    office: "Office Address",
    nearestStation: "Nearest Station",
    receptionHours: "Reception Hours",
    appointmentNote: "※ Please make an appointment before visiting"
  },

  appointmentInfo: {
    title: "Visit Appointment",
    description: "If you would like to visit our office for a meeting, please make an appointment in advance by phone or email. We will arrange a suitable time for you and provide detailed transportation directions."
  },

  faq: [
    {
      question: "What types of Japanese health product import services do you provide?",
      answer: "We specialize in import agency services for premium Japanese health products, including nutritional supplements, beauty and health products, functional foods, etc. We have established cooperative relationships with many well-known Japanese brands to ensure product quality and safety."
    },
    {
      question: "How long does the general import agency service process take?",
      answer: "Generally speaking, the complete import agency process takes 30-45 working days, including product review, qualification processing, customs clearance, quality inspection and other procedures. The specific time will vary according to the product type and complexity."
    },
    {
      question: "How do you ensure the quality of imported products?",
      answer: "We have established a strict quality control system, including supplier qualification review, product quality testing, full-process traceability management, etc. All products comply with relevant regulatory standards in China and Japan."
    },
    {
      question: "When will the future commodity export business start?",
      answer: "We plan to gradually develop commodity export business in the second half of 2025. We are currently conducting market research and channel construction, and expect to officially launch related business in 2026."
    },
    {
      question: "How are your service fees calculated?",
      answer: "Our service fees are determined based on factors such as the complexity of specific projects, product types, and service scope. We provide a transparent pricing system. Please feel free to inquire about specific quotes."
    },
    {
      question: "How can I start cooperation with you?",
      answer: "You can contact us by phone, email, or online form. We will arrange professional consultants to communicate with you, understand your specific needs, and develop suitable service plans for you."
    }
  ],

  servicePromise: {
    title: "Our Service Promise",
    description: "We look forward to establishing cooperative relationships with you and jointly exploring new opportunities in China-Japan trade",
    promises: [
      {
        title: "Quick Response",
        description: "Reply to your inquiries within 24 hours"
      },
      {
        title: "Professional Advice",
        description: "Provide professional trade consulting services"
      },
      {
        title: "Long-term Cooperation",
        description: "Establish long-term stable cooperative relationships"
      }
    ]
  }
};