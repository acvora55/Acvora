import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

/* Stat Component */
const Stat = ({ label, value, highlight = false }) => (
  <div className="flex flex-col rounded-xl border border-white/30 bg-white/70 p-2 shadow-sm backdrop-blur-sm ring-1 ring-inset ring-yellow-100">
    <span className="text-sm text-gray-800">{label}</span>
    <span
      className={`mt-1 text-xl ${
        highlight ? "font-semibold text-yellow-500" : "font-medium text-gray-900"
      }`}
    >
      {value}
    </span>
  </div>
);

/* Generic Card with optional image */
const Card = ({ title, desc, icon, imgSrc }) => (
  <div className="group rounded-2xl border border-yellow-100 bg-gray-100 p-0 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md backdrop-blur-sm ring-1 ring-yellow-100 overflow-hidden">
    {imgSrc ? (
      <div className="relative h-32 w-full overflow-hidden">
        <img
          src={imgSrc}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
      </div>
    ) : null}
    <div className="p-5">
      <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-gray-100 via-gray-50 to-fuchsia-50 text-yellow-500 ring-1 ring-inset ring-gray-200">
        {icon ?? <span className="text-lg">★</span>}
      </div>
      <h4 className="text-base font-semibold text-gray-900">{title}</h4>
      {desc && <p className="mt-1 text-sm text-gray-600">{desc}</p>}
    </div>
  </div>
);

/* Institute Card */
const InstituteCard = ({ title, desc, img }) => (
  <div className="snap-center shrink-0 w-80">
    <div className="group overflow-hidden rounded-2xl border border-white/30 bg-white/90 shadow-sm transition hover:shadow-md backdrop-blur-sm ring-1 ring-yellow-100">
      <div className="relative h-44 w-full overflow-hidden">
        <img
          src={img}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent" />
      </div>
      <div className="p-4">
        <h4 className="text-base font-semibold text-gray-900">{title}</h4>
        {desc && <p className="mt-1 text-sm text-gray-600">{desc}</p>}
      </div>
    </div>
  </div>
);

/* Section Component */
const Section = ({ title, subtitle, children, id }) => (
  <section id={id} className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">{title}</h2>
        {subtitle && <p className="mt-1 text-gray-600">{subtitle}</p>}
      </div>
      <div className="hidden gap-2 sm:flex">
        <a
          href="#counselor"
          className="rounded-lg bg-gradient-to-r from-yellow-600 to-yellow-200 px-4 py-2 text-sm font-medium text-gray-900 shadow-sm hover:from-yellow-500 hover:to-yellow-700"
        >
          Talk to Counselor
        </a>
      </div>
    </div>
    {children}
  </section>
);

