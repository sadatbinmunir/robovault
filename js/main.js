/**
 * FocusBot Tactical HUD Interactive Controller
 * Handles Navigation, Dropdowns, Week 1 Timeline Filter, Hotspots, and Telemetry
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollHeader();
  initNavigation();
  initTimelineFilter();
  initComingSoonModals();
  initContactForm();
});

/* ==========================================================================
   HEADER SCROLL TRANSITION & SCROLLSPY (Seamless at top, frosted on scroll)
   ========================================================================== */
function initScrollHeader() {
  const header = document.getElementById('siteHeader');
  if (!header) return;

  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

  function handleScroll() {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // ScrollSpy: highlight active menu tab as user scrolls into sections
    let currentSectionId = '';
    const scrollPosition = window.scrollY + 150;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        currentSectionId = section.getAttribute('id');
      }
    });

    if (currentSectionId) {
      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === `#${currentSectionId}`) {
          link.classList.add('active');
        } else if (href && href.startsWith('#')) {
          link.classList.remove('active');
        }
      });
    } else if (window.scrollY <= 100) {
      navLinks.forEach(link => {
        if (link.getAttribute('href') === '#hero') {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ==========================================================================
   1. TACTICAL HUD SYNTH AUDIO (Web Audio API)
   ========================================================================== */
let audioCtx = null;
let soundEnabled = false;

function initAudio() {
  const audioToggleBtn = document.getElementById('audioToggleBtn');
  if (!audioToggleBtn) return;

  audioToggleBtn.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    if (soundEnabled && !audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }

    if (soundEnabled) {
      audioToggleBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
        </svg>
      `;
      audioToggleBtn.title = "HUD Audio: Enabled";
      playHudBeep(880, 0.08, 'sine');
    } else {
      audioToggleBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <line x1="23" y1="9" x2="17" y2="15"></line>
          <line x1="17" y1="9" x2="23" y2="15"></line>
        </svg>
      `;
      audioToggleBtn.title = "HUD Audio: Muted";
    }
  });

  // Attach sound triggers to buttons and interactive links
  document.querySelectorAll('a, button, .schematic-node').forEach(el => {
    el.addEventListener('mouseenter', () => {
      if (soundEnabled) playHudBeep(1200, 0.02, 'sine');
    });
    el.addEventListener('click', () => {
      if (soundEnabled) playHudBeep(650, 0.05, 'triangle');
    });
  });
}

function playHudBeep(freq = 800, duration = 0.05, type = 'sine') {
  if (!soundEnabled || !audioCtx) return;
  try {
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (e) {
    // Audio context safe fallback
  }
}

/* ==========================================================================
   2. NAVIGATION & DROPDOWNS
   ========================================================================== */
function initNavigation() {
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const mainNav = document.getElementById('mainNav');

  if (mobileToggle && mainNav) {
    mobileToggle.addEventListener('click', () => {
      mainNav.classList.toggle('open');
      const isExpanded = mainNav.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', isExpanded);
    });
  }

  // Handle Dropdowns on touch or click
  const dropdowns = document.querySelectorAll('.nav-dropdown');
  dropdowns.forEach(dropdown => {
    const trigger = dropdown.querySelector('.dropdown-trigger');
    if (trigger) {
      trigger.addEventListener('click', (e) => {
        if (window.innerWidth <= 900) {
          e.preventDefault();
          dropdown.classList.toggle('open');
        }
      });
    }
  });

  // Close mobile nav on click of normal links
  document.querySelectorAll('.nav-link:not(.dropdown-trigger), .dropdown-item a').forEach(link => {
    link.addEventListener('click', () => {
      if (mainNav && mainNav.classList.contains('open')) {
        mainNav.classList.remove('open');
      }
    });
  });
}

/* ==========================================================================
   3. TIMELINE POST & WEEK FILTERS
   ========================================================================== */
function initTimelineFilter() {
  const filterButtons = document.querySelectorAll('.filter-tab-btn');
  const weekContainers = document.querySelectorAll('.timeline-card-wrapper');
  const weekButtons = document.querySelectorAll('.week-selector-btn');

  if (!weekContainers.length) return;

  // Modality Filtering (All Combined / Text / Video / Picture)
  if (filterButtons.length) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterType = btn.getAttribute('data-filter');

        weekContainers.forEach(postContainer => {
          const textBlock = postContainer.querySelector('.timeline-block-text');
          const videoBlock = postContainer.querySelector('.timeline-block-video');
          const pictureBlock = postContainer.querySelector('.timeline-block-picture');

          if (textBlock) {
            textBlock.style.display = (filterType === 'all' || filterType === 'text') ? 'block' : 'none';
          }
          if (videoBlock) {
            videoBlock.style.display = (filterType === 'all' || filterType === 'video') ? 'block' : 'none';
          }
          if (pictureBlock) {
            pictureBlock.style.display = (filterType === 'all' || filterType === 'picture') ? 'grid' : 'none';
          }
        });
      });
    });
  }

  // Week Selector Pills Filtering
  if (weekButtons.length) {
    weekButtons.forEach(wBtn => {
      wBtn.addEventListener('click', () => {
        const selectedWeek = wBtn.getAttribute('data-week');
        if (!selectedWeek || wBtn.disabled) return;

        weekButtons.forEach(b => b.classList.remove('active'));
        wBtn.classList.add('active');

        weekContainers.forEach(container => {
          const weekNum = container.getAttribute('data-week');
          if (selectedWeek === 'all' || selectedWeek === weekNum) {
            container.style.display = 'block';
          } else {
            container.style.display = 'none';
          }
        });
      });
    });
  }

  }
}

