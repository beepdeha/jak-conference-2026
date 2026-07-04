// JAK Conference 2026 — Event Schedule Data
// Event date/timezone: 5 July 2026, Europe/London
// `start` values are ISO 8601 with explicit UTC+1 (British Summer Time) offset.
// `end` is auto-filled (see script.js) as the next item's start time,
// except for the final item which gets a default 15-minute duration.
//
// To add more detail for an event once you have it, just add/extend the
// `details` field (plain string or array of paragraphs) — it will show up
// automatically when someone taps/clicks that event.

const EVENT_DATE = "2026-07-05";
const EVENT_TIMEZONE = "Europe/London";

const SCHEDULE = [
  {
    time: "13:15",
    title: "Salat al-Zuhr",
    speakers: [],
    details: "Congregational Zuhr prayer.",
  },
  {
    time: "13:40",
    title: "Qur'an Recitation",
    speakers: ["Mohammed Dawud Malik"],
  },
  {
    time: "13:45",
    title: "Recital of Qasidah Muhammadiyyah",
    speakers: ["Muhammad Hanzala Pirzada"],
  },
  {
    time: "13:50",
    title: "Carrying the Trust: Faith, Leadership and the Future",
    speakers: ["Mawlana Gul Muhammad"],
  },
  {
    time: "14:00",
    title: "Cancer and the Meaning of Illness",
    subtitle: "Mercy, Medicine and Resilience in the Light of Faith",
    speakers: ["Dr Mahboob Hussain"],
  },
  {
    time: "14:20",
    title: "Islamic Worship: Perfecting Devotion, Deepening Faith",
    subtitle: "Correcting the Outward to Awaken the Inward",
    speakers: ["Mohammed Adam Raza"],
  },
  {
    time: "14:40",
    title: "Panel Discussion: The Imam in Society",
    subtitle: "Scholars in the Mosque, Community and Public Service",
    speakers: [
      "Imam Qari Muhammad Asim MBE",
      "Cllr Ansar Basir Hussain",
      "Imam Muhammad Irfan Chishti MBE",
      "Imran Mohammed",
      "Mawlana Gul Muhammad",
      "Rizwan Hussain al-Azhari",
    ],
  },
  {
    time: "15:25",
    title: "We Believe: Faith in Humanitarian Action",
    subtitle: "Global Service in Combating Modern Slavery",
    speakers: ["Mohammed Awais Maqsood"],
  },
  {
    time: "15:35",
    title: "Nasheeds",
    speakers: ["Al-Ni'mah JAK Group"],
  },
  {
    time: "16:00",
    title: "Andalusia: Lessons from Muslim Spain",
    subtitle: "Civilisation, Coexistence and Warnings for Today",
    speakers: ["Haroon Hussain"],
  },
  {
    time: "16:20",
    title: "El-Hajj Malik El-Shabazz: Faith, Humanity and Courage",
    subtitle: "The Final Witness of Malcolm X",
    speakers: ["Mansoor Mahmood"],
  },
  {
    time: "16:35",
    title: "2026 JAK Gold Medal Award",
    subtitle: "Honouring a Legacy of Teaching and Service",
    speakers: [],
  },
  {
    time: "16:45",
    title: "British Muslim Leadership: From Presence to Responsibility",
    subtitle: "Principled Service and Contribution in Contemporary Britain",
    speakers: ["Imam Monawar Hussain MBE DL"],
  },
  {
    time: "17:10",
    title: "Higher Islamic Education in UK Mosques",
    subtitle: "Honouring Mosque Partners of the 2025-26 Accredited Alim Course",
    speakers: ["Mawlana Gul Muhammad"],
  },
  {
    time: "17:25",
    title: "Artificial Intelligence and Islamic Scholarship",
    subtitle:
      "A Scholar's Reflection on AI, Hadith and Intellectual Inquiry | Book Launch | Concluding Remarks",
    speakers: ["Bakhtyar H. Pirzada"],
  },
  {
    time: "17:55",
    title: "2026 Jamia Al-Karam Graduation",
    subtitle: "Celebrating a Journey of Knowledge",
    speakers: ["Mohammed Adam Raza"],
  },
  {
    time: "18:10",
    title: "Salam Recital",
    speakers: ["Major Najeeb Ur Rehman Naz"],
  },
  {
    time: "18:15",
    title: "Concluding Du'a",
    speakers: ["Shaykh Muhammad Imdad Hussain Pirzada"],
    durationMinutes: 15,
  },
];
