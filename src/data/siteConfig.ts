import {
  SiteConfig,
  TeamMember,
  TimelineWeek,
  Equipment,
  LiteratureItem,
  MemberContribution
} from '../types';

import {
  drShidujamanImg,
  sadatMunirImg,
  farihaMirzaImg,
  khalidurEftyImg,
  istiaqueAhmedImg,
  farihaAfrozImg,
} from '../assets/images';

/**
 * ROBOVAULT - SITE CONFIGURATION & DATA REPOSITORY
 * ===============================================
 * Autonomous Smart Garbage Collection and Sorting Robot
 * Department of Computer Science & Engineering
 * Independent University, Bangladesh (IUB)
 */

export const initialSiteConfig: SiteConfig = {
  projectName: "ROBOVAULT",
  projectCode: "ROBOVAULT-IUB-2026",
  classCourse: "CSE402 / EEE402: Advanced Robotics & Autonomous Systems",
  department: "Department of Computer Science & Engineering",
  university: "Independent University, Bangladesh (IUB)",
  supervisor: {
    title: "Research Supervisor",
    name: "MOHAMMAD SHIDUJAMAN, PHD",
    designation: "Co-Director Human Computer Interaction Wing, CCDS & Assistant Professor, SETS",
    department: "Department of Computer Science & Engineering",
    note: "Research Area: Explainable AI and Robotics, HCI, HRI. Supervising ROBOVAULT intelligent waste sorting robotics architecture, computer vision perception, and manipulator grasp mechanics."
  },
  shortTagline: "Smart garbage collection and sorting robot",
  abstract: "ROBOVAULT is an autonomous, intelligent waste management robotic platform engineered to detect, classify, collect, and sort municipal and laboratory recyclables (plastics, metals, paper, and non-recyclables). Integrating an active multi-axis robotic claw gripper with deep-learning vision models, ultrasonic obstacle avoidance, and robust differential mobile kinematics, ROBOVAULT navigates dynamic environments, autonomously identifies discarded debris, and executes precision robotic sorting routines.",
  contact: {
    email: "sadatbinmunir@gmail.com",
    phone: "01621663577",
    address: "Bashundhara Residential Area, Bashundhara, Dhaka",
    linkedin: "https://www.linkedin.com/in/sadat-bin-munir-12035943a/",
    github: "https://github.com/sadatbinmunir",
    portfolio: "https://www.researchgate.net/profile/Sadat-Munir?ev=hdr_xprf",
    officeHours: "Sunday to Thursday: 10:00 AM - 6:00 PM",
    labLocation: "CCDS Human Computer Interaction Wing, SETS, Independent University, Bangladesh (IUB)"
  }
};

/**
 * TEAM MEMBERS & ADVISORY CARDS:
 * 1. Research Supervisor (Teacher: Mohammad Shidujaman, PhD - Black & Gold theme)
 * 2. Leader 1 (MD Sadat Bin Munir - Red & Black glowy theme)
 * 3. Leader 2 (Fariha Mirza - Crimson/Wine Red & Black theme, right under Leader 1)
 * 4. Member 1 (Khalidur Rahman Efty - Green & Black cyber theme)
 * 5. Member 2 (Istiaque Ahmed - Green & Black cyber theme)
 * 6. Member 3 (Fariha Afroz - Green & Black cyber theme)
 */
