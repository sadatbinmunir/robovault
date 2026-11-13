# RoboVault - 3D Robotics Platform

An interactive 3D web platform built with Next.js, Three.js, and Tailwind CSS showcasing autonomous robotics architecture, timeline sprints, interactive 3D model creators, and hardware schematics.

## 🚀 Tech Stack

- **Framework:** Next.js (App Router)
- **3D Graphics & Rendering:** Three.js / Canvas sequence scrubbers
- **Styling:** Tailwind CSS & Custom Obsidian Glass UI
- **Icons:** Lucide React
- **Language:** TypeScript / Modern JavaScript

## 📁 Project Structure

- `app/` - Next.js root layout, global styles, and page entry point
- `components/` - Interactive components (3D Hero, Bento Grid, Model Creator, Navbar, Footer, Scroll Sequences)
- `public/` - Static assets, 3D GLB models (`anki-vector-bot.glb`, `bot-3d.glb`), frame sequences, and standalone subpages (`architecture.html`, `timeline.html`, `literature.html`, `team.html`, `survey.html`, `contact.html`)
- `scratch/` - Automation and enhancement scripts

## 🛠️ Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to view the website.

## 📦 Build for Production

```bash
npm run build
npm start
```
