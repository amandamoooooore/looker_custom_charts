//bundled
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };

  // node_modules/highcharts/highcharts.js
  var require_highcharts = __commonJS({
    "node_modules/highcharts/highcharts.js"(exports, module) {
      !/**
      * Highcharts JS v12.5.0 (2026-01-12)
      * @module highcharts/highcharts
      *
      * (c) 2009-2026 Highsoft AS
      *
      * A commercial license may be required depending on use.
      * See www.highcharts.com/license
      */
      (function(t, e) {
        "object" == typeof exports && "object" == typeof module ? (t._Highcharts = e(), module.exports = t._Highcharts) : "function" == typeof define && define.amd ? define("highcharts/highcharts", [], e) : "object" == typeof exports ? (t._Highcharts = e(), exports.highcharts = t._Highcharts) : (t.Highcharts && t.Highcharts.error(16, true), t.Highcharts = e());
      })("u" < typeof window ? exports : window, () => (() => {
        "use strict";
        var _a, _b, _c, _d, _e, _f, _g, _h;
        let t, e, i, s, o, r;
        var a, n, h, l, d, c, p, g, u, f, m, x, y, b, v, k, w, M, S, T, C, A, P, L, O, E, I, D, B = {};
        B.d = (t10, e10) => {
          for (var i10 in e10) B.o(e10, i10) && !B.o(t10, i10) && Object.defineProperty(t10, i10, { enumerable: true, get: e10[i10] });
        }, B.o = (t10, e10) => Object.prototype.hasOwnProperty.call(t10, e10);
        var N = {};
        B.d(N, { default: () => l_ }), (a = m || (m = {})).SVG_NS = "http://www.w3.org/2000/svg", a.product = "Highcharts", a.version = "12.5.0", a.win = "u" > typeof window ? window : {}, a.doc = a.win.document, a.svg = !!((_c = (_b = (_a = a.doc) == null ? void 0 : _a.createElementNS) == null ? void 0 : _b.call(_a, a.SVG_NS, "svg")) == null ? void 0 : _c.createSVGRect), a.pageLang = (_f = (_e = (_d = a.doc) == null ? void 0 : _d.documentElement) == null ? void 0 : _e.closest("[lang]")) == null ? void 0 : _f.lang, a.userAgent = ((_g = a.win.navigator) == null ? void 0 : _g.userAgent) || "", a.isChrome = a.win.chrome, a.isFirefox = -1 !== a.userAgent.indexOf("Firefox"), a.isMS = /(edge|msie|trident)/i.test(a.userAgent) && !a.win.opera, a.isSafari = !a.isChrome && -1 !== a.userAgent.indexOf("Safari"), a.isTouchDevice = /(Mobile|Android|Windows Phone)/.test(a.userAgent), a.isWebKit = -1 !== a.userAgent.indexOf("AppleWebKit"), a.deg2rad = 2 * Math.PI / 360, a.marginNames = ["plotTop", "marginRight", "marginBottom", "plotLeft"], a.noop = function() {
        }, a.supportsPassiveEvents = (function() {
          let t10 = false;
          if (!a.isMS) {
            let e10 = Object.defineProperty({}, "passive", { get: function() {
              t10 = true;
            } });
            a.win.addEventListener && a.win.removeEventListener && (a.win.addEventListener("testPassive", a.noop, e10), a.win.removeEventListener("testPassive", a.noop, e10));
          }
          return t10;
        })(), a.charts = [], a.composed = [], a.dateFormats = {}, a.seriesTypes = {}, a.symbolSizes = {}, a.chartCount = 0;
        let z = m, { charts: R, doc: W, win: H } = z;
        function X(t10, e10, i10, s10) {
          let o10 = e10 ? "Highcharts error" : "Highcharts warning";
          32 === t10 && (t10 = `${o10}: Deprecated member`);
          let r10 = V(t10), a10 = r10 ? `${o10} #${t10}: www.highcharts.com/errors/${t10}/` : t10.toString();
          if (void 0 !== s10) {
            let t11 = "";
            r10 && (a10 += "?"), ts(s10, function(e11, i11) {
              t11 += `
 - ${i11}: ${e11}`, r10 && (a10 += encodeURI(i11) + "=" + encodeURI(e11));
            }), a10 += t11;
          }
          tr(z, "displayError", { chart: i10, code: t10, message: a10, params: s10 }, function() {
            if (e10) throw Error(a10);
            H.console && -1 === X.messages.indexOf(a10) && console.warn(a10);
          }), X.messages.push(a10);
        }
        function F(t10, e10) {
          return parseInt(t10, e10 || 10);
        }
        function G(t10) {
          return "string" == typeof t10;
        }
        function Y(t10) {
          let e10 = Object.prototype.toString.call(t10);
          return "[object Array]" === e10 || "[object Array Iterator]" === e10;
        }
        function j(t10, e10) {
          return !!t10 && "object" == typeof t10 && (!e10 || !Y(t10));
        }
        function U(t10) {
          return j(t10) && "number" == typeof t10.nodeType;
        }
        function $(t10) {
          let e10 = t10 == null ? void 0 : t10.constructor;
          return !!(j(t10, true) && !U(t10) && (e10 == null ? void 0 : e10.name) && "Object" !== e10.name);
        }
        function V(t10) {
          return "number" == typeof t10 && !isNaN(t10) && t10 < 1 / 0 && t10 > -1 / 0;
        }
        function Z(t10) {
          return null != t10;
        }
        function _(t10, e10, i10) {
          let s10, o10 = G(e10) && !Z(i10), r10 = (e11, i11) => {
            Z(e11) ? t10.setAttribute(i11, e11) : o10 ? (s10 = t10.getAttribute(i11)) || "class" !== i11 || (s10 = t10.getAttribute(i11 + "Name")) : t10.removeAttribute(i11);
          };
          return G(e10) ? r10(i10, e10) : ts(e10, r10), s10;
        }
        function q(t10) {
          return Y(t10) ? t10 : [t10];
        }
        function K(t10, e10) {
          let i10;
          for (i10 in t10 || (t10 = {}), e10) t10[i10] = e10[i10];
          return t10;
        }
        function J() {
          let t10 = arguments, e10 = t10.length;
          for (let i10 = 0; i10 < e10; i10++) {
            let e11 = t10[i10];
            if (null != e11) return e11;
          }
        }
        function Q(t10, e10) {
          K(t10.style, e10);
        }
        function tt(t10) {
          return Math.pow(10, Math.floor(Math.log(t10) / Math.LN10));
        }
        function te(t10, e10) {
          return t10 > 1e14 ? t10 : parseFloat(t10.toPrecision(e10 || 14));
        }
        (X || (X = {})).messages = [], Math.easeInOutSine = function(t10) {
          return -0.5 * (Math.cos(Math.PI * t10) - 1);
        };
        let ti = Array.prototype.find ? function(t10, e10) {
          return t10.find(e10);
        } : function(t10, e10) {
          let i10, s10 = t10.length;
          for (i10 = 0; i10 < s10; i10++) if (e10(t10[i10], i10)) return t10[i10];
        };
        function ts(t10, e10, i10) {
          for (let s10 in t10) Object.hasOwnProperty.call(t10, s10) && e10.call(i10 || t10[s10], t10[s10], s10, t10);
        }
        function to(t10, e10, i10) {
          function s10(e11, i11) {
            let s11 = t10.removeEventListener;
            s11 && s11.call(t10, e11, i11, false);
          }
          function o10(i11) {
            let o11, r11;
            t10.nodeName && (e10 ? (o11 = {})[e10] = true : o11 = i11, ts(o11, function(t11, e11) {
              if (i11[e11]) for (r11 = i11[e11].length; r11--; ) s10(e11, i11[e11][r11].fn);
            }));
          }
          let r10 = "function" == typeof t10 && t10.prototype || t10;
          if (Object.hasOwnProperty.call(r10, "hcEvents")) {
            let t11 = r10.hcEvents;
            if (e10) {
              let r11 = t11[e10] || [];
              i10 ? (t11[e10] = r11.filter(function(t12) {
                return i10 !== t12.fn;
              }), s10(e10, i10)) : (o10(t11), t11[e10] = []);
            } else o10(t11), delete r10.hcEvents;
          }
        }
        function tr(t10, e10, i10, s10) {
          if (i10 = i10 || {}, (W == null ? void 0 : W.createEvent) && (t10.dispatchEvent || t10.fireEvent && t10 !== z)) {
            let s11 = W.createEvent("Events");
            s11.initEvent(e10, true, true), i10 = K(s11, i10), t10.dispatchEvent ? t10.dispatchEvent(i10) : t10.fireEvent(e10, i10);
          } else if (t10.hcEvents) {
            i10.target || K(i10, { preventDefault: function() {
              i10.defaultPrevented = true;
            }, target: t10, type: e10 });
            let s11 = [], o10 = t10, r10 = false;
            for (; o10.hcEvents; ) Object.hasOwnProperty.call(o10, "hcEvents") && o10.hcEvents[e10] && (s11.length && (r10 = true), s11.unshift.apply(s11, o10.hcEvents[e10])), o10 = Object.getPrototypeOf(o10);
            r10 && s11.sort((t11, e11) => t11.order - e11.order), s11.forEach((e11) => {
              false === e11.fn.call(t10, i10) && i10.preventDefault();
            });
          }
          s10 && !i10.defaultPrevented && s10.call(t10, i10);
        }
        let ta = (i = Math.random().toString(36).substring(2, 9) + "-", s = 0, function() {
          return "highcharts-" + (t ? "" : i) + s++;
        });
        H.jQuery && (H.jQuery.fn.highcharts = function() {
          let t10 = [].slice.call(arguments);
          if (this[0]) return t10[0] ? (new z[G(t10[0]) ? t10.shift() : "Chart"](this[0], t10[0], t10[1]), this) : R[_(this[0], "data-highcharts-chart")];
        });
        let tn = { addEvent: function(t10, e10, i10, s10 = {}) {
          let o10 = "function" == typeof t10 && t10.prototype || t10;
          Object.hasOwnProperty.call(o10, "hcEvents") || (o10.hcEvents = {});
          let r10 = o10.hcEvents;
          z.Point && t10 instanceof z.Point && t10.series && t10.series.chart && (t10.series.chart.runTrackerClick = true);
          let a10 = t10.addEventListener;
          a10 && a10.call(t10, e10, i10, !!z.supportsPassiveEvents && { passive: void 0 === s10.passive ? -1 !== e10.indexOf("touch") : s10.passive, capture: false }), r10[e10] || (r10[e10] = []);
          let n10 = { fn: i10, order: "number" == typeof s10.order ? s10.order : 1 / 0 };
          return r10[e10].push(n10), r10[e10].sort((t11, e11) => t11.order - e11.order), function() {
            to(t10, e10, i10);
          };
        }, arrayMax: function(t10) {
          let e10 = t10.length, i10 = t10[0];
          for (; e10--; ) t10[e10] > i10 && (i10 = t10[e10]);
          return i10;
        }, arrayMin: function(t10) {
          let e10 = t10.length, i10 = t10[0];
          for (; e10--; ) t10[e10] < i10 && (i10 = t10[e10]);
          return i10;
        }, attr: _, clamp: function(t10, e10, i10) {
          return t10 > e10 ? t10 < i10 ? t10 : i10 : e10;
        }, clearTimeout: function(t10) {
          Z(t10) && clearTimeout(t10);
        }, correctFloat: te, createElement: function(t10, e10, i10, s10, o10) {
          let r10 = W.createElement(t10);
          return e10 && K(r10, e10), o10 && Q(r10, { padding: "0", border: "none", margin: "0" }), i10 && Q(r10, i10), s10 && s10.appendChild(r10), r10;
        }, crisp: function(t10, e10 = 0, i10) {
          let s10 = e10 % 2 / 2, o10 = i10 ? -1 : 1;
          return (Math.round(t10 * o10 - s10) + s10) * o10;
        }, css: Q, defined: Z, destroyObjectProperties: function(t10, e10, i10) {
          ts(t10, function(s10, o10) {
            s10 !== e10 && (s10 == null ? void 0 : s10.destroy) && s10.destroy(), ((s10 == null ? void 0 : s10.destroy) || !i10) && delete t10[o10];
          });
        }, diffObjects: function(t10, e10, i10, s10) {
          let o10 = {};
          return !(function t11(e11, o11, r10, a10) {
            let n10 = i10 ? o11 : e11;
            ts(e11, function(i11, h10) {
              if (!a10 && s10 && s10.indexOf(h10) > -1 && o11[h10]) {
                i11 = q(i11), r10[h10] = [];
                for (let e12 = 0; e12 < Math.max(i11.length, o11[h10].length); e12++) o11[h10][e12] && (void 0 === i11[e12] ? r10[h10][e12] = o11[h10][e12] : (r10[h10][e12] = {}, t11(i11[e12], o11[h10][e12], r10[h10][e12], a10 + 1)));
              } else j(i11, true) && !i11.nodeType ? (r10[h10] = Y(i11) ? [] : {}, t11(i11, o11[h10] || {}, r10[h10], a10 + 1), 0 === Object.keys(r10[h10]).length && ("colorAxis" !== h10 || 0 !== a10) && delete r10[h10]) : (e11[h10] !== o11[h10] || h10 in e11 && !(h10 in o11)) && "__proto__" !== h10 && "constructor" !== h10 && (r10[h10] = n10[h10]);
            });
          })(t10, e10, o10, 0), o10;
        }, discardElement: function(t10) {
          var _a2;
          (_a2 = t10 == null ? void 0 : t10.parentElement) == null ? void 0 : _a2.removeChild(t10);
        }, erase: function(t10, e10) {
          let i10 = t10.length;
          for (; i10--; ) if (t10[i10] === e10) {
            t10.splice(i10, 1);
            break;
          }
        }, error: X, extend: K, extendClass: function(t10, e10) {
          let i10 = function() {
          };
          return i10.prototype = new t10(), K(i10.prototype, e10), i10;
        }, find: ti, fireEvent: tr, getAlignFactor: (t10 = "") => ({ center: 0.5, right: 1, middle: 0.5, bottom: 1 })[t10] || 0, getClosestDistance: function(t10, e10) {
          let i10, s10, o10, r10, a10 = !e10;
          return t10.forEach((t11) => {
            if (t11.length > 1) for (r10 = s10 = t11.length - 1; r10 > 0; r10--) (o10 = t11[r10] - t11[r10 - 1]) < 0 && !a10 ? (e10 == null ? void 0 : e10(), e10 = void 0) : o10 && (void 0 === i10 || o10 < i10) && (i10 = o10);
          }), i10;
        }, getMagnitude: tt, getNestedProperty: function(t10, e10) {
          let i10 = t10.split(".");
          for (; i10.length && Z(e10); ) {
            let t11 = i10.shift();
            if (void 0 === t11 || "__proto__" === t11) return;
            if ("this" === t11) {
              let t12;
              return j(e10) && (t12 = e10["@this"]), t12 != null ? t12 : e10;
            }
            let s10 = e10[t11.replace(/[\\'"]/g, "")];
            if (!Z(s10) || "function" == typeof s10 || "number" == typeof s10.nodeType || s10 === H) return;
            e10 = s10;
          }
          return e10;
        }, getStyle: function t10(e10, i10, s10) {
          var _a2;
          let o10;
          if ("width" === i10) {
            let i11 = Math.min(e10.offsetWidth, e10.scrollWidth), s11 = (_a2 = e10.getBoundingClientRect) == null ? void 0 : _a2.call(e10).width;
            return s11 < i11 && s11 >= i11 - 1 && (i11 = Math.floor(s11)), Math.max(0, i11 - (t10(e10, "padding-left", true) || 0) - (t10(e10, "padding-right", true) || 0));
          }
          if ("height" === i10) return Math.max(0, Math.min(e10.offsetHeight, e10.scrollHeight) - (t10(e10, "padding-top", true) || 0) - (t10(e10, "padding-bottom", true) || 0));
          let r10 = H.getComputedStyle(e10, void 0);
          return r10 && (o10 = r10.getPropertyValue(i10), J(s10, "opacity" !== i10) && (o10 = F(o10))), o10;
        }, insertItem: function(t10, e10) {
          let i10, s10 = t10.options.index, o10 = e10.length;
          for (i10 = t10.options.isInternal ? o10 : 0; i10 < o10 + 1; i10++) if (!e10[i10] || V(s10) && s10 < J(e10[i10].options.index, e10[i10]._i) || e10[i10].options.isInternal) {
            e10.splice(i10, 0, t10);
            break;
          }
          return i10;
        }, isArray: Y, isClass: $, isDOMElement: U, isFunction: function(t10) {
          return "function" == typeof t10;
        }, isNumber: V, isObject: j, isString: G, merge: function(t10, ...e10) {
          let i10, s10 = [t10, ...e10], o10 = {}, r10 = function(t11, e11) {
            return "object" != typeof t11 && (t11 = {}), ts(e11, function(i11, s11) {
              "__proto__" !== s11 && "constructor" !== s11 && (!j(i11, true) || $(i11) || U(i11) ? t11[s11] = e11[s11] : t11[s11] = r10(t11[s11] || {}, i11));
            }), t11;
          };
          true === t10 && (o10 = s10[1], s10 = Array.prototype.slice.call(s10, 2));
          let a10 = s10.length;
          for (i10 = 0; i10 < a10; i10++) o10 = r10(o10, s10[i10]);
          return o10;
        }, normalizeTickInterval: function(t10, e10, i10, s10, o10) {
          let r10, a10 = t10;
          i10 = J(i10, tt(t10));
          let n10 = t10 / i10;
          for (!e10 && (e10 = o10 ? [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10] : [1, 2, 2.5, 5, 10], false === s10 && (1 === i10 ? e10 = e10.filter(function(t11) {
            return t11 % 1 == 0;
          }) : i10 <= 0.1 && (e10 = [1 / i10]))), r10 = 0; r10 < e10.length && (a10 = e10[r10], (!o10 || !(a10 * i10 >= t10)) && (o10 || !(n10 <= (e10[r10] + (e10[r10 + 1] || e10[r10])) / 2))); r10++) ;
          return te(a10 * i10, -Math.round(Math.log(1e-3) / Math.LN10));
        }, objectEach: ts, offset: function(t10) {
          let e10 = W.documentElement, i10 = t10.parentElement || t10.parentNode ? t10.getBoundingClientRect() : { top: 0, left: 0, width: 0, height: 0 };
          return { top: i10.top + (H.pageYOffset || e10.scrollTop) - (e10.clientTop || 0), left: i10.left + (H.pageXOffset || e10.scrollLeft) - (e10.clientLeft || 0), width: i10.width, height: i10.height };
        }, pad: function(t10, e10, i10) {
          return Array((e10 || 2) + 1 - String(t10).replace("-", "").length).join(i10 || "0") + t10;
        }, pick: J, pInt: F, pushUnique: function(t10, e10) {
          return 0 > t10.indexOf(e10) && !!t10.push(e10);
        }, relativeLength: function(t10, e10, i10) {
          return /%$/.test(t10) ? e10 * parseFloat(t10) / 100 + (i10 || 0) : parseFloat(t10);
        }, removeEvent: to, replaceNested: function(t10, ...e10) {
          let i10, s10;
          do
            for (s10 of (i10 = t10, e10)) t10 = t10.replace(s10[0], s10[1]);
          while (t10 !== i10);
          return t10;
        }, splat: q, stableSort: function(t10, e10) {
          let i10, s10, o10 = t10.length;
          for (s10 = 0; s10 < o10; s10++) t10[s10].safeI = s10;
          for (t10.sort(function(t11, s11) {
            return 0 === (i10 = e10(t11, s11)) ? t11.safeI - s11.safeI : i10;
          }), s10 = 0; s10 < o10; s10++) delete t10[s10].safeI;
        }, syncTimeout: function(t10, e10, i10) {
          return e10 > 0 ? setTimeout(t10, e10, i10) : (t10.call(0, i10), -1);
        }, timeUnits: { millisecond: 1, second: 1e3, minute: 6e4, hour: 36e5, day: 864e5, week: 6048e5, month: 24192e5, year: 314496e5 }, ucfirst: function(t10) {
          return G(t10) ? t10.substring(0, 1).toUpperCase() + t10.substring(1) : String(t10);
        }, uniqueKey: ta, useSerialIds: function(e10) {
          return t = J(e10, t);
        }, wrap: function(t10, e10, i10) {
          let s10 = t10[e10];
          t10[e10] = function() {
            let t11 = arguments, e11 = this;
            return i10.apply(this, [function() {
              return s10.apply(e11, arguments.length ? arguments : t11);
            }].concat([].slice.call(arguments)));
          };
        } }, { pageLang: th, win: tl } = z, { defined: td, error: tc, extend: tp, isNumber: tg, isObject: tu, isString: tf, merge: tm, objectEach: tx, pad: ty, splat: tb, timeUnits: tv, ucfirst: tk } = tn, tw = z.isSafari && tl.Intl && !tl.Intl.DateTimeFormat.prototype.formatRange, tM = class {
          constructor(t10, e10) {
            this.options = { timezone: "UTC" }, this.variableTimezone = false, this.Date = tl.Date, this.update(t10), this.lang = e10;
          }
          update(t10 = {}) {
            this.dTLCache = {}, this.options = t10 = tm(true, this.options, t10);
            let { timezoneOffset: e10, useUTC: i10, locale: s10 } = t10;
            this.Date = t10.Date || tl.Date || Date;
            let o10 = t10.timezone;
            td(i10) && (o10 = i10 ? "UTC" : void 0), e10 && e10 % 60 == 0 && (o10 = "Etc/GMT" + (e10 > 0 ? "+" : "") + e10 / 60), this.variableTimezone = "UTC" !== o10 && (o10 == null ? void 0 : o10.indexOf("Etc/GMT")) !== 0, this.timezone = o10, this.lang && s10 && (this.lang.locale = s10), ["months", "shortMonths", "weekdays", "shortWeekdays"].forEach((t11) => {
              let e11 = /months/i.test(t11), i11 = /short/.test(t11), s11 = { timeZone: "UTC" };
              s11[e11 ? "month" : "weekday"] = i11 ? "short" : "long", this[t11] = (e11 ? [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] : [3, 4, 5, 6, 7, 8, 9]).map((t12) => this.dateFormat(s11, (e11 ? 31 : 1) * 24 * 36e5 * t12));
            });
          }
          toParts(t10) {
            let [e10, i10, s10, o10, r10, a10, n10] = this.dateTimeFormat({ weekday: "narrow", day: "numeric", month: "numeric", year: "numeric", hour: "numeric", minute: "numeric", second: "numeric" }, t10, "es").split(/(?:, | |\/|:)/g);
            return [o10, s10 - 1, i10, r10, a10, n10, Math.floor(Number(t10) || 0) % 1e3, "DLMXJVS".indexOf(e10)].map(Number);
          }
          dateTimeFormat(t10, e10, i10 = this.options.locale || th) {
            var _a2;
            let s10 = JSON.stringify(t10) + i10;
            tf(t10) && (t10 = this.str2dtf(t10));
            let o10 = this.dTLCache[s10];
            if (!o10) {
              (_a2 = t10.timeZone) != null ? _a2 : t10.timeZone = this.timezone;
              try {
                o10 = new Intl.DateTimeFormat(i10, t10);
              } catch (e11) {
                /Invalid time zone/i.test(e11.message) ? (tc(34), t10.timeZone = "UTC", o10 = new Intl.DateTimeFormat(i10, t10)) : tc(e11.message, false);
              }
            }
            return this.dTLCache[s10] = o10, (o10 == null ? void 0 : o10.format(e10)) || "";
          }
          str2dtf(t10, e10 = {}) {
            let i10 = { L: { fractionalSecondDigits: 3 }, S: { second: "2-digit" }, M: { minute: "numeric" }, H: { hour: "2-digit" }, k: { hour: "numeric" }, E: { weekday: "narrow" }, a: { weekday: "short" }, A: { weekday: "long" }, d: { day: "2-digit" }, e: { day: "numeric" }, b: { month: "short" }, B: { month: "long" }, m: { month: "2-digit" }, o: { month: "numeric" }, y: { year: "2-digit" }, Y: { year: "numeric" } };
            return Object.keys(i10).forEach((s10) => {
              -1 !== t10.indexOf(s10) && tp(e10, i10[s10]);
            }), e10;
          }
          makeTime(t10, e10, i10 = 1, s10 = 0, o10, r10, a10) {
            let n10 = this.Date.UTC(t10, e10, i10, s10, o10 || 0, r10 || 0, a10 || 0);
            if ("UTC" !== this.timezone) {
              let t11 = this.getTimezoneOffset(n10);
              if (n10 += t11, -1 !== [2, 3, 8, 9, 10, 11].indexOf(e10) && (s10 < 5 || s10 > 20)) {
                let e11 = this.getTimezoneOffset(n10);
                t11 !== e11 ? n10 += e11 - t11 : t11 - 36e5 !== this.getTimezoneOffset(n10 - 36e5) || tw || (n10 -= 36e5);
              }
            }
            return n10;
          }
          parse(t10) {
            if (!tf(t10)) return t10 != null ? t10 : void 0;
            let e10 = (t10 = t10.replace(/\//g, "-").replace(/(GMT|UTC)/, "")).indexOf("Z") > -1 || /([+-][0-9]{2}):?[0-9]{2}$/.test(t10), i10 = /^[0-9]{4}-[0-9]{2}(-[0-9]{2}|)$/.test(t10);
            e10 || i10 || (t10 += "Z");
            let s10 = Date.parse(t10);
            if (tg(s10)) return s10 + (!e10 || i10 ? this.getTimezoneOffset(s10) : 0);
          }
          getTimezoneOffset(t10) {
            if ("UTC" !== this.timezone) {
              let [e10, i10, s10, o10, r10 = 0] = this.dateTimeFormat({ timeZoneName: "shortOffset" }, t10, "en").split(/(GMT|:)/).map(Number), a10 = -(60 * (s10 + r10 / 60) * 6e4);
              if (tg(a10)) return a10;
            }
            return 0;
          }
          dateFormat(t10, e10, i10) {
            var _a2;
            let s10 = this.lang;
            if (!td(e10) || isNaN(e10)) return (s10 == null ? void 0 : s10.invalidDate) || "";
            if (tf(t10 = t10 != null ? t10 : "%Y-%m-%d %H:%M:%S")) {
              let i11, o10 = /%\[([a-zA-Z]+)\]/g;
              for (; i11 = o10.exec(t10); ) t10 = t10.replace(i11[0], this.dateTimeFormat(i11[1], e10, s10 == null ? void 0 : s10.locale));
            }
            if (tf(t10) && -1 !== t10.indexOf("%")) {
              let i11 = this, [o10, r10, a10, n10, h10, l2, d2, c2] = this.toParts(e10), p2 = (s10 == null ? void 0 : s10.weekdays) || this.weekdays, g2 = (s10 == null ? void 0 : s10.shortWeekdays) || this.shortWeekdays, u2 = (s10 == null ? void 0 : s10.months) || this.months, f2 = (s10 == null ? void 0 : s10.shortMonths) || this.shortMonths;
              tx(tp({ a: g2 ? g2[c2] : p2[c2].substr(0, 3), A: p2[c2], d: ty(a10), e: ty(a10, 2, " "), w: c2, v: (_a2 = s10 == null ? void 0 : s10.weekFrom) != null ? _a2 : "", b: f2[r10], B: u2[r10], m: ty(r10 + 1), o: r10 + 1, y: o10.toString().substr(2, 2), Y: o10, H: ty(n10), k: n10, I: ty(n10 % 12 || 12), l: n10 % 12 || 12, M: ty(h10), p: n10 < 12 ? "AM" : "PM", P: n10 < 12 ? "am" : "pm", S: ty(l2), L: ty(d2, 3) }, z.dateFormats), function(s11, o11) {
                if (tf(t10)) for (; -1 !== t10.indexOf("%" + o11); ) t10 = t10.replace("%" + o11, "function" == typeof s11 ? s11.call(i11, e10) : s11);
              });
            } else if (tu(t10)) {
              let i11 = (this.getTimezoneOffset(e10) || 0) / 36e5, s11 = this.timezone || "Etc/GMT" + (i11 >= 0 ? "+" : "") + i11, { prefix: o10 = "", suffix: r10 = "" } = t10;
              t10 = o10 + this.dateTimeFormat(tp({ timeZone: s11 }, t10), e10) + r10;
            }
            return i10 ? tk(t10) : t10;
          }
          resolveDTLFormat(t10) {
            return tu(t10, true) ? tu(t10, true) && void 0 === t10.main ? { main: t10 } : t10 : { main: (t10 = tb(t10))[0], from: t10[1], to: t10[2] };
          }
          getDateFormat(t10, e10, i10, s10) {
            let o10 = this.dateFormat("%m-%d %H:%M:%S.%L", e10), r10 = "01-01 00:00:00.000", a10 = { millisecond: 15, second: 12, minute: 9, hour: 6, day: 3 }, n10 = "millisecond", h10 = n10;
            for (n10 in tv) {
              if (t10 && t10 === tv.week && +this.dateFormat("%w", e10) === i10 && o10.substr(6) === r10.substr(6)) {
                n10 = "week";
                break;
              }
              if (t10 && tv[n10] > t10) {
                n10 = h10;
                break;
              }
              if (a10[n10] && o10.substr(a10[n10]) !== r10.substr(a10[n10])) break;
              "week" !== n10 && (h10 = n10);
            }
            return this.resolveDTLFormat(s10[n10]).main;
          }
        }, { defined: tS, extend: tT, timeUnits: tC } = tn, tA = class extends tM {
          getTimeTicks(t10, e10, i10, s10) {
            let o10 = this, r10 = [], a10 = {}, { count: n10 = 1, unitRange: h10 } = t10, [l2, d2, c2, p2, g2, u2] = o10.toParts(e10), f2 = (e10 || 0) % 1e3, m2;
            if (s10 != null ? s10 : s10 = 1, tS(e10)) {
              if (f2 = h10 >= tC.second ? 0 : n10 * Math.floor(f2 / n10), h10 >= tC.second && (u2 = h10 >= tC.minute ? 0 : n10 * Math.floor(u2 / n10)), h10 >= tC.minute && (g2 = h10 >= tC.hour ? 0 : n10 * Math.floor(g2 / n10)), h10 >= tC.hour && (p2 = h10 >= tC.day ? 0 : n10 * Math.floor(p2 / n10)), h10 >= tC.day && (c2 = h10 >= tC.month ? 1 : Math.max(1, n10 * Math.floor(c2 / n10))), h10 >= tC.month && (d2 = h10 >= tC.year ? 0 : n10 * Math.floor(d2 / n10)), h10 >= tC.year && (l2 -= l2 % n10), h10 === tC.week) {
                n10 && (e10 = o10.makeTime(l2, d2, c2, p2, g2, u2, f2));
                let t12 = this.dateTimeFormat({ timeZone: this.timezone, weekday: "narrow" }, e10, "es"), i11 = "DLMXJVS".indexOf(t12);
                c2 += -i11 + s10 + (i11 < s10 ? -7 : 0);
              }
              e10 = o10.makeTime(l2, d2, c2, p2, g2, u2, f2), o10.variableTimezone && tS(i10) && (m2 = i10 - e10 > 4 * tC.month || o10.getTimezoneOffset(e10) !== o10.getTimezoneOffset(i10));
              let t11 = e10, x2 = 1;
              for (; t11 < i10; ) r10.push(t11), h10 === tC.year ? t11 = o10.makeTime(l2 + x2 * n10, 0) : h10 === tC.month ? t11 = o10.makeTime(l2, d2 + x2 * n10) : m2 && (h10 === tC.day || h10 === tC.week) ? t11 = o10.makeTime(l2, d2, c2 + x2 * n10 * (h10 === tC.day ? 1 : 7)) : m2 && h10 === tC.hour && n10 > 1 ? t11 = o10.makeTime(l2, d2, c2, p2 + x2 * n10) : t11 += h10 * n10, x2++;
              r10.push(t11), h10 <= tC.hour && r10.length < 1e4 && r10.forEach((t12) => {
                t12 % 18e5 == 0 && "000000000" === o10.dateFormat("%H%M%S%L", t12) && (a10[t12] = "day");
              });
            }
            return r10.info = tT(t10, { higherRanks: a10, totalRange: h10 * n10 }), r10;
          }
        }, { isTouchDevice: tP } = z, { fireEvent: tL, merge: tO } = tn, tE = { colors: ["#2caffe", "#544fc5", "#00e272", "#fe6a35", "#6b8abc", "#d568fb", "#2ee0ca", "#fa4b42", "#feb56a", "#91e8e1"], symbols: ["circle", "diamond", "square", "triangle", "triangle-down"], lang: { weekFrom: "week from", chartTitle: "Chart title", locale: void 0, loading: "Loading...", months: void 0, seriesName: "Series {add index 1}", shortMonths: void 0, weekdays: void 0, numericSymbols: ["k", "M", "G", "T", "P", "E"], pieSliceName: "Slice", resetZoom: "Reset zoom", yAxisTitle: "Values", resetZoomTitle: "Reset zoom level 1:1" }, global: { buttonTheme: { fill: "#f7f7f7", padding: 8, r: 2, stroke: "#cccccc", "stroke-width": 1, style: { color: "#333333", cursor: "pointer", fontSize: "0.8em", fontWeight: "normal" }, states: { hover: { fill: "#e6e6e6" }, select: { fill: "#e6e9ff", style: { color: "#000000", fontWeight: "bold" } }, disabled: { style: { color: "#cccccc" } } } } }, time: { Date: void 0, timezone: "UTC", timezoneOffset: 0, useUTC: void 0 }, chart: { alignThresholds: false, panning: { enabled: false, type: "x" }, styledMode: false, borderRadius: 0, colorCount: 10, allowMutatingData: true, ignoreHiddenSeries: true, spacing: [10, 10, 15, 10], resetZoomButton: { theme: {}, position: {} }, reflow: true, type: "line", zooming: { singleTouch: false, resetButton: { theme: { zIndex: 6 }, position: { align: "right", x: -10, y: 10 } } }, width: null, height: null, borderColor: "#334eff", backgroundColor: "#ffffff", plotBorderColor: "#cccccc" }, title: { style: { color: "#333333", fontWeight: "bold" }, text: "Chart title", margin: 15, minScale: 0.67 }, subtitle: { style: { color: "#666666", fontSize: "0.8em" }, text: "" }, caption: { margin: 15, style: { color: "#666666", fontSize: "0.8em" }, text: "", align: "left", verticalAlign: "bottom" }, plotOptions: {}, legend: { enabled: true, align: "center", alignColumns: true, className: "highcharts-no-tooltip", events: {}, layout: "horizontal", itemMarginBottom: 2, itemMarginTop: 2, labelFormatter: function() {
          return this.name;
        }, borderColor: "#999999", borderRadius: 0, navigation: { style: { fontSize: "0.8em" }, activeColor: "#0022ff", inactiveColor: "#cccccc" }, itemStyle: { color: "#333333", cursor: "pointer", fontSize: "0.8em", textDecoration: "none", textOverflow: "ellipsis" }, itemHoverStyle: { color: "#000000" }, itemHiddenStyle: { color: "#666666", textDecoration: "line-through" }, shadow: false, itemCheckboxStyle: { position: "absolute", width: "13px", height: "13px" }, squareSymbol: true, symbolPadding: 5, verticalAlign: "bottom", x: 0, y: 0, title: { style: { color: "#333333", fontSize: "0.8em", fontWeight: "bold" } } }, loading: { labelStyle: { fontWeight: "bold", position: "relative", top: "45%" }, style: { position: "absolute", backgroundColor: "#ffffff", opacity: 0.5, textAlign: "center" } }, tooltip: { enabled: true, animation: { duration: 300, easing: (t10) => Math.sqrt(1 - Math.pow(t10 - 1, 2)) }, borderRadius: 3, dateTimeLabelFormats: { millisecond: "%[AebHMSL]", second: "%[AebHMS]", minute: "%[AebHM]", hour: "%[AebHM]", day: "%[AebY]", week: "%v %[AebY]", month: "%[BY]", year: "%Y" }, footerFormat: "", headerShape: "callout", hideDelay: 500, padding: 8, position: { x: 0, y: 3 }, shared: false, snap: tP ? 25 : 10, headerFormat: '<span style="font-size: 0.8em">{ucfirst point.key}</span><br/>', pointFormat: '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.y}</b><br/>', backgroundColor: "#ffffff", borderWidth: void 0, stickOnContact: false, style: { color: "#333333", cursor: "default", fontSize: "0.8em" }, useHTML: false }, credits: { enabled: true, href: "https://www.highcharts.com?credits", position: { align: "right", x: -10, verticalAlign: "bottom", y: -5 }, style: { cursor: "pointer", color: "#999999", fontSize: "0.6em" }, text: "Highcharts.com" } }, tI = new tA(tE.time, tE.lang), tD = { defaultOptions: tE, defaultTime: tI, getOptions: function() {
          return tE;
        }, setOptions: function(t10) {
          var _a2;
          return tL(z, "setOptions", { options: t10 }), tO(true, tE, t10), t10.time && tI.update(tE.time), t10.lang && "locale" in t10.lang && tI.update({ locale: t10.lang.locale }), ((_a2 = t10.lang) == null ? void 0 : _a2.chartTitle) && (tE.title = __spreadProps(__spreadValues({}, tE.title), { text: t10.lang.chartTitle })), tE;
        } }, { win: tB } = z, { isNumber: tN, isString: tz, merge: tR, pInt: tW, defined: tH } = tn, tX = (t10, e10, i10) => `color-mix(in srgb,${t10},${e10} ${100 * i10}%)`, tF = (t10) => tz(t10) && !!t10 && "none" !== t10;
        class tG {
          static parse(t10) {
            return t10 ? new tG(t10) : tG.None;
          }
          constructor(t10) {
            let e10, i10, s10, o10;
            this.rgba = [NaN, NaN, NaN, NaN], this.input = t10;
            const r10 = z.Color;
            if (r10 && r10 !== tG) return new r10(t10);
            if ("object" == typeof t10 && void 0 !== t10.stops) this.stops = t10.stops.map((t11) => new tG(t11[1]));
            else if ("string" == typeof t10) for (this.input = t10 = tG.names[t10.toLowerCase()] || t10, s10 = tG.parsers.length; s10-- && !i10; ) (e10 = (o10 = tG.parsers[s10]).regex.exec(t10)) && (i10 = o10.parse(e10));
            i10 && (this.rgba = i10);
          }
          get(t10) {
            let e10 = this.input, i10 = this.rgba;
            if (this.output) return this.output;
            if ("object" == typeof e10 && void 0 !== this.stops) {
              let i11 = tR(e10);
              return i11.stops = [].slice.call(i11.stops), this.stops.forEach((e11, s10) => {
                i11.stops[s10] = [i11.stops[s10][0], e11.get(t10)];
              }), i11;
            }
            return i10 && tN(i10[0]) ? "rgb" !== t10 && (t10 || 1 !== i10[3]) ? "a" === t10 ? `${i10[3]}` : "rgba(" + i10.join(",") + ")" : "rgb(" + i10[0] + "," + i10[1] + "," + i10[2] + ")" : e10;
          }
          brighten(t10) {
            let e10 = this.rgba;
            if (this.stops) this.stops.forEach(function(e11) {
              e11.brighten(t10);
            });
            else if (tN(t10) && 0 !== t10) if (tN(e10[0])) for (let i10 = 0; i10 < 3; i10++) e10[i10] += tW(255 * t10), e10[i10] < 0 && (e10[i10] = 0), e10[i10] > 255 && (e10[i10] = 255);
            else tG.useColorMix && tF(this.input) && (this.output = tX(this.input, t10 > 0 ? "white" : "black", Math.abs(t10)));
            return this;
          }
          setOpacity(t10) {
            return this.rgba[3] = t10, this;
          }
          tweenTo(t10, e10) {
            let i10 = this.rgba, s10 = t10.rgba;
            if (!tN(i10[0]) || !tN(s10[0])) return tG.useColorMix && tF(this.input) && tF(t10.input) && e10 < 0.99 ? tX(this.input, t10.input, e10) : t10.input || "none";
            let o10 = 1 !== s10[3] || 1 !== i10[3], r10 = (t11, s11) => t11 + (i10[s11] - t11) * (1 - e10), a10 = s10.slice(0, 3).map(r10).map(Math.round);
            return o10 && a10.push(r10(s10[3], 3)), (o10 ? "rgba(" : "rgb(") + a10.join(",") + ")";
          }
        }
        tG.names = { white: "#ffffff", black: "#000000" }, tG.parsers = [{ regex: /rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d?(?:\.\d+)?)\s*\)/, parse: function(t10) {
          return [tW(t10[1]), tW(t10[2]), tW(t10[3]), parseFloat(t10[4], 10)];
        } }, { regex: /rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)/, parse: function(t10) {
          return [tW(t10[1]), tW(t10[2]), tW(t10[3]), 1];
        } }, { regex: /^#([a-f0-9])([a-f0-9])([a-f0-9])([a-f0-9])?$/i, parse: function(t10) {
          return [tW(t10[1] + t10[1], 16), tW(t10[2] + t10[2], 16), tW(t10[3] + t10[3], 16), tH(t10[4]) ? tW(t10[4] + t10[4], 16) / 255 : 1];
        } }, { regex: /^#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})?$/i, parse: function(t10) {
          return [tW(t10[1], 16), tW(t10[2], 16), tW(t10[3], 16), tH(t10[4]) ? tW(t10[4], 16) / 255 : 1];
        } }], tG.useColorMix = (_h = tB.CSS) == null ? void 0 : _h.supports("color", "color-mix(in srgb,red,blue 9%)"), tG.None = new tG("");
        let { parse: tY } = tG, { win: tj } = z, { isNumber: tU, objectEach: t$ } = tn;
        class tV {
          constructor(t10, e10, i10) {
            this.pos = NaN, this.options = e10, this.elem = t10, this.prop = i10;
          }
          dSetter() {
            let t10 = this.paths, e10 = t10 == null ? void 0 : t10[0], i10 = t10 == null ? void 0 : t10[1], s10 = this.now || 0, o10 = [];
            if (1 !== s10 && e10 && i10) if (e10.length === i10.length && s10 < 1) for (let t11 = 0; t11 < i10.length; t11++) {
              let r10 = e10[t11], a10 = i10[t11], n10 = [];
              for (let t12 = 0; t12 < a10.length; t12++) {
                let e11 = r10[t12], i11 = a10[t12];
                tU(e11) && tU(i11) && ("A" !== a10[0] || 4 !== t12 && 5 !== t12) ? n10[t12] = e11 + s10 * (i11 - e11) : n10[t12] = i11;
              }
              o10.push(n10);
            }
            else o10 = i10;
            else o10 = this.toD || [];
            this.elem.attr("d", o10, void 0, true);
          }
          update() {
            let t10 = this.elem, e10 = this.prop, i10 = this.now, s10 = this.options.step;
            this[e10 + "Setter"] ? this[e10 + "Setter"]() : t10.attr ? t10.element && t10.attr(e10, i10, null, true) : t10.style[e10] = i10 + this.unit, s10 && s10.call(t10, i10, this);
          }
          run(t10, e10, i10) {
            let s10 = this, o10 = s10.options, r10 = function(t11) {
              return !r10.stopped && s10.step(t11);
            }, a10 = tj.requestAnimationFrame || function(t11) {
              setTimeout(t11, 13);
            }, n10 = function() {
              for (let t11 = 0; t11 < tV.timers.length; t11++) tV.timers[t11]() || tV.timers.splice(t11--, 1);
              tV.timers.length && a10(n10);
            };
            t10 !== e10 || this.elem["forceAnimate:" + this.prop] ? (this.startTime = +/* @__PURE__ */ new Date(), this.start = t10, this.end = e10, this.unit = i10, this.now = this.start, this.pos = 0, r10.elem = this.elem, r10.prop = this.prop, r10() && 1 === tV.timers.push(r10) && a10(n10)) : (delete o10.curAnim[this.prop], o10.complete && 0 === Object.keys(o10.curAnim).length && o10.complete.call(this.elem));
          }
          step(t10) {
            let e10, i10, s10 = +/* @__PURE__ */ new Date(), o10 = this.options, r10 = this.elem, a10 = o10.complete, n10 = o10.duration, h10 = o10.curAnim;
            return r10.attr && !r10.element ? e10 = false : t10 || s10 >= n10 + this.startTime ? (this.now = this.end, this.pos = 1, this.update(), h10[this.prop] = true, i10 = true, t$(h10, function(t11) {
              true !== t11 && (i10 = false);
            }), i10 && a10 && a10.call(r10), e10 = false) : (this.pos = o10.easing((s10 - this.startTime) / n10), this.now = this.start + (this.end - this.start) * this.pos, this.update(), e10 = true), e10;
          }
          initPath(t10, e10, i10) {
            let s10 = t10.startX, o10 = t10.endX, r10 = i10.slice(), a10 = t10.isArea, n10 = a10 ? 2 : 1, h10 = e10 && i10.length > e10.length && i10.hasStackedCliffs, l2, d2, c2, p2, g2 = e10 == null ? void 0 : e10.slice();
            if (!g2 || h10) return [r10, r10];
            function u2(t11, e11) {
              for (; t11.length < d2; ) {
                let i11 = t11[0], s11 = e11[d2 - t11.length];
                if (s11 && "M" === i11[0] && ("C" === s11[0] ? t11[0] = ["C", i11[1], i11[2], i11[1], i11[2], i11[1], i11[2]] : t11[0] = ["L", i11[1], i11[2]]), t11.unshift(i11), a10) {
                  let e12 = t11.pop();
                  t11.push(t11[t11.length - 1], e12);
                }
              }
            }
            function f2(t11) {
              for (; t11.length < d2; ) {
                let e11 = t11[Math.floor(t11.length / n10) - 1].slice();
                if ("C" === e11[0] && (e11[1] = e11[5], e11[2] = e11[6]), a10) {
                  let i11 = t11[Math.floor(t11.length / n10)].slice();
                  t11.splice(t11.length / 2, 0, e11, i11);
                } else t11.push(e11);
              }
            }
            if (s10 && o10 && o10.length) {
              for (c2 = 0; c2 < s10.length; c2++) if (s10[c2] === o10[0]) {
                l2 = c2;
                break;
              } else if (s10[0] === o10[o10.length - s10.length + c2]) {
                l2 = c2, p2 = true;
                break;
              } else if (s10[s10.length - 1] === o10[o10.length - s10.length + c2]) {
                l2 = s10.length - c2;
                break;
              }
              void 0 === l2 && (g2 = []);
            }
            return g2.length && tU(l2) && (d2 = r10.length + l2 * n10, p2 ? (u2(g2, r10), f2(r10)) : (u2(r10, g2), f2(g2))), [g2, r10];
          }
          fillSetter() {
            tV.prototype.strokeSetter.apply(this, arguments);
          }
          strokeSetter() {
            this.elem.attr(this.prop, tY(this.start).tweenTo(tY(this.end), this.pos), void 0, true);
          }
        }
        tV.timers = [];
        let { defined: tZ, getStyle: t_, isArray: tq, isNumber: tK, isObject: tJ, merge: tQ, objectEach: t0, pick: t1 } = tn;
        function t2(t10) {
          return tJ(t10) ? tQ({ duration: 500, defer: 0 }, t10) : { duration: 500 * !!t10, defer: 0 };
        }
        function t3(t10, e10) {
          let i10 = tV.timers.length;
          for (; i10--; ) tV.timers[i10].elem !== t10 || e10 && e10 !== tV.timers[i10].prop || (tV.timers[i10].stopped = true);
        }
        let t5 = { animate: function(t10, e10, i10) {
          let s10, o10 = "", r10, a10, n10;
          tJ(i10) || (n10 = arguments, i10 = { duration: n10[2], easing: n10[3], complete: n10[4] }), tK(i10.duration) || (i10.duration = 400), i10.easing = "function" == typeof i10.easing ? i10.easing : Math[i10.easing] || Math.easeInOutSine, i10.curAnim = tQ(e10), t0(e10, function(n11, h10) {
            t3(t10, h10), a10 = new tV(t10, i10, h10), r10 = void 0, "d" === h10 && tq(e10.d) ? (a10.paths = a10.initPath(t10, t10.pathArray, e10.d), a10.toD = e10.d, s10 = 0, r10 = 1) : t10.attr ? s10 = t10.attr(h10) : (s10 = parseFloat(t_(t10, h10)) || 0, "opacity" !== h10 && (o10 = "px")), r10 || (r10 = n11), "string" == typeof r10 && r10.match("px") && (r10 = r10.replace(/px/g, "")), a10.run(s10, r10, o10);
          });
        }, animObject: t2, getDeferredAnimation: function(t10, e10, i10) {
          let s10 = t2(e10), o10 = i10 ? [i10] : t10.series, r10 = 0, a10 = 0;
          return o10.forEach((t11) => {
            let i11 = t2(t11.options.animation);
            r10 = tJ(e10) && tZ(e10.defer) ? s10.defer : Math.max(r10, i11.duration + i11.defer), a10 = Math.min(s10.duration, i11.duration);
          }), t10.renderer.forExport && (r10 = 0), { defer: Math.max(0, r10 - a10), duration: Math.min(r10, a10) };
        }, setAnimation: function(t10, e10) {
          e10.renderer.globalAnimation = t1(t10, e10.options.chart.animation, true);
        }, stop: t3 }, { SVG_NS: t6, win: t9 } = z, { attr: t4, createElement: t8, css: t7, error: et, isFunction: ee, isString: ei, objectEach: es, splat: eo } = tn, { trustedTypes: er } = t9, ea = er && ee(er.createPolicy) && er.createPolicy("highcharts", { createHTML: (t10) => t10 }), en = ea ? ea.createHTML("") : "";
        class eh {
          static filterUserAttributes(t10) {
            return es(t10, (e10, i10) => {
              let s10 = true;
              -1 === eh.allowedAttributes.indexOf(i10) && (s10 = false), -1 !== ["background", "dynsrc", "href", "lowsrc", "src"].indexOf(i10) && (s10 = ei(e10) && eh.allowedReferences.some((t11) => 0 === e10.indexOf(t11))), s10 || (et(33, false, void 0, { "Invalid attribute in config": `${i10}` }), delete t10[i10]), ei(e10) && t10[i10] && (t10[i10] = e10.replace(/</g, "&lt;"));
            }), t10;
          }
          static parseStyle(t10) {
            return t10.split(";").reduce((t11, e10) => {
              let i10 = e10.split(":").map((t12) => t12.trim()), s10 = i10.shift();
              return s10 && i10.length && (t11[s10.replace(/-([a-z])/g, (t12) => t12[1].toUpperCase())] = i10.join(":")), t11;
            }, {});
          }
          static setElementHTML(t10, e10) {
            t10.innerHTML = eh.emptyHTML, e10 && new eh(e10).addToDOM(t10);
          }
          constructor(t10) {
            this.nodes = "string" == typeof t10 ? this.parseMarkup(t10) : t10;
          }
          addToDOM(t10) {
            return (function t11(e10, i10) {
              let s10;
              return eo(e10).forEach(function(e11) {
                let o10, r10 = e11.tagName, a10 = e11.textContent ? z.doc.createTextNode(e11.textContent) : void 0, n10 = eh.bypassHTMLFiltering;
                if (r10) if ("#text" === r10) o10 = a10;
                else if (-1 !== eh.allowedTags.indexOf(r10) || n10) {
                  let s11 = "svg" === r10 ? t6 : i10.namespaceURI || t6, h10 = z.doc.createElementNS(s11, r10), l2 = e11.attributes || {};
                  es(e11, function(t12, e12) {
                    "tagName" !== e12 && "attributes" !== e12 && "children" !== e12 && "style" !== e12 && "textContent" !== e12 && (l2[e12] = t12);
                  }), t4(h10, n10 ? l2 : eh.filterUserAttributes(l2)), e11.style && t7(h10, e11.style), a10 && h10.appendChild(a10), t11(e11.children || [], h10), o10 = h10;
                } else et(33, false, void 0, { "Invalid tagName in config": r10 });
                o10 && i10.appendChild(o10), s10 = o10;
              }), s10;
            })(this.nodes, t10);
          }
          parseMarkup(t10) {
            let e10, i10 = [];
            t10 = t10.trim().replace(/ style=(["'])/g, " data-style=$1");
            try {
              e10 = new DOMParser().parseFromString(ea ? ea.createHTML(t10) : t10, "text/html");
            } catch (e11) {
            }
            if (!e10) {
              let i11 = t8("div");
              i11.innerHTML = t10, e10 = { body: i11 };
            }
            let s10 = (t11, e11) => {
              let i11 = t11.nodeName.toLowerCase(), o10 = { tagName: i11 };
              "#text" === i11 && (o10.textContent = t11.textContent || "");
              let r10 = t11.attributes;
              if (r10) {
                let t12 = {};
                [].forEach.call(r10, (e12) => {
                  "data-style" === e12.name ? o10.style = eh.parseStyle(e12.value) : t12[e12.name] = e12.value;
                }), o10.attributes = t12;
              }
              if (t11.childNodes.length) {
                let e12 = [];
                [].forEach.call(t11.childNodes, (t12) => {
                  s10(t12, e12);
                }), e12.length && (o10.children = e12);
              }
              e11.push(o10);
            };
            return [].forEach.call(e10.body.childNodes, (t11) => s10(t11, i10)), i10;
          }
        }
        eh.allowedAttributes = ["alt", "aria-controls", "aria-describedby", "aria-expanded", "aria-haspopup", "aria-hidden", "aria-label", "aria-labelledby", "aria-live", "aria-pressed", "aria-readonly", "aria-roledescription", "aria-selected", "class", "clip-path", "color", "colspan", "cx", "cy", "d", "disabled", "dx", "dy", "fill", "filterUnits", "flood-color", "flood-opacity", "height", "href", "id", "in", "in2", "markerHeight", "markerWidth", "offset", "opacity", "operator", "orient", "padding", "paddingLeft", "paddingRight", "patternUnits", "r", "radius", "refX", "refY", "result", "role", "rowspan", "scope", "slope", "src", "startOffset", "stdDeviation", "stroke-linecap", "stroke-width", "stroke", "style", "summary", "tabindex", "tableValues", "target", "text-align", "text-anchor", "textAnchor", "textLength", "title", "type", "valign", "width", "x", "x1", "x2", "xlink:href", "y", "y1", "y2", "zIndex"], eh.allowedReferences = ["https://", "http://", "mailto:", "/", "../", "./", "#"], eh.allowedTags = ["#text", "a", "abbr", "b", "br", "button", "caption", "circle", "clipPath", "code", "dd", "defs", "div", "dl", "dt", "em", "feComponentTransfer", "feComposite", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feMerge", "feMergeNode", "feMorphology", "feOffset", "filter", "h1", "h2", "h3", "h4", "h5", "h6", "hr", "i", "img", "li", "linearGradient", "marker", "ol", "p", "path", "pattern", "pre", "rect", "small", "span", "stop", "strong", "style", "sub", "sup", "svg", "table", "tbody", "td", "text", "textPath", "th", "thead", "title", "tr", "tspan", "u", "ul"], eh.emptyHTML = en, eh.bypassHTMLFiltering = false;
        let { defaultOptions: el, defaultTime: ed } = tD, { pageLang: ec } = z, { extend: ep, getNestedProperty: eg, isArray: eu, isNumber: ef, isObject: em, isString: ex, pick: ey, ucfirst: eb } = tn, ev = { add: (t10, e10) => t10 + e10, divide: (t10, e10) => 0 !== e10 ? t10 / e10 : "", eq: (t10, e10) => t10 == e10, each: function(t10) {
          let e10 = arguments[arguments.length - 1];
          return !!eu(t10) && t10.map((i10, s10) => ew(e10.body, ep(em(i10) ? i10 : { "@this": i10 }, { "@index": s10, "@first": 0 === s10, "@last": s10 === t10.length - 1 }))).join("");
        }, ge: (t10, e10) => t10 >= e10, gt: (t10, e10) => t10 > e10, if: (t10) => !!t10, le: (t10, e10) => t10 <= e10, lt: (t10, e10) => t10 < e10, multiply: (t10, e10) => t10 * e10, ne: (t10, e10) => t10 != e10, subtract: (t10, e10) => t10 - e10, ucfirst: eb, unless: (t10) => !t10 }, ek = {};
        function ew(t10 = "", e10, i10) {
          var _a2;
          let s10 = RegExp(`\\{([\\p{L}\\d:\\.,;\\-\\/<>\\[\\]%_@+"'\u2019= #\\(\\)]+)\\}`, "gu"), o10 = RegExp(`\\(([\\p{L}\\d:\\.,;\\-\\/<>\\[\\]%_@+"'= ]+)\\)`, "gu"), r10 = [], a10 = /f$/, n10 = /\.(\d)/, h10 = ((_a2 = i10 == null ? void 0 : i10.options) == null ? void 0 : _a2.lang) || el.lang, l2 = (i10 == null ? void 0 : i10.time) || ed, d2 = (i10 == null ? void 0 : i10.numberFormatter) || eM.bind(i10), c2 = (t11 = "") => {
            let i11;
            return "true" === t11 || "false" !== t11 && ((i11 = Number(t11)).toString() === t11 ? i11 : /^["'].+["']$/.test(t11) ? t11.slice(1, -1) : eg(t11, e10));
          }, p2, g2, u2 = 0, f2;
          for (; null !== (p2 = s10.exec(t10)); ) {
            let i11 = p2, s11 = o10.exec(p2[1]);
            s11 && (p2 = s11, f2 = true), (g2 == null ? void 0 : g2.isBlock) || (g2 = { ctx: e10, expression: p2[1], find: p2[0], isBlock: "#" === p2[1].charAt(0), start: p2.index, startInner: p2.index + p2[0].length, length: p2[0].length });
            let a11 = (g2.isBlock ? i11 : p2)[1].split(" ")[0].replace("#", "");
            ev[a11] && (g2.isBlock && a11 === g2.fn && u2++, g2.fn || (g2.fn = a11));
            let n11 = "else" === p2[1];
            if (g2.isBlock && g2.fn && (p2[1] === `/${g2.fn}` || n11)) if (u2) !n11 && u2--;
            else {
              let e11 = g2.startInner, i12 = t10.substr(e11, p2.index - e11);
              void 0 === g2.body ? (g2.body = i12, g2.startInner = p2.index + p2[0].length) : g2.elseBody = i12, g2.find += i12 + p2[0], n11 || (r10.push(g2), g2 = void 0);
            }
            else g2.isBlock || r10.push(g2);
            if (s11 && !(g2 == null ? void 0 : g2.isBlock)) break;
          }
          return r10.forEach((s11) => {
            let r11, p3, { body: g3, elseBody: u3, expression: f3, fn: m2 } = s11;
            if (m2) {
              let t11 = [s11], o11 = [], a11 = f3.length, n11 = 0, h11;
              for (p3 = 0; p3 <= a11; p3++) {
                let t12 = f3.charAt(p3);
                h11 || '"' !== t12 && "'" !== t12 ? h11 === t12 && (h11 = "") : h11 = t12, h11 || " " !== t12 && p3 !== a11 || (o11.push(f3.substr(n11, p3 - n11)), n11 = p3 + 1);
              }
              for (p3 = ev[m2].length; p3--; ) t11.unshift(c2(o11[p3 + 1]));
              r11 = ev[m2].apply(e10, t11), s11.isBlock && "boolean" == typeof r11 && (r11 = ew(r11 ? g3 : u3, e10, i10));
            } else {
              let t11 = /^["'].+["']$/.test(f3) ? [f3] : f3.split(":");
              if (r11 = c2(t11.shift() || ""), t11.length && "number" == typeof r11) {
                let e11 = t11.join(":");
                if (a10.test(e11)) {
                  let t12 = parseInt((e11.match(n10) || ["", "-1"])[1], 10);
                  null !== r11 && (r11 = d2(r11, t12, h10.decimalPoint, e11.indexOf(",") > -1 ? h10.thousandsSep : ""));
                } else r11 = l2.dateFormat(e11, r11);
              }
              o10.lastIndex = 0, o10.test(s11.find) && ex(r11) && (r11 = `"${r11}"`);
            }
            t10 = t10.replace(s11.find, ey(r11, ""));
          }), f2 ? ew(t10, e10, i10) : t10;
        }
        function eM(t10, e10, i10, s10) {
          var _a2, _b2;
          e10 *= 1;
          let o10, r10, [a10, n10] = (t10 = +t10 || 0).toString().split("e").map(Number), h10 = ((_a2 = this == null ? void 0 : this.options) == null ? void 0 : _a2.lang) || el.lang, l2 = (t10.toString().split(".")[1] || "").split("e")[0].length, d2 = e10, c2 = {};
          i10 != null ? i10 : i10 = h10.decimalPoint, s10 != null ? s10 : s10 = h10.thousandsSep, -1 === e10 ? e10 = Math.min(l2, 20) : ef(e10) ? e10 && n10 < 0 && ((r10 = e10 + n10) >= 0 ? (a10 = +a10.toExponential(r10).split("e")[0], e10 = r10) : (a10 = Math.floor(a10), t10 = e10 < 20 ? +(a10 * Math.pow(10, n10)).toFixed(e10) : 0, n10 = 0)) : e10 = 2, n10 && (e10 != null ? e10 : e10 = 2, t10 = a10), ef(e10) && e10 >= 0 && (c2.minimumFractionDigits = e10, c2.maximumFractionDigits = e10), "" === s10 && (c2.useGrouping = false);
          let p2 = s10 || i10, g2 = p2 ? "en" : (this == null ? void 0 : this.locale) || h10.locale || ec, u2 = JSON.stringify(c2) + g2;
          return o10 = ((_b2 = ek[u2]) != null ? _b2 : ek[u2] = new Intl.NumberFormat(g2, c2)).format(t10), p2 && (o10 = o10.replace(/([,\.])/g, "_$1").replace(/_\,/g, s10 != null ? s10 : ",").replace("_.", i10 != null ? i10 : ".")), (e10 || 0 != +o10) && (!(n10 < 0) || d2) || (o10 = "0"), n10 && 0 != +o10 && (o10 += "e" + (n10 < 0 ? "" : "+") + n10), o10;
        }
        let eS = { dateFormat: function(t10, e10, i10) {
          return ed.dateFormat(t10, e10, i10);
        }, format: ew, helpers: ev, numberFormat: eM };
        (n = x || (x = {})).rendererTypes = {}, n.getRendererType = function(t10 = o) {
          return n.rendererTypes[t10] || n.rendererTypes[o];
        }, n.registerRendererType = function(t10, e10, i10) {
          n.rendererTypes[t10] = e10, (!o || i10) && (o = t10, z.Renderer = e10);
        };
        let eT = x, { clamp: eC, pick: eA, pushUnique: eP, stableSort: eL } = tn;
        (y || (y = {})).distribute = function t10(e10, i10, s10) {
          let o10 = e10, r10 = o10.reducedLen || i10, a10 = (t11, e11) => t11.target - e11.target, n10 = [], h10 = e10.length, l2 = [], d2 = n10.push, c2, p2, g2, u2 = true, f2, m2, x2 = 0, y2;
          for (c2 = h10; c2--; ) x2 += e10[c2].size;
          if (x2 > r10) {
            for (eL(e10, (t11, e11) => (e11.rank || 0) - (t11.rank || 0)), g2 = (y2 = e10[0].rank === e10[e10.length - 1].rank) ? h10 / 2 : -1, p2 = y2 ? g2 : h10 - 1; g2 && x2 > r10; ) f2 = e10[c2 = Math.floor(p2)], eP(l2, c2) && (x2 -= f2.size), p2 += g2, y2 && p2 >= e10.length && (g2 /= 2, p2 = g2);
            l2.sort((t11, e11) => e11 - t11).forEach((t11) => d2.apply(n10, e10.splice(t11, 1)));
          }
          for (eL(e10, a10), e10 = e10.map((t11) => ({ size: t11.size, targets: [t11.target], align: eA(t11.align, 0.5) })); u2; ) {
            for (c2 = e10.length; c2--; ) f2 = e10[c2], m2 = (Math.min.apply(0, f2.targets) + Math.max.apply(0, f2.targets)) / 2, f2.pos = eC(m2 - f2.size * f2.align, 0, i10 - f2.size);
            for (c2 = e10.length, u2 = false; c2--; ) c2 > 0 && e10[c2 - 1].pos + e10[c2 - 1].size > e10[c2].pos && (e10[c2 - 1].size += e10[c2].size, e10[c2 - 1].targets = e10[c2 - 1].targets.concat(e10[c2].targets), e10[c2 - 1].align = 0.5, e10[c2 - 1].pos + e10[c2 - 1].size > i10 && (e10[c2 - 1].pos = i10 - e10[c2 - 1].size), e10.splice(c2, 1), u2 = true);
          }
          return d2.apply(o10, n10), c2 = 0, e10.some((e11) => {
            let r11 = 0;
            return (e11.targets || []).some(() => (o10[c2].pos = e11.pos + r11, void 0 !== s10 && Math.abs(o10[c2].pos - o10[c2].target) > s10) ? (o10.slice(0, c2 + 1).forEach((t11) => delete t11.pos), o10.reducedLen = (o10.reducedLen || i10) - 0.1 * i10, o10.reducedLen > 0.1 * i10 && t10(o10, i10, s10), true) : (r11 += o10[c2].size, c2++, false));
          }), eL(o10, a10), o10;
        };
        let eO = y, { animate: eE, animObject: eI, stop: eD } = t5, { deg2rad: eB, doc: eN, svg: ez, SVG_NS: eR, win: eW, isFirefox: eH } = z, { addEvent: eX, attr: eF, createElement: eG, crisp: eY, css: ej, defined: eU, erase: e$, extend: eV, fireEvent: eZ, getAlignFactor: e_, isArray: eq, isFunction: eK, isNumber: eJ, isObject: eQ, isString: e0, merge: e1, objectEach: e2, pick: e3, pInt: e5, pushUnique: e6, replaceNested: e9, syncTimeout: e4, uniqueKey: e8 } = tn;
        class e7 {
          _defaultGetter(t10) {
            let e10 = e3(this[t10 + "Value"], this[t10], this.element ? this.element.getAttribute(t10) : null, 0);
            return /^-?[\d\.]+$/.test(e10) && (e10 = parseFloat(e10)), e10;
          }
          _defaultSetter(t10, e10, i10) {
            i10.setAttribute(e10, t10);
          }
          add(t10) {
            let e10, i10 = this.renderer, s10 = this.element;
            return t10 && (this.parentGroup = t10), void 0 !== this.textStr && "text" === this.element.nodeName && i10.buildText(this), this.added = true, (!t10 || t10.handleZ || this.zIndex) && (e10 = this.zIndexSetter()), e10 || (t10 ? t10.element : i10.box).appendChild(s10), this.onAdd && this.onAdd(), this;
          }
          addClass(t10, e10) {
            let i10 = e10 ? "" : this.attr("class") || "";
            return (t10 = (t10 || "").split(/ /g).reduce(function(t11, e11) {
              return -1 === i10.indexOf(e11) && t11.push(e11), t11;
            }, i10 ? [i10] : []).join(" ")) !== i10 && this.attr("class", t10), this;
          }
          afterSetters() {
            this.doTransform && (this.updateTransform(), this.doTransform = false);
          }
          align(t10, e10, i10, s10 = true) {
            let o10 = this.renderer, r10 = o10.alignedObjects, a10 = !!t10;
            t10 ? (this.alignOptions = t10, this.alignByTranslate = e10, this.alignTo = i10) : (t10 = this.alignOptions || {}, e10 = this.alignByTranslate, i10 = this.alignTo);
            let n10 = !i10 || e0(i10) ? i10 || "renderer" : void 0;
            n10 && (a10 && e6(r10, this), i10 = void 0);
            let h10 = e3(i10, o10[n10], o10), l2 = (h10.x || 0) + (t10.x || 0) + ((h10.width || 0) - (t10.width || 0)) * e_(t10.align), d2 = (h10.y || 0) + (t10.y || 0) + ((h10.height || 0) - (t10.height || 0)) * e_(t10.verticalAlign), c2 = {};
            return t10.align && (c2["text-align"] = t10.align), c2[e10 ? "translateX" : "x"] = Math.round(l2), c2[e10 ? "translateY" : "y"] = Math.round(d2), s10 && (this[this.placed ? "animate" : "attr"](c2), this.placed = true), this.alignAttr = c2, this;
          }
          alignSetter(t10) {
            let e10 = { left: "start", center: "middle", right: "end" };
            e10[t10] && (this.alignValue = t10, this.element.setAttribute("text-anchor", e10[t10]));
          }
          animate(t10, e10, i10) {
            let s10 = eI(e3(e10, this.renderer.globalAnimation, true)), o10 = s10.defer;
            return eN.hidden && (s10.duration = 0), 0 !== s10.duration ? (i10 && (s10.complete = i10), e4(() => {
              this.element && eE(this, t10, s10);
            }, o10)) : (this.attr(t10, void 0, i10 || s10.complete), e2(t10, function(t11, e11) {
              s10.step && s10.step.call(this, t11, { prop: e11, pos: 1, elem: this });
            }, this)), this;
          }
          applyTextOutline(t10) {
            let e10 = this.element;
            -1 !== t10.indexOf("contrast") && (t10 = t10.replace(/contrast/g, this.renderer.getContrast(e10.style.fill)));
            let i10 = t10.indexOf(" "), s10 = t10.substring(i10 + 1), o10 = t10.substring(0, i10);
            if (o10 && "none" !== o10 && z.svg) {
              this.fakeTS = true, o10 = o10.replace(/(^[\d\.]+)(.*?)$/g, function(t12, e11, i12) {
                return 2 * Number(e11) + i12;
              }), this.removeTextOutline();
              let t11 = eN.createElementNS(eR, "tspan");
              eF(t11, { class: "highcharts-text-outline", fill: s10, stroke: s10, "stroke-width": o10, "stroke-linejoin": "round" });
              let i11 = e10.querySelector("textPath") || e10;
              [].forEach.call(i11.childNodes, (e11) => {
                let i12 = e11.cloneNode(true);
                i12.removeAttribute && ["fill", "stroke", "stroke-width", "stroke"].forEach((t12) => i12.removeAttribute(t12)), t11.appendChild(i12);
              });
              let r10 = 0;
              [].forEach.call(i11.querySelectorAll("text tspan"), (t12) => {
                r10 += Number(t12.getAttribute("dy"));
              });
              let a10 = eN.createElementNS(eR, "tspan");
              a10.textContent = "\u200B", eF(a10, { x: Number(e10.getAttribute("x")), dy: -r10 }), t11.appendChild(a10), i11.insertBefore(t11, i11.firstChild);
            }
          }
          attr(t10, e10, i10, s10) {
            let { element: o10 } = this, r10 = e7.symbolCustomAttribs, a10, n10, h10 = this, l2;
            return "string" == typeof t10 && void 0 !== e10 && (a10 = t10, (t10 = {})[a10] = e10), "string" == typeof t10 ? h10 = (this[t10 + "Getter"] || this._defaultGetter).call(this, t10, o10) : (e2(t10, function(e11, i11) {
              l2 = false, s10 || eD(this, i11), this.symbolName && -1 !== r10.indexOf(i11) && (n10 || (this.symbolAttr(t10), n10 = true), l2 = true), this.rotation && ("x" === i11 || "y" === i11) && (this.doTransform = true), l2 || (this[i11 + "Setter"] || this._defaultSetter).call(this, e11, i11, o10);
            }, this), this.afterSetters()), i10 && i10.call(this), h10;
          }
          clip(t10) {
            if (t10 && !t10.clipPath) {
              let e10 = e8() + "-", i10 = this.renderer.createElement("clipPath").attr({ id: e10 }).add(this.renderer.defs);
              eV(t10, { clipPath: i10, id: e10, count: 0 }), t10.add(i10);
            }
            return this.attr("clip-path", t10 ? `url(${this.renderer.url}#${t10.id})` : "none");
          }
          crisp(t10, e10) {
            e10 = Math.round(e10 || t10.strokeWidth || 0);
            let i10 = t10.x || this.x || 0, s10 = t10.y || this.y || 0, o10 = (t10.width || this.width || 0) + i10, r10 = (t10.height || this.height || 0) + s10, a10 = eY(i10, e10), n10 = eY(s10, e10);
            return eV(t10, { x: a10, y: n10, width: eY(o10, e10) - a10, height: eY(r10, e10) - n10 }), eU(t10.strokeWidth) && (t10.strokeWidth = e10), t10;
          }
          complexColor(t10, e10, i10) {
            let s10 = this.renderer, o10, r10, a10, n10, h10, l2, d2, c2, p2, g2, u2 = [], f2;
            eZ(this.renderer, "complexColor", { args: arguments }, function() {
              if (t10.radialGradient ? r10 = "radialGradient" : t10.linearGradient && (r10 = "linearGradient"), r10) {
                if (a10 = t10[r10], h10 = s10.gradients, l2 = t10.stops, p2 = i10.radialReference, eq(a10) && (t10[r10] = a10 = { x1: a10[0], y1: a10[1], x2: a10[2], y2: a10[3], gradientUnits: "userSpaceOnUse" }), "radialGradient" === r10 && p2 && !eU(a10.gradientUnits) && (n10 = a10, a10 = e1(a10, s10.getRadialAttr(p2, n10), { gradientUnits: "userSpaceOnUse" })), e2(a10, function(t11, e11) {
                  "id" !== e11 && u2.push(e11, t11);
                }), e2(l2, function(t11) {
                  u2.push(t11);
                }), h10[u2 = u2.join(",")]) g2 = h10[u2].attr("id");
                else {
                  a10.id = g2 = e8();
                  let t11 = h10[u2] = s10.createElement(r10).attr(a10).add(s10.defs);
                  t11.radAttr = n10, t11.stops = [], l2.forEach(function(e11) {
                    0 === e11[1].indexOf("rgba") ? (d2 = (o10 = tG.parse(e11[1])).get("rgb"), c2 = o10.get("a")) : (d2 = e11[1], c2 = 1);
                    let i11 = s10.createElement("stop").attr({ offset: e11[0], "stop-color": d2, "stop-opacity": c2 }).add(t11);
                    t11.stops.push(i11);
                  });
                }
                f2 = "url(" + s10.url + "#" + g2 + ")", i10.setAttribute(e10, f2), i10.gradient = u2, t10.toString = function() {
                  return f2;
                };
              }
            });
          }
          css(t10) {
            let e10 = this.styles, i10 = {}, s10 = this.element, o10, r10 = !e10;
            if (e10 && e2(t10, function(t11, s11) {
              e10 && e10[s11] !== t11 && (i10[s11] = t11, r10 = true);
            }), r10) {
              e10 && (t10 = eV(e10, i10)), null === t10.width || "auto" === t10.width ? delete this.textWidth : "text" === s10.nodeName.toLowerCase() && t10.width && (o10 = this.textWidth = e5(t10.width)), eV(this.styles, t10), o10 && !ez && this.renderer.forExport && delete t10.width;
              let r11 = eH && t10.fontSize || null;
              r11 && (eJ(r11) || /^\d+$/.test(r11)) && (t10.fontSize += "px");
              let a10 = e1(t10);
              s10.namespaceURI === this.SVG_NS && (["textOutline", "textOverflow", "whiteSpace", "width"].forEach((t11) => a10 && delete a10[t11]), a10.color && (a10.fill = a10.color, delete a10.color)), ej(s10, a10);
            }
            return this.added && ("text" === this.element.nodeName && this.renderer.buildText(this), t10.textOutline && this.applyTextOutline(t10.textOutline)), this;
          }
          dashstyleSetter(t10) {
            let e10, i10 = this["stroke-width"];
            if ("inherit" === i10 && (i10 = 1), t10) {
              let s10 = (t10 = t10.toLowerCase()).replace("shortdashdotdot", "3,1,1,1,1,1,").replace("shortdashdot", "3,1,1,1").replace("shortdot", "1,1,").replace("shortdash", "3,1,").replace("longdash", "8,3,").replace(/dot/g, "1,3,").replace("dash", "4,3,").replace(/,$/, "").split(",");
              for (e10 = s10.length; e10--; ) s10[e10] = "" + e5(s10[e10]) * e3(i10, NaN);
              t10 = s10.join(",").replace(/NaN/g, "none"), this.element.setAttribute("stroke-dasharray", t10);
            }
          }
          destroy() {
            let t10 = this, { element: e10 = {}, renderer: i10, stops: s10 } = t10, o10 = e10.ownerSVGElement, r10 = "SPAN" === e10.nodeName && t10.parentGroup || void 0, a10;
            if (e10.onclick = e10.onmouseout = e10.onmouseover = e10.onmousemove = e10.point = null, eD(t10), t10.clipPath && o10) {
              let e11 = t10.clipPath;
              [].forEach.call(o10.querySelectorAll("[clip-path],[CLIP-PATH]"), function(t11) {
                t11.getAttribute("clip-path").indexOf(e11.element.id) > -1 && t11.removeAttribute("clip-path");
              }), t10.clipPath = e11.destroy();
            }
            if (s10) {
              for (let t11 of s10) t11.destroy();
              s10.length = 0;
            }
            for (t10.safeRemoveChild(e10); (r10 == null ? void 0 : r10.div) && 0 === r10.div.childNodes.length; ) a10 = r10.parentGroup, t10.safeRemoveChild(r10.div), delete r10.div, r10 = a10;
            t10.alignOptions && e$(i10.alignedObjects, t10), e2(t10, (e11, i11) => {
              var _a2, _b2, _c2;
              (((_a2 = t10[i11]) == null ? void 0 : _a2.parentGroup) === t10 || -1 !== ["connector", "foreignObject"].indexOf(i11)) && ((_c2 = (_b2 = t10[i11]) == null ? void 0 : _b2.destroy) == null ? void 0 : _c2.call(_b2)), delete t10[i11];
            });
          }
          dSetter(t10, e10, i10) {
            eq(t10) && ("string" == typeof t10[0] && (t10 = this.renderer.pathToSegments(t10)), this.pathArray = t10, t10 = t10.reduce((t11, e11, i11) => (e11 == null ? void 0 : e11.join) ? (i11 ? t11 + " " : "") + e11.join(" ") : (e11 || "").toString(), "")), /(NaN| {2}|^$)/.test(t10) && (t10 = "M 0 0"), this[e10] !== t10 && (i10.setAttribute(e10, t10), this[e10] = t10);
          }
          fillSetter(t10, e10, i10) {
            "string" == typeof t10 ? i10.setAttribute(e10, t10) : t10 && this.complexColor(t10, e10, i10);
          }
          hrefSetter(t10, e10, i10) {
            i10.setAttributeNS("http://www.w3.org/1999/xlink", e10, t10);
          }
          getBBox(t10, e10) {
            let i10, s10, o10, { element: r10, renderer: a10, styles: n10, textStr: h10 } = this, { cache: l2, cacheKeys: d2 } = a10, c2 = r10.namespaceURI === this.SVG_NS, p2 = e3(e10, this.rotation, 0), g2 = a10.styledMode ? r10 && e7.prototype.getStyle.call(r10, "font-size") : n10.fontSize, u2 = this.getBBoxCacheKey([a10.rootFontSize, this.textWidth, this.alignValue, n10.fontWeight, n10.lineClamp, n10.textOverflow, g2, p2]);
            if (u2 && !t10 && (i10 = l2[u2]), !i10 || i10.polygon) {
              if (c2 || a10.forExport) {
                try {
                  o10 = this.fakeTS && function(t12) {
                    let e11 = r10.querySelector(".highcharts-text-outline");
                    e11 && ej(e11, { display: t12 });
                  }, eK(o10) && o10("none"), i10 = r10.getBBox ? eV({}, r10.getBBox()) : { width: r10.offsetWidth, height: r10.offsetHeight, x: 0, y: 0 }, eK(o10) && o10("");
                } catch (e11) {
                }
                (!i10 || i10.width < 0) && (i10 = { x: 0, y: 0, width: 0, height: 0 });
              } else i10 = this.htmlGetBBox();
              s10 = i10.height, c2 && (i10.height = s10 = { "11px,17": 14, "13px,20": 16 }[`${g2 || ""},${Math.round(s10)}`] || s10), p2 && (i10 = this.getRotatedBox(i10, p2));
              let t11 = { bBox: i10 };
              eZ(this, "afterGetBBox", t11), i10 = t11.bBox;
            }
            if (u2 && ("" === h10 || i10.height > 0)) {
              for (; d2.length > 250; ) delete l2[d2.shift()];
              l2[u2] || d2.push(u2), l2[u2] = i10;
            }
            return i10;
          }
          getBBoxCacheKey(t10) {
            if (eU(this.textStr)) {
              let e10 = "" + this.textStr;
              return -1 === e10.indexOf("<") && (e10 = e10.replace(/\d/g, "0")), [e10, ...t10].join(",");
            }
          }
          getRotatedBox(t10, e10) {
            let { x: i10, y: s10, width: o10, height: r10 } = t10, { alignValue: a10, translateY: n10, rotationOriginX: h10 = 0, rotationOriginY: l2 = 0 } = this, d2 = e_(a10), c2 = Number(this.element.getAttribute("y") || 0) - (n10 ? 0 : s10), p2 = e10 * eB, g2 = (e10 - 90) * eB, u2 = Math.cos(p2), f2 = Math.sin(p2), m2 = o10 * u2, x2 = o10 * f2, y2 = Math.cos(g2), b2 = Math.sin(g2), [[v2, k2], [w2, M2]] = [h10, l2].map((t11) => [t11 - t11 * u2, t11 * f2]), S2 = i10 + d2 * (o10 - m2) + v2 + M2 + c2 * y2, T2 = S2 + m2, C2 = T2 - r10 * y2, A2 = C2 - m2, P2 = s10 + c2 - d2 * x2 - k2 + w2 + c2 * b2, L2 = P2 + x2, O2 = L2 - r10 * b2, E2 = O2 - x2, I2 = Math.min(S2, T2, C2, A2), D2 = Math.min(P2, L2, O2, E2), B2 = Math.max(S2, T2, C2, A2) - I2, N2 = Math.max(P2, L2, O2, E2) - D2;
            return { x: I2, y: D2, width: B2, height: N2, polygon: [[S2, P2], [T2, L2], [C2, O2], [A2, E2]] };
          }
          getStyle(t10) {
            return eW.getComputedStyle(this.element || this, "").getPropertyValue(t10);
          }
          hasClass(t10) {
            return -1 !== ("" + this.attr("class")).split(" ").indexOf(t10);
          }
          hide() {
            return this.attr({ visibility: "hidden" });
          }
          htmlGetBBox() {
            return { height: 0, width: 0, x: 0, y: 0 };
          }
          constructor(t10, e10) {
            this.onEvents = {}, this.opacity = 1, this.SVG_NS = eR, this.element = "span" === e10 || "body" === e10 ? eG(e10) : eN.createElementNS(this.SVG_NS, e10), this.renderer = t10, this.styles = {}, eZ(this, "afterInit");
          }
          on(t10, e10) {
            let { onEvents: i10 } = this;
            return i10[t10] && i10[t10](), i10[t10] = eX(this.element, t10, e10), this;
          }
          opacitySetter(t10, e10, i10) {
            let s10 = Number(Number(t10).toFixed(3));
            this.opacity = s10, i10.setAttribute(e10, s10);
          }
          reAlign() {
            var _a2;
            ((_a2 = this.alignOptions) == null ? void 0 : _a2.width) && "left" !== this.alignOptions.align && (this.alignOptions.width = this.getBBox().width, this.placed = false, this.align());
          }
          removeClass(t10) {
            return this.attr("class", ("" + this.attr("class")).replace(e0(t10) ? RegExp(`(^| )${t10}( |$)`) : t10, " ").replace(/ +/g, " ").trim());
          }
          removeTextOutline() {
            let t10 = this.element.querySelector("tspan.highcharts-text-outline");
            t10 && this.safeRemoveChild(t10);
          }
          safeRemoveChild(t10) {
            let e10 = t10.parentNode;
            e10 && e10.removeChild(t10);
          }
          setRadialReference(t10) {
            let e10 = this.element.gradient && this.renderer.gradients[this.element.gradient] || void 0;
            return this.element.radialReference = t10, (e10 == null ? void 0 : e10.radAttr) && e10.animate(this.renderer.getRadialAttr(t10, e10.radAttr)), this;
          }
          shadow(t10) {
            var _a2;
            let { renderer: e10 } = this, i10 = e1(((_a2 = this.parentGroup) == null ? void 0 : _a2.rotation) === 90 ? { offsetX: -1, offsetY: -1 } : {}, eQ(t10) ? t10 : {}), s10 = e10.shadowDefinition(i10);
            return this.attr({ filter: t10 ? `url(${e10.url}#${s10})` : "none" });
          }
          show(t10 = true) {
            return this.attr({ visibility: t10 ? "inherit" : "visible" });
          }
          "stroke-widthSetter"(t10, e10, i10) {
            this[e10] = t10, i10.setAttribute(e10, t10);
          }
          strokeWidth() {
            if (!this.renderer.styledMode) return this["stroke-width"] || 0;
            let t10 = this.getStyle("stroke-width"), e10 = 0, i10;
            return /px$/.test(t10) ? e10 = e5(t10) : "" !== t10 && (eF(i10 = eN.createElementNS(eR, "rect"), { width: t10, "stroke-width": 0 }), this.element.parentNode.appendChild(i10), e10 = i10.getBBox().width, i10.parentNode.removeChild(i10)), e10;
          }
          symbolAttr(t10) {
            let e10 = this;
            e7.symbolCustomAttribs.forEach(function(i10) {
              e10[i10] = e3(t10[i10], e10[i10]);
            }), e10.attr({ d: e10.renderer.symbols[e10.symbolName](e10.x, e10.y, e10.width, e10.height, e10) });
          }
          textSetter(t10) {
            t10 !== this.textStr && (delete this.textPxLength, this.textStr = t10, this.added && this.renderer.buildText(this), this.reAlign());
          }
          titleSetter(t10) {
            let e10 = this.element, i10 = e10.getElementsByTagName("title")[0] || eN.createElementNS(this.SVG_NS, "title");
            e10.insertBefore ? e10.insertBefore(i10, e10.firstChild) : e10.appendChild(i10), i10.textContent = e9(e3(t10, ""), [/<[^>]*>/g, ""]).replace(/&lt;/g, "<").replace(/&gt;/g, ">");
          }
          toFront() {
            let t10 = this.element;
            return t10.parentNode.appendChild(t10), this;
          }
          translate(t10, e10) {
            return this.attr({ translateX: t10, translateY: e10 });
          }
          updateTransform(t10 = "transform") {
            var _a2, _b2, _c2, _d2;
            let { element: e10, foreignObject: i10, matrix: s10, padding: o10, rotation: r10 = 0, rotationOriginX: a10, rotationOriginY: n10, scaleX: h10, scaleY: l2, text: d2, translateX: c2 = 0, translateY: p2 = 0 } = this, g2 = [`translate(${c2},${p2})`];
            eU(s10) && g2.push("matrix(" + s10.join(",") + ")"), r10 && (g2.push("rotate(" + r10 + " " + ((_b2 = (_a2 = a10 != null ? a10 : e10.getAttribute("x")) != null ? _a2 : this.x) != null ? _b2 : 0) + " " + ((_d2 = (_c2 = n10 != null ? n10 : e10.getAttribute("y")) != null ? _c2 : this.y) != null ? _d2 : 0) + ")"), (d2 == null ? void 0 : d2.element.tagName) !== "SPAN" || (d2 == null ? void 0 : d2.foreignObject) || d2.attr({ rotation: r10, rotationOriginX: (a10 || 0) - o10, rotationOriginY: (n10 || 0) - o10 })), (eU(h10) || eU(l2)) && g2.push(`scale(${h10 != null ? h10 : 1} ${l2 != null ? l2 : 1})`), g2.length && !(d2 || this).textPath && ((i10 == null ? void 0 : i10.element) || e10).setAttribute(t10, g2.join(" "));
          }
          visibilitySetter(t10, e10, i10) {
            "inherit" === t10 ? i10.removeAttribute(e10) : this[e10] !== t10 && i10.setAttribute(e10, t10), this[e10] = t10;
          }
          xGetter(t10) {
            return "circle" === this.element.nodeName && ("x" === t10 ? t10 = "cx" : "y" === t10 && (t10 = "cy")), this._defaultGetter(t10);
          }
          zIndexSetter(t10, e10) {
            let i10 = this.renderer, s10 = this.parentGroup, o10 = (s10 || i10).element || i10.box, r10 = this.element, a10 = o10 === i10.box, n10, h10, l2, d2 = false, c2, p2 = this.added, g2;
            if (eU(t10) ? (r10.setAttribute("data-z-index", t10), t10 *= 1, this[e10] === t10 && (p2 = false)) : eU(this[e10]) && r10.removeAttribute("data-z-index"), this[e10] = t10, p2) {
              for ((t10 = this.zIndex) && s10 && (s10.handleZ = true), g2 = (n10 = o10.childNodes).length - 1; g2 >= 0 && !d2; g2--) c2 = !eU(l2 = (h10 = n10[g2]).getAttribute("data-z-index")), h10 !== r10 && (t10 < 0 && c2 && !a10 && !g2 ? (o10.insertBefore(r10, n10[g2]), d2 = true) : (e5(l2) <= t10 || c2 && (!eU(t10) || t10 >= 0)) && (o10.insertBefore(r10, n10[g2 + 1]), d2 = true));
              d2 || (o10.insertBefore(r10, n10[3 * !!a10]), d2 = true);
            }
            return d2;
          }
        }
        e7.symbolCustomAttribs = ["anchorX", "anchorY", "clockwise", "end", "height", "innerR", "r", "start", "width", "x", "y"], e7.prototype.strokeSetter = e7.prototype.fillSetter, e7.prototype.yGetter = e7.prototype.xGetter, e7.prototype.matrixSetter = e7.prototype.rotationOriginXSetter = e7.prototype.rotationOriginYSetter = e7.prototype.rotationSetter = e7.prototype.scaleXSetter = e7.prototype.scaleYSetter = e7.prototype.translateXSetter = e7.prototype.translateYSetter = e7.prototype.verticalAlignSetter = function(t10, e10) {
          this[e10] = t10, this.doTransform = true;
        };
        let it = e7, { defined: ie, extend: ii, getAlignFactor: is, isNumber: io, merge: ir, pick: ia, removeEvent: ih } = tn;
        class il extends it {
          constructor(t10, e10, i10, s10, o10, r10, a10, n10, h10, l2) {
            let d2;
            super(t10, "g"), this.paddingLeftSetter = this.paddingSetter, this.paddingRightSetter = this.paddingSetter, this.doUpdate = false, this.textStr = e10, this.x = i10, this.y = s10, this.anchorX = r10, this.anchorY = a10, this.baseline = h10, this.className = l2, this.addClass("button" === l2 ? "highcharts-no-tooltip" : "highcharts-label"), l2 && this.addClass("highcharts-" + l2), this.text = t10.text(void 0, 0, 0, n10).attr({ zIndex: 1 }), "string" == typeof o10 && ((d2 = /^url\((.*?)\)$/.test(o10)) || this.renderer.symbols[o10]) && (this.symbolKey = o10), this.bBox = il.emptyBBox, this.padding = 3, this.baselineOffset = 0, this.needsBox = t10.styledMode || d2, this.deferredAttr = {}, this.alignFactor = 0;
          }
          alignSetter(t10) {
            let e10 = is(t10);
            this.textAlign = t10, e10 !== this.alignFactor && (this.alignFactor = e10, this.bBox && io(this.xSetting) && this.attr({ x: this.xSetting }), this.updateTextPadding());
          }
          anchorXSetter(t10, e10) {
            this.anchorX = t10, this.boxAttr(e10, Math.round(t10) - this.getCrispAdjust() - this.xSetting);
          }
          anchorYSetter(t10, e10) {
            this.anchorY = t10, this.boxAttr(e10, t10 - this.ySetting);
          }
          boxAttr(t10, e10) {
            this.box ? this.box.attr(t10, e10) : this.deferredAttr[t10] = e10;
          }
          css(t10) {
            if (t10) {
              let e10 = {};
              t10 = ir(t10), il.textProps.forEach((i10) => {
                void 0 !== t10[i10] && (e10[i10] = t10[i10], delete t10[i10]);
              }), this.text.css(e10), "fontSize" in e10 || "fontWeight" in e10 || "width" in e10 ? this.updateTextPadding() : "textOverflow" in e10 && this.updateBoxSize();
            }
            return it.prototype.css.call(this, t10);
          }
          destroy() {
            ih(this.element, "mouseenter"), ih(this.element, "mouseleave"), this.text && this.text.destroy(), this.box && (this.box = this.box.destroy()), it.prototype.destroy.call(this);
          }
          fillSetter(t10, e10) {
            t10 && (this.needsBox = true), this.fill = t10, this.boxAttr(e10, t10);
          }
          getBBox(t10, e10) {
            (this.textStr && 0 === this.bBox.width && 0 === this.bBox.height || this.rotation) && this.updateBoxSize();
            let { padding: i10, height: s10 = 0, translateX: o10 = 0, translateY: r10 = 0, width: a10 = 0 } = this, n10 = ia(this.paddingLeft, i10), h10 = e10 != null ? e10 : this.rotation || 0, l2 = { width: a10, height: s10, x: o10 + this.bBox.x - n10, y: r10 + this.bBox.y - i10 + this.baselineOffset };
            return h10 && (l2 = this.getRotatedBox(l2, h10)), l2;
          }
          getCrispAdjust() {
            return (this.renderer.styledMode && this.box ? this.box.strokeWidth() : this["stroke-width"] ? parseInt(this["stroke-width"], 10) : 0) % 2 / 2;
          }
          heightSetter(t10) {
            this.heightSetting = t10, this.doUpdate = true;
          }
          afterSetters() {
            super.afterSetters(), this.doUpdate && (this.updateBoxSize(), this.doUpdate = false);
          }
          onAdd() {
            this.text.add(this), this.attr({ text: ia(this.textStr, ""), x: this.x || 0, y: this.y || 0 }), this.box && ie(this.anchorX) && this.attr({ anchorX: this.anchorX, anchorY: this.anchorY });
          }
          paddingSetter(t10, e10) {
            io(t10) ? t10 !== this[e10] && (this[e10] = t10, this.updateTextPadding()) : this[e10] = void 0;
          }
          rSetter(t10, e10) {
            this.boxAttr(e10, t10);
          }
          strokeSetter(t10, e10) {
            this.stroke = t10, this.boxAttr(e10, t10);
          }
          "stroke-widthSetter"(t10, e10) {
            t10 && (this.needsBox = true), this["stroke-width"] = t10, this.boxAttr(e10, t10);
          }
          "text-alignSetter"(t10) {
            this.textAlign = this["text-align"] = t10, this.updateTextPadding();
          }
          textSetter(t10) {
            void 0 !== t10 && this.text.attr({ text: t10 }), this.updateTextPadding(), this.reAlign();
          }
          updateBoxSize() {
            let t10, e10 = this.text, i10 = {}, s10 = this.padding, o10 = this.bBox = (!io(this.widthSetting) || !io(this.heightSetting) || this.textAlign) && ie(e10.textStr) ? e10.getBBox(void 0, 0) : il.emptyBBox;
            this.width = this.getPaddedWidth(), this.height = (this.heightSetting || o10.height || 0) + 2 * s10;
            let r10 = this.renderer.fontMetrics(e10);
            if (this.baselineOffset = s10 + Math.min((this.text.firstLineMetrics || r10).b, o10.height || 1 / 0), this.heightSetting && (this.baselineOffset += (this.heightSetting - r10.h) / 2), this.needsBox && !e10.textPath) {
              if (!this.box) {
                let t11 = this.box = this.symbolKey ? this.renderer.symbol(this.symbolKey) : this.renderer.rect();
                t11.addClass(("button" === this.className ? "" : "highcharts-label-box") + (this.className ? " highcharts-" + this.className + "-box" : "")), t11.add(this);
              }
              i10.x = t10 = this.getCrispAdjust(), i10.y = (this.baseline ? -this.baselineOffset : 0) + t10, i10.width = Math.round(this.width), i10.height = Math.round(this.height), this.box.attr(ii(i10, this.deferredAttr)), this.deferredAttr = {};
            }
          }
          updateTextPadding() {
            var _a2, _b2;
            let t10 = this.text, e10 = t10.styles.textAlign || this.textAlign;
            if (!t10.textPath) {
              this.updateBoxSize();
              let i10 = this.baseline ? 0 : this.baselineOffset, s10 = ((_a2 = this.paddingLeft) != null ? _a2 : this.padding) + is(e10) * ((_b2 = this.widthSetting) != null ? _b2 : this.bBox.width);
              (s10 !== t10.x || i10 !== t10.y) && (t10.attr({ align: e10, x: s10 }), void 0 !== i10 && t10.attr("y", i10)), t10.x = s10, t10.y = i10;
            }
          }
          widthSetter(t10) {
            this.widthSetting = io(t10) ? t10 : void 0, this.doUpdate = true;
          }
          getPaddedWidth() {
            let t10 = this.padding, e10 = ia(this.paddingLeft, t10), i10 = ia(this.paddingRight, t10);
            return (this.widthSetting || this.bBox.width || 0) + e10 + i10;
          }
          xSetter(t10) {
            this.x = t10, this.alignFactor && (t10 -= this.alignFactor * this.getPaddedWidth(), this["forceAnimate:x"] = true), this.anchorX && (this["forceAnimate:anchorX"] = true), this.xSetting = Math.round(t10), this.attr("translateX", this.xSetting);
          }
          ySetter(t10) {
            this.anchorY && (this["forceAnimate:anchorY"] = true), this.ySetting = this.y = Math.round(t10), this.attr("translateY", this.ySetting);
          }
        }
        il.emptyBBox = { width: 0, height: 0, x: 0, y: 0 }, il.textProps = ["color", "direction", "fontFamily", "fontSize", "fontStyle", "fontWeight", "lineClamp", "lineHeight", "textAlign", "textDecoration", "textOutline", "textOverflow", "whiteSpace", "width"];
        let { defined: id, isNumber: ic, pick: ip } = tn;
        function ig(t10, e10, i10, s10, o10) {
          let r10 = [];
          if (o10) {
            let a10 = o10.start || 0, n10 = o10.end || 0, h10 = ip(o10.r, i10), l2 = ip(o10.r, s10 || i10), d2 = 2e-4 / (o10.borderRadius ? 1 : Math.max(h10, 1)), c2 = Math.abs(n10 - a10 - 2 * Math.PI) < d2;
            c2 && (a10 = Math.PI / 2, n10 = 2.5 * Math.PI - d2);
            let p2 = o10.innerR, g2 = ip(o10.open, c2), u2 = Math.cos(a10), f2 = Math.sin(a10), m2 = Math.cos(n10), x2 = Math.sin(n10), y2 = ip(o10.longArc, n10 - a10 - Math.PI < d2 ? 0 : 1), b2 = ["A", h10, l2, 0, y2, ip(o10.clockwise, 1), t10 + h10 * m2, e10 + l2 * x2];
            b2.params = { start: a10, end: n10, cx: t10, cy: e10 }, r10.push(["M", t10 + h10 * u2, e10 + l2 * f2], b2), id(p2) && ((b2 = ["A", p2, p2, 0, y2, id(o10.clockwise) ? 1 - o10.clockwise : 0, t10 + p2 * u2, e10 + p2 * f2]).params = { start: n10, end: a10, cx: t10, cy: e10 }, r10.push(g2 ? ["M", t10 + p2 * m2, e10 + p2 * x2] : ["L", t10 + p2 * m2, e10 + p2 * x2], b2)), g2 || r10.push(["Z"]);
          }
          return r10;
        }
        function iu(t10, e10, i10, s10, o10) {
          return (o10 == null ? void 0 : o10.r) ? im(t10, e10, i10, s10, o10) : [["M", t10, e10], ["L", t10 + i10, e10], ["L", t10 + i10, e10 + s10], ["L", t10, e10 + s10], ["Z"]];
        }
        function im(t10, e10, i10, s10, o10) {
          let r10 = (o10 == null ? void 0 : o10.r) || 0;
          return [["M", t10 + r10, e10], ["L", t10 + i10 - r10, e10], ["A", r10, r10, 0, 0, 1, t10 + i10, e10 + r10], ["L", t10 + i10, e10 + s10 - r10], ["A", r10, r10, 0, 0, 1, t10 + i10 - r10, e10 + s10], ["L", t10 + r10, e10 + s10], ["A", r10, r10, 0, 0, 1, t10, e10 + s10 - r10], ["L", t10, e10 + r10], ["A", r10, r10, 0, 0, 1, t10 + r10, e10], ["Z"]];
        }
        let ix = { arc: ig, callout: function(t10, e10, i10, s10, o10) {
          let r10 = Math.min((o10 == null ? void 0 : o10.r) || 0, i10, s10), a10 = r10 + 6, n10 = o10 == null ? void 0 : o10.anchorX, h10 = (o10 == null ? void 0 : o10.anchorY) || 0, l2 = im(t10, e10, i10, s10, { r: r10 });
          if (!ic(n10) || n10 < i10 && n10 > 0 && h10 < s10 && h10 > 0) return l2;
          if (t10 + n10 > i10 - a10) if (h10 > e10 + a10 && h10 < e10 + s10 - a10) l2.splice(3, 1, ["L", t10 + i10, h10 - 6], ["L", t10 + i10 + 6, h10], ["L", t10 + i10, h10 + 6], ["L", t10 + i10, e10 + s10 - r10]);
          else if (n10 < i10) {
            let o11 = h10 < e10 + a10, d2 = o11 ? e10 : e10 + s10;
            l2.splice(o11 ? 2 : 5, 0, ["L", n10, h10], ["L", t10 + i10 - r10, d2]);
          } else l2.splice(3, 1, ["L", t10 + i10, s10 / 2], ["L", n10, h10], ["L", t10 + i10, s10 / 2], ["L", t10 + i10, e10 + s10 - r10]);
          else if (t10 + n10 < a10) if (h10 > e10 + a10 && h10 < e10 + s10 - a10) l2.splice(7, 1, ["L", t10, h10 + 6], ["L", t10 - 6, h10], ["L", t10, h10 - 6], ["L", t10, e10 + r10]);
          else if (n10 > 0) {
            let i11 = h10 < e10 + a10, o11 = i11 ? e10 : e10 + s10;
            l2.splice(i11 ? 1 : 6, 0, ["L", n10, h10], ["L", t10 + r10, o11]);
          } else l2.splice(7, 1, ["L", t10, s10 / 2], ["L", n10, h10], ["L", t10, s10 / 2], ["L", t10, e10 + r10]);
          else h10 > s10 && n10 < i10 - a10 ? l2.splice(5, 1, ["L", n10 + 6, e10 + s10], ["L", n10, e10 + s10 + 6], ["L", n10 - 6, e10 + s10], ["L", t10 + r10, e10 + s10]) : h10 < 0 && n10 > a10 && l2.splice(1, 1, ["L", n10 - 6, e10], ["L", n10, e10 - 6], ["L", n10 + 6, e10], ["L", i10 - r10, e10]);
          return l2;
        }, circle: function(t10, e10, i10, s10) {
          return ig(t10 + i10 / 2, e10 + s10 / 2, i10 / 2, s10 / 2, { start: 0.5 * Math.PI, end: 2.5 * Math.PI, open: false });
        }, diamond: function(t10, e10, i10, s10) {
          return [["M", t10 + i10 / 2, e10], ["L", t10 + i10, e10 + s10 / 2], ["L", t10 + i10 / 2, e10 + s10], ["L", t10, e10 + s10 / 2], ["Z"]];
        }, rect: iu, roundedRect: im, square: iu, triangle: function(t10, e10, i10, s10) {
          return [["M", t10 + i10 / 2, e10], ["L", t10 + i10, e10 + s10], ["L", t10, e10 + s10], ["Z"]];
        }, "triangle-down": function(t10, e10, i10, s10) {
          return [["M", t10, e10], ["L", t10 + i10, e10], ["L", t10 + i10 / 2, e10 + s10], ["Z"]];
        } }, { doc: iy, SVG_NS: ib, win: iv } = z, { attr: ik, extend: iw, fireEvent: iM, isString: iS, objectEach: iT, pick: iC } = tn, iA = (t10, e10) => t10.substring(0, e10) + "\u2026", iP = class {
          constructor(t10) {
            const e10 = t10.styles;
            this.renderer = t10.renderer, this.svgElement = t10, this.width = t10.textWidth, this.textLineHeight = e10 == null ? void 0 : e10.lineHeight, this.textOutline = e10 == null ? void 0 : e10.textOutline, this.ellipsis = (e10 == null ? void 0 : e10.textOverflow) === "ellipsis", this.lineClamp = e10 == null ? void 0 : e10.lineClamp, this.noWrap = (e10 == null ? void 0 : e10.whiteSpace) === "nowrap";
          }
          buildSVG() {
            let t10 = this.svgElement, e10 = t10.element, i10 = t10.renderer, s10 = iC(t10.textStr, "").toString(), o10 = -1 !== s10.indexOf("<"), r10 = e10.childNodes, a10 = !t10.added && i10.box, n10 = [s10, this.ellipsis, this.noWrap, this.textLineHeight, this.textOutline, t10.getStyle("font-size"), t10.styles.lineClamp, this.width].join(",");
            if (n10 !== t10.textCache) {
              t10.textCache = n10, delete t10.actualWidth;
              for (let t11 = r10.length; t11--; ) e10.removeChild(r10[t11]);
              if (o10 || this.ellipsis || this.width || t10.textPath || -1 !== s10.indexOf(" ") && (!this.noWrap || /<br.*?>/g.test(s10))) {
                if ("" !== s10) {
                  a10 && a10.appendChild(e10);
                  let i11 = new eh(s10);
                  this.modifyTree(i11.nodes), i11.addToDOM(e10), this.modifyDOM(), this.ellipsis && -1 !== (e10.textContent || "").indexOf("\u2026") && t10.attr("title", this.unescapeEntities(t10.textStr || "", ["&lt;", "&gt;"])), a10 && a10.removeChild(e10);
                }
              } else e10.appendChild(iy.createTextNode(this.unescapeEntities(s10)));
              iS(this.textOutline) && t10.applyTextOutline && t10.applyTextOutline(this.textOutline);
            }
          }
          modifyDOM() {
            let t10, e10 = this.svgElement, i10 = ik(e10.element, "x");
            for (e10.firstLineMetrics = void 0; t10 = e10.element.firstChild; ) if (/^[\s\u200B]*$/.test(t10.textContent || " ")) e10.element.removeChild(t10);
            else break;
            [].forEach.call(e10.element.querySelectorAll("tspan.highcharts-br"), (t11, s11) => {
              t11.nextSibling && t11.previousSibling && (0 === s11 && 1 === t11.previousSibling.nodeType && (e10.firstLineMetrics = e10.renderer.fontMetrics(t11.previousSibling)), ik(t11, { dy: this.getLineHeight(t11.nextSibling), x: i10 }));
            });
            let s10 = this.width || 0;
            if (!s10) return;
            let o10 = (t11, o11) => {
              var _a2;
              let r11 = t11.textContent || "", a10 = r11.replace(/([^\^])-/g, "$1- ").split(" "), n10 = !this.noWrap && (a10.length > 1 || e10.element.childNodes.length > 1), h10 = this.getLineHeight(o11), l2 = Math.max(0, s10 - 0.8 * h10), d2 = 0, c2 = e10.actualWidth;
              if (n10) {
                let r12 = [], n11 = [];
                for (; o11.firstChild && o11.firstChild !== t11; ) n11.push(o11.firstChild), o11.removeChild(o11.firstChild);
                for (; a10.length; ) if (a10.length && !this.noWrap && d2 > 0 && (r12.push(t11.textContent || ""), t11.textContent = a10.join(" ").replace(/- /g, "-")), this.truncate(t11, void 0, a10, 0 === d2 && c2 || 0, s10, l2, (t12, e11) => a10.slice(0, e11).join(" ").replace(/- /g, "-")), c2 = e10.actualWidth, d2++, this.lineClamp && d2 >= this.lineClamp) {
                  a10.length && (this.truncate(t11, t11.textContent || "", void 0, 0, s10, l2, iA), t11.textContent = ((_a2 = t11.textContent) == null ? void 0 : _a2.replace("\u2026", "")) + "\u2026");
                  break;
                }
                n11.forEach((e11) => {
                  o11.insertBefore(e11, t11);
                }), r12.forEach((e11) => {
                  o11.insertBefore(iy.createTextNode(e11), t11);
                  let s11 = iy.createElementNS(ib, "tspan");
                  s11.textContent = "\u200B", ik(s11, { dy: h10, x: i10 }), o11.insertBefore(s11, t11);
                });
              } else this.ellipsis && r11 && this.truncate(t11, r11, void 0, 0, s10, l2, iA);
            }, r10 = (t11) => {
              [].slice.call(t11.childNodes).forEach((i11) => {
                i11.nodeType === iv.Node.TEXT_NODE ? o10(i11, t11) : (-1 !== i11.className.baseVal.indexOf("highcharts-br") && (e10.actualWidth = 0), r10(i11));
              });
            };
            r10(e10.element);
          }
          getLineHeight(t10) {
            let e10 = t10.nodeType === iv.Node.TEXT_NODE ? t10.parentElement : t10;
            return this.textLineHeight ? parseInt(this.textLineHeight.toString(), 10) : this.renderer.fontMetrics(e10 || this.svgElement.element).h;
          }
          modifyTree(t10) {
            let e10 = (i10, s10) => {
              let { attributes: o10 = {}, children: r10, style: a10 = {}, tagName: n10 } = i10, h10 = this.renderer.styledMode;
              if ("b" === n10 || "strong" === n10 ? h10 ? o10.class = "highcharts-strong" : a10.fontWeight = "bold" : ("i" === n10 || "em" === n10) && (h10 ? o10.class = "highcharts-emphasized" : a10.fontStyle = "italic"), (a10 == null ? void 0 : a10.color) && (a10.fill = a10.color), "br" === n10) {
                o10.class = "highcharts-br", i10.textContent = "\u200B";
                let e11 = t10[s10 + 1];
                (e11 == null ? void 0 : e11.textContent) && (e11.textContent = e11.textContent.replace(/^ +/gm, ""));
              } else "a" === n10 && r10 && r10.some((t11) => "#text" === t11.tagName) && (i10.children = [{ children: r10, tagName: "tspan" }]);
              "#text" !== n10 && "a" !== n10 && (i10.tagName = "tspan"), iw(i10, { attributes: o10, style: a10 }), r10 && r10.filter((t11) => "#text" !== t11.tagName).forEach(e10);
            };
            t10.forEach(e10), iM(this.svgElement, "afterModifyTree", { nodes: t10 });
          }
          truncate(t10, e10, i10, s10, o10, r10, a10) {
            let n10, h10, l2 = this.svgElement, { rotation: d2 } = l2, c2 = [], p2 = i10 && !s10 ? 1 : 0, g2 = (e10 || i10 || "").length, u2 = g2;
            i10 || (o10 = r10);
            let f2 = function(e11, o11) {
              let r11 = o11 || e11, a11 = t10.parentNode;
              if (a11 && void 0 === c2[r11] && a11.getSubStringLength) try {
                c2[r11] = s10 + a11.getSubStringLength(0, i10 ? r11 + 1 : r11);
              } catch (e12) {
              }
              return c2[r11];
            };
            if (l2.rotation = 0, s10 + (h10 = f2(t10.textContent.length)) > o10) {
              for (; p2 <= g2; ) u2 = Math.ceil((p2 + g2) / 2), i10 && (n10 = a10(i10, u2)), h10 = f2(u2, n10 && n10.length - 1), p2 === g2 ? p2 = g2 + 1 : h10 > o10 ? g2 = u2 - 1 : p2 = u2;
              0 === g2 ? t10.textContent = "" : e10 && g2 === e10.length - 1 || (t10.textContent = n10 || a10(e10 || i10, u2)), this.ellipsis && h10 > o10 && this.truncate(t10, t10.textContent || "", void 0, 0, o10, r10, iA);
            }
            i10 && i10.splice(0, u2), l2.actualWidth = h10, l2.rotation = d2;
          }
          unescapeEntities(t10, e10) {
            return iT(this.renderer.escapes, function(i10, s10) {
              e10 && -1 !== e10.indexOf(i10) || (t10 = t10.toString().replace(RegExp(i10, "g"), s10));
            }), t10;
          }
        }, { defaultOptions: iL } = tD, { charts: iO, deg2rad: iE, doc: iI, isFirefox: iD, isMS: iB, isWebKit: iN, noop: iz, SVG_NS: iR, symbolSizes: iW, win: iH } = z, { addEvent: iX, attr: iF, createElement: iG, crisp: iY, css: ij, defined: iU, destroyObjectProperties: i$, extend: iV, isArray: iZ, isNumber: i_, isObject: iq, isString: iK, merge: iJ, pick: iQ, pInt: i0, replaceNested: i1, uniqueKey: i2 } = tn;
        class i3 {
          constructor(t10, e10, i10, s10, o10, r10, a10) {
            let n10, h10;
            this.x = 0, this.y = 0;
            const l2 = this.createElement("svg").attr({ version: "1.1", class: "highcharts-root" }), d2 = l2.element;
            a10 || l2.css(this.getStyle(s10 || {})), t10.appendChild(d2), iF(t10, "dir", "ltr"), -1 === t10.innerHTML.indexOf("xmlns") && iF(d2, "xmlns", this.SVG_NS), this.box = d2, this.boxWrapper = l2, this.alignedObjects = [], this.url = this.getReferenceURL(), this.createElement("desc").add().element.appendChild(iI.createTextNode("Created with Highcharts 12.5.0")), this.defs = this.createElement("defs").add(), this.allowHTML = r10, this.forExport = o10, this.styledMode = a10, this.gradients = {}, this.cache = {}, this.cacheKeys = [], this.imgCount = 0, this.rootFontSize = l2.getStyle("font-size"), this.setSize(e10, i10, false), iD && t10.getBoundingClientRect && ((n10 = function() {
              ij(t10, { left: 0, top: 0 }), h10 = t10.getBoundingClientRect(), ij(t10, { left: Math.ceil(h10.left) - h10.left + "px", top: Math.ceil(h10.top) - h10.top + "px" });
            })(), this.unSubPixelFix = iX(iH, "resize", n10));
          }
          definition(t10) {
            return new eh([t10]).addToDOM(this.defs.element);
          }
          getReferenceURL() {
            if ((iD || iN) && iI.getElementsByTagName("base").length) {
              if (!iU(e)) {
                let t10 = i2(), i10 = new eh([{ tagName: "svg", attributes: { width: 8, height: 8 }, children: [{ tagName: "defs", children: [{ tagName: "clipPath", attributes: { id: t10 }, children: [{ tagName: "rect", attributes: { width: 4, height: 4 } }] }] }, { tagName: "rect", attributes: { id: "hitme", width: 8, height: 8, "clip-path": `url(#${t10})`, fill: "rgba(0,0,0,0.001)" } }] }]).addToDOM(iI.body);
                ij(i10, { position: "fixed", top: 0, left: 0, zIndex: 9e5 });
                let s10 = iI.elementFromPoint(6, 6);
                e = (s10 == null ? void 0 : s10.id) === "hitme", iI.body.removeChild(i10);
              }
              if (e) return i1(iH.location.href.split("#")[0], [/<[^>]*>/g, ""], [/([\('\)])/g, "\\$1"], [/ /g, "%20"]);
            }
            return "";
          }
          getStyle(t10) {
            return this.style = iV({ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif', fontSize: "1rem" }, t10), this.style;
          }
          setStyle(t10) {
            this.boxWrapper.css(this.getStyle(t10));
          }
          isHidden() {
            return !this.boxWrapper.getBBox().width;
          }
          destroy() {
            let t10 = this.defs;
            return this.box = null, this.boxWrapper = this.boxWrapper.destroy(), i$(this.gradients || {}), this.gradients = null, this.defs = t10.destroy(), this.unSubPixelFix && this.unSubPixelFix(), this.alignedObjects = null, null;
          }
          createElement(t10) {
            return new this.Element(this, t10);
          }
          getRadialAttr(t10, e10) {
            return { cx: t10[0] - t10[2] / 2 + (e10.cx || 0) * t10[2], cy: t10[1] - t10[2] / 2 + (e10.cy || 0) * t10[2], r: (e10.r || 0) * t10[2] };
          }
          shadowDefinition(t10) {
            let e10 = [`highcharts-drop-shadow-${this.chartIndex}`, ...Object.keys(t10).map((e11) => `${e11}-${t10[e11]}`)].join("-").toLowerCase().replace(/[^a-z\d\-]/g, ""), i10 = iJ({ color: "#000000", offsetX: 1, offsetY: 1, opacity: 0.15, width: 5 }, t10);
            return this.defs.element.querySelector(`#${e10}`) || this.definition({ tagName: "filter", attributes: { id: e10, filterUnits: i10.filterUnits }, children: this.getShadowFilterContent(i10) }), e10;
          }
          getShadowFilterContent(t10) {
            return [{ tagName: "feDropShadow", attributes: { dx: t10.offsetX, dy: t10.offsetY, "flood-color": t10.color, "flood-opacity": Math.min(5 * t10.opacity, 1), stdDeviation: t10.width / 2 } }];
          }
          buildText(t10) {
            new iP(t10).buildSVG();
          }
          getContrast(t10) {
            if ("transparent" === t10) return "#000000";
            let e10 = tG.parse(t10).rgba, i10 = " clamp(0,calc(9e9*(0.5 - (0.2126*r + 0.7152*g + 0.0722*b))),1)";
            if (i_(e10[0]) || !tG.useColorMix) {
              let t11 = e10.map((t12) => {
                let e11 = t12 / 255;
                return e11 <= 0.04 ? e11 / 12.92 : Math.pow((e11 + 0.055) / 1.055, 2.4);
              }), i11 = 0.2126 * t11[0] + 0.7152 * t11[1] + 0.0722 * t11[2];
              return 1.05 / (i11 + 0.05) > (i11 + 0.05) / 0.05 ? "#FFFFFF" : "#000000";
            }
            return "color(from " + t10 + " srgb" + i10 + i10 + i10 + ")";
          }
          button(t10, e10, i10, s10, o10 = {}, r10, a10, n10, h10, l2) {
            let d2 = this.label(t10, e10, i10, h10, void 0, void 0, l2, void 0, "button"), c2 = this.styledMode, p2 = arguments, g2 = 0;
            o10 = iJ(iL.global.buttonTheme, o10), c2 && (delete o10.fill, delete o10.stroke, delete o10["stroke-width"]);
            let u2 = o10.states || {}, f2 = o10.style || {};
            delete o10.states, delete o10.style;
            let m2 = [eh.filterUserAttributes(o10)], x2 = [f2];
            return c2 || ["hover", "select", "disabled"].forEach((t11, e11) => {
              m2.push(iJ(m2[0], eh.filterUserAttributes(p2[e11 + 5] || u2[t11] || {}))), x2.push(m2[e11 + 1].style), delete m2[e11 + 1].style;
            }), iX(d2.element, iB ? "mouseover" : "mouseenter", function() {
              3 !== g2 && d2.setState(1);
            }), iX(d2.element, iB ? "mouseout" : "mouseleave", function() {
              3 !== g2 && d2.setState(g2);
            }), d2.setState = (t11 = 0) => {
              if (1 !== t11 && (d2.state = g2 = t11), d2.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-" + ["normal", "hover", "pressed", "disabled"][t11]), !c2) {
                d2.attr(m2[t11]);
                let e11 = x2[t11];
                iq(e11) && d2.css(e11);
              }
            }, d2.attr(m2[0]), !c2 && (d2.css(iV({ cursor: "default" }, f2)), l2 && d2.text.css({ pointerEvents: "none" })), d2.on("touchstart", (t11) => t11.stopPropagation()).on("click", function(t11) {
              3 !== g2 && (s10 == null ? void 0 : s10.call(d2, t11));
            });
          }
          crispLine(t10, e10) {
            let [i10, s10] = t10;
            return iU(i10[1]) && i10[1] === s10[1] && (i10[1] = s10[1] = iY(i10[1], e10)), iU(i10[2]) && i10[2] === s10[2] && (i10[2] = s10[2] = iY(i10[2], e10)), t10;
          }
          path(t10) {
            let e10 = this.styledMode ? {} : { fill: "none" };
            return iZ(t10) ? e10.d = t10 : iq(t10) && iV(e10, t10), this.createElement("path").attr(e10);
          }
          circle(t10, e10, i10) {
            let s10 = iq(t10) ? t10 : void 0 === t10 ? {} : { x: t10, y: e10, r: i10 }, o10 = this.createElement("circle");
            return o10.xSetter = o10.ySetter = function(t11, e11, i11) {
              i11.setAttribute("c" + e11, t11);
            }, o10.attr(s10);
          }
          arc(t10, e10, i10, s10, o10, r10) {
            let a10;
            iq(t10) ? (e10 = (a10 = t10).y, i10 = a10.r, s10 = a10.innerR, o10 = a10.start, r10 = a10.end, t10 = a10.x) : a10 = { innerR: s10, start: o10, end: r10 };
            let n10 = this.symbol("arc", t10, e10, i10, i10, a10);
            return n10.r = i10, n10;
          }
          rect(t10, e10, i10, s10, o10, r10) {
            let a10 = iq(t10) ? t10 : void 0 === t10 ? {} : { x: t10, y: e10, r: o10, width: Math.max(i10 || 0, 0), height: Math.max(s10 || 0, 0) }, n10 = this.createElement("rect");
            return this.styledMode || (void 0 !== r10 && (a10["stroke-width"] = r10, iV(a10, n10.crisp(a10))), a10.fill = "none"), n10.rSetter = function(t11, e11, i11) {
              n10.r = t11, iF(i11, { rx: t11, ry: t11 });
            }, n10.rGetter = function() {
              return n10.r || 0;
            }, n10.attr(a10);
          }
          roundedRect(t10) {
            return this.symbol("roundedRect").attr(t10);
          }
          setSize(t10, e10, i10) {
            this.width = t10, this.height = e10, this.boxWrapper.animate({ width: t10, height: e10 }, { step: function() {
              this.attr({ viewBox: "0 0 " + this.attr("width") + " " + this.attr("height") });
            }, duration: iQ(i10, true) ? void 0 : 0 }), this.alignElements();
          }
          g(t10) {
            let e10 = this.createElement("g");
            return t10 ? e10.attr({ class: "highcharts-" + t10 }) : e10;
          }
          image(t10, e10, i10, s10, o10, r10) {
            let a10 = { preserveAspectRatio: "none" };
            i_(e10) && (a10.x = e10), i_(i10) && (a10.y = i10), i_(s10) && (a10.width = s10), i_(o10) && (a10.height = o10);
            let n10 = this.createElement("image").attr(a10), h10 = function(e11) {
              n10.attr({ href: t10 }), r10.call(n10, e11);
            };
            if (r10) {
              n10.attr({ href: "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" });
              let e11 = new iH.Image();
              iX(e11, "load", h10), e11.src = t10, e11.complete && h10({});
            } else n10.attr({ href: t10 });
            return n10;
          }
          symbol(t10, e10, i10, s10, o10, r10) {
            var _a2, _b2;
            let a10, n10, h10, l2, d2 = this, c2 = /^url\((.*?)\)$/, p2 = c2.test(t10), g2 = !p2 && (this.symbols[t10] ? t10 : "circle"), u2 = g2 && this.symbols[g2];
            if (u2) "number" == typeof e10 && (n10 = u2.call(this.symbols, e10 || 0, i10 || 0, s10 || 0, o10 || 0, r10)), a10 = this.path(n10), d2.styledMode || a10.attr("fill", "none"), iV(a10, { symbolName: g2 || void 0, x: e10, y: i10, width: s10, height: o10 }), r10 && iV(a10, r10);
            else if (p2) {
              h10 = t10.match(c2)[1];
              let s11 = a10 = this.image(h10);
              s11.imgwidth = iQ(r10 == null ? void 0 : r10.width, (_a2 = iW[h10]) == null ? void 0 : _a2.width), s11.imgheight = iQ(r10 == null ? void 0 : r10.height, (_b2 = iW[h10]) == null ? void 0 : _b2.height), l2 = (t11) => t11.attr({ width: t11.width, height: t11.height }), ["width", "height"].forEach((t11) => {
                s11[`${t11}Setter`] = function(t12, e11) {
                  this[e11] = t12;
                  let { alignByTranslate: i11, element: s12, width: o11, height: a11, imgwidth: n11, imgheight: h11 } = this, l3 = "width" === e11 ? n11 : h11, d3 = 1;
                  r10 && "within" === r10.backgroundSize && o11 && a11 && n11 && h11 ? (d3 = Math.min(o11 / n11, a11 / h11), iF(s12, { width: Math.round(n11 * d3), height: Math.round(h11 * d3) })) : s12 && l3 && s12.setAttribute(e11, l3), !i11 && n11 && h11 && this.translate(((o11 || 0) - n11 * d3) / 2, ((a11 || 0) - h11 * d3) / 2);
                };
              }), iU(e10) && s11.attr({ x: e10, y: i10 }), s11.isImg = true, s11.symbolUrl = t10, iU(s11.imgwidth) && iU(s11.imgheight) ? l2(s11) : (s11.attr({ width: 0, height: 0 }), iG("img", { onload: function() {
                let t11 = iO[d2.chartIndex];
                0 === this.width && (ij(this, { position: "absolute", top: "-999em" }), iI.body.appendChild(this)), iW[h10] = { width: this.width, height: this.height }, s11.imgwidth = this.width, s11.imgheight = this.height, s11.element && l2(s11), this.parentNode && this.parentNode.removeChild(this), d2.imgCount--, d2.imgCount || !t11 || t11.hasLoaded || t11.onload();
              }, src: h10 }), this.imgCount++);
            }
            return a10;
          }
          clipRect(t10, e10, i10, s10) {
            return this.rect(t10, e10, i10, s10, 0);
          }
          text(t10, e10, i10, s10) {
            let o10 = {};
            if (s10 && (this.allowHTML || !this.forExport)) return this.html(t10, e10, i10);
            o10.x = Math.round(e10 || 0), i10 && (o10.y = Math.round(i10)), iU(t10) && (o10.text = t10);
            let r10 = this.createElement("text").attr(o10);
            return s10 && (!this.forExport || this.allowHTML) || (r10.xSetter = function(t11, e11, i11) {
              let s11 = i11.getElementsByTagName("tspan"), o11 = i11.getAttribute(e11);
              for (let i12 = 0, r11; i12 < s11.length; i12++) (r11 = s11[i12]).getAttribute(e11) === o11 && r11.setAttribute(e11, t11);
              i11.setAttribute(e11, t11);
            }), r10;
          }
          fontMetrics(t10) {
            let e10 = i_(t10) ? t10 : i0(it.prototype.getStyle.call(t10, "font-size") || 0), i10 = e10 < 24 ? e10 + 3 : Math.round(1.2 * e10), s10 = Math.round(0.8 * i10);
            return { h: i10, b: s10, f: e10 };
          }
          rotCorr(t10, e10, i10) {
            let s10 = t10;
            return e10 && i10 && (s10 = Math.max(s10 * Math.cos(e10 * iE), 4)), { x: -t10 / 3 * Math.sin(e10 * iE), y: s10 };
          }
          pathToSegments(t10) {
            let e10 = [], i10 = [], s10 = { A: 8, C: 7, H: 2, L: 3, M: 3, Q: 5, S: 5, T: 3, V: 2 };
            for (let o10 = 0; o10 < t10.length; o10++) iK(i10[0]) && i_(t10[o10]) && i10.length === s10[i10[0].toUpperCase()] && t10.splice(o10, 0, i10[0].replace("M", "L").replace("m", "l")), "string" == typeof t10[o10] && (i10.length && e10.push(i10.slice(0)), i10.length = 0), i10.push(t10[o10]);
            return e10.push(i10.slice(0)), e10;
          }
          label(t10, e10, i10, s10, o10, r10, a10, n10, h10) {
            return new il(this, t10, e10, i10, s10, o10, r10, a10, n10, h10);
          }
          alignElements() {
            this.alignedObjects.forEach((t10) => t10.align());
          }
        }
        iV(i3.prototype, { Element: it, SVG_NS: iR, escapes: { "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }, symbols: ix, draw: iz }), eT.registerRendererType("svg", i3, true);
        let { composed: i5, isFirefox: i6 } = z, { attr: i9, css: i4, createElement: i8, defined: i7, extend: st, getAlignFactor: se, isNumber: si, pInt: ss, pushUnique: so } = tn;
        function sr(t10, e10, i10) {
          var _a2;
          let s10 = (_a2 = this.div) == null ? void 0 : _a2.style;
          it.prototype[`${e10}Setter`].call(this, t10, e10, i10), s10 && (i10.style[e10] = s10[e10] = t10);
        }
        let sa = (t10, e10) => {
          var _a2;
          if (!t10.div) {
            let i10 = i9(t10.element, "class"), s10 = t10.css, o10 = i8("div", i10 ? { className: i10 } : void 0, __spreadProps(__spreadValues({ position: "absolute", left: `${t10.translateX || 0}px`, top: `${t10.translateY || 0}px` }, t10.styles), { display: t10.display, opacity: t10.opacity, visibility: t10.visibility }), ((_a2 = t10.parentGroup) == null ? void 0 : _a2.div) || e10);
            t10.classSetter = (t11, e11, i11) => {
              i11.setAttribute("class", t11), o10.className = t11;
            }, t10.translateXSetter = t10.translateYSetter = (e11, i11) => {
              t10[i11] = e11, o10.style["translateX" === i11 ? "left" : "top"] = `${e11}px`, t10.doTransform = true;
            }, t10.scaleXSetter = t10.scaleYSetter = (e11, i11) => {
              t10[i11] = e11, t10.doTransform = true;
            }, t10.opacitySetter = t10.visibilitySetter = sr, t10.css = (e11) => (s10.call(t10, e11), e11.cursor && (o10.style.cursor = e11.cursor), e11.pointerEvents && (o10.style.pointerEvents = e11.pointerEvents), t10), t10.on = function() {
              return it.prototype.on.apply({ element: o10, onEvents: t10.onEvents }, arguments), t10;
            }, t10.div = o10;
          }
          return t10.div;
        };
        class sn extends it {
          static compose(t10) {
            so(i5, this.compose) && (t10.prototype.html = function(t11, e10, i10) {
              return new sn(this, "span").attr({ text: t11, x: Math.round(e10), y: Math.round(i10) });
            });
          }
          constructor(t10, e10) {
            super(t10, e10), sn.useForeignObject ? this.foreignObject = t10.createElement("foreignObject").attr({ zIndex: 2 }) : this.css(__spreadValues({ position: "absolute" }, t10.styledMode ? {} : { fontFamily: t10.style.fontFamily, fontSize: t10.style.fontSize })), this.element.style.whiteSpace = "nowrap";
          }
          getSpanCorrection(t10, e10, i10) {
            this.xCorr = -t10 * i10, this.yCorr = -e10;
          }
          css(t10) {
            let e10, { element: i10 } = this, s10 = "SPAN" === i10.tagName && t10 && "width" in t10, o10 = s10 && t10.width;
            return s10 && (delete t10.width, this.textWidth = ss(o10) || void 0, e10 = true), (t10 == null ? void 0 : t10.textOverflow) === "ellipsis" && (t10.overflow = "hidden", t10.whiteSpace = "nowrap"), (t10 == null ? void 0 : t10.lineClamp) && (t10.display = "-webkit-box", t10.WebkitLineClamp = t10.lineClamp, t10.WebkitBoxOrient = "vertical", t10.overflow = "hidden"), si(Number(t10 == null ? void 0 : t10.fontSize)) && (t10.fontSize += "px"), st(this.styles, t10), i4(i10, t10), e10 && this.updateTransform(), this;
          }
          htmlGetBBox() {
            let { element: t10 } = this;
            return { x: t10.offsetLeft, y: t10.offsetTop, width: t10.offsetWidth, height: t10.offsetHeight };
          }
          updateTransform() {
            var _a2;
            if (!this.added) {
              this.alignOnAdd = true;
              return;
            }
            let { element: t10, foreignObject: e10, oldTextWidth: i10, renderer: s10, rotation: o10, rotationOriginX: r10, rotationOriginY: a10, scaleX: n10, scaleY: h10, styles: { display: l2 = "inline-block", whiteSpace: d2 }, textAlign: c2 = "left", textWidth: p2, translateX: g2 = 0, translateY: u2 = 0, x: f2 = 0, y: m2 = 0 } = this, x2 = () => this.textPxLength ? this.textPxLength : (i4(t10, { width: "", whiteSpace: d2 || "nowrap" }), t10.offsetWidth);
            if (e10 || i4(t10, { marginLeft: `${g2}px`, marginTop: `${u2}px` }), "SPAN" === t10.tagName) {
              let g3, u3 = [o10, c2, t10.innerHTML, p2, this.textAlign].join(","), y2 = -(((_a2 = this.parentGroup) == null ? void 0 : _a2.padding) * 1) || 0;
              if (p2 !== i10) {
                let e11 = x2(), r11 = p2 || 0, a11 = !s10.styledMode && "" === t10.style.textOverflow && t10.style.webkitLineClamp;
                (r11 > i10 || e11 > r11 || a11) && (/[\-\s\u00AD]/.test(t10.textContent || t10.innerText) || "ellipsis" === t10.style.textOverflow) && (i4(t10, { width: (o10 || n10 || e11 > r11 || a11) && si(p2) ? p2 + "px" : "auto", display: l2, whiteSpace: d2 || "normal" }), this.oldTextWidth = p2);
              }
              e10 && (i4(t10, { display: "inline-block", verticalAlign: "top" }), e10.attr({ width: s10.width, height: s10.height })), u3 !== this.cTT && (g3 = s10.fontMetrics(t10).b, i7(o10) && !e10 && (o10 !== (this.oldRotation || 0) || c2 !== this.oldAlign) && i4(t10, { transform: `rotate(${o10}deg)`, transformOrigin: `${y2}% ${y2}px` }), this.getSpanCorrection(!i7(o10) && !this.textWidth && this.textPxLength || t10.offsetWidth, g3, se(c2)));
              let { xCorr: b2 = 0, yCorr: v2 = 0 } = this, k2 = { left: `${f2 + b2}px`, top: `${m2 + v2}px`, textAlign: c2, transformOrigin: `${(r10 != null ? r10 : f2) - b2 - f2 - y2}px ${(a10 != null ? a10 : m2) - v2 - m2 - y2}px` };
              (n10 || h10) && (k2.transform = `scale(${n10 != null ? n10 : 1},${h10 != null ? h10 : 1})`), e10 ? (super.updateTransform(), si(f2) && si(m2) ? (e10.attr({ x: f2 + b2, y: m2 + v2, width: t10.offsetWidth + 3, height: t10.offsetHeight, "transform-origin": t10.getAttribute("transform-origin") || "0 0" }), i4(t10, { display: l2, textAlign: c2 })) : i6 && e10.attr({ width: 0, height: 0 })) : i4(t10, k2), this.cTT = u3, this.oldRotation = o10, this.oldAlign = c2;
            }
          }
          add(t10) {
            let { foreignObject: e10, renderer: i10 } = this, s10 = i10.box.parentNode, o10 = [];
            if (e10) e10.add(t10), super.add(i10.createElement("body").attr({ xmlns: "http://www.w3.org/1999/xhtml" }).css({ background: "transparent", margin: "0 3px 0 0" }).add(e10));
            else {
              let e11;
              if (this.parentGroup = t10, t10 && !(e11 = t10.div)) {
                let i11 = t10;
                for (; i11; ) o10.push(i11), i11 = i11.parentGroup;
                for (let t11 of o10.reverse()) e11 = sa(t11, s10);
              }
              (e11 || s10).appendChild(this.element);
            }
            return this.added = true, this.alignOnAdd && this.updateTransform(), this;
          }
          textSetter(t10) {
            t10 !== this.textStr && (delete this.bBox, delete this.oldTextWidth, eh.setElementHTML(this.element, t10 != null ? t10 : ""), this.textStr = t10, this.doTransform = true);
          }
          alignSetter(t10) {
            this.alignValue = this.textAlign = t10, this.doTransform = true;
          }
          xSetter(t10, e10) {
            this[e10] = t10, this.doTransform = true;
          }
        }
        let sh = sn.prototype;
        sh.visibilitySetter = sh.opacitySetter = sr, sh.ySetter = sh.rotationSetter = sh.rotationOriginXSetter = sh.rotationOriginYSetter = sh.xSetter, (h = b || (b = {})).xAxis = { alignTicks: true, allowDecimals: void 0, panningEnabled: true, zIndex: 2, zoomEnabled: true, dateTimeLabelFormats: { millisecond: { main: "%[HMSL]", range: false }, second: { main: "%[HMS]", range: false }, minute: { main: "%[HM]", range: false }, hour: { main: "%[HM]", range: false }, day: { main: "%[eb]" }, week: { main: "%[eb]" }, month: { main: "%[bY]" }, year: { main: "%Y" } }, endOnTick: false, gridLineDashStyle: "Solid", gridZIndex: 1, labels: { autoRotationLimit: 80, distance: 15, enabled: true, indentation: 10, overflow: "justify", reserveSpace: void 0, rotation: void 0, staggerLines: 0, step: 0, useHTML: false, zIndex: 7, style: { color: "#333333", cursor: "default", fontSize: "0.8em", textOverflow: "ellipsis" } }, maxPadding: 0.01, minorGridLineDashStyle: "Solid", minorTickLength: 2, minorTickPosition: "outside", minorTicksPerMajor: 5, minPadding: 0.01, offset: void 0, reversed: void 0, reversedStacks: false, showEmpty: true, showFirstLabel: true, showLastLabel: true, startOfWeek: 1, startOnTick: false, tickLength: 10, tickmarkPlacement: "between", tickPixelInterval: 100, tickPosition: "outside", title: { align: "middle", useHTML: false, x: 0, y: 0, style: { color: "#666666", fontSize: "0.8em" } }, visible: true, minorGridLineColor: "#f2f2f2", minorGridLineWidth: 1, minorTickColor: "#999999", lineColor: "#333333", lineWidth: 1, gridLineColor: "#e6e6e6", gridLineWidth: void 0, tickColor: "#333333" }, h.yAxis = { reversedStacks: true, endOnTick: true, maxPadding: 0.05, minPadding: 0.05, tickPixelInterval: 72, showLastLabel: true, labels: { x: void 0 }, startOnTick: true, title: {}, stackLabels: { animation: {}, allowOverlap: false, enabled: false, crop: true, overflow: "justify", formatter: function() {
          let { numberFormatter: t10 } = this.axis.chart;
          return t10(this.total || 0, -1);
        }, style: { color: "#000000", fontSize: "0.7em", fontWeight: "bold", textOutline: "1px contrast" } }, gridLineWidth: 1, lineWidth: 0 };
        let sl = b, { addEvent: sd, isFunction: sc, objectEach: sp, removeEvent: sg } = tn;
        (v || (v = {})).registerEventOptions = function(t10, e10) {
          t10.eventOptions = t10.eventOptions || {}, sp(e10.events, function(e11, i10) {
            t10.eventOptions[i10] !== e11 && (t10.eventOptions[i10] && (sg(t10, i10, t10.eventOptions[i10]), delete t10.eventOptions[i10]), sc(e11) && (t10.eventOptions[i10] = e11, sd(t10, i10, e11, { order: 0 })));
          });
        };
        let su = v, { deg2rad: sf } = z, { clamp: sm, correctFloat: sx, defined: sy, destroyObjectProperties: sb, extend: sv, fireEvent: sk, getAlignFactor: sw, isNumber: sM, merge: sS, objectEach: sT, pick: sC } = tn, sA = class {
          constructor(t10, e10, i10, s10, o10) {
            this.isNew = true, this.isNewLabel = true, this.axis = t10, this.pos = e10, this.type = i10 || "", this.parameters = o10 || {}, this.tickmarkOffset = this.parameters.tickmarkOffset, this.options = this.parameters.options, sk(this, "init"), i10 || s10 || this.addLabel();
          }
          addLabel() {
            var _a2, _b2;
            let t10 = this, e10 = t10.axis, i10 = e10.options, s10 = e10.chart, o10 = e10.categories, r10 = e10.logarithmic, a10 = e10.names, n10 = t10.pos, h10 = sC((_a2 = t10.options) == null ? void 0 : _a2.labels, i10.labels), l2 = e10.tickPositions, d2 = n10 === l2[0], c2 = n10 === l2[l2.length - 1], p2 = (!h10.step || 1 === h10.step) && 1 === e10.tickInterval, g2 = l2.info, u2 = t10.label, f2, m2, x2, y2 = this.parameters.category || (o10 ? sC(o10[n10], a10[n10], n10) : n10);
            r10 && sM(y2) && (y2 = sx(r10.lin2log(y2))), e10.dateTime && (g2 ? f2 = (m2 = s10.time.resolveDTLFormat(i10.dateTimeLabelFormats[!((_b2 = i10.grid) == null ? void 0 : _b2.enabled) && g2.higherRanks[n10] || g2.unitName])).main : sM(y2) && (f2 = e10.dateTime.getXDateFormat(y2, i10.dateTimeLabelFormats || {}))), t10.isFirst = d2, t10.isLast = c2;
            let b2 = { axis: e10, chart: s10, dateTimeLabelFormat: f2, isFirst: d2, isLast: c2, pos: n10, tick: t10, tickPositionInfo: g2, value: y2 };
            sk(this, "labelFormat", b2);
            let v2 = (t11) => h10.formatter ? h10.formatter.call(t11, t11) : h10.format ? (t11.text = e10.defaultLabelFormatter.call(t11), eS.format(h10.format, t11, s10)) : e10.defaultLabelFormatter.call(t11), k2 = v2.call(b2, b2), w2 = m2 == null ? void 0 : m2.list;
            w2 ? t10.shortenLabel = function() {
              for (x2 = 0; x2 < w2.length; x2++) if (sv(b2, { dateTimeLabelFormat: w2[x2] }), u2.attr({ text: v2.call(b2, b2) }), u2.getBBox().width < e10.getSlotWidth(t10) - 2 * (h10.padding || 0)) return;
              u2.attr({ text: "" });
            } : t10.shortenLabel = void 0, p2 && e10._addedPlotLB && t10.moveLabel(k2, h10), sy(u2) || t10.movedLabel ? u2 && u2.textStr !== k2 && !p2 && (!u2.textWidth || h10.style.width || u2.styles.width || u2.css({ width: null }), u2.attr({ text: k2 }), u2.textPxLength = u2.getBBox().width) : (t10.label = u2 = t10.createLabel(k2, h10), t10.rotation = 0);
          }
          createLabel(t10, e10, i10) {
            let s10 = this.axis, { renderer: o10, styledMode: r10 } = s10.chart, a10 = e10.style.whiteSpace, n10 = sy(t10) && e10.enabled ? o10.text(t10, i10 == null ? void 0 : i10.x, i10 == null ? void 0 : i10.y, e10.useHTML).add(s10.labelGroup) : void 0;
            return n10 && (r10 || n10.css(sS(e10.style)), n10.textPxLength = n10.getBBox().width, !r10 && a10 && n10.css({ whiteSpace: a10 })), n10;
          }
          destroy() {
            sb(this, this.axis);
          }
          getPosition(t10, e10, i10, s10) {
            let o10 = this.axis, r10 = o10.chart, a10 = s10 && r10.oldChartHeight || r10.chartHeight, n10 = { x: t10 ? sx(o10.translate(e10 + i10, void 0, void 0, s10) + o10.transB) : o10.left + o10.offset + (o10.opposite ? (s10 && r10.oldChartWidth || r10.chartWidth) - o10.right - o10.left : 0), y: t10 ? a10 - o10.bottom + o10.offset - (o10.opposite ? o10.height : 0) : sx(a10 - o10.translate(e10 + i10, void 0, void 0, s10) - o10.transB) };
            return n10.y = sm(n10.y, -1e9, 1e9), sk(this, "afterGetPosition", { pos: n10 }), n10;
          }
          getLabelPosition(t10, e10, i10, s10, o10, r10, a10, n10) {
            let h10, l2, d2 = this.axis, c2 = d2.transA, p2 = d2.isLinked && d2.linkedParent ? d2.linkedParent.reversed : d2.reversed, g2 = d2.staggerLines, u2 = d2.tickRotCorr || { x: 0, y: 0 }, f2 = s10 || d2.reserveSpaceDefault ? 0 : -d2.labelOffset * ("center" === d2.labelAlign ? 0.5 : 1), m2 = o10.distance, x2 = {};
            return h10 = 0 === d2.side ? i10.rotation ? -m2 : -i10.getBBox().height : 2 === d2.side ? u2.y + m2 : Math.cos(i10.rotation * sf) * (u2.y - i10.getBBox(false, 0).height / 2), sy(o10.y) && (h10 = 0 === d2.side && d2.horiz ? o10.y + h10 : o10.y), t10 = t10 + sC(o10.x, [0, 1, 0, -1][d2.side] * m2) + f2 + u2.x - (r10 && s10 ? r10 * c2 * (p2 ? -1 : 1) : 0), e10 = e10 + h10 - (r10 && !s10 ? r10 * c2 * (p2 ? 1 : -1) : 0), g2 && (l2 = a10 / (n10 || 1) % g2, d2.opposite && (l2 = g2 - l2 - 1), e10 += l2 * (d2.labelOffset / g2)), x2.x = t10, x2.y = Math.round(e10), sk(this, "afterGetLabelPosition", { pos: x2, tickmarkOffset: r10, index: a10 }), x2;
          }
          getLabelSize() {
            return this.label ? this.label.getBBox()[this.axis.horiz ? "height" : "width"] : 0;
          }
          getMarkPath(t10, e10, i10, s10, o10 = false, r10) {
            return r10.crispLine([["M", t10, e10], ["L", t10 + (o10 ? 0 : -i10), e10 + (o10 ? i10 : 0)]], s10);
          }
          handleOverflow(t10) {
            var _a2;
            let e10 = this.axis, i10 = e10.options.labels, s10 = t10.x, o10 = e10.chart.chartWidth, r10 = e10.chart.spacing, a10 = sC(e10.labelLeft, Math.min(e10.pos, r10[3])), n10 = sC(e10.labelRight, Math.max(e10.isRadial ? 0 : e10.pos + e10.len, o10 - r10[1])), h10 = this.label, l2 = this.rotation, d2 = sw(e10.labelAlign || h10.attr("align")), c2 = h10.getBBox().width, p2 = e10.getSlotWidth(this), g2 = p2, u2 = 1, f2;
            l2 || "justify" !== i10.overflow ? l2 < 0 && s10 - d2 * c2 < a10 ? f2 = Math.round(s10 / Math.cos(l2 * sf) - a10) : l2 > 0 && s10 + d2 * c2 > n10 && (f2 = Math.round((o10 - s10) / Math.cos(l2 * sf))) : (s10 - d2 * c2 < a10 ? g2 = t10.x + g2 * (1 - d2) - a10 : s10 + (1 - d2) * c2 > n10 && (g2 = n10 - t10.x + g2 * d2, u2 = -1), (g2 = Math.min(p2, g2)) < p2 && "center" === e10.labelAlign && (t10.x += u2 * (p2 - g2 - d2 * (p2 - Math.min(c2, g2)))), (c2 > g2 || e10.autoRotation && ((_a2 = h10 == null ? void 0 : h10.styles) == null ? void 0 : _a2.width)) && (f2 = g2)), f2 && h10 && (this.shortenLabel ? this.shortenLabel() : h10.css(sv({}, { width: Math.floor(f2) + "px", lineClamp: +!e10.isRadial })));
          }
          moveLabel(t10, e10) {
            let i10 = this, s10 = i10.label, o10 = i10.axis, r10 = false, a10;
            s10 && s10.textStr === t10 ? (i10.movedLabel = s10, r10 = true, delete i10.label) : sT(o10.ticks, function(e11) {
              r10 || e11.isNew || e11 === i10 || !e11.label || e11.label.textStr !== t10 || (i10.movedLabel = e11.label, r10 = true, e11.labelPos = i10.movedLabel.xy, delete e11.label);
            }), !r10 && (i10.labelPos || s10) && (a10 = i10.labelPos || s10.xy, i10.movedLabel = i10.createLabel(t10, e10, a10), i10.movedLabel && i10.movedLabel.attr({ opacity: 0 }));
          }
          render(t10, e10, i10) {
            var _a2;
            let s10 = this.axis, o10 = s10.horiz, r10 = this.pos, a10 = sC(this.tickmarkOffset, s10.tickmarkOffset), n10 = this.getPosition(o10, r10, a10, e10), h10 = n10.x, l2 = n10.y, d2 = s10.pos, c2 = d2 + s10.len, p2 = o10 ? h10 : l2, g2 = sC(i10, (_a2 = this.label) == null ? void 0 : _a2.newOpacity, 1);
            !s10.chart.polar && (sx(p2) < d2 || p2 > c2) && (i10 = 0), i10 != null ? i10 : i10 = 1, this.isActive = true, this.renderGridLine(e10, i10), this.renderMark(n10, i10), this.renderLabel(n10, e10, g2, t10), this.isNew = false, sk(this, "afterRender");
          }
          renderGridLine(t10, e10) {
            let i10 = this.axis, s10 = i10.options, o10 = {}, r10 = this.pos, a10 = this.type, n10 = sC(this.tickmarkOffset, i10.tickmarkOffset), h10 = i10.chart.renderer, l2 = this.gridLine, d2, c2 = s10.gridLineWidth, p2 = s10.gridLineColor, g2 = s10.gridLineDashStyle;
            "minor" === this.type && (c2 = s10.minorGridLineWidth, p2 = s10.minorGridLineColor, g2 = s10.minorGridLineDashStyle), l2 || (i10.chart.styledMode || (o10.stroke = p2, o10["stroke-width"] = c2 || 0, o10.dashstyle = g2), a10 || (o10.zIndex = 1), t10 && (e10 = 0), this.gridLine = l2 = h10.path().attr(o10).addClass("highcharts-" + (a10 ? a10 + "-" : "") + "grid-line").add(i10.gridGroup)), l2 && (d2 = i10.getPlotLinePath({ value: r10 + n10, lineWidth: l2.strokeWidth(), force: "pass", old: t10, acrossPanes: false })) && l2[t10 || this.isNew ? "attr" : "animate"]({ d: d2, opacity: e10 });
          }
          renderMark(t10, e10) {
            let i10 = this.axis, s10 = i10.options, o10 = i10.chart.renderer, r10 = this.type, a10 = i10.tickSize(r10 ? r10 + "Tick" : "tick"), n10 = t10.x, h10 = t10.y, l2 = sC(s10["minor" !== r10 ? "tickWidth" : "minorTickWidth"], !r10 && i10.isXAxis ? 1 : 0), d2 = s10["minor" !== r10 ? "tickColor" : "minorTickColor"], c2 = this.mark, p2 = !c2;
            a10 && (i10.opposite && (a10[0] = -a10[0]), !c2 && (this.mark = c2 = o10.path().addClass("highcharts-" + (r10 ? r10 + "-" : "") + "tick").add(i10.axisGroup), i10.chart.styledMode || c2.attr({ stroke: d2, "stroke-width": l2 })), c2[p2 ? "attr" : "animate"]({ d: this.getMarkPath(n10, h10, a10[0], c2.strokeWidth(), i10.horiz, o10), opacity: e10 }));
          }
          renderLabel(t10, e10, i10, s10) {
            let o10 = this.axis, r10 = o10.horiz, a10 = o10.options, n10 = this.label, h10 = a10.labels, l2 = h10.step, d2 = sC(this.tickmarkOffset, o10.tickmarkOffset), c2 = t10.x, p2 = t10.y, g2 = true;
            n10 && sM(c2) && (n10.xy = t10 = this.getLabelPosition(c2, p2, n10, r10, h10, d2, s10, l2), (!this.isFirst || this.isLast || a10.showFirstLabel) && (!this.isLast || this.isFirst || a10.showLastLabel) ? !r10 || h10.step || h10.rotation || e10 || 0 === i10 || this.handleOverflow(t10) : g2 = false, l2 && s10 % l2 && (g2 = false), g2 && sM(t10.y) ? (t10.opacity = i10, n10[this.isNewLabel ? "attr" : "animate"](t10).show(true), this.isNewLabel = false) : (n10.hide(), this.isNewLabel = true));
          }
          replaceMovedLabel() {
            let t10 = this.label, e10 = this.axis;
            t10 && !this.isNew && (t10.animate({ opacity: 0 }, void 0, t10.destroy), delete this.label), e10.isDirty = true, this.label = this.movedLabel, delete this.movedLabel;
          }
        }, { animObject: sP } = t5, { xAxis: sL, yAxis: sO } = sl, { defaultOptions: sE } = tD, { registerEventOptions: sI } = su, { deg2rad: sD } = z, { arrayMax: sB, arrayMin: sN, clamp: sz, correctFloat: sR, defined: sW, destroyObjectProperties: sH, erase: sX, error: sF, extend: sG, fireEvent: sY, getClosestDistance: sj, insertItem: sU, isArray: s$, isNumber: sV, isString: sZ, merge: s_, normalizeTickInterval: sq, objectEach: sK, pick: sJ, relativeLength: sQ, removeEvent: s0, splat: s1, syncTimeout: s2 } = tn, s3 = (t10, e10) => sq(e10, void 0, void 0, sJ(t10.options.allowDecimals, e10 < 0.5 || void 0 !== t10.tickAmount), !!t10.tickAmount);
        sG(sE, { xAxis: sL, yAxis: s_(sL, sO) });
        class s5 {
          constructor(t10, e10, i10) {
            this.init(t10, e10, i10);
          }
          init(t10, e10, i10 = this.coll) {
            var _a2, _b2, _c2, _d2;
            let s10 = "xAxis" === i10, o10 = this.isZAxis || (t10.inverted ? !s10 : s10);
            this.chart = t10, this.horiz = o10, this.isXAxis = s10, this.coll = i10, sY(this, "init", { userOptions: e10 }), this.opposite = sJ(e10.opposite, this.opposite), this.side = sJ(e10.side, this.side, o10 ? 2 * !this.opposite : this.opposite ? 1 : 3), this.setOptions(e10);
            let r10 = this.options, a10 = r10.labels;
            (_a2 = this.type) != null ? _a2 : this.type = r10.type || "linear", (_c2 = this.uniqueNames) != null ? _c2 : this.uniqueNames = (_b2 = r10.uniqueNames) != null ? _b2 : true, sY(this, "afterSetType"), this.userOptions = e10, this.minPixelPadding = 0, this.reversed = sJ(r10.reversed, this.reversed), this.visible = r10.visible, this.zoomEnabled = r10.zoomEnabled, this.hasNames = "category" === this.type || true === r10.categories, this.categories = s$(r10.categories) && r10.categories || (this.hasNames ? [] : void 0), this.names || (this.names = [], this.names.keys = {}), this.plotLinesAndBandsGroups = {}, this.positiveValuesOnly = !!this.logarithmic, this.isLinked = sW(r10.linkedTo), this.ticks = {}, this.labelEdge = [], this.minorTicks = {}, this.plotLinesAndBands = [], this.alternateBands = {}, (_d2 = this.len) != null ? _d2 : this.len = 0, this.minRange = this.userMinRange = r10.minRange || r10.maxZoom, this.range = r10.range, this.offset = r10.offset || 0, this.max = void 0, this.min = void 0;
            let n10 = sJ(r10.crosshair, s1(t10.options.tooltip.crosshairs)[+!s10]);
            this.crosshair = true === n10 ? {} : n10, -1 === t10.axes.indexOf(this) && (s10 ? t10.axes.splice(t10.xAxis.length, 0, this) : t10.axes.push(this), sU(this, t10[this.coll])), t10.orderItems(this.coll), this.series = this.series || [], t10.inverted && !this.isZAxis && s10 && !sW(this.reversed) && (this.reversed = true), this.labelRotation = sV(a10.rotation) ? a10.rotation : void 0, sI(this, r10), sY(this, "afterInit");
          }
          setOptions(t10) {
            let e10 = this.horiz ? { labels: { autoRotation: [-45], padding: 3 }, margin: 15 } : { labels: { padding: 1 }, title: { rotation: 90 * this.side } };
            this.options = s_(e10, "yAxis" === this.coll ? { title: { text: this.chart.options.lang.yAxisTitle } } : {}, sE[this.coll], t10), sY(this, "afterSetOptions", { userOptions: t10 });
          }
          defaultLabelFormatter() {
            let t10 = this.axis, { numberFormatter: e10 } = this.chart, i10 = sV(this.value) ? this.value : NaN, s10 = t10.chart.time, o10 = t10.categories, r10 = this.dateTimeLabelFormat, a10 = sE.lang, n10 = a10.numericSymbols, h10 = a10.numericSymbolMagnitude || 1e3, l2 = t10.logarithmic ? Math.abs(i10) : t10.tickInterval, d2 = n10 == null ? void 0 : n10.length, c2, p2;
            if (o10) p2 = `${this.value}`;
            else if (r10) p2 = s10.dateFormat(r10, i10, true);
            else if (d2 && n10 && l2 >= 1e3) for (; d2-- && void 0 === p2; ) l2 >= (c2 = Math.pow(h10, d2 + 1)) && 10 * i10 % c2 == 0 && null !== n10[d2] && 0 !== i10 && (p2 = e10(i10 / c2, -1) + n10[d2]);
            return void 0 === p2 && (p2 = Math.abs(i10) >= 1e4 ? e10(i10, -1) : e10(i10, -1, void 0, "")), p2;
          }
          getSeriesExtremes() {
            let t10, e10 = this;
            sY(this, "getSeriesExtremes", null, function() {
              e10.hasVisibleSeries = false, e10.dataMin = e10.dataMax = e10.threshold = void 0, e10.softThreshold = !e10.isXAxis, e10.series.forEach((i10) => {
                if (i10.reserveSpace()) {
                  let s10 = i10.options, o10, r10 = s10.threshold, a10, n10;
                  if (e10.hasVisibleSeries = true, e10.positiveValuesOnly && 0 >= (r10 || 0) && (r10 = void 0), e10.isXAxis) (o10 = i10.getColumn("x")).length && (o10 = e10.logarithmic ? o10.filter((t11) => t11 > 0) : o10, a10 = (t10 = i10.getXExtremes(o10)).min, n10 = t10.max, sV(a10) || a10 instanceof Date || (o10 = o10.filter(sV), a10 = (t10 = i10.getXExtremes(o10)).min, n10 = t10.max), o10.length && (e10.dataMin = Math.min(sJ(e10.dataMin, a10), a10), e10.dataMax = Math.max(sJ(e10.dataMax, n10), n10)));
                  else {
                    let t11 = i10.applyExtremes();
                    sV(t11.dataMin) && (a10 = t11.dataMin, e10.dataMin = Math.min(sJ(e10.dataMin, a10), a10)), sV(t11.dataMax) && (n10 = t11.dataMax, e10.dataMax = Math.max(sJ(e10.dataMax, n10), n10)), sW(r10) && (e10.threshold = r10), (!s10.softThreshold || e10.positiveValuesOnly) && (e10.softThreshold = false);
                  }
                }
              });
            }), sY(this, "afterGetSeriesExtremes");
          }
          translate(t10, e10, i10, s10, o10, r10) {
            var _a2;
            let a10 = this.linkedParent || this, n10 = s10 && a10.old ? a10.old.min : a10.min;
            if (!sV(n10)) return NaN;
            let h10 = a10.minPixelPadding, l2 = (a10.isOrdinal || ((_a2 = a10.brokenAxis) == null ? void 0 : _a2.hasBreaks) || a10.logarithmic && o10) && !!a10.lin2val, d2 = 1, c2 = 0, p2 = s10 && a10.old ? a10.old.transA : a10.transA, g2 = 0;
            return p2 || (p2 = a10.transA), i10 && (d2 *= -1, c2 = a10.len), a10.reversed && (d2 *= -1, c2 -= d2 * (a10.sector || a10.len)), e10 ? (g2 = (t10 = t10 * d2 + c2 - h10) / p2 + n10, l2 && (g2 = a10.lin2val(g2))) : (l2 && (t10 = a10.val2lin(t10)), g2 = d2 * (t10 - n10) * p2 + c2 + d2 * h10 + (sV(r10) ? p2 * r10 : 0), a10.isRadial || (g2 = sR(g2))), g2;
          }
          toPixels(t10, e10) {
            var _a2, _b2;
            return this.translate((_b2 = (_a2 = this.chart) == null ? void 0 : _a2.time.parse(t10)) != null ? _b2 : NaN, false, !this.horiz, void 0, true) + (e10 ? 0 : this.pos);
          }
          toValue(t10, e10) {
            return this.translate(t10 - (e10 ? 0 : this.pos), true, !this.horiz, void 0, true);
          }
          getPlotLinePath(t10) {
            let e10 = this, i10 = e10.chart, s10 = e10.left, o10 = e10.top, r10 = t10.old, a10 = t10.value, n10 = t10.lineWidth, h10 = r10 && i10.oldChartHeight || i10.chartHeight, l2 = r10 && i10.oldChartWidth || i10.chartWidth, d2 = e10.transB, c2 = t10.translatedValue, p2 = t10.force, g2, u2, f2, m2, x2;
            function y2(t11, e11, i11) {
              return "pass" !== p2 && (t11 < e11 || t11 > i11) && (p2 ? t11 = sz(t11, e11, i11) : x2 = true), t11;
            }
            let b2 = { value: a10, lineWidth: n10, old: r10, force: p2, acrossPanes: t10.acrossPanes, translatedValue: c2 };
            return sY(this, "getPlotLinePath", b2, function(t11) {
              g2 = f2 = (c2 = sz(c2 = sJ(c2, e10.translate(a10, void 0, void 0, r10)), -1e9, 1e9)) + d2, u2 = m2 = h10 - c2 - d2, sV(c2) ? e10.horiz ? (u2 = o10, m2 = h10 - e10.bottom + (e10.options.isInternal ? 0 : i10.scrollablePixelsY || 0), g2 = f2 = y2(g2, s10, s10 + e10.width)) : (g2 = s10, f2 = l2 - e10.right + (i10.scrollablePixelsX || 0), u2 = m2 = y2(u2, o10, o10 + e10.height)) : (x2 = true, p2 = false), t11.path = x2 && !p2 ? void 0 : i10.renderer.crispLine([["M", g2, u2], ["L", f2, m2]], n10 || 1);
            }), b2.path;
          }
          getLinearTickPositions(t10, e10, i10) {
            let s10, o10, r10, a10 = sR(Math.floor(e10 / t10) * t10), n10 = sR(Math.ceil(i10 / t10) * t10), h10 = [];
            if (sR(a10 + t10) === a10 && (r10 = 20), this.single) return [e10];
            for (s10 = a10; s10 <= n10 && (h10.push(s10), (s10 = sR(s10 + t10, r10)) !== o10); ) o10 = s10;
            return h10;
          }
          getMinorTickInterval() {
            let { minorTicks: t10, minorTickInterval: e10 } = this.options;
            return true === t10 ? sJ(e10, "auto") : false !== t10 ? e10 : void 0;
          }
          getMinorTickPositions() {
            var _a2;
            let t10 = this.options, e10 = this.tickPositions, i10 = this.minorTickInterval, s10 = this.pointRangePadding || 0, o10 = (this.min || 0) - s10, r10 = (this.max || 0) + s10, a10 = ((_a2 = this.brokenAxis) == null ? void 0 : _a2.hasBreaks) ? this.brokenAxis.unitLength : r10 - o10, n10 = [], h10;
            if (a10 && a10 / i10 < this.len / 3) {
              let s11 = this.logarithmic;
              if (s11) this.paddedTicks.forEach(function(t11, e11, o11) {
                e11 && n10.push.apply(n10, s11.getLogTickPositions(i10, o11[e11 - 1], o11[e11], true));
              });
              else if (this.dateTime && "auto" === this.getMinorTickInterval()) n10 = n10.concat(this.getTimeTicks(this.dateTime.normalizeTimeTickInterval(i10), o10, r10, t10.startOfWeek));
              else for (h10 = o10 + (e10[0] - o10) % i10; h10 <= r10 && h10 !== n10[0]; h10 += i10) n10.push(h10);
            }
            return 0 !== n10.length && this.trimTicks(n10), n10;
          }
          adjustForMinRange() {
            var _a2, _b2, _c2;
            let t10 = this.options, e10 = this.logarithmic, i10 = this.chart.time, { max: s10, min: o10, minRange: r10 } = this, a10, n10, h10, l2;
            this.isXAxis && void 0 === r10 && !e10 && (r10 = sW(t10.min) || sW(t10.max) || sW(t10.floor) || sW(t10.ceiling) ? null : Math.min(5 * (sj(this.series.map((t11) => {
              let e11 = t11.getColumn("x");
              return t11.xIncrement ? e11.slice(0, 2) : e11;
            })) || 0), this.dataMax - this.dataMin)), sV(s10) && sV(o10) && sV(r10) && s10 - o10 < r10 && (n10 = this.dataMax - this.dataMin >= r10, a10 = (r10 - s10 + o10) / 2, h10 = [o10 - a10, (_a2 = i10.parse(t10.min)) != null ? _a2 : o10 - a10], n10 && (h10[2] = e10 ? e10.log2lin(this.dataMin) : this.dataMin), l2 = [(o10 = sB(h10)) + r10, (_b2 = i10.parse(t10.max)) != null ? _b2 : o10 + r10], n10 && (l2[2] = e10 ? e10.log2lin(this.dataMax) : this.dataMax), (s10 = sN(l2)) - o10 < r10 && (h10[0] = s10 - r10, h10[1] = (_c2 = i10.parse(t10.min)) != null ? _c2 : s10 - r10, o10 = sB(h10))), this.minRange = r10, this.min = o10, this.max = s10;
          }
          getClosest() {
            let t10, e10;
            if (this.categories) e10 = 1;
            else {
              let i10 = [];
              this.series.forEach(function(t11) {
                let s10 = t11.closestPointRange, o10 = t11.getColumn("x");
                1 === o10.length ? i10.push(o10[0]) : t11.sorted && sW(s10) && t11.reserveSpace() && (e10 = sW(e10) ? Math.min(e10, s10) : s10);
              }), i10.length && (i10.sort((t11, e11) => t11 - e11), t10 = sj([i10]));
            }
            return t10 && e10 ? Math.min(t10, e10) : t10 || e10;
          }
          nameToX(t10) {
            let e10 = s$(this.options.categories), i10 = e10 ? this.categories : this.names, s10 = t10.options.x, o10;
            return t10.series.requireSorting = false, sW(s10) || (s10 = this.uniqueNames && i10 ? e10 ? i10.indexOf(t10.name) : sJ(i10.keys[t10.name], -1) : t10.series.autoIncrement()), -1 === s10 ? !e10 && i10 && (o10 = i10.length) : sV(s10) && (o10 = s10), void 0 !== o10 ? (this.names[o10] = t10.name, this.names.keys[t10.name] = o10) : t10.x && (o10 = t10.x), o10;
          }
          updateNames() {
            let t10 = this, e10 = this.names;
            e10.length > 0 && (Object.keys(e10.keys).forEach(function(t11) {
              delete e10.keys[t11];
            }), e10.length = 0, this.minRange = this.userMinRange, (this.series || []).forEach((e11) => {
              e11.xIncrement = null, (!e11.points || e11.isDirtyData) && (t10.max = Math.max(t10.max || 0, e11.dataTable.rowCount - 1), e11.processData(), e11.generatePoints());
              let i10 = e11.getColumn("x").slice();
              e11.data.forEach((e12, s10) => {
                let o10 = i10[s10];
                (e12 == null ? void 0 : e12.options) && void 0 !== e12.name && void 0 !== (o10 = t10.nameToX(e12)) && o10 !== e12.x && (i10[s10] = e12.x = o10);
              }), e11.dataTable.setColumn("x", i10);
            }));
          }
          setAxisTranslation() {
            var _a2;
            let t10 = this, e10 = t10.max - t10.min, i10 = t10.linkedParent, s10 = !!t10.categories, o10 = t10.isXAxis, r10 = t10.axisPointRange || 0, a10, n10 = 0, h10 = 0, l2, d2 = t10.transA;
            (o10 || s10 || r10) && (a10 = t10.getClosest(), i10 ? (n10 = i10.minPointOffset, h10 = i10.pointRangePadding) : t10.series.forEach(function(e11) {
              let i11 = s10 ? 1 : o10 ? sJ(e11.options.pointRange, a10, 0) : t10.axisPointRange || 0, l3 = e11.options.pointPlacement;
              if (r10 = Math.max(r10, i11), !t10.single || s10) {
                let t11 = e11.is("xrange") ? !o10 : o10;
                n10 = Math.max(n10, t11 && sZ(l3) ? 0 : i11 / 2), h10 = Math.max(h10, t11 && "on" === l3 ? 0 : i11);
              }
            }), l2 = ((_a2 = t10.ordinal) == null ? void 0 : _a2.slope) && a10 ? t10.ordinal.slope / a10 : 1, t10.minPointOffset = n10 *= l2, t10.pointRangePadding = h10 *= l2, t10.pointRange = Math.min(r10, t10.single && s10 ? 1 : e10), o10 && (t10.closestPointRange = a10)), t10.translationSlope = t10.transA = d2 = t10.staticScale || t10.len / (e10 + h10 || 1), t10.transB = t10.horiz ? t10.left : t10.bottom, t10.minPixelPadding = d2 * n10, sY(this, "afterSetAxisTranslation");
          }
          minFromRange() {
            let { max: t10, min: e10 } = this;
            return sV(t10) && sV(e10) && t10 - e10 || void 0;
          }
          setTickInterval(t10) {
            var _a2, _b2, _c2, _d2;
            let { categories: e10, chart: i10, dataMax: s10, dataMin: o10, dateTime: r10, isXAxis: a10, logarithmic: n10, options: h10, softThreshold: l2 } = this, d2 = i10.time, c2 = sV(this.threshold) ? this.threshold : void 0, p2 = this.minRange || 0, { ceiling: g2, floor: u2, linkedTo: f2, softMax: m2, softMin: x2 } = h10, y2 = sV(f2) && ((_a2 = i10[this.coll]) == null ? void 0 : _a2[f2]), b2 = h10.tickPixelInterval, v2 = h10.maxPadding, k2 = h10.minPadding, w2 = 0, M2, S2 = sV(h10.tickInterval) && h10.tickInterval >= 0 ? h10.tickInterval : void 0, T2, C2, A2, P2;
            if (r10 || e10 || y2 || this.getTickAmount(), A2 = sJ(this.userMin, d2.parse(h10.min)), P2 = sJ(this.userMax, d2.parse(h10.max)), y2 ? (this.linkedParent = y2, M2 = y2.getExtremes(), this.min = sJ(M2.min, M2.dataMin), this.max = sJ(M2.max, M2.dataMax), this.type !== y2.type && sF(11, true, i10)) : (l2 && sW(c2) && sV(s10) && sV(o10) && (o10 >= c2 ? (T2 = c2, k2 = 0) : s10 <= c2 && (C2 = c2, v2 = 0)), this.min = sJ(A2, T2, o10), this.max = sJ(P2, C2, s10)), sV(this.max) && sV(this.min) && (n10 && (this.positiveValuesOnly && !t10 && 0 >= Math.min(this.min, sJ(o10, this.min)) && sF(10, true, i10), this.min = sR(n10.log2lin(this.min), 16), this.max = sR(n10.log2lin(this.max), 16)), this.range && sV(o10) && (this.userMin = this.min = A2 = Math.max(o10, this.minFromRange() || 0), this.userMax = P2 = this.max, this.range = void 0)), sY(this, "foundExtremes"), this.adjustForMinRange(), sV(this.min) && sV(this.max)) {
              if (!sV(this.userMin) && sV(x2) && x2 < this.min && (this.min = A2 = x2), !sV(this.userMax) && sV(m2) && m2 > this.max && (this.max = P2 = m2), e10 || this.axisPointRange || ((_b2 = this.stacking) == null ? void 0 : _b2.usePercentage) || y2 || (w2 = this.max - this.min) && (!sW(A2) && k2 && (this.min -= w2 * k2), !sW(P2) && v2 && (this.max += w2 * v2)), !sV(this.userMin) && sV(u2) && (this.min = Math.max(this.min, u2)), !sV(this.userMax) && sV(g2) && (this.max = Math.min(this.max, g2)), l2 && sV(o10) && sV(s10)) {
                let t11 = c2 || 0;
                !sW(A2) && this.min < t11 && o10 >= t11 ? this.min = h10.minRange ? Math.min(t11, this.max - p2) : t11 : !sW(P2) && this.max > t11 && s10 <= t11 && (this.max = h10.minRange ? Math.max(t11, this.min + p2) : t11);
              }
              !i10.polar && this.min > this.max && (sW(h10.min) ? this.max = this.min : sW(h10.max) && (this.min = this.max)), w2 = this.max - this.min;
            }
            if (this.min !== this.max && sV(this.min) && sV(this.max) ? y2 && !S2 && b2 === y2.options.tickPixelInterval ? this.tickInterval = S2 = y2.tickInterval : this.tickInterval = sJ(S2, this.tickAmount ? w2 / Math.max(this.tickAmount - 1, 1) : void 0, e10 ? 1 : w2 * b2 / Math.max(this.len, b2)) : this.tickInterval = 1, a10 && !t10) {
              let t11 = this.min !== ((_c2 = this.old) == null ? void 0 : _c2.min) || this.max !== ((_d2 = this.old) == null ? void 0 : _d2.max);
              this.series.forEach(function(e11) {
                var _a3;
                e11.forceCrop = (_a3 = e11.forceCropping) == null ? void 0 : _a3.call(e11), e11.processData(t11);
              }), sY(this, "postProcessData", { hasExtremesChanged: t11 });
            }
            this.setAxisTranslation(), sY(this, "initialAxisTranslation"), this.pointRange && !S2 && (this.tickInterval = Math.max(this.pointRange, this.tickInterval));
            let L2 = sJ(h10.minTickInterval, r10 && !this.series.some((t11) => !t11.sorted) ? this.closestPointRange : 0);
            !S2 && L2 && this.tickInterval < L2 && (this.tickInterval = L2), r10 || n10 || S2 || (this.tickInterval = s3(this, this.tickInterval)), this.tickAmount || (this.tickInterval = this.unsquish()), this.setTickPositions();
          }
          setTickPositions() {
            var _a2, _b2;
            let t10 = this.options, e10 = t10.tickPositions, i10 = t10.tickPositioner, s10 = this.getMinorTickInterval(), o10 = !this.isPanning, r10 = o10 && t10.startOnTick, a10 = o10 && t10.endOnTick, n10 = [], h10;
            if (this.tickmarkOffset = this.categories && "between" === t10.tickmarkPlacement && 1 === this.tickInterval ? 0.5 : 0, this.single = this.min === this.max && sW(this.min) && !this.tickAmount && (this.min % 1 == 0 || false !== t10.allowDecimals), e10) n10 = e10.slice();
            else if (sV(this.min) && sV(this.max)) {
              if (!((_a2 = this.ordinal) == null ? void 0 : _a2.positions) && (this.max - this.min) / this.tickInterval > Math.max(2 * this.len, 200)) n10 = [this.min, this.max], sF(19, false, this.chart);
              else if (this.dateTime) n10 = this.getTimeTicks(this.dateTime.normalizeTimeTickInterval(this.tickInterval, t10.units), this.min, this.max, t10.startOfWeek, (_b2 = this.ordinal) == null ? void 0 : _b2.positions, this.closestPointRange, true);
              else if (this.logarithmic) n10 = this.logarithmic.getLogTickPositions(this.tickInterval, this.min, this.max);
              else {
                let t11 = this.tickInterval, e11 = t11;
                for (; e11 <= 2 * t11; ) if (n10 = this.getLinearTickPositions(this.tickInterval, this.min, this.max), this.tickAmount && n10.length > this.tickAmount) this.tickInterval = s3(this, e11 *= 1.1);
                else break;
              }
              n10.length > this.len && (n10 = [n10[0], n10[n10.length - 1]])[0] === n10[1] && (n10.length = 1), i10 && (this.tickPositions = n10, (h10 = i10.apply(this, [this.min, this.max])) && (n10 = h10));
            }
            this.tickPositions = n10, this.minorTickInterval = "auto" === s10 && this.tickInterval ? this.tickInterval / t10.minorTicksPerMajor : s10, this.paddedTicks = n10.slice(0), this.trimTicks(n10, r10, a10), !this.isLinked && sV(this.min) && sV(this.max) && (this.single && n10.length < 2 && !this.categories && !this.series.some((t11) => t11.is("heatmap") && "between" === t11.options.pointPlacement) && (this.min -= 0.5, this.max += 0.5), e10 || h10 || this.adjustTickAmount()), sY(this, "afterSetTickPositions");
          }
          trimTicks(t10, e10, i10) {
            let s10 = t10[0], o10 = t10[t10.length - 1], r10 = !this.isOrdinal && this.minPointOffset || 0;
            if (sY(this, "trimTicks"), !this.isLinked || !this.grid) {
              if (e10 && s10 !== -1 / 0) this.min = s10;
              else for (; this.min - r10 > t10[0]; ) t10.shift();
              if (i10) this.max = o10;
              else for (; this.max + r10 < t10[t10.length - 1]; ) t10.pop();
              0 === t10.length && sW(s10) && !this.options.tickPositions && t10.push((o10 + s10) / 2);
            }
          }
          alignToOthers() {
            let t10, e10 = this, i10 = e10.chart, s10 = [this], o10 = e10.options, r10 = i10.options.chart, a10 = "yAxis" === this.coll && r10.alignThresholds, n10 = [];
            if (e10.thresholdAlignment = void 0, (false !== r10.alignTicks && o10.alignTicks || a10) && false !== o10.startOnTick && false !== o10.endOnTick && !e10.logarithmic) {
              let o11 = (t11) => {
                let { horiz: e11, options: i11 } = t11;
                return [e11 ? i11.left : i11.top, i11.width, i11.height, i11.pane].join(",");
              }, r11 = o11(this);
              i10[this.coll].forEach(function(i11) {
                let { series: a11 } = i11;
                a11.length && a11.some((t11) => t11.visible) && i11 !== e10 && o11(i11) === r11 && (t10 = true, s10.push(i11));
              });
            }
            if (t10 && a10) {
              s10.forEach((t12) => {
                let i11 = t12.getThresholdAlignment(e10);
                sV(i11) && n10.push(i11);
              });
              let t11 = n10.length > 1 ? n10.reduce((t12, e11) => t12 += e11, 0) / n10.length : void 0;
              s10.forEach((e11) => {
                e11.thresholdAlignment = t11;
              });
            }
            return t10;
          }
          getThresholdAlignment(t10) {
            if ((!sV(this.dataMin) || this !== t10 && this.series.some((t11) => {
              var _a2;
              return t11.isDirty || t11.isDirtyData || ((_a2 = t11.xAxis) == null ? void 0 : _a2.isDirty);
            })) && this.getSeriesExtremes(), sV(this.threshold)) {
              let t11 = sz((this.threshold - (this.dataMin || 0)) / ((this.dataMax || 0) - (this.dataMin || 0)), 0, 1);
              return this.options.reversed && (t11 = 1 - t11), t11;
            }
          }
          getTickAmount() {
            let t10 = this.options, e10 = t10.tickPixelInterval, i10 = t10.tickAmount;
            sW(t10.tickInterval) || i10 || !(this.len < e10) || this.isRadial || this.logarithmic || !t10.startOnTick || !t10.endOnTick || (i10 = 2), !i10 && this.alignToOthers() && (i10 = Math.ceil(this.len / e10) + 1), i10 < 4 && (this.finalTickAmt = i10, i10 = 5), this.tickAmount = i10;
          }
          adjustTickAmount() {
            let t10 = this, { finalTickAmt: e10, max: i10, min: s10, options: o10, tickPositions: r10, tickAmount: a10, thresholdAlignment: n10 } = t10, h10 = r10 == null ? void 0 : r10.length, l2 = sJ(t10.threshold, t10.softThreshold ? 0 : null), d2, c2, p2 = t10.tickInterval, g2, u2 = () => r10.push(sR(r10[r10.length - 1] + p2)), f2 = () => r10.unshift(sR(r10[0] - p2));
            if (sV(n10) && (g2 = 0 === n10 ? 0 : 1 === n10 ? a10 - 1 : Math.round(sz(n10 * (a10 - 1), 1, a10 - 2)), o10.reversed && (g2 = a10 - 1 - g2)), t10.hasData() && sV(s10) && sV(i10)) {
              let n11 = () => {
                t10.transA *= (h10 - 1) / (a10 - 1), t10.min = o10.startOnTick ? r10[0] : Math.min(s10, r10[0]), t10.max = o10.endOnTick ? r10[r10.length - 1] : Math.max(i10, r10[r10.length - 1]);
              };
              if (sV(g2) && sV(t10.threshold)) {
                for (; r10[g2] !== l2 || r10.length !== a10 || r10[0] > s10 || r10[r10.length - 1] < i10; ) {
                  for (r10.length = 0, r10.push(t10.threshold); r10.length < a10; ) void 0 === r10[g2] || r10[g2] > t10.threshold ? f2() : u2();
                  if (p2 > 8 * t10.tickInterval) break;
                  p2 *= 2;
                }
                n11();
              } else if (h10 < a10) {
                for (; r10.length < a10; ) r10.length % 2 || s10 === l2 ? u2() : f2();
                n11();
              }
              if (sW(e10)) {
                for (c2 = d2 = r10.length; c2--; ) (3 === e10 && c2 % 2 == 1 || e10 <= 2 && c2 > 0 && c2 < d2 - 1) && r10.splice(c2, 1);
                t10.finalTickAmt = void 0;
              }
            }
          }
          setScale() {
            var _a2, _b2, _c2, _d2, _e2;
            let { coll: t10, stacking: e10 } = this, i10 = false, s10 = false;
            this.series.forEach((t11) => {
              var _a3;
              i10 = i10 || t11.isDirtyData || t11.isDirty, s10 = s10 || ((_a3 = t11.xAxis) == null ? void 0 : _a3.isDirty) || false;
            }), this.setAxisSize();
            let o10 = this.len !== ((_a2 = this.old) == null ? void 0 : _a2.len);
            o10 || i10 || s10 || this.isLinked || this.forceRedraw || this.userMin !== ((_b2 = this.old) == null ? void 0 : _b2.userMin) || this.userMax !== ((_c2 = this.old) == null ? void 0 : _c2.userMax) || this.alignToOthers() ? (e10 && "yAxis" === t10 && e10.buildStacks(), this.forceRedraw = false, this.userMinRange || (this.minRange = void 0), this.getSeriesExtremes(), this.setTickInterval(), e10 && "xAxis" === t10 && e10.buildStacks(), this.isDirty || (this.isDirty = o10 || this.min !== ((_d2 = this.old) == null ? void 0 : _d2.min) || this.max !== ((_e2 = this.old) == null ? void 0 : _e2.max))) : e10 && e10.cleanStacks(), i10 && delete this.allExtremes, sY(this, "afterSetScale");
          }
          setExtremes(t10, e10, i10 = true, s10, o10) {
            let r10 = this.chart;
            this.series.forEach((t11) => {
              delete t11.kdTree;
            }), t10 = r10.time.parse(t10), e10 = r10.time.parse(e10), sY(this, "setExtremes", o10 = sG(o10, { min: t10, max: e10 }), (t11) => {
              this.userMin = t11.min, this.userMax = t11.max, this.eventArgs = t11, i10 && r10.redraw(s10);
            });
          }
          setAxisSize() {
            let t10 = this.chart, e10 = this.options, i10 = e10.offsets || [0, 0, 0, 0], s10 = this.horiz, o10 = this.width = Math.round(sQ(sJ(e10.width, t10.plotWidth - i10[3] + i10[1]), t10.plotWidth)), r10 = this.height = Math.round(sQ(sJ(e10.height, t10.plotHeight - i10[0] + i10[2]), t10.plotHeight)), a10 = this.top = Math.round(sQ(sJ(e10.top, t10.plotTop + i10[0]), t10.plotHeight, t10.plotTop)), n10 = this.left = Math.round(sQ(sJ(e10.left, t10.plotLeft + i10[3]), t10.plotWidth, t10.plotLeft));
            this.bottom = t10.chartHeight - r10 - a10, this.right = t10.chartWidth - o10 - n10, this.len = Math.max(s10 ? o10 : r10, 0), this.pos = s10 ? n10 : a10;
          }
          getExtremes() {
            let t10 = this.logarithmic;
            return { min: t10 ? sR(t10.lin2log(this.min)) : this.min, max: t10 ? sR(t10.lin2log(this.max)) : this.max, dataMin: this.dataMin, dataMax: this.dataMax, userMin: this.userMin, userMax: this.userMax };
          }
          getThreshold(t10) {
            let e10 = this.logarithmic, i10 = e10 ? e10.lin2log(this.min) : this.min, s10 = e10 ? e10.lin2log(this.max) : this.max;
            return null === t10 || t10 === -1 / 0 ? t10 = i10 : t10 === 1 / 0 ? t10 = s10 : i10 > t10 ? t10 = i10 : s10 < t10 && (t10 = s10), this.translate(t10, 0, 1, 0, 1);
          }
          autoLabelAlign(t10) {
            let e10 = ((t10 - 90 * this.side) % 360 + 360) % 360, i10 = { align: "center" };
            return sY(this, "autoLabelAlign", i10, function(t11) {
              e10 > 15 && e10 < 165 ? t11.align = "right" : e10 > 195 && e10 < 345 && (t11.align = "left");
            }), i10.align;
          }
          tickSize(t10) {
            let e10 = this.options, i10 = sJ(e10["tick" === t10 ? "tickWidth" : "minorTickWidth"], "tick" === t10 && this.isXAxis && !this.categories ? 1 : 0), s10 = e10["tick" === t10 ? "tickLength" : "minorTickLength"], o10;
            i10 && s10 && ("inside" === e10[t10 + "Position"] && (s10 = -s10), o10 = [s10, i10]);
            let r10 = { tickSize: o10 };
            return sY(this, "afterTickSize", r10), r10.tickSize;
          }
          labelMetrics() {
            let t10 = this.chart.renderer, e10 = this.ticks, i10 = e10[Object.keys(e10)[0]] || {};
            return this.chart.renderer.fontMetrics(i10.label || i10.movedLabel || t10.box);
          }
          unsquish() {
            let t10 = this.options.labels, e10 = t10.padding || 0, i10 = this.horiz, s10 = this.tickInterval, o10 = this.len / ((+!!this.categories + this.max - this.min) / s10), r10 = t10.rotation, a10 = sR(0.8 * this.labelMetrics().h), n10 = Math.max(this.max - this.min, 0), h10 = function(t11) {
              let i11 = (t11 + 2 * e10) / (o10 || 1);
              return (i11 = i11 > 1 ? Math.ceil(i11) : 1) * s10 > n10 && t11 !== 1 / 0 && o10 !== 1 / 0 && n10 && (i11 = Math.ceil(n10 / s10)), sR(i11 * s10);
            }, l2 = s10, d2, c2 = Number.MAX_VALUE, p2;
            if (i10) {
              if (!t10.staggerLines && (sV(r10) ? p2 = [r10] : o10 < t10.autoRotationLimit && (p2 = t10.autoRotation)), p2) {
                let t11, e11;
                for (let i11 of p2) (i11 === r10 || i11 && i11 >= -90 && i11 <= 90) && (e11 = (t11 = h10(Math.abs(a10 / Math.sin(sD * i11)))) + Math.abs(i11 / 360)) < c2 && (c2 = e11, d2 = i11, l2 = t11);
              }
            } else l2 = h10(0.75 * a10);
            return this.autoRotation = p2, this.labelRotation = sJ(d2, sV(r10) ? r10 : 0), t10.step ? s10 : l2;
          }
          getSlotWidth(t10) {
            let e10 = this.chart, i10 = this.horiz, s10 = this.options.labels, o10 = Math.max(this.tickPositions.length - !this.categories, 1), r10 = e10.margin[3];
            if (t10 && sV(t10.slotWidth)) return t10.slotWidth;
            if (i10 && s10.step < 2 && !this.isRadial) return s10.rotation ? 0 : (this.staggerLines || 1) * this.len / o10;
            if (!i10) {
              let t11 = s10.style.width;
              if (void 0 !== t11) return parseInt(String(t11), 10);
              if (!this.opposite && r10) return r10 - e10.spacing[3];
            }
            return 0.33 * e10.chartWidth;
          }
          renderUnsquish() {
            let t10 = this.chart, e10 = t10.renderer, i10 = this.tickPositions, s10 = this.ticks, o10 = this.options.labels, r10 = o10.style, a10 = this.horiz, n10 = this.getSlotWidth(), h10 = Math.max(1, Math.round(n10 - (a10 ? 2 * (o10.padding || 0) : o10.distance || 0))), l2 = {}, d2 = this.labelMetrics(), c2 = r10.lineClamp, p2, g2 = c2 != null ? c2 : Math.floor(this.len / (i10.length * d2.h)) || 1, u2 = 0;
            sZ(o10.rotation) || (l2.rotation = o10.rotation || 0), i10.forEach(function(t11) {
              var _a2;
              let e11 = s10[t11];
              e11.movedLabel && e11.replaceMovedLabel();
              let i11 = ((_a2 = e11.label) == null ? void 0 : _a2.textPxLength) || 0;
              i11 > u2 && (u2 = i11);
            }), this.maxLabelLength = u2, this.autoRotation ? u2 > h10 && u2 > d2.h ? l2.rotation = this.labelRotation : this.labelRotation = 0 : n10 && (p2 = h10), l2.rotation && (p2 = u2 > 0.5 * t10.chartHeight ? 0.33 * t10.chartHeight : u2, c2 || (g2 = 1)), this.labelAlign = o10.align || this.autoLabelAlign(this.labelRotation || 0), this.labelAlign && (l2.align = this.labelAlign), i10.forEach(function(t11) {
              let e11 = s10[t11], i11 = e11 == null ? void 0 : e11.label, o11 = r10.width, a11 = {};
              i11 && (i11.attr(l2), e11.shortenLabel ? e11.shortenLabel() : p2 && !o11 && "nowrap" !== r10.whiteSpace && (p2 < (i11.textPxLength || 0) || "SPAN" === i11.element.tagName) ? i11.css(sG(a11, { width: `${p2}px`, lineClamp: g2 })) : !i11.styles.width || a11.width || o11 || i11.css({ width: "auto" }), e11.rotation = l2.rotation);
            }, this), this.tickRotCorr = e10.rotCorr(d2.b, this.labelRotation || 0, 0 !== this.side);
          }
          hasData() {
            return this.series.some(function(t10) {
              return t10.hasData();
            }) || this.options.showEmpty && sW(this.min) && sW(this.max);
          }
          addTitle(t10) {
            let e10, i10 = this.chart.renderer, s10 = this.horiz, o10 = this.opposite, r10 = this.options.title, a10 = this.chart.styledMode;
            this.axisTitle || ((e10 = r10.textAlign) || (e10 = (s10 ? { low: "left", middle: "center", high: "right" } : { low: o10 ? "right" : "left", middle: "center", high: o10 ? "left" : "right" })[r10.align]), this.axisTitle = i10.text(r10.text || "", 0, 0, r10.useHTML).attr({ zIndex: 7, rotation: r10.rotation || 0, align: e10 }).addClass("highcharts-axis-title"), a10 || this.axisTitle.css(s_(r10.style)), this.axisTitle.add(this.axisGroup), this.axisTitle.isNew = true), a10 || r10.style.width || this.isRadial || this.axisTitle.css({ width: this.len + "px" }), this.axisTitle[t10 ? "show" : "hide"](t10);
          }
          generateTick(t10) {
            let e10 = this.ticks;
            e10[t10] ? e10[t10].addLabel() : e10[t10] = new sA(this, t10);
          }
          createGroups() {
            let { axisParent: t10, chart: e10, coll: i10, options: s10 } = this, o10 = e10.renderer, r10 = (e11, r11, a10) => o10.g(e11).attr({ zIndex: a10 }).addClass(`highcharts-${i10.toLowerCase()}${r11} ` + (this.isRadial ? `highcharts-radial-axis${r11} ` : "") + (s10.className || "")).add(t10);
            this.axisGroup || (this.gridGroup = r10("grid", "-grid", s10.gridZIndex), this.axisGroup = r10("axis", "", s10.zIndex), this.labelGroup = r10("axis-labels", "-labels", s10.labels.zIndex));
          }
          getOffset() {
            let t10 = this, { chart: e10, horiz: i10, options: s10, side: o10, ticks: r10, tickPositions: a10, coll: n10 } = t10, h10 = e10.inverted && !t10.isZAxis ? [1, 0, 3, 2][o10] : o10, l2 = t10.hasData(), d2 = s10.title, c2 = s10.labels, p2 = sV(s10.crossing), g2 = e10.axisOffset, u2 = e10.clipOffset, f2 = [-1, 1, 1, -1][o10], m2, x2 = 0, y2, b2 = 0, v2 = 0, k2, w2;
            if (t10.showAxis = m2 = l2 || s10.showEmpty, t10.staggerLines = t10.horiz && c2.staggerLines || void 0, t10.createGroups(), l2 || t10.isLinked ? (a10.forEach(function(e11) {
              t10.generateTick(e11);
            }), t10.renderUnsquish(), t10.reserveSpaceDefault = 0 === o10 || 2 === o10 || { 1: "left", 3: "right" }[o10] === t10.labelAlign, sJ(c2.reserveSpace, !p2 && null, "center" === t10.labelAlign || null, t10.reserveSpaceDefault) && a10.forEach(function(t11) {
              v2 = Math.max(r10[t11].getLabelSize(), v2);
            }), t10.staggerLines && (v2 *= t10.staggerLines), t10.labelOffset = v2 * (t10.opposite ? -1 : 1)) : sK(r10, function(t11, e11) {
              t11.destroy(), delete r10[e11];
            }), (d2 == null ? void 0 : d2.text) && false !== d2.enabled && (t10.addTitle(m2), m2 && !p2 && false !== d2.reserveSpace && (t10.titleOffset = x2 = t10.axisTitle.getBBox()[i10 ? "height" : "width"], b2 = sW(y2 = d2.offset) ? 0 : sJ(d2.margin, i10 ? 5 : 10))), t10.renderLine(), t10.offset = f2 * sJ(s10.offset, g2[o10] ? g2[o10] + (s10.margin || 0) : 0), t10.tickRotCorr = t10.tickRotCorr || { x: 0, y: 0 }, w2 = 0 === o10 ? -t10.labelMetrics().h : 2 === o10 ? t10.tickRotCorr.y : 0, k2 = Math.abs(v2) + b2, v2 && (k2 -= w2, k2 += f2 * (i10 ? sJ(c2.y, t10.tickRotCorr.y + f2 * c2.distance) : sJ(c2.x, f2 * c2.distance))), t10.axisTitleMargin = sJ(y2, k2), t10.getMaxLabelDimensions && (t10.maxLabelDimensions = t10.getMaxLabelDimensions(r10, a10)), "colorAxis" !== n10 && u2) {
              let e11 = this.tickSize("tick");
              g2[o10] = Math.max(g2[o10], (t10.axisTitleMargin || 0) + x2 + f2 * t10.offset, k2, (a10 == null ? void 0 : a10.length) && e11 ? e11[0] + f2 * t10.offset : 0);
              let i11 = !t10.axisLine || s10.offset ? 0 : t10.axisLine.strokeWidth() / 2;
              u2[h10] = Math.max(u2[h10], i11);
            }
            sY(this, "afterGetOffset");
          }
          getLinePath(t10) {
            let e10 = this.chart, i10 = this.opposite, s10 = this.offset, o10 = this.horiz, r10 = this.left + (i10 ? this.width : 0) + s10, a10 = e10.chartHeight - this.bottom - (i10 ? this.height : 0) + s10;
            return i10 && (t10 *= -1), e10.renderer.crispLine([["M", o10 ? this.left : r10, o10 ? a10 : this.top], ["L", o10 ? e10.chartWidth - this.right : r10, o10 ? a10 : e10.chartHeight - this.bottom]], t10);
          }
          renderLine() {
            !this.axisLine && (this.axisLine = this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup), this.chart.styledMode || this.axisLine.attr({ stroke: this.options.lineColor, "stroke-width": this.options.lineWidth, zIndex: 7 }));
          }
          getTitlePosition(t10) {
            let e10 = this.horiz, i10 = this.left, s10 = this.top, o10 = this.len, r10 = this.options.title, a10 = e10 ? i10 : s10, n10 = this.opposite, h10 = this.offset, l2 = r10.x, d2 = r10.y, c2 = this.chart.renderer.fontMetrics(t10), p2 = t10 ? Math.max(t10.getBBox(false, 0).height - c2.h - 1, 0) : 0, g2 = { low: a10 + (e10 ? 0 : o10), middle: a10 + o10 / 2, high: a10 + (e10 ? o10 : 0) }[r10.align], u2 = (e10 ? s10 + this.height : i10) + (e10 ? 1 : -1) * (n10 ? -1 : 1) * (this.axisTitleMargin || 0) + [-p2, p2, c2.f, -p2][this.side], f2 = { x: e10 ? g2 + l2 : u2 + (n10 ? this.width : 0) + h10 + l2, y: e10 ? u2 + d2 - (n10 ? this.height : 0) + h10 : g2 + d2 };
            return sY(this, "afterGetTitlePosition", { titlePosition: f2 }), f2;
          }
          renderMinorTick(t10, e10) {
            let i10 = this.minorTicks;
            i10[t10] || (i10[t10] = new sA(this, t10, "minor")), e10 && i10[t10].isNew && i10[t10].render(null, true), i10[t10].render(null, false, 1);
          }
          renderTick(t10, e10, i10) {
            var _a2;
            let s10 = this.isLinked, o10 = this.ticks;
            (!s10 || t10 >= this.min && t10 <= this.max || ((_a2 = this.grid) == null ? void 0 : _a2.isColumn)) && (o10[t10] || (o10[t10] = new sA(this, t10)), i10 && o10[t10].isNew && o10[t10].render(e10, true, -1), o10[t10].render(e10));
          }
          render() {
            let t10, e10, i10 = this, s10 = i10.chart, o10 = i10.logarithmic, r10 = s10.renderer, a10 = i10.options, n10 = i10.isLinked, h10 = i10.tickPositions, l2 = i10.axisTitle, d2 = i10.ticks, c2 = i10.minorTicks, p2 = i10.alternateBands, g2 = a10.stackLabels, u2 = a10.alternateGridColor, f2 = a10.crossing, m2 = i10.tickmarkOffset, x2 = i10.axisLine, y2 = i10.showAxis, b2 = sP(r10.globalAnimation);
            if (i10.labelEdge.length = 0, i10.overlap = false, [d2, c2, p2].forEach(function(t11) {
              sK(t11, function(t12) {
                t12.isActive = false;
              });
            }), sV(f2)) {
              let t11 = this.isXAxis ? s10.yAxis[0] : s10.xAxis[0], e11 = [1, -1, -1, 1][this.side];
              if (t11) {
                let s11 = t11.toPixels(f2, true);
                i10.horiz && (s11 = t11.len - s11), i10.offset = e11 * s11;
              }
            }
            if (i10.hasData() || n10) {
              let r11 = i10.chart.hasRendered && i10.old && sV(i10.old.min);
              i10.minorTickInterval && !i10.categories && i10.getMinorTickPositions().forEach(function(t11) {
                i10.renderMinorTick(t11, r11);
              }), h10.length && (h10.forEach(function(t11, e11) {
                i10.renderTick(t11, e11, r11);
              }), m2 && (0 === i10.min || i10.single) && (d2[-1] || (d2[-1] = new sA(i10, -1, null, true)), d2[-1].render(-1))), u2 && h10.forEach(function(r12, a11) {
                e10 = void 0 !== h10[a11 + 1] ? h10[a11 + 1] + m2 : i10.max - m2, a11 % 2 == 0 && r12 < i10.max && e10 <= i10.max + (s10.polar ? -m2 : m2) && (p2[r12] || (p2[r12] = new z.PlotLineOrBand(i10, {})), t10 = r12 + m2, p2[r12].options = { from: o10 ? o10.lin2log(t10) : t10, to: o10 ? o10.lin2log(e10) : e10, color: u2, className: "highcharts-alternate-grid" }, p2[r12].render(), p2[r12].isActive = true);
              }), i10._addedPlotLB || (i10._addedPlotLB = true, (a10.plotLines || []).concat(a10.plotBands || []).forEach(function(t11) {
                i10.addPlotBandOrLine(t11);
              }));
            }
            [d2, c2, p2].forEach(function(t11) {
              let e11 = [], i11 = b2.duration;
              sK(t11, function(t12, i12) {
                t12.isActive || (t12.render(i12, false, 0), t12.isActive = false, e11.push(i12));
              }), s2(function() {
                let i12 = e11.length;
                for (; i12--; ) t11[e11[i12]] && !t11[e11[i12]].isActive && (t11[e11[i12]].destroy(), delete t11[e11[i12]]);
              }, t11 !== p2 && s10.hasRendered && i11 ? i11 : 0);
            }), x2 && (x2[x2.isPlaced ? "animate" : "attr"]({ d: this.getLinePath(x2.strokeWidth()) }), x2.isPlaced = true, x2[y2 ? "show" : "hide"](y2)), l2 && y2 && (l2[l2.isNew ? "attr" : "animate"](i10.getTitlePosition(l2)), l2.isNew = false), (g2 == null ? void 0 : g2.enabled) && i10.stacking && i10.stacking.renderStackTotals(), i10.old = { len: i10.len, max: i10.max, min: i10.min, transA: i10.transA, userMax: i10.userMax, userMin: i10.userMin }, i10.isDirty = false, sY(this, "afterRender");
          }
          redraw() {
            this.visible && (this.render(), this.plotLinesAndBands.forEach(function(t10) {
              t10.render();
            })), this.series.forEach(function(t10) {
              t10.isDirty = true;
            });
          }
          getKeepProps() {
            return this.keepProps || s5.keepProps;
          }
          destroy(t10) {
            let e10 = this, i10 = e10.plotLinesAndBands, s10 = this.eventOptions;
            if (sY(this, "destroy", { keepEvents: t10 }), t10 || s0(e10), [e10.ticks, e10.minorTicks, e10.alternateBands].forEach(function(t11) {
              sH(t11);
            }), i10) {
              let t11 = i10.length;
              for (; t11--; ) i10[t11].destroy();
            }
            for (let t11 in ["axisLine", "axisTitle", "axisGroup", "gridGroup", "labelGroup", "cross", "scrollbar"].forEach(function(t12) {
              e10[t12] && (e10[t12] = e10[t12].destroy());
            }), e10.plotLinesAndBandsGroups) e10.plotLinesAndBandsGroups[t11] = e10.plotLinesAndBandsGroups[t11].destroy();
            sK(e10, function(t11, i11) {
              -1 === e10.getKeepProps().indexOf(i11) && delete e10[i11];
            }), this.eventOptions = s10;
          }
          drawCrosshair(t10, e10) {
            var _a2, _b2;
            let i10 = this.crosshair, s10 = (_a2 = i10 == null ? void 0 : i10.snap) != null ? _a2 : true, o10 = this.chart, r10, a10, n10, h10 = this.cross, l2;
            if (sY(this, "drawCrosshair", { e: t10, point: e10 }), t10 || (t10 = (_b2 = this.cross) == null ? void 0 : _b2.e), i10 && false !== (sW(e10) || !s10)) {
              if (s10 ? sW(e10) && (a10 = sJ("colorAxis" !== this.coll ? e10.crosshairPos : null, this.isXAxis ? e10.plotX : this.len - e10.plotY)) : a10 = t10 && (this.horiz ? t10.chartX - this.pos : this.len - t10.chartY + this.pos), sW(a10) && (l2 = { value: e10 && (this.isXAxis ? e10.x : sJ(e10.stackY, e10.y)), translatedValue: a10 }, o10.polar && sG(l2, { isCrosshair: true, chartX: t10 == null ? void 0 : t10.chartX, chartY: t10 == null ? void 0 : t10.chartY, point: e10 }), r10 = this.getPlotLinePath(l2) || null), !sW(r10)) return void this.hideCrosshair();
              n10 = this.categories && !this.isRadial, h10 || (this.cross = h10 = o10.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-" + (n10 ? "category " : "thin ") + (i10.className || "")).attr({ zIndex: sJ(i10.zIndex, 2) }).add(), !o10.styledMode && (h10.attr({ stroke: i10.color || (n10 ? tG.parse("#ccd3ff").setOpacity(0.25).get() : "#cccccc"), "stroke-width": sJ(i10.width, 1) }).css({ "pointer-events": "none" }), i10.dashStyle && h10.attr({ dashstyle: i10.dashStyle }))), h10.show().attr({ d: r10 }), n10 && !i10.width && h10.attr({ "stroke-width": this.transA }), this.cross.e = t10;
            } else this.hideCrosshair();
            sY(this, "afterDrawCrosshair", { e: t10, point: e10 });
          }
          hideCrosshair() {
            this.cross && this.cross.hide(), sY(this, "afterHideCrosshair");
          }
          update(t10, e10) {
            let i10 = this.chart;
            t10 = s_(this.userOptions, t10), this.destroy(true), this.init(i10, t10), i10.isDirtyBox = true, sJ(e10, true) && i10.redraw();
          }
          remove(t10) {
            let e10 = this.chart, i10 = this.coll, s10 = this.series, o10 = s10.length;
            for (; o10--; ) s10[o10] && s10[o10].remove(false);
            sX(e10.axes, this), sX(e10[i10] || [], this), e10.orderItems(i10), this.destroy(), e10.isDirtyBox = true, sJ(t10, true) && e10.redraw();
          }
          setTitle(t10, e10) {
            this.update({ title: t10 }, e10);
          }
          setCategories(t10, e10) {
            this.update({ categories: t10 }, e10);
          }
        }
        s5.keepProps = ["coll", "extKey", "hcEvents", "len", "names", "series", "userMax", "userMin"];
        let { addEvent: s6, getMagnitude: s9, normalizeTickInterval: s4, timeUnits: s8 } = tn;
        !(function(t10) {
          function e10() {
            return this.chart.time.getTimeTicks.apply(this.chart.time, arguments);
          }
          function i10() {
            if ("datetime" !== this.type) {
              this.dateTime = void 0;
              return;
            }
            this.dateTime || (this.dateTime = new s10(this));
          }
          t10.compose = function(t11) {
            return t11.keepProps.includes("dateTime") || (t11.keepProps.push("dateTime"), t11.prototype.getTimeTicks = e10, s6(t11, "afterSetType", i10)), t11;
          };
          class s10 {
            constructor(t11) {
              this.axis = t11;
            }
            normalizeTimeTickInterval(t11, e11) {
              let i11 = e11 || [["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]], ["second", [1, 2, 5, 10, 15, 30]], ["minute", [1, 2, 5, 10, 15, 30]], ["hour", [1, 2, 3, 4, 6, 8, 12]], ["day", [1, 2]], ["week", [1, 2]], ["month", [1, 2, 3, 4, 6]], ["year", null]], s11 = i11[i11.length - 1], o10 = s8[s11[0]], r10 = s11[1], a10;
              for (a10 = 0; a10 < i11.length && (o10 = s8[(s11 = i11[a10])[0]], r10 = s11[1], !i11[a10 + 1] || !(t11 <= (o10 * r10[r10.length - 1] + s8[i11[a10 + 1][0]]) / 2)); a10++) ;
              o10 === s8.year && t11 < 5 * o10 && (r10 = [1, 2, 5]);
              let n10 = s4(t11 / o10, r10, "year" === s11[0] ? Math.max(s9(t11 / o10), 1) : 1);
              return { unitRange: o10, count: n10, unitName: s11[0] };
            }
            getXDateFormat(t11, e11) {
              let { axis: i11 } = this, s11 = i11.chart.time;
              return i11.closestPointRange ? s11.getDateFormat(i11.closestPointRange, t11, i11.options.startOfWeek, e11) || s11.resolveDTLFormat(e11.year).main : s11.resolveDTLFormat(e11.day).main;
            }
          }
          t10.Additions = s10;
        })(k || (k = {}));
        let s7 = k, { addEvent: ot, normalizeTickInterval: oe, pick: oi } = tn;
        !(function(t10) {
          function e10() {
            var _a2;
            "logarithmic" !== this.type ? this.logarithmic = void 0 : (_a2 = this.logarithmic) != null ? _a2 : this.logarithmic = new s10(this);
          }
          function i10() {
            let t11 = this.logarithmic;
            t11 && (this.lin2val = function(e11) {
              return t11.lin2log(e11);
            }, this.val2lin = function(e11) {
              return t11.log2lin(e11);
            });
          }
          t10.compose = function(t11) {
            return t11.keepProps.includes("logarithmic") || (t11.keepProps.push("logarithmic"), ot(t11, "afterSetType", e10), ot(t11, "afterInit", i10)), t11;
          };
          class s10 {
            constructor(t11) {
              this.axis = t11;
            }
            getLogTickPositions(t11, e11, i11, s11) {
              let o10 = this.axis, r10 = o10.len, a10 = o10.options, n10 = [];
              if (s11 || (this.minorAutoInterval = void 0), t11 >= 0.5) t11 = Math.round(t11), n10 = o10.getLinearTickPositions(t11, e11, i11);
              else if (t11 >= 0.08) {
                let o11, r11, a11, h10, l2, d2, c2, p2 = Math.floor(e11);
                for (o11 = t11 > 0.3 ? [1, 2, 4] : t11 > 0.15 ? [1, 2, 4, 6, 8] : [1, 2, 3, 4, 5, 6, 7, 8, 9], r11 = p2; r11 < i11 + 1 && !c2; r11++) for (a11 = 0, h10 = o11.length; a11 < h10 && !c2; a11++) (l2 = this.log2lin(this.lin2log(r11) * o11[a11])) > e11 && (!s11 || d2 <= i11) && void 0 !== d2 && n10.push(d2), d2 > i11 && (c2 = true), d2 = l2;
              } else {
                let h10 = this.lin2log(e11), l2 = this.lin2log(i11), d2 = s11 ? o10.getMinorTickInterval() : a10.tickInterval, c2 = a10.tickPixelInterval / (s11 ? 5 : 1), p2 = s11 ? r10 / o10.tickPositions.length : r10;
                t11 = oe(t11 = oi("auto" === d2 ? null : d2, this.minorAutoInterval, (l2 - h10) * c2 / (p2 || 1))), n10 = o10.getLinearTickPositions(t11, h10, l2).map(this.log2lin), s11 || (this.minorAutoInterval = t11 / 5);
              }
              return s11 || (o10.tickInterval = t11), n10;
            }
            lin2log(t11) {
              return Math.pow(10, t11);
            }
            log2lin(t11) {
              return Math.log(t11) / Math.LN10;
            }
          }
          t10.Additions = s10;
        })(w || (w = {}));
        let os = w, { erase: oo, extend: or, isNumber: oa } = tn;
        !(function(t10) {
          let e10;
          function i10(t11) {
            return this.addPlotBandOrLine(t11, "plotBands");
          }
          function s10(t11, i11) {
            let s11 = this.userOptions, o11 = new e10(this, t11);
            if (this.visible && (o11 = o11.render()), o11) {
              if (this._addedPlotLB || (this._addedPlotLB = true, (s11.plotLines || []).concat(s11.plotBands || []).forEach((t12) => {
                this.addPlotBandOrLine(t12);
              })), i11) {
                let e11 = s11[i11] || [];
                e11.push(t11), s11[i11] = e11;
              }
              this.plotLinesAndBands.push(o11);
            }
            return o11;
          }
          function o10(t11) {
            return this.addPlotBandOrLine(t11, "plotLines");
          }
          function r10(t11, e11, i11) {
            i11 = i11 || this.options;
            let s11 = this.getPlotLinePath({ value: e11, force: true, acrossPanes: i11.acrossPanes }), o11 = [], r11 = this.horiz, a11 = !oa(this.min) || !oa(this.max) || t11 < this.min && e11 < this.min || t11 > this.max && e11 > this.max, n11 = this.getPlotLinePath({ value: t11, force: true, acrossPanes: i11.acrossPanes }), h11, l2 = 1, d2;
            if (n11 && s11) for (a11 && (d2 = n11.toString() === s11.toString(), l2 = 0), h11 = 0; h11 < n11.length; h11 += 2) {
              let t12 = n11[h11], e12 = n11[h11 + 1], i12 = s11[h11], a12 = s11[h11 + 1];
              ("M" === t12[0] || "L" === t12[0]) && ("M" === e12[0] || "L" === e12[0]) && ("M" === i12[0] || "L" === i12[0]) && ("M" === a12[0] || "L" === a12[0]) && (r11 && i12[1] === t12[1] ? (i12[1] += l2, a12[1] += l2) : r11 || i12[2] !== t12[2] || (i12[2] += l2, a12[2] += l2), o11.push(["M", t12[1], t12[2]], ["L", e12[1], e12[2]], ["L", a12[1], a12[2]], ["L", i12[1], i12[2]], ["Z"])), o11.isFlat = d2;
            }
            return o11;
          }
          function a10(t11) {
            this.removePlotBandOrLine(t11);
          }
          function n10(t11) {
            let e11 = this.plotLinesAndBands, i11 = this.options, s11 = this.userOptions;
            if (e11) {
              let o11 = e11.length;
              for (; o11--; ) e11[o11].id === t11 && e11[o11].destroy();
              [i11.plotLines || [], s11.plotLines || [], i11.plotBands || [], s11.plotBands || []].forEach(function(e12) {
                var _a2;
                for (o11 = e12.length; o11--; ) ((_a2 = e12[o11]) == null ? void 0 : _a2.id) === t11 && oo(e12, e12[o11]);
              });
            }
          }
          function h10(t11) {
            this.removePlotBandOrLine(t11);
          }
          t10.compose = function(t11, l2) {
            let d2 = l2.prototype;
            return d2.addPlotBand || (e10 = t11, or(d2, { addPlotBand: i10, addPlotLine: o10, addPlotBandOrLine: s10, getPlotBandPath: r10, removePlotBand: a10, removePlotLine: h10, removePlotBandOrLine: n10 })), l2;
          };
        })(M || (M = {}));
        let on = M, { addEvent: oh, arrayMax: ol, arrayMin: od, defined: oc, destroyObjectProperties: op, erase: og, fireEvent: ou, merge: of, objectEach: om, pick: ox } = tn;
        class oy {
          static compose(t10, e10) {
            return oh(t10, "afterInit", function() {
              this.labelCollectors.push(() => {
                var _a2;
                let t11 = [];
                for (let e11 of this.axes) for (let { label: i10, options: s10 } of e11.plotLinesAndBands) i10 && !((_a2 = s10 == null ? void 0 : s10.label) == null ? void 0 : _a2.allowOverlap) && t11.push(i10);
                return t11;
              });
            }), on.compose(oy, e10);
          }
          constructor(t10, e10) {
            this.axis = t10, this.options = e10, this.id = e10.id;
          }
          render() {
            var _a2, _b2, _c2;
            ou(this, "render");
            let { axis: t10, options: e10 } = this, { horiz: i10, logarithmic: s10 } = t10, { color: o10, events: r10, zIndex: a10 = 0 } = e10, { renderer: n10, time: h10 } = t10.chart, l2 = {}, d2 = h10.parse(e10.to), c2 = h10.parse(e10.from), p2 = h10.parse(e10.value), g2 = e10.borderWidth, u2 = e10.label, { label: f2, svgElem: m2 } = this, x2 = [], y2, b2 = oc(c2) && oc(d2), v2 = oc(p2), k2 = !m2, w2 = { class: "highcharts-plot-" + (b2 ? "band " : "line ") + (e10.className || "") }, M2 = b2 ? "bands" : "lines";
            if (!t10.chart.styledMode && (v2 ? (w2.stroke = o10 || "#999999", w2["stroke-width"] = ox(e10.width, 1), e10.dashStyle && (w2.dashstyle = e10.dashStyle)) : b2 && (w2.fill = o10 || "#e6e9ff", g2 && (w2.stroke = e10.borderColor, w2["stroke-width"] = g2))), l2.zIndex = a10, M2 += "-" + a10, (y2 = t10.plotLinesAndBandsGroups[M2]) || (t10.plotLinesAndBandsGroups[M2] = y2 = n10.g("plot-" + M2).attr(l2).add()), m2 || (this.svgElem = m2 = n10.path().attr(w2).add(y2)), oc(p2)) x2 = t10.getPlotLinePath({ value: (_a2 = s10 == null ? void 0 : s10.log2lin(p2)) != null ? _a2 : p2, lineWidth: m2.strokeWidth(), acrossPanes: e10.acrossPanes });
            else {
              if (!(oc(c2) && oc(d2))) return;
              x2 = t10.getPlotBandPath((_b2 = s10 == null ? void 0 : s10.log2lin(c2)) != null ? _b2 : c2, (_c2 = s10 == null ? void 0 : s10.log2lin(d2)) != null ? _c2 : d2, e10);
            }
            return !this.eventsAdded && r10 && (om(r10, (t11, e11) => {
              m2 == null ? void 0 : m2.on(e11, (t12) => {
                r10[e11].apply(this, [t12]);
              });
            }), this.eventsAdded = true), (k2 || !m2.d) && (x2 == null ? void 0 : x2.length) ? m2.attr({ d: x2 }) : m2 && (x2 ? (m2.show(), m2.animate({ d: x2 })) : m2.d && (m2.hide(), f2 && (this.label = f2 = f2.destroy()))), u2 && (oc(u2.text) || oc(u2.formatter)) && (x2 == null ? void 0 : x2.length) && t10.width > 0 && t10.height > 0 && !x2.isFlat ? (u2 = of(__spreadValues({ align: i10 && b2 ? "center" : void 0, x: i10 ? !b2 && 4 : 10, verticalAlign: !i10 && b2 ? "middle" : void 0, y: i10 ? b2 ? 16 : 10 : b2 ? 6 : -4, rotation: i10 && !b2 ? 90 : 0 }, b2 ? { inside: true } : {}), u2), this.renderLabel(u2, x2, b2, a10)) : f2 && f2.hide(), this;
          }
          renderLabel(t10, e10, i10, s10) {
            var _a2, _b2, _c2;
            let o10 = this.axis, r10 = o10.chart.renderer, a10 = t10.inside, n10 = this.label;
            n10 || (this.label = n10 = r10.text(this.getLabelText(t10), 0, 0, t10.useHTML).attr({ align: t10.textAlign || t10.align, rotation: t10.rotation, class: "highcharts-plot-" + (i10 ? "band" : "line") + "-label " + (t10.className || ""), zIndex: s10 }), o10.chart.styledMode || n10.css(of({ color: (_b2 = (_a2 = o10.chart.options.title) == null ? void 0 : _a2.style) == null ? void 0 : _b2.color, fontSize: "0.8em", textOverflow: i10 && !a10 ? "" : "ellipsis" }, t10.style)), n10.add());
            let h10 = e10.xBounds || [e10[0][1], e10[1][1], i10 ? e10[2][1] : e10[0][1]], l2 = e10.yBounds || [e10[0][2], e10[1][2], i10 ? e10[2][2] : e10[0][2]], d2 = od(h10), c2 = od(l2), p2 = ol(h10) - d2;
            n10.align(t10, false, { x: d2, y: c2, width: p2, height: ol(l2) - c2 }), n10.alignAttr.y -= r10.fontMetrics(n10).b, (!n10.alignValue || "left" === n10.alignValue || oc(a10)) && n10.css({ width: (((_c2 = t10.style) == null ? void 0 : _c2.width) || (i10 && a10 ? p2 : 90 === n10.rotation ? o10.height - (n10.alignAttr.y - o10.top) : (t10.clip ? o10.width : o10.chart.chartWidth) - (n10.alignAttr.x - o10.left))) + "px" }), n10.show(true);
          }
          getLabelText(t10) {
            return oc(t10.formatter) ? t10.formatter.call(this) : t10.text;
          }
          destroy() {
            og(this.axis.plotLinesAndBands, this), delete this.axis, op(this);
          }
        }
        let { animObject: ob } = t5, { format: ov } = eS, { composed: ok, dateFormats: ow, doc: oM, isSafari: oS } = z, { distribute: oT } = eO, { addEvent: oC, clamp: oA, css: oP, clearTimeout: oL, discardElement: oO, extend: oE, fireEvent: oI, getAlignFactor: oD, isArray: oB, isNumber: oN, isObject: oz, isString: oR, merge: oW, pick: oH, pushUnique: oX, splat: oF, syncTimeout: oG } = tn;
        class oY {
          constructor(t10, e10, i10) {
            this.allowShared = true, this.crosshairs = [], this.distance = 0, this.isHidden = true, this.isSticky = false, this.options = {}, this.outside = false, this.chart = t10, this.init(t10, e10), this.pointer = i10;
          }
          bodyFormatter(t10) {
            return t10.map((t11) => {
              let e10 = t11.series.tooltipOptions, i10 = t11.formatPrefix || "point";
              return (e10[i10 + "Formatter"] || t11.tooltipFormatter).call(t11, e10[i10 + "Format"] || "");
            });
          }
          cleanSplit(t10) {
            this.chart.series.forEach(function(e10) {
              let i10 = e10 == null ? void 0 : e10.tt;
              i10 && (!i10.isActive || t10 ? e10.tt = i10.destroy() : i10.isActive = false);
            });
          }
          defaultFormatter(t10) {
            let e10, i10 = this.points || oF(this);
            return (e10 = (e10 = [t10.headerFooterFormatter(i10[0])]).concat(t10.bodyFormatter(i10))).push(t10.headerFooterFormatter(i10[0], true)), e10;
          }
          destroy() {
            this.label && (this.label = this.label.destroy()), this.split && (this.cleanSplit(true), this.tt && (this.tt = this.tt.destroy())), this.renderer && (this.renderer = this.renderer.destroy(), oO(this.container)), oL(this.hideTimer);
          }
          getAnchor(t10, e10) {
            var _a2;
            let i10, { chart: s10, pointer: o10 } = this, r10 = s10.inverted, a10 = s10.plotTop, n10 = s10.plotLeft;
            if (t10 = oF(t10), ((_a2 = t10[0].series) == null ? void 0 : _a2.yAxis) && !t10[0].series.yAxis.options.reversedStacks && (t10 = t10.slice().reverse()), this.followPointer && e10) void 0 === e10.chartX && (e10 = o10.normalize(e10)), i10 = [e10.chartX - n10, e10.chartY - a10];
            else if (t10[0].tooltipPos) i10 = t10[0].tooltipPos;
            else {
              let s11 = 0, o11 = 0;
              t10.forEach(function(t11) {
                let e11 = t11.pos(true);
                e11 && (s11 += e11[0], o11 += e11[1]);
              }), s11 /= t10.length, o11 /= t10.length, this.shared && t10.length > 1 && e10 && (r10 ? s11 = e10.chartX : o11 = e10.chartY), i10 = [s11 - n10, o11 - a10];
            }
            let h10 = { point: t10[0], ret: i10 };
            return oI(this, "getAnchor", h10), h10.ret.map(Math.round);
          }
          getClassName(t10, e10, i10) {
            let s10 = this.options, o10 = t10.series, r10 = o10.options;
            return [s10.className, "highcharts-label", i10 && "highcharts-tooltip-header", e10 ? "highcharts-tooltip-box" : "highcharts-tooltip", !i10 && "highcharts-color-" + oH(t10.colorIndex, o10.colorIndex), r10 == null ? void 0 : r10.className].filter(oR).join(" ");
          }
          getLabel({ anchorX: t10, anchorY: e10 } = { anchorX: 0, anchorY: 0 }) {
            var _a2;
            let i10 = this, s10 = this.chart.styledMode, o10 = this.options, r10 = this.split && this.allowShared, a10 = this.container, n10 = this.chart.renderer;
            if (this.label) {
              let t11 = !this.label.hasClass("highcharts-label");
              (!r10 && t11 || r10 && !t11) && this.destroy();
            }
            if (!this.label) {
              if (this.outside) {
                let t11 = this.chart, e11 = t11.options.chart.style, i11 = eT.getRendererType();
                this.container = a10 = z.doc.createElement("div"), a10.className = "highcharts-tooltip-container " + (t11.renderTo.className.match(/(highcharts[a-zA-Z0-9-]+)\s?/gm) || ""), oP(a10, { position: "absolute", top: "1px", pointerEvents: "none", zIndex: Math.max(this.options.style.zIndex || 0, ((e11 == null ? void 0 : e11.zIndex) || 0) + 3) }), this.renderer = n10 = new i11(a10, 0, 0, e11, void 0, void 0, n10.styledMode);
              }
              if (r10 ? this.label = n10.g("tooltip") : (this.label = n10.label("", t10, e10, o10.shape || "callout", void 0, void 0, o10.useHTML, void 0, "tooltip").attr({ padding: o10.padding, r: o10.borderRadius }), s10 || this.label.attr({ fill: o10.backgroundColor, "stroke-width": o10.borderWidth || 0 }).css(o10.style).css({ pointerEvents: o10.style.pointerEvents || (this.shouldStickOnContact() ? "auto" : "none") })), i10.outside) {
                let t11 = this.label;
                [t11.xSetter, t11.ySetter].forEach((e11, s11) => {
                  t11[s11 ? "ySetter" : "xSetter"] = (o11) => {
                    e11.call(t11, i10.distance), t11[s11 ? "y" : "x"] = o11, a10 && (a10.style[s11 ? "top" : "left"] = `${o11}px`);
                  };
                });
              }
              this.label.attr({ zIndex: 8 }).shadow((_a2 = o10.shadow) != null ? _a2 : !o10.fixed).add();
            }
            return a10 && !a10.parentElement && z.doc.body.appendChild(a10), this.label;
          }
          getPlayingField() {
            let { body: t10, documentElement: e10 } = oM, { chart: i10, distance: s10, outside: o10 } = this;
            return { width: o10 ? Math.max(t10.scrollWidth, e10.scrollWidth, t10.offsetWidth, e10.offsetWidth, e10.clientWidth) - 2 * s10 - 2 : i10.chartWidth, height: o10 ? Math.max(t10.scrollHeight, e10.scrollHeight, t10.offsetHeight, e10.offsetHeight, e10.clientHeight) : i10.chartHeight };
          }
          getPosition(t10, e10, i10) {
            var _a2, _b2;
            let { distance: s10, chart: o10, outside: r10, pointer: a10 } = this, { inverted: n10, plotLeft: h10, plotTop: l2, polar: d2 } = o10, { plotX: c2 = 0, plotY: p2 = 0 } = i10, g2 = {}, u2 = n10 && i10.h || 0, { height: f2, width: m2 } = this.getPlayingField(), x2 = a10.getChartPosition(), y2 = (i11) => {
              let a11 = "x" === i11;
              return [i11, a11 ? m2 : f2, a11 ? t10 : e10].concat(r10 ? [a11 ? t10 * x2.scaleX : e10 * x2.scaleY, a11 ? x2.left - s10 + (c2 + h10) * x2.scaleX : x2.top - s10 + (p2 + l2) * x2.scaleY, 0, a11 ? m2 : f2] : [a11 ? t10 : e10, a11 ? c2 + h10 : p2 + l2, a11 ? h10 : l2, a11 ? h10 + o10.plotWidth : l2 + o10.plotHeight]);
            }, b2 = y2("y"), v2 = y2("x"), k2, w2 = !!i10.negative;
            !d2 && ((_b2 = (_a2 = o10.hoverSeries) == null ? void 0 : _a2.yAxis) == null ? void 0 : _b2.reversed) && (w2 = !w2);
            let M2 = !this.followPointer && oH(i10.ttBelow, !d2 && !n10 === w2), S2 = function(t11, e11, i11, o11, a11, n11, h11) {
              let l3 = r10 ? "y" === t11 ? s10 * x2.scaleY : s10 * x2.scaleX : s10, d3 = (i11 - o11) / 2, c3 = o11 < a11 - s10, p3 = a11 + s10 + o11 < e11, f3 = a11 - l3 - i11 + d3, m3 = a11 + l3 - d3;
              if (M2 && p3) g2[t11] = m3;
              else if (!M2 && c3) g2[t11] = f3;
              else if (c3) g2[t11] = Math.min(h11 - o11, f3 - u2 < 0 ? f3 : f3 - u2);
              else {
                if (!p3) return g2[t11] = 0, false;
                g2[t11] = Math.max(n11, m3 + u2 + i11 > e11 ? m3 : m3 + u2);
              }
            }, T2 = function(t11, e11, i11, o11, r11) {
              if (r11 < s10 || r11 > e11 - s10) return false;
              r11 < i11 / 2 ? g2[t11] = 1 : r11 > e11 - o11 / 2 ? g2[t11] = e11 - o11 - 2 : g2[t11] = r11 - i11 / 2;
            }, C2 = function(t11) {
              [b2, v2] = [v2, b2], k2 = t11;
            }, A2 = () => {
              false !== S2.apply(0, b2) ? false !== T2.apply(0, v2) || k2 || (C2(true), A2()) : k2 ? g2.x = g2.y = 0 : (C2(true), A2());
            };
            return (n10 && !d2 || this.len > 1) && C2(), A2(), g2;
          }
          getFixedPosition(t10, e10, i10) {
            var _a2;
            let s10 = i10.series, { chart: o10, options: r10, split: a10 } = this, n10 = r10.position, h10 = n10.relativeTo, l2 = r10.shared || ((_a2 = s10 == null ? void 0 : s10.yAxis) == null ? void 0 : _a2.isRadial) && ("pane" === h10 || !h10) ? "plotBox" : h10, d2 = "chart" === l2 ? o10.renderer : o10[l2] || o10.getClipBox(s10, true);
            return { x: d2.x + (d2.width - t10) * oD(n10.align) + n10.x, y: d2.y + (d2.height - e10) * oD(n10.verticalAlign) + (!a10 && n10.y || 0) };
          }
          hide(t10) {
            let e10 = this;
            oL(this.hideTimer), t10 = oH(t10, this.options.hideDelay), this.isHidden || (this.hideTimer = oG(function() {
              let i10 = e10.getLabel();
              e10.getLabel().animate({ opacity: 0 }, { duration: t10 ? 150 : t10, complete: () => {
                i10.hide(), e10.container && e10.container.remove();
              } }), e10.isHidden = true;
            }, t10));
          }
          init(t10, e10) {
            this.chart = t10, this.options = e10, this.crosshairs = [], this.isHidden = true, this.split = e10.split && !t10.inverted && !t10.polar, this.shared = e10.shared || this.split, this.outside = oH(e10.outside, !!(t10.scrollablePixelsX || t10.scrollablePixelsY));
          }
          shouldStickOnContact(t10) {
            return !!(!this.followPointer && this.options.stickOnContact && (!t10 || this.pointer.inClass(t10.target, "highcharts-tooltip")));
          }
          move(t10, e10, i10, s10) {
            let { followPointer: o10, options: r10 } = this, a10 = ob(!o10 && !this.isHidden && !r10.fixed && r10.animation), n10 = o10 || (this.len || 0) > 1, h10 = { x: t10, y: e10 };
            n10 ? h10.anchorX = h10.anchorY = NaN : (h10.anchorX = i10, h10.anchorY = s10), a10.step = () => this.drawTracker(), this.getLabel().animate(h10, a10);
          }
          refresh(t10, e10) {
            let { chart: i10, options: s10, pointer: o10, shared: r10 } = this, a10 = oF(t10), n10 = a10[0], h10 = s10.format, l2 = s10.formatter || this.defaultFormatter, d2 = i10.styledMode, c2 = this.allowShared;
            if (!s10.enabled || !n10.series) return;
            oL(this.hideTimer), this.allowShared = !(!oB(t10) && t10.series && t10.series.noSharedTooltip), c2 = c2 && !this.allowShared, this.followPointer = !this.split && n10.series.tooltipOptions.followPointer;
            let p2 = this.getAnchor(t10, e10), g2 = p2[0], u2 = p2[1];
            r10 && this.allowShared && (o10.applyInactiveState(a10), a10.forEach((t11) => t11.setState("hover")), n10.points = a10), this.len = a10.length;
            let f2 = oR(h10) ? ov(h10, n10, i10) : l2.call(n10, this);
            n10.points = void 0;
            let m2 = n10.series;
            if (this.distance = oH(m2.tooltipOptions.distance, 16), false === f2) this.hide();
            else {
              if (this.split && this.allowShared) this.renderSplit(f2, a10);
              else {
                let t11 = g2, r11 = u2;
                if (e10 && o10.isDirectTouch && (t11 = e10.chartX - i10.plotLeft, r11 = e10.chartY - i10.plotTop), !(i10.polar || false === m2.options.clip || a10.some((e11) => o10.isDirectTouch || e11.series.shouldShowTooltip(t11, r11)))) return void this.hide();
                {
                  let t12 = this.getLabel(c2 && this.tt || {});
                  (!s10.style.width || d2) && t12.css({ width: (this.outside ? this.getPlayingField() : i10.spacingBox).width + "px" }), t12.attr({ class: this.getClassName(n10), text: f2 && f2.join ? f2.join("") : f2 }), this.outside && t12.attr({ x: oA(t12.x || 0, 0, this.getPlayingField().width - (t12.width || 0) - 1) }), d2 || t12.attr({ stroke: s10.borderColor || n10.color || m2.color || "#666666" }), this.updatePosition({ plotX: g2, plotY: u2, negative: n10.negative, ttBelow: n10.ttBelow, series: m2, h: p2[2] || 0 });
                }
              }
              this.isHidden && this.label && this.label.attr({ opacity: 1 }).show(), this.isHidden = false;
            }
            oI(this, "refresh");
          }
          renderSplit(t10, e10) {
            var _a2, _b2;
            let i10 = this, { chart: s10, chart: { chartWidth: o10, chartHeight: r10, plotHeight: a10, plotLeft: n10, plotTop: h10, scrollablePixelsY: l2 = 0, scrollablePixelsX: d2, styledMode: c2 }, distance: p2, options: g2, options: { fixed: u2, position: f2, positioner: m2 }, pointer: x2 } = i10, { scrollLeft: y2 = 0, scrollTop: b2 = 0 } = ((_a2 = s10.scrollablePlotArea) == null ? void 0 : _a2.scrollingContainer) || {}, v2 = i10.outside && "number" != typeof d2 ? oM.documentElement.getBoundingClientRect() : { left: y2, right: y2 + o10, top: b2, bottom: b2 + r10 }, k2 = i10.getLabel(), w2 = this.renderer || s10.renderer, M2 = !!((_b2 = s10.xAxis[0]) == null ? void 0 : _b2.opposite), { left: S2, top: T2 } = x2.getChartPosition(), C2 = m2 || u2, A2 = h10 + b2, P2 = 0, L2 = a10 - l2, O2 = function(t11, e11, s11, o11 = [0, 0], r11 = true) {
              let a11, n11;
              if (s11.isHeader) n11 = M2 ? 0 : L2, a11 = oA(o11[0] - t11 / 2, v2.left, v2.right - t11 - (i10.outside ? S2 : 0));
              else if (u2 && s11) {
                let o12 = i10.getFixedPosition(t11, e11, s11);
                a11 = o12.x, n11 = o12.y - A2;
              } else n11 = o11[1] - A2, a11 = oA(a11 = r11 ? o11[0] - t11 - p2 : o11[0] + p2, r11 ? a11 : v2.left, v2.right);
              return { x: a11, y: n11 };
            };
            oR(t10) && (t10 = [false, t10]);
            let E2 = t10.slice(0, e10.length + 1).reduce(function(t11, s11, o11) {
              if (false !== s11 && "" !== s11) {
                let r11 = e10[o11 - 1] || { isHeader: true, plotX: e10[0].plotX, plotY: a10, series: {} }, l3 = r11.isHeader, d3 = l3 ? i10 : r11.series, f3 = d3.tt = (function(t12, e11, s12) {
                  var _a3;
                  let o12 = t12, { isHeader: r12, series: a11 } = e11, n11 = a11.tooltipOptions || g2;
                  if (!o12) {
                    let t13 = { padding: n11.padding, r: n11.borderRadius };
                    c2 || (t13.fill = n11.backgroundColor, t13["stroke-width"] = (_a3 = n11.borderWidth) != null ? _a3 : u2 && !r12 ? 0 : 1), o12 = w2.label("", 0, 0, n11[r12 ? "headerShape" : "shape"] || (u2 && !r12 ? "rect" : "callout"), void 0, void 0, n11.useHTML).addClass(i10.getClassName(e11, true, r12)).attr(t13).add(k2);
                  }
                  return o12.isActive = true, o12.attr({ text: s12 }), c2 || o12.css(n11.style).attr({ stroke: n11.borderColor || e11.color || a11.color || "#333333" }), o12;
                })(d3.tt, r11, s11.toString()), x3 = f3.getBBox(), y3 = x3.width + f3.strokeWidth();
                l3 && (P2 = x3.height, L2 += P2, M2 && (A2 -= P2));
                let { anchorX: b3, anchorY: S3 } = (function(t12) {
                  let e11, i11, { isHeader: s12, plotX: o12 = 0, plotY: r12 = 0, series: l4 } = t12;
                  if (s12) e11 = Math.max(n10 + o12, n10), i11 = h10 + a10 / 2;
                  else {
                    let { xAxis: t13, yAxis: s13 } = l4;
                    e11 = t13.pos + oA(o12, -p2, t13.len + p2), l4.shouldShowTooltip(0, s13.pos - h10 + r12, { ignoreX: true }) && (i11 = s13.pos + r12);
                  }
                  return { anchorX: e11 = oA(e11, v2.left - p2, v2.right + p2), anchorY: i11 };
                })(r11);
                if ("number" == typeof S3) {
                  let e11 = x3.height + 1, s12 = (m2 || O2).call(i10, y3, e11, r11, [b3, S3]);
                  t11.push({ align: C2 ? 0 : void 0, anchorX: b3, anchorY: S3, boxWidth: y3, point: r11, rank: oH(s12.rank, +!!l3), size: e11, target: s12.y, tt: f3, x: s12.x });
                } else f3.isActive = false;
              }
              return t11;
            }, []);
            !C2 && E2.some((t11) => {
              let { outside: e11 } = i10, s11 = (e11 ? S2 : 0) + t11.anchorX;
              return s11 < v2.left && s11 + t11.boxWidth < v2.right || s11 < S2 - v2.left + t11.boxWidth && v2.right - s11 > s11;
            }) && (E2 = E2.map((t11) => {
              let { x: e11, y: i11 } = O2.call(this, t11.boxWidth, t11.size, t11.point, [t11.anchorX, t11.anchorY], false);
              return oE(t11, { target: i11, x: e11 });
            })), i10.cleanSplit(), oT(E2, L2);
            let I2 = { left: S2, right: S2 };
            E2.forEach(function(t11) {
              let { x: e11, boxWidth: s11, isHeader: o11 } = t11;
              !o11 && (i10.outside && S2 + e11 < I2.left && (I2.left = S2 + e11), !o11 && i10.outside && I2.left + s11 > I2.right && (I2.right = S2 + e11));
            }), E2.forEach(function(t11) {
              let { x: e11, anchorX: s11, anchorY: o11, pos: r11, point: { isHeader: a11 } } = t11, n11 = { visibility: void 0 === r11 ? "hidden" : "inherit", x: e11, y: (r11 || 0) + A2 + (u2 && f2.y || 0), anchorX: s11, anchorY: o11 };
              if (i10.outside && e11 < s11) {
                let t12 = S2 - I2.left;
                t12 > 0 && (a11 || (n11.x = e11 + t12, n11.anchorX = s11 + t12), a11 && (n11.x = (I2.right - I2.left) / 2, n11.anchorX = s11 + t12));
              }
              t11.tt.attr(n11);
            });
            let { container: D2, outside: B2, renderer: N2 } = i10;
            if (B2 && D2 && N2) {
              let { width: t11, height: e11, x: i11, y: s11 } = k2.getBBox();
              N2.setSize(t11 + i11, e11 + s11, false), D2.style.left = I2.left + "px", D2.style.top = T2 + "px";
            }
            oS && k2.attr({ opacity: 1 === k2.opacity ? 0.999 : 1 });
          }
          drawTracker() {
            let t10 = this;
            if (!this.shouldStickOnContact()) {
              t10.tracker && (t10.tracker = t10.tracker.destroy());
              return;
            }
            let e10 = t10.chart, i10 = t10.label, s10 = t10.shared ? e10.hoverPoints : e10.hoverPoint;
            if (!i10 || !s10) return;
            let o10 = { x: 0, y: 0, width: 0, height: 0 }, r10 = this.getAnchor(s10), a10 = i10.getBBox();
            r10[0] += e10.plotLeft - (i10.translateX || 0), r10[1] += e10.plotTop - (i10.translateY || 0), o10.x = Math.min(0, r10[0]), o10.y = Math.min(0, r10[1]), o10.width = r10[0] < 0 ? Math.max(Math.abs(r10[0]), a10.width - r10[0]) : Math.max(Math.abs(r10[0]), a10.width), o10.height = r10[1] < 0 ? Math.max(Math.abs(r10[1]), a10.height - Math.abs(r10[1])) : Math.max(Math.abs(r10[1]), a10.height), t10.tracker ? t10.tracker.attr(o10) : (t10.tracker = i10.renderer.rect(o10).addClass("highcharts-tracker").add(i10), oC(t10.tracker.element, "mouseenter", () => {
              oL(t10.hideTimer);
            }), e10.styledMode || t10.tracker.attr({ fill: "rgba(0,0,0,0)" }));
          }
          styledModeFormat(t10) {
            return t10.replace('style="font-size: 0.8em"', 'class="highcharts-header"').replace(/style="color:{(point|series)\.color}"/g, 'class="highcharts-color-{$1.colorIndex} {series.options.className} {point.options.className}"');
          }
          headerFooterFormatter(t10, e10) {
            let i10 = t10.series, s10 = i10.tooltipOptions, o10 = i10.xAxis, r10 = o10 == null ? void 0 : o10.dateTime, a10 = { isFooter: e10, point: t10 }, n10 = s10.xDateFormat || "", h10 = s10[e10 ? "footerFormat" : "headerFormat"];
            return oI(this, "headerFormatter", a10, function(e11) {
              if (r10 && !n10 && oN(t10.key) && (n10 = r10.getXDateFormat(t10.key, s10.dateTimeLabelFormats)), r10 && n10) {
                if (oz(n10)) {
                  let t11 = n10;
                  ow[0] = (e12) => i10.chart.time.dateFormat(t11, e12), n10 = "%0";
                }
                (t10.tooltipDateKeys || ["key"]).forEach((t11) => {
                  h10 = h10.replace(RegExp("point\\." + t11 + "([ \\)}])"), `(point.${t11}:${n10})$1`);
                });
              }
              i10.chart.styledMode && (h10 = this.styledModeFormat(h10)), e11.text = ov(h10, t10, this.chart);
            }), a10.text || "";
          }
          update(t10) {
            this.destroy(), this.init(this.chart, oW(true, this.options, t10));
          }
          updatePosition(t10) {
            var _a2;
            let { chart: e10, container: i10, distance: s10, options: o10, pointer: r10, renderer: a10 } = this, { height: n10 = 0, width: h10 = 0 } = this.getLabel(), { fixed: l2, positioner: d2 } = o10, { left: c2, top: p2, scaleX: g2, scaleY: u2 } = r10.getChartPosition(), f2 = (d2 || l2 && this.getFixedPosition || this.getPosition).call(this, h10, n10, t10), m2 = z.doc, x2 = (t10.plotX || 0) + e10.plotLeft, y2 = (t10.plotY || 0) + e10.plotTop, b2;
            if (a10 && i10) {
              if (d2 || l2) {
                let { scrollLeft: t11 = 0, scrollTop: i11 = 0 } = ((_a2 = e10.scrollablePlotArea) == null ? void 0 : _a2.scrollingContainer) || {};
                f2.x += t11 + c2 - s10, f2.y += i11 + p2 - s10;
              }
              b2 = (o10.borderWidth || 0) + 2 * s10 + 2, a10.setSize(oA(h10 + b2, 0, m2.documentElement.clientWidth) - 1, n10 + b2, false), (1 !== g2 || 1 !== u2) && (oP(i10, { transform: `scale(${g2}, ${u2})` }), x2 *= g2, y2 *= u2), x2 += c2 - f2.x, y2 += p2 - f2.y;
            }
            this.move(Math.round(f2.x), Math.round(f2.y || 0), x2, y2);
          }
        }
        (l = oY || (oY = {})).compose = function(t10) {
          oX(ok, "Core.Tooltip") && oC(t10, "afterInit", function() {
            let t11 = this.chart;
            t11.options.tooltip && (t11.tooltip = new l(t11, t11.options.tooltip, this));
          });
        };
        let oj = oY, { animObject: oU } = t5, { defaultOptions: o$ } = tD, { format: oV } = eS, { addEvent: oZ, crisp: o_, erase: oq, extend: oK, fireEvent: oJ, getNestedProperty: oQ, isArray: o0, isFunction: o1, isNumber: o2, isObject: o3, merge: o5, pick: o6, syncTimeout: o9, removeEvent: o4, uniqueKey: o8 } = tn;
        class o7 {
          constructor(t10, e10, i10) {
            var _a2, _b2, _c2, _d2, _e2, _f2;
            this.formatPrefix = "point", this.visible = true, this.point = this, this.series = t10, this.applyOptions(e10, i10), (_a2 = this.id) != null ? _a2 : this.id = o8(), this.resolveColor(), (_b2 = this.dataLabelOnNull) != null ? _b2 : this.dataLabelOnNull = t10.options.nullInteraction, t10.chart.pointCount++, this.category = (_e2 = (_d2 = (_c2 = t10.xAxis) == null ? void 0 : _c2.categories) == null ? void 0 : _d2[this.x]) != null ? _e2 : this.x, this.key = (_f2 = this.name) != null ? _f2 : this.category, oJ(this, "afterInit");
          }
          animateBeforeDestroy() {
            let t10 = this, e10 = { x: t10.startXPos, opacity: 0 }, i10 = t10.getGraphicalProps();
            i10.singular.forEach(function(i11) {
              t10[i11] = t10[i11].animate("dataLabel" === i11 ? { x: t10[i11].startXPos, y: t10[i11].startYPos, opacity: 0 } : e10);
            }), i10.plural.forEach(function(e11) {
              t10[e11].forEach(function(e12) {
                e12.element && e12.animate(oK({ x: t10.startXPos }, e12.startYPos ? { x: e12.startXPos, y: e12.startYPos } : {}));
              });
            });
          }
          applyOptions(t10, e10) {
            let i10 = this.series, s10 = i10.options.pointValKey || i10.pointValKey;
            return oK(this, t10 = o7.prototype.optionsToObject.call(this, t10)), this.options = this.options ? oK(this.options, t10) : t10, t10.group && delete this.group, t10.dataLabels && delete this.dataLabels, s10 && (this.y = o7.prototype.getNestedProperty.call(this, s10)), this.selected && (this.state = "select"), "name" in this && void 0 === e10 && i10.xAxis && i10.xAxis.hasNames && (this.x = i10.xAxis.nameToX(this)), void 0 === this.x && i10 ? this.x = e10 != null ? e10 : i10.autoIncrement() : o2(t10.x) && i10.options.relativeXValue ? this.x = i10.autoIncrement(t10.x) : "string" == typeof this.x && (e10 != null ? e10 : e10 = i10.chart.time.parse(this.x), o2(e10) && (this.x = e10)), this.isNull = this.isValid && !this.isValid(), this.formatPrefix = this.isNull ? "null" : "point", this;
          }
          destroy() {
            if (!this.destroyed) {
              let t10 = this, e10 = t10.series, i10 = e10.chart, s10 = e10.options.dataSorting, o10 = i10.hoverPoints, r10 = oU(t10.series.chart.renderer.globalAnimation), a10 = () => {
                for (let e11 in (t10.graphic || t10.graphics || t10.dataLabel || t10.dataLabels) && (o4(t10), t10.destroyElements()), t10) delete t10[e11];
              };
              t10.legendItem && i10.legend.destroyItem(t10), o10 && (t10.setState(), oq(o10, t10), o10.length || (i10.hoverPoints = null)), t10 === i10.hoverPoint && t10.onMouseOut(), (s10 == null ? void 0 : s10.enabled) ? (this.animateBeforeDestroy(), o9(a10, r10.duration)) : a10(), i10.pointCount--;
            }
            this.destroyed = true;
          }
          destroyElements(t10) {
            let e10 = this, i10 = e10.getGraphicalProps(t10);
            i10.singular.forEach(function(t11) {
              e10[t11] = e10[t11].destroy();
            }), i10.plural.forEach(function(t11) {
              e10[t11].forEach(function(t12) {
                (t12 == null ? void 0 : t12.element) && t12.destroy();
              }), delete e10[t11];
            });
          }
          firePointEvent(t10, e10, i10) {
            let s10 = this, o10 = this.series.options;
            s10.manageEvent(t10), "click" === t10 && o10.allowPointSelect && (i10 = function(t11) {
              !s10.destroyed && s10.select && s10.select(null, t11.ctrlKey || t11.metaKey || t11.shiftKey);
            }), oJ(s10, t10, e10, i10);
          }
          getClassName() {
            var _a2;
            return "highcharts-point" + (this.selected ? " highcharts-point-select" : "") + (this.negative ? " highcharts-negative" : "") + (this.isNull ? " highcharts-null-point" : "") + (void 0 !== this.colorIndex ? " highcharts-color-" + this.colorIndex : "") + (this.options.className ? " " + this.options.className : "") + (((_a2 = this.zone) == null ? void 0 : _a2.className) ? " " + this.zone.className.replace("highcharts-negative", "") : "");
          }
          getGraphicalProps(t10) {
            let e10, i10, s10 = this, o10 = [], r10 = { singular: [], plural: [] };
            for ((t10 = t10 || { graphic: 1, dataLabel: 1 }).graphic && o10.push("graphic", "connector"), t10.dataLabel && o10.push("dataLabel", "dataLabelPath", "dataLabelUpper"), i10 = o10.length; i10--; ) s10[e10 = o10[i10]] && r10.singular.push(e10);
            return ["graphic", "dataLabel"].forEach(function(e11) {
              let i11 = e11 + "s";
              t10[e11] && s10[i11] && r10.plural.push(i11);
            }), r10;
          }
          getNestedProperty(t10) {
            if (t10) return 0 === t10.indexOf("custom.") ? oQ(t10, this.options) : this[t10];
          }
          getZone() {
            let t10 = this.series, e10 = t10.zones, i10 = t10.zoneAxis || "y", s10, o10 = 0;
            for (s10 = e10[0]; this[i10] >= s10.value; ) s10 = e10[++o10];
            return this.nonZonedColor || (this.nonZonedColor = this.color), (s10 == null ? void 0 : s10.color) && !this.options.color ? this.color = s10.color : this.color = this.nonZonedColor, s10;
          }
          hasNewShapeType() {
            return (this.graphic && (this.graphic.symbolName || this.graphic.element.nodeName)) !== this.shapeType;
          }
          isValid() {
            return (o2(this.x) || this.x instanceof Date) && o2(this.y);
          }
          optionsToObject(t10) {
            var _a2;
            let e10 = this.series, i10 = e10.options.keys, s10 = i10 || e10.pointArrayMap || ["y"], o10 = s10.length, r10 = {}, a10, n10 = 0, h10 = 0;
            if (o2(t10) || null === t10) r10[s10[0]] = t10;
            else if (o0(t10)) for (!i10 && t10.length > o10 && ("string" == (a10 = typeof t10[0]) ? ((_a2 = e10.xAxis) == null ? void 0 : _a2.dateTime) ? r10.x = e10.chart.time.parse(t10[0]) : r10.name = t10[0] : "number" === a10 && (r10.x = t10[0]), n10++); h10 < o10; ) i10 && void 0 === t10[n10] || (s10[h10].indexOf(".") > 0 ? o7.prototype.setNestedProperty(r10, t10[n10], s10[h10]) : r10[s10[h10]] = t10[n10]), n10++, h10++;
            else "object" == typeof t10 && (r10 = t10, t10.dataLabels && (e10.hasDataLabels = () => true), t10.marker && (e10._hasPointMarkers = true));
            return r10;
          }
          pos(t10, e10 = this.plotY) {
            if (!this.destroyed) {
              let { plotX: i10, series: s10 } = this, { chart: o10, xAxis: r10, yAxis: a10 } = s10, n10 = 0, h10 = 0;
              if (o2(i10) && o2(e10)) return t10 && (n10 = r10 ? r10.pos : o10.plotLeft, h10 = a10 ? a10.pos : o10.plotTop), o10.inverted && r10 && a10 ? [a10.len - e10 + h10, r10.len - i10 + n10] : [i10 + n10, e10 + h10];
            }
          }
          resolveColor() {
            let t10 = this.series, e10 = t10.chart.options.chart, i10 = t10.chart.styledMode, s10, o10, r10 = e10.colorCount, a10;
            delete this.nonZonedColor, t10.options.colorByPoint ? (i10 || (s10 = (o10 = t10.options.colors || t10.chart.options.colors)[t10.colorCounter], r10 = o10.length), a10 = t10.colorCounter, t10.colorCounter++, t10.colorCounter === r10 && (t10.colorCounter = 0)) : (i10 || (s10 = t10.color), a10 = t10.colorIndex), this.colorIndex = o6(this.options.colorIndex, a10), this.color = o6(this.options.color, s10);
          }
          setNestedProperty(t10, e10, i10) {
            return i10.split(".").reduce(function(t11, i11, s10, o10) {
              let r10 = o10.length - 1 === s10;
              return t11[i11] = r10 ? e10 : o3(t11[i11], true) ? t11[i11] : {}, t11[i11];
            }, t10), t10;
          }
          shouldDraw() {
            return !this.isNull;
          }
          tooltipFormatter(t10) {
            var _a2;
            let { chart: e10, pointArrayMap: i10 = ["y"], tooltipOptions: s10 } = this.series, { valueDecimals: o10 = "", valuePrefix: r10 = "", valueSuffix: a10 = "" } = s10;
            return e10.styledMode && (t10 = ((_a2 = e10.tooltip) == null ? void 0 : _a2.styledModeFormat(t10)) || t10), i10.forEach((e11) => {
              e11 = "{point." + e11, (r10 || a10) && (t10 = t10.replace(RegExp(e11 + "}", "g"), r10 + e11 + "}" + a10)), t10 = t10.replace(RegExp(e11 + "}", "g"), e11 + ":,." + o10 + "f}");
            }), oV(t10, this, e10);
          }
          update(t10, e10, i10, s10) {
            let o10, r10 = this, a10 = r10.series, n10 = r10.graphic, h10 = a10.chart, l2 = a10.options;
            function d2() {
              r10.applyOptions(t10);
              let s11 = n10 && r10.hasMockGraphic, d3 = null === r10.y ? !s11 : s11;
              n10 && d3 && (r10.graphic = n10.destroy(), delete r10.hasMockGraphic), o3(t10, true) && ((n10 == null ? void 0 : n10.element) && t10 && t10.marker && void 0 !== t10.marker.symbol && (r10.graphic = n10.destroy()), (t10 == null ? void 0 : t10.dataLabels) && r10.dataLabel && (r10.dataLabel = r10.dataLabel.destroy())), o10 = r10.index;
              let c2 = {};
              for (let t11 of a10.dataColumnKeys()) c2[t11] = r10[t11];
              a10.dataTable.setRow(c2, o10), l2.data[o10] = o3(l2.data[o10], true) || o3(t10, true) ? r10.options : o6(t10, l2.data[o10]), a10.isDirty = a10.isDirtyData = true, !a10.fixedBox && a10.hasCartesianSeries && (h10.isDirtyBox = true), "point" === l2.legendType && (h10.isDirtyLegend = true), e10 && h10.redraw(i10);
            }
            e10 = o6(e10, true), false === s10 ? d2() : r10.firePointEvent("update", { options: t10 }, d2);
          }
          remove(t10, e10) {
            this.series.removePoint(this.series.data.indexOf(this), t10, e10);
          }
          select(t10, e10) {
            let i10 = this, s10 = i10.series, o10 = s10.chart;
            t10 = o6(t10, !i10.selected), this.selectedStaging = t10, i10.firePointEvent(t10 ? "select" : "unselect", { accumulate: e10 }, function() {
              i10.selected = i10.options.selected = t10, s10.options.data[s10.data.indexOf(i10)] = i10.options, i10.setState(t10 && "select"), e10 || o10.getSelectedPoints().forEach(function(t11) {
                let e11 = t11.series;
                t11.selected && t11 !== i10 && (t11.selected = t11.options.selected = false, e11.options.data[e11.data.indexOf(t11)] = t11.options, t11.setState(o10.hoverPoints && e11.options.inactiveOtherPoints ? "inactive" : ""), t11.firePointEvent("unselect"));
              });
            }), delete this.selectedStaging;
          }
          onMouseOver(t10) {
            let { inverted: e10, pointer: i10 } = this.series.chart;
            i10 && (t10 = t10 ? i10.normalize(t10) : i10.getChartCoordinatesFromPoint(this, e10), i10.runPointActions(t10, this));
          }
          onMouseOut() {
            let t10 = this.series.chart;
            this.firePointEvent("mouseOut"), this.series.options.inactiveOtherPoints || (t10.hoverPoints || []).forEach(function(t11) {
              t11.setState();
            }), t10.hoverPoints = t10.hoverPoint = null;
          }
          manageEvent(t10) {
            var _a2, _b2, _c2, _d2, _e2, _f2, _g2;
            let e10 = o5(this.series.options.point, this.options), i10 = (_a2 = e10.events) == null ? void 0 : _a2[t10];
            o1(i10) && (!((_b2 = this.hcEvents) == null ? void 0 : _b2[t10]) || ((_d2 = (_c2 = this.hcEvents) == null ? void 0 : _c2[t10]) == null ? void 0 : _d2.map((t11) => t11.fn).indexOf(i10)) === -1) ? ((_e2 = this.importedUserEvent) == null ? void 0 : _e2.call(this), this.importedUserEvent = oZ(this, t10, i10), this.hcEvents && (this.hcEvents[t10].userEvent = true)) : this.importedUserEvent && !i10 && ((_f2 = this.hcEvents) == null ? void 0 : _f2[t10]) && ((_g2 = this.hcEvents) == null ? void 0 : _g2[t10].userEvent) && (o4(this, t10), delete this.hcEvents[t10], Object.keys(this.hcEvents) || delete this.importedUserEvent);
          }
          setState(t10, e10) {
            var _a2, _b2;
            let i10 = this.series, s10 = this.state, o10 = i10.options.states[t10 || "normal"] || {}, r10 = o$.plotOptions[i10.type].marker && i10.options.marker, a10 = r10 && false === r10.enabled, n10 = ((_a2 = r10 == null ? void 0 : r10.states) == null ? void 0 : _a2[t10 || "normal"]) || {}, h10 = false === n10.enabled, l2 = this.marker || {}, d2 = i10.chart, c2 = r10 && i10.markerAttribs, p2 = i10.halo, g2, u2, f2, m2 = i10.stateMarkerGraphic, x2;
            if ((t10 = t10 || "") === this.state && !e10 || this.selected && "select" !== t10 || false === o10.enabled || t10 && (h10 || a10 && false === n10.enabled) || t10 && l2.states && l2.states[t10] && false === l2.states[t10].enabled) return;
            if (this.state = t10, c2 && (g2 = i10.markerAttribs(this, t10)), this.graphic && !this.hasMockGraphic) {
              if (s10 && this.graphic.removeClass("highcharts-point-" + s10), t10 && this.graphic.addClass("highcharts-point-" + t10), !d2.styledMode) {
                u2 = i10.pointAttribs(this, t10), f2 = o6(d2.options.chart.animation, o10.animation);
                let e11 = u2.opacity;
                i10.options.inactiveOtherPoints && o2(e11) && (this.dataLabels || []).forEach(function(t11) {
                  t11 && !t11.hasClass("highcharts-data-label-hidden") && (t11.animate({ opacity: e11 }, f2), t11.connector && t11.connector.animate({ opacity: e11 }, f2));
                }), this.graphic.animate(u2, f2);
              }
              g2 && this.graphic.animate(g2, o6(d2.options.chart.animation, n10.animation, r10.animation)), m2 && m2.hide();
            } else t10 && n10 && (x2 = l2.symbol || i10.symbol, m2 && m2.currentSymbol !== x2 && (m2 = m2.destroy()), g2 && (m2 ? m2[e10 ? "animate" : "attr"]({ x: g2.x, y: g2.y }) : x2 && (i10.stateMarkerGraphic = m2 = d2.renderer.symbol(x2, g2.x, g2.y, g2.width, g2.height, o5(r10, n10)).add(i10.markerGroup), m2.currentSymbol = x2)), !d2.styledMode && m2 && "inactive" !== this.state && m2.attr(i10.pointAttribs(this, t10))), m2 && (m2[t10 && this.isInside ? "show" : "hide"](), m2.element.point = this, m2.addClass(this.getClassName(), true));
            let y2 = o10.halo, b2 = this.graphic || m2, v2 = (b2 == null ? void 0 : b2.visibility) || "inherit";
            (y2 == null ? void 0 : y2.size) && b2 && "hidden" !== v2 && !this.isCluster ? (p2 || (i10.halo = p2 = d2.renderer.path().add(b2.parentGroup)), p2.show()[e10 ? "animate" : "attr"]({ d: this.haloPath(y2.size) }), p2.attr({ class: "highcharts-halo highcharts-color-" + o6(this.colorIndex, i10.colorIndex) + (this.className ? " " + this.className : ""), visibility: v2, zIndex: -1 }), p2.point = this, d2.styledMode || p2.attr(oK({ fill: this.color || i10.color, "fill-opacity": y2.opacity }, eh.filterUserAttributes(y2.attributes || {})))) : ((_b2 = p2 == null ? void 0 : p2.point) == null ? void 0 : _b2.haloPath) && !p2.point.destroyed && p2.animate({ d: p2.point.haloPath(0) }, null, p2.hide), oJ(this, "afterSetState", { state: t10 });
          }
          haloPath(t10) {
            let e10 = this.pos();
            return e10 ? this.series.chart.renderer.symbols.circle(o_(e10[0], 1) - t10, e10[1] - t10, 2 * t10, 2 * t10) : [];
          }
        }
        let rt = o7, { parse: re } = tG, { charts: ri, composed: rs, isTouchDevice: ro } = z, { addEvent: rr, attr: ra, css: rn, extend: rh, find: rl, fireEvent: rd, isNumber: rc, isObject: rp, objectEach: rg, offset: ru, pick: rf, pushUnique: rm, splat: rx } = tn;
        class ry {
          applyInactiveState(t10 = []) {
            var _a2, _b2;
            let e10 = [];
            for (let i10 of (t10.forEach((t11) => {
              let i11 = t11.series;
              e10.push(i11), i11.linkedParent && e10.push(i11.linkedParent), i11.linkedSeries && e10.push.apply(e10, i11.linkedSeries), i11.navigatorSeries && e10.push(i11.navigatorSeries), i11.boosted && i11.markerGroup && e10.push.apply(e10, this.chart.series.filter((t12) => t12.markerGroup === i11.markerGroup));
            }), this.chart.series)) {
              let t11 = i10.options;
              ((_b2 = (_a2 = t11.states) == null ? void 0 : _a2.inactive) == null ? void 0 : _b2.enabled) !== false && (-1 === e10.indexOf(i10) ? i10.setState("inactive", true) : t11.inactiveOtherPoints && i10.setAllPointsToState("inactive"));
            }
          }
          destroy() {
            let t10 = this;
            this.eventsToUnbind.forEach((t11) => t11()), this.eventsToUnbind = [], !z.chartCount && (ry.unbindDocumentMouseUp.forEach((t11) => t11.unbind()), ry.unbindDocumentMouseUp.length = 0, ry.unbindDocumentTouchEnd && (ry.unbindDocumentTouchEnd = ry.unbindDocumentTouchEnd())), rg(t10, function(e10, i10) {
              t10[i10] = void 0;
            });
          }
          getSelectionMarkerAttrs(t10, e10) {
            let i10 = { args: { chartX: t10, chartY: e10 }, attrs: {}, shapeType: "rect" };
            return rd(this, "getSelectionMarkerAttrs", i10, (i11) => {
              let s10, { chart: o10, zoomHor: r10, zoomVert: a10 } = this, { mouseDownX: n10 = 0, mouseDownY: h10 = 0 } = o10, l2 = i11.attrs;
              l2.x = o10.plotLeft, l2.y = o10.plotTop, l2.width = r10 ? 1 : o10.plotWidth, l2.height = a10 ? 1 : o10.plotHeight, r10 && (l2.width = Math.max(1, Math.abs(s10 = t10 - n10)), l2.x = (s10 > 0 ? 0 : s10) + n10), a10 && (l2.height = Math.max(1, Math.abs(s10 = e10 - h10)), l2.y = (s10 > 0 ? 0 : s10) + h10);
            }), i10;
          }
          drag(t10) {
            let { chart: e10 } = this, { mouseDownX: i10 = 0, mouseDownY: s10 = 0 } = e10, { panning: o10, panKey: r10, selectionMarkerFill: a10 } = e10.options.chart, n10 = e10.plotLeft, h10 = e10.plotTop, l2 = e10.plotWidth, d2 = e10.plotHeight, c2 = rp(o10) ? o10.enabled : o10, p2 = r10 && t10[`${r10}Key`], g2 = t10.chartX, u2 = t10.chartY, f2, m2 = this.selectionMarker;
            if ((!m2 || !m2.touch) && (g2 < n10 ? g2 = n10 : g2 > n10 + l2 && (g2 = n10 + l2), u2 < h10 ? u2 = h10 : u2 > h10 + d2 && (u2 = h10 + d2), this.hasDragged = Math.sqrt(Math.pow(i10 - g2, 2) + Math.pow(s10 - u2, 2)), this.hasDragged > 10)) {
              f2 = e10.isInsidePlot(i10 - n10, s10 - h10, { visiblePlotOnly: true });
              let { shapeType: r11, attrs: l3 } = this.getSelectionMarkerAttrs(g2, u2);
              this.hasZoom && f2 && !p2 && !m2 && (this.selectionMarker = m2 = e10.renderer[r11](), m2.attr({ class: "highcharts-selection-marker", zIndex: 7 }).add(), e10.styledMode || m2.attr({ fill: a10 || re("#334eff").setOpacity(0.25).get() })), m2 && m2.attr(l3), f2 && !m2 && c2 && e10.pan(t10, o10);
            }
          }
          dragStart(t10) {
            let e10 = this.chart;
            e10.mouseIsDown = t10.type, e10.cancelClick = false, e10.mouseDownX = t10.chartX, e10.mouseDownY = t10.chartY;
          }
          getSelectionBox(t10) {
            let e10 = { args: { marker: t10 }, result: t10.getBBox() };
            return rd(this, "getSelectionBox", e10), e10.result;
          }
          drop(t10) {
            let e10, { chart: i10, selectionMarker: s10 } = this;
            for (let t11 of i10.axes) t11.isPanning && (t11.isPanning = false, (t11.options.startOnTick || t11.options.endOnTick || t11.series.some((t12) => t12.boosted)) && (t11.forceRedraw = true, t11.setExtremes(t11.userMin, t11.userMax, false), e10 = true));
            if (e10 && i10.redraw(), s10 && t10) {
              if (this.hasDragged) {
                let e11 = this.getSelectionBox(s10);
                i10.transform({ axes: i10.axes.filter((t11) => t11.zoomEnabled && ("xAxis" === t11.coll && this.zoomX || "yAxis" === t11.coll && this.zoomY)), selection: __spreadValues({ originalEvent: t10, xAxis: [], yAxis: [] }, e11), from: e11 });
              }
              rc(i10.index) && (this.selectionMarker = s10.destroy());
            }
            i10 && rc(i10.index) && (rn(i10.container, { cursor: i10._cursor }), i10.cancelClick = this.hasDragged > 10, i10.mouseIsDown = false, this.hasDragged = 0, this.pinchDown = [], this.hasPinchMoved = false);
          }
          findNearestKDPoint(t10, e10, i10) {
            let s10;
            return t10.forEach(function(t11) {
              var _a2, _b2;
              var o10;
              let r10, a10, n10, h10 = !(t11.noSharedTooltip && e10) && 0 > t11.options.findNearestPointBy.indexOf("y"), l2 = t11.searchPoint(i10, h10);
              rp(l2, true) && l2.series && (!rp(s10, true) || (r10 = (o10 = s10).distX - l2.distX, a10 = o10.dist - l2.dist, n10 = ((_a2 = l2.series.group) == null ? void 0 : _a2.zIndex) - ((_b2 = o10.series.group) == null ? void 0 : _b2.zIndex), (0 !== r10 && e10 ? r10 : 0 !== a10 ? a10 : 0 !== n10 ? n10 : o10.series.index > l2.series.index ? -1 : 1) > 0)) && (s10 = l2);
            }), s10;
          }
          getChartCoordinatesFromPoint(t10, e10) {
            var _a2, _b2;
            let { xAxis: i10, yAxis: s10 } = t10.series, o10 = t10.shapeArgs;
            if (i10 && s10) {
              let r10 = (_b2 = (_a2 = t10.clientX) != null ? _a2 : t10.plotX) != null ? _b2 : 0, a10 = t10.plotY || 0;
              return t10.isNode && o10 && rc(o10.x) && rc(o10.y) && (r10 = o10.x, a10 = o10.y), e10 ? { chartX: s10.len + s10.pos - a10, chartY: i10.len + i10.pos - r10 } : { chartX: r10 + i10.pos, chartY: a10 + s10.pos };
            }
            if ((o10 == null ? void 0 : o10.x) && o10.y) return { chartX: o10.x, chartY: o10.y };
          }
          getChartPosition() {
            if (this.chartPosition) return this.chartPosition;
            let { container: t10 } = this.chart, e10 = ru(t10);
            this.chartPosition = { left: e10.left, top: e10.top, scaleX: 1, scaleY: 1 };
            let { offsetHeight: i10, offsetWidth: s10 } = t10;
            return s10 > 2 && i10 > 2 && (this.chartPosition.scaleX = e10.width / s10, this.chartPosition.scaleY = e10.height / i10), this.chartPosition;
          }
          getCoordinates(t10) {
            let e10 = { xAxis: [], yAxis: [] };
            for (let i10 of this.chart.axes) e10[i10.isXAxis ? "xAxis" : "yAxis"].push({ axis: i10, value: i10.toValue(t10[i10.horiz ? "chartX" : "chartY"]) });
            return e10;
          }
          getHoverData(t10, e10, i10, s10, o10, r10) {
            let a10 = [], n10 = function(t11) {
              return t11.visible && !(!o10 && t11.directTouch) && rf(t11.options.enableMouseTracking, true);
            }, h10 = e10, l2, d2 = { chartX: r10 ? r10.chartX : void 0, chartY: r10 ? r10.chartY : void 0, shared: o10 };
            rd(this, "beforeGetHoverData", d2), l2 = h10 && !h10.stickyTracking ? [h10] : i10.filter((t11) => t11.stickyTracking && (d2.filter || n10)(t11));
            let c2 = s10 && t10 || !r10 ? t10 : this.findNearestKDPoint(l2, o10, r10);
            return h10 = c2 == null ? void 0 : c2.series, c2 && (o10 && !h10.noSharedTooltip ? (l2 = i10.filter(function(t11) {
              return d2.filter ? d2.filter(t11) : n10(t11) && !t11.noSharedTooltip;
            })).forEach(function(t11) {
              var _a2;
              let e11 = (_a2 = t11.options) == null ? void 0 : _a2.nullInteraction, i11 = rl(t11.points, function(t12) {
                return t12.x === c2.x && (!t12.isNull || !!e11);
              });
              rp(i11) && (t11.boosted && t11.boost && (i11 = t11.boost.getPoint(i11)), a10.push(i11));
            }) : a10.push(c2)), rd(this, "afterGetHoverData", d2 = { hoverPoint: c2 }), { hoverPoint: d2.hoverPoint, hoverSeries: h10, hoverPoints: a10 };
          }
          getPointFromEvent(t10) {
            let e10 = t10.target, i10;
            for (; e10 && !i10; ) i10 = e10.point, e10 = e10.parentNode;
            return i10;
          }
          onTrackerMouseOut(t10) {
            let e10 = this.chart, i10 = t10.relatedTarget, s10 = e10.hoverSeries;
            this.isDirectTouch = false, !s10 || !i10 || s10.stickyTracking || this.inClass(i10, "highcharts-tooltip") || this.inClass(i10, "highcharts-series-" + s10.index) && this.inClass(i10, "highcharts-tracker") || s10.onMouseOut();
          }
          inClass(t10, e10) {
            let i10 = t10, s10;
            for (; i10; ) {
              if (s10 = ra(i10, "class")) {
                if (-1 !== s10.indexOf(e10)) return true;
                if (-1 !== s10.indexOf("highcharts-container")) return false;
              }
              i10 = i10.parentElement;
            }
          }
          constructor(t10, e10) {
            var _a2;
            this.hasDragged = 0, this.pointerCaptureEventsToUnbind = [], this.eventsToUnbind = [], this.options = e10, this.chart = t10, this.runChartClick = !!((_a2 = e10.chart.events) == null ? void 0 : _a2.click), this.pinchDown = [], this.setDOMEvents(), rd(this, "afterInit");
          }
          normalize(t10, e10) {
            let i10 = t10.touches, s10 = i10 ? i10.length ? i10.item(0) : rf(i10.changedTouches, t10.changedTouches)[0] : t10;
            e10 || (e10 = this.getChartPosition());
            let o10 = s10.pageX - e10.left, r10 = s10.pageY - e10.top;
            return rh(t10, { chartX: Math.round(o10 /= e10.scaleX), chartY: Math.round(r10 /= e10.scaleY) });
          }
          onContainerClick(t10) {
            let e10 = this.chart, i10 = e10.hoverPoint, s10 = this.normalize(t10), o10 = e10.plotLeft, r10 = e10.plotTop;
            !e10.cancelClick && (i10 && this.inClass(s10.target, "highcharts-tracker") ? (rd(i10.series, "click", rh(s10, { point: i10 })), e10.hoverPoint && i10.firePointEvent("click", s10)) : (rh(s10, this.getCoordinates(s10)), e10.isInsidePlot(s10.chartX - o10, s10.chartY - r10, { visiblePlotOnly: true }) && rd(e10, "click", s10)));
          }
          onContainerMouseDown(t10) {
            var _a2;
            let e10 = (1 & (t10.buttons || t10.button)) == 1;
            t10 = this.normalize(t10), z.isFirefox && 0 !== t10.button && this.onContainerMouseMove(t10), (void 0 === t10.button || e10) && (this.zoomOption(t10), e10 && ((_a2 = t10.preventDefault) == null ? void 0 : _a2.call(t10)), this.dragStart(t10));
          }
          onContainerMouseLeave(t10) {
            let { pointer: e10 } = ri[rf(ry.hoverChartIndex, -1)] || {};
            t10 = this.normalize(t10), this.onContainerMouseMove(t10), e10 && !this.inClass(t10.relatedTarget, "highcharts-tooltip") && (e10.reset(), e10.chartPosition = void 0);
          }
          onContainerMouseEnter() {
            delete this.chartPosition;
          }
          onContainerMouseMove(t10) {
            var _a2;
            let e10 = this.chart, i10 = e10.tooltip, s10 = this.normalize(t10);
            this.setHoverChartIndex(t10), ("mousedown" === e10.mouseIsDown || this.touchSelect(s10)) && this.drag(s10), !((_a2 = e10.exporting) == null ? void 0 : _a2.openMenu) && (this.inClass(s10.target, "highcharts-tracker") || e10.isInsidePlot(s10.chartX - e10.plotLeft, s10.chartY - e10.plotTop, { visiblePlotOnly: true })) && !(i10 == null ? void 0 : i10.shouldStickOnContact(s10)) && (this.inClass(s10.target, "highcharts-no-tooltip") ? this.reset(false, 0) : this.runPointActions(s10));
          }
          onDocumentTouchEnd(t10) {
            this.onDocumentMouseUp(t10);
          }
          onContainerTouchMove(t10) {
            this.touchSelect(t10) ? this.onContainerMouseMove(t10) : this.touch(t10);
          }
          onContainerTouchStart(t10) {
            this.touchSelect(t10) ? this.onContainerMouseDown(t10) : (this.zoomOption(t10), this.touch(t10, true));
          }
          onDocumentMouseMove(t10) {
            let e10 = this.chart, i10 = e10.tooltip, s10 = this.chartPosition, o10 = this.normalize(t10, s10);
            !s10 || e10.isInsidePlot(o10.chartX - e10.plotLeft, o10.chartY - e10.plotTop, { visiblePlotOnly: true }) || (i10 == null ? void 0 : i10.shouldStickOnContact(o10)) || o10.target !== e10.container.ownerDocument && this.inClass(o10.target, "highcharts-tracker") || this.reset();
          }
          onDocumentMouseUp(t10) {
            var _a2, _b2, _c2;
            (t10 == null ? void 0 : t10.touches) && this.hasPinchMoved && ((_a2 = t10 == null ? void 0 : t10.preventDefault) == null ? void 0 : _a2.call(t10)), (_c2 = (_b2 = ri[rf(ry.hoverChartIndex, -1)]) == null ? void 0 : _b2.pointer) == null ? void 0 : _c2.drop(t10);
          }
          pinch(t10) {
            let e10 = this, { chart: i10, hasZoom: s10, lastTouches: o10 } = e10, r10 = [].map.call(t10.touches || [], (t11) => e10.normalize(t11)), a10 = r10.length, n10 = 1 === a10 && (e10.inClass(t10.target, "highcharts-tracker") && i10.runTrackerClick || e10.runChartClick), h10 = i10.tooltip, l2 = 1 === a10 && rf(h10 == null ? void 0 : h10.options.followTouchMove, true);
            a10 > 1 ? e10.initiated = true : l2 && (e10.initiated = false), s10 && e10.initiated && !n10 && false !== t10.cancelable && t10.preventDefault(), "touchstart" === t10.type ? (e10.pinchDown = r10, e10.res = true, i10.mouseDownX = t10.chartX) : l2 ? this.runPointActions(e10.normalize(t10)) : o10 && (rd(i10, "touchpan", { originalEvent: t10, touches: r10 }, () => {
              let e11 = (t11) => {
                let e12 = t11[0], i11 = t11[1] || e12;
                return { x: e12.chartX, y: e12.chartY, width: i11.chartX - e12.chartX, height: i11.chartY - e12.chartY };
              };
              i10.transform({ axes: i10.axes.filter((t11) => t11.zoomEnabled && (this.zoomHor && t11.horiz || this.zoomVert && !t11.horiz)), to: e11(r10), from: e11(o10), trigger: t10.type });
            }), e10.res && (e10.res = false, this.reset(false, 0))), e10.lastTouches = r10;
          }
          reset(t10, e10) {
            let i10 = this.chart, s10 = i10.hoverSeries, o10 = i10.hoverPoint, r10 = i10.hoverPoints, a10 = i10.tooltip, n10 = (a10 == null ? void 0 : a10.shared) ? r10 : o10;
            t10 && n10 && rx(n10).forEach(function(e11) {
              e11.series.isCartesian && void 0 === e11.plotX && (t10 = false);
            }), t10 ? a10 && n10 && rx(n10).length && (a10.refresh(n10), a10.shared && r10 ? r10.forEach(function(t11) {
              t11.setState(t11.state, true), t11.series.isCartesian && (t11.series.xAxis.crosshair && t11.series.xAxis.drawCrosshair(null, t11), t11.series.yAxis.crosshair && t11.series.yAxis.drawCrosshair(null, t11));
            }) : o10 && (o10.setState(o10.state, true), i10.axes.forEach(function(t11) {
              t11.crosshair && o10.series[t11.coll] === t11 && t11.drawCrosshair(null, o10);
            }))) : (o10 && o10.onMouseOut(), r10 && r10.forEach(function(t11) {
              t11.setState();
            }), s10 && s10.onMouseOut(), a10 && a10.hide(e10), this.unDocMouseMove && (this.unDocMouseMove = this.unDocMouseMove()), i10.axes.forEach(function(t11) {
              t11.hideCrosshair();
            }), i10.hoverPoints = i10.hoverPoint = void 0);
          }
          runPointActions(t10, e10, i10) {
            var _a2;
            let s10 = this.chart, o10 = s10.series, r10 = ((_a2 = s10.tooltip) == null ? void 0 : _a2.options.enabled) ? s10.tooltip : void 0, a10 = !!r10 && r10.shared, n10 = e10 || s10.hoverPoint, h10 = (n10 == null ? void 0 : n10.series) || s10.hoverSeries, l2 = (!t10 || "touchmove" !== t10.type) && (!!e10 || (h10 == null ? void 0 : h10.directTouch) && this.isDirectTouch), d2 = this.getHoverData(n10, h10, o10, l2, a10, t10);
            n10 = d2.hoverPoint, h10 = d2.hoverSeries;
            let c2 = d2.hoverPoints, p2 = (h10 == null ? void 0 : h10.tooltipOptions.followPointer) && !h10.tooltipOptions.split, g2 = a10 && h10 && !h10.noSharedTooltip;
            if (n10 && (i10 || n10 !== s10.hoverPoint || (r10 == null ? void 0 : r10.isHidden))) {
              if ((s10.hoverPoints || []).forEach(function(t11) {
                -1 === c2.indexOf(t11) && t11.setState();
              }), s10.hoverSeries !== h10 && h10.onMouseOver(), this.applyInactiveState(c2), (c2 || []).forEach(function(t11) {
                t11.setState("hover");
              }), s10.hoverPoint && s10.hoverPoint.firePointEvent("mouseOut"), !n10.series) return;
              s10.hoverPoints = c2, s10.hoverPoint = n10, n10.firePointEvent("mouseOver", void 0, () => {
                r10 && n10 && r10.refresh(g2 ? c2 : n10, t10);
              });
            } else if (p2 && r10 && !r10.isHidden) {
              let e11 = r10.getAnchor([{}], t10);
              s10.isInsidePlot(e11[0], e11[1], { visiblePlotOnly: true }) && r10.updatePosition({ plotX: e11[0], plotY: e11[1] });
            }
            this.unDocMouseMove || (this.unDocMouseMove = rr(s10.container.ownerDocument, "mousemove", (t11) => {
              var _a3, _b2, _c2;
              return (_c2 = (_b2 = ri[(_a3 = ry.hoverChartIndex) != null ? _a3 : -1]) == null ? void 0 : _b2.pointer) == null ? void 0 : _c2.onDocumentMouseMove(t11);
            }), this.eventsToUnbind.push(this.unDocMouseMove)), s10.axes.forEach(function(e11) {
              var _a3, _b2;
              let i11, o11 = (_b2 = (_a3 = e11.crosshair) == null ? void 0 : _a3.snap) != null ? _b2 : true;
              o11 && ((i11 = s10.hoverPoint) && i11.series[e11.coll] === e11 || (i11 = rl(c2, (t11) => {
                var _a4;
                return ((_a4 = t11.series) == null ? void 0 : _a4[e11.coll]) === e11;
              }))), i11 || !o11 ? e11.drawCrosshair(t10, i11) : e11.hideCrosshair();
            });
          }
          setDOMEvents() {
            let t10 = this.chart.container, e10 = t10.ownerDocument, i10 = (t11) => {
              var _a2, _b2;
              return t11.parentElement || ((_b2 = (_a2 = t11.getRootNode()) == null ? void 0 : _a2.host) == null ? void 0 : _b2.parentElement);
            };
            t10.onmousedown = this.onContainerMouseDown.bind(this), t10.onmousemove = this.onContainerMouseMove.bind(this), t10.onclick = this.onContainerClick.bind(this), this.eventsToUnbind.push(rr(t10, "mouseenter", this.onContainerMouseEnter.bind(this)), rr(t10, "mouseleave", this.onContainerMouseLeave.bind(this))), ry.unbindDocumentMouseUp.some((t11) => t11.doc === e10) || ry.unbindDocumentMouseUp.push({ doc: e10, unbind: rr(e10, "mouseup", this.onDocumentMouseUp.bind(this)) });
            let s10 = i10(this.chart.renderTo);
            for (; s10 && "BODY" !== s10.tagName; ) this.eventsToUnbind.push(rr(s10, "scroll", () => {
              delete this.chartPosition;
            })), s10 = i10(s10);
            this.eventsToUnbind.push(rr(t10, "touchstart", this.onContainerTouchStart.bind(this), { passive: false }), rr(t10, "touchmove", this.onContainerTouchMove.bind(this), { passive: false })), ry.unbindDocumentTouchEnd || (ry.unbindDocumentTouchEnd = rr(e10, "touchend", this.onDocumentTouchEnd.bind(this), { passive: false })), this.setPointerCapture(), rr(this.chart, "redraw", this.setPointerCapture.bind(this));
          }
          setPointerCapture() {
            var _a2, _b2;
            if (!ro) return;
            let t10 = this.pointerCaptureEventsToUnbind, e10 = this.chart, i10 = e10.container, s10 = rf((_a2 = e10.options.tooltip) == null ? void 0 : _a2.followTouchMove, true) && e10.series.some((t11) => t11.options.findNearestPointBy.indexOf("y") > -1);
            !this.hasPointerCapture && s10 ? (t10.push(rr(i10, "pointerdown", (t11) => {
              var _a3, _b3;
              ((_a3 = t11.target) == null ? void 0 : _a3.hasPointerCapture(t11.pointerId)) && ((_b3 = t11.target) == null ? void 0 : _b3.releasePointerCapture(t11.pointerId));
            }), rr(i10, "pointermove", (t11) => {
              var _a3, _b3;
              (_b3 = (_a3 = e10.pointer) == null ? void 0 : _a3.getPointFromEvent(t11)) == null ? void 0 : _b3.onMouseOver(t11);
            })), e10.styledMode || rn(i10, { "touch-action": "none" }), i10.className += " highcharts-no-touch-action", this.hasPointerCapture = true) : this.hasPointerCapture && !s10 && (t10.forEach((t11) => t11()), t10.length = 0, e10.styledMode || rn(i10, { "touch-action": rf((_b2 = e10.options.chart.style) == null ? void 0 : _b2["touch-action"], "manipulation") }), i10.className = i10.className.replace(" highcharts-no-touch-action", ""), this.hasPointerCapture = false);
          }
          setHoverChartIndex(t10) {
            var _a2;
            let e10 = this.chart, i10 = z.charts[rf(ry.hoverChartIndex, -1)];
            if (i10 && i10 !== e10) {
              let s10 = { relatedTarget: e10.container };
              t10 && !(t10 == null ? void 0 : t10.relatedTarget) && Object.assign({}, t10, s10), (_a2 = i10.pointer) == null ? void 0 : _a2.onContainerMouseLeave(t10 || s10);
            }
            (i10 == null ? void 0 : i10.mouseIsDown) || (ry.hoverChartIndex = e10.index);
          }
          touch(t10, e10) {
            var _a2;
            let i10, { chart: s10, pinchDown: o10 = [] } = this;
            this.setHoverChartIndex(), 1 === (t10 = this.normalize(t10)).touches.length ? s10.isInsidePlot(t10.chartX - s10.plotLeft, t10.chartY - s10.plotTop, { visiblePlotOnly: true }) && !((_a2 = s10.exporting) == null ? void 0 : _a2.openMenu) ? (e10 && this.runPointActions(t10), "touchmove" === t10.type && (this.hasPinchMoved = i10 = !!o10[0] && Math.pow(o10[0].chartX - t10.chartX, 2) + Math.pow(o10[0].chartY - t10.chartY, 2) >= 16), rf(i10, true) && this.pinch(t10)) : e10 && this.reset() : 2 === t10.touches.length && this.pinch(t10);
          }
          touchSelect(t10) {
            return !!(this.chart.zooming.singleTouch && t10.touches && 1 === t10.touches.length);
          }
          zoomOption(t10) {
            let e10 = this.chart, i10 = e10.inverted, s10 = e10.zooming.type || "", o10, r10;
            /touch/.test(t10.type) && (s10 = rf(e10.zooming.pinchType, s10)), this.zoomX = o10 = /x/.test(s10), this.zoomY = r10 = /y/.test(s10), this.zoomHor = o10 && !i10 || r10 && i10, this.zoomVert = r10 && !i10 || o10 && i10, this.hasZoom = o10 || r10;
          }
        }
        ry.unbindDocumentMouseUp = [], (d = ry || (ry = {})).compose = function(t10) {
          rm(rs, "Core.Pointer") && rr(t10, "beforeRender", function() {
            this.pointer = new d(this, this.options);
          });
        };
        let rb = ry;
        (c = S || (S = {})).setLength = function(t10, e10, i10) {
          return Array.isArray(t10) ? (t10.length = e10, t10) : t10[i10 ? "subarray" : "slice"](0, e10);
        }, c.splice = function(t10, e10, i10, s10, o10 = []) {
          if (Array.isArray(t10)) return Array.isArray(o10) || (o10 = Array.from(o10)), { removed: t10.splice(e10, i10, ...o10), array: t10 };
          let r10 = Object.getPrototypeOf(t10).constructor, a10 = t10[s10 ? "subarray" : "slice"](e10, e10 + i10), n10 = new r10(t10.length - i10 + o10.length);
          return n10.set(t10.subarray(0, e10), 0), n10.set(o10, e10), n10.set(t10.subarray(e10 + i10), e10 + o10.length), { removed: a10, array: n10 };
        }, c.convertToNumber = function(t10, e10) {
          switch (typeof t10) {
            case "boolean":
              return +!!t10;
            case "number":
              return isNaN(t10) && !e10 ? null : t10;
            default:
              return isNaN(t10 = parseFloat(`${t10 != null ? t10 : ""}`)) && !e10 ? null : t10;
          }
        };
        let { setLength: rv, splice: rk } = S, { fireEvent: rw, objectEach: rM, uniqueKey: rS } = tn, rT = class {
          constructor(t10 = {}) {
            this.autoId = !t10.id, this.columns = {}, this.id = t10.id || rS(), this.rowCount = 0, this.versionTag = rS();
            let e10 = 0;
            rM(t10.columns || {}, (t11, i10) => {
              this.columns[i10] = t11.slice(), e10 = Math.max(e10, t11.length);
            }), this.applyRowCount(e10);
          }
          applyRowCount(t10) {
            this.rowCount = t10, rM(this.columns, (e10, i10) => {
              e10.length !== t10 && (this.columns[i10] = rv(e10, t10));
            });
          }
          deleteRows(t10, e10 = 1) {
            if (e10 > 0 && t10 < this.rowCount) {
              let i10 = 0;
              rM(this.columns, (s10, o10) => {
                this.columns[o10] = rk(s10, t10, e10).array, i10 = s10.length;
              }), this.rowCount = i10;
            }
            rw(this, "afterDeleteRows", { rowIndex: t10, rowCount: e10 }), this.versionTag = rS();
          }
          getColumn(t10, e10) {
            return this.columns[t10];
          }
          getColumns(t10, e10) {
            return (t10 || Object.keys(this.columns)).reduce((t11, e11) => (t11[e11] = this.columns[e11], t11), {});
          }
          getRow(t10, e10) {
            return (e10 || Object.keys(this.columns)).map((e11) => {
              var _a2;
              return (_a2 = this.columns[e11]) == null ? void 0 : _a2[t10];
            });
          }
          setColumn(t10, e10 = [], i10 = 0, s10) {
            this.setColumns({ [t10]: e10 }, i10, s10);
          }
          setColumns(t10, e10, i10) {
            let s10 = this.rowCount;
            rM(t10, (t11, e11) => {
              this.columns[e11] = t11.slice(), s10 = t11.length;
            }), this.applyRowCount(s10), (i10 == null ? void 0 : i10.silent) || (rw(this, "afterSetColumns"), this.versionTag = rS());
          }
          setRow(t10, e10 = this.rowCount, i10, s10) {
            let { columns: o10 } = this, r10 = i10 ? this.rowCount + 1 : e10 + 1, a10 = Object.keys(t10);
            if ((s10 == null ? void 0 : s10.addColumns) !== false) for (let t11 = 0, e11 = a10.length; t11 < e11; t11++) {
              let e12 = a10[t11];
              o10[e12] || (o10[e12] = []);
            }
            rM(o10, (a11, n10) => {
              var _a2, _b2;
              a11 || (s10 == null ? void 0 : s10.addColumns) === false || (a11 = Array(r10)), a11 && (i10 ? a11 = rk(a11, e10, 0, true, [(_a2 = t10[n10]) != null ? _a2 : null]).array : a11[e10] = (_b2 = t10[n10]) != null ? _b2 : null, o10[n10] = a11);
            }), r10 > this.rowCount && this.applyRowCount(r10), (s10 == null ? void 0 : s10.silent) || (rw(this, "afterSetRows"), this.versionTag = rS());
          }
          getModified() {
            return this.modified || this;
          }
        }, { extend: rC, merge: rA, pick: rP } = tn;
        var rL = T || (T = {});
        function rO(t10, e10, i10) {
          var _a2, _b2;
          let s10 = this.legendItem = this.legendItem || {}, { chart: o10, options: r10 } = this, { baseline: a10 = 0, symbolWidth: n10, symbolHeight: h10 } = t10, l2 = this.symbol || "circle", d2 = h10 / 2, c2 = o10.renderer, p2 = s10.group, g2 = a10 - Math.round((((_a2 = t10.fontMetrics) == null ? void 0 : _a2.b) || h10) * (i10 ? 0.4 : 0.3)), u2 = {}, f2, m2 = r10.marker, x2 = 0;
          if (o10.styledMode || (u2["stroke-width"] = Math.min(r10.lineWidth || 0, 24), r10.dashStyle ? u2.dashstyle = r10.dashStyle : "square" !== r10.linecap && (u2["stroke-linecap"] = "round")), s10.line = c2.path().addClass("highcharts-graph").attr(u2).add(p2), i10 && (s10.area = c2.path().addClass("highcharts-area").add(p2)), u2["stroke-linecap"] && (x2 = Math.min(s10.line.strokeWidth(), n10) / 2), n10) {
            let t11 = [["M", x2, g2], ["L", n10 - x2, g2]];
            s10.line.attr({ d: t11 }), (_b2 = s10.area) == null ? void 0 : _b2.attr({ d: [...t11, ["L", n10 - x2, a10], ["L", x2, a10]] });
          }
          if (m2 && false !== m2.enabled && n10) {
            let t11 = Math.min(rP(m2.radius, d2), d2);
            0 === l2.indexOf("url") && (m2 = rA(m2, { width: h10, height: h10 }), t11 = 0), s10.symbol = f2 = c2.symbol(l2, n10 / 2 - t11, g2 - t11, 2 * t11, 2 * t11, rC({ context: "legend" }, m2)).addClass("highcharts-point").add(p2), f2.isMarker = true;
          }
        }
        rL.areaMarker = function(t10, e10) {
          rO.call(this, t10, e10, true);
        }, rL.lineMarker = rO, rL.rectangle = function(t10, e10) {
          let i10 = e10.legendItem || {}, s10 = t10.options, o10 = t10.symbolHeight, r10 = s10.squareSymbol, a10 = r10 ? o10 : t10.symbolWidth;
          i10.symbol = this.chart.renderer.rect(r10 ? (t10.symbolWidth - o10) / 2 : 0, t10.baseline - o10 + 1, a10, o10, rP(t10.options.symbolRadius, o10 / 2)).addClass("highcharts-point").attr({ zIndex: 3 }).add(i10.group);
        };
        let rE = T, { defaultOptions: rI } = tD, { extend: rD, extendClass: rB, merge: rN } = tn;
        var rz = C || (C = {});
        function rR(t10, e10) {
          let i10 = rI.plotOptions || {}, s10 = e10.defaultOptions, o10 = e10.prototype;
          return o10.type = t10, o10.pointClass || (o10.pointClass = rt), !rz.seriesTypes[t10] && (s10 && (i10[t10] = s10), rz.seriesTypes[t10] = e10, true);
        }
        rz.seriesTypes = z.seriesTypes, rz.registerSeriesType = rR, rz.seriesType = function(t10, e10, i10, s10, o10) {
          let r10 = rI.plotOptions || {};
          if (e10 = e10 || "", r10[t10] = rN(r10[e10], i10), delete rz.seriesTypes[t10], rR(t10, rB(rz.seriesTypes[e10] || z.Series, s10)), rz.seriesTypes[t10].prototype.type = t10, o10) {
            class e11 extends rt {
            }
            rD(e11.prototype, o10), rz.seriesTypes[t10].prototype.pointClass = e11;
          }
          return rz.seriesTypes[t10];
        };
        let rW = C, { animObject: rH, setAnimation: rX } = t5, { defaultOptions: rF } = tD, { registerEventOptions: rG } = su, { svg: rY, win: rj } = z, { seriesTypes: rU } = rW, { format: r$ } = eS, { arrayMax: rV, arrayMin: rZ, clamp: r_, correctFloat: rq, crisp: rK, defined: rJ, destroyObjectProperties: rQ, diffObjects: r0, erase: r1, error: r2, extend: r3, find: r5, fireEvent: r6, getClosestDistance: r9, getNestedProperty: r4, insertItem: r8, isArray: r7, isNumber: at, isString: ae, merge: ai, objectEach: as, pick: ao, removeEvent: ar, syncTimeout: aa } = tn;
        class an {
          constructor() {
            this.zoneAxis = "y";
          }
          init(t10, e10) {
            var _a2, _b2, _c2, _d2;
            let i10;
            r6(this, "init", { options: e10 }), (_a2 = this.dataTable) != null ? _a2 : this.dataTable = new rT();
            let s10 = t10.series;
            this.eventsToUnbind = [], this.chart = t10, this.options = this.setOptions(e10);
            let o10 = this.options, r10 = false !== o10.visible;
            this.linkedSeries = [], this.bindAxes(), r3(this, { name: o10.name, state: "", visible: r10, selected: true === o10.selected }), rG(this, o10);
            let a10 = o10.events;
            ((a10 == null ? void 0 : a10.click) || ((_c2 = (_b2 = o10.point) == null ? void 0 : _b2.events) == null ? void 0 : _c2.click) || o10.allowPointSelect) && (t10.runTrackerClick = true), this.getColor(), this.getSymbol(), this.isCartesian && (t10.hasCartesianSeries = true), s10.length && (i10 = s10[s10.length - 1]), this._i = ao(i10 == null ? void 0 : i10._i, -1) + 1, this.opacity = this.options.opacity, t10.orderItems("series", r8(this, s10)), ((_d2 = o10.dataSorting) == null ? void 0 : _d2.enabled) ? this.setDataSortingOptions() : this.points || this.data || this.setData(o10.data, false), r6(this, "afterInit");
          }
          is(t10) {
            return rU[t10] && this instanceof rU[t10];
          }
          bindAxes() {
            let t10, e10 = this, i10 = e10.options, s10 = e10.chart;
            r6(this, "bindAxes", null, function() {
              (e10.axisTypes || []).forEach(function(o10) {
                (s10[o10] || []).forEach(function(s11) {
                  t10 = s11.options, (ao(i10[o10], 0) === s11.index || void 0 !== i10[o10] && i10[o10] === t10.id) && (r8(e10, s11.series), e10[o10] = s11, s11.isDirty = true);
                }), e10[o10] || e10.optionalAxis === o10 || r2(18, true, s10);
              });
            }), r6(this, "afterBindAxes");
          }
          hasData() {
            return this.visible && void 0 !== this.dataMax && void 0 !== this.dataMin || this.visible && this.dataTable.rowCount > 0;
          }
          hasMarkerChanged(t10, e10) {
            let i10 = t10.marker, s10 = e10.marker || {};
            return i10 && (s10.enabled && !i10.enabled || s10.symbol !== i10.symbol || s10.height !== i10.height || s10.width !== i10.width);
          }
          autoIncrement(t10) {
            var _a2, _b2;
            let e10, i10 = this.options, { pointIntervalUnit: s10, relativeXValue: o10 } = this.options, r10 = this.chart.time, a10 = (_b2 = (_a2 = this.xIncrement) != null ? _a2 : r10.parse(i10.pointStart)) != null ? _b2 : 0;
            if (this.pointInterval = e10 = ao(this.pointInterval, i10.pointInterval, 1), o10 && at(t10) && (e10 *= t10), s10) {
              let t11 = r10.toParts(a10);
              "day" === s10 ? t11[2] += e10 : "month" === s10 ? t11[1] += e10 : "year" === s10 && (t11[0] += e10), e10 = r10.makeTime.apply(r10, t11) - a10;
            }
            return o10 && at(t10) ? a10 + e10 : (this.xIncrement = a10 + e10, a10);
          }
          setDataSortingOptions() {
            let t10 = this.options;
            r3(this, { requireSorting: false, sorted: false, enabledDataSorting: true, allowDG: false }), rJ(t10.pointRange) || (t10.pointRange = 1);
          }
          setOptions(t10) {
            var _a2, _b2;
            let e10, i10 = this.chart, s10 = i10.options.plotOptions, o10 = i10.userOptions || {}, r10 = ai(t10), a10 = i10.styledMode, n10 = { plotOptions: s10, userOptions: r10 };
            r6(this, "setOptions", n10);
            let h10 = n10.plotOptions[this.type], l2 = o10.plotOptions || {}, d2 = l2.series || {}, c2 = rF.plotOptions[this.type] || {}, p2 = l2[this.type] || {};
            h10.dataLabels = this.mergeArrays(c2.dataLabels, h10.dataLabels), this.userOptions = n10.userOptions;
            let g2 = ai(h10, s10.series, p2, r10);
            this.tooltipOptions = ai(rF.tooltip, (_a2 = rF.plotOptions.series) == null ? void 0 : _a2.tooltip, c2 == null ? void 0 : c2.tooltip, i10.userOptions.tooltip, (_b2 = l2.series) == null ? void 0 : _b2.tooltip, p2.tooltip, r10.tooltip), this.stickyTracking = ao(r10.stickyTracking, p2.stickyTracking, d2.stickyTracking, !!this.tooltipOptions.shared && !this.noSharedTooltip || g2.stickyTracking), null === h10.marker && delete g2.marker, this.zoneAxis = g2.zoneAxis || "y";
            let u2 = this.zones = (g2.zones || []).map((t11) => __spreadValues({}, t11));
            return (g2.negativeColor || g2.negativeFillColor) && !g2.zones && (e10 = { value: g2[this.zoneAxis + "Threshold"] || g2.threshold || 0, className: "highcharts-negative" }, a10 || (e10.color = g2.negativeColor, e10.fillColor = g2.negativeFillColor), u2.push(e10)), u2.length && rJ(u2[u2.length - 1].value) && u2.push(a10 ? {} : { color: this.color, fillColor: this.fillColor }), r6(this, "afterSetOptions", { options: g2 }), g2;
          }
          getName() {
            var _a2;
            return (_a2 = this.options.name) != null ? _a2 : r$(this.chart.options.lang.seriesName, this, this.chart);
          }
          getCyclic(t10, e10, i10) {
            let s10, o10, r10 = this.chart, a10 = `${t10}Index`, n10 = `${t10}Counter`, h10 = (i10 == null ? void 0 : i10.length) || r10.options.chart.colorCount;
            !e10 && (rJ(o10 = ao("color" === t10 ? this.options.colorIndex : void 0, this[a10])) ? s10 = o10 : (r10.series.length || (r10[n10] = 0), s10 = r10[n10] % h10, r10[n10] += 1), i10 && (e10 = i10[s10])), void 0 !== s10 && (this[a10] = s10), this[t10] = e10;
          }
          getColor() {
            this.chart.styledMode ? this.getCyclic("color") : this.options.colorByPoint ? this.color = "#cccccc" : this.getCyclic("color", this.options.color || rF.plotOptions[this.type].color, this.chart.options.colors);
          }
          getPointsCollection() {
            return (this.hasGroupedData ? this.points : this.data) || [];
          }
          getSymbol() {
            let t10 = this.options.marker;
            this.getCyclic("symbol", t10.symbol, this.chart.options.symbols);
          }
          getColumn(t10, e10) {
            return (e10 ? this.dataTable.getModified() : this.dataTable).getColumn(t10, true) || [];
          }
          findPointIndex(t10, e10) {
            var _a2;
            let i10, s10, o10, { id: r10, x: a10 } = t10, n10 = this.points, h10 = this.options.dataSorting, l2 = this.cropStart || 0;
            if (r10) {
              let t11 = this.chart.get(r10);
              t11 instanceof rt && (i10 = t11);
            } else if (this.linkedParent || this.enabledDataSorting || this.options.relativeXValue) {
              let e11 = (e12) => !e12.touched && e12.index === t10.index;
              if ((h10 == null ? void 0 : h10.matchByName) ? e11 = (e12) => !e12.touched && e12.name === t10.name : this.options.relativeXValue && (e11 = (e12) => !e12.touched && e12.options.x === t10.x), !(i10 = r5(n10, e11))) return;
            }
            return i10 && void 0 !== (o10 = i10 == null ? void 0 : i10.index) && (s10 = true), void 0 === o10 && at(a10) && (o10 = this.getColumn("x").indexOf(a10, e10)), -1 !== o10 && void 0 !== o10 && this.cropped && (o10 = o10 >= l2 ? o10 - l2 : o10), !s10 && at(o10) && ((_a2 = n10[o10]) == null ? void 0 : _a2.touched) && (o10 = void 0), o10;
          }
          updateData(t10, e10) {
            var _a2;
            let { options: i10, requireSorting: s10 } = this, o10 = i10.dataSorting, r10 = this.points, a10 = [], n10 = t10.length === r10.length, h10 = this.xIncrement, l2, d2, c2, p2, g2 = true;
            if (this.xIncrement = null, t10.forEach((t11, e11) => {
              var _a3;
              let h11, d3 = rJ(t11) && this.pointClass.prototype.optionsToObject.call({ series: this }, t11) || {}, { id: c3, x: g3 } = d3;
              c3 || at(g3) ? (-1 === (h11 = this.findPointIndex(d3, p2)) || void 0 === h11 ? a10.push(t11) : r10[h11] && t11 !== ((_a3 = i10.data) == null ? void 0 : _a3[h11]) ? (r10[h11].update(t11, false, void 0, false), r10[h11].touched = true, s10 && (p2 = h11 + 1)) : r10[h11] && (r10[h11].touched = true), (!n10 || e11 !== h11 || (o10 == null ? void 0 : o10.enabled) || this.hasDerivedData) && (l2 = true)) : a10.push(t11);
            }, this), l2) for (d2 = r10.length; d2--; ) (c2 = r10[d2]) && !c2.touched && ((_a2 = c2.remove) == null ? void 0 : _a2.call(c2, false, e10));
            else n10 && !(o10 == null ? void 0 : o10.enabled) ? (t10.forEach((t11, e11) => {
              t11 === r10[e11].y || r10[e11].destroyed || r10[e11].update(t11, false, void 0, false);
            }), a10.length = 0) : g2 = false;
            if (r10.forEach((t11) => {
              t11 && (t11.touched = false);
            }), !g2) return false;
            a10.forEach((t11) => {
              this.addPoint(t11, false, void 0, void 0, false);
            }, this);
            let u2 = this.getColumn("x");
            return null !== h10 && null === this.xIncrement && u2.length && (this.xIncrement = rV(u2), this.autoIncrement()), true;
          }
          dataColumnKeys() {
            return ["x", ...this.pointArrayMap || ["y"]];
          }
          setData(t10, e10 = true, i10, s10) {
            var _a2, _b2;
            let o10 = this.points, r10 = (o10 == null ? void 0 : o10.length) || 0, a10 = this.options, n10 = this.chart, h10 = a10.dataSorting, l2 = this.xAxis, d2 = a10.turboThreshold, c2 = this.dataTable, p2 = this.dataColumnKeys(), g2 = this.pointValKey || "y", u2 = (this.pointArrayMap || []).length, f2 = a10.keys, m2, x2, y2 = 0, b2 = 1, v2;
            n10.options.chart.allowMutatingData || (a10.data && delete this.options.data, this.userOptions.data && delete this.userOptions.data, v2 = ai(true, t10));
            let k2 = (t10 = v2 || t10 || []).length;
            if ((h10 == null ? void 0 : h10.enabled) && (t10 = this.sortData(t10)), n10.options.chart.allowMutatingData && false !== s10 && k2 && r10 && !this.cropped && !this.hasGroupedData && this.visible && !this.boosted && (x2 = this.updateData(t10, i10)), !x2) {
              this.xIncrement = null, this.colorCounter = 0;
              let e11 = d2 && !a10.relativeXValue && k2 > d2;
              if (e11) {
                let i11 = this.getFirstValidPoint(t10), s11 = this.getFirstValidPoint(t10, k2 - 1, -1), o11 = (t11) => !!(r7(t11) && (f2 || at(t11[0])));
                if (at(i11) && at(s11)) {
                  let e12 = [], i12 = [];
                  for (let s12 of t10) e12.push(this.autoIncrement()), i12.push(s12);
                  c2.setColumns({ x: e12, [g2]: i12 });
                } else if (o11(i11) && o11(s11)) if (u2) {
                  let e12 = +(i11.length === u2), s12 = Array(p2.length).fill(0).map(() => []);
                  for (let i12 of t10) {
                    e12 && s12[0].push(this.autoIncrement());
                    for (let t11 = e12; t11 <= u2; t11++) (_a2 = s12[t11]) == null ? void 0 : _a2.push(i12[t11 - e12]);
                  }
                  c2.setColumns(p2.reduce((t11, e13, i12) => (t11[e13] = s12[i12], t11), {}));
                } else {
                  f2 && (y2 = f2.indexOf("x"), b2 = f2.indexOf("y"), y2 = y2 >= 0 ? y2 : 0, b2 = b2 >= 0 ? b2 : 1), 1 === i11.length && (b2 = 0);
                  let e12 = [], s12 = [];
                  if (y2 === b2) for (let i12 of t10) e12.push(this.autoIncrement()), s12.push(i12[b2]);
                  else for (let i12 of t10) e12.push(i12[y2]), s12.push(i12[b2]);
                  c2.setColumns({ x: e12, [g2]: s12 });
                }
                else e11 = false;
              }
              if (!e11) {
                let e12 = p2.reduce((t11, e13) => (t11[e13] = [], t11), {});
                for (m2 = 0; m2 < k2; m2++) {
                  let i11 = this.pointClass.prototype.applyOptions.apply({ series: this }, [t10[m2]]);
                  for (let t11 of p2) e12[t11][m2] = i11[t11];
                }
                c2.setColumns(e12);
              }
              for (ae(this.getColumn("y")[0]) && r2(14, true, n10), this.data = [], this.options.data = this.userOptions.data = t10, m2 = r10; m2--; ) (_b2 = o10[m2]) == null ? void 0 : _b2.destroy();
              l2 && (l2.minRange = l2.userMinRange), this.isDirty = n10.isDirtyBox = true, this.isDirtyData = !!o10, i10 = false;
            }
            "point" === a10.legendType && (this.processData(), this.generatePoints()), e10 && n10.redraw(i10);
          }
          sortData(t10) {
            let e10 = this, i10 = e10.options.dataSorting.sortKey || "y", s10 = function(t11, e11) {
              return rJ(e11) && t11.pointClass.prototype.optionsToObject.call({ series: t11 }, e11) || {};
            };
            return t10.forEach(function(i11, o10) {
              t10[o10] = s10(e10, i11), t10[o10].index = o10;
            }, this), t10.concat().sort((t11, e11) => {
              let s11 = r4(i10, t11), o10 = r4(i10, e11);
              return o10 < s11 ? -1 : +(o10 > s11);
            }).forEach(function(t11, e11) {
              t11.x = e11;
            }, this), e10.linkedSeries && e10.linkedSeries.forEach(function(e11) {
              var _a2;
              let i11 = e11.options, o10 = i11.data;
              !((_a2 = i11.dataSorting) == null ? void 0 : _a2.enabled) && o10 && (o10.forEach(function(i12, r10) {
                o10[r10] = s10(e11, i12), t10[r10] && (o10[r10].x = t10[r10].x, o10[r10].index = r10);
              }), e11.setData(o10, false));
            }), t10;
          }
          getProcessedData(t10) {
            let e10 = this, { dataTable: i10, isCartesian: s10, options: o10, xAxis: r10 } = e10, a10 = o10.cropThreshold, n10 = t10 || e10.getExtremesFromAll, h10 = r10 == null ? void 0 : r10.logarithmic, l2 = i10.rowCount, d2, c2, p2 = 0, g2, u2, f2, m2 = e10.getColumn("x"), x2 = i10, y2 = false;
            return r10 && (u2 = (g2 = r10.getExtremes()).min, f2 = g2.max, y2 = !!(r10.categories && !r10.names.length), s10 && e10.sorted && !n10 && (!a10 || l2 > a10 || e10.forceCrop) && (m2[l2 - 1] < u2 || m2[0] > f2 ? x2 = new rT() : e10.getColumn(e10.pointValKey || "y").length && (m2[0] < u2 || m2[l2 - 1] > f2) && (x2 = (d2 = this.cropData(i10, u2, f2)).modified, p2 = d2.start, c2 = true))), m2 = x2.getColumn("x") || [], { modified: x2, cropped: c2, cropStart: p2, closestPointRange: r9([h10 ? m2.map(h10.log2lin) : m2], () => e10.requireSorting && !y2 && r2(15, false, e10.chart)) };
          }
          processData(t10) {
            let e10 = this.xAxis, i10 = this.dataTable;
            if (this.isCartesian && !this.isDirty && !e10.isDirty && !this.yAxis.isDirty && !t10) return false;
            let s10 = this.getProcessedData();
            i10.modified = s10.modified, this.cropped = s10.cropped, this.cropStart = s10.cropStart, this.closestPointRange = this.basePointRange = s10.closestPointRange, r6(this, "afterProcessData");
          }
          cropData(t10, e10, i10) {
            let s10 = t10.getColumn("x", true) || [], o10 = s10.length, r10 = {}, a10, n10, h10 = 0, l2 = o10;
            for (a10 = 0; a10 < o10; a10++) if (s10[a10] >= e10) {
              h10 = Math.max(0, a10 - 1);
              break;
            }
            for (n10 = a10; n10 < o10; n10++) if (s10[n10] > i10) {
              l2 = n10 + 1;
              break;
            }
            for (let e11 of this.dataColumnKeys()) {
              let i11 = t10.getColumn(e11, true);
              i11 && (r10[e11] = i11.slice(h10, l2));
            }
            return { modified: new rT({ columns: r10 }), start: h10, end: l2 };
          }
          generatePoints() {
            var _a2, _b2, _c2, _d2, _e2, _f2, _g2, _h2;
            let t10 = this.options, e10 = this.processedData || t10.data, i10 = this.dataTable.getModified(), s10 = this.getColumn("x", true), o10 = this.pointClass, r10 = i10.rowCount, a10 = this.cropStart || 0, n10 = this.hasGroupedData, h10 = t10.keys, l2 = [], d2 = ((_a2 = t10.dataGrouping) == null ? void 0 : _a2.groupAll) ? a10 : 0, c2 = this.pointArrayMap || ["y"], p2 = this.dataColumnKeys(), g2, u2, f2, m2, x2 = this.data, y2;
            if (!x2 && !n10) {
              let t11 = [];
              t11.length = (e10 == null ? void 0 : e10.length) || 0, x2 = this.data = t11;
            }
            for (h10 && n10 && (this.options.keys = false), m2 = 0; m2 < r10; m2++) u2 = a10 + m2, n10 ? ((f2 = new o10(this, i10.getRow(m2, p2) || [])).dataGroup = (_b2 = this.groupMap) == null ? void 0 : _b2[d2 + m2], ((_c2 = f2.dataGroup) == null ? void 0 : _c2.options) && (f2.options = f2.dataGroup.options, r3(f2, f2.dataGroup.options), delete f2.dataLabels, f2.key = (_d2 = f2.name) != null ? _d2 : f2.category)) : (f2 = x2[u2], y2 = e10 ? e10[u2] : i10.getRow(m2, c2), f2 || void 0 === y2 ? f2 && (f2.category = (_g2 = (_f2 = (_e2 = this.xAxis) == null ? void 0 : _e2.categories) == null ? void 0 : _f2[f2.x]) != null ? _g2 : f2.x, f2.key = (_h2 = f2.name) != null ? _h2 : f2.category) : x2[u2] = f2 = new o10(this, y2, s10[m2])), f2 && (f2.index = n10 ? d2 + m2 : u2, l2[m2] = f2);
            if (this.options.keys = h10, x2 && (r10 !== (g2 = x2.length) || n10)) for (m2 = 0; m2 < g2; m2++) m2 !== a10 || n10 || (m2 += r10), x2[m2] && (x2[m2].destroyElements(), x2[m2].plotX = void 0);
            this.data = x2, this.points = l2, r6(this, "afterGeneratePoints");
          }
          getXExtremes(t10) {
            return { min: rZ(t10), max: rV(t10) };
          }
          getExtremes(t10, e10) {
            var _a2;
            let { xAxis: i10, yAxis: s10 } = this, o10 = e10 || this.getExtremesFromAll || this.options.getExtremesFromAll, r10 = o10 && this.cropped ? this.dataTable : this.dataTable.getModified(), a10 = r10.rowCount, n10 = t10 || this.stackedYData, h10 = n10 ? [n10] : ((_a2 = this.keysAffectYAxis || this.pointArrayMap || ["y"]) == null ? void 0 : _a2.map((t11) => r10.getColumn(t11, true) || [])) || [], l2 = this.getColumn("x", true), d2 = [], c2 = this.requireSorting && !this.is("column") ? 1 : 0, p2 = !!s10 && s10.positiveValuesOnly, g2 = o10 || this.cropped || !i10, u2, f2, m2, x2 = 0, y2 = 0;
            for (i10 && (x2 = (u2 = i10.getExtremes()).min, y2 = u2.max), m2 = 0; m2 < a10; m2++) if (f2 = l2[m2], g2 || (l2[m2 + c2] || f2) >= x2 && (l2[m2 - c2] || f2) <= y2) for (let t11 of h10) {
              let e11 = t11[m2];
              at(e11) && (e11 > 0 || !p2) && d2.push(e11);
            }
            let b2 = { activeYData: d2, dataMin: rZ(d2), dataMax: rV(d2) };
            return r6(this, "afterGetExtremes", { dataExtremes: b2 }), b2;
          }
          applyExtremes() {
            let t10 = this.getExtremes();
            return this.dataMin = t10.dataMin, this.dataMax = t10.dataMax, t10;
          }
          getFirstValidPoint(t10, e10 = 0, i10 = 1) {
            let s10 = t10.length, o10 = e10;
            for (; o10 >= 0 && o10 < s10; ) {
              if (rJ(t10[o10])) return t10[o10];
              o10 += i10;
            }
          }
          translate() {
            var _a2;
            this.generatePoints();
            let t10 = this.options, e10 = t10.stacking, i10 = this.xAxis, s10 = this.enabledDataSorting, o10 = this.yAxis, r10 = this.points, a10 = r10.length, n10 = this.pointPlacementToXValue(), h10 = !!n10, l2 = t10.threshold, d2 = t10.startFromThreshold ? l2 : 0, c2 = (t10 == null ? void 0 : t10.nullInteraction) && o10.len, p2, g2, u2, f2, m2 = Number.MAX_VALUE;
            function x2(t11) {
              return r_(t11, -1e9, 1e9);
            }
            for (p2 = 0; p2 < a10; p2++) {
              let t11, a11 = r10[p2], y2 = a11.x, b2, v2, k2 = a11.y, w2 = a11.low, M2 = e10 && ((_a2 = o10.stacking) == null ? void 0 : _a2.stacks[(this.negStacks && k2 < (d2 ? 0 : l2) ? "-" : "") + this.stackKey]);
              a11.plotX = at(g2 = i10.translate(y2, false, false, false, true, n10)) ? rq(x2(g2)) : void 0, e10 && this.visible && M2 && M2[y2] && (f2 = this.getStackIndicator(f2, y2, this.index), !a11.isNull && f2.key && (v2 = (b2 = M2[y2]).points[f2.key]), b2 && r7(v2) && (w2 = v2[0], k2 = v2[1], w2 === d2 && f2.key === M2[y2].base && (w2 = ao(at(l2) ? l2 : o10.min)), o10.positiveValuesOnly && rJ(w2) && w2 <= 0 && (w2 = void 0), a11.total = a11.stackTotal = ao(b2.total), a11.percentage = rJ(a11.y) && b2.total ? a11.y / b2.total * 100 : void 0, a11.stackY = k2, this.irregularWidths || b2.setOffset(this.pointXOffset || 0, this.barW || 0, void 0, void 0, void 0, this.xAxis))), a11.yBottom = rJ(w2) ? x2(o10.translate(w2, false, true, false, true)) : void 0, this.dataModify && (k2 = this.dataModify.modifyValue(k2, p2)), at(k2) && void 0 !== a11.plotX ? t11 = at(t11 = o10.translate(k2, false, true, false, true)) ? x2(t11) : void 0 : !at(k2) && c2 && (t11 = c2), a11.plotY = t11, a11.isInside = this.isPointInside(a11), a11.clientX = h10 ? rq(i10.translate(y2, false, false, false, true, n10)) : g2, a11.negative = (a11.y || 0) < (l2 || 0), a11.isNull || false === a11.visible || (void 0 !== u2 && (m2 = Math.min(m2, Math.abs(g2 - u2))), u2 = g2), a11.zone = this.zones.length ? a11.getZone() : void 0, !a11.graphic && this.group && s10 && (a11.isNew = true);
            }
            this.closestPointRangePx = m2, r6(this, "afterTranslate");
          }
          getValidPoints(t10, e10, i10) {
            let s10 = this.chart;
            return (t10 || this.points || []).filter(function(t11) {
              let { plotX: o10, plotY: r10 } = t11;
              return (!!i10 || !t11.isNull && !!at(r10)) && (!e10 || !!s10.isInsidePlot(o10, r10, { inverted: s10.inverted })) && false !== t11.visible;
            });
          }
          getSharedClipKey() {
            return this.sharedClipKey = (this.options.xAxis || 0) + "," + (this.options.yAxis || 0), this.sharedClipKey;
          }
          setClip() {
            let { chart: t10, group: e10, markerGroup: i10 } = this, s10 = t10.sharedClips, o10 = t10.renderer, r10 = t10.getClipBox(this), a10 = this.getSharedClipKey(), n10 = s10[a10];
            r6(this, "setClip", { clipBox: r10 }), n10 ? n10.animate(r10) : s10[a10] = n10 = o10.clipRect(r10), e10 && e10.clip(false === this.options.clip ? void 0 : n10), i10 && i10.clip();
          }
          animate(t10) {
            let { chart: e10, group: i10, markerGroup: s10 } = this, o10 = e10.inverted, r10 = rH(this.options.animation), a10 = [this.getSharedClipKey(), r10.duration, r10.easing, r10.defer].join(","), n10 = e10.sharedClips[a10], h10 = e10.sharedClips[a10 + "m"];
            if (t10 && i10) {
              let t11 = e10.getClipBox(this);
              if (n10) n10.attr("height", t11.height);
              else {
                t11.width = 0, o10 && (t11.x = e10.plotHeight), n10 = e10.renderer.clipRect(t11), e10.sharedClips[a10] = n10;
                let i11 = { x: -99, y: -99, width: o10 ? e10.plotWidth + 199 : 99, height: o10 ? 99 : e10.plotHeight + 199 };
                h10 = e10.renderer.clipRect(i11), e10.sharedClips[a10 + "m"] = h10;
              }
              i10.clip(n10), s10 == null ? void 0 : s10.clip(h10);
            } else if (n10 && !n10.hasClass("highcharts-animating")) {
              let t11 = e10.getClipBox(this), i11 = r10.step;
              ((s10 == null ? void 0 : s10.element.childNodes.length) || e10.series.length > 1) && (r10.step = function(t12, e11) {
                i11 && i11.apply(e11, arguments), "width" === e11.prop && (h10 == null ? void 0 : h10.element) && h10.attr(o10 ? "height" : "width", t12 + 99);
              }), n10.addClass("highcharts-animating").animate(t11, r10);
            }
          }
          afterAnimate() {
            this.setClip(), as(this.chart.sharedClips, (t10, e10, i10) => {
              t10 && !this.chart.container.querySelector(`[clip-path="url(#${t10.id})"]`) && (t10.destroy(), delete i10[e10]);
            }), this.finishedAnimating = true, r6(this, "afterAnimate");
          }
          drawPoints(t10 = this.points) {
            let e10, i10, s10, o10, r10, a10, n10, h10 = this.chart, l2 = h10.styledMode, { colorAxis: d2, options: c2 } = this, p2 = c2.marker, g2 = c2.nullInteraction, u2 = this[this.specialGroup || "markerGroup"], f2 = this.xAxis, m2 = ao(p2.enabled, !f2 || !!f2.isRadial || null, this.closestPointRangePx >= p2.enabledThreshold * p2.radius);
            if (false !== p2.enabled || this._hasPointMarkers) for (e10 = 0; e10 < t10.length; e10++) {
              o10 = (s10 = (i10 = t10[e10]).graphic) ? "animate" : "attr", r10 = i10.marker || {}, a10 = !!i10.marker;
              let c3 = i10.isNull;
              if ((m2 && !rJ(r10.enabled) || r10.enabled) && (!c3 || g2) && false !== i10.visible) {
                let t11 = ao(r10.symbol, this.symbol, "rect");
                n10 = this.markerAttribs(i10, i10.selected && "select"), this.enabledDataSorting && (i10.startXPos = f2.reversed ? -(n10.width || 0) : f2.width);
                let e11 = false !== i10.isInside;
                if (!s10 && e11 && ((n10.width || 0) > 0 || i10.hasImage) && (i10.graphic = s10 = h10.renderer.symbol(t11, n10.x, n10.y, n10.width, n10.height, a10 ? r10 : p2).add(u2), this.enabledDataSorting && h10.hasRendered && (s10.attr({ x: i10.startXPos }), o10 = "animate")), s10 && "animate" === o10 && s10[e11 ? "show" : "hide"](e11).animate(n10), s10) {
                  let t12 = this.pointAttribs(i10, l2 || !i10.selected ? void 0 : "select");
                  l2 ? d2 && s10.css({ fill: t12.fill }) : s10[o10](t12);
                }
                s10 && s10.addClass(i10.getClassName(), true);
              } else s10 && (i10.graphic = s10.destroy());
            }
          }
          markerAttribs(t10, e10) {
            let i10 = this.options, s10 = i10.marker, o10 = t10.marker || {}, r10 = o10.symbol || s10.symbol, a10 = {}, n10, h10, l2 = ao(o10.radius, s10 == null ? void 0 : s10.radius);
            e10 && (n10 = s10.states[e10], h10 = o10.states && o10.states[e10], l2 = ao(h10 == null ? void 0 : h10.radius, n10 == null ? void 0 : n10.radius, l2 && l2 + ((n10 == null ? void 0 : n10.radiusPlus) || 0))), t10.hasImage = r10 && 0 === r10.indexOf("url"), t10.hasImage && (l2 = 0);
            let d2 = t10.pos();
            return at(l2) && d2 && (i10.crisp && (d2[0] = rK(d2[0], t10.hasImage ? 0 : "rect" === r10 ? (s10 == null ? void 0 : s10.lineWidth) || 0 : 1)), a10.x = d2[0] - l2, a10.y = d2[1] - l2), l2 && (a10.width = a10.height = 2 * l2), a10;
          }
          pointAttribs(t10, e10) {
            var _a2;
            let i10 = this.options, s10 = i10.marker, o10 = t10 == null ? void 0 : t10.options, r10 = (o10 == null ? void 0 : o10.marker) || {}, a10 = o10 == null ? void 0 : o10.color, n10 = t10 == null ? void 0 : t10.color, h10 = (_a2 = t10 == null ? void 0 : t10.zone) == null ? void 0 : _a2.color, l2, d2, c2 = this.color, p2, g2, u2 = ao(r10.lineWidth, s10.lineWidth), f2 = (t10 == null ? void 0 : t10.isNull) && i10.nullInteraction ? 0 : 1;
            return c2 = a10 || h10 || n10 || c2, p2 = r10.fillColor || s10.fillColor || c2, g2 = r10.lineColor || s10.lineColor || c2, e10 = e10 || "normal", l2 = s10.states[e10] || {}, u2 = ao((d2 = r10.states && r10.states[e10] || {}).lineWidth, l2.lineWidth, u2 + ao(d2.lineWidthPlus, l2.lineWidthPlus, 0)), p2 = d2.fillColor || l2.fillColor || p2, g2 = d2.lineColor || l2.lineColor || g2, { stroke: g2, "stroke-width": u2, fill: p2, opacity: f2 = ao(d2.opacity, l2.opacity, f2) };
          }
          destroy(t10) {
            var _a2, _b2;
            let e10, i10, s10 = this, o10 = s10.chart, r10 = /AppleWebKit\/533/.test(rj.navigator.userAgent), a10 = s10.data || [];
            for (r6(s10, "destroy", { keepEventsForUpdate: t10 }), this.removeEvents(t10), (s10.axisTypes || []).forEach(function(t11) {
              i10 = s10[t11], (i10 == null ? void 0 : i10.series) && (r1(i10.series, s10), i10.isDirty = i10.forceRedraw = true);
            }), s10.legendItem && s10.chart.legend.destroyItem(s10), e10 = a10.length; e10--; ) (_b2 = (_a2 = a10[e10]) == null ? void 0 : _a2.destroy) == null ? void 0 : _b2.call(_a2);
            for (let t11 of s10.zones) rQ(t11, void 0, true);
            tn.clearTimeout(s10.animationTimeout), as(s10, function(t11, e11) {
              t11 instanceof it && !t11.survive && t11[r10 && "group" === e11 ? "hide" : "destroy"]();
            }), o10.hoverSeries === s10 && (o10.hoverSeries = void 0), r1(o10.series, s10), o10.orderItems("series"), as(s10, function(e11, i11) {
              t10 && "hcEvents" === i11 || delete s10[i11];
            });
          }
          applyZones() {
            let { area: t10, chart: e10, graph: i10, zones: s10, points: o10, xAxis: r10, yAxis: a10, zoneAxis: n10 } = this, { inverted: h10, renderer: l2 } = e10, d2 = this[`${n10}Axis`], { isXAxis: c2, len: p2 = 0, minPointOffset: g2 = 0 } = d2 || {}, u2 = ((i10 == null ? void 0 : i10.strokeWidth()) || 0) / 2 + 1, f2 = (t11, e11 = 0, i11 = 0) => {
              h10 && (i11 = p2 - i11);
              let { translated: s11 = 0, lineClip: o11 } = t11, r11 = i11 - s11;
              o11 == null ? void 0 : o11.push(["L", e11, Math.abs(r11) < u2 ? i11 - u2 * (r11 <= 0 ? -1 : 1) : s11]);
            };
            if (s10.length && (i10 || t10) && d2 && at(d2.min)) {
              let e11 = d2.getExtremes().max + g2, u3 = (t11) => {
                t11.forEach((e12, i11) => {
                  ("M" === e12[0] || "L" === e12[0]) && (t11[i11] = [e12[0], c2 ? p2 - e12[1] : e12[1], c2 ? e12[2] : p2 - e12[2]]);
                });
              };
              if (s10.forEach((t11) => {
                t11.lineClip = [], t11.translated = r_(d2.toPixels(ao(t11.value, e11), true) || 0, 0, p2);
              }), i10 && !this.showLine && i10.hide(), t10 && t10.hide(), "y" === n10 && o10.length < r10.len) for (let t11 of o10) {
                let { plotX: e12, plotY: i11, zone: o11 } = t11, r11 = o11 && s10[s10.indexOf(o11) - 1];
                o11 && f2(o11, e12, i11), r11 && f2(r11, e12, i11);
              }
              let m2 = [], x2 = d2.toPixels(d2.getExtremes().min - g2, true);
              s10.forEach((e12) => {
                var _a2, _b2;
                let s11 = e12.lineClip || [], o11 = Math.round(e12.translated || 0);
                r10.reversed && s11.reverse();
                let { clip: n11, simpleClip: d3 } = e12, p3 = 0, g3 = 0, f3 = r10.len, y2 = a10.len;
                c2 ? (p3 = o11, f3 = x2) : (g3 = o11, y2 = x2);
                let b2 = [["M", p3, g3], ["L", f3, g3], ["L", f3, y2], ["L", p3, y2], ["Z"]], v2 = [b2[0], ...s11, b2[1], b2[2], ...m2, b2[3], b2[4]];
                m2 = s11.reverse(), x2 = o11, h10 && (u3(v2), t10 && u3(b2)), n11 ? (n11.animate({ d: v2 }), d3 == null ? void 0 : d3.animate({ d: b2 })) : (n11 = e12.clip = l2.path(v2), t10 && (d3 = e12.simpleClip = l2.path(b2))), i10 && ((_a2 = e12.graph) == null ? void 0 : _a2.clip(n11)), t10 && ((_b2 = e12.area) == null ? void 0 : _b2.clip(d3));
              });
            } else this.visible && (i10 && i10.show(), t10 && t10.show());
          }
          plotGroup(t10, e10, i10, s10, o10) {
            let r10 = this[t10], a10 = !r10, n10 = { visibility: i10, zIndex: s10 || 0.1 };
            return rJ(this.opacity) && !this.chart.styledMode && "inactive" !== this.state && (n10.opacity = this.opacity), r10 || (this[t10] = r10 = this.chart.renderer.g().add(o10)), r10.addClass("highcharts-" + e10 + " highcharts-series-" + this.index + " highcharts-" + this.type + "-series " + (rJ(this.colorIndex) ? "highcharts-color-" + this.colorIndex + " " : "") + (this.options.className || "") + (r10.hasClass("highcharts-tracker") ? " highcharts-tracker" : ""), true), r10.attr(n10)[a10 ? "attr" : "animate"](this.getPlotBox(e10)), r10;
          }
          getPlotBox(t10) {
            let e10 = this.xAxis, i10 = this.yAxis, s10 = this.chart, o10 = s10.inverted && !s10.polar && e10 && this.invertible && "series" === t10;
            s10.inverted && (e10 = i10, i10 = this.xAxis);
            let r10 = { scale: 1, translateX: e10 ? e10.left : s10.plotLeft, translateY: i10 ? i10.top : s10.plotTop, name: t10 };
            r6(this, "getPlotBox", r10);
            let { scale: a10, translateX: n10, translateY: h10 } = r10;
            return { translateX: n10, translateY: h10, rotation: 90 * !!o10, rotationOriginX: o10 ? a10 * (e10.len - i10.len) / 2 : 0, rotationOriginY: o10 ? a10 * (e10.len + i10.len) / 2 : 0, scaleX: o10 ? -a10 : a10, scaleY: a10 };
          }
          removeEvents(t10) {
            let { eventsToUnbind: e10 } = this;
            t10 || ar(this), e10.length && (e10.forEach((t11) => {
              t11();
            }), e10.length = 0);
          }
          render() {
            var _a2, _b2, _c2, _d2, _e2;
            let t10 = this, { chart: e10, options: i10, hasRendered: s10 } = t10, o10 = rH(i10.animation), r10 = t10.visible ? "inherit" : "hidden", a10 = i10.zIndex, n10 = e10.seriesGroup, h10 = t10.finishedAnimating ? 0 : o10.duration;
            r6(this, "render"), t10.plotGroup("group", "series", r10, a10, n10), t10.markerGroup = t10.plotGroup("markerGroup", "markers", r10, a10, n10), false !== i10.clip && t10.setClip(), h10 && ((_a2 = t10.animate) == null ? void 0 : _a2.call(t10, true)), t10.drawGraph && (t10.drawGraph(), t10.applyZones()), t10.visible && t10.drawPoints(), (_b2 = t10.drawDataLabels) == null ? void 0 : _b2.call(t10), (_c2 = t10.redrawPoints) == null ? void 0 : _c2.call(t10), i10.enableMouseTracking && ((_d2 = t10.drawTracker) == null ? void 0 : _d2.call(t10)), h10 && ((_e2 = t10.animate) == null ? void 0 : _e2.call(t10)), s10 || (h10 && o10.defer && (h10 += o10.defer), t10.animationTimeout = aa(() => {
              t10.afterAnimate();
            }, h10 || 0)), t10.isDirty = false, t10.hasRendered = true, r6(t10, "afterRender");
          }
          redraw() {
            let t10 = this.isDirty || this.isDirtyData;
            this.translate(), this.render(), t10 && delete this.kdTree;
          }
          reserveSpace() {
            return this.visible || !this.chart.options.chart.ignoreHiddenSeries;
          }
          searchPoint(t10, e10) {
            let { xAxis: i10, yAxis: s10 } = this, o10 = this.chart.inverted;
            return this.searchKDTree({ clientX: o10 ? i10.len - t10.chartY + i10.pos : t10.chartX - i10.pos, plotY: o10 ? s10.len - t10.chartX + s10.pos : t10.chartY - s10.pos }, e10, t10);
          }
          buildKDTree(t10) {
            this.buildingKdTree = true;
            let e10 = this, i10 = e10.options, s10 = i10.findNearestPointBy.indexOf("y") > -1 ? 2 : 1;
            delete e10.kdTree, aa(function() {
              e10.kdTree = (function t11(i11, s11, o10) {
                let r10, a10, n10 = i11 == null ? void 0 : i11.length;
                if (n10) return r10 = e10.kdAxisArray[s11 % o10], i11.sort((t12, e11) => (t12[r10] || 0) - (e11[r10] || 0)), { point: i11[a10 = Math.floor(n10 / 2)], left: t11(i11.slice(0, a10), s11 + 1, o10), right: t11(i11.slice(a10 + 1), s11 + 1, o10) };
              })(e10.getValidPoints(void 0, !e10.directTouch, i10 == null ? void 0 : i10.nullInteraction), s10, s10), e10.buildingKdTree = false;
            }, i10.kdNow || (t10 == null ? void 0 : t10.type) === "touchstart" ? 0 : 1);
          }
          searchKDTree(t10, e10, i10, s10, o10) {
            let r10 = this, [a10, n10] = this.kdAxisArray, h10 = e10 ? "distX" : "dist", l2 = (r10.options.findNearestPointBy || "").indexOf("y") > -1 ? 2 : 1, d2 = !!r10.isBubble, c2 = s10 || ((t11, e11, i11) => {
              let s11 = t11[i11] || 0, o11 = e11[i11] || 0;
              return [s11 === o11 && t11.index > e11.index || s11 < o11 ? t11 : e11, false];
            }), p2 = o10 || ((t11, e11) => t11 < e11);
            if (this.kdTree || this.buildingKdTree || this.buildKDTree(i10), this.kdTree) return (function t11(e11, i11, s11, o11) {
              var _a2, _b2;
              let l3, g2, u2, f2, m2, x2, y2, b2 = i11.point, v2 = r10.kdAxisArray[s11 % o11], k2 = b2, w2 = false;
              l3 = e11[a10], g2 = b2[a10], u2 = rJ(l3) && rJ(g2) ? l3 - g2 : null, f2 = e11[n10], m2 = b2[n10], x2 = rJ(f2) && rJ(m2) ? f2 - m2 : 0, y2 = d2 && ((_a2 = b2.marker) == null ? void 0 : _a2.radius) || 0, b2.dist = Math.sqrt((u2 && u2 * u2 || 0) + x2 * x2) - y2, b2.distX = rJ(u2) ? Math.abs(u2) - y2 : Number.MAX_VALUE;
              let M2 = (e11[v2] || 0) - (b2[v2] || 0) + (d2 && ((_b2 = b2.marker) == null ? void 0 : _b2.radius) || 0), S2 = M2 < 0 ? "left" : "right", T2 = M2 < 0 ? "right" : "left";
              return i11[S2] && ([k2, w2] = c2(b2, t11(e11, i11[S2], s11 + 1, o11), h10)), i11[T2] && p2(Math.sqrt(M2 * M2), k2[h10], w2) && (k2 = c2(k2, t11(e11, i11[T2], s11 + 1, o11), h10)[0]), k2;
            })(t10, this.kdTree, l2, l2);
          }
          pointPlacementToXValue() {
            let { options: t10, xAxis: e10 } = this, i10 = t10.pointPlacement;
            return "between" === i10 && (i10 = e10.reversed ? -0.5 : 0.5), at(i10) ? i10 * (t10.pointRange || e10.pointRange) : 0;
          }
          isPointInside(t10) {
            let { chart: e10, xAxis: i10, yAxis: s10 } = this, { plotX: o10 = -1, plotY: r10 = -1 } = t10;
            return r10 >= 0 && r10 <= (s10 ? s10.len : e10.plotHeight) && o10 >= 0 && o10 <= (i10 ? i10.len : e10.plotWidth);
          }
          drawTracker() {
            var _a2;
            let t10 = this, e10 = t10.options, i10 = e10.trackByArea, s10 = [].concat((i10 ? t10.areaPath : t10.graphPath) || []), o10 = t10.chart, r10 = o10.pointer, a10 = o10.renderer, n10 = ((_a2 = o10.options.tooltip) == null ? void 0 : _a2.snap) || 0, h10 = () => {
              e10.enableMouseTracking && o10.hoverSeries !== t10 && t10.onMouseOver();
            }, l2 = "rgba(192,192,192," + (rY ? 1e-4 : 2e-3) + ")", d2 = t10.tracker;
            d2 ? d2.attr({ d: s10 }) : t10.graph && (t10.tracker = d2 = a10.path(s10).attr({ visibility: t10.visible ? "inherit" : "hidden", zIndex: 2 }).addClass(i10 ? "highcharts-tracker-area" : "highcharts-tracker-line").add(t10.group), o10.styledMode || d2.attr({ "stroke-linecap": "round", "stroke-linejoin": "round", stroke: l2, fill: i10 ? l2 : "none", "stroke-width": t10.graph.strokeWidth() + (i10 ? 0 : 2 * n10) }), [t10.tracker, t10.markerGroup, ...t10.dataLabelsGroups || []].forEach((t11) => {
              t11 && (t11.addClass("highcharts-tracker").on("mouseover", h10).on("mouseout", (t12) => {
                r10 == null ? void 0 : r10.onTrackerMouseOut(t12);
              }), e10.cursor && !o10.styledMode && t11.css({ cursor: e10.cursor }), t11.on("touchstart", h10));
            })), r6(this, "afterDrawTracker");
          }
          addPoint(t10, e10, i10, s10, o10) {
            let r10, a10, n10 = this.options, { chart: h10, data: l2, dataTable: d2, xAxis: c2 } = this, p2 = (c2 == null ? void 0 : c2.hasNames) && c2.names, g2 = n10.data, u2 = this.getColumn("x");
            e10 = ao(e10, true);
            let f2 = { series: this };
            this.pointClass.prototype.applyOptions.apply(f2, [t10]);
            let m2 = f2.x;
            if (a10 = u2.length, this.requireSorting && m2 < u2[a10 - 1]) for (r10 = true; a10 && u2[a10 - 1] > m2; ) a10--;
            d2.setRow(f2, a10, true, { addColumns: false }), p2 && f2.name && (p2[m2] = f2.name), g2 == null ? void 0 : g2.splice(a10, 0, t10), (r10 || this.processedData) && (this.data.splice(a10, 0, null), this.processData()), "point" === n10.legendType && this.generatePoints(), i10 && (l2[0] && l2[0].remove ? l2[0].remove(false) : ([l2, g2].filter(rJ).forEach((t11) => {
              t11.shift();
            }), d2.deleteRows(0))), false !== o10 && r6(this, "addPoint", { point: f2 }), this.isDirty = true, this.isDirtyData = true, e10 && h10.redraw(s10);
          }
          removePoint(t10, e10, i10) {
            let s10 = this, { chart: o10, data: r10, points: a10, dataTable: n10 } = s10, h10 = r10[t10], l2 = function() {
              [(a10 == null ? void 0 : a10.length) === r10.length ? a10 : void 0, r10, s10.options.data].filter(rJ).forEach((e11) => {
                e11.splice(t10, 1);
              }), n10.deleteRows(t10), h10 == null ? void 0 : h10.destroy(), s10.isDirty = true, s10.isDirtyData = true, e10 && o10.redraw();
            };
            rX(i10, o10), e10 = ao(e10, true), h10 ? h10.firePointEvent("remove", null, l2) : l2();
          }
          remove(t10, e10, i10, s10) {
            let o10 = this, r10 = o10.chart;
            function a10() {
              o10.destroy(s10), r10.isDirtyLegend = r10.isDirtyBox = true, r10.linkSeries(s10), ao(t10, true) && r10.redraw(e10);
            }
            false !== i10 ? r6(o10, "remove", null, a10) : a10();
          }
          update(t10, e10) {
            var _a2, _b2, _c2, _d2;
            r6(this, "update", { options: t10 = r0(t10, this.userOptions) });
            let i10 = this, s10 = i10.chart, o10 = i10.userOptions, r10 = i10.initialType || i10.type, a10 = s10.options.plotOptions, n10 = rU[r10].prototype, h10 = i10.finishedAnimating && { animation: false }, l2 = {}, d2, c2, p2 = an.keepProps.slice(), g2 = t10.type || o10.type || s10.options.chart.type, u2 = !(this.hasDerivedData || g2 && g2 !== this.type || void 0 !== t10.keys || void 0 !== t10.pointStart || void 0 !== t10.pointInterval || void 0 !== t10.relativeXValue || t10.joinBy || t10.mapData || ["dataGrouping", "pointStart", "pointInterval", "pointIntervalUnit", "keys"].some((t11) => i10.hasOptionChanged(t11)));
            g2 = g2 || r10, u2 ? (p2.push.apply(p2, an.keepPropsForPoints), false !== t10.visible && p2.push("area", "graph"), i10.parallelArrays.forEach(function(t11) {
              p2.push(t11 + "Data");
            }), t10.data && (t10.dataSorting && r3(i10.options.dataSorting, t10.dataSorting), this.setData(t10.data, false))) : this.dataTable.modified = this.dataTable, t10.dataLabels && o10.dataLabels && (t10.dataLabels = this.mergeArrays(o10.dataLabels, t10.dataLabels)), t10 = ai(o10, { index: void 0 === o10.index ? i10.index : o10.index, pointStart: (_c2 = (_b2 = (_a2 = a10 == null ? void 0 : a10.series) == null ? void 0 : _a2.pointStart) != null ? _b2 : o10.pointStart) != null ? _c2 : i10.getColumn("x")[0] }, !u2 && { data: i10.options.data }, t10, h10), u2 && t10.data && (t10.data = i10.options.data), (p2 = ["dataLabelsGroup", "dataLabelsGroups", "dataLabelsParentGroups", "group", "markerGroup", "transformGroup"].concat(p2)).forEach(function(t11) {
              p2[t11] = i10[t11], delete i10[t11];
            });
            let f2 = false;
            if (rU[g2]) {
              if (f2 = g2 !== i10.type, i10.remove(false, false, false, true), f2) if (s10.propFromSeries(), Object.setPrototypeOf) Object.setPrototypeOf(i10, rU[g2].prototype);
              else {
                let t11 = Object.hasOwnProperty.call(i10, "hcEvents") && i10.hcEvents;
                for (c2 in n10) i10[c2] = void 0;
                r3(i10, rU[g2].prototype), t11 ? i10.hcEvents = t11 : delete i10.hcEvents;
              }
            } else r2(17, true, s10, { missingModuleFor: g2 });
            if (p2.forEach(function(t11) {
              i10[t11] = p2[t11];
            }), i10.init(s10, t10), u2 && this.points) for (let t11 of (false === (d2 = i10.options).visible ? (l2.graphic = 1, l2.dataLabel = 1) : (this.hasMarkerChanged(d2, o10) && (l2.graphic = 1), ((_d2 = i10.hasDataLabels) == null ? void 0 : _d2.call(i10)) || (l2.dataLabel = 1)), this.points)) (t11 == null ? void 0 : t11.series) && (t11.resolveColor(), Object.keys(l2).length && t11.destroyElements(l2), false === d2.showInLegend && t11.legendItem && s10.legend.destroyItem(t11));
            i10.initialType = r10, s10.linkSeries(), s10.setSortedData(), f2 && i10.linkedSeries.length && (i10.isDirtyData = true), r6(this, "afterUpdate"), ao(e10, true) && s10.redraw(!!u2 && void 0);
          }
          setName(t10) {
            this.name = this.options.name = this.userOptions.name = t10, this.chart.isDirtyLegend = true;
          }
          hasOptionChanged(t10) {
            var _a2, _b2;
            let e10 = this.chart, i10 = this.options[t10], s10 = e10.options.plotOptions, o10 = this.userOptions[t10], r10 = ao((_a2 = s10 == null ? void 0 : s10[this.type]) == null ? void 0 : _a2[t10], (_b2 = s10 == null ? void 0 : s10.series) == null ? void 0 : _b2[t10]);
            return o10 && !rJ(r10) ? i10 !== o10 : i10 !== ao(r10, i10);
          }
          onMouseOver() {
            let t10 = this.chart, e10 = t10.hoverSeries, i10 = t10.pointer;
            i10 == null ? void 0 : i10.setHoverChartIndex(), e10 && e10 !== this && e10.onMouseOut(), this.options.events.mouseOver && r6(this, "mouseOver"), this.setState("hover"), t10.hoverSeries = this;
          }
          onMouseOut() {
            let t10 = this.options, e10 = this.chart, i10 = e10.tooltip, s10 = e10.hoverPoint;
            e10.hoverSeries = null, s10 && s10.onMouseOut(), this && t10.events.mouseOut && r6(this, "mouseOut"), i10 && !this.stickyTracking && (!i10.shared || this.noSharedTooltip) && i10.hide(), e10.series.forEach(function(t11) {
              t11.setState("", true);
            });
          }
          setState(t10, e10) {
            var _a2, _b2;
            let i10 = this, { graph: s10, options: o10 } = i10, { inactiveOtherPoints: r10, states: a10 } = o10, n10 = ao((_a2 = a10 == null ? void 0 : a10[t10 || "normal"]) == null ? void 0 : _a2.animation, i10.chart.options.chart.animation), { lineWidth: h10, opacity: l2 } = o10;
            if (t10 = t10 || "", i10.state !== t10 && ([i10.group, i10.markerGroup, ...i10.dataLabelsGroups || []].forEach(function(e11) {
              e11 && (i10.state && e11.removeClass("highcharts-series-" + i10.state), t10 && e11.addClass("highcharts-series-" + t10));
            }), i10.state = t10, !i10.chart.styledMode)) {
              if (((_b2 = a10[t10]) == null ? void 0 : _b2.enabled) === false) return;
              if (t10 && (h10 = a10[t10].lineWidth || h10 + (a10[t10].lineWidthPlus || 0), l2 = ao(a10[t10].opacity, l2)), s10 && !s10.dashstyle && at(h10)) for (let t11 of [s10, ...this.zones.map((t12) => t12.graph)]) t11 == null ? void 0 : t11.animate({ "stroke-width": h10 }, n10);
              r10 || [i10.group, i10.markerGroup, ...i10.dataLabelsGroups || [], i10.labelBySeries].forEach(function(t11) {
                t11 == null ? void 0 : t11.animate({ opacity: l2 }, n10);
              });
            }
            e10 && r10 && i10.points && i10.setAllPointsToState(t10 || void 0);
          }
          setAllPointsToState(t10) {
            this.points.forEach(function(e10) {
              e10.setState && e10.setState(t10);
            });
          }
          setVisible(t10, e10) {
            var _a2, _b2;
            let i10 = this, s10 = i10.chart, o10 = s10.options.chart.ignoreHiddenSeries, r10 = i10.visible;
            i10.visible = t10 = i10.options.visible = i10.userOptions.visible = void 0 === t10 ? !r10 : t10;
            let a10 = t10 ? "show" : "hide";
            ["group", "markerGroup", "tracker", "tt"].forEach((t11) => {
              var _a3;
              (_a3 = i10[t11]) == null ? void 0 : _a3[a10]();
            }), (_a2 = i10.dataLabelsGroups) == null ? void 0 : _a2.forEach((t11) => {
              t11 == null ? void 0 : t11[a10]();
            }), (s10.hoverSeries === i10 || ((_b2 = s10.hoverPoint) == null ? void 0 : _b2.series) === i10) && i10.onMouseOut(), i10.legendItem && s10.legend.colorizeItem(i10, t10), i10.isDirty = true, i10.options.stacking && s10.series.forEach((t11) => {
              t11.options.stacking && t11.visible && (t11.isDirty = true);
            }), i10.linkedSeries.forEach((e11) => {
              e11.setVisible(t10, false);
            }), o10 && (s10.isDirtyBox = true), r6(i10, a10), false !== e10 && s10.redraw();
          }
          show() {
            this.setVisible(true);
          }
          hide() {
            this.setVisible(false);
          }
          select(t10) {
            this.selected = t10 = this.options.selected = void 0 === t10 ? !this.selected : t10, this.checkbox && (this.checkbox.checked = t10), r6(this, t10 ? "select" : "unselect");
          }
          shouldShowTooltip(t10, e10, i10 = {}) {
            return i10.series = this, i10.visiblePlotOnly = true, this.chart.isInsidePlot(t10, e10, i10);
          }
          drawLegendSymbol(t10, e10) {
            var _a2;
            (_a2 = rE[this.options.legendSymbol || "rectangle"]) == null ? void 0 : _a2.call(this, t10, e10);
          }
        }
        an.defaultOptions = { lineWidth: 2, allowPointSelect: false, crisp: true, showCheckbox: false, animation: { duration: 1e3 }, enableMouseTracking: true, events: {}, marker: { enabledThreshold: 2, lineColor: "#ffffff", lineWidth: 0, radius: 4, states: { normal: { animation: true }, hover: { animation: { duration: 150 }, enabled: true, radiusPlus: 2, lineWidthPlus: 1 }, select: { fillColor: "#cccccc", lineColor: "#000000", lineWidth: 2 } } }, point: { events: {} }, dataLabels: { animation: {}, align: "center", borderWidth: 0, defer: true, formatter: function() {
          let { numberFormatter: t10 } = this.series.chart;
          return "number" != typeof this.y ? "" : t10(this.y, -1);
        }, padding: 5, style: { fontSize: "0.7em", fontWeight: "bold", color: "contrast", textOutline: "1px contrast" }, verticalAlign: "bottom", x: 0, y: 0 }, cropThreshold: 300, opacity: 1, pointRange: 0, softThreshold: true, states: { normal: { animation: true }, hover: { animation: { duration: 150 }, lineWidthPlus: 1, marker: {}, halo: { size: 10, opacity: 0.25 } }, select: { animation: { duration: 0 } }, inactive: { animation: { duration: 150 }, opacity: 0.2 } }, stickyTracking: true, turboThreshold: 1e3, findNearestPointBy: "x" }, an.types = rW.seriesTypes, an.registerType = rW.registerSeriesType, an.keepProps = ["colorIndex", "eventOptions", "navigatorSeries", "symbolIndex", "baseSeries"], an.keepPropsForPoints = ["data", "isDirtyData", "isDirtyCanvas", "points", "dataTable", "processedData", "xIncrement", "cropped", "_hasPointMarkers", "hasDataLabels", "nodes", "layout", "level", "mapMap", "mapData", "minY", "maxY", "minX", "maxX", "transformGroups"], r3(an.prototype, { axisTypes: ["xAxis", "yAxis"], coll: "series", colorCounter: 0, directTouch: false, invertible: true, isCartesian: true, kdAxisArray: ["clientX", "plotY"], parallelArrays: ["x", "y"], pointClass: rt, requireSorting: true, sorted: true }), rW.series = an;
        let ah = an, { animObject: al, setAnimation: ad } = t5, { registerEventOptions: ac } = su, { composed: ap, marginNames: ag } = z, { distribute: au } = eO, { format: af } = eS, { addEvent: am, createElement: ax, css: ay, defined: ab, discardElement: av, find: ak, fireEvent: aw, isNumber: aM, merge: aS, pick: aT, pushUnique: aC, relativeLength: aA, stableSort: aP, syncTimeout: aL } = tn;
        class aO {
          constructor(t10, e10) {
            this.allItems = [], this.initialItemY = 0, this.itemHeight = 0, this.itemMarginBottom = 0, this.itemMarginTop = 0, this.itemX = 0, this.itemY = 0, this.lastItemY = 0, this.lastLineHeight = 0, this.legendHeight = 0, this.legendWidth = 0, this.maxItemWidth = 0, this.maxLegendWidth = 0, this.offsetWidth = 0, this.padding = 0, this.pages = [], this.symbolHeight = 0, this.symbolWidth = 0, this.titleHeight = 0, this.totalItemWidth = 0, this.widthOption = 0, this.chart = t10, this.setOptions(e10), e10.enabled && (this.render(), ac(this, e10), am(this.chart, "endResize", function() {
              this.legend.positionCheckboxes();
            })), am(this.chart, "render", () => {
              this.options.enabled && this.proximate && (this.proximatePositions(), this.positionItems());
            });
          }
          setOptions(t10) {
            let e10 = aT(t10.padding, 8);
            this.options = t10, this.chart.styledMode || (this.itemStyle = t10.itemStyle, this.itemHiddenStyle = aS(this.itemStyle, t10.itemHiddenStyle)), this.itemMarginTop = t10.itemMarginTop, this.itemMarginBottom = t10.itemMarginBottom, this.padding = e10, this.initialItemY = e10 - 5, this.symbolWidth = aT(t10.symbolWidth, 16), this.pages = [], this.proximate = "proximate" === t10.layout && !this.chart.inverted, this.baseline = void 0;
          }
          update(t10, e10) {
            let i10 = this.chart;
            this.setOptions(aS(true, this.options, t10)), "events" in this.options && ac(this, this.options), this.destroy(), i10.isDirtyLegend = i10.isDirtyBox = true, aT(e10, true) && i10.redraw(), aw(this, "afterUpdate", { redraw: e10 });
          }
          colorizeItem(t10, e10) {
            var _a2;
            let i10 = t10.color, { area: s10, group: o10, label: r10, line: a10, symbol: n10 } = t10.legendItem || {};
            if ((t10 instanceof ah || t10 instanceof rt) && (t10.color = ((_a2 = t10.options) == null ? void 0 : _a2.legendSymbolColor) || i10), o10 == null ? void 0 : o10[e10 ? "removeClass" : "addClass"]("highcharts-legend-item-hidden"), !this.chart.styledMode) {
              let { itemHiddenStyle: i11 = {} } = this, o11 = i11.color, { fillColor: h10, fillOpacity: l2, lineColor: d2, marker: c2 } = t10.options, p2 = (t11) => (!e10 && (t11.fill && (t11.fill = o11), t11.stroke && (t11.stroke = o11)), t11);
              r10 == null ? void 0 : r10.css(aS(e10 ? this.itemStyle : i11)), a10 == null ? void 0 : a10.attr(p2({ stroke: d2 || t10.color })), n10 && n10.attr(p2(c2 && n10.isMarker ? t10.pointAttribs() : { fill: t10.color })), s10 == null ? void 0 : s10.attr(p2({ fill: h10 || t10.color, "fill-opacity": h10 ? 1 : l2 != null ? l2 : 0.75 }));
            }
            t10.color = i10, aw(this, "afterColorizeItem", { item: t10, visible: e10 });
          }
          positionItems() {
            this.allItems.forEach(this.positionItem, this), this.chart.isResizing || this.positionCheckboxes();
          }
          positionItem(t10) {
            let { group: e10, x: i10 = 0, y: s10 = 0 } = t10.legendItem || {}, o10 = this.options, r10 = o10.symbolPadding, a10 = !o10.rtl, n10 = t10.checkbox;
            if (e10 == null ? void 0 : e10.element) {
              let o11 = { translateX: a10 ? i10 : this.legendWidth - i10 - 2 * r10 - 4, translateY: s10 }, n11 = () => {
                aw(this, "afterPositionItem", { item: t10 });
              };
              e10[ab(e10.translateY) ? "animate" : "attr"](o11, void 0, n11);
            }
            n10 && (n10.x = i10, n10.y = s10);
          }
          destroyItem(t10) {
            let e10 = t10.legendItem || {};
            for (let t11 of ["group", "label", "line", "symbol"]) e10[t11] && (e10[t11] = e10[t11].destroy());
            t10.checkbox = av(t10.checkbox), t10.legendItem = void 0;
          }
          destroy() {
            for (let t10 of this.getAllItems()) this.destroyItem(t10);
            for (let t10 of ["clipRect", "up", "down", "pager", "nav", "box", "title", "group"]) this[t10] && (this[t10] = this[t10].destroy());
            this.display = null;
          }
          positionCheckboxes() {
            var _a2;
            let t10, e10 = (_a2 = this.group) == null ? void 0 : _a2.alignAttr, i10 = this.clipHeight || this.legendHeight, s10 = this.titleHeight;
            e10 && (t10 = e10.translateY, this.allItems.forEach(function(o10) {
              let r10, a10 = o10.checkbox;
              a10 && (r10 = t10 + s10 + a10.y + (this.scrollOffset || 0) + 3, ay(a10, { left: e10.translateX + o10.checkboxOffset + a10.x - 20 + "px", top: r10 + "px", display: this.proximate || r10 > t10 - 6 && r10 < t10 + i10 - 6 ? "" : "none" }));
            }, this));
          }
          renderTitle() {
            let t10 = this.options, e10 = this.padding, i10 = t10.title, s10, o10 = 0;
            i10.text && (this.title || (this.title = this.chart.renderer.label(i10.text, e10 - 3, e10 - 4, void 0, void 0, void 0, t10.useHTML, void 0, "legend-title").attr({ zIndex: 1 }), this.chart.styledMode || this.title.css(i10.style), this.title.add(this.group)), i10.width || this.title.css({ width: this.maxLegendWidth + "px" }), o10 = (s10 = this.title.getBBox()).height, this.offsetWidth = s10.width, this.contentGroup.attr({ translateY: o10 })), this.titleHeight = o10;
          }
          setText(t10) {
            let e10 = this.options;
            t10.legendItem.label.attr({ text: e10.labelFormat ? af(e10.labelFormat, t10, this.chart) : e10.labelFormatter.call(t10) });
          }
          renderItem(t10) {
            var _a2;
            let e10 = t10.legendItem = t10.legendItem || {}, i10 = this.chart, s10 = i10.renderer, o10 = this.options, r10 = "horizontal" === o10.layout, a10 = this.symbolWidth, n10 = o10.symbolPadding || 0, h10 = this.itemStyle, l2 = this.itemHiddenStyle, d2 = r10 ? aT(o10.itemDistance, 20) : 0, c2 = !o10.rtl, p2 = !t10.series, g2 = !p2 && t10.series.drawLegendSymbol ? t10.series : t10, u2 = g2.options, f2 = !!this.createCheckboxForItem && u2 && u2.showCheckbox, m2 = o10.useHTML, x2 = t10.options.className, y2 = e10.label, b2 = a10 + n10 + d2 + 20 * !!f2;
            !y2 && (e10.group = s10.g("legend-item").addClass("highcharts-" + g2.type + "-series highcharts-color-" + t10.colorIndex + (x2 ? " " + x2 : "") + (p2 ? " highcharts-series-" + t10.index : "")).attr({ zIndex: 1 }).add(this.scrollGroup), e10.label = y2 = s10.text("", c2 ? a10 + n10 : -n10, this.baseline || 0, m2), i10.styledMode || y2.css(aS(t10.visible ? h10 : l2)), y2.attr({ align: c2 ? "left" : "right", zIndex: 2 }).add(e10.group), !this.baseline && (this.fontMetrics = s10.fontMetrics(y2), this.baseline = this.fontMetrics.f + 3 + this.itemMarginTop, y2.attr("y", this.baseline), this.symbolHeight = aT(o10.symbolHeight, this.fontMetrics.f), o10.squareSymbol && (this.symbolWidth = aT(o10.symbolWidth, Math.max(this.symbolHeight, 16)), b2 = this.symbolWidth + n10 + d2 + 20 * !!f2, c2 && y2.attr("x", this.symbolWidth + n10))), g2.drawLegendSymbol(this, t10), this.setItemEvents && this.setItemEvents(t10, y2, m2)), f2 && !t10.checkbox && this.createCheckboxForItem && this.createCheckboxForItem(t10), this.colorizeItem(t10, t10.visible), (i10.styledMode || !h10.width) && y2.css({ width: Math.min(o10.itemWidth || this.widthOption || i10.spacingBox.width, o10.maxWidth ? aA(o10.maxWidth, i10.chartWidth) : 1 / 0) - b2 + "px" }), this.setText(t10);
            let v2 = y2.getBBox(), k2 = ((_a2 = this.fontMetrics) == null ? void 0 : _a2.h) || 0;
            t10.itemWidth = t10.checkboxOffset = o10.itemWidth || e10.labelWidth || v2.width + b2, this.maxItemWidth = Math.max(this.maxItemWidth, t10.itemWidth), this.totalItemWidth += t10.itemWidth, this.itemHeight = t10.itemHeight = Math.round(e10.labelHeight || (v2.height > 1.5 * k2 ? v2.height : k2));
          }
          layoutItem(t10) {
            let e10 = this.options, i10 = this.padding, s10 = "horizontal" === e10.layout, o10 = t10.itemHeight, r10 = this.itemMarginBottom, a10 = this.itemMarginTop, n10 = s10 ? aT(e10.itemDistance, 20) : 0, h10 = this.maxLegendWidth, l2 = e10.alignColumns && this.totalItemWidth > h10 ? this.maxItemWidth : t10.itemWidth, d2 = t10.legendItem || {};
            s10 && this.itemX - i10 + l2 > h10 && (this.itemX = i10, this.lastLineHeight && (this.itemY += a10 + this.lastLineHeight + r10), this.lastLineHeight = 0), this.lastItemY = a10 + this.itemY + r10, this.lastLineHeight = Math.max(o10, this.lastLineHeight), d2.x = this.itemX, d2.y = this.itemY, s10 ? this.itemX += l2 : (this.itemY += a10 + o10 + r10, this.lastLineHeight = o10), this.offsetWidth = this.widthOption || Math.max((s10 ? this.itemX - i10 - (t10.checkbox ? 0 : n10) : l2) + i10, this.offsetWidth);
          }
          getAllItems() {
            let t10 = [];
            return this.chart.series.forEach(function(e10) {
              var _a2;
              let i10 = e10 == null ? void 0 : e10.options;
              e10 && aT(i10.showInLegend, !ab(i10.linkedTo) && void 0, true) && (t10 = t10.concat(((_a2 = e10.legendItem) == null ? void 0 : _a2.labels) || ("point" === i10.legendType ? e10.data : e10)));
            }), aw(this, "afterGetAllItems", { allItems: t10 }), t10;
          }
          getAlignment() {
            let t10 = this.options;
            return this.proximate ? t10.align.charAt(0) + "tv" : t10.floating ? "" : t10.align.charAt(0) + t10.verticalAlign.charAt(0) + t10.layout.charAt(0);
          }
          adjustMargins(t10, e10) {
            let i10 = this.chart, s10 = this.options, o10 = this.getAlignment();
            o10 && [/(lth|ct|rth)/, /(rtv|rm|rbv)/, /(rbh|cb|lbh)/, /(lbv|lm|ltv)/].forEach((r10, a10) => {
              var _a2;
              r10.test(o10) && !ab(t10[a10]) && (i10[ag[a10]] = Math.max(i10[ag[a10]], i10.legend[(a10 + 1) % 2 ? "legendHeight" : "legendWidth"] + [1, -1, -1, 1][a10] * s10[a10 % 2 ? "x" : "y"] + ((_a2 = s10.margin) != null ? _a2 : 12) + e10[a10] + (i10.titleOffset[a10] || 0)));
            });
          }
          proximatePositions() {
            let t10, e10 = this.chart, i10 = [], s10 = "left" === this.options.align;
            for (let o10 of (this.allItems.forEach(function(t11) {
              let o11, r10, a10 = s10, n10, h10;
              t11.yAxis && (t11.xAxis.options.reversed && (a10 = !a10), t11.points && (o11 = ak(a10 ? t11.points : t11.points.slice(0).reverse(), function(t12) {
                return aM(t12.plotY);
              })), r10 = this.itemMarginTop + t11.legendItem.label.getBBox().height + this.itemMarginBottom, h10 = t11.yAxis.top - e10.plotTop, n10 = t11.visible ? (o11 ? o11.plotY : t11.yAxis.height) + (h10 - 0.3 * r10) : h10 + t11.yAxis.height, i10.push({ target: n10, size: r10, item: t11 }));
            }, this), au(i10, e10.plotHeight))) t10 = o10.item.legendItem || {}, aM(o10.pos) && (t10.y = e10.plotTop - e10.spacing[0] + o10.pos);
          }
          render() {
            let t10 = this.chart, e10 = t10.spacingBox.width, i10 = t10.renderer, s10 = this.options, o10 = this.padding, r10 = this.getAllItems(), a10, n10, h10, l2 = this.group, d2, c2 = this.box;
            this.itemX = o10, this.itemY = this.initialItemY, this.offsetWidth = 0, this.lastItemY = 0, this.widthOption = aA(s10.width, e10 - o10), d2 = e10 - 2 * o10 - s10.x, ["rm", "lm"].indexOf(this.getAlignment().substring(0, 2)) > -1 && (d2 /= 2), this.maxLegendWidth = this.widthOption || d2, l2 || (this.group = l2 = i10.g("legend").addClass(s10.className || "").attr({ zIndex: 7 }).add(), this.contentGroup = i10.g().attr({ zIndex: 1 }).add(l2), this.scrollGroup = i10.g().add(this.contentGroup)), this.renderTitle(), aP(r10, (t11, e11) => {
              var _a2, _b2;
              return (((_a2 = t11.options) == null ? void 0 : _a2.legendIndex) || 0) - (((_b2 = e11.options) == null ? void 0 : _b2.legendIndex) || 0);
            }), s10.reversed && r10.reverse(), this.allItems = r10, this.display = a10 = !!r10.length, this.lastLineHeight = 0, this.maxItemWidth = 0, this.totalItemWidth = 0, this.itemHeight = 0, r10.forEach(this.renderItem, this), r10.forEach(this.layoutItem, this), n10 = (s10.maxWidth ? Math.min(this.widthOption || this.offsetWidth, d2, aA(s10.maxWidth, t10.chartWidth) || 1 / 0) : this.widthOption || this.offsetWidth) + o10, h10 = this.lastItemY + this.lastLineHeight + this.titleHeight, h10 = this.handleOverflow(h10) + o10, c2 || (this.box = c2 = i10.rect().addClass("highcharts-legend-box").attr({ r: s10.borderRadius }).add(l2)), t10.styledMode || c2.attr({ stroke: s10.borderColor, "stroke-width": s10.borderWidth || 0, fill: s10.backgroundColor || "none" }).shadow(s10.shadow), n10 > 0 && h10 > 0 && c2[c2.placed ? "animate" : "attr"](c2.crisp.call({}, { x: 0, y: 0, width: n10, height: h10 }, c2.strokeWidth())), l2[a10 ? "show" : "hide"](), t10.styledMode && "none" === l2.getStyle("display") && (n10 = h10 = 0), this.legendWidth = n10, this.legendHeight = h10, a10 && this.align(), this.proximate || this.positionItems(), aw(this, "afterRender");
          }
          align(t10 = this.chart.spacingBox) {
            let e10 = this.chart, i10 = this.options, s10 = t10.y;
            /(lth|ct|rth)/.test(this.getAlignment()) && e10.titleOffset[0] > 0 ? s10 += e10.titleOffset[0] : /(lbh|cb|rbh)/.test(this.getAlignment()) && e10.titleOffset[2] > 0 && (s10 -= e10.titleOffset[2]), s10 !== t10.y && (t10 = aS(t10, { y: s10 })), e10.hasRendered || (this.group.placed = false), this.group.align(aS(i10, { width: this.legendWidth, height: this.legendHeight, verticalAlign: this.proximate ? "top" : i10.verticalAlign }), true, t10);
          }
          handleOverflow(t10) {
            let e10 = this, i10 = this.chart, s10 = i10.renderer, o10 = this.options, r10 = o10.y, a10 = "top" === o10.verticalAlign, n10 = this.padding, h10 = o10.maxHeight, l2 = o10.navigation, d2 = aT(l2.animation, true), c2 = l2.arrowSize || 12, p2 = this.pages, g2 = this.allItems, u2 = function(t11) {
              "number" == typeof t11 ? w2.attr({ height: t11 }) : w2 && (e10.clipRect = w2.destroy(), e10.contentGroup.clip()), e10.contentGroup.div && (e10.contentGroup.div.style.clip = t11 ? "rect(" + n10 + "px,9999px," + (n10 + t11) + "px,0)" : "auto");
            }, f2 = function(t11) {
              return e10[t11] = s10.circle(0, 0, 1.3 * c2).translate(c2 / 2, c2 / 2).add(k2), i10.styledMode || e10[t11].attr("fill", "rgba(0,0,0,0.0001)"), e10[t11];
            }, m2, x2, y2, b2, v2 = i10.spacingBox.height + (a10 ? -r10 : r10) - n10, k2 = this.nav, w2 = this.clipRect;
            return "horizontal" !== o10.layout || "middle" === o10.verticalAlign || o10.floating || (v2 /= 2), h10 && (v2 = Math.min(v2, h10)), p2.length = 0, t10 && v2 > 0 && t10 > v2 && false !== l2.enabled ? (this.clipHeight = m2 = Math.max(v2 - 20 - this.titleHeight - n10, 0), this.currentPage = aT(this.currentPage, 1), this.fullHeight = t10, g2.forEach((t11, e11) => {
              let i11 = (y2 = t11.legendItem || {}).y || 0, s11 = Math.round(y2.label.getBBox().height), o11 = p2.length;
              (!o11 || i11 - p2[o11 - 1] > m2 && (x2 || i11) !== p2[o11 - 1]) && (p2.push(x2 || i11), o11++), y2.pageIx = o11 - 1, x2 && b2 && (b2.pageIx = o11 - 1), e11 === g2.length - 1 && i11 + s11 - p2[o11 - 1] > m2 && i11 > p2[o11 - 1] && (p2.push(i11), y2.pageIx = o11), i11 !== x2 && (x2 = i11), b2 = y2;
            }), w2 || (w2 = e10.clipRect = s10.clipRect(0, n10 - 2, 9999, 0), e10.contentGroup.clip(w2)), u2(m2), k2 || (this.nav = k2 = s10.g().attr({ zIndex: 1 }).add(this.group), this.up = s10.symbol("triangle", 0, 0, c2, c2).add(k2), f2("upTracker").on("click", function() {
              e10.scroll(-1, d2);
            }), this.pager = s10.text("", 15, 10).addClass("highcharts-legend-navigation"), !i10.styledMode && l2.style && this.pager.css(l2.style), this.pager.add(k2), this.down = s10.symbol("triangle-down", 0, 0, c2, c2).add(k2), f2("downTracker").on("click", function() {
              e10.scroll(1, d2);
            })), e10.scroll(0), t10 = v2) : k2 && (u2(), this.nav = k2.destroy(), this.scrollGroup.attr({ translateY: 1 }), this.clipHeight = 0), t10;
          }
          scroll(t10, e10) {
            let i10 = this.chart, s10 = this.pages, o10 = s10.length, r10 = this.clipHeight, a10 = this.options.navigation, n10 = this.pager, h10 = this.padding, l2 = this.currentPage + t10;
            l2 > o10 && (l2 = o10), l2 > 0 && (void 0 !== e10 && ad(e10, i10), this.nav.attr({ translateX: h10, translateY: r10 + this.padding + 7 + this.titleHeight, visibility: "inherit" }), [this.up, this.upTracker].forEach(function(t11) {
              t11.attr({ class: 1 === l2 ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active" });
            }), n10.attr({ text: l2 + "/" + o10 }), [this.down, this.downTracker].forEach(function(t11) {
              t11.attr({ x: 18 + this.pager.getBBox().width, class: l2 === o10 ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active" });
            }, this), i10.styledMode || (this.up.attr({ fill: 1 === l2 ? a10.inactiveColor : a10.activeColor }), this.upTracker.css({ cursor: 1 === l2 ? "default" : "pointer" }), this.down.attr({ fill: l2 === o10 ? a10.inactiveColor : a10.activeColor }), this.downTracker.css({ cursor: l2 === o10 ? "default" : "pointer" })), this.scrollOffset = -s10[l2 - 1] + this.initialItemY, this.scrollGroup.animate({ translateY: this.scrollOffset }), this.currentPage = l2, this.positionCheckboxes(), aL(() => {
              aw(this, "afterScroll", { currentPage: l2 });
            }, al(aT(e10, i10.renderer.globalAnimation, true)).duration));
          }
          setItemEvents(t10, e10, i10) {
            let s10 = this, o10 = t10.legendItem || {}, r10 = s10.chart.renderer.boxWrapper, a10 = t10 instanceof rt, n10 = t10 instanceof ah, h10 = "highcharts-legend-" + (a10 ? "point" : "series") + "-active", l2 = s10.chart.styledMode, d2 = i10 ? [e10, o10.symbol] : [o10.group], c2 = (e11) => {
              s10.allItems.forEach((i11) => {
                t10 !== i11 && [i11].concat(i11.linkedSeries || []).forEach((t11) => {
                  t11.setState(e11, !a10);
                });
              });
            };
            for (let i11 of d2) i11 && i11.on("mouseover", function() {
              t10.visible && c2("inactive"), t10.setState("hover"), t10.visible && r10.addClass(h10), l2 || e10.css(s10.options.itemHoverStyle);
            }).on("mouseout", function() {
              s10.chart.styledMode || e10.css(aS(t10.visible ? s10.itemStyle : s10.itemHiddenStyle)), c2(""), r10.removeClass(h10), t10.setState();
            }).on("click", function(e11) {
              let i12 = function() {
                t10.setVisible && t10.setVisible(), c2(t10.visible ? "inactive" : "");
              };
              r10.removeClass(h10), aw(s10, "itemClick", { browserEvent: e11, legendItem: t10 }, i12), a10 ? t10.firePointEvent("legendItemClick", { browserEvent: e11 }) : n10 && aw(t10, "legendItemClick", { browserEvent: e11 });
            });
          }
          createCheckboxForItem(t10) {
            t10.checkbox = ax("input", { type: "checkbox", className: "highcharts-legend-checkbox", checked: t10.selected, defaultChecked: t10.selected }, this.options.itemCheckboxStyle, this.chart.container), am(t10.checkbox, "click", function(e10) {
              let i10 = e10.target;
              aw(t10.series || t10, "checkboxClick", { checked: i10.checked, item: t10 }, function() {
                t10.select();
              });
            });
          }
        }
        (p = aO || (aO = {})).compose = function(t10) {
          aC(ap, "Core.Legend") && am(t10, "beforeMargins", function() {
            this.legend = new p(this, this.options.legend);
          });
        };
        let aE = aO, { animate: aI, animObject: aD, setAnimation: aB } = t5, { defaultOptions: aN } = tD, { numberFormat: az } = eS, { registerEventOptions: aR } = su, { charts: aW, doc: aH, marginNames: aX, svg: aF, win: aG } = z, { seriesTypes: aY } = rW, { addEvent: aj, attr: aU, createElement: a$, css: aV, defined: aZ, diffObjects: a_, discardElement: aq, erase: aK, error: aJ, extend: aQ, find: a0, fireEvent: a1, getAlignFactor: a2, getStyle: a3, isArray: a5, isNumber: a6, isObject: a9, isString: a4, merge: a8, objectEach: a7, pick: nt, pInt: ne, relativeLength: ni, removeEvent: ns, splat: no, syncTimeout: nr, uniqueKey: na } = tn;
        class nn {
          static chart(t10, e10, i10) {
            return new nn(t10, e10, i10);
          }
          constructor(t10, e10, i10) {
            this.sharedClips = {};
            const s10 = [...arguments];
            (a4(t10) || t10.nodeName) && (this.renderTo = s10.shift()), this.init(s10[0], s10[1]);
          }
          setZoomOptions() {
            let t10 = this.options.chart, e10 = t10.zooming;
            this.zooming = __spreadProps(__spreadValues({}, e10), { type: nt(t10.zoomType, e10.type), key: nt(t10.zoomKey, e10.key), pinchType: nt(t10.pinchType, e10.pinchType), singleTouch: nt(t10.zoomBySingleTouch, e10.singleTouch, false), resetButton: a8(e10.resetButton, t10.resetZoomButton) });
          }
          init(t10, e10) {
            a1(this, "init", { args: arguments }, function() {
              var _a2, _b2;
              let i10 = a8(aN, t10), s10 = i10.chart, o10 = this.renderTo || s10.renderTo;
              this.userOptions = aQ({}, t10), (this.renderTo = a4(o10) ? aH.getElementById(o10) : o10) || aJ(13, true, this), this.margin = [], this.spacing = [], this.labelCollectors = [], this.callback = e10, this.isResizing = 0, this.options = i10, this.axes = [], this.series = [], this.locale = (_b2 = i10.lang.locale) != null ? _b2 : (_a2 = this.renderTo.closest("[lang]")) == null ? void 0 : _a2.lang, this.time = new tA(aQ(i10.time || {}, { locale: this.locale }), i10.lang), i10.time = this.time.options, this.numberFormatter = (s10.numberFormatter || az).bind(this), this.styledMode = s10.styledMode, this.hasCartesianSeries = s10.showAxes, this.index = aW.length, aW.push(this), z.chartCount++, aR(this, s10), this.xAxis = [], this.yAxis = [], this.pointCount = this.colorCounter = this.symbolCounter = 0, this.setZoomOptions(), a1(this, "afterInit"), this.firstRender();
            });
          }
          initSeries(t10) {
            let e10 = this.options.chart, i10 = t10.type || e10.type, s10 = aY[i10];
            s10 || aJ(17, true, this, { missingModuleFor: i10 });
            let o10 = new s10();
            return "function" == typeof o10.init && o10.init(this, t10), o10;
          }
          setSortedData() {
            this.getSeriesOrderByLinks().forEach(function(t10) {
              t10.points || t10.data || !t10.enabledDataSorting || t10.setData(t10.options.data, false);
            });
          }
          getSeriesOrderByLinks() {
            return this.series.concat().sort(function(t10, e10) {
              return t10.linkedSeries.length || e10.linkedSeries.length ? e10.linkedSeries.length - t10.linkedSeries.length : 0;
            });
          }
          orderItems(t10, e10 = 0) {
            let i10 = this[t10], s10 = this.options[t10] = no(this.options[t10]).slice(), o10 = this.userOptions[t10] = this.userOptions[t10] ? no(this.userOptions[t10]).slice() : [];
            if (this.hasRendered && (s10.splice(e10), o10.splice(e10)), i10) for (let t11 = e10, r10 = i10.length; t11 < r10; ++t11) {
              let e11 = i10[t11];
              e11 && (e11.index = t11, e11 instanceof ah && (e11.name = e11.getName()), e11.options.isInternal || (s10[t11] = e11.options, o10[t11] = e11.userOptions));
            }
          }
          getClipBox(t10, e10) {
            var _a2, _b2, _c2, _d2;
            let i10 = this.inverted, { xAxis: s10, yAxis: o10 } = t10 || {}, { x: r10, y: a10, width: n10, height: h10 } = a8(this.clipBox);
            return t10 && (s10 && s10.len !== this.plotSizeX && (n10 = s10.len), o10 && o10.len !== this.plotSizeY && (h10 = o10.len), i10 && !t10.invertible && ([n10, h10] = [h10, n10])), e10 && (r10 += (_b2 = (_a2 = i10 ? o10 : s10) == null ? void 0 : _a2.pos) != null ? _b2 : this.plotLeft, a10 += (_d2 = (_c2 = i10 ? s10 : o10) == null ? void 0 : _c2.pos) != null ? _d2 : this.plotTop), { x: r10, y: a10, width: n10, height: h10 };
          }
          isInsidePlot(t10, e10, i10 = {}) {
            var _a2;
            let { inverted: s10, plotBox: o10, plotLeft: r10, plotTop: a10, scrollablePlotBox: n10 } = this, { scrollLeft: h10 = 0, scrollTop: l2 = 0 } = i10.visiblePlotOnly && ((_a2 = this.scrollablePlotArea) == null ? void 0 : _a2.scrollingContainer) || {}, d2 = i10.series, c2 = i10.visiblePlotOnly && n10 || o10, p2 = i10.inverted ? e10 : t10, g2 = i10.inverted ? t10 : e10, u2 = { x: p2, y: g2, isInsidePlot: true, options: i10 };
            if (!i10.ignoreX) {
              let t11 = d2 && (s10 && !this.polar ? d2.yAxis : d2.xAxis) || { pos: r10, len: 1 / 0 }, e11 = i10.paneCoordinates ? t11.pos + p2 : r10 + p2;
              e11 >= Math.max(h10 + r10, t11.pos) && e11 <= Math.min(h10 + r10 + c2.width, t11.pos + t11.len) || (u2.isInsidePlot = false);
            }
            if (!i10.ignoreY && u2.isInsidePlot) {
              let t11 = !s10 && i10.axis && !i10.axis.isXAxis && i10.axis || d2 && (s10 ? d2.xAxis : d2.yAxis) || { pos: a10, len: 1 / 0 }, e11 = i10.paneCoordinates ? t11.pos + g2 : a10 + g2;
              e11 >= Math.max(l2 + a10, t11.pos) && e11 <= Math.min(l2 + a10 + c2.height, t11.pos + t11.len) || (u2.isInsidePlot = false);
            }
            return a1(this, "afterIsInsidePlot", u2), u2.isInsidePlot;
          }
          redraw(t10) {
            a1(this, "beforeRedraw");
            let e10 = this.hasCartesianSeries ? this.axes : this.colorAxis || [], i10 = this.series, s10 = this.pointer, o10 = this.legend, r10 = this.userOptions.legend, a10 = this.renderer, n10 = a10.isHidden(), h10 = [], l2, d2, c2, p2 = this.isDirtyBox, g2 = this.isDirtyLegend, u2;
            for (a10.rootFontSize = a10.boxWrapper.getStyle("font-size"), this.setResponsive && this.setResponsive(false), aB(!!this.hasRendered && t10, this), n10 && this.temporaryDisplay(), this.layOutTitles(false), c2 = i10.length; c2--; ) if (((u2 = i10[c2]).options.stacking || u2.options.centerInCategory) && (d2 = true, u2.isDirty)) {
              l2 = true;
              break;
            }
            if (l2) for (c2 = i10.length; c2--; ) (u2 = i10[c2]).options.stacking && (u2.isDirty = true);
            i10.forEach(function(t11) {
              t11.isDirty && ("point" === t11.options.legendType ? ("function" == typeof t11.updateTotals && t11.updateTotals(), g2 = true) : r10 && (r10.labelFormatter || r10.labelFormat) && (g2 = true)), t11.isDirtyData && a1(t11, "updatedData");
            }), g2 && o10 && o10.options.enabled && (o10.render(), this.isDirtyLegend = false), d2 && this.getStacks(), e10.forEach(function(t11) {
              t11.updateNames(), t11.setScale();
            }), this.getMargins(), e10.forEach(function(t11) {
              t11.isDirty && (p2 = true);
            }), e10.forEach(function(t11) {
              let e11 = t11.min + "," + t11.max;
              t11.extKey !== e11 && (t11.extKey = e11, h10.push(function() {
                a1(t11, "afterSetExtremes", aQ(t11.eventArgs, t11.getExtremes())), delete t11.eventArgs;
              })), (p2 || d2) && t11.redraw();
            }), p2 && this.drawChartBox(), a1(this, "predraw"), i10.forEach(function(t11) {
              (p2 || t11.isDirty) && t11.visible && t11.redraw(), t11.isDirtyData = false;
            }), s10 && s10.reset(true), a10.draw(), a1(this, "redraw"), a1(this, "render"), n10 && this.temporaryDisplay(true), h10.forEach(function(t11) {
              t11.call();
            });
          }
          get(t10) {
            let e10 = this.series;
            function i10(e11) {
              return e11.id === t10 || e11.options && e11.options.id === t10;
            }
            let s10 = a0(this.axes, i10) || a0(this.series, i10);
            for (let t11 = 0; !s10 && t11 < e10.length; t11++) s10 = a0(e10[t11].points || [], i10);
            return s10;
          }
          createAxes() {
            let t10 = this.userOptions;
            for (let e10 of (a1(this, "createAxes"), ["xAxis", "yAxis"])) for (let i10 of t10[e10] = no(t10[e10] || {})) new s5(this, i10, e10);
            a1(this, "afterCreateAxes");
          }
          getSelectedPoints() {
            return this.series.reduce((t10, e10) => (e10.getPointsCollection().forEach((e11) => {
              nt(e11.selectedStaging, e11.selected) && t10.push(e11);
            }), t10), []);
          }
          getSelectedSeries() {
            return this.series.filter((t10) => t10.selected);
          }
          setTitle(t10, e10, i10) {
            this.applyDescription("title", t10), this.applyDescription("subtitle", e10), this.applyDescription("caption", void 0), this.layOutTitles(i10);
          }
          applyDescription(t10, e10) {
            var _a2;
            let i10 = this, s10 = this.options[t10] = a8(this.options[t10], e10), o10 = this[t10];
            o10 && e10 && (this[t10] = o10 = o10.destroy()), s10 && !o10 && ((o10 = this.renderer.text(s10.text, 0, 0, s10.useHTML).attr({ align: s10.align, class: "highcharts-" + t10, zIndex: s10.zIndex || 4 }).css({ textOverflow: "ellipsis", whiteSpace: "nowrap" }).add()).update = function(e11, s11) {
              i10.applyDescription(t10, e11), i10.layOutTitles(s11);
            }, this.styledMode || o10.css(aQ("title" === t10 ? { fontSize: this.options.isStock ? "1em" : "1.2em" } : {}, s10.style)), o10.textPxLength = o10.getBBox().width, o10.css({ whiteSpace: (_a2 = s10.style) == null ? void 0 : _a2.whiteSpace }), this[t10] = o10);
          }
          layOutTitles(t10 = true) {
            var _a2, _b2, _c2, _d2;
            let e10 = [0, 0, 0], { options: i10, renderer: s10, spacingBox: o10 } = this;
            ["title", "subtitle", "caption"].forEach((t11) => {
              var _a3;
              let i11 = this[t11], r11 = this.options[t11], a10 = a8(o10), n10 = (i11 == null ? void 0 : i11.textPxLength) || 0;
              if (i11 && r11) {
                a1(this, "layOutTitle", { alignTo: a10, key: t11, textPxLength: n10 });
                let o11 = s10.fontMetrics(i11), h10 = o11.b, l2 = o11.h, d2 = r11.verticalAlign || "top", c2 = "top" === d2, p2 = c2 && r11.minScale || 1, g2 = "title" === t11 ? c2 ? -3 : 0 : c2 ? e10[0] + 2 : 0, u2 = Math.min(a10.width / n10, 1), f2 = Math.max(p2, u2), m2 = a8({ y: "bottom" === d2 ? h10 : g2 + h10 }, { align: "title" === t11 ? u2 < p2 ? "left" : "center" : (_a3 = this.title) == null ? void 0 : _a3.alignValue }, r11), x2 = (r11.width || (u2 > p2 ? this.chartWidth : a10.width) / f2) + "px";
                i11.alignValue !== m2.align && (i11.placed = false);
                let y2 = Math.round(i11.css({ width: x2 }).getBBox(r11.useHTML).height);
                if (m2.height = y2, i11.align(m2, false, a10).attr({ align: m2.align, scaleX: f2, scaleY: f2, "transform-origin": `${a10.x + n10 * f2 * a2(m2.align)} ${l2}` }), !r11.floating) {
                  let t12 = y2 * (y2 < 1.2 * l2 ? 1 : f2);
                  "top" === d2 ? e10[0] = Math.ceil(e10[0] + t12) : "bottom" === d2 && (e10[2] = Math.ceil(e10[2] + t12));
                }
              }
            }, this), e10[0] && "top" === (((_a2 = i10.title) == null ? void 0 : _a2.verticalAlign) || "top") && (e10[0] += ((_b2 = i10.title) == null ? void 0 : _b2.margin) || 0), e10[2] && ((_c2 = i10.caption) == null ? void 0 : _c2.verticalAlign) === "bottom" && (e10[2] += ((_d2 = i10.caption) == null ? void 0 : _d2.margin) || 0);
            let r10 = !this.titleOffset || this.titleOffset.join(",") !== e10.join(",");
            this.titleOffset = e10, a1(this, "afterLayOutTitles"), !this.isDirtyBox && r10 && (this.isDirtyBox = this.isDirtyLegend = r10, this.hasRendered && t10 && this.isDirtyBox && this.redraw());
          }
          getContainerBox() {
            let t10 = [].map.call(this.renderTo.children, (t11) => {
              if (t11 !== this.container) {
                let e11 = t11.style.display;
                return t11.style.display = "none", [t11, e11];
              }
            }), e10 = { width: a3(this.renderTo, "width", true) || 0, height: a3(this.renderTo, "height", true) || 0 };
            return t10.filter(Boolean).forEach(([t11, e11]) => {
              t11.style.display = e11;
            }), e10;
          }
          getChartSize() {
            var _a2;
            let t10 = this.options.chart, e10 = t10.width, i10 = t10.height, s10 = this.getContainerBox(), o10 = s10.height <= 1 || !((_a2 = this.renderTo.parentElement) == null ? void 0 : _a2.style.height) && "100%" === this.renderTo.style.height;
            this.chartWidth = Math.max(0, e10 || s10.width || 600), this.chartHeight = Math.max(0, ni(i10, this.chartWidth) || (o10 ? 400 : s10.height)), this.containerBox = s10;
          }
          temporaryDisplay(t10) {
            let e10 = this.renderTo, i10;
            if (t10) for (; e10 == null ? void 0 : e10.style; ) e10.hcOrigStyle && (aV(e10, e10.hcOrigStyle), delete e10.hcOrigStyle), e10.hcOrigDetached && (aH.body.removeChild(e10), e10.hcOrigDetached = false), e10 = e10.parentNode;
            else for (; (e10 == null ? void 0 : e10.style) && (aH.body.contains(e10) || e10.parentNode || (e10.hcOrigDetached = true, aH.body.appendChild(e10)), ("none" === a3(e10, "display", false) || e10.hcOricDetached) && (e10.hcOrigStyle = { display: e10.style.display, height: e10.style.height, overflow: e10.style.overflow }, i10 = { display: "block", overflow: "hidden" }, e10 !== this.renderTo && (i10.height = 0), aV(e10, i10), e10.offsetWidth || e10.style.setProperty("display", "block", "important")), (e10 = e10.parentNode) !== aH.body); ) ;
          }
          setClassName(t10) {
            this.container.className = "highcharts-container " + (t10 || "");
          }
          getContainer() {
            var _a2, _b2;
            let t10, e10 = this.options, i10 = e10.chart, s10 = "data-highcharts-chart", o10 = na(), r10 = this.renderTo, a10 = ne(aU(r10, s10));
            a6(a10) && aW[a10] && aW[a10].hasRendered && aW[a10].destroy(), aU(r10, s10, this.index), r10.innerHTML = eh.emptyHTML, i10.skipClone || r10.offsetWidth || this.temporaryDisplay(), this.getChartSize();
            let n10 = this.chartHeight, h10 = this.chartWidth;
            aV(r10, { overflow: "hidden" }), this.styledMode || (t10 = aQ({ position: "relative", overflow: "hidden", width: h10 + "px", height: n10 + "px", textAlign: "left", lineHeight: "normal", zIndex: 0, "-webkit-tap-highlight-color": "rgba(0,0,0,0)", userSelect: "none", "touch-action": "manipulation", outline: "none", padding: "0px" }, i10.style || {}));
            let l2 = a$("div", { id: o10 }, t10, r10);
            this.container = l2, this.getChartSize(), h10 !== this.chartWidth && (h10 = this.chartWidth, this.styledMode || aV(l2, { width: nt((_a2 = i10.style) == null ? void 0 : _a2.width, h10 + "px") })), this.containerBox = this.getContainerBox(), this._cursor = l2.style.cursor;
            let d2 = i10.renderer || !aF ? eT.getRendererType(i10.renderer) : i3;
            if (this.renderer = new d2(l2, h10, n10, void 0, i10.forExport, (_b2 = e10.exporting) == null ? void 0 : _b2.allowHTML, this.styledMode), aB(void 0, this), this.setClassName(i10.className), this.styledMode) for (let t11 in e10.defs) this.renderer.definition(e10.defs[t11]);
            else this.renderer.setStyle(i10.style);
            this.renderer.chartIndex = this.index, a1(this, "afterGetContainer");
          }
          getMargins(t10) {
            var _a2;
            let { spacing: e10, margin: i10, titleOffset: s10 } = this;
            this.resetMargins(), s10[0] && !aZ(i10[0]) && (this.plotTop = Math.max(this.plotTop, s10[0] + e10[0])), s10[2] && !aZ(i10[2]) && (this.marginBottom = Math.max(this.marginBottom, s10[2] + e10[2])), ((_a2 = this.legend) == null ? void 0 : _a2.display) && this.legend.adjustMargins(i10, e10), a1(this, "getMargins"), t10 || this.getAxisMargins();
          }
          getAxisMargins() {
            let t10 = this, e10 = t10.axisOffset = [0, 0, 0, 0], i10 = t10.colorAxis, s10 = t10.margin, o10 = (t11) => {
              t11.forEach((t12) => {
                t12.visible && t12.getOffset();
              });
            };
            t10.hasCartesianSeries ? o10(t10.axes) : (i10 == null ? void 0 : i10.length) && o10(i10), aX.forEach((i11, o11) => {
              aZ(s10[o11]) || (t10[i11] += e10[o11]);
            }), t10.setChartSize();
          }
          getOptions() {
            return a_(this.userOptions, aN);
          }
          reflow(t10) {
            var _a2, _b2;
            let e10 = this, i10 = e10.containerBox, s10 = e10.getContainerBox();
            (_a2 = e10.pointer) == null ? true : delete _a2.chartPosition, !((_b2 = e10.exporting) == null ? void 0 : _b2.isPrinting) && !e10.isResizing && i10 && s10.width && ((s10.width !== i10.width || s10.height !== i10.height) && (tn.clearTimeout(e10.reflowTimeout), e10.reflowTimeout = nr(function() {
              e10.container && e10.setSize(void 0, void 0, false);
            }, 100 * !!t10)), e10.containerBox = s10);
          }
          setReflow() {
            let t10 = this, e10 = (e11) => {
              var _a2;
              ((_a2 = t10.options) == null ? void 0 : _a2.chart.reflow) && t10.hasLoaded && t10.reflow(e11);
            };
            if ("function" == typeof ResizeObserver) new ResizeObserver(e10).observe(t10.renderTo);
            else {
              let t11 = aj(aG, "resize", e10);
              aj(this, "destroy", t11);
            }
          }
          setSize(t10, e10, i10) {
            let s10 = this, o10 = s10.renderer;
            s10.isResizing += 1, aB(i10, s10);
            let r10 = o10.globalAnimation;
            s10.oldChartHeight = s10.chartHeight, s10.oldChartWidth = s10.chartWidth, void 0 !== t10 && (s10.options.chart.width = t10), void 0 !== e10 && (s10.options.chart.height = e10), s10.getChartSize();
            let { chartWidth: a10, chartHeight: n10, scrollablePixelsX: h10 = 0, scrollablePixelsY: l2 = 0 } = s10;
            (s10.isDirtyBox || a10 !== s10.oldChartWidth || n10 !== s10.oldChartHeight) && (s10.styledMode || (r10 ? aI : aV)(s10.container, { width: `${a10 + h10}px`, height: `${n10 + l2}px` }, r10), s10.setChartSize(true), o10.setSize(a10, n10, r10), s10.axes.forEach(function(t11) {
              t11.isDirty = true, t11.setScale();
            }), s10.isDirtyLegend = true, s10.isDirtyBox = true, s10.layOutTitles(), s10.getMargins(), s10.redraw(r10), s10.oldChartHeight = void 0, a1(s10, "resize"), setTimeout(() => {
              s10 && a1(s10, "endResize");
            }, aD(r10).duration)), s10.isResizing -= 1;
          }
          setChartSize(t10) {
            var _a2, _b2;
            let e10, i10, s10, o10, { chartHeight: r10, chartWidth: a10, inverted: n10, spacing: h10, renderer: l2 } = this, d2 = this.clipOffset, c2 = Math[n10 ? "floor" : "round"];
            this.plotLeft = e10 = Math.round(this.plotLeft), this.plotTop = i10 = Math.round(this.plotTop), this.plotWidth = s10 = Math.max(0, Math.round(a10 - e10 - ((_a2 = this.marginRight) != null ? _a2 : 0))), this.plotHeight = o10 = Math.max(0, Math.round(r10 - i10 - ((_b2 = this.marginBottom) != null ? _b2 : 0))), this.plotSizeX = n10 ? o10 : s10, this.plotSizeY = n10 ? s10 : o10, this.spacingBox = l2.spacingBox = { x: h10[3], y: h10[0], width: a10 - h10[3] - h10[1], height: r10 - h10[0] - h10[2] }, this.plotBox = l2.plotBox = { x: e10, y: i10, width: s10, height: o10 }, d2 && (this.clipBox = { x: c2(d2[3]), y: c2(d2[0]), width: c2(this.plotSizeX - d2[1] - d2[3]), height: c2(this.plotSizeY - d2[0] - d2[2]) }), t10 || (this.axes.forEach(function(t11) {
              t11.setAxisSize(), t11.setAxisTranslation();
            }), l2.alignElements()), a1(this, "afterSetChartSize", { skipAxes: t10 });
          }
          resetMargins() {
            a1(this, "resetMargins");
            let t10 = this, e10 = t10.options.chart, i10 = e10.plotBorderWidth || 0, s10 = Math.round(i10) / 2;
            ["margin", "spacing"].forEach((i11) => {
              let s11 = e10[i11], o10 = a9(s11) ? s11 : [s11, s11, s11, s11];
              ["Top", "Right", "Bottom", "Left"].forEach((s12, r10) => {
                var _a2;
                t10[i11][r10] = (_a2 = e10[`${i11}${s12}`]) != null ? _a2 : o10[r10];
              });
            }), aX.forEach((e11, i11) => {
              var _a2;
              t10[e11] = (_a2 = t10.margin[i11]) != null ? _a2 : t10.spacing[i11];
            }), t10.axisOffset = [0, 0, 0, 0], t10.clipOffset = [s10, s10, s10, s10], t10.plotBorderWidth = i10;
          }
          drawChartBox() {
            let t10 = this.options.chart, e10 = this.renderer, i10 = this.chartWidth, s10 = this.chartHeight, o10 = this.styledMode, r10 = this.plotBGImage, a10 = t10.backgroundColor, n10 = t10.plotBackgroundColor, h10 = t10.plotBackgroundImage, l2 = this.plotLeft, d2 = this.plotTop, c2 = this.plotWidth, p2 = this.plotHeight, g2 = this.plotBox, u2 = this.clipRect, f2 = this.clipBox, m2 = this.chartBackground, x2 = this.plotBackground, y2 = this.plotBorder, b2, v2, k2, w2 = "animate";
            m2 || (this.chartBackground = m2 = e10.rect().addClass("highcharts-background").add(), w2 = "attr"), o10 ? b2 = v2 = m2.strokeWidth() : (v2 = (b2 = t10.borderWidth || 0) + 8 * !!t10.shadow, k2 = { fill: a10 || "none" }, (b2 || m2["stroke-width"]) && (k2.stroke = t10.borderColor, k2["stroke-width"] = b2), m2.attr(k2).shadow(t10.shadow)), m2[w2]({ x: v2 / 2, y: v2 / 2, width: i10 - v2 - b2 % 2, height: s10 - v2 - b2 % 2, r: t10.borderRadius }), w2 = "animate", x2 || (w2 = "attr", this.plotBackground = x2 = e10.rect().addClass("highcharts-plot-background").add()), x2[w2](g2), !o10 && (x2.attr({ fill: n10 || "none" }).shadow(t10.plotShadow), h10 && (r10 ? (h10 !== r10.attr("href") && r10.attr("href", h10), r10.animate(g2)) : this.plotBGImage = e10.image(h10, l2, d2, c2, p2).add())), u2 ? u2.animate({ width: f2.width, height: f2.height }) : this.clipRect = e10.clipRect(f2), w2 = "animate", y2 || (w2 = "attr", this.plotBorder = y2 = e10.rect().addClass("highcharts-plot-border").attr({ zIndex: 1 }).add()), o10 || y2.attr({ stroke: t10.plotBorderColor, "stroke-width": t10.plotBorderWidth || 0, fill: "none" }), y2[w2](y2.crisp(g2, -y2.strokeWidth())), this.isDirtyBox = false, a1(this, "afterDrawChartBox");
          }
          propFromSeries() {
            let t10, e10, i10, s10 = this, o10 = s10.options.chart, r10 = s10.options.series;
            ["inverted", "angular", "polar"].forEach(function(a10) {
              for (e10 = aY[o10.type], i10 = o10[a10] || e10 && e10.prototype[a10], t10 = r10 == null ? void 0 : r10.length; !i10 && t10--; ) (e10 = aY[r10[t10].type]) && e10.prototype[a10] && (i10 = true);
              s10[a10] = i10;
            });
          }
          linkSeries(t10) {
            let e10 = this, i10 = e10.series;
            i10.forEach(function(t11) {
              t11.linkedSeries.length = 0;
            }), i10.forEach(function(t11) {
              var _a2, _b2;
              let { linkedTo: s10 } = t11.options, o10 = a4(s10) && (":previous" === s10 ? i10[t11.index - 1] : e10.get(s10));
              o10 && o10.linkedParent !== t11 && (o10.linkedSeries.push(t11), t11.linkedParent = o10, o10.enabledDataSorting && t11.setDataSortingOptions(), t11.visible = (_b2 = (_a2 = t11.options.visible) != null ? _a2 : o10.options.visible) != null ? _b2 : t11.visible);
            }), a1(this, "afterLinkSeries", { isUpdating: t10 });
          }
          renderSeries() {
            this.series.forEach(function(t10) {
              t10.translate(), t10.render();
            });
          }
          render() {
            var _a2;
            let t10 = this.axes, e10 = this.colorAxis, i10 = this.renderer, s10 = this.options.chart.axisLayoutRuns || 2, o10 = (t11) => {
              t11.forEach((t12) => {
                t12.visible && t12.render();
              });
            }, r10 = 0, a10 = true, n10, h10 = 0;
            for (let e11 of (this.setTitle(), a1(this, "beforeMargins"), (_a2 = this.getStacks) == null ? void 0 : _a2.call(this), this.getMargins(true), this.setChartSize(), t10)) {
              let { options: t11 } = e11, { labels: i11 } = t11;
              if (this.hasCartesianSeries && e11.horiz && e11.visible && i11.enabled && e11.series.length && "colorAxis" !== e11.coll && !this.polar) {
                r10 = t11.tickLength, e11.createGroups();
                let s11 = new sA(e11, 0, "", true), o11 = s11.createLabel("x", i11);
                if (s11.destroy(), o11 && nt(i11.reserveSpace, !a6(t11.crossing)) && (r10 = o11.getBBox().height + i11.distance + Math.max(t11.offset || 0, 0)), r10) {
                  o11 == null ? void 0 : o11.destroy();
                  break;
                }
              }
            }
            for (this.plotHeight = Math.max(this.plotHeight - r10, 0); (a10 || n10 || s10 > 1) && h10 < s10; ) {
              let e11 = this.plotWidth, i11 = this.plotHeight;
              for (let e12 of t10) 0 === h10 ? e12.setScale() : (e12.horiz && a10 || !e12.horiz && n10) && e12.setTickInterval(true);
              0 === h10 ? this.getAxisMargins() : this.getMargins(), a10 = e11 / this.plotWidth > (h10 ? 1 : 1.1), n10 = i11 / this.plotHeight > (h10 ? 1 : 1.05), h10++;
            }
            this.drawChartBox(), this.hasCartesianSeries ? o10(t10) : (e10 == null ? void 0 : e10.length) && o10(e10), this.seriesGroup || (this.seriesGroup = i10.g("series-group").attr({ zIndex: 3 }).shadow(this.options.chart.seriesGroupShadow).add()), this.renderSeries(), this.addCredits(), this.setResponsive && this.setResponsive(), this.hasRendered = true;
          }
          addCredits(t10) {
            let e10 = this, i10 = a8(true, this.options.credits, t10);
            i10.enabled && !this.credits && (this.credits = this.renderer.text(i10.text + (this.mapCredits || ""), 0, 0).addClass("highcharts-credits").on("click", function() {
              i10.href && (aG.location.href = i10.href);
            }).attr({ align: i10.position.align, zIndex: 8 }), e10.styledMode || this.credits.css(i10.style), this.credits.add().align(i10.position), this.credits.update = function(t11) {
              e10.credits = e10.credits.destroy(), e10.addCredits(t11);
            });
          }
          destroy() {
            var _a2, _b2;
            let t10, e10 = this, i10 = e10.axes, s10 = e10.series, o10 = e10.container, r10 = o10 == null ? void 0 : o10.parentNode;
            for (a1(e10, "destroy"), e10.renderer.forExport ? aK(aW, e10) : aW[e10.index] = void 0, z.chartCount--, e10.renderTo.removeAttribute("data-highcharts-chart"), ns(e10), t10 = i10.length; t10--; ) i10[t10] = i10[t10].destroy();
            for ((_b2 = (_a2 = this.scroller) == null ? void 0 : _a2.destroy) == null ? void 0 : _b2.call(_a2), t10 = s10.length; t10--; ) s10[t10] = s10[t10].destroy();
            ["title", "subtitle", "chartBackground", "plotBackground", "plotBGImage", "plotBorder", "seriesGroup", "clipRect", "credits", "pointer", "rangeSelector", "legend", "resetZoomButton", "tooltip", "renderer"].forEach((t11) => {
              var _a3, _b3;
              e10[t11] = (_b3 = (_a3 = e10[t11]) == null ? void 0 : _a3.destroy) == null ? void 0 : _b3.call(_a3);
            }), o10 && (o10.innerHTML = eh.emptyHTML, ns(o10), r10 && aq(o10)), a7(e10, function(t11, i11) {
              delete e10[i11];
            });
          }
          firstRender() {
            var _a2;
            let t10 = this, e10 = t10.options;
            t10.getContainer(), t10.resetMargins(), t10.setChartSize(), t10.propFromSeries(), t10.createAxes();
            let i10 = a5(e10.series) ? e10.series : [];
            e10.series = [], i10.forEach(function(e11) {
              t10.initSeries(e11);
            }), t10.linkSeries(), t10.setSortedData(), a1(t10, "beforeRender"), t10.render(), (_a2 = t10.pointer) == null ? void 0 : _a2.getChartPosition(), t10.renderer.imgCount || t10.hasLoaded || t10.onload(), t10.temporaryDisplay(true);
          }
          onload() {
            this.callbacks.concat([this.callback]).forEach(function(t10) {
              t10 && void 0 !== this.index && t10.apply(this, [this]);
            }, this), a1(this, "load"), a1(this, "render"), aZ(this.index) && this.setReflow(), this.warnIfA11yModuleNotLoaded(), this.warnIfCSSNotLoaded(), this.hasLoaded = true;
          }
          warnIfA11yModuleNotLoaded() {
            let { options: t10, title: e10 } = this;
            t10 && !this.accessibility && (this.renderer.boxWrapper.attr({ role: "img", "aria-label": ((e10 == null ? void 0 : e10.element.textContent) || "").replace(/</g, "&lt;") }), t10.accessibility && false === t10.accessibility.enabled || aJ('Highcharts warning: Consider including the "accessibility.js" module to make your chart more usable for people with disabilities. Set the "accessibility.enabled" option to false to remove this warning. See https://www.highcharts.com/docs/accessibility/accessibility-module.', false, this));
          }
          warnIfCSSNotLoaded() {
            this.styledMode && "0" !== aG.getComputedStyle(this.container).zIndex && aJ(35, false, this);
          }
          addSeries(t10, e10, i10) {
            let s10, o10 = this;
            return t10 && (e10 = nt(e10, true), a1(o10, "addSeries", { options: t10 }, function() {
              s10 = o10.initSeries(t10), o10.isDirtyLegend = true, o10.linkSeries(), s10.enabledDataSorting && s10.setData(t10.data, false), a1(o10, "afterAddSeries", { series: s10 }), e10 && o10.redraw(i10);
            })), s10;
          }
          addAxis(t10, e10, i10, s10) {
            return this.createAxis(e10 ? "xAxis" : "yAxis", { axis: t10, redraw: i10, animation: s10 });
          }
          addColorAxis(t10, e10, i10) {
            return this.createAxis("colorAxis", { axis: t10, redraw: e10, animation: i10 });
          }
          createAxis(t10, e10) {
            let i10 = new s5(this, e10.axis, t10);
            return nt(e10.redraw, true) && this.redraw(e10.animation), i10;
          }
          showLoading(t10) {
            let e10 = this, i10 = e10.options, s10 = i10.loading, o10 = function() {
              r10 && aV(r10, { left: e10.plotLeft + "px", top: e10.plotTop + "px", width: e10.plotWidth + "px", height: e10.plotHeight + "px" });
            }, r10 = e10.loadingDiv, a10 = e10.loadingSpan;
            r10 || (e10.loadingDiv = r10 = a$("div", { className: "highcharts-loading highcharts-loading-hidden" }, null, e10.container)), a10 || (e10.loadingSpan = a10 = a$("span", { className: "highcharts-loading-inner" }, null, r10), aj(e10, "redraw", o10)), r10.className = "highcharts-loading", eh.setElementHTML(a10, nt(t10, i10.lang.loading, "")), !e10.styledMode && (aV(r10, aQ(s10.style, { zIndex: 10 })), aV(a10, s10.labelStyle), e10.loadingShown || (aV(r10, { opacity: 0, display: "" }), aI(r10, { opacity: s10.style.opacity || 0.5 }, { duration: s10.showDuration || 0 }))), e10.loadingShown = true, o10();
          }
          hideLoading() {
            let t10 = this.options, e10 = this.loadingDiv;
            e10 && (e10.className = "highcharts-loading highcharts-loading-hidden", this.styledMode || aI(e10, { opacity: 0 }, { duration: t10.loading.hideDuration || 100, complete: function() {
              aV(e10, { display: "none" });
            } })), this.loadingShown = false;
          }
          update(t10, e10, i10, s10) {
            let o10, r10, a10, n10 = this, h10 = { credits: "addCredits", title: "setTitle", subtitle: "setSubtitle", caption: "setCaption" }, l2 = t10.isResponsiveOptions, d2 = [];
            a1(n10, "update", { options: t10 }), l2 || n10.setResponsive(false, true), t10 = a_(t10, n10.options), n10.userOptions = a8(n10.userOptions, t10);
            let c2 = t10.chart;
            c2 && (a8(true, n10.options.chart, c2), this.setZoomOptions(), "className" in c2 && n10.setClassName(c2.className), ("inverted" in c2 || "polar" in c2 || "type" in c2) && (n10.propFromSeries(), o10 = true), "alignTicks" in c2 && (o10 = true), "events" in c2 && aR(this, c2), a7(c2, function(t11, e11) {
              -1 !== n10.propsRequireUpdateSeries.indexOf("chart." + e11) && (r10 = true), -1 !== n10.propsRequireDirtyBox.indexOf(e11) && (n10.isDirtyBox = true), -1 !== n10.propsRequireReflow.indexOf(e11) && (n10.isDirtyBox = true, l2 || (a10 = true));
            }), !n10.styledMode && c2.style && n10.renderer.setStyle(n10.options.chart.style || {})), !n10.styledMode && t10.colors && (this.options.colors = t10.colors), a7(t10, function(e11, i11) {
              n10[i11] && "function" == typeof n10[i11].update ? n10[i11].update(e11, false) : "function" == typeof n10[h10[i11]] ? n10[h10[i11]](e11) : "colors" !== i11 && -1 === n10.collectionsWithUpdate.indexOf(i11) && a8(true, n10.options[i11], t10[i11]), "chart" !== i11 && -1 !== n10.propsRequireUpdateSeries.indexOf(i11) && (r10 = true);
            }), this.collectionsWithUpdate.forEach(function(e11) {
              t10[e11] && (no(t10[e11]).forEach(function(t11, s11) {
                let o11, r11 = aZ(t11.id);
                r11 && (o11 = n10.get(t11.id)), !o11 && n10[e11] && (o11 = n10[e11][nt(t11.index, s11)]) && (r11 && aZ(o11.options.id) || o11.options.isInternal) && (o11 = void 0), o11 && o11.coll === e11 && (o11.update(t11, false), i10 && (o11.touched = true)), !o11 && i10 && n10.collectionsWithInit[e11] && (n10.collectionsWithInit[e11][0].apply(n10, [t11].concat(n10.collectionsWithInit[e11][1] || []).concat([false])).touched = true);
              }), i10 && n10[e11].forEach(function(t11) {
                t11.touched || t11.options.isInternal ? delete t11.touched : d2.push(t11);
              }));
            }), d2.forEach(function(t11) {
              t11.chart && t11.remove && t11.remove(false);
            }), o10 && n10.axes.forEach(function(t11) {
              t11.update({}, false);
            }), r10 && n10.getSeriesOrderByLinks().forEach(function(t11) {
              t11.chart && t11.update({}, false);
            }, this);
            let p2 = c2 == null ? void 0 : c2.width, g2 = c2 && (a4(c2.height) ? ni(c2.height, p2 || n10.chartWidth) : c2.height);
            a10 || a6(p2) && p2 !== n10.chartWidth || a6(g2) && g2 !== n10.chartHeight ? n10.setSize(p2, g2, s10) : nt(e10, true) && n10.redraw(s10), a1(n10, "afterUpdate", { options: t10, redraw: e10, animation: s10 });
          }
          setSubtitle(t10, e10) {
            this.applyDescription("subtitle", t10), this.layOutTitles(e10);
          }
          setCaption(t10, e10) {
            this.applyDescription("caption", t10), this.layOutTitles(e10);
          }
          showResetZoom() {
            let t10 = this, e10 = aN.lang, i10 = t10.zooming.resetButton, s10 = i10.theme, o10 = "chart" === i10.relativeTo || "spacingBox" === i10.relativeTo ? null : "plotBox";
            function r10() {
              t10.zoomOut();
            }
            a1(this, "beforeShowResetZoom", null, function() {
              t10.resetZoomButton = t10.renderer.button(e10.resetZoom, null, null, r10, s10).attr({ align: i10.position.align, title: e10.resetZoomTitle }).addClass("highcharts-reset-zoom").add().align(i10.position, false, o10);
            }), a1(this, "afterShowResetZoom");
          }
          zoomOut() {
            a1(this, "selection", { resetSelection: true }, () => this.transform({ reset: true, trigger: "zoom" }));
          }
          pan(t10, e10) {
            let i10 = this, s10 = "object" == typeof e10 ? e10 : { enabled: e10, type: "x" }, o10 = s10.type, r10 = o10 && i10[{ x: "xAxis", xy: "axes", y: "yAxis" }[o10]].filter((t11) => t11.options.panningEnabled && !t11.options.isInternal), a10 = i10.options.chart;
            (a10 == null ? void 0 : a10.panning) && (a10.panning = s10), a1(this, "pan", { originalEvent: t10 }, () => {
              i10.transform({ axes: r10, event: t10, to: { x: t10.chartX - (i10.mouseDownX || 0), y: t10.chartY - (i10.mouseDownY || 0) }, trigger: "pan" }), aV(i10.container, { cursor: "move" });
            });
          }
          transform(t10) {
            var _a2, _b2, _c2;
            let { axes: e10 = this.axes, event: i10, from: s10 = {}, reset: o10, selection: r10, to: a10 = {}, trigger: n10, allowResetButton: h10 = true } = t10, { inverted: l2, time: d2 } = this;
            (_a2 = this.hoverPoints) == null ? void 0 : _a2.forEach((t11) => t11.setState()), a1(this, "transform", t10);
            let c2 = t10.hasZoomed || false, p2, g2;
            for (let t11 of e10) {
              let { horiz: e11, len: u2, minPointOffset: f2 = 0, options: m2, reversed: x2 } = t11, y2 = e11 ? "width" : "height", b2 = e11 ? "x" : "y", v2 = nt(a10[y2], t11.len), k2 = nt(s10[y2], t11.len), w2 = 10 > Math.abs(v2) ? 1 : v2 / k2, M2 = (s10[b2] || 0) + k2 / 2 - t11.pos, S2 = M2 - (((_b2 = a10[b2]) != null ? _b2 : t11.pos) + v2 / 2 - t11.pos) / w2, T2 = x2 && !l2 || !x2 && l2 ? -1 : 1;
              if (!o10 && (M2 < 0 || M2 > t11.len)) continue;
              let C2 = t11.chart.polar || t11.isOrdinal ? 0 : f2 * T2 || 0, A2 = t11.toValue(S2, true), P2 = t11.toValue(S2 + u2 / w2, true), L2 = A2 + C2, O2 = P2 - C2, E2 = t11.allExtremes;
              if (r10 && r10[t11.coll].push({ axis: t11, min: Math.min(A2, P2), max: Math.max(A2, P2) }), L2 > O2 && ([L2, O2] = [O2, L2]), 1 === w2 && !o10 && "yAxis" === t11.coll && !E2) {
                for (let e12 of t11.series) {
                  let t12 = e12.getExtremes(e12.getProcessedData(true).modified.getColumn(e12.pointValKey || "y") || [], true);
                  E2 != null ? E2 : E2 = { dataMin: Number.MAX_VALUE, dataMax: -Number.MAX_VALUE }, a6(t12.dataMin) && a6(t12.dataMax) && (E2.dataMin = Math.min(t12.dataMin, E2.dataMin), E2.dataMax = Math.max(t12.dataMax, E2.dataMax));
                }
                t11.allExtremes = E2;
              }
              let { dataMin: I2, dataMax: D2, min: B2, max: N2 } = aQ(t11.getExtremes(), E2 || {}), z2 = d2.parse(m2.min), R2 = d2.parse(m2.max), W2 = I2 != null ? I2 : z2, H2 = D2 != null ? D2 : R2, X2 = O2 - L2, F2 = t11.categories ? 0 : Math.min(X2, H2 - W2), G2 = W2 - F2 * (aZ(z2) ? 0 : m2.minPadding), Y2 = H2 + F2 * (aZ(R2) ? 0 : m2.maxPadding), j2 = t11.allowZoomOutside || 1 === w2 || "zoom" !== n10 && w2 > 1, U2 = Math.min(z2 != null ? z2 : G2, G2, j2 ? B2 : G2), $2 = Math.max(R2 != null ? R2 : Y2, Y2, j2 ? N2 : Y2);
              (!t11.isOrdinal || 1 !== w2 || o10) && (L2 < U2 && (L2 = U2, w2 >= 1 && (O2 = L2 + X2)), O2 > $2 && (O2 = $2, w2 >= 1 && (L2 = O2 - X2)), (o10 || t11.series.length && (L2 !== B2 || O2 !== N2) && L2 >= U2 && O2 <= $2) && (r10 ? r10[t11.coll].push({ axis: t11, min: L2, max: O2 }) : (t11.isPanning = "zoom" !== n10, t11.isPanning && "mousewheel" !== n10 && (g2 = true), t11.setExtremes(o10 ? void 0 : L2, o10 ? void 0 : O2, false, false, { move: S2, trigger: n10, scale: w2 }), !o10 && (L2 > U2 || O2 < $2) && (p2 = h10)), c2 = true), this.hasCartesianSeries || o10 || (p2 = h10), i10 && (this[e11 ? "mouseDownX" : "mouseDownY"] = i10[e11 ? "chartX" : "chartY"]));
            }
            return c2 && (r10 ? a1(this, "selection", r10, () => {
              delete t10.selection, t10.trigger = "zoom", this.transform(t10);
            }) : (!p2 || g2 || this.resetZoomButton ? !p2 && this.resetZoomButton && (this.resetZoomButton = this.resetZoomButton.destroy()) : this.showResetZoom(), this.redraw("zoom" === n10 && ((_c2 = this.options.chart.animation) != null ? _c2 : this.pointCount < 100)))), c2;
          }
        }
        aQ(nn.prototype, { callbacks: [], collectionsWithInit: { xAxis: [nn.prototype.addAxis, [true]], yAxis: [nn.prototype.addAxis, [false]], series: [nn.prototype.addSeries] }, collectionsWithUpdate: ["xAxis", "yAxis", "series"], propsRequireDirtyBox: ["backgroundColor", "borderColor", "borderWidth", "borderRadius", "plotBackgroundColor", "plotBackgroundImage", "plotBorderColor", "plotBorderWidth", "plotShadow", "shadow"], propsRequireReflow: ["margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "spacing", "spacingTop", "spacingRight", "spacingBottom", "spacingLeft"], propsRequireUpdateSeries: ["chart.inverted", "chart.polar", "chart.ignoreHiddenSeries", "chart.type", "colors", "plotOptions", "time", "tooltip"] });
        let { stop: nh } = t5, { composed: nl } = z, { addEvent: nd, createElement: nc, css: np, defined: ng, erase: nu, merge: nf, pushUnique: nm } = tn;
        function nx() {
          let t10 = this.scrollablePlotArea;
          (this.scrollablePixelsX || this.scrollablePixelsY) && !t10 && (this.scrollablePlotArea = t10 = new nb(this)), t10 == null ? void 0 : t10.applyFixed();
        }
        function ny() {
          this.chart.scrollablePlotArea && (this.chart.scrollablePlotArea.isDirty = true);
        }
        class nb {
          static compose(t10, e10, i10) {
            nm(nl, this.compose) && (nd(t10, "afterInit", ny), nd(e10, "afterSetChartSize", (t11) => this.afterSetSize(t11.target, t11)), nd(e10, "render", nx), nd(i10, "show", ny));
          }
          static afterSetSize(t10, e10) {
            let i10, s10, o10, { minWidth: r10, minHeight: a10 } = t10.options.chart.scrollablePlotArea || {}, { clipBox: n10, plotBox: h10, inverted: l2, renderer: d2 } = t10;
            if (!d2.forExport) if (r10 ? (t10.scrollablePixelsX = i10 = Math.max(0, r10 - t10.chartWidth), i10 && (t10.scrollablePlotBox = nf(t10.plotBox), h10.width = t10.plotWidth += i10, n10[l2 ? "height" : "width"] += i10, o10 = true)) : a10 && (t10.scrollablePixelsY = s10 = Math.max(0, a10 - t10.chartHeight), ng(s10) && (t10.scrollablePlotBox = nf(t10.plotBox), h10.height = t10.plotHeight += s10, n10[l2 ? "width" : "height"] += s10, o10 = false)), ng(o10)) {
              if (!e10.skipAxes) for (let e11 of t10.axes) (e11.horiz === o10 || t10.hasParallelCoordinates && "yAxis" === e11.coll) && (e11.setAxisSize(), e11.setAxisTranslation());
            } else delete t10.scrollablePlotBox;
          }
          constructor(t10) {
            var _a2, _b2;
            let e10;
            const i10 = t10.options.chart, s10 = eT.getRendererType(), o10 = i10.scrollablePlotArea || {}, r10 = this.moveFixedElements.bind(this), a10 = { WebkitOverflowScrolling: "touch", overflowX: "hidden", overflowY: "hidden" };
            t10.scrollablePixelsX && (a10.overflowX = "auto"), t10.scrollablePixelsY && (a10.overflowY = "auto"), this.chart = t10;
            const n10 = this.parentDiv = nc("div", { className: "highcharts-scrolling-parent" }, { position: "relative" }, t10.renderTo), h10 = this.scrollingContainer = nc("div", { className: "highcharts-scrolling" }, a10, n10), l2 = this.innerContainer = nc("div", { className: "highcharts-inner-container" }, void 0, h10), d2 = this.fixedDiv = nc("div", { className: "highcharts-fixed" }, { position: "absolute", overflow: "hidden", pointerEvents: "none", zIndex: (((_a2 = i10.style) == null ? void 0 : _a2.zIndex) || 0) + 2, top: 0 }, void 0, true), c2 = this.fixedRenderer = new s10(d2, t10.chartWidth, t10.chartHeight, i10.style);
            this.mask = c2.path().attr({ fill: i10.backgroundColor || "#fff", "fill-opacity": (_b2 = o10.opacity) != null ? _b2 : 0.85, zIndex: -1 }).addClass("highcharts-scrollable-mask").add(), h10.parentNode.insertBefore(d2, h10), np(t10.renderTo, { overflow: "visible" }), nd(t10, "afterShowResetZoom", r10), nd(t10, "afterApplyDrilldown", r10), nd(t10, "afterLayOutTitles", r10), nd(h10, "scroll", () => {
              let { pointer: i11, hoverPoint: s11 } = t10;
              i11 && (delete i11.chartPosition, s11 && (e10 = s11), i11.runPointActions(void 0, e10, true));
            }), l2.appendChild(t10.container);
          }
          applyFixed() {
            var _a2;
            let { chart: t10, fixedRenderer: e10, isDirty: i10, scrollingContainer: s10 } = this, { axisOffset: o10, chartWidth: r10, chartHeight: a10, container: n10, plotHeight: h10, plotLeft: l2, plotTop: d2, plotWidth: c2, scrollablePixelsX: p2 = 0, scrollablePixelsY: g2 = 0 } = t10, { scrollPositionX: u2 = 0, scrollPositionY: f2 = 0 } = t10.options.chart.scrollablePlotArea || {}, m2 = r10 + p2, x2 = a10 + g2;
            e10.setSize(r10, a10), (i10 != null ? i10 : true) && (this.isDirty = false, this.moveFixedElements()), nh(t10.container), np(n10, { width: `${m2}px`, height: `${x2}px` }), t10.renderer.boxWrapper.attr({ width: m2, height: x2, viewBox: ["0 0", m2, x2].join(" ") }), (_a2 = t10.chartBackground) == null ? void 0 : _a2.attr({ width: m2, height: x2 }), np(s10, { width: `${r10}px`, height: `${a10}px` }), ng(i10) || (s10.scrollLeft = p2 * u2, s10.scrollTop = g2 * f2);
            let y2 = d2 - o10[0] - 1, b2 = l2 - o10[3] - 1, v2 = d2 + h10 + o10[2] + 1, k2 = l2 + c2 + o10[1] + 1, w2 = l2 + c2 - p2, M2 = d2 + h10 - g2, S2 = [["M", 0, 0]];
            p2 ? S2 = [["M", 0, y2], ["L", l2 - 1, y2], ["L", l2 - 1, v2], ["L", 0, v2], ["Z"], ["M", w2, y2], ["L", r10, y2], ["L", r10, v2], ["L", w2, v2], ["Z"]] : g2 && (S2 = [["M", b2, 0], ["L", b2, d2 - 1], ["L", k2, d2 - 1], ["L", k2, 0], ["Z"], ["M", b2, M2], ["L", b2, a10], ["L", k2, a10], ["L", k2, M2], ["Z"]]), "adjustHeight" !== t10.redrawTrigger && this.mask.attr({ d: S2 });
          }
          moveFixedElements() {
            let t10, { container: e10, inverted: i10, scrollablePixelsX: s10, scrollablePixelsY: o10 } = this.chart, r10 = this.fixedRenderer, a10 = nb.fixedSelectors;
            if (s10 && !i10 ? t10 = ".highcharts-yaxis" : s10 && i10 || o10 && !i10 ? t10 = ".highcharts-xaxis" : o10 && i10 && (t10 = ".highcharts-yaxis"), t10 && !(this.chart.hasParallelCoordinates && ".highcharts-yaxis" === t10)) for (let e11 of [`${t10}:not(.highcharts-radial-axis)`, `${t10}-labels:not(.highcharts-radial-axis-labels)`]) nm(a10, e11);
            else for (let t11 of [".highcharts-xaxis", ".highcharts-yaxis"]) for (let e11 of [`${t11}:not(.highcharts-radial-axis)`, `${t11}-labels:not(.highcharts-radial-axis-labels)`]) nu(a10, e11);
            for (let t11 of a10) [].forEach.call(e10.querySelectorAll(t11), (t12) => {
              (t12.namespaceURI === r10.SVG_NS ? r10.box : r10.box.parentNode).appendChild(t12), t12.style.pointerEvents = "auto";
            });
          }
        }
        nb.fixedSelectors = [".highcharts-breadcrumbs-group", ".highcharts-contextbutton", ".highcharts-caption", ".highcharts-credits", ".highcharts-drillup-button", ".highcharts-legend", ".highcharts-legend-checkbox", ".highcharts-navigator-series", ".highcharts-navigator-xaxis", ".highcharts-navigator-yaxis", ".highcharts-navigator", ".highcharts-range-selector-group", ".highcharts-reset-zoom", ".highcharts-scrollbar", ".highcharts-subtitle", ".highcharts-title"];
        let { format: nv } = eS, { series: nk } = rW, { destroyObjectProperties: nw, fireEvent: nM, getAlignFactor: nS, isNumber: nT, pick: nC } = tn, nA = class {
          constructor(t10, e10, i10, s10, o10) {
            const r10 = t10.chart.inverted, a10 = t10.reversed;
            this.axis = t10;
            const n10 = this.isNegative = !!i10 != !!a10;
            this.options = e10 = e10 || {}, this.x = s10, this.total = null, this.cumulative = null, this.points = {}, this.hasValidPoints = false, this.stack = o10, this.leftCliff = 0, this.rightCliff = 0, this.alignOptions = { align: e10.align || (r10 ? n10 ? "left" : "right" : "center"), verticalAlign: e10.verticalAlign || (r10 ? "middle" : n10 ? "bottom" : "top"), y: e10.y, x: e10.x }, this.textAlign = e10.textAlign || (r10 ? n10 ? "right" : "left" : "center");
          }
          destroy() {
            nw(this, this.axis);
          }
          render(t10) {
            let e10 = this.axis.chart, i10 = this.options, s10 = i10.format, o10 = s10 ? nv(s10, this, e10) : i10.formatter.call(this);
            if (this.label) this.label.attr({ text: o10, visibility: "hidden" });
            else {
              this.label = e10.renderer.label(o10, null, void 0, i10.shape, void 0, void 0, i10.useHTML, false, "stack-labels");
              let s11 = { r: i10.borderRadius || 0, text: o10, padding: nC(i10.padding, 5), visibility: "hidden" };
              e10.styledMode || (s11.fill = i10.backgroundColor, s11.stroke = i10.borderColor, s11["stroke-width"] = i10.borderWidth, this.label.css(i10.style || {})), this.label.attr(s11), this.label.added || this.label.add(t10);
            }
            this.label.labelrank = e10.plotSizeY, nM(this, "afterRender");
          }
          setOffset(t10, e10, i10, s10, o10, r10) {
            let { alignOptions: a10, axis: n10, label: h10, options: l2, textAlign: d2 } = this, c2 = n10.chart, p2 = this.getStackBox({ xOffset: t10, width: e10, boxBottom: i10, boxTop: s10, defaultX: o10, xAxis: r10 }), { verticalAlign: g2 } = a10;
            if (h10 && p2) {
              let t11 = h10.getBBox(void 0, 0), e11 = h10.padding, i11 = "justify" === nC(l2.overflow, "justify"), s11;
              a10.x = l2.x || 0, a10.y = l2.y || 0;
              let { x: o11, y: r11 } = this.adjustStackPosition({ labelBox: t11, verticalAlign: g2, textAlign: d2 });
              p2.x -= o11, p2.y -= r11, h10.align(a10, false, p2), (s11 = c2.isInsidePlot(h10.alignAttr.x + a10.x + o11, h10.alignAttr.y + a10.y + r11)) || (i11 = false), i11 && nk.prototype.justifyDataLabel.call(n10, h10, a10, h10.alignAttr, t11, p2), h10.attr({ x: h10.alignAttr.x, y: h10.alignAttr.y, rotation: l2.rotation, rotationOriginX: t11.width * nS(l2.textAlign || "center"), rotationOriginY: t11.height / 2 }), nC(!i11 && l2.crop, true) && (s11 = nT(h10.x) && nT(h10.y) && c2.isInsidePlot(h10.x - e11 + (h10.width || 0), h10.y) && c2.isInsidePlot(h10.x + e11, h10.y)), h10[s11 ? "show" : "hide"]();
            }
            nM(this, "afterSetOffset", { xOffset: t10, width: e10 });
          }
          adjustStackPosition({ labelBox: t10, verticalAlign: e10, textAlign: i10 }) {
            return { x: t10.width / 2 + t10.width / 2 * (2 * nS(i10) - 1), y: t10.height / 2 * 2 * (1 - nS(e10)) };
          }
          getStackBox(t10) {
            let e10 = this.axis, i10 = e10.chart, { boxTop: s10, defaultX: o10, xOffset: r10, width: a10, boxBottom: n10 } = t10, h10 = e10.stacking.usePercentage ? 100 : nC(s10, this.total, 0), l2 = e10.toPixels(h10), d2 = t10.xAxis || i10.xAxis[0], c2 = nC(o10, d2.translate(this.x)) + r10, p2 = Math.abs(l2 - e10.toPixels(n10 || nT(e10.min) && e10.logarithmic && e10.logarithmic.lin2log(e10.min) || 0)), g2 = i10.inverted, u2 = this.isNegative;
            return g2 ? { x: (u2 ? l2 : l2 - p2) - i10.plotLeft, y: d2.height - c2 - a10 + d2.top - i10.plotTop, width: p2, height: a10 } : { x: c2 + d2.transB - i10.plotLeft, y: (u2 ? l2 - p2 : l2) - i10.plotTop, width: a10, height: p2 };
          }
        }, { getDeferredAnimation: nP } = t5, { series: { prototype: nL } } = rW, { addEvent: nO, correctFloat: nE, defined: nI, destroyObjectProperties: nD, fireEvent: nB, isNumber: nN, objectEach: nz, pick: nR } = tn;
        function nW() {
          let t10 = this.inverted;
          this.axes.forEach((t11) => {
            var _a2;
            ((_a2 = t11.stacking) == null ? void 0 : _a2.stacks) && t11.hasVisibleSeries && (t11.stacking.oldStacks = t11.stacking.stacks);
          }), this.series.forEach((e10) => {
            var _a2;
            let i10 = ((_a2 = e10.xAxis) == null ? void 0 : _a2.options) || {};
            e10.options.stacking && e10.reserveSpace() && (e10.stackKey = [e10.type, nR(e10.options.stack, ""), t10 ? i10.top : i10.left, t10 ? i10.height : i10.width].join(","));
          });
        }
        function nH() {
          var _a2;
          let t10 = this.stacking;
          if (t10) {
            let e10 = t10.stacks;
            nz(e10, (t11, i10) => {
              nD(t11), delete e10[i10];
            }), (_a2 = t10.stackTotalGroup) == null ? void 0 : _a2.destroy();
          }
        }
        function nX() {
          this.stacking || (this.stacking = new n$(this));
        }
        function nF(t10, e10, i10, s10) {
          return !nI(t10) || t10.x !== e10 || s10 && t10.stackKey !== s10 ? t10 = { x: e10, index: 0, key: s10, stackKey: s10 } : t10.index++, t10.key = [i10, e10, t10.index].join(","), t10;
        }
        function nG() {
          let t10, e10 = this, i10 = e10.yAxis, s10 = e10.stackKey || "", o10 = i10.stacking.stacks, r10 = e10.getColumn("x", true), a10 = e10.options.stacking, n10 = e10[a10 + "Stacker"];
          n10 && [s10, "-" + s10].forEach((i11) => {
            var _a2;
            let s11 = r10.length, a11, h10, l2;
            for (; s11--; ) a11 = r10[s11], t10 = e10.getStackIndicator(t10, a11, e10.index, i11), h10 = (_a2 = o10[i11]) == null ? void 0 : _a2[a11], (l2 = h10 == null ? void 0 : h10.points[t10.key || ""]) && n10.call(e10, l2, h10, s11);
          });
        }
        function nY(t10, e10, i10) {
          let s10 = e10.total ? 100 / e10.total : 0;
          t10[0] = nE(t10[0] * s10), t10[1] = nE(t10[1] * s10), this.stackedYData[i10] = t10[1];
        }
        function nj(t10) {
          (this.is("column") || this.is("columnrange")) && (this.options.centerInCategory && this.chart.series.length > 1 ? nL.setStackedPoints.call(this, t10, "group") : t10.stacking.resetStacks());
        }
        function nU(t10, e10) {
          var _a2, _b2;
          let i10, s10, o10, r10, a10, n10, h10, l2 = e10 || this.options.stacking;
          if (!l2 || !this.reserveSpace() || ({ group: "xAxis" }[l2] || "yAxis") !== t10.coll) return;
          let d2 = this.getColumn("x", true), c2 = this.getColumn(this.pointValKey || "y", true), p2 = [], g2 = c2.length, u2 = this.options, f2 = u2.threshold || 0, m2 = u2.startFromThreshold ? f2 : 0, x2 = u2.stack, y2 = e10 ? `${this.type},${l2}` : this.stackKey || "", b2 = "-" + y2, v2 = this.negStacks, k2 = t10.stacking, w2 = k2.stacks, M2 = k2.oldStacks;
          for (k2.stacksTouched += 1, h10 = 0; h10 < g2; h10++) {
            let e11 = d2[h10] || 0, g3 = c2[h10], u3 = nN(g3) && g3 || 0;
            n10 = (i10 = this.getStackIndicator(i10, e11, this.index)).key || "", w2[a10 = (s10 = v2 && u3 < (m2 ? 0 : f2)) ? b2 : y2] || (w2[a10] = {}), w2[a10][e11] || (((_a2 = M2[a10]) == null ? void 0 : _a2[e11]) ? (w2[a10][e11] = M2[a10][e11], w2[a10][e11].total = null) : w2[a10][e11] = new nA(t10, t10.options.stackLabels, !!s10, e11, x2)), o10 = w2[a10][e11], null !== g3 ? (o10.points[n10] = o10.points[this.index] = [nR(o10.cumulative, m2)], nI(o10.cumulative) || (o10.base = n10), o10.touched = k2.stacksTouched, i10.index > 0 && false === this.singleStacks && (o10.points[n10][0] = o10.points[this.index + "," + e11 + ",0"][0])) : (delete o10.points[n10], delete o10.points[this.index]);
            let S2 = o10.total || 0;
            "percent" === l2 ? (r10 = s10 ? y2 : b2, S2 = v2 && ((_b2 = w2[r10]) == null ? void 0 : _b2[e11]) ? (r10 = w2[r10][e11]).total = Math.max(r10.total || 0, S2) + Math.abs(u3) : nE(S2 + Math.abs(u3))) : "group" === l2 ? nN(g3) && S2++ : S2 = nE(S2 + u3), "group" === l2 ? o10.cumulative = (S2 || 1) - 1 : o10.cumulative = nE(nR(o10.cumulative, m2) + u3), o10.total = S2, null !== g3 && (o10.points[n10].push(o10.cumulative), p2[h10] = o10.cumulative, o10.hasValidPoints = true);
          }
          "percent" === l2 && (k2.usePercentage = true), "group" !== l2 && (this.stackedYData = p2), k2.oldStacks = {};
        }
        class n$ {
          constructor(t10) {
            this.oldStacks = {}, this.stacks = {}, this.stacksTouched = 0, this.axis = t10;
          }
          buildStacks() {
            let t10, e10, i10 = this.axis, s10 = i10.series, o10 = "xAxis" === i10.coll, r10 = i10.options.reversedStacks, a10 = s10.length;
            for (this.resetStacks(), this.usePercentage = false, e10 = a10; e10--; ) t10 = s10[r10 ? e10 : a10 - e10 - 1], o10 && t10.setGroupedPoints(i10), t10.setStackedPoints(i10);
            if (!o10) for (e10 = 0; e10 < a10; e10++) s10[e10].modifyStacks();
            nB(i10, "afterBuildStacks");
          }
          cleanStacks() {
            this.oldStacks && (this.stacks = this.oldStacks, nz(this.stacks, (t10) => {
              nz(t10, (t11) => {
                t11.cumulative = t11.total;
              });
            }));
          }
          resetStacks() {
            nz(this.stacks, (t10) => {
              nz(t10, (e10, i10) => {
                nN(e10.touched) && e10.touched < this.stacksTouched ? (e10.destroy(), delete t10[i10]) : (e10.total = null, e10.cumulative = null);
              });
            });
          }
          renderStackTotals() {
            var _a2;
            let t10 = this.axis, e10 = t10.chart, i10 = e10.renderer, s10 = this.stacks, o10 = nP(e10, ((_a2 = t10.options.stackLabels) == null ? void 0 : _a2.animation) || false), r10 = this.stackTotalGroup = this.stackTotalGroup || i10.g("stack-labels").attr({ zIndex: 6, opacity: 0 }).add();
            r10.translate(e10.plotLeft, e10.plotTop), nz(s10, (t11) => {
              nz(t11, (t12) => {
                t12.render(r10);
              });
            }), r10.animate({ opacity: 1 }, o10);
          }
        }
        (A || (A = {})).compose = function(t10, e10, i10) {
          let s10 = e10.prototype, o10 = i10.prototype;
          s10.getStacks || (nO(t10, "init", nX), nO(t10, "destroy", nH), s10.getStacks = nW, o10.getStackIndicator = nF, o10.modifyStacks = nG, o10.percentStacker = nY, o10.setGroupedPoints = nj, o10.setStackedPoints = nU);
        };
        let nV = A, { defined: nZ, merge: n_, isObject: nq } = tn;
        class nK extends ah {
          drawGraph() {
            let t10 = this.options, e10 = (this.gappedPath || this.getGraphPath).call(this), i10 = this.chart.styledMode;
            [this, ...this.zones].forEach((s10, o10) => {
              let r10, a10 = s10.graph, n10 = a10 ? "animate" : "attr", h10 = s10.dashStyle || t10.dashStyle;
              a10 ? (a10.endX = this.preventGraphAnimation ? null : e10.xMap, a10.animate({ d: e10 })) : e10.length && (s10.graph = a10 = this.chart.renderer.path(e10).addClass("highcharts-graph" + (o10 ? ` highcharts-zone-graph-${o10 - 1} ` : " ") + (o10 && s10.className || "")).attr({ zIndex: 1 }).add(this.group)), a10 && !i10 && (r10 = { stroke: !o10 && t10.lineColor || s10.color || this.color || "#cccccc", "stroke-width": t10.lineWidth || 0, fill: this.fillGraph && this.color || "none" }, h10 ? r10.dashstyle = h10 : "square" !== t10.linecap && (r10["stroke-linecap"] = r10["stroke-linejoin"] = "round"), a10[n10](r10).shadow(t10.shadow && n_({ filterUnits: "userSpaceOnUse" }, nq(t10.shadow) ? t10.shadow : {}))), a10 && (a10.startX = e10.xMap, a10.isArea = e10.isArea);
            });
          }
          getGraphPath(t10, e10, i10) {
            let s10 = this, o10 = s10.options, r10 = [], a10 = [], n10, h10 = o10.step, l2 = (t10 = t10 || s10.points).reversed;
            return l2 && t10.reverse(), (h10 = { right: 1, center: 2 }[h10] || h10 && 3) && l2 && (h10 = 4 - h10), (t10 = this.getValidPoints(t10, false, o10.nullInteraction || !(o10.connectNulls && !e10 && !i10))).forEach(function(l3, d2) {
              let c2, p2 = l3.plotX, g2 = l3.plotY, u2 = t10[d2 - 1], f2 = l3.isNull || "number" != typeof g2;
              (l3.leftCliff || (u2 == null ? void 0 : u2.rightCliff)) && !i10 && (n10 = true), f2 && !nZ(e10) && d2 > 0 ? n10 = !o10.connectNulls : f2 && !e10 ? n10 = true : (0 === d2 || n10 ? c2 = [["M", l3.plotX, l3.plotY]] : s10.getPointSpline ? c2 = [s10.getPointSpline(t10, l3, d2)] : h10 ? (c2 = 1 === h10 ? [["L", u2.plotX, g2]] : 2 === h10 ? [["L", (u2.plotX + p2) / 2, u2.plotY], ["L", (u2.plotX + p2) / 2, g2]] : [["L", p2, u2.plotY]]).push(["L", p2, g2]) : c2 = [["L", p2, g2]], a10.push(l3.x), h10 && (a10.push(l3.x), 2 === h10 && a10.push(l3.x)), r10.push.apply(r10, c2), n10 = false);
            }), r10.xMap = a10, s10.graphPath = r10, r10;
          }
        }
        nK.defaultOptions = n_(ah.defaultOptions, { legendSymbol: "lineMarker" }), rW.registerSeriesType("line", nK);
        let { seriesTypes: { line: nJ } } = rW, { extend: nQ, merge: n0, objectEach: n1, pick: n2 } = tn;
        class n3 extends nJ {
          drawGraph() {
            this.areaPath = [], super.drawGraph.apply(this);
            let { areaPath: t10, options: e10 } = this;
            [this, ...this.zones].forEach((i10, s10) => {
              var _a2;
              let o10 = {}, r10 = i10.fillColor || e10.fillColor, a10 = i10.area, n10 = a10 ? "animate" : "attr";
              a10 ? (a10.endX = this.preventGraphAnimation ? null : t10.xMap, a10.animate({ d: t10 })) : (o10.zIndex = 0, (a10 = i10.area = this.chart.renderer.path(t10).addClass("highcharts-area" + (s10 ? ` highcharts-zone-area-${s10 - 1} ` : " ") + (s10 && i10.className || "")).add(this.group)).isArea = true), this.chart.styledMode || (o10.fill = r10 || i10.color || this.color, o10["fill-opacity"] = r10 ? 1 : (_a2 = e10.fillOpacity) != null ? _a2 : 0.75, a10.css({ pointerEvents: this.stickyTracking ? "none" : "auto" })), a10[n10](o10), a10.startX = t10.xMap, a10.shiftUnit = e10.step ? 2 : 1;
            });
          }
          getGraphPath(t10) {
            let e10, i10, s10, o10 = nJ.prototype.getGraphPath, r10 = this.options, a10 = r10.stacking, n10 = this.yAxis, h10 = [], l2 = [], d2 = this.index, c2 = n10.stacking.stacks[this.stackKey], p2 = r10.threshold, g2 = Math.round(n10.getThreshold(r10.threshold)), u2 = n2(r10.connectNulls, "percent" === a10), f2 = function(i11, s11, o11) {
              let r11 = t10[i11], u3 = a10 && c2[r11.x].points[d2], f3 = r11[o11 + "Null"] || 0, m3 = r11[o11 + "Cliff"] || 0, x3, y3, b3 = true;
              m3 || f3 ? (x3 = (f3 ? u3[0] : u3[1]) + m3, y3 = u3[0] + m3, b3 = !!f3) : !a10 && t10[s11] && t10[s11].isNull && (x3 = y3 = p2), void 0 !== x3 && (l2.push({ plotX: e10, plotY: null === x3 ? g2 : n10.getThreshold(x3), isNull: b3, isCliff: true }), h10.push({ plotX: e10, plotY: null === y3 ? g2 : n10.getThreshold(y3), doCurve: false }));
            };
            t10 = t10 || this.points, a10 && (t10 = this.getStackPoints(t10));
            for (let o11 = 0, r11 = t10.length; o11 < r11; ++o11) a10 || (t10[o11].leftCliff = t10[o11].rightCliff = t10[o11].leftNull = t10[o11].rightNull = void 0), i10 = t10[o11].isNull, e10 = n2(t10[o11].rectPlotX, t10[o11].plotX), s10 = a10 ? n2(t10[o11].yBottom, g2) : g2, (!i10 || u2) && (u2 || f2(o11, o11 - 1, "left"), i10 && !a10 && u2 || (l2.push(t10[o11]), h10.push({ x: o11, plotX: e10, plotY: s10 })), u2 || f2(o11, o11 + 1, "right"));
            let m2 = o10.call(this, l2, true, true);
            h10.reversed = true;
            let x2 = o10.call(this, h10, true, true), y2 = x2[0];
            y2 && "M" === y2[0] && (x2[0] = ["L", y2[1], y2[2]]);
            let b2 = m2.concat(x2);
            b2.length && b2.push(["Z"]);
            let v2 = o10.call(this, l2, false, u2);
            return this.chart.series.length > 1 && a10 && l2.some((t11) => t11.isCliff) && (b2.hasStackedCliffs = v2.hasStackedCliffs = true), b2.xMap = m2.xMap, this.areaPath = b2, v2;
          }
          getStackPoints(t10) {
            let e10 = this, i10 = [], s10 = [], o10 = this.xAxis, r10 = this.yAxis, a10 = r10.stacking.stacks[this.stackKey], n10 = {}, h10 = r10.series, l2 = h10.length, d2 = r10.options.reversedStacks ? 1 : -1, c2 = h10.indexOf(e10);
            if (t10 = t10 || this.points, this.options.stacking) {
              for (let e11 = 0; e11 < t10.length; e11++) t10[e11].leftNull = t10[e11].rightNull = void 0, n10[t10[e11].x] = t10[e11];
              n1(a10, function(t11, e11) {
                null !== t11.total && s10.push(e11);
              }), s10.sort(function(t11, e11) {
                return t11 - e11;
              });
              let p2 = h10.map((t11) => t11.visible);
              s10.forEach(function(t11, g2) {
                let u2 = 0, f2, m2;
                if (n10[t11] && !n10[t11].isNull) i10.push(n10[t11]), [-1, 1].forEach(function(i11) {
                  let o11 = 1 === i11 ? "rightNull" : "leftNull", r11 = a10[s10[g2 + i11]], u3 = 0;
                  if (r11) {
                    let i12 = c2;
                    for (; i12 >= 0 && i12 < l2; ) {
                      let s11 = h10[i12].index;
                      !(f2 = r11.points[s11]) && (s11 === e10.index ? n10[t11][o11] = true : p2[i12] && (m2 = a10[t11].points[s11]) && (u3 -= m2[1] - m2[0])), i12 += d2;
                    }
                  }
                  n10[t11][1 === i11 ? "rightCliff" : "leftCliff"] = u3;
                });
                else {
                  let e11 = c2;
                  for (; e11 >= 0 && e11 < l2; ) {
                    let i11 = h10[e11].index;
                    if (f2 = a10[t11].points[i11]) {
                      u2 = f2[1];
                      break;
                    }
                    e11 += d2;
                  }
                  u2 = n2(u2, 0), u2 = r10.translate(u2, 0, 1, 0, 1), i10.push({ isNull: true, plotX: o10.translate(t11, 0, 0, 0, 1), x: t11, plotY: u2, yBottom: u2 });
                }
              });
            }
            return i10;
          }
        }
        n3.defaultOptions = n0(nJ.defaultOptions, { threshold: 0, legendSymbol: "areaMarker" }), nQ(n3.prototype, { singleStacks: false }), rW.registerSeriesType("area", n3);
        let { line: n5 } = rW.seriesTypes, { merge: n6, pick: n9 } = tn;
        class n4 extends n5 {
          getPointSpline(t10, e10, i10) {
            let s10, o10, r10, a10, n10 = e10.plotX || 0, h10 = e10.plotY || 0, l2 = t10[i10 - 1], d2 = t10[i10 + 1];
            function c2(t11) {
              return t11 && !t11.isNull && false !== t11.doCurve && !e10.isCliff;
            }
            if (c2(l2) && c2(d2)) {
              let t11 = l2.plotX || 0, i11 = l2.plotY || 0, c3 = d2.plotX || 0, p3 = d2.plotY || 0, g2 = 0;
              s10 = (1.5 * n10 + t11) / 2.5, o10 = (1.5 * h10 + i11) / 2.5, r10 = (1.5 * n10 + c3) / 2.5, a10 = (1.5 * h10 + p3) / 2.5, r10 !== s10 && (g2 = (a10 - o10) * (r10 - n10) / (r10 - s10) + h10 - a10), o10 += g2, a10 += g2, o10 > i11 && o10 > h10 ? (o10 = Math.max(i11, h10), a10 = 2 * h10 - o10) : o10 < i11 && o10 < h10 && (o10 = Math.min(i11, h10), a10 = 2 * h10 - o10), a10 > p3 && a10 > h10 ? (a10 = Math.max(p3, h10), o10 = 2 * h10 - a10) : a10 < p3 && a10 < h10 && (a10 = Math.min(p3, h10), o10 = 2 * h10 - a10), e10.rightContX = r10, e10.rightContY = a10, e10.controlPoints = { low: [s10, o10], high: [r10, a10] };
            }
            let p2 = ["C", n9(l2.rightContX, l2.plotX, 0), n9(l2.rightContY, l2.plotY, 0), n9(s10, n10, 0), n9(o10, h10, 0), n10, h10];
            return l2.rightContX = l2.rightContY = void 0, p2;
          }
        }
        n4.defaultOptions = n6(n5.defaultOptions), rW.registerSeriesType("spline", n4);
        let n8 = n4, { area: n7, area: { prototype: ht } } = rW.seriesTypes, { extend: he, merge: hi } = tn;
        class hs extends n8 {
        }
        hs.defaultOptions = hi(n8.defaultOptions, n7.defaultOptions), he(hs.prototype, { getGraphPath: ht.getGraphPath, getStackPoints: ht.getStackPoints, drawGraph: ht.drawGraph }), rW.registerSeriesType("areaspline", hs);
        let { animObject: ho } = t5, { parse: hr } = tG, { noop: ha } = z, { clamp: hn, crisp: hh, defined: hl, extend: hd, fireEvent: hc, isArray: hp, isNumber: hg, merge: hu, pick: hf, objectEach: hm } = tn;
        class hx extends ah {
          animate(t10) {
            let e10, i10, s10 = this, o10 = this.yAxis, r10 = o10.pos, a10 = o10.reversed, n10 = s10.options, { clipOffset: h10, inverted: l2 } = this.chart, d2 = {}, c2 = l2 ? "translateX" : "translateY";
            t10 && h10 ? (d2.scaleY = 1e-3, i10 = hn(o10.toPixels(n10.threshold || 0), r10, r10 + o10.len), l2 ? d2.translateX = (i10 += a10 ? -Math.floor(h10[0]) : Math.ceil(h10[2])) - o10.len : d2.translateY = i10 += a10 ? Math.ceil(h10[0]) : -Math.floor(h10[2]), s10.clipBox && s10.setClip(), s10.group.attr(d2)) : (e10 = Number(s10.group.attr(c2)), s10.group.animate({ scaleY: 1 }, hd(ho(s10.options.animation), { step: function(t11, i11) {
              s10.group && (d2[c2] = e10 + i11.pos * (r10 - e10), s10.group.attr(d2));
            } })));
          }
          init(t10, e10) {
            super.init.apply(this, arguments);
            let i10 = this;
            (t10 = i10.chart).hasRendered && t10.series.forEach(function(t11) {
              t11.type === i10.type && (t11.isDirty = true);
            });
          }
          getColumnMetrics() {
            var _a2, _b2;
            let t10 = this, e10 = t10.options, i10 = t10.xAxis, s10 = t10.yAxis, o10 = i10.options.reversedStacks, r10 = i10.reversed && !o10 || !i10.reversed && o10, a10 = {}, n10, h10 = 0;
            false === e10.grouping ? h10 = 1 : t10.chart.series.forEach(function(e11) {
              let i11, o11 = e11.yAxis, r11 = e11.options;
              e11.type === t10.type && e11.reserveSpace() && s10.len === o11.len && s10.pos === o11.pos && (r11.stacking && "group" !== r11.stacking ? (void 0 === a10[n10 = e11.stackKey] && (a10[n10] = h10++), i11 = a10[n10]) : false !== r11.grouping && (i11 = h10++), e11.columnIndex = i11);
            });
            let l2 = Math.min(Math.abs(i10.transA) * (!((_a2 = i10.brokenAxis) == null ? void 0 : _a2.hasBreaks) && ((_b2 = i10.ordinal) == null ? void 0 : _b2.slope) || e10.pointRange || i10.closestPointRange || i10.tickInterval || 1), i10.len), d2 = l2 * e10.groupPadding, c2 = (l2 - 2 * d2) / (h10 || 1), p2 = Math.min(e10.maxPointWidth || i10.len, hf(e10.pointWidth, c2 * (1 - 2 * e10.pointPadding))), g2 = (t10.columnIndex || 0) + +!!r10;
            return t10.columnMetrics = { width: p2, offset: (c2 - p2) / 2 + (d2 + g2 * c2 - l2 / 2) * (r10 ? -1 : 1), paddedWidth: c2, columnCount: h10 }, t10.columnMetrics;
          }
          crispCol(t10, e10, i10, s10) {
            let o10 = this.borderWidth, r10 = this.chart.inverted;
            return s10 = hh(e10 + s10, o10, r10) - (e10 = hh(e10, o10, r10)), this.options.crisp && (i10 = hh(t10 + i10, o10) - (t10 = hh(t10, o10))), { x: t10, y: e10, width: i10, height: s10 };
          }
          adjustForMissingColumns(t10, e10, i10, s10) {
            var _a2;
            if (!i10.isNull && s10.columnCount > 1) {
              let o10 = this.xAxis.series.filter((t11) => t11.visible).map((t11) => t11.index), r10 = 0, a10 = 0;
              hm((_a2 = this.xAxis.stacking) == null ? void 0 : _a2.stacks, (t11) => {
                var _a3;
                let e11 = "number" == typeof i10.x ? (_a3 = t11[i10.x.toString()]) == null ? void 0 : _a3.points : void 0, s11 = e11 == null ? void 0 : e11[this.index], n11 = {};
                if (e11 && hp(s11)) {
                  let t12 = this.index, i11 = Object.keys(e11).filter((t13) => !t13.match(",") && e11[t13] && e11[t13].length > 1).map(parseFloat).filter((t13) => -1 !== o10.indexOf(t13)).filter((e12) => {
                    let i12 = this.chart.series[e12].options, s12 = i12.stacking && i12.stack;
                    if (hl(s12)) {
                      if (hg(n11[s12])) return t12 === e12 && (t12 = n11[s12]), false;
                      n11[s12] = e12;
                    }
                    return true;
                  }).sort((t13, e12) => e12 - t13);
                  r10 = i11.indexOf(t12), a10 = i11.length;
                }
              }), r10 = this.xAxis.reversed ? a10 - 1 - r10 : r10;
              let n10 = (a10 - 1) * s10.paddedWidth + e10;
              t10 = (i10.plotX || 0) + n10 / 2 - e10 - r10 * s10.paddedWidth;
            }
            return t10;
          }
          translate() {
            let t10 = this, e10 = t10.chart, i10 = t10.options, s10 = t10.dense = t10.closestPointRange * t10.xAxis.transA < 2, o10 = t10.borderWidth = hf(i10.borderWidth, +!s10), r10 = t10.xAxis, a10 = t10.yAxis, n10 = i10.threshold, h10 = hf(i10.minPointLength, 5), l2 = t10.getColumnMetrics(), d2 = l2.width, c2 = t10.pointXOffset = l2.offset, p2 = t10.dataMin, g2 = t10.dataMax, u2 = t10.translatedThreshold = a10.getThreshold(n10), f2 = t10.barW = Math.max(d2, 1 + 2 * o10);
            i10.pointPadding && i10.crisp && (f2 = Math.ceil(f2)), ah.prototype.translate.apply(t10), t10.points.forEach(function(s11) {
              let o11 = hf(s11.yBottom, u2), m2 = 999 + Math.abs(o11), x2 = s11.plotX || 0, y2 = hn(s11.plotY, -m2, a10.len + m2), b2, v2 = Math.min(y2, o11), k2 = Math.max(y2, o11) - v2, w2 = d2, M2 = x2 + c2, S2 = f2;
              h10 && Math.abs(k2) < h10 && (k2 = h10, b2 = !a10.reversed && !s11.negative || a10.reversed && s11.negative, hg(n10) && hg(g2) && s11.y === n10 && g2 <= n10 && (a10.min || 0) < n10 && (p2 !== g2 || (a10.max || 0) <= n10) && (b2 = !b2, s11.negative = !s11.negative), v2 = Math.abs(v2 - u2) > h10 ? o11 - h10 : u2 - (b2 ? h10 : 0)), hl(s11.options.pointWidth) && (M2 -= Math.round(((w2 = S2 = Math.ceil(s11.options.pointWidth)) - d2) / 2)), i10.centerInCategory && (M2 = t10.adjustForMissingColumns(M2, w2, s11, l2)), s11.barX = M2, s11.pointWidth = w2, s11.tooltipPos = e10.inverted ? [hn(a10.len + a10.pos - e10.plotLeft - y2, a10.pos - e10.plotLeft, a10.len + a10.pos - e10.plotLeft), r10.len + r10.pos - e10.plotTop - M2 - S2 / 2, k2] : [r10.left - e10.plotLeft + M2 + S2 / 2, hn(y2 + a10.pos - e10.plotTop, a10.pos - e10.plotTop, a10.len + a10.pos - e10.plotTop), k2], s11.shapeType = t10.pointClass.prototype.shapeType || "roundedRect", s11.shapeArgs = t10.crispCol(M2, v2, S2, s11.isNull ? 0 : k2);
            }), hc(this, "afterColumnTranslate");
          }
          drawGraph() {
            this.group[this.dense ? "addClass" : "removeClass"]("highcharts-dense-data");
          }
          pointAttribs(t10, e10) {
            var _a2, _b2, _c2;
            let i10 = this.options, s10 = this.pointAttrToOptions || {}, o10 = s10.stroke || "borderColor", r10 = s10["stroke-width"] || "borderWidth", a10, n10, h10, l2 = t10 && t10.color || this.color, d2 = t10 && t10[o10] || i10[o10] || l2, c2 = t10 && t10.options.dashStyle || i10.dashStyle, p2 = t10 && t10[r10] || i10[r10] || this[r10] || 0, g2 = (t10 == null ? void 0 : t10.isNull) && i10.nullInteraction ? 0 : (_b2 = (_a2 = t10 == null ? void 0 : t10.opacity) != null ? _a2 : i10.opacity) != null ? _b2 : 1;
            t10 && this.zones.length && (n10 = t10.getZone(), l2 = t10.options.color || n10 && (n10.color || t10.nonZonedColor) || this.color, n10 && (d2 = n10.borderColor || d2, c2 = n10.dashStyle || c2, p2 = n10.borderWidth || p2)), e10 && t10 && (h10 = (a10 = hu(i10.states[e10], ((_c2 = t10.options.states) == null ? void 0 : _c2[e10]) || {})).brightness, l2 = a10.color || void 0 !== h10 && hr(l2).brighten(a10.brightness).get() || l2, d2 = a10[o10] || d2, p2 = a10[r10] || p2, c2 = a10.dashStyle || c2, g2 = hf(a10.opacity, g2));
            let u2 = { fill: l2, stroke: d2, "stroke-width": p2, opacity: g2 };
            return c2 && (u2.dashstyle = c2), u2;
          }
          drawPoints(t10 = this.points) {
            let e10, i10 = this, s10 = this.chart, o10 = i10.options, r10 = o10.nullInteraction, a10 = s10.renderer, n10 = o10.animationLimit || 250;
            t10.forEach(function(t11) {
              let h10 = t11.plotY, l2 = t11.graphic, d2 = !!l2, c2 = l2 && s10.pointCount < n10 ? "animate" : "attr";
              hg(h10) && (null !== t11.y || r10) ? (e10 = t11.shapeArgs, l2 && t11.hasNewShapeType() && (l2 = l2.destroy()), i10.enabledDataSorting && (t11.startXPos = i10.xAxis.reversed ? -(e10 && e10.width || 0) : i10.xAxis.width), !l2 && (t11.graphic = l2 = a10[t11.shapeType](e10).add(t11.group || i10.group), l2 && i10.enabledDataSorting && s10.hasRendered && s10.pointCount < n10 && (l2.attr({ x: t11.startXPos }), d2 = true, c2 = "animate")), l2 && d2 && l2[c2](hu(e10)), s10.styledMode || l2[c2](i10.pointAttribs(t11, t11.selected && "select")).shadow(false !== t11.allowShadow && o10.shadow), l2 && (l2.addClass(t11.getClassName(), true), l2.attr({ visibility: t11.visible ? "inherit" : "hidden" }))) : l2 && (t11.graphic = l2.destroy());
            });
          }
          drawTracker(t10 = this.points) {
            var _a2;
            let e10, i10 = this, s10 = i10.chart, o10 = s10.pointer, r10 = function(t11) {
              o10 == null ? void 0 : o10.normalize(t11);
              let e11 = o10 == null ? void 0 : o10.getPointFromEvent(t11);
              o10 && e11 && i10.options.enableMouseTracking && (s10.isInsidePlot(t11.chartX - s10.plotLeft, t11.chartY - s10.plotTop, { visiblePlotOnly: true }) || (o10 == null ? void 0 : o10.inClass(t11.target, "highcharts-data-label"))) && (o10.isDirectTouch = true, e11.onMouseOver(t11));
            };
            t10.forEach(function(t11) {
              e10 = hp(t11.dataLabels) ? t11.dataLabels : t11.dataLabel ? [t11.dataLabel] : [], t11.graphic && (t11.graphic.element.point = t11), e10.forEach(function(e11) {
                (e11.div || e11.element).point = t11;
              });
            }), i10._hasTracking || ((_a2 = i10.trackerGroups) == null ? void 0 : _a2.reduce((t11, e11) => ("dataLabelsGroup" === e11 ? t11.push(...i10.dataLabelsGroups || []) : t11.push(i10[e11]), t11), []).forEach((t11) => {
              t11 && (t11.addClass("highcharts-tracker").on("mouseover", r10).on("mouseout", function(t12) {
                o10 == null ? void 0 : o10.onTrackerMouseOut(t12);
              }).on("touchstart", r10), !s10.styledMode && i10.options.cursor && t11.css({ cursor: i10.options.cursor }));
            }), i10._hasTracking = true), hc(this, "afterDrawTracker");
          }
          remove() {
            let t10 = this, e10 = t10.chart;
            e10.hasRendered && e10.series.forEach(function(e11) {
              e11.type === t10.type && (e11.isDirty = true);
            }), ah.prototype.remove.apply(t10, arguments);
          }
        }
        hx.defaultOptions = hu(ah.defaultOptions, { borderRadius: 3, centerInCategory: false, groupPadding: 0.2, marker: null, pointPadding: 0.1, minPointLength: 0, cropThreshold: 50, pointRange: null, states: { hover: { halo: false, brightness: 0.1 }, select: { color: "#cccccc", borderColor: "#000000" } }, dataLabels: { align: void 0, verticalAlign: void 0, y: void 0 }, startFromThreshold: true, stickyTracking: false, tooltip: { distance: 6 }, threshold: 0, borderColor: "#ffffff" }), hd(hx.prototype, { directTouch: true, getSymbol: ha, negStacks: true, trackerGroups: ["group", "dataLabelsGroup"] }), rW.registerSeriesType("column", hx);
        let hy = hx, { getDeferredAnimation: hb } = t5, { format: hv } = eS, { defined: hk, extend: hw, fireEvent: hM, getAlignFactor: hS, isArray: hT, isString: hC, merge: hA, objectEach: hP, pick: hL, pInt: hO, splat: hE } = tn;
        !(function(t10) {
          function e10() {
            return h10(this).some((t11) => t11 == null ? void 0 : t11.enabled);
          }
          function i10(t11, e11, i11, s11, o11) {
            var _a2;
            let { chart: r11, enabledDataSorting: a11 } = this, n11 = this.isCartesian && r11.inverted, h11 = t11.plotX, l3 = t11.plotY, d2 = i11.rotation || 0, c2 = hk(h11) && hk(l3) && r11.isInsidePlot(h11, Math.round(l3), { inverted: n11, paneCoordinates: true, series: this }), p2 = 0 === d2 && "justify" === hL(i11.overflow, a11 ? "none" : "justify"), g2 = this.visible && false !== t11.visible && hk(h11) && (t11.series.forceDL || a11 && !p2 || c2 || hL(i11.inside, !!this.options.stacking) && s11 && r11.isInsidePlot(h11, n11 ? s11.x + 1 : s11.y + s11.height - 1, { inverted: n11, paneCoordinates: true, series: this })), u2 = t11.pos();
            if (g2 && u2) {
              var f2;
              let h12 = e11.getBBox(), l4 = e11.getBBox(void 0, 0);
              if (s11 = hw({ x: u2[0], y: Math.round(u2[1]), width: 0, height: 0 }, s11 || {}), "plotEdges" === i11.alignTo && this.isCartesian && (s11[n11 ? "x" : "y"] = 0, s11[n11 ? "width" : "height"] = ((_a2 = this.yAxis) == null ? void 0 : _a2.len) || 0), hw(i11, { width: h12.width, height: h12.height }), f2 = s11, a11 && this.xAxis && !p2 && this.setDataLabelStartPos(t11, e11, o11, c2, f2), e11.align(hA(i11, { width: l4.width, height: l4.height }), false, s11, false), e11.alignAttr.x += hS(i11.align) * (l4.width - h12.width), e11.alignAttr.y += hS(i11.verticalAlign) * (l4.height - h12.height), e11[e11.placed ? "animate" : "attr"]({ "text-align": e11.alignAttr["text-align"] || "center", x: e11.alignAttr.x + (h12.width - l4.width) / 2, y: e11.alignAttr.y + (h12.height - l4.height) / 2, rotationOriginX: (e11.width || 0) / 2, rotationOriginY: (e11.height || 0) / 2 }), p2 && s11.height >= 0) this.justifyDataLabel(e11, i11, e11.alignAttr, h12, s11, o11);
              else if (hL(i11.crop, true)) {
                let { x: t12, y: i12 } = e11.alignAttr;
                g2 = r11.isInsidePlot(t12, i12, { paneCoordinates: true, series: this }) && r11.isInsidePlot(t12 + h12.width - 1, i12 + h12.height - 1, { paneCoordinates: true, series: this });
              }
              i11.shape && !d2 && e11[o11 ? "attr" : "animate"]({ anchorX: u2[0], anchorY: u2[1] });
            }
            o11 && a11 && (e11.placed = false), g2 || a11 && !p2 ? (e11.show(), e11.placed = true) : (e11.hide(), e11.placed = false);
          }
          function s10(t11, e11) {
            var _a2, _b2, _c2, _d2;
            hM(this, "initDataLabelsGroup", { index: t11, zIndex: (_a2 = e11 == null ? void 0 : e11.zIndex) != null ? _a2 : 6 }), this.dataLabelsGroup = (_b2 = this.dataLabelsGroups) == null ? void 0 : _b2[t11];
            let i11 = this.plotGroup("dataLabelsGroup", "data-labels", this.hasRendered ? "inherit" : "hidden", (_c2 = e11 == null ? void 0 : e11.zIndex) != null ? _c2 : 6, (_d2 = this.dataLabelsParentGroups) == null ? void 0 : _d2[t11]);
            return this.dataLabelsGroups || (this.dataLabelsGroups = []), this.dataLabelsGroups[t11] = i11, this.dataLabelsGroup = this.dataLabelsGroups[0], i11;
          }
          function o10(t11, e11, i11) {
            let s11 = !!this.hasRendered, o11 = this.initDataLabelsGroup(t11, i11).attr({ opacity: +s11 });
            return !s11 && o11 && (this.visible && o11.show(), this.options.animation ? o11.animate({ opacity: 1 }, e11) : o11.attr({ opacity: 1 })), o11;
          }
          function r10(t11) {
            var _a2;
            let e11;
            t11 = t11 || this.points;
            let i11 = this, s11 = i11.chart, o11 = i11.options, r11 = s11.renderer, { backgroundColor: a11, plotBackgroundColor: l3 } = s11.options.chart, d2 = r11.getContrast(hC(l3) && l3 || hC(a11) && a11 || "#000000"), c2 = h10(i11), { animation: p2, defer: g2 } = c2[0], u2 = g2 ? hb(s11, p2, i11) : { defer: 0, duration: 0 };
            hM(this, "drawDataLabels"), ((_a2 = i11.hasDataLabels) == null ? void 0 : _a2.call(i11)) && t11.forEach((t12) => {
              var _a3, _b2, _c2;
              let a12 = t12.dataLabels || [], h11 = t12.color || i11.color;
              hE(n10(c2, t12.dlOptions || ((_a3 = t12.options) == null ? void 0 : _a3.dataLabels))).forEach((n11, l5) => {
                var _a4;
                e11 = this.initDataLabels(l5, u2, n11);
                let c3 = n11.enabled && (t12.visible || t12.dataLabelOnHidden) && (!t12.isNull || t12.dataLabelOnNull) && (function(t13, e12) {
                  let i12 = e12.filter;
                  if (i12) {
                    let e13 = i12.operator, s12 = t13[i12.property], o12 = i12.value;
                    return ">" === e13 && s12 > o12 || "<" === e13 && s12 < o12 || ">=" === e13 && s12 >= o12 || "<=" === e13 && s12 <= o12 || "==" === e13 && s12 == o12 || "===" === e13 && s12 === o12 || "!=" === e13 && s12 != o12 || "!==" === e13 && s12 !== o12 || false;
                  }
                  return true;
                })(t12, n11), { backgroundColor: p3, borderColor: g3, distance: f2, style: m2 = {} } = n11, x2, y2, b2, v2 = {}, k2 = a12[l5], w2 = !k2, M2;
                c3 && (y2 = hk(x2 = hL(n11[t12.formatPrefix + "Format"], n11.format)) ? hv(x2, t12, s11) : (n11[t12.formatPrefix + "Formatter"] || n11.formatter).call(t12, n11), b2 = n11.rotation, !s11.styledMode && (m2.color = hL(n11.color, m2.color, hC(i11.color) ? i11.color : void 0, "#000000"), "contrast" === m2.color ? ("none" !== p3 && (M2 = p3), t12.contrastColor = r11.getContrast("auto" !== M2 && hC(M2) && M2 || (hC(h11) ? h11 : "")), m2.color = M2 || !hk(f2) && n11.inside || 0 > hO(f2 || 0) || o11.stacking ? t12.contrastColor : d2) : delete t12.contrastColor, o11.cursor && (m2.cursor = o11.cursor)), v2 = { r: n11.borderRadius || 0, rotation: b2, padding: n11.padding, zIndex: 1 }, s11.styledMode || (v2.fill = "auto" === p3 ? t12.color : p3, v2.stroke = "auto" === g3 ? t12.color : g3, v2["stroke-width"] = n11.borderWidth), hP(v2, (t13, e12) => {
                  void 0 === t13 && delete v2[e12];
                })), !k2 || c3 && hk(y2) && !!(k2.div || ((_a4 = k2.text) == null ? void 0 : _a4.foreignObject)) == !!n11.useHTML && (k2.rotation && n11.rotation || k2.rotation === n11.rotation) || (k2 = void 0, w2 = true), c3 && hk(y2) && "" !== y2 && (k2 ? v2.text = y2 : (k2 = r11.label(y2, 0, 0, n11.shape, void 0, void 0, n11.useHTML, void 0, "data-label")).addClass(" highcharts-data-label-color-" + t12.colorIndex + " " + (n11.className || "") + (n11.useHTML ? " highcharts-tracker" : "")), k2 && (k2.options = n11, k2.attr(v2), s11.styledMode ? m2.width && k2.css({ width: m2.width, textOverflow: m2.textOverflow, whiteSpace: m2.whiteSpace }) : k2.css(m2).shadow(n11.shadow), hM(k2, "beforeAddingDataLabel", { labelOptions: n11, point: t12 }), k2.added || k2.add(e11), i11.alignDataLabel(t12, k2, n11, void 0, w2), k2.isActive = true, a12[l5] && a12[l5] !== k2 && a12[l5].destroy(), a12[l5] = k2));
              });
              let l4 = a12.length;
              for (; l4--; ) ((_b2 = a12[l4]) == null ? void 0 : _b2.isActive) ? a12[l4].isActive = false : ((_c2 = a12[l4]) == null ? void 0 : _c2.destroy(), a12.splice(l4, 1));
              t12.dataLabel = a12[0], t12.dataLabels = a12;
            }), hM(this, "afterDrawDataLabels");
          }
          function a10(t11, e11, i11, s11, o11, r11) {
            let a11 = this.chart, n11 = e11.align, h11 = e11.verticalAlign, l3 = t11.box ? 0 : t11.padding || 0, d2 = a11.inverted ? this.yAxis : this.xAxis, c2 = d2 ? d2.left - a11.plotLeft : 0, p2 = a11.inverted ? this.xAxis : this.yAxis, g2 = p2 ? p2.top - a11.plotTop : 0, { x: u2 = 0, y: f2 = 0 } = e11, m2, x2;
            return (m2 = (i11.x || 0) + l3 + c2) < 0 && ("right" === n11 && u2 >= 0 ? (e11.align = "left", e11.inside = true) : u2 -= m2, x2 = true), (m2 = (i11.x || 0) + s11.width - l3 + c2) > a11.plotWidth && ("left" === n11 && u2 <= 0 ? (e11.align = "right", e11.inside = true) : u2 += a11.plotWidth - m2, x2 = true), (m2 = i11.y + l3 + g2) < 0 && ("bottom" === h11 && f2 >= 0 ? (e11.verticalAlign = "top", e11.inside = true) : f2 -= m2, x2 = true), (m2 = (i11.y || 0) + s11.height - l3 + g2) > a11.plotHeight && ("top" === h11 && f2 <= 0 ? (e11.verticalAlign = "bottom", e11.inside = true) : f2 += a11.plotHeight - m2, x2 = true), x2 && (e11.x = u2, e11.y = f2, t11.placed = !r11, t11.align(e11, void 0, o11)), x2;
          }
          function n10(t11, e11) {
            let i11 = [], s11;
            if (hT(t11) && !hT(e11)) i11 = t11.map(function(t12) {
              return hA(t12, e11);
            });
            else if (hT(e11) && !hT(t11)) i11 = e11.map(function(e12) {
              return hA(t11, e12);
            });
            else if (hT(t11) || hT(e11)) {
              if (hT(t11) && hT(e11)) for (s11 = Math.max(t11.length, e11.length); s11--; ) i11[s11] = hA(t11[s11], e11[s11]);
            } else i11 = hA(t11, e11);
            return i11;
          }
          function h10(t11) {
            var _a2, _b2;
            let e11 = t11.chart.options.plotOptions;
            return hE(n10(n10((_a2 = e11 == null ? void 0 : e11.series) == null ? void 0 : _a2.dataLabels, (_b2 = e11 == null ? void 0 : e11[t11.type]) == null ? void 0 : _b2.dataLabels), t11.options.dataLabels));
          }
          function l2(t11, e11, i11, s11, o11) {
            let r11 = this.chart, a11 = r11.inverted, n11 = this.xAxis, h11 = n11.reversed, l3 = ((a11 ? e11.height : e11.width) || 0) / 2, d2 = t11.pointWidth, c2 = d2 ? d2 / 2 : 0;
            e11.startXPos = a11 ? o11.x : h11 ? -l3 - c2 : n11.width - l3 + c2, e11.startYPos = a11 ? h11 ? this.yAxis.height - l3 + c2 : -l3 - c2 : o11.y, s11 ? "hidden" === e11.visibility && (e11.show(), e11.attr({ opacity: 0 }).animate({ opacity: 1 })) : e11.attr({ opacity: 1 }).animate({ opacity: 0 }, void 0, e11.hide), r11.hasRendered && (i11 && e11.attr({ x: e11.startXPos, y: e11.startYPos }), e11.placed = true);
          }
          t10.compose = function(t11) {
            let h11 = t11.prototype;
            h11.initDataLabels || (h11.initDataLabels = o10, h11.initDataLabelsGroup = s10, h11.alignDataLabel = i10, h11.drawDataLabels = r10, h11.justifyDataLabel = a10, h11.mergeArrays = n10, h11.setDataLabelStartPos = l2, h11.hasDataLabels = e10);
          };
        })(P || (P = {}));
        let hI = P, { composed: hD } = z, { series: hB } = rW, { merge: hN, pushUnique: hz } = tn;
        function hR(t10, e10, i10, s10, o10) {
          var _a2, _b2, _c2, _d2, _e2, _f2, _g2;
          let { chart: r10, options: a10 } = this, n10 = r10.inverted, h10 = ((_a2 = this.xAxis) == null ? void 0 : _a2.len) || r10.plotSizeX || 0, l2 = ((_b2 = this.yAxis) == null ? void 0 : _b2.len) || r10.plotSizeY || 0, d2 = t10.dlBox || t10.shapeArgs, c2 = (_d2 = t10.below) != null ? _d2 : (t10.plotY || 0) > ((_c2 = this.translatedThreshold) != null ? _c2 : l2), p2 = (_e2 = i10.inside) != null ? _e2 : !!a10.stacking;
          if (d2) {
            if (s10 = hN(d2), "allow" !== i10.overflow || false !== i10.crop || false !== a10.clip) {
              s10.y < 0 && (s10.height += s10.y, s10.y = 0);
              let t11 = s10.y + s10.height - l2;
              t11 > 0 && t11 < s10.height - 1 && (s10.height -= t11);
            }
            n10 && (s10 = { x: l2 - s10.y - s10.height, y: h10 - s10.x - s10.width, width: s10.height, height: s10.width }), p2 || (n10 ? (s10.x += c2 ? 0 : s10.width, s10.width = 0) : (s10.y += c2 ? s10.height : 0, s10.height = 0));
          }
          (_f2 = i10.align) != null ? _f2 : i10.align = !n10 || p2 ? "center" : c2 ? "right" : "left", (_g2 = i10.verticalAlign) != null ? _g2 : i10.verticalAlign = n10 || p2 ? "middle" : c2 ? "top" : "bottom", hB.prototype.alignDataLabel.call(this, t10, e10, i10, s10, o10), i10.inside && t10.contrastColor && e10.css({ color: t10.contrastColor });
        }
        (L || (L = {})).compose = function(t10) {
          hI.compose(hB), hz(hD, "ColumnDataLabel") && (t10.prototype.alignDataLabel = hR);
        };
        let hW = L, { extend: hH, merge: hX } = tn;
        class hF extends hy {
        }
        hF.defaultOptions = hX(hy.defaultOptions, {}), hH(hF.prototype, { inverted: true }), rW.registerSeriesType("bar", hF);
        let { column: hG, line: hY } = rW.seriesTypes, { addEvent: hj, extend: hU, merge: h$ } = tn;
        class hV extends hY {
          applyJitter() {
            let t10 = this, e10 = this.options.jitter, i10 = this.points.length;
            e10 && this.points.forEach(function(s10, o10) {
              ["x", "y"].forEach(function(r10, a10) {
                if (e10[r10] && !s10.isNull) {
                  let n10 = `plot${r10.toUpperCase()}`, h10 = t10[`${r10}Axis`], l2 = e10[r10] * h10.transA;
                  if (h10 && !h10.logarithmic) {
                    let t11, e11 = Math.max(0, (s10[n10] || 0) - l2), d2 = Math.min(h10.len, (s10[n10] || 0) + l2);
                    s10[n10] = e11 + (d2 - e11) * ((t11 = 1e4 * Math.sin(o10 + a10 * i10)) - Math.floor(t11)), "x" === r10 && (s10.clientX = s10.plotX);
                  }
                }
              });
            });
          }
          drawGraph() {
            this.options.lineWidth ? super.drawGraph() : this.graph && (this.graph = this.graph.destroy());
          }
        }
        hV.defaultOptions = h$(hY.defaultOptions, { lineWidth: 0, findNearestPointBy: "xy", jitter: { x: 0, y: 0 }, marker: { enabled: true }, tooltip: { headerFormat: '<span style="color:{point.color}">\u25CF</span> <span style="font-size: 0.8em"> {series.name}</span><br/>', pointFormat: "x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>" } }), hU(hV.prototype, { drawTracker: hG.prototype.drawTracker, sorted: false, requireSorting: false, noSharedTooltip: true, trackerGroups: ["group", "markerGroup", "dataLabelsGroup"] }), hj(hV, "afterTranslate", function() {
          this.applyJitter();
        }), rW.registerSeriesType("scatter", hV);
        let { deg2rad: hZ } = z, { fireEvent: h_, isNumber: hq, pick: hK, relativeLength: hJ } = tn;
        (g = O || (O = {})).getCenter = function() {
          let t10 = this.options, e10 = this.chart, i10 = 2 * (t10.slicedOffset || 0), s10 = e10.plotWidth - 2 * i10, o10 = e10.plotHeight - 2 * i10, r10 = t10.center, a10 = Math.min(s10, o10), n10 = t10.thickness, h10, l2 = t10.size, d2 = t10.innerSize || 0, c2, p2;
          "string" == typeof l2 && (l2 = parseFloat(l2)), "string" == typeof d2 && (d2 = parseFloat(d2));
          let g2 = [hK(r10 == null ? void 0 : r10[0], "50%"), hK(r10 == null ? void 0 : r10[1], "50%"), hK(l2 && l2 < 0 ? void 0 : t10.size, "100%"), hK(d2 && d2 < 0 ? void 0 : t10.innerSize || 0, "0%")];
          for (!e10.angular || this instanceof ah || (g2[3] = 0), c2 = 0; c2 < 4; ++c2) p2 = g2[c2], h10 = c2 < 2 || 2 === c2 && /%$/.test(p2), g2[c2] = hJ(p2, [s10, o10, a10, g2[2]][c2]) + (h10 ? i10 : 0);
          return g2[3] > g2[2] && (g2[3] = g2[2]), hq(n10) && 2 * n10 < g2[2] && n10 > 0 && (g2[3] = g2[2] - 2 * n10), h_(this, "afterGetCenter", { positions: g2 }), g2;
        }, g.getStartAndEndRadians = function(t10, e10) {
          let i10 = hq(t10) ? t10 : 0, s10 = hq(e10) && e10 > i10 && e10 - i10 < 360 ? e10 : i10 + 360;
          return { start: hZ * (i10 + -90), end: hZ * (s10 + -90) };
        };
        let hQ = O, { setAnimation: h0 } = t5, { addEvent: h1, defined: h2, extend: h3, isNumber: h5, pick: h6, relativeLength: h9 } = tn;
        class h4 extends rt {
          getConnectorPath(t10) {
            let e10 = t10.dataLabelPosition, i10 = t10.options || {}, s10 = i10.connectorShape, o10 = this.connectorShapes[s10] || s10;
            return e10 && o10.call(this, __spreadProps(__spreadValues({}, e10.computed), { alignment: e10.alignment }), e10.connectorPosition, i10) || [];
          }
          getTranslate() {
            return this.sliced && this.slicedTranslation || { translateX: 0, translateY: 0 };
          }
          haloPath(t10) {
            let e10 = this.shapeArgs;
            return this.sliced || !this.visible ? [] : this.series.chart.renderer.symbols.arc(e10.x, e10.y, e10.r + t10, e10.r + t10, { innerR: e10.r - 1, start: e10.start, end: e10.end, borderRadius: e10.borderRadius });
          }
          constructor(t10, e10, i10) {
            var _a2;
            super(t10, e10, i10), this.half = 0, (_a2 = this.name) != null ? _a2 : this.name = t10.chart.options.lang.pieSliceName;
            const s10 = (t11) => {
              this.slice("select" === t11.type);
            };
            h1(this, "select", s10), h1(this, "unselect", s10);
          }
          isValid() {
            return h5(this.y) && this.y >= 0;
          }
          setVisible(t10, e10 = true) {
            t10 !== this.visible && this.update({ visible: t10 != null ? t10 : !this.visible }, e10, void 0, false);
          }
          slice(t10, e10, i10) {
            let s10 = this.series;
            h0(i10, s10.chart), e10 = h6(e10, true), this.sliced = this.options.sliced = t10 = h2(t10) ? t10 : !this.sliced, s10.options.data[s10.data.indexOf(this)] = this.options, this.graphic && this.graphic.animate(this.getTranslate());
          }
        }
        h3(h4.prototype, { connectorShapes: { fixedOffset: function(t10, e10, i10) {
          let s10 = e10.breakAt, o10 = e10.touchingSliceAt, r10 = i10.softConnector ? ["C", t10.x + ("left" === t10.alignment ? -5 : 5), t10.y, 2 * s10.x - o10.x, 2 * s10.y - o10.y, s10.x, s10.y] : ["L", s10.x, s10.y];
          return [["M", t10.x, t10.y], r10, ["L", o10.x, o10.y]];
        }, straight: function(t10, e10) {
          let i10 = e10.touchingSliceAt;
          return [["M", t10.x, t10.y], ["L", i10.x, i10.y]];
        }, crookedLine: function(t10, e10, i10) {
          let { angle: s10 = this.angle || 0, breakAt: o10, touchingSliceAt: r10 } = e10, { series: a10 } = this, [n10, h10, l2] = a10.center, d2 = l2 / 2, { plotLeft: c2, plotWidth: p2 } = a10.chart, g2 = "left" === t10.alignment, { x: u2, y: f2 } = t10, m2 = o10.x;
          if (i10.crookDistance) {
            let t11 = h9(i10.crookDistance, 1);
            m2 = g2 ? n10 + d2 + (p2 + c2 - n10 - d2) * (1 - t11) : c2 + (n10 - d2) * t11;
          } else m2 = n10 + (h10 - f2) * Math.tan(s10 - Math.PI / 2);
          let x2 = [["M", u2, f2]];
          return (g2 ? m2 <= u2 && m2 >= o10.x : m2 >= u2 && m2 <= o10.x) && x2.push(["L", m2, f2]), x2.push(["L", o10.x, o10.y], ["L", r10.x, r10.y]), x2;
        } } });
        let { getStartAndEndRadians: h8 } = hQ, { noop: h7 } = z, { clamp: lt, extend: le, fireEvent: li, merge: ls, pick: lo } = tn;
        class lr extends ah {
          animate(t10) {
            let e10 = this, i10 = e10.points, s10 = e10.startAngleRad;
            t10 || i10.forEach(function(t11) {
              let i11 = t11.graphic, o10 = t11.shapeArgs;
              i11 && o10 && (i11.attr({ r: lo(t11.startR, e10.center && e10.center[3] / 2), start: s10, end: s10 }), i11.animate({ r: o10.r, start: o10.start, end: o10.end }, e10.options.animation));
            });
          }
          drawEmpty() {
            let t10, e10, i10 = this.startAngleRad, s10 = this.endAngleRad, o10 = this.options;
            0 === this.total && this.center ? (t10 = this.center[0], e10 = this.center[1], this.graph || (this.graph = this.chart.renderer.arc(t10, e10, this.center[1] / 2, 0, i10, s10).addClass("highcharts-empty-series").add(this.group)), this.graph.attr({ d: ix.arc(t10, e10, this.center[2] / 2, 0, { start: i10, end: s10, innerR: this.center[3] / 2 }) }), this.chart.styledMode || this.graph.attr({ "stroke-width": o10.borderWidth, fill: o10.fillColor || "none", stroke: o10.color || "#cccccc" })) : this.graph && (this.graph = this.graph.destroy());
          }
          drawPoints() {
            let t10 = this.chart.renderer;
            this.points.forEach(function(e10) {
              e10.graphic && e10.hasNewShapeType() && (e10.graphic = e10.graphic.destroy()), e10.graphic || (e10.graphic = t10[e10.shapeType](e10.shapeArgs).add(e10.series.group), e10.delayedRendering = true);
            });
          }
          generatePoints() {
            super.generatePoints(), this.updateTotals();
          }
          getX(t10, e10, i10, s10) {
            let o10 = this.center, r10 = this.radii ? this.radii[i10.index] || 0 : o10[2] / 2, a10 = s10.dataLabelPosition, n10 = (a10 == null ? void 0 : a10.distance) || 0, h10 = Math.asin(lt((t10 - o10[1]) / (r10 + n10), -1, 1));
            return o10[0] + Math.cos(h10) * (r10 + n10) * (e10 ? -1 : 1) + (n10 > 0 ? (e10 ? -1 : 1) * (s10.padding || 0) : 0);
          }
          hasData() {
            return this.points.some((t10) => t10.visible);
          }
          redrawPoints() {
            let t10, e10, i10, s10, o10 = this, r10 = o10.chart;
            this.drawEmpty(), o10.group && !r10.styledMode && o10.group.shadow(o10.options.shadow), o10.points.forEach(function(a10) {
              let n10 = {};
              e10 = a10.graphic, !a10.isNull && e10 ? (s10 = a10.shapeArgs, t10 = a10.getTranslate(), r10.styledMode || (i10 = o10.pointAttribs(a10, a10.selected && "select")), a10.delayedRendering ? (e10.setRadialReference(o10.center).attr(s10).attr(t10), r10.styledMode || e10.attr(i10).attr({ "stroke-linejoin": "round" }), a10.delayedRendering = false) : (e10.setRadialReference(o10.center), r10.styledMode || ls(true, n10, i10), ls(true, n10, s10, t10), e10.animate(n10)), e10.attr({ visibility: a10.visible ? "inherit" : "hidden" }), e10.addClass(a10.getClassName(), true)) : e10 && (a10.graphic = e10.destroy());
            });
          }
          sortByAngle(t10, e10) {
            t10.sort(function(t11, i10) {
              return void 0 !== t11.angle && (i10.angle - t11.angle) * e10;
            });
          }
          translate(t10) {
            li(this, "translate"), this.generatePoints();
            let e10 = this.options, i10 = e10.slicedOffset, s10 = h8(e10.startAngle, e10.endAngle), o10 = this.startAngleRad = s10.start, r10 = (this.endAngleRad = s10.end) - o10, a10 = this.points, n10 = e10.ignoreHiddenPoint, h10 = a10.length, l2, d2, c2, p2, g2, u2, f2, m2 = 0;
            for (t10 || (this.center = t10 = this.getCenter()), u2 = 0; u2 < h10; u2++) {
              f2 = a10[u2], l2 = o10 + m2 * r10, f2.isValid() && (!n10 || f2.visible) && (m2 += f2.percentage / 100), d2 = o10 + m2 * r10;
              let e11 = { x: t10[0], y: t10[1], r: t10[2] / 2, innerR: t10[3] / 2, start: Math.round(1e3 * l2) / 1e3, end: Math.round(1e3 * d2) / 1e3 };
              f2.shapeType = "arc", f2.shapeArgs = e11, (c2 = (d2 + l2) / 2) > 1.5 * Math.PI ? c2 -= 2 * Math.PI : c2 < -Math.PI / 2 && (c2 += 2 * Math.PI), f2.slicedTranslation = { translateX: Math.round(Math.cos(c2) * i10), translateY: Math.round(Math.sin(c2) * i10) }, p2 = Math.cos(c2) * t10[2] / 2, g2 = Math.sin(c2) * t10[2] / 2, f2.tooltipPos = [t10[0] + 0.7 * p2, t10[1] + 0.7 * g2], f2.half = +(c2 < -Math.PI / 2 || c2 > Math.PI / 2), f2.angle = c2;
            }
            li(this, "afterTranslate");
          }
          updateTotals() {
            let t10 = this.points, e10 = t10.length, i10 = this.options.ignoreHiddenPoint, s10, o10, r10 = 0;
            for (s10 = 0; s10 < e10; s10++) (o10 = t10[s10]).isValid() && (!i10 || o10.visible) && (r10 += o10.y);
            for (s10 = 0, this.total = r10; s10 < e10; s10++) (o10 = t10[s10]).percentage = r10 > 0 && (o10.visible || !i10) ? o10.y / r10 * 100 : 0, o10.total = r10;
          }
        }
        lr.defaultOptions = ls(ah.defaultOptions, { borderRadius: 3, center: [null, null], clip: false, colorByPoint: true, dataLabels: { connectorPadding: 5, connectorShape: "crookedLine", crookDistance: void 0, distance: 30, enabled: true, formatter: function() {
          return this.isNull ? void 0 : this.name;
        }, softConnector: true, x: 0 }, fillColor: void 0, ignoreHiddenPoint: true, inactiveOtherPoints: true, legendType: "point", marker: null, size: null, showInLegend: false, slicedOffset: 10, stickyTracking: false, tooltip: { followPointer: true }, borderColor: "#ffffff", borderWidth: 1, lineWidth: void 0, states: { hover: { brightness: 0.1 } } }), le(lr.prototype, { axisTypes: [], directTouch: true, drawGraph: void 0, drawTracker: hy.prototype.drawTracker, getCenter: hQ.getCenter, getSymbol: h7, invertible: false, isCartesian: false, noSharedTooltip: true, pointAttribs: hy.prototype.pointAttribs, pointClass: h4, requireSorting: false, searchPoint: h7, trackerGroups: ["group", "dataLabelsGroup"] }), rW.registerSeriesType("pie", lr);
        let { composed: la, noop: ln } = z, { distribute: lh } = eO, { series: ll } = rW, { arrayMax: ld, clamp: lc, defined: lp, isNumber: lg, pick: lu, pushUnique: lf, relativeLength: lm } = tn;
        !(function(t10) {
          let e10 = { radialDistributionY: function(t11, e11) {
            var _a2;
            return (((_a2 = e11.dataLabelPosition) == null ? void 0 : _a2.top) || 0) + t11.distributeBox.pos;
          }, radialDistributionX: function(t11, e11, i11, s11, o11) {
            let r11 = o11.dataLabelPosition;
            return t11.getX(i11 < ((r11 == null ? void 0 : r11.top) || 0) + 2 || i11 > ((r11 == null ? void 0 : r11.bottom) || 0) - 2 ? s11 : i11, e11.half, e11, o11);
          }, justify: function(t11, e11, i11, s11) {
            var _a2;
            return s11[0] + (t11.half ? -1 : 1) * (i11 + (((_a2 = e11.dataLabelPosition) == null ? void 0 : _a2.distance) || 0));
          }, alignToPlotEdges: function(t11, e11, i11, s11) {
            let o11 = t11.getBBox().width;
            return e11 ? o11 + s11 : i11 - o11 - s11;
          }, alignToConnectors: function(t11, e11, i11, s11) {
            let o11 = 0, r11;
            return t11.forEach(function(t12) {
              (r11 = t12.dataLabel.getBBox().width) > o11 && (o11 = r11);
            }), e11 ? o11 + s11 : i11 - o11 - s11;
          } };
          function i10(t11, e11) {
            let i11 = Math.PI / 2, { start: s11 = 0, end: o11 = 0 } = t11.shapeArgs || {}, r11 = t11.angle || 0;
            e11 > 0 && s11 < i11 && o11 > i11 && r11 > i11 / 2 && r11 < 1.5 * i11 && (r11 = r11 <= i11 ? Math.max(i11 / 2, (s11 + i11) / 2) : Math.min(1.5 * i11, (i11 + o11) / 2));
            let { center: a10, options: n10 } = this, h10 = a10[2] / 2, l2 = Math.cos(r11), d2 = Math.sin(r11), c2 = a10[0] + l2 * h10, p2 = a10[1] + d2 * h10, g2 = Math.min((n10.slicedOffset || 0) + (n10.borderWidth || 0), e11 / 5);
            return { natural: { x: c2 + l2 * e11, y: p2 + d2 * e11 }, computed: {}, alignment: e11 < 0 ? "center" : t11.half ? "right" : "left", connectorPosition: { angle: r11, breakAt: { x: c2 + l2 * g2, y: p2 + d2 * g2 }, touchingSliceAt: { x: c2, y: p2 } }, distance: e11 };
          }
          function s10() {
            var _a2;
            let t11 = this, e11 = t11.points, i11 = t11.chart, s11 = i11.plotWidth, o11 = i11.plotHeight, r11 = i11.plotLeft, a10 = Math.round(i11.chartWidth / 3), n10 = t11.center, h10 = n10[2] / 2, l2 = n10[1], d2 = [[], []], c2 = [0, 0, 0, 0], p2 = t11.dataLabelPositioners, g2, u2, f2, m2 = 0;
            t11.visible && ((_a2 = t11.hasDataLabels) == null ? void 0 : _a2.call(t11)) && (e11.forEach((t12) => {
              (t12.dataLabels || []).forEach((t13) => {
                t13.shortened && (t13.attr({ width: "auto" }).css({ width: "auto", textOverflow: "clip" }), t13.shortened = false);
              });
            }), ll.prototype.drawDataLabels.apply(t11), e11.forEach((t12) => {
              (t12.dataLabels || []).forEach((e12, i12) => {
                var _a3;
                let s12 = n10[2] / 2, o12 = e12.options, r12 = lm((o12 == null ? void 0 : o12.distance) || 0, s12);
                0 === i12 && d2[t12.half].push(t12), !lp((_a3 = o12 == null ? void 0 : o12.style) == null ? void 0 : _a3.width) && e12.getBBox().width > a10 && (e12.css({ width: Math.round(0.7 * a10) + "px" }), e12.shortened = true), e12.dataLabelPosition = this.getDataLabelPosition(t12, r12), m2 = Math.max(m2, r12);
              });
            }), d2.forEach((e12, a11) => {
              let d3 = e12.length, g3 = [], x2, y2, b2 = 0, v2;
              d3 && (t11.sortByAngle(e12, a11 - 0.5), m2 > 0 && (x2 = Math.max(0, l2 - h10 - m2), y2 = Math.min(l2 + h10 + m2, i11.plotHeight), e12.forEach((t12) => {
                (t12.dataLabels || []).forEach((e13) => {
                  var _a3;
                  let s12 = e13.dataLabelPosition;
                  s12 && s12.distance > 0 && (s12.top = Math.max(0, l2 - h10 - s12.distance), s12.bottom = Math.min(l2 + h10 + s12.distance, i11.plotHeight), b2 = e13.getBBox().height || 21, e13.lineHeight = i11.renderer.fontMetrics(e13.text || e13).h + 2 * e13.padding, t12.distributeBox = { target: (((_a3 = e13.dataLabelPosition) == null ? void 0 : _a3.natural.y) || 0) - s12.top + e13.lineHeight / 2, size: b2, rank: t12.y }, g3.push(t12.distributeBox));
                });
              }), lh(g3, v2 = y2 + b2 - x2, v2 / 5)), e12.forEach((i12) => {
                (i12.dataLabels || []).forEach((l3) => {
                  let d4 = l3.options || {}, m3 = i12.distributeBox, x3 = l3.dataLabelPosition, y3 = (x3 == null ? void 0 : x3.natural.y) || 0, b3 = d4.connectorPadding || 0, v3 = l3.lineHeight || 21, k2 = (v3 - l3.getBBox().height) / 2, w2 = 0, M2 = y3, S2 = "inherit";
                  if (x3) {
                    if (g3 && lp(m3) && x3.distance > 0 && (void 0 === m3.pos ? S2 = "hidden" : (f2 = m3.size, M2 = p2.radialDistributionY(i12, l3))), d4.justify) w2 = p2.justify(i12, l3, h10, n10);
                    else switch (d4.alignTo) {
                      case "connectors":
                        w2 = p2.alignToConnectors(e12, a11, s11, r11);
                        break;
                      case "plotEdges":
                        w2 = p2.alignToPlotEdges(l3, a11, s11, r11);
                        break;
                      default:
                        w2 = p2.radialDistributionX(t11, i12, M2 - k2, y3, l3);
                    }
                    if (x3.attribs = { visibility: S2, align: x3.alignment }, x3.posAttribs = { x: w2 + (d4.x || 0) + ({ left: b3, right: -b3 }[x3.alignment] || 0), y: M2 + (d4.y || 0) - v3 / 2 }, x3.computed.x = w2, x3.computed.y = M2 - k2, lu(d4.crop, true)) {
                      let t12;
                      w2 - (u2 = l3.getBBox().width) < b3 && 1 === a11 ? (t12 = Math.round(u2 - w2 + b3), c2[3] = Math.max(t12, c2[3])) : w2 + u2 > s11 - b3 && 0 === a11 && (t12 = Math.round(w2 + u2 - s11 + b3), c2[1] = Math.max(t12, c2[1])), M2 - f2 / 2 < 0 ? c2[0] = Math.max(Math.round(-M2 + f2 / 2), c2[0]) : M2 + f2 / 2 > o11 && (c2[2] = Math.max(Math.round(M2 + f2 / 2 - o11), c2[2])), x3.sideOverflow = t12;
                    }
                  }
                });
              }));
            }), (0 === ld(c2) || this.verifyDataLabelOverflow(c2)) && (this.placeDataLabels(), this.points.forEach((e12) => {
              var _a3;
              (_a3 = e12.dataLabels) == null ? void 0 : _a3.forEach((s12, o12) => {
                var _a4, _b2;
                let { connectorColor: r12, connectorWidth: a11 = 1 } = s12.options || {}, n11 = s12.dataLabelPosition;
                if (lg(a11)) {
                  let h11;
                  g2 = s12.connector, n11 && n11.distance > 0 ? (h11 = !g2, g2 || (s12.connector = g2 = i11.renderer.path().addClass("highcharts-data-label-connector  highcharts-color-" + e12.colorIndex + (e12.className ? " " + e12.className : "")).add((_a4 = t11.dataLabelsGroups) == null ? void 0 : _a4[o12])), i11.styledMode || g2.attr({ "stroke-width": a11, stroke: r12 || e12.color || "#666666" }), g2[h11 ? "attr" : "animate"]({ d: e12.getConnectorPath(s12) }), g2.attr({ visibility: (_b2 = n11.attribs) == null ? void 0 : _b2.visibility })) : g2 && (s12.connector = g2.destroy());
                }
              });
            })));
          }
          function o10() {
            this.points.forEach((t11) => {
              (t11.dataLabels || []).forEach((t12) => {
                var _a2, _b2;
                let e11 = t12.dataLabelPosition;
                e11 ? (e11.sideOverflow && (t12.css({ width: Math.max(t12.getBBox().width - e11.sideOverflow, 0) + "px", textOverflow: ((_b2 = (_a2 = t12.options) == null ? void 0 : _a2.style) == null ? void 0 : _b2.textOverflow) || "ellipsis" }), t12.shortened = true), t12.attr(e11.attribs), t12[t12.moved ? "animate" : "attr"](e11.posAttribs), t12.moved = true) : t12 && t12.attr({ y: -9999 });
              }), delete t11.distributeBox;
            }, this);
          }
          function r10(t11) {
            let e11 = this.center, i11 = this.options, s11 = i11.center, o11 = i11.minSize || 80, r11 = o11, a10 = null !== i11.size;
            return !a10 && (null !== s11[0] ? r11 = Math.max(e11[2] - Math.max(t11[1], t11[3]), o11) : (r11 = Math.max(e11[2] - t11[1] - t11[3], o11), e11[0] += (t11[3] - t11[1]) / 2), null !== s11[1] ? r11 = lc(r11, o11, e11[2] - Math.max(t11[0], t11[2])) : (r11 = lc(r11, o11, e11[2] - t11[0] - t11[2]), e11[1] += (t11[0] - t11[2]) / 2), r11 < e11[2] ? (e11[2] = r11, e11[3] = Math.min(i11.thickness ? Math.max(0, r11 - 2 * i11.thickness) : Math.max(0, lm(i11.innerSize || 0, r11)), r11), this.translate(e11), this.drawDataLabels && this.drawDataLabels()) : a10 = true), a10;
          }
          t10.compose = function(t11) {
            if (hI.compose(ll), lf(la, "PieDataLabel")) {
              let a10 = t11.prototype;
              a10.dataLabelPositioners = e10, a10.alignDataLabel = ln, a10.drawDataLabels = s10, a10.getDataLabelPosition = i10, a10.placeDataLabels = o10, a10.verifyDataLabelOverflow = r10;
            }
          };
        })(E || (E = {}));
        let lx = E;
        (u = I || (I = {})).getCenterOfPoints = function(t10) {
          let e10 = t10.reduce((t11, e11) => (t11.x += e11.x, t11.y += e11.y, t11), { x: 0, y: 0 });
          return { x: e10.x / t10.length, y: e10.y / t10.length };
        }, u.getDistanceBetweenPoints = function(t10, e10) {
          return Math.sqrt(Math.pow(e10.x - t10.x, 2) + Math.pow(e10.y - t10.y, 2));
        }, u.getAngleBetweenPoints = function(t10, e10) {
          return Math.atan2(e10.x - t10.x, e10.y - t10.y);
        }, u.pointInPolygon = function({ x: t10, y: e10 }, i10) {
          let s10 = i10.length, o10, r10, a10 = false;
          for (o10 = 0, r10 = s10 - 1; o10 < s10; r10 = o10++) {
            let [s11, n10] = i10[o10], [h10, l2] = i10[r10];
            n10 > e10 != l2 > e10 && t10 < (h10 - s11) * (e10 - n10) / (l2 - n10) + s11 && (a10 = !a10);
          }
          return a10;
        };
        let { pointInPolygon: ly } = I, { addEvent: lb, getAlignFactor: lv, fireEvent: lk, objectEach: lw, pick: lM } = tn;
        function lS(t10, e10) {
          let i10, s10 = false;
          return t10 && (i10 = t10.newOpacity, t10.oldOpacity !== i10 && (t10.hasClass("highcharts-data-label") ? (t10[i10 ? "removeClass" : "addClass"]("highcharts-data-label-hidden"), s10 = true, t10[t10.isOld ? "animate" : "attr"]({ opacity: i10 }, void 0, function() {
            e10.styledMode || t10.css({ pointerEvents: i10 ? "auto" : "none" });
          }), lk(e10, "afterHideOverlappingLabel")) : t10.attr({ opacity: i10 })), t10.isOld = true), s10;
        }
        let { defaultOptions: lT } = tD, { noop: lC } = z, { addEvent: lA, extend: lP, isObject: lL, merge: lO, relativeLength: lE } = tn, lI = { radius: 0, scope: "stack", where: void 0 }, lD = lC, lB = lC;
        function lN(t10, e10, i10, s10, o10 = {}) {
          let r10 = lD(t10, e10, i10, s10, o10), { brStart: a10 = true, brEnd: n10 = true, innerR: h10 = 0, r: l2 = i10, start: d2 = 0, end: c2 = 0 } = o10;
          if (o10.open || !o10.borderRadius) return r10;
          let p2 = c2 - d2, g2 = Math.sin(p2 / 2), u2 = Math.max(Math.min(lE(o10.borderRadius || 0, l2 - h10), (l2 - h10) / 2, l2 * g2 / (1 + g2)), 0), f2 = Math.min(u2, p2 / Math.PI * 2 * h10), m2 = r10.length - 1;
          for (; m2--; ) (a10 || 0 !== m2 && 3 !== m2) && (n10 || 1 !== m2 && 2 !== m2) && !(function(t11, e11, i11) {
            let s11, o11, r11, a11 = t11[e11], n11 = t11[e11 + 1];
            if ("Z" === n11[0] && (n11 = t11[0]), ("M" === a11[0] || "L" === a11[0]) && "A" === n11[0] ? (s11 = a11, o11 = n11, r11 = true) : "A" === a11[0] && ("M" === n11[0] || "L" === n11[0]) && (s11 = n11, o11 = a11), s11 && o11 && o11.params) {
              let a12 = o11[1], n12 = o11[5], h11 = o11.params, { start: l3, end: d3, cx: c3, cy: p3 } = h11, g3 = n12 ? a12 - i11 : a12 + i11, u3 = g3 ? Math.asin(i11 / g3) : 0, f3 = n12 ? u3 : -u3, m3 = Math.cos(u3) * g3;
              r11 ? (h11.start = l3 + f3, s11[1] = c3 + m3 * Math.cos(l3), s11[2] = p3 + m3 * Math.sin(l3), t11.splice(e11 + 1, 0, ["A", i11, i11, 0, 0, 1, c3 + a12 * Math.cos(h11.start), p3 + a12 * Math.sin(h11.start)])) : (h11.end = d3 - f3, o11[6] = c3 + a12 * Math.cos(h11.end), o11[7] = p3 + a12 * Math.sin(h11.end), t11.splice(e11 + 1, 0, ["A", i11, i11, 0, 0, 1, c3 + m3 * Math.cos(d3), p3 + m3 * Math.sin(d3)])), o11[4] = Math.abs(h11.end - h11.start) < Math.PI ? 0 : 1;
            }
          })(r10, m2, m2 > 1 ? f2 : u2);
          return r10;
        }
        function lz() {
          var _a2, _b2;
          if (this.options.borderRadius && !(this.chart.is3d && this.chart.is3d())) {
            let { options: t10, yAxis: e10 } = this, i10 = "percent" === t10.stacking, s10 = (_b2 = (_a2 = lT.plotOptions) == null ? void 0 : _a2[this.type]) == null ? void 0 : _b2.borderRadius, o10 = lR(t10.borderRadius, lL(s10) ? s10 : {}), r10 = e10.options.reversed;
            for (let s11 of this.points) {
              let { shapeArgs: a10 } = s11;
              if ("roundedRect" === s11.shapeType && a10) {
                let { width: n10 = 0, height: h10 = 0, y: l2 = 0 } = a10, d2 = l2, c2 = h10;
                if ("stack" === o10.scope && s11.stackTotal) {
                  let o11 = e10.translate(i10 ? 100 : s11.stackTotal, false, true, false, true), r11 = e10.translate(t10.threshold || 0, false, true, false, true), a11 = this.crispCol(0, Math.min(o11, r11), 0, Math.abs(o11 - r11));
                  d2 = a11.y, c2 = a11.height;
                }
                let p2 = (s11.negative ? -1 : 1) * (r10 ? -1 : 1) == -1, g2 = o10.where;
                !g2 && this.is("waterfall") && Math.abs((s11.yBottom || 0) - (this.translatedThreshold || 0)) > this.borderWidth && (g2 = "all"), g2 || (g2 = "end");
                let u2 = Math.min(lE(o10.radius, n10), n10 / 2, "all" === g2 ? h10 / 2 : 1 / 0) || 0;
                "end" === g2 && (p2 && (d2 -= u2), c2 += u2), lP(a10, { brBoxHeight: c2, brBoxY: d2, r: u2 });
              }
            }
          }
        }
        function lR(t10, e10) {
          return lL(t10) || (t10 = { radius: t10 || 0 }), lO(lI, e10, t10);
        }
        function lW() {
          let t10 = lR(this.options.borderRadius);
          for (let e10 of this.points) {
            let i10 = e10.shapeArgs;
            i10 && (i10.borderRadius = lE(t10.radius, (i10.r || 0) - (i10.innerR || 0)));
          }
        }
        function lH(t10, e10, i10, s10, o10 = {}) {
          let r10 = lB(t10, e10, i10, s10, o10), { r: a10 = 0, brBoxHeight: n10 = s10, brBoxY: h10 = e10 } = o10, l2 = e10 - h10, d2 = h10 + n10 - (e10 + s10), c2 = l2 - a10 > -0.1 ? 0 : a10, p2 = d2 - a10 > -0.1 ? 0 : a10, g2 = Math.max(c2 && l2, 0), u2 = Math.max(p2 && d2, 0), f2 = [t10 + c2, e10], m2 = [t10 + i10 - c2, e10], x2 = [t10 + i10, e10 + c2], y2 = [t10 + i10, e10 + s10 - p2], b2 = [t10 + i10 - p2, e10 + s10], v2 = [t10 + p2, e10 + s10], k2 = [t10, e10 + s10 - p2], w2 = [t10, e10 + c2], M2 = (t11, e11) => Math.sqrt(Math.pow(t11, 2) - Math.pow(e11, 2));
          if (g2) {
            let t11 = M2(c2, c2 - g2);
            f2[0] -= t11, m2[0] += t11, x2[1] = w2[1] = e10 + c2 - g2;
          }
          if (s10 < c2 - g2) {
            let o11 = M2(c2, c2 - g2 - s10);
            x2[0] = y2[0] = t10 + i10 - c2 + o11, b2[0] = Math.min(x2[0], b2[0]), v2[0] = Math.max(y2[0], v2[0]), k2[0] = w2[0] = t10 + c2 - o11, x2[1] = w2[1] = e10 + s10;
          }
          if (u2) {
            let t11 = M2(p2, p2 - u2);
            b2[0] += t11, v2[0] -= t11, y2[1] = k2[1] = e10 + s10 - p2 + u2;
          }
          if (s10 < p2 - u2) {
            let o11 = M2(p2, p2 - u2 - s10);
            x2[0] = y2[0] = t10 + i10 - p2 + o11, m2[0] = Math.min(x2[0], m2[0]), f2[0] = Math.max(y2[0], f2[0]), k2[0] = w2[0] = t10 + p2 - o11, y2[1] = k2[1] = e10;
          }
          return r10.length = 0, r10.push(["M", ...f2], ["L", ...m2], ["A", c2, c2, 0, 0, 1, ...x2], ["L", ...y2], ["A", p2, p2, 0, 0, 1, ...b2], ["L", ...v2], ["A", p2, p2, 0, 0, 1, ...k2], ["L", ...w2], ["A", c2, c2, 0, 0, 1, ...f2], ["Z"]), r10;
        }
        let { diffObjects: lX, extend: lF, find: lG, merge: lY, pick: lj, uniqueKey: lU } = tn;
        function l$(t10, e10) {
          let i10 = t10.condition;
          (i10.callback || function() {
            return this.chartWidth <= lj(i10.maxWidth, Number.MAX_VALUE) && this.chartHeight <= lj(i10.maxHeight, Number.MAX_VALUE) && this.chartWidth >= lj(i10.minWidth, 0) && this.chartHeight >= lj(i10.minHeight, 0);
          }).call(this) && e10.push(t10._id);
        }
        function lV(t10, e10) {
          let i10 = this.options.responsive, s10 = this.currentResponsive, o10 = [], r10;
          !e10 && i10 && i10.rules && i10.rules.forEach((t11) => {
            void 0 === t11._id && (t11._id = lU()), this.matchResponsiveRule(t11, o10);
          }, this);
          let a10 = lY(...o10.map((t11) => lG((i10 == null ? void 0 : i10.rules) || [], (e11) => e11._id === t11)).map((t11) => t11 == null ? void 0 : t11.chartOptions));
          a10.isResponsiveOptions = true, o10 = o10.toString() || void 0;
          let n10 = s10 == null ? void 0 : s10.ruleIds;
          o10 !== n10 && (s10 && (this.currentResponsive = void 0, this.updatingResponsive = true, this.update(s10.undoOptions, t10, true), this.updatingResponsive = false), o10 ? ((r10 = lX(a10, this.options, true, this.collectionsWithUpdate)).isResponsiveOptions = true, this.currentResponsive = { ruleIds: o10, mergedOptions: a10, undoOptions: r10 }, this.updatingResponsive || this.update(a10, t10, true)) : this.currentResponsive = void 0);
        }
        (D || (D = {})).compose = function(t10) {
          let e10 = t10.prototype;
          return e10.matchResponsiveRule || lF(e10, { matchResponsiveRule: l$, setResponsive: lV }), t10;
        };
        let lZ = D;
        z.AST = eh, z.Axis = s5, z.Chart = nn, z.Color = tG, z.DataLabel = hI, z.DataTableCore = rT, z.Fx = tV, z.HTMLElement = sn, z.Legend = aE, z.LegendSymbol = rE, z.PlotLineOrBand = oy, z.Point = rt, z.Pointer = rb, z.RendererRegistry = eT, z.Series = ah, z.SeriesRegistry = rW, z.StackItem = nA, z.SVGElement = it, z.SVGRenderer = i3, z.Templating = eS, z.Tick = sA, z.Time = tA, z.Tooltip = oj, z.animate = t5.animate, z.animObject = t5.animObject, z.chart = nn.chart, z.color = tG.parse, z.dateFormat = eS.dateFormat, z.defaultOptions = tD.defaultOptions, z.distribute = eO.distribute, z.format = eS.format, z.getDeferredAnimation = t5.getDeferredAnimation, z.getOptions = tD.getOptions, z.numberFormat = eS.numberFormat, z.seriesType = rW.seriesType, z.setAnimation = t5.setAnimation, z.setOptions = tD.setOptions, z.stop = t5.stop, z.time = tD.defaultTime, z.timers = tV.timers, { compose: function(t10, e10, i10) {
          let s10 = t10.types.pie;
          if (!e10.symbolCustomAttribs.includes("borderRadius")) {
            let o10 = i10.prototype.symbols;
            lA(t10, "afterColumnTranslate", lz, { order: 9 }), lA(s10, "afterTranslate", lW), e10.symbolCustomAttribs.push("borderRadius", "brBoxHeight", "brBoxY", "brEnd", "brStart"), lD = o10.arc, lB = o10.roundedRect, o10.arc = lN, o10.roundedRect = lH;
          }
        }, optionsToObject: lR }.compose(z.Series, z.SVGElement, z.SVGRenderer), hW.compose(z.Series.types.column), hI.compose(z.Series), s7.compose(z.Axis), sn.compose(z.SVGRenderer), aE.compose(z.Chart), os.compose(z.Axis), (r = (f = z.Chart).prototype).hideOverlappingLabels || (r.hideOverlappingLabels = function(t10) {
          let e10 = t10.length, i10 = (t11, e11) => !(e11.x >= t11.x + t11.width || e11.x + e11.width <= t11.x || e11.y >= t11.y + t11.height || e11.y + e11.height <= t11.y), s10 = (t11, e11) => {
            for (let i11 of t11) if (ly({ x: i11[0], y: i11[1] }, e11)) return true;
            return false;
          }, o10, r10, a10, n10, h10, l2 = false;
          for (let i11 = 0; i11 < e10; i11++) (o10 = t10[i11]) && (o10.oldOpacity = o10.opacity, o10.newOpacity = 1, o10.absoluteBox = (function(t11) {
            var _a2, _b2;
            if (t11 && (!t11.alignAttr || t11.placed)) {
              let e11 = t11.box ? 0 : t11.padding || 0, i12 = t11.alignAttr || { x: t11.attr("x"), y: t11.attr("y") }, { height: s11, polygon: o11, width: r11 } = t11.getBBox(), a11 = lv(t11.alignValue) * r11;
              return t11.width = r11, t11.height = s11, { x: i12.x + (((_a2 = t11.parentGroup) == null ? void 0 : _a2.translateX) || 0) + e11 - a11, y: i12.y + (((_b2 = t11.parentGroup) == null ? void 0 : _b2.translateY) || 0) + e11, width: r11 - 2 * e11, height: s11 - 2 * e11, polygon: o11 };
            }
          })(o10));
          t10.sort((t11, e11) => ((e11 == null ? void 0 : e11.labelrank) || 0) - ((t11 == null ? void 0 : t11.labelrank) || 0));
          for (let o11 = 0; o11 < e10; ++o11) {
            n10 = (r10 = t10[o11]) && r10.absoluteBox;
            let l3 = n10 == null ? void 0 : n10.polygon;
            for (let d2 = o11 + 1; d2 < e10; ++d2) {
              h10 = (a10 = t10[d2]) && a10.absoluteBox;
              let e11 = false;
              if (n10 && h10 && r10 !== a10 && (r10 == null ? void 0 : r10.newOpacity) !== 0 && (a10 == null ? void 0 : a10.newOpacity) !== 0 && (r10 == null ? void 0 : r10.visibility) !== "hidden" && (a10 == null ? void 0 : a10.visibility) !== "hidden") {
                let t11 = h10.polygon;
                if (l3 && t11 && l3 !== t11 ? s10(l3, t11) && (e11 = true) : i10(n10, h10) && (e11 = true), e11) {
                  let t12 = (r10 == null ? void 0 : r10.labelrank) < (a10 == null ? void 0 : a10.labelrank) ? r10 : a10, e12 = t12 == null ? void 0 : t12.text;
                  t12 && (t12.newOpacity = 0), (e12 == null ? void 0 : e12.element.querySelector("textPath")) && e12.hide();
                }
              }
            }
          }
          for (let e11 of t10) e11 && lS(e11, this) && (l2 = true);
          l2 && lk(this, "afterHideAllOverlappingLabels");
        }, lb(f, "render", function() {
          var _a2;
          let t10 = this, e10 = [];
          for (let i10 of t10.labelCollectors || []) e10 = e10.concat(i10());
          for (let i10 of t10.yAxis || []) i10.stacking && i10.options.stackLabels && !i10.options.stackLabels.allowOverlap && lw(i10.stacking.stacks, (t11) => {
            lw(t11, (t12) => {
              t12.label && e10.push(t12.label);
            });
          });
          for (let i10 of t10.series || []) if (i10.visible && ((_a2 = i10.hasDataLabels) == null ? void 0 : _a2.call(i10))) {
            let s10 = (i11) => {
              for (let s11 of i11) s11.visible && (s11.dataLabels || []).forEach((i12) => {
                var _a3, _b2;
                let o10 = i12.options || {};
                i12.labelrank = lM(o10.labelrank, s11.labelrank, (_a3 = s11.shapeArgs) == null ? void 0 : _a3.height), ((_b2 = o10.allowOverlap) != null ? _b2 : Number(o10.distance) > 0) ? (i12.oldOpacity = i12.opacity, i12.newOpacity = 1, lS(i12, t10)) : e10.push(i12);
              });
            };
            s10(i10.nodes || []), s10(i10.points);
          }
          this.hideOverlappingLabels(e10);
        })), lx.compose(z.Series.types.pie), oy.compose(z.Chart, z.Axis), rb.compose(z.Chart), lZ.compose(z.Chart), nb.compose(z.Axis, z.Chart, z.Series), nV.compose(z.Axis, z.Chart, z.Series), oj.compose(z.Pointer), tn.extend(z, tn);
        let l_ = z;
        return N.default;
      })());
    }
  });

  // node_modules/highcharts/modules/accessibility.js
  var require_accessibility = __commonJS({
    "node_modules/highcharts/modules/accessibility.js"(exports, module) {
      !/**
      * Highcharts JS v12.5.0 (2026-01-12)
      * @module highcharts/modules/accessibility
      * @requires highcharts
      *
      * Accessibility module
      *
      * (c) 2010-2026 Highsoft AS
      * Author: Oystein Moseng
      *
      * A commercial license may be required depending on use.
      * See www.highcharts.com/license
      */
      (function(e, t) {
        "object" == typeof exports && "object" == typeof module ? module.exports = t(e._Highcharts, e._Highcharts.Templating, e._Highcharts.AST, e._Highcharts.Legend, e._Highcharts.Axis, e._Highcharts.Color, e._Highcharts.SeriesRegistry, e._Highcharts.RendererRegistry, e._Highcharts.SVGRenderer, e._Highcharts.Point, e._Highcharts.Series) : "function" == typeof define && define.amd ? define("highcharts/modules/accessibility", ["highcharts/highcharts"], function(e2) {
          return t(e2, e2.Templating, e2.AST, e2.Legend, e2.Axis, e2.Color, e2.SeriesRegistry, e2.RendererRegistry, e2.SVGRenderer, e2.Point, e2.Series);
        }) : "object" == typeof exports ? exports["highcharts/modules/accessibility"] = t(e._Highcharts, e._Highcharts.Templating, e._Highcharts.AST, e._Highcharts.Legend, e._Highcharts.Axis, e._Highcharts.Color, e._Highcharts.SeriesRegistry, e._Highcharts.RendererRegistry, e._Highcharts.SVGRenderer, e._Highcharts.Point, e._Highcharts.Series) : e.Highcharts = t(e.Highcharts, e.Highcharts.Templating, e.Highcharts.AST, e.Highcharts.Legend, e.Highcharts.Axis, e.Highcharts.Color, e.Highcharts.SeriesRegistry, e.Highcharts.RendererRegistry, e.Highcharts.SVGRenderer, e.Highcharts.Point, e.Highcharts.Series);
      })("u" < typeof window ? exports : window, (e, t, i, s, r, n, o, a, l, h, c) => (() => {
        "use strict";
        let d;
        var u, p, g, m, b = { 260: (e10) => {
          e10.exports = h;
        }, 512: (e10) => {
          e10.exports = o;
        }, 532: (e10) => {
          e10.exports = r;
        }, 540: (e10) => {
          e10.exports = l;
        }, 608: (e10) => {
          e10.exports = a;
        }, 620: (e10) => {
          e10.exports = n;
        }, 632: (e10) => {
          e10.exports = s;
        }, 660: (e10) => {
          e10.exports = i;
        }, 820: (e10) => {
          e10.exports = c;
        }, 944: (t10) => {
          t10.exports = e;
        }, 984: (e10) => {
          e10.exports = t;
        } }, x = {};
        function f(e10) {
          var t10 = x[e10];
          if (void 0 !== t10) return t10.exports;
          var i10 = x[e10] = { exports: {} };
          return b[e10](i10, i10.exports, f), i10.exports;
        }
        f.n = (e10) => {
          var t10 = e10 && e10.__esModule ? () => e10.default : () => e10;
          return f.d(t10, { a: t10 }), t10;
        }, f.d = (e10, t10) => {
          for (var i10 in t10) f.o(t10, i10) && !f.o(e10, i10) && Object.defineProperty(e10, i10, { enumerable: true, get: t10[i10] });
        }, f.o = (e10, t10) => Object.prototype.hasOwnProperty.call(e10, t10);
        var y = {};
        f.d(y, { default: () => rO });
        var v = f(944), w = f.n(v);
        let { doc: E, win: A } = w(), { css: T } = w(), M = A.EventTarget && new A.EventTarget() || "none";
        function k(e10) {
          if ("function" == typeof A.MouseEvent) return new A.MouseEvent(e10.type, e10);
          if (E == null ? void 0 : E.createEvent) {
            let t10 = E.createEvent("MouseEvent");
            if (t10.initMouseEvent) return t10.initMouseEvent(e10.type, e10.bubbles, e10.cancelable, e10.view || A, e10.detail, e10.screenX, e10.screenY, e10.clientX, e10.clientY, e10.ctrlKey, e10.altKey, e10.shiftKey, e10.metaKey, e10.button, e10.relatedTarget), t10;
          }
          return C(e10.type);
        }
        function C(e10, t10, i10) {
          let s10 = t10 || { x: 0, y: 0 };
          if ("function" == typeof A.MouseEvent) return new A.MouseEvent(e10, { bubbles: true, cancelable: true, composed: true, button: 0, buttons: 1, relatedTarget: i10 || M, view: A, detail: +("click" === e10), screenX: s10.x, screenY: s10.y, clientX: s10.x, clientY: s10.y });
          if (E == null ? void 0 : E.createEvent) {
            let t11 = E.createEvent("MouseEvent");
            if (t11.initMouseEvent) return t11.initMouseEvent(e10, true, true, A, +("click" === e10), s10.x, s10.y, s10.x, s10.y, false, false, false, false, 0, null), t11;
          }
          return { type: e10 };
        }
        let S = { addClass: function(e10, t10) {
          e10.classList ? e10.classList.add(t10) : 0 > e10.className.indexOf(t10) && (e10.className += " " + t10);
        }, cloneMouseEvent: k, cloneTouchEvent: function(e10) {
          let t10 = (e11) => {
            let t11 = [];
            for (let i11 = 0; i11 < e11.length; ++i11) {
              let s10 = e11.item(i11);
              s10 && t11.push(s10);
            }
            return t11;
          };
          if ("function" == typeof A.TouchEvent) {
            let i11 = new A.TouchEvent(e10.type, { touches: t10(e10.touches), targetTouches: t10(e10.targetTouches), changedTouches: t10(e10.changedTouches), ctrlKey: e10.ctrlKey, shiftKey: e10.shiftKey, altKey: e10.altKey, metaKey: e10.metaKey, bubbles: e10.bubbles, cancelable: e10.cancelable, composed: e10.composed, detail: e10.detail, view: e10.view });
            return e10.defaultPrevented && i11.preventDefault(), i11;
          }
          let i10 = k(e10);
          return i10.touches = e10.touches, i10.changedTouches = e10.changedTouches, i10.targetTouches = e10.targetTouches, i10;
        }, escapeStringForHTML: function(e10) {
          return e10.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/\//g, "&#x2F;");
        }, getElement: function(e10) {
          return E.getElementById(e10);
        }, getFakeMouseEvent: C, getHeadingTagNameForElement: function(e10) {
          let t10 = (e11) => "h" + Math.min(6, parseInt(e11.slice(1), 10) + 1), i10 = (e11) => /^H[1-6]$/i.test(e11), s10 = (e11) => {
            let r2 = ((e12) => {
              let t11 = e12;
              for (; t11 = t11.previousSibling; ) {
                let e13 = t11.tagName || "";
                if (i10(e13)) return e13;
              }
              return "";
            })(e11);
            if (r2) return t10(r2);
            let n2 = e11.parentElement;
            if (!n2) return "h6";
            let o2 = n2.tagName;
            return i10(o2) ? t10(o2) : s10(n2);
          };
          return s10(e10);
        }, removeChildNodes: function(e10) {
          for (; e10.lastChild; ) e10.removeChild(e10.lastChild);
        }, removeClass: function(e10, t10) {
          e10.classList ? e10.classList.remove(t10) : e10.className = e10.className.replace(RegExp(t10, "g"), "");
        }, removeElement: function(e10) {
          e10 && e10.parentNode && e10.parentNode.removeChild(e10);
        }, reverseChildNodes: function(e10) {
          let t10 = e10.childNodes.length;
          for (; t10--; ) e10.appendChild(e10.childNodes[t10]);
        }, simulatedEventTarget: M, stripHTMLTagsFromString: function(e10, t10 = false) {
          return "string" == typeof e10 ? t10 ? e10.replace(/<\/?[^>]+(>|$)/g, "") : e10.replace(/<\/?(?!\s)[^>]+(>|$)/g, "") : e10;
        }, visuallyHideElement: function(e10) {
          T(e10, { position: "absolute", width: "1px", height: "1px", overflow: "hidden", whiteSpace: "nowrap", clip: "rect(1px, 1px, 1px, 1px)", marginTop: "-3px", "-ms-filter": "progid:DXImageTransform.Microsoft.Alpha(Opacity=1)", filter: "alpha(opacity=1)", opacity: 0.01 });
        } };
        var P = f(984), D = f.n(P);
        let { format: N } = D(), { getNestedProperty: B, pick: I } = w();
        var F = u || (u = {});
        function O(e10, t10, i10) {
          let s10 = (e11, t11) => {
            let i11 = e11.slice(t11 || 0), s11 = i11.indexOf("{"), r3 = i11.indexOf("}");
            if (s11 > -1 && r3 > s11) return { statement: i11.substring(s11 + 1, r3), begin: t11 + s11 + 1, end: t11 + r3 };
          }, r2 = [], n2, o2, a2 = 0;
          do
            n2 = s10(e10, a2), (o2 = e10.substring(a2, n2 && n2.begin - 1)).length && r2.push({ value: o2, type: "constant" }), n2 && r2.push({ value: n2.statement, type: "statement" }), a2 = n2 ? n2.end + 1 : a2 + 1;
          while (n2);
          return r2.forEach((e11) => {
            "statement" === e11.type && (e11.value = (function(e12, t11) {
              let i11, s11, r3 = e12.indexOf("#each("), n3 = e12.indexOf("#plural("), o3 = e12.indexOf("["), a3 = e12.indexOf("]");
              if (r3 > -1) {
                let n4 = e12.slice(r3).indexOf(")") + r3, o4 = e12.substring(0, r3), a4 = e12.substring(n4 + 1), l3 = e12.substring(r3 + 6, n4).split(","), h2 = Number(l3[1]), c2;
                if (s11 = "", i11 = B(l3[0], t11)) {
                  c2 = (h2 = isNaN(h2) ? i11.length : h2) < 0 ? i11.length + h2 : Math.min(h2, i11.length);
                  for (let e13 = 0; e13 < c2; ++e13) s11 += o4 + i11[e13] + a4;
                }
                return s11.length ? s11 : "";
              }
              if (n3 > -1) {
                var l2;
                let i12 = e12.slice(n3).indexOf(")") + n3, r4 = e12.substring(n3 + 8, i12).split(",");
                switch (Number(B(r4[0], t11))) {
                  case 0:
                    s11 = I(r4[4], r4[1]);
                    break;
                  case 1:
                    s11 = I(r4[2], r4[1]);
                    break;
                  case 2:
                    s11 = I(r4[3], r4[1]);
                    break;
                  default:
                    s11 = r4[1];
                }
                return s11 ? (l2 = s11).trim && l2.trim() || l2.replace(/^\s+|\s+$/g, "") : "";
              }
              if (o3 > -1) {
                let s12, r4 = e12.substring(0, o3), n4 = Number(e12.substring(o3 + 1, a3));
                return i11 = B(r4, t11), !isNaN(n4) && i11 && (n4 < 0 ? void 0 === (s12 = i11[i11.length + n4]) && (s12 = i11[0]) : void 0 === (s12 = i11[n4]) && (s12 = i11[i11.length - 1])), void 0 !== s12 ? s12 : "";
              }
              return "{" + e12 + "}";
            })(e11.value, t10));
          }), N(r2.reduce((e11, t11) => e11 + t11.value, ""), t10, i10);
        }
        function R(e10, t10) {
          let i10 = e10.split("."), s10 = this.options.lang, r2 = 0;
          for (; r2 < i10.length; ++r2) s10 = s10 && s10[i10[r2]];
          return "string" == typeof s10 ? O(s10, t10, this) : "";
        }
        F.compose = function(e10) {
          let t10 = e10.prototype;
          t10.langFormat || (t10.langFormat = R);
        }, F.i18nFormat = O;
        let L = u, { doc: H } = w(), { stripHTMLTagsFromString: z } = S, { defined: q, find: U, fireEvent: G } = w();
        function K(e10) {
          if (e10.points && e10.points.length) {
            let t10 = U(e10.points, (e11) => !!e11.graphic);
            return t10 && t10.graphic && t10.graphic.element;
          }
        }
        function V(e10) {
          let t10 = K(e10);
          return t10 && t10.parentNode || e10.graph && e10.graph.element || e10.group && e10.group.element;
        }
        let W = { fireEventOnWrappedOrUnwrappedElement: function e10(t10, i10) {
          let s10 = i10.type, r2 = t10.hcEvents;
          (H == null ? void 0 : H.createEvent) && (t10.dispatchEvent || t10.fireEvent) ? t10.dispatchEvent ? t10.dispatchEvent(i10) : t10.fireEvent(s10, i10) : r2 && r2[s10] ? G(t10, s10, i10) : t10.element && e10(t10.element, i10);
        }, getChartTitle: function(e10) {
          return z(e10.options.title.text || e10.langFormat("accessibility.defaultChartTitle", { chart: e10 }), e10.renderer.forExport);
        }, getAxisDescription: function(e10) {
          var _a, _b;
          return e10 && (((_a = e10.options.accessibility) == null ? void 0 : _a.description) || ((_b = e10.axisTitle) == null ? void 0 : _b.textStr) || e10.options.id || e10.categories && e10.chart.langFormat("accessibility.axis.defaultAxisNames.categories", {}) || e10.dateTime && e10.chart.langFormat("accessibility.axis.defaultAxisNames.time", {}) || e10.chart.langFormat("accessibility.axis.defaultAxisNames.values", {}));
        }, getAxisRangeDescription: function(e10) {
          var t10, i10, s10;
          let r2, n2, o2, a2, l2, h2, c2, d2, u2, p2, g2, m2, b2 = e10.options || {};
          return b2.accessibility && void 0 !== b2.accessibility.rangeDescription ? b2.accessibility.rangeDescription : e10.categories ? (r2 = (t10 = e10).chart, t10.dataMax && t10.dataMin ? r2.langFormat("accessibility.axis.rangeCategories", { chart: r2, axis: t10, numCategories: t10.dataMax - t10.dataMin + 1 }) : "") : e10.dateTime && (0 === e10.min || 0 === e10.dataMin) ? (n2 = (i10 = e10).chart, o2 = {}, a2 = i10.dataMin || i10.min || 0, l2 = i10.dataMax || i10.max || 0, h2 = "Seconds", o2.Seconds = (l2 - a2) / 1e3, o2.Minutes = o2.Seconds / 60, o2.Hours = o2.Minutes / 60, o2.Days = o2.Hours / 24, ["Minutes", "Hours", "Days"].forEach(function(e11) {
            o2[e11] > 2 && (h2 = e11);
          }), c2 = o2[h2].toFixed(+("Seconds" !== h2 && "Minutes" !== h2)), n2.langFormat("accessibility.axis.timeRange" + h2, { chart: n2, axis: i10, range: c2.replace(".0", "") })) : (p2 = (u2 = (d2 = (s10 = e10).chart).options) && u2.accessibility && u2.accessibility.screenReaderSection.axisRangeDateFormat || "", g2 = { min: s10.dataMin || s10.min || 0, max: s10.dataMax || s10.max || 0 }, m2 = function(e11) {
            return s10.dateTime ? d2.time.dateFormat(p2, g2[e11]) : g2[e11].toString();
          }, d2.langFormat("accessibility.axis.rangeFromTo", { chart: d2, axis: s10, rangeFrom: m2("min"), rangeTo: m2("max") }));
        }, getPointFromXY: function(e10, t10, i10) {
          let s10 = e10.length, r2;
          for (; s10--; ) if (r2 = U(e10[s10].points || [], function(e11) {
            return e11.x === t10 && e11.y === i10;
          })) return r2;
        }, getSeriesFirstPointElement: K, getSeriesFromName: function(e10, t10) {
          return t10 ? (e10.series || []).filter(function(e11) {
            return e11.name === t10;
          }) : e10.series;
        }, getSeriesA11yElement: V, unhideChartElementFromAT: function e10(t10, i10) {
          i10.setAttribute("aria-hidden", false), i10 !== t10.renderTo && i10.parentNode && i10.parentNode !== H.body && (Array.prototype.forEach.call(i10.parentNode.childNodes, function(e11) {
            e11.hasAttribute("aria-hidden") || e11.setAttribute("aria-hidden", true);
          }), e10(t10, i10.parentNode));
        }, hideSeriesFromAT: function(e10) {
          let t10 = V(e10);
          t10 && t10.setAttribute("aria-hidden", true);
        }, scrollAxisToPoint: function(e10) {
          let t10 = e10.series.xAxis, i10 = e10.series.yAxis, s10 = t10 && t10.scrollbar ? t10 : i10, r2 = s10 && s10.scrollbar;
          if (r2 && q(r2.to) && q(r2.from)) {
            let t11 = r2.to - r2.from, i11 = (function(e11, t12) {
              if (!q(e11.dataMin) || !q(e11.dataMax)) return 0;
              let i12 = e11.toPixels(e11.dataMin), s11 = e11.toPixels(e11.dataMax), r3 = "xAxis" === e11.coll ? "x" : "y";
              return (e11.toPixels(t12[r3] || 0) - i12) / (s11 - i12);
            })(s10, e10);
            r2.updatePosition(i11 - t11 / 2, i11 + t11 / 2), G(r2, "changed", { from: r2.from, to: r2.to, trigger: "scrollbar", DOMEvent: null });
          }
        } }, { doc: X } = w(), { removeElement: Y } = S, j = class {
          constructor() {
            this.elements = [];
          }
          createElement() {
            let e10 = X.createElement.apply(X, arguments);
            return this.elements.push(e10), e10;
          }
          removeElement(e10) {
            Y(e10), this.elements.splice(this.elements.indexOf(e10), 1);
          }
          destroyCreatedElements() {
            this.elements.forEach(function(e10) {
              Y(e10);
            }), this.elements = [];
          }
        }, { addEvent: _ } = w(), Z = class {
          constructor() {
            this.eventRemovers = [];
          }
          addEvent() {
            let e10 = _.apply(w(), arguments);
            return this.eventRemovers.push({ element: arguments[0], remover: e10 }), e10;
          }
          removeEvent(e10) {
            let t10 = this.eventRemovers.map((e11) => e11.remover).indexOf(e10);
            this.eventRemovers[t10].remover(), this.eventRemovers.splice(t10, 1);
          }
          removeAddedEvents() {
            this.eventRemovers.map((e10) => e10.remover).forEach((e10) => e10()), this.eventRemovers = [];
          }
        }, { fireEventOnWrappedOrUnwrappedElement: $ } = W, { getFakeMouseEvent: Q } = S, J = class {
          destroy() {
          }
          getKeyboardNavigation() {
            return [];
          }
          init() {
          }
          onChartRender() {
          }
          onChartUpdate() {
          }
          initBase(e10, t10) {
            this.chart = e10, this.eventProvider = new Z(), this.domElementProvider = new j(), this.proxyProvider = t10, this.keyCodes = { left: 37, right: 39, up: 38, down: 40, enter: 13, space: 32, esc: 27, tab: 9, pageUp: 33, pageDown: 34, end: 35, home: 36 };
          }
          addEvent(e10, t10, i10, s10) {
            return this.eventProvider.addEvent(e10, t10, i10, s10);
          }
          createElement(e10, t10) {
            return this.domElementProvider.createElement(e10, t10);
          }
          fakeClickEvent(e10) {
            $(e10, Q("click"));
          }
          destroyBase() {
            this.domElementProvider.destroyCreatedElements(), this.eventProvider.removeAddedEvents();
          }
        }, { find: ee } = w(), et = class {
          constructor(e10, t10) {
            this.chart = e10, this.keyCodeMap = t10.keyCodeMap || [], this.validate = t10.validate, this.init = t10.init, this.terminate = t10.terminate, this.response = { success: 1, prev: 2, next: 3, noHandler: 4, fail: 5 };
          }
          run(e10) {
            let t10 = e10.which || e10.keyCode, i10 = this.response.noHandler, s10 = ee(this.keyCodeMap, function(e11) {
              return e11[0].indexOf(t10) > -1;
            });
            return s10 ? i10 = s10[1].call(this, t10, e10) : 9 === t10 && (i10 = this.response[e10.shiftKey ? "prev" : "next"]), i10;
          }
        }, { unhideChartElementFromAT: ei, getChartTitle: es } = W, { doc: er } = w(), { stripHTMLTagsFromString: en } = S, eo = class extends J {
          onChartUpdate() {
            this.handleSVGTitleElement(), this.setSVGContainerLabel(), this.setGraphicContainerAttrs(), this.setRenderToAttrs(), this.makeCreditsAccessible();
          }
          handleSVGTitleElement() {
            let e10 = this.chart, t10 = "highcharts-title-" + e10.index, i10 = en(e10.langFormat("accessibility.svgContainerTitle", { chartTitle: es(e10) }));
            if (i10.length) {
              let s10 = this.svgTitleElement = this.svgTitleElement || er.createElementNS("http://www.w3.org/2000/svg", "title");
              s10.textContent = i10, s10.id = t10, e10.renderTo.insertBefore(s10, e10.renderTo.firstChild);
            }
          }
          setSVGContainerLabel() {
            let e10 = this.chart, t10 = e10.langFormat("accessibility.svgContainerLabel", { chartTitle: es(e10) });
            e10.renderer.box && t10.length && e10.renderer.box.setAttribute("aria-label", t10);
          }
          setGraphicContainerAttrs() {
            let e10 = this.chart, t10 = e10.langFormat("accessibility.graphicContainerLabel", { chartTitle: es(e10) });
            t10.length && e10.container.setAttribute("aria-label", t10);
          }
          setRenderToAttrs() {
            let e10 = this.chart, t10 = "disabled" !== e10.options.accessibility.landmarkVerbosity, i10 = e10.langFormat("accessibility.chartContainerLabel", { title: es(e10), chart: e10 });
            i10 && (e10.renderTo.setAttribute("role", t10 ? "region" : "group"), e10.renderTo.setAttribute("aria-label", i10));
          }
          makeCreditsAccessible() {
            let e10 = this.chart, t10 = e10.credits;
            t10 && (t10.textStr && t10.element.setAttribute("aria-label", e10.langFormat("accessibility.credits", { creditsStr: en(t10.textStr, e10.renderer.forExport) })), ei(e10, t10.element));
          }
          getKeyboardNavigation() {
            let e10 = this.chart;
            return new et(e10, { keyCodeMap: [], validate: function() {
              return true;
            }, init: function() {
              let t10 = e10.accessibility;
              t10 && t10.keyboardNavigation.tabindexContainer.focus();
            } });
          }
          destroy() {
            this.chart.renderTo.setAttribute("aria-hidden", true);
          }
        }, { addEvent: ea, pick: el } = w();
        !(function(e10) {
          let t10 = ["x", "y", "transform", "width", "height", "r", "d", "stroke-width"];
          function i10() {
            let e11 = this.focusElement, t11 = this.options.accessibility.keyboardNavigation.focusBorder;
            e11 && (e11.removeFocusBorder(), t11.enabled && e11.addFocusBorder(t11.margin, { stroke: t11.style.color, strokeWidth: t11.style.lineWidth, r: t11.style.borderRadius }));
          }
          function s10(e11, t11) {
            let i11 = this.options.accessibility.keyboardNavigation.focusBorder, s11 = t11 || e11.element;
            s11 && s11.focus && (s11.hcEvents && s11.hcEvents.focusin || ea(s11, "focusin", function() {
            }), s11.focus(), i11.hideBrowserFocusOutline && (s11.style.outline = "none")), this.focusElement && this.focusElement.removeFocusBorder(), this.focusElement = e11, ea(this, "endResize", function() {
              this.renderFocusBorder();
            }), this.renderFocusBorder();
          }
          function r2(e11, i11) {
            this.focusBorder && this.removeFocusBorder();
            let s11 = this.getBBox(), r3 = el(e11, 3), n3 = this.parentGroup, o2 = this.scaleX || n3 && n3.scaleX, a2 = this.scaleY || n3 && n3.scaleY, l2 = (o2 ? !a2 : a2) ? Math.abs(o2 || a2 || 1) : (Math.abs(o2 || 1) + Math.abs(a2 || 1)) / 2, h2 = this.renderer.fontMetrics(this).h;
            s11.x += this.translateX ? this.translateX : 0, s11.y += this.translateY ? this.translateY : 0;
            let c2 = s11.x - r3, d2 = s11.y - r3, u2 = s11.width + 2 * r3, p2 = s11.height + 2 * r3, g2 = !!this.text;
            if ("text" === this.element.nodeName || g2) {
              let e12, t11, i12 = !!this.rotation, n4 = g2 ? { x: +!!i12, y: 0 } : (e12 = 0, t11 = 0, "middle" === this.attr("text-anchor") ? e12 = t11 = 0.5 : this.rotation ? e12 = 0.25 : t11 = 0.75, { x: e12, y: t11 }), o3 = +this.attr("x"), a3 = +this.attr("y");
              if (isNaN(o3) || (c2 = o3 - s11.width * n4.x - r3), isNaN(a3) || (d2 = a3 - ("start" === this.attr("text-anchor") ? h2 : s11.height) * n4.y - r3), g2 && i12) {
                let e13 = u2;
                u2 = p2, p2 = e13, isNaN(o3) || (c2 = o3 - s11.height * n4.x - r3), isNaN(a3) || (d2 = a3 - s11.width * n4.y - r3);
              }
            }
            this.focusBorder = this.renderer.rect(c2, d2, u2, p2, parseInt((i11 && i11.r || 0).toString(), 10) / l2).addClass("highcharts-focus-border").attr({ zIndex: 99 }).add(n3), this.renderer.styledMode || this.focusBorder.attr({ stroke: i11 && i11.stroke, "stroke-width": (i11 && i11.strokeWidth || 0) / l2 }), (function(e12, ...i12) {
              e12.focusBorderUpdateHooks || (e12.focusBorderUpdateHooks = {}, t10.forEach((t11) => {
                let s12 = t11 + "Setter", r4 = e12[s12] || e12._defaultSetter;
                e12.focusBorderUpdateHooks[s12] = r4, e12[s12] = function() {
                  let t12 = r4.apply(e12, arguments);
                  return e12.addFocusBorder.apply(e12, i12), t12;
                };
              }));
            })(this, e11, i11), (function(e12) {
              if (e12.focusBorderDestroyHook) return;
              let t11 = e12.destroy;
              e12.destroy = function() {
                return e12.focusBorder && e12.focusBorder.destroy && e12.focusBorder.destroy(), t11.apply(e12, arguments);
              }, e12.focusBorderDestroyHook = t11;
            })(this);
          }
          function n2() {
            var e11;
            e11 = this, e11.focusBorderUpdateHooks && (Object.keys(e11.focusBorderUpdateHooks).forEach((t11) => {
              let i11 = e11.focusBorderUpdateHooks[t11];
              i11 === e11._defaultSetter ? delete e11[t11] : e11[t11] = i11;
            }), delete e11.focusBorderUpdateHooks), this.focusBorderDestroyHook && (this.destroy = this.focusBorderDestroyHook, delete this.focusBorderDestroyHook), this.focusBorder && (this.focusBorder.destroy(), delete this.focusBorder);
          }
          e10.compose = function(e11, t11) {
            let o2 = e11.prototype, a2 = t11.prototype;
            o2.renderFocusBorder || (o2.renderFocusBorder = i10, o2.setFocusToElement = s10), a2.addFocusBorder || (a2.addFocusBorder = r2, a2.removeFocusBorder = n2);
          };
        })(p || (p = {}));
        let eh = p;
        var ec = f(660), ed = f.n(ec);
        let { doc: eu } = w(), { addClass: ep, visuallyHideElement: eg } = S, { attr: em } = w(), eb = class {
          constructor(e10, t10) {
            this.chart = e10, this.domElementProvider = new j(), this.announceRegion = this.addAnnounceRegion(t10);
          }
          destroy() {
            this.domElementProvider.destroyCreatedElements();
          }
          announce(e10) {
            ed().setElementHTML(this.announceRegion, e10), this.clearAnnouncementRegionTimer && clearTimeout(this.clearAnnouncementRegionTimer), this.clearAnnouncementRegionTimer = setTimeout(() => {
              this.announceRegion.innerHTML = ed().emptyHTML, delete this.clearAnnouncementRegionTimer;
            }, 3e3);
          }
          addAnnounceRegion(e10) {
            let t10 = this.chart.announcerContainer || this.createAnnouncerContainer(), i10 = this.domElementProvider.createElement("div");
            return em(i10, { "aria-hidden": false, "aria-live": e10, "aria-atomic": true }), this.chart.styledMode ? ep(i10, "highcharts-visually-hidden") : eg(i10), t10.appendChild(i10), i10;
          }
          createAnnouncerContainer() {
            let e10 = this.chart, t10 = eu.createElement("div");
            return em(t10, { "aria-hidden": false, class: "highcharts-announcer-container" }), t10.style.position = "relative", e10.renderTo.insertBefore(t10, e10.renderTo.firstChild), e10.announcerContainer = t10, t10;
          }
        }, { escapeStringForHTML: ex, stripHTMLTagsFromString: ef } = S;
        function ey(e10) {
          return (e10.annotations || []).reduce((e11, t10) => (t10.options && false !== t10.options.visible && (e11 = e11.concat(t10.labels)), e11), []);
        }
        function ev(e10) {
          return e10.options && e10.options.accessibility && e10.options.accessibility.description || e10.graphic && e10.graphic.text && e10.graphic.text.textStr || "";
        }
        function ew(e10) {
          let t10 = e10.options && e10.options.accessibility && e10.options.accessibility.description;
          if (t10) return t10;
          let i10 = e10.chart, s10 = ev(e10), r2 = e10.points.filter((e11) => !!e11.graphic).map((e11) => {
            let t11 = e11.accessibility && e11.accessibility.valueDescription || e11.graphic && e11.graphic.element && e11.graphic.element.getAttribute("aria-label") || "", i11 = e11 && e11.series.name || "";
            return (i11 ? i11 + ", " : "") + "data point " + t11;
          }).filter((e11) => !!e11), n2 = r2.length, o2 = n2 > 1 ? "MultiplePoints" : n2 ? "SinglePoint" : "NoPoints", a2 = { annotationText: s10, annotation: e10, numPoints: n2, annotationPoint: r2[0], additionalAnnotationPoints: r2.slice(1) };
          return i10.langFormat("accessibility.screenReaderSection.annotations.description" + o2, a2);
        }
        function eE(e10) {
          return ey(e10).map((t10) => {
            let i10 = ex(ef(ew(t10), e10.renderer.forExport));
            return i10 ? `<li>${i10}</li>` : "";
          });
        }
        let eA = { getAnnotationsInfoHTML: function(e10) {
          let t10 = e10.annotations;
          if (!(t10 && t10.length)) return "";
          let i10 = eE(e10);
          return `<ul style="list-style-type: none">${i10.join(" ")}</ul>`;
        }, getAnnotationLabelDescription: ew, getAnnotationListItems: eE, getPointAnnotationTexts: function(e10) {
          let t10 = ey(e10.series.chart).filter((t11) => t11.points.indexOf(e10) > -1);
          return t10.length ? t10.map((e11) => `${ev(e11)}`) : [];
        } }, { getAnnotationsInfoHTML: eT } = eA, { getAxisDescription: eM, getAxisRangeDescription: ek, getChartTitle: eC, unhideChartElementFromAT: eS } = W, { format: eP } = D(), { doc: eD } = w(), { addClass: eN, getElement: eB, getHeadingTagNameForElement: eI, stripHTMLTagsFromString: eF, visuallyHideElement: eO } = S, { attr: eR, pick: eL, replaceNested: eH } = w();
        function ez(e10) {
          return eH(e10, [/<([\w\-.:!]+)\b[^<>]*>\s*<\/\1>/g, ""]);
        }
        let eq = class extends J {
          constructor() {
            super(...arguments), this.screenReaderSections = {};
          }
          init() {
            let e10 = this.chart, t10 = this;
            this.initRegionsDefinitions(), this.addEvent(e10, "afterGetTableAST", function(e11) {
              t10.onDataTableCreated(e11);
            }), this.addEvent(e10, "afterViewData", function(e11) {
              e11.wasHidden && (t10.dataTableDiv = e11.element, setTimeout(function() {
                t10.focusDataTable();
              }, 300));
            }), this.addEvent(e10, "afterHideData", function() {
              t10.viewDataTableButton && t10.viewDataTableButton.setAttribute("aria-expanded", "false");
            }), e10.exporting && this.addEvent(e10, "afterPrint", function() {
              t10.updateAllScreenReaderSections();
            }), this.announcer = new eb(e10, "assertive");
          }
          initRegionsDefinitions() {
            let e10 = this, t10 = this.chart.options.accessibility;
            this.screenReaderSections = { before: { element: null, buildContent: function(i10) {
              let s10 = t10.screenReaderSection.beforeChartFormatter;
              return s10 ? s10(i10) : e10.defaultBeforeChartFormatter(i10);
            }, insertIntoDOM: function(e11, t11) {
              t11.renderTo.insertBefore(e11, t11.renderTo.firstChild);
            }, afterInserted: function() {
              void 0 !== e10.sonifyButtonId && e10.initSonifyButton(e10.sonifyButtonId), void 0 !== e10.dataTableButtonId && e10.initDataTableButton(e10.dataTableButtonId);
            } }, after: { element: null, buildContent: function(i10) {
              let s10 = t10.screenReaderSection.afterChartFormatter;
              return s10 ? s10(i10) : e10.defaultAfterChartFormatter();
            }, insertIntoDOM: function(e11, t11) {
              t11.renderTo.insertBefore(e11, t11.container.nextSibling);
            }, afterInserted: function() {
              e10.chart.accessibility && t10.keyboardNavigation.enabled && e10.chart.accessibility.keyboardNavigation.updateExitAnchor();
            } } };
          }
          onChartRender() {
            this.linkedDescriptionElement = this.getLinkedDescriptionElement(), this.setLinkedDescriptionAttrs(), this.updateAllScreenReaderSections();
          }
          updateAllScreenReaderSections() {
            let e10 = this;
            Object.keys(this.screenReaderSections).forEach(function(t10) {
              e10.updateScreenReaderSection(t10);
            });
          }
          getLinkedDescriptionElement() {
            let e10 = this.chart.options.accessibility.linkedDescription;
            if (!e10) return;
            if ("string" != typeof e10) return e10;
            let t10 = eP(e10, this.chart), i10 = eD.querySelectorAll(t10);
            if (1 === i10.length) return i10[0];
          }
          setLinkedDescriptionAttrs() {
            let e10 = this.linkedDescriptionElement;
            e10 && (e10.setAttribute("aria-hidden", "true"), eN(e10, "highcharts-linked-description"));
          }
          updateScreenReaderSection(e10) {
            let t10 = this.chart, i10 = this.screenReaderSections[e10], s10 = i10.buildContent(t10), r2 = i10.element = i10.element || this.createElement("div"), n2 = r2.firstChild || this.createElement("div");
            s10 ? (this.setScreenReaderSectionAttribs(r2, e10), ed().setElementHTML(n2, s10), r2.appendChild(n2), i10.insertIntoDOM(r2, t10), t10.styledMode ? eN(n2, "highcharts-visually-hidden") : eO(n2), eS(t10, n2), i10.afterInserted && i10.afterInserted()) : (r2.parentNode && r2.parentNode.removeChild(r2), i10.element = null);
          }
          setScreenReaderSectionAttribs(e10, t10) {
            let i10 = this.chart, s10 = i10.langFormat("accessibility.screenReaderSection." + t10 + "RegionLabel", { chart: i10, chartTitle: eC(i10) });
            eR(e10, { id: `highcharts-screen-reader-region-${t10}-${i10.index}`, "aria-label": s10 || void 0 }), e10.style.position = "relative", s10 && e10.setAttribute("role", "all" === i10.options.accessibility.landmarkVerbosity ? "region" : "group");
          }
          defaultBeforeChartFormatter() {
            var _a;
            let e10 = this.chart, t10 = e10.options.accessibility.screenReaderSection.beforeChartFormat;
            if (!t10) return "";
            let i10 = this.getAxesDescription(), s10 = e10.sonify && e10.options.sonification && e10.options.sonification.enabled, r2 = "highcharts-a11y-sonify-data-btn-" + e10.index, n2 = "hc-linkto-highcharts-data-table-" + e10.index, o2 = eT(e10), a2 = e10.langFormat("accessibility.screenReaderSection.annotations.heading", { chart: e10 }), l2 = { headingTagName: eI(e10.renderTo), chartTitle: eC(e10), typeDescription: this.getTypeDescriptionText(), chartSubtitle: this.getSubtitleText(), chartLongdesc: this.getLongdescText(), xAxisDescription: i10.xAxis, yAxisDescription: i10.yAxis, playAsSoundButton: s10 ? this.getSonifyButtonText(r2) : "", viewTableButton: ((_a = e10.exporting) == null ? void 0 : _a.getCSV) ? this.getDataTableButtonText(n2) : "", annotationsTitle: o2 ? a2 : "", annotationsList: o2 }, h2 = L.i18nFormat(t10, l2, e10);
            return this.dataTableButtonId = n2, this.sonifyButtonId = r2, ez(h2);
          }
          defaultAfterChartFormatter() {
            let e10 = this.chart, t10 = e10.options.accessibility.screenReaderSection.afterChartFormat;
            if (!t10) return "";
            let i10 = { endOfChartMarker: this.getEndOfChartMarkerText() };
            return ez(L.i18nFormat(t10, i10, e10));
          }
          getLinkedDescription() {
            let e10 = this.linkedDescriptionElement;
            return eF(e10 && e10.innerHTML || "", this.chart.renderer.forExport);
          }
          getLongdescText() {
            let e10 = this.chart.options, t10 = e10.caption, i10 = t10 && t10.text, s10 = this.getLinkedDescription();
            return e10.accessibility.description || s10 || i10 || "";
          }
          getTypeDescriptionText() {
            let e10 = this.chart;
            return e10.types ? e10.options.accessibility.typeDescription || (function(e11, t10) {
              let i10, s10, r2, n2 = t10[0], o2 = e11.series && e11.series[0] || {}, a2 = e11.mapView && e11.mapView.geoMap && e11.mapView.geoMap.title, l2 = { numSeries: e11.series.length, numPoints: o2.points && o2.points.length, chart: e11, mapTitle: a2 };
              return n2 ? "map" === n2 || "tiledwebmap" === n2 ? l2.mapTitle ? e11.langFormat("accessibility.chartTypes.mapTypeDescription", l2) : e11.langFormat("accessibility.chartTypes.unknownMap", l2) : e11.types.length > 1 ? e11.langFormat("accessibility.chartTypes.combinationChart", l2) : (i10 = t10[0], s10 = e11.langFormat("accessibility.seriesTypeDescriptions." + i10, l2), r2 = e11.series && e11.series.length < 2 ? "Single" : "Multiple", (e11.langFormat("accessibility.chartTypes." + i10 + r2, l2) || e11.langFormat("accessibility.chartTypes.default" + r2, l2)) + (s10 ? " " + s10 : "")) : e11.langFormat("accessibility.chartTypes.emptyChart", l2);
            })(e10, e10.types) : "";
          }
          getDataTableButtonText(e10) {
            let t10 = this.chart;
            return '<button id="' + e10 + '">' + t10.langFormat("accessibility.table.viewAsDataTableButtonText", { chart: t10, chartTitle: eC(t10) }) + "</button>";
          }
          getSonifyButtonText(e10) {
            let t10 = this.chart;
            return t10.options.sonification && false === t10.options.sonification.enabled ? "" : '<button id="' + e10 + '">' + t10.langFormat("accessibility.sonification.playAsSoundButtonText", { chart: t10, chartTitle: eC(t10) }) + "</button>";
          }
          getSubtitleText() {
            let e10 = this.chart.options.subtitle;
            return eF(e10 && e10.text || "", this.chart.renderer.forExport);
          }
          getEndOfChartMarkerText() {
            let e10 = eB(`highcharts-end-of-chart-marker-${this.chart.index}`);
            if (e10) return e10.outerHTML;
            let t10 = this.chart, i10 = t10.langFormat("accessibility.screenReaderSection.endOfChartMarker", { chart: t10 });
            return '<div id="highcharts-end-of-chart-marker-' + t10.index + '">' + i10 + "</div>";
          }
          onDataTableCreated(e10) {
            let t10 = this.chart;
            if (t10.options.accessibility.enabled) {
              this.viewDataTableButton && this.viewDataTableButton.setAttribute("aria-expanded", "true");
              let i10 = e10.tree.attributes || {};
              i10.tabindex = -1, i10.summary = t10.langFormat("accessibility.table.tableSummary", { chart: t10 }), e10.tree.attributes = i10;
            }
          }
          focusDataTable() {
            let e10 = this.dataTableDiv, t10 = e10 && e10.getElementsByTagName("table")[0];
            t10 && t10.focus && t10.focus();
          }
          initSonifyButton(e10) {
            let t10 = this.sonifyButton = eB(e10), i10 = this.chart, s10 = (e11) => {
              t10 && (t10.setAttribute("aria-hidden", "true"), t10.setAttribute("aria-label", "")), e11.preventDefault(), e11.stopPropagation();
              let s11 = i10.langFormat("accessibility.sonification.playAsSoundClickAnnouncement", { chart: i10 });
              this.announcer.announce(s11), setTimeout(() => {
                t10 && (t10.removeAttribute("aria-hidden"), t10.removeAttribute("aria-label")), i10.sonify && i10.sonify();
              }, 1e3);
            };
            t10 && i10 && (t10.setAttribute("tabindex", -1), t10.onclick = function(e11) {
              (i10.options.accessibility && i10.options.accessibility.screenReaderSection.onPlayAsSoundClick || s10).call(this, e11, i10);
            });
          }
          initDataTableButton(e10) {
            let t10 = this.viewDataTableButton = eB(e10), i10 = this.chart, s10 = e10.replace("hc-linkto-", "");
            t10 && (eR(t10, { tabindex: -1, "aria-expanded": !!eB(s10) }), t10.onclick = i10.options.accessibility.screenReaderSection.onViewDataTableClick || function() {
              var _a;
              (_a = i10.exporting) == null ? void 0 : _a.viewData();
            });
          }
          getAxesDescription() {
            let e10 = this.chart, t10 = function(t11, i11) {
              let s11 = e10[t11];
              return s11.length > 1 || s11[0] && eL(s11[0].options.accessibility && s11[0].options.accessibility.enabled, i11);
            }, i10 = !!e10.types && 0 > e10.types.indexOf("map") && 0 > e10.types.indexOf("treemap") && 0 > e10.types.indexOf("tilemap"), s10 = !!e10.hasCartesianSeries, r2 = t10("xAxis", !e10.angular && s10 && i10), n2 = t10("yAxis", s10 && i10), o2 = {};
            return r2 && (o2.xAxis = this.getAxisDescriptionText("xAxis")), n2 && (o2.yAxis = this.getAxisDescriptionText("yAxis")), o2;
          }
          getAxisDescriptionText(e10) {
            let t10 = this.chart, i10 = t10[e10];
            return t10.langFormat("accessibility.axis." + e10 + "Description" + (i10.length > 1 ? "Plural" : "Singular"), { chart: t10, names: i10.map(function(e11) {
              return eM(e11);
            }), ranges: i10.map(function(e11) {
              return ek(e11);
            }), numAxes: i10.length });
          }
          destroy() {
            this.announcer && this.announcer.destroy();
          }
        }, { attr: eU } = w(), { getChartTitle: eG, unhideChartElementFromAT: eK } = W, { getFakeMouseEvent: eV } = S;
        function eW(e10) {
          var _a, _b;
          return (_b = (_a = e10.exporting) == null ? void 0 : _a.svgElements) == null ? void 0 : _b[0];
        }
        class eX extends J {
          init() {
            let e10 = this.chart, t10 = this;
            this.addEvent(e10, "exportMenuShown", function() {
              t10.onMenuShown();
            }), this.addEvent(e10, "exportMenuHidden", function() {
              t10.onMenuHidden();
            }), this.createProxyGroup();
          }
          onMenuHidden() {
            var _a;
            let e10 = (_a = this.chart.exporting) == null ? void 0 : _a.contextMenuEl;
            e10 && e10.setAttribute("aria-hidden", "true"), this.setExportButtonExpandedState("false");
          }
          onMenuShown() {
            var _a;
            let e10 = this.chart, t10 = (_a = e10.exporting) == null ? void 0 : _a.contextMenuEl;
            t10 && (this.addAccessibleContextMenuAttribs(), eK(e10, t10)), this.setExportButtonExpandedState("true");
          }
          setExportButtonExpandedState(e10) {
            this.exportButtonProxy && this.exportButtonProxy.innerElement.setAttribute("aria-expanded", e10);
          }
          onChartRender() {
            var _a;
            let e10 = this.chart, t10 = e10.focusElement, i10 = e10.accessibility;
            this.proxyProvider.clearGroup("chartMenu"), this.proxyMenuButton(), this.exportButtonProxy && t10 && t10 === ((_a = e10.exporting) == null ? void 0 : _a.group) && (t10.focusBorder ? e10.setFocusToElement(t10, this.exportButtonProxy.innerElement) : i10 && i10.keyboardNavigation.tabindexContainer.focus());
          }
          proxyMenuButton() {
            let e10, t10, i10 = this.chart, s10 = this.proxyProvider, r2 = eW(i10);
            e10 = i10.options.exporting, t10 = eW(i10), e10 && false !== e10.enabled && e10.accessibility && e10.accessibility.enabled && t10 && t10.element && r2 && (this.exportButtonProxy = s10.addProxyElement("chartMenu", { click: r2 }, "button", { "aria-label": i10.langFormat("accessibility.exporting.menuButtonLabel", { chart: i10, chartTitle: eG(i10) }), "aria-expanded": false, title: i10.options.lang.contextButtonTitle || null }));
          }
          createProxyGroup() {
            this.chart && this.proxyProvider && this.proxyProvider.addGroup("chartMenu");
          }
          addAccessibleContextMenuAttribs() {
            var _a;
            let e10 = this.chart, t10 = (_a = e10.exporting) == null ? void 0 : _a.divElements;
            if (t10 && t10.length) {
              t10.forEach((e11) => {
                e11 && ("LI" !== e11.tagName || e11.children && e11.children.length ? e11.setAttribute("aria-hidden", "true") : e11.setAttribute("tabindex", -1));
              });
              let i10 = t10[0] && t10[0].parentNode;
              i10 && eU(i10, { "aria-hidden": void 0, "aria-label": e10.langFormat("accessibility.exporting.chartMenuLabel", { chart: e10 }), role: "list" });
            }
          }
          getKeyboardNavigation() {
            let e10 = this.keyCodes, t10 = this.chart, i10 = this;
            return new et(t10, { keyCodeMap: [[[e10.left, e10.up], function() {
              return i10.onKbdPrevious(this);
            }], [[e10.right, e10.down], function() {
              return i10.onKbdNext(this);
            }], [[e10.enter, e10.space], function() {
              return i10.onKbdClick(this);
            }]], validate: function() {
              var _a, _b, _c;
              return !!t10.exporting && ((_b = (_a = t10.options.exporting) == null ? void 0 : _a.buttons) == null ? void 0 : _b.contextButton.enabled) !== false && false !== t10.options.exporting.enabled && false !== (((_c = t10.options.exporting.accessibility) == null ? void 0 : _c.enabled) || false);
            }, init: function() {
              var _a;
              let e11 = i10.exportButtonProxy, s10 = (_a = i10.chart.exporting) == null ? void 0 : _a.group;
              e11 && s10 && t10.setFocusToElement(s10, e11.innerElement);
            }, terminate: function() {
              t10.hideExportMenu();
            } });
          }
          onKbdPrevious(e10) {
            let t10 = this.chart, i10 = t10.options.accessibility, s10 = e10.response, r2 = t10.highlightedExportItemIx || 0;
            for (; r2--; ) if (t10.highlightExportItem(r2)) return s10.success;
            return i10.keyboardNavigation.wrapAround ? (t10.highlightLastExportItem(), s10.success) : s10.prev;
          }
          onKbdNext(e10) {
            var _a, _b;
            let t10 = this.chart, i10 = t10.options.accessibility, s10 = e10.response;
            for (let e11 = (t10.highlightedExportItemIx || 0) + 1; e11 < (((_b = (_a = t10.exporting) == null ? void 0 : _a.divElements) == null ? void 0 : _b.length) || 0); ++e11) if (t10.highlightExportItem(e11)) return s10.success;
            return i10.keyboardNavigation.wrapAround ? (t10.highlightExportItem(0), s10.success) : s10.next;
          }
          onKbdClick(e10) {
            var _a, _b, _c, _d;
            let t10 = this.chart, i10 = void 0 !== t10.highlightedExportItemIx && ((_b = (_a = t10.exporting) == null ? void 0 : _a.divElements) == null ? void 0 : _b[t10.highlightedExportItemIx]), s10 = (_c = eW(t10)) == null ? void 0 : _c.element;
            return ((_d = t10.exporting) == null ? void 0 : _d.openMenu) ? i10 && this.fakeClickEvent(i10) : (s10 && this.fakeClickEvent(s10), t10.highlightExportItem(0)), e10.response.success;
          }
        }
        !(function(e10) {
          function t10() {
            let e11 = eW(this);
            if (e11) {
              let t11 = e11.element;
              t11.onclick && (t11.onclick = function() {
                eV("click");
              });
            }
          }
          function i10() {
            var _a, _b, _c;
            let e11 = (_a = this.exporting) == null ? void 0 : _a.divElements;
            e11 && ((_b = this.exporting) == null ? void 0 : _b.contextMenuEl) && ((_c = this.exporting) == null ? void 0 : _c.openMenu) && (e11.forEach((e12) => {
              e12 && "highcharts-menu-item" === e12.className && e12.onmouseout && e12.onmouseout(eV("mouseout"));
            }), this.highlightedExportItemIx = 0, this.exporting.contextMenuEl.hideMenu(), this.container.focus());
          }
          function s10(e11) {
            var _a, _b, _c, _d;
            let t11 = (_b = (_a = this.exporting) == null ? void 0 : _a.divElements) == null ? void 0 : _b[e11], i11 = void 0 !== this.highlightedExportItemIx && ((_d = (_c = this.exporting) == null ? void 0 : _c.divElements) == null ? void 0 : _d[this.highlightedExportItemIx]);
            if (t11 && "LI" === t11.tagName && !(t11.children && t11.children.length)) {
              let s11 = !!(this.renderTo.getElementsByTagName("g")[0] || {}).focus;
              return t11.focus && s11 && t11.focus(), i11 && i11.onmouseout && i11.onmouseout(eV("mouseout")), t11.onmouseover && t11.onmouseover(eV("mouseover")), this.highlightedExportItemIx = e11, true;
            }
            return false;
          }
          function r2() {
            var _a, _b;
            if ((_a = this.exporting) == null ? void 0 : _a.divElements) {
              let e11 = (_b = this.exporting) == null ? void 0 : _b.divElements.length;
              for (; e11--; ) if (this.highlightExportItem(e11)) return true;
            }
            return false;
          }
          e10.compose = function(e11) {
            let n2 = e11.prototype;
            n2.hideExportMenu || (n2.hideExportMenu = i10, n2.highlightExportItem = s10, n2.highlightLastExportItem = r2, n2.showExportMenu = t10);
          };
        })(eX || (eX = {}));
        let eY = eX, { doc: ej, win: e_ } = w(), { addEvent: eZ, defined: e$, fireEvent: eQ } = w(), { getElement: eJ, simulatedEventTarget: e0 } = S;
        class e1 {
          constructor(e10, t10) {
            this.currentModuleIx = NaN, this.modules = [], this.init(e10, t10);
          }
          init(e10, t10) {
            let i10 = this.eventProvider = new Z();
            this.chart = e10, this.components = t10, this.modules = [], this.currentModuleIx = 0, this.update(), i10.addEvent(this.tabindexContainer, "keydown", (e11) => this.onKeydown(e11)), i10.addEvent(this.tabindexContainer, "focus", (e11) => this.onFocus(e11)), ["mouseup", "touchend"].forEach((e11) => i10.addEvent(ej, e11, (e12) => this.onMouseUp(e12))), ["mousedown", "touchstart"].forEach((t11) => i10.addEvent(e10.renderTo, t11, () => {
              this.isClickingChart = true;
            }));
          }
          update(e10) {
            let t10 = this.chart.options.accessibility, i10 = t10 && t10.keyboardNavigation, s10 = this.components;
            this.updateContainerTabindex(), i10 && i10.enabled && e10 && e10.length ? (this.modules = e10.reduce(function(e11, t11) {
              let i11 = s10[t11].getKeyboardNavigation();
              return e11.concat(i11);
            }, []), this.updateExitAnchor()) : (this.modules = [], this.currentModuleIx = 0, this.removeExitAnchor());
          }
          updateExitAnchor() {
            let e10 = eJ(`highcharts-end-of-chart-marker-${this.chart.index}`);
            this.removeExitAnchor(), e10 ? (this.makeElementAnExitAnchor(e10), this.exitAnchor = e10) : this.createExitAnchor();
          }
          move(e10) {
            let t10 = this.modules && this.modules[this.currentModuleIx];
            t10 && t10.terminate && t10.terminate(e10), this.chart.focusElement && this.chart.focusElement.removeFocusBorder(), this.currentModuleIx += e10;
            let i10 = this.modules && this.modules[this.currentModuleIx];
            if (i10) {
              if (i10.validate && !i10.validate()) return this.move(e10);
              if (i10.init) return i10.init(e10), true;
            }
            return this.currentModuleIx = 0, this.exiting = true, e10 > 0 ? this.exitAnchor && this.exitAnchor.focus() : this.tabindexContainer.focus(), false;
          }
          onFocus(e10) {
            let t10 = this.chart, i10 = e10.relatedTarget && t10.container.contains(e10.relatedTarget), s10 = t10.options.accessibility, r2 = s10 && s10.keyboardNavigation;
            if (r2 && r2.enabled && !this.exiting && !this.tabbingInBackwards && !this.isClickingChart && !i10) {
              let e11 = this.getFirstValidModuleIx();
              null !== e11 && (this.currentModuleIx = e11, this.modules[e11].init(1));
            }
            this.keyboardReset = false, this.exiting = false;
          }
          onMouseUp(e10) {
            if (delete this.isClickingChart, !this.keyboardReset && e10.relatedTarget !== e0) {
              let t10 = this.chart;
              if (!e10.target || !t10.container.contains(e10.target)) {
                let e11 = this.modules && this.modules[this.currentModuleIx || 0];
                e11 && e11.terminate && e11.terminate(), this.currentModuleIx = 0;
              }
              t10.focusElement && (t10.focusElement.removeFocusBorder(), delete t10.focusElement), this.keyboardReset = true;
            }
          }
          onKeydown(e10) {
            let t10, i10 = e10 || e_.event, s10 = this.modules && this.modules.length && this.modules[this.currentModuleIx], r2 = i10.target;
            if ((!r2 || "INPUT" !== r2.nodeName || r2.classList.contains("highcharts-a11y-proxy-element")) && (this.keyboardReset = false, this.exiting = false, s10)) {
              let e11 = s10.run(i10);
              e11 === s10.response.success ? t10 = true : e11 === s10.response.prev ? t10 = this.move(-1) : e11 === s10.response.next && (t10 = this.move(1)), t10 && (i10.preventDefault(), i10.stopPropagation());
            }
          }
          updateContainerTabindex() {
            let e10, t10 = this.chart.options.accessibility, i10 = t10 && t10.keyboardNavigation, s10 = !(i10 && false === i10.enabled), r2 = this.chart, n2 = r2.container;
            r2.renderTo.hasAttribute("tabindex") ? (n2.removeAttribute("tabindex"), e10 = r2.renderTo) : e10 = n2, this.tabindexContainer = e10;
            let o2 = e10.getAttribute("tabindex");
            s10 && !o2 ? e10.setAttribute("tabindex", "0") : s10 || r2.container.removeAttribute("tabindex");
          }
          createExitAnchor() {
            let e10 = this.chart, t10 = this.exitAnchor = ej.createElement("div");
            e10.renderTo.appendChild(t10), this.makeElementAnExitAnchor(t10);
          }
          makeElementAnExitAnchor(e10) {
            let t10 = this.tabindexContainer.getAttribute("tabindex") || 0;
            e10.setAttribute("class", "highcharts-exit-anchor"), e10.setAttribute("tabindex", t10), e10.setAttribute("aria-hidden", false), this.addExitAnchorEventsToEl(e10);
          }
          removeExitAnchor() {
            if (this.exitAnchor) {
              let e10 = this.eventProvider.eventRemovers.find((e11) => e11.element === this.exitAnchor);
              e10 && e$(e10.remover) && this.eventProvider.removeEvent(e10.remover), this.exitAnchor.parentNode && this.exitAnchor.parentNode.removeChild(this.exitAnchor), delete this.exitAnchor;
            }
          }
          addExitAnchorEventsToEl(e10) {
            let t10 = this.chart, i10 = this;
            this.eventProvider.addEvent(e10, "focus", function(e11) {
              let s10 = e11 || e_.event, r2 = !(s10.relatedTarget && t10.container.contains(s10.relatedTarget) || i10.exiting);
              if (t10.focusElement && delete t10.focusElement, r2) {
                if (i10.tabbingInBackwards = true, i10.tabindexContainer.focus(), delete i10.tabbingInBackwards, s10.preventDefault(), i10.modules && i10.modules.length) {
                  i10.currentModuleIx = i10.modules.length - 1;
                  let e12 = i10.modules[i10.currentModuleIx];
                  e12 && e12.validate && !e12.validate() ? i10.move(-1) : e12 && e12.init(-1);
                }
              } else i10.exiting = false;
            });
          }
          getFirstValidModuleIx() {
            let e10 = this.modules.length;
            for (let t10 = 0; t10 < e10; ++t10) {
              let e11 = this.modules[t10];
              if (!e11.validate || e11.validate()) return t10;
            }
            return null;
          }
          destroy() {
            this.removeExitAnchor(), this.eventProvider.removeAddedEvents(), this.chart.container.removeAttribute("tabindex");
          }
        }
        function e2() {
          let e10 = this;
          eQ(this, "dismissPopupContent", {}, function() {
            e10.tooltip && e10.tooltip.hide(0), e10.hideExportMenu();
          });
        }
        function e3(e10) {
          27 === (e10.which || e10.keyCode) && w().charts && w().charts.forEach((e11) => {
            e11 && e11.dismissPopupContent && e11.dismissPopupContent();
          });
        }
        (e1 || (e1 = {})).compose = function(e10) {
          eY.compose(e10);
          let t10 = e10.prototype;
          return !t10.dismissPopupContent && (t10.dismissPopupContent = e2, ej && eZ(ej, "keydown", e3)), e10;
        };
        let e5 = e1;
        var e4 = f(632), e6 = f.n(e4);
        let { animObject: e9 } = w(), { doc: e8 } = w(), { addEvent: e7, fireEvent: te, isNumber: tt, pick: ti, syncTimeout: ts } = w(), { getChartTitle: tr } = W, { stripHTMLTagsFromString: tn, addClass: to, removeClass: ta } = S;
        function tl(e10) {
          let t10 = e10.legend && e10.legend.allItems, i10 = e10.options.legend.accessibility || {}, s10 = e10.colorAxis && e10.colorAxis.some((e11) => !e11.dataClasses || !e11.dataClasses.length);
          return !!(t10 && t10.length && !s10 && false !== i10.enabled);
        }
        function th(e10, t10) {
          let i10 = t10.legendItem || {};
          for (let s10 of (t10.setState(e10 ? "hover" : "", true), ["group", "label", "symbol"])) {
            let t11 = i10[s10], r2 = t11 && t11.element || t11;
            r2 && te(r2, e10 ? "mouseover" : "mouseout");
          }
        }
        class tc extends J {
          constructor() {
            super(...arguments), this.highlightedLegendItemIx = NaN, this.proxyGroup = null;
          }
          init() {
            let e10 = this;
            this.recreateProxies(), this.addEvent(e6(), "afterScroll", function() {
              this.chart === e10.chart && (e10.proxyProvider.updateGroupProxyElementPositions("legend"), e10.updateLegendItemProxyVisibility(), e10.highlightedLegendItemIx > -1 && this.chart.highlightLegendItem(e10.highlightedLegendItemIx));
            }), this.addEvent(e6(), "afterPositionItem", function(t10) {
              this.chart === e10.chart && this.chart.renderer && e10.updateProxyPositionForItem(t10.item);
            }), this.addEvent(e6(), "afterRender", function() {
              this.chart === e10.chart && this.chart.renderer && e10.recreateProxies() && ts(() => e10.proxyProvider.updateGroupProxyElementPositions("legend"), e9(ti(this.chart.renderer.globalAnimation, true)).duration);
            });
          }
          updateLegendItemProxyVisibility() {
            let e10, t10 = this.chart, i10 = t10.legend, s10 = i10.allItems || [], r2 = i10.currentPage || 1, n2 = i10.clipHeight || 0;
            s10.forEach((s11) => {
              if (s11.a11yProxyElement) {
                let o2 = i10.pages && i10.pages.length, a2 = s11.a11yProxyElement.element, l2 = false;
                if (e10 = s11.legendItem || {}, o2) {
                  let t11 = e10.pageIx || 0;
                  l2 = (e10.y || 0) + (e10.label ? Math.round(e10.label.getBBox().height) : 0) - i10.pages[t11] > n2 || t11 !== r2 - 1;
                }
                l2 ? t10.styledMode ? to(a2, "highcharts-a11y-invisible") : a2.style.visibility = "hidden" : (ta(a2, "highcharts-a11y-invisible"), a2.style.visibility = "");
              }
            });
          }
          onChartRender() {
            tl(this.chart) || this.removeProxies();
          }
          highlightAdjacentLegendPage(e10) {
            let t10 = this.chart, i10 = t10.legend, s10 = (i10.currentPage || 1) + e10, r2 = i10.pages || [];
            if (s10 > 0 && s10 <= r2.length) {
              let e11 = 0;
              for (let r3 of i10.allItems) ((r3.legendItem || {}).pageIx || 0) + 1 === s10 && t10.highlightLegendItem(e11) && (this.highlightedLegendItemIx = e11), ++e11;
            }
          }
          updateProxyPositionForItem(e10) {
            e10.a11yProxyElement && e10.a11yProxyElement.refreshPosition();
          }
          recreateProxies() {
            let e10 = e8.activeElement, t10 = this.proxyGroup, i10 = e10 && t10 && t10.contains(e10);
            return this.removeProxies(), !!tl(this.chart) && (this.addLegendProxyGroup(), this.proxyLegendItems(), this.updateLegendItemProxyVisibility(), this.updateLegendTitle(), i10 && this.chart.highlightLegendItem(this.highlightedLegendItemIx), true);
          }
          removeProxies() {
            this.proxyProvider.removeGroup("legend");
          }
          updateLegendTitle() {
            let e10 = this.chart, t10 = tn((e10.legend && e10.legend.options.title && e10.legend.options.title.text || "").replace(/<br ?\/?>/g, " "), e10.renderer.forExport), i10 = e10.langFormat("accessibility.legend.legendLabel" + (t10 ? "" : "NoTitle"), { chart: e10, legendTitle: t10, chartTitle: tr(e10) });
            this.proxyProvider.updateGroupAttrs("legend", { "aria-label": i10 });
          }
          addLegendProxyGroup() {
            let e10 = "all" === this.chart.options.accessibility.landmarkVerbosity ? "region" : null;
            this.proxyGroup = this.proxyProvider.addGroup("legend", "ul", { "aria-label": "_placeholder_", role: e10 });
          }
          proxyLegendItems() {
            let e10, t10 = this;
            ((this.chart.legend || {}).allItems || []).forEach((i10) => {
              (e10 = i10.legendItem || {}).label && e10.label.element && t10.proxyLegendItem(i10);
            });
          }
          proxyLegendItem(e10) {
            var _a, _b, _c;
            let t10 = e10.legendItem || {}, i10 = (_a = e10.legendItem) == null ? void 0 : _a.label, s10 = i10 == null ? void 0 : i10.element, r2 = ((_c = (_b = t10.label) == null ? void 0 : _b.styles) == null ? void 0 : _c.textOverflow) === "ellipsis";
            if (!t10.label || !t10.group) return;
            let n2 = this.chart.langFormat("accessibility.legend.legendItem", { chart: this.chart, itemName: tn(e10.name, this.chart.renderer.forExport), item: e10 }), o2 = { tabindex: -1, "aria-pressed": e10.visible, "aria-label": n2, title: "" };
            r2 && -1 !== (s10.textContent || "").indexOf("\u2026") && (o2.title = i10 == null ? void 0 : i10.textStr);
            let a2 = t10.group.div ? t10.label : t10.group;
            e10.a11yProxyElement = this.proxyProvider.addProxyElement("legend", { click: t10.label, visual: a2.element }, "button", o2);
          }
          getKeyboardNavigation() {
            let e10 = this.keyCodes, t10 = this, i10 = this.chart;
            return new et(i10, { keyCodeMap: [[[e10.left, e10.right, e10.up, e10.down], function(e11) {
              return t10.onKbdArrowKey(this, e11);
            }], [[e10.enter, e10.space], function() {
              return t10.onKbdClick(this);
            }], [[e10.pageDown, e10.pageUp], function(i11) {
              let s10 = i11 === e10.pageDown ? 1 : -1;
              return t10.highlightAdjacentLegendPage(s10), this.response.success;
            }]], validate: function() {
              return t10.shouldHaveLegendNavigation();
            }, init: function() {
              i10.highlightLegendItem(0), t10.highlightedLegendItemIx = 0;
            }, terminate: function() {
              t10.highlightedLegendItemIx = -1, i10.legend.allItems.forEach((e11) => th(false, e11));
            } });
          }
          onKbdArrowKey(e10, t10) {
            let { keyCodes: { left: i10, up: s10 }, highlightedLegendItemIx: r2, chart: n2 } = this, o2 = n2.legend.allItems.length, a2 = n2.options.accessibility.keyboardNavigation.wrapAround, l2 = t10 === i10 || t10 === s10 ? -1 : 1;
            return n2.highlightLegendItem(r2 + l2) ? this.highlightedLegendItemIx += l2 : a2 && o2 > 1 && (this.highlightedLegendItemIx = l2 > 0 ? 0 : o2 - 1, n2.highlightLegendItem(this.highlightedLegendItemIx)), e10.response.success;
          }
          onKbdClick(e10) {
            let t10 = this.chart.legend.allItems[this.highlightedLegendItemIx];
            return t10 && t10.a11yProxyElement && t10.a11yProxyElement.click(), e10.response.success;
          }
          shouldHaveLegendNavigation() {
            if (!tl(this.chart)) return false;
            let e10 = this.chart, t10 = (e10.options.legend || {}).accessibility || {};
            return !!(e10.legend.display && t10.keyboardNavigation && t10.keyboardNavigation.enabled);
          }
          destroy() {
            this.removeProxies();
          }
        }
        function td(e10) {
          let t10 = this.legend.allItems, i10 = this.accessibility && this.accessibility.components.legend.highlightedLegendItemIx, s10 = t10[e10], r2 = (s10 == null ? void 0 : s10.legendItem) || {};
          if (s10) {
            var n2;
            let o2, a2;
            tt(i10) && t10[i10] && th(false, t10[i10]), n2 = this.legend, o2 = (n2.allItems[e10].legendItem || {}).pageIx, a2 = n2.currentPage, void 0 !== o2 && o2 + 1 !== a2 && n2.scroll(1 + o2 - a2);
            let l2 = r2.label, h2 = s10.a11yProxyElement && s10.a11yProxyElement.innerElement;
            return l2 && l2.element && h2 && this.setFocusToElement(l2, h2), th(true, s10), true;
          }
          return false;
        }
        function tu(e10) {
          let t10 = this.chart.options.accessibility, i10 = e10.item;
          t10.enabled && i10 && i10.a11yProxyElement && i10.a11yProxyElement.innerElement.setAttribute("aria-pressed", e10.visible ? "true" : "false");
        }
        (tc || (tc = {})).compose = function(e10, t10) {
          let i10 = e10.prototype;
          i10.highlightLegendItem || (i10.highlightLegendItem = td, e7(t10, "afterColorizeItem", tu));
        };
        let tp = tc;
        var tg = f(532), tm = f.n(tg);
        let { isTouchDevice: tb } = w(), { addEvent: tx, merge: tf, pick: ty } = w(), tv = [];
        function tw() {
          this.navigator && this.navigator.setBaseSeries(null, false);
        }
        function tE() {
          var _a;
          let e10, t10, i10, s10 = this.legend, r2 = this.navigator;
          if (r2) {
            e10 = s10 && s10.options, t10 = r2.xAxis, i10 = r2.yAxis;
            let { scrollbarHeight: n2, scrollButtonSize: o2 } = r2;
            this.inverted ? (r2.left = r2.opposite ? this.chartWidth - n2 - r2.height : this.spacing[3] + n2, r2.top = this.plotTop + o2) : (r2.left = ty(t10.left, this.plotLeft + o2), r2.top = r2.navigatorOptions.top || this.chartHeight - r2.height - n2 - (((_a = this.scrollbar) == null ? void 0 : _a.options.margin) || 0) - this.spacing[2] - (this.rangeSelector && this.extraBottomMargin ? this.rangeSelector.getHeight() : 0) - (e10 && "bottom" === e10.verticalAlign && "proximate" !== e10.layout && e10.enabled && !e10.floating ? s10.legendHeight + ty(e10.margin, 10) : 0) - (this.titleOffset ? this.titleOffset[2] : 0)), t10 && i10 && (this.inverted ? t10.options.left = i10.options.left = r2.left : t10.options.top = i10.options.top = r2.top, t10.setAxisSize(), i10.setAxisSize());
          }
        }
        function tA(e10) {
          !this.navigator && !this.scroller && (this.options.navigator.enabled || this.options.scrollbar.enabled) && (this.scroller = this.navigator = new d(this), ty(e10.redraw, true) && this.redraw(e10.animation));
        }
        function tT() {
          let e10 = this.options;
          (e10.navigator.enabled || e10.scrollbar.enabled) && (this.scroller = this.navigator = new d(this));
        }
        function tM() {
          let e10 = this.options, t10 = e10.navigator, i10 = e10.rangeSelector;
          if ((t10 && t10.enabled || i10 && i10.enabled) && (!tb && "x" === this.zooming.type || tb && "x" === this.zooming.pinchType)) return false;
        }
        function tk(e10) {
          let t10 = e10.navigator;
          if (t10 && e10.xAxis[0]) {
            let i10 = e10.xAxis[0].getExtremes();
            t10.render(i10.min, i10.max);
          }
        }
        function tC(e10) {
          let t10 = e10.options.navigator || {}, i10 = e10.options.scrollbar || {};
          !this.navigator && !this.scroller && (t10.enabled || i10.enabled) && (tf(true, this.options.navigator, t10), tf(true, this.options.scrollbar, i10), delete e10.options.navigator, delete e10.options.scrollbar);
        }
        let tS = function(e10, t10) {
          if (w().pushUnique(tv, e10)) {
            let i10 = e10.prototype;
            d = t10, i10.callbacks.push(tk), tx(e10, "afterAddSeries", tw), tx(e10, "afterSetChartSize", tE), tx(e10, "afterUpdate", tA), tx(e10, "beforeRender", tT), tx(e10, "beforeShowResetZoom", tM), tx(e10, "update", tC);
          }
        }, { isTouchDevice: tP } = w(), { addEvent: tD, correctFloat: tN, defined: tB, isNumber: tI, pick: tF } = w();
        function tO() {
          this.navigatorAxis || (this.navigatorAxis = new tL(this));
        }
        function tR(e10) {
          let t10, i10 = this.chart, s10 = i10.options, r2 = s10.navigator, n2 = this.navigatorAxis, o2 = i10.zooming.pinchType, a2 = s10.rangeSelector, l2 = i10.zooming.type;
          if (this.isXAxis && ((r2 == null ? void 0 : r2.enabled) || (a2 == null ? void 0 : a2.enabled))) {
            if ("y" === l2 && "zoom" === e10.trigger) t10 = false;
            else if (("zoom" === e10.trigger && "xy" === l2 || tP && "xy" === o2) && this.options.range) {
              let t11 = n2.previousZoom;
              tB(e10.min) ? n2.previousZoom = [this.min, this.max] : t11 && (e10.min = t11[0], e10.max = t11[1], n2.previousZoom = void 0);
            }
          }
          void 0 !== t10 && e10.preventDefault();
        }
        class tL {
          static compose(e10) {
            e10.keepProps.includes("navigatorAxis") || (e10.keepProps.push("navigatorAxis"), tD(e10, "init", tO), tD(e10, "setExtremes", tR));
          }
          constructor(e10) {
            this.axis = e10;
          }
          destroy() {
            this.axis = void 0;
          }
          toFixedRange(e10, t10, i10, s10) {
            let r2 = this.axis, n2 = (r2.pointRange || 0) / 2, o2 = tF(i10, r2.translate(e10, true, !r2.horiz)), a2 = tF(s10, r2.translate(t10, true, !r2.horiz));
            return tB(i10) || (o2 = tN(o2 + n2)), tB(s10) || (a2 = tN(a2 - n2)), tI(o2) && tI(a2) || (o2 = a2 = void 0), { min: o2, max: a2 };
          }
        }
        var tH = f(620), tz = f.n(tH), tq = f(512), tU = f.n(tq);
        let { parse: tG } = tz(), { seriesTypes: tK } = tU(), tV = { height: 40, margin: 22, maskInside: true, handles: { width: 7, borderRadius: 0, height: 15, symbols: ["navigator-handle", "navigator-handle"], enabled: true, lineWidth: 1, backgroundColor: "#f2f2f2", borderColor: "#999999" }, maskFill: tG("#667aff").setOpacity(0.3).get(), outlineColor: "#999999", outlineWidth: 1, series: { type: void 0 === tK.areaspline ? "line" : "areaspline", fillOpacity: 0.05, lineWidth: 1, compare: null, sonification: { enabled: false }, dataGrouping: { approximation: "average", enabled: true, groupPixelWidth: 2, firstAnchor: "firstPoint", anchor: "middle", lastAnchor: "lastPoint", units: [["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]], ["second", [1, 2, 5, 10, 15, 30]], ["minute", [1, 2, 5, 10, 15, 30]], ["hour", [1, 2, 3, 4, 6, 8, 12]], ["day", [1, 2, 3, 4]], ["week", [1, 2, 3]], ["month", [1, 3, 6]], ["year", null]] }, dataLabels: { enabled: false, zIndex: 2 }, id: "highcharts-navigator-series", className: "highcharts-navigator-series", lineColor: null, marker: { enabled: false }, threshold: null }, xAxis: { className: "highcharts-navigator-xaxis", tickLength: 0, lineWidth: 0, gridLineColor: "#e6e6e6", id: "navigator-x-axis", gridLineWidth: 1, tickPixelInterval: 200, labels: { align: "left", style: { color: "#000000", fontSize: "0.7em", opacity: 0.6, textOutline: "2px contrast" }, x: 3, y: -4 }, crosshair: false }, yAxis: { className: "highcharts-navigator-yaxis", gridLineWidth: 0, startOnTick: false, endOnTick: false, minPadding: 0.1, id: "navigator-y-axis", maxPadding: 0.1, labels: { enabled: false }, crosshair: false, title: { text: void 0 }, tickLength: 0, tickWidth: 0 } }, { defined: tW, isNumber: tX, pick: tY } = w(), { relativeLength: tj } = w(), t_ = { "navigator-handle": function(e10, t10, i10, s10, r2 = {}) {
          var n2, o2, a2, l2, h2;
          let c2 = r2.width ? r2.width / 2 : i10, d2 = tj(r2.borderRadius || 0, Math.min(2 * c2, s10));
          return [["M", -1.5, (s10 = r2.height || s10) / 2 - 3.5], ["L", -1.5, s10 / 2 + 4.5], ["M", 0.5, s10 / 2 - 3.5], ["L", 0.5, s10 / 2 + 4.5], ...(n2 = -c2 - 1, o2 = 0.5, a2 = 2 * c2 + 1, l2 = s10, h2 = { r: d2 }, (h2 == null ? void 0 : h2.r) ? (function(e11, t11, i11, s11, r3) {
            let n3 = (r3 == null ? void 0 : r3.r) || 0;
            return [["M", e11 + n3, t11], ["L", e11 + i11 - n3, t11], ["A", n3, n3, 0, 0, 1, e11 + i11, t11 + n3], ["L", e11 + i11, t11 + s11 - n3], ["A", n3, n3, 0, 0, 1, e11 + i11 - n3, t11 + s11], ["L", e11 + n3, t11 + s11], ["A", n3, n3, 0, 0, 1, e11, t11 + s11 - n3], ["L", e11, t11 + n3], ["A", n3, n3, 0, 0, 1, e11 + n3, t11], ["Z"]];
          })(n2, 0.5, a2, l2, h2) : [["M", n2, 0.5], ["L", n2 + a2, 0.5], ["L", n2 + a2, 0.5 + l2], ["L", n2, 0.5 + l2], ["Z"]])];
        } };
        var tZ = f(608), t$ = f.n(tZ);
        let { defined: tQ } = w(), { defaultOptions: tJ } = w(), { composed: t0 } = w(), { getRendererType: t1 } = t$(), { setFixedRange: t2 } = { setFixedRange: function(e10) {
          let t10 = this.xAxis[0];
          tQ(t10.dataMax) && tQ(t10.dataMin) && e10 ? this.fixedRange = Math.min(e10, t10.dataMax - t10.dataMin) : this.fixedRange = e10;
        } }, { addEvent: t3, extend: t5, pushUnique: t4 } = w();
        function t6() {
          this.chart.navigator && !this.options.isInternal && this.chart.navigator.setBaseSeries(null, false);
        }
        let t9 = function(e10, t10, i10) {
          tL.compose(t10), t4(t0, "Navigator") && (e10.prototype.setFixedRange = t2, t5(t1().prototype.symbols, t_), t5(tJ, { navigator: tV }), t3(i10, "afterUpdate", t6));
        }, { composed: t8 } = w(), { addEvent: t7, correctFloat: ie, defined: it, pick: ii, pushUnique: is } = w();
        !(function(e10) {
          let t10;
          function i10(e11) {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            let t11 = ii((_a = e11.options) == null ? void 0 : _a.min, e11.min), i11 = ii((_b = e11.options) == null ? void 0 : _b.max, e11.max);
            return { axisMin: t11, axisMax: i11, scrollMin: it(e11.dataMin) ? Math.min(t11, (_c = e11.min) != null ? _c : 1 / 0, e11.dataMin, (_d = e11.threshold) != null ? _d : 1 / 0) : t11, scrollMax: (_h = (_e = e11.treeGrid) == null ? void 0 : _e.adjustedMax) != null ? _h : it(e11.dataMax) ? Math.max(i11, (_f = e11.max) != null ? _f : -1 / 0, e11.dataMax, (_g = e11.threshold) != null ? _g : -1 / 0) : i11 };
          }
          function s10() {
            let e11 = this.scrollbar, t11 = e11 && !e11.options.opposite, i11 = this.horiz ? 2 : t11 ? 3 : 1;
            e11 && (this.chart.scrollbarsOffsets = [0, 0], this.chart.axisOffset[i11] += e11.size + (e11.options.margin || 0));
          }
          function r2() {
            var _a, _b;
            let e11 = this;
            ((_b = (_a = e11.options) == null ? void 0 : _a.scrollbar) == null ? void 0 : _b.enabled) && (e11.options.scrollbar.vertical = !e11.horiz, e11.options.startOnTick = e11.options.endOnTick = false, e11.scrollbar = new t10(e11.chart.renderer, e11.options.scrollbar, e11.chart), t7(e11.scrollbar, "changed", function(t11) {
              let s11, r3, { axisMin: n3, axisMax: o2, scrollMin: a2, scrollMax: l2 } = i10(e11), h2 = e11.toPixels(a2), c2 = e11.toPixels(l2) - h2;
              if (it(n3) && it(o2)) if (e11.horiz && !e11.reversed || !e11.horiz && e11.reversed ? (s11 = Math.min(l2, e11.toValue(h2 + c2 * this.to)), r3 = Math.max(a2, e11.toValue(h2 + c2 * this.from))) : (s11 = Math.min(l2, e11.toValue(h2 + c2 * (1 - this.from))), r3 = Math.max(a2, e11.toValue(h2 + c2 * (1 - this.to)))), this.shouldUpdateExtremes(t11.DOMType)) {
                let i11 = "mousemove" !== t11.DOMType && "touchmove" !== t11.DOMType && void 0;
                e11.setExtremes(ie(r3), ie(s11), true, i11, t11);
              } else this.setRange(this.from, this.to);
            }));
          }
          function n2() {
            let e11, t11, s11, { scrollMin: r3, scrollMax: n3 } = i10(this), o2 = this.scrollbar, a2 = (this.axisTitleMargin || 0) + (this.titleOffset || 0), l2 = this.chart.scrollbarsOffsets, h2 = this.options.margin || 0;
            if (o2 && l2) {
              if (this.horiz) this.opposite || (l2[1] += a2), o2.position(this.left, this.top + this.height + 2 + l2[1] - (this.opposite ? h2 : 0), this.width, this.height), this.opposite || (l2[1] += h2), e11 = 1;
              else {
                let t12;
                this.opposite && (l2[0] += a2), t12 = o2.options.opposite ? this.left + this.width + 2 + l2[0] - (this.opposite ? 0 : h2) : this.opposite ? 0 : h2, o2.position(t12, this.top, this.width, this.height), this.opposite && (l2[0] += h2), e11 = 0;
              }
              if (l2[e11] += o2.size + (o2.options.margin || 0), isNaN(r3) || isNaN(n3) || !it(this.min) || !it(this.max) || it(this.dataMin) && this.dataMin === this.dataMax) o2.setRange(0, 1);
              else if (this.min === this.max) {
                let e12 = this.pointRange / (this.dataMax + 1);
                t11 = e12 * this.min, s11 = e12 * (this.max + 1), o2.setRange(t11, s11);
              } else t11 = (this.toPixels(this.min) - this.toPixels(r3)) / (this.toPixels(n3) - this.toPixels(r3)), s11 = (this.toPixels(this.max) - this.toPixels(r3)) / (this.toPixels(n3) - this.toPixels(r3)), this.horiz && !this.reversed || !this.horiz && this.reversed ? o2.setRange(t11, s11) : o2.setRange(1 - s11, 1 - t11);
            }
          }
          e10.compose = function(e11, i11) {
            is(t8, "Axis.Scrollbar") && (t10 = i11, t7(e11, "afterGetOffset", s10), t7(e11, "afterInit", r2), t7(e11, "afterRender", n2));
          };
        })(g || (g = {}));
        let ir = g, io = { height: 10, barBorderRadius: 5, buttonBorderRadius: 0, buttonsEnabled: false, liveRedraw: void 0, margin: void 0, minWidth: 6, opposite: true, step: 0.2, zIndex: 3, barBackgroundColor: "#cccccc", barBorderWidth: 0, barBorderColor: "#cccccc", buttonArrowColor: "#333333", buttonBackgroundColor: "#e6e6e6", buttonBorderColor: "#cccccc", buttonBorderWidth: 1, rifleColor: "none", trackBackgroundColor: "rgba(255, 255, 255, 0.001)", trackBorderColor: "#cccccc", trackBorderRadius: 5, trackBorderWidth: 1 }, { defaultOptions: ia } = w(), { composed: il } = w(), { addEvent: ih, correctFloat: ic, crisp: id, defined: iu, destroyObjectProperties: ip, extend: ig, fireEvent: im, merge: ib, pick: ix, pushUnique: iy, removeEvent: iv } = w();
        class iw {
          static compose(e10) {
            ir.compose(e10, iw), iy(il, "Scrollbar") && ig(ia, { scrollbar: io });
          }
          static swapXY(e10, t10) {
            return t10 && e10.forEach((e11) => {
              let t11, i10 = e11.length;
              for (let s10 = 0; s10 < i10; s10 += 2) "number" == typeof (t11 = e11[s10 + 1]) && (e11[s10 + 1] = e11[s10 + 2], e11[s10 + 2] = t11);
            }), e10;
          }
          constructor(e10, t10, i10) {
            this._events = [], this.chartX = 0, this.chartY = 0, this.from = 0, this.scrollbarButtons = [], this.scrollbarLeft = 0, this.scrollbarStrokeWidth = 1, this.scrollbarTop = 0, this.size = 0, this.to = 0, this.trackBorderWidth = 1, this.x = 0, this.y = 0, this.init(e10, t10, i10);
          }
          addEvents() {
            let e10 = this.options.inverted ? [1, 0] : [0, 1], t10 = this.scrollbarButtons, i10 = this.scrollbarGroup.element, s10 = this.track.element, r2 = this.mouseDownHandler.bind(this), n2 = this.mouseMoveHandler.bind(this), o2 = this.mouseUpHandler.bind(this), a2 = [[t10[e10[0]].element, "click", this.buttonToMinClick.bind(this)], [t10[e10[1]].element, "click", this.buttonToMaxClick.bind(this)], [s10, "click", this.trackClick.bind(this)], [i10, "mousedown", r2], [i10.ownerDocument, "mousemove", n2], [i10.ownerDocument, "mouseup", o2], [i10, "touchstart", r2], [i10.ownerDocument, "touchmove", n2], [i10.ownerDocument, "touchend", o2]];
            a2.forEach(function(e11) {
              ih.apply(null, e11);
            }), this._events = a2;
          }
          buttonToMaxClick(e10) {
            let t10 = (this.to - this.from) * ix(this.options.step, 0.2);
            this.updatePosition(this.from + t10, this.to + t10), im(this, "changed", { from: this.from, to: this.to, trigger: "scrollbar", DOMEvent: e10 });
          }
          buttonToMinClick(e10) {
            let t10 = ic(this.to - this.from) * ix(this.options.step, 0.2);
            this.updatePosition(ic(this.from - t10), ic(this.to - t10)), im(this, "changed", { from: this.from, to: this.to, trigger: "scrollbar", DOMEvent: e10 });
          }
          cursorToScrollbarPosition(e10) {
            let t10 = this.options, i10 = t10.minWidth > this.calculatedWidth ? t10.minWidth : 0;
            return { chartX: (e10.chartX - this.x - this.xOffset) / (this.barWidth - i10), chartY: (e10.chartY - this.y - this.yOffset) / (this.barWidth - i10) };
          }
          destroy() {
            let e10 = this, t10 = e10.chart.scroller;
            e10.removeEvents(), ["track", "scrollbarRifles", "scrollbar", "scrollbarGroup", "group"].forEach(function(t11) {
              e10[t11] && e10[t11].destroy && (e10[t11] = e10[t11].destroy());
            }), t10 && e10 === t10.scrollbar && (t10.scrollbar = null, ip(t10.scrollbarButtons));
          }
          drawScrollbarButton(e10) {
            let t10 = this.renderer, i10 = this.scrollbarButtons, s10 = this.options, r2 = this.size, n2 = t10.g().add(this.group);
            if (i10.push(n2), s10.buttonsEnabled) {
              let o2 = t10.rect().addClass("highcharts-scrollbar-button").add(n2);
              this.chart.styledMode || o2.attr({ stroke: s10.buttonBorderColor, "stroke-width": s10.buttonBorderWidth, fill: s10.buttonBackgroundColor }), o2.attr(o2.crisp({ x: -0.5, y: -0.5, width: r2, height: r2, r: s10.buttonBorderRadius }, o2.strokeWidth()));
              let a2 = t10.path(iw.swapXY([["M", r2 / 2 + (e10 ? -1 : 1), r2 / 2 - 3], ["L", r2 / 2 + (e10 ? -1 : 1), r2 / 2 + 3], ["L", r2 / 2 + (e10 ? 2 : -2), r2 / 2]], s10.vertical)).addClass("highcharts-scrollbar-arrow").add(i10[e10]);
              this.chart.styledMode || a2.attr({ fill: s10.buttonArrowColor });
            }
          }
          init(e10, t10, i10) {
            this.scrollbarButtons = [], this.renderer = e10, this.userOptions = t10, this.options = ib(io, ia.scrollbar, t10), this.options.margin = ix(this.options.margin, 10), this.chart = i10, this.size = ix(this.options.size, this.options.height), t10.enabled && (this.render(), this.addEvents());
          }
          mouseDownHandler(e10) {
            var _a;
            let t10 = ((_a = this.chart.pointer) == null ? void 0 : _a.normalize(e10)) || e10, i10 = this.cursorToScrollbarPosition(t10);
            this.chartX = i10.chartX, this.chartY = i10.chartY, this.initPositions = [this.from, this.to], this.grabbedCenter = true;
          }
          mouseMoveHandler(e10) {
            var _a;
            let t10, i10 = ((_a = this.chart.pointer) == null ? void 0 : _a.normalize(e10)) || e10, s10 = this.options.vertical ? "chartY" : "chartX", r2 = this.initPositions || [];
            this.grabbedCenter && (!e10.touches || 0 !== e10.touches[0][s10]) && (t10 = this.cursorToScrollbarPosition(i10)[s10] - this[s10], this.hasDragged = true, this.updatePosition(r2[0] + t10, r2[1] + t10), this.hasDragged && im(this, "changed", { from: this.from, to: this.to, trigger: "scrollbar", DOMType: e10.type, DOMEvent: e10 }));
          }
          mouseUpHandler(e10) {
            this.hasDragged && im(this, "changed", { from: this.from, to: this.to, trigger: "scrollbar", DOMType: e10.type, DOMEvent: e10 }), this.grabbedCenter = this.hasDragged = this.chartX = this.chartY = null;
          }
          position(e10, t10, i10, s10) {
            let { buttonsEnabled: r2, margin: n2 = 0, vertical: o2 } = this.options, a2 = this.rendered ? "animate" : "attr", l2 = s10, h2 = 0;
            this.group.show(), this.x = e10, this.y = t10 + this.trackBorderWidth, this.width = i10, this.height = s10, this.xOffset = l2, this.yOffset = h2, o2 ? (this.width = this.yOffset = i10 = h2 = this.size, this.xOffset = l2 = 0, this.yOffset = h2 = r2 ? this.size : 0, this.barWidth = s10 - (r2 ? 2 * i10 : 0), this.x = e10 += n2) : (this.height = s10 = this.size, this.xOffset = l2 = r2 ? this.size : 0, this.barWidth = i10 - (r2 ? 2 * s10 : 0), this.y = this.y + n2), this.group[a2]({ translateX: e10, translateY: this.y }), this.track[a2]({ width: i10, height: s10 }), this.scrollbarButtons[1][a2]({ translateX: o2 ? 0 : i10 - l2, translateY: o2 ? s10 - h2 : 0 });
          }
          removeEvents() {
            this._events.forEach(function(e10) {
              iv.apply(null, e10);
            }), this._events.length = 0;
          }
          render() {
            let e10 = this.renderer, t10 = this.options, i10 = this.size, s10 = this.chart.styledMode, r2 = e10.g("scrollbar").attr({ zIndex: t10.zIndex }).hide().add();
            this.group = r2, this.track = e10.rect().addClass("highcharts-scrollbar-track").attr({ r: t10.trackBorderRadius || 0, height: i10, width: i10 }).add(r2), s10 || this.track.attr({ fill: t10.trackBackgroundColor, stroke: t10.trackBorderColor, "stroke-width": t10.trackBorderWidth });
            let n2 = this.trackBorderWidth = this.track.strokeWidth();
            this.track.attr({ x: -id(0, n2), y: -id(0, n2) }), this.scrollbarGroup = e10.g().add(r2), this.scrollbar = e10.rect().addClass("highcharts-scrollbar-thumb").attr({ height: i10 - n2, width: i10 - n2, r: t10.barBorderRadius || 0 }).add(this.scrollbarGroup), this.scrollbarRifles = e10.path(iw.swapXY([["M", -3, i10 / 4], ["L", -3, 2 * i10 / 3], ["M", 0, i10 / 4], ["L", 0, 2 * i10 / 3], ["M", 3, i10 / 4], ["L", 3, 2 * i10 / 3]], t10.vertical)).addClass("highcharts-scrollbar-rifles").add(this.scrollbarGroup), s10 || (this.scrollbar.attr({ fill: t10.barBackgroundColor, stroke: t10.barBorderColor, "stroke-width": t10.barBorderWidth }), this.scrollbarRifles.attr({ stroke: t10.rifleColor, "stroke-width": 1 })), this.scrollbarStrokeWidth = this.scrollbar.strokeWidth(), this.scrollbarGroup.translate(-id(0, this.scrollbarStrokeWidth), -id(0, this.scrollbarStrokeWidth)), this.drawScrollbarButton(0), this.drawScrollbarButton(1);
          }
          setRange(e10, t10) {
            let i10, s10, r2 = this.options, n2 = r2.vertical, o2 = r2.minWidth, a2 = this.barWidth, l2 = !this.rendered || this.hasDragged || this.chart.navigator && this.chart.navigator.hasDragged ? "attr" : "animate";
            if (!iu(a2)) return;
            let h2 = a2 * Math.min(t10, 1);
            i10 = Math.ceil(a2 * (e10 = Math.max(e10, 0))), this.calculatedWidth = s10 = ic(h2 - i10), s10 < o2 && (i10 = (a2 - o2 + s10) * e10, s10 = o2);
            let c2 = Math.floor(i10 + this.xOffset + this.yOffset), d2 = s10 / 2 - 0.5;
            this.from = e10, this.to = t10, n2 ? (this.scrollbarGroup[l2]({ translateY: c2 }), this.scrollbar[l2]({ height: s10 }), this.scrollbarRifles[l2]({ translateY: d2 }), this.scrollbarTop = c2, this.scrollbarLeft = 0) : (this.scrollbarGroup[l2]({ translateX: c2 }), this.scrollbar[l2]({ width: s10 }), this.scrollbarRifles[l2]({ translateX: d2 }), this.scrollbarLeft = c2, this.scrollbarTop = 0), s10 <= 12 ? this.scrollbarRifles.hide() : this.scrollbarRifles.show(), false === r2.showFull && (e10 <= 0 && t10 >= 1 ? this.group.hide() : this.group.show()), this.rendered = true;
          }
          shouldUpdateExtremes(e10) {
            return ix(this.options.liveRedraw, w().svg && !w().isTouchDevice && !this.chart.boosted) || "mouseup" === e10 || "touchend" === e10 || !iu(e10);
          }
          trackClick(e10) {
            var _a;
            let t10 = ((_a = this.chart.pointer) == null ? void 0 : _a.normalize(e10)) || e10, i10 = this.to - this.from, s10 = this.y + this.scrollbarTop, r2 = this.x + this.scrollbarLeft;
            this.options.vertical && t10.chartY > s10 || !this.options.vertical && t10.chartX > r2 ? this.updatePosition(this.from + i10, this.to + i10) : this.updatePosition(this.from - i10, this.to - i10), im(this, "changed", { from: this.from, to: this.to, trigger: "scrollbar", DOMEvent: e10 });
          }
          update(e10) {
            this.destroy(), this.init(this.chart.renderer, ib(true, this.options, e10), this.chart);
          }
          updatePosition(e10, t10) {
            t10 > 1 && (e10 = ic(1 - ic(t10 - e10)), t10 = 1), e10 < 0 && (t10 = ic(t10 - e10), e10 = 0), this.from = e10, this.to = t10;
          }
        }
        iw.defaultOptions = io;
        var iE = f(540), iA = f.n(iE);
        let { defaultOptions: iT } = w(), { isTouchDevice: iM } = w(), { prototype: { symbols: ik } } = iA(), { addEvent: iC, clamp: iS, correctFloat: iP, defined: iD, destroyObjectProperties: iN, erase: iB, extend: iI, find: iF, fireEvent: iO, isArray: iR, isNumber: iL, merge: iH, pick: iz, removeEvent: iq, splat: iU } = w();
        function iG(e10, ...t10) {
          let i10 = [].filter.call(t10, iL);
          if (i10.length) return Math[e10].apply(0, i10);
        }
        class iK {
          static compose(e10, t10, i10) {
            tS(e10, iK), t9(e10, t10, i10);
          }
          constructor(e10) {
            this.isDirty = false, this.scrollbarHeight = 0, this.init(e10);
          }
          drawHandle(e10, t10, i10, s10) {
            let r2 = this.navigatorOptions.handles.height;
            this.handles[t10][s10](i10 ? { translateX: Math.round(this.left + this.height / 2), translateY: Math.round(this.top + parseInt(e10, 10) + 0.5 - r2) } : { translateX: Math.round(this.left + parseInt(e10, 10)), translateY: Math.round(this.top + this.height / 2 - r2 / 2 - 1) });
          }
          drawOutline(e10, t10, i10, s10) {
            let r2 = this.navigatorOptions.maskInside, n2 = this.outline.strokeWidth(), o2 = n2 / 2, a2 = n2 % 2 / 2, l2 = this.scrollButtonSize, h2 = this.size, c2 = this.top, d2 = this.height, u2 = c2 - o2, p2 = c2 + d2, g2 = this.left, m2, b2;
            i10 ? (m2 = c2 + t10 + a2, t10 = c2 + e10 + a2, b2 = [["M", g2 + d2, c2 - l2 - a2], ["L", g2 + d2, m2], ["L", g2, m2], ["M", g2, t10], ["L", g2 + d2, t10], ["L", g2 + d2, c2 + h2 + l2]], r2 && b2.push(["M", g2 + d2, m2 - o2], ["L", g2 + d2, t10 + o2])) : (g2 -= l2, e10 += g2 + l2 - a2, t10 += g2 + l2 - a2, b2 = [["M", g2, u2], ["L", e10, u2], ["L", e10, p2], ["M", t10, p2], ["L", t10, u2], ["L", g2 + h2 + 2 * l2, u2]], r2 && b2.push(["M", e10 - o2, u2], ["L", t10 + o2, u2])), this.outline[s10]({ d: b2 });
          }
          drawMasks(e10, t10, i10, s10) {
            let r2, n2, o2, a2, l2 = this.left, h2 = this.top, c2 = this.height;
            i10 ? (o2 = [l2, l2, l2], a2 = [h2, h2 + e10, h2 + t10], n2 = [c2, c2, c2], r2 = [e10, t10 - e10, this.size - t10]) : (o2 = [l2, l2 + e10, l2 + t10], a2 = [h2, h2, h2], n2 = [e10, t10 - e10, this.size - t10], r2 = [c2, c2, c2]), this.shades.forEach((e11, t11) => {
              e11[s10]({ x: o2[t11], y: a2[t11], width: n2[t11], height: r2[t11] });
            });
          }
          renderElements() {
            var _a, _b;
            let e10 = this, t10 = e10.navigatorOptions, i10 = t10.maskInside, s10 = e10.chart, r2 = s10.inverted, n2 = s10.renderer, o2 = { cursor: r2 ? "ns-resize" : "ew-resize" }, a2 = (_a = e10.navigatorGroup) != null ? _a : e10.navigatorGroup = n2.g("navigator").attr({ zIndex: 8, visibility: "hidden" }).add();
            if ([!i10, i10, !i10].forEach((i11, r3) => {
              var _a2;
              let l2 = (_a2 = e10.shades[r3]) != null ? _a2 : e10.shades[r3] = n2.rect().addClass("highcharts-navigator-mask" + (1 === r3 ? "-inside" : "-outside")).add(a2);
              s10.styledMode || (l2.attr({ fill: i11 ? t10.maskFill : "rgba(0,0,0,0)" }), 1 === r3 && l2.css(o2));
            }), e10.outline || (e10.outline = n2.path().addClass("highcharts-navigator-outline").add(a2)), s10.styledMode || e10.outline.attr({ "stroke-width": t10.outlineWidth, stroke: t10.outlineColor }), (_b = t10.handles) == null ? void 0 : _b.enabled) {
              let i11 = t10.handles, { height: r3, width: l2 } = i11;
              [0, 1].forEach((t11) => {
                var _a2;
                let h2 = i11.symbols[t11];
                if (e10.handles[t11] && e10.handles[t11].symbolUrl === h2) {
                  if (!e10.handles[t11].isImg && e10.handles[t11].symbolName !== h2) {
                    let i12 = ik[h2].call(ik, -l2 / 2 - 1, 0, l2, r3);
                    e10.handles[t11].attr({ d: i12 }), e10.handles[t11].symbolName = h2;
                  }
                } else (_a2 = e10.handles[t11]) == null ? void 0 : _a2.destroy(), e10.handles[t11] = n2.symbol(h2, -l2 / 2 - 1, 0, l2, r3, i11), e10.handles[t11].attr({ zIndex: 7 - t11 }).addClass("highcharts-navigator-handle highcharts-navigator-handle-" + ["left", "right"][t11]).add(a2), e10.addMouseEvents();
                s10.inverted && e10.handles[t11].attr({ rotation: 90, rotationOriginX: Math.floor(-l2 / 2), rotationOriginY: (r3 + l2) / 2 }), s10.styledMode || e10.handles[t11].attr({ fill: i11.backgroundColor, stroke: i11.borderColor, "stroke-width": i11.lineWidth, width: i11.width, height: i11.height, x: -l2 / 2 - 1, y: 0 }).css(o2);
              });
            }
          }
          update(e10, t10 = false) {
            var _a, _b;
            let i10 = this.chart, s10 = i10.options.chart.inverted !== ((_a = i10.scrollbar) == null ? void 0 : _a.options.vertical);
            if (iH(true, i10.options.navigator, e10), this.navigatorOptions = i10.options.navigator || {}, this.setOpposite(), iD(e10.enabled) || s10) return this.destroy(), this.navigatorEnabled = e10.enabled || this.navigatorEnabled, this.init(i10);
            if (this.navigatorEnabled && (this.isDirty = true, false === e10.adaptToUpdatedData && this.baseSeries.forEach((e11) => {
              iq(e11, "updatedData", this.updatedDataHandler);
            }, this), e10.adaptToUpdatedData && this.baseSeries.forEach((e11) => {
              e11.eventsToUnbind.push(iC(e11, "updatedData", this.updatedDataHandler));
            }, this), (e10.series || e10.baseSeries) && this.setBaseSeries(void 0, false), e10.height || e10.xAxis || e10.yAxis)) {
              this.height = (_b = e10.height) != null ? _b : this.height;
              let t11 = this.getXAxisOffsets();
              this.xAxis.update(__spreadProps(__spreadValues({}, e10.xAxis), { offsets: t11, [i10.inverted ? "width" : "height"]: this.height, [i10.inverted ? "height" : "width"]: void 0 }), false), this.yAxis.update(__spreadProps(__spreadValues({}, e10.yAxis), { [i10.inverted ? "width" : "height"]: this.height }), false);
            }
            t10 && i10.redraw();
          }
          render(e10, t10, i10, s10) {
            let r2 = this.chart, n2 = this.xAxis, o2 = n2.pointRange || 0, a2 = n2.navigatorAxis.fake ? r2.xAxis[0] : n2, l2 = this.navigatorEnabled, h2 = this.rendered, c2 = r2.inverted, d2 = r2.xAxis[0].minRange, u2 = r2.xAxis[0].options.maxRange, p2 = this.scrollButtonSize, g2, m2, b2, x2 = this.scrollbarHeight, f2, y2;
            if (this.hasDragged && !iD(i10)) return;
            if (this.isDirty && this.renderElements(), e10 = iP(e10 - o2 / 2), t10 = iP(t10 + o2 / 2), !iL(e10) || !iL(t10)) if (!h2) return;
            else i10 = 0, s10 = iz(n2.width, a2.width);
            this.left = iz(n2.left, r2.plotLeft + p2 + (c2 ? r2.plotWidth : 0));
            let v2 = this.size = f2 = iz(n2.len, (c2 ? r2.plotHeight : r2.plotWidth) - 2 * p2);
            g2 = c2 ? x2 : f2 + 2 * p2, i10 = iz(i10, n2.toPixels(e10, true)), s10 = iz(s10, n2.toPixels(t10, true)), iL(i10) && Math.abs(i10) !== 1 / 0 || (i10 = 0, s10 = g2);
            let w2 = n2.toValue(i10, true), E2 = n2.toValue(s10, true), A2 = Math.abs(iP(E2 - w2));
            A2 < d2 ? this.grabbedLeft ? i10 = n2.toPixels(E2 - d2 - o2, true) : this.grabbedRight && (s10 = n2.toPixels(w2 + d2 + o2, true)) : iD(u2) && iP(A2 - o2) > u2 && (this.grabbedLeft ? i10 = n2.toPixels(E2 - u2 - o2, true) : this.grabbedRight && (s10 = n2.toPixels(w2 + u2 + o2, true))), this.zoomedMax = iS(Math.max(i10, s10), 0, v2), this.zoomedMin = iS(this.fixedWidth ? this.zoomedMax - this.fixedWidth : Math.min(i10, s10), 0, v2), this.range = this.zoomedMax - this.zoomedMin, v2 = Math.round(this.zoomedMax);
            let T2 = Math.round(this.zoomedMin);
            l2 && (this.navigatorGroup.attr({ visibility: "inherit" }), y2 = h2 && !this.hasDragged ? "animate" : "attr", this.drawMasks(T2, v2, c2, y2), this.drawOutline(T2, v2, c2, y2), this.navigatorOptions.handles.enabled && (this.drawHandle(T2, 0, c2, y2), this.drawHandle(v2, 1, c2, y2))), this.scrollbar && (c2 ? (b2 = this.top - p2, m2 = this.left - x2 + (l2 || !a2.opposite ? 0 : (a2.titleOffset || 0) + a2.axisTitleMargin), x2 = f2 + 2 * p2) : (b2 = this.top + (l2 ? this.height : -x2), m2 = this.left - p2), this.scrollbar.position(m2, b2, g2, x2), this.scrollbar.setRange(this.zoomedMin / (f2 || 1), this.zoomedMax / (f2 || 1))), this.rendered = true, this.isDirty = false, iO(this, "afterRender");
          }
          addMouseEvents() {
            let e10 = this, t10 = e10.chart, i10 = t10.container, s10 = [], r2, n2;
            e10.mouseMoveHandler = r2 = function(t11) {
              e10.onMouseMove(t11);
            }, e10.mouseUpHandler = n2 = function(t11) {
              e10.onMouseUp(t11);
            }, (s10 = e10.getPartsEvents("mousedown")).push(iC(t10.renderTo, "mousemove", r2), iC(i10.ownerDocument, "mouseup", n2), iC(t10.renderTo, "touchmove", r2), iC(i10.ownerDocument, "touchend", n2)), s10.concat(e10.getPartsEvents("touchstart")), e10.eventsToUnbind = s10, e10.series && e10.series[0] && s10.push(iC(e10.series[0].xAxis, "foundExtremes", function() {
              t10.navigator.modifyNavigatorAxisExtremes();
            }));
          }
          getPartsEvents(e10) {
            let t10 = this, i10 = [];
            return ["shades", "handles"].forEach(function(s10) {
              t10[s10].forEach(function(r2, n2) {
                i10.push(iC(r2.element, e10, function(e11) {
                  t10[s10 + "Mousedown"](e11, n2);
                }));
              });
            }), i10;
          }
          shadesMousedown(e10, t10) {
            var _a;
            e10 = ((_a = this.chart.pointer) == null ? void 0 : _a.normalize(e10)) || e10;
            let i10 = this.chart, s10 = this.xAxis, r2 = this.zoomedMin, n2 = this.size, o2 = this.range, a2 = this.left, l2 = e10.chartX, h2, c2, d2, u2;
            i10.inverted && (l2 = e10.chartY, a2 = this.top), 1 === t10 ? (this.grabbedCenter = l2, this.fixedWidth = o2, this.dragOffset = l2 - r2) : (u2 = l2 - a2 - o2 / 2, 0 === t10 ? u2 = Math.max(0, u2) : 2 === t10 && u2 + o2 >= n2 && (u2 = n2 - o2, this.reversedExtremes ? (u2 -= o2, c2 = this.getUnionExtremes().dataMin) : h2 = this.getUnionExtremes().dataMax), u2 !== r2 && (this.fixedWidth = o2, iD((d2 = s10.navigatorAxis.toFixedRange(u2, u2 + o2, c2, h2)).min) && iO(this, "setRange", { min: Math.min(d2.min, d2.max), max: Math.max(d2.min, d2.max), redraw: true, eventArguments: { trigger: "navigator" } })));
          }
          handlesMousedown(e10, t10) {
            var _a;
            e10 = ((_a = this.chart.pointer) == null ? void 0 : _a.normalize(e10)) || e10;
            let i10 = this.chart, s10 = i10.xAxis[0], r2 = this.reversedExtremes;
            0 === t10 ? (this.grabbedLeft = true, this.otherHandlePos = this.zoomedMax, this.fixedExtreme = r2 ? s10.min : s10.max) : (this.grabbedRight = true, this.otherHandlePos = this.zoomedMin, this.fixedExtreme = r2 ? s10.max : s10.min), i10.setFixedRange(void 0);
          }
          onMouseMove(e10) {
            var _a;
            let t10 = this, i10 = t10.chart, s10 = t10.navigatorSize, r2 = t10.range, n2 = t10.dragOffset, o2 = i10.inverted, a2 = t10.left, l2;
            (!e10.touches || 0 !== e10.touches[0].pageX) && (l2 = (e10 = ((_a = i10.pointer) == null ? void 0 : _a.normalize(e10)) || e10).chartX, o2 && (a2 = t10.top, l2 = e10.chartY), t10.grabbedLeft ? (t10.hasDragged = true, t10.render(0, 0, l2 - a2, t10.otherHandlePos)) : t10.grabbedRight ? (t10.hasDragged = true, t10.render(0, 0, t10.otherHandlePos, l2 - a2)) : t10.grabbedCenter && (t10.hasDragged = true, l2 < n2 ? l2 = n2 : l2 > s10 + n2 - r2 && (l2 = s10 + n2 - r2), t10.render(0, 0, l2 - n2, l2 - n2 + r2)), t10.hasDragged && t10.scrollbar && iz(t10.scrollbar.options.liveRedraw, !iM && !this.chart.boosted) && (e10.DOMType = e10.type, setTimeout(function() {
              t10.onMouseUp(e10);
            }, 0)));
          }
          onMouseUp(e10) {
            let t10, i10, s10, r2, n2, o2, a2 = this.chart, l2 = this.xAxis, h2 = this.scrollbar, c2 = e10.DOMEvent || e10, d2 = a2.inverted, u2 = this.rendered && !this.hasDragged ? "animate" : "attr";
            (this.hasDragged && (!h2 || !h2.hasDragged) || "scrollbar" === e10.trigger) && (s10 = this.getUnionExtremes(), this.zoomedMin === this.otherHandlePos ? r2 = this.fixedExtreme : this.zoomedMax === this.otherHandlePos && (n2 = this.fixedExtreme), this.zoomedMax === this.size && (n2 = this.reversedExtremes ? s10.dataMin : s10.dataMax), 0 === this.zoomedMin && (r2 = this.reversedExtremes ? s10.dataMax : s10.dataMin), iD((o2 = l2.navigatorAxis.toFixedRange(this.zoomedMin, this.zoomedMax, r2, n2)).min) && iO(this, "setRange", { min: Math.min(o2.min, o2.max), max: Math.max(o2.min, o2.max), redraw: true, animation: !this.hasDragged && null, eventArguments: { trigger: "navigator", triggerOp: "navigator-drag", DOMEvent: c2 } })), "mousemove" !== e10.DOMType && "touchmove" !== e10.DOMType && (this.grabbedLeft = this.grabbedRight = this.grabbedCenter = this.fixedWidth = this.fixedExtreme = this.otherHandlePos = this.hasDragged = this.dragOffset = null), this.navigatorEnabled && iL(this.zoomedMin) && iL(this.zoomedMax) && (i10 = Math.round(this.zoomedMin), t10 = Math.round(this.zoomedMax), this.shades && this.drawMasks(i10, t10, d2, u2), this.outline && this.drawOutline(i10, t10, d2, u2), this.navigatorOptions.handles.enabled && Object.keys(this.handles).length === this.handles.length && (this.drawHandle(i10, 0, d2, u2), this.drawHandle(t10, 1, d2, u2)));
          }
          removeEvents() {
            this.eventsToUnbind && (this.eventsToUnbind.forEach(function(e10) {
              e10();
            }), this.eventsToUnbind = void 0), this.removeBaseSeriesEvents();
          }
          removeBaseSeriesEvents() {
            let e10 = this.baseSeries || [];
            this.navigatorEnabled && e10[0] && (false !== this.navigatorOptions.adaptToUpdatedData && e10.forEach(function(e11) {
              iq(e11, "updatedData", this.updatedDataHandler);
            }, this), e10[0].xAxis && iq(e10[0].xAxis, "foundExtremes", this.modifyBaseAxisExtremes));
          }
          getXAxisOffsets() {
            return this.chart.inverted ? [this.scrollButtonSize, 0, -this.scrollButtonSize, 0] : [0, -this.scrollButtonSize, 0, this.scrollButtonSize];
          }
          init(e10) {
            var _a, _b;
            let t10 = e10.options, i10 = t10.navigator || {}, s10 = i10.enabled, r2 = t10.scrollbar || {}, n2 = r2.enabled, o2 = s10 && i10.height || 0, a2 = n2 && r2.height || 0, l2 = r2.buttonsEnabled && a2 || 0;
            this.handles = [], this.shades = [], this.chart = e10, this.setBaseSeries(), this.height = o2, this.scrollbarHeight = a2, this.scrollButtonSize = l2, this.scrollbarEnabled = n2, this.navigatorEnabled = s10, this.navigatorOptions = i10, this.scrollbarOptions = r2, this.setOpposite();
            let h2 = this, c2 = h2.baseSeries, d2 = e10.xAxis.length, u2 = e10.yAxis.length, p2 = c2 && c2[0] && c2[0].xAxis || e10.xAxis[0] || { options: {} };
            if (e10.isDirtyBox = true, h2.navigatorEnabled) {
              let t11 = this.getXAxisOffsets();
              h2.xAxis = new (tm())(e10, iH({ breaks: p2.options.breaks, ordinal: p2.options.ordinal, overscroll: p2.options.overscroll }, i10.xAxis, { type: "datetime", yAxis: (_a = i10.yAxis) == null ? void 0 : _a.id, index: d2, isInternal: true, offset: 0, keepOrdinalPadding: true, startOnTick: false, endOnTick: false, minPadding: p2.options.ordinal ? 0 : p2.options.minPadding, maxPadding: p2.options.ordinal ? 0 : p2.options.maxPadding, zoomEnabled: false }, e10.inverted ? { offsets: t11, width: o2 } : { offsets: t11, height: o2 }), "xAxis"), h2.yAxis = new (tm())(e10, iH(i10.yAxis, { alignTicks: false, offset: 0, index: u2, isInternal: true, reversed: iz(i10.yAxis && i10.yAxis.reversed, e10.yAxis[0] && e10.yAxis[0].reversed, false), zoomEnabled: false }, e10.inverted ? { width: o2 } : { height: o2 }), "yAxis"), c2 || i10.series.data ? h2.updateNavigatorSeries(false) : 0 === e10.series.length && (h2.unbindRedraw = iC(e10, "beforeRedraw", function() {
                e10.series.length > 0 && !h2.series && (h2.setBaseSeries(), h2.unbindRedraw());
              })), h2.reversedExtremes = e10.inverted && !h2.xAxis.reversed || !e10.inverted && h2.xAxis.reversed, h2.renderElements(), h2.addMouseEvents();
            } else h2.xAxis = { chart: e10, navigatorAxis: { fake: true }, translate: function(t11, i11) {
              let s11 = e10.xAxis[0], r3 = s11.getExtremes(), n3 = s11.len - 2 * l2, o3 = iG("min", s11.options.min, r3.dataMin), a3 = iG("max", s11.options.max, r3.dataMax) - o3;
              return i11 ? t11 * a3 / n3 + o3 : n3 * (t11 - o3) / a3;
            }, toPixels: function(e11) {
              return this.translate(e11);
            }, toValue: function(e11) {
              return this.translate(e11, true);
            } }, h2.xAxis.navigatorAxis.axis = h2.xAxis, h2.xAxis.navigatorAxis.toFixedRange = tL.prototype.toFixedRange.bind(h2.xAxis.navigatorAxis);
            if ((_b = e10.options.scrollbar) == null ? void 0 : _b.enabled) {
              let t11 = iH(e10.options.scrollbar, { vertical: e10.inverted });
              iL(t11.margin) || (t11.margin = e10.inverted ? -3 : 3), e10.scrollbar = h2.scrollbar = new iw(e10.renderer, t11, e10), iC(h2.scrollbar, "changed", function(e11) {
                let t12 = h2.size, i11 = t12 * this.to, s11 = t12 * this.from;
                h2.hasDragged = h2.scrollbar.hasDragged, h2.render(0, 0, s11, i11), this.shouldUpdateExtremes(e11.DOMType) && setTimeout(function() {
                  h2.onMouseUp(e11);
                });
              });
            }
            h2.addBaseSeriesEvents(), h2.addChartEvents();
          }
          setOpposite() {
            let e10 = this.navigatorOptions, t10 = this.navigatorEnabled, i10 = this.chart;
            this.opposite = iz(e10.opposite, !!(!t10 && i10.inverted));
          }
          getUnionExtremes(e10) {
            let t10, i10 = this.chart.xAxis[0], s10 = this.chart.time, r2 = this.xAxis, n2 = r2.options, o2 = i10.options;
            return e10 && null === i10.dataMin || (t10 = { dataMin: iz(s10.parse(n2 == null ? void 0 : n2.min), iG("min", s10.parse(o2.min), i10.dataMin, r2.dataMin, r2.min)), dataMax: iz(s10.parse(n2 == null ? void 0 : n2.max), iG("max", s10.parse(o2.max), i10.dataMax, r2.dataMax, r2.max)) }), t10;
          }
          setBaseSeries(e10, t10) {
            let i10 = this.chart, s10 = this.baseSeries = [];
            e10 = e10 || i10.options && i10.options.navigator.baseSeries || (i10.series.length ? iF(i10.series, (e11) => !e11.options.isInternal).index : 0), (i10.series || []).forEach((t11, i11) => {
              !t11.options.isInternal && (t11.options.showInNavigator || (i11 === e10 || t11.options.id === e10) && false !== t11.options.showInNavigator) && s10.push(t11);
            }), this.xAxis && !this.xAxis.navigatorAxis.fake && this.updateNavigatorSeries(true, t10);
          }
          updateNavigatorSeries(e10, t10) {
            var _a, _b;
            let i10 = this, s10 = i10.chart, r2 = i10.baseSeries, n2 = { enableMouseTracking: false, index: null, linkedTo: null, group: "nav", padXAxis: false, xAxis: (_a = this.navigatorOptions.xAxis) == null ? void 0 : _a.id, yAxis: (_b = this.navigatorOptions.yAxis) == null ? void 0 : _b.id, showInLegend: false, stacking: void 0, isInternal: true, states: { inactive: { opacity: 1 } } }, o2 = i10.series = (i10.series || []).filter((e11) => {
              let t11 = e11.baseSeries;
              return !(0 > r2.indexOf(t11)) || (t11 && (iq(t11, "updatedData", i10.updatedDataHandler), delete t11.navigatorSeries), e11.chart && e11.destroy(), false);
            }), a2, l2, h2 = i10.navigatorOptions.series, c2;
            r2 && r2.length && r2.forEach((e11) => {
              var _a2;
              let d2 = e11.navigatorSeries, u2 = iI({ color: e11.color, visible: e11.visible }, iR(h2) ? iT.navigator.series : h2);
              if (d2 && false === i10.navigatorOptions.adaptToUpdatedData) return;
              n2.name = "Navigator " + r2.length, c2 = (a2 = e11.options || {}).navigatorOptions || {}, u2.dataLabels = iU(u2.dataLabels), (l2 = iH(a2, n2, u2, c2)).pointRange = iz(u2.pointRange, c2.pointRange, iT.plotOptions[l2.type || "line"].pointRange);
              let p2 = c2.data || u2.data;
              i10.hasNavigatorData = i10.hasNavigatorData || !!p2, l2.data = p2 || ((_a2 = a2.data) == null ? void 0 : _a2.slice(0)), d2 && d2.options ? d2.update(l2, t10) : (e11.navigatorSeries = s10.initSeries(l2), s10.setSortedData(), e11.navigatorSeries.baseSeries = e11, o2.push(e11.navigatorSeries));
            }), (h2.data && !(r2 && r2.length) || iR(h2)) && (i10.hasNavigatorData = false, (h2 = iU(h2)).forEach((e11, t11) => {
              n2.name = "Navigator " + (o2.length + 1), (l2 = iH(iT.navigator.series, { color: s10.series[t11] && !s10.series[t11].options.isInternal && s10.series[t11].color || s10.options.colors[t11] || s10.options.colors[0] }, n2, e11)).data = e11.data, l2.data && (i10.hasNavigatorData = true, o2.push(s10.initSeries(l2)));
            })), e10 && this.addBaseSeriesEvents();
          }
          addBaseSeriesEvents() {
            let e10 = this, t10 = e10.baseSeries || [];
            t10[0] && t10[0].xAxis && t10[0].eventsToUnbind.push(iC(t10[0].xAxis, "foundExtremes", this.modifyBaseAxisExtremes)), t10.forEach((i10) => {
              i10.eventsToUnbind.push(iC(i10, "show", function() {
                this.navigatorSeries && this.navigatorSeries.setVisible(true, false);
              })), i10.eventsToUnbind.push(iC(i10, "hide", function() {
                this.navigatorSeries && this.navigatorSeries.setVisible(false, false);
              })), false !== this.navigatorOptions.adaptToUpdatedData && i10.xAxis && i10.eventsToUnbind.push(iC(i10, "updatedData", this.updatedDataHandler)), i10.eventsToUnbind.push(iC(i10, "remove", function() {
                t10 && iB(t10, i10), this.navigatorSeries && e10.series && (iB(e10.series, this.navigatorSeries), iD(this.navigatorSeries.options) && this.navigatorSeries.remove(false), delete this.navigatorSeries);
              }));
            });
          }
          getBaseSeriesMin(e10) {
            return this.baseSeries.reduce(function(e11, t10) {
              var _a;
              return Math.min(e11, (_a = t10.getColumn("x")[0]) != null ? _a : e11);
            }, e10);
          }
          modifyNavigatorAxisExtremes() {
            let e10 = this.xAxis;
            if (void 0 !== e10.getExtremes) {
              let t10 = this.getUnionExtremes(true);
              t10 && (t10.dataMin !== e10.min || t10.dataMax !== e10.max) && (e10.min = t10.dataMin, e10.max = t10.dataMax);
            }
          }
          modifyBaseAxisExtremes() {
            var _a;
            let e10, t10, i10 = this.chart.navigator, s10 = this.getExtremes(), r2 = s10.min, n2 = s10.max, o2 = s10.dataMin, a2 = s10.dataMax, l2 = n2 - r2, h2 = i10.stickToMin, c2 = i10.stickToMax, d2 = iz((_a = this.ordinal) == null ? void 0 : _a.convertOverscroll(this.options.overscroll), 0), u2 = i10.series && i10.series[0], p2 = !!this.setExtremes;
            !(this.eventArgs && "rangeSelectorButton" === this.eventArgs.trigger) && (h2 && (e10 = (t10 = o2) + l2), c2 && (e10 = a2 + d2, h2 || (t10 = Math.max(o2, e10 - l2, i10.getBaseSeriesMin(u2 && u2.xData ? u2.xData[0] : -Number.MAX_VALUE)))), p2 && (h2 || c2) && iL(t10) && (this.min = this.userMin = t10, this.max = this.userMax = e10)), i10.stickToMin = i10.stickToMax = null;
          }
          updatedDataHandler() {
            let e10 = this.chart.navigator, t10 = this.navigatorSeries, i10 = e10.reversedExtremes ? 0 === Math.round(e10.zoomedMin) : Math.round(e10.zoomedMax) >= Math.round(e10.size);
            e10.stickToMax = iz(this.chart.options.navigator && this.chart.options.navigator.stickToMax, i10), e10.stickToMin = e10.shouldStickToMin(this, e10), t10 && !e10.hasNavigatorData && (t10.options.pointStart = this.getColumn("x")[0], t10.setData(this.options.data, false, null, false));
          }
          shouldStickToMin(e10, t10) {
            let i10 = t10.getBaseSeriesMin(e10.getColumn("x")[0]), s10 = e10.xAxis, r2 = s10.max, n2 = s10.min, o2 = s10.options.range;
            return !!(iL(r2) && iL(n2)) && (o2 && r2 - i10 > 0 ? r2 - i10 < o2 : n2 <= i10);
          }
          addChartEvents() {
            this.eventsToUnbind || (this.eventsToUnbind = []), this.eventsToUnbind.push(iC(this.chart, "redraw", function() {
              let e10 = this.navigator, t10 = e10 && (e10.baseSeries && e10.baseSeries[0] && e10.baseSeries[0].xAxis || this.xAxis[0]);
              t10 && e10.render(t10.min, t10.max);
            }), iC(this.chart, "getMargins", function() {
              var _a;
              let e10 = this.navigator, t10 = e10.opposite ? "plotTop" : "marginBottom";
              this.inverted && (t10 = e10.opposite ? "marginRight" : "plotLeft"), this[t10] = (this[t10] || 0) + (e10.navigatorEnabled || !this.inverted ? e10.height + (((_a = this.scrollbar) == null ? void 0 : _a.options.margin) || 0) + e10.scrollbarHeight : 0) + (e10.navigatorOptions.margin || 0);
            }), iC(iK, "setRange", function(e10) {
              this.chart.xAxis[0].setExtremes(e10.min, e10.max, e10.redraw, e10.animation, e10.eventArguments);
            }));
          }
          destroy() {
            this.removeEvents(), this.xAxis && (iB(this.chart.xAxis, this.xAxis), iB(this.chart.axes, this.xAxis)), this.yAxis && (iB(this.chart.yAxis, this.yAxis), iB(this.chart.axes, this.yAxis)), (this.series || []).forEach((e10) => {
              e10.destroy && e10.destroy();
            }), ["series", "xAxis", "yAxis", "shades", "outline", "scrollbarTrack", "scrollbarRifles", "scrollbarGroup", "scrollbar", "navigatorGroup", "rendered"].forEach((e10) => {
              this[e10] && this[e10].destroy && this[e10].destroy(), this[e10] = null;
            }), [this.handles].forEach((e10) => {
              iN(e10);
            }), this.baseSeries.forEach((e10) => {
              e10.navigatorSeries = void 0;
            }), this.navigatorEnabled = false;
          }
        }
        let { animObject: iV } = w(), { format: iW } = D(), { clamp: iX, pick: iY, syncTimeout: ij } = w(), { getFakeMouseEvent: i_ } = S, { getAxisRangeDescription: iZ, fireEventOnWrappedOrUnwrappedElement: i$ } = W, iQ = class extends J {
          init() {
            let e10 = this.chart, t10 = this;
            this.announcer = new eb(e10, "polite"), this.addEvent(iK, "afterRender", function() {
              this.chart === t10.chart && this.chart.renderer && ij(() => {
                t10.proxyProvider.updateGroupProxyElementPositions("navigator"), t10.updateHandleValues();
              }, iV(iY(this.chart.renderer.globalAnimation, true)).duration);
            });
          }
          onChartUpdate() {
            var _a, _b, _c;
            let e10 = this.chart, t10 = e10.options, i10 = t10.navigator;
            if (i10.enabled && ((_a = i10.accessibility) == null ? void 0 : _a.enabled)) {
              let i11 = t10.accessibility.landmarkVerbosity, s10 = (_b = t10.lang.accessibility) == null ? void 0 : _b.navigator.groupLabel;
              this.proxyProvider.removeGroup("navigator"), this.proxyProvider.addGroup("navigator", "div", { role: "all" === i11 ? "region" : "group", "aria-label": iW(s10, { chart: e10 }, e10) });
              let r2 = (_c = t10.lang.accessibility) == null ? void 0 : _c.navigator.handleLabel;
              [0, 1].forEach((t11) => {
                let i12 = this.getHandleByIx(t11);
                if (i12) {
                  let s11 = this.proxyProvider.addProxyElement("navigator", { click: i12 }, "input", { type: "range", "aria-label": iW(r2, { handleIx: t11, chart: e10 }, e10) });
                  this[t11 ? "maxHandleProxy" : "minHandleProxy"] = s11.innerElement, s11.innerElement.style.pointerEvents = "none", s11.innerElement.oninput = () => this.updateNavigator();
                }
              }), this.updateHandleValues();
            } else this.proxyProvider.removeGroup("navigator");
          }
          getNavigatorHandleNavigation(e10) {
            let t10 = this, i10 = this.chart, s10 = e10 ? this.maxHandleProxy : this.minHandleProxy, r2 = this.keyCodes;
            return new et(i10, { keyCodeMap: [[[r2.left, r2.right, r2.up, r2.down], function(n2) {
              if (s10) {
                let o2 = n2 === r2.left || n2 === r2.up ? -1 : 1;
                s10.value = "" + iX(parseFloat(s10.value) + o2, 0, 100), t10.updateNavigator(() => {
                  let r3 = t10.getHandleByIx(e10);
                  r3 && i10.setFocusToElement(r3, s10);
                });
              }
              return this.response.success;
            }]], init: () => {
              i10.setFocusToElement(this.getHandleByIx(e10), s10);
            }, validate: () => {
              var _a;
              return !!(this.getHandleByIx(e10) && s10 && ((_a = i10.options.navigator.accessibility) == null ? void 0 : _a.enabled));
            } });
          }
          getKeyboardNavigation() {
            return [this.getNavigatorHandleNavigation(0), this.getNavigatorHandleNavigation(1)];
          }
          destroy() {
            this.updateNavigatorThrottleTimer && clearTimeout(this.updateNavigatorThrottleTimer), this.proxyProvider.removeGroup("navigator"), this.announcer && this.announcer.destroy();
          }
          updateHandleValues() {
            let e10 = this.chart.navigator;
            if (e10 && this.minHandleProxy && this.maxHandleProxy) {
              let t10 = e10.size;
              this.minHandleProxy.value = "" + Math.round(e10.zoomedMin / t10 * 100), this.maxHandleProxy.value = "" + Math.round(e10.zoomedMax / t10 * 100);
            }
          }
          getHandleByIx(e10) {
            let t10 = this.chart.navigator;
            return t10 && t10.handles && t10.handles[e10];
          }
          updateNavigator(e10) {
            let t10 = (e11) => {
              var _a, _b;
              let t11 = this.chart, { navigator: i10, pointer: s10 } = t11, r2 = (_a = this.chart.accessibility) == null ? void 0 : _a.keyboardNavigation;
              if (i10 && s10 && this.minHandleProxy && this.maxHandleProxy) {
                let n2 = s10.getChartPosition(), o2 = parseFloat(this.minHandleProxy.value) / 100 * i10.size, a2 = parseFloat(this.maxHandleProxy.value) / 100 * i10.size;
                [[0, "mousedown", i10.zoomedMin], [0, "mousemove", o2], [0, "mouseup", o2], [1, "mousedown", i10.zoomedMax], [1, "mousemove", a2], [1, "mouseup", a2]].forEach(([e12, t12, s11]) => {
                  var _a2;
                  let r3 = (_a2 = this.getHandleByIx(e12)) == null ? void 0 : _a2.element;
                  r3 && i$(r3, i_(t12, { x: n2.left + i10.left + s11, y: n2.top + i10.top }, r3));
                }), r2 && (r2.keyboardReset = false), e11 && e11();
                let l2 = (_b = t11.options.lang.accessibility) == null ? void 0 : _b.navigator.changeAnnouncement, h2 = iZ(t11.xAxis[0]);
                this.announcer.announce(iW(l2, { axisRangeDescription: h2, chart: t11 }, t11));
              }
            };
            this.updateNavigatorThrottleTimer && clearTimeout(this.updateNavigatorThrottleTimer), this.updateNavigatorThrottleTimer = setTimeout(t10.bind(this, e10), 20);
          }
        }, { getPointAnnotationTexts: iJ } = eA, { getAxisDescription: i0, getSeriesFirstPointElement: i1, getSeriesA11yElement: i2, unhideChartElementFromAT: i3 } = W, { format: i5, numberFormat: i4 } = D(), { reverseChildNodes: i6, stripHTMLTagsFromString: i9 } = S, { find: i8, isNumber: i7, isString: se, pick: st, defined: si } = w();
        function ss(e10) {
          let t10 = e10.chart.options.accessibility.series.pointDescriptionEnabledThreshold;
          return !!(false !== t10 && e10.points && e10.points.length >= +t10);
        }
        function sr(e10, t10) {
          let i10 = e10.series, s10 = i10.chart, r2 = s10.options.accessibility.point || {}, n2 = i10.options.accessibility && i10.options.accessibility.point || {}, o2 = i10.tooltipOptions || {}, a2 = s10.options.lang;
          return i7(t10) ? i4(t10, n2.valueDecimals || r2.valueDecimals || o2.valueDecimals || -1, a2.decimalPoint, a2.accessibility.thousandsSep || a2.thousandsSep) : t10;
        }
        function sn(e10, t10) {
          let i10 = e10[t10];
          return e10.chart.langFormat("accessibility.series." + t10 + "Description", { name: i0(i10), series: e10 });
        }
        function so(e10) {
          let t10, i10, s10, r2, n2, o2, a2, l2, h2, c2, d2, u2, p2 = e10.series, g2 = p2.chart.series.length > 1 || p2.options.name, m2 = (o2 = (n2 = e10.series).chart, l2 = (a2 = n2.options.accessibility) && a2.point && a2.point.valueDescriptionFormat || o2.options.accessibility.point.valueDescriptionFormat, c2 = (h2 = st(n2.xAxis && n2.xAxis.options.accessibility && n2.xAxis.options.accessibility.enabled, !o2.angular && "flowmap" !== n2.type)) ? (t10 = (function(e11) {
            let t11 = e11.series, i11 = t11.chart, s11 = t11.options.accessibility && t11.options.accessibility.point || {}, r3 = i11.options.accessibility.point || {}, n3 = t11.xAxis && t11.xAxis.dateTime;
            if (n3) {
              let t12 = n3.getXDateFormat(e11.x || 0, i11.options.tooltip.dateTimeLabelFormats), o3 = s11.dateFormatter && s11.dateFormatter(e11) || r3.dateFormatter && r3.dateFormatter(e11) || s11.dateFormat || r3.dateFormat || t12;
              return i11.time.dateFormat(o3, e11.x || 0, void 0);
            }
          })(e10), i10 = (e10.series.xAxis || {}).categories && si(e10.category) && ("" + e10.category).replace("<br/>", " "), s10 = si(e10.id) && 0 > ("" + e10.id).indexOf("highcharts-"), r2 = "x, " + e10.x, e10.name || t10 || i10 || (s10 ? e10.id : r2)) : "", i5(l2, { point: e10, index: si(e10.index) ? e10.index + 1 : "", xDescription: c2, value: (function(e11) {
            let t11 = e11.series, i11 = t11.chart.options.accessibility.point || {}, s11 = t11.chart.options.accessibility && t11.chart.options.accessibility.point || {}, r3 = t11.tooltipOptions || {}, n3 = s11.valuePrefix || i11.valuePrefix || r3.valuePrefix || "", o3 = s11.valueSuffix || i11.valueSuffix || r3.valueSuffix || "", a3 = void 0 !== e11.value ? "value" : "y", l3 = sr(e11, e11[a3]);
            if (e11.isNull) return t11.chart.langFormat("accessibility.series.nullPointValue", { point: e11 });
            if (t11.pointArrayMap) {
              let t12, i12, s12;
              return t12 = n3 || "", i12 = o3 || "", s12 = function(s13) {
                let r4 = sr(e11, st(e11[s13], e11.options[s13]));
                return void 0 !== r4 ? s13 + ": " + t12 + r4 + i12 : r4;
              }, e11.series.pointArrayMap.reduce(function(e12, t13) {
                let i13 = s12(t13);
                return i13 ? e12 + (e12.length ? ", " : "") + i13 : e12;
              }, "");
            }
            return n3 + l3 + o3;
          })(e10), separator: h2 ? ", " : "" }, o2)), b2 = e10.options && e10.options.accessibility && e10.options.accessibility.description, x2 = g2 ? " " + p2.name + "." : "", f2 = (d2 = e10.series.chart, (u2 = iJ(e10)).length ? d2.langFormat("accessibility.series.pointAnnotationsDescription", { point: e10, annotations: u2 }) : "");
          return e10.accessibility = e10.accessibility || {}, e10.accessibility.valueDescription = m2, m2 + (b2 ? " " + b2 : "") + x2 + (f2 ? " " + f2 : "");
        }
        function sa(e10) {
          let t10, i10 = e10.chart, s10 = i10.types || [], r2 = (t10 = (e10.options.accessibility || {}).description) && e10.chart.langFormat("accessibility.series.description", { description: t10, series: e10 }) || "", n2 = function(t11) {
            return i10[t11] && i10[t11].length > 1 && e10[t11];
          }, o2 = e10.index + 1, a2 = sn(e10, "xAxis"), l2 = sn(e10, "yAxis"), h2 = { seriesNumber: o2, series: e10, chart: i10 }, c2 = s10.length > 1 ? "Combination" : "", d2 = i10.langFormat("accessibility.series.summary." + e10.type + c2, h2) || i10.langFormat("accessibility.series.summary.default" + c2, h2), u2 = (n2("yAxis") ? " " + l2 + "." : "") + (n2("xAxis") ? " " + a2 + "." : "");
          return i5(st(e10.options.accessibility && e10.options.accessibility.descriptionFormat, i10.options.accessibility.series.descriptionFormat, ""), { seriesDescription: d2, authorDescription: r2 ? " " + r2 : "", axisDescription: u2, series: e10, chart: i10, seriesNumber: o2 }, void 0);
        }
        let sl = { defaultPointDescriptionFormatter: so, defaultSeriesDescriptionFormatter: sa, describeSeries: function(e10) {
          let t10 = e10.chart, i10 = i1(e10), s10 = i2(e10), r2 = t10.is3d && t10.is3d();
          if (s10) {
            let n2, o2, a2, l2, h2, c2, d2, u2, p2, g2, m2;
            if (s10.lastChild !== i10 || r2 || i6(s10), n2 = e10.options.accessibility || {}, a2 = !ss(e10) && !n2.exposeAsGroupOnly, o2 = e10.chart.options.accessibility.keyboardNavigation.seriesNavigation, l2 = !!(e10.points && (e10.points.length < +o2.pointNavigationEnabledThreshold || false === o2.pointNavigationEnabledThreshold)), h2 = e10.chart.options.accessibility.point.describeNull, (a2 || l2) && e10.points.forEach((t11) => {
              var _a, _b, _c;
              let i11, s11, r3, n3, o3, l3 = t11.graphic && t11.graphic.element || (s11 = (i11 = t11.series) && i11.chart, r3 = i11 && i11.is("sunburst"), n3 = t11.isNull, o3 = s11 && s11.options.accessibility.point.describeNull, n3 && !r3 && o3 && (function(e11) {
                let t12, i12 = e11.series, s12 = (function(e12) {
                  var _a2;
                  let t13 = e12.index;
                  if (!e12.series || !e12.series.data || !si(t13)) return null;
                  let i13 = (_a2 = e12.series.options) == null ? void 0 : _a2.nullInteraction;
                  return i8(e12.series.data, function(e13) {
                    return !!(e13 && void 0 !== e13.index && (i13 || e13.index > t13) && e13.graphic && e13.graphic.element);
                  }) || null;
                })(e11), r4 = s12 && s12.graphic, n4 = r4 ? r4.parentGroup : i12.graph || i12.group, o4 = s12 ? { x: st(e11.plotX, s12.plotX, 0), y: st(e11.plotY, s12.plotY, 0) } : { x: st(e11.plotX, 0), y: st(e11.plotY, 0) }, a3 = ((t12 = e11.series.chart.renderer.rect(o4.x, o4.y, 1, 1)).attr({ class: "highcharts-a11y-mock-point", fill: "none", opacity: 0, "fill-opacity": 0, "stroke-opacity": 0 }), t12);
                if (n4 && n4.element) return e11.graphic = a3, e11.hasMockGraphic = true, a3.add(n4), n4.element.insertBefore(a3.element, r4 ? r4.element : null), a3.element;
              })(t11)), c3 = t11.options && t11.options.accessibility && false === t11.options.accessibility.enabled;
              if (l3) {
                if (t11.isNull && !h2) return void l3.setAttribute("aria-hidden", true);
                if (l3.setAttribute("tabindex", "-1"), e10.chart.styledMode || (l3.style.outline = "none"), a2 && !c3) {
                  let e11, i12, s12, r4;
                  e11 = t11.series, i12 = ((_a = e11.options.accessibility) == null ? void 0 : _a.point) || {}, s12 = e11.chart.options.accessibility.point || {}, r4 = i9(se(i12.descriptionFormat) && i5(i12.descriptionFormat, t11, e11.chart) || ((_b = i12.descriptionFormatter) == null ? void 0 : _b.call(i12, t11)) || se(s12.descriptionFormat) && i5(s12.descriptionFormat, t11, e11.chart) || ((_c = s12.descriptionFormatter) == null ? void 0 : _c.call(s12, t11)) || so(t11), e11.chart.renderer.forExport), l3.setAttribute("role", "img"), l3.setAttribute("aria-label", r4);
                } else l3.setAttribute("aria-hidden", true);
              }
            }), i3(t10, s10), u2 = (d2 = (c2 = e10.chart).options.chart).options3d && d2.options3d.enabled, p2 = c2.series.length > 1, g2 = c2.options.accessibility.series.describeSingleSeries, m2 = (e10.options.accessibility || {}).exposeAsGroupOnly, !(u2 && p2) && (p2 || g2 || m2 || ss(e10))) {
              let t11, i11, r3;
              t11 = e10.options.accessibility || {}, r3 = (i11 = e10.chart.options.accessibility).landmarkVerbosity, t11.exposeAsGroupOnly ? s10.setAttribute("role", "img") : "all" === r3 ? s10.setAttribute("role", "region") : s10.setAttribute("role", "group"), s10.setAttribute("tabindex", "-1"), e10.chart.styledMode || (s10.style.outline = "none"), s10.setAttribute("aria-label", i9(i11.series.descriptionFormatter && i11.series.descriptionFormatter(e10) || sa(e10), e10.chart.renderer.forExport));
            } else s10.removeAttribute("aria-label");
          }
        } }, { composed: sh } = w(), { addEvent: sc, defined: sd, pushUnique: su } = w(), { getChartTitle: sp } = W, { defaultPointDescriptionFormatter: sg, defaultSeriesDescriptionFormatter: sm } = sl;
        function sb(e10) {
          return !!e10.options.accessibility.announceNewData.enabled;
        }
        class sx {
          constructor(e10) {
            this.dirty = { allSeries: {} }, this.lastAnnouncementTime = 0, this.chart = e10;
          }
          init() {
            let e10 = this.chart, t10 = e10.options.accessibility.announceNewData.interruptUser ? "assertive" : "polite";
            this.lastAnnouncementTime = 0, this.dirty = { allSeries: {} }, this.eventProvider = new Z(), this.announcer = new eb(e10, t10), this.addEventListeners();
          }
          destroy() {
            this.eventProvider.removeAddedEvents(), this.announcer.destroy();
          }
          addEventListeners() {
            let e10 = this, t10 = this.chart, i10 = this.eventProvider;
            i10.addEvent(t10, "afterApplyDrilldown", function() {
              e10.lastAnnouncementTime = 0;
            }), i10.addEvent(t10, "afterAddSeries", function(t11) {
              e10.onSeriesAdded(t11.series);
            }), i10.addEvent(t10, "redraw", function() {
              e10.announceDirtyData();
            });
          }
          onSeriesAdded(e10) {
            sb(this.chart) && (this.dirty.hasDirty = true, this.dirty.allSeries[e10.name + e10.index] = e10, this.dirty.newSeries = sd(this.dirty.newSeries) ? void 0 : e10);
          }
          announceDirtyData() {
            let e10 = this.chart, t10 = this;
            if (e10.options.accessibility.announceNewData && this.dirty.hasDirty) {
              var i10;
              let e11, s10 = this.dirty.newPoint;
              s10 && (s10 = 1 === (e11 = (i10 = s10).series.data.filter((e12) => i10.x === e12.x && i10.y === e12.y)).length ? e11[0] : i10), this.queueAnnouncement(Object.keys(this.dirty.allSeries).map((e12) => t10.dirty.allSeries[e12]), this.dirty.newSeries, s10), this.dirty = { allSeries: {} };
            }
          }
          queueAnnouncement(e10, t10, i10) {
            let s10 = this.chart.options.accessibility.announceNewData;
            if (s10.enabled) {
              var r2;
              let n2, o2 = +/* @__PURE__ */ new Date(), a2 = o2 - this.lastAnnouncementTime, l2 = Math.max(0, s10.minAnnounceInterval - a2), h2 = (r2 = this.queuedAnnouncement && this.queuedAnnouncement.series, Object.keys(n2 = (r2 || []).concat(e10 || []).reduce((e11, t11) => (e11[t11.name + t11.index] = t11, e11), {})).map((e11) => n2[e11])), c2 = this.buildAnnouncementMessage(h2, t10, i10);
              c2 && (this.queuedAnnouncement && clearTimeout(this.queuedAnnouncementTimer), this.queuedAnnouncement = { time: o2, message: c2, series: h2 }, this.queuedAnnouncementTimer = setTimeout(() => {
                this && this.announcer && (this.lastAnnouncementTime = +/* @__PURE__ */ new Date(), this.announcer.announce(this.queuedAnnouncement.message), delete this.queuedAnnouncement, delete this.queuedAnnouncementTimer);
              }, l2));
            }
          }
          buildAnnouncementMessage(e10, t10, i10) {
            let s10 = this.chart, r2 = s10.options.accessibility.announceNewData;
            if (r2.announcementFormatter) {
              let s11 = r2.announcementFormatter(e10, t10, i10);
              if (false !== s11) return s11.length ? s11 : null;
            }
            let n2 = w().charts && w().charts.length > 1 ? "Multiple" : "Single", o2 = t10 ? "newSeriesAnnounce" + n2 : i10 ? "newPointAnnounce" + n2 : "newDataAnnounce", a2 = sp(s10);
            return s10.langFormat("accessibility.announceNewData." + o2, { chartTitle: a2, seriesDesc: t10 ? sm(t10) : null, pointDesc: i10 ? sg(i10) : null, point: i10, series: t10 });
          }
        }
        function sf(e10) {
          var _a;
          let t10 = this.chart, i10 = (_a = t10.accessibility) == null ? void 0 : _a.components.series.newDataAnnouncer;
          i10 && i10.chart === t10 && sb(t10) && (i10.dirty.newPoint = sd(i10.dirty.newPoint) ? void 0 : e10.point);
        }
        function sy() {
          var _a;
          let e10 = this.chart, t10 = (_a = e10.accessibility) == null ? void 0 : _a.components.series.newDataAnnouncer;
          t10 && t10.chart === e10 && sb(e10) && (t10.dirty.hasDirty = true, t10.dirty.allSeries[this.name + this.index] = this);
        }
        (sx || (sx = {})).compose = function(e10) {
          su(sh, "A11y.NDA") && (sc(e10, "addPoint", sf), sc(e10, "updatedData", sy));
        };
        let sv = sx, { doc: sw, win: sE } = w(), { attr: sA, css: sT, merge: sM } = w(), { fireEventOnWrappedOrUnwrappedElement: sk } = W, { cloneMouseEvent: sC, cloneTouchEvent: sS, getFakeMouseEvent: sP, removeElement: sD } = S, sN = class {
          constructor(e10, t10, i10 = "button", s10, r2) {
            this.chart = e10, this.target = t10, this.eventProvider = new Z();
            const n2 = this.innerElement = sw.createElement(i10), o2 = this.element = s10 ? sw.createElement(s10) : n2;
            e10.styledMode || this.hideElementVisually(n2), s10 && ("li" !== s10 || e10.styledMode || (o2.style.listStyle = "none"), o2.appendChild(n2), this.element = o2), this.updateTarget(t10, r2);
          }
          click() {
            let e10 = this.getTargetPosition();
            e10.x += e10.width / 2, e10.y += e10.height / 2;
            let t10 = sP("click", e10);
            sk(this.target.click, t10);
          }
          updateTarget(e10, t10) {
            this.target = e10, this.updateCSSClassName();
            let i10 = t10 || {};
            Object.keys(i10).forEach((e11) => {
              null === i10[e11] && delete i10[e11];
            });
            let s10 = this.getTargetAttr(e10.click, "aria-label");
            sA(this.innerElement, sM(s10 ? { "aria-label": s10 } : {}, i10)), this.eventProvider.removeAddedEvents(), this.addProxyEventsToElement(this.innerElement, e10.click), this.refreshPosition();
          }
          refreshPosition() {
            let e10 = this.getTargetPosition();
            sT(this.innerElement, { width: (e10.width || 1) + "px", height: (e10.height || 1) + "px", left: (Math.round(e10.x) || 0) + "px", top: (Math.round(e10.y) || 0) + "px" });
          }
          remove() {
            this.eventProvider.removeAddedEvents(), sD(this.element);
          }
          updateCSSClassName() {
            let e10 = (e11) => e11.indexOf("highcharts-no-tooltip") > -1, t10 = this.chart.legend, i10 = t10.group && t10.group.div, s10 = e10(i10 && i10.className || ""), r2 = e10(this.getTargetAttr(this.target.click, "class") || "");
            this.innerElement.className = s10 || r2 ? "highcharts-a11y-proxy-element highcharts-no-tooltip" : "highcharts-a11y-proxy-element";
          }
          addProxyEventsToElement(e10, t10) {
            ["click", "touchstart", "touchend", "touchcancel", "touchmove", "mouseover", "mouseenter", "mouseleave", "mouseout"].forEach((i10) => {
              let s10 = 0 === i10.indexOf("touch");
              this.eventProvider.addEvent(e10, i10, (e11) => {
                let i11 = s10 ? sS(e11) : sC(e11);
                t10 && sk(t10, i11), e11.stopPropagation(), s10 || e11.preventDefault();
              }, { passive: false });
            });
          }
          hideElementVisually(e10) {
            sT(e10, { borderWidth: 0, backgroundColor: "transparent", cursor: "pointer", outline: "none", opacity: 1e-3, filter: "alpha(opacity=1)", zIndex: 999, overflow: "hidden", padding: 0, margin: 0, display: "block", position: "absolute", "-ms-filter": "progid:DXImageTransform.Microsoft.Alpha(Opacity=1)" });
          }
          getTargetPosition() {
            let e10 = this.target.click, t10 = e10.element ? e10.element : e10, i10 = this.target.visual || t10, s10 = this.chart.renderTo, r2 = this.chart.pointer;
            if (s10 && (i10 == null ? void 0 : i10.getBoundingClientRect) && r2) {
              let e11 = sE.scrollY || sw.documentElement.scrollTop, t11 = i10.getBoundingClientRect(), s11 = r2.getChartPosition();
              return { x: (t11.left - s11.left) / s11.scaleX, y: (t11.top + e11 - s11.top) / s11.scaleY, width: t11.right / s11.scaleX - t11.left / s11.scaleX, height: t11.bottom / s11.scaleY - t11.top / s11.scaleY };
            }
            return { x: 0, y: 0, width: 1, height: 1 };
          }
          getTargetAttr(e10, t10) {
            return e10.element ? e10.element.getAttribute(t10) : e10.getAttribute(t10);
          }
        }, { doc: sB } = w(), { attr: sI, css: sF } = w(), { unhideChartElementFromAT: sO } = W, { removeChildNodes: sR } = S, sL = class {
          constructor(e10) {
            this.chart = e10, this.domElementProvider = new j(), this.groups = {}, this.groupOrder = [], this.beforeChartProxyPosContainer = this.createProxyPosContainer("before"), this.afterChartProxyPosContainer = this.createProxyPosContainer("after"), this.update();
          }
          addProxyElement(e10, t10, i10 = "button", s10) {
            let r2 = this.groups[e10];
            if (!r2) throw Error("ProxyProvider.addProxyElement: Invalid group key " + e10);
            let n2 = "ul" === r2.type || "ol" === r2.type ? "li" : void 0, o2 = new sN(this.chart, t10, i10, n2, s10);
            return r2.proxyContainerElement.appendChild(o2.element), r2.proxyElements.push(o2), o2;
          }
          addGroup(e10, t10 = "div", i10) {
            let s10, r2 = this.groups[e10];
            if (r2) return r2.groupElement;
            let n2 = this.domElementProvider.createElement(t10);
            return i10 && i10.role && "div" !== t10 ? (s10 = this.domElementProvider.createElement("div")).appendChild(n2) : s10 = n2, s10.className = "highcharts-a11y-proxy-group highcharts-a11y-proxy-group-" + e10.replace(/\W/g, "-"), this.groups[e10] = { proxyContainerElement: n2, groupElement: s10, type: t10, proxyElements: [] }, sI(s10, i10 || {}), "ul" === t10 && n2.setAttribute("role", "list"), this.afterChartProxyPosContainer.appendChild(s10), this.updateGroupOrder(this.groupOrder), s10;
          }
          updateGroupAttrs(e10, t10) {
            let i10 = this.groups[e10];
            if (!i10) throw Error("ProxyProvider.updateGroupAttrs: Invalid group key " + e10);
            sI(i10.groupElement, t10);
          }
          updateGroupOrder(e10) {
            if (this.groupOrder = e10.slice(), this.isDOMOrderGroupOrder()) return;
            let t10 = e10.indexOf("series"), i10 = t10 > -1 ? e10.slice(0, t10) : e10, s10 = t10 > -1 ? e10.slice(t10 + 1) : [], r2 = sB.activeElement;
            ["before", "after"].forEach((e11) => {
              let t11 = this["before" === e11 ? "beforeChartProxyPosContainer" : "afterChartProxyPosContainer"];
              sR(t11), ("before" === e11 ? i10 : s10).forEach((e12) => {
                let i11 = this.groups[e12];
                i11 && t11.appendChild(i11.groupElement);
              });
            }), (this.beforeChartProxyPosContainer.contains(r2) || this.afterChartProxyPosContainer.contains(r2)) && r2 && r2.focus && r2.focus();
          }
          clearGroup(e10) {
            let t10 = this.groups[e10];
            if (!t10) throw Error("ProxyProvider.clearGroup: Invalid group key " + e10);
            sR(t10.proxyContainerElement);
          }
          removeGroup(e10) {
            let t10 = this.groups[e10];
            t10 && (this.domElementProvider.removeElement(t10.groupElement), t10.groupElement !== t10.proxyContainerElement && this.domElementProvider.removeElement(t10.proxyContainerElement), delete this.groups[e10]);
          }
          update() {
            this.updatePosContainerPositions(), this.updateGroupOrder(this.groupOrder), this.updateProxyElementPositions();
          }
          updateProxyElementPositions() {
            Object.keys(this.groups).forEach(this.updateGroupProxyElementPositions.bind(this));
          }
          updateGroupProxyElementPositions(e10) {
            let t10 = this.groups[e10];
            t10 && t10.proxyElements.forEach((e11) => e11.refreshPosition());
          }
          destroy() {
            this.domElementProvider.destroyCreatedElements();
          }
          createProxyPosContainer(e10) {
            let t10 = this.domElementProvider.createElement("div");
            return t10.setAttribute("aria-hidden", "false"), t10.className = "highcharts-a11y-proxy-container" + (e10 ? "-" + e10 : ""), sF(t10, { top: "0", left: "0" }), this.chart.styledMode || (t10.style.whiteSpace = "nowrap", t10.style.position = "absolute"), t10;
          }
          getCurrentGroupOrderInDOM() {
            let e10 = (e11) => {
              let t11 = Object.keys(this.groups), i11 = t11.length;
              for (; i11--; ) {
                let s11 = t11[i11], r2 = this.groups[s11];
                if (r2 && e11 === r2.groupElement) return s11;
              }
            }, t10 = (t11) => {
              let i11 = [], s11 = t11.children;
              for (let t12 = 0; t12 < s11.length; ++t12) {
                let r2 = e10(s11[t12]);
                r2 && i11.push(r2);
              }
              return i11;
            }, i10 = t10(this.beforeChartProxyPosContainer), s10 = t10(this.afterChartProxyPosContainer);
            return i10.push("series"), i10.concat(s10);
          }
          isDOMOrderGroupOrder() {
            let e10 = this.getCurrentGroupOrderInDOM(), t10 = this.groupOrder.filter((e11) => "series" === e11 || !!this.groups[e11]), i10 = e10.length;
            if (i10 !== t10.length) return false;
            for (; i10--; ) if (e10[i10] !== t10[i10]) return false;
            return true;
          }
          updatePosContainerPositions() {
            let e10 = this.chart;
            if (e10.renderer.forExport) return;
            let t10 = e10.renderer.box;
            e10.container.insertBefore(this.afterChartProxyPosContainer, t10.nextSibling), e10.container.insertBefore(this.beforeChartProxyPosContainer, t10), sO(this.chart, this.afterChartProxyPosContainer), sO(this.chart, this.beforeChartProxyPosContainer);
          }
        }, { unhideChartElementFromAT: sH, getAxisRangeDescription: sz } = W, { addEvent: sq, attr: sU } = w();
        class sG extends J {
          init() {
            let e10 = this.chart;
            this.announcer = new eb(e10, "polite");
          }
          onChartUpdate() {
            let e10 = this.chart, t10 = this, i10 = e10.rangeSelector;
            i10 && (this.updateSelectorVisibility(), this.setDropdownAttrs(), i10.buttons && i10.buttons.length && i10.buttons.forEach((e11) => {
              t10.setRangeButtonAttrs(e11);
            }), i10.maxInput && i10.minInput && ["minInput", "maxInput"].forEach(function(s10, r2) {
              let n2 = i10[s10];
              n2 && (sH(e10, n2), t10.setRangeInputAttrs(n2, "accessibility.rangeSelector." + (r2 ? "max" : "min") + "InputLabel"));
            }));
          }
          updateSelectorVisibility() {
            let e10 = this.chart, t10 = e10.rangeSelector, i10 = t10 && t10.dropdown, s10 = t10 && t10.buttons || [];
            t10 && t10.hasVisibleDropdown && i10 ? (sH(e10, i10), s10.forEach((e11) => e11.element.setAttribute("aria-hidden", true))) : (i10 && i10.setAttribute("aria-hidden", true), s10.forEach((t11) => sH(e10, t11.element)));
          }
          setDropdownAttrs() {
            let e10 = this.chart, t10 = e10.rangeSelector && e10.rangeSelector.dropdown;
            if (t10) {
              let i10 = e10.langFormat("accessibility.rangeSelector.dropdownLabel", { rangeTitle: e10.options.lang.rangeSelectorZoom });
              t10.setAttribute("aria-label", i10), t10.setAttribute("tabindex", -1);
            }
          }
          setRangeButtonAttrs(e10) {
            sU(e10.element, { tabindex: -1, role: "button" });
          }
          setRangeInputAttrs(e10, t10) {
            let i10 = this.chart;
            sU(e10, { tabindex: -1, "aria-label": i10.langFormat(t10, { chart: i10 }) });
          }
          onButtonNavKbdArrowKey(e10, t10) {
            let i10 = e10.response, s10 = this.keyCodes, r2 = this.chart, n2 = r2.options.accessibility.keyboardNavigation.wrapAround, o2 = t10 === s10.left || t10 === s10.up ? -1 : 1;
            return r2.highlightRangeSelectorButton(r2.highlightedRangeSelectorItemIx + o2) ? i10.success : n2 ? (e10.init(o2), i10.success) : i10[o2 > 0 ? "next" : "prev"];
          }
          onButtonNavKbdClick(e10) {
            let t10 = e10.response, i10 = this.chart;
            return 3 !== i10.oldRangeSelectorItemState && this.fakeClickEvent(i10.rangeSelector.buttons[i10.highlightedRangeSelectorItemIx].element), t10.success;
          }
          onAfterBtnClick() {
            let e10 = this.chart, t10 = sz(e10.xAxis[0]), i10 = e10.langFormat("accessibility.rangeSelector.clickButtonAnnouncement", { chart: e10, axisRangeDescription: t10 });
            i10 && this.announcer.announce(i10);
          }
          onInputKbdMove(e10) {
            let t10 = this.chart, i10 = t10.rangeSelector, s10 = t10.highlightedInputRangeIx = (t10.highlightedInputRangeIx || 0) + e10;
            if (s10 > 1 || s10 < 0) {
              if (t10.accessibility) return t10.accessibility.keyboardNavigation.exiting = true, t10.accessibility.keyboardNavigation.tabindexContainer.focus(), t10.accessibility.keyboardNavigation.move(e10);
            } else if (i10) {
              let e11 = i10[s10 ? "maxDateBox" : "minDateBox"], r2 = i10[s10 ? "maxInput" : "minInput"];
              e11 && r2 && t10.setFocusToElement(e11, r2);
            }
            return true;
          }
          onInputNavInit(e10) {
            let t10 = this, i10 = this.chart, s10 = e10 > 0 ? 0 : 1, r2 = i10.rangeSelector, n2 = r2 && r2[s10 ? "maxDateBox" : "minDateBox"], o2 = r2 && r2.minInput, a2 = r2 && r2.maxInput;
            if (i10.highlightedInputRangeIx = s10, n2 && o2 && a2) {
              i10.setFocusToElement(n2, s10 ? a2 : o2), this.removeInputKeydownHandler && this.removeInputKeydownHandler();
              let e11 = (e12) => {
                (e12.which || e12.keyCode) === this.keyCodes.tab && t10.onInputKbdMove(e12.shiftKey ? -1 : 1) && (e12.preventDefault(), e12.stopPropagation());
              }, r3 = sq(o2, "keydown", e11), l2 = sq(a2, "keydown", e11);
              this.removeInputKeydownHandler = () => {
                r3(), l2();
              };
            }
          }
          onInputNavTerminate() {
            let e10 = this.chart.rangeSelector || {};
            e10.maxInput && e10.hideInput("max"), e10.minInput && e10.hideInput("min"), this.removeInputKeydownHandler && (this.removeInputKeydownHandler(), delete this.removeInputKeydownHandler);
          }
          initDropdownNav() {
            let e10 = this.chart, t10 = e10.rangeSelector, i10 = t10 && t10.dropdown;
            t10 && i10 && (e10.setFocusToElement(t10.buttonGroup, i10), this.removeDropdownKeydownHandler && this.removeDropdownKeydownHandler(), this.removeDropdownKeydownHandler = sq(i10, "keydown", (t11) => {
              let i11 = (t11.which || t11.keyCode) === this.keyCodes.tab, s10 = e10.accessibility;
              i11 && (t11.preventDefault(), t11.stopPropagation(), s10 && s10.keyboardNavigation.move(t11.shiftKey ? -1 : 1));
            }));
          }
          getRangeSelectorButtonNavigation() {
            let e10 = this.chart, t10 = this.keyCodes, i10 = this;
            return new et(e10, { keyCodeMap: [[[t10.left, t10.right, t10.up, t10.down], function(e11) {
              return i10.onButtonNavKbdArrowKey(this, e11);
            }], [[t10.enter, t10.space], function() {
              return i10.onButtonNavKbdClick(this);
            }]], validate: function() {
              return !!(e10.rangeSelector && e10.rangeSelector.buttons && e10.rangeSelector.buttons.length);
            }, init: function(t11) {
              let s10 = e10.rangeSelector;
              if (s10 && s10.hasVisibleDropdown) i10.initDropdownNav();
              else if (s10) {
                let i11 = s10.buttons.length - 1;
                e10.highlightRangeSelectorButton(t11 > 0 ? 0 : i11);
              }
            }, terminate: function() {
              i10.removeDropdownKeydownHandler && (i10.removeDropdownKeydownHandler(), delete i10.removeDropdownKeydownHandler);
            } });
          }
          getRangeSelectorInputNavigation() {
            let e10 = this.chart, t10 = this;
            return new et(e10, { keyCodeMap: [], validate: function() {
              return !!(e10.rangeSelector && e10.rangeSelector.inputGroup && "hidden" !== e10.rangeSelector.inputGroup.element.style.visibility && false !== e10.options.rangeSelector.inputEnabled && e10.rangeSelector.minInput && e10.rangeSelector.maxInput);
            }, init: function(e11) {
              t10.onInputNavInit(e11);
            }, terminate: function() {
              t10.onInputNavTerminate();
            } });
          }
          getKeyboardNavigation() {
            return [this.getRangeSelectorButtonNavigation(), this.getRangeSelectorInputNavigation()];
          }
          destroy() {
            this.removeDropdownKeydownHandler && this.removeDropdownKeydownHandler(), this.removeInputKeydownHandler && this.removeInputKeydownHandler(), this.announcer && this.announcer.destroy();
          }
        }
        function sK(e10) {
          let t10 = this.rangeSelector && this.rangeSelector.buttons || [], i10 = this.highlightedRangeSelectorItemIx, s10 = this.rangeSelector && this.rangeSelector.selected;
          return void 0 !== i10 && t10[i10] && i10 !== s10 && t10[i10].setState(this.oldRangeSelectorItemState || 0), this.highlightedRangeSelectorItemIx = e10, !!t10[e10] && (this.setFocusToElement(t10[e10].box, t10[e10].element), e10 !== s10 && (this.oldRangeSelectorItemState = t10[e10].state, t10[e10].setState(1)), true);
        }
        function sV() {
          let e10 = this.chart.accessibility;
          if (e10 && e10.components.rangeSelector) return e10.components.rangeSelector.onAfterBtnClick();
        }
        (sG || (sG = {})).compose = function(e10, t10) {
          let i10 = e10.prototype;
          i10.highlightRangeSelectorButton || (i10.highlightRangeSelectorButton = sK, sq(t10, "afterBtnClick", sV));
        };
        let sW = sG, { composed: sX } = w(), { addEvent: sY, merge: sj, pushUnique: s_ } = w();
        !(function(e10) {
          function t10(e11) {
            sj(true, e11, { marker: { enabled: true, states: { normal: { opacity: 0 } } } });
          }
          function i10(e11) {
            return e11.marker.states && e11.marker.states.normal && e11.marker.states.normal.opacity;
          }
          function s10(e11) {
            return !!(e11._hasPointMarkers && e11.points && e11.points.length);
          }
          function r2() {
            this.chart.styledMode && (this.markerGroup && this.markerGroup[this.a11yMarkersForced ? "addClass" : "removeClass"]("highcharts-a11y-markers-hidden"), s10(this) && this.points.forEach((e11) => {
              e11.graphic && (e11.graphic[e11.hasForcedA11yMarker ? "addClass" : "removeClass"]("highcharts-a11y-marker-hidden"), e11.graphic[false === e11.hasForcedA11yMarker ? "addClass" : "removeClass"]("highcharts-a11y-marker-visible"));
            }));
          }
          function n2(e11) {
            this.resetA11yMarkerOptions = sj(e11.options.marker || {}, this.userOptions.marker || {});
          }
          function o2() {
            let e11 = this.options;
            !(function(e12) {
              let t11, i11 = e12.chart.options.accessibility.enabled, s11 = false !== (e12.options.accessibility && e12.options.accessibility.enabled);
              return i11 && s11 && (t11 = e12.chart.options.accessibility, e12.points.length < t11.series.pointDescriptionEnabledThreshold || false === t11.series.pointDescriptionEnabledThreshold);
            })(this) ? this.a11yMarkersForced && (delete this.a11yMarkersForced, this.isDirty = true, (function(e12) {
              let t11 = e12.resetA11yMarkerOptions;
              if (t11) {
                let i11 = t11.states && t11.states.normal && t11.states.normal.opacity;
                e12.chart.styledMode && false === t11.enabled && e12.points && e12.points.forEach((e13) => {
                  e13.graphic && (e13.graphic = e13.graphic.destroy());
                }), e12.userOptions && e12.userOptions.marker && (e12.userOptions.marker.enabled = true), e12.update({ marker: { enabled: t11.enabled, states: { normal: { opacity: i11 } } } });
              }
            })(this), e11.marker && false === e11.marker.enabled && delete this.resetA11yMarkerOptions) : (e11.marker && false === e11.marker.enabled && (this.a11yMarkersForced = true, t10(this.options)), s10(this) && (function(e12) {
              let s11 = e12.points.length;
              for (; s11--; ) {
                let n3 = e12.points[s11], o3 = n3.options, a3 = n3.hasForcedA11yMarker;
                if (delete n3.hasForcedA11yMarker, o3.marker) {
                  var r3;
                  let e13 = a3 && 0 === i10(o3);
                  o3.marker.enabled && !e13 ? (sj(true, (r3 = o3).marker, { states: { normal: { opacity: i10(r3) || 1 } } }), n3.hasForcedA11yMarker = false) : false === o3.marker.enabled && (t10(o3), n3.hasForcedA11yMarker = true);
                }
              }
            })(this));
          }
          function a2() {
            this.boosted && this.a11yMarkersForced && (sj(true, this.options, { marker: { enabled: false } }), delete this.a11yMarkersForced);
          }
          e10.compose = function(e11) {
            s_(sX, "A11y.FM") && (sY(e11, "afterSetOptions", n2), sY(e11, "render", o2), sY(e11, "afterRender", r2), sY(e11, "renderCanvas", a2));
          };
        })(m || (m = {}));
        let sZ = m;
        var s$ = f(260), sQ = f.n(s$), sJ = f(820), s0 = f.n(sJ);
        let { seriesTypes: s1 } = tU(), { doc: s2 } = w(), { defined: s3, fireEvent: s5 } = w(), { getPointFromXY: s4, getSeriesFromName: s6, scrollAxisToPoint: s9 } = W;
        function s8(e10) {
          let t10 = e10.index, i10 = e10.series.points, s10 = i10.length;
          if (i10[t10] === e10) return t10;
          for (; s10--; ) if (i10[s10] === e10) return s10;
        }
        function s7(e10) {
          let t10 = e10.chart.options.accessibility.keyboardNavigation.seriesNavigation, i10 = e10.options.accessibility || {}, s10 = i10.keyboardNavigation;
          return s10 && false === s10.enabled || false === i10.enabled || false === e10.options.enableMouseTracking || !e10.visible || t10.pointNavigationEnabledThreshold && +t10.pointNavigationEnabledThreshold <= e10.points.length;
        }
        function re(e10) {
          var _a;
          let t10 = e10.series, i10 = t10.options.nullInteraction, s10 = e10.options.accessibility, r2 = t10.chart.options.accessibility, n2 = (s10 == null ? void 0 : s10.enabled) === false;
          return (_a = r2.keyboardNavigation.seriesNavigation.skipNullPoints) != null ? _a : !(!e10.isNull || i10) && false === e10.visible || false === e10.isInside || n2 || s7(t10);
        }
        function rt(e10) {
          let t10 = e10.series || [], i10 = t10.length;
          for (let e11 = 0; e11 < i10; ++e11) if (!s7(t10[e11])) {
            let i11 = (function(e12) {
              let t11 = e12.points || [], i12 = t11.length;
              for (let e13 = 0; e13 < i12; ++e13) if (!re(t11[e13])) return t11[e13];
              return null;
            })(t10[e11]);
            if (i11) return i11;
          }
          return null;
        }
        function ri(e10) {
          let t10 = e10.series.length, i10 = false;
          for (; t10-- && (e10.highlightedPoint = e10.series[t10].points[e10.series[t10].points.length - 1], !(i10 = e10.series[t10].highlightNextValidPoint())); ) ;
          return i10;
        }
        function rs(e10) {
          delete e10.highlightedPoint;
          let t10 = rt(e10);
          return !!t10 && t10.highlight();
        }
        class rr {
          constructor(e10, t10) {
            this.keyCodes = t10, this.chart = e10;
          }
          init() {
            let e10 = this, t10 = this.chart, i10 = this.eventProvider = new Z();
            i10.addEvent(s0(), "destroy", function() {
              return e10.onSeriesDestroy(this);
            }), i10.addEvent(t10, "afterApplyDrilldown", function() {
              let e11;
              (e11 = rt(this)) && e11.highlight(false);
            }), i10.addEvent(t10, "drilldown", function(t11) {
              let i11 = t11.point, s10 = i11.series;
              e10.lastDrilledDownPoint = { x: i11.x, y: i11.y, seriesName: s10 ? s10.name : "" };
            }), i10.addEvent(t10, "drillupall", function() {
              setTimeout(function() {
                e10.onDrillupAll();
              }, 10);
            }), i10.addEvent(sQ(), "afterSetState", function() {
              let e11 = this.graphic && this.graphic.element, i11 = s2.activeElement, s10 = i11 && i11.getAttribute("class"), r2 = s10 && s10.indexOf("highcharts-a11y-proxy-element") > -1;
              t10.highlightedPoint === this && i11 !== e11 && !r2 && e11 && e11.focus && e11.focus();
            });
          }
          onDrillupAll() {
            let e10, t10 = this.lastDrilledDownPoint, i10 = this.chart, s10 = t10 && s6(i10, t10.seriesName);
            t10 && s10 && s3(t10.x) && s3(t10.y) && (e10 = s4(s10, t10.x, t10.y)), e10 = e10 || rt(i10), i10.container && i10.container.focus(), e10 && e10.highlight && e10.highlight(false);
          }
          getKeyboardNavigationHandler() {
            let e10 = this, t10 = this.keyCodes, i10 = this.chart, s10 = i10.inverted;
            return new et(i10, { keyCodeMap: [[s10 ? [t10.up, t10.down] : [t10.left, t10.right], function(t11) {
              return e10.onKbdSideways(this, t11);
            }], [s10 ? [t10.left, t10.right] : [t10.up, t10.down], function(t11) {
              return e10.onKbdVertical(this, t11);
            }], [[t10.enter, t10.space], function(e11, t11) {
              var _a;
              let s11 = i10.highlightedPoint;
              if (s11) {
                let { plotLeft: e12, plotTop: i11 } = this.chart, { plotX: r2 = 0, plotY: n2 = 0 } = s11;
                t11 = __spreadProps(__spreadValues({}, t11), { chartX: e12 + r2, chartY: i11 + n2, point: s11, target: ((_a = s11.graphic) == null ? void 0 : _a.element) || t11.target }), s5(s11.series, "click", t11), s11.firePointEvent("click", t11);
              }
              return this.response.success;
            }], [[t10.home], function() {
              return rs(i10), this.response.success;
            }], [[t10.end], function() {
              return ri(i10), this.response.success;
            }], [[t10.pageDown, t10.pageUp], function(e11) {
              return i10.highlightAdjacentSeries(e11 === t10.pageDown), this.response.success;
            }]], init: function() {
              return e10.onHandlerInit(this);
            }, validate: function() {
              return !!rt(i10);
            }, terminate: function() {
              return e10.onHandlerTerminate();
            } });
          }
          onKbdSideways(e10, t10) {
            let i10 = this.keyCodes, s10 = t10 === i10.right || t10 === i10.down;
            return this.attemptHighlightAdjacentPoint(e10, s10);
          }
          onHandlerInit(e10) {
            let t10 = this.chart;
            return t10.options.accessibility.keyboardNavigation.seriesNavigation.rememberPointFocus && t10.highlightedPoint ? t10.highlightedPoint.highlight() : rs(t10), e10.response.success;
          }
          onKbdVertical(e10, t10) {
            let i10 = this.chart, s10 = this.keyCodes, r2 = t10 === s10.down || t10 === s10.right, n2 = i10.options.accessibility.keyboardNavigation.seriesNavigation;
            if (n2.mode && "serialize" === n2.mode) return this.attemptHighlightAdjacentPoint(e10, r2);
            let o2 = i10.highlightedPoint && i10.highlightedPoint.series.keyboardMoveVertical ? "highlightAdjacentPointVertical" : "highlightAdjacentSeries";
            return i10[o2](r2), e10.response.success;
          }
          onHandlerTerminate() {
            let e10 = this.chart, t10 = e10.options.accessibility.keyboardNavigation;
            e10.tooltip && e10.tooltip.hide(0);
            let i10 = e10.highlightedPoint && e10.highlightedPoint.series;
            i10 && i10.onMouseOut && i10.onMouseOut(), e10.highlightedPoint && e10.highlightedPoint.onMouseOut && e10.highlightedPoint.onMouseOut(), t10.seriesNavigation.rememberPointFocus || delete e10.highlightedPoint;
          }
          attemptHighlightAdjacentPoint(e10, t10) {
            let i10 = this.chart, s10 = i10.options.accessibility.keyboardNavigation.wrapAround;
            return i10.highlightAdjacentPoint(t10) ? e10.response.success : s10 && (t10 ? rs(i10) : ri(i10)) ? e10.response.success : e10.response[t10 ? "next" : "prev"];
          }
          onSeriesDestroy(e10) {
            let t10 = this.chart;
            t10.highlightedPoint && t10.highlightedPoint.series === e10 && (delete t10.highlightedPoint, t10.focusElement && t10.focusElement.removeFocusBorder());
          }
          destroy() {
            this.eventProvider.removeAddedEvents();
          }
        }
        !(function(e10) {
          function t10(e11) {
            let t11, i11, s11 = this.series, r3 = this.highlightedPoint, n3 = r3 && s8(r3) || 0, o2 = r3 && r3.series.points || [], a2 = this.series && this.series[this.series.length - 1], l2 = a2 && a2.points && a2.points[a2.points.length - 1];
            if (!s11[0] || !s11[0].points) return false;
            if (r3) {
              if (t11 = s11[r3.series.index + (e11 ? 1 : -1)], (i11 = o2[n3 + (e11 ? 1 : -1)]) || !t11 || (i11 = t11.points[e11 ? 0 : t11.points.length - 1]), !i11) return false;
            } else i11 = e11 ? s11[0].points[0] : l2;
            return re(i11) ? (s7(t11 = i11.series) ? this.highlightedPoint = e11 ? t11.points[t11.points.length - 1] : t11.points[0] : this.highlightedPoint = i11, this.highlightAdjacentPoint(e11)) : i11.highlight();
          }
          function i10(e11) {
            let t11 = this.highlightedPoint, i11 = 1 / 0, s11;
            return !!s3(t11.plotX) && !!s3(t11.plotY) && (this.series.forEach((r3) => {
              s7(r3) || r3.points.forEach((n3) => {
                if (!s3(n3.plotY) || !s3(n3.plotX) || n3 === t11) return;
                let o2 = n3.plotY - t11.plotY, a2 = Math.abs(n3.plotX - t11.plotX), l2 = Math.abs(o2) * Math.abs(o2) + a2 * a2 * 4;
                r3.yAxis && r3.yAxis.reversed && (o2 *= -1), !(o2 <= 0 && e11 || o2 >= 0 && !e11 || l2 < 5 || re(n3)) && l2 < i11 && (i11 = l2, s11 = n3);
              });
            }), !!s11 && s11.highlight());
          }
          function s10(e11) {
            let t11, i11, s11, r3 = this.highlightedPoint, n3 = this.series && this.series[this.series.length - 1], o2 = n3 && n3.points && n3.points[n3.points.length - 1];
            return this.highlightedPoint ? !!(t11 = this.series[r3.series.index + (e11 ? -1 : 1)]) && !!(i11 = (function(e12, t12, i12, s12) {
              let r4 = 1 / 0, n4, o3, a2, l2 = t12.points.length, h2 = (e13) => !(s3(e13.plotX) && s3(e13.plotY));
              if (!h2(e12)) {
                for (; l2--; ) !h2(n4 = t12.points[l2]) && (a2 = (e12.plotX - n4.plotX) * (e12.plotX - n4.plotX) * 4 + (e12.plotY - n4.plotY) * (e12.plotY - n4.plotY) * 1) < r4 && (r4 = a2, o3 = l2);
                return s3(o3) ? t12.points[o3] : void 0;
              }
            })(r3, t11, 4)) && (s7(t11) ? (i11.highlight(), s11 = this.highlightAdjacentSeries(e11)) ? s11 : (r3.highlight(), false) : (i11.highlight(), i11.series.highlightNextValidPoint())) : (t11 = e11 ? this.series && this.series[0] : n3, !!(i11 = e11 ? t11 && t11.points && t11.points[0] : o2) && i11.highlight());
          }
          function r2(e11 = true) {
            var _a, _b, _c;
            let t11 = this.series.chart, i11 = (_b = (_a = t11.tooltip) == null ? void 0 : _a.label) == null ? void 0 : _b.element;
            (!this.isNull || ((_c = this.series.options) == null ? void 0 : _c.nullInteraction)) && e11 ? this.onMouseOver() : t11.tooltip && t11.tooltip.hide(0), s9(this), this.graphic && (t11.setFocusToElement(this.graphic), !e11 && t11.focusElement && t11.focusElement.removeFocusBorder()), t11.highlightedPoint = this;
            let s11 = i11 == null ? void 0 : i11.getBoundingClientRect().top;
            if (i11 && s11 && s11 < 0) {
              let e12 = window.scrollY;
              window.scrollTo({ behavior: "smooth", top: e12 + s11 });
            }
            return this;
          }
          function n2() {
            let e11 = this.chart.highlightedPoint, t11 = (e11 && e11.series) === this ? s8(e11) : 0, i11 = this.points, s11 = i11.length;
            if (i11 && s11) {
              for (let e12 = t11; e12 < s11; ++e12) if (!re(i11[e12])) return i11[e12].highlight();
              for (let e12 = t11; e12 >= 0; --e12) if (!re(i11[e12])) return i11[e12].highlight();
            }
            return false;
          }
          e10.compose = function(e11, o2, a2) {
            let l2 = e11.prototype, h2 = o2.prototype, c2 = a2.prototype;
            l2.highlightAdjacentPoint || (l2.highlightAdjacentPoint = t10, l2.highlightAdjacentPointVertical = i10, l2.highlightAdjacentSeries = s10, h2.highlight = r2, c2.keyboardMoveVertical = true, ["column", "gantt", "pie"].forEach((e12) => {
              s1[e12] && (s1[e12].prototype.keyboardMoveVertical = false);
            }), c2.highlightNextValidPoint = n2);
          };
        })(rr || (rr = {}));
        let rn = rr, { hideSeriesFromAT: ro } = W, { describeSeries: ra } = sl, rl = class extends J {
          static compose(e10, t10, i10) {
            sv.compose(i10), sZ.compose(i10), rn.compose(e10, t10, i10);
          }
          init() {
            this.newDataAnnouncer = new sv(this.chart), this.newDataAnnouncer.init(), this.keyboardNavigation = new rn(this.chart, this.keyCodes), this.keyboardNavigation.init(), this.hideTooltipFromATWhenShown(), this.hideSeriesLabelsFromATWhenShown();
          }
          hideTooltipFromATWhenShown() {
            let e10 = this;
            this.chart.tooltip && this.addEvent(this.chart.tooltip.constructor, "refresh", function() {
              this.chart === e10.chart && this.label && this.label.element && this.label.element.setAttribute("aria-hidden", true);
            });
          }
          hideSeriesLabelsFromATWhenShown() {
            this.addEvent(this.chart, "afterDrawSeriesLabels", function() {
              this.series.forEach(function(e10) {
                e10.labelBySeries && e10.labelBySeries.attr("aria-hidden", true);
              });
            });
          }
          onChartRender() {
            this.chart.series.forEach(function(e10) {
              false !== (e10.options.accessibility && e10.options.accessibility.enabled) && e10.visible && 0 !== e10.getPointsCollection().length ? ra(e10) : ro(e10);
            });
          }
          getKeyboardNavigation() {
            return this.keyboardNavigation.getKeyboardNavigationHandler();
          }
          destroy() {
            this.newDataAnnouncer.destroy(), this.keyboardNavigation.destroy();
          }
        }, { unhideChartElementFromAT: rh } = W, { getFakeMouseEvent: rc } = S, { attr: rd, pick: ru } = w(), rp = class extends J {
          constructor() {
            super(...arguments), this.focusedMapNavButtonIx = -1;
          }
          init() {
            let e10 = this, t10 = this.chart;
            this.proxyProvider.addGroup("zoom", "div"), ["afterShowResetZoom", "afterApplyDrilldown", "drillupall"].forEach((i10) => {
              e10.addEvent(t10, i10, function() {
                e10.updateProxyOverlays();
              });
            });
          }
          onChartUpdate() {
            let e10 = this.chart, t10 = this;
            e10.mapNavigation && e10.mapNavigation.navButtons.forEach((i10, s10) => {
              rh(e10, i10.element), t10.setMapNavButtonAttrs(i10.element, "accessibility.zoom.mapZoom" + (s10 ? "Out" : "In"));
            });
          }
          setMapNavButtonAttrs(e10, t10) {
            let i10 = this.chart;
            rd(e10, { tabindex: -1, role: "button", "aria-label": i10.langFormat(t10, { chart: i10 }) });
          }
          onChartRender() {
            this.updateProxyOverlays();
          }
          updateProxyOverlays() {
            let e10 = this.chart;
            if (this.proxyProvider.clearGroup("zoom"), e10.resetZoomButton && this.createZoomProxyButton(e10.resetZoomButton, "resetZoomProxyButton", e10.langFormat("accessibility.zoom.resetZoomButton", { chart: e10 })), e10.drillUpButton && e10.breadcrumbs && e10.breadcrumbs.list) {
              let t10 = e10.breadcrumbs.list[e10.breadcrumbs.list.length - 1];
              this.createZoomProxyButton(e10.drillUpButton, "drillUpProxyButton", e10.langFormat("accessibility.drillUpButton", { chart: e10, buttonText: e10.breadcrumbs.getButtonText(t10) }));
            }
          }
          createZoomProxyButton(e10, t10, i10) {
            this[t10] = this.proxyProvider.addProxyElement("zoom", { click: e10 }, "button", { "aria-label": i10, tabindex: -1 });
          }
          getMapZoomNavigation() {
            let e10 = this.keyCodes, t10 = this.chart, i10 = this;
            return new et(t10, { keyCodeMap: [[[e10.up, e10.down, e10.left, e10.right], function(e11) {
              return i10.onMapKbdArrow(this, e11);
            }], [[e10.tab], function(e11, t11) {
              return i10.onMapKbdTab(this, t11);
            }], [[e10.space, e10.enter], function() {
              return i10.onMapKbdClick(this);
            }]], validate: function() {
              return !!(t10.mapView && t10.mapNavigation && t10.mapNavigation.navButtons.length);
            }, init: function(e11) {
              return i10.onMapNavInit(e11);
            } });
          }
          onMapKbdArrow(e10, t10) {
            let i10 = this.chart, s10 = this.keyCodes, r2 = i10.container, n2 = t10 === s10.up || t10 === s10.down, o2 = t10 === s10.left || t10 === s10.up ? 1 : -1, a2 = (n2 ? i10.plotHeight : i10.plotWidth) / 10 * o2, l2 = 10 * Math.random(), h2 = { x: r2.offsetLeft + i10.plotLeft + i10.plotWidth / 2 + l2, y: r2.offsetTop + i10.plotTop + i10.plotHeight / 2 + l2 }, c2 = n2 ? { x: h2.x, y: h2.y + a2 } : { x: h2.x + a2, y: h2.y };
            return [rc("mousedown", h2), rc("mousemove", c2), rc("mouseup", c2)].forEach((e11) => r2.dispatchEvent(e11)), e10.response.success;
          }
          onMapKbdTab(e10, t10) {
            let i10 = this.chart, s10 = e10.response, r2 = t10.shiftKey, n2 = r2 && !this.focusedMapNavButtonIx || !r2 && this.focusedMapNavButtonIx;
            if (i10.mapNavigation.navButtons[this.focusedMapNavButtonIx].setState(0), n2) return i10.mapView && i10.mapView.zoomBy(), s10[r2 ? "prev" : "next"];
            this.focusedMapNavButtonIx += r2 ? -1 : 1;
            let o2 = i10.mapNavigation.navButtons[this.focusedMapNavButtonIx];
            return i10.setFocusToElement(o2.box, o2.element), o2.setState(2), s10.success;
          }
          onMapKbdClick(e10) {
            let t10 = this.chart.mapNavigation.navButtons[this.focusedMapNavButtonIx].element;
            return this.fakeClickEvent(t10), e10.response.success;
          }
          onMapNavInit(e10) {
            let t10 = this.chart, i10 = t10.mapNavigation.navButtons[0], s10 = t10.mapNavigation.navButtons[1], r2 = e10 > 0 ? i10 : s10;
            t10.setFocusToElement(r2.box, r2.element), r2.setState(2), this.focusedMapNavButtonIx = e10 > 0 ? 0 : 1;
          }
          simpleButtonNavigation(e10, t10, i10) {
            let s10 = this.keyCodes, r2 = this, n2 = this.chart;
            return new et(n2, { keyCodeMap: [[[s10.tab, s10.up, s10.down, s10.left, s10.right], function(e11, t11) {
              let i11 = e11 === s10.tab && t11.shiftKey || e11 === s10.left || e11 === s10.up;
              return this.response[i11 ? "prev" : "next"];
            }], [[s10.space, s10.enter], function() {
              return ru(i10(this, n2), this.response.success);
            }]], validate: function() {
              return n2[e10] && n2[e10].box && r2[t10].innerElement;
            }, init: function() {
              n2.setFocusToElement(n2[e10].box, r2[t10].innerElement);
            } });
          }
          getKeyboardNavigation() {
            return [this.simpleButtonNavigation("resetZoomButton", "resetZoomProxyButton", function(e10, t10) {
              t10.zoomOut();
            }), this.simpleButtonNavigation("drillUpButton", "drillUpProxyButton", function(e10, t10) {
              return t10.drillUp(), e10.response.prev;
            }), this.getMapZoomNavigation()];
          }
        }, { doc: rg, isMS: rm, win: rb } = w(), rx = function() {
          if (rm && rb.getComputedStyle) {
            let e10 = rg.createElement("div");
            e10.style.backgroundImage = "url(data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==)", rg.body.appendChild(e10);
            let t10 = (e10.currentStyle || rb.getComputedStyle(e10)).backgroundImage;
            return rg.body.removeChild(e10), "none" === t10;
          }
          return rb.matchMedia && rb.matchMedia("(forced-colors: active)").matches;
        }, rf = function(e10) {
          var _a;
          e10.highContrastModeActive = true;
          let t10 = e10.options.accessibility.highContrastTheme;
          e10.update(t10, false);
          let i10 = ((_a = t10.colors) == null ? void 0 : _a.length) > 1;
          e10.series.forEach(function(e11) {
            let s10 = t10.plotOptions[e11.type] || {}, r2 = i10 && void 0 !== e11.colorIndex ? t10.colors[e11.colorIndex] : s10.color || "window", n2 = { color: s10.color || "windowText", colors: i10 ? t10.colors : [s10.color || "windowText"], borderColor: s10.borderColor || "window", fillColor: r2 };
            e11.update(n2, false), e11.points && e11.points.forEach(function(e12) {
              e12.options && e12.options.color && e12.update({ color: s10.color || "windowText", borderColor: s10.borderColor || "window" }, false);
            });
          }), e10.redraw();
        }, ry = { chart: { backgroundColor: "window" }, title: { style: { color: "windowText" } }, subtitle: { style: { color: "windowText" } }, colorAxis: { minColor: "windowText", maxColor: "windowText", stops: [], dataClasses: [] }, colors: ["windowText"], xAxis: { gridLineColor: "windowText", labels: { style: { color: "windowText" } }, lineColor: "windowText", minorGridLineColor: "windowText", tickColor: "windowText", title: { style: { color: "windowText" } } }, yAxis: { gridLineColor: "windowText", labels: { style: { color: "windowText" } }, lineColor: "windowText", minorGridLineColor: "windowText", tickColor: "windowText", title: { style: { color: "windowText" } } }, tooltip: { backgroundColor: "window", borderColor: "windowText", style: { color: "windowText" } }, plotOptions: { series: { lineColor: "windowText", fillColor: "window", borderColor: "windowText", edgeColor: "windowText", borderWidth: 1, dataLabels: { connectorColor: "windowText", color: "windowText", style: { color: "windowText", textOutline: "none" } }, marker: { lineColor: "windowText", fillColor: "windowText" } }, pie: { color: "window", colors: ["window"], borderColor: "windowText", borderWidth: 1 }, boxplot: { fillColor: "window" }, candlestick: { lineColor: "windowText", fillColor: "window" }, errorbar: { fillColor: "window" } }, legend: { backgroundColor: "window", itemStyle: { color: "windowText" }, itemHoverStyle: { color: "windowText" }, itemHiddenStyle: { color: "#555" }, title: { style: { color: "windowText" } } }, credits: { style: { color: "windowText" } }, drilldown: { activeAxisLabelStyle: { color: "windowText" }, activeDataLabelStyle: { color: "windowText" } }, navigation: { buttonOptions: { symbolStroke: "windowText", theme: { fill: "window" } } }, rangeSelector: { buttonTheme: { fill: "window", stroke: "windowText", style: { color: "windowText" }, states: { hover: { fill: "window", stroke: "windowText", style: { color: "windowText" } }, select: { fill: "#444", stroke: "windowText", style: { color: "windowText" } } } }, inputBoxBorderColor: "windowText", inputStyle: { backgroundColor: "window", color: "windowText" }, labelStyle: { color: "windowText" } }, navigator: { handles: { backgroundColor: "window", borderColor: "windowText" }, outlineColor: "windowText", maskFill: "transparent", series: { color: "windowText", lineColor: "windowText" }, xAxis: { gridLineColor: "windowText" } }, scrollbar: { barBackgroundColor: "#444", barBorderColor: "windowText", buttonArrowColor: "windowText", buttonBackgroundColor: "window", buttonBorderColor: "windowText", rifleColor: "windowText", trackBackgroundColor: "window", trackBorderColor: "windowText" } }, { error: rv, pick: rw } = w();
        function rE(e10, t10, i10) {
          let s10 = e10, r2, n2 = 0;
          for (; n2 < t10.length - 1; ++n2) s10 = s10[r2 = t10[n2]] = rw(s10[r2], {});
          s10[t10[t10.length - 1]] = i10;
        }
        function rA(e10, t10, i10, s10) {
          function r2(e11, t11) {
            return t11.reduce(function(e12, t12) {
              return e12[t12];
            }, e11);
          }
          let n2 = r2(e10.options, t10), o2 = r2(e10.options, i10);
          Object.keys(s10).forEach(function(r3) {
            let a2 = n2[r3];
            void 0 !== a2 && (rE(o2, s10[r3], a2), rv(32, false, e10, { [t10.join(".") + "." + r3]: i10.join(".") + "." + s10[r3].join(".") }));
          });
        }
        let rT = function(e10) {
          let t10, i10, s10;
          t10 = e10.options.chart, i10 = e10.options.accessibility || {}, ["description", "typeDescription"].forEach(function(s11) {
            t10[s11] && (i10[s11] = t10[s11], rv(32, false, e10, { [`chart.${s11}`]: `use accessibility.${s11}` }));
          }), e10.axes.forEach(function(t11) {
            let i11 = t11.options;
            i11 && i11.description && (i11.accessibility = i11.accessibility || {}, i11.accessibility.description = i11.description, rv(32, false, e10, { "axis.description": "use axis.accessibility.description" }));
          }), e10.series && (s10 = { description: ["accessibility", "description"], exposeElementToA11y: ["accessibility", "exposeAsGroupOnly"], pointDescriptionFormatter: ["accessibility", "point", "descriptionFormatter"], skipKeyboardNavigation: ["accessibility", "keyboardNavigation", "enabled"], "accessibility.pointDescriptionFormatter": ["accessibility", "point", "descriptionFormatter"] }, e10.series.forEach(function(t11) {
            Object.keys(s10).forEach(function(i11) {
              let r2 = t11.options[i11];
              "accessibility.pointDescriptionFormatter" === i11 && (r2 = t11.options.accessibility && t11.options.accessibility.pointDescriptionFormatter), void 0 !== r2 && (rE(t11.options, s10[i11], "skipKeyboardNavigation" === i11 ? !r2 : r2), rv(32, false, e10, { [`series.${i11}`]: "series." + s10[i11].join(".") }));
            });
          })), rA(e10, ["accessibility"], ["accessibility"], { pointDateFormat: ["point", "dateFormat"], pointDateFormatter: ["point", "dateFormatter"], pointDescriptionFormatter: ["point", "descriptionFormatter"], pointDescriptionThreshold: ["series", "pointDescriptionEnabledThreshold"], pointNavigationThreshold: ["keyboardNavigation", "seriesNavigation", "pointNavigationEnabledThreshold"], pointValueDecimals: ["point", "valueDecimals"], pointValuePrefix: ["point", "valuePrefix"], pointValueSuffix: ["point", "valueSuffix"], screenReaderSectionFormatter: ["screenReaderSection", "beforeChartFormatter"], describeSingleSeries: ["series", "describeSingleSeries"], seriesDescriptionFormatter: ["series", "descriptionFormatter"], onTableAnchorClick: ["screenReaderSection", "onViewDataTableClick"], axisRangeDateFormat: ["screenReaderSection", "axisRangeDateFormat"] }), rA(e10, ["accessibility", "keyboardNavigation"], ["accessibility", "keyboardNavigation", "seriesNavigation"], { skipNullPoints: ["skipNullPoints"], mode: ["mode"] }), rA(e10, ["lang", "accessibility"], ["lang", "accessibility"], { legendItem: ["legend", "legendItem"], legendLabel: ["legend", "legendLabel"], mapZoomIn: ["zoom", "mapZoomIn"], mapZoomOut: ["zoom", "mapZoomOut"], resetZoomButton: ["zoom", "resetZoomButton"], screenReaderRegionLabel: ["screenReaderSection", "beforeRegionLabel"], rangeSelectorButton: ["rangeSelector", "buttonText"], rangeSelectorMaxInput: ["rangeSelector", "maxInputLabel"], rangeSelectorMinInput: ["rangeSelector", "minInputLabel"], svgContainerEnd: ["screenReaderSection", "endOfChartMarker"], viewAsDataTable: ["table", "viewAsDataTableButtonText"], tableSummary: ["table", "tableSummary"] });
        }, { defaultOptions: rM } = w(), { doc: rk } = w(), { addEvent: rC, extend: rS, fireEvent: rP, merge: rD } = w(), { removeElement: rN } = S;
        class rB {
          constructor(e10) {
            this.init(e10);
          }
          init(e10) {
            if (this.chart = e10, !(rk == null ? void 0 : rk.addEventListener)) {
              this.zombie = true, this.components = {}, e10.renderTo.setAttribute("aria-hidden", true);
              return;
            }
            rT(e10), this.proxyProvider = new sL(this.chart), this.initComponents(), this.keyboardNavigation = new e5(e10, this.components);
          }
          initComponents() {
            let e10 = this.chart, t10 = this.proxyProvider, i10 = e10.options.accessibility;
            this.components = { container: new eo(), infoRegions: new eq(), legend: new tp(), chartMenu: new eY(), rangeSelector: new sW(), series: new rl(), zoom: new rp(), navigator: new iQ() }, i10.customComponents && rS(this.components, i10.customComponents);
            let s10 = this.components;
            this.getComponentOrder().forEach(function(i11) {
              s10[i11].initBase(e10, t10), s10[i11].init();
            });
          }
          getComponentOrder() {
            return this.components ? this.components.series ? ["series"].concat(Object.keys(this.components).filter((e10) => "series" !== e10)) : Object.keys(this.components) : [];
          }
          update() {
            let e10 = this.components, t10 = this.chart, i10 = t10.options.accessibility;
            rP(t10, "beforeA11yUpdate"), t10.types = this.getChartTypes();
            let s10 = i10.keyboardNavigation.order;
            this.proxyProvider.updateGroupOrder(s10), this.getComponentOrder().forEach(function(i11) {
              e10[i11].onChartUpdate(), rP(t10, "afterA11yComponentUpdate", { name: i11, component: e10[i11] });
            }), this.keyboardNavigation.update(s10), !t10.highContrastModeActive && false !== i10.highContrastMode && (rx() || true === i10.highContrastMode) && rf(t10), rP(t10, "afterA11yUpdate", { accessibility: this });
          }
          destroy() {
            let e10 = this.chart || {}, t10 = this.components;
            Object.keys(t10).forEach(function(e11) {
              t10[e11].destroy(), t10[e11].destroyBase();
            }), this.proxyProvider && this.proxyProvider.destroy(), e10.announcerContainer && rN(e10.announcerContainer), this.keyboardNavigation && this.keyboardNavigation.destroy(), e10.renderTo && e10.renderTo.setAttribute("aria-hidden", true), e10.focusElement && e10.focusElement.removeFocusBorder();
          }
          getChartTypes() {
            let e10 = {};
            return this.chart.series.forEach(function(t10) {
              e10[t10.type] = 1;
            }), Object.keys(e10);
          }
        }
        !(function(e10) {
          function t10() {
            this.accessibility && this.accessibility.destroy();
          }
          function i10() {
            this.a11yDirty && this.renderTo && (delete this.a11yDirty, this.updateA11yEnabled());
            let e11 = this.accessibility;
            e11 && !e11.zombie && (e11.proxyProvider.updateProxyElementPositions(), e11.getComponentOrder().forEach(function(t11) {
              e11.components[t11].onChartRender();
            }));
          }
          function s10(e11) {
            let t11 = e11.options.accessibility;
            t11 && (t11.customComponents && (this.options.accessibility.customComponents = t11.customComponents, delete t11.customComponents), rD(true, this.options.accessibility, t11), this.accessibility && this.accessibility.destroy && (this.accessibility.destroy(), delete this.accessibility)), this.a11yDirty = true;
          }
          function r2() {
            let t11 = this.accessibility, i11 = this.options.accessibility, s11 = this.renderer.boxWrapper.element, r3 = this.title;
            if (i11 && i11.enabled) t11 && !t11.zombie ? t11.update() : (this.accessibility = t11 = new e10(this), t11 && !t11.zombie && t11.update(), "img" === s11.getAttribute("role") && s11.removeAttribute("role"));
            else if (t11) t11.destroy && t11.destroy(), delete this.accessibility;
            else {
              this.renderTo.setAttribute("role", "img"), this.renderTo.setAttribute("aria-hidden", false), this.renderTo.setAttribute("aria-label", (r3 && r3.element.textContent || "").replace(/</g, "&lt;")), s11.setAttribute("aria-hidden", true);
              let e11 = document.getElementsByClassName("highcharts-description")[0];
              e11 && (e11.setAttribute("aria-hidden", false), e11.classList.remove("highcharts-linked-description"));
            }
          }
          function n2() {
            this.series.chart.accessibility && (this.series.chart.a11yDirty = true);
          }
          e10.i18nFormat = L.i18nFormat, e10.compose = function(e11, o2, a2, l2, h2, c2) {
            e5.compose(e11), sv.compose(l2), tp.compose(e11, o2), eY.compose(e11), rl.compose(e11, a2, l2), L.compose(e11), eh.compose(e11, h2), c2 && sW.compose(e11, c2);
            let d2 = e11.prototype;
            d2.updateA11yEnabled || (d2.updateA11yEnabled = r2, rC(e11, "destroy", t10), rC(e11, "render", i10), rC(e11, "update", s10), ["addSeries", "init"].forEach((t11) => {
              rC(e11, t11, function() {
                this.a11yDirty = true;
              });
            }), ["afterApplyDrilldown", "drillupall"].forEach((t11) => {
              rC(e11, t11, function() {
                let e12 = this.accessibility;
                e12 && !e12.zombie && e12.update();
              });
            }), rC(a2, "update", n2), ["update", "updatedData", "remove"].forEach((e12) => {
              rC(l2, e12, function() {
                this.chart.accessibility && (this.chart.a11yDirty = true);
              });
            }));
          };
        })(rB || (rB = {})), rD(true, rM, { accessibility: { enabled: true, screenReaderSection: { beforeChartFormat: "<{headingTagName}>{chartTitle}</{headingTagName}><div>{typeDescription}</div><div>{chartSubtitle}</div><div>{chartLongdesc}</div><div>{playAsSoundButton}</div><div>{viewTableButton}</div><div>{xAxisDescription}</div><div>{yAxisDescription}</div><div>{annotationsTitle}{annotationsList}</div>", afterChartFormat: "{endOfChartMarker}", axisRangeDateFormat: "%Y-%m-%d %H:%M:%S" }, series: { descriptionFormat: "{seriesDescription}{authorDescription}{axisDescription}", describeSingleSeries: false, pointDescriptionEnabledThreshold: 200 }, point: { valueDescriptionFormat: "{xDescription}{separator}{value}.", describeNull: true }, landmarkVerbosity: "all", linkedDescription: '*[data-highcharts-chart="{index}"] + .highcharts-description', highContrastMode: "auto", keyboardNavigation: { enabled: true, focusBorder: { enabled: true, hideBrowserFocusOutline: true, style: { color: "#334eff", lineWidth: 2, borderRadius: 3 }, margin: 2 }, order: ["series", "zoom", "rangeSelector", "navigator", "legend", "chartMenu"], wrapAround: true, seriesNavigation: { skipNullPoints: void 0, pointNavigationEnabledThreshold: false, rememberPointFocus: false } }, announceNewData: { enabled: false, minAnnounceInterval: 5e3, interruptUser: false } }, legend: { accessibility: { enabled: true, keyboardNavigation: { enabled: true } } }, exporting: { accessibility: { enabled: true } }, navigator: { accessibility: { enabled: true } } }, { accessibility: { highContrastTheme: ry }, lang: { accessibility: { defaultChartTitle: "Chart", chartContainerLabel: "{title}. Highcharts interactive chart.", svgContainerLabel: "Interactive chart", drillUpButton: "{buttonText}", credits: "Chart credits: {creditsStr}", thousandsSep: ",", svgContainerTitle: "", graphicContainerLabel: "", screenReaderSection: { beforeRegionLabel: "", afterRegionLabel: "", annotations: { heading: "Chart annotations summary", descriptionSinglePoint: "{annotationText}. Related to {annotationPoint}", descriptionMultiplePoints: "{annotationText}. Related to {annotationPoint}{#each additionalAnnotationPoints}, also related to {this}{/each}", descriptionNoPoints: "{annotationText}" }, endOfChartMarker: "End of interactive chart." }, sonification: { playAsSoundButtonText: "Play as sound, {chartTitle}", playAsSoundClickAnnouncement: "Play" }, legend: { legendLabelNoTitle: "Toggle series visibility, {chartTitle}", legendLabel: "Chart legend: {legendTitle}", legendItem: "Show {itemName}" }, zoom: { mapZoomIn: "Zoom chart", mapZoomOut: "Zoom out chart", resetZoomButton: "Reset zoom" }, rangeSelector: { dropdownLabel: "{rangeTitle}", minInputLabel: "Select start date.", maxInputLabel: "Select end date.", clickButtonAnnouncement: "Viewing {axisRangeDescription}" }, navigator: { handleLabel: "{#eq handleIx 0}Start, percent{else}End, percent{/eq}", groupLabel: "Axis zoom", changeAnnouncement: "{axisRangeDescription}" }, table: { viewAsDataTableButtonText: "View as data table, {chartTitle}", tableSummary: "Table representation of chart." }, announceNewData: { newDataAnnounce: "Updated data for chart {chartTitle}", newSeriesAnnounceSingle: "New data series: {seriesDesc}", newPointAnnounceSingle: "New data point: {pointDesc}", newSeriesAnnounceMultiple: "New data series in chart {chartTitle}: {seriesDesc}", newPointAnnounceMultiple: "New data point in chart {chartTitle}: {pointDesc}" }, seriesTypeDescriptions: { boxplot: "Box plot charts are typically used to display groups of statistical data. Each data point in the chart can have up to 5 values: minimum, lower quartile, median, upper quartile, and maximum.", arearange: "Arearange charts are line charts displaying a range between a lower and higher value for each point.", areasplinerange: "These charts are line charts displaying a range between a lower and higher value for each point.", bubble: "Bubble charts are scatter charts where each data point also has a size value.", columnrange: "Columnrange charts are column charts displaying a range between a lower and higher value for each point.", errorbar: "Errorbar series are used to display the variability of the data.", funnel: "Funnel charts are used to display reduction of data in stages.", pyramid: "Pyramid charts consist of a single pyramid with item heights corresponding to each point value.", waterfall: "A waterfall chart is a column chart where each column contributes towards a total end value." }, chartTypes: { emptyChart: "Empty chart", mapTypeDescription: "Map of {mapTitle} with {numSeries} data series.", unknownMap: "Map of unspecified region with {numSeries} data series.", combinationChart: "Combination chart with {numSeries} data series.", defaultSingle: "Chart with {numPoints} data {#eq numPoints 1}point{else}points{/eq}.", defaultMultiple: "Chart with {numSeries} data series.", splineSingle: "Line chart with {numPoints} data {#eq numPoints 1}point{else}points{/eq}.", splineMultiple: "Line chart with {numSeries} lines.", lineSingle: "Line chart with {numPoints} data {#eq numPoints 1}point{else}points{/eq}.", lineMultiple: "Line chart with {numSeries} lines.", columnSingle: "Bar chart with {numPoints} {#eq numPoints 1}bar{else}bars{/eq}.", columnMultiple: "Bar chart with {numSeries} data series.", barSingle: "Bar chart with {numPoints} {#eq numPoints 1}bar{else}bars{/eq}.", barMultiple: "Bar chart with {numSeries} data series.", pieSingle: "Pie chart with {numPoints} {#eq numPoints 1}slice{else}slices{/eq}.", pieMultiple: "Pie chart with {numSeries} pies.", scatterSingle: "Scatter chart with {numPoints} {#eq numPoints 1}point{else}points{/eq}.", scatterMultiple: "Scatter chart with {numSeries} data series.", boxplotSingle: "Boxplot with {numPoints} {#eq numPoints 1}box{else}boxes{/eq}.", boxplotMultiple: "Boxplot with {numSeries} data series.", bubbleSingle: "Bubble chart with {numPoints} {#eq numPoints 1}bubbles{else}bubble{/eq}.", bubbleMultiple: "Bubble chart with {numSeries} data series." }, axis: { xAxisDescriptionSingular: "The chart has 1 X axis displaying {names[0]}. {ranges[0]}", xAxisDescriptionPlural: "The chart has {numAxes} X axes displaying {#each names}{#unless @first},{/unless}{#if @last} and{/if} {this}{/each}.", yAxisDescriptionSingular: "The chart has 1 Y axis displaying {names[0]}. {ranges[0]}", yAxisDescriptionPlural: "The chart has {numAxes} Y axes displaying {#each names}{#unless @first},{/unless}{#if @last} and{/if} {this}{/each}.", timeRangeDays: "Data range: {range} days.", timeRangeHours: "Data range: {range} hours.", timeRangeMinutes: "Data range: {range} minutes.", timeRangeSeconds: "Data range: {range} seconds.", rangeFromTo: "Data ranges from {rangeFrom} to {rangeTo}.", rangeCategories: "Data range: {numCategories} categories.", defaultAxisNames: { categories: "categories", time: "Time", values: "values" } }, exporting: { chartMenuLabel: "Chart menu", menuButtonLabel: "View chart menu, {chartTitle}" }, series: { summary: { default: "{series.name}, series {seriesNumber} of {chart.series.length} with {series.points.length} data {#eq series.points.length 1}point{else}points{/eq}.", defaultCombination: "{series.name}, series {seriesNumber} of {chart.series.length} with {series.points.length} data {#eq series.points.length 1}point{else}points{/eq}.", line: "{series.name}, line {seriesNumber} of {chart.series.length} with {series.points.length} data {#eq series.points.length 1}point{else}points{/eq}.", lineCombination: "{series.name}, series {seriesNumber} of {chart.series.length}. Line with {series.points.length} data {#eq series.points.length 1}point{else}points{/eq}.", spline: "{series.name}, line {seriesNumber} of {chart.series.length} with {series.points.length} data {#eq series.points.length 1}point{else}points{/eq}.", splineCombination: "{series.name}, series {seriesNumber} of {chart.series.length}. Line with {series.points.length} data {#eq series.points.length 1}point{else}points{/eq}.", column: "{series.name}, bar series {seriesNumber} of {chart.series.length} with {series.points.length} {#eq series.points.length 1}bar{else}bars{/eq}.", columnCombination: "{series.name}, series {seriesNumber} of {chart.series.length}. Bar series with {series.points.length} {#eq series.points.length 1}bar{else}bars{/eq}.", bar: "{series.name}, bar series {seriesNumber} of {chart.series.length} with {series.points.length} {#eq series.points.length 1}bar{else}bars{/eq}.", barCombination: "{series.name}, series {seriesNumber} of {chart.series.length}. Bar series with {series.points.length} {#eq series.points.length 1}bar{else}bars{/eq}.", pie: "{series.name}, pie {seriesNumber} of {chart.series.length} with {series.points.length} {#eq series.points.length 1}slice{else}slices{/eq}.", pieCombination: "{series.name}, series {seriesNumber} of {chart.series.length}. Pie with {series.points.length} {#eq series.points.length 1}slice{else}slices{/eq}.", scatter: "{series.name}, scatter plot {seriesNumber} of {chart.series.length} with {series.points.length} {#eq series.points.length 1}point{else}points{/eq}.", scatterCombination: "{series.name}, series {seriesNumber} of {chart.series.length}, scatter plot with {series.points.length} {#eq series.points.length 1}point{else}points{/eq}.", boxplot: "{series.name}, boxplot {seriesNumber} of {chart.series.length} with {series.points.length} {#eq series.points.length 1}box{else}boxes{/eq}.", boxplotCombination: "{series.name}, series {seriesNumber} of {chart.series.length}. Boxplot with {series.points.length} {#eq series.points.length 1}box{else}boxes{/eq}.", bubble: "{series.name}, bubble series {seriesNumber} of {chart.series.length} with {series.points.length} {#eq series.points.length 1}bubble{else}bubbles{/eq}.", bubbleCombination: "{series.name}, series {seriesNumber} of {chart.series.length}. Bubble series with {series.points.length} {#eq series.points.length 1}bubble{else}bubbles{/eq}.", map: "{series.name}, map {seriesNumber} of {chart.series.length} with {series.points.length} {#eq series.points.length 1}area{else}areas{/eq}.", mapCombination: "{series.name}, series {seriesNumber} of {chart.series.length}. Map with {series.points.length} {#eq series.points.length 1}area{else}areas{/eq}.", mapline: "{series.name}, line {seriesNumber} of {chart.series.length} with {series.points.length} data {#eq series.points.length 1}point{else}points{/eq}.", maplineCombination: "{series.name}, series {seriesNumber} of {chart.series.length}. Line with {series.points.length} data {#eq series.points.length 1}point{else}points{/eq}.", mapbubble: "{series.name}, bubble series {seriesNumber} of {chart.series.length} with {series.points.length} {#eq series.points.length 1}bubble{else}bubbles{/eq}.", mapbubbleCombination: "{series.name}, series {seriesNumber} of {chart.series.length}. Bubble series with {series.points.length} {#eq series.points.length 1}bubble{else}bubbles{/eq}." }, description: "{description}", xAxisDescription: "X axis, {name}", yAxisDescription: "Y axis, {name}", nullPointValue: "No value", pointAnnotationsDescription: "{#each annotations}Annotation: {this}{/each}" } } } });
        let rI = rB, rF = w();
        rF.i18nFormat = rI.i18nFormat, rF.A11yChartUtilities = W, rF.A11yHTMLUtilities = S, rF.AccessibilityComponent = J, rF.KeyboardNavigationHandler = et, rF.SeriesAccessibilityDescriber = sl, rI.compose(rF.Chart, rF.Legend, rF.Point, rF.Series, rF.SVGElement, rF.RangeSelector);
        let rO = w();
        return y.default;
      })());
    }
  });

  // node_modules/highcharts/modules/exporting.js
  var require_exporting = __commonJS({
    "node_modules/highcharts/modules/exporting.js"(exports, module) {
      !/**
      * Highcharts JS v12.5.0 (2026-01-12)
      * @module highcharts/modules/exporting
      * @requires highcharts
      *
      * Exporting module
      *
      * (c) 2010-2026 Highsoft AS
      * Author: Torstein Honsi
      *
      * A commercial license may be required depending on use.
      * See www.highcharts.com/license
      */
      (function(e, t) {
        "object" == typeof exports && "object" == typeof module ? module.exports = t(e._Highcharts, e._Highcharts.AST, e._Highcharts.Chart) : "function" == typeof define && define.amd ? define("highcharts/modules/exporting", ["highcharts/highcharts"], function(e2) {
          return t(e2, e2.AST, e2.Chart);
        }) : "object" == typeof exports ? exports["highcharts/modules/exporting"] = t(e._Highcharts, e._Highcharts.AST, e._Highcharts.Chart) : e.Highcharts = t(e.Highcharts, e.Highcharts.AST, e.Highcharts.Chart);
      })("u" < typeof window ? exports : window, (e, t, n) => (() => {
        "use strict";
        var i, o, r = { 660: (e2) => {
          e2.exports = t;
        }, 944: (t2) => {
          t2.exports = e;
        }, 960: (e2) => {
          e2.exports = n;
        } }, a = {};
        function s(e2) {
          var t2 = a[e2];
          if (void 0 !== t2) return t2.exports;
          var n2 = a[e2] = { exports: {} };
          return r[e2](n2, n2.exports, s), n2.exports;
        }
        s.n = (e2) => {
          var t2 = e2 && e2.__esModule ? () => e2.default : () => e2;
          return s.d(t2, { a: t2 }), t2;
        }, s.d = (e2, t2) => {
          for (var n2 in t2) s.o(t2, n2) && !s.o(e2, n2) && Object.defineProperty(e2, n2, { enumerable: true, get: t2[n2] });
        }, s.o = (e2, t2) => Object.prototype.hasOwnProperty.call(e2, t2);
        var l = {};
        s.d(l, { default: () => eu });
        var c = s(944), h = s.n(c), p = s(660), d = s.n(p), u = s(960), g = s.n(u), f = i || (i = {});
        f.compose = function(e2) {
          return e2.navigation || (e2.navigation = new m(e2)), e2;
        };
        class m {
          constructor(e2) {
            this.updates = [], this.chart = e2;
          }
          addUpdate(e2) {
            this.chart.navigation.updates.push(e2);
          }
          update(e2, t2) {
            this.updates.forEach((n2) => {
              n2.call(this.chart, e2, t2);
            });
          }
        }
        f.Additions = m;
        let y = i, { isSafari: x, win: w, win: { document: b } } = h(), { error: v } = h(), S = w.URL || w.webkitURL || w;
        function C(e2, t2) {
          let n2 = w.navigator, i2 = b.createElement("a");
          if ("string" != typeof e2 && !(e2 instanceof String) && n2.msSaveOrOpenBlob) return void n2.msSaveOrOpenBlob(e2, t2);
          if (e2 = "" + e2, n2.userAgent.length > 1e3) throw Error("Input too long");
          let o2 = /Edge\/\d+/.test(n2.userAgent);
          if ((x && "string" == typeof e2 && 0 === e2.indexOf("data:application/pdf") || o2 || e2.length > 2e6) && !(e2 = (function(e3) {
            let t3 = e3.replace(/filename=.*;/, "").match(/data:([^;]*)(;base64)?,([A-Z+\d\/]+)/i);
            if (t3 && t3.length > 3 && w.atob && w.ArrayBuffer && w.Uint8Array && w.Blob && S.createObjectURL) {
              let e4 = w.atob(t3[3]), n3 = new w.ArrayBuffer(e4.length), i3 = new w.Uint8Array(n3);
              for (let t4 = 0; t4 < i3.length; ++t4) i3[t4] = e4.charCodeAt(t4);
              return S.createObjectURL(new w.Blob([i3], { type: t3[1] }));
            }
          })(e2) || "")) throw Error("Failed to convert to blob");
          if (void 0 !== i2.download) i2.href = e2, i2.download = t2, b.body.appendChild(i2), i2.click(), b.body.removeChild(i2);
          else try {
            if (!w.open(e2, "chart")) throw Error("Failed to open window");
          } catch (e3) {
            w.location.href = e2;
          }
        }
        let { isTouchDevice: E } = h(), O = { exporting: { allowTableSorting: true, libURL: "https://code.highcharts.com/12.5.0/lib/", local: true, type: "image/png", url: `https://export-svg.highcharts.com?v=${h().version}`, pdfFont: { normal: void 0, bold: void 0, bolditalic: void 0, italic: void 0 }, printMaxWidth: 780, scale: 2, buttons: { contextButton: { className: "highcharts-contextbutton", menuClassName: "highcharts-contextmenu", symbol: "menu", titleKey: "contextButtonTitle", menuItems: ["viewFullscreen", "printChart", "separator", "downloadPNG", "downloadJPEG", "downloadSVG"] } }, menuItemDefinitions: { viewFullscreen: { textKey: "viewFullscreen", onclick: function() {
          var _a;
          (_a = this.fullscreen) == null ? void 0 : _a.toggle();
        } }, printChart: { textKey: "printChart", onclick: function() {
          var _a;
          (_a = this.exporting) == null ? void 0 : _a.print();
        } }, separator: { separator: true }, downloadPNG: { textKey: "downloadPNG", onclick: function() {
          return __async(this, null, function* () {
            var _a;
            yield (_a = this.exporting) == null ? void 0 : _a.exportChart();
          });
        } }, downloadJPEG: { textKey: "downloadJPEG", onclick: function() {
          return __async(this, null, function* () {
            var _a;
            yield (_a = this.exporting) == null ? void 0 : _a.exportChart({ type: "image/jpeg" });
          });
        } }, downloadPDF: { textKey: "downloadPDF", onclick: function() {
          return __async(this, null, function* () {
            var _a;
            yield (_a = this.exporting) == null ? void 0 : _a.exportChart({ type: "application/pdf" });
          });
        } }, downloadSVG: { textKey: "downloadSVG", onclick: function() {
          return __async(this, null, function* () {
            var _a;
            yield (_a = this.exporting) == null ? void 0 : _a.exportChart({ type: "image/svg+xml" });
          });
        } } } }, lang: { viewFullscreen: "View in full screen", exitFullscreen: "Exit from full screen", printChart: "Print chart", downloadPNG: "Download PNG image", downloadJPEG: "Download JPEG image", downloadPDF: "Download PDF document", downloadSVG: "Download SVG vector image", contextButtonTitle: "Chart context menu" }, navigation: { buttonOptions: { symbolSize: 14, symbolX: 14.5, symbolY: 13.5, align: "right", buttonSpacing: 5, height: 28, y: -5, verticalAlign: "top", width: 28, symbolFill: "#666666", symbolStroke: "#666666", symbolStrokeWidth: 3, theme: { fill: "#ffffff", padding: 5, stroke: "none", "stroke-linecap": "round" } }, menuStyle: { border: "none", borderRadius: "3px", background: "#ffffff", padding: "0.5em" }, menuItemStyle: { background: "none", borderRadius: "3px", color: "#333333", padding: "0.5em", fontSize: E ? "0.9em" : "0.8em", transition: "background 250ms, color 250ms" }, menuItemHoverStyle: { background: "#f2f2f2" } } };
        !(function(e2) {
          let t2 = [];
          function n2(e3, t3, n3, i3) {
            return [["M", e3, t3 + 2.5], ["L", e3 + n3, t3 + 2.5], ["M", e3, t3 + i3 / 2 + 0.5], ["L", e3 + n3, t3 + i3 / 2 + 0.5], ["M", e3, t3 + i3 - 1.5], ["L", e3 + n3, t3 + i3 - 1.5]];
          }
          function i2(e3, t3, n3, i3) {
            let o2 = i3 / 3 - 2, r2 = [];
            return r2.concat(this.circle(n3 - o2, t3, o2, o2), this.circle(n3 - o2, t3 + o2 + 4, o2, o2), this.circle(n3 - o2, t3 + 2 * (o2 + 4), o2, o2));
          }
          e2.compose = function(e3) {
            if (-1 === t2.indexOf(e3)) {
              t2.push(e3);
              let o2 = e3.prototype.symbols;
              o2.menu = n2, o2.menuball = i2.bind(o2);
            }
          };
        })(o || (o = {}));
        let T = o, { composed: k } = h(), { addEvent: F, fireEvent: R, pushUnique: N } = h();
        function P() {
          this.fullscreen = new H(this);
        }
        class H {
          static compose(e2) {
            N(k, "Fullscreen") && F(e2, "beforeRender", P);
          }
          constructor(e2) {
            this.chart = e2, this.isOpen = false;
            const t2 = e2.renderTo;
            !this.browserProps && ("function" == typeof t2.requestFullscreen ? this.browserProps = { fullscreenChange: "fullscreenchange", requestFullscreen: "requestFullscreen", exitFullscreen: "exitFullscreen" } : t2.mozRequestFullScreen ? this.browserProps = { fullscreenChange: "mozfullscreenchange", requestFullscreen: "mozRequestFullScreen", exitFullscreen: "mozCancelFullScreen" } : t2.webkitRequestFullScreen ? this.browserProps = { fullscreenChange: "webkitfullscreenchange", requestFullscreen: "webkitRequestFullScreen", exitFullscreen: "webkitExitFullscreen" } : t2.msRequestFullscreen && (this.browserProps = { fullscreenChange: "MSFullscreenChange", requestFullscreen: "msRequestFullscreen", exitFullscreen: "msExitFullscreen" }));
          }
          close() {
            let e2 = this, t2 = e2.chart, n2 = t2.options.chart;
            R(t2, "fullscreenClose", void 0, function() {
              e2.isOpen && e2.browserProps && t2.container.ownerDocument instanceof Document && t2.container.ownerDocument[e2.browserProps.exitFullscreen](), e2.unbindFullscreenEvent && (e2.unbindFullscreenEvent = e2.unbindFullscreenEvent()), t2.setSize(e2.origWidth, e2.origHeight, false), e2.origWidth = void 0, e2.origHeight = void 0, n2.width = e2.origWidthOption, n2.height = e2.origHeightOption, e2.origWidthOption = void 0, e2.origHeightOption = void 0, e2.isOpen = false, e2.setButtonText();
            });
          }
          open() {
            let e2 = this, t2 = e2.chart, n2 = t2.options.chart;
            R(t2, "fullscreenOpen", void 0, function() {
              if (n2 && (e2.origWidthOption = n2.width, e2.origHeightOption = n2.height), e2.origWidth = t2.chartWidth, e2.origHeight = t2.chartHeight, e2.browserProps) {
                let n3 = F(t2.container.ownerDocument, e2.browserProps.fullscreenChange, function() {
                  e2.isOpen ? (e2.isOpen = false, e2.close()) : (t2.setSize(null, null, false), e2.isOpen = true, e2.setButtonText());
                }), i2 = F(t2, "destroy", n3);
                e2.unbindFullscreenEvent = () => {
                  n3(), i2();
                };
                let o2 = t2.renderTo[e2.browserProps.requestFullscreen]();
                o2 && o2.catch(function() {
                  alert("Full screen is not supported inside a frame.");
                });
              }
            });
          }
          setButtonText() {
            var _a, _b;
            let e2 = this.chart, t2 = (_a = e2.exporting) == null ? void 0 : _a.divElements, n2 = e2.options.exporting, i2 = n2 && n2.buttons && n2.buttons.contextButton.menuItems, o2 = e2.options.lang;
            if ((n2 == null ? void 0 : n2.menuItemDefinitions) && (o2 == null ? void 0 : o2.exitFullscreen) && o2.viewFullscreen && i2 && t2) {
              let e3 = t2[i2.indexOf("viewFullscreen")];
              e3 && d().setElementHTML(e3, this.isOpen ? o2.exitFullscreen : ((_b = n2.menuItemDefinitions.viewFullscreen) == null ? void 0 : _b.textKey) || o2.viewFullscreen);
            }
          }
          toggle() {
            this.isOpen ? this.close() : this.open();
          }
        }
        let { win: L } = h(), { discardElement: M, objectEach: A } = h(), D = { ajax: function(e2) {
          var _a;
          let t2 = { json: "application/json", xml: "application/xml", text: "text/plain", octet: "application/octet-stream" }, n2 = new XMLHttpRequest();
          function i2(t3, n3) {
            e2.error && e2.error(t3, n3);
          }
          if (!e2.url) return false;
          n2.open((e2.type || "get").toUpperCase(), e2.url, true), ((_a = e2.headers) == null ? void 0 : _a["Content-Type"]) || n2.setRequestHeader("Content-Type", t2[e2.dataType || "json"] || t2.text), A(e2.headers, function(e3, t3) {
            n2.setRequestHeader(t3, e3);
          }), e2.responseType && (n2.responseType = e2.responseType), n2.onreadystatechange = function() {
            var _a2;
            let t3;
            if (4 === n2.readyState) {
              if (200 === n2.status) {
                if ("blob" !== e2.responseType && (t3 = n2.responseText, "json" === e2.dataType)) try {
                  t3 = JSON.parse(t3);
                } catch (e3) {
                  if (e3 instanceof Error) return i2(n2, e3);
                }
                return (_a2 = e2.success) == null ? void 0 : _a2.call(e2, t3, n2);
              }
              i2(n2, n2.responseText);
            }
          }, e2.data && "string" != typeof e2.data && (e2.data = JSON.stringify(e2.data)), n2.send(e2.data);
        }, getJSON: function(e2, t2) {
          D.ajax({ url: e2, success: t2, dataType: "json", headers: { "Content-Type": "text/plain" } });
        } };
        D.post = function(e2, t2, n2) {
          return __async(this, null, function* () {
            let i2 = new L.FormData();
            A(t2, function(e3, t3) {
              i2.append(t3, e3);
            }), i2.append("b64", "true");
            let o2 = yield L.fetch(e2, __spreadValues({ method: "POST", body: i2 }, n2));
            if (o2.ok) {
              let e3 = yield o2.text(), n3 = document.createElement("a");
              n3.href = `data:${t2.type};base64,${e3}`, n3.download = t2.filename, n3.click(), M(n3);
            }
          });
        };
        let { defaultOptions: I, setOptions: U } = h(), { composed: j, doc: B, isFirefox: G, isMS: $, isSafari: V, SVG_NS: W, win: q } = h(), { addEvent: z, clearTimeout: K, createElement: J, css: _, discardElement: X, error: Y, extend: Z, find: Q, fireEvent: ee, isObject: et, merge: en, objectEach: ei, pick: eo, pushUnique: er, removeEvent: ea, splat: es, uniqueKey: el } = h();
        d().allowedAttributes.push("data-z-index", "fill-opacity", "filter", "preserveAspectRatio", "rx", "ry", "stroke-dasharray", "stroke-linejoin", "stroke-opacity", "text-anchor", "transform", "transform-origin", "version", "viewBox", "visibility", "xmlns", "xmlns:xlink"), d().allowedTags.push("desc", "clippath", "fedropshadow", "femorphology", "g", "image");
        let ec = q.URL || q.webkitURL || q;
        class eh {
          constructor(e2, t2) {
            this.options = {}, this.chart = e2, this.options = t2, this.btnCount = 0, this.buttonOffset = 0, this.divElements = [], this.svgElements = [];
          }
          static hyphenate(e2) {
            return e2.replace(/[A-Z]/g, function(e3) {
              return "-" + e3.toLowerCase();
            });
          }
          static imageToDataURL(e2, t2, n2) {
            return __async(this, null, function* () {
              let i2 = yield eh.loadImage(e2), o2 = B.createElement("canvas"), r2 = o2 == null ? void 0 : o2.getContext("2d");
              if (r2) return o2.height = i2.height * t2, o2.width = i2.width * t2, r2.drawImage(i2, 0, 0, o2.width, o2.height), o2.toDataURL(n2);
              throw Error("No canvas found!");
            });
          }
          static fetchCSS(e2) {
            return __async(this, null, function* () {
              let t2 = yield fetch(e2).then((e3) => e3.text()), n2 = new CSSStyleSheet();
              return n2.replaceSync(t2), n2;
            });
          }
          static handleStyleSheet(e2, t2) {
            return __async(this, null, function* () {
              try {
                for (let n2 of Array.from(e2.cssRules)) {
                  if (n2 instanceof CSSImportRule) {
                    let e3 = yield eh.fetchCSS(n2.href);
                    yield eh.handleStyleSheet(e3, t2);
                  }
                  if (n2 instanceof CSSFontFaceRule) {
                    let i2 = n2.cssText;
                    if (e2.href) {
                      let t3 = e2.href, n3 = /url\(\s*(['"]?)(?![a-z]+:|\/\/)([^'")]+?)\1\s*\)/gi;
                      i2 = i2.replace(n3, (e3, n4, i3) => {
                        let o2 = new URL(i3, t3).href;
                        return `url(${n4}${o2}${n4})`;
                      });
                    }
                    t2.push(i2);
                  }
                }
              } catch (e3) {
                if (e2.href) {
                  let n2 = yield eh.fetchCSS(e2.href);
                  yield eh.handleStyleSheet(n2, t2);
                }
              }
            });
          }
          static fetchStyleSheets() {
            return __async(this, null, function* () {
              let e2 = [];
              for (let t2 of Array.from(B.styleSheets)) yield eh.handleStyleSheet(t2, e2);
              return e2;
            });
          }
          static inlineFonts(e2) {
            return __async(this, null, function* () {
              let t2 = yield eh.fetchStyleSheets(), n2 = /url\(([^)]+)\)/g, i2 = [], o2 = t2.join("\n"), r2;
              for (; r2 = n2.exec(o2); ) {
                let e3 = r2[1].replace(/['"]/g, "");
                i2.includes(e3) || i2.push(e3);
              }
              let a2 = (e3) => {
                let t3 = "", n3 = new Uint8Array(e3);
                for (let e4 = 0; e4 < n3.byteLength; e4++) t3 += String.fromCharCode(n3[e4]);
                return btoa(t3);
              }, s2 = {};
              for (let e3 of i2) try {
                let t3 = yield fetch(e3), n3 = t3.headers.get("Content-Type") || "", i3 = a2(yield t3.arrayBuffer());
                s2[e3] = `data:${n3};base64,${i3}`;
              } catch (e4) {
              }
              o2 = o2.replace(n2, (e3, t3) => {
                let n3 = t3.replace(/['"]/g, "");
                return `url(${s2[n3] || n3})`;
              });
              let l2 = document.createElementNS("http://www.w3.org/2000/svg", "style");
              return l2.textContent = o2, e2.append(l2), e2;
            });
          }
          static loadImage(e2) {
            return new Promise((t2, n2) => {
              let i2 = new q.Image();
              i2.crossOrigin = "Anonymous", i2.onload = () => {
                setTimeout(() => {
                  t2(i2);
                }, eh.loadEventDeferDelay);
              }, i2.onerror = (e3) => {
                n2(e3);
              }, i2.src = e2;
            });
          }
          static prepareImageOptions(e2) {
            var _a;
            let t2 = (e2 == null ? void 0 : e2.type) || "image/png", n2 = (e2 == null ? void 0 : e2.libURL) || ((_a = I.exporting) == null ? void 0 : _a.libURL);
            return { type: t2, filename: ((e2 == null ? void 0 : e2.filename) || "chart") + "." + ("image/svg+xml" === t2 ? "svg" : t2.split("/")[1]), scale: (e2 == null ? void 0 : e2.scale) || 1, libURL: (n2 == null ? void 0 : n2.slice(-1)) !== "/" ? n2 + "/" : n2 };
          }
          static sanitizeSVG(e2, t2) {
            var _a;
            let n2 = e2.indexOf("</svg>") + 6, i2 = e2.indexOf("<foreignObject") > -1, o2 = e2.substr(n2);
            return e2 = e2.substr(0, n2), i2 ? e2 = e2.replace(/(<(?:img|br).*?(?=\>))>/g, "$1 />") : o2 && ((_a = t2 == null ? void 0 : t2.exporting) == null ? void 0 : _a.allowHTML) && (o2 = '<foreignObject x="0" y="0" width="' + t2.chart.width + '" height="' + t2.chart.height + '"><body xmlns="http://www.w3.org/1999/xhtml">' + o2.replace(/(<(?:img|br).*?(?=\>))>/g, "$1 />") + "</body></foreignObject>", e2 = e2.replace("</svg>", o2 + "</svg>")), e2 = e2.replace(/zIndex="[^"]+"/g, "").replace(/symbolName="[^"]+"/g, "").replace(/jQuery\d+="[^"]+"/g, "").replace(/url\(("|&quot;)(.*?)("|&quot;)\;?\)/g, "url($2)").replace(/url\([^#]+#/g, "url(#").replace(/<svg /, '<svg xmlns:xlink="http://www.w3.org/1999/xlink" ').replace(/ (NS\d+\:)?href=/g, " xlink:href=").replace(/\n+/g, " ").replace(/&nbsp;/g, "\xA0").replace(/&shy;/g, "\xAD");
          }
          static svgToDataURL(e2) {
            let t2 = q.navigator.userAgent, n2 = t2.indexOf("WebKit") > -1 && 0 > t2.indexOf("Chrome");
            try {
              if (!n2 && -1 === e2.indexOf("<foreignObject")) return ec.createObjectURL(new q.Blob([e2], { type: "image/svg+xml;charset-utf-16" }));
            } catch (e3) {
            }
            return "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(e2);
          }
          addButton(e2) {
            var _a;
            let t2, n2 = this, i2 = n2.chart, o2 = i2.renderer, r2 = en((_a = i2.options.navigation) == null ? void 0 : _a.buttonOptions, e2), a2 = r2.onclick, s2 = r2.menuItems, l2 = r2.symbolSize || 12;
            if (false === r2.enabled || !r2.theme) return;
            let c2 = i2.styledMode ? {} : r2.theme, h2 = () => {
            };
            a2 ? h2 = function(e3) {
              e3 && e3.stopPropagation(), a2.call(i2, e3);
            } : s2 && (h2 = function(e3) {
              e3 && e3.stopPropagation(), n2.contextMenu(p2.menuClassName, s2, p2.translateX || 0, p2.translateY || 0, p2.width || 0, p2.height || 0, p2), p2.setState(2);
            }), r2.text && r2.symbol ? c2.paddingLeft = eo(c2.paddingLeft, 30) : r2.text || Z(c2, { width: r2.width, height: r2.height, padding: 0 });
            let p2 = o2.button(r2.text || "", 0, 0, h2, c2, void 0, void 0, void 0, void 0, r2.useHTML).addClass(e2.className || "").attr({ title: eo(i2.options.lang[r2._titleKey || r2.titleKey], "") });
            p2.menuClassName = e2.menuClassName || "highcharts-menu-" + n2.btnCount++, r2.symbol && (t2 = o2.symbol(r2.symbol, Math.round((r2.symbolX || 0) - l2 / 2), Math.round((r2.symbolY || 0) - l2 / 2), l2, l2, { width: l2, height: l2 }).addClass("highcharts-button-symbol").attr({ zIndex: 1 }).add(p2), i2.styledMode || t2.attr({ stroke: r2.symbolStroke, fill: r2.symbolFill, "stroke-width": r2.symbolStrokeWidth || 1 })), p2.add(n2.group).align(Z(r2, { width: p2.width, x: eo(r2.x, n2.buttonOffset) }), true, "spacingBox"), n2.buttonOffset += ((p2.width || 0) + (r2.buttonSpacing || 0)) * ("right" === r2.align ? -1 : 1), n2.svgElements.push(p2, t2);
          }
          afterPrint() {
            let e2 = this.chart;
            if (!this.printReverseInfo) return;
            let { childNodes: t2, origDisplay: n2, resetParams: i2 } = this.printReverseInfo;
            this.moveContainers(e2.renderTo), [].forEach.call(t2, function(e3, t3) {
              1 === e3.nodeType && (e3.style.display = n2[t3] || "");
            }), this.isPrinting = false, i2 && e2.setSize.apply(e2, i2), delete this.printReverseInfo, eh.printingChart = void 0, ee(e2, "afterPrint");
          }
          beforePrint() {
            var _a;
            let e2 = this.chart, t2 = B.body, n2 = this.options.printMaxWidth, i2 = { childNodes: t2.childNodes, origDisplay: [], resetParams: void 0 };
            this.isPrinting = true, (_a = e2.pointer) == null ? void 0 : _a.reset(void 0, 0), ee(e2, "beforePrint"), n2 && e2.chartWidth > n2 && (i2.resetParams = [e2.options.chart.width, void 0, false], e2.setSize(n2, void 0, false)), [].forEach.call(i2.childNodes, function(e3, t3) {
              1 === e3.nodeType && (i2.origDisplay[t3] = e3.style.display, e3.style.display = "none");
            }), this.moveContainers(t2), this.printReverseInfo = i2;
          }
          contextMenu(e2, t2, n2, i2, o2, r2, a2) {
            var _a, _b, _c;
            let s2 = this, l2 = s2.chart, c2 = l2.options.navigation, h2 = l2.chartWidth, p2 = l2.chartHeight, u2 = "cache-" + e2, g2 = Math.max(o2, r2), f2, m2 = l2[u2];
            m2 || (s2.contextMenuEl = l2[u2] = m2 = J("div", { className: e2 }, __spreadValues({ position: "absolute", zIndex: 1e3, padding: g2 + "px", pointerEvents: "auto" }, l2.renderer.style), ((_a = l2.scrollablePlotArea) == null ? void 0 : _a.fixedDiv) || l2.container), f2 = J("ul", { className: "highcharts-menu" }, l2.styledMode ? {} : { listStyle: "none", margin: 0, padding: 0 }, m2), l2.styledMode || _(f2, Z({ MozBoxShadow: "3px 3px 10px #0008", WebkitBoxShadow: "3px 3px 10px #0008", boxShadow: "3px 3px 10px #0008" }, (c2 == null ? void 0 : c2.menuStyle) || {})), m2.hideMenu = function() {
              _(m2, { display: "none" }), a2 && a2.setState(0), l2.exporting && (l2.exporting.openMenu = false), _(l2.renderTo, { overflow: "hidden" }), _(l2.container, { overflow: "hidden" }), K(m2.hideTimer), ee(l2, "exportMenuHidden");
            }, (_b = s2.events) == null ? void 0 : _b.push(z(m2, "mouseleave", function() {
              m2.hideTimer = q.setTimeout(m2.hideMenu, 500);
            }), z(m2, "mouseenter", function() {
              K(m2.hideTimer);
            }), z(B, "mouseup", function(t3) {
              var _a2;
              ((_a2 = l2.pointer) == null ? void 0 : _a2.inClass(t3.target, e2)) || m2.hideMenu();
            }), z(m2, "click", function() {
              var _a2;
              ((_a2 = l2.exporting) == null ? void 0 : _a2.openMenu) && m2.hideMenu();
            })), t2.forEach(function(e3) {
              var _a2;
              if ("string" == typeof e3 && ((_a2 = s2.options.menuItemDefinitions) == null ? void 0 : _a2[e3]) && (e3 = s2.options.menuItemDefinitions[e3]), et(e3, true)) {
                let t3;
                e3.separator ? t3 = J("hr", void 0, void 0, f2) : ("viewData" === e3.textKey && s2.isDataTableVisible && (e3.textKey = "hideData"), t3 = J("li", { className: "highcharts-menu-item", onclick: function(t4) {
                  t4 && t4.stopPropagation(), m2.hideMenu(), "string" != typeof e3 && e3.onclick && e3.onclick.apply(l2, arguments);
                } }, void 0, f2), d().setElementHTML(t3, e3.text || l2.options.lang[e3.textKey]), l2.styledMode || (t3.onmouseover = function() {
                  _(this, (c2 == null ? void 0 : c2.menuItemHoverStyle) || {});
                }, t3.onmouseout = function() {
                  _(this, (c2 == null ? void 0 : c2.menuItemStyle) || {});
                }, _(t3, Z({ cursor: "pointer" }, (c2 == null ? void 0 : c2.menuItemStyle) || {})))), s2.divElements.push(t3);
              }
            }), s2.divElements.push(f2, m2), s2.menuHeight = m2.offsetHeight, s2.menuWidth = m2.offsetWidth);
            let y2 = { display: "block" };
            n2 + (s2.menuWidth || 0) > h2 ? y2.right = h2 - n2 - o2 - g2 + "px" : y2.left = n2 - g2 + "px", i2 + r2 + (s2.menuHeight || 0) > p2 && ((_c = a2.alignOptions) == null ? void 0 : _c.verticalAlign) !== "top" ? y2.bottom = p2 - i2 - g2 + "px" : y2.top = i2 + r2 - g2 + "px", _(m2, y2), _(l2.renderTo, { overflow: "" }), _(l2.container, { overflow: "" }), l2.exporting && (l2.exporting.openMenu = true), ee(l2, "exportMenuShown");
          }
          destroy(e2) {
            let t2, n2 = e2 ? e2.target : this.chart, { divElements: i2, events: o2, svgElements: r2 } = this;
            r2.forEach((e3, i3) => {
              e3 && (e3.onclick = e3.ontouchstart = null, n2[t2 = "cache-" + e3.menuClassName] && delete n2[t2], r2[i3] = e3.destroy());
            }), r2.length = 0, this.group && (this.group.destroy(), delete this.group), i2.forEach(function(e3, t3) {
              e3 && (K(e3.hideTimer), ea(e3, "mouseleave"), i2[t3] = e3.onmouseout = e3.onmouseover = e3.ontouchstart = e3.onclick = null, X(e3));
            }), i2.length = 0, o2 && (o2.forEach(function(e3) {
              e3();
            }), o2.length = 0);
          }
          downloadSVG(e2, t2) {
            return __async(this, null, function* () {
              let n2, i2 = { svg: e2, exportingOptions: t2, exporting: this };
              if (ee(eh.prototype, "downloadSVG", i2), i2.defaultPrevented) return;
              let { type: o2, filename: r2, scale: a2, libURL: s2 } = eh.prepareImageOptions(t2);
              if ("application/pdf" === o2) throw Error("Offline exporting logic for PDF type is not found.");
              if ("image/svg+xml" === o2) {
                if (void 0 !== q.MSBlobBuilder) {
                  let t3 = new q.MSBlobBuilder();
                  t3.append(e2), n2 = t3.getBlob("image/svg+xml");
                } else n2 = eh.svgToDataURL(e2);
                C(n2, r2);
              } else {
                n2 = eh.svgToDataURL(e2);
                try {
                  eh.objectURLRevoke = true;
                  let e3 = yield eh.imageToDataURL(n2, a2, o2);
                  C(e3, r2);
                } catch (h2) {
                  if ("No canvas found!" === h2.message) throw h2;
                  if (e2.length > 1e8) throw Error("Input too long");
                  let t3 = B.createElement("canvas"), n3 = t3.getContext("2d"), i3 = e2.match(/^<svg[^>]*\s{,1000}width\s{,1000}=\s{,1000}\"?(\d+)\"?[^>]*>/), c2 = e2.match(/^<svg[^>]*\s{0,1000}height\s{,1000}=\s{,1000}\"?(\d+)\"?[^>]*>/);
                  if (n3 && i3 && c2) {
                    let h3 = i3[1] * a2, p2 = c2[1] * a2;
                    if (t3.width = h3, t3.height = p2, !q.canvg) {
                      var l2;
                      eh.objectURLRevoke = true, yield (l2 = s2 + "canvg.js", new Promise((e3, t4) => {
                        let n4 = b.getElementsByTagName("head")[0], i4 = b.createElement("script");
                        i4.type = "text/javascript", i4.src = l2, i4.onload = () => {
                          e3();
                        }, i4.onerror = () => {
                          let e4 = `Error loading script ${l2}`;
                          v(e4), t4(Error(e4));
                        }, n4.appendChild(i4);
                      }));
                    }
                    q.canvg.Canvg.fromString(n3, e2).start(), C(q.navigator.msSaveOrOpenBlob ? t3.msToBlob() : t3.toDataURL(o2), r2);
                  }
                } finally {
                  if (eh.objectURLRevoke) try {
                    ec.revokeObjectURL(n2);
                  } catch (e3) {
                  }
                }
              }
            });
          }
          exportChart(e2, t2) {
            return __async(this, null, function* () {
              if ((e2 = en(this.options, e2)).local) yield this.localExport(e2, t2 || {});
              else {
                let n2 = this.getSVGForExport(e2, t2);
                e2.url && (yield D.post(e2.url, { filename: e2.filename ? e2.filename.replace(/\//g, "-") : this.getFilename(), type: e2.type, width: e2.width, scale: e2.scale, svg: n2 }, e2.fetchOptions));
              }
            });
          }
          fallbackToServer(e2, t2) {
            return __async(this, null, function* () {
              false === e2.fallbackToExportServer ? e2.error ? e2.error(e2, t2) : Y(28, true) : "application/pdf" === e2.type && (e2.local = false, yield this.exportChart(e2));
            });
          }
          getChartHTML(e2) {
            let t2 = this.chart;
            return e2 && this.inlineStyles(), this.resolveCSSVariables(), t2.container.innerHTML;
          }
          getFilename() {
            var _a;
            let e2 = (_a = this.chart.userOptions.title) == null ? void 0 : _a.text, t2 = this.options.filename;
            return t2 ? t2.replace(/\//g, "-") : ("string" == typeof e2 && (t2 = e2.toLowerCase().replace(/<\/?[^>]+(>|$)/g, "").replace(/[\s_]+/g, "-").replace(/[^a-z\d\-]/g, "").replace(/^[\-]+/g, "").replace(/[\-]+/g, "-").substr(0, 24).replace(/[\-]+$/g, "")), (!t2 || t2.length < 5) && (t2 = "chart"), t2);
          }
          getSVG(e2) {
            var _a, _b, _c, _d;
            let t2 = this.chart, n2, i2, o2 = en(t2.options, e2);
            o2.plotOptions = en(t2.userOptions.plotOptions, e2 == null ? void 0 : e2.plotOptions), o2.time = en(t2.userOptions.time, e2 == null ? void 0 : e2.time);
            let r2 = J("div", void 0, { position: "absolute", top: "-9999em", width: t2.chartWidth + "px", height: t2.chartHeight + "px" }, B.body), a2 = t2.renderTo.style.width, s2 = t2.renderTo.style.height, l2 = ((_a = o2.exporting) == null ? void 0 : _a.sourceWidth) || o2.chart.width || /px$/.test(a2) && parseInt(a2, 10) || (o2.isGantt ? 800 : 600), c2 = ((_b = o2.exporting) == null ? void 0 : _b.sourceHeight) || o2.chart.height || /px$/.test(s2) && parseInt(s2, 10) || 400;
            Z(o2.chart, { animation: false, renderTo: r2, forExport: true, renderer: "SVGRenderer", width: l2, height: c2 }), o2.exporting && (o2.exporting.enabled = false), delete o2.data, o2.series = [], t2.series.forEach(function(e3) {
              var _a2;
              (i2 = en(e3.userOptions, { animation: false, enableMouseTracking: false, showCheckbox: false, visible: e3.visible })).isInternal || ((_a2 = o2 == null ? void 0 : o2.series) == null ? void 0 : _a2.push(i2));
            });
            let h2 = {};
            t2.axes.forEach(function(e3) {
              e3.userOptions.internalKey || (e3.userOptions.internalKey = el()), o2 && !e3.options.isInternal && (h2[e3.coll] || (h2[e3.coll] = true, o2[e3.coll] = []), o2[e3.coll].push(en(e3.userOptions, { visible: e3.visible, type: e3.type, uniqueNames: e3.uniqueNames })));
            }), o2.colorAxis = t2.userOptions.colorAxis;
            let p2 = new t2.constructor(o2, t2.callback);
            return e2 && ["xAxis", "yAxis", "series"].forEach(function(t3) {
              e2[t3] && p2.update({ [t3]: e2[t3] });
            }), t2.axes.forEach(function(t3) {
              let n3 = Q(p2.axes, (e3) => e3.options.internalKey === t3.userOptions.internalKey);
              if (n3) {
                let i3 = t3.getExtremes(), o3 = es((e2 == null ? void 0 : e2[t3.coll]) || {})[0], r3 = "min" in o3 ? o3.min : i3.userMin, a3 = "max" in o3 ? o3.max : i3.userMax;
                (void 0 !== r3 && r3 !== n3.min || void 0 !== a3 && a3 !== n3.max) && n3.setExtremes(r3 != null ? r3 : void 0, a3 != null ? a3 : void 0, true, false);
              }
            }), n2 = ((_d = p2.exporting) == null ? void 0 : _d.getChartHTML(t2.styledMode || ((_c = o2.exporting) == null ? void 0 : _c.applyStyleSheets))) || "", ee(t2, "getSVG", { chartCopy: p2 }), n2 = eh.sanitizeSVG(n2, o2), o2 = void 0, p2.destroy(), X(r2), n2;
          }
          getSVGForExport(e2, t2) {
            let n2 = this.options;
            return this.getSVG(en({ chart: { borderRadius: 0 } }, n2.chartOptions, t2, { exporting: { sourceWidth: (e2 == null ? void 0 : e2.sourceWidth) || n2.sourceWidth, sourceHeight: (e2 == null ? void 0 : e2.sourceHeight) || n2.sourceHeight } }));
          }
          inlineStyles() {
            var _a;
            let e2, t2 = eh.inlineDenylist, n2 = eh.inlineAllowlist, i2 = {}, o2 = J("iframe", void 0, { width: "1px", height: "1px", visibility: "hidden" }, B.body), r2 = (_a = o2.contentWindow) == null ? void 0 : _a.document;
            r2 && r2.body.appendChild(r2.createElementNS(W, "svg")), !(function o3(a2) {
              let s2, l2, c2, h2, p2, d2, u2 = {};
              if (r2 && 1 === a2.nodeType && -1 === eh.unstyledElements.indexOf(a2.nodeName)) {
                if (s2 = q.getComputedStyle(a2, null), l2 = "svg" === a2.nodeName ? {} : q.getComputedStyle(a2.parentNode, null), !i2[a2.nodeName]) {
                  e2 = r2.getElementsByTagName("svg")[0], c2 = r2.createElementNS(a2.namespaceURI, a2.nodeName), e2.appendChild(c2);
                  let t3 = q.getComputedStyle(c2, null), n3 = {};
                  for (let e3 in t3) e3.length < 1e3 && "string" == typeof t3[e3] && !/^\d+$/.test(e3) && (n3[e3] = t3[e3]);
                  i2[a2.nodeName] = n3, "text" === a2.nodeName && delete i2.text.fill, e2.removeChild(c2);
                }
                for (let e3 in s2) (G || $ || V || Object.hasOwnProperty.call(s2, e3)) && (function(e4, o4) {
                  if (h2 = p2 = false, n2.length) {
                    for (d2 = n2.length; d2-- && !p2; ) p2 = n2[d2].test(o4);
                    h2 = !p2;
                  }
                  for ("transform" === o4 && "none" === e4 && (h2 = true), d2 = t2.length; d2-- && !h2; ) {
                    if (o4.length > 1e3) throw Error("Input too long");
                    h2 = t2[d2].test(o4) || "function" == typeof e4;
                  }
                  !h2 && (l2[o4] !== e4 || "svg" === a2.nodeName) && i2[a2.nodeName][o4] !== e4 && (eh.inlineToAttributes && -1 === eh.inlineToAttributes.indexOf(o4) ? u2[o4] = e4 : e4 && a2.setAttribute(eh.hyphenate(o4), e4));
                })(s2[e3], e3);
                if (_(a2, u2), "svg" === a2.nodeName && a2.setAttribute("stroke-width", "1px"), "text" === a2.nodeName) return;
                [].forEach.call(a2.children || a2.childNodes, o3);
              }
            })(this.chart.container.querySelector("svg")), e2.parentNode.removeChild(e2), o2.parentNode.removeChild(o2);
          }
          localExport(e2, t2) {
            return __async(this, null, function* () {
              var _a, _b, _c;
              let n2 = this.chart, i2, o2, r2 = null, a2;
              if ($ && n2.styledMode && !eh.inlineAllowlist.length && eh.inlineAllowlist.push(/^blockSize/, /^border/, /^caretColor/, /^color/, /^columnRule/, /^columnRuleColor/, /^cssFloat/, /^cursor/, /^fill$/, /^fillOpacity/, /^font/, /^inlineSize/, /^length/, /^lineHeight/, /^opacity/, /^outline/, /^parentRule/, /^rx$/, /^ry$/, /^stroke/, /^textAlign/, /^textAnchor/, /^textDecoration/, /^transform/, /^vectorEffect/, /^visibility/, /^x$/, /^y$/), $ && ("application/pdf" === e2.type || n2.container.getElementsByTagName("image").length && "image/svg+xml" !== e2.type) || "application/pdf" === e2.type && [].some.call(n2.container.getElementsByTagName("image"), function(e3) {
                let t3 = e3.getAttribute("href");
                return "" !== t3 && "string" == typeof t3 && 0 !== t3.indexOf("data:");
              })) return void (yield this.fallbackToServer(e2, Error("Image type not supported for this chart/browser.")));
              let s2 = z(n2, "getSVG", (e3) => {
                o2 = e3.chartCopy.options, a2 = (i2 = e3.chartCopy.container.cloneNode(true)) && i2.getElementsByTagName("image") || [];
              });
              try {
                let n3;
                for (let n4 of (this.getSVGForExport(e2, t2), a2 ? Array.from(a2) : [])) if (r2 = n4.getAttributeNS("http://www.w3.org/1999/xlink", "href")) {
                  eh.objectURLRevoke = false;
                  let t3 = yield eh.imageToDataURL(r2, (e2 == null ? void 0 : e2.scale) || 1, (e2 == null ? void 0 : e2.type) || "image/png");
                  n4.setAttributeNS("http://www.w3.org/1999/xlink", "href", t3);
                } else n4.parentNode.removeChild(n4);
                let s3 = i2 == null ? void 0 : i2.querySelector("svg");
                s3 && !((_c = (_b = (_a = e2.chartOptions) == null ? void 0 : _a.chart) == null ? void 0 : _b.style) == null ? void 0 : _c.fontFamily) && (yield eh.inlineFonts(s3));
                let l2 = (n3 = i2 == null ? void 0 : i2.innerHTML, eh.sanitizeSVG(n3 || "", o2));
                if (l2.indexOf("<foreignObject") > -1 && "image/svg+xml" !== e2.type && ($ || "application/pdf" === e2.type)) throw Error("Image type not supported for charts with embedded HTML");
                return yield this.downloadSVG(l2, Z({ filename: this.getFilename() }, e2)), l2;
              } catch (t3) {
                yield this.fallbackToServer(e2, t3);
              } finally {
                s2();
              }
            });
          }
          moveContainers(e2) {
            let t2 = this.chart, { scrollablePlotArea: n2 } = t2;
            (n2 ? [n2.fixedDiv, n2.scrollingContainer] : [t2.container]).forEach(function(t3) {
              e2.appendChild(t3);
            });
          }
          print() {
            let e2 = this.chart;
            this.isPrinting || (eh.printingChart = e2, V || this.beforePrint(), setTimeout(() => {
              q.focus(), q.print(), V || setTimeout(() => {
                var _a;
                (_a = e2.exporting) == null ? void 0 : _a.afterPrint();
              }, 1e3);
            }, 1));
          }
          render() {
            let e2 = this, { chart: t2, options: n2 } = e2, i2 = (e2 == null ? void 0 : e2.isDirty) || !(e2 == null ? void 0 : e2.svgElements.length);
            e2.buttonOffset = 0, e2.isDirty && e2.destroy(), i2 && false !== n2.enabled && (e2.events = [], e2.group || (e2.group = t2.renderer.g("exporting-group").attr({ zIndex: 3 }).add()), ei(n2 == null ? void 0 : n2.buttons, function(t3) {
              e2.addButton(t3);
            }), e2.isDirty = false);
          }
          resolveCSSVariables() {
            Array.from(this.chart.container.querySelectorAll("*")).forEach((e2) => {
              ["color", "fill", "stop-color", "stroke"].forEach((t2) => {
                var _a;
                let n2 = e2.getAttribute(t2);
                (n2 == null ? void 0 : n2.includes("var(")) && e2.setAttribute(t2, getComputedStyle(e2).getPropertyValue(t2));
                let i2 = (_a = e2.style) == null ? void 0 : _a[t2];
                (i2 == null ? void 0 : i2.includes("var(")) && (e2.style[t2] = getComputedStyle(e2).getPropertyValue(t2));
              });
            });
          }
          update(e2, t2) {
            this.isDirty = true, en(true, this.options, e2), eo(t2, true) && this.chart.redraw();
          }
        }
        eh.inlineAllowlist = [], eh.inlineDenylist = [/-/, /^(clipPath|cssText|d|height|width)$/, /^font$/, /[lL]ogical(Width|Height)$/, /^parentRule$/, /^(cssRules|ownerRules)$/, /perspective/, /TapHighlightColor/, /^transition/, /^length$/, /^\d+$/], eh.inlineToAttributes = ["fill", "stroke", "strokeLinecap", "strokeLinejoin", "strokeWidth", "textAnchor", "x", "y"], eh.loadEventDeferDelay = 150 * !!$, eh.unstyledElements = ["clipPath", "defs", "desc"], (function(e2) {
          function t2(e3) {
            let t3 = e3.exporting;
            t3 && (t3.render(), z(e3, "redraw", function() {
              var _a;
              (_a = this.exporting) == null ? void 0 : _a.render();
            }), z(e3, "destroy", function() {
              var _a;
              (_a = this.exporting) == null ? void 0 : _a.destroy();
            }));
          }
          function n2() {
            let t3 = this;
            t3.options.exporting && (t3.exporting = new e2(t3, t3.options.exporting), y.compose(t3).navigation.addUpdate((e3, n3) => {
              t3.exporting && (t3.exporting.isDirty = true, en(true, t3.options.navigation, e3), eo(n3, true) && t3.redraw());
            }));
          }
          function i2({ alignTo: e3, key: t3, textPxLength: n3 }) {
            var _a, _b, _c, _d;
            let i3 = this.options.exporting, { align: o2, buttonSpacing: r2 = 0, verticalAlign: a2, width: s2 = 0 } = en((_a = this.options.navigation) == null ? void 0 : _a.buttonOptions, (_b = i3 == null ? void 0 : i3.buttons) == null ? void 0 : _b.contextButton), l2 = e3.width - n3, c2 = s2 + r2;
            ((_c = i3 == null ? void 0 : i3.enabled) != null ? _c : true) && "title" === t3 && "right" === o2 && "top" === a2 && l2 < 2 * c2 && (l2 < c2 ? e3.width -= c2 : ((_d = this.title) == null ? void 0 : _d.alignValue) !== "left" && (e3.x -= c2 - l2 / 2));
          }
          e2.compose = function(o2, r2) {
            T.compose(r2), H.compose(o2), er(j, "Exporting") && (Z(g().prototype, { exportChart: function(e3, t3) {
              return __async(this, null, function* () {
                var _a;
                yield (_a = this.exporting) == null ? void 0 : _a.exportChart(e3, t3);
              });
            }, getChartHTML: function(e3) {
              var _a;
              return (_a = this.exporting) == null ? void 0 : _a.getChartHTML(e3);
            }, getFilename: function() {
              var _a;
              return (_a = this.exporting) == null ? void 0 : _a.getFilename();
            }, getSVG: function(e3) {
              var _a;
              return (_a = this.exporting) == null ? void 0 : _a.getSVG(e3);
            }, print: function() {
              var _a;
              return (_a = this.exporting) == null ? void 0 : _a.print();
            } }), o2.prototype.callbacks.push(t2), z(o2, "afterInit", n2), z(o2, "layOutTitle", i2), V && q.matchMedia("print").addListener(function(t3) {
              var _a, _b;
              e2.printingChart && (t3.matches ? (_a = e2.printingChart.exporting) == null ? void 0 : _a.beforePrint() : (_b = e2.printingChart.exporting) == null ? void 0 : _b.afterPrint());
            }), U(O));
          };
        })(eh || (eh = {}));
        let ep = eh, ed = h();
        ed.Exporting = ep, ed.HttpUtilities = ed.HttpUtilities || D, ed.ajax = ed.HttpUtilities.ajax, ed.getJSON = ed.HttpUtilities.getJSON, ed.post = ed.HttpUtilities.post, ep.compose(ed.Chart, ed.Renderer);
        let eu = h();
        return l.default;
      })());
    }
  });

  // node_modules/highcharts/modules/timeline.js
  var require_timeline = __commonJS({
    "node_modules/highcharts/modules/timeline.js"(exports, module) {
      !/**
      * Highcharts JS v12.5.0 (2026-01-12)
      * @module highcharts/modules/timeline
      * @requires highcharts
      *
      * Timeline series
      *
      * (c) 2010-2026 Highsoft AS
      * Author: Daniel Studencki
      *
      * A commercial license may be required depending on use.
      * See www.highcharts.com/license
      */
      (function(t, e) {
        "object" == typeof exports && "object" == typeof module ? module.exports = e(t._Highcharts, t._Highcharts.SeriesRegistry, t._Highcharts.Point) : "function" == typeof define && define.amd ? define("highcharts/modules/timeline", ["highcharts/highcharts"], function(t2) {
          return e(t2, t2.SeriesRegistry, t2.Point);
        }) : "object" == typeof exports ? exports["highcharts/modules/timeline"] = e(t._Highcharts, t._Highcharts.SeriesRegistry, t._Highcharts.Point) : t.Highcharts = e(t.Highcharts, t.Highcharts.SeriesRegistry, t.Highcharts.Point);
      })("u" < typeof window ? exports : window, (t, e, i) => (() => {
        "use strict";
        var s = { 260: (t2) => {
          t2.exports = i;
        }, 512: (t2) => {
          t2.exports = e;
        }, 944: (e2) => {
          e2.exports = t;
        } }, n = {};
        function o(t2) {
          var e2 = n[t2];
          if (void 0 !== e2) return e2.exports;
          var i2 = n[t2] = { exports: {} };
          return s[t2](i2, i2.exports, o), i2.exports;
        }
        o.n = (t2) => {
          var e2 = t2 && t2.__esModule ? () => t2.default : () => t2;
          return o.d(e2, { a: e2 }), e2;
        }, o.d = (t2, e2) => {
          for (var i2 in e2) o.o(e2, i2) && !o.o(t2, i2) && Object.defineProperty(t2, i2, { enumerable: true, get: e2[i2] });
        }, o.o = (t2, e2) => Object.prototype.hasOwnProperty.call(t2, e2);
        var r = {};
        o.d(r, { default: () => H });
        var a = o(944), l = o.n(a), h = o(512), p = o.n(h), d = o(260), c = o.n(d);
        let { line: { prototype: { pointClass: u } }, pie: { prototype: { pointClass: y } } } = p().seriesTypes, { defined: g, isNumber: x, merge: b, objectEach: f, pick: m } = l(), w = class extends u {
          alignConnector() {
            let t2 = this.series, e2 = this.dataLabel, i2 = e2.connector, s2 = e2.options || {}, n2 = s2.connectorWidth || 0, o2 = this.series.chart, r2 = i2.getBBox(), a2 = { x: r2.x + (e2.translateX || 0), y: r2.y + (e2.translateY || 0) };
            o2.inverted ? a2.y -= n2 / 2 : a2.x += n2 / 2, i2[o2.isInsidePlot(a2.x, a2.y) ? "animate" : "attr"]({ d: this.getConnectorPath() }), i2.addClass("highcharts-color-" + this.colorIndex), t2.chart.styledMode || i2.attr({ stroke: s2.connectorColor || this.color, "stroke-width": s2.connectorWidth, opacity: e2[g(e2.newOpacity) ? "newOpacity" : "opacity"] });
          }
          drawConnector() {
            let { dataLabel: t2, series: e2 } = this;
            t2 && (t2.connector || (t2.connector = e2.chart.renderer.path(this.getConnectorPath()).attr({ zIndex: -1 }).add(t2)), this.series.chart.isInsidePlot(t2.x || 0, t2.y || 0) && this.alignConnector());
          }
          getConnectorPath() {
            var _a;
            let { plotX: t2 = 0, plotY: e2 = 0, series: i2, dataLabel: s2 } = this, n2 = i2.chart, o2 = i2.xAxis.len, r2 = n2.inverted, a2 = r2 ? "x2" : "y2";
            if (s2) {
              let l2 = s2.targetPosition, h2 = (s2.alignAttr || s2)[a2[0]] < i2.yAxis.len / 2, p2 = { x1: t2, y1: e2, x2: t2, y2: x(l2.y) ? l2.y : s2.y };
              return r2 && (p2 = { x1: e2, y1: o2 - t2, x2: l2.x || s2.x, y2: o2 - t2 }), h2 && (p2[a2] += s2[r2 ? "width" : "height"] || 0), f(p2, (t3, e3) => {
                p2[e3] -= (s2.alignAttr || s2)[e3[0]];
              }), n2.renderer.crispLine([["M", p2.x1, p2.y1], ["L", p2.x2, p2.y2]], ((_a = s2.options) == null ? void 0 : _a.connectorWidth) || 0);
            }
            return [];
          }
          constructor(t2, e2) {
            var _a;
            super(t2, e2), (_a = this.name) != null ? _a : this.name = (e2 && null !== e2.y || !t2.options.nullInteraction) && "Event" || "Null", this.y = 1;
          }
          isValid() {
            return null !== this.options.y || this.series.options.nullInteraction || true;
          }
          setState() {
            let t2 = super.setState;
            (!this.isNull || this.series.options.nullInteraction) && t2.apply(this, arguments);
          }
          setVisible(t2, e2) {
            let i2 = this.series;
            e2 = m(e2, i2.options.ignoreHiddenPoint), y.prototype.setVisible.call(this, t2, false), i2.processData(), e2 && i2.chart.redraw();
          }
          applyOptions(t2, e2) {
            let i2 = this.isNull || null === t2 || null === t2.y, s2 = this.series;
            e2 || (t2 == null ? void 0 : t2.x) || (x(this.x) ? e2 = this.x : x(s2 == null ? void 0 : s2.xIncrement) && (e2 = s2.xIncrement || 0, s2.autoIncrement())), t2 = c().prototype.optionsToObject.call(this, t2 != null ? t2 : s2.options.nullInteraction && { y: 0 } || null);
            let n2 = super.applyOptions(t2, e2);
            return this.userDLOptions = b(this.userDLOptions, t2.dataLabels), n2.isNull = i2, n2;
          }
        }, { column: v, line: P } = p().seriesTypes, { addEvent: L, arrayMax: O, arrayMin: A, defined: C, extend: I, merge: k, pick: M } = l();
        class T extends P {
          alignDataLabel(t2, e2, i2, s2) {
            var _a;
            let n2, o2, r2, a2 = this.chart.inverted, l2 = this.visibilityMap.filter((t3) => !!t3), h2 = this.visiblePointsCount || 0, p2 = l2.indexOf(t2), d2 = this.options.dataLabels, c2 = t2.userDLOptions || {}, u2 = d2.alternate ? p2 && p2 !== h2 - 1 ? 2 : 1.5 : 1, y2 = Math.floor(this.xAxis.len / h2), g2 = e2.padding;
            t2.visible && (n2 = Math.abs(c2.x || t2.options.dataLabels.x), a2 ? (o2 = (n2 - g2) * 2 - (t2.itemHeight || 0) / 2, r2 = { width: M((_a = d2.style) == null ? void 0 : _a.width, `${0.4 * this.yAxis.len}px`), textOverflow: (e2.width || 0) / o2 * (e2.height || 0) / 2 > y2 * u2 ? "ellipsis" : "none" }) : r2 = { width: (c2.width || d2.width || y2 * u2 - 2 * g2) + "px" }, e2.css(r2), this.chart.styledMode || e2.shadow(d2.shadow)), super.alignDataLabel.apply(this, arguments);
          }
          bindAxes() {
            super.bindAxes(), this.xAxis.userOptions.type || (this.xAxis.categories = this.xAxis.hasNames = true);
          }
          distributeDL() {
            let t2 = this.options.dataLabels, e2 = this.chart.inverted, i2 = 1;
            if (t2) {
              let s2 = M(t2.distance, e2 ? 20 : 100);
              for (let n2 of this.points) {
                let o2 = { [e2 ? "x" : "y"]: t2.alternate && i2 % 2 ? -s2 : s2 };
                e2 && (o2.align = t2.alternate && i2 % 2 ? "right" : "left"), n2.options.dataLabels = k(o2, n2.userDLOptions), i2++;
              }
            }
          }
          generatePoints() {
            super.generatePoints();
            let t2 = this.points, e2 = t2.length, i2 = this.getColumn("x");
            for (let s2 = 0; s2 < e2; ++s2) {
              let e3 = i2[s2];
              t2[s2].applyOptions({ x: e3 }, e3);
            }
          }
          getVisibilityMap() {
            let t2 = this.options.nullInteraction;
            return ((this.data.length ? this.data : this.options.data) || []).map((e2) => !!e2 && false !== e2.visible && (!e2.isNull || !!t2) && e2);
          }
          getXExtremes(t2) {
            let e2 = this, i2 = t2.filter((t3, i3) => e2.points[i3].isValid() && e2.points[i3].visible);
            return { min: A(i2), max: O(i2) };
          }
          init() {
            let t2 = this;
            super.init.apply(t2, arguments), t2.eventsToUnbind.push(L(t2, "afterTranslate", function() {
              let e2, i2 = Number.MAX_VALUE;
              for (let s2 of t2.points) s2.isInside = s2.isInside && s2.visible, s2.visible && (!s2.isNull || t2.options.nullInteraction) && (C(e2) && (i2 = Math.min(i2, Math.abs(s2.plotX - e2))), e2 = s2.plotX);
              t2.closestPointRangePx = i2;
            })), t2.eventsToUnbind.push(L(t2, "drawDataLabels", function() {
              t2.distributeDL();
            })), t2.eventsToUnbind.push(L(t2, "afterDrawDataLabels", function() {
              let e2;
              for (let i2 of t2.points) (e2 = i2.dataLabel) && (e2.animate = function(t3) {
                return this.targetPosition && (this.targetPosition = t3), this.renderer.Element.prototype.animate.apply(this, arguments);
              }, e2.targetPosition || (e2.targetPosition = {}), i2.drawConnector());
            })), t2.eventsToUnbind.push(L(t2.chart, "afterHideOverlappingLabel", function() {
              for (let e2 of t2.points) e2.dataLabel && e2.dataLabel.connector && e2.dataLabel.oldOpacity !== e2.dataLabel.newOpacity && e2.alignConnector();
            }));
          }
          markerAttribs(t2, e2) {
            var _a, _b;
            let i2 = this.options.marker, s2 = t2.marker || {}, n2 = s2.symbol || i2.symbol, o2 = M(s2.width, i2.width, this.closestPointRangePx), r2 = M(s2.height, i2.height), a2, l2, h2 = 0;
            if (this.xAxis.dateTime) return super.markerAttribs(t2, e2);
            e2 && (a2 = (_a = i2.states) == null ? void 0 : _a[e2], l2 = (_b = s2.states) == null ? void 0 : _b[e2], h2 = M(l2 == null ? void 0 : l2.radius, a2 == null ? void 0 : a2.radius, h2 + ((a2 == null ? void 0 : a2.radiusPlus) || 0))), t2.hasImage = !!(n2 && 0 === n2.indexOf("url"));
            let p2 = { x: Math.floor(t2.plotX) - o2 / 2 - h2 / 2, y: t2.plotY - r2 / 2 - h2 / 2, width: o2 + h2, height: r2 + h2 };
            return this.chart.inverted ? { y: p2.x && p2.width && this.xAxis.len - p2.x - p2.width, x: p2.y && p2.y, width: p2.height, height: p2.width } : p2;
          }
        }
        T.defaultOptions = k(P.defaultOptions, { colorByPoint: true, stickyTracking: false, ignoreHiddenPoint: true, legendType: "point", lineWidth: 4, tooltip: { headerFormat: '<span style="color:{point.color}">\u25CF</span> <span style="font-size: 0.8em"> {point.key}</span><br/>', pointFormat: "{point.description}" }, states: { hover: { lineWidthPlus: 0 } }, dataLabels: { enabled: true, allowOverlap: true, alternate: true, backgroundColor: "#ffffff", borderWidth: 1, borderColor: "#999999", borderRadius: 3, color: "#333333", connectorWidth: 1, distance: void 0, formatter: function() {
          return (this.series.chart.styledMode ? '<span class="highcharts-color-' + this.point.colorIndex + '">\u25CF </span>' : '<span style="color:' + this.point.color + '">\u25CF </span>') + ('<span class="highcharts-strong">' + (this.key || "") + "</span><br/>") + (this.label || "");
        }, style: { textOutline: "none", fontWeight: "normal", fontSize: "0.8em", textAlign: "left" }, shadow: false, verticalAlign: "middle" }, marker: { enabledThreshold: 0, symbol: "square", radius: 6, lineWidth: 2, height: 15 }, showInLegend: false, colorKey: "x", legendSymbol: "rectangle" }), L(T, "afterProcessData", function() {
          let t2 = this.getColumn("x"), e2 = 0;
          for (let t3 of (this.visibilityMap = this.getVisibilityMap(), this.visibilityMap)) t3 && e2++;
          this.visiblePointsCount = e2, this.dataTable.setColumn("y", Array(t2.length).fill(1));
        }), I(T.prototype, { drawTracker: v.prototype.drawTracker, pointClass: w, trackerGroups: ["markerGroup", "dataLabelsGroup"] }), p().registerSeriesType("timeline", T);
        let H = l();
        return r.default;
      })());
    }
  });

  // src/custom_viz_code.js
  var require_custom_viz_code = __commonJS({
    "src/custom_viz_code.js"() {
      var import_highcharts = __toESM(require_highcharts());
      var AccessibilityNS = __toESM(require_accessibility());
      var ExportingNS = __toESM(require_exporting());
      var TimelineNS = __toESM(require_timeline());
      var initAccessibility = AccessibilityNS && (AccessibilityNS.default || AccessibilityNS) || null;
      var initExporting = ExportingNS && (ExportingNS.default || ExportingNS) || null;
      var initTimeline = TimelineNS && (TimelineNS.default || TimelineNS) || null;
      if (typeof initAccessibility === "function") initAccessibility(import_highcharts.default);
      if (typeof initExporting === "function") initExporting(import_highcharts.default);
      if (typeof initTimeline === "function") initTimeline(import_highcharts.default);
      window.Highcharts = import_highcharts.default;
      looker.plugins.visualizations.add({
        id: "custom_timeline",
        label: "Custom Timeline (Highcharts)",
        options: {
          boxCount: {
            type: "number",
            label: "Number of boxes",
            default: 5,
            min: 1,
            section: "Chart"
          },
          showTooltipHeader: {
            type: "boolean",
            label: "Show tooltip header",
            default: true,
            section: "Tooltip"
          },
          showSummary: {
            type: "boolean",
            label: "Show summary text",
            default: false,
            section: "Summary"
          },
          summaryText: {
            type: "string",
            label: "Summary text",
            default: "",
            section: "Summary"
          },
          startColor: {
            type: "string",
            label: "Gradient start color (hex)",
            default: "#2AA7FF",
            section: "Colors"
          },
          endColor: {
            type: "string",
            label: "Gradient end color (hex)",
            default: "#1D3B8B",
            section: "Colors"
          }
        },
        create: function(element) {
          const uid = `hc_timeline_${Math.random().toString(16).slice(2)}`;
          this._uid = uid;
          element.innerHTML = `
      <style>
        .hc-timeline-wrap { width: 100%; height: 100%; }

        /* Force Highcharts HTML tooltip to be fully opaque (container + inner span) */
        #${uid} .highcharts-tooltip {
          background: #ffffff !important;
          opacity: 1 !important;
          filter: none !important;
          box-shadow: 0 2px 10px rgba(0,0,0,0.25) !important;
          border-radius: 4px !important;
        }

        #${uid} .highcharts-tooltip span {
          background: #ffffff !important;
          opacity: 1 !important;
          display: block !important;
          margin: 0 !important;
          padding: 0 !important;
          border-radius: 4px !important;
        }
      </style>
      <div id="${uid}" class="hc-timeline-wrap"></div>
    `;
          this._container = element.querySelector(`#${uid}`);
          this._chart = null;
        },
        // -------- Gradient helpers --------
        _normalizeHex: function(hex) {
          if (!hex) return null;
          let h = String(hex).trim();
          if (!h.startsWith("#")) h = "#" + h;
          if (h.length === 4) h = "#" + h[1] + h[1] + h[2] + h[2] + h[3] + h[3];
          return /^#[0-9a-fA-F]{6}$/.test(h) ? h : null;
        },
        _hexToRgb: function(hex) {
          const h = hex.replace("#", "");
          return {
            r: parseInt(h.slice(0, 2), 16),
            g: parseInt(h.slice(2, 4), 16),
            b: parseInt(h.slice(4, 6), 16)
          };
        },
        _rgbToHex: function({ r, g, b }) {
          const to2 = (n) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, "0");
          return "#" + to2(r) + to2(g) + to2(b);
        },
        _lerpColor: function(startHex, endHex, t) {
          const a = this._hexToRgb(startHex);
          const b = this._hexToRgb(endHex);
          return this._rgbToHex({
            r: a.r + (b.r - a.r) * t,
            g: a.g + (b.g - a.g) * t,
            b: a.b + (b.b - a.b) * t
          });
        },
        updateAsync: function(data, element, config, queryResponse, details, done) {
          var _a, _b;
          const finish = () => typeof done === "function" && done();
          try {
            const Highcharts2 = window.Highcharts;
            if (!Highcharts2) {
              this._container.innerHTML = "Highcharts is not available. Ensure looker_adapter.js sets window.Highcharts.";
              finish();
              return;
            }
            if (!((_b = (_a = queryResponse == null ? void 0 : queryResponse.fields) == null ? void 0 : _a.dimension_like) == null ? void 0 : _b.length)) {
              this._container.innerHTML = "No dimension fields found.";
              finish();
              return;
            }
            if (!(data == null ? void 0 : data.length)) {
              this._container.innerHTML = "No data returned.";
              finish();
              return;
            }
            const dims = queryResponse.fields.dimension_like;
            const row = data[0];
            const readValue = (fieldName) => {
              var _a2, _b2;
              const v = row[fieldName];
              if (v == null) return "";
              if (typeof v === "object") return (_b2 = (_a2 = v.rendered) != null ? _a2 : v.value) != null ? _b2 : "";
              return v;
            };
            const tileFieldNames = dims.map((d) => d.name).filter((name) => name.endsWith("_tile"));
            const count = Math.max(
              1,
              Math.min(tileFieldNames.length, Number(config.boxCount) || tileFieldNames.length)
            );
            const chosenTileFields = tileFieldNames.slice(0, count);
            const startHex = this._normalizeHex(config.startColor) || "#2AA7FF";
            const endHex = this._normalizeHex(config.endColor) || "#1D3B8B";
            const total = chosenTileFields.length;
            const denom = Math.max(1, total - 1);
            const points = chosenTileFields.map((tileFieldName, idx) => {
              var _a2, _b2;
              const tooltipFieldName = tileFieldName.replace(/_tile$/, "_tooltip");
              const t = idx / denom;
              const accentColor = this._lerpColor(startHex, endHex, t);
              return {
                x: idx,
                name: String((_a2 = readValue(tileFieldName)) != null ? _a2 : ""),
                custom: { tooltipText: String((_b2 = readValue(tooltipFieldName)) != null ? _b2 : "") },
                color: accentColor,
                marker: { fillColor: accentColor, lineColor: accentColor },
                connectorWidth: 0,
                dataLabels: {
                  backgroundColor: "#FFFFFF",
                  borderColor: accentColor
                }
              };
            });
            const showSummary = !!config.showSummary;
            const showTooltipHeader = config.showTooltipHeader !== false;
            const chartOptions = {
              chart: {
                type: "timeline",
                spacingBottom: showSummary ? 60 : 20,
                animation: false
              },
              title: { text: null },
              subtitle: { text: null },
              caption: showSummary ? {
                text: config.summaryText || "",
                align: "center",
                verticalAlign: "bottom",
                style: { fontSize: "12px" }
              } : { text: null },
              exporting: { enabled: false },
              credits: { enabled: false },
              legend: { enabled: false },
              xAxis: {
                visible: false,
                minPadding: 0.1,
                maxPadding: 0.1
              },
              yAxis: { visible: false },
              tooltip: {
                useHTML: true,
                padding: 0,
                borderWidth: 3.5,
                shadow: true,
                style: { color: "#222" },
                formatter: function() {
                  var _a2, _b2, _c;
                  const fullHeader = ((_a2 = this.point) == null ? void 0 : _a2.name) || "";
                  const body = ((_c = (_b2 = this.point) == null ? void 0 : _b2.custom) == null ? void 0 : _c.tooltipText) || "";
                  if (!showTooltipHeader) {
                    return `<div style="padding:12px">${body}</div>`;
                  }
                  const idx = fullHeader.indexOf(":");
                  let formattedHeader = fullHeader;
                  if (idx !== -1) {
                    const left = fullHeader.substring(0, idx);
                    const right = fullHeader.substring(idx);
                    formattedHeader = `<strong>${left}</strong>${right}`;
                  }
                  return `
              <div style="padding:12px">
                ${formattedHeader}<br><br>${body}
              </div>
            `;
                }
              },
              plotOptions: {
                series: {
                  lineWidth: 16,
                  lineColor: null,
                  borderWidth: 4,
                  borderColor: "#ffffff",
                  linecap: "square",
                  dataLabels: {
                    allowOverlap: true,
                    alternate: true,
                    borderRadius: 6,
                    borderWidth: 2,
                    padding: 10,
                    useHTML: true,
                    formatter: function() {
                      const text = this.point.name || "";
                      const idx = text.indexOf(":");
                      if (idx === -1) return text;
                      const left = text.substring(0, idx + 1);
                      const right = text.substring(idx + 1);
                      return `<strong>${left}</strong>${right}`;
                    },
                    style: {
                      textOutline: "none",
                      color: "#222"
                    }
                  },
                  marker: {
                    enabled: true,
                    radius: 6
                  }
                }
              },
              series: [{ data: points }]
            };
            if (this._chart) {
              this._chart.update(chartOptions, true, true, false);
            } else {
              this._chart = Highcharts2.chart(this._container, chartOptions);
            }
            finish();
          } catch (err) {
            this._container.innerHTML = `Error: ${(err == null ? void 0 : err.message) || err}`;
            finish();
          }
        }
      });
    }
  });
  require_custom_viz_code();
})();
