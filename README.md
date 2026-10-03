# FocusBot: An AI-Powered Interactive Desk Companion for Productivity and Well-Being

> **Embodied Multimodal Robotics // Human-Robot Interaction (HRI)**  
> Academic Research & Engineering Project under **CCDS HCI Wing**, Department of Computer Science & Engineering, **Independent University, Bangladesh (IUB)**.

---

## 🤖 Overview
**FocusBot** is an embodied multimodal desktop robot designed to combat study fatigue, reduce device distractions, and foster sustained focus. Powered by dual ESP32-S3 microcontrollers, edge computer vision (YOLOv8-tiny), and Google Gemini Multimodal APIs, FocusBot delivers real-time posture tracking, proactive vocal cues, expressive OLED facial states, and physical gaze alignment.

---

## 👥 Project Team & Academic Guidance

### 🎖️ Faculty Research Supervisor
* **Mohammad Shidujaman, PhD**  
  *Co-Director, Human Computer Interaction Wing, CCDS*  
  *Assistant Professor, SETS &middot; Department of Computer Science & Engineering*  
  *Independent University, Bangladesh (IUB)*  
  *Research Area: Explainable AI and Robotics, HCI, HRI*

### ⚡ Project Leadership
* **MD Sadat Bin Munir** (Leader 1 &middot; ID: 2130417)  
  *Project Architecture & Computational Logic Lead*  
  [GitHub](https://github.com/sadatbinmunir) &middot; [LinkedIn](https://www.linkedin.com/in/sadat-bin-munir-12035943a/) &middot; [ResearchGate](https://www.researchgate.net/profile/Sadat-Munir)
* **Fariha Mirza** (Leader 2 &middot; ID: 2231538)  
  *Hardware Performance & Standard Theory Lead*  
  [GitHub](https://github.com/frhmz7) &middot; [LinkedIn](https://www.linkedin.com/in/fariha-m-802a75401)

### 🔬 Engineering Squad
* **Fariha Afroz** (Member 1 &middot; ID: 2230563 &middot; Major: CSE)  
  *Computer Vision & Waste Classification Lead*  
  [GitHub](https://github.com/FarihaAfroz) &middot; [LinkedIn](https://www.linkedin.com/in/fariha-afroz-8110b9407) &middot; [ResearchGate](https://www.researchgate.net/profile/Fariha-Afroz?ev=hdr_xprf)
* **Istiaque Ahmed** (Member 2 &middot; ID: 2230549 &middot; Major: CSE)  
  *Logic Design, Media & Clean UI Systems Lead*  
  [GitHub](https://github.com/istiaque549) &middot; [LinkedIn](https://www.linkedin.com/in/istiaque-ahmed-12b09b43a) &middot; [ResearchGate](https://www.researchgate.net/profile/Istiaque-Ahmed-17)
* **Khalidur Rahman Efty** (Member 3 &middot; ID: 2010256 &middot; Major: CS)  
  *Manipulator Kinematics & Embedded Actuation Lead*  
  [GitHub](https://github.com/eftyiub) &middot; [LinkedIn](https://www.linkedin.com/in/khalidur-rahman-efty-436a6b287) &middot; [ResearchGate](https://www.researchgate.net/profile/Khalidur-Efty)

---

## 🛠️ System Architecture

* **Embedded Processing**: Dual ESP32-S3 (Core A for real-time sensor processing and kinematics; Core B for audio streaming and Wi-Fi synapse).
* **Vision Pipeline**: Edge posture and gaze estimation using optimized INT8 YOLOv8-tiny.
* **Dialogue Synapse**: Multimodal conversational loop powered by Google Gemini API.
* **Hardware & Kinematics**: 2-DOF Pan-Tilt gimbal powered by high-precision SG90 servos, I2S MEMS microphone, 3W speaker with amplifier, and dual 0.96" OLED eye matrices.

---

## 🚀 Running the Project Locally

Clone the repository and launch the local telemetry server:

```bash
# Clone the repository
git clone https://github.com/sadatbinmunir/robovault.git

# Navigate to project directory
cd robovault

# Start the Node.js server
node server.js
```

Open `http://localhost:3000` in your browser.