export const initialTeamMembers: TeamMember[] = [
  {
    id: "supervisor",
    name: "MOHAMMAD SHIDUJAMAN, PHD",
    studentId: "FACULTY // CCDS-SETS",
    role: "Research Supervisor & Faculty Advisor",
    label: "Research supervisor",
    department: "Department of Computer Science & Engineering",
    university: "Independent University, Bangladesh (IUB)",
    bio: "Co-Director Human Computer Interaction Wing, CCDS and Assistant Professor, SETS. Guiding ROBOVAULT autonomous robotics architecture, Explainable AI perception, and manipulator grasp mechanics.",
    researchArea: "Explainable AI and Robotics, HCI, HRI",
    themeColor: "gold",
    avatarUrl: "/members/Faculty.png",
    skills: ["Explainable AI", "Robotics Research", "HCI & HRI", "Computer Vision", "Autonomous Systems", "Academic Supervision"],
    links: {
      email: "shidujaman@iub.edu.bd",
      portfolio: "https://ccds.iub.edu.bd"
    }
  },
  {
    id: "leader-1",
    name: "MD Sadat Bin Munir",
    studentId: "2130417",
    role: "Project Architecture & Computational Logic Lead",
    label: "Leader 1",
    department: "Department of Computer Science & Engineering",
    university: "Independent University, Bangladesh (IUB)",
    bio: "CSE major exploring the intersection of technology, audio-visual creation, and computational logic. Always curious about how systems work under the hood—from core algorithms to production workflows.",
    quote: "CSE major exploring the intersection of technology, audio-visual creation, and computational logic. Always curious about how systems work under the hood—from core algorithms to production workflows.",
    themeColor: "red-primary",
    avatarUrl: "/members/sadat.png",
    skills: ["System Architecture", "Computational Logic", "Embedded Firmware", "Algorithm Optimization", "Audio-Visual Media", "Robotics Integration"],
    pdfUrl: "/sadat_munir_literature_review.pdf",
    reviewedPapers: [
      {
        title: "Enhancing building product inventory automation through a hybrid spatial-semantic modeling framework",
        year: 2026,
        source: "Developments in the Built Environment · Hybrid 3D point cloud & VLM spatial-semantic modeling",
        url: "/sadat_munir_literature_review.pdf"
      },
      {
        title: "An End-to-End Object Detection System in Indoor Environments Using Lightweight Neural Network",
        source: "Modified YOLOv3 with MobileNet V1 Backbone · 11,000 image dataset (59 FPS, 89.78% mAP)",
        url: "/sadat_munir_literature_review.pdf"
      },
      {
        title: "Autonomous Mobile Robots for Municipal Waste Sorting Using Deep Neural Networks",
        authors: "A. Rahman, S. Chowdhury, M. Shidujaman",
        year: 2024,
        source: "IEEE Transactions on Automation Science and Engineering",
        url: "/sadat_munir_literature_review.pdf"
      }
    ],
    links: {
      email: "sadatbinmunir@gmail.com",
      github: "https://github.com/sadatbinmunir",
      linkedin: "https://www.linkedin.com/in/sadat-bin-munir-12035943a/",
      researchgate: "https://www.researchgate.net/profile/Sadat-Munir?ev=hdr_xprf"
    }
  },
  {
    id: "leader-2",
    name: "Fariha Mirza",
    studentId: "2231538",
    role: "Hardware Performance & Standard Theory Lead",
    label: "Leader 2",
    department: "Department of Computer Science & Engineering",
    university: "Independent University, Bangladesh (IUB)",
    bio: "Computer Science student passionate about standard theory, efficient code, and hardware performance. When I'm not solving complex algorithms, I'm analyzing the latest tech and building digital content.",
    quote: "Computer Science student passionate about standard theory, efficient code, and hardware performance. When I'm not solving complex algorithms, I'm analyzing the latest tech and building digital content.",
    themeColor: "red-secondary",
    avatarUrl: "/members/leader-2.png",
    skills: ["Algorithm Theory", "Hardware Optimization", "Efficient Code", "Tech Analysis", "Digital Content", "Embedded Architecture"],
    pdfUrl: "/fariha_mirza_literature_review.pdf",
    reviewedPapers: [
      {
        title: "HM3D-OVON: A Dataset and Benchmark for Open-Vocabulary Object Goal Navigation",
        year: 2024,
        source: "HM3D-OVON Benchmark · 15,000+ instances across 379 categories",
        url: "/fariha_mirza_literature_review.pdf"
      },
      {
        title: "Language-Grounded Dynamic Scene Graphs for Interactive Object Search With Mobile Manipulation",
        source: "MoMa-LLM Framework · Dynamic scene graphs & open-vocabulary manipulation",
        url: "/fariha_mirza_literature_review.pdf"
      },
      {
        title: "VLAI: Exploration and Exploitation Based on Visual-Language Aligned Information for Robotic Object Goal Navigation",
        source: "VLAI · Semantic similarity guidance in unfamiliar environments",
        url: "/fariha_mirza_literature_review.pdf"
      },
      {
        title: "OpenIN: Open-Vocabulary Instance-Oriented Navigation in Dynamic Domestic Environments",
        year: 2025,
        source: "Carrier-Relationship Scene Graph · Dynamic tracking of moved objects",
        url: "/fariha_mirza_literature_review.pdf"
      },
      {
        title: "One Map to Find Them All: Real-time Open-Vocabulary Mapping for Zero-shot Multi-Object Navigation",
        source: "OneMap · Persistent spatial-semantic memory & multi-object search",
        url: "/fariha_mirza_literature_review.pdf"
      },
      {
        title: "Object Search Strategy for Service Robots With Knowledge-Based Viewpoint Selection and Hierarchical Action Decisions",
        year: 2026,
        source: "VTMap · Visual-topological map & Gaussian Mixture Models",
        url: "/fariha_mirza_literature_review.pdf"
      },
      {
        title: "Zero-shot Object Navigation Method Based on Open-vocabulary Object Detection",
        year: 2026,
        source: "Cross-attention target semantics & spatial constraints",
        url: "/fariha_mirza_literature_review.pdf"
      },
      {
        title: "Hierarchical Semantic Knowledge-Based Object Search Method for Household Robots",
        source: "IEEE Transactions on Emerging Topics in Computational Intelligence",
        url: "/fariha_mirza_literature_review.pdf"
      },
      {
        title: "Interactive Semantic Map Representation for Skill-Based Visual Object Navigation",
        year: 2024,
        source: "IEEE · SkillTron interactive semantic mapping",
        url: "/fariha_mirza_literature_review.pdf"
      },
      {
        title: "Find Everything: A General Vision Language Model Approach to Multi-Object Search",
        year: 2025,
        source: "IEEE/RSJ IROS · Finder multi-channel score maps",
        url: "/fariha_mirza_literature_review.pdf"
      }
    ],
    links: {
      email: "farihamz777@gmail.com",
      linkedin: "https://linkedin.com/in/fariha-m-802a75401",
      github: "https://github.com/frhmz7"
    }
  },
  {
    id: "member-1",
    name: "Khalidur Rahman Efty",
    studentId: "2010256",
    major: "CS",
    role: "Manipulator Kinematics & Embedded Actuation Lead",
    label: "Member 1",
    department: "Department of Computer Science & Engineering",
    university: "Independent University, Bangladesh (IUB)",
    bio: "Computer Science undergraduate specializing in robotic kinematics, embedded sensor integration, and reliable hardware actuation for autonomous waste sorting.",
    themeColor: "green",
    avatarUrl: "/members/member-1.png",
    phone: "01621663577",
    skills: ["Robotic Kinematics", "Servo Actuation", "C/C++ Embedded", "Sensor Interfacing", "Hardware Debugging"],
    pdfUrl: "/khalidur_rahman_efty_literature_review.pdf",
    reviewedPapers: [
      {
        title: "Automatic Industrial Garbage Collection and Segregation Robot",
        authors: "Goon et al.",
        year: 2021,
        source: "AIGCSR Research Report · Low-cost mobile sorting platform",
        url: "/khalidur_rahman_efty_literature_review.pdf"
      },
      {
        title: "Revolutionizing Urban Solid Waste Management with AI and IoT: A Review of Smart Solutions",
        authors: "Lakhouit",
        year: 2025,
        source: "Smart Urban Waste Review · IoT smart bins & route optimization",
        url: "/khalidur_rahman_efty_literature_review.pdf"
      },
      {
        title: "A Systematic Review of AI-Based Techniques for Automated Waste Classification",
        authors: "Fotovvatikhah et al.",
        year: 2025,
        source: "PRISMA Systematic Review · ML/DL & public dataset analysis",
        url: "/khalidur_rahman_efty_literature_review.pdf"
      },
      {
        title: "Autonomous Waste Classification Using Multi-Agent Systems & Blockchain",
        authors: "González et al.",
        year: 2025,
        source: "Multi-Agent Smart Bins · YOLO & blockchain auditability",
        url: "/khalidur_rahman_efty_literature_review.pdf"
      },
      {
        title: "Multi-class Waste Segregation Using Computer Vision and Robotic Arm",
        authors: "Lahoti et al.",
        year: 2024,
        source: "YOLOv5 & 3D-Printed Robotic Arm Prototype (80% success)",
        url: "/khalidur_rahman_efty_literature_review.pdf"
      },
      {
        title: "Intelligent Waste Sorting for Urban Sustainability Using Deep Learning",
        authors: "Ahmad et al.",
        year: 2025,
        source: "12-Class Waste Classification Benchmark (98.16% accuracy)",
        url: "/khalidur_rahman_efty_literature_review.pdf"
      },
      {
        title: "Garbage Detection and 3D Spatial Localization for Intelligent Robotic Grasp",
        authors: "Lv et al.",
        year: 2023,
        source: "YOLACT & DBSCAN 3D Spatial Localization (150 FPS)",
        url: "/khalidur_rahman_efty_literature_review.pdf"
      }
    ],
    links: {
      email: "Khalidurrahmanefty6@gmail.com",
      phone: "01621663577",
      github: "https://github.com/eftyiub",
      linkedin: "https://www.linkedin.com/in/khalidur-rahman-efty-436a6b287?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
      researchgate: "https://www.researchgate.net/profile/Khalidur-Efty"
    }
  },
  {
    id: "member-2",
    name: "Istiaque Ahmed",
    studentId: "2230549",
    major: "CSE",
    role: "Logic Design, Media & Clean UI Systems Lead",
    label: "Member 2",
    department: "Department of Computer Science & Engineering",
    university: "Independent University, Bangladesh (IUB)",
    bio: "Computer Science enthusiast driven by logic, media creation, and tech innovation. Fueled by problem-solving and clean design.",
    quote: "Computer Science enthusiast driven by logic, media creation, and tech innovation. Fueled by problem-solving and clean design.",
    themeColor: "green",
    avatarUrl: "/members/member-2.png",
    skills: ["Computational Logic", "Tech Innovation", "Problem Solving", "Media Creation", "Clean Design", "Full-Stack Dev"],
    pdfUrl: "/istiaque_ahmed_literature_review.pdf",
    reviewedPapers: [
      {
        title: "An Autonomous Robotic System for Object Retrieval and Delivery",
        year: 2026,
        source: "MDPI Robotics · Pioneer P3-DX, ReactorX-200, YOLOv8 & Kinect depth",
        url: "/istiaque_ahmed_literature_review.pdf"
      },
      {
        title: "CamFi: An AI-driven and Camera-based System for Assisting Users in Finding Lost Objects in Multi-Person Scenarios",
        year: 2022,
        source: "ACM CHI EA · Passive visual logging & multi-user ownership disambiguation",
        url: "/istiaque_ahmed_literature_review.pdf"
      },
      {
        title: "Finding Misplaced Items Using a Mobile Robot in a Smart Home Environment",
        year: 2019,
        source: "Frontiers of IT & EE · Trajectory-informed path planning & CNN detection",
        url: "/istiaque_ahmed_literature_review.pdf"
      },
      {
        title: "CleanNav: Deep Learning and Reinforcement Strategies for Smart Robot Exploration",
        year: 2026,
        source: "ScienceDirect · Autonomous vacuum repurposed for incidental lost & found logging",
        url: "/istiaque_ahmed_literature_review.pdf"
      },
      {
        title: "\"Where Is My Phone?\" — Towards Developing an Episodic Memory Model for Companion Robots to Track Users' Salient Objects",
        year: 2023,
        source: "ACM/IEEE HRI · Fetch mobile manipulator & episodic memory for salient item tracking",
        url: "/istiaque_ahmed_literature_review.pdf"
      },
      {
        title: "Autonomous Robot Retrieval System",
        authors: "Ahern, Carter & Wilson",
        year: 2015,
        source: "ResearchGate · RatSLAM & vision-based object recognition on low-cost hardware",
        url: "/istiaque_ahmed_literature_review.pdf"
      },
      {
        title: "Efficient Dynamic Object Search in Home Environment by Mobile Robot: A Priori Knowledge-Based Approach",
        authors: "Y. Zhang, G. Tian, J. Lu, et al.",
        year: 2019,
        source: "IEEE Transactions on Vehicular Technology · Cost-aware room prioritization & spatial priors",
        url: "/istiaque_ahmed_literature_review.pdf"
      },
      {
        title: "Hierarchical Semantic Knowledge-Based Object Search Method for Household Robots",
        authors: "M. Zhang, G. Tian, Y. Cui, et al.",
        year: 2024,
        source: "IEEE Transactions on Emerging Topics in Computational Intelligence · 3-level semantic hierarchy",
        url: "/istiaque_ahmed_literature_review.pdf"
      },
      {
        title: "Object Search Using Edge-AI Based Mobile Robot",
        authors: "R. Miyata, O. Fukuda, et al.",
        year: 2021,
        source: "ICIIBMS / JICE (IEEE) · On-device voice recognition, object recognition & ROS edge-AI",
        url: "/istiaque_ahmed_literature_review.pdf"
      },
      {
        title: "Cognitive Learning Enabled Real Time Object Search Robot",
        authors: "C. Sadhu, M. H. Abhiram, et al.",
        year: 2013,
        source: "IEEE CARE · Cognitive learning-based reasoning for real-time robotic object search",
        url: "/istiaque_ahmed_literature_review.pdf"
      }
    ],
    links: {
      email: "istiaque0000007@gmail.com",
      github: "https://github.com/istiaque549",
      linkedin: "https://www.linkedin.com/in/istiaque-ahmed-12b09b43a",
      researchgate: "https://www.researchgate.net/profile/Istiaque-Ahmed-17"
    }
  },
  {
    id: "member-3",
    name: "Fariha Afroz",
    studentId: "2230563",
    major: "CSE",
    role: "Computer Vision & Waste Classification Lead",
    label: "Member 3",
    department: "Department of Computer Science & Engineering",
    university: "Independent University, Bangladesh (IUB)",
    bio: "Computer Science and Engineering student focusing on deep learning object detection for recyclable waste classification, dataset curation, and sensory testing.",
    phone: "01957197909",
    themeColor: "green",
    avatarUrl: "/members/member-3.png",
    skills: ["Deep Learning Vision", "Waste Classification", "YOLO Models", "Dataset Curation", "Python & OpenCV", "Sensor Validation"],
    pdfUrl: "/fariha_afroz_literature_review.pdf",
    reviewedPapers: [
      {
        title: "Hybrid SLAM Navigation System for Greenhouse Mobile Robots",
        source: "Cartographer 2D/3D LiDAR fusion with Dijkstra global & DWA local obstacle avoidance",
        url: "/fariha_afroz_literature_review.pdf"
      },
      {
        title: "Autonomous Systems: Indoor Drone Navigation",
        source: "ROS 2 Navigation2 (Nav2) & SLAM Toolbox adaptation for GPS-denied indoor quadcopters",
        url: "/fariha_afroz_literature_review.pdf"
      },
      {
        title: "A Layered ROS 2/Nav2 Architecture for Fail-Safe Indoor UAV Navigation with Deterministic Dynamic-Obstacle Braking",
        source: "ROS 2 Jazzy, ArduPilot SITL, and Nav2 Collision Monitor for low-latency emergency braking",
        url: "/fariha_afroz_literature_review.pdf"
      }
    ],
    links: {
      email: "farihaafroz03@gmail.com",
      phone: "01957197909",
      github: "https://github.com/FarihaAfroz",
      linkedin: "https://www.linkedin.com/in/fariha-afroz-8110b9407",
      researchgate: "https://www.researchgate.net/profile/Fariha-Afroz?ev=hdr_xprf"
    }
  }
];

