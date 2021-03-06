(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __reExport = (target, module, desc) => {
    if (module && typeof module === "object" || typeof module === "function") {
      for (let key of __getOwnPropNames(module))
        if (!__hasOwnProp.call(target, key) && key !== "default")
          __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
    }
    return target;
  };
  var __toModule = (module) => {
    return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", module && module.__esModule && "default" in module ? { get: () => module.default, enumerable: true } : { value: module, enumerable: true })), module);
  };

  // dist/js/director.min.js
  var require_director_min = __commonJS({
    "dist/js/director.min.js"(exports) {
      var y = Object.defineProperty;
      var D = (f) => y(f, "__esModule", { value: true });
      var b = (f, t) => {
        D(f);
        for (var s in t)
          y(f, s, { get: t[s], enumerable: true });
      };
      b(exports, { default: () => w });
      var p = class {
        static get(t) {
          switch (t) {
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
        static _easeLinear(t) {
          return t;
        }
        static _easeInSine(t) {
          return -Math.cos(t * (Math.PI / 2)) + 1;
        }
        static _easeOutSine(t) {
          return Math.sin(t * (Math.PI / 2));
        }
        static _easeInOutSine(t) {
          return -0.5 * (Math.cos(Math.PI * t) - 1);
        }
        static _easeInQuad(t) {
          return t ** 2;
        }
        static _easeOutQuad(t) {
          return 1 - (1 - t) ** 2;
        }
        static _easeInOutQuad(t) {
          return t < 0.5 ? (t * 2) ** 2 / 2 : 1 - ((1 - t) * 2) ** 2 / 2;
        }
        static _easeInCubic(t) {
          return t ** 3;
        }
        static _easeOutCubic(t) {
          return 1 - (1 - t) ** 3;
        }
        static _easeInOutCubic(t) {
          return t < 0.5 ? (t * 2) ** 3 / 2 : 1 - ((1 - t) * 2) ** 3 / 2;
        }
        static _easeInQuartic(t) {
          return t ** 4;
        }
        static _easeOutQuartic(t) {
          return 1 - (1 - t) ** 4;
        }
        static _easeInOutQuartic(t) {
          return t < 0.5 ? (t * 2) ** 4 / 2 : 1 - ((1 - t) * 2) ** 4 / 2;
        }
        static _easeInQuintic(t) {
          return t ** 5;
        }
        static _easeOutQuintic(t) {
          return 1 - (1 - t) ** 5;
        }
        static _easeInOutQuintic(t) {
          return t < 0.5 ? (t * 2) ** 5 / 2 : 1 - ((1 - t) * 2) ** 5 / 2;
        }
        static _easeInExpo(t) {
          return Math.pow(2, 10 * (t - 1)) - 1e-3;
        }
        static _easeOutExpo(t) {
          return 1 - Math.pow(2, -10 * t);
        }
        static _easeInOutExpo(t) {
          return (t *= 2) < 1 ? 0.5 * Math.pow(2, 10 * (t - 1)) : 0.5 * (2 - Math.pow(2, -10 * (t - 1)));
        }
        static _easeOutSpring(t) {
          let s = 1, e = 0.3, i = e / (Math.PI * 2) * (Math.asin(1 / s) || 0);
          return s * Math.pow(2, -10 * t) * Math.sin((t - i) * (Math.PI * 2) / e) + 1;
        }
        static _easeOutBack(t) {
          let s = 1.70158;
          return (t = t - 1) * t * ((s + 1) * t + s) + 1;
        }
      };
      var m = class {
        static multiply2DMatricies(t, s) {
          let e = t[0 * 3 + 0], i = t[0 * 3 + 1], n = t[0 * 3 + 2], r = t[1 * 3 + 0], a = t[1 * 3 + 1], h = t[1 * 3 + 2], o = t[2 * 3 + 0], c = t[2 * 3 + 1], d = t[2 * 3 + 2], g = s[0 * 3 + 0], T = s[0 * 3 + 1], O = s[0 * 3 + 2], E = s[1 * 3 + 0], I = s[1 * 3 + 1], S = s[1 * 3 + 2], x = s[2 * 3 + 0], L = s[2 * 3 + 1], C = s[2 * 3 + 2];
          return [g * e + T * r + O * o, g * i + T * a + O * c, g * n + T * h + O * d, E * e + I * r + S * o, E * i + I * a + S * c, E * n + I * h + S * d, x * e + L * r + C * o, x * i + L * a + C * c, x * n + L * h + C * d];
        }
        static translate2D(t, s) {
          return [1, 0, t, 0, 1, s, 0, 0, 1];
        }
        static scale2D(t, s) {
          return [t, 0, 0, 0, s, 0, 0, 0, 1];
        }
        static rotate2D(t) {
          return [Math.cos(t), -Math.sin(t), 0, Math.sin(t), Math.cos(t), 0, 0, 0, 1];
        }
      };
      var l = class {
        constructor(t, s, e, i, n, r) {
          this.target = t, this.property = s, this.targetValue = e, this.currentValue = i, this.units = n, this.direction = r, this.propertyDelta = {}, this.setProperties();
        }
        setProperties() {
          switch (this.direction) {
            case "to":
              this.propertyDelta = { start: this.currentValue, delta: this.targetValue - this.currentValue };
              break;
            case "from":
              this.propertyDelta = { start: this.targetValue, delta: this.currentValue - this.targetValue };
              break;
            case "fromTo":
              this.propertyDelta = { start: this.currentValue, delta: this.targetValue - this.currentValue };
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
        update(t) {
          this.property !== "class" ? this.target[this.property] = this.propertyDelta.start + t * this.propertyDelta.delta + this.units : (t === 0 && (this.direction === "addClass" ? this.target.classList.remove(this.targetValue) : this.target.classList.add(this.targetValue)), t === 1 && this.classFunction());
        }
      };
      var u = class {
        constructor(t, s, e, i) {
          this.target = t, this.properties = s, this.direction = e, this.isDOM = i, this.unitExpression = /[a-z]+|%/, this.hasTransform = false, this.transformPropertyKeys = ["translateX", "translateY", "rotate", "scale", "scaleX", "scaleY"], this.transformMatrix = {}, this.isDOM && (this.bounds = this.target.getBoundingClientRect()), this.setProperties();
        }
        _getTransformMatrix(t) {
          if (t === "none" || t === void 0)
            return { translateX: 0, translateY: 0, scaleX: 1, scaleY: 1, rotate: 0 };
          this.transformType = t.includes("3d") ? "3d" : "2d";
          let s = t.match(/matrix.*\((.+)\)/)[1].split(", ");
          if (this.transformType === "2d")
            return { translateX: s[4], translateY: s[5], scaleX: s[0], scaleY: s[3], rotate: Math.atan2(s[1], s[0]) * (180 / Math.PI) };
        }
        _getTransformPercentage(t, s) {
          return t === "translateX" ? s *= this.bounds.width / 100 : s *= this.bounds.height / 100;
        }
        setProperties() {
          if (this.actions = [], this.isDOM) {
            let t = getComputedStyle(this.target);
            this.transformMatrix = this._getTransformMatrix(t.transform);
            for (let s in this.properties)
              if (this.transformPropertyKeys.includes(s))
                if (this.hasTransform = true, s === "scale")
                  this.direction === "fromTo" ? (this.actions.push(new l(this.transformMatrix, "scaleX", this.properties.scale[1], this.properties.scale[0], null, this.direction)), this.actions.push(new l(this.transformMatrix, "scaleY", this.properties.scale[1], this.properties.scale[0], null, this.direction))) : (this.actions.push(new l(this.transformMatrix, "scaleX", this.properties.scale, parseFloat(this.transformMatrix.scaleX), null, this.direction)), this.actions.push(new l(this.transformMatrix, "scaleY", this.properties.scale, parseFloat(this.transformMatrix.scaleY), null, this.direction)));
                else if ((s === "translateX" || s === "translateY") && this.isDOM)
                  if (this.direction === "fromTo") {
                    let e = this._getTransformPercentage(s, this.properties[s][1]), i = this._getTransformPercentage(s, this.properties[s][0]);
                    this.actions.push(new l(this.transformMatrix, s, e, i, null, this.direction));
                  } else {
                    let e = this._getTransformPercentage(s, this.properties[s]);
                    this.actions.push(new l(this.transformMatrix, s, e, parseFloat(this.transformMatrix[s]), null, this.direction));
                  }
                else
                  this.direction === "fromTo" ? this.actions.push(new l(this.transformMatrix, s, this.properties[s][1], this.properties[s][0], null, this.direction)) : this.actions.push(new l(this.transformMatrix, s, this.properties[s], parseFloat(this.transformMatrix[s]), null, this.direction));
              else if (s !== "class")
                if (this.direction === "fromTo")
                  this.actions.push(new l(this.target.style, s, this.properties[s][1], this.properties[s][0], null, this.direction));
                else {
                  let e = this.unitExpression.exec(t[s]), i = parseFloat(t[s].split(e)[0]);
                  this.actions.push(new l(this.target.style, s, this.properties[s], i, e, this.direction));
                }
              else
                this.actions.push(new l(this.target, s, this.properties[s], null, null, this.direction));
          } else
            for (let t in this.properties)
              this.direction === "fromTo" ? this.actions.push(new l(this.target, t, this.properties[t][1], this.properties[t][0], null, this.direction)) : this.actions.push(new l(this.target, t, this.properties[t], this.target[t], null, this.direction));
          for (let t of this.actions)
            t.setProperties();
        }
        update(t) {
          for (let s of this.actions)
            s.update(t);
          if (this.hasTransform) {
            let s = m.multiply2DMatricies(m.multiply2DMatricies(m.scale2D(this.transformMatrix.scaleX, this.transformMatrix.scaleY), m.rotate2D(this.transformMatrix.rotate * (Math.PI / 180))), m.translate2D(this.transformMatrix.translateX, this.transformMatrix.translateY));
            this.target.style.transform = `matrix(${s[0]}, ${s[3]}, ${s[1]}, ${s[4]}, ${s[2]}, ${s[5]})`;
          }
        }
      };
      var _ = class {
        constructor() {
          this.timeScale = 1e3, this.duration = 0, this.startTime = 0, this.currentTime = 0, this.progress = 0, this.started = false, this.paused = false, this.rewinding = false, this.currentAnimationFrame = null, this.previousActionDuration = 0, this.actions = [];
        }
        play() {
          this.rewinding = false, this.started || (this.onStartCallback && this.onStartCallback(), this.started = true), this.paused ? this.startTime = performance.now() - this.duration * this.progress : this.startTime = performance.now(), this.paused = false;
          let t = (s) => {
            let e = s - this.startTime;
            this.progress = Math.min(e / this.duration, 1), this._animate(), this.progress < 1 && (this.currentAnimationFrame = requestAnimationFrame(t));
          };
          this.currentAnimationFrame = requestAnimationFrame(t);
        }
        pause() {
          this.paused = true, cancelAnimationFrame(this.currentAnimationFrame);
        }
        rewind() {
          this.rewinding = true, this.paused ? this.startTime = performance.now() - this.duration * (1 - this.progress) : this.startTime = performance.now(), this.paused = false;
          let t = (s) => {
            let e = this.duration - (s - this.startTime);
            this.progress = Math.min(e / this.duration, 1), this._animate(), this.progress > 0 && (this.currentAnimationFrame = requestAnimationFrame(t));
          };
          this.currentAnimationFrame = requestAnimationFrame(t);
        }
        setProgress(t) {
          this.progress = t, !this.started && this.progress > 0 && (this.onStartCallback && this.onStartCallback(), this.started = true);
          let s = (e) => {
            let i = this.duration * this.progress;
            this._animate();
          };
          this.currentAnimationFrame = requestAnimationFrame(s);
        }
        setProgressImmediately(t) {
          this.progress = t, !this.started && this.progress > 0 && (this.onStartCallback && this.onStartCallback(), this.started = true), this._animate();
        }
        _animate() {
          this.currentTime = this.duration * this.progress, this.actions.forEach((t, s) => {
            t.progress = (this.currentTime - t.timings.start) / t.timings.totalDuration, t.started && !t.completed && (t.options.onUpdate && t.options.onUpdate(), t.moments.forEach((e, i) => {
              let n = Math.max(this.currentTime - t.timings.start - t.timings.stagger * i, 0), r = Math.min(n / t.timings.duration, 1), a = t.timings.easing(r);
              e.update(a), t.options.toggle && r !== 1 && e.update(0);
            })), t.progress > 0 ? (t.started || (t.options.onStart && t.options.onStart(), t.timings.start !== 0 && t.direction !== "from" && t.moments.forEach((e) => {
              e.setProperties();
            })), t.started = true) : (t.started && (t.direction === "from" || t.direction === "fromTo") ? t.direction === "from" ? t.timings.start !== 0 ? t.moments.forEach((e) => {
              e.update(1);
            }) : t.moments.forEach((e) => {
              e.update(0);
            }) : t.moments.forEach((e) => {
              e.update(0);
            }) : !t.started && !t.initialized && (t.direction === "from" || t.direction === "fromTo") && (t.moments.forEach((e) => {
              e.update(0);
            }), t.initialized = true), t.options.toggle && t.moments.forEach((e) => {
              e.update(0);
            }), t.started = false), t.progress >= 1 ? (t.completed || (t.moments.forEach((e) => {
              e.update(1);
            }), t.options.onComplete && t.options.onComplete()), t.completed = true) : t.completed = false;
          });
        }
        to(t, s, e, i = null) {
          let n = false, r = t;
          (t instanceof window.HTMLElement || t instanceof window.NodeList || t instanceof window.SVGPathElement || t instanceof window.SVGElement || t instanceof window.SVGCircleElement) && (n = true, t instanceof window.NodeList && (r = [...t]));
          let a = this._setTargets(r), h = this._setTimings(a, e, i), o = [];
          a.forEach((c) => {
            o.push(new u(c, s, "to", n));
          }), this._add(o, h, e, "to");
        }
        from(t, s, e, i = null) {
          let n = false, r = t;
          (t instanceof window.HTMLElement || t instanceof window.NodeList || t instanceof window.SVGPathElement || t instanceof window.SVGElement || t instanceof window.SVGCircleElement) && (n = true, t instanceof window.NodeList && (r = [...t]));
          let a = this._setTargets(r), h = this._setTimings(a, e, i), o = [];
          a.forEach((c) => {
            o.push(new u(c, s, "from", n));
          }), this._add(o, h, e, "from");
        }
        fromTo(t, s, e, i = null) {
          let n = false, r = t;
          (t instanceof window.HTMLElement || t instanceof window.NodeList || t instanceof window.SVGPathElement || t instanceof window.SVGElement || t instanceof window.SVGCircleElement) && (n = true, t instanceof window.NodeList && (r = [...t]));
          let a = this._setTargets(r), h = this._setTimings(a, e, i), o = [];
          a.forEach((c) => {
            o.push(new u(c, s, "fromTo", n));
          }), this._add(o, h, e, "fromTo");
        }
        addClass(t, s, e, i = null) {
          let n = false, r = t;
          (t instanceof window.HTMLElement || t instanceof window.NodeList) && (n = true, t instanceof window.NodeList && (r = [...t]));
          let a = this._setTargets(r), h = this._setTimings(a, e, i), o = [];
          a.forEach((c) => {
            o.push(new u(c, s, "addClass", n));
          }), this._add(o, h, e, "addClass");
        }
        removeClass(t, s, e, i = null) {
          let n = false, r = t;
          (t instanceof window.HTMLElement || t instanceof window.NodeList) && (n = true, t instanceof window.NodeList && (r = [...t]));
          let a = this._setTargets(r), h = this._setTimings(a, e, i), o = [];
          a.forEach((c) => {
            o.push(new u(c, s, "removeClass", n));
          }), this._add(o, h, e, "removeClass");
        }
        onStart(t) {
          this.onStartCallback = t;
        }
        _add(t, s, e, i) {
          this.actions.push({ moments: t, timings: s, options: e, direction: i, progress: 0, initialized: false, started: false, completed: false }), this.setProgress(0);
        }
        _setTargets(t) {
          let s = null;
          return Array.isArray(t) ? s = t : s = [t], s;
        }
        _setTimings(t, s, e) {
          let i = {}, n = s.duration ? s.duration * this.timeScale : 1, r = 0;
          e !== null ? r = e * this.timeScale : r = this.duration, i.stagger = s.stagger ? s.stagger * this.timeScale : 0;
          let a = s.delay ? s.delay * this.timeScale + r : r, h = n + (t.length - 1) * i.stagger;
          return i.start = a, i.end = a + h, i.duration = n, i.totalDuration = h, i.easing = p.get(s.ease), this.previousActionDuration = i.end, this.duration = Math.max(this.previousActionDuration, this.duration), i;
        }
      };
      var M = class {
        constructor(t, s, e = {}) {
          this.element = t, this.scene = s, this.options = e, this._init();
        }
        _init() {
          this.observer = null, this.progress = 0, this.scrollDistance = 0, this.scrollPosition = 0, this.element.parentElement.style.height = "auto", this.viewportHeight = window.innerHeight, this.isIntersecting = false, this.options.pinned ? (this.offset = this.element.parentElement.offsetTop, this.offset += this.options.beginOnIntersection ? -this.element.parentElement.offsetHeight : 0, this.scrollHeight = this.scene.duration, this._setScrollHeight(), this.scrollHeight += this.options.offset ? this.options.offset : 0) : (this.offset = window.pageYOffset + this.element.getBoundingClientRect().top - this.viewportHeight, this.scrollHeight = this.viewportHeight + this.element.offsetHeight), this._scrollListener = this._scrollListener.bind(this), this._createObserver();
        }
        resize() {
          this.viewportHeight = window.innerHeight, this.options.pinned ? (this.offset = this.element.parentElement.offsetTop, this.offset += this.options.beginOnIntersection ? -this.element.parentElement.offsetHeight : 0, this.scrollHeight = this.scene.duration, this._setScrollHeight(), this.scrollHeight += this.options.offset ? this.options.offset : 0) : (this.offset = window.pageYOffset + this.element.getBoundingClientRect().top - this.viewportHeight, this.scrollHeight = this.viewportHeight + this.element.offsetHeight);
        }
        setScene(t) {
          this.scene = t, this._init();
        }
        _setScrollHeight() {
          let t = this.scrollHeight + (this.options.beginOnIntersection ? 0 : this.viewportHeight);
          this.element.parentElement.style.height = `${t / this.viewportHeight * 100}vh`;
        }
        _scrollListener(t) {
          this.scrollDistance = t.target.scrollingElement.scrollTop, this.scrollPosition = this.scrollDistance - this.offset, this.progress = Math.min(Math.max(this.scrollPosition / this.scrollHeight, 0), 1);
        }
        _createObserver() {
          this.observer = new IntersectionObserver((t) => {
            t.forEach((s) => {
              s.isIntersecting ? (this.isIntersecting = true, window.addEventListener("scroll", this._scrollListener)) : (this.isIntersecting = false, window.removeEventListener("scroll", this._scrollListener), this.progress = Math.round(this.progress));
            });
          }, { threshold: this.options.threshold ? this.options.threshold : 0 }), this.observer.observe(this.element);
        }
      };
      var w = class {
        static to(t, s, e) {
          let i = false, n = t;
          (t instanceof window.HTMLElement || t instanceof window.NodeList) && (i = true, t instanceof window.NodeList && (n = [...t]));
          let r = this._setTargets(n), a = this._setTimings(r, e), h = [];
          r.forEach((o) => {
            h.push(new u(o, s, "to", i));
          }), this._animate(h, a, e);
        }
        static from(t, s, e) {
          let i = false, n = t;
          (t instanceof window.HTMLElement || t instanceof window.NodeList) && (i = true, t instanceof window.NodeList && (n = [...t]));
          let r = this._setTargets(n), a = this._setTimings(r, e), h = [];
          r.forEach((o) => {
            h.push(new u(o, s, "from", i));
          }), this._animate(h, a, e);
        }
        static fromTo(t, s, e) {
          let i = false, n = t;
          (t instanceof window.HTMLElement || t instanceof window.NodeList) && (i = true, t instanceof window.NodeList && (n = [...t]));
          let r = this._setTargets(n), a = this._setTimings(r, e), h = [];
          r.forEach((o) => {
            h.push(new u(o, s, "fromTo", i));
          }), this._animate(h, a, e);
        }
        static addClass(t, s, e) {
          let i = false, n = t, r = e || {};
          (t instanceof window.HTMLElement || t instanceof window.NodeList) && (i = true, t instanceof window.NodeList && (n = [...t]));
          let a = this._setTargets(n), h = this._setTimings(a, r), o = [];
          a.forEach((c) => {
            o.push(new u(c, s, "addClass", i));
          }), this._animate(o, h, r);
        }
        static removeClass(t, s, e) {
          let i = false, n = t, r = e || {};
          (t instanceof window.HTMLElement || t instanceof window.NodeList) && (i = true, t instanceof window.NodeList && (n = [...t]));
          let a = this._setTargets(n), h = this._setTimings(a, r), o = [];
          a.forEach((c) => {
            o.push(new u(c, s, "removeClass", i));
          }), this._animate(o, h, r);
        }
        static _animate(t, s, e) {
          function i(r) {
            let a = r - n - s.delay, h = Math.min(a / s.totalDuration, 1);
            t.forEach((o, c) => {
              let d = Math.min((a - s.stagger * c) / s.duration, 1);
              if (d > 0) {
                let g = s.easing(d);
                o.update(g);
              }
            }), h < 1 ? (e.onUpdate && e.onUpdate(), requestAnimationFrame(i)) : (t.forEach((o) => {
              o.update(1);
            }), e.onComplete && e.onComplete());
          }
          e.onStart && e.onStart();
          let n = performance.now();
          requestAnimationFrame(i);
        }
        static _setTargets(t) {
          let s = null;
          return Array.isArray(t) ? s = t : s = [t], s;
        }
        static _setTimings(t, s) {
          let e = 1e3, i = {};
          return i.duration = s.duration ? s.duration * e : 1, i.delay = s.delay ? s.delay * e : 0, i.stagger = s.stagger ? s.stagger * e : 0, i.totalDuration = i.duration + (t.length - 1) * i.stagger, i.easing = p.get(s.ease), i;
        }
      };
      w.Scene = _;
      w.Camera = M;
    }
  });

  // src/js/demo/main.js
  var import_director_min = __toModule(require_director_min());
  var DOMTranslateX = 0;
  var DOMToElement = document.querySelector(".dom-to--card");
  var calculateTranslateXOffset = () => {
    const cardBounds = DOMToElement.getBoundingClientRect();
    const containerBounds = DOMToElement.parentNode.getBoundingClientRect();
    const cardWidth = cardBounds.width;
    const containerWidth = containerBounds.width - 32;
    const cardToContainerRatio = cardWidth / containerWidth;
    const translateDistance = (1 - cardToContainerRatio) / cardToContainerRatio;
    return translateDistance * 100;
  };
  DOMTranslateX = calculateTranslateXOffset();
  var DOMToButton = document.getElementById("dom-to--button");
  var DOMToReset = document.getElementById("dom-to--reset");
  DOMToButton.addEventListener("click", () => {
    DOMToButton.setAttribute("disabled", true);
    DOMToReset.setAttribute("disabled", true);
    import_director_min.default.to(DOMToElement, { translateX: DOMTranslateX }, { duration: 1, ease: "easeInOutQuint", onComplete: () => {
      DOMToReset.removeAttribute("disabled");
    } });
  });
  DOMToReset.addEventListener("click", () => {
    DOMToElement.style.transform = ``;
    DOMToButton.removeAttribute("disabled");
  });
  var DOMFromButton = document.getElementById("dom-from--button");
  var DOMFromReset = document.getElementById("dom-from--reset");
  var DOMFromElement = document.querySelector(".dom-from--card");
  DOMFromButton.addEventListener("click", () => {
    DOMFromButton.setAttribute("disabled", true);
    DOMFromReset.setAttribute("disabled", true);
    import_director_min.default.from(DOMFromElement, { translateX: DOMTranslateX }, { duration: 1, ease: "easeInOutQuint", onComplete: () => {
      DOMFromReset.removeAttribute("disabled");
    } });
  });
  DOMFromReset.addEventListener("click", () => {
    DOMFromElement.style.transform = ``;
    DOMFromButton.removeAttribute("disabled");
  });
  var DOMFromToButton = document.getElementById("dom-fromto--button");
  var DOMFromToReset = document.getElementById("dom-fromto--reset");
  var DOMFromToElement = document.querySelector(".dom-fromto--card");
  DOMFromToButton.addEventListener("click", () => {
    DOMFromToButton.setAttribute("disabled", true);
    DOMFromToReset.setAttribute("disabled", true);
    import_director_min.default.fromTo(DOMFromToElement, { translateX: [DOMTranslateX, DOMTranslateX / 2] }, { duration: 1, ease: "easeInOutQuint", onComplete: () => {
      DOMFromToReset.removeAttribute("disabled");
    } });
  });
  DOMFromToReset.addEventListener("click", () => {
    DOMFromToElement.style.transform = ``;
    DOMFromToButton.removeAttribute("disabled");
  });
  var DOMClassAdd = document.getElementById("dom-class--add");
  var DOMClassRemove = document.getElementById("dom-class--remove");
  var DOMClassElement = document.querySelector(".dom-class--card");
  DOMClassAdd.addEventListener("click", () => {
    import_director_min.default.addClass(DOMClassElement, { class: "dark" });
  });
  DOMClassRemove.addEventListener("click", () => {
    import_director_min.default.removeClass(DOMClassElement, { class: "dark" });
  });
  var DOMSceneButton = document.getElementById("dom-scene--button");
  var DOMSceneReset = document.getElementById("dom-scene--reset");
  var DOMSceneBackground = document.querySelector(".stagger-scene .stagger-background--two");
  var DOMSceneCards = document.querySelectorAll(".stagger-scene .stagger-item");
  var DOMScene = new import_director_min.default.Scene();
  DOMScene.fromTo(DOMSceneCards, { scale: [1, 0], opacity: [1, 0] }, { duration: 1, ease: "easeOutQuint", stagger: 0.1 }, 0);
  DOMScene.fromTo(DOMSceneBackground, { scale: [0, 1], opacity: [0, 1] }, { duration: 1, ease: "easeOutQuint", onComplete: () => {
    DOMSceneReset.removeAttribute("disabled");
  } }, 0.25);
  DOMSceneButton.addEventListener("click", () => {
    DOMSceneButton.setAttribute("disabled", true);
    DOMSceneReset.setAttribute("disabled", true);
    DOMScene.play();
  });
  DOMSceneReset.addEventListener("click", () => {
    DOMScene.setProgress(0);
    DOMSceneButton.removeAttribute("disabled");
  });
  var DOMCameraWrapper = document.querySelector(".stagger-camera");
  var DOMCameraBackground = document.querySelector(".stagger-camera .stagger-background--two");
  var DOMCameraCards = document.querySelectorAll(".stagger-camera .stagger-item");
  var DOMCameraScene = new import_director_min.default.Scene();
  DOMCameraScene.fromTo(DOMCameraCards, { scale: [1, 0], opacity: [1, 0] }, { duration: 1, ease: "easeOutQuint", stagger: 0.1 }, 0);
  DOMCameraScene.fromTo(DOMCameraBackground, { scale: [0, 1], opacity: [0, 1] }, { duration: 1, ease: "easeOutQuint" }, 0.25);
  var DOMCamera = new import_director_min.default.Camera(DOMCameraWrapper, DOMCameraScene);
  var update = () => {
    DOMCameraScene.setProgress(DOMCamera.progress);
    draw();
    window.requestAnimationFrame(update);
  };
  window.requestAnimationFrame(update);
  var animationObject = {
    circleOne: 0,
    circleTwo: 1024,
    opacity: 0.25
  };
  var canvas = document.querySelector("canvas");
  var context = canvas.getContext("2d");
  canvas.width = 1024;
  canvas.height = 1024;
  var draw = () => {
    context.clearRect(0, 0, 1024, 1024);
    context.fillStyle = `rgba(104, 189, 231, ${animationObject.opacity})`;
    context.beginPath();
    context.arc(animationObject.circleOne, 512, 256, 0, Math.PI * 2, true);
    context.closePath();
    context.fill();
    context.beginPath();
    context.arc(animationObject.circleTwo, 512, 256, 0, Math.PI * 2, true);
    context.closePath();
    context.fill();
  };
  var JSScene = new import_director_min.default.Scene();
  JSScene.fromTo(animationObject, { circleOne: [0, 384], circleTwo: [1024, 640], opacity: [0, 0.5] }, { duration: 1, ease: "easeInOutQuint" }, 0);
  JSScene.setProgress(0.5);
  var input = document.querySelector("input");
  input.addEventListener("input", (event) => {
    JSScene.setProgress(event.target.value);
  });
  window.addEventListener("resize", () => {
    DOMTranslateX = calculateTranslateXOffset();
    DOMCamera.resize();
  });
})();