export default function CoursePage() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const scrollerRef = useRef(null);

  // Mock image mappings (replace with actual asset paths or API data)
  const INSTITUTE_IMAGES = {
    "IIM Indore": "/Indore.jpeg",
    "Shaheed Sukhdev College": "/Delhi.jpeg",
    "NMIMS Mumbai": "/Mumbai.jpeg",
    "Symbiosis": "/Symbiosis.jpeg",
  };

  const SPECIALIZATION_IMAGES = {
    "Marketing": "/Marketing.jpeg",
    "Finance": "/Finance.jpeg",
    "HR Management": "/HR.jpeg",
    "Business Analytics": "/BA.jpeg",
  };

  // Fetch course data
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(`https://acvora-07fo.onrender.com/api/courses/${id}`);
        const courseData = await res.json();
        console.log("Course fetched:", courseData);

        const parsed = {
          ...courseData,
          highlights: courseData.highlights ? courseData.highlights.split(",") : [],
          careerRoles: courseData.careerRoles ? courseData.careerRoles.split(",") : [],
          topInstitutes: courseData.topInstitutes ? courseData.topInstitutes.split(",") : [],
          curriculum: courseData.curriculum ? courseData.curriculum.split(",") : [],
          eligibilityItems: courseData.eligibility
            ? courseData.eligibility.split("\n").filter(item => item.trim())
            : [],
          admissionItems: courseData.admissionProcess
            ? courseData.admissionProcess.split("\n").filter(item => item.trim())
            : [],
          scholarshipsItems: courseData.scholarships
            ? courseData.scholarships.split("\n").filter(item => item.trim())
            : [],
          abroadItems: courseData.abroadOptions
            ? courseData.abroadOptions.split("\n").filter(item => item.trim())
            : [],
          faqsBlocks: courseData.faqs
            ? courseData.faqs.split("\n\n").map(block => {
                const lines = block.split("\n");
                return {
                  question: lines[0] || "",
                  answer: lines.slice(1).join("\n") || ""
                };
              }).filter(faq => faq.question && faq.answer)
            : [],
          specializations: courseData.specializations || [], // Always array
          topInstituteImages: courseData.topInstituteImages || [], // Always array
        };

        setCourse(parsed);
      } catch (err) {
        console.error("Error fetching course:", err);
      }
    };

    fetchCourse();
  }, [id]);

  // Auto-scroll for institutes
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const firstCard = el.querySelector(":scope > .contents > *");
    const cardWidth = firstCard?.getBoundingClientRect().width || 320;
    const gap = 16;
    const stride = cardWidth * 3 + gap * 3;
    let scrollAmount = 0;

    const step = () => {
      const max = el.scrollWidth - el.clientWidth;
      const next = scrollAmount + stride;
      if (next >= max - 4) {
        scrollAmount = 0;
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scrollAmount = next;
        el.scrollTo({ left: scrollAmount, behavior: "smooth" });
      }
    };

    const interval = setInterval(step, 3200);
    const pause = () => clearInterval(interval);
    el.addEventListener("mouseenter", pause);
    el.addEventListener("touchstart", pause, { passive: true });
    el.addEventListener("mousedown", pause);

    return () => {
      clearInterval(interval);
      el.removeEventListener("mouseenter", pause);
      el.removeEventListener("touchstart", pause);
      el.removeEventListener("mousedown", pause);
    };
  }, [course]);

  if (!course) return <div className="flex justify-center items-center min-h-screen text-xl text-gray-600">Loading course...</div>;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-gray-100 via-purple to-fuchsia-50/40 text-gray-900">
        {/* Navbar */}
        <header className="sticky top-0 z-30 w-full border-b border-gray-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-r from-gray-800 to-gray-500 text-white font-bold shadow-sm">
                {course.shortName || "🎓"}
              </div>
              <span className="hidden text-sm font-medium text-gray-700 sm:inline">
                {course.courseTitle}
              </span>
            </div>
            <nav className="hidden items-center gap-6 text-sm text-gray-700 md:flex">
              <a href="#overview" className="hover:text-yellow-500">
                Overview
              </a>
              <a href="#specializations" className="hover:text-yellow-500">
                Specializations
              </a>
              <a href="#eligibility" className="hover:text-yellow-500">
                Eligibility
              </a>
              <a href="#curriculum" className="hover:text-yellow-500">
                Curriculum
              </a>
              <a href="#institutes" className="hover:text-yellow-500">
                Top Institutes
              </a>
              <a href="#career" className="hover:text-yellow-500">
                Careers
              </a>
              <a href="#scholarships" className="hover:text-yellow-500">
                Scholarships
              </a>
              <a href="#faqs" className="hover:text-yellow-500">
                FAQs
              </a>
            </nav>
            <a
              href="#brochure"
              className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-black"
            >
              Download Brochure
            </a>
          </div>
        </header>

        {/* Hero Section */}
        <section
          id="overview"
          className="relative bg-gray-100 mx-auto w-full max-w-6xl px-4 pb-10 pt-10 sm:px-6 lg:px-8"
        >
          <div className="absolute inset-0 -z-10 pointer-events-none">
            <div className="mx-auto max-w-6xl">
              <div className="absolute left-8 top-8 h-40 w-40 rounded-full bg-gray-200/40 blur-3xl" />
              <div className="absolute right-8 -top-6 h-56 w-56 rounded-full bg-fuchsia-200/40 blur-3xl" />
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-5 md:gap-10">
            <div className="md:col-span-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-gray-50 px-3 py-1 text-xs font-medium text-yellow-500 ring-1 ring-gray-200">
                {course.shortName || "Course"}
              </div>
              <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                {course.courseTitle}
              </h1>
              <p className="mt-3 text-gray-800">
                {course.description}
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <Stat label="Duration" value={course.duration} highlight />
                <Stat label="Fees" value={course.fees} />
                <Stat label="Mode" value={course.mode} />
                <Stat label="Level" value={course.level} />
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href="#counselor"
                  className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-800 shadow-sm hover:bg-gray-50"
                >
                  Talk to Counselor
                </a>
                <a
                  href="#brochure"
                  className="rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-yellow-500"
                >
                  Download Brochure
                </a>
              </div>
            </div>

            <div className="md:col-span-2">
              <div className="relative overflow-hidden rounded-2xl border border-white/30 bg-white/50 p-5 shadow-sm backdrop-blur-sm ring-1 ring-yellow-100">
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-yellow-50 blur-2xl" />
                <h3 className="text-lg font-semibold text-gray-900">Key Highlights</h3>
                <ul className="mt-3 space-y-2 text-sm text-gray-800">
                  {(course.highlights || []).map((item, idx) => (
                    <li key={idx}>{item.trim()}</li>
                  ))}
                </ul>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <Stat label="Internship" value={course.internship || "N/A"} />
                  <Stat label="Placement" value={course.placement || "N/A"} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Specializations */}
        <Section
          id="specializations"
          title="Specializations"
          subtitle="Choose a focus area to align with career goals."
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {(course.specializations || []).map((spec, idx) => (
              <Card
                key={idx}
                title={spec.name || `Specialization ${idx + 1}`}
                desc={spec.description}
                imgSrc={spec.image ? `https://acvora-07fo.onrender.com/${spec.image}` : SPECIALIZATION_IMAGES[spec.name] || "/default-spec.jpeg"}
              />
            ))}
          </div>
        </Section>

        {/* Eligibility & Admission */}
        <Section
          id="eligibility"
          title="Eligibility & Admission"
          subtitle="Check requirements, exams, and application timelines."
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-white/30 bg-white/40 p-6 shadow-sm backdrop-blur-sm ring-1 ring-yellow-100">
              <h4 className="text-lg font-semibold text-gray-900">Eligibility</h4>
              <ul className="mt-3 space-y-2 text-gray-800 text-sm">
                {(course.eligibilityItems || []).map((item, idx) => (
                  <li key={idx}>{item.trim()}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-white/30 bg-white/40 p-6 shadow-sm backdrop-blur-sm ring-1 ring-yellow-100">
              <h4 className="text-lg font-semibold text-gray-900">Entrance & Admission</h4>
              <ul className="mt-3 space-y-2 text-gray-800 text-sm">
                {(course.admissionItems || []).map((item, idx) => (
                  <li key={idx}>{item.trim()}</li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        {/* Application Guide */}
        <Section
          id="application-guide"
          title="Application Guide"
          subtitle="Step-by-step overview of the process."
        >
          <div className="grid gap-4 md:grid-cols-3">
            <Card title="1. Register" desc="Create applicant profile" />
            <Card title="2. Apply" desc="Fill form, upload documents" />
            <Card title="3. Exam/Shortlist" desc="Entrance/merit-based shortlist" />
            <Card title="4. Interview" desc="PI/WAT/GD as applicable" />
            <Card title="5. Offer" desc="Provisional admission" />
            <Card title="6. Enroll" desc="Fee payment & onboarding" />
          </div>
        </Section>

        {/* Curriculum */}
        <Section
          id="curriculum"
          title="Curriculum Snapshot"
          subtitle="Core subjects and electives."
        >
          <div className="grid gap-6 lg:grid-cols-3">
            {(course.curriculum || []).map((item, idx) => (
              <div key={idx} className="rounded-2xl border border-white/30 bg-white/40 p-6 shadow-sm backdrop-blur-sm ring-1 ring-yellow-100">
                <h4 className="text-lg font-semibold text-gray-900">Subject {idx + 1}</h4>
                <ul className="mt-3 space-y-2 text-sm text-gray-800">
                  <li>{item.trim()}</li>
                </ul>
              </div>
            ))}
          </div>
        </Section>

        {/* Top Institutes */}
        <Section
          id="institutes"
          title="Top Institutes"
          subtitle="Popular institutions offering this course."
        >
          <div className="relative">
            <div className="pointer-events-none absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-gray-100 to-fuchsia-50" />
            <div className="rounded-xl border border-white/30 bg-white/50 p-4 backdrop-blur-sm shadow-sm ring-1 ring-indigo-100">
              <div
                ref={scrollerRef}
                className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 pt-2 [scrollbar-width:thin]"
                style={{ WebkitOverflowScrolling: "touch", scrollBehavior: "smooth" }}
              >
                <div className="contents lg:[&>*]:w-[calc((100vw-2rem-2rem-2rem)/3)] xl:[&>*]:w-[calc((72rem-2rem-2rem-2rem)/3)]">
                  {(course.topInstituteImages || []).map((item, idx) => (
                    <InstituteCard
                      key={idx}
                      title={item.description || course.topInstitutes?.[idx] || `Institute ${idx + 1}`}
                      img={item.url ? `https://acvora-07fo.onrender.com/${item.url}` : INSTITUTE_IMAGES[course.topInstitutes?.[idx]] || "/default-institute.jpeg"}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Career Opportunities */}
        <Section
          id="career"
          title="Career Opportunities"
          subtitle="Roles with strong growth potential."
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-white/30 bg-gray-100 p-6 shadow-sm backdrop-blur-sm ring-1 ring-yellow-100">
              <h4 className="text-lg font-semibold text-gray-900">Popular Roles</h4>
              <ul className="mt-3 space-y-2 text-sm text-gray-800">
                {(course.careerRoles || []).map((role, idx) => (
                  <li key={idx}>{role.trim()}</li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        {/* Scholarships & Abroad Options */}
        <Section
          id="scholarships"
          title="Scholarships & Abroad Options"
          subtitle="Merit-based aid, need-based support, and exchange programs."
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-white/30 bg-white/50 p-6 shadow-sm backdrop-blur-sm ring-1 ring-yellow-100">
              <h4 className="text-lg font-semibold text-gray-900">Scholarships</h4>
              <ul className="mt-3 space-y-2 text-gray-800 text-sm">
                {(course.scholarshipsItems || []).map((item, idx) => (
                  <li key={idx}>{item.trim()}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-white/30 bg-white/50 p-6 shadow-sm backdrop-blur-sm ring-1 ring-yellow-100">
              <h4 className="text-lg font-semibold text-gray-900">Study Abroad & Exchange</h4>
              <ul className="mt-3 space-y-2 text-gray-800 text-sm">
                {(course.abroadItems || []).map((item, idx) => (
                  <li key={idx}>{item.trim()}</li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        {/* FAQs */}
        <Section id="faqs" title="FAQs" subtitle="Quick answers to common queries.">
          <div className="grid gap-4 md:grid-cols-2">
            {(course.faqsBlocks || []).map((faq, idx) => (
              <div key={idx} className="rounded-xl border border-white/30 bg-gray-200 p-5 shadow-sm backdrop-blur-sm ring-1 ring-yellow-100">
                <h4 className="font-semibold text-gray-900">{faq.question}</h4>
                <p className="mt-1 text-sm text-gray-800">{faq.answer}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* CTA Section */}
        <section id="apply" className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-white/30 bg-gradient-to-r from-gray-900 to-gray-600 p-8 text-white shadow-sm">
            <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-white/15 blur-2xl"></div>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="md:col-span-2">
                <h3 className="text-2xl font-bold">Ready to begin your journey?</h3>
                <p className="mt-1 text-white/90">
                  Apply now or speak with a counselor to clarify admissions and course details.
                </p>
              </div>
              <div className="flex items-center gap-3 md:justify-end">
                <a
                  href="#counselor"
                  className="rounded-lg bg-white/15 px-5 py-3 text-sm font-semibold text-white ring-1 ring-inset ring-white/30 backdrop-blur hover:bg-white/25"
                >
                  Talk to Counselor
                </a>
                <a
                  href="#apply-form"
                  className="rounded-lg bg-white px-5 py-3 text-sm font-semibold text-yellow-500 hover:bg-yellow-50"
                >
                  Start Application
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />
        <footer className="border-t border-white/30 bg-white/80 backdrop-blur">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-gray-600 sm:flex-row sm:px-6 lg:px-8">
            <p>© {new Date().getFullYear()} Course Guide</p>
            <div className="flex items-center gap-4">
              <a href="#brochure" className="hover:text-yellow-500">
                Brochure
              </a>
              <a href="#counselor" className="hover:text-yellow-500">
                Counselor
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}