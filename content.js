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
  tagline: "", // optional line under your name; leave "" for none
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
  order: ["about", "projects", "academics", "personal", "future", "contact"],

  about: {
    nav: "About",
    heading: "About",
    background: { image: "assets/bg/about-lake.jpg", focus: "60% 60%" },
    // The rectangle photo next to the text. Takes about 30% of the width.
    portrait: { image: "assets/portrait.jpg", focus: "50% 25%", alt: "Atticus Blum" },
    paragraphs: [
      "I'm from West Seattle, and I'm a first-year Business Administration student at Gonzaga's Jepson School of Business, working toward concentrations in Finance and Marketing.",
      "I've been designing for clients since my freshman year of high school, from athletics graphics to admissions campaigns. Now I'm starting a website business for local businesses. This site is one of my builds.",
      "Outside of class you'll find me on a mountain, on a trail, or playing guitar.", // TODO: make this sound like you
    ],
    // Count-up numbers under the paragraphs. Set stats: [] to hide them.
    stats: [
      { value: 2000, suffix: "+", label: "fans served per game" },
      { value: 40, suffix: "%", label: "DECA attendance growth" },
      { value: 5, suffix: "", label: "retreats led" },
    ],
    leadershipHeading: "Experience and leadership",
    leadership: [
      { role: "Catering Server", org: "Levy Restaurants", years: "Oct 2026 to now", line: "Serve guests at catered events across Spokane's five largest venues as part of Levy's catering team." },
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
    // extra lines shown under the degree
    more: [
      "Comprehensive Leadership Program",
      "Minor: Leadership Studies",
    ],
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
    background: { image: "assets/bg/projects-hike.jpg", focus: "50% 55%" },
    // Gallery images can be a plain path, or { image: "path", title: "name shown in the viewer" }.
    // Order here = order on the page. link = optional "Visit" button in the viewer.
    items: [
      {
        title: "Jarvis",
        description: "A personal AI dashboard I built: calendar, tasks, school, and email in one place.",
        image: "assets/design/jarvis-dashboard.jpg",
        focus: "50% 0%",
        link: "https://jarvis-atticus8.vercel.app/",
        linkOnly: true, // true = clicking the card opens the link in a new tab (no image viewer)
      },
      {
        title: "Kennedy Catholic Work",
        description: "Four years of athletics, admissions, and event design for Kennedy Catholic High School.",
        image: "assets/design/kc-winter-poster.jpg",
        focus: "50% 15%",
        link: "",
        gallery: [
          { image: "assets/design/kc-alumni-posters.jpg", title: "Admissions Alumni Posters" },
          { image: "assets/design/kc-senior-prom.jpg", title: "Senior Prom 2026" },
          { image: "assets/design/kc-built-for-state.jpg", title: "Built for State" },
          { image: "assets/design/kc-travel-night.jpg", title: "Travel Night" },
          { image: "assets/design/kc-lax-composite.jpg", title: "Boys Lacrosse Composite" },
        ],
        firstTitle: "Lancers Winter Sports Poster", // name shown for the cover image in the viewer
      },
      {
        title: "AJB Recruiting",
        description: "Offer announcements, commitments, and statewide rankings for high school athletes.",
        image: "assets/design/ajb-tripp-haywood.jpg",
        focus: "50% 30%",
        link: "",
        gallery: [
          "assets/design/ajb-top-25.jpg",
          "assets/design/ajb-sports-illustrated.jpg",
          "assets/design/ajb-harvey-lieberman.jpg",
          "assets/design/ajb-devon-forehand.jpg",
          "assets/design/ajb-top-10-washington.jpg",
        ],
        firstTitle: "Tripp Haywood Offers",
      },
    ],
  },

  personal: {
    nav: "Personal",
    heading: "Off the clock",
    background: { image: "assets/bg/mountaineering-glacier.jpg", focus: "50% 30%" },
    intro: "Most weekends I'm outside.", // TODO: your own line
    // Each item is a card that opens a photo gallery, like Projects.
    // image = cover photo (optional: if left out, the first gallery photo is the cover).
    // gallery = more photos, as "path" or { image: "path", title: "name in the viewer" }.
    // A card with no photos at all hides itself. Add photos to Sports later and it appears.
    items: [
      {
        title: "Mountaineering",
        description: "Glaciers, early alarms, and the view from the top.", // TODO: your own line
        image: "assets/hero.jpg",
        firstTitle: "Above the clouds",
        focus: "48% 65%",
        gallery: [
          { image: "assets/mountaineering/scramble.jpg", title: "On the rocks" },
          { image: "assets/mountaineering/summit-hood.jpg", title: "Summit hood" },
          { image: "assets/mountaineering/summit-cloud-sea.jpg", title: "Above the sea of clouds" },
          { image: "assets/mountaineering/snow-slope.jpg", title: "Snow slope" },
          { image: "assets/mountaineering/ridge-view.jpg", title: "Ridge view" },
          { image: "assets/mountaineering/summit-day.jpg", title: "Summit day" },
          { image: "assets/personal/mt-baker.jpg", title: "Mt. Baker" },
        ],
      },
      {
        title: "On the trail",
        description: "Trails, lakes, and summit breaks in the Cascades.", // TODO: your own line
        image: "assets/personal/trail.jpg",
        firstTitle: "On the trail",
        focus: "50% 55%",
        gallery: [
          { image: "assets/personal/alpine-lake.jpg", title: "Alpine lake" },
          { image: "assets/personal/summit.jpg", title: "Summit break" },
        ],
      },
      {
        title: "Sports",
        description: "", // TODO: add a line when you add photos
        image: "",
        focus: "50% 50%",
        gallery: [], // TODO: add sports photos here (put the files in assets/sports/)
      },
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