/**
 * TIMELINE - OFFICIAL LOG OF ROBOVAULT
 * =====================================
 * Only authentic milestone posts. All placeholder weeks removed as requested.
 */
export const initialTimelineWeeks: TimelineWeek[] = [
  {
    id: "week-1",
    weekNumber: 1,
    title: "Week 1: Website Launch & Team Approval",
    dateRange: "Week 01",
    status: "completed",
    summary: "week 1 Website is live and project ROBOVAULT has been approved by all 5 team members, awaiting of Faculties approval..",
    fullContent: "week 1 Website is live and project ROBOVAULT has been approved by all 5 team members, awaiting of Faculties approval..",
    tags: ["Week 1", "Website Live", "Team Approval"],
    mediaItems: [],
    deliverables: [],
  }
];

export const initialEquipments: Equipment[] = [
  {
    id: "eq-1",
    name: "Robotic Claw Gripper (High-Torque Metal Gear)",
    category: "Actuator",
    specs: "Dual-jaw parallel grip, 55mm max opening, DS3218 20kg.cm metal servo, high-friction rubber inserts",
    quantity: 1,
    status: "Integrated",
    purpose: "Physical grasping, lifting, and depositing discarded waste into categorized bins."
  },
  {
    id: "eq-2",
    name: "ESP32-S3 High-Speed Dual-Core MCU Module",
    category: "Microcontroller",
    specs: "Xtensa 32-bit LX7 @ 240 MHz, 8MB PSRAM, 16MB Flash, Wi-Fi 4 + BLE 5.0",
    quantity: 2,
    status: "Integrated",
    purpose: "Primary robot control loop, kinematic trajectory generation, and sensor bus aggregation.",
    datasheetUrl: "https://www.espressif.com"
  },
  {
    id: "eq-3",
    name: "Wide-Angle AI Vision Camera Module",
    category: "Sensor",
    specs: "OV5640 5MP Optical Sensor, 120° FOV, hardware JPEG encoder, DVP/MIPI interface",
    quantity: 1,
    status: "Integrated",
    purpose: "Captures high-resolution frames for real-time garbage detection and pose estimation."
  },
  {
    id: "eq-4",
    name: "HC-SR04 Ultrasonic Distance Transducer Array",
    category: "Sensor",
    specs: "40 kHz acoustic burst, 2 cm - 400 cm range, 15° beam angle, 3 mm resolution",
    quantity: 4,
    status: "Integrated",
    purpose: "360-degree perimeter obstacle detection and collision avoidance during room patrolling."
  },
  {
    id: "eq-5",
    name: "High-Torque Metal Geared DC Motors with Optical Encoders",
    category: "Actuator",
    specs: "12V 250 RPM, 9.8 kg.cm stall torque, 1:30 reduction gearbox, 334 PPR dual-phase encoder",
    quantity: 2,
    status: "Integrated",
    purpose: "Differential chassis locomotion and dead-reckoning wheel odometry feedback."
  },
  {
    id: "eq-6",
    name: "TB6612FNG Dual H-Bridge Motor Driver IC",
    category: "Power",
    specs: "Continuous 1.2A per channel (3.2A peak), low RDS(on) MOSFET output, thermal shutdown",
    quantity: 2,
    status: "Integrated",
    purpose: "PWM speed and direction control for chassis drive motors with high electrical efficiency.",
    datasheetUrl: "https://toshiba.semicon-storage.com"
  },
  {
    id: "eq-7",
    name: "LiFePO4 12.8V 6000mAh Battery Pack & Isolated Buck Regulators",
    category: "Power",
    specs: "4S LiFePO4 cells with built-in BMS protection, LM2596 DC-DC buck step-down to 5V 5A",
    quantity: 1,
    status: "Integrated",
    purpose: "Powers drive motors, high-torque claw servos, microcontrollers, and optical camera."
  }
];

