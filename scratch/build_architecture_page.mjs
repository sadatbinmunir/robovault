import fs from 'fs';

// Read existing backup for header and footer
const backup = fs.readFileSync('scratch/architecture_backup.html', 'utf8');

// Extract head (from <!DOCTYPE html> to </header>)
const headEndMatch = backup.match(/<\/header>/i);
if (!headEndMatch) {
  console.error('Could not find </header> in backup');
  process.exit(1);
}
const headerPart = backup.slice(0, headEndMatch.index + '</header>'.length);

// Extract footer (from <!-- Site Footer --> to </html>)
const footerMatch = backup.match(/<!-- Site Footer -->/i) || backup.match(/<footer class="site-footer"/i);
if (!footerMatch) {
  console.error('Could not find footer in backup');
  process.exit(1);
}
const footerPart = backup.slice(footerMatch.index);

// Component Data
const COMPONENTS = [
  {
    id: 'esp32s3',
    name: 'ESP32-S3 WROOM Core Microcontroller',
    category: 'core',
    busType: 'Dual-Core 240MHz',
    busClass: 'i2s',
    voltage: '3.3V Logic / 5.0V USB',
    photo: 'assets/focusbot-week4-esp32s3-camera.jpg',
    badge: 'MCU CENTRAL NODE',
    desc: 'Dual-Core Xtensa LX7 processor (240MHz) with 8MB PSRAM and 2.4GHz Wi-Fi / BLE 5.0. Coordinates edge vision capture, speech playback, motor trajectories, and cloud multimodal queries.',
    specs: [
      { label: 'Clock Freq', val: '240 MHz Dual-Core' },
      { label: 'Memory', val: '8MB Octal PSRAM + 512KB SRAM' },
      { label: 'Wireless', val: 'Wi-Fi 4 (802.11 b/g/n) + BLE 5' },
      { label: 'Logic Voltage', val: '3.3V LVTTL' }
    ],
    pins: [
      { name: 'TFT SPI Data (MOSI)', gpio: 'GPIO 11' },
      { name: 'TFT SPI Clock (SCLK)', gpio: 'GPIO 12' },
      { name: 'TFT Chip Select (CS)', gpio: 'GPIO 10' },
      { name: 'TFT Data/Command (DC)', gpio: 'GPIO 09' },
      { name: 'Audio I2S BCLK (Amp)', gpio: 'GPIO 26' },
      { name: 'Audio I2S LRC (Amp)', gpio: 'GPIO 25' },
      { name: 'Audio I2S DOUT (Amp)', gpio: 'GPIO 33' },
      { name: 'Mic I2S SCK (Voice)', gpio: 'GPIO 14' },
      { name: 'Mic I2S WS (Voice)', gpio: 'GPIO 15' },
      { name: 'Mic I2S SD (Voice)', gpio: 'GPIO 13' },
      { name: 'Pan Servo PWM (Yaw)', gpio: 'GPIO 18' },
      { name: 'Tilt Servo PWM (Pitch)', gpio: 'GPIO 19' },
      { name: 'Comfort Sensor (I2C SDA)', gpio: 'GPIO 21' },
      { name: 'Comfort Sensor (I2C SCL)', gpio: 'GPIO 22' },
      { name: 'WS2812B NeoPixel Ring', gpio: 'GPIO 04' }
    ],
    tableRows: [0, 1, 2, 3, 4, 5, 6]
  },
  {
    id: 'tft_display',
    name: '3.5" TFT SPI 480x320 Display Module',
    category: 'display',
    busType: 'SPI (4-Wire)',
    busClass: 'spi',
    voltage: '3.3V Logic / 5.0V VCC',
    photo: 'assets/focusbot-week4-tft-display.jpg',
    badge: 'TACTICAL HUD',
    desc: 'High-contrast 480x320 color TFT display rendering animated expressive eyes, gaze tracking vector cues, study focus timers, and environment comfort HUD telemetry.',
    specs: [
      { label: 'Resolution', val: '480 × 320 Pixels' },
      { label: 'Interface', val: '4-Wire SPI (Up to 40MHz)' },
      { label: 'Driver IC', val: 'ILI9488 / ST7796' },
      { label: 'Backlight', val: 'PWM Dimming' }
    ],
    pins: [
      { name: 'MOSI (Master Out)', gpio: 'GPIO 11' },
      { name: 'SCLK (Serial Clock)', gpio: 'GPIO 12' },
      { name: 'CS (Chip Select)', gpio: 'GPIO 10' },
      { name: 'DC (Data / Command)', gpio: 'GPIO 09' },
      { name: 'RST (Display Reset)', gpio: 'GPIO 46' },
      { name: 'BL (Backlight PWM)', gpio: '3.3V Regulated' }
    ],
    tableRows: [0]
  },
  {
    id: 'camera_module',
    name: 'OV5640 5MP / USB 1080p Vision Sensor',
    category: 'vision',
    busType: 'DVP / SCCB',
    busClass: 'spi',
    voltage: '3.3V Logic / 5.0V In',
    photo: 'assets/focusbot-week4-esp32s3-camera.jpg',
    badge: 'EDGE VISION',
    desc: '30fps edge computer vision sensor capturing wide-angle desk frames for facial presence detection, gaze alignment, posture scoring, and study distraction recognition.',
    specs: [
      { label: 'Resolution', val: '1080p / 5MP Sensor' },
      { label: 'Field of View', val: '120° Wide-Angle' },
      { label: 'Interface', val: '8-Bit DVP / USB' },
      { label: 'Frame Rate', val: '30 FPS Real-Time' }
    ],
    pins: [
      { name: 'SIOD (SCCB Data)', gpio: 'GPIO 21' },
      { name: 'SIOC (SCCB Clock)', gpio: 'GPIO 22' },
      { name: 'VSYNC (Vertical Sync)', gpio: 'GPIO 38' },
      { name: 'HREF (Horiz Reference)', gpio: 'GPIO 47' },
      { name: 'PCLK (Pixel Clock)', gpio: 'GPIO 39' }
    ],
    tableRows: []
  },
  {
    id: 'max98357a_audio',
    name: 'MAX98357A I2S Class-D Amplifier & 8Ω Speaker',
    category: 'audio',
    busType: 'I2S Audio Out',
    busClass: 'i2s',
    voltage: '5.0V Power / 3.3V Logic',
    photo: 'assets/focusbot-week4-audio-sensors.jpg',
    badge: 'AUDIO SYNAPSE',
    desc: 'Direct digital I2S decode amplifier powering conversational vocal cues, friendly acoustic chimes, and Pomodoro break voice prompts without analog DAC noise.',
    specs: [
      { label: 'Max Output', val: '3.2W into 4Ω / 1.8W into 8Ω' },
      { label: 'Audio Protocol', val: 'I2S Digital PCM' },
      { label: 'Efficiency', val: '92% Class-D' },
      { label: 'Sampling Rate', val: '8kHz - 96kHz' }
    ],
    pins: [
      { name: 'BCLK (Bit Clock)', gpio: 'GPIO 26' },
      { name: 'LRC / WS (Word Select)', gpio: 'GPIO 25' },
      { name: 'DIN (Audio Data)', gpio: 'GPIO 33' },
      { name: 'GAIN (+12dB Mode)', gpio: '100kΩ to GND' },
      { name: 'VIN (Amplifier Rail)', gpio: '5.0V Buck Rail' }
    ],
    tableRows: [5]
  },
  {
    id: 'inmp441_mic',
    name: 'INMP441 Omnidirectional MEMS I2S Microphone',
    category: 'audio',
    busType: 'I2S Audio In',
    busClass: 'i2s',
    voltage: '3.3V VDD',
    photo: 'assets/focusbot-week4-audio-sensors.jpg',
    badge: 'VOICE CAPTURE',
    desc: 'Low-noise digital MEMS microphone capturing user vocal questions and ambient acoustic comfort readings for Google Gemini conversational reasoning.',
    specs: [
      { label: 'Directionality', val: 'Omnidirectional' },
      { label: 'SNR Ratio', val: '61 dBA' },
      { label: 'Output Type', val: '24-bit I2S Digital' },
      { label: 'Current Draw', val: '1.4 mA Ultra-Low' }
    ],
    pins: [
      { name: 'SCK (Serial Clock)', gpio: 'GPIO 14' },
      { name: 'WS (Word Select)', gpio: 'GPIO 15' },
      { name: 'SD (Serial Data Out)', gpio: 'GPIO 13' },
      { name: 'L/R Channel Select', gpio: 'GND (Left Ch)' },
      { name: 'VDD Power Rail', gpio: '3.3V Clean Rail' }
    ],
    tableRows: [4]
  },
  {
    id: 'pan_tilt_servos',
    name: 'Dual MG90S Metal-Gear Pan & Tilt Servos',
    category: 'actuation',
    busType: 'LEDC PWM',
    busClass: 'pwm',
    voltage: '5.0V Ext / 3.3V Control',
    photo: 'assets/focusbot-week1-companion.jpg',
    badge: 'HRI GIMBAL',
    desc: 'High-torque metal-gear servos providing 180° horizontal pan tracking and 90° vertical pitch nodding to establish lifelike physical gaze contact.',
    specs: [
      { label: 'Horizontal Pan', val: '180° Yaw Trajectory' },
      { label: 'Vertical Tilt', val: '90° Pitch Nodding' },
      { label: 'PWM Frequency', val: '50 Hz (20ms Period)' },
      { label: 'Torque Rating', val: '2.2 kg-cm @ 4.8V' }
    ],
    pins: [
      { name: 'Pan Servo PWM (Yaw)', gpio: 'GPIO 18' },
      { name: 'Tilt Servo PWM (Pitch)', gpio: 'GPIO 19' },
      { name: 'Servo V+ Power Rail', gpio: '5.0V Buck Rail (2A)' },
      { name: 'Servo Ground Return', gpio: 'Common Power GND' }
    ],
    tableRows: [1, 2]
  },
  {
    id: 'env_comfort_sensor',
    name: 'Digital Environment Comfort Sensor',
    category: 'sensors',
    busType: 'I2C / 1-Wire',
    busClass: 'i2c',
    voltage: '3.3V VDD',
    photo: 'assets/focusbot-week5-demo1-poster.jpg',
    badge: 'FEATURE SET 1',
    desc: 'Real-time digital ambient temperature and relative humidity sensing for study space environmental comfort and thermal equilibrium telemetry.',
    specs: [
      { label: 'Temp Range', val: '-40°C to +80°C (±0.5°C)' },
      { label: 'Humidity Range', val: '0% to 100% RH (±2% RH)' },
      { label: 'Sampling Rate', val: '1.0 Hz Continuous' },
      { label: 'Interface Protocol', val: 'I2C / 1-Wire Digital' }
    ],
    pins: [
      { name: 'SDA / Serial Data', gpio: 'GPIO 21 (Pull-Up)' },
      { name: 'SCL / Serial Clock', gpio: 'GPIO 22' },
      { name: 'VDD Operating Rail', gpio: '3.3V Logic Rail' },
      { name: 'GND Ground Return', gpio: 'System Ground' }
    ],
    tableRows: [6]
  },
  {
    id: 'power_rail',
    name: 'Dual 18650 Li-ion Battery & Power Distribution',
    category: 'power',
    busType: '7.4V / 5.0V / 3.3V',
    busClass: 'power',
    voltage: 'Dual-Rail Regulated',
    photo: 'assets/focusbot-week3-hardware-procurement.jpg',
    badge: 'POWER TOPOLOGY',
    desc: 'Dual-cell Li-ion pack isolated through high-efficiency buck converters to protect sensitive ESP32 logic from servo inductive spikes and audio power draw.',
    specs: [
      { label: 'Battery Capacity', val: '2 × 18650 (5200mAh Total)' },
      { label: 'High-Current Rail', val: '5.0V @ 3A (Servos + Amp)' },
      { label: 'Logic Rail', val: '3.3V @ 1A Ultra-Low Noise' },
      { label: 'Protection', val: 'Overcharge / Short Circuit' }
    ],
    pins: [
      { name: '7.4V Battery Raw', gpio: 'BMS Protection Module' },
      { name: '5.0V Step-Down', gpio: 'To Servos & MAX98357A' },
      { name: '3.3V Regulated LDO', gpio: 'To ESP32-S3 & Sensors' },
      { name: 'Unified Ground Plane', gpio: 'Star Ground Terminal' }
    ],
    tableRows: []
  }
];