/* ==========================================================================
   VIDEO PLAYBACK & LOCAL FILE STREAMING UTILITIES
   ========================================================================== */
function loadLocalVideoFile(inputElement, videoElementId) {
  if (inputElement.files && inputElement.files[0]) {
    const file = inputElement.files[0];
    const video = document.getElementById(videoElementId);
    if (video) {
      const fileUrl = URL.createObjectURL(file);
      video.src = fileUrl;
      video.load();
      video.play().catch(err => {
        console.log('Autoplay handled:', err);
      });
      const statusElem = document.getElementById(videoElementId + '-status');
      if (statusElem) {
        statusElem.textContent = 'LOCAL // ' + file.name.toUpperCase();
        statusElem.style.color = 'var(--cyan-primary)';
      }
    }
  }
}

function togglePlayPause(videoElementId) {
  const video = document.getElementById(videoElementId);
  if (!video) return;
  if (video.paused || video.ended) {
    video.play().catch(err => console.log('Playback error:', err));
  } else {
    video.pause();
  }
}

function toggleFullscreen(videoElementId) {
  const video = document.getElementById(videoElementId);
  if (!video) return;
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else if (video.requestFullscreen) {
    video.requestFullscreen();
  } else if (video.webkitRequestFullscreen) {
    video.webkitRequestFullscreen();
  }
}

window.loadLocalVideoFile = loadLocalVideoFile;
window.togglePlayPause = togglePlayPause;
window.toggleFullscreen = toggleFullscreen;


/* ==========================================================================
   4. ROBOT LINE-ART SCHEMATIC HOTSPOTS
   ========================================================================== */