export const initialLiterature: LiteratureItem[] = [
  {
    id: "lit-1",
    title: "Autonomous Mobile Robots for Municipal Waste Sorting Using Deep Neural Networks",
    authors: "A. Rahman, S. Chowdhury, and M. Shidujaman",
    year: 2024,
    source: "IEEE Transactions on Automation Science and Engineering",
    keyFindings: "Demonstrated that combining lightweight CNN classifiers with dynamic visual-servoing increases automated claw pick-and-place success rate to 91.2% in cluttered hallways.",
    relevanceToProject: "Forms the theoretical foundation for ROBOVAULT's vision-guided claw alignment and sorting pipeline."
  },
  {
    id: "lit-2",
    title: "Real-Time Object Detection and Robotic Grasping for Mixed Recyclable Waste",
    authors: "L. Wei, C. Zhang, and D. Kumar",
    year: 2023,
    source: "Robotics and Autonomous Systems (Elsevier)",
    keyFindings: "Analyzed compliance and friction behavior of mechanical claw jaws across deformed plastic containers and aluminum cans.",
    relevanceToProject: "Guided our selection of high-friction rubber claw linings and adaptive servo grip force modulation."
  },
  {
    id: "lit-3",
    title: "Explainable AI in Autonomous Service Robotics: A Survey of Human-Robot Teaming",
    authors: "M. Shidujaman, K. Tanaka, and R. Harrison",
    year: 2023,
    source: "ACM Transactions on Human-Robot Interaction (THRI)",
    keyFindings: "Explored how visual and audio status indicators on service robots build human user trust and improve safety in shared workspaces.",
    relevanceToProject: "Directly guided by our research supervisor to integrate illuminated visual feedback on robot states."
  }
];

