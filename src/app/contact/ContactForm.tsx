"use client";

import { FormEvent, useState } from "react";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
const [isSubmitting, setIsSubmitting] = useState(false);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setSuccess("");
    setError("");
  };
const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  setIsSubmitting(true);

  
  if (
  !formData.name ||
  !formData.email ||
  !formData.phone ||
  !formData.message
) {
  setError("Please fill all required fields.");
  setIsSubmitting(false);
  return;
}

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(formData.email)) {
  setError("Please enter a valid email address.");
  setIsSubmitting(false);
  return;
}

  const phoneRegex = /^[6-9]\d{9}$/;

if (!phoneRegex.test(formData.phone)) {
  setError("Please enter a valid 10-digit phone number.");
  setIsSubmitting(false);
  return;
}
  console.log("Contact Data:", formData);

const savedMessages = JSON.parse(
  localStorage.getItem("contactMessages") || "[]"
);

savedMessages.push({
  id: `MSG-${Date.now()}`,
  ...formData,
  createdAt: new Date().toISOString(),
});

localStorage.setItem(
  "contactMessages",
  JSON.stringify(savedMessages)
);

setSuccess("Your message has been sent successfully!");

  setFormData({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  setIsSubmitting(false);
};

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 space-y-5 sm:mt-8 sm:space-y-6"
    >
      {/* Name + Email */}
      <div className="grid gap-5 sm:gap-6 md:grid-cols-2">
        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Full Name
          </label>

          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-amber-500 sm:text-base"
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Email Address
          </label>

          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-amber-500 sm:text-base"
          />
        </div>
      </div>

      {/* Phone */}
      <div>
        <label
          htmlFor="phone"
          className="mb-2 block text-sm font-semibold text-slate-700"
        >
          Phone Number
        </label>

        <input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Enter your phone number"
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-amber-500 sm:text-base"
        />
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="message"
          className="mb-2 block text-sm font-semibold text-slate-700"
        >
          Message
        </label>

        <textarea
          id="message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          placeholder="Write your message..."
          className="w-full resize-none rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-amber-500 sm:text-base"
        />
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm font-semibold leading-6 text-red-700">
          {error}
        </div>
      )}

      {/* Success */}
      {success && (
        <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-sm font-semibold leading-6 text-green-700">
          {success}
        </div>
      )}

      {/* Submit */}
      <button
  type="submit"
  disabled={isSubmitting}
  className="w-full rounded-lg bg-amber-500 px-7 py-3 text-sm font-semibold text-slate-900 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:text-base"
>
  {isSubmitting ? "Sending..." : "Send Message"}
</button>
    </form>
  );
}