function initSchematicHotspots() {
  const nodes = document.querySelectorAll('.schematic-node');
  const overlayLeft = document.getElementById('hudBoxTopLeft');
  const overlayRight = document.getElementById('hudBoxBottomRight');

  const moduleData = {
    camera: {
      title: "VISION SENSOR POD",
      detail: "1080p 120° FOV Wide-Angle Sensor // 30 FPS",
      sub: "REALTIME OBJECT & POSTURE CLASSIFIER",
      rightBadge: "OPENCV + YOLO-TINY",
      rightDetail: "Detecting study, phone, away states"
    },
    gimbal: {
      title: "PAN-TILT 2-DOF GIMBAL",
      detail: "Dual High-Torque Micro Servos (180° / 90°)",
      sub: "TRACKS USER POSITION ON DESK",
      rightBadge: "SMOOTH SERVO KINEMATICS",
      rightDetail: "Physical cue & nod interaction"
    },
    display: {
      title: "EXPRESSION DISPLAY",
      detail: "0.96-inch 128x64 I2C OLED Panel",
      sub: "DYNAMIC EYE EMOTIONS & TIMER READOUT",
      rightBadge: "HRI FACIAL CUES",
      rightDetail: "Alert, happy, neutral, sleeping states"
    },
    core: {
      title: "GEMINI MULTIMODAL CORE",
      detail: "Multimodal Gemini API Synapse",
      sub: "CONTEXT-AWARE COGNITIVE ENGINE",
      rightBadge: "GEMINI 2.0 ADAPTIVE",
      rightDetail: "Speech response & intervention logic"
    },
    ring: {
      title: "NEOPIXEL WS2812B RING",
      detail: "12-Bit RGB Peripheral Aura",
      sub: "AMBIENT FOCUS & POMODORO BREAK BAR",
      rightBadge: "COLOR AURA PROTOCOL",
      rightDetail: "Cyan: Focus | Orange: Break | Red: Distracted"
    }
  };

  nodes.forEach(node => {
    node.addEventListener('mouseenter', () => {
      const target = node.getAttribute('data-target');
      const data = moduleData[target];
      if (!data) return;

      if (overlayLeft) {
        overlayLeft.querySelector('.hud-box-title').innerText = data.title;
        overlayLeft.querySelector('.hud-box-detail').innerText = data.detail;
        overlayLeft.querySelector('.hud-box-sub').innerText = data.sub;
      }

      if (overlayRight) {
        overlayRight.querySelector('.orange-badge').innerText = data.rightBadge;
        overlayRight.querySelector('.hud-box-detail').innerText = data.rightDetail;
      }
    });

    node.addEventListener('mouseleave', () => {
      // Revert to default telemetry
      if (overlayLeft) {
        overlayLeft.querySelector('.hud-box-title').innerText = "CV INFERENCE ENGINE: ONLINE";
        overlayLeft.querySelector('.hud-box-detail').innerText = "DETECTING: STUDYING (98.4% CONF)";
        overlayLeft.querySelector('.hud-box-sub').innerText = "LATENCY: 32MS // STABLE CLASSIFICATION";
      }
      if (overlayRight) {
        overlayRight.querySelector('.orange-badge').innerText = "GEMINI MULTIMODAL API";
        overlayRight.querySelector('.hud-box-detail').innerText = "ADAPTIVE INTERVENTION: NOMINAL BREAK CYCLES";
      }
    });
  });
}

/* ==========================================================================
   5. LIVE TELEMETRY SIMULATION
   ========================================================================== */
function initTelemetrySimulation() {
  const fpsEl = document.getElementById('telemetryFps');
  const latencyEl = document.getElementById('telemetryLatency');
  const focusEl = document.getElementById('telemetryFocus');

  setInterval(() => {
    if (fpsEl) {
      const fps = (29.5 + Math.random() * 1.5).toFixed(1);
      fpsEl.innerText = `${fps} FPS // REALTIME`;
    }
    if (latencyEl) {
      const lat = Math.floor(28 + Math.random() * 8);
      latencyEl.innerText = `${lat}MS // SYNCHRONIZED`;
    }
    if (focusEl) {
      const focus = Math.floor(92 + Math.random() * 6);
      focusEl.innerText = `LEVEL ${focus}% // NOMINAL`;
    }
  }, 2500);
}

/* ==========================================================================
   6. COMING SOON MODAL / NOTIFICATION SYSTEM
   ========================================================================== */
function initComingSoonModals() {
  const comingSoonLinks = document.querySelectorAll('[data-coming-soon]');
  comingSoonLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      // Silently handled without fixed popup toasts at bottom of screen
    });
  });
}

function showTacticalNotice(message) {
  // Disabled as per user request to keep bottom clean
}

/* ==========================================================================
   7. CONTACT FORM SUBMISSION
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;

    btn.innerHTML = `<span style="color:#05080E;">TRANSMITTING ENCRYPTED PACKET...</span>`;
    btn.disabled = true;

    setTimeout(() => {
      showTacticalNotice("[ TRANSMISSION SUCCESSFUL ]: Message received by the FocusBot engineering unit.");
      form.reset();
      btn.innerHTML = originalText;
      btn.disabled = false;
    }, 1200);
  });
}
