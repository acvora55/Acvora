import React from "react";
import { motion } from "framer-motion";
import { Shield, Lock, Cookie, FileCheck, Phone, Mail } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Privacy() {
  const sections = [
    {
      title: "Introduction",
      content:
        "We respect your privacy and are committed to safeguarding your personal information. This Privacy Policy explains how we handle your data when you use our platform.",
      icon: Shield,
    },
    {
      title: "Information We Collect",
      content:
        "Personal data (name, email, phone, DOB, profile details). Academic details (qualification, preferences, applications). Payment & transaction info (only via secure gateways). Technical data (cookies, device, browser, location).",
      icon: FileCheck,
    },
    {
      title: "How We Use Your Information",
      content:
        "To provide services (scholarships, loans, counseling, study abroad). To personalize recommendations. To process payments securely. To communicate updates, offers, and alerts. To comply with laws/regulations.",
      icon: Lock,
    },
    {
      title: "Sharing of Information",
      content:
        "With institutes (only after your consent when applying). With agents (only for enrolled services). With payment providers (for transactions). With third-party service providers (hosting, analytics, email, SMS). Never sold to advertisers or unauthorized parties.",
      icon: Shield,
    },
    {
      title: "Cookies & Tracking",
      content:
        "We use cookies for analytics, personalization, and performance. You may disable cookies, but this could limit your experience.",
      icon: Cookie,
    },
    {
      title: "Data Security",
      content:
        "We use encryption at rest and in transit, secure AWS storage, and conduct regular audits & monitoring.",
      icon: Lock,
    },
    {
      title: "Your Rights",
      content:
        "You may access, edit, or delete your data. Withdraw consent at any time. Request a copy of your stored data.",
      icon: FileCheck,
    },
    {
      title: "Children’s Privacy",
      content:
        "Our services are designed for individuals aged 16+. If you are under 16, parental consent is required.",
      icon: Shield,
    },
    {
      title: "Changes to This Policy",
      content:
        "We may update this policy periodically. Updated versions will always include a 'Last Updated' date.",
      icon: FileCheck,
    },
    {
      title: "Contact Us",
      content:
        "For any privacy-related concerns, write to us at privacy@yourdomain.com or call +91 98765 43210.",
      icon: Phone,
    },
  ];

  return (
    <>
    <Navbar />
    <div className="bg-gray-100 text-gray-800 min-h-screen">
      {/* Hero Section */}
      <header className="relative bg-gray-200 text-gray-900 text-center py-20 px-6">
        <h1 className="text-5xl font-extrabold mb-4 drop-shadow-md">
          Privacy Policy
        </h1>
        <p className="text-xl max-w-3xl text-yellow-500 mx-auto font-semibold drop-shadow-md">
          Your trust matters. Here’s how we collect, use, and protect your data.
        </p>
      </header>

      {/* Sections aligned left */}
      <div className="text-left max-w-5xl mt-10 mx-auto space-y-8 px-6">
        {sections.map((sec, idx) => {
          const Icon = sec.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              viewport={{ once: true }}
              className="border-b border-gray-300 pb-6"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-full bg-yellow-500 text-white">
                  <Icon size={18} />
                </div>
                <h2 className="text-lg font-semibold">{sec.title}</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">{sec.content}</p>
            </motion.div>
          );
        })}
      </div>
          <div className="max-w-4xl mx-auto mt-12 p-8 bg-gray-800 rounded-lg text-center mb-5 text-white">
  <h2 className="text-2xl font-bold text-yellow-500 mb-4">Need Assistance?</h2>
  <p className="mb-6 text-gray-200">
    If you need more help or have questions regarding services, you can reach out to us or proceed to the contact page.
  </p>
  
  <div className="space-x-6">
    <a
      href="#apply"
      className="inline-block bg-gray-900 text-yellow-500 font-bold px-8 py-3 rounded-lg shadow-lg hover:bg-yellow-500 hover:text-gray-900 transition"
    >
      Need more Help ?
    </a>
    <a
      href="Contactus"
      className="inline-block border-2 border-yellow-500 text-yellow-500 font-bold px-8 py-3 rounded-lg shadow-lg hover:bg-yellow-500 hover:text-gray-900 transition"
    >
      Contact Us
    </a>
  </div>
</div>


    </div>
    <Footer />
    </>
  );
}
