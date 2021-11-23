(() => {
  // src/js/modules/Eases.js
  var Eases = class {
    static get(key) {
      switch (key) {
        case "linear":
          return this._easeLinear;
        case "easeInSine":
          return this._easeInSine;
        case "easeOutSine":
          return this._easeOutSine;
        case "easeInOutSine":
          return this._easeInOutSine;
        case "easeInQuad":
          return this._easeInQuad;
        case "easeOutQuad":
          return this._easeOutQuad;
        case "easeInOutQuad":
          return this._easeInOutQuad;
        case "easeInCubic":
          return this._easeInCubic;
        case "easeOutCubic":
          return this._easeOutCubic;
        case "easeInOutCubic":
          return this._easeInOutCubic;
        case "easeInQuart":
          return this._easeInQuartic;
        case "easeOutQuart":
          return this._easeOutQuartic;
        case "easeInOutQuart":
          return this._easeInOutQuartic;
        case "easeInQuint":
          return this._easeInQuintic;
        case "easeOutQuint":
          return this._easeOutQuintic;
        case "easeInOutQuint":
          return this._easeInOutQuintic;
        case "easeInExpo":
          return this._easeInExpo;
        case "easeOutExpo":
          return this._easeOutExpo;
        case "easeInOutExpo":
          return this._easeInOutExpo;
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
    static _easeInSine(p) {
      return -Math.cos(p * (Math.PI / 2)) + 1;
    }
    static _easeOutSine(p) {
      return Math.sin(p * (Math.PI / 2));
    }
    static _easeInOutSine(p) {
      return -0.5 * (Math.cos(Math.PI * p) - 1);
    }
    static _easeInQuad(p) {
      return p ** 2;
    }
    static _easeOutQuad(p) {
      return 1 - (1 - p) ** 2;
    }
    static _easeInOutQuad(p) {
      return p < 0.5 ? (p * 2) ** 2 / 2 : 1 - ((1 - p) * 2) ** 2 / 2;
    }
    static _easeInCubic(p) {
      return p ** 3;
    }
    static _easeOutCubic(p) {
      return 1 - (1 - p) ** 3;
    }
    static _easeInOutCubic(p) {
      return p < 0.5 ? (p * 2) ** 3 / 2 : 1 - ((1 - p) * 2) ** 3 / 2;
    }
    static _easeInQuartic(p) {
      return p ** 4;
    }
    static _easeOutQuartic(p) {
      return 1 - (1 - p) ** 4;
    }
    static _easeInOutQuartic(p) {
      return p < 0.5 ? (p * 2) ** 4 / 2 : 1 - ((1 - p) * 2) ** 4 / 2;
    }
    static _easeInQuintic(p) {
      return p ** 5;
    }
    static _easeOutQuintic(p) {
      return 1 - (1 - p) ** 5;
    }
    static _easeInOutQuintic(p) {
      return p < 0.5 ? (p * 2) ** 5 / 2 : 1 - ((1 - p) * 2) ** 5 / 2;
    }
    static _easeInExpo(p) {
      return Math.pow(2, 10 * (p - 1)) - 1e-3;
    }
    static _easeOutExpo(p) {
      return 1 - Math.pow(2, -10 * p);
    }
    static _easeInOutExpo(p) {
      return (p *= 2) < 1 ? 0.5 * Math.pow(2, 10 * (p - 1)) : 0.5 * (2 - Math.pow(2, -10 * (p - 1)));
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

  // src/js/modules/Utilities.js
  var Utilities = class {
    static multiply2DMatricies(a, b) {
      const a00 = a[0 * 3 + 0];
      const a01 = a[0 * 3 + 1];
      const a02 = a[0 * 3 + 2];
      const a10 = a[1 * 3 + 0];
      const a11 = a[1 * 3 + 1];
      const a12 = a[1 * 3 + 2];
      const a20 = a[2 * 3 + 0];
      const a21 = a[2 * 3 + 1];
      const a22 = a[2 * 3 + 2];
      const b00 = b[0 * 3 + 0];
      const b01 = b[0 * 3 + 1];
      const b02 = b[0 * 3 + 2];
      const b10 = b[1 * 3 + 0];
      const b11 = b[1 * 3 + 1];
      const b12 = b[1 * 3 + 2];
      const b20 = b[2 * 3 + 0];
      const b21 = b[2 * 3 + 1];
      const b22 = b[2 * 3 + 2];
      return [
        b00 * a00 + b01 * a10 + b02 * a20,
        b00 * a01 + b01 * a11 + b02 * a21,
        b00 * a02 + b01 * a12 + b02 * a22,
        b10 * a00 + b11 * a10 + b12 * a20,
        b10 * a01 + b11 * a11 + b12 * a21,
        b10 * a02 + b11 * a12 + b12 * a22,
        b20 * a00 + b21 * a10 + b22 * a20,
        b20 * a01 + b21 * a11 + b22 * a21,
        b20 * a02 + b21 * a12 + b22 * a22
      ];
    }
    static translate2D(tx, ty) {
      return [
        1,
        0,
        tx,
        0,
        1,
        ty,
        0,
        0,
        1
      ];
    }
    static scale2D(sx, sy) {
      return [
        sx,
        0,
        0,
        0,
        sy,
        0,
        0,
        0,
        1
      ];
    }
    static rotate2D(a) {
      return [
        Math.cos(a),
        -Math.sin(a),
        0,
        Math.sin(a),
        Math.cos(a),
        0,
        0,
        0,
        1
      ];
    }
  };

  // src/js/modules/Action.js
  var Action = class {
    constructor(target, property, targetValue, currentValue, units, direction) {
      this.target = target;
      this.property = property;
      this.targetValue = targetValue;
      this.currentValue = currentValue;
      this.units = units;
      this.direction = direction;
      this.propertyDelta = {};
      this.setProperties();
    }
    setProperties() {
      switch (this.direction) {
        case "to":
          this.propertyDelta = {
            start: this.currentValue,
            delta: this.targetValue - this.currentValue
          };
          break;
        case "from":
          this.propertyDelta = {
            start: this.targetValue,
            delta: this.currentValue - this.targetValue
          };
          break;
        case "fromTo":
          this.propertyDelta = {
            start: this.currentValue,
            delta: this.targetValue - this.currentValue
          };
          break;
        case "addClass":
          this.classFunction = () => {
            this.target.classList.add(this.targetValue);
          };
          break;
        case "removeClass":
          this.classFunction = () => {
            this.target.classList.remove(this.targetValue);
          };
          break;
        default:
          break;
      }
    }
    update(progress) {
      if (this.property !== "class") {
        this.target[this.property] = this.propertyDelta.start + progress * this.propertyDelta.delta + this.units;
      } else {
        if (progress === 0) {
          if (this.direction === "addClass") {
            this.target.classList.remove(this.targetValue);
          } else {
            this.target.classList.add(this.targetValue);
          }
        }
        if (progress === 1) {
          this.classFunction();
        }
      }
    }
  };

  // src/js/modules/Actor.js
  var Actor = class {
    constructor(target, properties, direction, isDOM) {
      this.target = target;
      this.properties = properties;
      this.direction = direction;
      this.isDOM = isDOM;
      this.unitExpression = /[a-z]+|%/;
      this.hasTransform = false;
      this.transformPropertyKeys = ["translateX", "translateY", "rotate", "scale", "scaleX", "scaleY"];
      this.transformMatrix = {};
      if (this.isDOM) {
        this.bounds = this.target.getBoundingClientRect();
      }
      this.setProperties();
    }
    _getTransformMatrix(matrix) {
      if (matrix === "none" || matrix === void 0) {
        return {
          translateX: 0,
          translateY: 0,
          scaleX: 1,
          scaleY: 1,
          rotate: 0
        };
      }
      this.transformType = matrix.includes("3d") ? "3d" : "2d";
      const values = matrix.match(/matrix.*\((.+)\)/)[1].split(", ");
      if (this.transformType === "2d") {
        return {
          translateX: values[4],
          translateY: values[5],
          scaleX: values[0],
          scaleY: values[3],
          rotate: Math.atan2(values[1], values[0]) * (180 / Math.PI)
        };
      }
    }
    _getTransformPercentage(property, value) {
      if (property === "translateX") {
        return value *= this.bounds.width / 100;
      } else {
        return value *= this.bounds.height / 100;
      }
    }
    setProperties() {
      this.actions = [];
      if (this.isDOM) {
        const style = getComputedStyle(this.target);
        this.transformMatrix = this._getTransformMatrix(style["transform"]);
        for (const property in this.properties) {
          if (this.transformPropertyKeys.includes(property)) {
            this.hasTransform = true;
            if (property === "scale") {
              if (this.direction === "fromTo") {
                this.actions.push(new Action(this.transformMatrix, "scaleX", this.properties["scale"][1], this.properties["scale"][0], null, this.direction));
                this.actions.push(new Action(this.transformMatrix, "scaleY", this.properties["scale"][1], this.properties["scale"][0], null, this.direction));
              } else {
                this.actions.push(new Action(this.transformMatrix, "scaleX", this.properties["scale"], parseFloat(this.transformMatrix["scaleX"]), null, this.direction));
                this.actions.push(new Action(this.transformMatrix, "scaleY", this.properties["scale"], parseFloat(this.transformMatrix["scaleY"]), null, this.direction));
              }
            } else if ((property === "translateX" || property === "translateY") && this.isDOM) {
              if (this.direction === "fromTo") {
                const targetValue = this._getTransformPercentage(property, this.properties[property][1]);
                const startValue = this._getTransformPercentage(property, this.properties[property][0]);
                this.actions.push(new Action(this.transformMatrix, property, targetValue, startValue, null, this.direction));
              } else {
                let value = this._getTransformPercentage(property, this.properties[property]);
                this.actions.push(new Action(this.transformMatrix, property, value, parseFloat(this.transformMatrix[property]), null, this.direction));
              }
            } else {
              if (this.direction === "fromTo") {
                this.actions.push(new Action(this.transformMatrix, property, this.properties[property][1], this.properties[property][0], null, this.direction));
              } else {
                this.actions.push(new Action(this.transformMatrix, property, this.properties[property], parseFloat(this.transformMatrix[property]), null, this.direction));
              }
            }
          } else {
            if (property !== "class") {
              if (this.direction === "fromTo") {
                this.actions.push(new Action(this.target.style, property, this.properties[property][1], this.properties[property][0], null, this.direction));
              } else {
                const units = this.unitExpression.exec(style[property]);
                const value = parseFloat(style[property].split(units)[0]);
                this.actions.push(new Action(this.target.style, property, this.properties[property], value, units, this.direction));
              }
            } else {
              this.actions.push(new Action(this.target, property, this.properties[property], null, null, this.direction));
            }
          }
        }
      } else {
        for (const property in this.properties) {
          if (this.direction === "fromTo") {
            this.actions.push(new Action(this.target, property, this.properties[property][1], this.properties[property][0], null, this.direction));
          } else {
            this.actions.push(new Action(this.target, property, this.properties[property], this.target[property], null, this.direction));
          }
        }
      }
      for (const action of this.actions) {
        action.setProperties();
      }
    }
    update(progress) {
      for (const action of this.actions) {
        action.update(progress);
      }
      if (this.hasTransform) {
        const compositeMatrix = Utilities.multiply2DMatricies(Utilities.multiply2DMatricies(Utilities.scale2D(this.transformMatrix.scaleX, this.transformMatrix.scaleY), Utilities.rotate2D(this.transformMatrix.rotate * (Math.PI / 180))), Utilities.translate2D(this.transformMatrix.translateX, this.transformMatrix.translateY));
        this.target.style.transform = `matrix(${compositeMatrix[0]}, ${compositeMatrix[3]}, ${compositeMatrix[1]}, ${compositeMatrix[4]}, ${compositeMatrix[2]}, ${compositeMatrix[5]})`;
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
      this.started = false;
      this.paused = false;
      this.rewinding = false;
      this.currentAnimationFrame = null;
      this.previousActionDuration = 0;
      this.actions = [];
    }
    play() {
      this.rewinding = false;
      if (!this.started) {
        if (this.onStartCallback) {
          this.onStartCallback();
        }
        this.started = true;
      }
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
      if (!this.started && this.progress > 0) {
        if (this.onStartCallback) {
          this.onStartCallback();
        }
        this.started = true;
      }
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
            if (action.options.toggle && staggerProgress !== 1) {
              moment.update(0);
            }
          });
        }
        if (action.progress > 0) {
          if (!action.started) {
            action.options.onStart?.();
            if (action.timings.start !== 0 && action.direction !== "from") {
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
          if (action.options.toggle) {
            action.moments.forEach((moment) => {
              moment.update(0);
            });
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
      let isDOM = false;
      let input = target;
      if (target instanceof window.HTMLElement || target instanceof window.NodeList || target instanceof window.SVGPathElement) {
        isDOM = true;
        if (target instanceof window.NodeList) {
          input = [...target];
        }
      }
      const targets = this._setTargets(input);
      const timings = this._setTimings(targets, options, offset);
      const moments = [];
      targets.forEach((target2) => {
        moments.push(new Actor(target2, properties, "to", isDOM));
      });
      this._add(moments, timings, options, "to");
    }
    from(target, properties, options, offset = null) {
      let isDOM = false;
      let input = target;
      if (target instanceof window.HTMLElement || target instanceof window.NodeList || target instanceof window.SVGPathElement) {
        isDOM = true;
        if (target instanceof window.NodeList) {
          input = [...target];
        }
      }
      const targets = this._setTargets(input);
      const timings = this._setTimings(targets, options, offset);
      const moments = [];
      targets.forEach((target2) => {
        moments.push(new Actor(target2, properties, "from", isDOM));
      });
      this._add(moments, timings, options, "from");
    }
    fromTo(target, properties, options, offset = null) {
      let isDOM = false;
      let input = target;
      if (target instanceof window.HTMLElement || target instanceof window.NodeList || target instanceof window.SVGPathElement) {
        isDOM = true;
        if (target instanceof window.NodeList) {
          input = [...target];
        }
      }
      const targets = this._setTargets(input);
      const timings = this._setTimings(targets, options, offset);
      const moments = [];
      targets.forEach((target2) => {
        moments.push(new Actor(target2, properties, "fromTo", isDOM));
      });
      this._add(moments, timings, options, "fromTo");
    }
    addClass(target, properties, options, offset = null) {
      let isDOM = false;
      let input = target;
      if (target instanceof window.HTMLElement || target instanceof window.NodeList) {
        isDOM = true;
        if (target instanceof window.NodeList) {
          input = [...target];
        }
      }
      const targets = this._setTargets(input);
      const timings = this._setTimings(targets, options, offset);
      const moments = [];
      targets.forEach((target2) => {
        moments.push(new Actor(target2, properties, "addClass", isDOM));
      });
      this._add(moments, timings, options, "addClass");
    }
    removeClass(target, properties, options, offset = null) {
      let isDOM = false;
      let input = target;
      if (target instanceof window.HTMLElement || target instanceof window.NodeList) {
        isDOM = true;
        if (target instanceof window.NodeList) {
          input = [...target];
        }
      }
      const targets = this._setTargets(input);
      const timings = this._setTimings(targets, options, offset);
      const moments = [];
      targets.forEach((target2) => {
        moments.push(new Actor(target2, properties, "removeClass", isDOM));
      });
      this._add(moments, timings, options, "removeClass");
    }
    onStart(callback) {
      this.onStartCallback = callback;
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
      const timeScaledDuration = options.duration ? options.duration * this.timeScale : 1;
      let actionOffset = 0;
      if (offset !== null) {
        actionOffset = offset * this.timeScale;
      } else {
        actionOffset = this.duration;
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

  // src/js/modules/Camera.js
  var Camera = class {
    constructor(element2, scene2, options = {}) {
      this.element = element2;
      this.scene = scene2;
      this.options = options;
      this.init();
    }
    init() {
      this.observer = null;
      this.progress = 0;
      this.scrollDistance = 0;
      this.scrollPosition = 0;
      this.element.parentElement.style.height = "auto";
      this.viewportHeight = window.innerHeight;
      this.isIntersecting = false;
      if (this.options.pinned) {
        this.offset = this.element.parentElement.offsetTop;
        this.offset += this.options.beginOnIntersection ? -this.element.parentElement.offsetHeight : 0;
        this.scrollHeight = this.scene.duration;
        this._scrollListener = this._pinnedScrollListener.bind(this);
        this._setScrollHeight();
        this.scrollHeight += this.options.offset ? this.options.offset : 0;
      } else {
        this.offset = this.element.offsetTop;
        this.scrollHeight = this.element.getBoundingClientRect().height + this.offset;
        this._scrollListener = this._defaultScrollListener.bind(this);
      }
      this._createObserver();
    }
    resize() {
      this.viewportHeight = window.innerHeight;
      this._setScrollHeight();
    }
    setScene(scene2) {
      this.scene = scene2;
      this.init();
    }
    _setScrollHeight() {
      const totalHeight = this.scrollHeight + (this.options.beginOnIntersection ? 0 : this.viewportHeight);
      this.element.parentElement.style.height = `${totalHeight / this.viewportHeight * 100}vh`;
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
            this.isIntersecting = true;
            window.addEventListener("scroll", this._scrollListener);
          } else {
            this.isIntersecting = false;
            window.removeEventListener("scroll", this._scrollListener);
            this.progress = Math.round(this.progress);
          }
        });
      }, { threshold: this.options.threshold ? this.options.threshold : 0 });
      this.observer.observe(this.element);
    }
  };

  // src/js/modules/Director.js
  var Director = class {
    static to(target, properties, options) {
      let isDOM = false;
      let input = target;
      if (target instanceof window.HTMLElement || target instanceof window.NodeList) {
        isDOM = true;
        if (target instanceof window.NodeList) {
          input = [...target];
        }
      }
      const targets = this._setTargets(input);
      const timings = this._setTimings(targets, options);
      const actors = [];
      targets.forEach((target2) => {
        actors.push(new Actor(target2, properties, "to", isDOM));
      });
      this._animate(actors, timings, options);
    }
    static from(target, properties, options) {
      let isDOM = false;
      let input = target;
      if (target instanceof window.HTMLElement || target instanceof window.NodeList) {
        isDOM = true;
        if (target instanceof window.NodeList) {
          input = [...target];
        }
      }
      const targets = this._setTargets(input);
      const timings = this._setTimings(targets, options);
      const actors = [];
      targets.forEach((target2) => {
        actors.push(new Actor(target2, properties, "from", isDOM));
      });
      this._animate(actors, timings, options);
    }
    static fromTo(target, properties, options) {
      let isDOM = false;
      let input = target;
      if (target instanceof window.HTMLElement || target instanceof window.NodeList) {
        isDOM = true;
        if (target instanceof window.NodeList) {
          input = [...target];
        }
      }
      const targets = this._setTargets(input);
      const timings = this._setTimings(targets, options);
      const actors = [];
      targets.forEach((target2) => {
        actors.push(new Actor(target2, properties, "fromTo", isDOM));
      });
      this._animate(actors, timings, options);
    }
    static addClass(target, properties, options) {
      let isDOM = false;
      let input = target;
      if (target instanceof window.HTMLElement || target instanceof window.NodeList) {
        isDOM = true;
        if (target instanceof window.NodeList) {
          input = [...target];
        }
      }
      const targets = this._setTargets(input);
      const timings = this._setTimings(targets, options);
      const actors = [];
      targets.forEach((target2) => {
        actors.push(new Actor(target2, properties, "addClass", isDOM));
      });
      this._animate(actors, timings, options);
    }
    static removeClass(target, properties, options) {
      let isDOM = false;
      let input = target;
      if (target instanceof window.HTMLElement || target instanceof window.NodeList) {
        isDOM = true;
        if (target instanceof window.NodeList) {
          input = [...target];
        }
      }
      const targets = this._setTargets(input);
      const timings = this._setTimings(targets, options);
      const actors = [];
      targets.forEach((target2) => {
        actors.push(new Actor(target2, properties, "removeClass", isDOM));
      });
      this._animate(actors, timings, options);
    }
    static _animate(actors, timings, options) {
      function update2(currentTime) {
        const elapsedTime = currentTime - startTime - timings.delay;
        const progress = Math.min(elapsedTime / timings.totalDuration, 1);
        actors.forEach((actor, index) => {
          const staggeredProgress = Math.min((elapsedTime - timings.stagger * index) / timings.duration, 1);
          if (staggeredProgress > 0) {
            const latest = timings.easing(staggeredProgress);
            actor.update(latest);
          }
        });
        if (progress < 1) {
          options.onUpdate?.();
          requestAnimationFrame(update2);
        } else {
          options.onComplete?.();
          actors.forEach((actor) => {
            actor.update(1);
          });
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
      timings.duration = options.duration ? options.duration * timeScale : 1;
      timings.delay = options.delay ? options.delay * timeScale : 0;
      timings.stagger = options.stagger ? options.stagger * timeScale : 0;
      timings.totalDuration = timings.duration + (targets.length - 1) * timings.stagger;
      timings.easing = Eases.get(options.ease);
      return timings;
    }
  };
  Director.Scene = Scene;
  Director.Camera = Camera;

  // src/js/main.js
  var webgl = document.getElementById("webgl");
  var glContext = webgl.getContext("webgl", {
    powerPreference: "high-performance"
  });
  var canvas = document.querySelector(".canvas");
  canvas.width = canvas.getBoundingClientRect().width * 2;
  canvas.height = canvas.getBoundingClientRect().height * 2;
  var ctx = canvas.getContext("2d");
  var copyItemElements = document.querySelectorAll(".copy-item");
  var hiddenElement = document.querySelector(".hidden-element p");
  var canvasObject = {
    circleOneRadius: canvas.height,
    circleTwoRadius: 0,
    circleThreeRadius: 0,
    lineWidth: 25,
    squareSize: 0,
    squareSizeTwo: 0
  };
  ctx.strokeStyle = "#32D789";
  ctx.lineWidth = 4;
  var update = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#36EFB1";
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, canvasObject.circleOneRadius, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "#6EE4FF";
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, canvasObject.circleTwoRadius, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "#FFFFFF";
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, canvasObject.circleThreeRadius, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = "#03330A";
    ctx.fillRect(canvas.width / 2 - canvasObject.lineWidth / 2, 400, canvasObject.lineWidth, canvas.height - 800);
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.fillStyle = "#031F33";
    ctx.fillRect(canvas.width / 2 - canvasObject.circleThreeRadius / 3 - canvasObject.squareSizeTwo, canvas.height / 2 - canvasObject.circleThreeRadius / 3 - canvasObject.squareSizeTwo, canvasObject.squareSizeTwo, canvasObject.squareSizeTwo);
    ctx.fillRect(canvas.width / 2 + canvasObject.circleThreeRadius / 3, canvas.height / 2 - canvasObject.circleThreeRadius / 3 - canvasObject.squareSizeTwo, canvasObject.squareSizeTwo, canvasObject.squareSizeTwo);
    ctx.fillRect(canvas.width / 2 - canvasObject.circleThreeRadius / 3 - canvasObject.squareSizeTwo, canvas.height / 2 + canvasObject.circleThreeRadius / 3, canvasObject.squareSizeTwo, canvasObject.squareSizeTwo);
    ctx.fillRect(canvas.width / 2 + canvasObject.circleThreeRadius / 3, canvas.height / 2 + canvasObject.circleThreeRadius / 3, canvasObject.squareSizeTwo, canvasObject.squareSizeTwo);
    ctx.strokeRect(canvas.width / 2 - canvasObject.circleThreeRadius / 3 - canvasObject.squareSize / 2, canvas.height / 2 - canvasObject.circleThreeRadius / 3 - canvasObject.squareSize / 2, canvasObject.squareSize, canvasObject.squareSize);
    ctx.strokeRect(canvas.width / 2 + canvasObject.circleThreeRadius / 3 - canvasObject.squareSize / 2, canvas.height / 2 - canvasObject.circleThreeRadius / 3 - canvasObject.squareSize / 2, canvasObject.squareSize, canvasObject.squareSize);
    ctx.strokeRect(canvas.width / 2 - canvasObject.circleThreeRadius / 3 - canvasObject.squareSize / 2, canvas.height / 2 + canvasObject.circleThreeRadius / 3 - canvasObject.squareSize / 2, canvasObject.squareSize, canvasObject.squareSize);
    ctx.strokeRect(canvas.width / 2 + canvasObject.circleThreeRadius / 3 - canvasObject.squareSize / 2, canvas.height / 2 + canvasObject.circleThreeRadius / 3 - canvasObject.squareSize / 2, canvasObject.squareSize, canvasObject.squareSize);
    ctx.closePath();
    scene.setProgress(camera.progress);
    requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
  var scene = new Director.Scene();
  scene.to(canvasObject, { circleOneRadius: 0, circleTwoRadius: canvas.height / 2 - 1 }, { duration: 1.845, ease: "linear" });
  scene.to(canvasObject, { circleThreeRadius: canvas.height / 4 }, { duration: 1.5, ease: "easeOutExpo" }, 0);
  scene.to(canvasObject, { lineWidth: 100 }, { duration: 1, ease: "linear" }, 0);
  scene.to(canvasObject, { squareSize: 100 }, { duration: 1, ease: "easeOutExpo" }, 1);
  scene.to(canvasObject, { squareSizeTwo: 150 }, { duration: 0.75, ease: "easeOutExpo" }, 1.25);
  scene.addClass(copyItemElements[0], { class: "show" }, { toggle: true }, 0);
  scene.fromTo(copyItemElements[1], { opacity: [0, 1], translateX: [-100, 100] }, { duration: 1 }, 0.4);
  scene.addClass(copyItemElements[2], { class: "show" }, { toggle: true }, 0.8);
  scene.addClass(hiddenElement, { class: "show" }, { toggle: true }, 2);
  var element = document.querySelector(".sticky-element");
  var camera = new Director.Camera(element, scene, { pinned: true, offset: 155 });
  var h1 = document.querySelector("h1");
})();
