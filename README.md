# ROBOVAULT - Smart Garbage Collection and Sorting Robot

An autonomous robotics capstone project showcase website built with React, TypeScript, Tailwind CSS, and HTML5 Canvas.

Supervised by **Dr. Mohammad Shidujaman, PhD** at the Human Computer Interaction Wing, CCDS, Independent University, Bangladesh (IUB).

---

## 🚀 How to Run in VS Code

### 1. Prerequisites
- **Node.js** (v18, v20, or newer recommended)
- **npm** (comes with Node.js)
- **VS Code** (or any modern code editor)

### 2. Setup & Installation
Open your project folder in the VS Code integrated terminal (`Ctrl + \`` or `Cmd + \``) and run:

```bash
# 1. Install all dependencies
npm install

# 2. Start the local development server
npm run dev
```

Your website will immediately start running at:
👉 **`http://localhost:3000`**

To create an optimized production build for hosting:
```bash
npm run build
```

### 3. Adding Your Team Photos in VS Code
Your real photos are mapped in `/public/members/`:
- `Faculty.png` (Dr. Mohammad Shidujaman)
- `sadat.png` (MD Sadat Bin Munir - Leader 1)
- `leader-2.png` / `leader 2.png` (Fariha Mirza - Leader 2)
- `member-1.png` / `member 1.png` (Khalidur Rahman Efty - Member 1)
- `member-2.png` / `member 2.png` (Istiaque Ahmed - Member 2)
- `member-3.png` / `member 3.png` (Fariha Afroz - Member 3)

You can drop your camera photos directly into `/public/members/` with those exact filenames and they will immediately update in your local browser!

---

## 👥 Project Leadership & Team Roster

The **Members** page features custom styled cards matching individual hierarchy and roles:

1. **Research Supervisor (Top, Black & Golden Glow)**:
   - **MOHAMMAD SHIDUJAMAN, PHD**
   - Co-Director Human Computer Interaction Wing, CCDS
   - Assistant Professor, SETS · Department of Computer Science & Engineering
   - Research Area: *Explainable AI and Robotics, HCI, HRI*
   - Direct Email: `shidujaman@iub.edu.bd`

2. **Leader 1 (Directly Under Teacher, Red & Black Neon Glow)**:
   - **MD Sadat Bin Munir** (ID: `2130417`)
   - Project Architecture & Computational Logic Lead
   - Email: `sadatbinmunir@gmail.com`
   - GitHub, LinkedIn, ResearchGate integrated

3. **Leader 2 (Directly Under Leader 1, Wine/Crimson Red & Black Subtle Glow)**:
   - **Fariha Mirza** (ID: `2231538`)
   - Hardware Performance & Standard Theory Lead
   - Email: `farihamz777@gmail.com`
   - GitHub & LinkedIn integrated

4. **Member 1 (Side-by-Side 3-Column Grid, Green & Black Cyber Theme)**:
   - **Khalidur Rahman Efty** (ID: `2010256`, Major: `CS`)
   - Manipulator Kinematics & Embedded Actuation Lead
   - Phone: `01621663577` · Email: `Khalidurrahmanefty6@gmail.com`
   - ResearchGate, LinkedIn, GitHub

5. **Member 2 (Side-by-Side 3-Column Grid, Green & Black Cyber Theme)**:
   - **Istiaque Ahmed** (ID: `2230549`, Major: `CSE`)
   - Logic Systems, Media & Clean UI Systems Lead
   - Email: `istiaque0000007@gmail.com`
   - LinkedIn, GitHub, ResearchGate

6. **Member 3 (Side-by-Side 3-Column Grid, Green & Black Cyber Theme)**:
   - **Fariha Afroz** (ID: `2230563`, Major: `CSE`)
   - Computer Vision & Waste Classification Lead
   - Phone: `01957197909` · Email: `farihaafroz03@gmail.com`
   - GitHub, LinkedIn, ResearchGate

---

## 📅 Official Project Timeline (Week 1 Post)
All placeholder roadmap weeks have been cleaned out. The timeline features the authentic Week 1 text post:
> *"week 1 Website is live and project ROBOVAULT has been approved by all 5 team members, awaiting of Faculties approval.."*

---

## ⚡ Interactive Circuit Board Background
- **Ambient Traffic**: Continuous green data pulses run through multi-line bus cables and signal traces across the PCB.
- **Click**: Spawns **1 single extra green data light** onto the closest wire with a subtle pulse and glowing trail that smoothly travels along the circuit.

---

## 🛠️ How to Easily Edit the Website Content
All project data is centralized in **`src/data/siteConfig.ts`**:
- **Project Name & Tagline**: `projectName`, `shortTagline`, and `abstract`.
- **Contact Details**: `contact.email` (`sadatbinmunir@gmail.com`), `contact.phone`, `contact.address`, and social links.
- **Supervisor & Members**: Full bios, skills, phones, emails, and external links.
- **Weekly Timeline**: Add or update weeks with notes, deliverables, and test logs.

---

## 📁 Project Structure

```
├── index.html                   # HTML entry point with ROBOVAULT metadata
├── package.json                 # Dependencies & build scripts
├── vite.config.ts               # Vite configuration
├── public/                      # Static assets & member photos (Faculty.png, sadat.png, etc.)
│   └── members/
├── src/
│   ├── main.tsx                 # React entry point
│   ├── App.tsx                  # Main router and layout
│   ├── index.css                # Tailwind CSS v4 and glow styles
│   ├── types/
│   │   └── index.ts             # TypeScript definitions
│   ├── data/
│   │   └── siteConfig.ts        # ⭐ EDIT ALL DATA HERE ⭐
│   ├── assets/
│   │   └── images/              # Bundled image fallbacks
│   ├── components/
│   │   ├── CircuitCanvas.tsx    # Interactive circuit board background
│   │   ├── RoboClawLogo.tsx     # 50% larger simple elegant cyber claw logo
│   │   ├── Navbar.tsx           # Illuminated top navigation with ROBOVAULT branding
│   │   └── Footer.tsx           # Footer with site map and contacts
│   └── pages/
│       ├── HomePage.tsx         # ROBOVAULT hero, abstract & stats
│       ├── MembersPage.tsx      # Custom cards (Gold supervisor, Red leads, Green members)
│       ├── ContactPage.tsx      # Direct email & contact form
│       ├── TimelinePage.tsx     # Chronological weekly roadmap & Week 1 post
│       ├── ProjectPage.tsx      # Overview, Literature, Paper, Equipments
│       ├── ElementsPage.tsx     # Software, Hardware, Demo Video, CAD, IEEE, Contribution
│       ├── AboutUsPage.tsx      # IUB CCDS HCI Wing & Lab details
│       └── FutureRoadmapPage.tsx# Phase II "Coming Soon" roadmap
```
