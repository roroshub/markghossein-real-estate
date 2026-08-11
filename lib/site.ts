export const site = {
  name: "SARO",
  legalName: "SARO Website Development",
  tagline: "Website Development",
  domain: "sarodev.com",
  url: "https://sarodev.com",
  phone: "+1 613-266-1826",
  phoneHref: "tel:+16132661826",
  address: {
    street: "199 Slater St.",
    city: "Ottawa",
    region: "ON",
    postal: "K1P 5M7",
    country: "Canada",
  },
  description:
    "SARO is an Ottawa web studio crafting brand identities, digital experiences, and website functionality that communicate clearly, achieve marketing goals, and look fantastic.",
};

export type Service = {
  numeral: string;
  label: string;
  title: string;
  description: string;
  details: string[];
};

export const services: Service[] = [
  {
    numeral: "I",
    label: "Design",
    title: "Custom Website Design",
    description:
      "Every site begins as a blank canvas. We design custom websites that reflect your brand, engage your audience, and never come off a template shelf.",
    details: ["Brand identity", "Art direction", "Responsive design", "Motion and interaction"],
  },
  {
    numeral: "II",
    label: "Commerce",
    title: "E-Commerce",
    description:
      "Online stores built to convert visitors into customers. From the first product page to the payment gateway, we make selling online feel effortless.",
    details: ["Storefront design", "Payment integration", "Product systems", "Checkout optimization"],
  },
  {
    numeral: "III",
    label: "Visibility",
    title: "Search Optimization",
    description:
      "A beautiful site nobody finds is a fresco in a locked room. We optimize your site to rank higher, load faster, and draw the traffic it deserves.",
    details: ["Technical SEO", "Performance tuning", "Local search", "Analytics and insight"],
  },
  {
    numeral: "IV",
    label: "Story",
    title: "Content Creation",
    description:
      "Words and imagery that captivate. We craft the story your website tells, so every page speaks clearly and persuades quietly.",
    details: ["Copywriting", "Photography direction", "Brand voice", "Editorial structure"],
  },
];

export type Work = {
  index: string;
  name: string;
  sector: string;
  year: string;
  url?: string;
  palette: [string, string];
  note: string;
};

export const works: Work[] = [
  {
    index: "01",
    name: "Mark Ghossein",
    sector: "Real Estate",
    year: "2026",
    url: "https://markghossein.com",
    palette: ["#1c3a47", "#c9a24b"],
    note: "A refined digital home for one of Ottawa's real estate professionals, with listings, search, and reviews woven into a calm, confident interface.",
  },
  {
    index: "02",
    name: "Cash Offer Ottawa",
    sector: "Real Estate",
    year: "2026",
    palette: ["#8f3d1e", "#f2ecdf"],
    note: "A focused conversion experience for homeowners seeking fast, fair offers, built to earn trust in a single scroll.",
  },
  {
    index: "03",
    name: "Greely Construction",
    sector: "Construction",
    year: "2026",
    palette: ["#3a3226", "#a8842c"],
    note: "A sturdy, craftsmanlike presence for a builder whose work speaks in concrete and timber.",
  },
  {
    index: "04",
    name: "Drive Approved",
    sector: "Automotive Finance",
    year: "2026",
    palette: ["#122933", "#6a9db4"],
    note: "Financing made approachable, with a guided application flow that keeps drivers moving forward.",
  },
  {
    index: "05",
    name: "Noble Suites",
    sector: "Hospitality",
    year: "2026",
    palette: ["#6a6a45", "#f9f5ec"],
    note: "Furnished suites presented with the warmth of a boutique hotel and the clarity of a well set table.",
  },
  {
    index: "06",
    name: "Sell Your Auto",
    sector: "Automotive",
    year: "2026",
    palette: ["#b4502a", "#211b12"],
    note: "A streamlined way to sell a car online, engineered to remove friction at every turn.",
  },
  {
    index: "07",
    name: "Chip Chip Mosaics",
    sector: "Arts and Culture",
    year: "2021",
    url: "https://chipchipmosaics.com",
    palette: ["#2c5f7c", "#c9a24b"],
    note: "A gallery site for an Ottawa mosaic artist, assembled with the same patience as her tesserae.",
  },
  {
    index: "08",
    name: "Tony Dibbo",
    sector: "Personal Brand",
    year: "2021",
    palette: ["#211b12", "#b4502a"],
    note: "A personal site with presence, professional, patient, and precise, just like the reviews say.",
  },
];

export type Step = {
  numeral: string;
  title: string;
  description: string;
};

export const process: Step[] = [
  {
    numeral: "I",
    title: "Listen",
    description:
      "Every project begins with your story. We learn your business, your audience, and your goals before a single pixel is placed.",
  },
  {
    numeral: "II",
    title: "Design",
    description:
      "Sketches become compositions. You see the direction early and often, and nothing moves forward without your blessing.",
  },
  {
    numeral: "III",
    title: "Build",
    description:
      "Clean, modern code on a foundation built to last. Fast to load, easy to maintain, ready to grow with you.",
  },
  {
    numeral: "IV",
    title: "Launch",
    description:
      "Deployment, domains, and search visibility handled with care. And we stay close after launch, because good work deserves a good steward.",
  },
];

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Laurence designed my website and was exceptionally patient with my lack of tech savvy skills. He took time to edit any and all of the tiny changes I requested, was clear with his timeframes, and did the homework on additional pieces that I needed.",
    author: "Chip Chip Mosaics",
    role: "Ottawa mosaic artist",
  },
  {
    quote:
      "Professional, patient, responsive, knowledgeable, and reasonably priced. I could not have asked for a better experience building my website.",
    author: "Tony Dibbo",
    role: "Client since 2021",
  },
  {
    quote:
      "Absolutely fantastic from start to finish. The team demonstrated professionalism, creativity, and technical expertise. The design and functionality exceeded expectations.",
    author: "Google Review",
    role: "Verified client",
  },
];

export const stats = [
  { value: 10, suffix: "+", label: "Years of craft" },
  { value: 25, suffix: "+", label: "Websites launched" },
  { value: 5, suffix: ".0", label: "Google rating" },
];
