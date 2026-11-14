/**
 * LAXMAN MALLAPUR PORTFOLIO
 * Modern Vanilla JavaScript — Noir & Crimson Ambient Canvas, Interactive LifeLink Explorer, Bento Filter, Terminal & Swarm Controls
 */

(function () {
  'use strict';

  // ==========================================================================
  // LIFELINK 5-LAYER ARCHITECTURAL & FEATURE DATA
  // ==========================================================================
  const LIFELINK_LAYERS = {
    1: {
      badge: 'MODULE 01 // P2P RESOURCE CIRCULATION',
      title: 'Item Donation & Borrowing Marketplace',
      desc: 'Facilitates direct community sharing of useful goods, appliances, books, and essentials. Users can list items to donate permanently or loan out temporarily with seamless status tracking.',
      tags: ['P2P Sharing', 'Circular Economy', 'Item Lifecycle']
    },
    2: {
      badge: 'MODULE 02 // CRITICAL EMERGENCY DISPATCH',
      title: 'Blood Donation & Urgent Community Requests',
      desc: 'High-priority request broadcasting system connecting individuals in urgent medical need with compatible voluntary donors across Belagavi and nearby regions without intermediary delays.',
      tags: ['Urgent Broadcast', 'Life-Saving Alerts', 'Volunteer Network']
    },
    3: {
      badge: 'MODULE 03 // COMMUNITY RECOVERY NETWORK',
      title: 'Lost & Found Verification & Recovery Board',
      desc: 'Dedicated reporting board enabling citizens to register misplaced or found belongings with description parameters, contact handshakes, and verification safeguards.',
      tags: ['Item Recovery', 'Verification Protocol', 'Community Trust']
    },
    4: {
      badge: 'MODULE 04 // CLOUD DATA INFRASTRUCTURE',
      title: 'Supabase Database Integration & Realtime Sync',
      desc: 'Engineered with Supabase PostgreSQL, implementing Row-Level Security (RLS) policies, structured relational schemas for users and listings, and instant realtime subscriptions.',
      tags: ['Supabase PostgreSQL', 'Row-Level Security', 'Realtime Sync']
    },
    5: {
      badge: 'MODULE 05 // EDGE DEPLOYMENT & MODERN UI',
      title: 'Responsive Multi-Device UI & Vercel Edge Hosting',
      desc: 'Mobile-first responsive interface deployed continuously on Vercel with automated GitHub CI/CD integration, ensuring rapid loading across mobile phones, tablets, and desktops.',
      tags: ['Vercel Edge Hosting', 'Mobile-First UI', 'GitHub CI/CD']
    }
  };

  // ==========================================================================
  // AMBIENT NOIR & CRIMSON OP-ART CANVAS
  // ==========================================================================
  function initAuroraCanvas() {
    const canvas = document.getElementById('aurora-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;
    let animationFrameId = null;
    let isRunning = false;
    let mouse = { x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 };
    let frame = 0;

    // Atmospheric Crimson Orbs (Red & Noir focus)
    const orbs = [
      { x: 0.35, y: 0.40, radius: 0.52, vx: 0.0003, vy: 0.0002, color: 'rgba(239, 68, 68, 0.16)' }, // Crimson Red
      { x: 0.70, y: 0.45, radius: 0.44, vx: -0.0002, vy: 0.0003, color: 'rgba(185, 28, 28, 0.12)' }, // Deep Blood Red
      { x: 0.50, y: 0.80, radius: 0.48, vx: 0.0002, vy: -0.0002, color: 'rgba(255, 255, 255, 0.03)' }  // Ghost Monochrome
    ];

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resize, { passive: true });
    resize();

    window.addEventListener('mousemove', (e) => {
      mouse.targetX = e.clientX / width;
      mouse.targetY = e.clientY / height;
    }, { passive: true });

    function render() {
      if (!isRunning) return;
      frame++;

      // Ease mouse coordinates for smooth parallax
      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;

      ctx.clearRect(0, 0, width, height);

      // Render subtle crimson orbs
      orbs.forEach((orb) => {
        orb.x += orb.vx;
        orb.y += orb.vy;

        if (orb.x < 0.1 || orb.x > 0.9) orb.vx *= -1;
        if (orb.y < 0.1 || orb.y > 0.9) orb.vy *= -1;

        const px = (orb.x + (mouse.x - 0.5) * 0.06) * width;
        const py = (orb.y + (mouse.y - 0.5) * 0.06) * height;
        const r = orb.radius * Math.min(width, height);

        const gradient = ctx.createRadialGradient(px, py, 0, px, py, r);
        gradient.addColorStop(0, orb.color);
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(px, py, r, 0, Math.PI * 2);
        ctx.fill();
      });

      // Subtle Op-Art Concentric Ambient Rings
      const centerX = width * 0.5 + (mouse.x - 0.5) * 20;
      const centerY = height * 0.45 + (mouse.y - 0.5) * 20;
      const baseR = (frame * 0.4) % 120;

      ctx.lineWidth = 1;
      for (let i = 0; i < 4; i++) {
        const ringRadius = baseR + i * 140;
        const alpha = Math.max(0, 0.04 - (ringRadius / (Math.max(width, height) * 0.7)) * 0.04);
        if (alpha > 0.005) {
          ctx.strokeStyle = `rgba(255, 255, 255, ${alpha.toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(centerX, centerY, ringRadius, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    }

    function startLoop() {
      if (!isRunning) {
        isRunning = true;
        render();
      }
    }

    function stopLoop() {
      isRunning = false;
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    }

    startLoop();

    // Pause rendering when tab is hidden to conserve GPU/CPU
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        stopLoop();
      } else {
        startLoop();
      }
    });

    // Pause rendering when Hero is scrolled out of viewport
    const heroSection = document.getElementById('hero');
    if (heroSection && 'IntersectionObserver' in window) {
      const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startLoop();
          } else {
            stopLoop();
          }
        });
      }, { threshold: 0.02 });
      heroObserver.observe(heroSection);
    }
  }

  // ==========================================================================
  // LIFELINK ARCHITECTURE TAB SWITCHER
  // ==========================================================================
  function initLayerTabs() {
    const tabs = document.querySelectorAll('.layer-tab');
    const badgeEl = document.getElementById('layer-inspect-id');
    const titleEl = document.getElementById('layer-inspect-title');
    const descEl = document.getElementById('layer-inspect-desc');
    const tagsEl = document.getElementById('layer-inspect-tags');
    const contentPane = document.getElementById('layer-content');

    if (!tabs.length || !titleEl) return;

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const layerNum = tab.getAttribute('data-layer');
        const data = LIFELINK_LAYERS[layerNum];
        if (!data) return;

        // Update active tab styling
        tabs.forEach((t) => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');

        // Smooth content swap animation
        if (contentPane) {
          contentPane.style.opacity = '0';
          contentPane.style.transform = 'translateY(6px)';
          contentPane.style.transition = 'opacity 0.18s ease, transform 0.18s ease';

          setTimeout(() => {
            if (badgeEl) badgeEl.textContent = data.badge;
            if (titleEl) titleEl.textContent = data.title;
            if (descEl) descEl.textContent = data.desc;

            if (tagsEl) {
              tagsEl.innerHTML = '';
              data.tags.forEach((tagText) => {
                const span = document.createElement('span');
                span.className = 'tech-tag';
                span.textContent = tagText;
                tagsEl.appendChild(span);
              });
            }

            contentPane.style.opacity = '1';
            contentPane.style.transform = 'translateY(0)';
          }, 180);
        }
      });
    });
  }

  // ==========================================================================
  // BENTO GRID CATEGORY FILTERING
  // ==========================================================================
  function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const bentoCards = document.querySelectorAll('.bento-card');

    if (!filterButtons.length || !bentoCards.length) return;

    filterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');

        // Toggle active button state
        filterButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        // Filter cards
        bentoCards.forEach((card) => {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });
  }

  // ==========================================================================
  // 1-CLICK CLIPBOARD COPY WITH FLOATING TOAST
  // ==========================================================================
  function initCopyButtons() {
    const copyButtons = document.querySelectorAll('.copy-btn');
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-message');
    let toastTimeout = null;

    function showToast(message) {
      if (!toast) return;
      if (toastMsg) toastMsg.textContent = message;
      toast.classList.add('show');

      if (toastTimeout) clearTimeout(toastTimeout);
      toastTimeout = setTimeout(() => {
        toast.classList.remove('show');
      }, 3200);
    }

    copyButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const textToCopy = btn.getAttribute('data-copy') || 'mallapurlaxman2@gmail.com';

        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(textToCopy)
            .then(() => {
              showToast(`Copied to clipboard: ${textToCopy}`);
            })
            .catch(() => {
              fallbackCopy(textToCopy);
            });
        } else {
          fallbackCopy(textToCopy);
        }
      });
    });

    function fallbackCopy(text) {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        showToast(`Copied to clipboard: ${text}`);
      } catch (err) {
        showToast(`Information: ${text}`);
      }
      document.body.removeChild(textarea);
    }
  }

  // ==========================================================================
  // ACTIVE NAVIGATION DOCK SECTION OBSERVER
  // ==========================================================================
  function initScrollObserver() {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('section[id]');

    if (!navItems.length || !sections.length || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navItems.forEach((item) => {
              if (item.getAttribute('href') === `#${id}`) {
                item.classList.add('active');
              } else {
                item.classList.remove('active');
              }
            });
          }
        });
      },
      { threshold: 0.25 }
    );

    sections.forEach((sec) => observer.observe(sec));
  }

  // ==========================================================================
  // DISPATCH TERMINAL SIMULATOR (Interactive CLI with Commands)
  // ==========================================================================
  function initDispatchTerminal() {
    const form = document.getElementById('terminal-form');
    const input = document.getElementById('terminal-input');
    const log = document.getElementById('terminal-log');
    if (!form || !input || !log) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = input.value.trim();
      if (!val) return;

      const userLine = document.createElement('div');
      userLine.className = 'terminal-line user-line';
      userLine.innerHTML = `<span class="term-prompt">visitor@laxman:~$</span> <span class="term-msg">${escapeHtml(val)}</span>`;
      log.appendChild(userLine);
      input.value = '';

      const lower = val.toLowerCase();

      setTimeout(() => {
        const botLine = document.createElement('div');
        botLine.className = 'terminal-line bot-line';

        if (lower === 'clear') {
          log.innerHTML = '';
          return;
        } else if (lower === 'help') {
          botLine.innerHTML = `<span class="term-reply">[AVAILABLE COMMANDS]</span><br>• <strong>hire</strong> - Details to hire Laxman for paid websites & apps<br>• <strong>quote</strong> - Request a customized project price estimate<br>• <strong>services</strong> - View all 8 development capabilities<br>• <strong>status</strong> - Current workload & availability<br>• <strong>clear</strong> - Clear console log<br>Or simply type your project inquiry directly!`;
        } else if (lower === 'hire' || lower === 'quote' || lower.includes('cost') || lower.includes('price')) {
          botLine.innerHTML = `<span class="term-reply">[COMMERCIAL INQUIRY]</span> Laxman is currently <strong>OPEN FOR PAID PROJECTS</strong>.<br>Packages: <strong>Modern Websites</strong>, <strong>Full-Stack Web Apps</strong>, and <strong>Android Mobile Apps</strong>.<br>Fast turnaround & full GitHub code ownership.<br>Direct Email: <a href="mailto:mallapurlaxman2@gmail.com?subject=Paid%20Project%20Inquiry%20-%20Laxman%20Mallapur" style="color:#ef4444;text-decoration:underline;">mallapurlaxman2@gmail.com</a>`;
        } else if (lower === 'services') {
          botLine.innerHTML = `<span class="term-reply">[SERVICES OFFERED]</span><br>1. Business & Personal Websites<br>2. Portfolio Websites (Cyber/Modern)<br>3. Landing Pages & Funnels<br>4. E-Commerce Stores<br>5. Full-Stack Web Applications (React + Supabase)<br>6. Android Mobile Apps (APKs)<br>7. Supabase Database Integration<br>8. Maintenance, Bug Fixing & Local AI Models`;
        } else if (lower === 'status') {
          botLine.innerHTML = `<span class="term-reply">[OPERATOR STATUS]</span> Active & Available for new commercial client commissions worldwide from Gokak, Belagavi, Karnataka.`;
        } else {
          botLine.innerHTML = `<span class="term-reply">[DISPATCH ACCEPTED]</span> Transmission received. Routing packet to Laxman Mallapur.<br>To finalize your project requirements immediately, send an email to: <a href="mailto:mallapurlaxman2@gmail.com?subject=Project%20Inquiry%20-%20Laxman%20Mallapur&body=${encodeURIComponent(val)}" style="color:#ef4444;text-decoration:underline;">mallapurlaxman2@gmail.com</a> | GitHub: <a href="https://github.com/mallapurlaxman2-max" target="_blank" style="color:#ef4444;text-decoration:underline;">github.com/mallapurlaxman2-max</a>`;
        }

        log.appendChild(botLine);
        log.scrollTop = log.scrollHeight;
      }, 350);

      log.scrollTop = log.scrollHeight;
    });

    function escapeHtml(str) {
      return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }
  }

  // ==========================================================================
  // QUICK PROJECT INQUIRY BUILDER & SERVICE TRIGGERS
  // ==========================================================================
  function initInquiryBuilder() {
    const pills = document.querySelectorAll('.inquiry-pill');
    const textarea = document.getElementById('inquiry-details');
    const sendBtn = document.getElementById('inquiry-send-btn');
    const serviceButtons = document.querySelectorAll('.service-inquire-btn');

    let selectedService = 'Website Development';

    pills.forEach((pill) => {
      pill.addEventListener('click', () => {
        pills.forEach((p) => p.classList.remove('active'));
        pill.classList.add('active');
        selectedService = pill.getAttribute('data-service') || pill.innerText.trim();
        updateMailtoLink();
      });
    });

    if (textarea) {
      textarea.addEventListener('input', () => {
        updateMailtoLink();
      });
    }

    function updateMailtoLink() {
      if (!sendBtn) return;
      const details = textarea ? textarea.value.trim() : '';
      const subject = encodeURIComponent(`Paid Project Inquiry: ${selectedService} - [Client Request]`);
      const body = encodeURIComponent(
        `Hi Laxman,\n\nI would like to hire you to build a project:\n\nService: ${selectedService}\n\nProject Scope & Requirements:\n${details || 'Please provide details on pricing, timeline, and deliverables for this project.'}\n\nBest regards,\n[Your Name / Company]`
      );
      sendBtn.setAttribute('href', `mailto:mallapurlaxman2@gmail.com?subject=${subject}&body=${body}`);
    }

    // Connect Service Cards directly to Inquiry Builder
    serviceButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const targetService = btn.getAttribute('data-service');
        if (!targetService) return;

        // Switch active pill
        pills.forEach((p) => {
          if (p.getAttribute('data-service') === targetService || p.innerText.includes(targetService)) {
            p.classList.add('active');
            selectedService = targetService;
          } else {
            p.classList.remove('active');
          }
        });

        if (textarea) {
          textarea.value = `I am interested in hiring you for: ${targetService}. Please let me know your availability and price estimate.`;
        }

        updateMailtoLink();
      });
    });

    updateMailtoLink();
  }

  // ==========================================================================
  // WEB AUDIO API CYBER SOUND ENGINE
  // ==========================================================================
  let audioCtx = null;
  let soundEnabled = true;

  function initAudioContext() {
    if (!audioCtx && (window.AudioContext || window.webkitAudioContext)) {
      const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioCtxClass();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function playCyberClick(freq = 600, duration = 0.035, vol = 0.04) {
    if (!soundEnabled) return;
    try {
      const ctx = initAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.45, ctx.currentTime + duration);
      gain.gain.setValueAtTime(vol, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (_) {}
  }

  function playBuildStartSound() {
    if (!soundEnabled) return;
    try {
      const ctx = initAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.35);
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    } catch (_) {}
  }

  function playChimeSound() {
    if (!soundEnabled) return;
    try {
      const ctx = initAudioContext();
      if (!ctx) return;
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.07);
        gain.gain.setValueAtTime(0.045, ctx.currentTime + i * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + i * 0.07 + 0.28);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.07);
        osc.stop(ctx.currentTime + i * 0.07 + 0.28);
      });
    } catch (_) {}
  }

  // Active swarm audio generator: plays rhythmic clicks while agents assemble the page
  let swarmAudioInterval = null;
  function startSwarmAudioLoop() {
    if (swarmAudioInterval) return;
    playBuildStartSound();
    swarmAudioInterval = setInterval(() => {
      const host = document.querySelector('swarm-rebuild');
      if (!host) {
        stopSwarmAudioLoop();
        return;
      }
      const rFreq = 420 + Math.random() * 680;
      playCyberClick(rFreq, 0.03, 0.035);
    }, 115);
  }

  function stopSwarmAudioLoop() {
    if (swarmAudioInterval) {
      clearInterval(swarmAudioInterval);
      swarmAudioInterval = null;
      playChimeSound();
    }
  }

  function initSoundToggle() {
    const btns = document.querySelectorAll('#sound-toggle-btn');
    const icons = document.querySelectorAll('#sound-icon');
    btns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        soundEnabled = !soundEnabled;
        if (soundEnabled) {
          initAudioContext();
          playCyberClick(880, 0.06, 0.08);
          icons.forEach(ic => ic.textContent = '🔊');
          btn.classList.remove('muted');
          btn.setAttribute('title', 'Cyber Sound FX: ON');
        } else {
          icons.forEach(ic => ic.textContent = '🔇');
          btn.classList.add('muted');
          btn.setAttribute('title', 'Cyber Sound FX: MUTED');
        }
      });
    });
  }

  // ==========================================================================
  // AGENTIC BUILD / SWARM TRIGGER
  // ==========================================================================
  function initSwarmTrigger() {
    const replayBtns = document.querySelectorAll('.trigger-swarm-rebuild');
    replayBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        initAudioContext();
        startSwarmAudioLoop();

        if (typeof window.triggerSwarmRebuild === 'function') {
          window.triggerSwarmRebuild();
        } else if (window.__swarmRebuild) {
          if (typeof window.__swarmRebuild.toggle === 'function') {
            window.__swarmRebuild.toggle();
          } else if (typeof window.__swarmRebuild.run === 'function') {
            window.__swarmRebuild.run();
          }
        }
      });
    });

    // Detect when swarm completes and turns off
    const observer = new MutationObserver(() => {
      const host = document.querySelector('swarm-rebuild');
      if (host && !swarmAudioInterval) {
        startSwarmAudioLoop();
      } else if (!host && swarmAudioInterval) {
        stopSwarmAudioLoop();
      }
    });
    observer.observe(document.body, { childList: true, subtree: false });
  }

  // ==========================================================================
  // LIGHTWEIGHT HERO BUILD + SCROLL REVEALS
  // ==========================================================================
  function initMotionReveals() {
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const heroParts = document.querySelectorAll('.hero-flank, .hero-center-col');
    heroParts.forEach((part) => part.classList.add('hero-build'));
    requestAnimationFrame(() => {
      requestAnimationFrame(() => heroParts.forEach((part) => part.classList.add('is-built')));
    });

    const revealItems = document.querySelectorAll(
      '.section-header, .flagship-card, .subgrid-card, .bento-card, .service-card, .about-grid, .contact-card'
    );

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    revealItems.forEach((item) => {
      item.classList.add('reveal-on-scroll');
      revealObserver.observe(item);
    });
  }

  // ==========================================================================
  // HACKER EMOJI AVATAR CYCLER
  // ==========================================================================
  function initHackerEmoji() {
    const emojiEl = document.getElementById('hacker-emoji');
    const container = document.querySelector('.hacker-avatar-container');
    if (!emojiEl || !container) return;

    const hackerEmojis = ['👨‍💻', '🥷', '👾', '🤖', '💻', '⚡'];
    let idx = 0;

    container.addEventListener('click', () => {
      idx = (idx + 1) % hackerEmojis.length;
      emojiEl.style.transform = 'scale(0.7) rotate(15deg)';
      emojiEl.style.opacity = '0.5';

      setTimeout(() => {
        emojiEl.textContent = hackerEmojis[idx];
        emojiEl.style.transform = 'scale(1.15) rotate(-5deg)';
        emojiEl.style.opacity = '1';
        setTimeout(() => {
          emojiEl.style.transform = '';
        }, 200);
      }, 120);
    });
  }

  // ==========================================================================
  // INITIALIZATION ON DOM READY
  // ==========================================================================
  document.addEventListener('DOMContentLoaded', () => {
    initAuroraCanvas();
    initHackerEmoji();
    initLayerTabs();
    initProjectFilters();
    initCopyButtons();
    initScrollObserver();
    initDispatchTerminal();
    initInquiryBuilder();
    initSoundToggle();
    initSwarmTrigger();
    initMotionReveals();
  });

})();
