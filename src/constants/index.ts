import {
  mobile,
  backend,
  network,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  tailwind,
  nodejs,
  git,
  docker,
  cneuro,
  etecsa,
  jjaaviation,
  carrent,
  jobit,
  tripguide,
  threejs,
  expo,
  aws,
  firebase,
  kubernetes,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Full Stack Developer",
    icon: web,
  },
  {
    title: "React Native Developer",
    icon: mobile,
  },
  {
    title: "Cloud Architect",
    icon: backend,
  },
  {
    title: "Network Engineer",
    icon: network,
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Expo",
    icon: expo,
  },
  {
    name: 'AWS',
    icon: aws,
  },
  {
    name: "Firebase",
    icon: firebase,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "Three JS",
    icon: threejs,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "docker",
    icon: docker,
  },
  {
    name: "Kubernetes",
    icon: kubernetes,
  }
];

const experiences = [
  {
    title: "Software Developer",
    company_name: "CNEURO",
    icon: cneuro,
    iconBg: "#ffffff",
    date: "September 2021 - August 2023",
    points: [
      "Designed and implemented Python applications that analyze mobility and balance patterns in senior populations, enhancing research efficiency and data accuracy.",
      "Contributed to machine learning models that forecast gait speed metrics in elderly populations, improving health outcome predictions through advanced algorithms and cross-team collaboration."
    ],
  },

  {
    title: "Telecom Engineer",
    company_name: "ETECSA",
    icon: etecsa,
    iconBg: "#103680",
    date: "March 2022 - August 2023",
    points: [
      "Led a 10-person team responsible for optical fiber cable distribution and installation, ensuring timely project completion and quality standards",
      "Executed the deployment of Nokia and Huawei mobile technology infrastructure across Matanzas province, enhancing regional connectivity",
      "Established VSAT terminal systems in hard-to-reach locations, enabling communication access for underserved communities",
      "Orchestrated GPON implementation throughout major urban centers in Matanzas province, significantly improving network speed and reliability",
    ],
  },
  {
    title: "IT Manager",
    company_name: "JJA Aviation",
    icon: jjaaviation,
    iconBg: "#ffffff",
    date: "Jan 2021 - Feb 2022",
    points: [
      "Developed full-stack applications including a product lifecycle management system (TypeScript, React, React Native, AWS Infrastructure), and internal web services featuring network documentation (Docusaurus, Firebase) and document indexing (Express, PostgreSQL, Docker)",
      "Designed and maintained comprehensive network infrastructure utilizing Ubiquiti ecosystem (EdgeSwitches, EdgeRouters, UniFi APs) and Synology NAS systems, while implementing cloud-based 3CX phone system in AWS to enhance communication capabilities",
      "Orchestrated critical containerized services through Docker deployment, integrating osTicket for support management, Grafana monitoring stack (Prometheus/Telegraf/InfluxDB), MeshCentral for remote management, and CUPS printing solutions",
      "Established comprehensive security and management infrastructure including Microsoft Entra ID with Intune MDM for device management, and implemented Squid proxy with ELK stack for network monitoring, security analysis, and access control"
    ],
  }
];

const testimonials = [
  {
    testimonial:
        "I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.",
    name: "Sara Lee",
    designation: "CFO",
    company: "Acme Co",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial:
        "I've never met a web developer who truly cares about their clients' success like Rick does.",
    name: "Chris Brown",
    designation: "COO",
    company: "DEF Corp",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial:
        "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
    name: "Lisa Wang",
    designation: "CTO",
    company: "456 Enterprises",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

const projects = [
  {
    name: "Car Rent",
    description:
        "Web-based platform that allows users to search, book, and manage car rentals from various providers, providing a convenient and efficient solution for transportation needs.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "mongodb",
        color: "green-text-gradient",
      },
      {
        name: "tailwind",
        color: "pink-text-gradient",
      },
    ],
    image: carrent,
    source_code_link: "https://github.com/",
  },
  {
    name: "Job IT",
    description:
        "Web application that enables users to search for job openings, view estimated salary ranges for positions, and locate available jobs based on their current location.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "restapi",
        color: "green-text-gradient",
      },
      {
        name: "scss",
        color: "pink-text-gradient",
      },
    ],
    image: jobit,
    source_code_link: "https://github.com/",
  },
  {
    name: "Trip Guide",
    description:
        "A comprehensive travel booking platform that allows users to book flights, hotels, and rental cars, and offers curated recommendations for popular destinations.",
    tags: [
      {
        name: "nextjs",
        color: "blue-text-gradient",
      },
      {
        name: "supabase",
        color: "green-text-gradient",
      },
      {
        name: "css",
        color: "pink-text-gradient",
      },
    ],
    image: tripguide,
    source_code_link: "https://github.com/",
  },
];

export { services, technologies, experiences, testimonials, projects };
