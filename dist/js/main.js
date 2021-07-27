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

  // src/js/modules/Scene.js
  var Scene = class {
    constructor() {
      this.timeScale = 1e3;
      this.duration = 0;
      this.startTime = 0;
      this.currentTime = 0;
      this.progress = 0;
      this.paused = false;
      this.rewinding = false;
      this.currentAnimationFrame = null;
      this.previousActionDuration = 0;
      this.actions = [];
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
      this.actions.forEach((action, index) => {
        action.progress = (this.currentTime - action.timings.start) / action.timings.totalDuration;
        if (action.started && !action.completed) {
          action.options.onUpdate?.();
          action.moments.forEach((moment, index2) => {
            const staggerTime = Math.max(this.currentTime - action.timings.start - action.timings.stagger * index2, 0);
            const staggerProgress = Math.min(staggerTime / action.timings.duration, 1);
            const latest = action.timings.easing(staggerProgress);
            moment.update(latest);
          });
        }
        if (action.progress > 0) {
          if (!action.started) {
            action.options.onStart?.();
            if (action.timings.start !== 0) {
              action.moments.forEach((moment) => {
                moment.setProperties();
              });
            }
          }
          action.started = true;
        } else {
          if (action.started && action.direction === "from") {
            if (action.timings.start !== 0) {
              action.moments.forEach((moment) => {
                moment.update(1);
              });
            } else {
              action.moments.forEach((moment) => {
                moment.update(0);
              });
            }
          } else if (!action.started && !action.initialized && action.direction === "from") {
            action.moments.forEach((moment) => {
              moment.update(0);
            });
            action.initialized = true;
          }
          action.started = false;
        }
        if (action.progress >= 1) {
          if (!action.completed) {
            action.options.onComplete?.();
            action.moments.forEach((moment) => {
              moment.update(1);
            });
          }
          action.completed = true;
        } else {
          action.completed = false;
        }
      });
    }
    to(target, properties, options, offset = null) {
      const targets = this._setTargets(target);
      const timings = this._setTimings(targets, options, offset);
      const moments = [];
      targets.forEach((target2) => {
        moments.push(new Animation(target2, properties, "to"));
      });
      this._add(moments, timings, options, "to");
    }
    from(target, properties, options, offset = null) {
      const targets = this._setTargets(target);
      const timings = this._setTimings(targets, options, offset);
      const moments = [];
      targets.forEach((target2) => {
        moments.push(new Animation(target2, properties, "from"));
      });
      this._add(moments, timings, options, "from");
    }
    _add(moments, timings, options, direction) {
      this.actions.push({ moments, timings, options, direction, progress: 0, initialized: false, started: false, completed: false });
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
      let actionOffset = 0;
      if (offset !== null) {
        actionOffset = offset * this.timeScale;
      } else {
        actionOffset = this.previousActionDuration;
      }
      timings.stagger = options.stagger ? options.stagger * this.timeScale : 0;
      const delay = options.delay ? options.delay * this.timeScale + actionOffset : actionOffset;
      const duration = timeScaledDuration + (targets.length - 1) * timings.stagger;
      timings.start = delay;
      timings.end = delay + duration;
      timings.duration = timeScaledDuration;
      timings.totalDuration = duration;
      timings.easing = Eases.get(options.ease);
      this.previousActionDuration = timings.end;
      this.duration = Math.max(this.previousActionDuration, this.duration);
      return timings;
    }
  };

  // src/js/modules/Dolly.js
  var Dolly = class {
    constructor(element2, scene2, options = {}) {
      this.element = element2;
      this.scene = scene2;
      this.options = options;
      this.observer = null;
      this.progress = 0;
      this.scrollDistance = 0;
      this.scrollPosition = 0;
      if (this.options.pinned) {
        this.threshold = 1;
        this.offset = this.element.parentElement.offsetTop;
        this.scrollHeight = this.scene.duration;
        this._scrollListener = this._pinnedScrollListener.bind(this);
        this._setScrollHeight();
      } else {
        this.threshold = 0;
        this.offset = this.element.offsetTop;
        this.viewportHeight = window.innerHeight;
        this.scrollHeight = this.element.getBoundingClientRect().height + this.offset;
        this._scrollListener = this._defaultScrollListener.bind(this);
      }
      this._createObserver();
    }
    _setScrollHeight() {
      this.element.parentElement.style.height = `${this.scrollHeight + window.innerHeight}px`;
    }
    _defaultScrollListener(event) {
      this.scrollDistance = event.target.scrollingElement.scrollTop;
      this.scrollPosition = this.scrollDistance + this.viewportHeight - this.offset;
      this.progress = Math.min(Math.max(this.scrollPosition / this.scrollHeight, 0), 1);
    }
    _pinnedScrollListener(event) {
      this.scrollDistance = event.target.scrollingElement.scrollTop;
      this.scrollPosition = this.scrollDistance - this.offset;
      this.progress = Math.min(Math.max(this.scrollPosition / this.scrollHeight, 0), 1);
    }
    _createObserver() {
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            window.addEventListener("scroll", this._scrollListener);
          } else {
            window.removeEventListener("scroll", this._scrollListener);
          }
        });
      }, { threshold: this.threshold });
      this.observer.observe(this.element);
    }
  };

  // src/js/modules/Director.js
  var Director = class {
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
  __publicField(Director, "scene", Scene);
  __publicField(Director, "dolly", Dolly);

  // src/js/main.js
  var webgl = document.getElementById("webgl");
  var glContext = webgl.getContext("webgl", {
    powerPreference: "high-performance"
  });
  var rowItems = [];
  for (let i = 0; i < 3; i++) {
    rowItems.push({
      translateX: 0
    });
  }
  var imageRows = document.querySelectorAll(".images-row");
  var root = document.documentElement;
  var update = () => {
    imageRows.forEach((row, index) => {
      row.style.transform = `translateX(${rowItems[index].translateX}px)`;
    });
    requestAnimationFrame(update);
    scene.setProgress(dolly.progress);
  };
  requestAnimationFrame(update);
  var scene = new Director.scene();
  scene.to(rowItems[0], { translateX: 500 }, { duration: 1, ease: "linear" });
  scene.to(rowItems[1], { translateX: -500 }, { duration: 1, ease: "linear" }, 0);
  scene.to(rowItems[2], { translateX: 250 }, { duration: 1, ease: "linear" }, 0);
  var element = document.querySelector(".animated-element");
  var dolly = new Director.dolly(element, scene);
})();
