import fs from 'fs';
import path from 'path';

// 1. Build the unified <main> content for the combined Architecture & Schematics page
const combinedMainContent = `  <main style="padding-top: calc(var(--header-height) + 2.5rem); min-height: 85vh; padding-bottom: 5rem;">
    <div class="container">

      <!-- Combined Page Header -->
      <div class="section-header" style="margin-bottom: 3.5rem;">
        <span class="section-tag">[ SYSTEM ARCHITECTURE &amp; HARDWARE TOPOLOGY ]</span>
        <h1 class="section-title" style="font-size: clamp(2rem, 3.5vw, 3rem); text-transform: uppercase;">
          ARCHITECTURE &amp; SCHEMATICS
        </h1>
        <p class="section-subtitle">
          Comprehensive multi-tier software intelligence pipeline, hardware component specifications, and ESP32-S3 tactical pinout mappings.
        </p>
      </div>

      <!-- SECTION 1: SOFTWARE ARCHITECTURE -->
      <section class="section-block" id="software-architecture" style="margin-bottom: 4rem;">
        <div class="section-header">
          <span class="section-tag">[ MULTI-TIER PIPELINE SPECIFICATION ]</span>
          <h2 class="section-title">SOFTWARE ARCHITECTURE</h2>
        </div>

        <div class="corner-bracket-box hud-card" style="padding: 2.5rem;">
          <div class="hud-grid-3" style="gap: 1.5rem; text-align: center;">

            <div class="arch-layer-card">
              <span class="mono-label cyan-text">LAYER 02</span>
              <h4 style="margin: 0.8rem 0;">CV Classifier</h4>
              <p class="muted-text" style="font-size: 0.82rem;">OpenCV Haar/YOLOv8-tiny detects face direction & smartphone bounding box.</p>
            </div>

            <div class="arch-layer-card orange-layer">
              <span class="mono-label orange-text">LAYER 03</span>
              <h4 style="margin: 0.8rem 0;">Gemini 2.0 Synapse</h4>
              <p class="muted-text" style="font-size: 0.82rem;">Multimodal context reasoning for voice coaching & intervention logic.</p>
            </div>

            <div class="arch-layer-card">
              <span class="mono-label cyan-text">LAYER 04</span>
              <h4 style="margin: 0.8rem 0;">HRI Actuators</h4>
              <p class="muted-text" style="font-size: 0.82rem;">Synchronized Pan-Tilt servo tracking, OLED gaze change, and audio alert.</p>
            </div>

          </div>
        </div>
      </section>

      <!-- SECTION 2: HARDWARE EQUIPMENTS & PINOUT SPECIFICATION -->
      <section class="section-block" id="equipments">
        <div class="section-header">
          <span class="section-tag">[ BILL OF MATERIALS & HARDWARE ARCHITECTURE ]</span>
          <h2 class="section-title">EQUIPMENTS USED & PINOUT SPECIFICATION</h2>
          <p class="section-subtitle">
            Component breakdown, electrical specifications, and microcontroller pinout assignments.
          </p>
        </div>

        <!-- Equipments Grid -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.5rem; margin-bottom: 3.5rem;">
          <div class="corner-bracket-box hud-card">
            <span class="card-index">01 // COMPONENT</span>
            <h4 style="margin: 0.5rem 0; color: var(--cyan-primary);">Microcontroller Core</h4>
            <p class="muted-text" style="font-size: 0.85rem;">ESP32-S3 Dual-Core Xtensa LX7 (240MHz) with 8MB PSRAM & 2.4GHz Wi-Fi / BLE 5.0 for edge orchestration.</p>
          </div>

          <div class="corner-bracket-box hud-card">
            <span class="card-index">02 // COMPONENT</span>
            <h4 style="margin: 0.5rem 0; color: var(--cyan-primary);">Vision Sensor</h4>
            <p class="muted-text" style="font-size: 0.85rem;">OV5640 5MP / USB 1080p 120° Wide-Angle lens module optimized for close-range desktop posture & phone detection.</p>
          </div>

          <div class="corner-bracket-box hud-card">
            <span class="card-index">03 // COMPONENT</span>
            <h4 style="margin: 0.5rem 0; color: var(--cyan-primary);">Actuators & Gimbal</h4>
            <p class="muted-text" style="font-size: 0.85rem;">Dual SG90 / MG90S metal gear micro servos providing 180° horizontal pan and 90° vertical tilt trajectory.</p>
          </div>

          <div class="corner-bracket-box hud-card">
            <span class="card-index">04 // COMPONENT</span>
            <h4 style="margin: 0.5rem 0; color: var(--cyan-primary);">Displays & Audio</h4>
            <p class="muted-text" style="font-size: 0.85rem;">0.96" SSD1306 OLED (128x64 I2C), 12-LED WS2812B NeoPixel ring, INMP441 I2S microphone, and MAX98357A I2S amplifier with 3W speaker.</p>
          </div>
        
          <div class="corner-bracket-box hud-card orange-brackets">
            <span class="card-index orange-text">05 // FEATURE SET 1</span>
            <h4 style="margin: 0.5rem 0; color: var(--orange-primary);">Environment Sensing</h4>
            <p class="muted-text" style="font-size: 0.85rem;">Digital ambient temperature and relative humidity sensor for real-time desk climate and study comfort telemetry.</p>
          </div>
        </div>

        <!-- Pinout Table -->
        <div class="corner-bracket-box hud-card" id="system-pinouts">
          <div class="hud-card-header">
            <span class="section-tag">[ HARDWARE PINOUT MATRIX: ESP32-S3 INTERFACE ]</span>
            <span class="mono-label cyan-text">BUS VOLTAGE: 3.3V LOGIC / 5.0V VCC</span>
          </div>

          <div class="tactical-table-wrapper">
            <table class="tactical-table">
              <thead>
                <tr>
                  <th>MODULE</th>
                  <th>ESP32 PIN</th>
                  <th>PROTOCOL</th>
                  <th>OPERATING VOLTAGE</th>
                  <th>FUNCTIONAL PURPOSE</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>OLED Screen (SSD1306)</td>
                  <td>GPIO 21 (SDA), GPIO 22 (SCL)</td>
                  <td>I2C (400kHz)</td>
                  <td>3.3V</td>
                  <td>Expressive eye animations, Pomodoro timer digits</td>
                </tr>
                <tr>
                  <td>Pan Servo (Yaw)</td>
                  <td>GPIO 18 (PWM)</td>
                  <td>LEDC PWM (50Hz)</td>
                  <td>5.0V (Ext Regulated)</td>
                  <td>Horizontal head rotation tracking user presence</td>
                </tr>
                <tr>
                  <td>Tilt Servo (Pitch)</td>
                  <td>GPIO 19 (PWM)</td>
                  <td>LEDC PWM (50Hz)</td>
                  <td>5.0V (Ext Regulated)</td>
                  <td>Vertical nod & nodding cues</td>
                </tr>
                <tr>
                  <td>WS2812B NeoPixel Ring</td>
                  <td>GPIO 4 (RMT)</td>
                  <td>Single-Wire RMT</td>
                  <td>5.0V</td>
                  <td>Ambient focus color aura (Cyan / Orange / Red)</td>
                </tr>
                <tr>
                  <td>I2S Microphone (INMP441)</td>
                  <td>GPIO 12 (BCLK), 14 (LRCLK), 27 (DIN)</td>
                  <td>I2S Digital Audio</td>
                  <td>3.3V</td>
                  <td>Far-field voice capture for Gemini conversational queries</td>
                </tr>
                <tr>
                  <td>I2S DAC Amp (MAX98357A)</td>
                  <td>GPIO 26 (BCLK), 25 (LRC), 33 (DOUT)</td>
                  <td>I2S Audio Out</td>
                  <td>5.0V</td>
                  <td>Voice synthesis playback & friendly acoustic alerts</td>
                </tr>
                <tr>
                  <td>Environment Sensor (Comfort)</td>
                  <td>GPIO 4 / GPIO 21, 22</td>
                  <td>1-Wire / I2C Bus</td>
                  <td>3.3V</td>
                  <td>Feature Set 1: Ambient temperature, humidity &amp; study comfort telemetry</td>
                </tr>

              </tbody>
            </table>
          </div>
        </div>

      </section>

    </div>
  </main>`;

// Update public/architecture.html and public/schematics.html
const archFilePath = 'public/architecture.html';
const schemFilePath = 'public/schematics.html';

let archHtml = fs.readFileSync(archFilePath, 'utf8');

// Replace <main>...</main> in archHtml
archHtml = archHtml.replace(/<main[\s\S]*?<\/main>/, combinedMainContent);

// Update title and meta description
archHtml = archHtml.replace(/<title>[\s\S]*?<\/title>/, '<title>Architecture &amp; Schematics // FocusBot.Ai</title>');
archHtml = archHtml.replace(
  /<meta name="description" content="[\s\S]*?">/,
  '<meta name="description" content="Multi-tier software intelligence pipeline, hardware component specifications, and ESP32-S3 tactical pinout mappings for FocusBot.">'
);

fs.writeFileSync(archFilePath, archHtml, 'utf8');
fs.writeFileSync(schemFilePath, archHtml, 'utf8');
console.log('Updated public/architecture.html and public/schematics.html with combined content.');
