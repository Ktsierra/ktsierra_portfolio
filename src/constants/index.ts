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
  skyvault,
  jjadocs,
  novaedge,
  novaedgeIcon,
  threejs,
  expo,
  aws,
  firebase,
  kubernetes,
  testFidel,
  testRamon
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
    link: ''
  },
  {
    name: "CSS 3",
    icon: css,
    link: ''
  },
  {
    name: "JavaScript",
    icon: javascript,
    link: ''
  },
  {
    name: "TypeScript",
    icon: typescript,
    link: ''
  },
  {
    name: "React JS",
    icon: reactjs,
    link: ''
  },
  {
    name: "Expo",
    icon: expo,
    link: ''
  },
  {
    name: 'AWS',
    icon: aws,
    link: ''
  },
  {
    name: "Firebase",
    icon: firebase,
    link: ''
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
    link: ''
  },
  {
    name: "Node JS",
    icon: nodejs,
    link: ''
  },
  {
    name: "Python",
    icon: javascript,
    link: ''
  },
  {
    name: "Three JS",
    icon: threejs,
    link: ''
  },
  {
    name: "git",
    icon: git,
    link: ''
  },
  {
    name: "docker",
    icon: docker,
    link: ''
  },
  {
    name: "Kubernetes",
    icon: kubernetes,
    link: ''
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
        "He demonstrated mastery of Python programming while implementing and validating an Artificial Neural Networt and successfully developed a wireless system for human gait analysis incorporating signal processing techniques.",
    name: "Fidel Montero",
    linkedIn: "https://www.linkedin.com/in/fidel-hernandez-25b7b370/",
    designation: "Vice Dean - R&PS, Faculty",
    company: "Telecommunications, CUJAE",
    image: testFidel,
  },
  {
    testimonial:
        "FILL",
    name: "Ramon Mompeller",
    linkedIn: 'https://www.linkedin.com/in/ramon-mompeller-64097a16a/',
    designation: "CEO",
    company: "JJA Aviation",
    image: testRamon,
  },
];

const projects = [
  {
    name: "SkyVault",
    description:
        "Multiplatform mobile and web application that enables JJA Aviation to manage maintenance records and securely share aircraft component lifecycle information and images with clients and between departments.",
    tags: [
      {
        name: "react-native",
        color: "blue-text-gradient",
      },
      {
        name: "amplify",
        color: "orange-text-gradient",
      },
      {
        name: "expo",
        color: "black-text-gradient",
      },
    ],
    image: skyvault,
    source_code_link: undefined,
    app_link: undefined,
    app_icon: undefined
  },
  {
    name: "JJA Aviation Docs",
    description:
        "Web application that documents JJA Aviation's technical infrastructure and maintenance systems configurations, providing authorized personnel with secure access to essential operational information.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "docusaurus",
        color: "green-text-gradient",
      },
      {
        name: "css",
        color: "pink-text-gradient",
      },
    ],
    image: jjadocs,
    source_code_link: undefined,
    app_link: undefined,
    app_icon: undefined
  },
  {
    name: "NovaEdge Tech Website",
    description:
        "Simple, effective company landing page focused on connecting with potential clients. Features a clean design with easy-to-use contact forms and clear information about my services. Currently refining mobile responsiveness and performance.",
    tags: [
      {
        name: "three.js",
        color: "violet-text-gradient",
      },
      {
        name: "typescript",
        color: "blue-text-gradient",
      },
      {
        name: "vercel",
        color: "black-text-gradient",
      },
    ],
    image: novaedge,
    source_code_link: "https://github.com/Ktsierra/novaedgetech_web",
    app_link: "https://novaedgetechnology.com",
    app_icon: novaedgeIcon
  },
/*   {
    name: "Verde",
    description:
        "Multiplatform application designed to help home gardeners users, still in development",
    tags: [
      {
        name: "firebase",
        color: "orange-text-gradient",
      },
      {
        name: "react-native",
        color: "blue-text-gradient",
      },
      {
        name: "expo",
        color: "black-text-gradient",
      },
    ],
    image: novaedge,
    source_code_link: undefined,
    app_link: undefined,
    app_icon: undefined
  }, */
];

export { services, technologies, experiences, testimonials, projects };
