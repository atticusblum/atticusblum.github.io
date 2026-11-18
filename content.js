/*
  ALL editable text, links, and images for the site live in this file.
  Search for "TODO" to find placeholder text to replace.
  Images: put the file in assets/ and change the path here.
  "focus" is the part of a photo that must stay visible when it is cropped,
  as "x% y%" (left/top). "50% 50%" is the center, "50% 20%" keeps the top.
  Every section can have a "background" photo. It sits behind the frosted glass.
  Set background: { image: "" } for a plain dark background.
*/
window.CONTENT = {
  site: {
    title: "Atticus Blum | Business @ Gonzaga, Designer, Builder",
    description: "Atticus Blum: Business Administration student at Gonzaga, freelance graphic designer, and website builder for local businesses.",
  },

  name: "Atticus Blum",
  monogram: "AB",
  tagline: "Business @ Gonzaga · Designer · Builder",
  intro: "", // optional short line under the tagline; leave "" for none

  links: {
    linkedin: "https://www.linkedin.com/in/atticusblum",
    email: "atticusblum@gmail.com",
    resume: "assets/resume.pdf", // TODO: replace with a PDF exported straight from Word (this one is a quick conversion)
    // Picture of page 1, shown as the preview on phones (phones can't show PDFs inside a page).
    // Remake it after changing the resume (see README), or set to "" to skip it.
    resumePreview: "assets/resume-preview.jpg",
  },

  hero: {
    image: "assets/hero.jpg",
    webp: "assets/hero.webp", // set to "" if you swap in a new hero.jpg and don't make a WebP
    focus: "48% 65%",
    alt: "Atticus climbing a glacier at sunrise above a sea of clouds",
  },

  // Arrow links under the buttons. "to" is a section id below.
  heroLinks: [
    { label: "I build", to: "projects" },
    { label: "I learn", to: "academics" },
  ],

  // Section order on the page and in the nav (numbers 01, 02... follow it).
  // Reorder by moving these words. A section with no content hides itself.
  order: ["about", "projects", "personal", "academics", "future", "contact"],

  about: {
    nav: "About",
    heading: "About",
    background: { image: "assets/bg/about-lake.jpg", focus: "60% 60%" },
    // The rectangle photo next to the text. Takes about 30% of the width.
    portrait: { image: "assets/portrait.jpg", focus: "50% 25%", alt: "Atticus Blum" },
    paragraphs: [
      "I'm a first-year Business Administration student at Gonzaga's Jepson School of Business, working toward concentrations in Finance and Marketing.",
      "I've been designing for clients since my freshman year of high school, from athletics graphics to admissions campaigns. Now I'm starting a website business for local businesses. This site is one of my builds.",
      "Outside of class you'll find me on a mountain, on a trail, or playing guitar.", // TODO: make this sound like you
    ],
    leadershipHeading: "Experience and leadership",
    leadership: [
      { role: "Consultant", org: "Gonzaga New Venture Lab", years: "Fall 2026 to now", line: "Student team engagement with The Depot, a Spokane culinary collective and food hall." },
      { role: "Freelance Graphic Designer", org: "Self-employed", years: "Fall 2026 to now", line: "Admissions marketing and hallway posters for Kennedy Catholic." },
      { role: "Graphic Designer", org: "Kennedy Catholic Brand Team & Athletics", years: "2022 to 2026", line: "Four years of athletics, event, and admissions design; senior-year brand intern." },
      { role: "Co-Founder", org: "Kennedy Catholic DECA", years: "2024 to 2026", line: "Brought DECA back after 20+ years and grew weekly attendance 40%." },
      { role: "Lead Ambassador", org: "Kennedy Catholic Admissions", years: "2023 to 2026", line: "Open houses, campus tours, and parent panels." },
      { role: "Retreat Leader", org: "Kennedy Catholic Campus Ministry", years: "2023 to 2026", line: "Led 5 retreats as a peer minister." },
    ],
  },

  academics: {
    nav: "Academics",
    heading: "Academics",
    background: { image: "assets/bg/academics-graduation.jpg", focus: "50% 30%" },
    school: "Gonzaga University",
    college: "Jepson School of Business",
    degree: "B.B.A. Business Administration",
    focus: "Concentrations: Finance & Marketing (in progress)",
    year: "Class of 2030",
    courseworkHeading: "This semester",
    coursework: [
      "BUSN 101 Intro to Business",
      "BUSN 111 Business Computing",
      "ECON 201 Microeconomics",
      "PHYS 104 Everyday Physics",
      "VART 232", // TODO: add the full course name
    ],
    honorsHeading: "Honors",
    honors: [
      "Summa Cum Laude (high school)",
      "AP Scholar with Distinction",
      "Frassati Scholar (AP Research & AP Seminar)",
      "National Honor Society",
      "Burien Rotary Student of the Month",
    ],
  },

  projects: {
    nav: "Projects",
    heading: "Projects",
    background: { image: "assets/bg/projects-baker.jpg", focus: "50% 40%" },
    featuredHeading: "Featured",
    moreHeading: "More work",
    // featured: true puts a card under "Featured". gallery = extra images in the viewer.
    // link = optional "Visit" button in the viewer. Leave "" for none.
    items: [
      {
        title: "Jarvis",
        description: "A personal AI dashboard I built: calendar, tasks, school, and email in one place.",
        image: "assets/design/jarvis-dashboard.jpg",
        focus: "50% 0%",
        link: "",
        featured: true,
        gallery: ["assets/design/jarvis-core.jpg", "assets/design/jarvis-calendar.jpg", "assets/design/jarvis-learn.jpg"],
      },
      {
        title: "Lancers Winter Sports Poster",
        description: "Season schedule poster for Kennedy Catholic Athletics, from hero art to print.",
        image: "assets/design/kc-winter-poster.jpg",
        focus: "50% 15%",
        link: "",
        featured: true,
        gallery: [],
      },
      {
        title: "Admissions Alumni Posters",
        description: "Hallway campaign featuring alumni voices to drive enrollment.",
        image: "assets/design/kc-alumni-posters.jpg",
        focus: "50% 30%",
        link: "",
        featured: true,
        gallery: [],
      },
      {
        title: "AJB Recruiting Graphics",
        description: "Offer announcements and statewide rankings for high school basketball.",
        image: "assets/design/ajb-tripp-haywood.jpg",
        focus: "50% 30%",
        link: "",
        featured: true,
        gallery: ["assets/design/ajb-top-25.jpg"],
      },
      {
        title: "Senior Prom 2026",
        description: "Event poster for a night at the Seattle Aquarium.",
        image: "assets/design/kc-senior-prom.jpg",
        focus: "50% 25%",
        link: "",
        featured: false,
        gallery: [],
      },
      {
        title: "Built for State",
        description: "State playoff shirt design for Kennedy Catholic football.",
        image: "assets/design/kc-built-for-state.jpg",
        focus: "50% 40%",
        link: "",
        featured: false,
        gallery: [],
      },
      {
        title: "Travel Night",
        description: "Email art for a study abroad info night.",
        image: "assets/design/kc-travel-night.jpg",
        focus: "50% 20%",
        link: "",
        featured: false,
        gallery: [],
      },
      {
        title: "Boys Lacrosse Composite",
        description: "Varsity team composite for the spring season.",
        image: "assets/design/kc-lax-composite.jpg",
        focus: "50% 40%",
        link: "",
        featured: false,
        gallery: [],
      },
    ],
  },

  personal: {
    nav: "Personal",
    heading: "Off the clock",
    background: { image: "assets/bg/personal-trail.jpg", focus: "50% 50%" },
    intro: "Most weekends I'm outside.", // TODO: your own line
    items: [
      { title: "Above the clouds", caption: "Sunrise on the glacier." /* TODO: which mountain and when */, image: "assets/hero.jpg", focus: "48% 65%" },
      { title: "Summit break", caption: "Taking in the view." /* TODO: where this was */, image: "assets/personal/summit.jpg", focus: "40% 60%" },
      { title: "On the trail", caption: "Miles in the Cascades." /* TODO: trail name */, image: "assets/personal/trail.jpg", focus: "50% 55%" },
      { title: "Alpine lake", caption: "Worth the climb." /* TODO: lake name */, image: "assets/personal/alpine-lake.jpg", focus: "60% 60%" },
      { title: "Mt. Baker", caption: "Next on the list." /* TODO: add a caption */, image: "assets/personal/mt-baker.jpg", focus: "50% 40%" },
      { title: "Gonzaga", caption: "Home base in Spokane.", image: "assets/personal/gonzaga.jpg", focus: "50% 50%" },
    ],
  },

  future: {
    nav: "Future",
    heading: "What's next",
    background: { image: "assets/bg/future-summit.jpg", focus: "40% 50%" },
    paragraphs: [
      "I'm starting a website business for local Spokane businesses. Fast, clean sites that are easy to update. If you know someone who needs one, I'd love to talk.",
      "I'm also looking for finance and marketing internships for summer 2027.", // TODO: confirm both lines
    ],
  },

  contact: {
    nav: "Contact",
    heading: "Let's talk",
    background: { image: "assets/bg/contact-gonzaga.jpg", focus: "50% 50%" },
    line: "Fastest way to reach me is email or LinkedIn.",
    qrLabel: "Scan to open my LinkedIn",
  },

  footer: "Designed and built by Atticus Blum.",
};