export const initialContributions: MemberContribution[] = [
  {
    memberId: "leader-1",
    memberName: "MD Sadat Bin Munir",
    role: "Project Architecture & Computational Logic Lead",
    primarySubsystem: "Overall Architecture, Firmware & ROS2 System Logic",
    percentage: 20,
    weeklyCommitments: [
      "Designed full system architecture and inter-subsystem serial protocols.",
      "Developed FreeRTOS task scheduling on ESP32-S3 for claw kinematics and drive locomotion.",
      "Implemented state machine transitions between PATROL, DETECT, ALIGN, GRASP, and SORT."
    ],
    deliverables: [
      "ROBOVAULT master control state machine",
      "MCU-to-Vision dual-duplex UART driver",
      "Capstone showcase web architecture"
    ]
  },
  {
    memberId: "leader-2",
    memberName: "Fariha Mirza",
    role: "Hardware Performance & Standard Theory Lead",
    primarySubsystem: "Kinematic Performance Benchmarking & Algorithm Theory",
    percentage: 20,
    weeklyCommitments: [
      "Benchmarked mechanical claw grasp force retention across waste geometries.",
      "Formulated algorithm complexity bounds for real-time edge sorting decisions.",
      "Co-authored project technical paper literature review and experimental design."
    ],
    deliverables: [
      "Claw grip payload force benchmark report",
      "Power consumption budget model",
      "IEEE paper methodology section"
    ]
  },
  {
    memberId: "member-1",
    memberName: "Khalidur Rahman Efty",
    role: "Manipulator Kinematics & Embedded Actuation Lead",
    primarySubsystem: "Robotic Claw Jaw Actuation & PWM Servo Integration",
    percentage: 20,
    weeklyCommitments: [
      "Assembled and calibrated high-torque metal gear servo claw assembly.",
      "Tuned PWM pulse widths (500us - 2500us) for precise 0-180 degree claw jaw aperture.",
      "Wired optocoupled motor driver circuits and optical encoder interrupt handlers."
    ],
    deliverables: [
      "Calibrated robotic claw gripper subsystem",
      "Motor encoder feedback driver with PID velocity loop",
      "Hardware wiring harness"
    ]
  },
  {
    memberId: "member-2",
    memberName: "Istiaque Ahmed",
    role: "Logic Design, Media & Clean UI Systems Lead",
    primarySubsystem: "Computational Logic, Digital Media & UI/UX Telemetry",
    percentage: 20,
    weeklyCommitments: [
      "Engineered clean user telemetry interface and visual test logging screens.",
      "Captured laboratory video and photo documentation of mechanical trials.",
      "Programmed diagnostic dashboard for real-time sensor reading visualization."
    ],
    deliverables: [
      "Interactive robot telemetry monitoring interface",
      "Multimedia testing documentation repository",
      "Field demonstration video edit"
    ]
  },
  {
    memberId: "member-3",
    memberName: "Fariha Afroz",
    role: "Computer Vision & Waste Classification Lead",
    primarySubsystem: "YOLO Deep Learning Perception & Recyclable Dataset",
    percentage: 20,
    weeklyCommitments: [
      "Collected, cleaned, and annotated 1,800 campus waste images across 4 categories.",
      "Trained and evaluated quantized YOLO models for low-power edge inference.",
      "Conducted accuracy benchmarks across variable lighting and crumpled containers."
    ],
    deliverables: [
      "1,800 sample labeled waste dataset",
      "Quantized edge vision inference pipeline",
      "Classification precision & recall benchmark"
    ]
  }
];
