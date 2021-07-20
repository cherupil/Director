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
      this.propertyDeltas = [];
      this.setProperties(direction);
    }
    setProperties(direction) {
      switch (direction) {
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
      this.startTime = 0;
      this.elapsedTime = 0;
      this.progress = 0;
      this.previousMomentDuration = 0;
      this.totalDuration = 0;
      this.currentAnimationFrame = null;
      this.paused = false;
      this.rewinding = false;
      this.moments = [];
    }
    play() {
      const update2 = (currentTime) => {
        this.elapsedTime = currentTime - this.startTime;
        this.progress = Math.min(this.elapsedTime / this.totalDuration, 1);
        this._animate();
        if (this.progress > 0 && this.progress < 1) {
          this.currentAnimationFrame = requestAnimationFrame(update2);
        }
      };
      this.rewinding = false;
      if (this.paused) {
        this.startTime = performance.now() - this.totalDuration * this.progress;
      } else {
        this.startTime = performance.now();
      }
      this.paused = false;
      this.currentAnimationFrame = requestAnimationFrame(update2);
    }
    pause() {
      cancelAnimationFrame(this.currentAnimationFrame);
      this.paused = true;
    }
    rewind() {
      const update2 = (currentTime) => {
        this.elapsedTime = Math.max(this.totalDuration - (currentTime - this.startTime), 0);
        this.progress = Math.min(this.elapsedTime / this.totalDuration, 1);
        this._animate();
        if (this.progress > 0 && this.progress < 1) {
          this.currentAnimationFrame = requestAnimationFrame(update2);
        }
      };
      this.rewinding = true;
      if (this.paused) {
        this.startTime = performance.now() - this.totalDuration * (1 - this.progress);
      } else {
        this.startTime = performance.now();
      }
      this.paused = false;
      this.currentAnimationFrame = requestAnimationFrame(update2);
    }
    to(target, properties, options, offset = null) {
      const targets = this._setTargets(target);
      const timings = this._setTimings(targets, options, offset);
      const animations = [];
      targets.forEach((target2) => {
        animations.push(new Animation(target2, properties, "to"));
      });
      this._add(animations, timings, options);
    }
    from(target, properties, options, offset = null) {
      const targets = this._setTargets(target);
      const timings = this._setTimings(targets, options, offset);
      const animations = [];
      targets.forEach((target2) => {
        animations.push(new Animation(target2, properties, "from"));
      });
      this._add(animations, timings, options);
    }
    _add(animations, timings, options) {
      if (this.moments.length === 0) {
        this.moments.push({ animations, timings, options });
      } else {
        this.moments.push({ animations, timings, options });
      }
    }
    _animate() {
      this.moments.forEach((moment) => {
        const momentTime = Math.max(this.elapsedTime - moment.timings.delay, 0);
        const momentProgress = Math.min(momentTime / moment.timings.totalDuration, 1);
        if (momentProgress > 0 && momentProgress < 1) {
          moment.options.onUpdate?.();
          moment.animations.forEach((animation, index) => {
            const staggeredProgress = Math.min((momentTime - moment.timings.stagger * index) / moment.timings.duration, 1);
            if (staggeredProgress > 0) {
              const latest = moment.timings.easing(staggeredProgress);
              animation.update(latest);
            }
          });
        } else if (momentProgress <= 0 && this.rewinding) {
          if (this.rewinding) {
            moment.animations.forEach((animation) => {
              animation.update(0);
            });
          }
        } else if (momentProgress >= 1) {
          moment.animations.forEach((animation) => {
            animation.update(1);
          });
        }
      });
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
      timings.duration = options.duration * this.timeScale;
      if (offset !== null) {
        timings.offset = offset * this.timeScale;
      } else {
        timings.offset = this.previousMomentDuration;
      }
      timings.delay = options.delay ? options.delay * this.timeScale + timings.offset : timings.offset;
      timings.stagger = options.stagger ? options.stagger * this.timeScale : 0;
      timings.totalDuration = timings.duration + (targets.length - 1) * timings.stagger;
      timings.easing = Eases.get(options.ease);
      this.previousMomentDuration = timings.totalDuration + timings.delay;
      this.totalDuration = Math.max(this.previousMomentDuration, this.totalDuration);
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
  __publicField(Tempo, "scene", Scene);

  // src/js/main.js
  var canvas = document.getElementById("canvas");
  var pixelRatio = devicePixelRatio;
  canvas.width = canvas.clientWidth * pixelRatio;
  canvas.height = canvas.clientHeight * pixelRatio;
  var webgl = document.getElementById("webgl");
  var glContext = webgl.getContext("webgl", {
    powerPreference: "high-performance"
  });
  var ctx = canvas.getContext("2d");
  var items = [];
  var colors = ["#FFE7E5", "#FFBDAF", "#E65F5C", "#E8FFEE", "#36EFB1", "#32D789", "#E8F4FF", "#6EE4FF", "#41C0EC", "#72FFF9", "#67E6E0", "#387D7A"];
  for (var i = 0; i < 3; i++) {
    items.push({
      fill: colors[Math.floor(Math.random() * colors.length)],
      x: canvas.width / 3,
      y: canvas.height / 4 * (i + 1),
      scale: 32
    });
  }
  var draw = () => {
    items.forEach((item) => {
      ctx.fillStyle = item.fill;
      ctx.beginPath();
      ctx.arc(item.x, item.y, item.scale, 0, Math.PI * 2);
      ctx.fill();
    });
  };
  var update = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw();
    requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
  var scene;
  setTimeout(() => {
    scene = new Tempo.scene();
    scene.to(items[0], { x: canvas.width / 3 * 2, scale: 0 }, { duration: 2, ease: "easeOutExpo", onComplete: () => {
      console.log("1st complete");
    } });
    scene.from(items[1], { x: canvas.width / 3 * 2, scale: 0 }, { duration: 4, ease: "easeOutExpo", onComplete: () => {
      console.log("2nd complete");
    } }, 0.25);
    scene.to(items[2], { x: canvas.width / 3 * 2, scale: 0 }, { duration: 2, ease: "easeOutExpo" });
    scene.play();
  }, 500);
  window.addEventListener("click", (_) => {
    if (scene.paused) {
      if (scene.rewinding) {
        scene.play();
      } else {
        scene.rewind();
      }
    } else {
      scene.pause();
    }
  });
})();
