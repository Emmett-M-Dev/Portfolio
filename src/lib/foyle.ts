// Copy for the /foyle case study. Edit here; the components read from it.
// Staff names are pseudonyms. Every video and screenshot uses invented demo data.

export type FoyleStat = { value: string; label: string };
export type AuditPerson = { pseudonym: string; role: string; pain: string; quote: string };
export type PainSolution = { pain: string; solution: string; anchor: string };
export type Feature = {
  id: string;
  title: string;
  fixes: string;
  body: string;
  video: string;
  poster: string;
  portrait?: boolean;
};
export type Extra = { id: string; title: string; body: string[]; images: { src: string; alt: string }[] };
export type BrandTokens = {
  colours: { name: string; hex: string; use: string; dark?: boolean }[];
  type: { role: string; family: string; sample: string; css: string }[];
};

export const foyle = {
  meta: {
    title: "Foyle International — Silverwind case study · Emmett Murray",
    description:
      "How I audited a language school's operations with its staff and built Silverwind, one source of truth for programmes, accommodation, placements and host payments.",
  },
  hero: {
    eyebrow: "case study // foyle international",
    headline: [
      { text: "From ten spreadsheets to ", italic: false },
      { text: "one source of truth.", italic: true },
    ],
    intro:
      "Foyle International is a language school in Derry~Londonderry. Every year it brings groups of students from across Europe, many of them under 18, and finds them a host family, English classes and a work placement. I sat down with the people who run it, found out where the admin was hurting, and built the systems that fixed it. They now use them every day.",
    stats: [
      { value: "~10", label: "spreadsheets retired" },
      { value: "10–25h", label: "staff time saved / week (approx.)" },
      { value: "390+", label: "commits" },
      { value: "Sep 2026", label: "live, used daily" },
    ] as FoyleStat[],
  },
  audit: {
    label: "01 // the audit",
    title: "I started by listening.",
    intro:
      "Before writing any code, I sat down one-to-one with the three officers who run the day-to-day work and with the CEO. I asked each of them to walk me through a normal week: what they open first, where they copy information from, and what goes wrong.",
    namesNote: "Names changed for privacy.",
    people: [
      {
        pseudonym: "Clare",
        role: "Accommodation Officer",
        pain: "Matching students to host families across several sheets, plus WhatsApp and phone calls, and never being sure which copy was current.",
        quote: "I'm checking three sheets before I can tell you who's staying where.",
      },
      {
        pseudonym: "Róisín",
        role: "Programmes Officer",
        pain: "Re-typing each partner's student list by hand, then chasing paperwork and terms for every student.",
        quote: "Every group arrives as a different spreadsheet, and I type it all in again.",
      },
      {
        pseudonym: "Orla",
        role: "Placement Officer",
        pain: "Finding the right company for each student, and tracking who had been asked and who had said yes, in yet another file.",
        quote: "I know who'd be a good fit. The tracking is what takes the time.",
      },
      {
        pseudonym: "Declan",
        role: "CEO",
        pain: "Finance and bookkeeping. Host payments were worked out by hand and keyed into the bank one by one.",
        quote: "I need to know what we owe and pay it without re-keying everything.",
      },
    ] as AuditPerson[],
    findings: [
      "All the admin lived in messy, disconnected Excel spreadsheets. There was no single source of truth.",
      "Recruiting enough host families was a constant struggle.",
      "Finance and bookkeeping took far too much of the CEO's time.",
    ],
  },
  painMap: {
    label: "02 // pain points → what I built",
    items: [
      { pain: "Disconnected spreadsheets, no single source of truth", solution: "Silverwind: one system for programmes, accommodation and placements", anchor: "#silverwind" },
      { pain: "Not enough host families", solution: "foyle.eu/hosting, feeding a host-enquiries pipeline in Silverwind", anchor: "#hosting" },
      { pain: "Finance and bookkeeping done by hand", solution: "Host payments worked out from the stays, sent to AIB as one bulk file", anchor: "#aib" },
    ] as PainSolution[],
  },
  silverwind: {
    label: "03 // silverwind",
    title: "One place for every student, host and placement.",
    intro:
      "Silverwind brings the admin onto one platform. Information is entered once and carried through: a student pasted in from a partner's sheet is the same record that gets a host, a placement, signed terms and a host payment. Every screen below is a real recording of the app, using invented demo data.",
    features: [
      {
        id: "programmes",
        title: "Programmes: paste the sheet, skip the typing",
        fixes: "Re-typing partner spreadsheets",
        body: "Each group is a programme with its dates, services and students. Róisín pastes the partner's enrolment sheet straight in. Silverwind reads the columns, flags anything worth checking (a missing date of birth means nobody can tell whether the student is a minor) and adds the students in one go.",
        video: "/foyle/programmes.mp4",
        poster: "/foyle/programmes.jpg",
      },
      {
        id: "matching",
        title: "Accommodation: every bed, every week",
        fixes: "Matching across several sheets",
        body: "The board shows every host down the side and every programme across the top. For a student without a bed, Find a host ranks the families by free beds, age range, distance and what they've already said, and placing them is the booking. No separate confirm step, and no stale copy anywhere else.",
        video: "/foyle/matching.mp4",
        poster: "/foyle/matching.jpg",
      },
      {
        id: "map",
        title: "Who is where",
        fixes: "Not knowing who's staying where",
        body: "The same data on a map. Pins are coloured by each host's answer for the selected programme, so the office can see at a glance which parts of the city still have beds.",
        video: "/foyle/map.mp4",
        poster: "/foyle/map.jpg",
      },
      {
        id: "messages",
        title: "Messages written from the records",
        fixes: "Copying details into WhatsApp by hand",
        body: "Arrival and departure texts are templates with placeholders. Silverwind fills in each host's students, dates and times from the records, so Clare reviews, copies and marks each one sent.",
        video: "/foyle/messages.mp4",
        poster: "/foyle/messages.jpg",
      },
      {
        id: "placements",
        title: "Placements: ask the right company",
        fixes: "Tracking placements in another file",
        body: "Orla works through a programme one student at a time, with their files, preferences and status in one place. Choosing a company drafts the request email with the student's dates already filled in.",
        video: "/foyle/placements.mp4",
        poster: "/foyle/placements.jpg",
      },
      {
        id: "terms",
        title: "Terms accepted on the student's phone",
        fixes: "Chasing paper forms",
        body: "Each group gets a link. Students accept the terms on their phone, and under-18s are asked to send a consent link to a parent. The acceptance lands on the student's record automatically.",
        video: "/foyle/terms.mp4",
        poster: "/foyle/terms.jpg",
        portrait: true,
      },
      {
        id: "search",
        title: "Find anything",
        fixes: "Hunting through files for one student",
        body: "One search box covers students, hosts and companies. Each student's page brings together their stay, placement, paperwork and terms.",
        video: "/foyle/search.mp4",
        poster: "/foyle/search.jpg",
      },
      {
        id: "assistant",
        title: "Ask Silverwind",
        fixes: "Procedures living in people's heads",
        body: "An assistant built on Claude answers in plain English from the staff handbook and today's records, and says where each answer came from. It is read-only: it can look things up but never change them.",
        video: "/foyle/assistant.mp4",
        poster: "/foyle/assistant.jpg",
      },
    ] as Feature[],
  },
  hosting: {
    id: "hosting",
    title: "foyle.eu/hosting → host enquiries",
    body: [
      "To tackle host recruitment I built a dedicated hosting page on foyle.eu. It answers the questions families actually ask (do I choose when I host, who do I call at 2am, when do I get paid) and ends with a short form that includes a \"Referred by\" field, so existing hosts can bring in friends.",
      "Every form submission flows into Silverwind's Host enquiries screen. There, each lead moves through ringing, a home visit, reference checks and AccessNI to a new host profile, and referrals are credited to the host who made them.",
    ],
    images: [
      { src: "/foyle/hosting-hero.jpg", alt: "The foyle.eu hosting page hero: an illustrated family dinner with a student, beside Derry's Peace Bridge" },
      { src: "/foyle/hosting-dates.jpg", alt: "'You choose when you host' card with a calendar of arrival dates" },
      { src: "/foyle/hosting-form.jpg", alt: "The hosting enquiry form with name, phone, area and a 'Referred by' field" },
    ],
    video: "/foyle/enquiries.mp4",
    poster: "/foyle/enquiries.jpg",
  },
  aib: {
    id: "aib",
    title: "Host payments → one AIB bulk file",
    body: [
      "Hosts are paid every fortnight for each student they host. Silverwind works out what each host is owed from the stays themselves, so a booking change updates the amount automatically. Paid nights are locked and never come up again.",
      "Clare checks each host and confirms the run. Declan then downloads a single bulk-payment CSV that follows AIB's iBusiness Banking rules (18-character name and reference, capitals only, sort code and account number checks) and uploads it to the bank. One upload replaces keying in each payment by hand.",
    ],
    videos: [
      { src: "/foyle/payments.mp4", poster: "/foyle/payments.jpg", caption: "The accommodation officer checks and confirms the fortnight's run." },
      { src: "/foyle/ready.mp4", poster: "/foyle/ready.jpg", caption: "The CEO downloads one AIB file for the whole run." },
    ],
    csv: [
      "GERRY ANN LISNAGH,000013,00001111,240.00,1 STUD 14NTS LWM3,99",
      "MARTIN JOAN VESEY,000015,00001185,240.00,1 STUD 14NTS LWM3,99",
      "PAULINE RATHCORR,000014,00001148,240.00,1 STUD 14NTS LWM3,99",
      "RONAN LISA CARROW,000017,00001259,240.00,1 STUD 14NTS LWM3,99",
    ],
    csvNote: "The generated file (demo data): beneficiary, sort code, account, amount, reference, transaction code.",
  },
  brand: {
    id: "brand",
    title: "The Foyle brand kit",
    body: [
      "Every Foyle web product I make (the foyle.eu website, the link pages, the hosting page and the student terms pages) is built from one brand kit I put together: the colours, type, components and tone of voice in one system.",
      "That's why a student accepting terms on their phone sees the same Foyle as a family reading the hosting page.",
    ],
    image: { src: "/foyle/brand-site.jpg", alt: "The foyle.eu homepage hero: 'Learn English. Live Irish.' over a photo of students on the north coast" },
    tokens: {
      colours: [
        { name: "foyle-green", hex: "#3fa535", use: "Brand green: CTAs, stats strip, tags" },
        { name: "foyle-green-dark", hex: "#2d7a25", use: "Green text and links on cream" },
        { name: "foyle-green-deep", hex: "#1a4f18", use: "Deep green feature panels", dark: true },
        { name: "foyle-green-pale", hex: "#f0f9ee", use: "Callouts, the hosting note wall" },
        { name: "surface-cream", hex: "#faf8f3", use: "Page ground" },
        { name: "surface-paper", hex: "#f5f2ea", use: "Alternate sections" },
        { name: "ink", hex: "#1a1a18", use: "Body and headings", dark: true },
        { name: "accent-gold", hex: "#c89a3e", use: "Small decorative warmth, never text" },
      ],
      type: [
        { role: "Display", family: "Fraunces", sample: "Learn English.", css: "'Fraunces', Georgia, serif" },
        { role: "Body", family: "Newsreader", sample: "Derry has a way of staying with you.", css: "'Newsreader', Georgia, serif" },
        { role: "UI", family: "Instrument Sans", sample: "ENQUIRE →", css: "'Instrument Sans', system-ui, sans-serif" },
        { role: "Script", family: "Caveat", sample: "Live Irish.", css: "'Caveat', cursive" },
      ],
    } as BrandTokens,
  },
  engineering: {
    label: "05 // engineering",
    title: "Built to be trusted with real people's data.",
    points: [
      "Next.js and TypeScript on Azure App Service, with Azure Database for PostgreSQL. Pushing to main deploys through GitHub Actions.",
      "Role-based access: every write action checks its permission on the server, and a script fails the build if one doesn't.",
      "Around 2,000 automated checks across 58 suites, run against throwaway databases, never live data.",
      "A full audit in October 2026: 1,999 of 2,001 checks passing, every page rendering for all 7 roles, and zero data-integrity violations on a copy of live data.",
      "Every change is recorded in an audit log, so staff can always see who changed what and when.",
    ],
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Azure", "GitHub Actions", "Claude API", "Playwright"],
  },
  results: {
    label: "06 // results",
    title: "Heads above water.",
    stats: [
      { value: "~10", label: "spreadsheets retired" },
      { value: "10–25h", label: "saved per week across the team (approx.)" },
      { value: "4", label: "staff using it daily" },
    ] as FoyleStat[],
    outcomes: [
      "The team finally have their heads above water and a handle on the admin.",
      "For the first time, they can clearly see their company's data: who's arriving, who's placed, what's owed.",
      "New hosts arrive through the hosting page and are tracked from first call to first student.",
      "Host payments go to the bank as one file instead of being keyed in one by one.",
    ],
  },
  closing: {
    text: "Every screen on this page is a recording of the real application, using invented demo data. No real student, host or staff details are shown.",
    back: { label: "← Back to all work", href: "/#work" },
  },
};