// Generate Nodes HTML for schematic canvas
const peripheralNodes = COMPONENTS.filter(c => c.id !== 'esp32s3');
const nodesGridHtml = peripheralNodes.map(c => `
  <div class="arch-node-card" data-component-id="${c.id}" data-category="${c.category}" onclick="selectArchComponent('${c.id}')">
    <div class="node-header-row">
      <span class="node-bus-tag ${c.busClass}">${c.busType}</span>
      <span style="font-family: var(--font-mono); font-size: 0.65rem; color: #64748B;">${c.voltage}</span>
    </div>
    <h5 class="node-card-title">${c.name.split(' (')[0]}</h5>
    <span class="node-card-sub">${c.badge}</span>
  </div>
`).join('\n');

const mainContent = `
  <!-- Main Content Area -->
  <main style="padding-top: calc(var(--header-height) + 2.5rem); min-height: 85vh; padding-bottom: 5rem;">
    <div class="container">

      <!-- Combined Page Header with Signature Two-Tone Gradient -->
      <div class="section-header" style="margin-bottom: 3rem;">
        <h1 class="section-title" style="font-size: clamp(2rem, 3.5vw, 3rem); letter-spacing: -0.02em;">
          ARCHITECTURE &amp; <span style="background: linear-gradient(135deg, #C084FC 0%, #A855F7 55%, #E9D5FF 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; filter: drop-shadow(0 0 20px rgba(168, 85, 247, 0.45));">SCHEMATICS</span>
        </h1>
        <p class="section-subtitle">
          Comprehensive multi-tier software intelligence pipeline, interactive hardware topology explorer, and ESP32-S3 tactical pinout mappings.
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

      <!-- SECTION 2: INTERACTIVE HARDWARE TOPOLOGY & PINOUT EXPLORER -->
      <section class="section-block" id="equipments" style="margin-bottom: 4rem;">
        <div class="section-header" style="margin-bottom: 2rem;">
          <span class="section-tag">[ HARDWARE TOPOLOGY &amp; PINOUT HOTSPOT EXPLORER ]</span>
          <h2 class="section-title">INTERACTIVE SCHEMATIC &amp; PINOUT INSPECTOR</h2>
          <p class="section-subtitle">
            Click any subsystem node or microcontroller pin to inspect live signal routes, operating voltages, protocol specs, and verified lab assembly photos.
          </p>
        </div>

        <!-- Explorer Container -->
        <div class="arch-explorer-wrapper">
          
          <!-- Subsystem Filter Pills -->
          <div class="arch-subsystem-bar">
            <div class="arch-filter-pills">
              <button class="arch-pill-btn active" data-filter="all" onclick="filterArchSubsystems('all', this)">ALL SUBSYSTEMS</button>
              <button class="arch-pill-btn" data-filter="core" onclick="filterArchSubsystems('core', this)">MCU CORE</button>
              <button class="arch-pill-btn" data-filter="display" onclick="filterArchSubsystems('display', this)">DISPLAY &amp; VISION</button>
              <button class="arch-pill-btn" data-filter="audio" onclick="filterArchSubsystems('audio', this)">AUDIO &amp; VOICE</button>
              <button class="arch-pill-btn" data-filter="actuation" onclick="filterArchSubsystems('actuation', this)">GIMBAL &amp; SENSORS</button>
              <button class="arch-pill-btn" data-filter="power" onclick="filterArchSubsystems('power', this)">POWER RAILS</button>
            </div>
            <div style="font-family: var(--font-mono); font-size: 0.7rem; color: #C084FC;">
              ● INTERACTIVE CIRCUIT INSPECTOR
            </div>
          </div>

          <!-- Explorer 2-Column Layout -->
          <div class="arch-explorer-layout">
            
            <!-- Left: Schematic Board Canvas -->
            <div class="arch-board-canvas" id="archBoardCanvas">
              
              <!-- Central ESP32-S3 Node -->
              <div class="mcu-center-card selected" id="mcuCenterCard" data-component-id="esp32s3" onclick="selectArchComponent('esp32s3')">
                <div class="mcu-core-badge">
                  <span class="mcu-pulse-dot"></span>
                  <span>ESP32-S3 ORCHESTRATOR</span>
                </div>
                <h4 style="font-family: var(--font-sans); font-size: 1.15rem; font-weight: 800; color: #FFFFFF; margin: 0 0 0.25rem;">Xtensa Dual-Core 240MHz</h4>
                <div style="font-family: var(--font-mono); font-size: 0.7rem; color: #C084FC; font-weight: 600;">8MB PSRAM • Wi-Fi &amp; BLE 5.0</div>
              </div>

              <!-- Peripheral Nodes Grid -->
              <div class="arch-nodes-grid" id="archNodesGrid">
                ${nodesGridHtml}
              </div>

            </div>

            <!-- Right: Tactical Telemetry Inspector Panel -->
            <div class="arch-inspector-panel" id="archInspectorPanel">
              <div class="inspector-meta-bar">
                <span class="inspector-tag" id="inspectorCategoryTag">CORE // MCU ORCHESTRATION</span>
                <span class="node-bus-tag i2s" id="inspectorBusTag">Dual-Core 240MHz</span>
              </div>

              <div class="inspector-photo-box" id="inspectorPhotoBox">
                <img src="assets/focusbot-week4-esp32s3-camera.jpg" alt="Component Preview" class="inspector-photo-img" id="inspectorPhotoImg">
                <span class="inspector-badge-overlay" id="inspectorBadgeOverlay">MCU CENTRAL NODE</span>
              </div>

              <h3 class="inspector-title" id="inspectorTitle">ESP32-S3 WROOM Core Microcontroller</h3>
              <p class="inspector-desc" id="inspectorDesc">
                Dual-Core Xtensa LX7 processor (240MHz) with 8MB PSRAM and 2.4GHz Wi-Fi / BLE 5.0. Coordinates edge vision capture, speech playback, motor trajectories, and cloud multimodal queries.
              </p>

              <!-- Electrical & Bus Specs Grid -->
              <div class="inspector-specs-grid" id="inspectorSpecsGrid">
                <div class="spec-cell">
                  <div class="spec-cell-label">Clock Freq</div>
                  <div class="spec-cell-val">240 MHz Dual-Core</div>
                </div>
                <div class="spec-cell">
                  <div class="spec-cell-label">Memory</div>
                  <div class="spec-cell-val">8MB Octal PSRAM</div>
                </div>
                <div class="spec-cell">
                  <div class="spec-cell-label">Wireless</div>
                  <div class="spec-cell-val">Wi-Fi 4 + BLE 5</div>
                </div>
                <div class="spec-cell">
                  <div class="spec-cell-label">Logic Voltage</div>
                  <div class="spec-cell-val">3.3V LVTTL</div>
                </div>
              </div>

              <!-- Dedicated GPIO Pinout Breakdown -->
              <div class="inspector-pins-header">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
                <span>TACTICAL PINOUT MAPPINGS</span>
              </div>
              <div class="inspector-pins-list" id="inspectorPinsList">
                <!-- Dynamically populated -->
              </div>

            </div>

          </div>

        </div>

        <!-- Pinout Table Matrix (Wired to Interactive Explorer) -->
        <div class="corner-bracket-box hud-card" id="system-pinouts">
          <div class="hud-card-header">
            <span class="section-tag">[ HARDWARE PINOUT MATRIX: ESP32-S3 INTERFACE ]</span>
            <span class="mono-label cyan-text">BUS VOLTAGE: 3.3V LOGIC / 5.0V VCC</span>
          </div>

          <div class="tactical-table-wrapper">
            <table class="tactical-table" id="tacticalPinoutTable">
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
                <tr data-module-id="tft_display" onclick="selectArchComponent('tft_display')">
                  <td><strong>OLED / 3.5" TFT Screen</strong></td>
                  <td>GPIO 11 (MOSI), 12 (SCLK), 10 (CS), 09 (DC)</td>
                  <td>SPI (Up to 40MHz)</td>
                  <td>3.3V</td>
                  <td>Expressive eye animations, Pomodoro timer digits, and HUD telemetry</td>
                </tr>
                <tr data-module-id="pan_tilt_servos" onclick="selectArchComponent('pan_tilt_servos')">
                  <td><strong>Pan Servo (Yaw)</strong></td>
                  <td>GPIO 18 (PWM)</td>
                  <td>LEDC PWM (50Hz)</td>
                  <td>5.0V (Ext Regulated)</td>
                  <td>Horizontal head rotation tracking user presence</td>
                </tr>
                <tr data-module-id="pan_tilt_servos" onclick="selectArchComponent('pan_tilt_servos')">
                  <td><strong>Tilt Servo (Pitch)</strong></td>
                  <td>GPIO 19 (PWM)</td>
                  <td>LEDC PWM (50Hz)</td>
                  <td>5.0V (Ext Regulated)</td>
                  <td>Vertical nod &amp; nodding cues</td>
                </tr>
                <tr data-module-id="esp32s3" onclick="selectArchComponent('esp32s3')">
                  <td><strong>WS2812B NeoPixel Ring</strong></td>
                  <td>GPIO 04 (RMT)</td>
                  <td>Single-Wire RMT</td>
                  <td>5.0V</td>
                  <td>Ambient focus color aura (Cyan / Orange / Red)</td>
                </tr>
                <tr data-module-id="inmp441_mic" onclick="selectArchComponent('inmp441_mic')">
                  <td><strong>I2S Microphone (INMP441)</strong></td>
                  <td>GPIO 14 (SCK), 15 (WS), 13 (SD)</td>
                  <td>I2S Digital Audio</td>
                  <td>3.3V</td>
                  <td>Far-field voice capture for Gemini conversational queries</td>
                </tr>
                <tr data-module-id="max98357a_audio" onclick="selectArchComponent('max98357a_audio')">
                  <td><strong>I2S DAC Amp (MAX98357A)</strong></td>
                  <td>GPIO 26 (BCLK), 25 (LRC), 33 (DOUT)</td>
                  <td>I2S Audio Out</td>
                  <td>5.0V</td>
                  <td>Voice synthesis playback &amp; friendly acoustic alerts</td>
                </tr>
                <tr data-module-id="env_comfort_sensor" onclick="selectArchComponent('env_comfort_sensor')">
                  <td><strong>Environment Sensor (Comfort)</strong></td>
                  <td>GPIO 21 (SDA), GPIO 22 (SCL)</td>
                  <td>I2C Bus / 1-Wire</td>
                  <td>3.3V</td>
                  <td>Feature Set 1: Ambient temperature, humidity &amp; study comfort telemetry</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </section>

    </div>
  </main>

  <!-- Interactive Architecture Explorer Controller -->
  <script>
    const ARCH_COMPONENTS = ${JSON.stringify(COMPONENTS, null, 2)};

    let activeArchComponentId = 'esp32s3';

    function selectArchComponent(compId) {
      const comp = ARCH_COMPONENTS.find(c => c.id === compId);
      if (!comp) return;

      activeArchComponentId = compId;

      // Update Node Selected states
      document.querySelectorAll('.arch-node-card').forEach(card => {
        card.classList.toggle('selected', card.getAttribute('data-component-id') === compId);
      });
      const mcuCard = document.getElementById('mcuCenterCard');
      if (mcuCard) {
        mcuCard.classList.toggle('selected', compId === 'esp32s3');
      }

      // Update Inspector Panel Data
      document.getElementById('inspectorCategoryTag').textContent = comp.category.toUpperCase() + ' // SPECIFICATION';
      const busTag = document.getElementById('inspectorBusTag');
      busTag.textContent = comp.busType;
      busTag.className = 'node-bus-tag ' + comp.busClass;

      const photoImg = document.getElementById('inspectorPhotoImg');
      photoImg.src = comp.photo;
      document.getElementById('inspectorBadgeOverlay').textContent = comp.badge;
      document.getElementById('inspectorTitle').textContent = comp.name;
      document.getElementById('inspectorDesc').textContent = comp.desc;

      // Update Specs Grid
      const specsGrid = document.getElementById('inspectorSpecsGrid');
      specsGrid.innerHTML = comp.specs.map(s => \`
        <div class="spec-cell">
          <div class="spec-cell-label">\${s.label}</div>
          <div class="spec-cell-val">\${s.val}</div>
        </div>
      \`).join('');

      // Update Pinout Chips
      const pinsList = document.getElementById('inspectorPinsList');
      pinsList.innerHTML = comp.pins.map(p => \`
        <div class="inspector-pin-chip">
          <span class="pin-name">\${p.name}</span>
          <span class="pin-gpio">\${p.gpio}</span>
        </div>
      \`).join('');

      // Highlight Table Rows
      const rows = document.querySelectorAll('#tacticalPinoutTable tbody tr');
      rows.forEach((r, idx) => {
        const isMatch = comp.tableRows.includes(idx);
        r.classList.toggle('table-row-highlight', isMatch);
      });
    }

    function filterArchSubsystems(category, btn) {
      document.querySelectorAll('.arch-pill-btn').forEach(b => b.classList.remove('active'));
      if (btn) btn.classList.add('active');

      const cards = document.querySelectorAll('.arch-node-card');
      cards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (category === 'all') {
          card.style.display = 'flex';
        } else if (category === 'core') {
          card.style.display = 'flex';
        } else if (category === 'display' && (cardCat === 'display' || cardCat === 'vision')) {
          card.style.display = 'flex';
        } else if (category === 'audio' && cardCat === 'audio') {
          card.style.display = 'flex';
        } else if (category === 'actuation' && (cardCat === 'actuation' || cardCat === 'sensors')) {
          card.style.display = 'flex';
        } else if (category === 'power' && cardCat === 'power') {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });

      // If filtering core, spotlight esp32s3
      if (category === 'core') {
        selectArchComponent('esp32s3');
      }
    }

    // Initialize with ESP32-S3 core selected on load
    document.addEventListener('DOMContentLoaded', () => {
      selectArchComponent('esp32s3');
    });
  </script>
`;

const finalHtml = headerPart + '\n' + mainContent + '\n' + footerPart;
fs.writeFileSync('public/architecture.html', finalHtml, 'utf8');
console.log('Successfully generated interactive public/architecture.html');
