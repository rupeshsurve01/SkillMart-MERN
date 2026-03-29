import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Unable to send message.");

      setStatus("Message sent successfully. We'll get back to you soon.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error(error);
      setStatus(error.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-[#120d33] text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
          <div className="grid gap-10 lg:grid-cols-2 items-center">
            <div className="space-y-6">
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">
                Contact us
              </p>
              <h2 className="text-4xl font-bold text-white">
                We’re here to help
              </h2>
              <p className="text-slate-300 leading-relaxed">
                Have a question, suggestion, or need help with your courses?
                Send us a message and we’ll get back to you as soon as possible.
              </p>

              <div className="space-y-4 rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
                <div>
                  <h3 className="text-sm text-slate-400">Email</h3>
                  <p className="text-white">support@skillmart.com</p>
                </div>
                <div>
                  <h3 className="text-sm text-slate-400">Phone</h3>
                  <p className="text-white">+91 98765 43210</p>
                </div>
                <div>
                  <h3 className="text-sm text-slate-400">Office</h3>
                  <p className="text-white">Mumbai, India</p>
                </div>
              </div>
            </div>

            <div className="rounded-[32px] border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur">
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  type="text"
                  placeholder="Your Name"
                  className="w-full rounded-3xl border border-white/15 bg-white/10 px-4 py-3 text-white placeholder:text-slate-300 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/20"
                  required
                />
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="Your Email"
                  className="w-full rounded-3xl border border-white/15 bg-white/10 px-4 py-3 text-white placeholder:text-slate-300 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/20"
                  required
                />
                <input
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  type="text"
                  placeholder="Subject"
                  className="w-full rounded-3xl border border-white/15 bg-white/10 px-4 py-3 text-white placeholder:text-slate-300 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/20"
                  required
                />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  rows="5"
                  className="w-full rounded-3xl border border-white/15 bg-white/10 px-4 py-3 text-white placeholder:text-slate-300 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/20"
                  required
                ></textarea>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-3xl bg-[#6f26eb] px-6 py-3 text-white font-semibold transition hover:bg-purple-700 disabled:opacity-70"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>

                {status && (
                  <p className="text-sm text-slate-100 bg-slate-800/70 rounded-3xl px-4 py-3 mt-2">
                    {status}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Contact;
