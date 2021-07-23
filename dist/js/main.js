(() => {
  var __defProp = Object.defineProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __publicField = (obj, key, value) => {
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
  };

  // src/js/modules/Eases.js
  var Eases = class {
    static get(key) {
      switch (key) {
        case "linear":
          return this._easeLinear;
        case "easeOut":
          return this._easeOutSine;
        case "easeOutExpo":
          return this._easeOutExpo;
        case "easeOutSpring":
          return this._easeOutSpring;
        case "easeOutBack":
          return this._easeOutBack;
        default:
          return this._easeLinear;
      }
    }
    static _easeLinear(p) {
      return p;
    }
    static _easeOutSine(p) {
      return Math.sin(p * (Math.PI / 2));
    }
    static _easeOutExpo(p) {
      return 1 - Math.pow(2, -10 * p);
    }
    static _easeOutSpring(p) {
      const p1 = 1;
      const p2 = 0.3;
      const p3 = p2 / (Math.PI * 2) * (Math.asin(1 / p1) || 0);
      return p1 * Math.pow(2, -10 * p) * Math.sin((p - p3) * (Math.PI * 2) / p2) + 1;
    }
    static _easeOutBack(p) {
      const p1 = 1.70158;
      return (p = p - 1) * p * ((p1 + 1) * p + p1) + 1;
    }
  };

  // src/js/modules/Animation.js
  var Animation = class {
    constructor(target, properties, direction) {
      this.target = target;
      this.properties = properties;
      this.direction = direction;
      this.propertyDeltas = {};
      this.setProperties();
    }
    setProperties() {
      switch (this.direction) {
        case "to":
          for (const property in this.properties) {
            this.propertyDeltas[property] = {
              start: this.target[property],
              delta: this.properties[property] - this.target[property]
            };
          }
          break;
        case "from":
          for (const property in this.properties) {
            this.propertyDeltas[property] = {
              start: this.properties[property],
              delta: this.target[property] - this.properties[property]
            };
          }
          break;
        default:
          break;
      }
    }
    update(progress) {
      for (const property in this.properties) {
        this.target[property] = this.propertyDeltas[property].start + progress * this.propertyDeltas[property].delta;
      }
    }
  };

  // src/js/modules/Composition.js
  var Composition = class {
    constructor() {
      this.timeScale = 1e3;
      this.duration = 0;
      this.startTime = 0;
      this.currentTime = 0;
      this.progress = 0;
      this.paused = false;
      this.rewinding = false;
      this.currentAnimationFrame = null;
      this.previousVoiceDuration = 0;
      this.voices = [];
    }
    play() {
      this.rewinding = false;
      if (this.paused) {
        this.startTime = performance.now() - this.duration * this.progress;
      } else {
        this.startTime = performance.now();
      }
      this.paused = false;
      const update2 = (currentTime) => {
        const elapsedTime = currentTime - this.startTime;
        this.progress = Math.min(elapsedTime / this.duration, 1);
        this._animate();
        if (this.progress < 1) {
          this.currentAnimationFrame = requestAnimationFrame(update2);
        }
      };
      this.currentAnimationFrame = requestAnimationFrame(update2);
    }
    pause() {
      this.paused = true;
      cancelAnimationFrame(this.currentAnimationFrame);
    }
    rewind() {
      this.rewinding = true;
      if (this.paused) {
        this.startTime = performance.now() - this.duration * (1 - this.progress);
      } else {
        this.startTime = performance.now();
      }
      this.paused = false;
      const update2 = (currentTime) => {
        const elapsedTime = this.duration - (currentTime - this.startTime);
        this.progress = Math.min(elapsedTime / this.duration, 1);
        this._animate();
        if (this.progress > 0) {
          this.currentAnimationFrame = requestAnimationFrame(update2);
        }
      };
      this.currentAnimationFrame = requestAnimationFrame(update2);
    }
    setProgress(progress) {
      this.progress = progress;
      const update2 = (currentTime) => {
        const elapsedTime = this.duration * this.progress;
        this._animate();
      };
      this.currentAnimationFrame = requestAnimationFrame(update2);
    }
    _animate() {
      this.currentTime = this.duration * this.progress;
      this.voices.forEach((voice, index) => {
        voice.progress = (this.currentTime - voice.timings.start) / voice.timings.totalDuration;
        if (voice.started && !voice.completed) {
          voice.options.onUpdate?.();
          voice.motifs.forEach((motif, index2) => {
            const staggerTime = Math.max(this.currentTime - voice.timings.start - voice.timings.stagger * index2, 0);
            const staggerProgress = Math.min(staggerTime / voice.timings.duration, 1);
            const latest = voice.timings.easing(staggerProgress);
            motif.update(latest);
          });
        }
        if (voice.progress > 0) {
          if (!voice.started) {
            voice.options.onStart?.();
            if (voice.timings.start !== 0) {
              voice.motifs.forEach((motif) => {
                motif.setProperties();
              });
            }
          }
          voice.started = true;
        } else {
          if (voice.started && voice.direction === "from") {
            if (voice.timings.start !== 0) {
              voice.motifs.forEach((motif) => {
                motif.update(1);
              });
            } else {
              voice.motifs.forEach((motif) => {
                motif.update(0);
              });
            }
          } else if (!voice.started && !voice.initialized && voice.direction === "from") {
            voice.motifs.forEach((motif) => {
              motif.update(0);
            });
            voice.initialized = true;
          }
          voice.started = false;
        }
        if (voice.progress >= 1) {
          if (!voice.completed) {
            voice.options.onComplete?.();
            voice.motifs.forEach((motif) => {
              motif.update(1);
            });
          }
          voice.completed = true;
        } else {
          voice.completed = false;
        }
      });
    }
    to(target, properties, options, offset = null) {
      const targets = this._setTargets(target);
      const timings = this._setTimings(targets, options, offset);
      const motifs = [];
      targets.forEach((target2) => {
        motifs.push(new Animation(target2, properties, "to"));
      });
      this._add(motifs, timings, options, "to");
    }
    from(target, properties, options, offset = null) {
      const targets = this._setTargets(target);
      const timings = this._setTimings(targets, options, offset);
      const motifs = [];
      targets.forEach((target2) => {
        motifs.push(new Animation(target2, properties, "from"));
      });
      this._add(motifs, timings, options, "from");
    }
    _add(motifs, timings, options, direction) {
      this.voices.push({ motifs, timings, options, direction, progress: 0, initialized: false, started: false, completed: false });
      this.setProgress(0);
    }
    _setTargets(target) {
      let targets = null;
      if (Array.isArray(target)) {
        targets = target;
      } else {
        targets = [target];
      }
      return targets;
    }
    _setTimings(targets, options, offset) {
      const timings = {};
      const timeScaledDuration = options.duration * this.timeScale;
      let voiceOffset = 0;
      if (offset !== null) {
        voiceOffset = offset * this.timeScale;
      } else {
        voiceOffset = this.previousVoiceDuration;
      }
      timings.stagger = options.stagger ? options.stagger * this.timeScale : 0;
      const delay = options.delay ? options.delay * this.timeScale + voiceOffset : voiceOffset;
      const duration = timeScaledDuration + (targets.length - 1) * timings.stagger;
      timings.start = delay;
      timings.end = delay + duration;
      timings.duration = timeScaledDuration;
      timings.totalDuration = duration;
      timings.easing = Eases.get(options.ease);
      this.previousVoiceDuration = timings.end;
      this.duration = Math.max(this.previousVoiceDuration, this.duration);
      return timings;
    }
  };

  // src/js/modules/Tempo.js
  var Tempo = class {
    static to(target, properties, options) {
      const targets = this._setTargets(target);
      const timings = this._setTimings(targets, options);
      const animations = [];
      targets.forEach((target2) => {
        animations.push(new Animation(target2, properties, "to"));
      });
      this._animate(animations, timings, options);
    }
    static from(target, properties, options) {
      const targets = this._setTargets(target);
      const timings = this._setTimings(targets, options);
      const animations = [];
      targets.forEach((target2) => {
        animations.push(new Animation(target2, properties, "from"));
      });
      this._animate(animations, timings, options);
    }
    static _animate(animations, timings, options) {
      function update2(currentTime) {
        const elapsedTime = currentTime - startTime - timings.delay;
        const progress = Math.min(elapsedTime / timings.totalDuration, 1);
        animations.forEach((animation, index) => {
          const staggeredProgress = Math.min((elapsedTime - timings.stagger * index) / timings.duration, 1);
          if (staggeredProgress > 0) {
            const latest = timings.easing(staggeredProgress);
            animation.update(latest);
          }
        });
        if (progress < 1) {
          options.onUpdate?.();
          requestAnimationFrame(update2);
        } else {
          options.onComplete?.();
        }
      }
      options.onStart?.();
      const startTime = performance.now();
      requestAnimationFrame(update2);
    }
    static _setTargets(target) {
      let targets = null;
      if (Array.isArray(target)) {
        targets = target;
      } else {
        targets = [target];
      }
      return targets;
    }
    static _setTimings(targets, options) {
      const timeScale = 1e3;
      const timings = {};
      timings.duration = options.duration * timeScale;
      timings.delay = options.delay ? options.delay * timeScale : 0;
      timings.stagger = options.stagger ? options.stagger * timeScale : 0;
      timings.totalDuration = timings.duration + (targets.length - 1) * timings.stagger;
      timings.easing = Eases.get(options.ease);
      return timings;
    }
  };
  __publicField(Tempo, "composition", Composition);

  // src/js/main.js
  var webgl = document.getElementById("webgl");
  var glContext = webgl.getContext("webgl", {
    powerPreference: "high-performance"
  });
  var copyItems = [];
  copyItems.push({
    yOffset: 50,
    opacity: 0
  });
  copyItems.push({
    yOffset: 50,
    opacity: 0
  });
  copyItems.push({
    yOffset: 50,
    opacity: 0
  });
  var imageItems = [];
  imageItems.push({
    scale: 1,
    rotateY: 0,
    rotateX: 0,
    translateX: 0
  });
  imageItems.push({
    scale: 1,
    rotateY: 0,
    rotateX: 0,
    translateX: 0
  });
  imageItems.push({
    scale: 1,
    rotateY: 0,
    rotateX: 0,
    translateX: 0
  });
  var copyItemsElements = document.querySelectorAll(".copy-item");
  var imageElements = document.querySelectorAll(".image-item");
  var scrollProgress = 0;
  var update = () => {
    imageElements.forEach((item, index) => {
      item.style.transform = `translateX(${imageItems[index].translateX}px) rotateY(${imageItems[index].rotateY}deg) rotateX(${imageItems[index].rotateX}deg) scale(${imageItems[index].scale})`;
    });
    copyItemsElements.forEach((item, index) => {
      item.style.opacity = copyItems[index].opacity;
      item.style.transform = `translateY(${copyItems[index].yOffset}px)`;
    });
    requestAnimationFrame(update);
    composition.setProgress(scrollProgress);
  };
  requestAnimationFrame(update);
  var composition = new Tempo.composition();
  copyItems.forEach((item, index) => {
    composition.to(item, { yOffset: -50 }, {
      duration: 1,
      ease: "linear"
    });
    composition.to(item, { opacity: 1 }, {
      duration: 0.25,
      ease: "linear"
    }, 0 + index);
    composition.to(item, { opacity: 0 }, {
      duration: 0.25,
      ease: "linear"
    }, 0.75 + index);
  });
  composition.from(imageItems, { scale: 0 }, { duration: 1, ease: "linear" }, 0);
  composition.to(imageItems[0], { translateX: -250 }, { duration: 1, ease: "linear" }, 1);
  composition.to(imageItems[2], { translateX: 250 }, { duration: 1, ease: "linear" }, 1);
  composition.to(imageItems[0], { translateX: -125 }, { duration: 1, ease: "linear" }, 2);
  composition.to(imageItems[2], { translateX: 125 }, { duration: 1, ease: "linear" }, 2);
  composition.to(imageItems, { rotateY: 30, rotateX: 30 }, { duration: 1, ease: "linear" }, 2);
  var stickyElement = document.querySelector(".sticky-element");
  var observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        window.addEventListener("scroll", scrollListener);
      } else {
        window.removeEventListener("scroll", scrollListener);
      }
    });
  }, { threshold: 1 });
  observer.observe(stickyElement);
  var scrollMultiplier = 1;
  var content = document.querySelector(".sticky-wrapper");
  content.style.height = `${scrollMultiplier * composition.duration + window.innerHeight}px`;
  var scrollHeight = scrollMultiplier * composition.duration;
  var scrollListener = (event) => {
    const scrollDistance = event.target.scrollingElement.scrollTop;
    const scrollPosition = scrollDistance - content.offsetTop;
    scrollProgress = Math.min(Math.max(scrollPosition / scrollHeight, 0), 1);
  };
})();
