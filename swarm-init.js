/*
 * swarm-init.js — boots the multi-agent cursor rebuild engine for Laxman Mallapur's portfolio.
 * Recreates the exact "Agentic Build" reel on Instagram!
 */
(function () {
  "use strict";

  var KEY = "__swarmRebuild";

  var opts = {
    auto: true,
    delayMs: 350,
    waitFonts: true,
    oncePerSession: false
  };

  function q(name) {
    try {
      return new URLSearchParams(location.search).get(name);
    } catch (_) {
      return null;
    }
  }

  function mode() {
    var v = q("swarm");
    if (v === "off" || v === "0") return "off";
    if (v === "once" || v === "session") return "once";
    if (v === "1" || v === "on" || v === "always") return "always";
    return opts.oncePerSession ? "once" : "always";
  }

  function disabled() {
    return mode() === "off";
  }

  function alreadyDone() {
    if (mode() !== "once") return false;
    try {
      return sessionStorage.getItem("swarm:done") === "1";
    } catch (_) {
      return false;
    }
  }

  function prefersReducedMotion() {
    if (mode() === "always") return false;
    try {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch (_) {
      return false;
    }
  }

  function markDone() {
    try {
      sessionStorage.setItem("swarm:done", "1");
    } catch (_) {}
  }

  function loadEngine() {
    return new Promise(function (resolve, reject) {
      if (window[KEY]) return resolve(window[KEY]);
      var s = document.createElement("script");
      s.src = "./swarm/swarm.js";
      s.async = false;
      s.onload = function () {
        if (window[KEY]) resolve(window[KEY]);
        else reject(new Error("swarm engine did not register"));
      };
      s.onerror = function () {
        reject(new Error("failed to load swarm engine"));
      };
      document.head.appendChild(s);
    });
  }

  window.triggerSwarmRebuild = async function () {
    try {
      if (!window[KEY]) {
        await loadEngine();
      }
      if (window[KEY]) {
        if (typeof window[KEY].toggle === 'function') {
          window[KEY].toggle();
        } else if (typeof window[KEY].run === 'function') {
          window[KEY].run();
        }
      }
    } catch (e) {
      console.error("[swarm] trigger failed", e);
    }
  };

  async function boot() {
    if (!opts.auto) return;
    if (disabled()) return;
    if (prefersReducedMotion()) return;
    if (alreadyDone()) return;
    if (window[KEY]) return;

    await new Promise(function (r) {
      if (document.readyState === "complete") r();
      else window.addEventListener("load", r, { once: true });
    });

    if (opts.waitFonts) {
      try {
        await Promise.race([
          document.fonts.ready,
          new Promise(function (r) { setTimeout(r, 1200); })
        ]);
      } catch (_) {}
    }

    await new Promise(function (r) { setTimeout(r, opts.delayMs); });

    if (disabled() || alreadyDone()) return;

    try {
      await loadEngine();
      markDone();

      if (window[KEY] && window[KEY].app && !window[KEY].app.tour) {
        var started = false;
        var start = function () {
          if (started) return;
          started = true;
          setTimeout(function () {
            try {
              var host = document.querySelector("swarm-rebuild");
              var btn = host && host.shadowRoot && host.shadowRoot.querySelector('[data-a="tour"]');
              if (btn && !btn.hidden) btn.click();
            } catch (_) {}
          }, 350);
        };
        var cancel = function () {
          if (!window[KEY] || !window[KEY].app) return;
          try { window[KEY].app.tour = false; } catch (_) {}
        };
        if (document.readyState === "complete") start();
        else window.addEventListener("load", start, { once: true });
        window.addEventListener("wheel", cancel, { passive: true });
        window.addEventListener("touchstart", cancel, { passive: true });
        document.addEventListener("keydown", function (e) {
          if (e.key === "ArrowDown" || e.key === "ArrowUp" ||
              e.key === "PageDown" || e.key === "PageUp" ||
              e.key === " " || e.key === "Home" || e.key === "End") cancel();
        });
      }
    } catch (err) {
      console.error("[swarm] boot failed", err);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }

  window.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && window[KEY] && window[KEY].app) {
      try { window[KEY].stop(false); } catch (_) {}
    }
  });
})();
