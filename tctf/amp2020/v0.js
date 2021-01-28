self.AMP_CONFIG = {
    "amp-list-init-from-state": 1,
    "swg-gpay-native": 1,
    "ampdoc-closest": 1,
    "amp-story-v1": 1,
    "amp-action-macro": 1,
    "fixed-elements-in-lightbox": 1,
    "version-locking": 1,
    "amp-accordion-display-locking": 0.01,
    "adsense-ad-size-optimization": 0.01,
    "amp-ad-ff-adx-ady": 0.01,
    "amp-sidebar-swipe-to-dismiss": 1,
    "amp-mega-menu": 1,
    "swg-gpay-api": 1,
    "random-subdomain-for-safeframe": 0.1,
    "doubleclickSraReportExcludedBlock": 0.1,
    "amp-nested-menu": 1,
    "pump-early-frame": 1,
    "amp-story-responsive-units": 1,
    "fix-inconsistent-responsive-height-selection": 0,
    "fie-init-chunking": 0.1,
    "amp-consent-restrict-fullscreen": 1,
    "layoutbox-invalidate-on-scroll": 1,
    "amp-playbuzz": 1,
    "allow-url-opt-in": ["pump-early-frame"],
    "chunked-amp": 1,
    "doubleclickSraExp": 0.01,
    "amp-access-iframe": 1,
    "hidden-mutation-observer": 1,
    "flexAdSlots": 0.05,
    "as-use-attr-for-format": 0.01,
    "intersect-resources": 0.1,
    "a4aProfilingRate": 0.01,
    "ios-fixed-no-transfer": 0,
    "allow-doc-opt-in": ["amp-next-page", "analytics-chunks", "analytics-chunks-inabox"],
    "amp-auto-ads-adsense-holdout": 0.1,
    "analytics-chunks": 1,
    "canary": 0,
    "v": "012006112352003",
    "type": "production"
}; /*AMP_CONFIG*/
var global = self;
self.AMP = self.AMP || [];
try {
    (function(_) {
        var f, aa = "function" == typeof Object.create ? Object.create : function(a) {
            function b() {}
            b.prototype = a;
            return new b
        };

        function ba(a) {
            for (var b = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global], c = 0; c < b.length; ++c) {
                var d = b[c];
                if (d && d.Math == Math) return d
            }
            return function() {
                throw Error("Cannot find global object");
            }()
        }
        var ca = ba(this);
        "function" === typeof Symbol && Symbol("x");
        var da;
        if ("function" == typeof Object.setPrototypeOf) da = Object.setPrototypeOf;
        else {
            var ea;
            a: {
                var fa = {
                        a: !0
                    },
                    ha = {};
                try {
                    ha.__proto__ = fa;
                    ea = ha.a;
                    break a
                } catch (a) {}
                ea = !1
            }
            da = ea ? function(a, b) {
                a.__proto__ = b;
                if (a.__proto__ !== b) throw new TypeError(a + " is not extensible");
                return a
            } : null
        }
        var ia = da;

        function m(a, b) {
            a.prototype = aa(b.prototype);
            a.prototype.constructor = a;
            if (ia) ia(a, b);
            else
                for (var c in b)
                    if ("prototype" != c)
                        if (Object.defineProperties) {
                            var d = Object.getOwnPropertyDescriptor(b, c);
                            d && Object.defineProperty(a, c, d)
                        } else a[c] = b[c];
            a.hi = b.prototype
        };

        function ja(a, b) {
            b = void 0 === b ? "" : b;
            try {
                return decodeURIComponent(a)
            } catch (c) {
                return b
            }
        };
        var ka = /(?:^[#?]?|&)([^=&]+)(?:=([^&]*))?/g;

        function t(a) {
            var b = Object.create(null);
            if (!a) return b;
            for (var c; c = ka.exec(a);) {
                var d = ja(c[1], c[1]),
                    e = c[2] ? ja(c[2].replace(/\+/g, " "), c[2]) : "";
                b[d] = e
            }
            return b
        };
        var na = "";

        function v(a) {
            var b = a || self;
            if (b.__AMP_MODE) var c = b.__AMP_MODE;
            else {
                c = t(b.location.originalHash || b.location.hash);
                var d = t(b.location.search);
                na || (na = b.AMP_CONFIG && b.AMP_CONFIG.v ? b.AMP_CONFIG.v : "012006112352003");
                c = {
                    localDev: !1,
                    development: !!(0 <= ["1", "actions", "amp", "amp4ads", "amp4email"].indexOf(c.development) || b.AMP_DEV_MODE),
                    examiner: "2" == c.development,
                    esm: !1,
                    geoOverride: c["amp-geo"],
                    minified: !0,
                    lite: void 0 != d.amp_lite,
                    test: !1,
                    log: c.log,
                    version: "2006112352003",
                    rtvVersion: na
                };
                c = b.__AMP_MODE = c
            }
            return c
        };

        function oa(a, b) {
            var c = b || 0,
                d = this.length;
            for (b = 0 <= c ? c : Math.max(d + c, 0); b < d; b++) {
                var e = this[b];
                if (e === a || a !== a && e !== e) return !0
            }
            return !1
        };
        var pa;

        function x() {
            return pa ? pa : pa = Promise.resolve(void 0)
        };
        var qa = /^[a-z][a-z0-9._]*-[a-z0-9._-]*$/,
            ra = "annotation-xml color-profile font-face font-face-src font-face-uri font-face-format font-face-name missing-glyph".split(" "),
            sa = {
                childList: !0,
                subtree: !0
            };

        function ta(a, b) {
            if (!qa.test(b) || ra.includes(b)) throw new a('invalid custom element name "' + b + '"');
        }

        function ua(a) {
            setTimeout(function() {
                self.__AMP_REPORT_ERROR(a);
                throw a;
            })
        }

        function va(a, b) {
            this.w = a;
            this.Qc = b;
            this.Wf = Object.create(null)
        }
        va.prototype.define = function(a, b, c) {
            this.Qc.define(a, b, c);
            var d = this.Wf,
                e = d[a];
            e && (e.resolve(), delete d[a])
        };
        va.prototype.get = function(a) {
            var b = this.Qc.getByName(a);
            if (b) return b.ctor
        };
        va.prototype.whenDefined = function(a) {
            var b = this.w,
                c = b.Promise;
            ta(b.SyntaxError, a);
            if (this.Qc.getByName(a)) return x();
            b = this.Wf;
            var d = b[a];
            if (d) return d.promise;
            var e, g = new c(function(a) {
                return e = a
            });
            b[a] = {
                promise: g,
                resolve: e
            };
            return g
        };
        va.prototype.upgrade = function(a) {
            this.Qc.upgrade(a)
        };

        function wa(a) {
            this.w = a;
            this.Ed = Object.create(null);
            this.Oa = "";
            this.ma = this.Dd = null;
            this.te = [a.document]
        }
        f = wa.prototype;
        f.current = function() {
            var a = this.Dd;
            this.Dd = null;
            return a
        };
        f.getByName = function(a) {
            var b = this.Ed[a];
            if (b) return b
        };
        f.getByConstructor = function(a) {
            var b = this.Ed,
                c;
            for (c in b) {
                var d = b[c];
                if (d.ctor === a) return d
            }
        };
        f.define = function(a, b, c) {
            var d = this,
                e = this.w,
                g = e.Error;
            e = e.SyntaxError;
            if (c) throw new g("Extending native custom elements is not supported");
            ta(e, a);
            if (this.getByName(a) || this.getByConstructor(b)) throw new g('duplicate definition "' + a + '"');
            this.Ed[a] = {
                name: a,
                ctor: b
            };
            xa(this, a);
            this.te.forEach(function(b) {
                d.upgrade(b, a)
            })
        };
        f.upgrade = function(a, b) {
            var c = !!b,
                d = ya(a, b || this.Oa);
            for (a = 0; a < d.length; a++) {
                var e = d[a];
                c ? za(this, e) : this.upgradeSelf(e)
            }
        };
        f.upgradeSelf = function(a) {
            var b = this.getByName(a.localName);
            b && Aa(this, a, b)
        };

        function ya(a, b) {
            return b && a.querySelectorAll ? a.querySelectorAll(b) : []
        }

        function Aa(a, b, c) {
            c = c.ctor;
            if (!(b instanceof c)) {
                a.Dd = b;
                try {
                    if (new c !== b) throw new a.w.Error("Constructor illegally returned a different instance.");
                } catch (d) {
                    ua(d)
                }
            }
        }

        function za(a, b) {
            var c = a.getByName(b.localName);
            if (c && (Aa(a, b, c), b.connectedCallback)) try {
                b.connectedCallback()
            } catch (d) {
                ua(d)
            }
        }

        function xa(a, b) {
            if (a.Oa) a.Oa += "," + b;
            else {
                a.Oa = b;
                var c = new a.w.MutationObserver(function(b) {
                    b && Ba(a, b)
                });
                a.ma = c;
                a.te.forEach(function(a) {
                    c.observe(a, sa)
                });
                Ca(a.w, a)
            }
        }
        f.observe = function(a) {
            this.te.push(a);
            this.ma && this.ma.observe(a, sa)
        };
        f.sync = function() {
            this.ma && Ba(this, this.ma.takeRecords())
        };

        function Ba(a, b) {
            for (var c = 0; c < b.length; c++) {
                var d = b[c];
                if (d) {
                    var e = d,
                        g = e.addedNodes,
                        h = e.removedNodes;
                    for (e = 0; e < g.length; e++) {
                        var l = g[e],
                            k = ya(l, a.Oa);
                        za(a, l);
                        for (l = 0; l < k.length; l++) za(a, k[l])
                    }
                    for (e = 0; e < h.length; e++) {
                        l = h[e];
                        var n = ya(l, a.Oa);
                        if (l.disconnectedCallback) try {
                            l.disconnectedCallback()
                        } catch (u) {
                            ua(u)
                        }
                        for (l = 0; l < n.length; l++) {
                            var r = n[l];
                            if (r.disconnectedCallback) try {
                                r.disconnectedCallback()
                            } catch (u) {
                                ua(u)
                            }
                        }
                    }
                }
            }
        }

        function Ca(a, b) {
            var c = a.document,
                d = a.Document.prototype,
                e = a.Element.prototype,
                g = a.Node.prototype,
                h = d.createElement,
                l = d.importNode,
                k = g.appendChild,
                n = g.cloneNode,
                r = g.insertBefore,
                u = g.removeChild,
                w = g.replaceChild;
            d.createElement = function(a) {
                var c = b.getByName(a);
                return c ? new c.ctor : h.apply(this, arguments)
            };
            d.importNode = function() {
                var a = l.apply(this, arguments);
                a && this === c && (b.upgradeSelf(a), b.upgrade(a));
                return a
            };
            g.appendChild = function() {
                var a = k.apply(this, arguments);
                b.sync();
                return a
            };
            g.insertBefore =
                function() {
                    var a = r.apply(this, arguments);
                    b.sync();
                    return a
                };
            g.removeChild = function() {
                var a = u.apply(this, arguments);
                b.sync();
                return a
            };
            g.replaceChild = function() {
                var a = w.apply(this, arguments);
                b.sync();
                return a
            };
            g.cloneNode = function() {
                var a = n.apply(this, arguments);
                a.ownerDocument === c && (b.upgradeSelf(a), b.upgrade(a));
                return a
            };
            var z = e,
                q = Object.getOwnPropertyDescriptor(z, "innerHTML");
            q || (z = Object.getPrototypeOf(a.HTMLElement.prototype), q = Object.getOwnPropertyDescriptor(z, "innerHTML"));
            if (q && q.configurable) {
                var p =
                    q.set;
                q.set = function(a) {
                    p.call(this, a);
                    b.upgrade(this)
                };
                Object.defineProperty(z, "innerHTML", q)
            }
        }

        function Da() {
            function a() {
                var a = this.constructor,
                    b = h.current();
                b || (b = h.getByConstructor(a), b = g.call(e, b.name));
                Ea(b, a.prototype);
                return b
            }
            var b = Fa,
                c = b.Element,
                d = b.HTMLElement,
                e = b.document,
                g = e.createElement,
                h = new wa(b),
                l = new va(b, h);
            Object.defineProperty(b, "customElements", {
                enumerable: !0,
                configurable: !0,
                value: l
            });
            c = c.prototype;
            var k = c.attachShadow,
                n = c.createShadowRoot;
            k && (c.attachShadow = function(a) {
                var b = k.apply(this, arguments);
                h.observe(b);
                return b
            }, c.attachShadow.toString = function() {
                return k.toString()
            });
            n && (c.createShadowRoot = function() {
                var a = n.apply(this, arguments);
                h.observe(a);
                return a
            }, c.createShadowRoot.toString = function() {
                return n.toString()
            });
            Ga(d, a);
            b.HTMLElement = a;
            a.call || (a.apply = b.Function.apply, a.bind = b.Function.bind, a.call = b.Function.call)
        }

        function Ha() {
            function a() {
                return d.construct(c, [], this.constructor)
            }
            var b = Fa,
                c = b.HTMLElement,
                d = b.Reflect;
            Ga(c, a);
            b.HTMLElement = a
        }

        function Ga(a, b) {
            b.prototype = Object.create(a.prototype, {
                constructor: {
                    configurable: !0,
                    writable: !0,
                    value: b
                }
            });
            Ea(b, a)
        }

        function Ea(a, b) {
            if (Object.setPrototypeOf) Object.setPrototypeOf(a, b);
            else if ({
                    __proto__: {
                        test: !0
                    }
                }.test) a.__proto__ = b;
            else
                for (; null !== b && !Object.isPrototypeOf.call(b, a);) {
                    for (var c = Object.getOwnPropertyNames(b), d = 0; d < c.length; d++) {
                        var e = c[d];
                        if (!Object.hasOwnProperty.call(a, e)) {
                            var g = Object.getOwnPropertyDescriptor(b, e);
                            Object.defineProperty(a, e, g)
                        }
                    }
                    b = Object.getPrototypeOf(b)
                }
        };

        function Ia(a, b) {
            if (void 0 === b ? this.contains(a) : !b) return this.remove(a), !1;
            this.add(a);
            return !0
        }

        function Ja() {
            var a = self;
            if (/Trident|MSIE|IEMobile/i.test(a.navigator.userAgent) && a.DOMTokenList) {
                a.Object.defineProperty(a.DOMTokenList.prototype, "toggle", {
                    enumerable: !1,
                    configurable: !0,
                    writable: !0,
                    value: Ia
                });
                var b = a.DOMTokenList.prototype.add;
                a.DOMTokenList.prototype.add = function() {
                    for (var a = 0; a < arguments.length; a++) b.call(this, arguments[a])
                }
            }
        };

        function Ka(a) {
            return a == this || this.documentElement.contains(a)
        };
        var La = Object.prototype.toString;

        function y(a) {
            return Array.isArray(a)
        }

        function Ma(a) {
            return a ? Array.prototype.slice.call(a) : []
        }

        function Na(a) {
            return "[object Object]" === La.call(a)
        }

        function Oa(a) {
            return "number" === typeof a && isFinite(a)
        };

        function Pa(a) {
            var b = !1,
                c = null,
                d = a;
            return function(a) {
                for (var e = [], h = 0; h < arguments.length; ++h) e[h - 0] = arguments[h];
                b || (c = d.apply(self, e), b = !0, d = null);
                return c
            }
        };
        var A = self.AMP_CONFIG || {},
            Qa = ("string" == typeof A.cdnProxyRegex ? new RegExp(A.cdnProxyRegex) : A.cdnProxyRegex) || /^https:\/\/([a-zA-Z0-9_-]+\.)?cdn\.ampproject\.org$/;

        function Ra(a) {
            if (!self.document || !self.document.head || self.location && Qa.test(self.location.origin)) return null;
            var b = self.document.head.querySelector('meta[name="' + a + '"]');
            return b && b.getAttribute("content") || null
        }
        var B = {
                thirdParty: A.thirdPartyUrl || "https://3p.ampproject.net",
                thirdPartyFrameHost: A.thirdPartyFrameHost || "ampproject.net",
                thirdPartyFrameRegex: ("string" == typeof A.thirdPartyFrameRegex ? new RegExp(A.thirdPartyFrameRegex) : A.thirdPartyFrameRegex) || /^d-\d+\.ampproject\.net$/,
                cdn: A.cdnUrl || Ra("runtime-host") || "https://cdn.ampproject.org",
                cdnProxyRegex: Qa,
                localhostRegex: /^https?:\/\/localhost(:\d+)?$/,
                errorReporting: A.errorReportingUrl || "https://us-central1-amp-error-reporting.cloudfunctions.net/r",
                betaErrorReporting: A.betaErrorReportingUrl ||
                    "https://us-central1-amp-error-reporting.cloudfunctions.net/r-beta",
                localDev: A.localDev || !1,
                trustedViewerHosts: [/(^|\.)google\.(com?|[a-z]{2}|com?\.[a-z]{2}|cat)$/, /(^|\.)gmail\.(com|dev)$/],
                geoApi: A.geoApiUrl || Ra("amp-geo-api")
            },
            Sa = {
                urls: B
            };

        function Ta() {}

        function Ua(a) {
            return 0 <= a.indexOf("\u200b\u200b\u200b")
        }
        var Va = void 0;

        function Wa(a) {
            Va = a
        }

        function Xa(a, b) {
            return b.reduce(function(a, b) {
                return a + "&s[]=" + encodeURIComponent(String(Ya(b)))
            }, "https://log.amp.dev/?v=012006112352003&id=" + encodeURIComponent(a))
        }

        function Za(a, b, c) {
            var d = this;
            c = void 0 === c ? "" : c;
            this.win = a;
            this.nh = b;
            this.oh = this.win.console && this.win.console.log && "0" != v().log ? this.nh(parseInt(v().log, 10), v().development) : 0;
            this.Zc = c;
            this.Ec = null;
            this.Ug = Pa(function() {
                a.fetch(B.cdn + "/rtv/012006112352003/log-messages.simple.json").then(function(a) {
                    return a.json()
                }, Ta).then(function(a) {
                    a && (d.Ec = a)
                })
            })
        }

        function $a(a) {
            return void 0 !== Va ? Va : a.oh
        }

        function ab(a, b, c, d) {
            if (0 != $a(a)) {
                var e = a.win.console.log;
                "ERROR" == c ? e = a.win.console.error || e : "INFO" == c ? e = a.win.console.info || e : "WARN" == c && (e = a.win.console.warn || e);
                c = y(d[0]) ? bb(a, d[0]) : d;
                b = "[" + b + "]";
                "string" === typeof c[0] ? c[0] = b + " " + c[0] : c.unshift(b);
                e.apply(a.win.console, c)
            }
        }
        f = Za.prototype;
        f.isEnabled = function() {
            return 0 != $a(this)
        };
        f.fine = function(a, b) {
            4 <= $a(this) && ab(this, a, "FINE", Array.prototype.slice.call(arguments, 1))
        };
        f.info = function(a, b) {
            3 <= $a(this) && ab(this, a, "INFO", Array.prototype.slice.call(arguments, 1))
        };
        f.warn = function(a, b) {
            2 <= $a(this) && ab(this, a, "WARN", Array.prototype.slice.call(arguments, 1))
        };
        f.La = function(a, b) {
            if (1 <= $a(this)) ab(this, a, "ERROR", Array.prototype.slice.call(arguments, 1));
            else {
                var c = cb.apply(null, Array.prototype.slice.call(arguments, 1));
                db(this, c);
                return c
            }
        };
        f.error = function(a, b) {
            var c = this.La.apply(this, arguments);
            c && (c.name = a || c.name, self.__AMP_REPORT_ERROR(c))
        };
        f.expectedError = function(a, b) {
            var c = this.La.apply(this, arguments);
            c && (c.expected = !0, self.__AMP_REPORT_ERROR(c))
        };
        f.createError = function(a) {
            var b = cb.apply(null, arguments);
            db(this, b);
            return b
        };
        f.createExpectedError = function(a) {
            var b = cb.apply(null, arguments);
            db(this, b);
            b.expected = !0;
            return b
        };
        f.assert = function(a, b, c) {
            var d;
            if (y(b)) return this.assert.apply(this, [a].concat(bb(this, b)));
            if (!a) {
                var e = (b || "Assertion failed").split("%s"),
                    g = e.shift(),
                    h = g,
                    l = [],
                    k = 2;
                for ("" != g && l.push(g); 0 < e.length;) {
                    var n = e.shift(),
                        r = arguments[k++];
                    r && r.tagName && (d = r);
                    l.push(r);
                    g = n.trim();
                    "" != g && l.push(g);
                    h += Ya(r) + n
                }
                k = Error(h);
                k.fromAssert = !0;
                k.associatedElement = d;
                k.messageArray = l;
                db(this, k);
                self.__AMP_REPORT_ERROR(k);
                throw k;
            }
            return a
        };
        f.assertElement = function(a, b) {
            eb(this, a, a && 1 == a.nodeType, "Element expected", b);
            return a
        };
        f.assertString = function(a, b) {
            eb(this, a, "string" == typeof a, "String expected", b);
            return a
        };
        f.assertNumber = function(a, b) {
            eb(this, a, "number" == typeof a, "Number expected", b);
            return a
        };
        f.assertArray = function(a, b) {
            eb(this, a, y(a), "Array expected", b);
            return a
        };
        f.assertBoolean = function(a, b) {
            eb(this, a, !!a === a, "Boolean expected", b);
            return a
        };
        f.assertEnumValue = function(a, b, c) {
            a: {
                for (var d in a)
                    if (a[d] === b) {
                        a = !0;
                        break a
                    } a = !1
            }
            if (a) return b;this.assert(!1, 'Unknown %s value: "%s"', c || "enum", b)
        };

        function db(a, b) {
            b = fb(b);
            a.Zc ? b.message ? -1 == b.message.indexOf(a.Zc) && (b.message += a.Zc) : b.message = a.Zc : Ua(b.message) && (b.message = b.message.replace("\u200b\u200b\u200b", ""))
        }

        function bb(a, b) {
            var c = b.shift();
            v(a.win).development && a.Ug();
            return a.Ec && c in a.Ec ? [a.Ec[c]].concat(b) : ["More info at " + Xa(c, b)]
        }

        function eb(a, b, c, d, e) {
            y(e) ? a.assert(c, e.concat(b)) : a.assert(c, (e || d) + ": %s", b)
        }

        function Ya(a) {
            return a && 1 == a.nodeType ? a.tagName.toLowerCase() + (a.id ? "#" + a.id : "") : a
        }

        function fb(a) {
            var b = Object.getOwnPropertyDescriptor(a, "message");
            if (b && b.writable) return a;
            var c = a.stack,
                d = Error(a.message),
                e;
            for (e in a) d[e] = a[e];
            d.stack = c;
            return d
        }

        function cb(a) {
            for (var b = null, c = "", d = 0; d < arguments.length; d++) {
                var e = arguments[d];
                e instanceof Error && !b ? b = fb(e) : (c && (c += " "), c += e)
            }
            b ? c && (b.message = c + ": " + b.message) : b = Error(c);
            return b
        }

        function hb(a) {
            var b = cb.apply(null, arguments);
            setTimeout(function() {
                self.__AMP_REPORT_ERROR(b);
                throw b;
            })
        }
        self.__AMP_LOG = self.__AMP_LOG || {
            user: null,
            dev: null,
            userForEmbed: null
        };
        var ib = self.__AMP_LOG,
            jb = null;

        function C(a) {
            ib.user || (ib.user = kb("\u200b\u200b\u200b"));
            var b = ib.user.win;
            return a && a.ownerDocument.defaultView != b ? ib.userForEmbed ? ib.userForEmbed : ib.userForEmbed = kb("\u200b\u200b\u200b\u200b") : ib.user
        }

        function kb(a) {
            if (!jb) throw Error("failed to call initLogConstructor");
            return new jb(self, function(a, c) {
                return c || 1 <= a ? 4 : 2
            }, a)
        }

        function E() {
            if (ib.dev) return ib.dev;
            if (!jb) throw Error("failed to call initLogConstructor");
            return ib.dev = new jb(self, function(a) {
                return 3 <= a ? 4 : 2 <= a ? 3 : 0
            })
        }

        function F(a, b, c, d, e, g) {
            return C().assert(a, b, c, d, e, g, void 0, void 0, void 0, void 0, void 0)
        };
        var lb = Object.prototype.hasOwnProperty;

        function I(a) {
            var b = Object.create(null);
            a && Object.assign(b, a);
            return b
        }

        function K(a) {
            return a || {}
        };

        function L() {
            var a, b;
            this.promise = new Promise(function(c, d) {
                a = c;
                b = d
            });
            this.resolve = a;
            this.reject = b
        }

        function mb(a) {
            return new Promise(function(b) {
                b(a())
            })
        };
        /*
         https://mths.be/cssescape v1.5.1 by @mathias | MIT license */
        var nb = /(\0)|^(-)$|([\x01-\x1f\x7f]|^-?[0-9])|([\x80-\uffff0-9a-zA-Z_-]+)|[^]/g;

        function ob(a, b, c, d, e) {
            return e ? e : b ? "\ufffd" : d ? a.slice(0, -1) + "\\" + a.slice(-1).charCodeAt(0).toString(16) + " " : "\\" + a
        };
        var pb;

        function qb(a) {
            try {
                var b = a.ownerDocument,
                    c = b.createElement("div"),
                    d = b.createElement("div");
                c.appendChild(d);
                return c.querySelector(":scope div") === d
            } catch (e) {
                return !1
            }
        };

        function rb(a, b) {
            var c = a.length - b.length;
            return 0 <= c && a.indexOf(b, c) == c
        }

        function N(a, b) {
            return b.length > a.length ? !1 : 0 == a.lastIndexOf(b, 0)
        }

        function sb(a) {
            return a.trimStart ? a.trimStart() : (a + "_").trim().slice(0, -1)
        };

        function tb(a, b, c) {
            if (b(a)) c();
            else {
                var d = a.ownerDocument.defaultView;
                if (d.MutationObserver) {
                    var e = new d.MutationObserver(function() {
                        b(a) && (e.disconnect(), c())
                    });
                    e.observe(a, {
                        childList: !0
                    })
                } else var g = d.setInterval(function() {
                    b(a) && (d.clearInterval(g), c())
                }, 5)
            }
        }

        function ub(a, b) {
            return new Promise(function(c) {
                tb(a, b, c)
            })
        }

        function vb(a, b) {
            tb(a.documentElement, function() {
                return !!a.body
            }, b)
        }

        function wb(a) {
            return new Promise(function(b) {
                return vb(a, b)
            })
        }

        function xb(a) {
            a.parentElement && a.parentElement.removeChild(a)
        }

        function yb(a) {
            var b = K({
                src: "about:blank",
                style: "display:none"
            });
            a = a.createElement("iframe");
            for (var c in b) a.setAttribute(c, b[c]);
            return a
        }

        function zb(a) {
            var b = a.isConnected;
            if (void 0 !== b) return b;
            do
                if (a = Ab(a), a.host) a = a.host;
                else break; while (1);
            return a.nodeType === Node.DOCUMENT_NODE
        }

        function Ab(a) {
            if (Node.prototype.getRootNode) return a.getRootNode() || a;
            for (; a.parentNode && !Bb(a); a = a.parentNode);
            return a
        }

        function Bb(a) {
            return a ? "I-AMPHTML-SHADOW-ROOT" == a.tagName ? !0 : 11 == a.nodeType && "[object ShadowRoot]" === Object.prototype.toString.call(a) : !1
        }

        function Cb(a, b) {
            for (; a && void 0 !== a; a = a.parentElement)
                if (b(a)) return a;
            return null
        }

        function Db(a, b) {
            for (; a; a = a.parentNode)
                if (b(a)) return a;
            return null
        }

        function Eb(a, b) {
            return a.closest ? a.closest(b) : Cb(a, function(a) {
                return Fb(a, b)
            })
        }

        function Gb(a, b) {
            var c = [];
            for (a = a.firstElementChild; a; a = a.nextElementSibling) b(a) && c.push(a);
            return c
        }

        function Hb(a, b) {
            for (a = a.lastElementChild; a; a = a.previousElementSibling)
                if (b(a)) return a;
            return null
        }

        function Ib(a, b) {
            var c = [];
            for (a = a.firstChild; a; a = a.nextSibling) b(a) && c.push(a);
            return c
        }

        function Jb(a, b) {
            /^[\w-]+$/.test(b);
            return Kb(a, "> [" + b + "]")
        }

        function Fb(a, b) {
            var c = a.matches || a.webkitMatchesSelector || a.mozMatchesSelector || a.msMatchesSelector || a.oMatchesSelector;
            return c ? c.call(a, b) : !1
        }

        function Lb(a, b) {
            a.classList.add("i-amphtml-scoped");
            var c = b.replace(/^|,/g, "$&.i-amphtml-scoped "),
                d = a.querySelectorAll(c);
            a.classList.remove("i-amphtml-scoped");
            return d
        }

        function Kb(a, b) {
            if (void 0 !== pb ? pb : pb = qb(a)) return a.querySelector(b.replace(/^|,/g, "$&:scope "));
            var c = Lb(a, b);
            return void 0 === c[0] ? null : c[0]
        }

        function Mb(a, b) {
            for (var c = a.length, d = 0; d < c; d++) b(a[d], d)
        }

        function Nb(a, b, c, d) {
            try {
                var e = a.open(b, c, d)
            } catch (h) {
                E().error("DOM", "Failed to open url on target: ", c, h)
            }
            if (!(c = e || "_top" == c)) {
                c = d || "";
                var g;
                "number" !== typeof g && (g = 0);
                c = g + 8 > c.length ? !1 : -1 !== c.indexOf("noopener", g)
            }
            c || (e = a.open(b, "_top"));
            return e
        }

        function Ob(a) {
            try {
                a.focus()
            } catch (b) {}
        }

        function Pb(a) {
            return a.parent && a.parent != a
        };

        function Qb(a) {
            var b = Object.create(null),
                c;
            for (c in a)
                if (Rb(a, c)) {
                    var d = a[c];
                    b[c] = Na(d) ? Qb(d) : d
                } return b
        }

        function Sb(a) {
            return JSON.parse(a)
        }

        function Rb(a, b) {
            return null == a || "object" != typeof a ? !1 : Object.prototype.hasOwnProperty.call(a, b)
        };

        function Tb(a) {
            return "undefined" !== typeof TextEncoder ? (new TextEncoder("utf-8")).encode(a) : Ub(unescape(encodeURIComponent(a)))
        }

        function Ub(a) {
            for (var b = new Uint8Array(a.length), c = 0; c < a.length; c++) {
                var d = a.charCodeAt(c);
                b[c] = d
            }
            return b
        }

        function Vb(a) {
            for (var b = Array(a.length), c = 0; c < a.length; c++) b[c] = String.fromCharCode(a[c]);
            return b.join("")
        };
        var Wb = {
                document: 1,
                text: 2
            },
            Xb = ["GET", "POST"];

        function Yb(a, b) {
            b = void 0 === b ? {} : b;
            return new Promise(function(c, d) {
                var e = Zb(b.method || "GET"),
                    g = $b(e, a);
                "include" == b.credentials && (g.withCredentials = !0);
                b.responseType in Wb && (g.responseType = b.responseType);
                b.headers && Object.keys(b.headers).forEach(function(a) {
                    g.setRequestHeader(a, b.headers[a])
                });
                g.onreadystatechange = function() {
                    2 > g.readyState || (100 > g.status || 599 < g.status ? (g.onreadystatechange = null, d(C().createExpectedError("Unknown HTTP status " + g.status))) : 4 == g.readyState && c(new ac(g)))
                };
                g.onerror =
                    function() {
                        d(C().createExpectedError("Network failure"))
                    };
                g.onabort = function() {
                    d(C().createExpectedError("Request aborted"))
                };
                "POST" == e ? g.send(b.body) : g.send()
            })
        }

        function $b(a, b) {
            var c = new XMLHttpRequest;
            if ("withCredentials" in c) c.open(a, b, !0);
            else throw E().createExpectedError("CORS is not supported");
            return c
        }

        function ac(a) {
            this.Sa = a;
            this.status = this.Sa.status;
            this.statusText = this.Sa.statusText;
            this.ok = 200 <= this.status && 300 > this.status;
            this.headers = new bc(a);
            this.bodyUsed = !1;
            this.body = null;
            this.url = a.responseURL
        }
        ac.prototype.clone = function() {
            return new ac(this.Sa)
        };

        function cc(a) {
            a.bodyUsed = !0;
            return Promise.resolve(a.Sa.responseText)
        }
        ac.prototype.text = function() {
            return cc(this)
        };
        ac.prototype.json = function() {
            return cc(this).then(Sb)
        };
        ac.prototype.arrayBuffer = function() {
            return cc(this).then(Tb)
        };

        function Zb(a) {
            if (void 0 === a) return "GET";
            a = a.toUpperCase();
            Xb.includes(a);
            return a
        }

        function bc(a) {
            this.Sa = a
        }
        bc.prototype.get = function(a) {
            return this.Sa.getResponseHeader(a)
        };
        bc.prototype.has = function(a) {
            return null != this.Sa.getResponseHeader(a)
        };

        function dc(a, b) {
            b = void 0 === b ? {} : b;
            var c = I();
            a = Object.assign({}, {
                status: 200,
                statusText: "OK",
                responseText: a ? String(a) : "",
                getResponseHeader: function(a) {
                    var b = String(a).toLowerCase();
                    return lb.call(c, b) ? c[b] : null
                }
            }, b);
            a.status = void 0 === b.status ? 200 : parseInt(b.status, 10);
            if (y(b.headers)) b.headers.forEach(function(a) {
                var b = a[1];
                c[String(a[0]).toLowerCase()] = String(b)
            });
            else if (Na(b.headers))
                for (var d in b.headers) c[String(d).toLowerCase()] = String(b.headers[d]);
            b.statusText && (a.statusText = String(b.statusText));
            ac.call(this, a)
        }
        m(dc, ac);

        function ec(a, b, c, d) {
            return {
                left: a,
                top: b,
                width: c,
                height: d,
                bottom: b + d,
                right: a + c,
                x: a,
                y: b
            }
        }

        function fc(a) {
            for (var b = -Infinity, c = Infinity, d = -Infinity, e = Infinity, g = 0; g < arguments.length; g++) {
                var h = arguments[g];
                if (h && (b = Math.max(b, h.left), c = Math.min(c, h.left + h.width), d = Math.max(d, h.top), e = Math.min(e, h.top + h.height), c < b || e < d)) return null
            }
            return Infinity == c ? null : ec(b, d, c - b, e - d)
        }

        function gc(a, b, c) {
            return ec(a.left - a.width * b, a.top - a.height * c, a.width * (1 + 2 * b), a.height * (1 + 2 * c))
        }

        function hc(a, b, c) {
            return 0 == b && 0 == c || 0 == a.width && 0 == a.height ? a : ec(a.left + b, a.top + c, a.width, a.height)
        };
        var ic;

        function jc() {
            return zb(this) ? ic.call(this) : ec(0, 0, 0, 0)
        }

        function kc() {
            var a = lc;
            if (!a.document) return !1;
            try {
                return 0 !== a.document.createElement("div").getBoundingClientRect().top
            } catch (b) {
                return !0
            }
        };

        function mc() {
            this.Mg = 100;
            this.md = this.aa = 0;
            this.Ua = Object.create(null)
        }
        mc.prototype.has = function(a) {
            return !!this.Ua[a]
        };
        mc.prototype.get = function(a) {
            var b = this.Ua[a];
            if (b) return b.access = ++this.md, b.payload
        };
        mc.prototype.put = function(a, b) {
            this.has(a) || this.aa++;
            this.Ua[a] = {
                payload: b,
                access: this.md
            };
            if (!(this.aa <= this.Mg)) {
                E().warn("lru-cache", "Trimming LRU cache");
                a = this.Ua;
                var c = this.md + 1,
                    d;
                for (d in a) {
                    var e = a[d].access;
                    if (e < c) {
                        c = e;
                        var g = d
                    }
                }
                void 0 !== g && (delete a[g], this.aa--)
            }
        };
        var nc = K({
                c: !0,
                v: !0,
                a: !0,
                ad: !0,
                action: !0
            }),
            oc, pc, qc = /[?&]amp_js[^&]*/,
            rc = /[?&]amp_gsa[^&]*/,
            sc = /[?&]amp_r[^&]*/,
            tc = /[?&]amp_kit[^&]*/,
            uc = /[?&]usqp[^&]*/,
            vc = ["javascript:", "data:", "vbscript:"];

        function O(a, b) {
            oc || (oc = self.document.createElement("a"), pc = self.__AMP_URL_CACHE || (self.__AMP_URL_CACHE = new mc));
            return yc(oc, a, b ? null : pc)
        }

        function yc(a, b, c) {
            if (c && c.has(b)) return c.get(b);
            a.href = b;
            a.protocol || (a.href = a.href);
            var d = {
                href: a.href,
                protocol: a.protocol,
                host: a.host,
                hostname: a.hostname,
                port: "0" == a.port ? "" : a.port,
                pathname: a.pathname,
                search: a.search,
                hash: a.hash,
                origin: null
            };
            "/" !== d.pathname[0] && (d.pathname = "/" + d.pathname);
            if ("http:" == d.protocol && 80 == d.port || "https:" == d.protocol && 443 == d.port) d.port = "", d.host = d.hostname;
            d.origin = a.origin && "null" != a.origin ? a.origin : "data:" != d.protocol && d.host ? d.protocol + "//" + d.host : d.href;
            c && c.put(b,
                d);
            return d
        }

        function zc(a, b, c) {
            if (!b) return a;
            var d = a.split("#", 2),
                e = d[0].split("?", 2),
                g = e[0] + (e[1] ? c ? "?" + b + "&" + e[1] : "?" + e[1] + "&" + b : "?" + b);
            return g += d[1] ? "#" + d[1] : ""
        }

        function Ac(a, b) {
            return zc(a, Bc(b))
        }

        function Bc(a) {
            var b = [],
                c;
            for (c in a) {
                var d = a[c];
                if (null != d)
                    if (y(d))
                        for (var e = 0; e < d.length; e++) {
                            var g = d[e];
                            b.push(encodeURIComponent(c) + "=" + encodeURIComponent(g))
                        } else b.push(encodeURIComponent(c) + "=" + encodeURIComponent(d))
            }
            return b.join("&")
        }

        function Cc(a) {
            "string" == typeof a && (a = O(a));
            return "https:" == a.protocol || "localhost" == a.hostname || "127.0.0.1" == a.hostname || rb(a.hostname, ".localhost")
        }

        function Dc(a, b, c) {
            c = void 0 === c ? "source" : c;
            F(null != a, "%s %s must be available", b, c);
            F(Cc(a) || /^(\/\/)/.test(a), '%s %s must start with "https://" or "//" or be relative and served from either https or from localhost. Invalid value: %s', b, c, a);
            return a
        }

        function Ec(a) {
            var b = a.indexOf("#");
            return -1 == b ? a : a.substring(0, b)
        }

        function P(a) {
            "string" == typeof a && (a = O(a));
            return B.cdnProxyRegex.test(a.origin)
        }

        function Fc(a) {
            if (!a) return !0;
            "string" == typeof a && (a = O(a));
            return !vc.includes(a.protocol)
        }

        function Gc(a) {
            var b = O(a),
                c = Hc(b.search);
            return b.origin + b.pathname + c + b.hash
        }

        function Hc(a) {
            if (!a || "?" == a) return "";
            var b = a.replace(qc, "").replace(rc, "").replace(sc, "").replace(tc, "").replace(uc, "").replace(/^[?&]/, "");
            return b ? "?" + b : ""
        }

        function Ic(a) {
            "string" == typeof a && (a = O(a));
            if (!P(a)) return a.href;
            var b = a.pathname.split("/");
            F(nc[b[1]], "Unknown path prefix in url %s", a.href);
            var c = b[2],
                d = "s" == c ? "https://" + decodeURIComponent(b[3]) : "http://" + decodeURIComponent(c);
            F(0 < d.indexOf("."), "Expected a . in origin %s", d);
            b.splice(1, "s" == c ? 3 : 2);
            return d + b.join("/") + Hc(a.search) + (a.hash || "")
        }

        function Jc(a) {
            return O(Ic(a)).origin
        }

        function Kc(a, b) {
            Lc(b);
            var c = Jc(a.location.href);
            a = encodeURIComponent("__amp_source_origin") + "=" + encodeURIComponent(c);
            return zc(b, a, void 0)
        }

        function Lc(a) {
            var b = O(a),
                c = t(b.search);
            F(!("__amp_source_origin" in c), "Source origin is not allowed in %s", a)
        };

        function Q(a, b) {
            return !!Mc(a)[b]
        }

        function Nc(a, b, c, d) {
            var e = Q(a, b),
                g = !(void 0 !== c ? !c : e);
            if (g != e && (Mc(a)[b] = g, !d)) {
                var h = Oc(a);
                h[b] = g;
                var l = [],
                    k;
                for (k in h) l.push((!1 === h[k] ? "-" : "") + k);
                try {
                    "localStorage" in a && a.localStorage.setItem("amp-experiment-toggles", l.join(","))
                } catch (n) {
                    C().error("EXPERIMENTS", "Failed to save experiments to localStorage.")
                }
                C().warn("EXPERIMENTS", '"%s" experiment %s for the domain "%s". See: https://amp.dev/documentation/guides-and-tutorials/learn/experimental', b, g ? "enabled" : "disabled", a.location.hostname)
            }
            return g
        }

        function Mc(a) {
            if (a.__AMP__EXPERIMENT_TOGGLES) return a.__AMP__EXPERIMENT_TOGGLES;
            a.__AMP__EXPERIMENT_TOGGLES = Object.create(null);
            var b = a.__AMP__EXPERIMENT_TOGGLES;
            if (a.AMP_CONFIG)
                for (var c in a.AMP_CONFIG) {
                    var d = a.AMP_CONFIG[c];
                    "number" === typeof d && 0 <= d && 1 >= d && (b[c] = Math.random() < d)
                }
            if (a.AMP_CONFIG && Array.isArray(a.AMP_CONFIG["allow-doc-opt-in"]) && 0 < a.AMP_CONFIG["allow-doc-opt-in"].length) {
                var e = a.AMP_CONFIG["allow-doc-opt-in"],
                    g = a.document.head.querySelector('meta[name="amp-experiments-opt-in"]');
                if (g) {
                    var h = g.getAttribute("content").split(",");
                    for (c = 0; c < h.length; c++) - 1 != e.indexOf(h[c]) && (b[h[c]] = !0)
                }
            }
            Object.assign(b, Oc(a));
            if (a.AMP_CONFIG && Array.isArray(a.AMP_CONFIG["allow-url-opt-in"]) && 0 < a.AMP_CONFIG["allow-url-opt-in"].length) {
                c = a.AMP_CONFIG["allow-url-opt-in"];
                a = t(a.location.originalHash || a.location.hash);
                for (var l = 0; l < c.length; l++) {
                    var k = a["e-" + c[l]];
                    "1" == k && (b[c[l]] = !0);
                    "0" == k && (b[c[l]] = !1)
                }
            }
            return b
        }

        function Oc(a) {
            var b = "";
            try {
                "localStorage" in a && (b = a.localStorage.getItem("amp-experiment-toggles"))
            } catch (e) {
                E().warn("EXPERIMENTS", "Failed to retrieve experiments from localStorage.")
            }
            var c = b ? b.split(/\s*,\s*/g) : [];
            a = Object.create(null);
            for (var d = 0; d < c.length; d++) 0 != c[d].length && ("-" == c[d][0] ? a[c[d].substr(1)] = !1 : a[c[d]] = !0);
            return a
        }

        function Pc(a, b) {
            a.__AMP_EXPERIMENT_BRANCHES = a.__AMP_EXPERIMENT_BRANCHES || {};
            for (var c in b)
                if (lb.call(b, c) && !lb.call(a.__AMP_EXPERIMENT_BRANCHES, c))
                    if (!b[c].isTrafficEligible || !b[c].isTrafficEligible(a)) a.__AMP_EXPERIMENT_BRANCHES[c] = null;
                    else if (!a.__AMP_EXPERIMENT_BRANCHES[c] && Q(a, c)) {
                var d = b[c].branches;
                a.__AMP_EXPERIMENT_BRANCHES[c] = d[Math.floor(Math.random() * d.length)] || null
            }
        };
        var Qc = {},
            Rc = (Qc["ampdoc-fie"] = {
                isTrafficEligible: function() {
                    return !0
                },
                branches: [
                    ["21065001"],
                    ["21065002"]
                ]
            }, Qc);

        function Sc(a) {
            if (!Q(a, "ampdoc-fie")) return !1;
            Pc(a, Rc);
            return "21065002" === (a.__AMP_EXPERIMENT_BRANCHES ? a.__AMP_EXPERIMENT_BRANCHES["ampdoc-fie"] : null)
        };

        function Tc(a, b) {
            var c = a.ownerDocument.defaultView,
                d = Uc(c),
                e = c != d,
                g = Sc(d);
            e && !g ? b = Vc(c, b) ? Wc(c, b) : null : (a = Xc(a), a = Yc(a), b = Vc(a, b) ? Wc(a, b) : null);
            return b
        }

        function Zc(a, b, c) {
            var d = Uc(a);
            Vc(a, b);
            if (Sc(d)) {
                var e = Xc(a.document);
                $c(Yc(e), e, b, function() {
                    return c
                }, !0)
            } else $c(a, a, b, function() {
                return c
            }), Wc(a, b)
        }

        function R(a, b, c) {
            a = Uc(a);
            $c(a, a, b, c)
        }

        function S(a, b, c, d) {
            var e = Xc(a),
                g = Yc(e);
            $c(g, e, b, c);
            d && Wc(g, b)
        }

        function T(a, b) {
            a = Uc(a);
            return Wc(a, b)
        }

        function ad(a) {
            a = Uc(a);
            return Vc(a, "performance") ? Wc(a, "performance") : null
        }

        function bd(a, b) {
            var c = Xc(a);
            c = Yc(c);
            return Wc(c, b)
        }

        function cd(a, b) {
            return dd(Yc(a), b)
        }

        function Uc(a) {
            return a.__AMP_TOP || (a.__AMP_TOP = a)
        }

        function ed(a, b) {
            var c = (a.ownerDocument || a).defaultView;
            a = b || Uc(c);
            if (c && c != a && Uc(c) == a) try {
                return c.frameElement
            } catch (d) {}
            return null
        }

        function Xc(a) {
            return a.nodeType ? T((a.ownerDocument || a).defaultView, "ampdoc").getAmpDoc(a) : a
        }

        function Yc(a) {
            a = Xc(a);
            return a.isSingleDoc() ? a.win : a
        }

        function Wc(a, b) {
            Vc(a, b);
            a = fd(a)[b];
            a.obj || (a.obj = new a.ctor(a.context), a.ctor = null, a.context = null, a.resolve && a.resolve(a.obj));
            return a.obj
        }

        function $c(a, b, c, d, e) {
            var g = fd(a),
                h = g[c];
            h || (h = g[c] = {
                obj: null,
                promise: null,
                resolve: null,
                reject: null,
                context: null,
                ctor: null
            });
            if (e || !h.ctor && !h.obj) h.ctor = d, h.context = b, h.resolve && Wc(a, c)
        }

        function gd(a, b) {
            var c = dd(a, b);
            if (c) return c;
            a = fd(a);
            a[b] = hd();
            return a[b].promise
        }

        function dd(a, b) {
            var c = fd(a)[b];
            if (c) {
                if (c.promise) return c.promise;
                Wc(a, b);
                return c.promise = Promise.resolve(c.obj)
            }
            return null
        }

        function fd(a) {
            var b = a.__AMP_SERVICES;
            b || (b = a.__AMP_SERVICES = {});
            return b
        }

        function id(a, b) {
            var c = Wc(Yc(a.getParent()), b);
            $c(Yc(a), a, b, function() {
                return c
            })
        }

        function Vc(a, b) {
            a = a.__AMP_SERVICES && a.__AMP_SERVICES[b];
            return !(!a || !a.ctor && !a.obj)
        }

        function hd() {
            var a = new L,
                b = a.promise,
                c = a.resolve;
            a = a.reject;
            b.catch(function() {});
            return {
                obj: null,
                promise: b,
                resolve: c,
                reject: a,
                context: null,
                ctor: null
            }
        };

        function jd(a) {
            var b = dd(a, "share-tracking");
            return b ? b : kd(a, "share-tracking", "amp-share-tracking", !0)
        }

        function ld(a, b, c) {
            return md(a, b, c, void 0).then(function(a) {
                return F(a, "Service %s was requested to be provided through %s, but %s is not loaded in the current page. To fix this problem load the JavaScript file for %s in this page.", b, c, c, c)
            })
        }

        function md(a, b, c, d) {
            var e = cd(a, b);
            if (e) return e;
            var g = Xc(a);
            return g.waitForBodyOpen().then(function() {
                return nd(g.win, c, g.win.document.head)
            }).then(function() {
                if (d) var e = cd(a, b);
                else e = g.win, e = e.__AMP_EXTENDED_ELEMENTS && e.__AMP_EXTENDED_ELEMENTS[c] ? gd(Yc(a), b) : null;
                return e
            })
        }

        function od(a) {
            var b = Tc(a, "bind");
            if (b) return Promise.resolve(b);
            b = a.ownerDocument.defaultView;
            var c = Uc(b);
            return b !== c ? kd(b, "bind", "amp-bind") : md(a, "bind", "amp-bind")
        }

        function pd(a) {
            if (!a) return [];
            for (var b = {}, c = a.querySelectorAll("script[custom-element],script[custom-template]"), d = 0; d < c.length; d++) {
                var e = c[d];
                e = e.getAttribute("custom-element") || e.getAttribute("custom-template");
                b[e] = !0
            }
            return Object.keys(b)
        }

        function qd(a) {
            return a.waitForBodyOpen().then(function() {
                var b = a.getHeadNode();
                return pd(b).includes("amp-form")
            })
        }

        function nd(a, b, c) {
            return pd(c).includes(b) ? T(a, "extensions").waitForExtension(a, b) : x()
        }

        function kd(a, b, c, d) {
            return wb(a.document).then(function() {
                return nd(a, c, a.document.head)
            }).then(function() {
                return d ? dd(a, b) : a.__AMP_EXTENDED_ELEMENTS && a.__AMP_EXTENDED_ELEMENTS[c] ? gd(a, b) : null
            })
        };

        function rd(a) {
            return T(a, "ampdoc")
        }

        function sd(a) {
            return bd(a, "documentInfo").get()
        }

        function td(a) {
            return T(a, "extensions")
        }

        function ud(a) {
            return bd(a, "mutator")
        }

        function U(a) {
            return T(a, "platform")
        }

        function vd(a) {
            return bd(a, "resources")
        }

        function V(a) {
            return T(a, "timer")
        }

        function W(a) {
            return bd(a, "viewer")
        }

        function wd(a) {
            return T(a, "vsync")
        }

        function xd(a) {
            return bd(a, "viewport")
        };

        function yd(a, b) {
            this.Lg = a;
            this.Jb = Object.assign({}, {
                root: null,
                rootMargin: "0px 0px 0px 0px"
            }, b);
            if ((a = this.Jb.root) && 1 !== a.nodeType) throw Error("root must be an Element");
            this.J = [];
            this.U = null;
            yd._upgraders.push(this.di.bind(this))
        }
        f = yd.prototype;
        f.disconnect = function() {
            this.U ? this.U.disconnect() : this.J.length = 0
        };
        f.takeRecords = function() {
            return this.U ? this.U.takeRecords() : []
        };
        f.observe = function(a) {
            this.U ? this.U.observe(a) : -1 == this.J.indexOf(a) && this.J.push(a)
        };
        f.unobserve = function(a) {
            this.U ? this.U.unobserve(a) : (a = this.J.indexOf(a), -1 != a && this.J.splice(a, 1))
        };
        f.di = function(a) {
            var b = new a(this.Lg, this.Jb);
            this.U = b;
            this.J.forEach(function(a) {
                return b.observe(a)
            });
            this.J = null
        };
        ca.Object.defineProperties(yd.prototype, {
            root: {
                configurable: !0,
                enumerable: !0,
                get: function() {
                    return this.U ? this.U.root : this.Jb.root || null
                }
            },
            rootMargin: {
                configurable: !0,
                enumerable: !0,
                get: function() {
                    return this.U ? this.U.rootMargin : this.Jb.rootMargin
                }
            },
            thresholds: {
                configurable: !0,
                enumerable: !0,
                get: function() {
                    return this.U ? this.U.thresholds : [].concat(this.Jb.threshold || 0)
                }
            }
        });
        yd._upgraders = [];

        function zd() {
            var a = Ad;
            !a.IntersectionObserverEntry || "isIntersecting" in a.IntersectionObserverEntry.prototype || Object.defineProperty(a.IntersectionObserverEntry.prototype, "isIntersecting", {
                enumerable: !0,
                configurable: !0,
                get: function() {
                    return 0 < this.intersectionRatio
                }
            })
        };

        function Bd(a) {
            return (a = Number(a)) ? 0 < a ? 1 : -1 : a
        };
        var Cd = Object.prototype.hasOwnProperty;

        function Dd(a, b) {
            if (null == a) throw new TypeError("Cannot convert undefined or null to object");
            for (var c = Object(a), d = 1; d < arguments.length; d++) {
                var e = arguments[d];
                if (null != e)
                    for (var g in e) Cd.call(e, g) && (c[g] = e[g])
            }
            return c
        };

        function Ed(a) {
            return Object.keys(a).map(function(b) {
                return a[b]
            })
        };

        function Fd(a) {
            if (!(this instanceof Fd)) throw new TypeError("Constructor Promise requires `new`");
            if (!Gd(a)) throw new TypeError("Must pass resolver function");
            this._state = Hd;
            this._value = [];
            this._isChainEnd = !0;
            Id(this, Jd(this, Kd), Jd(this, Ld), {
                then: a
            })
        }
        Fd.prototype.then = function(a, b) {
            a = Gd(a) ? a : void 0;
            b = Gd(b) ? b : void 0;
            if (a || b) this._isChainEnd = !1;
            return this._state(this._value, a, b)
        };
        Fd.prototype.catch = function(a) {
            return this.then(void 0, a)
        };

        function Md(a) {
            return a === Object(a) && a instanceof this ? a : new this(function(b) {
                b(a)
            })
        }

        function Nd(a) {
            return new this(function(b, c) {
                c(a)
            })
        }

        function Od(a) {
            var b = this;
            return new b(function(c, d) {
                var e = a.length,
                    g = Array(e);
                if (0 === e) return c(g);
                Pd(a, function(a, l) {
                    b.resolve(a).then(function(a) {
                        g[l] = a;
                        0 === --e && c(g)
                    }, d)
                })
            })
        }

        function Qd(a) {
            var b = this;
            return new b(function(c, d) {
                for (var e = 0; e < a.length; e++) b.resolve(a[e]).then(c, d)
            })
        }

        function Kd(a, b, c, d) {
            if (!b) return d && (b = d.promise, b._state = Kd, b._value = a), this;
            d || (d = new Rd(this.constructor));
            Sd(Td(d, b, a));
            return d.promise
        }

        function Ld(a, b, c, d) {
            if (!c) return d && (b = d.promise, b._state = Ld, b._value = a), this;
            d || (d = new Rd(this.constructor));
            Sd(Td(d, c, a));
            return d.promise
        }

        function Hd(a, b, c, d) {
            if (!d) {
                if (!b && !c) return this;
                d = new Rd(this.constructor)
            }
            a.push({
                deferred: d,
                onFulfilled: b || d.resolve,
                onRejected: c || d.reject
            });
            return d.promise
        }

        function Rd(a) {
            var b = this;
            this.promise = new a(function(a, d) {
                b.resolve = a;
                b.reject = d
            });
            return b
        }

        function Ud(a, b, c, d) {
            var e = a._value;
            a._state = b;
            a._value = c;
            d && b === Hd && d._state(c, void 0, void 0, {
                promise: a,
                resolve: void 0,
                reject: void 0
            });
            for (var g = 0; g < e.length; g++) {
                var h = e[g];
                a._state(c, h.onFulfilled, h.onRejected, h.deferred)
            }
            e.length = 0;
            b === Ld && a._isChainEnd && setTimeout(function() {
                if (a._isChainEnd) throw c;
            }, 0)
        }

        function Jd(a, b) {
            return function(c) {
                Ud(a, b, c)
            }
        }

        function Xd() {}

        function Gd(a) {
            return "function" === typeof a
        }

        function Pd(a, b) {
            for (var c = 0; c < a.length; c++) b(a[c], c)
        }

        function Td(a, b, c) {
            var d = a.promise,
                e = a.resolve,
                g = a.reject;
            return function() {
                try {
                    var a = b(c);
                    Id(d, e, g, a, a)
                } catch (l) {
                    g(l)
                }
            }
        }
        var Sd = function() {
            function a() {
                for (var a = 0; a < d; a++) {
                    var b = c[a];
                    c[a] = null;
                    b()
                }
                d = 0
            }
            if ("undefined" !== typeof window && window.postMessage) {
                window.addEventListener("message", a);
                var b = function() {
                    window.postMessage("macro-task", "*")
                }
            } else b = function() {
                setTimeout(a, 0)
            };
            var c = Array(16),
                d = 0;
            return function(a) {
                0 === d && b();
                c[d++] = a
            }
        }();

        function Id(a, b, c, d, e) {
            var g = c,
                h;
            try {
                if (d === a) throw new TypeError("Cannot fulfill promise with itself");
                var l = d === Object(d);
                if (l && d instanceof a.constructor) Ud(a, d._state, d._value, d);
                else if (l && (h = d.then) && Gd(h)) {
                    var k = function(d) {
                        k = g = Xd;
                        Id(a, b, c, d, d)
                    };
                    g = function(a) {
                        k = g = Xd;
                        c(a)
                    };
                    h.call(e, function(a) {
                        k(a)
                    }, function(a) {
                        g(a)
                    })
                } else b(d)
            } catch (n) {
                g(n)
            }
        };
        (function(a) {
            a.fetch || (Object.defineProperty(a, "fetch", {
                value: Yb,
                writable: !0,
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(a, "Response", {
                value: dc,
                writable: !0,
                enumerable: !1,
                configurable: !0
            }))
        })(self);
        (function(a) {
            a.Math.sign || a.Object.defineProperty(a.Math, "sign", {
                enumerable: !1,
                configurable: !0,
                writable: !0,
                value: Bd
            })
        })(self);
        (function(a) {
            a.Object.assign || a.Object.defineProperty(a.Object, "assign", {
                enumerable: !1,
                configurable: !0,
                writable: !0,
                value: Dd
            })
        })(self);
        (function(a) {
            a.Object.values || a.Object.defineProperty(a.Object, "values", {
                configurable: !0,
                writable: !0,
                value: Ed
            })
        })(self);
        (function(a) {
            a.Promise || (a.Promise = Fd, Fd.default && (a.Promise = Fd.default), a.Promise.resolve = Md, a.Promise.reject = Nd, a.Promise.all = Od, a.Promise.race = Qd)
        })(self);
        (function(a) {
            a.Array.prototype.includes || a.Object.defineProperty(Array.prototype, "includes", {
                enumerable: !1,
                configurable: !0,
                writable: !0,
                value: oa
            })
        })(self);
        if (self.document) {
            Ja();
            var Yd = self,
                Zd = Yd.HTMLDocument || Yd.Document;
            Zd && !Zd.prototype.contains && Yd.Object.defineProperty(Zd.prototype, "contains", {
                enumerable: !1,
                configurable: !0,
                writable: !0,
                value: Ka
            });
            var lc = self;
            kc() && (ic = Element.prototype.getBoundingClientRect, lc.Object.defineProperty(lc.Element.prototype, "getBoundingClientRect", {
                value: jc
            }));
            var $d = function() {},
                Fa = self,
                ae = Fa.document,
                be, ce = Fa.customElements;
            be = !!(ce && ce.define && ce.get && ce.whenDefined);
            var de;
            if (!(de = !ae)) {
                var ee;
                if (ee = be) ee = -1 === Fa.HTMLElement.toString().indexOf("[native code]");
                de = ee
            }
            if (!de) {
                var fe = !0,
                    ge = !1;
                if ($d && be) try {
                    var he = Fa.Reflect,
                        ie = Object.create($d.prototype);
                    Function.call.call($d, ie);
                    ge = !(!he || !he.construct)
                } catch (a) {
                    fe = !1
                }
                ge ? Ha() : fe && Da()
            }
            var Ad = self;
            Ad.IntersectionObserver || (Ad.IntersectionObserver = yd);
            zd()
        };
        var je;

        function ke(a) {
            a = a.ownerDocument || a;
            je && je.ownerDocument === a || (je = a.createElement("div"));
            return le
        }

        function le(a) {
            var b = je;
            b.innerHTML = a[0];
            a = b.firstElementChild;
            b.removeChild(a);
            return a
        };
        var me, ne = "Webkit webkit Moz moz ms O o".split(" ");

        function oe(a, b, c) {
            if (N(b, "--")) return b;
            me || (me = I());
            var d = me[b];
            if (!d || c) {
                d = b;
                if (void 0 === a[b]) {
                    var e = b.charAt(0).toUpperCase() + b.slice(1);
                    a: {
                        for (var g = 0; g < ne.length; g++) {
                            var h = ne[g] + e;
                            if (void 0 !== a[h]) {
                                e = h;
                                break a
                            }
                        }
                        e = ""
                    }
                    var l = e;
                    void 0 !== a[l] && (d = l)
                }
                c || (me[b] = d)
            }
            return d
        }

        function pe(a, b) {
            a = a.style;
            for (var c in b) a.setProperty(oe(a, c), b[c].toString(), "important")
        }

        function X(a, b, c, d) {
            if (b = oe(a.style, b, void 0)) {
                var e = d ? c + d : c;
                N(b, "--") ? a.style.setProperty(b, e) : a.style[b] = e
            }
        }

        function qe(a, b) {
            if (b = oe(a.style, b, void 0)) return N(b, "--") ? a.style.getPropertyValue(b) : a.style[b]
        }

        function re(a, b) {
            for (var c in b) X(a, c, b[c])
        }

        function se(a, b) {
            void 0 === b && (b = a.hasAttribute("hidden"));
            b ? a.removeAttribute("hidden") : a.setAttribute("hidden", "")
        }

        function te(a, b) {
            return a.getComputedStyle(b) || I()
        };
        var ue = ['<i-amphtml-sizer class=i-amphtml-sizer slot=i-amphtml-svc><img alt="" role=presentation aria-hidden=true class=i-amphtml-intrinsic-sizer></i-amphtml-sizer>'],
            ve = {
                NODISPLAY: "nodisplay",
                FIXED: "fixed",
                FIXED_HEIGHT: "fixed-height",
                RESPONSIVE: "responsive",
                CONTAINER: "container",
                FILL: "fill",
                FLEX_ITEM: "flex-item",
                FLUID: "fluid",
                INTRINSIC: "intrinsic"
            },
            we = {
                "AMP-PIXEL": {
                    width: "0px",
                    height: "0px"
                },
                "AMP-ANALYTICS": {
                    width: "1px",
                    height: "1px"
                },
                "AMP-AUDIO": null,
                "AMP-SOCIAL-SHARE": {
                    width: "60px",
                    height: "44px"
                }
            },
            xe = {
                "AMP-AD": !0,
                "AMP-ANIM": !0,
                "AMP-EMBED": !0,
                "AMP-FACEBOOK": !0,
                "AMP-FACEBOOK-COMMENTS": !0,
                "AMP-FACEBOOK-PAGE": !0,
                "AMP-GOOGLE-DOCUMENT-EMBED": !0,
                "AMP-IFRAME": !0,
                "AMP-IMG": !0,
                "AMP-INSTAGRAM": !0,
                "AMP-LIST": !0,
                "AMP-PINTEREST": !0,
                "AMP-PLAYBUZZ": !0,
                "AMP-TWITTER": !0
            },
            ye = /^amp\-(video|.+player)|AMP-BRIGHTCOVE|AMP-DAILYMOTION|AMP-YOUTUBE|AMP-VIMEO|AMP-IMA-VIDEO/i;

        function ze(a) {
            for (var b in ve)
                if (ve[b] == a) return ve[b]
        }

        function Ae(a) {
            return "fixed" == a || "fixed-height" == a || "responsive" == a || "fill" == a || "flex-item" == a || "fluid" == a || "intrinsic" == a
        }

        function Be(a) {
            if ("number" == typeof a) return a + "px";
            if (a && /^\d+(\.\d+)?(px|em|rem|vh|vw|vmin|vmax|cm|mm|q|in|pc|pt)?$/.test(a)) return /^\d+(\.\d+)?$/.test(a) ? a + "px" : a
        }

        function Ce(a) {
            F(/^\d+(\.\d+)?(px|em|rem|vh|vw|vmin|vmax|cm|mm|q|in|pc|pt)$/.test(a), "Invalid length value: %s", a);
            return a
        }

        function De(a) {
            F(/^\d+(\.\d+)?(px|em|rem|vh|vw|vmin|vmax|%)$/.test(a), "Invalid length or percent value: %s", a);
            return a
        }

        function Ee(a) {
            Ce(a);
            return F(/[a-z]+/i.exec(a), "Failed to read units from %s", a)[0]
        }

        function Fe(a) {
            a = parseFloat(a);
            return Oa(a) ? a : void 0
        };
        var Ge;

        function He(a, b, c, d) {
            var e = a,
                g = c;
            var h = function(a) {
                try {
                    return g(a)
                } catch (r) {
                    throw self.__AMP_REPORT_ERROR(r), r;
                }
            };
            var l = Ie(),
                k = !1;
            d && (k = d.capture);
            e.addEventListener(b, h, l ? d : k);
            return function() {
                e && e.removeEventListener(b, h, l ? d : k);
                h = e = g = null
            }
        }

        function Ie() {
            if (void 0 !== Ge) return Ge;
            Ge = !1;
            try {
                var a = {
                    get capture() {
                        Ge = !0
                    }
                };
                self.addEventListener("test-options", null, a);
                self.removeEventListener("test-options", null, a)
            } catch (b) {}
            return Ge
        };

        function Je(a, b, c, d) {
            return He(a, b, c, d)
        }

        function Ke(a, b, c, d) {
            var e = c,
                g = He(a, b, function(a) {
                    try {
                        e(a)
                    } finally {
                        e = null, g()
                    }
                }, d);
            return g
        }

        function Le(a, b) {
            var c, d = new Promise(function(b) {
                c = Ke(a, "click", b, void 0)
            });
            d.then(c, c);
            b && b(c);
            return d
        }

        function Me(a) {
            return !!(a.complete || "complete" == a.readyState || Ne(a) && 0 < a.readyState || a.document && "complete" == a.document.readyState)
        }

        function Oe(a) {
            var b, c;
            if (Me(a)) return Promise.resolve(a);
            var d = Ne(a);
            return d && a.__AMP_MEDIA_LOAD_FAILURE_SRC === a.currentSrc ? Promise.reject(a) : (new Promise(function(e, g) {
                b = d ? Ke(a, "loadedmetadata", e, {
                    capture: !0
                }) : Ke(a, "load", e);
                if (a.tagName) {
                    var h = a;
                    if (d && !a.hasAttribute("src") && (h = Hb(a, function(a) {
                            return "SOURCE" === a.tagName
                        }), !h)) return g(Error("Media has no source."));
                    c = Ke(h, "error", g)
                }
            })).then(function() {
                c && c();
                return a
            }, function() {
                b && b();
                Ne(a) && (a.__AMP_MEDIA_LOAD_FAILURE_SRC = a.currentSrc || !0);
                var c = a;
                c && c.src && (c = c.src);
                throw C().createError("Failed to load:", c);
            })
        }

        function Ne(a) {
            return "AUDIO" === a.tagName || "VIDEO" === a.tagName
        };

        function Pe(a) {
            this.element = a;
            this.layout_ = "nodisplay";
            this.inViewport_ = !1;
            this.win = a.ownerDocument.defaultView;
            this.defaultActionAlias_ = this.actionMap_ = null
        }
        f = Pe.prototype;
        f.signals = function() {
            return this.element.signals()
        };
        f.getDefaultActionAlias = function() {
            return this.defaultActionAlias_
        };
        f.getLayoutPriority = function() {
            return 0
        };
        f.updateLayoutPriority = function(a) {
            this.element.getResources().updateLayoutPriority(this.element, a)
        };
        f.getLayout = function() {
            return this.layout_
        };
        f.getLayoutBox = function() {
            return this.element.getLayoutBox()
        };
        f.getPageLayoutBox = function() {
            return this.element.getPageLayoutBox()
        };
        f.getWin = function() {
            return this.win
        };
        f.getAmpDoc = function() {
            return this.element.getAmpDoc()
        };
        f.getVsync = function() {
            return wd(this.win)
        };
        f.getConsentPolicy = function() {
            var a = null;
            this.element.hasAttribute("data-block-on-consent") && (a = this.element.getAttribute("data-block-on-consent") || "default");
            return a
        };
        f.isLayoutSupported = function(a) {
            return "nodisplay" == a
        };
        f.isAlwaysFixed = function() {
            return !1
        };
        f.isInViewport = function() {
            return this.inViewport_
        };
        f.upgradeCallback = function() {
            return null
        };
        f.createdCallback = function() {};
        f.firstAttachedCallback = function() {};
        f.buildCallback = function() {};
        f.preconnectCallback = function() {};
        f.detachedCallback = function() {};
        f.prerenderAllowed = function() {
            return !1
        };
        f.isBuildRenderBlocking = function() {
            return !1
        };
        f.createPlaceholderCallback = function() {
            return null
        };
        f.createLoaderLogoCallback = function() {
            return {}
        };
        f.renderOutsideViewport = function() {
            return "inabox" == v(this.win).runtime || 3
        };
        f.idleRenderOutsideViewport = function() {
            return !1
        };
        f.isRelayoutNeeded = function() {
            return !1
        };
        f.layoutCallback = function() {
            return x()
        };
        f.firstLayoutCompleted = function() {
            this.togglePlaceholder(!1)
        };
        f.viewportCallback = function() {};
        f.pauseCallback = function() {};
        f.resumeCallback = function() {};
        f.unlayoutCallback = function() {
            return !1
        };
        f.unlayoutOnPause = function() {
            return !1
        };
        f.reconstructWhenReparented = function() {
            return !0
        };
        f.loadPromise = function(a) {
            return Oe(a)
        };

        function Qe(a) {
            a.actionMap_ || (a.actionMap_ = a.win.Object.create(null))
        }
        f.registerAction = function(a, b, c) {
            c = void 0 === c ? 2 : c;
            Qe(this);
            this.actionMap_[a] = {
                handler: b,
                minTrust: c
            }
        };
        f.registerDefaultAction = function(a, b, c) {
            b = void 0 === b ? "activate" : b;
            this.registerAction(b, a, void 0 === c ? 2 : c);
            this.defaultActionAlias_ = b
        };
        f.executeAction = function(a) {
            var b = a.method;
            "activate" === b && (b = this.defaultActionAlias_ || b);
            Qe(this);
            var c = this.actionMap_[b];
            F(c, "Method not found: " + b + " in " + this.element.tagName);
            b = c.handler;
            if (a.satisfiesTrust(c.minTrust)) return b(a)
        };
        f.propagateAttributes = function(a, b, c) {
            a = y(a) ? a : [a];
            for (var d = 0; d < a.length; d++) {
                var e = a[d],
                    g = this.element.getAttribute(e);
                null !== g ? b.setAttribute(e, g) : c && b.removeAttribute(e)
            }
        };
        f.propagateDataset = function(a) {
            for (var b in a.dataset) b in this.element.dataset || delete a.dataset[b];
            for (var c in this.element.dataset) a.dataset[c] !== this.element.dataset[c] && (a.dataset[c] = this.element.dataset[c])
        };
        f.forwardEvents = function(a, b) {
            var c = this,
                d = (y(a) ? a : [a]).map(function(a) {
                    return Je(b, a, function(b) {
                        c.element.dispatchCustomEvent(a, b.data || {})
                    })
                });
            return function() {
                return d.forEach(function(a) {
                    return a()
                })
            }
        };
        f.getPlaceholder = function() {
            return this.element.getPlaceholder()
        };
        f.togglePlaceholder = function(a) {
            this.element.togglePlaceholder(a)
        };
        f.getFallback = function() {
            return this.element.getFallback()
        };
        f.toggleFallback = function(a) {
            this.element.toggleFallback(a)
        };
        f.toggleLoading = function(a) {
            this.element.toggleLoading(a)
        };
        f.isLoadingReused = function() {
            return !1
        };
        f.getOverflowElement = function() {
            return this.element.getOverflowElement()
        };
        f.renderStarted = function() {
            this.element.renderStarted()
        };
        f.getRealChildNodes = function() {
            return this.element.getRealChildNodes()
        };
        f.getRealChildren = function() {
            return this.element.getRealChildren()
        };
        f.applyFillContent = function(a, b) {
            a.classList.add("i-amphtml-fill-content");
            b && a.classList.add("i-amphtml-replaced-content")
        };
        f.getViewport = function() {
            return xd(this.getAmpDoc())
        };
        f.getIntersectionElementLayoutBox = function() {
            return this.getLayoutBox()
        };
        f.collapse = function() {
            ud(this.getAmpDoc()).collapseElement(this.element)
        };
        f.attemptCollapse = function() {
            return ud(this.getAmpDoc()).attemptCollapse(this.element)
        };
        f.forceChangeHeight = function(a) {
            ud(this.getAmpDoc()).forceChangeSize(this.element, a, void 0)
        };
        f.attemptChangeHeight = function(a) {
            return ud(this.getAmpDoc()).requestChangeSize(this.element, a, void 0)
        };
        f.attemptChangeSize = function(a, b, c) {
            return ud(this.getAmpDoc()).requestChangeSize(this.element, a, b, void 0, c)
        };
        f.measureElement = function(a) {
            return ud(this.getAmpDoc()).measureElement(a)
        };
        f.mutateElement = function(a, b) {
            return this.measureMutateElement(null, a, b)
        };
        f.measureMutateElement = function(a, b, c) {
            return ud(this.getAmpDoc()).measureMutateElement(c || this.element, a, b)
        };
        f.mutateElementSkipRemeasure = function(a) {
            return ud(this.getAmpDoc()).mutateElement(this.element, a, !0)
        };
        f.collapsedCallback = function() {};
        f.expand = function() {
            ud(this.getAmpDoc()).expandElement(this.element)
        };
        f.expandedCallback = function() {};
        f.mutatedAttributesCallback = function() {};
        f.onLayoutMeasure = function() {};
        f.onMeasureChanged = function() {};
        f.user = function() {
            return C(this.element)
        };

        function Re(a, b) {
            this.element = a;
            this.win = a.ownerDocument.defaultView || b;
            this.h = W(this.element);
            this.compileCallback()
        }
        f = Re.prototype;
        f.compileCallback = function() {};
        f.setHtml = function() {
            throw Error("Not implemented");
        };
        f.render = function() {
            throw Error("Not implemented");
        };
        f.unwrap = function(a) {
            for (var b = null, c = a.firstChild; null != c; c = c.nextSibling)
                if (3 == c.nodeType) {
                    if (c.textContent.trim()) {
                        b = null;
                        break
                    }
                } else if (8 != c.nodeType)
                if (1 == c.nodeType)
                    if (b) {
                        b = null;
                        break
                    } else b = c;
            else b = null;
            return b || a
        };
        f.viewerCanRenderTemplates = function() {
            return this.h.hasCapability("viewerRenderTemplate")
        };

        function Se(a) {
            this.w = a;
            this.Yb = {};
            this.Be = {}
        }
        f = Se.prototype;
        f.setHtmlForTemplate = function(a, b) {
            return Te(this, a).then(function(a) {
                return a.setHtml(b)
            })
        };
        f.renderTemplate = function(a, b) {
            return Te(this, a).then(function(a) {
                return a.render(b)
            })
        };
        f.renderTemplateArray = function(a, b) {
            return 0 == b.length ? Promise.resolve([]) : Te(this, a).then(function(a) {
                return b.map(function(b) {
                    return a.render(b)
                })
            })
        };
        f.findAndRenderTemplate = function(a, b, c) {
            return this.renderTemplate(this.findTemplate(a, c), b)
        };
        f.findAndSetHtmlForTemplate = function(a, b, c) {
            return this.setHtmlForTemplate(this.findTemplate(a, c), b)
        };
        f.findAndRenderTemplateArray = function(a, b, c) {
            return this.renderTemplateArray(this.findTemplate(a, c), b)
        };
        f.hasTemplate = function(a, b) {
            return !!this.maybeFindTemplate(a, b)
        };
        f.findTemplate = function(a, b) {
            b = this.maybeFindTemplate(a, b);
            F(b, "Template not found for %s", a);
            var c = b.tagName;
            F("TEMPLATE" == c || "SCRIPT" == c && "text/plain" === b.getAttribute("type"), 'Template must be defined in a <template> or <script type="text/plain"> tag');
            return b
        };
        f.maybeFindTemplate = function(a, b) {
            var c = a.getAttribute("template");
            return c ? Ab(a).getElementById(c) : b ? Kb(a, b) : a.querySelector('template, script[type="text/plain"]')
        };

        function Te(a, b) {
            var c = b.__AMP_IMPL_;
            if (c) return Promise.resolve(c);
            c = "";
            var d = b.tagName;
            "TEMPLATE" == d ? c = b.getAttribute("type") : "SCRIPT" == d && (c = b.getAttribute("template"));
            F(c, "Type must be specified: %s", b);
            if (d = b.__AMP_WAIT_) return d;
            d = Ue(a, c).then(function(c) {
                var d = b.__AMP_IMPL_ = new c(b, a.w);
                delete b.__AMP_WAIT_;
                return d
            });
            return b.__AMP_WAIT_ = d
        }

        function Ue(a, b) {
            if (a.Yb[b]) return a.Yb[b];
            var c = new L,
                d = c.promise;
            c = c.resolve;
            a.Yb[b] = d;
            a.Be[b] = c;
            return d
        };
        var Ve = {
            PRERENDER: "prerender",
            VISIBLE: "visible",
            HIDDEN: "hidden",
            PAUSED: "paused",
            INACTIVE: "inactive"
        };
        /*

         Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
         Use of this source code is governed by a BSD-style
         license that can be found in the LICENSE file or at
         https://developers.google.com/open-source/licenses/bsd */
        var We;

        function Xe() {
            if (void 0 === We) {
                var a = Element;
                We = a.prototype.attachShadow ? "v1" : a.prototype.createShadowRoot ? "v0" : "none"
            }
            return We
        };
        var Ye = {
            "amp-dynamic-css-classes": "[custom-element=amp-dynamic-css-classes]",
            variant: "amp-experiment",
            "amp-story-render": "amp-story[standalone]"
        };

        function Ze(a) {
            var b = $e(a).map(function(b) {
                var c = gd(a, b).then(function(a) {
                    return a && "function" == typeof a.whenReady ? a.whenReady().then(function() {
                        return a
                    }) : a
                });
                return V(a).timeoutPromise(3E3, c, "Render timeout waiting for service " + b + " to be ready.")
            });
            return Promise.all(b)
        }

        function $e(a) {
            var b = a.document;
            return Object.keys(Ye).filter(function(a) {
                return b.querySelector(Ye[a])
            })
        };

        function af(a, b, c, d, e) {
            var g = a.getHeadNode(),
                h = bf(g, cf(g, b), d || !1, e || null);
            if (c) {
                var l = a.getRootNode();
                if (df(l, h)) c(h);
                else var k = setInterval(function() {
                    df(l, h) && (clearInterval(k), c(h))
                }, 4)
            }
        }

        function bf(a, b, c, d) {
            var e = a.__AMP_CSS_SM;
            e || (e = a.__AMP_CSS_SM = I());
            var g = !c && d && "amp-custom" != d && "amp-keyframes" != d,
                h = c ? "amp-runtime" : g ? "amp-extension=" + d : null;
            if (h) {
                var l = ef(a, e, h);
                if (l) return l.textContent !== b && (l.textContent = b), l
            }
            var k = (a.ownerDocument || a).createElement("style");
            k.textContent = b;
            var n = null;
            c ? k.setAttribute("amp-runtime", "") : g ? (k.setAttribute("amp-extension", d || ""), n = ef(a, e, "amp-runtime")) : (d && k.setAttribute(d, ""), n = a.lastChild);
            b = n;
            (b = void 0 === b ? null : b) ? a.insertBefore(k, b.nextSibling):
                a.insertBefore(k, a.firstChild);
            h && (e[h] = k);
            return k
        }

        function ef(a, b, c) {
            return b[c] ? b[c] : (a = a.querySelector("style[" + c + "]")) ? b[c] = a : null
        }

        function cf(a, b) {
            return (a = a.__AMP_CSS_TR) ? a(b) : b
        }
        var ff = !1;

        function gf() {
            var a = self.document,
                b = a.defaultView;
            wb(a).then(function() {
                return Ze(b)
            }).catch(function(a) {
                hb(a);
                return []
            }).then(function(c) {
                ff = !0;
                hf(a);
                Xc(a).signals().signal("render-start");
                0 < c.length && vd(a.documentElement).schedulePass(1, !0);
                try {
                    var d = T(b, "performance");
                    d.tick("mbv");
                    d.flush()
                } catch (e) {}
            })
        }

        function jf(a) {
            ff || (ff = !0, hf(a))
        }

        function hf(a) {
            re(a.body, {
                opacity: 1,
                visibility: "visible",
                animation: "none"
            })
        }

        function df(a, b) {
            var c = a.styleSheets;
            for (a = 0; a < c.length; a++)
                if (c[a].ownerNode == b) return !0;
            return !1
        };
        var kf = {
            composed: !1
        };

        function lf(a) {
            return "none" != Xe() && Node.prototype.getRootNode ? a.getRootNode(kf) : Db(a, function(a) {
                return Bb(a)
            })
        };

        function mf(a) {
            var b = a.match(/^(.*)\/(.*)-([0-9.]+|latest)(\.max)?\.(?:js|mjs)$/i);
            return {
                extensionId: b ? b[2] : void 0,
                extensionVersion: b ? b[3] : void 0
            }
        };
        var nf = "html{overflow-x:hidden!important}html.i-amphtml-fie{height:100%!important;width:100%!important}html:not([amp4ads]),html:not([amp4ads]) body{height:auto!important}html:not([amp4ads]) body{margin:0!important}body{-webkit-text-size-adjust:100%;-moz-text-size-adjust:100%;-ms-text-size-adjust:100%;text-size-adjust:100%}html.i-amphtml-singledoc.i-amphtml-embedded{-ms-touch-action:pan-y;touch-action:pan-y}html.i-amphtml-fie>body,html.i-amphtml-singledoc>body{overflow:visible!important}html.i-amphtml-fie:not(.i-amphtml-inabox)>body,html.i-amphtml-singledoc:not(.i-amphtml-inabox)>body{position:relative!important}html.i-amphtml-webview>body{overflow-x:hidden!important;overflow-y:visible!important;min-height:100vh!important}html.i-amphtml-ios-embed-legacy>body{overflow-x:hidden!important;overflow-y:auto!important;position:absolute!important}html.i-amphtml-ios-embed{overflow-y:auto!important;position:static}#i-amphtml-wrapper{overflow-x:hidden!important;overflow-y:auto!important;position:absolute!important;top:0!important;left:0!important;right:0!important;bottom:0!important;margin:0!important;display:block!important}html.i-amphtml-ios-embed.i-amphtml-ios-overscroll,html.i-amphtml-ios-embed.i-amphtml-ios-overscroll>#i-amphtml-wrapper{-webkit-overflow-scrolling:touch!important}#i-amphtml-wrapper>body{position:relative!important;border-top:1px solid transparent!important}#i-amphtml-wrapper+body{visibility:visible}#i-amphtml-wrapper+body .i-amphtml-lightbox-element,#i-amphtml-wrapper+body[i-amphtml-lightbox]{visibility:hidden}#i-amphtml-wrapper+body[i-amphtml-lightbox] .i-amphtml-lightbox-element{visibility:visible}#i-amphtml-wrapper.i-amphtml-scroll-disabled,.i-amphtml-scroll-disabled{overflow-x:hidden!important;overflow-y:hidden!important}amp-instagram{padding:54px 0px 0px!important;background-color:#fff}amp-iframe iframe{box-sizing:border-box!important}[amp-access][amp-access-hide]{display:none}[subscriptions-dialog],body:not(.i-amphtml-subs-ready) [subscriptions-action],body:not(.i-amphtml-subs-ready) [subscriptions-section]{display:none!important}amp-experiment,amp-live-list>[update],amp-share-tracking{display:none}.i-amphtml-jank-meter{position:fixed;background-color:rgba(232,72,95,0.5);bottom:0;right:0;color:#fff;font-size:16px;z-index:1000;padding:5px}amp-list[resizable-children]>.i-amphtml-loading-container.amp-hidden{display:none!important}amp-list [fetch-error],amp-list[load-more] [load-more-button],amp-list[load-more] [load-more-end],amp-list[load-more] [load-more-failed],amp-list[load-more] [load-more-loading]{display:none}amp-list[diffable] div[role=list]{display:block}amp-story-page,amp-story[standalone]{min-height:1px!important;display:block!important;height:100%!important;margin:0!important;padding:0!important;overflow:hidden!important;width:100%!important}amp-story[standalone]{background-color:#202125!important;position:relative!important}amp-story-page{background-color:#757575}amp-story .amp-active>div{display:none!important}amp-story-page:not(:first-of-type):not([distance]):not([active]){transform:translateY(1000vh)!important}amp-autocomplete{position:relative!important;display:inline-block!important}amp-autocomplete>input,amp-autocomplete>textarea{padding:0.5rem;border:1px solid rgba(0,0,0,0.33)}.i-amphtml-autocomplete-results,amp-autocomplete>input,amp-autocomplete>textarea{font-size:1rem;line-height:1.5rem}[amp-fx^=fly-in]{visibility:hidden}\n/*# sourceURL=/css/ampdoc.css*/";
        var of = "[hidden]{display:none!important}.i-amphtml-element{display:inline-block}.i-amphtml-blurry-placeholder{transition:opacity 0.3s cubic-bezier(0.0,0.0,0.2,1)!important;pointer-events:none}[layout=nodisplay]:not(.i-amphtml-element){display:none!important}.i-amphtml-layout-fixed,[layout=fixed][width][height]:not(.i-amphtml-layout-fixed){display:inline-block;position:relative}.i-amphtml-layout-responsive,[layout=responsive][width][height]:not(.i-amphtml-layout-responsive),[width][height][heights]:not([layout]):not(.i-amphtml-layout-responsive),[width][height][sizes]:not([layout]):not(.i-amphtml-layout-responsive){display:block;position:relative}.i-amphtml-layout-intrinsic,[layout=intrinsic][width][height]:not(.i-amphtml-layout-intrinsic){display:inline-block;position:relative;max-width:100%}.i-amphtml-layout-intrinsic .i-amphtml-sizer{max-width:100%}.i-amphtml-intrinsic-sizer{max-width:100%;display:block!important}.i-amphtml-layout-container,.i-amphtml-layout-fixed-height,[layout=container],[layout=fixed-height][height]:not(.i-amphtml-layout-fixed-height){display:block;position:relative}.i-amphtml-layout-fill,[layout=fill]:not(.i-amphtml-layout-fill){display:block;overflow:hidden!important;position:absolute;top:0;left:0;bottom:0;right:0}.i-amphtml-layout-flex-item,[layout=flex-item]:not(.i-amphtml-layout-flex-item){display:block;position:relative;-ms-flex:1 1 auto;flex:1 1 auto}.i-amphtml-layout-fluid{position:relative}.i-amphtml-layout-size-defined{overflow:hidden!important}.i-amphtml-layout-awaiting-size{position:absolute!important;top:auto!important;bottom:auto!important}i-amphtml-sizer{display:block!important}.i-amphtml-blurry-placeholder,.i-amphtml-fill-content{display:block;height:0;max-height:100%;max-width:100%;min-height:100%;min-width:100%;width:0;margin:auto}.i-amphtml-layout-size-defined .i-amphtml-fill-content{position:absolute;top:0;left:0;bottom:0;right:0}.i-amphtml-replaced-content,.i-amphtml-screen-reader{padding:0!important;border:none!important}.i-amphtml-screen-reader{position:fixed!important;top:0px!important;left:0px!important;width:4px!important;height:4px!important;opacity:0!important;overflow:hidden!important;margin:0!important;display:block!important;visibility:visible!important}.i-amphtml-screen-reader~.i-amphtml-screen-reader{left:8px!important}.i-amphtml-screen-reader~.i-amphtml-screen-reader~.i-amphtml-screen-reader{left:12px!important}.i-amphtml-screen-reader~.i-amphtml-screen-reader~.i-amphtml-screen-reader~.i-amphtml-screen-reader{left:16px!important}.i-amphtml-unresolved{position:relative;overflow:hidden!important}.i-amphtml-select-disabled{-webkit-user-select:none!important;-moz-user-select:none!important;-ms-user-select:none!important;user-select:none!important}.i-amphtml-notbuilt,[layout]:not(.i-amphtml-element),[width][height][heights]:not([layout]):not(.i-amphtml-element),[width][height][sizes]:not([layout]):not(.i-amphtml-element){position:relative;overflow:hidden!important;color:transparent!important}.i-amphtml-notbuilt:not(.i-amphtml-layout-container)>*,[layout]:not([layout=container]):not(.i-amphtml-element)>*,[width][height][heights]:not([layout]):not(.i-amphtml-element)>*,[width][height][sizes]:not([layout]):not(.i-amphtml-element)>*{display:none}.i-amphtml-ghost{visibility:hidden!important}.i-amphtml-element>[placeholder],[layout]:not(.i-amphtml-element)>[placeholder],[width][height][heights]:not([layout]):not(.i-amphtml-element)>[placeholder],[width][height][sizes]:not([layout]):not(.i-amphtml-element)>[placeholder]{display:block}.i-amphtml-element>[placeholder].amp-hidden,.i-amphtml-element>[placeholder].hidden{visibility:hidden}.i-amphtml-element:not(.amp-notsupported)>[fallback],.i-amphtml-layout-container>[placeholder].amp-hidden,.i-amphtml-layout-container>[placeholder].hidden{display:none}.i-amphtml-layout-size-defined>[fallback],.i-amphtml-layout-size-defined>[placeholder]{position:absolute!important;top:0!important;left:0!important;right:0!important;bottom:0!important;z-index:1}.i-amphtml-notbuilt>[placeholder]{display:block!important}.i-amphtml-hidden-by-media-query{display:none!important}.i-amphtml-element-error{background:red!important;color:#fff!important;position:relative!important}.i-amphtml-element-error:before{content:attr(error-message)}i-amp-scroll-container,i-amphtml-scroll-container{position:absolute;top:0;left:0;right:0;bottom:0;display:block}i-amp-scroll-container.amp-active,i-amphtml-scroll-container.amp-active{overflow:auto;-webkit-overflow-scrolling:touch}.i-amphtml-loading-container{display:block!important;pointer-events:none;z-index:1}.i-amphtml-notbuilt>.i-amphtml-loading-container{display:block!important}.i-amphtml-loading-container.amp-hidden{visibility:hidden}.i-amphtml-element>[overflow]{cursor:pointer;position:relative;z-index:2;visibility:hidden;display:initial}.i-amphtml-element>[overflow].amp-visible{visibility:visible}template{display:none!important}.amp-border-box,.amp-border-box *,.amp-border-box :after,.amp-border-box :before{box-sizing:border-box}amp-pixel{display:none!important}amp-analytics,amp-story-auto-ads{position:fixed!important;top:0!important;width:1px!important;height:1px!important;overflow:hidden!important;visibility:hidden}html.i-amphtml-fie>amp-analytics{position:initial!important}[visible-when-invalid]:not(.visible),form [submit-error],form [submit-success],form [submitting]{display:none}amp-accordion{display:block!important}amp-accordion>section{float:none!important}amp-accordion>section>*{float:none!important;display:block!important;overflow:hidden!important;position:relative!important}amp-accordion,amp-accordion>section{margin:0}amp-accordion>section>:last-child{display:none!important}amp-accordion>section[expanded]>:last-child{display:block!important}\n/*# sourceURL=/css/ampshared.css*/";

        function pf(a, b, c) {
            function d(d) {
                h = null;
                g = a.setTimeout(e, c);
                b.apply(null, d)
            }

            function e() {
                g = 0;
                h && d(h)
            }
            var g = 0,
                h = null;
            return function(a) {
                for (var b = [], c = 0; c < arguments.length; ++c) b[c - 0] = arguments[c];
                g ? h = b : d(b)
            }
        }

        function qf(a, b) {
            function c() {
                d = 0;
                var h = 300 - (a.Date.now() - e);
                if (0 < h) d = a.setTimeout(c, h);
                else {
                    var l = g;
                    g = null;
                    b.apply(null, l)
                }
            }
            var d = 0,
                e = 0,
                g = null;
            return function(b) {
                for (var h = [], k = 0; k < arguments.length; ++k) h[k - 0] = arguments[k];
                e = a.Date.now();
                g = h;
                d || (d = a.setTimeout(c, 300))
            }
        };

        function rf(a, b) {
            var c = b.documentElement;
            return a.some(function(a) {
                return c.hasAttribute(a)
            })
        };

        function sf() {
            var a = tf();
            return function(b) {
                return setTimeout(b, a())
            }
        }

        function tf() {
            var a = 0;
            return function() {
                var b = Math.pow(1.5, a++);
                var c = b * (c || .3) * Math.random();
                .5 < Math.random() && (c *= -1);
                b += c;
                return 1E3 * b
            }
        };

        function uf(a, b) {
            md(a, "amp-analytics-instrumentation", "amp-analytics").then(function(c) {
                c && c.triggerEventForTarget(a, "user-error", b)
            })
        };
        var vf = self.__AMP_ERRORS || [];
        self.__AMP_ERRORS = vf;

        function wf(a) {
            wf = sf();
            return wf(a)
        }

        function xf(a) {
            try {
                return JSON.stringify(a)
            } catch (b) {
                return String(a)
            }
        }
        var yf;

        function zf(a, b) {
            try {
                if (a)
                    if (void 0 !== a.message) a = fb(a);
                    else {
                        var c = a;
                        a = Error(xf(c));
                        a.origError = c
                    }
                else a = Error("Unknown error");
                if (a.reported) return a;
                a.reported = !0;
                var d = b || a.associatedElement;
                d && d.classList && (d.classList.add("i-amphtml-error"), v().development && (d.classList.add("i-amphtml-element-error"), d.setAttribute("error-message", a.message)));
                if (self.console) {
                    var e = console.error || console.log;
                    a.messageArray ? e.apply(console, a.messageArray) : d ? e.call(console, a.message, d) : e.call(console, a.message)
                }
                d &&
                    d.Ca && d.Ca("amp:error", a.message);
                Af.call(void 0, void 0, void 0, void 0, void 0, a)
            } catch (g) {
                setTimeout(function() {
                    throw g;
                })
            }
            return a
        }

        function Bf(a) {
            return a ? "string" == typeof a ? N(a, "BLOCK_BY_CONSENT") : "string" == typeof a.message ? N(a.message, "BLOCK_BY_CONSENT") : !1 : !1
        }

        function Cf() {
            var a = self;
            a.onerror = Af;
            a.addEventListener("unhandledrejection", function(a) {
                !a.reason || "CANCELLED" !== a.reason.message && "BLOCK_BY_CONSENT" !== a.reason.message && "AbortError" !== a.reason.message ? zf(a.reason || Error("rejected promise " + a)) : a.preventDefault()
            })
        }

        function Af(a, b, c, d, e) {
            var g = this;
            !this || !this.document || e && e.expected || jf(this.document);
            if (!v().development) {
                var h = !1;
                try {
                    h = Df()
                } catch (k) {}
                if (!(h && .01 < Math.random())) {
                    var l = Ef(a, b, c, d, e, h);
                    l && wf(function() {
                        try {
                            return Ff(g, l).catch(function() {})
                        } catch (k) {}
                    })
                }
            }
        }

        function Ff(a, b) {
            return b.pt && .9 > Math.random() ? x() : Gf(a, b).then(function(a) {
                if (!a) {
                    var c = new XMLHttpRequest;
                    c.open("POST", .1 > Math.random() ? B.betaErrorReporting : B.errorReporting, !0);
                    c.send(JSON.stringify(b))
                }
            })
        }

        function Gf(a, b) {
            a = rd(a);
            if (!a.isSingleDoc()) return Promise.resolve(!1);
            var c = a.getSingleDoc();
            if (!c.getRootNode().documentElement.hasAttribute("report-errors-to-viewer")) return Promise.resolve(!1);
            var d = W(c);
            return d.hasCapability("errorReporter") ? d.isTrustedViewer().then(function(a) {
                if (!a) return !1;
                d.sendMessage("error", K({
                    m: b.m,
                    a: b.a,
                    s: b.s,
                    el: b.el,
                    ex: b.ex,
                    v: b.v,
                    pt: b.pt,
                    jse: b.jse
                }));
                return !0
            }) : Promise.resolve(!1)
        }

        function Ef(a, b, c, d, e, g) {
            var h = a;
            e && (h = e.message ? e.message : String(e));
            h || (h = "Unknown error");
            a = h;
            var l = !(!e || !e.expected);
            if (!/_reported_/.test(a) && "CANCELLED" != a) {
                var k = !(self && self.window),
                    n = Math.random();
                if (-1 != a.indexOf("Failed to load:") || "Script error." == a || k)
                    if (l = !0, .001 < n) return;
                var r = Ua(a);
                if (!(r && .1 < n)) {
                    h = Object.create(null);
                    h.v = v().rtvVersion;
                    h.noAmp = g ? "1" : "0";
                    h.m = a.replace("\u200b\u200b\u200b", "");
                    h.a = r ? "1" : "0";
                    h.ex = l ? "1" : "0";
                    h.dw = k ? "1" : "0";
                    var u = "1p";
                    self.context && self.context.location ?
                        (h["3p"] = "1", u = "3p") : v().runtime && (u = v().runtime);
                    h.rt = u;
                    "inabox" === u && (h.adid = v().a4aId);
                    g = self;
                    h.ca = g.AMP_CONFIG && g.AMP_CONFIG.canary ? "1" : "0";
                    g = self;
                    h.bt = g.AMP_CONFIG && g.AMP_CONFIG.type ? g.AMP_CONFIG.type : "unknown";
                    self.location.ancestorOrigins && self.location.ancestorOrigins[0] && (h.or = self.location.ancestorOrigins[0]);
                    self.viewerState && (h.vs = self.viewerState);
                    self.parent && self.parent != self && (h.iem = "1");
                    if (self.AMP && self.AMP.viewer) {
                        var w = self.AMP.viewer.getResolvedViewerUrl(),
                            z = self.AMP.viewer.maybeGetMessagingOrigin();
                        w && (h.rvu = w);
                        z && (h.mso = z)
                    }
                    yf || (yf = Hf());
                    h.jse = yf;
                    var q = [];
                    g = self.__AMP__EXPERIMENT_TOGGLES || null;
                    for (var p in g) q.push(p + "=" + (g[p] ? "1" : "0"));
                    h.exps = q.join(",");
                    e ? (h.el = e.associatedElement ? e.associatedElement.tagName : "u", e.args && (h.args = JSON.stringify(e.args)), r || e.ignoreStack || !e.stack || (h.s = e.stack), e.message && (e.message += " _reported_")) : (h.f = b || "", h.l = c || "", h.c = d || "");
                    h.r = self.document ? self.document.referrer : "";
                    h.ae = vf.join(",");
                    h.fr = self.location.originalHash || self.location.hash;
                    "production" ===
                    h.bt && (h.pt = "1");
                    b = a;
                    25 <= vf.length && vf.splice(0, vf.length - 25 + 1);
                    vf.push(b);
                    return h
                }
            }
        }

        function Df() {
            var a = self;
            if (!a.document) return !1;
            a = a.document.querySelectorAll("script[src]");
            for (var b = 0; b < a.length; b++)
                if (!P(a[b].src.toLowerCase())) return !0;
            return !1
        }

        function Hf() {
            function a() {}
            a.prototype.t = function() {
                throw Error("message");
            };
            var b = new a;
            try {
                b.t()
            } catch (d) {
                b = d.stack;
                if (N(b, "t@")) return "Safari";
                if (-1 < b.indexOf(".prototype.t@")) return "Firefox";
                var c = b.split("\n").pop();
                if (/\bat .* \(/i.test(c)) return "IE";
                if (N(b, "Error: message")) return "Chrome"
            }
            return "unknown"
        };
        var If = "__AMP_ACTION_MAP__" + Math.random(),
            Jf = {
                form: ["submit", "clear"]
            },
            Kf = [{
                tagOrTarget: "AMP",
                method: "setState"
            }, {
                tagOrTarget: "*",
                method: "focus"
            }, {
                tagOrTarget: "*",
                method: "hide"
            }, {
                tagOrTarget: "*",
                method: "show"
            }, {
                tagOrTarget: "*",
                method: "toggleClass"
            }, {
                tagOrTarget: "*",
                method: "toggleVisibility"
            }],
            Lf = {
                button: !0,
                checkbox: !0,
                link: !0,
                listbox: !0,
                menuitem: !0,
                menuitemcheckbox: !0,
                menuitemradio: !0,
                option: !0,
                radio: !0,
                scrollbar: !0,
                slider: !0,
                spinbutton: !0,
                "switch": !0,
                tab: !0,
                treeitem: !0
            };

        function Mf(a, b, c, d, e, g, h, l, k, n) {
            l = void 0 === l ? "?" : l;
            k = void 0 === k ? null : k;
            n = void 0 === n ? Math.random() : n;
            this.node = a;
            this.method = b;
            this.args = c;
            this.source = d;
            this.caller = e;
            this.event = g;
            this.trust = h;
            this.actionEventType = l;
            this.tagOrTarget = k || a.tagName;
            this.sequenceId = n
        }
        Mf.prototype.satisfiesTrust = function(a) {
            if (!Oa(this.trust)) return E().error("Action", "Invalid trust for '" + this.method + "': " + this.trust), !1;
            if (this.trust < a) {
                a: switch (this.trust) {
                    case 1:
                        var b = "low";
                        break a;
                    case 3:
                        b = "high";
                        break a;
                    default:
                        b = "default"
                }
                C().error("Action", '"' + this.actionEventType + '" event with "' + b + '" trust is not allowed to invoke "' + (this.tagOrTarget.toLowerCase() + "." + this.method + '".'));
                return !1
            }
            return !0
        };

        function Nf(a, b) {
            this.ampdoc = a;
            this.W = b || a.getRootNode();
            this.ka = (this.Ff = this.ampdoc.isSingleDoc() && rf(["\u26a14email", "amp4email"], this.W)) ? Kf : null;
            this.Ld = I();
            this.xf = I();
            this.addEvent("tap");
            this.addEvent("submit");
            this.addEvent("change");
            this.addEvent("input-debounced");
            this.addEvent("input-throttled");
            this.addEvent("valid");
            this.addEvent("invalid")
        }
        Nf.installInEmbedWindow = function(a, b) {
            Zc(a, "action", new Nf(b, a.document))
        };
        f = Nf.prototype;
        f.addEvent = function(a) {
            var b = this;
            if ("tap" == a) this.W.addEventListener("click", function(c) {
                c.defaultPrevented || b.trigger(c.target, a, c, 3)
            }), this.W.addEventListener("keydown", function(c) {
                var d = c.key,
                    e = c.target;
                if ("Enter" == d || " " == d) {
                    var l = e.getAttribute("role");
                    if (d = l) d = l.toLowerCase(), d = lb.call(Lf, d);
                    var k = d;
                    !c.defaultPrevented && k && b.trigger(e, a, c, 3) && c.preventDefault()
                }
            });
            else if ("submit" == a) this.W.addEventListener(a, function(c) {
                b.trigger(c.target, a, c, 3)
            });
            else if ("change" == a) this.W.addEventListener(a,
                function(c) {
                    var d = c.target;
                    Of(c);
                    b.trigger(d, a, c, 3)
                });
            else if ("input-debounced" == a) {
                var c = qf(this.ampdoc.win, function(c) {
                    b.trigger(c.target, a, c, 3)
                });
                this.W.addEventListener("input", function(a) {
                    var b = new Pf(a);
                    Of(b);
                    c(b)
                })
            } else if ("input-throttled" == a) {
                var d = pf(this.ampdoc.win, function(c) {
                    b.trigger(c.target, a, c, 3)
                }, 100);
                this.W.addEventListener("input", function(a) {
                    a = new Pf(a);
                    Of(a);
                    d(a)
                })
            } else "valid" != a && "invalid" != a || this.W.addEventListener(a, function(c) {
                b.trigger(c.target, a, c, 3)
            })
        };
        f.addGlobalTarget = function(a, b) {
            this.Ld[a] = b
        };
        f.addGlobalMethodHandler = function(a, b, c) {
            this.xf[a] = {
                handler: b,
                minTrust: void 0 === c ? 2 : c
            }
        };
        f.trigger = function(a, b, c, d, e) {
            return Qf(this, a, b, c, d, e)
        };
        f.execute = function(a, b, c, d, e, g, h) {
            a = new Mf(a, b, c, d, e, g, h);
            Rf(this, a)
        };
        f.installActionHandler = function(a, b) {
            "amp-" === (a.getAttribute("id") || "").substring(0, 4) || a.tagName.toLowerCase();
            if (a.__AMP_ACTION_HANDLER__) E().error("Action", "Action handler already installed for " + a);
            else {
                a.__AMP_ACTION_HANDLER__ = b;
                var c = a.__AMP_ACTION_QUEUE__;
                y(c) && V(a.ownerDocument.defaultView).delay(function() {
                    c.forEach(function(a) {
                        try {
                            b(a)
                        } catch (e) {
                            E().error("Action", "Action execution failed:", a, e)
                        }
                    });
                    a.__AMP_ACTION_QUEUE__.length = 0
                }, 1)
            }
        };
        f.hasAction = function(a, b, c) {
            return !!Sf(a, b, c)
        };
        f.hasResolvableAction = function(a, b, c) {
            var d = this,
                e = Sf(a, b, c);
            return e ? e.actionInfos.some(function(a) {
                return !!Tf(d, a.target)
            }) : !1
        };
        f.hasResolvableActionForTarget = function(a, b, c, d) {
            var e = this;
            return (a = Sf(a, b, d)) ? a.actionInfos.some(function(a) {
                return Tf(e, a.target) == c
            }) : !1
        };

        function Tf(a, b) {
            return a.Ld[b] ? a.W : a.W.getElementById(b)
        }
        f.setAllowlist = function(a) {
            a.every(function(a) {
                return a.tagOrTarget && a.method
            });
            this.ka = a
        };
        f.addToAllowlist = function(a, b, c) {
            var d = this;
            c && c.includes("email") !== this.Ff || (this.ka || (this.ka = []), y(b) || (b = [b]), b.forEach(function(b) {
                d.ka.some(function(c) {
                    return c.tagOrTarget == a && c.method == b
                }) || d.ka.push({
                    tagOrTarget: a,
                    method: b
                })
            }))
        };

        function Qf(a, b, c, d, e, g) {
            var h = Sf(b, c);
            if (!h) return !1;
            var l = Math.random(),
                k = null;
            h.actionInfos.forEach(function(n) {
                function r() {
                    var g = Tf(a, u);
                    if (g) return g = new Mf(g, w, q, b, h.node, d, e, c, g.tagName || u, l), Rf(a, g);
                    a.La('Target "' + u + '" not found for action [' + z + "].")
                }
                var u = n.target,
                    w = n.method,
                    z = n.str,
                    q = Uf(n.args, d, g);
                k = k ? k.then(r) : r()
            });
            return 1 <= h.actionInfos.length
        }
        f.La = function(a, b) {
            if (b) throw a = C().createError("[Action] " + a), zf(a, b), a;
            C().error("Action", a)
        };

        function Rf(a, b) {
            var c = b.method,
                d = b.tagOrTarget;
            if (a.ka && !Vf(b, a.ka)) return a.La('"' + d + "." + c + '" is not allowlisted ' + JSON.stringify(a.ka) + "."), null;
            var e = a.Ld[d];
            if (e) return e(b);
            var g = b.node,
                h = a.xf[c];
            if (h && b.satisfiesTrust(h.minTrust)) return h.handler(b);
            var l = g.tagName.toLowerCase();
            if ("amp-" === l.substring(0, 4)) return g.enqueAction ? g.enqueAction(b) : a.La('Unrecognized AMP element "' + l + '".', g), null;
            var k = Jf[l];
            if ("amp-" === (g.getAttribute("id") || "").substring(0, 4) || k && -1 < k.indexOf(c)) return (a = g.__AMP_ACTION_HANDLER__) ?
                a(b) : (g.__AMP_ACTION_QUEUE__ = g.__AMP_ACTION_QUEUE__ || [], g.__AMP_ACTION_QUEUE__.push(b)), null;
            a.La("Target (" + d + ") doesn't support \"" + c + '" action.', b.caller);
            return null
        }

        function Sf(a, b, c) {
            for (; a && (!c || a != c);) {
                var d = b;
                var e = a;
                var g = d,
                    h = e[If];
                void 0 === h && (h = null, e.hasAttribute("on") ? (g = e.getAttribute("on"), h = Wf(g, e), e[If] = h) : e.hasAttribute("execute") && (h = e.getAttribute("execute"), h = Wf(g + ":" + h, e), e[If] = h));
                var l = (e = h) ? e[d] || null : null;
                if (l && !a.disabled && !Fb(a, ":disabled")) return {
                    node: a,
                    actionInfos: l
                };
                a = a.parentElement
            }
            return null
        }
        f.setActions = function(a, b) {
            a.setAttribute("on", b);
            delete a[If]
        };

        function Of(a) {
            var b = I(),
                c = a.target;
            void 0 !== c.value && (b.value = c.value);
            "INPUT" == c.tagName && (b.valueAsNumber = Number(c.value));
            void 0 !== c.checked && (b.checked = c.checked);
            if (void 0 !== c.min || void 0 !== c.max) b.min = c.min, b.max = c.max;
            c.files && (b.files = Ma(c.files).map(function(a) {
                return {
                    name: a.name,
                    size: a.size,
                    type: a.type
                }
            }));
            0 < Object.keys(b).length && (a.detail = b)
        }

        function Vf(a, b) {
            var c = a.method,
                d = a.node;
            a = a.tagOrTarget;
            "activate" === c && "function" == typeof d.getDefaultActionAlias && (c = d.getDefaultActionAlias());
            var e = c.toLowerCase(),
                g = a.toLowerCase();
            return b.some(function(a) {
                return a.tagOrTarget.toLowerCase() !== g && "*" !== a.tagOrTarget || a.method.toLowerCase() !== e ? !1 : !0
            })
        }

        function Pf(a) {
            this.detail = null;
            var b = this || I(),
                c;
            for (c in a) b[c] = "function" === typeof a[c] ? Xf : a[c]
        }

        function Xf() {}

        function Wf(a, b) {
            var c = Yf.bind(null, a, b),
                d = Zf.bind(null, a, b);
            b = null;
            var e = new $f(a);
            do {
                var g = e.next();
                if (g.type != ag && (g.type != bg || ";" != g.value))
                    if (g.type == cg || g.type == dg) {
                        var h = g.value;
                        d(e.next(), [bg], ":");
                        var l = [];
                        do {
                            var k = d(e.next(), [cg, dg]).value,
                                n = "activate",
                                r = null;
                            var u = e.peek();
                            if (u.type == bg && "." == u.value && (e.next(), n = d(e.next(), [cg, dg]).value || n, u = e.peek(), u.type == bg && "(" == u.value)) {
                                e.next();
                                r = e;
                                var w = d,
                                    z = c,
                                    q = r.peek(),
                                    p = null;
                                if (q.type == eg) {
                                    p = I();
                                    var M = r.next().value;
                                    p.__AMP_OBJECT_STRING__ =
                                        M;
                                    w(r.next(), [bg], ")")
                                } else {
                                    do {
                                        var H = M = r.next();
                                        q = H.type;
                                        H = H.value;
                                        if (q != bg || "," != H && ")" != H)
                                            if (q == cg || q == dg) {
                                                w(r.next(), [bg], "=");
                                                M = w(r.next(!0), [cg, dg]);
                                                var la = [M];
                                                if (M.type == dg)
                                                    for (q = r.peek(); q.type == bg && "." == q.value; q = r.peek()) r.next(), M = w(r.next(!1), [dg]), la.push(M);
                                                q = fg(la);
                                                p || (p = I());
                                                p[H] = q;
                                                q = r.peek();
                                                z(q.type == bg && ("," == q.value || ")" == q.value), "Expected either [,] or [)]")
                                            } else z(!1, "; unexpected token [" + (M.value || "") + "]")
                                    } while (M.type != bg || ")" != M.value)
                                }
                                r = p
                            }
                            l.push({
                                event: h,
                                target: k,
                                method: n,
                                args: r,
                                str: a
                            });
                            u = e.peek()
                        } while (u.type == bg && "," == u.value && e.next());
                        b || (b = I());
                        b[h] = l
                    } else c(!1, "; unexpected token [" + (g.value || "") + "]")
            } while (g.type != ag);
            return b
        }

        function fg(a) {
            return 0 == a.length ? null : 1 == a.length ? a[0].value : {
                expression: a.map(function(a) {
                    return a.value
                }).join(".")
            }
        }

        function Uf(a, b, c) {
            if (!a) return a;
            var d = c || K({});
            b && (b = b.detail) && (d.event = b);
            var e = I();
            Object.keys(a).forEach(function(b) {
                var c = a[b];
                if ("object" == typeof c && c.expression) {
                    c = c.expression;
                    if ("." == c) c = d;
                    else {
                        c = c.split(".");
                        for (var g = d, k = 0; k < c.length; k++) {
                            var n = c[k];
                            if (n && g && void 0 !== g[n] && Rb(g, n)) g = g[n];
                            else {
                                g = void 0;
                                break
                            }
                        }
                        c = g
                    }
                    var r = c;
                    c = void 0 === r ? null : r
                }
                e[b] = d[c] ? d[c] : c
            });
            return e
        }

        function Yf(a, b, c, d) {
            return F(c, "Invalid action definition in %s: [%s] %s", b, a, d || "")
        }

        function Zf(a, b, c, d, e) {
            void 0 !== e ? Yf(a, b, d.includes(c.type) && c.value == e, "; expected [" + e + "]") : Yf(a, b, d.includes(c.type));
            return c
        }
        var ag = 1,
            bg = 2,
            cg = 3,
            dg = 4,
            eg = 5;

        function $f(a) {
            this.M = a;
            this.Pd = -1
        }
        $f.prototype.next = function(a) {
            var b = gg(this, a || !1);
            this.Pd = b.index;
            return b
        };
        $f.prototype.peek = function(a) {
            return gg(this, a || !1)
        };

        function gg(a, b) {
            var c = a.Pd + 1;
            if (c >= a.M.length) return {
                type: ag,
                index: a.Pd
            };
            var d = a.M.charAt(c);
            if (-1 != " \t\n\r\f\v\u00a0\u2028\u2029".indexOf(d)) {
                for (c++; c < a.M.length && -1 != " \t\n\r\f\v\u00a0\u2028\u2029".indexOf(a.M.charAt(c)); c++);
                if (c >= a.M.length) return {
                    type: ag,
                    index: c
                };
                d = a.M.charAt(c)
            }
            if (b && (hg(d) || "." == d && c + 1 < a.M.length && hg(a.M[c + 1]))) {
                for (var e = "." == d, g = c + 1; g < a.M.length; g++) {
                    var h = a.M.charAt(g);
                    if ("." == h) e = !0;
                    else if (!hg(h)) break
                }
                a = a.M.substring(c, g);
                a = e ? parseFloat(a) : parseInt(a, 10);
                c = g - 1;
                return {
                    type: cg,
                    value: a,
                    index: c
                }
            }
            if (-1 != ";:.()=,|!".indexOf(d)) return {
                type: bg,
                value: d,
                index: c
            };
            if (-1 != "\"'".indexOf(d)) {
                g = -1;
                for (var l = c + 1; l < a.M.length; l++)
                    if (a.M.charAt(l) == d) {
                        g = l;
                        break
                    } if (-1 == g) return {
                    type: 0,
                    index: c
                };
                a = a.M.substring(c + 1, g);
                c = g;
                return {
                    type: cg,
                    value: a,
                    index: c
                }
            }
            if ("{" == d) {
                var k = 1;
                g = -1;
                for (d = c + 1; d < a.M.length; d++) {
                    var n = a.M[d];
                    "{" == n ? k++ : "}" == n && k--;
                    if (0 >= k) {
                        g = d;
                        break
                    }
                }
                if (-1 == g) return {
                    type: 0,
                    index: c
                };
                a = a.M.substring(c, g + 1);
                c = g;
                return {
                    type: eg,
                    value: a,
                    index: c
                }
            }
            for (g = c + 1; g < a.M.length && -1 == " \t\n\r\f\x0B\u00a0\u2028\u2029;:.()=,|!\"'{}".indexOf(a.M.charAt(g)); g++);
            a = a.M.substring(c, g);
            c = g - 1;
            return !b || "true" != a && "false" != a ? hg(a.charAt(0)) ? {
                type: cg,
                value: a,
                index: c
            } : {
                type: dg,
                value: a,
                index: c
            } : {
                type: cg,
                value: "true" == a,
                index: c
            }
        }

        function hg(a) {
            return "0" <= a && "9" >= a
        };

        function ig(a, b) {
            for (var c = [], d = 0, e = 0; e < a.length; e++) {
                var g = a[e];
                b(g, e, a) ? c.push(g) : (d < e && (a[d] = g), d++)
            }
            d < a.length && (a.length = d);
            return c
        }

        function jg(a, b) {
            for (var c = 0; c < a.length; c++)
                if (b(a[c], c, a)) return c;
            return -1
        };

        function kg(a) {
            return !!a && "function" == typeof a.getFormData
        };
        var lg = ["GET", "POST"],
            mg = [y, Na];

        function ng(a, b) {
            var c = Object.assign({}, b);
            if (kg(b.body)) {
                var d = b.body;
                c.headers["Content-Type"] = "multipart/form-data;charset=utf-8";
                b = d.entries();
                for (var e = [], g = b.next(); !g.done; g = b.next()) e.push(g.value);
                c.body = e
            }
            return {
                input: a,
                init: c
            }
        }

        function og(a, b) {
            F(Na(a), "Object expected: %s", a);
            if ("document" != b) return new Response(a.body, a.init);
            var c = I(),
                d = {
                    status: 200,
                    statusText: "OK",
                    getResponseHeader: function(a) {
                        return c[String(a).toLowerCase()] || null
                    }
                };
            if (a.init) {
                var e = a.init;
                y(e.headers) && e.headers.forEach(function(a) {
                    var b = a[1];
                    c[String(a[0]).toLowerCase()] = String(b)
                });
                e.status && (d.status = parseInt(e.status, 10));
                e.statusText && (d.statusText = String(e.statusText))
            }
            return new Response(a.body ? String(a.body) : "", d)
        }

        function pg(a, b, c, d) {
            if (!b) return x();
            var e = d.prerenderSafe ? x() : b.whenFirstVisible(),
                g = W(b),
                h = P(c),
                l = g.hasCapability("xhrInterceptor"),
                k = d.bypassInterceptorForDev && !1;
            return h || !l || k || !b.getRootNode().documentElement.hasAttribute("allow-xhr-interception") ? e : e.then(function() {
                return g.isTrustedViewer()
            }).then(function(b) {
                if (b || Q(a, "untrusted-xhr-interception")) {
                    var e = K({
                        originalRequest: ng(c, d)
                    });
                    return g.sendMessageAwaitResponse("xhr", e).then(function(a) {
                        return og(a, d.responseType)
                    })
                }
            })
        }

        function qg(a, b, c) {
            !1 !== c.ampCors && (b = Kc(a, b));
            return b
        }

        function rg(a, b) {
            a = a || {};
            var c = a.method;
            void 0 === c ? c = "GET" : (c = c.toUpperCase(), lg.includes(c));
            a.method = c;
            a.headers = a.headers || K({});
            b && (a.headers.Accept = b);
            return a
        }

        function sg(a, b, c) {
            c = c || {};
            var d = a.origin || O(a.location.href).origin;
            a = O(b).origin;
            d == a && (c.headers = c.headers || {}, c.headers["AMP-Same-Origin"] = "true");
            return c
        }

        function tg(a) {
            var b = rg(a, "application/json");
            "POST" != b.method || kg(b.body) || (mg.some(function(a) {
                return a(b.body)
            }), b.headers["Content-Type"] = b.headers["Content-Type"] || "text/plain;charset=utf-8", b.body = "application/x-www-form-urlencoded" === b.headers["Content-Type"] ? Bc(b.body) : JSON.stringify(b.body));
            return b
        }

        function ug(a) {
            return new Promise(function(b) {
                if (a.ok) return b(a);
                b = a.status;
                var c = C().createError("HTTP error " + b);
                c.retriable = 415 == b || 500 <= b && 600 > b;
                c.response = a;
                throw c;
            })
        };

        function vg(a) {
            this.win = a;
            a = rd(a);
            this.Bg = a.isSingleDoc() ? a.getSingleDoc() : null
        }
        f = vg.prototype;
        f.Vg = function(a, b) {
            var c = arguments,
                d = this;
            return pg(this.win, this.Bg, a, b).then(function(a) {
                if (a) return a;
                kg(b.body) && (b.body = b.body.getFormData());
                return d.win.fetch.apply(null, c)
            })
        };

        function wg(a, b, c) {
            c = void 0 === c ? {} : c;
            b = qg(a.win, b, c);
            c = sg(a.win, b, c);
            return a.Vg(b, c).then(function(a) {
                return a
            }, function(a) {
                var c = O(b).origin;
                throw C().createExpectedError("XHR", "Failed fetching (" + c + "/...):", a && a.message);
            })
        }
        f.fetchJson = function(a, b) {
            return this.fetch(a, tg(b))
        };
        f.fetchText = function(a, b) {
            return this.fetch(a, rg(b, "text/plain"))
        };
        f.xssiJson = function(a, b) {
            return b ? a.text().then(function(a) {
                return N(a, b) ? Sb(a.slice(b.length)) : (C().warn("XHR", 'Failed to strip missing prefix "' + b + '" in fetch response.'), Sb(a))
            }) : a.json()
        };
        f.fetch = function(a, b) {
            b = rg(b);
            return wg(this, a, b).then(function(a) {
                return ug(a)
            })
        };
        f.sendSignal = function(a, b) {
            return wg(this, a, b).then(function(a) {
                return ug(a)
            })
        };
        f.getCorsUrl = function(a, b) {
            return Kc(a, b)
        };

        function xg(a) {
            vg.call(this, a);
            this.xb = I()
        }
        m(xg, vg);
        xg.prototype.fetch = function(a, b) {
            var c = this,
                d = !b || !b.method || "GET" === b.method,
                e = yg(this, a, b && b.headers && b.headers.Accept || ""),
                g = !!this.xb[e];
            if (d && g) return this.xb[e].then(function(a) {
                return a.clone()
            });
            var h = vg.prototype.fetch.call(this, a, b);
            d && (this.xb[e] = h.then(function(a) {
                delete c.xb[e];
                return a.clone()
            }, function(a) {
                delete c.xb[e];
                throw a;
            }));
            return h
        };

        function yg(a, b, c) {
            a = Jc(a.win.location);
            "string" == typeof a && (a = O(a));
            if ("function" == typeof URL) b = (new URL(b, a.href)).toString();
            else {
                "string" == typeof a && (a = O(a));
                b = b.replace(/\\/g, "/");
                var d = O(b);
                b = N(b.toLowerCase(), d.protocol) ? d.href : N(b, "//") ? a.protocol + b : N(b, "/") ? a.origin + b : a.origin + a.pathname.replace(/\/[^/]*$/, "/") + b
            }
            return Ec(b) + c
        };

        function zg(a, b) {
            var c = Ag(a);
            if (!c) return null;
            var d = c.split(";");
            for (a = 0; a < d.length; a++) {
                var e = d[a].trim(),
                    g = e.indexOf("="),
                    h;
                if (h = -1 != g) h = e.substring(0, g).trim(), h = ja(h, void 0) == b;
                if (h) return b = e.substring(g + 1).trim(), ja(b, b)
            }
            return null
        }

        function Ag(a) {
            try {
                return a.document.cookie
            } catch (b) {
                return ""
            }
        }

        function Bg(a, b, c, d) {
            var e = {
                highestAvailableDomain: !0
            };
            e = void 0 === e ? {} : e;
            if (e.allowOnProxyOrigin) F(!e.highestAvailableDomain, "Could not support highestAvailable Domain on proxy origin, specify domain explicitly");
            else {
                F(!P(a.location.href), "Should never attempt to set cookie on proxy origin: " + b);
                var g = O(a.location.href).hostname.toLowerCase(),
                    h = O(B.cdn).hostname.toLowerCase();
                F(!(g == h || rb(g, "." + h)), "Should never attempt to set cookie on proxy origin. (in depth check): " + b)
            }
            g = void 0;
            if (e.domain) g =
                e.domain;
            else if (e.highestAvailableDomain) a: if (g = a.document.head && a.document.head.querySelector("meta[name='amp-cookie-scope']")) g = g.getAttribute("content") || "", h = Jc(a.location.href), g = rb(h, "." + g) ? g : h.split("://")[1];
                else {
                    if (!P(a.location.href)) {
                        g = a.location.hostname.split(".");
                        h = g[g.length - 1];
                        var l;
                        for (l = "-test-amp-cookie-tmp"; zg(a, l);) l = "-test-amp-cookie-tmp0";
                        for (var k = g.length - 2; 0 <= k; k--)
                            if (h = g[k] + "." + h, Cg(a, l, "delete", Date.now() + 1E3, h), "delete" == zg(a, l)) {
                                Cg(a, l, "delete", Date.now() - 1E3, h);
                                g = h;
                                break a
                            }
                    }
                    g = null
                } Cg(a, b, c, d, g, e.sameSite, e.secure)
        }

        function Cg(a, b, c, d, e, g, h) {
            "ampproject.org" == e && (c = "delete", d = 0);
            b = encodeURIComponent(b) + "=" + encodeURIComponent(c) + "; path=/" + (e ? "; domain=" + e : "") + "; expires=" + (new Date(d)).toUTCString() + (g ? "; SameSite=" + g : "") + (h ? "; Secure" : "");
            try {
                a.document.cookie = b
            } catch (l) {}
        };

        function Dg(a) {
            this.w = a.win;
            this.R = V(this.w);
            this.Bd = {};
            var b = sd(a).canonicalUrl;
            this.Ad = b ? O(b).origin : null
        }
        Dg.prototype.getScopedCid = function(a, b) {
            var c = this;
            if (this.Bd[b]) return this.Bd[b];
            var d;
            return this.Bd[b] = this.R.poll(200, function() {
                d = zg(c.w, "AMP_TOKEN");
                return "$RETRIEVING" !== d
            }).then(function() {
                if ("$OPT_OUT" === d) return "$OPT_OUT";
                if (("$NOT_FOUND" !== d || !P(c.w.document.referrer)) && d && "$" === d[0]) return null;
                d && (!d || "$" !== d[0]) || Eg(c, "$RETRIEVING", 3E4);
                return c.wb("https://ampcid.google.com/v1/publisher:getClientId?key=" + a, b, d).then(function(e) {
                    var g = c.zf(e);
                    return !g && e.alternateUrl ? c.wb(e.alternateUrl +
                        "?key=" + a, b, d).then(c.zf.bind(c)) : g
                }).catch(function(a) {
                    Eg(c, "$ERROR", 3E4);
                    a && a.response ? a.response.json().then(function(a) {
                        E().error("GoogleCidApi", JSON.stringify(a))
                    }) : E().error("GoogleCidApi", a);
                    return null
                })
            })
        };
        Dg.prototype.wb = function(a, b, c) {
            b = K({
                originScope: b,
                canonicalOrigin: this.Ad
            });
            c && (b.securityToken = c);
            return this.R.timeoutPromise(3E4, T(this.w, "xhr").fetchJson(a, {
                method: "POST",
                ampCors: !1,
                credentials: "include",
                mode: "cors",
                body: b
            }).then(function(a) {
                return a.json()
            }))
        };
        Dg.prototype.zf = function(a) {
            if (a.optOut) return Eg(this, "$OPT_OUT", 31536E6), "$OPT_OUT";
            if (a.clientId) return Eg(this, a.securityToken, 31536E6), a.clientId;
            if (a.alternateUrl) return null;
            Eg(this, "$NOT_FOUND", 36E5);
            return null
        };

        function Eg(a, b, c) {
            if (b) {
                var d = a.w;
                a = a.w.Date.now() + c;
                Bg(d, "AMP_TOKEN", b, a)
            }
        };

        function Fg(a) {
            this.C = a;
            this.h = W(this.C);
            this.se = null;
            this.R = V(this.C.win)
        }
        Fg.prototype.isSupported = function() {
            return this.h.isCctEmbedded() && this.h.isProxyOrigin()
        };
        Fg.prototype.getScopedCid = function(a) {
            var b = this;
            if (!this.h.isCctEmbedded()) return Promise.resolve(null);
            this.se || (this.se = this.wb("https://ampcid.google.com/v1/cache:getClientId?key=AIzaSyDKtqGxnoeIqVM33Uf7hRSa3GJxuzR7mLc"));
            return this.se.then(function(c) {
                return c ? Gg(b, c, a) : null
            })
        };
        Fg.prototype.wb = function(a, b) {
            var c = this;
            b = void 0 === b ? !0 : b;
            var d = K({
                publisherOrigin: Jc(this.C.win.location)
            });
            return this.R.timeoutPromise(3E4, T(this.C.win, "xhr").fetchJson(a, {
                method: "POST",
                ampCors: !1,
                credentials: "include",
                mode: "cors",
                body: d
            }), "fetchCidTimeout").then(function(a) {
                return a.json().then(function(a) {
                    if (a.optOut) return null;
                    var d = a.publisherClientId;
                    return !d && b && a.alternateUrl ? c.wb(a.alternateUrl + "?key=AIzaSyDKtqGxnoeIqVM33Uf7hRSa3GJxuzR7mLc", !1) : d
                })
            }).catch(function(a) {
                a && a.response ? a.response.json().then(function(a) {
                    E().error("CacheCidApi",
                        JSON.stringify(a))
                }) : a && "fetchCidTimeout" == a.message ? E().expectedError("CacheCidApi", a) : E().error("CacheCidApi", a);
                return null
            })
        };

        function Gg(a, b, c) {
            b = b + ";" + c;
            return T(a.C.win, "crypto").sha384Base64(b).then(function(a) {
                return "amp-" + a
            })
        };

        function Hg(a) {
            this.C = a;
            this.h = W(this.C);
            this.Ad = (a = sd(this.C).canonicalUrl) ? O(a).origin : null
        }
        Hg.prototype.isSupported = function() {
            return this.h.hasCapability("cid") ? this.h.isTrustedViewer() : Promise.resolve(!1)
        };
        Hg.prototype.getScopedCid = function(a, b) {
            b = K({
                scope: b,
                clientIdApi: !!a,
                canonicalOrigin: this.Ad
            });
            a && (b.apiKey = a);
            return this.h.sendMessageAwaitResponse("cid", b)
        };
        var Ig = {
            "+": "-",
            "/": "_",
            "=": "."
        };

        function Jg(a) {
            a = Vb(a);
            return btoa(a).replace(/[+/=]/g, function(a) {
                return Ig[a]
            })
        };
        var Kg = /^[a-zA-Z0-9-_.]+$/,
            Lg = {
                googleanalytics: "AMP_ECID_GOOGLE"
            },
            Mg = {
                googleanalytics: "AIzaSyA65lEHUEizIsNtlbNo-l2K18dT680nsaM"
            };

        function Ng(a) {
            this.ampdoc = a;
            this.qd = null;
            this.Id = Object.create(null);
            this.df = new Fg(a);
            this.xg = new Hg(a);
            this.Ng = new Dg(a);
            this.pd = null
        }
        Ng.prototype.get = function(a, b, c) {
            var d = this;
            F(Kg.test(a.scope) && Kg.test(a.cookieName), "The CID scope and cookie name must only use the characters [a-zA-Z0-9-_.]+\nInstead found: %s", a.scope);
            return b.then(function() {
                return d.ampdoc.whenFirstVisible()
            }).then(function() {
                return Og(d.ampdoc)
            }).then(function(e) {
                if (e) return "";
                var g = Pg(d, a, c || b);
                return V(d.ampdoc.win).timeoutPromise(1E4, g, 'Getting cid for "' + a.scope + '" timed out').catch(function(a) {
                    hb(a)
                })
            })
        };
        Ng.prototype.optOut = function() {
            return Qg(this.ampdoc)
        };

        function Pg(a, b, c) {
            var d = b.scope,
                e = O(a.ampdoc.win.location.href);
            if (!P(e)) {
                var g = Rg(a, d);
                return g ? a.Ng.getScopedCid(g, d).then(function(e) {
                    return "$OPT_OUT" == e ? null : e ? (Sg(a.ampdoc.win, b.cookieName || d, e), e) : Tg(a, b, c)
                }) : Tg(a, b, c)
            }
            return a.xg.isSupported().then(function(b) {
                if (b) {
                    var g = Rg(a, d);
                    return a.xg.getScopedCid(g, d)
                }
                return a.df.isSupported() && Rg(a, d) ? a.df.getScopedCid(d).then(function(b) {
                    return b ? b : Ug(a, c, d, e)
                }) : Ug(a, c, d, e)
            })
        }

        function Ug(a, b, c, d) {
            return Vg(a, b).then(function(b) {
                return T(a.ampdoc.win, "crypto").sha384Base64(b + Wg(d) + c)
            })
        }

        function Rg(a, b) {
            a.pd || (a.pd = Xg(a));
            return a.pd[b]
        }

        function Xg(a) {
            var b = {},
                c = a.ampdoc.getMetaByName("amp-google-client-id-api");
            c && c.split(",").forEach(function(a) {
                a = a.trim();
                if (0 < a.indexOf("=")) {
                    var c = a.split("=");
                    a = c[0].trim();
                    b[a] = c[1].trim()
                } else {
                    var d = a;
                    (a = Lg[d]) ? b[a] = Mg[d]: C().warn("CID", "Unsupported client for Google CID API: " + d + '.Please remove or correct meta[name="amp-google-client-id-api"]')
                }
            });
            return b
        }

        function Qg(a) {
            W(a).sendMessage("cidOptOut", {});
            return gd(Yc(a), "storage").then(function(a) {
                return a.set("amp-cid-optout", !0)
            })
        }

        function Og(a) {
            return gd(Yc(a), "storage").then(function(a) {
                return a.get("amp-cid-optout").then(function(a) {
                    return !!a
                })
            }).catch(function() {
                return !1
            })
        }

        function Sg(a, b, c) {
            var d = Date.now() + 31536E6;
            Bg(a, b, c, d)
        }

        function Tg(a, b, c) {
            var d = a.ampdoc.win,
                e = b.scope,
                g = b.cookieName || e,
                h = zg(d, g);
            if (!h && !b.createCookieIfNotPresent) return Promise.resolve(null);
            if (h) return /^amp-/.test(h) && Sg(d, g, h), Promise.resolve(h);
            if (a.Id[e]) return a.Id[e];
            var l = Yg(d).then(function(a) {
                return "amp-" + a
            });
            Promise.all([l, c]).then(function(a) {
                var b = a[0];
                zg(d, g) || Sg(d, g, b)
            });
            return a.Id[e] = l
        }

        function Wg(a) {
            F(P(a), "Expected proxy origin %s", a.origin);
            return Jc(a)
        }

        function Vg(a, b) {
            if (a.qd) return a.qd;
            var c = a.ampdoc.win;
            return a.qd = Zg(a.ampdoc).then(function(d) {
                var e = !1;
                if (d && !$g(d)) {
                    var g = Promise.resolve(d.cid);
                    bh(d) && (e = !0)
                } else g = T(c, "crypto").sha384Base64(ch(c)), e = !0;
                e && g.then(function(c) {
                    dh(a.ampdoc, b, c)
                });
                return g
            })
        }

        function dh(a, b, c) {
            var d = a.win;
            Pb(d) ? eh(a, fh(c)) : b.then(function() {
                try {
                    d.localStorage.setItem("amp-cid", fh(c))
                } catch (e) {}
            })
        }

        function eh(a, b) {
            var c = W(a);
            return c.isTrustedViewer().then(function(a) {
                if (a) return E().expectedError("CID", "Viewer does not provide cap=cid"), c.sendMessageAwaitResponse("cid", b).then(function(a) {
                    var b;
                    if (b = a) {
                        try {
                            var c = Sb(a)
                        } catch (l) {
                            c = null
                        }
                        b = !c
                    }
                    return b ? (E().expectedError("CID", "invalid cid format"), JSON.stringify(K({
                        time: Date.now(),
                        cid: a
                    }))) : a
                })
            })
        }

        function fh(a) {
            return JSON.stringify(K({
                time: Date.now(),
                cid: a
            }))
        }

        function Zg(a) {
            var b = a.win;
            try {
                var c = b.localStorage.getItem("amp-cid")
            } catch (e) {}
            var d = Promise.resolve(c);
            !c && Pb(b) && (d = eh(a));
            return d.then(function(a) {
                if (!a) return null;
                a = Sb(a);
                return {
                    time: a.time,
                    cid: a.cid
                }
            })
        }

        function $g(a) {
            var b = a.time,
                c = Date.now();
            return b + 31536E6 < c
        }

        function bh(a) {
            a = a.time;
            var b = Date.now();
            return a + 864E5 < b
        }

        function ch(a) {
            var b;
            if ((b = a.crypto || a.msCrypto) && b.getRandomValues) {
                var c = new Uint8Array(16);
                b.getRandomValues(c);
                b = c
            } else b = null;
            return b ? b : String(a.location.href + Date.now() + a.Math.random() + a.screen.width + a.screen.height)
        }

        function Yg(a) {
            var b = ch(a);
            return "string" == typeof b ? T(a, "crypto").sha384Base64(b) : mb(function() {
                return Jg(b).replace(/\.+$/, "")
            })
        };

        function gh(a) {
            this.w = a;
            var b = null,
                c = !1;
            a.crypto && (a.crypto.subtle ? b = a.crypto.subtle : a.crypto.webkitSubtle && (b = a.crypto.webkitSubtle, c = !0));
            this.pkcsAlgo = {
                name: "RSASSA-PKCS1-v1_5",
                hash: {
                    name: "SHA-256"
                }
            };
            this.subtle = b;
            this.kh = c;
            this.Nb = null
        }
        f = gh.prototype;
        f.sha384 = function(a) {
            var b = this;
            "string" === typeof a && (a = Ub(a));
            if (!this.subtle || this.Nb) return (this.Nb || hh(this)).then(function(b) {
                return b(a)
            });
            try {
                return this.subtle.digest({
                    name: "SHA-384"
                }, a).then(function(a) {
                    return new Uint8Array(a)
                }, function(c) {
                    c.message && 0 > c.message.indexOf("secure origin") && C().error("Crypto", "SubtleCrypto failed, fallback to closure lib.", c);
                    return hh(b).then(function() {
                        return b.sha384(a)
                    })
                })
            } catch (c) {
                return E().error("Crypto", "SubtleCrypto failed, fallback to closure lib.",
                    c), hh(this).then(function() {
                    return b.sha384(a)
                })
            }
        };
        f.sha384Base64 = function(a) {
            return this.sha384(a).then(function(a) {
                return Jg(a)
            })
        };
        f.uniform = function(a) {
            return this.sha384(a).then(function(a) {
                for (var b = 0, d = 2; 0 <= d; d--) b = (b + a[d]) / 256;
                return b
            })
        };

        function hh(a) {
            return a.Nb ? a.Nb : a.Nb = td(a.w).preloadExtension("amp-crypto-polyfill").then(function() {
                return T(a.w, "crypto-polyfill")
            })
        }
        f.isPkcsAvailable = function() {
            return !!this.subtle && !1 !== this.w.isSecureContext
        };
        f.importPkcsKey = function(a) {
            this.isPkcsAvailable();
            var b = this.kh ? Tb(JSON.stringify(a)) : a;
            return this.subtle.importKey("jwk", b, this.pkcsAlgo, !0, ["verify"])
        };
        f.verifyPkcs = function(a, b, c) {
            this.isPkcsAvailable();
            return this.subtle.verify(this.pkcsAlgo, a, b, c)
        };
        var ih = ["prefetch", "preload", "preconnect", "dns-prefetch"];

        function jh(a) {
            this.C = a;
            this.oe = this.Qd = null
        }
        jh.prototype.get = function() {
            if (this.Qd) return this.Qd;
            var a = this.C,
                b = a.getUrl(),
                c = Ic(b),
                d = a.getRootNode();
            b = d && d.AMP && d.AMP.canonicalUrl;
            if (!b) {
                var e = d.querySelector("link[rel=canonical]");
                b = e ? O(e.href).href : c
            }
            var g = String(Math.floor(1E4 * a.win.Math.random())),
                h = kh(a.win.document);
            d = lh(a.win.document);
            var l = mh(a);
            return this.Qd = {
                get sourceUrl() {
                    return Ic(a.getUrl())
                },
                canonicalUrl: b,
                pageViewId: g,
                get pageViewId64() {
                    this.oe || (this.oe = Yg(a.win));
                    return this.oe
                },
                linkRels: h,
                viewport: d,
                replaceParams: l
            }
        };

        function kh(a) {
            var b = I();
            if (a.head) {
                a = a.head.querySelectorAll("link[rel]");
                for (var c = {}, d = 0; d < a.length; c = {
                        mb: c.mb
                    }, d++) {
                    var e = a[d];
                    c.mb = e.href;
                    var g = e.getAttribute("rel");
                    g && c.mb && g.split(/\s+/).forEach(function(a) {
                        return function(c) {
                            if (-1 == ih.indexOf(c)) {
                                var d = b[c];
                                d ? (y(d) || (d = b[c] = [d]), d.push(a.mb)) : b[c] = a.mb
                            }
                        }
                    }(c))
                }
            }
            return b
        }

        function lh(a) {
            var b = a.head.querySelector('meta[name="viewport"]');
            return b ? b.getAttribute("content") : null
        }

        function mh(a) {
            var b;
            (b = !a.isSingleDoc()) || (b = a.win.location.href, "string" == typeof b && (b = O(b)), b = "a" != (P(b) ? b.pathname.split("/", 2)[1] : null));
            if (b) return null;
            a = O(a.win.location.href);
            var c = t(a.search).amp_r;
            return void 0 === c ? null : t(c)
        };
        var nh = null,
            oh = ["gclid", "gclsrc"],
            ph = [/^t.co$/];

        function qh() {
            return F(nh, "E#19457 trackImpressionPromise")
        }

        function rh() {
            var a = self,
                b = new L,
                c = b.promise,
                d = b.resolve;
            nh = V(a).timeoutPromise(8E3, c, "TrackImpressionPromise timeout").catch(function(a) {
                E().warn("IMPRESSION", a)
            });
            b = W(a.document.documentElement);
            var e = b.isTrustedViewer(),
                g = b.getReferrerUrl().then(function(a) {
                    return sh(a)
                });
            Promise.all([e, g]).then(function(b) {
                var c = b[1];
                if (b[0] || c || Q(a, "alp")) {
                    var e = th(a),
                        g = uh(a);
                    Promise.all([e, g]).then(function() {
                        d()
                    }, function() {})
                } else d()
            })
        }

        function th(a) {
            var b = W(a.document.documentElement);
            return b.getParam("replaceUrl") ? b.hasCapability("replaceUrl") ? b.sendMessageAwaitResponse("getReplaceUrl", void 0).then(function(a) {
                a && "object" == typeof a ? b.replaceUrl(a.replaceUrl || null) : E().warn("IMPRESSION", "get invalid replaceUrl response")
            }, function(a) {
                E().warn("IMPRESSION", "Error request replaceUrl from viewer", a)
            }) : (b.replaceUrl(b.getParam("replaceUrl") || null), x()) : x()
        }

        function sh(a) {
            var b = O(a);
            return "https:" != b.protocol ? !1 : ph.some(function(a) {
                return a.test(b.hostname)
            })
        }

        function uh(a) {
            var b = Xc(a.document.documentElement),
                c = W(b).getParam("click");
            if (!c) return x();
            if (0 != c.indexOf("https://")) return C().warn("IMPRESSION", "click fragment param should start with https://. Found ", c), x();
            a.location.hash && (a.location.hash = "");
            return b.whenFirstVisible().then(function() {
                return vh(a, c)
            }).then(function(b) {
                if (b) {
                    var c = b.location;
                    (b = b.tracking_url || c) && !P(b) && ((new Image).src = b);
                    if (c && a.history.replaceState) {
                        b = W(a.document.documentElement);
                        var d = a.location.href;
                        c = O(c);
                        c = t(c.search);
                        c = Ac(d, c);
                        a.history.replaceState(null, "", c);
                        b.maybeUpdateFragmentForCct()
                    }
                }
            }).catch(function(a) {
                C().warn("IMPRESSION", "Error on request clickUrl: ", a)
            })
        }

        function vh(a, b) {
            return T(a, "xhr").fetchJson(b, {
                credentials: "include"
            }).then(function(a) {
                return 204 == a.status ? null : a.json()
            })
        }

        function wh(a) {
            return a.whenReady().then(function() {
                return !!a.getBody().querySelector("amp-analytics[type=googleanalytics]")
            })
        };

        function xh() {
            this.D = []
        }
        xh.prototype.peek = function() {
            var a = this.D.length;
            return a ? this.D[a - 1].item : null
        };
        xh.prototype.enqueue = function(a, b) {
            if (isNaN(b)) throw Error("Priority must not be NaN.");
            for (var c = -1, d = 0, e = this.D.length; d <= e;) {
                c = Math.floor((d + e) / 2);
                if (c === this.D.length) break;
                if (this.D[c].priority < b) d = c + 1;
                else if (0 < c && this.D[c - 1].priority >= b) e = c - 1;
                else break
            }
            this.D.splice(c, 0, {
                item: a,
                priority: b
            })
        };
        xh.prototype.forEach = function(a) {
            for (var b = this.D.length; b--;) a(this.D[b].item)
        };
        xh.prototype.dequeue = function() {
            return this.D.length ? this.D.pop().item : null
        };
        ca.Object.defineProperties(xh.prototype, {
            length: {
                configurable: !0,
                enumerable: !0,
                get: function() {
                    return this.D.length
                }
            }
        });
        var yh = ["_top", "_blank"];

        function zh(a, b) {
            var c = this;
            this.ampdoc = a;
            this.oa = b || a.getRootNode();
            this.H = xd(this.ampdoc);
            this.h = W(this.ampdoc);
            this.O = bd(this.ampdoc, "history");
            this.ta = U(this.ampdoc.win);
            this.jh = this.ta.isIos() && this.ta.isSafari();
            this.Db = Pb(this.ampdoc.win) && this.h.isOvertakeHistory();
            this.Ud = this.oa != this.ampdoc.getRootNode() || !!this.ampdoc.getParent();
            this.ih = "inabox" == v(this.ampdoc.win).runtime;
            this.eg = this.oa.nodeType == Node.DOCUMENT_NODE ? this.oa.documentElement : this.oa;
            this.qb = this.bh.bind(this);
            this.oa.addEventListener("click",
                this.qb);
            this.oa.addEventListener("contextmenu", this.qb);
            this.Oe = !1;
            wh(this.ampdoc).then(function(a) {
                c.Oe = a
            });
            this.Gf = this.Za = !1;
            Promise.all([this.h.isTrustedViewer(), this.h.getViewerOrigin()]).then(function(a) {
                c.Za = a[0];
                a = a[1];
                "string" == typeof a && (a = O(a));
                a = B.localhostRegex.test(a.origin);
                c.Gf = a
            });
            this.ld = null;
            this.Ne = new xh;
            this.Sf = new xh
        }
        zh.installInEmbedWindow = function(a, b) {
            Zc(a, "navigation", new zh(b, a.document))
        };
        f = zh.prototype;
        f.cleanup = function() {
            this.qb && (this.oa.removeEventListener("click", this.qb), this.oa.removeEventListener("contextmenu", this.qb))
        };
        f.openWindow = function(a, b, c, d) {
            var e = "";
            !this.ta.isIos() && this.ta.isChrome() || d || (e += "noopener");
            var g = Nb(a, b, c, e);
            g && !d && (g.opener = null)
        };
        f.navigateTo = function(a, b, c, d) {
            var e = void 0 === d ? {} : d;
            d = void 0 === e.target ? "_top" : e.target;
            e = void 0 === e.opener ? !1 : e.opener;
            b = Ah(this, b);
            var g = Tc(this.eg, "url");
            if (g.isProtocolValid(b))
                if (F(yh.includes(d), "Target '" + d + "' not supported."), b = g.getSourceUrl(b), "_blank" == d) this.openWindow(a, b, d, e);
                else {
                    if (c && (this.ld || (this.ld = Bh(this)), this.ld.includes(c) && this.navigateToAmpUrl(b, c))) return;
                    a.top.location.href = b
                }
            else C().error("navigation", "Cannot navigate to invalid protocol: " + b)
        };
        f.navigateToAmpUrl = function(a, b) {
            return this.h.hasCapability("a2a") ? (this.h.sendMessage("a2aNavigate", K({
                url: a,
                requestedBy: b
            })), !0) : !1
        };

        function Bh(a) {
            return (a = a.oa.querySelector('meta[name="amp-to-amp-navigation"]')) && a.hasAttribute("content") ? a.getAttribute("content").split(",").map(function(a) {
                return a.trim()
            }) : []
        }
        f.bh = function(a) {
            if (!a.defaultPrevented) {
                var b = Eb(a.__AMP_CUSTOM_LINKER_TARGET__ || a.target, "A");
                if (b && b.href)
                    if ("click" == a.type) {
                        Ch(this, b);
                        var c = Dh(this, b.href),
                            d;
                        if (d = !Eh(this, a, b, c)) {
                            if (this.Db) {
                                d = b.ownerDocument.defaultView;
                                var e = b.href,
                                    g = c.protocol;
                                "ftp:" == g ? (Nb(d, e, "_blank"), a.preventDefault(), d = !0) : (g = /^(https?|mailto):$/.test(g), this.jh && !g ? (Nb(d, e, "_top"), a.preventDefault(), d = !0) : d = !1)
                            } else d = !1;
                            d = !d
                        }
                        if (d)
                            if (d = Dh(this, ""), Fh(c) != Fh(d) && (Gh(this, b, a), c = Dh(this, b.href)), e = c, c = Fh(e), g = Fh(d),
                                e.hash && c == g) Hh(this, a, e, d);
                            else {
                                e = (b.getAttribute("target") || "").toLowerCase();
                                (this.Ud || this.ih) && "_top" != e && "_blank" != e && (e = "_blank", b.setAttribute("target", e));
                                g = this.ampdoc.win;
                                var h = U(g);
                                b = W(b);
                                d.search && h.isSafari() && 13 <= h.getMajorVersion() && b.isProxyOrigin() && b.isEmbedded() && Ih(g, d, e);
                                this.viewerInterceptsNavigation(c, "intercept_click") && a.preventDefault()
                            }
                    } else "contextmenu" == a.type && (Ch(this, b), Gh(this, b, a))
            }
        };

        function Gh(a, b, c) {
            a.Ne.forEach(function(a) {
                a(b, c)
            })
        }

        function Ah(a, b) {
            a.Sf.forEach(function(a) {
                b = a(b)
            });
            return b
        }

        function Ch(a, b) {
            var c = null;
            if (a.Oe && !a.Ud) {
                a = O(a.ampdoc.win.location.href);
                var d = t(a.search);
                a = [];
                for (var e = 0; e < oh.length; e++) {
                    var g = oh[e];
                    "undefined" !== typeof d[g] && a.push(g)
                }
                d = b.getAttribute("data-amp-addparams");
                e = b.href;
                d && (e = Ac(e, t(d)));
                d = O(e);
                d = t(d.search);
                for (e = a.length - 1; 0 <= e; e--) "undefined" !== typeof d[a[e]] && a.splice(e, 1);
                d = "";
                for (e = 0; e < a.length; e++) g = a[e], d += 0 == e ? g + "=QUERY_PARAM(" + g + ")" : "&" + g + "=QUERY_PARAM(" + g + ")";
                c = d
            }
            Tc(b, "url-replace").maybeExpandLink(b, c)
        }

        function Eh(a, b, c, d) {
            return c.hasAttribute("rel") && c.getAttribute("rel").split(" ").map(function(a) {
                return a.trim()
            }).includes("amphtml") ? a.navigateToAmpUrl(d.href, "<a rel=amphtml>") ? (b.preventDefault(), !0) : !1 : !1
        }

        function Ih(a, b, c) {
            function d() {
                var b = a.location.href;
                b == g ? (E().info("navigation", "Restored iframe URL with query string:", e), a.history.replaceState(null, "", e)) : E().error("navigation", "Unexpected iframe URL change:", b, g)
            }
            E().info("navigation", "Removing iframe query string before navigation:", b.search);
            var e = b.href,
                g = "" + b.origin + b.pathname + b.hash;
            a.history.replaceState(null, "", g);
            "_blank" === c ? a.setTimeout(d, 0) : a.addEventListener("pageshow", function k(b) {
                b.persisted && (d(), a.removeEventListener("pageshow",
                    k))
            })
        }

        function Hh(a, b, c, d) {
            if (U(a.ampdoc.win).isIe()) {
                var e = c.hash.substring(1),
                    g = a.ampdoc.getElementById(e);
                g && (/^(?:a|select|input|button|textarea)$/i.test(g.tagName) || (g.tabIndex = -1), Ob(g))
            }
            b.preventDefault();
            if (!a.Ud) {
                var h = c.hash.slice(1),
                    l = null;
                if (h) {
                    var k = String(h).replace(nb, ob);
                    l = a.oa.getElementById(h) || a.oa.querySelector('a[name="' + k + '"]')
                }
                c.hash != d.hash ? a.O.replaceStateForTarget(c.hash).then(function() {
                    Jh(a, l, h)
                }) : Jh(a, l, h)
            }
        }
        f.registerAnchorMutator = function(a, b) {
            this.Ne.enqueue(a, b)
        };
        f.registerNavigateToMutator = function(a, b) {
            this.Sf.enqueue(a, b)
        };

        function Jh(a, b, c) {
            b ? (a.H.scrollIntoView(b), V(a.ampdoc.win).delay(function() {
                return a.H.scrollIntoView(b)
            }, 1)) : E().warn("navigation", "failed to find element with id=" + c + " or a[name=" + c + "]")
        }

        function Dh(a, b) {
            return Tc(a.eg, "url").parse(b)
        }
        f.viewerInterceptsNavigation = function(a, b) {
            var c = this.h.hasCapability("interceptNavigation"),
                d = this.ampdoc.getRootNode().documentElement.hasAttribute("allow-navigation-interception");
            if (!c || !d || !this.Za && !this.Gf) return !1;
            this.h.sendMessage("navigateTo", K({
                url: a,
                requestedBy: b
            }));
            return !0
        };

        function Fh(a) {
            return "" + a.origin + a.pathname + a.search
        };

        function Kh(a) {
            qd(a).then(function(b) {
                b && a.getRootNode().addEventListener("submit", Lh, !0)
            })
        }

        function Lh(a) {
            if (!a.defaultPrevented) {
                var b = a.target;
                if (b && "FORM" == b.tagName) {
                    (b.classList.contains("i-amphtml-form") ? b.hasAttribute("amp-novalidate") : b.hasAttribute("novalidate")) || !b.checkValidity || b.checkValidity() || a.preventDefault();
                    for (var c = b.elements, d = 0; d < c.length; d++) F(!c[d].name || "__amp_source_origin" != c[d].name, "Illegal input name, %s found: %s", "__amp_source_origin", c[d]);
                    c = b.getAttribute("action");
                    var e = b.getAttribute("action-xhr");
                    d = (b.getAttribute("method") || "GET").toUpperCase();
                    e && (Dc(e, b, "action-xhr"), F(!P(e), "form action-xhr should not be on AMP CDN: %s", b), Lc(e));
                    c && (Dc(c, b, "action"), F(!P(c), "form action should not be on AMP CDN: %s", b), Lc(c));
                    "GET" == d ? F(e || c, "form action-xhr or action attribute is required for method=GET: %s", b) : "POST" == d && (c && C().error("form", "action attribute is invalid for method=POST: %s", b), e || (a.preventDefault(), F(!1, "Only XHR based (via action-xhr attribute) submissions are support for POST requests. %s", b)));
                    (c = b.getAttribute("target")) ? F("_blank" ==
                        c || "_top" == c, "form target=%s is invalid can only be _blank or _top: %s", c, b): b.setAttribute("target", "_top");
                    e && (a.preventDefault(), a.stopImmediatePropagation(), Tc(b, "action").execute(b, "submit", null, b, b, a, 3))
                }
            }
        };

        function Y() {
            this.ba = null
        }
        f = Y.prototype;
        f.add = function(a) {
            var b = this;
            this.ba || (this.ba = []);
            this.ba.push(a);
            return function() {
                b.remove(a)
            }
        };
        f.remove = function(a) {
            this.ba && (a = this.ba.indexOf(a), -1 < a && this.ba.splice(a, 1))
        };
        f.removeAll = function() {
            this.ba && (this.ba.length = 0)
        };
        f.fire = function(a) {
            if (this.ba)
                for (var b = this.ba, c = 0; c < b.length; c++)(0, b[c])(a)
        };
        f.getHandlerCount = function() {
            return this.ba ? this.ba.length : 0
        };
        var Mh = {
            attributes: !0,
            attributeFilter: ["hidden"],
            subtree: !0
        };

        function Nh(a, b) {
            this.W = b || a.getRootNode();
            this.w = (this.W.ownerDocument || this.W).defaultView;
            this.gb = this.ma = null
        }
        Nh.installInEmbedWindow = function(a, b) {
            Zc(a, "hidden-observer", new Nh(b, a.document))
        };
        Nh.prototype.add = function(a) {
            var b = this;
            Oh(this);
            var c = this.gb.add(a);
            return function() {
                c();
                0 === b.gb.getHandlerCount() && b.dispose()
            }
        };

        function Oh(a) {
            if (!a.ma) {
                a.gb = new Y;
                var b = new a.w.MutationObserver(function(b) {
                    b && a.gb.fire(b)
                });
                a.ma = b;
                b.observe(a.W, Mh)
            }
        }
        Nh.prototype.dispose = function() {
            this.ma && (this.ma.disconnect(), this.gb.removeAll(), this.gb = this.ma = null)
        };

        function Ph(a) {
            try {
                return a.state
            } catch (b) {
                return null
            }
        };

        function Qh(a, b) {
            this.C = a;
            this.R = V(a.win);
            this.o = b;
            this.B = 0;
            this.Qa = [];
            this.D = [];
            this.o.setOnStateUpdated(this.fa.bind(this))
        }
        f = Qh.prototype;
        f.cleanup = function() {
            this.o.cleanup()
        };
        f.push = function(a, b) {
            var c = this;
            return Rh(this, function() {
                return c.o.push(b).then(function(b) {
                    c.fa(b);
                    a && (c.Qa[b.stackIndex] = a);
                    return b.stackIndex
                })
            }, "push")
        };
        f.pop = function(a) {
            var b = this;
            return Rh(this, function() {
                return b.o.pop(a).then(function(a) {
                    b.fa(a)
                })
            }, "pop")
        };
        f.replace = function(a) {
            var b = this;
            return Rh(this, function() {
                return b.o.replace(a)
            }, "replace")
        };
        f.get = function() {
            var a = this;
            return Rh(this, function() {
                return a.o.get()
            }, "get")
        };
        f.goBack = function() {
            var a = this;
            return Rh(this, function() {
                return 0 >= a.B ? x() : a.o.pop(a.B).then(function(b) {
                    a.fa(b)
                })
            }, "goBack")
        };
        f.replaceStateForTarget = function(a) {
            var b = this,
                c = this.C.win.location.hash;
            return this.push(function() {
                b.C.win.location.replace(c || "#")
            }).then(function() {
                b.o.replaceStateForTarget(a)
            })
        };
        f.getFragment = function() {
            return this.o.getFragment()
        };
        f.updateFragment = function(a) {
            "#" == a[0] && (a = a.substr(1));
            return this.o.updateFragment(a)
        };
        f.fa = function(a) {
            this.B = a.stackIndex;
            Sh(this, a)
        };

        function Sh(a, b) {
            if (!(a.B >= a.Qa.length - 1)) {
                for (var c = [], d = a.Qa.length - 1; d > a.B; d--) a.Qa[d] && (c.push(a.Qa[d]), a.Qa[d] = void 0);
                a.Qa.splice(a.B + 1);
                if (0 < c.length)
                    for (d = {
                            nb: 0
                        }; d.nb < c.length; d = {
                            nb: d.nb
                        }, d.nb++) a.R.delay(function(a) {
                        return function() {
                            return c[a.nb](b)
                        }
                    }(d), 1)
            }
        }

        function Rh(a, b, c) {
            var d = new L,
                e = d.promise;
            a.D.push({
                callback: b,
                resolve: d.resolve,
                reject: d.reject,
                trace: Error("history trace for " + c + ": ")
            });
            1 == a.D.length && Th(a);
            return e
        }

        function Th(a) {
            if (0 != a.D.length) {
                var b = a.D[0];
                try {
                    var c = b.callback()
                } catch (d) {
                    c = Promise.reject(d)
                }
                c.then(function(a) {
                    b.resolve(a)
                }, function(a) {
                    E().error("History", "failed to execute a task:", a);
                    b.trace && (b.trace.message += a, E().error("History", b.trace));
                    b.reject(a)
                }).then(function() {
                    a.D.splice(0, 1);
                    Th(a)
                })
            }
        }

        function Uh(a) {
            var b = this;
            this.win = a;
            this.R = V(a);
            a = this.win.history;
            this.Ra = a.length - 1;
            var c = Ph(a);
            c && void 0 !== c["AMP.History"] && (this.Ra = Math.min(c["AMP.History"], this.Ra));
            this.B = this.Ra;
            this.fa = null;
            this.Yh = "state" in a;
            this.kb = Vh(this, this.B);
            if (a.pushState && a.replaceState) {
                this.Hc = a.originalPushState || a.pushState.bind(a);
                this.Kb = a.originalReplaceState || a.replaceState.bind(a);
                var d = function(a, c, d) {
                    b.kb = a;
                    b.Hc(a, c, d || null)
                };
                var e = function(a, c, d) {
                    b.kb = a;
                    void 0 !== d ? b.Kb(a, c, d) : b.Kb(a, c)
                };
                a.originalPushState ||
                    (a.originalPushState = this.Hc);
                a.originalReplaceState || (a.originalReplaceState = this.Kb)
            } else d = function(a) {
                b.kb = a
            }, e = function(a) {
                b.kb = a
            };
            this.Gh = d;
            this.Rc = e;
            try {
                this.Rc(Vh(this, this.B, !0))
            } catch (g) {
                E().error("History", "Initial replaceState failed: " + g.message)
            }
            a.pushState = this.Cf.bind(this);
            a.replaceState = this.Od.bind(this);
            this.Oc = function(a) {
                a = a.state;
                E().fine("History", "popstate event: " + b.win.history.length + ", " + JSON.stringify(a));
                a = Wh(b);
                E().fine("History", "history event: " + b.win.history.length +
                    ", " + JSON.stringify(a));
                var c = a ? a["AMP.History"] : void 0,
                    d = b.B,
                    e = b.jd;
                b.jd = void 0;
                d > b.win.history.length - 2 && (d = b.win.history.length - 2, b.za(Xh(a, {
                    stackIndex: d
                })));
                d = void 0 == c ? d + 1 : c < b.win.history.length ? c : b.win.history.length - 1;
                a || (a = {});
                a["AMP.History"] = d;
                b.Rc(a, void 0, void 0);
                d != b.B && b.za(Xh(a, {
                    stackIndex: d
                }));
                d < b.Ra && (b.Ra = d);
                e && e.resolve()
            };
            this.win.addEventListener("popstate", this.Oc)
        }
        f = Uh.prototype;
        f.cleanup = function() {
            this.Hc && (this.win.history.pushState = this.Hc);
            this.Kb && (this.win.history.replaceState = this.Kb);
            this.win.removeEventListener("popstate", this.Oc)
        };

        function Vh(a, b, c) {
            a = I(c ? Wh(a) : void 0);
            a["AMP.History"] = b;
            return a
        }
        f.setOnStateUpdated = function(a) {
            this.fa = a
        };
        f.push = function(a) {
            var b = this;
            return Yh(this, function() {
                var c = Xh(Wh(b), a || {});
                b.Cf(c, void 0, c.fragment ? "#" + c.fragment : void 0);
                return mb(function() {
                    return Xh(c, {
                        stackIndex: b.B
                    })
                })
            })
        };
        f.pop = function(a) {
            var b = this;
            a = Math.max(a, this.Ra);
            return Yh(this, function() {
                return Zh(b, b.B - a + 1)
            }).then(function(a) {
                return Xh(Wh(b), {
                    stackIndex: a
                })
            })
        };
        f.replace = function(a) {
            var b = this;
            a = void 0 === a ? {} : a;
            return Yh(this, function() {
                var c = Xh(Wh(b), a || {}),
                    d = (c.url || "").replace(/#.*/, ""),
                    e = c.fragment ? "#" + c.fragment : "";
                b.Od(c, c.title, d || e ? d + e : void 0);
                return mb(function() {
                    return Xh(c, {
                        stackIndex: b.B
                    })
                })
            })
        };
        f.get = function() {
            var a = this;
            return mb(function() {
                return Xh(Wh(a), {
                    stackIndex: a.B
                })
            })
        };
        f.backTo = function(a) {
            var b = this;
            a = Math.max(a, this.Ra);
            return Yh(this, function() {
                return Zh(b, b.B - a)
            })
        };

        function Wh(a) {
            return a.Yh ? Ph(a.win.history) : a.kb
        }

        function Yh(a, b) {
            return a.jd ? a.jd.promise.then(b, b) : b()
        }

        function $h(a) {
            var b = new L,
                c = b.resolve,
                d = b.reject;
            b = a.R.timeoutPromise(500, b.promise);
            a.jd = {
                promise: b,
                resolve: c,
                reject: d
            };
            return b
        }

        function Zh(a, b) {
            if (0 >= b) return Promise.resolve(a.B);
            a.kb = Vh(a, a.B - b);
            var c = $h(a);
            a.win.history.go(-b);
            return c.then(function() {
                return Promise.resolve(a.B)
            })
        }
        f.Cf = function(a, b, c) {
            a || (a = {});
            var d = this.B + 1;
            a["AMP.History"] = d;
            this.Gh(a, b, c);
            d != this.win.history.length - 1 && (d = this.win.history.length - 1, a["AMP.History"] = d, this.Rc(a));
            a = Xh(a, {
                stackIndex: d
            });
            this.za(a)
        };
        f.replaceStateForTarget = function(a) {
            var b = this;
            Yh(this, function() {
                b.win.removeEventListener("popstate", b.Oc);
                try {
                    b.win.location.replace(a)
                } finally {
                    b.win.addEventListener("popstate", b.Oc)
                }
                b.Od();
                return x()
            })
        };
        f.Od = function(a, b, c) {
            a || (a = {});
            var d = Math.min(this.B, this.win.history.length - 1);
            a["AMP.History"] = d;
            this.Rc(a, b, c);
            a = Xh(a, {
                stackIndex: d
            });
            this.za(a)
        };
        f.za = function(a) {
            a.stackIndex = Math.min(a.stackIndex, this.win.history.length - 1);
            this.B != a.stackIndex && (E().fine("History", "stack index changed: " + this.B + " -> " + a.stackIndex), this.B = a.stackIndex, this.fa && this.fa(a))
        };
        f.getFragment = function() {
            var a = this.win.location.hash;
            a = a.substr(1);
            return Promise.resolve(a)
        };
        f.updateFragment = function(a) {
            return this.replace({
                fragment: a
            })
        };

        function Xh(a, b) {
            var c = Object.assign({}, a && a.data || {}, b.data || {});
            return Object.assign({}, a || {}, b, {
                data: c
            })
        }

        function ai(a, b) {
            var c = this;
            this.win = a;
            this.h = b;
            this.B = 0;
            this.fa = null;
            this.bi = this.h.onMessage("historyPopped", function(a) {
                void 0 !== a.newStackIndex && (a.stackIndex = a.newStackIndex);
                bi(a) ? c.za(a) : E().warn("History", 'Ignored unexpected "historyPopped" data:', a)
            })
        }
        f = ai.prototype;
        f.replaceStateForTarget = function(a) {
            this.win.location.replace(a)
        };
        f.cleanup = function() {
            this.bi()
        };
        f.setOnStateUpdated = function(a) {
            this.fa = a
        };

        function ci(a, b, c) {
            if (bi(a)) return a;
            E().warn("History", 'Ignored unexpected "%s" data:', c, a);
            return b
        }

        function bi(a) {
            return !!a && void 0 !== a.stackIndex
        }
        f.push = function(a) {
            var b = this,
                c = Object.assign({}, {
                    stackIndex: this.B + 1
                }, a || {});
            return this.h.sendMessageAwaitResponse("pushHistory", c).then(function(a) {
                a = ci(a, c, "pushHistory");
                b.za(a);
                return a
            })
        };
        f.pop = function(a) {
            var b = this;
            if (a > this.B) return this.get();
            a = K({
                stackIndex: this.B
            });
            return this.h.sendMessageAwaitResponse("popHistory", a).then(function(a) {
                var c = K({
                    stackIndex: b.B - 1
                });
                a = ci(a, c, "popHistory");
                b.za(a);
                return a
            })
        };
        f.replace = function(a) {
            var b = this;
            if (a && a.url) {
                if (!this.h.hasCapability("fullReplaceHistory")) {
                    var c = K({
                        stackIndex: this.B
                    });
                    return Promise.resolve(c)
                }
                var d = a.url.replace(/#.*/, "");
                a.url = d
            }
            var e = Object.assign({}, {
                stackIndex: this.B
            }, a || {});
            return this.h.sendMessageAwaitResponse("replaceHistory", e, !0).then(function(a) {
                a = ci(a, e, "replaceHistory");
                b.za(a);
                return a
            })
        };
        f.get = function() {
            return Promise.resolve({
                data: void 0,
                fragment: "",
                stackIndex: this.B,
                title: ""
            })
        };
        f.za = function(a) {
            var b = a.stackIndex;
            this.B != b && (E().fine("History", "stackIndex: " + this.B + " -> " + b), this.B = b, this.fa && this.fa(a))
        };
        f.getFragment = function() {
            return this.h.hasCapability("fragment") ? this.h.sendMessageAwaitResponse("getFragment", void 0, !0).then(function(a) {
                if (!a) return "";
                "#" == a[0] && (a = a.substr(1));
                return a
            }) : Promise.resolve("")
        };
        f.updateFragment = function(a) {
            return this.h.hasCapability("fragment") ? this.h.sendMessageAwaitResponse("replaceHistory", K({
                fragment: a
            }), !0) : x()
        };

        function di(a) {
            var b = W(a);
            b.isOvertakeHistory() || a.win.__AMP_TEST_IFRAME ? b = new ai(a.win, b) : (R(a.win, "global-history-binding", Uh), b = T(a.win, "global-history-binding"));
            return new Qh(a, b)
        };

        function ei(a) {
            if (!a.hasAttribute("src") && 0 == "srcset" in a) {
                var b = a.getAttribute("srcset"),
                    c = /\S+/.exec(b);
                null != c && a.setAttribute("src", c[0])
            }
        };
        var fi = [];

        function gi(a) {
            Pe.call(this, a);
            fi.push(this)
        }
        m(gi, Pe);
        gi.prototype.getLayoutPriority = function() {
            return 0
        };
        gi.prototype.isLayoutSupported = function() {
            return !0
        };
        gi.prototype.reconstructWhenReparented = function() {
            return !1
        };
        var hi = {
            0: "cld",
            2: "adld"
        };

        function ii(a, b) {
            this.w = a;
            this.Nc = ad(a);
            this.lc = this.kc = null;
            this.pf = !1;
            this.tc = hi[b]
        }
        ii.prototype.enterViewport = function() {
            this.tc && !this.kc && (this.kc = this.w.Date.now(), ji(this))
        };
        ii.prototype.startLayout = function() {
            this.tc && !this.lc && (this.lc = this.w.Date.now(), ji(this))
        };

        function ji(a) {
            if (a.Nc && a.Nc.isPerformanceTrackingOn() && !a.pf && a.kc && a.lc) {
                var b = a.w.Math.max(a.lc - a.kc, 0);
                a.tc && a.Nc.tickDelta(a.tc, b);
                a.Nc.throttledFlush();
                a.pf = !0
            }
        };

        function ki(a, b, c) {
            b.__AMP__RESOURCE = this;
            this.eh = a;
            this.element = b;
            this.debugid = b.tagName.toLowerCase() + "#" + a;
            this.hostWin = b.ownerDocument.defaultView;
            this.j = c;
            this.lh = b.hasAttribute("placeholder");
            this.Bb = !1;
            this.hb = void 0;
            this.G = b.isBuilt() ? 1 : 0;
            0 == this.G && b.isBuilding() && this.build();
            this.re = -1;
            this.ea = 0;
            this.Kf = null;
            this.sc = !1;
            this.da = ec(-1E4, -1E4, 0, 0);
            this.Rd = null;
            this.Yd = !1;
            this.$a = this.pa = null;
            this.qe = void 0;
            this.Nf = !1;
            a = new L;
            this.ph = a.promise;
            this.de = a.resolve;
            this.Ya = c.isIntersectionExperimentOn();
            this.Ob = null
        }

        function Z(a) {
            return a.__AMP__RESOURCE
        }
        f = ki.prototype;
        f.getId = function() {
            return this.eh
        };
        f.updateOwner = function(a) {
            this.hb = a
        };
        f.getOwner = function() {
            if (void 0 === this.hb) {
                for (var a = this.element; a; a = a.parentElement)
                    if (a.__AMP__OWNER) {
                        this.hb = a.__AMP__OWNER;
                        break
                    } void 0 === this.hb && (this.hb = null)
            }
            return this.hb
        };
        f.hasOwner = function() {
            return !!this.getOwner()
        };
        f.getLayoutPriority = function() {
            return -1 != this.re ? this.re : this.element.getLayoutPriority()
        };
        f.updateLayoutPriority = function(a) {
            this.re = a
        };
        f.getState = function() {
            return this.G
        };
        f.isBuilt = function() {
            return this.element.isBuilt()
        };
        f.isBuilding = function() {
            return this.Bb
        };
        f.whenBuilt = function() {
            return this.element.signals().whenSignal("res-built")
        };
        f.build = function() {
            var a = this;
            if (this.Bb || !this.element.isUpgraded()) return null;
            this.Bb = !0;
            return this.element.build().then(function() {
                a.Bb = !1;
                a.Ya && a.hasBeenMeasured() ? (a.G = 2, a.element.onMeasure(!0)) : a.G = 1;
                a.element.signals().signal("res-built")
            }, function(b) {
                a.maybeReportErrorOnBuildFailure(b);
                a.Bb = !1;
                a.element.signals().rejectSignal("res-built", b);
                throw b;
            })
        };
        f.maybeReportErrorOnBuildFailure = function(a) {
            Bf(a) || E().error("Resource", "failed to build:", this.debugid, a)
        };
        f.applySizesAndMediaQuery = function() {
            this.element.applySizesAndMediaQuery()
        };
        f.changeSize = function(a, b, c) {
            this.element.applySize(a, b, c);
            this.requestMeasure()
        };
        f.overflowCallback = function(a, b, c, d) {
            a && (this.qe = {
                height: b,
                width: c,
                margins: d
            });
            this.element.overflowCallback(a, b, c, d)
        };
        f.resetPendingChangeSize = function() {
            this.qe = void 0
        };
        f.getPendingChangeSize = function() {
            return this.qe
        };
        f.getUpgradeDelayMs = function() {
            return this.element.getUpgradeDelayMs()
        };
        f.premeasure = function(a) {
            this.Ob = a
        };
        f.measure = function(a) {
            a = void 0 === a ? !1 : a;
            if (!(this.lh && this.element.parentElement && N(this.element.parentElement.tagName, "AMP-")) || "__AMP__RESOURCE" in this.element.parentElement)
                if (this.element.ownerDocument && this.element.ownerDocument.defaultView) {
                    this.Yd = !1;
                    var b = this.da;
                    a ? (li(this, this.Ob), this.Ob = null) : li(this);
                    var c = this.da,
                        d = !(b.width == c.width && b.height === c.height);
                    1 != this.G && b.top == c.top && !d || !this.element.isUpgraded() || 0 == this.G || 1 != this.G && !this.element.isRelayoutNeeded() || (this.G = 2);
                    this.hasBeenMeasured() ||
                        (this.Rd = c);
                    this.element.updateLayoutBox(c, d)
                } else this.G = 1
        };

        function li(a, b) {
            var c = xd(a.element);
            a.da = c.getLayoutRect(a.element, b);
            var d = !1;
            if (c.supportsPositionFixed() && a.isDisplayed())
                for (var e = a.j.getAmpdoc().win, g = e.document.body, h = a.element; h && h != g; h = h.offsetParent) {
                    if (h.isAlwaysFixed && h.isAlwaysFixed()) {
                        d = !0;
                        break
                    }
                    if (c.isDeclaredFixed(h) && "fixed" == te(e, h).position) {
                        d = !0;
                        break
                    }
                }
            if (a.sc = d) a.da = hc(a.da, -c.getScrollLeft(), -c.getScrollTop())
        }
        f.completeCollapse = function() {
            se(this.element, !1);
            this.da = ec(this.da.left, this.da.top, 0, 0);
            this.sc = !1;
            this.element.updateLayoutBox(this.getLayoutBox());
            var a = this.getOwner();
            a && a.collapsedCallback(this.element)
        };
        f.completeExpand = function() {
            se(this.element, !0);
            this.requestMeasure()
        };
        f.isMeasureRequested = function() {
            return this.Yd
        };
        f.hasBeenMeasured = function() {
            return !!this.Rd
        };
        f.hasBeenPremeasured = function() {
            return !!this.Ob
        };
        f.requestMeasure = function() {
            this.Yd = !0
        };
        f.getLayoutBox = function() {
            if (!this.sc) return this.da;
            var a = xd(this.element);
            return hc(this.da, a.getScrollLeft(), a.getScrollTop())
        };
        f.getPageLayoutBox = function() {
            return this.da
        };
        f.getPageLayoutBoxAsync = function() {
            var a = this;
            return this.hasBeenMeasured() ? mb(function() {
                return a.getPageLayoutBox()
            }) : wd(this.hostWin).measurePromise(function() {
                a.measure();
                return a.getPageLayoutBox()
            })
        };
        f.getInitialLayoutBox = function() {
            return this.Rd || this.da
        };
        f.isDisplayed = function(a) {
            a = void 0 === a ? !1 : a;
            var b = "fluid" == this.element.getLayout(),
                c = a ? this.Ob : this.getLayoutBox(),
                d = 0 < c.height && 0 < c.width;
            return (b || d) && !!this.element.ownerDocument && !!this.element.ownerDocument.defaultView
        };
        f.isFixed = function() {
            return this.sc
        };
        f.overlaps = function(a) {
            var b = this.getLayoutBox();
            return b.top <= a.bottom && a.top <= b.bottom && b.left <= a.right && a.left <= b.right
        };
        f.prerenderAllowed = function() {
            return this.element.prerenderAllowed()
        };
        f.isBuildRenderBlocking = function() {
            return this.element.isBuildRenderBlocking()
        };
        f.whenWithinViewport = function(a) {
            if (!this.isLayoutPending() || !0 === a) return x();
            var b = String(a);
            if (this.pa && this.pa[b]) return this.pa[b].promise;
            if (this.isWithinViewportRatio(a)) return x();
            this.pa = this.pa || {};
            this.pa[b] = new L;
            return this.pa[b].promise
        };

        function mi(a) {
            if (a.pa) {
                var b = a.getDistanceViewportRatio(),
                    c;
                for (c in a.pa) a.isWithinViewportRatio(parseFloat(c), b) && (a.pa[c].resolve(), delete a.pa[c])
            }
        }
        f.getDistanceViewportRatio = function() {
            var a = xd(this.element).getRect(),
                b = this.getLayoutBox(),
                c = this.j.getScrollDirection(),
                d = 1,
                e = 0;
            if (a.right < b.left || a.left > b.right) return {
                distance: !1
            };
            if (a.bottom < b.top) e = b.top - a.bottom, -1 == c && (d = 2);
            else if (a.top > b.bottom) e = a.top - b.bottom, 1 == c && (d = 2);
            else return {
                distance: !0
            };
            return {
                distance: e,
                scrollPenalty: d,
                viewportHeight: a.height
            }
        };
        f.isWithinViewportRatio = function(a, b) {
            if ("boolean" === typeof a) return a;
            var c = b || this.getDistanceViewportRatio(),
                d = c.distance;
            return "boolean" == typeof d ? d : d < c.viewportHeight * a / c.scrollPenalty
        };
        f.renderOutsideViewport = function() {
            mi(this);
            return this.hasOwner() || this.isWithinViewportRatio(this.element.renderOutsideViewport())
        };
        f.idleRenderOutsideViewport = function() {
            return this.isWithinViewportRatio(this.element.idleRenderOutsideViewport())
        };
        f.layoutScheduled = function(a) {
            this.G = 3;
            this.element.layoutScheduleTime = a
        };
        f.layoutCanceled = function() {
            this.G = this.hasBeenMeasured() ? 2 : 1
        };
        f.startLayout = function() {
            var a = this;
            if (this.$a) return this.$a;
            if (4 == this.G) return x();
            if (5 == this.G) return Promise.reject(this.Kf);
            this.isDisplayed();
            if (0 < this.ea && !this.element.isRelayoutNeeded()) return E().fine("Resource", "layout canceled since it wasn't requested:", this.debugid, this.G), this.G = 4, x();
            E().fine("Resource", "start layout:", this.debugid, "count:", this.ea);
            this.ea++;
            this.G = 3;
            return this.$a = (new Promise(function(b, c) {
                wd(a.hostWin).mutate(function() {
                    try {
                        b(a.element.layoutCallback())
                    } catch (d) {
                        c(d)
                    }
                })
            })).then(function() {
                return ni(a,
                    !0)
            }, function(b) {
                return ni(a, !1, b)
            })
        };

        function ni(a, b, c) {
            a.de && (a.de(), a.de = null);
            a.$a = null;
            a.Nf = !0;
            a.G = b ? 4 : 5;
            a.Kf = c;
            if (b) E().fine("Resource", "layout complete:", a.debugid);
            else return E().fine("Resource", "loading failed:", a.debugid, c), Promise.reject(c)
        }
        f.isLayoutPending = function() {
            return 4 != this.G && 5 != this.G
        };
        f.loadedOnce = function() {
            return this.ph
        };
        f.hasLoadedOnce = function() {
            return this.Nf
        };
        f.isInViewport = function() {
            var a = this.element.isInViewport();
            a && mi(this);
            return a
        };
        f.setInViewport = function(a) {
            this.element.viewportCallback(a)
        };
        f.unlayout = function() {
            0 != this.G && 1 != this.G && (this.setInViewport(!1), this.element.unlayoutCallback() && (this.element.togglePlaceholder(!0), this.G = 1, this.ea = 0, this.$a = null))
        };
        f.getTaskId = function(a) {
            return this.debugid + "#" + a
        };
        f.pause = function() {
            this.element.pauseCallback();
            this.element.unlayoutOnPause() && this.unlayout()
        };
        f.pauseOnRemove = function() {
            this.element.pauseCallback()
        };
        f.resume = function() {
            this.element.resumeCallback()
        };
        f.unload = function() {
            this.pause();
            this.unlayout()
        };
        f.disconnect = function() {
            delete this.element.__AMP__RESOURCE;
            this.element.disconnect(!0)
        };

        function oi() {
            this.Ea = I();
            this.ga = null
        }
        f = oi.prototype;
        f.get = function(a) {
            a = this.Ea[a];
            return null == a ? null : a
        };
        f.whenSignal = function(a) {
            var b = this.ga && this.ga[a];
            if (!b) {
                var c = this.Ea[a];
                null != c ? b = {
                    promise: "number" == typeof c ? Promise.resolve(c) : Promise.reject(c)
                } : (c = new L, b = {
                    promise: c.promise,
                    resolve: c.resolve,
                    reject: c.reject
                });
                this.ga || (this.ga = I());
                this.ga[a] = b
            }
            return b.promise
        };
        f.signal = function(a, b) {
            if (null == this.Ea[a]) {
                var c = b || Date.now();
                this.Ea[a] = c;
                (a = this.ga && this.ga[a]) && a.resolve && (a.resolve(c), a.resolve = void 0, a.reject = void 0)
            }
        };
        f.rejectSignal = function(a, b) {
            null == this.Ea[a] && (this.Ea[a] = b, (a = this.ga && this.ga[a]) && a.reject && (a.reject(b), a.resolve = void 0, a.reject = void 0))
        };
        f.reset = function(a) {
            this.Ea[a] && delete this.Ea[a];
            var b = this.ga && this.ga[a];
            b && !b.resolve && delete this.ga[a]
        };

        function pi(a, b) {
            return td(a.win).installExtensionForDoc(a, "amp-loader").then(function() {
                return ld(b, "loader", "amp-loader")
            })
        }

        function qi(a, b, c, d, e) {
            e = void 0 === e ? a.win.Date.now() : e;
            var g = b.ownerDocument.createElement("div");
            pi(a, b).then(function(h) {
                var l = a.win.Date.now() - e;
                h.initializeLoader(b, g, l, c, d)
            });
            return g
        };

        function ri(a, b, c) {
            var d = this;
            this.R = V(a);
            this.dh = b;
            this.Pg = c || 0;
            this.ua = -1;
            this.le = 0;
            this.Pa = !1;
            this.Hg = function() {
                d.Mc()
            }
        }
        ri.prototype.isPending = function() {
            return -1 != this.ua
        };
        ri.prototype.schedule = function(a) {
            a = a || this.Pg;
            this.Pa && 10 > a && (a = 10);
            var b = Date.now() + a;
            return !this.isPending() || -10 > b - this.le ? (this.cancel(), this.le = b, this.ua = this.R.delay(this.Hg, a), !0) : !1
        };
        ri.prototype.Mc = function() {
            this.ua = -1;
            this.le = 0;
            this.Pa = !0;
            this.dh();
            this.Pa = !1
        };
        ri.prototype.cancel = function() {
            this.isPending() && (this.R.cancel(this.ua), this.ua = -1)
        };
        var si = Date.now();

        function ti(a, b) {
            var c = a.split(",");
            F(0 < c.length, "sizes has to have at least one size");
            var d = [];
            c.forEach(function(a) {
                a = a.replace(/\s+/g, " ").trim();
                if (0 != a.length) {
                    var c, e = !1;
                    if (")" == a.charAt(a.length - 1)) {
                        e = !0;
                        var l = 1;
                        for (c = a.length - 2; 0 <= c; c--) {
                            var k = a.charAt(c);
                            "(" == k ? l-- : ")" == k && l++;
                            if (0 == l) break
                        }
                        var n = c - 1;
                        if (0 < c)
                            for (c--; 0 <= c && (k = a.charAt(c), "%" == k || "-" == k || "_" == k || "a" <= k && "z" >= k || "A" <= k && "Z" >= k || "0" <= k && "9" >= k); c--);
                        F(c < n, 'Invalid CSS function in "%s"', a)
                    } else
                        for (c = a.length - 2; 0 <= c && (k = a.charAt(c),
                                "%" == k || "." == k || "a" <= k && "z" >= k || "A" <= k && "Z" >= k || "0" <= k && "9" >= k); c--);
                    if (0 <= c) {
                        var r = a.substring(0, c + 1).trim();
                        var u = a.substring(c + 1).trim()
                    } else u = a, r = void 0;
                    d.push({
                        mediaQuery: r,
                        size: e ? u : b ? De(u) : Ce(u)
                    })
                }
            });
            return new ui(d)
        }

        function ui(a) {
            F(0 < a.length, "SizeList must have at least one option");
            this.Vh = a;
            for (var b = 0; b < a.length; b++) {
                var c = a[b];
                b < a.length - 1 ? F(c.mediaQuery, "All options except for the last must have a media condition") : F(!c.mediaQuery, "The last option must not have a media condition")
            }
        }
        ui.prototype.select = function(a) {
            for (var b = this.Vh, c = b.length - 1, d = 0; d < c; d++) {
                var e = b[d];
                if (a.matchMedia(e.mediaQuery).matches) return e.size
            }
            return b[c].size
        };
        var vi = /nochunking=1/.test(self.location.hash),
            wi = x();

        function xi(a) {
            S(a, "chunk", yi);
            return bd(a, "chunk")
        }

        function zi(a, b, c) {
            if (vi) wi.then(b);
            else {
                var d = xi(a.documentElement || a);
                d.runForStartup(b);
                c && d.runForStartup(function() {
                    d.Se = !0
                })
            }
        }

        function Ai(a, b) {
            vi ? wi.then(b) : xi(a).run(b, 10)
        }

        function Bi(a) {
            this.state = "not_run";
            this.Jd = a
        }

        function Ci(a, b) {
            if ("run" != a.state) {
                a.state = "run";
                try {
                    a.Jd(b)
                } catch (c) {
                    throw a.Vf(), c;
                }
            }
        }
        Bi.prototype.Vf = function() {};
        Bi.prototype.Df = function() {
            return !1
        };
        Bi.prototype.wg = function() {
            return !1
        };

        function Di(a, b, c) {
            Bi.call(this, a);
            this.hf = c
        }
        m(Di, Bi);
        Di.prototype.Vf = function() {
            jf(self.document)
        };
        Di.prototype.Df = function() {
            return this.hf.ampdoc.isVisible()
        };
        Di.prototype.wg = function() {
            return this.hf.kf
        };

        function yi(a) {
            var b = this;
            this.ampdoc = a;
            this.w = a.win;
            this.L = new xh;
            this.Ue = this.rf.bind(this);
            this.Xa = 0;
            this.Tc = !1;
            this.Se = this.w.document.documentElement.hasAttribute("i-amphtml-no-boilerplate");
            this.w.addEventListener("message", function(a) {
                "amp-macro-task" == a.data && b.rf(null)
            });
            this.kf = !1;
            gd(Yc(a), "viewer").then(function() {
                b.kf = !0
            });
            a.onVisibilityChanged(function() {
                a.isVisible() && b.xa()
            })
        }
        yi.prototype.run = function(a, b) {
            a = new Bi(a);
            this.L.enqueue(a, b);
            this.xa()
        };
        yi.prototype.runForStartup = function(a) {
            a = new Di(a, this.w, this);
            this.L.enqueue(a, Number.POSITIVE_INFINITY);
            this.xa()
        };

        function Ei(a, b) {
            for (var c = a.L.peek(); c && "not_run" !== c.state;) a.L.dequeue(), c = a.L.peek();
            c && b && a.L.dequeue();
            return c
        }
        yi.prototype.rf = function(a) {
            var b = this,
                c = Ei(this, !0);
            if (!c) return this.Tc = !1, this.Xa = 0, !1;
            try {
                var d = Date.now();
                Ci(c, a)
            } finally {
                wi.then().then().then().then().then().then().then().then().then(function() {
                    b.Tc = !1;
                    b.Xa += Date.now() - d;
                    E().fine("CHUNK", c.Jd.displayName || c.Jd.name, "Chunk duration", Date.now() - d, b.Xa);
                    b.xa()
                })
            }
            return !0
        };

        function Fi(a) {
            a.Se && 5 < a.Xa ? (a.Xa = 0, Gi(a)) : wi.then(function() {
                a.Ue(null)
            })
        }
        yi.prototype.xa = function() {
            if (!this.Tc) {
                var a = Ei(this);
                a && (a.Df() ? (this.Tc = !0, Fi(this)) : a.wg() && this.w.requestIdleCallback ? Hi(this.w, this.Ue) : Gi(this))
            }
        };

        function Gi(a) {
            a.w.postMessage("amp-macro-task", "*")
        }

        function Hi(a, b) {
            function c(e) {
                if (15 > e.timeRemaining()) {
                    var g = 2E3 - (Date.now() - d);
                    0 >= g || e.didTimeout ? (E().fine("CHUNK", "Timed out", 2E3, e.didTimeout), b(e)) : (E().fine("CHUNK", "Rescheduling with", g, e.timeRemaining()), a.requestIdleCallback(c, {
                        timeout: g
                    }))
                } else E().fine("CHUNK", "Running idle callback with ", 15), b(e)
            }
            var d = Date.now();
            a.requestIdleCallback(c, {
                timeout: 2E3
            })
        };
        var Ii = ['<div class="i-amphtml-loading-container i-amphtml-fill-content amp-hidden"></div>'],
            Ji;

        function Ki(a) {
            function b() {
                return c.apply(this, arguments) || this
            }
            var c = Li(a);
            m(b, c);
            return b
        }

        function Li(a) {
            function b() {
                var a = c.call(this) || this;
                a.createdCallback();
                return a
            }
            if (a.__AMP_BASE_CE_CLASS) return a.__AMP_BASE_CE_CLASS;
            var c = a.HTMLElement;
            m(b, c);
            b.prototype.createdCallback = function() {
                this.rc = this.cf = !1;
                this.hc = null;
                this.readyState = "loading";
                this.everAttached = !1;
                this.j = this.C = null;
                this.layout_ = "nodisplay";
                this.Mf = this.yc = -1;
                this.ea = 0;
                this.Mb = this.Fb = this.Vd = !1;
                this.oc = this.Wc = this.Cc = void 0;
                this.warnOnMissingOverflow = !0;
                this.zc = this.ee = this.sizerElement = void 0;
                this.fe = this.Ma = null;
                this.layoutScheduleTime = this.na = void 0;
                this.implementation_ = new(a.__AMP_EXTENDED_ELEMENTS && a.__AMP_EXTENDED_ELEMENTS[this.localName])(this);
                this.lb = 1;
                this.tg = 0;
                this.Eb = this.Ka = void 0;
                this.K = new oi;
                var b = ad(a);
                this.Xf = b && b.isPerformanceTrackingOn();
                this.ce = null;
                this.__AMP_UPG_RES && (this.__AMP_UPG_RES(this), delete this.__AMP_UPG_RES, delete this.__AMP_UPG_PRM)
            };
            b.prototype.signals = function() {
                return this.K
            };
            b.prototype.getAmpDoc = function() {
                return this.C
            };
            b.prototype.getResources = function() {
                return this.j
            };
            b.prototype.isUpgraded = function() {
                return 2 == this.lb
            };
            b.prototype.whenUpgraded = function() {
                return this.K.whenSignal("upgraded")
            };
            b.prototype.upgrade = function(a) {
                this.Eb || 1 != this.lb || (this.implementation_ = new a(this), this.everAttached && this.qg())
            };
            b.prototype.getUpgradeDelayMs = function() {
                return this.tg
            };
            b.prototype.Cd = function(b, c) {
                this.tg = a.Date.now() - c;
                this.lb = 2;
                this.implementation_ = b;
                this.classList.remove("amp-unresolved");
                this.classList.remove("i-amphtml-unresolved");
                this.implementation_.createdCallback();
                this.Dg();
                this.implementation_.layout_ = this.layout_;
                this.implementation_.firstAttachedCallback();
                this.Ca("amp:attached");
                this.getResources().upgraded(this);
                this.K.signal("upgraded")
            };
            b.prototype.Dg = function() {
                "nodisplay" == this.layout_ || this.implementation_.isLayoutSupported(this.layout_) || (F(this.getAttribute("layout"), "The element did not specify a layout attribute. Check https://amp.dev/documentation/guides-and-tutorials/develop/style_and_layout/control_layout and the respective element documentation for details."),
                    F(!1, "Layout not supported: " + this.layout_))
            };
            b.prototype.isBuilt = function() {
                return this.cf
            };
            b.prototype.whenBuilt = function() {
                return this.K.whenSignal("built")
            };
            b.prototype.getLayoutPriority = function() {
                this.isUpgraded();
                return this.implementation_.getLayoutPriority()
            };
            b.prototype.getLayoutWidth = function() {
                return this.yc
            };
            b.prototype.getDefaultActionAlias = function() {
                this.isUpgraded();
                return this.implementation_.getDefaultActionAlias()
            };
            b.prototype.isBuilding = function() {
                return !!this.hc
            };
            b.prototype.build =
                function() {
                    var a = this;
                    this.isUpgraded();
                    return this.hc ? this.hc : this.hc = (new Promise(function(b, c) {
                        var d = a.Wg();
                        d ? md(a, "consentPolicyManager", "amp-consent").then(function(a) {
                            return a ? a.whenPolicyUnblock(d) : !0
                        }).then(function(d) {
                            d ? b(a.implementation_.buildCallback()) : c(Error("BLOCK_BY_CONSENT"))
                        }) : b(a.implementation_.buildCallback())
                    })).then(function() {
                        a.preconnect(!1);
                        a.cf = !0;
                        a.classList.remove("i-amphtml-notbuilt");
                        a.classList.remove("amp-notbuilt");
                        a.K.signal("built");
                        a.Fb && a.rg(!0);
                        a.Ka && V(a.ownerDocument.defaultView).delay(a.Qg.bind(a),
                            1);
                        if (!a.getPlaceholder()) {
                            var b = a.createPlaceholder();
                            b && a.appendChild(b)
                        }
                    }, function(b) {
                        a.K.rejectSignal("built", b);
                        Bf(b) || zf(b, a);
                        throw b;
                    })
                };
            b.prototype.preconnect = function(a) {
                var b = this;
                a ? this.implementation_.preconnectCallback(a) : zi(this.getAmpDoc(), function() {
                    var c = b.tagName;
                    b.ownerDocument ? b.ownerDocument.defaultView ? b.implementation_.preconnectCallback(a) : E().error(c, "preconnect without defaultView") : E().error(c, "preconnect without ownerDocument")
                })
            };
            b.prototype.isAlwaysFixed = function() {
                return this.implementation_.isAlwaysFixed()
            };
            b.prototype.updateLayoutBox = function(a, b) {
                b = void 0 === b ? !1 : b;
                this.yc = a.width;
                this.Mf = a.height;
                if (this.isBuilt()) this.onMeasure(b)
            };
            b.prototype.onMeasure = function(a) {
                a = void 0 === a ? !1 : a;
                this.isBuilt();
                try {
                    if (this.implementation_.onLayoutMeasure(), a) this.implementation_.onMeasureChanged()
                } catch (e) {
                    zf(e, this)
                }
            };
            b.prototype.wf = function() {
                void 0 !== this.sizerElement || "responsive" !== this.layout_ && "intrinsic" !== this.layout_ || (this.sizerElement = this.querySelector("i-amphtml-sizer"));
                return this.sizerElement ||
                    null
            };
            b.prototype.Mh = function(a) {
                if ("responsive" === this.layout_) X(a, "paddingTop", "0");
                else if ("intrinsic" === this.layout_) {
                    var b = a.querySelector(".i-amphtml-intrinsic-sizer");
                    b && b.setAttribute("src", "")
                }
            };
            b.prototype.applySizesAndMediaQuery = function() {
                void 0 === this.Cc && (this.Cc = this.getAttribute("media") || null);
                this.Cc && this.classList.toggle("i-amphtml-hidden-by-media-query", !this.ownerDocument.defaultView.matchMedia(this.Cc).matches);
                if (void 0 === this.Wc) {
                    var a = this.getAttribute("sizes");
                    this.Wc = !this.hasAttribute("disable-inline-width") &&
                        a ? ti(a) : null
                }
                this.Wc && X(this, "width", this.Wc.select(this.ownerDocument.defaultView));
                void 0 === this.oc && "responsive" === this.layout_ && (this.oc = (a = this.getAttribute("heights")) ? ti(a, !0) : null);
                this.oc && (a = this.wf()) && X(a, "paddingTop", this.oc.select(this.ownerDocument.defaultView))
            };
            b.prototype.applySize = function(a, b, c) {
                var d = this.wf();
                d && (this.sizerElement = null, this.Mh(d), this.he(function() {
                    d && xb(d)
                }));
                void 0 !== a && X(this, "height", a, "px");
                void 0 !== b && X(this, "width", b, "px");
                c && (null != c.top && X(this, "marginTop",
                    c.top, "px"), null != c.right && X(this, "marginRight", c.right, "px"), null != c.bottom && X(this, "marginBottom", c.bottom, "px"), null != c.left && X(this, "marginLeft", c.left, "px"));
                this.gh() && this.Uh();
                this.dispatchCustomEvent("amp:size-changed")
            };
            b.prototype.connectedCallback = function() {
                void 0 === Ji && (Ji = "content" in self.document.createElement("template"));
                Ji || void 0 !== this.Eb || (this.Eb = !!Eb(this, "template"));
                if (!this.Eb && !this.rc && zb(this)) {
                    this.rc = !0;
                    this.everAttached || (this.classList.add("i-amphtml-element"), this.classList.add("i-amphtml-notbuilt"),
                        this.classList.add("amp-notbuilt"));
                    if (!this.C) {
                        var a = this.ownerDocument.defaultView,
                            b = rd(a).getAmpDoc(this);
                        this.C = b;
                        var c = this.tagName.toLowerCase();
                        this.implementation_ instanceof gi && !b.declaresExtension(c) && td(a).installExtensionForDoc(b, c)
                    }
                    this.j || (this.j = vd(this.C));
                    this.getResources().add(this);
                    if (this.everAttached) {
                        var h = this.reconstructWhenReparented();
                        h && this.bg();
                        this.isUpgraded() && (h && this.getResources().upgraded(this), this.Ca("amp:attached"))
                    } else {
                        this.everAttached = !0;
                        try {
                            var l = this.getAttribute("i-amphtml-layout");
                            if (l) {
                                var k = ze(l);
                                "responsive" != k && "intrinsic" != k || !this.firstElementChild ? "nodisplay" == k && (se(this, !1), this.style.display = "") : (this.sizerElement = this.querySelector("i-amphtml-sizer") || void 0) && this.sizerElement.setAttribute("slot", "i-amphtml-svc");
                                var n = k
                            } else {
                                var r = this.getAttribute("layout"),
                                    u = this.getAttribute("width"),
                                    w = this.getAttribute("height"),
                                    z = this.getAttribute("sizes"),
                                    q = this.getAttribute("heights"),
                                    p = r ? ze(r) : null;
                                F(void 0 !== p, 'Invalid "layout" value: %s, %s', r, this);
                                var M = u && "auto" !=
                                    u ? Be(u) : u;
                                F(void 0 !== M, 'Invalid "width" value: %s, %s', u, this);
                                var H = w && "fluid" != w ? Be(w) : w;
                                F(void 0 !== H, 'Invalid "height" value: %s, %s', w, this);
                                var la;
                                if (!(la = p && "fixed" != p && "fixed-height" != p || M && H)) {
                                    var ma = this.tagName;
                                    ma = ma.toUpperCase();
                                    la = void 0 === we[ma]
                                }
                                if (la) {
                                    var D = M;
                                    var G = H
                                } else {
                                    var wc = this.tagName.toUpperCase();
                                    if (!we[wc]) {
                                        var Vd = this.ownerDocument,
                                            Kl = wc.replace(/^AMP\-/, ""),
                                            gb = Vd.createElement(Kl);
                                        gb.controls = !0;
                                        re(gb, {
                                            position: "absolute",
                                            visibility: "hidden"
                                        });
                                        Vd.body.appendChild(gb);
                                        we[wc] = {
                                            width: (gb.offsetWidth || 1) + "px",
                                            height: (gb.offsetHeight || 1) + "px"
                                        };
                                        Vd.body.removeChild(gb)
                                    }
                                    var ah = we[wc];
                                    D = M || "fixed-height" == p ? M : ah.width;
                                    G = H || ah.height
                                }
                                var J = p ? p : D || G ? "fluid" == G ? "fluid" : !G || D && "auto" != D ? G && D && (z || q) ? "responsive" : "fixed" : "fixed-height" : "container";
                                "fixed" != J && "fixed-height" != J && "responsive" != J && "intrinsic" != J || F(G, 'The "height" attribute is missing: %s', this);
                                "fixed-height" == J && F(!D || "auto" == D, 'The "width" attribute must be missing or "auto": %s', this);
                                "fixed" != J && "responsive" != J &&
                                    "intrinsic" != J || F(D && "auto" != D, 'The "width" attribute must be present and not "auto": %s', this);
                                "responsive" == J || "intrinsic" == J ? F(Ee(D) == Ee(G), 'Length units should be the same for "width" and "height": %s, %s, %s', u, w, this) : F(null === q, '"heights" attribute must be missing: %s', this);
                                this.classList.add("i-amphtml-layout-" + J);
                                Ae(J) && this.classList.add("i-amphtml-layout-size-defined");
                                if ("nodisplay" == J) se(this, !1), this.style.display = "";
                                else if ("fixed" == J) re(this, {
                                    width: D,
                                    height: G
                                });
                                else if ("fixed-height" ==
                                    J) X(this, "height", G);
                                else if ("responsive" == J) {
                                    var xc = this.ownerDocument.createElement("i-amphtml-sizer");
                                    xc.setAttribute("slot", "i-amphtml-svc");
                                    re(xc, {
                                        paddingTop: Fe(G) / Fe(D) * 100 + "%"
                                    });
                                    this.insertBefore(xc, this.firstChild);
                                    this.sizerElement = xc
                                } else if ("intrinsic" == J) {
                                    var Wd = ke(this)(ue);
                                    Wd.firstElementChild.setAttribute("src", 'data:image/svg+xml;charset=utf-8,<svg height="' + G + '" width="' + D + '" xmlns="http://www.w3.org/2000/svg" version="1.1"/>');
                                    this.insertBefore(Wd, this.firstChild);
                                    this.sizerElement =
                                        Wd
                                } else "fill" != J && "container" != J && ("flex-item" == J ? (D && X(this, "width", D), G && X(this, "height", G)) : "fluid" == J && (this.classList.add("i-amphtml-layout-awaiting-size"), D && X(this, "width", D), X(this, "height", 0)));
                                this.setAttribute("i-amphtml-layout", J);
                                n = J
                            }
                            this.layout_ = n
                        } catch (Ll) {
                            zf(Ll, this)
                        }
                        this.implementation_ instanceof gi || this.qg();
                        this.isUpgraded() || (this.classList.add("amp-unresolved"), this.classList.add("i-amphtml-unresolved"), this.Ca("amp:stubbed"));
                        this.getResources().isIntersectionExperimentOn() &&
                            this.applySizesAndMediaQuery()
                    }
                }
            };
            b.prototype.gh = function() {
                return this.classList.contains("i-amphtml-layout-awaiting-size")
            };
            b.prototype.Uh = function() {
                this.classList.remove("i-amphtml-layout-awaiting-size")
            };
            b.prototype.attachedCallback = function() {
                this.connectedCallback()
            };
            b.prototype.qg = function() {
                var b = this,
                    c = this.implementation_;
                if (1 == this.lb) {
                    this.lb = 4;
                    var g = a.Date.now(),
                        h = c.upgradeCallback();
                    h ? "function" == typeof h.then ? h.then(function(a) {
                        b.Cd(a || c, g)
                    }).catch(function(a) {
                        b.lb = 3;
                        hb(a)
                    }) : this.Cd(h,
                        g) : this.Cd(c, g)
                }
            };
            b.prototype.disconnectedCallback = function() {
                this.disconnect(!1)
            };
            b.prototype.detachedCallback = function() {
                this.disconnectedCallback()
            };
            b.prototype.disconnect = function(a) {
                this.Eb || !this.rc || !a && zb(this) || (a && this.classList.remove("i-amphtml-element"), this.rc = !1, this.getResources().remove(this), this.implementation_.detachedCallback())
            };
            b.prototype.dispatchCustomEvent = function(a, b) {
                b = b || {};
                var c = this.ownerDocument.createEvent("Event");
                c.data = b;
                c.initEvent(a, !0, !0);
                this.dispatchEvent(c)
            };
            b.prototype.Ca = function() {};
            b.prototype.prerenderAllowed = function() {
                return this.implementation_.prerenderAllowed()
            };
            b.prototype.isBuildRenderBlocking = function() {
                return this.implementation_.isBuildRenderBlocking()
            };
            b.prototype.createPlaceholder = function() {
                return this.implementation_.createPlaceholderCallback()
            };
            b.prototype.createLoaderLogo = function() {
                return this.implementation_.createLoaderLogoCallback()
            };
            b.prototype.renderOutsideViewport = function() {
                return this.implementation_.renderOutsideViewport()
            };
            b.prototype.idleRenderOutsideViewport = function() {
                return this.implementation_.idleRenderOutsideViewport()
            };
            b.prototype.getLayoutBox = function() {
                return this.zb().getLayoutBox()
            };
            b.prototype.getPageLayoutBox = function() {
                return this.zb().getPageLayoutBox()
            };
            b.prototype.getOwner = function() {
                return this.zb().getOwner()
            };
            b.prototype.getIntersectionChangeEntry = function() {
                var a = this.implementation_.getIntersectionElementLayoutBox(),
                    b = this.getOwner(),
                    c = this.implementation_.getViewport().getRect(),
                    h = b && b.getLayoutBox(),
                    l = fc(a, h, c) || ec(0, 0, 0, 0);
                b = l.width * l.height;
                var k = a.width * a.height;
                b = 0 === k ? 0 : b / k;
                if (k = c) l = hc(l, -c.left, -c.top), a = hc(a, -c.left, -c.top), k = hc(k, -c.left, -c.top);
                return {
                    time: "undefined" !== typeof performance && performance.now ? performance.now() : Date.now() - si,
                    rootBounds: k,
                    boundingClientRect: a,
                    intersectionRect: l,
                    intersectionRatio: b
                }
            };
            b.prototype.zb = function() {
                return this.getResources().getResourceForElement(this)
            };
            b.prototype.getResourceId = function() {
                return this.zb().getId()
            };
            b.prototype.isRelayoutNeeded = function() {
                return this.implementation_.isRelayoutNeeded()
            };
            b.prototype.getImpl = function(a) {
                var b = this;
                a = void 0 === a ? !0 : a;
                return (a ? this.whenBuilt() : this.whenUpgraded()).then(function() {
                    return b.implementation_
                })
            };
            b.prototype.getLayout = function() {
                return this.layout_
            };
            b.prototype.layoutCallback = function() {
                var a = this;
                this.isBuilt();
                this.Ca("amp:load-start");
                var b = 0 == this.ea;
                this.K.reset("unload");
                b && this.K.signal("load-start");
                this.Xf && this.vf().startLayout();
                var c = mb(function() {
                    return a.implementation_.layoutCallback()
                });
                this.preconnect(!0);
                this.classList.add("i-amphtml-layout");
                return c.then(function() {
                    b && a.K.signal("load-end");
                    a.readyState = "complete";
                    a.ea++;
                    a.toggleLoading(!1, {
                        cleanup: !0
                    });
                    a.Vd || (a.implementation_.firstLayoutCompleted(), a.Vd = !0, a.Ca("amp:load-end"))
                }, function(c) {
                    b && a.K.rejectSignal("load-end", c);
                    a.ea++;
                    a.toggleLoading(!1, {
                        cleanup: !0
                    });
                    throw c;
                })
            };
            b.prototype.isInViewport = function() {
                return this.Fb
            };
            b.prototype.viewportCallback = function(b) {
                var c = this;
                if (b != this.Fb && this.ownerDocument && this.ownerDocument.defaultView) {
                    this.Fb = b;
                    if (0 == this.ea)
                        if (b) {
                            var d = a.Date.now();
                            V(this.ownerDocument.defaultView).delay(function() {
                                c.Fb && c.ownerDocument && c.ownerDocument.defaultView && 0 === c.ea && c.toggleLoading(!0, {
                                    startTime: d
                                })
                            }, 100)
                        } else this.toggleLoading(!1);
                    this.isBuilt() && this.rg(b)
                }
            };
            b.prototype.rg = function(a) {
                this.implementation_.inViewport_ = a;
                this.implementation_.viewportCallback(a);
                a && this.Xf && this.vf().enterViewport()
            };
            b.prototype.isPaused = function() {
                return this.Mb
            };
            b.prototype.pauseCallback = function() {
                this.Mb || (this.Mb = !0, this.viewportCallback(!1), this.isBuilt() && this.implementation_.pauseCallback())
            };
            b.prototype.resumeCallback = function() {
                this.Mb && (this.Mb = !1, this.isBuilt() && this.implementation_.resumeCallback())
            };
            b.prototype.unlayoutCallback = function() {
                if (!this.isBuilt()) return !1;
                this.K.signal("unload");
                var a = this.implementation_.unlayoutCallback();
                a && this.bg();
                this.Ca("amp:unload");
                return a
            };
            b.prototype.bg = function() {
                this.ea = 0;
                this.Vd = !1;
                this.K.reset("render-start");
                this.K.reset("load-start");
                this.K.reset("load-end");
                this.K.reset("ini-load")
            };
            b.prototype.unlayoutOnPause = function() {
                return this.implementation_.unlayoutOnPause()
            };
            b.prototype.reconstructWhenReparented = function() {
                return this.implementation_.reconstructWhenReparented()
            };
            b.prototype.collapse = function() {
                this.implementation_.collapse()
            };
            b.prototype.collapsedCallback = function(a) {
                this.implementation_.collapsedCallback(a)
            };
            b.prototype.expand = function() {
                this.implementation_.expand()
            };
            b.prototype.expandedCallback = function(a) {
                this.implementation_.expandedCallback(a)
            };
            b.prototype.mutatedAttributesCallback = function(a) {
                this.implementation_.mutatedAttributesCallback(a)
            };
            b.prototype.enqueAction = function(a) {
                this.isBuilt() ? this.sf(a, !1) : (void 0 === this.Ka && (this.Ka = []), this.Ka.push(a))
            };
            b.prototype.Qg = function() {
                var a = this;
                if (this.Ka) {
                    var b = this.Ka;
                    this.Ka = null;
                    b.forEach(function(b) {
                        a.sf(b, !0)
                    })
                }
            };
            b.prototype.sf = function(a, b) {
                try {
                    this.implementation_.executeAction(a, b)
                } catch (g) {
                    hb("Action execution failed:", g, a.node.tagName, a.method)
                }
            };
            b.prototype.Wg = function() {
                var a = this.getAttribute("data-block-on-consent");
                if (null === a)
                    if ((a = this.getAmpDoc().getMetaByName("amp-consent-blocking")) ?
                        (a = a.toUpperCase().replace(/\s+/g, ""), a = a.split(",").includes(this.tagName)) : a = !1, a) a = "default", this.setAttribute("data-block-on-consent", a);
                    else return null;
                return "" == a || "default" == a ? this.implementation_.getConsentPolicy() : a
            };
            b.prototype.getRealChildNodes = function() {
                return Ib(this, function(a) {
                    return !Mi(a)
                })
            };
            b.prototype.getRealChildren = function() {
                return Gb(this, function(a) {
                    return !Mi(a)
                })
            };
            b.prototype.getPlaceholder = function() {
                return Hb(this, function(a) {
                    return a.hasAttribute("placeholder") && !("placeholder" in
                        a)
                })
            };
            b.prototype.togglePlaceholder = function(a) {
                if (a) {
                    var b = this.getPlaceholder();
                    b && b.classList.remove("amp-hidden")
                } else {
                    /^[\w-]+$/.test("placeholder");
                    b = (void 0 !== pb ? pb : pb = qb(this)) ? this.querySelectorAll("> [placeholder]".replace(/^|,/g, "$&:scope ")) : Lb(this, "> [placeholder]");
                    for (var c = 0; c < b.length; c++) "placeholder" in b[c] || b[c].classList.add("amp-hidden")
                }
            };
            b.prototype.getFallback = function() {
                return Jb(this, "fallback")
            };
            b.prototype.toggleFallback = function(a) {
                var b = this.zb().getState();
                if (!a ||
                    0 != b && 1 != b && 2 != b)
                    if (this.classList.toggle("amp-notsupported", a), 1 == a) {
                        var c = this.getFallback();
                        c && bd(this.getAmpDoc(), "owners").scheduleLayout(this, c)
                    }
            };
            b.prototype.renderStarted = function() {
                this.K.signal("render-start");
                this.togglePlaceholder(!1);
                this.toggleLoading(!1)
            };
            b.prototype.Wd = function() {
                if (this.isInA4A()) return !1;
                void 0 === this.ee && (this.ee = this.hasAttribute("noloading"));
                var a = 0 < this.ea || this.K.get("render-start"),
                    b;
                (b = this.ee || a && !this.implementation_.isLoadingReused() || 0 >= this.yc) || (b =
                    this.tagName.toUpperCase(), b = !(xe[b] || ("AMP-VIDEO" == b ? 0 : ye.test(b))));
                return b || Mi(this) || !Ae(this.layout_) ? !1 : !0
            };
            b.prototype.isInA4A = function() {
                return this.C && this.C.win != this.ownerDocument.defaultView || "inabox" == v().runtime
            };
            b.prototype.Eh = function(a) {
                if (this.Wd() && !this.Ma) {
                    var b = ke(this.ownerDocument)(Ii),
                        c = qi(this.getAmpDoc(), this, this.yc, this.Mf, a);
                    b.appendChild(c);
                    this.appendChild(b);
                    this.Ma = b;
                    this.fe = c
                }
            };
            b.prototype.toggleLoading = function(a, b) {
                var c = this,
                    d = b && b.cleanup,
                    e = b && b.startTime;
                if (a !==
                    this.zc || b)
                    if ((this.zc = a) || this.Ma) a && !this.Wd() ? this.zc = !1 : this.he(function() {
                        var a = c.zc;
                        a && !c.Wd() && (a = !1);
                        a && c.Eh(e);
                        if (c.Ma && (c.Ma.classList.toggle("amp-hidden", !a), c.fe.classList.toggle("amp-active", a), !a && d && !c.implementation_.isLoadingReused())) {
                            var b = c.Ma;
                            c.Ma = null;
                            c.fe = null;
                            c.he(function() {
                                xb(b)
                            }, void 0, !0)
                        }
                    }, void 0, !0)
            };
            b.prototype.vf = function() {
                this.ce || (this.ce = new ii(this.ownerDocument.defaultView, this.getLayoutPriority()));
                return this.ce
            };
            b.prototype.getOverflowElement = function() {
                void 0 ===
                    this.na && (this.na = Jb(this, "overflow")) && (this.na.hasAttribute("tabindex") || this.na.setAttribute("tabindex", "0"), this.na.hasAttribute("role") || this.na.setAttribute("role", "button"));
                return this.na
            };
            b.prototype.overflowCallback = function(a, b, c) {
                var d = this;
                this.getOverflowElement();
                this.na ? (this.na.classList.toggle("amp-visible", a), this.na.onclick = a ? function() {
                        var a = ud(d.getAmpDoc());
                        a.forceChangeSize(d, b, c);
                        a.mutateElement(d, function() {
                            d.overflowCallback(!1, b, c)
                        })
                    } : null) : a && this.warnOnMissingOverflow &&
                    C().warn("CustomElement", "Cannot resize element and overflow is not available", this)
            };
            b.prototype.he = function(a, b, c) {
                c = void 0 === c ? !1 : c;
                this.C ? ud(this.getAmpDoc()).mutateElement(b || this, a, c) : a()
            };
            a.__AMP_BASE_CE_CLASS = b;
            return a.__AMP_BASE_CE_CLASS
        }

        function Mi(a) {
            var b = "string" == typeof a ? a : a.tagName;
            return b && N(b.toLowerCase(), "i-") || a.tagName && (a.hasAttribute("placeholder") || a.hasAttribute("fallback") || a.hasAttribute("overflow")) ? !0 : !1
        };

        function Ni(a) {
            a.__AMP_EXTENDED_ELEMENTS || (a.__AMP_EXTENDED_ELEMENTS = {});
            return a.__AMP_EXTENDED_ELEMENTS
        }

        function Oi(a, b) {
            try {
                a.upgrade(b)
            } catch (c) {
                zf(c, a)
            }
        }

        function Pi(a) {
            pd(a.getHeadNode()).forEach(function(b) {
                a.declareExtension(b);
                Qi(a.win, b)
            })
        }

        function Qi(a, b) {
            Ni(a)[b] || Ri(a, b, gi)
        }

        function Ri(a, b, c) {
            Ni(a)[b] = c;
            var d = Ki(a);
            a.customElements.define(b, d)
        };
        var Si = "alt aria-describedby aria-label aria-labelledby referrerpolicy sizes src srcset title".split(" ");

        function Ti(a) {
            Pe.call(this, a);
            this.Yf = this.ec = !0;
            this.ed = this.fd = this.I = null;
            this.ig = 0
        }
        m(Ti, Pe);
        f = Ti.prototype;
        f.mutatedAttributesCallback = function(a) {
            if (this.I) {
                var b = Si.filter(function(b) {
                    return void 0 !== a[b]
                });
                a.src && !a.srcset && this.element.hasAttribute("srcset") && (this.element.removeAttribute("srcset"), b.push("srcset"), this.user().warn("amp-img", "Removed [srcset] since [src] was mutated. Recommend adding a [srcset] binding to support responsive images.", this.element));
                this.propagateAttributes(b, this.I, !0);
                this.propagateDataset(this.I);
                ei(this.I)
            }
        };
        f.onMeasureChanged = function() {
            Ui(this, !1)
        };
        f.preconnectCallback = function(a) {
            var b = this.element.getAttribute("src");
            b ? T(this.win, "preconnect").url(this.getAmpDoc(), b, a) : (b = this.element.getAttribute("srcset")) && (b = /\S+/.exec(b)) && T(this.win, "preconnect").url(this.getAmpDoc(), b[0], a)
        };
        f.firstAttachedCallback = function() {
            this.element.hasAttribute("noprerender") && (this.Yf = !1)
        };
        f.isLayoutSupported = function(a) {
            return Ae(a)
        };
        f.qc = function() {
            if (!this.I) {
                this.ec = !this.element.hasAttribute("fallback");
                if (this.element.hasAttribute("i-amphtml-ssr")) {
                    var a = this.element;
                    /^[\w-]+$/.test("img");
                    this.I = Kb(a, "> img")
                }
                this.I = this.I || new Image;
                this.I.setAttribute("decoding", "async");
                this.element.id && this.I.setAttribute("amp-img-id", this.element.id);
                "img" == this.element.getAttribute("role") && (this.element.removeAttribute("role"), this.user().error("amp-img", "Setting role=img on amp-img elements breaks screen readers please just set alt or ARIA attributes, they will be correctly propagated for the underlying <img> element."));
                Ui(this, !0);
                this.propagateAttributes(Si, this.I);
                this.propagateDataset(this.I);
                ei(this.I);
                this.applyFillContent(this.I, !0);
                a = this.element;
                var b = this.I;
                a.hasAttribute("object-fit") && X(b, "object-fit", a.getAttribute("object-fit"));
                a.hasAttribute("object-position") && X(b, "object-position", a.getAttribute("object-position"));
                this.element.appendChild(this.I)
            }
        };

        function Ui(a, b) {
            if (a.I && !a.element.getAttribute("sizes")) {
                var c = a.element.getAttribute("srcset");
                if (c && !/[0-9]+x(?:,|$)/.test(c) && (c = a.element.getLayoutWidth(), Vi(a, c))) {
                    var d = a.getViewport().getWidth(),
                        e = "(max-width: " + d + "px) " + c + "px, ",
                        g = c + "px";
                    "fixed" !== a.getLayout() && (g = Math.max(Math.round(100 * c / d), 100) + "vw");
                    var h = e + g;
                    b ? a.I.setAttribute("sizes", h) : a.mutateElement(function() {
                        a.I.setAttribute("sizes", h)
                    });
                    a.ig = c
                }
            }
        }

        function Vi(a, b) {
            return a.I.hasAttribute("sizes") ? b > a.ig : !0
        }
        f.prerenderAllowed = function() {
            return this.Yf
        };
        f.reconstructWhenReparented = function() {
            return !1
        };
        f.layoutCallback = function() {
            var a = this;
            this.qc();
            var b = this.I;
            this.fd = Je(b, "load", function() {
                return Wi(a)
            });
            this.ed = Je(b, "error", function() {
                return Xi(a)
            });
            return 0 >= this.element.getLayoutWidth() ? x() : this.loadPromise(b)
        };
        f.unlayoutCallback = function() {
            this.ed && (this.ed(), this.ed = null);
            this.fd && (this.fd(), this.fd = null);
            var a = this.I;
            a && !a.complete && (a.src = "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACwAAAAAAQABAAACAkQBADs=", xb(a), this.I = null);
            return !0
        };
        f.firstLayoutCompleted = function() {
            var a = this.getPlaceholder();
            a && a.classList.contains("i-amphtml-blurry-placeholder") ? pe(a, {
                opacity: 0
            }) : this.togglePlaceholder(!1)
        };

        function Wi(a) {
            !a.ec && a.I.classList.contains("i-amphtml-ghost") && a.getVsync().mutate(function() {
                a.I.classList.remove("i-amphtml-ghost");
                a.toggleFallback(!1)
            })
        }

        function Xi(a) {
            a.ec && (a.getVsync().mutate(function() {
                a.I.classList.add("i-amphtml-ghost");
                a.toggleFallback(!0);
                a.togglePlaceholder(!1)
            }), a.ec = !1)
        };

        function Yi(a) {
            this.win = a;
            this.Fg = this.uh.bind(this);
            this.Gg = this.vh.bind(this);
            this.sd = this.Ve = this.ud = null;
            this.nc = "ontouchstart" in a || void 0 !== a.navigator.maxTouchPoints && 0 < a.navigator.maxTouchPoints || void 0 !== a.DocumentTouch;
            E().fine("Input", "touch detected:", this.nc);
            this.Hb = !1;
            this.win.document.addEventListener("keydown", this.Fg);
            this.win.document.addEventListener("mousedown", this.Gg);
            this.Md = !0;
            this.Qf = 0;
            this.$h = new Y;
            this.Rf = new Y;
            this.$d = new Y;
            this.nc && (this.Md = !this.nc, this.ud = this.wh.bind(this),
                Ke(a.document, "mousemove", this.ud))
        }
        f = Yi.prototype;
        f.setupInputModeClasses = function(a) {
            var b = this;
            this.onTouchDetected(function(c) {
                Zi(b, a, "amp-mode-touch", c)
            }, !0);
            this.onMouseDetected(function(c) {
                Zi(b, a, "amp-mode-mouse", c)
            }, !0);
            this.onKeyboardStateChanged(function(c) {
                Zi(b, a, "amp-mode-keyboard-active", c)
            }, !0)
        };
        f.isTouchDetected = function() {
            return this.nc
        };
        f.onTouchDetected = function(a, b) {
            b && a(this.isTouchDetected());
            return this.$h.add(a)
        };
        f.isMouseDetected = function() {
            return this.Md
        };
        f.onMouseDetected = function(a, b) {
            b && a(this.isMouseDetected());
            return this.Rf.add(a)
        };
        f.isKeyboardActive = function() {
            return this.Hb
        };
        f.onKeyboardStateChanged = function(a, b) {
            b && a(this.isKeyboardActive());
            return this.$d.add(a)
        };

        function Zi(a, b, c, d) {
            b.waitForBodyOpen().then(function(b) {
                wd(a.win).mutate(function() {
                    b.classList.toggle(c, d)
                })
            })
        }
        f.uh = function(a) {
            this.Hb || a.defaultPrevented || (a = a.target, a && ("INPUT" == a.tagName || "TEXTAREA" == a.tagName || "SELECT" == a.tagName || "OPTION" == a.tagName || a.hasAttribute("contenteditable"))) || (this.Hb = !0, this.$d.fire(!0), E().fine("Input", "keyboard activated"))
        };
        f.vh = function() {
            this.Hb && (this.Hb = !1, this.$d.fire(!1), E().fine("Input", "keyboard deactivated"))
        };
        f.wh = function(a) {
            var b = this;
            if (a.sourceCapabilities && a.sourceCapabilities.firesTouchEvents) this.Pf();
            else {
                this.sd || (this.sd = this.sh.bind(this), this.Ve = this.Pf.bind(this));
                var c, d = Le(this.win.document, function(a) {
                    c = a
                });
                return V(this.win).timeoutPromise(300, d).then(this.Ve, function() {
                    c && c();
                    b.sd()
                })
            }
        };
        f.sh = function() {
            this.Md = !0;
            this.Rf.fire(!0);
            E().fine("Input", "mouse detected")
        };
        f.Pf = function() {
            this.Qf++;
            3 >= this.Qf ? Ke(this.win.document, "mousemove", this.ud) : E().fine("Input", "mouse detection failed")
        };

        function $i() {
            Pe.apply(this, arguments)
        }
        m($i, Pe);
        $i.prototype.isLayoutSupported = function(a) {
            return "container" == a || Ae(a)
        };
        $i.prototype.buildCallback = function() {
            if ("container" != this.getLayout()) {
                var a = this.win.document.createElement("div");
                this.applyFillContent(a);
                this.getRealChildNodes().forEach(function(b) {
                    a.appendChild(b)
                });
                this.element.appendChild(a)
            }
        };
        $i.prototype.prerenderAllowed = function() {
            return !0
        };

        function aj(a) {
            var b = this;
            this.win = a;
            this.Fh = 6E4;
            this.O = [];
            this.Tf = new Y;
            this.ff = function(a) {
                a.target && 1 == a.target.nodeType && bj(b, a.target)
            };
            this.ef = function() {
                V(a).delay(function() {
                    bj(b, b.win.document.activeElement)
                }, 500)
            };
            this.win.document.addEventListener("focus", this.ff, !0);
            this.win.addEventListener("blur", this.ef)
        }
        f = aj.prototype;
        f.gi = function() {
            this.win.document.removeEventListener("focus", this.ff, !0);
            this.win.removeEventListener("blur", this.ef)
        };
        f.onFocus = function(a) {
            return this.Tf.add(a)
        };

        function bj(a, b) {
            var c = Date.now();
            0 == a.O.length || a.O[a.O.length - 1].el != b ? a.O.push({
                el: b,
                time: c
            }) : a.O[a.O.length - 1].time = c;
            a.purgeBefore(c - a.Fh);
            a.Tf.fire(b)
        }
        f.getLast = function() {
            return 0 == this.O.length ? null : this.O[this.O.length - 1].el
        };
        f.purgeBefore = function(a) {
            for (var b = this.O.length - 1, c = 0; c < this.O.length; c++)
                if (this.O[c].time >= a) {
                    b = c - 1;
                    break
                } - 1 != b && this.O.splice(0, b + 1)
        };
        f.hasDescendantsOf = function(a) {
            this.win.document.activeElement && bj(this, this.win.document.activeElement);
            for (var b = 0; b < this.O.length; b++)
                if (a.contains(this.O[b].el)) return !0;
            return !1
        };

        function cj(a) {
            var b = this;
            this.ampdoc = a;
            this.win = a.win;
            this.j = vd(a);
            this.H = xd(this.ampdoc);
            this.A = wd(this.win);
            this.nd = new aj(this.win);
            this.nd.onFocus(function(a) {
                dj(b, a)
            });
            this.Ya = this.j.isIntersectionExperimentOn()
        }
        f = cj.prototype;
        f.forceChangeSize = function(a, b, c, d, e) {
            ej(this, Z(a), b, c, e, void 0, !0, d)
        };
        f.requestChangeSize = function(a, b, c, d, e) {
            var g = this;
            return new Promise(function(h, l) {
                ej(g, Z(a), b, c, d, e, !1, function(a) {
                    a ? h() : l(Error("changeSize attempt denied"))
                })
            })
        };
        f.expandElement = function(a) {
            var b = Z(a);
            b.completeExpand();
            var c = b.getOwner();
            c && c.expandedCallback(a);
            this.j.schedulePass(70)
        };
        f.attemptCollapse = function(a) {
            var b = this;
            return new Promise(function(c, d) {
                ej(b, Z(a), 0, 0, void 0, void 0, !1, function(b) {
                    b ? (Z(a).completeCollapse(), c()) : d(E().createExpectedError("collapse attempt denied"))
                })
            })
        };
        f.collapseElement = function(a) {
            if (!this.Ya) {
                var b = this.H.getLayoutRect(a);
                0 != b.width && 0 != b.height && (Q(this.win, "dirty-collapse-element") ? this.dirtyElement(a) : this.j.setRelayoutTop(b.top))
            }
            Z(a).completeCollapse();
            this.Ya || this.j.schedulePass(70)
        };
        f.measureElement = function(a) {
            return this.A.measurePromise(a)
        };
        f.mutateElement = function(a, b, c) {
            return fj(this, a, null, b, c)
        };
        f.measureMutateElement = function(a, b, c) {
            return fj(this, a, b, c)
        };

        function fj(a, b, c, d, e) {
            function g() {
                var c = a.H.getLayoutRect(b);
                return 0 != c.width && 0 != c.height ? c.top : -1
            }
            e = void 0 === e ? !1 : e;
            var h = -1;
            return a.A.runPromise({
                measure: function() {
                    c && c();
                    a.Ya || e || (h = g())
                },
                mutate: function() {
                    d();
                    if (!e) {
                        b.classList.contains("i-amphtml-element") && Z(b).requestMeasure();
                        for (var c = b.getElementsByClassName("i-amphtml-element"), k = 0; k < c.length; k++) Z(c[k]).requestMeasure();
                        a.j.schedulePass(70);
                        a.Ya ? a.j.maybeHeightChanged() : (-1 != h && a.j.setRelayoutTop(h), a.A.measure(function() {
                            var b =
                                g(); - 1 != b && b != h && (a.j.setRelayoutTop(b), a.j.schedulePass(70));
                            a.j.maybeHeightChanged()
                        }))
                    }
                }
            })
        }
        f.dirtyElement = function(a) {
            var b = !1;
            a.classList.contains("i-amphtml-element") ? (a = Z(a), this.j.setRelayoutTop(a.getLayoutBox().top)) : b = !0;
            this.j.schedulePass(70, b)
        };

        function dj(a, b) {
            var c = Cb(b, function(a) {
                return !!Z(a)
            });
            if (c) {
                b = Z(c);
                var d = b.getPendingChangeSize();
                void 0 !== d && ej(a, b, d.height, d.width, d.margins, void 0, !0)
            }
        }

        function ej(a, b, c, d, e, g, h, l) {
            b.hasBeenMeasured() && !e ? gj(a, b, c, d, void 0, g, h, l) : a.A.measure(function() {
                b.hasBeenMeasured() || b.measure();
                if (e) {
                    var k = te(a.win, b.element);
                    k = {
                        top: parseInt(k.marginTop, 10) || 0,
                        right: parseInt(k.marginRight, 10) || 0,
                        bottom: parseInt(k.marginBottom, 10) || 0,
                        left: parseInt(k.marginLeft, 10) || 0
                    };
                    k = {
                        newMargins: e,
                        currentMargins: k
                    }
                } else k = void 0;
                gj(a, b, c, d, k, g, h, l)
            })
        }

        function gj(a, b, c, d, e, g, h, l) {
            b.resetPendingChangeSize();
            var k = b.getPageLayoutBox();
            if (!(k = void 0 !== c && c != k.height || void 0 !== d && d != k.width) && (k = void 0 !== e)) {
                k = e.currentMargins;
                var n = e.newMargins;
                k = void 0 !== n.top && n.top != k.top || void 0 !== n.right && n.right != k.right || void 0 !== n.bottom && n.bottom != k.bottom || void 0 !== n.left && n.left != k.left
            }
            k ? (a.j.updateOrEnqueueMutateTask(b, {
                resource: b,
                newHeight: c,
                newWidth: d,
                marginChange: e,
                event: g,
                force: h,
                callback: l
            }), a.j.schedulePassVsync()) : (void 0 === c && void 0 === d && void 0 ===
                e && E().error("Mutator", "attempting to change size with undefined dimensions", b.debugid), l && l(!0))
        };

        function hj(a) {
            return y(a) ? a : [a]
        }

        function ij(a) {
            this.j = vd(a)
        }
        f = ij.prototype;
        f.setOwner = function(a, b) {
            b.contains(a);
            Z(a) && Z(a).updateOwner(b);
            a.__AMP__OWNER = b;
            a = a.getElementsByClassName("i-amphtml-element");
            for (b = 0; b < a.length; b++) {
                var c = a[b];
                Z(c) && Z(c).updateOwner(void 0)
            }
        };
        f.schedulePreload = function(a, b) {
            jj(this, this.j.getResourceForElement(a), !1, hj(b))
        };
        f.scheduleLayout = function(a, b) {
            jj(this, this.j.getResourceForElement(a), !0, hj(b))
        };
        f.schedulePause = function(a, b) {
            var c = this.j.getResourceForElement(a);
            b = hj(b);
            kj(this, c, b, function(a) {
                a.pause()
            })
        };
        f.scheduleResume = function(a, b) {
            a = this.j.getResourceForElement(a);
            b = hj(b);
            kj(this, a, b, function(a) {
                a.resume()
            })
        };
        f.scheduleUnlayout = function(a, b) {
            a = this.j.getResourceForElement(a);
            b = hj(b);
            kj(this, a, b, function(a) {
                a.unlayout()
            })
        };
        f.updateInViewport = function(a, b, c) {
            lj(this, this.j.getResourceForElement(a), hj(b), c)
        };
        f.requireLayout = function(a, b) {
            var c = this,
                d = [];
            mj(this, a, function(a) {
                4 != a.getState() && (3 != a.getState() ? d.push(a.whenBuilt().then(function() {
                    a.measure();
                    if (a.isDisplayed()) return c.j.scheduleLayoutOrPreload(a, !0, b, !0), a.loadedOnce()
                })) : a.isDisplayed() && d.push(a.loadedOnce()))
            });
            return Promise.all(d)
        };

        function kj(a, b, c, d) {
            c.forEach(function(c) {
                b.element.contains(c);
                mj(a, c, d)
            })
        }

        function mj(a, b, c) {
            if (b.classList.contains("i-amphtml-element")) c(a.j.getResourceForElement(b)), (b = b.getPlaceholder()) && mj(a, b, c);
            else {
                b = b.getElementsByClassName("i-amphtml-element");
                for (var d = [], e = 0; e < b.length; e++) {
                    for (var g = b[e], h = !1, l = 0; l < d.length; l++)
                        if (d[l].contains(g)) {
                            h = !0;
                            break
                        } h || (d.push(g), c(a.j.getResourceForElement(g)))
                }
            }
        }

        function jj(a, b, c, d) {
            kj(a, b, d, function(d) {
                0 === d.getState() ? d.whenBuilt().then(function() {
                    nj(a, d, !c, b.getLayoutPriority())
                }) : nj(a, d, !c, b.getLayoutPriority())
            })
        }

        function nj(a, b, c, d) {
            b.measure();
            2 === b.getState() && b.isDisplayed() && a.j.scheduleLayoutOrPreload(b, !c, d)
        }

        function lj(a, b, c, d) {
            var e = b.isInViewport() && d;
            kj(a, b, c, function(a) {
                a.setInViewport(e)
            })
        };

        function oj(a, b) {
            if ("referrerPolicy" in Image.prototype) return pj(a, b, !0);
            var c = yb(a.document);
            c.onload = function() {
                pj(c.contentWindow, b)
            };
            a.document.body.appendChild(c);
            return c
        }

        function pj(a, b, c) {
            c = void 0 === c ? !1 : c;
            a = new a.Image;
            c && (a.referrerPolicy = "no-referrer");
            a.src = b;
            return a
        };

        function qj(a) {
            Pe.call(this, a);
            this.Ee = null
        }
        m(qj, Pe);
        qj.prototype.isLayoutSupported = function() {
            return !0
        };
        qj.prototype.buildCallback = function() {
            this.element.setAttribute("aria-hidden", "true");
            (this.Pc = this.element.getAttribute("referrerpolicy")) && F("no-referrer" == this.Pc, 'amp-pixel: invalid "referrerpolicy" value "' + this.Pc + '". Only "no-referrer" is supported');
            this.element.hasAttribute("i-amphtml-ssr") && this.element.querySelector("img") ? E().info("amp-pixel", "inabox img already present") : this.getAmpDoc().whenFirstVisible().then(this.ai.bind(this))
        };
        qj.prototype.ai = function() {
            var a = this;
            if (this.Ee) return E().error("amp-pixel", "duplicate pixel"), this.Ee;
            this.Ee = V(this.win).promise(1).then(function() {
                var b = a.element.getAttribute("src");
                if (b) return Tc(a.element, "url-replace").expandUrlAsync(rj(b)).then(function(b) {
                    if (a.win) {
                        var c = a.win;
                        var e = a.Pc;
                        e && "no-referrer" !== e && C().error("pixel", "Unsupported referrerPolicy: %s", e);
                        c = "no-referrer" === e ? oj(c, b) : pj(c, b);
                        E().info("amp-pixel", "pixel triggered: ", b);
                        return c
                    }
                })
            })
        };

        function rj(a) {
            F(/^(https:\/\/|\/\/)/i.test(a), 'The <amp-pixel> src attribute must start with "https://" or "//". Invalid value: ' + a);
            return a
        };

        function sj(a) {
            this.T = a.navigator;
            this.w = a
        }
        f = sj.prototype;
        f.isAndroid = function() {
            return /Android/i.test(this.T.userAgent)
        };
        f.isIos = function() {
            return /iPhone|iPad|iPod/i.test(this.T.userAgent)
        };
        f.isSafari = function() {
            return /Safari/i.test(this.T.userAgent) && !this.isChrome() && !this.isIe() && !this.isEdge() && !this.isFirefox() && !this.isOpera()
        };
        f.isChrome = function() {
            return /Chrome|CriOS/i.test(this.T.userAgent) && !this.isEdge() && !this.isOpera()
        };
        f.isFirefox = function() {
            return /Firefox|FxiOS/i.test(this.T.userAgent) && !this.isEdge()
        };
        f.isOpera = function() {
            return /OPR\/|Opera|OPiOS/i.test(this.T.userAgent)
        };
        f.isIe = function() {
            return /Trident|MSIE|IEMobile/i.test(this.T.userAgent)
        };
        f.isEdge = function() {
            return /Edge/i.test(this.T.userAgent)
        };
        f.isWebKit = function() {
            return /WebKit/i.test(this.T.userAgent) && !this.isEdge()
        };
        f.isWindows = function() {
            return /Windows/i.test(this.T.userAgent)
        };
        f.isStandalone = function() {
            return this.isIos() && this.T.standalone || this.isChrome() && this.w.matchMedia("(display-mode: standalone)").matches
        };
        f.isBot = function() {
            return /bot/i.test(this.T.userAgent)
        };
        f.getMajorVersion = function() {
            return this.isSafari() ? this.isIos() ? this.getIosMajorVersion() || 0 : tj(this, /\sVersion\/(\d+)/, 1) : this.isChrome() ? tj(this, /(Chrome|CriOS)\/(\d+)/, 2) : this.isFirefox() ? tj(this, /(Firefox|FxiOS)\/(\d+)/, 2) : this.isOpera() ? tj(this, /(OPR|Opera|OPiOS)\/(\d+)/, 2) : this.isIe() ? tj(this, /MSIE\s(\d+)/, 1) : this.isEdge() ? tj(this, /Edge\/(\d+)/, 1) : 0
        };

        function tj(a, b, c) {
            if (!a.T.userAgent) return 0;
            a = a.T.userAgent.match(b);
            return !a || c >= a.length ? 0 : parseInt(a[c], 10)
        }
        f.getIosVersionString = function() {
            if (!this.T.userAgent || !this.isIos()) return "";
            var a = this.T.userAgent.match(/OS ([0-9]+[_.][0-9]+([_.][0-9]+)?)\b/);
            return a ? a = a[1].replace(/_/g, ".") : ""
        };
        f.getIosMajorVersion = function() {
            var a = this.getIosVersionString();
            return "" == a ? null : Number(a.split(".")[0])
        };

        function uj(a) {
            return "loading" != a.readyState && "uninitialized" != a.readyState
        }

        function vj(a) {
            return "complete" == a.readyState
        }

        function wj(a, b) {
            xj(a, uj, b)
        }

        function xj(a, b, c) {
            var d = b(a);
            if (d) c(a);
            else {
                var e = function() {
                    b(a) && (d || (d = !0, c(a)), a.removeEventListener("readystatechange", e))
                };
                a.addEventListener("readystatechange", e)
            }
        }

        function yj(a) {
            return new Promise(function(b) {
                wj(a, b)
            })
        }

        function zj(a) {
            return new Promise(function(b) {
                xj(a, vj, b)
            })
        };
        var Aj = ["<link rel=preload referrerpolicy=origin>"],
            Bj = null;

        function Cj(a) {
            this.Fd = a.document;
            this.Nd = a.document.head;
            this.Lb = {};
            this.ug = {};
            this.ta = U(a);
            this.Lb[O(a.location.href).origin] = !0;
            a: {
                if (!Bj) {
                    var b = a.document.createElement("link");
                    var c = b.relList;
                    b.as = "invalid-value";
                    if (!c || !c.supports) {
                        b = {};
                        break a
                    }
                    Bj = {
                        preconnect: c.supports("preconnect"),
                        preload: c.supports("preload"),
                        onlyValidAs: "invalid-value" != b.as
                    }
                }
                b = Bj
            }
            this.jc = b;
            this.R = V(a)
        }
        Cj.prototype.url = function(a, b, c) {
            var d = this;
            a.whenFirstVisible().then(function() {
                d.ac(a, b, c)
            })
        };
        Cj.prototype.ac = function(a, b, c) {
            if (Dj(b)) {
                a = O(b).origin;
                b = Date.now();
                var d = this.Lb[a];
                if (d && b < d) c && (this.Lb[a] = b + 18E4);
                else {
                    this.Lb[a] = b + (c ? 18E4 : 1E4);
                    if (!this.jc.preconnect) {
                        var e = this.Fd.createElement("link");
                        e.setAttribute("rel", "dns-prefetch");
                        e.setAttribute("href", a);
                        this.Nd.appendChild(e)
                    }
                    var g = this.Fd.createElement("link");
                    g.setAttribute("rel", "preconnect");
                    g.setAttribute("href", a);
                    g.setAttribute("referrerpolicy", "origin");
                    this.Nd.appendChild(g);
                    this.R.delay(function() {
                        e && e.parentNode && e.parentNode.removeChild(e);
                        g.parentNode && g.parentNode.removeChild(g)
                    }, 1E4);
                    Ej(this, a)
                }
            }
        };
        Cj.prototype.preload = function(a, b, c) {
            var d = this;
            Dj(b) && !this.ug[b] && (this.ug[b] = !0, this.url(a, b, !0), this.jc.preload && ("document" == c && this.ta.isSafari() || a.whenFirstVisible().then(function() {
                var a = ke(d.Fd)(Aj);
                a.setAttribute("href", b);
                a.as = d.jc.onlyValidAs ? "fetch" : "";
                d.Nd.appendChild(a)
            })))
        };

        function Dj(a) {
            return N(a, "https:") || N(a, "http:") ? !0 : !1
        }

        function Ej(a, b) {
            if (!a.jc.preconnect && (a.ta.isSafari() || a.ta.isIos())) {
                var c = Date.now();
                a.Lb[b] = c + 18E4;
                a = new XMLHttpRequest;
                a.open("HEAD", b + "/robots.txt?_AMP_safari_preconnect_polyfill_cachebust=" + (c - c % 18E4), !0);
                a.withCredentials = !0;
                a.send()
            }
        }

        function Fj() {
            var a = self.document;
            zj(a).then(function() {
                var b = a.defaultView;
                if (b) {
                    b = T(b, "preconnect");
                    var c = sd(a.documentElement),
                        d = Xc(a);
                    b.url(d, c.sourceUrl);
                    b.url(d, c.canonicalUrl)
                }
            })
        };

        function Gj(a) {
            this.G = a;
            this.pg = Object.create(null)
        }
        Gj.prototype.addTransition = function(a, b, c) {
            this.pg[a + "|" + b] = c
        };
        Gj.prototype.setState = function(a) {
            var b = this.G;
            this.G = a;
            (a = this.pg[b + "|" + a]) && a()
        };

        function Hj() {
            this.L = [];
            this.Xb = {};
            this.If = this.Jf = 0
        }
        f = Hj.prototype;
        f.getSize = function() {
            return this.L.length
        };
        f.getLastEnqueueTime = function() {
            return this.Jf
        };
        f.getLastDequeueTime = function() {
            return this.If
        };
        f.getTaskById = function(a) {
            return this.Xb[a] || null
        };
        f.enqueue = function(a) {
            this.L.push(a);
            this.Xb[a.id] = a;
            this.Jf = Date.now()
        };
        f.dequeue = function(a) {
            if (!this.removeAtIndex(a, this.L.indexOf(this.Xb[a.id]))) return !1;
            this.If = Date.now();
            return !0
        };
        f.peek = function(a) {
            for (var b = 1E6, c = null, d = 0; d < this.L.length; d++) {
                var e = this.L[d],
                    g = a(e);
                g < b && (b = g, c = e)
            }
            return c
        };
        f.forEach = function(a) {
            this.L.forEach(a)
        };
        f.removeAtIndex = function(a, b) {
            var c = this.Xb[a.id];
            if (!c || this.L[b] != c) return !1;
            this.L.splice(b, 1);
            delete this.Xb[a.id];
            return !0
        };
        f.purge = function(a) {
            for (var b = this.L.length; b--;) a(this.L[b]) && this.removeAtIndex(this.L[b], b)
        };

        function Ij(a) {
            return !U(a).isIe() || Jj(a) ? null : new Promise(function(b) {
                var c = Date.now() + 2E3,
                    d = a.setInterval(function() {
                        var e = Date.now(),
                            g = Jj(a);
                        if (g || e > c) a.clearInterval(d), b(), g || E().error("ie-media-bug", "IE media never resolved")
                    }, 10)
            })
        }

        function Jj(a) {
            var b = "(min-width: " + (a.innerWidth - 1) + "px) AND (max-width: " + (a.innerWidth + 1 + "px)");
            try {
                return a.matchMedia(b).matches
            } catch (c) {
                return E().error("ie-media-bug", "IE matchMedia failed: ", c), !0
            }
        };
        var Kj = {
            id: "render-on-idle-fix",
            control: "21066311",
            experiment: "21066312"
        };

        function Lj(a) {
            var b = this;
            this.ampdoc = a;
            this.win = a.win;
            this.h = W(a);
            this.la = this.h.isRuntimeOn();
            this.hh = !1;
            this.Ph = 0;
            this.j = [];
            this.yd = this.bf = this.Le = 0;
            this.ja = this.ampdoc.isVisible();
            this.$ = this.h.getPrerenderSize();
            this.ub = !1;
            this.tf = !0;
            this.od = !1;
            this.yb = -1;
            this.Fa = !0;
            this.ib = -1;
            this.be = this.xc = 0;
            this.Mc = new ri(this.win, function() {
                return b.doPass()
            });
            this.ag = new ri(this.win, function() {
                b.Fa = !0;
                b.schedulePass()
            });
            this.ra = new Hj;
            this.D = new Hj;
            this.xd = this.Kg.bind(this);
            this.ha = [];
            this.va = [];
            this.Td = !1;
            this.H = xd(this.ampdoc);
            this.A = wd(this.win);
            this.nd = new aj(this.win);
            this.Ke = !1;
            this.Va = 0;
            this.ab = !1;
            this.Lc = [];
            this.Gd = [];
            this.Dh = Q(this.win, "build-close-to-viewport");
            this.Jg = Q(this.win, "build-in-chunks");
            this.Kh = Q(this.win, "render-on-idle-fix");
            this.nf = !1;
            this.uf = new L;
            this.zg = new Gj(this.ampdoc.getVisibilityState());
            this.De = this.kg = 0;
            this.V = null;
            this.Ef = !1;
            if (Q(this.win, "intersect-resources")) {
                var c = Pb(this.win);
                a = this.ampdoc.isSingleDoc() && c ? this.win.document : null;
                try {
                    this.V = new IntersectionObserver(function(a) {
                        return Mj(b,
                            a)
                    }, {
                        root: a,
                        rootMargin: "200% 25%"
                    }), this.Fa = !1
                } catch (d) {
                    E().warn("Resources", "Falling back to classic Resources:", d)
                }
            }
            this.H.onChanged(function(a) {
                b.xc = Date.now();
                b.be = a.velocity;
                a.relayoutAll && (b.Fa = !0, b.ab = !0);
                !b.Fa && b.V || b.schedulePass()
            });
            this.H.onScroll(function() {
                b.xc = Date.now()
            });
            this.ampdoc.onVisibilityChanged(function() {
                -1 == b.yb && b.ampdoc.isVisible() && (b.yb = Date.now());
                b.schedulePass()
            });
            this.h.onRuntimeState(function(a) {
                E().fine("Resources", "Runtime state:", a);
                b.la = a;
                b.schedulePass(1)
            });
            zi(this.ampdoc, function() {
                Nj(b, b.zg);
                b.schedulePass(0)
            });
            Oj(this);
            !this.V && Q(this.win, "layoutbox-invalidate-on-scroll") && (this.$c = pf(this.win, function(a) {
                a = a.target;
                a.nodeType !== Node.ELEMENT_NODE || a === b.H.getScrollingElement() || b.Gd.includes(a) || (b.Gd.push(a), b.schedulePass(70))
            }, 250), Je(this.win.document, "scroll", this.$c, {
                capture: !0,
                passive: !0
            }))
        }
        f = Lj.prototype;
        f.isIntersectionExperimentOn = function() {
            return !!this.V
        };

        function Mj(a, b) {
            a.Ef = !0;
            b.forEach(function(a) {
                var b = a.boundingClientRect;
                Z(a.target).premeasure(b)
            });
            a.schedulePass()
        }

        function Oj(a) {
            a.ampdoc.whenReady().then(function() {
                a.ub = !0;
                Pj(a);
                a.va = null;
                T(a.win, "input").setupInputModeClasses(a.ampdoc);
                if (!a.V) {
                    var b = Ij(a.win),
                        c = function() {
                            return a.ag.schedule()
                        };
                    b ? b.then(c) : c();
                    Promise.race([Oe(a.win), V(a.win).promise(3100)]).then(c);
                    a.win.document.fonts && "loaded" != a.win.document.fonts.status && a.win.document.fonts.ready.then(c)
                }
            })
        }
        f.get = function() {
            return this.j.slice(0)
        };
        f.getAmpdoc = function() {
            return this.ampdoc
        };
        f.getResourceForElement = function(a) {
            return Z(a)
        };
        f.getResourceForElementOptional = function(a) {
            return Z(a)
        };
        f.getScrollDirection = function() {
            return Math.sign(this.be) || 1
        };
        f.add = function(a) {
            this.Le++;
            1 == this.Le && this.H.ensureReadyForElements();
            var b = Z(a);
            b && 0 != b.getState() && !a.reconstructWhenReparented() ? (this.V || b.requestMeasure(), E().fine("Resources", "resource reused:", b.debugid)) : (b = new ki(++this.Ph, a, this), E().fine("Resources", "resource added:", b.debugid));
            this.j.push(b);
            this.V ? this.V.observe(a) : this.ag.schedule(1E3)
        };

        function Qj(a, b, c, d) {
            c = void 0 === c ? !1 : c;
            d = void 0 === d ? !1 : d;
            if (a.la || a.hh)
                if ("prerender" != a.ampdoc.getVisibilityState() || b.prerenderAllowed())
                    if (!a.Dh || d || b.isBuildRenderBlocking() || b.renderOutsideViewport() || Rj(a) && b.idleRenderOutsideViewport()) a.ub ? Sj(a, b, d) : b.isBuilt() || b.isBuilding() || c && a.va.includes(b) || (a.va.push(b), Pj(a))
        }

        function Pj(a) {
            if (!a.Td) try {
                a.Td = !0;
                for (var b = 0; b < a.va.length; b++) {
                    var c = a.va[b],
                        d;
                    if (!(d = a.ub)) a: {
                        var e = a.ampdoc.getRootNode(),
                            g = c.element;do
                            if (g.nextSibling) {
                                d = !0;
                                break a
                            } while ((g = g.parentNode) && g != e);
                        d = !1
                    }
                    d && (a.va.splice(b--, 1), Sj(a, c))
                }
            } finally {
                a.Td = !1
            }
        }

        function Sj(a, b, c) {
            if ((void 0 === c ? 0 : c) || (a.Jg && 10 <= a.yd ? 0 : 20 > a.bf || a.ampdoc.hasBeenVisible()) || b.isBuildRenderBlocking())
                if (c = b.build()) E().fine("Resources", "build resource:", b.debugid), a.bf++, a.yd++, c.then(function() {
                    return a.schedulePass()
                }, function(c) {
                    Tj(a, b);
                    if (!Bf(c)) throw c;
                })
        }
        f.remove = function(a) {
            (a = Z(a)) && Tj(this, a)
        };

        function Tj(a, b) {
            var c = a.j.indexOf(b); - 1 != c && a.j.splice(c, 1);
            b.isBuilt() && b.pauseOnRemove();
            a.V && a.V.unobserve(b.element);
            Uj(a, b, !0);
            E().fine("Resources", "resource removed:", b.debugid)
        }
        f.upgraded = function(a) {
            a = Z(a);
            Qj(this, a);
            E().fine("Resources", "resource upgraded:", a.debugid)
        };
        f.updateLayoutPriority = function(a, b) {
            var c = Z(a);
            c.updateLayoutPriority(b);
            this.D.forEach(function(a) {
                a.resource == c && (a.priority = b)
            });
            this.schedulePass()
        };
        f.schedulePass = function(a) {
            return this.Mc.schedule(a)
        };
        f.updateOrEnqueueMutateTask = function(a, b) {
            for (var c = null, d = 0; d < this.ha.length; d++)
                if (this.ha[d].resource == a) {
                    c = this.ha[d];
                    break
                } c ? (c.newHeight = b.newHeight, c.newWidth = b.newWidth, c.marginChange = b.marginChange, c.event = b.event, c.force = b.force || c.force, c.callback = b.callback) : this.ha.push(b)
        };
        f.schedulePassVsync = function() {
            var a = this;
            this.Ke || (this.Ke = !0, this.A.mutate(function() {
                return a.doPass()
            }))
        };
        f.ampInitComplete = function() {
            this.od = !0;
            E().fine("Resources", "ampInitComplete");
            this.schedulePass()
        };
        f.setRelayoutTop = function(a) {
            this.ib = -1 == this.ib ? a : Math.min(a, this.ib)
        };
        f.maybeHeightChanged = function() {
            this.ab = !0
        };
        f.onNextPass = function(a) {
            this.Lc.push(a)
        };
        f.doPass = function() {
            var a = this;
            if (this.la) {
                this.ja = this.ampdoc.isVisible();
                this.$ = this.h.getPrerenderSize();
                this.yd = 0;
                if (this.ub && this.tf && this.od) {
                    this.tf = !1;
                    var b = this.win.document,
                        c = sd(this.ampdoc);
                    this.h.sendMessage("documentLoaded", K({
                        title: b.title,
                        sourceUrl: Ic(this.ampdoc.getUrl()),
                        serverLayout: b.documentElement.hasAttribute("i-amphtml-element"),
                        linkRels: c.linkRels,
                        metaTags: {
                            viewport: c.viewport
                        },
                        viewport: c.viewport
                    }), !0);
                    this.Va = this.H.getContentHeight();
                    this.h.sendMessage("documentHeight",
                        K({
                            height: this.Va
                        }), !0);
                    E().fine("Resources", "document height on load: %s", this.Va)
                }
                var d = this.H.getSize();
                E().fine("Resources", "PASS: visible=", this.ja, ", relayoutAll=", this.Fa, ", relayoutTop=", this.ib, ", viewportSize=", d.width, d.height, ", prerenderSize=", this.$);
                this.Mc.cancel();
                this.Ke = !1;
                this.zg.setState(this.ampdoc.getVisibilityState());
                !this.ub || !this.od || this.V && !this.Ef || this.ampdoc.signals().get("ready-scan") || (this.ampdoc.signals().signal("ready-scan"), E().fine("Resources", "signal: ready-scan"));
                this.ab && (this.ab = !1, this.A.measure(function() {
                    var b = a.H.getContentHeight();
                    b != a.Va && (a.h.sendMessage("documentHeight", K({
                        height: b
                    }), !0), a.Va = b, E().fine("Resources", "document height changed: %s", a.Va), a.H.contentHeightChanged())
                }));
                for (b = 0; b < this.Lc.length; b++)(0, this.Lc[b])();
                this.Lc.length = 0
            } else E().fine("Resources", "runtime is off")
        };
        f.getSlowElementRatio = function() {
            return 0 === this.De ? 0 : this.kg / this.De
        };

        function Vj(a) {
            var b = Date.now(),
                c = a.H.getRect(),
                d = c.height / 10,
                e = c.height / 10,
                g = .01 > Math.abs(a.be) && 500 < b - a.xc || 1E3 < b - a.xc;
            if (0 < a.ha.length) {
                E().fine("Resources", "change size requests:", a.ha.length);
                var h = a.ha;
                a.ha = [];
                var l = -1,
                    k = [],
                    n = 0;
                b = {};
                for (var r = 0; r < h.length; b = {
                        Ta: b.Ta,
                        cc: b.cc,
                        F: b.F,
                        S: b.S
                    }, r++) {
                    b.F = h[r];
                    var u = b.F;
                    b.Ta = u.resource;
                    u = u.event;
                    var w = b.Ta.getLayoutBox(),
                        z = 0,
                        q = 0,
                        p = 0,
                        M = 0,
                        H = w,
                        la = H.top,
                        ma = H.bottom;
                    b.S = void 0;
                    b.F.marginChange && (b.S = b.F.marginChange.newMargins, H = b.F.marginChange.currentMargins,
                        void 0 != b.S.top && (z = b.S.top - H.top), void 0 != b.S.bottom && (q = b.S.bottom - H.bottom), void 0 != b.S.left && (p = b.S.left - H.left), void 0 != b.S.right && (M = b.S.right - H.right), z && (la = w.top - H.top), q && (ma = w.bottom + H.bottom));
                    var D = b.F.newHeight - w.height;
                    b.cc = b.F.newWidth - w.width;
                    var G = !1;
                    if (0 != D || 0 != z || 0 != q || 0 != b.cc || 0 != p || 0 != M)
                        if (b.F.force || !a.ja) G = !0;
                        else if (a.nd.hasDescendantsOf(b.Ta.element) || u && u.userActivation && u.userActivation.hasBeenActive) G = !0;
                    else if (la >= c.bottom - e || 0 == z && w.bottom + Math.min(D, 0) >= c.bottom - e) G = !0;
                    else if (1 < c.top && ma <= c.top + d) {
                        if (0 > D && c.top + n < -D) continue;
                        g ? (n += D, k.push(b.F)) : a.ha.push(b.F);
                        continue
                    } else Wj(a, b.Ta, w) ? G = !0 : 0 > D || 0 > z || 0 > q || (b.F.newHeight == w.height ? a.A.run({
                        measure: function(a) {
                            return function(b) {
                                b.resize = !1;
                                var c = a.Ta.element.parentElement;
                                if (c) {
                                    for (var d = c.getLayoutWidth && c.getLayoutWidth() || c.offsetWidth, e = a.cc, g = 0; g < c.childElementCount; g++)
                                        if (e += c.children[g].offsetWidth, e > d) return;
                                    b.resize = !0
                                }
                            }
                        }(b),
                        mutate: function(a) {
                            return function(b) {
                                b.resize && a.F.resource.changeSize(a.F.newHeight,
                                    a.F.newWidth, a.S);
                                a.F.resource.overflowCallback(!b.resize, a.F.newHeight, a.F.newWidth, a.S)
                            }
                        }(b)
                    }, {}) : b.F.resource.overflowCallback(!0, b.F.newHeight, b.F.newWidth, b.S));
                    G && (0 <= w.top && (l = -1 == l ? w.top : Math.min(l, w.top)), b.F.resource.changeSize(b.F.newHeight, b.F.newWidth, b.S), b.F.resource.overflowCallback(!1, b.F.newHeight, b.F.newWidth, b.S), a.ab = !0);
                    b.F.callback && b.F.callback(G)
                } - 1 != l && a.setRelayoutTop(l);
                0 < k.length && a.A.run({
                    measure: function(b) {
                        b.scrollHeight = a.H.getScrollHeight();
                        b.scrollTop = a.H.getScrollTop()
                    },
                    mutate: function(b) {
                        var c = -1;
                        k.forEach(function(a) {
                            var b = a.resource.getLayoutBox();
                            c = -1 == c ? b.top : Math.min(c, b.top);
                            a.resource.changeSize(a.newHeight, a.newWidth, a.marginChange ? a.marginChange.newMargins : void 0);
                            a.callback && a.callback(!0)
                        }); - 1 != c && a.setRelayoutTop(c);
                        var d = a.H.getScrollHeight();
                        d != b.scrollHeight && a.H.setScrollTop(b.scrollTop + (d - b.scrollHeight));
                        a.ab = !0
                    }
                }, {})
            }
        }

        function Wj(a, b, c) {
            var d = a.H.getContentHeight();
            a = Math.max(.85 * d, d - 1E3);
            var e = c || b.getLayoutBox(),
                g = b.getInitialLayoutBox();
            return e.bottom >= a || g.bottom >= a
        }

        function Xj(a, b) {
            b = void 0 === b ? !1 : b;
            var c = a.isDisplayed();
            a.measure(b);
            return !(c && !a.isDisplayed())
        }

        function Yj(a, b) {
            b.length && a.A.mutate(function() {
                b.forEach(function(b) {
                    b.unload();
                    Uj(a, b)
                });
                E().fine("Resources", "unload:", b)
            })
        }

        function Zj(a) {
            if (!a.nf) {
                a.nf = !0;
                var b = {},
                    c = (b[Kj.experiment] = {
                        isTrafficEligible: function() {
                            return !0
                        },
                        branches: [Kj.control, Kj]
                    }, b);
                Pc(a.win, c)
            }
        }

        function Rj(a, b) {
            b = void 0 === b ? Date.now() : b;
            Zj(a);
            var c = a.ra.getLastDequeueTime();
            (b = 0 == a.ra.getSize() && 0 == a.D.getSize() && b > c + 5E3) && !(b = 0 < c || !a.Kh) && (a = a.win, b = (a.__AMP_EXPERIMENT_BRANCHES ? a.__AMP_EXPERIMENT_BRANCHES[Kj.id] : null) === Kj.control);
            return b
        }
        f.Kg = function(a) {
            var b = this.H.getRect(),
                c = a.resource.getLayoutBox(),
                d = Math.floor((c.top - b.top) / b.height);
            Math.sign(d) != this.getScrollDirection() && (d *= 2);
            d = Math.abs(d);
            return 10 * a.priority + d
        };

        function ak(a, b) {
            var c = Date.now();
            if (0 == a.ra.getSize()) return -1 === a.yb ? 0 : Math.max(1E3 * b.priority - (c - a.yb), 0);
            var d = 0;
            a.ra.forEach(function(a) {
                d = Math.max(d, Math.max(1E3 * (b.priority - a.priority), 0) - (c - a.startTime))
            });
            return d
        }
        f.Lh = function(a) {
            this.D.getTaskById(a.id) || this.D.enqueue(a)
        };
        f.mg = function(a, b, c) {
            this.De++;
            a.resource.isInViewport() && 0 <= this.yb && this.kg++;
            this.ra.dequeue(a);
            this.schedulePass(1E3);
            if (!b) return E().info("Resources", "task failed:", a.id, a.resource.debugid, c), Promise.reject(c)
        };

        function bk(a, b, c) {
            return 0 != b.getState() && b.isDisplayed() && (a.ja || "prerender" == a.ampdoc.getVisibilityState() && b.prerenderAllowed()) && (c || b.isInViewport() || b.renderOutsideViewport() || b.idleRenderOutsideViewport()) ? !0 : !1
        }
        f.scheduleLayoutOrPreload = function(a, b, c, d) {
            a.getState();
            a.isDisplayed();
            d = d || !1;
            bk(this, a, d) && (b ? this.xa(a, "L", 0, c || 0, d, a.startLayout.bind(a)) : this.xa(a, "P", 2, c || 0, d, a.startLayout.bind(a)))
        };
        f.xa = function(a, b, c, d, e, g) {
            b = a.getTaskId(b);
            a = {
                id: b,
                resource: a,
                priority: Math.max(a.getLayoutPriority(), d) + c,
                forceOutsideViewport: e,
                callback: g,
                scheduleTime: Date.now(),
                startTime: 0,
                promise: null
            };
            E().fine("Resources", "schedule:", a.id, "at", a.scheduleTime);
            var h = this.D.getTaskById(b);
            if (!h || a.priority < h.priority) h && this.D.dequeue(h), this.D.enqueue(a), this.schedulePass(ak(this, a));
            a.resource.layoutScheduled(a.scheduleTime)
        };
        f.whenFirstPass = function() {
            return this.uf.promise
        };

        function Nj(a, b) {
            function c() {
                a.j.forEach(function(a) {
                    return a.resume()
                });
                h()
            }

            function d() {
                a.j.forEach(function(b) {
                    b.unload();
                    Uj(a, b)
                });
                try {
                    a.win.getSelection().removeAllRanges()
                } catch (l) {}
            }

            function e() {
                a.j.forEach(function(a) {
                    return a.pause()
                })
            }

            function g() {}

            function h() {
                var b = a.H.getSize();
                if (0 < b.height && 0 < b.width) {
                    0 < a.ha.length && Vj(a);
                    b = Date.now();
                    var c = a.Fa,
                        d = a.ib,
                        e = a.Gd;
                    a.Fa = !1;
                    a.ib = -1;
                    for (var g = 0, h = 0, z = 0; z < a.j.length; z++) {
                        var q = a.j[z];
                        0 != q.getState() || q.isBuilding() || Qj(a, q, !0);
                        if (a.V) c && (q.applySizesAndMediaQuery(),
                            E().fine("Resources", "apply sizes/media query:", q.debugid));
                        else if (c || !q.hasBeenMeasured() || 1 == q.getState()) q.applySizesAndMediaQuery(), E().fine("Resources", "apply sizes/media query:", q.debugid), g++;
                        q.isMeasureRequested() && h++
                    }
                    var p;
                    if (a.V)
                        for (c = 0; c < a.j.length; c++) d = a.j[c], d.hasOwner() || ((g = d.isMeasureRequested()) && E().fine("Resources", "force remeasure:", d.debugid), ((h = d.hasBeenPremeasured()) || g || a.Fa) && !Xj(d, h) && (d.getState(), p || (p = []), p.push(d)));
                    else if (0 < g || 0 < h || c || -1 != d || 0 < e.length)
                        for (g = 0; g <
                            a.j.length; g++)
                            if (h = a.j[g], !h.hasOwner() || h.isMeasureRequested()) {
                                z = c || 1 == h.getState() || !h.hasBeenMeasured() || h.isMeasureRequested() || -1 != d && h.getLayoutBox().bottom >= d;
                                if (!z)
                                    for (q = 0; q < e.length; q++)
                                        if (e[q].contains(h.element)) {
                                            z = !0;
                                            break
                                        } z && !Xj(h) && (p || (p = []), p.push(h))
                            } e.length = 0;
                    p && Yj(a, p);
                    e = a.H.getRect();
                    p = a.ja ? gc(e, .25, 2) : 0 < a.$ ? gc(e, 0, a.$ - 1) : null;
                    e = a.ja ? gc(e, .25, .25) : e;
                    for (c = 0; c < a.j.length; c++) d = a.j[c], 0 == d.getState() || d.hasOwner() || (g = a.ja && d.isDisplayed() && d.overlaps(e), d.setInViewport(g));
                    if (p)
                        for (e =
                            0; e < a.j.length; e++) c = a.j[e], !c.isBuilt() && !c.isBuilding() && !c.hasOwner() && c.hasBeenMeasured() && c.isDisplayed() && c.overlaps(p) && Qj(a, c, !0, !0), 2 != c.getState() || c.hasOwner() || c.isDisplayed() && c.overlaps(p) && a.scheduleLayoutOrPreload(c, !0);
                    if (a.ja && Rj(a, b)) {
                        for (p = b = 0; p < a.j.length && 4 > b; p++) e = a.j[p], 2 == e.getState() && !e.hasOwner() && e.isDisplayed() && e.idleRenderOutsideViewport() && (E().fine("Resources", "idleRenderOutsideViewport layout:", e.debugid), a.scheduleLayoutOrPreload(e, !1), b++);
                        for (p = 0; p < a.j.length &&
                            4 > b; p++) e = a.j[p], 2 == e.getState() && !e.hasOwner() && e.isDisplayed() && (E().fine("Resources", "idle layout:", e.debugid), a.scheduleLayoutOrPreload(e, !1), b++)
                    }
                    b = Date.now();
                    e = -1;
                    for (p = a.D.peek(a.xd); p;) {
                        e = ak(a, p);
                        E().fine("Resources", "peek from queue:", p.id, "sched at", p.scheduleTime, "score", a.xd(p), "timeout", e);
                        if (16 < e) break;
                        a.D.dequeue(p);
                        (e = a.ra.getTaskById(p.id)) ? (p = a.Lh.bind(a, p), e.promise.then(p, p)) : (e = p.resource, c = !0, a.V ? e.hasBeenPremeasured() && (c = e.isDisplayed(!0)) : e.measure(), c && bk(a, e, p.forceOutsideViewport) ?
                            (p.promise = p.callback(), p.startTime = b, E().fine("Resources", "exec:", p.id, "at", p.startTime), a.ra.enqueue(p), p.promise.then(a.mg.bind(a, p, !0), a.mg.bind(a, p, !1)).catch(zf)) : (E().fine("Resources", "cancelled", p.id), e.layoutCanceled()));
                        p = a.D.peek(a.xd);
                        e = -1
                    }
                    E().fine("Resources", "queue size:", a.D.getSize(), "exec size:", a.ra.getSize());
                    0 <= e ? b = e : (b = 2 * (b - a.ra.getLastDequeueTime()), b = Math.max(Math.min(3E4, b), 5E3));
                    0 < a.ha.length && (b = Math.min(b, 500));
                    a.ja ? a.schedulePass(b) ? E().fine("Resources", "next pass:", b) :
                        E().fine("Resources", "pass already scheduled") : E().fine("Resources", "document is not visible: no scheduling");
                    a.uf.resolve()
                }
            }
            b.addTransition("prerender", "prerender", h);
            b.addTransition("prerender", "visible", h);
            b.addTransition("prerender", "hidden", h);
            b.addTransition("prerender", "inactive", h);
            b.addTransition("prerender", "paused", h);
            b.addTransition("visible", "visible", h);
            b.addTransition("visible", "hidden", h);
            b.addTransition("visible", "inactive", d);
            b.addTransition("visible", "paused", e);
            b.addTransition("hidden",
                "visible", h);
            b.addTransition("hidden", "hidden", h);
            b.addTransition("hidden", "inactive", d);
            b.addTransition("hidden", "paused", e);
            b.addTransition("inactive", "visible", c);
            b.addTransition("inactive", "hidden", c);
            b.addTransition("inactive", "inactive", g);
            b.addTransition("inactive", "paused", h);
            b.addTransition("paused", "visible", c);
            b.addTransition("paused", "hidden", h);
            b.addTransition("paused", "inactive", d);
            b.addTransition("paused", "paused", g)
        }

        function Uj(a, b, c) {
            1 == b.getState() && (a.D.purge(function(a) {
                return a.resource == b
            }), a.ra.purge(function(a) {
                return a.resource == b
            }), ig(a.ha, function(a) {
                return a.resource === b
            }));
            if (0 == b.getState() && c && a.va) {
                var d = a.va.indexOf(b); - 1 != d && a.va.splice(d, 1)
            }
        };
        var ck = /^i-amphtml-/;

        function dk(a, b) {
            this.ampdoc = a;
            b = b ? b.document.documentElement : a.getHeadNode();
            this.fb = ud(a);
            this.H = xd(a);
            a = Tc(b, "action");
            a.addGlobalTarget("AMP", this.Xg.bind(this));
            a.addGlobalMethodHandler("hide", this.yf.bind(this));
            a.addGlobalMethodHandler("show", this.Bf.bind(this));
            a.addGlobalMethodHandler("toggleVisibility", this.ah.bind(this));
            a.addGlobalMethodHandler("scrollTo", this.Af.bind(this));
            a.addGlobalMethodHandler("focus", this.Yg.bind(this));
            a.addGlobalMethodHandler("toggleClass", this.$g.bind(this))
        }
        dk.installInEmbedWindow = function(a, b) {
            Zc(a, "standard-actions", new dk(b, a))
        };
        f = dk.prototype;
        f.Xg = function(a) {
            if (!a.satisfiesTrust(2)) return null;
            var b = a.node,
                c = a.method,
                d = a.args,
                e = (b.ownerDocument || b).defaultView;
            switch (c) {
                case "pushState":
                case "setState":
                    return od(b.nodeType === Node.DOCUMENT_NODE ? b.documentElement : b).then(function(b) {
                        F(b, "AMP-BIND is not installed.");
                        return b.invoke(a)
                    });
                case "navigateTo":
                    return ek(this, a);
                case "closeOrNavigateTo":
                    return fk(this, a);
                case "scrollTo":
                    return F(d.id, "AMP.scrollTo must provide element ID"), a.node = Xc(b).getElementById(d.id), this.Af(a);
                case "goBack":
                    return bd(this.ampdoc,
                        "history").goBack(), null;
                case "print":
                    return e.print(), null;
                case "optoutOfCid":
                    return gd(Yc(this.ampdoc), "cid").then(function(a) {
                        return a.optOut()
                    }).catch(function(a) {
                        E().error("STANDARD-ACTIONS", "Failed to opt out of CID", a)
                    })
            }
            throw C().createError("Unknown AMP action ", c);
        };

        function ek(a, b) {
            var c = b.node,
                d = b.caller,
                e = b.method,
                g = b.args,
                h = (c.ownerDocument || c).defaultView;
            b = x();
            N(d.tagName, "AMP-") && (b = d.getImpl().then(function(a) {
                "function" == typeof a.throwIfCannotNavigate && a.throwIfCannotNavigate()
            }));
            return b.then(function() {
                bd(a.ampdoc, "navigation").navigateTo(h, g.url, "AMP." + e, {
                    target: g.target,
                    opener: g.opener
                })
            }, function(a) {
                C().error("STANDARD-ACTIONS", a.message)
            })
        }

        function fk(a, b) {
            var c = b.node;
            c = (c.ownerDocument || c).defaultView;
            var d = c.parent != c,
                e = !1;
            c.opener && a.ampdoc.isSingleDoc() && !d && (c.close(), e = c.closed);
            return e ? x() : ek(a, b)
        }
        f.Af = function(a) {
            var b = a.node,
                c = (a = a.args) && a.position,
                d = a && a.duration;
            c && !["top", "bottom", "center"].includes(c) && (c = void 0);
            Oa(d) || (d = void 0);
            return this.H.animateScrollIntoView(b, c, d)
        };
        f.Yg = function(a) {
            Ob(a.node);
            return null
        };
        f.yf = function(a) {
            var b = a.node;
            b.classList.contains("i-amphtml-element") ? this.fb.mutateElement(b, function() {
                return b.collapse()
            }, !0) : this.fb.mutateElement(b, function() {
                return se(b, !1)
            });
            return null
        };
        f.Bf = function(a) {
            var b = a.node,
                c = b.ownerDocument.defaultView;
            if (b.classList.contains("i-amphtml-layout-nodisplay")) return C().warn("STANDARD-ACTIONS", "Elements with layout=nodisplay cannot be dynamically shown.", b), null;
            this.fb.measureElement(function() {
                "none" != te(c, b).display || b.hasAttribute("hidden") || C().warn("STANDARD-ACTIONS", 'Elements can only be dynamically shown when they have the "hidden" attribute set or when they were dynamically hidden.', b)
            });
            var d = b.hasAttribute("autofocus") ? b : b.querySelector("[autofocus]");
            d && U(c).isIos() ? (gk(b, d), this.fb.mutateElement(b, function() {})) : this.fb.mutateElement(b, function() {
                gk(b, d)
            });
            return null
        };

        function gk(a, b) {
            a.classList.contains("i-amphtml-element") ? a.expand() : se(a, !0);
            b && Ob(b)
        }
        f.ah = function(a) {
            return a.node.hasAttribute("hidden") ? this.Bf(a) : this.yf(a)
        };
        f.$g = function(a) {
            var b = a.node,
                c = a.args,
                d = C().assertString(c["class"], "Argument 'class' must be a string.");
            if (ck.test(d)) return null;
            this.fb.mutateElement(b, function() {
                if (void 0 !== c.force) {
                    var a = C().assertBoolean(c.force, "Optional argument 'force' must be a boolean.");
                    b.classList.toggle(d, a)
                } else b.classList.toggle(d)
            });
            return null
        };

        function hk(a, b, c) {
            this.ampdoc = a;
            this.h = b;
            this.o = c;
            this.Ic = Jc(this.ampdoc.win.location);
            this.Yc = null
        }
        f = hk.prototype;
        f.get = function(a) {
            return ik(this).then(function(b) {
                return b.get(a)
            })
        };
        f.set = function(a, b, c) {
            return this.setNonBoolean(a, b, c)
        };
        f.setNonBoolean = function(a, b, c) {
            return jk(this, function(d) {
                return d.set(a, b, c)
            })
        };
        f.remove = function(a) {
            return jk(this, function(b) {
                return b.remove(a)
            })
        };

        function ik(a) {
            a.Yc || (a.Yc = a.o.loadBlob(a.Ic).then(function(a) {
                return a ? Sb(atob(a)) : {}
            }).catch(function(a) {
                E().expectedError("Storage", "Failed to load store: ", a);
                return {}
            }).then(function(a) {
                return new kk(a)
            }));
            return a.Yc
        }

        function jk(a, b) {
            return ik(a).then(function(c) {
                b(c);
                c = btoa(JSON.stringify(c.obj));
                return a.o.saveBlob(a.Ic, c)
            }).then(a.Ig.bind(a))
        }

        function lk(a) {
            a.h.onBroadcast(function(b) {
                "amp-storage-reset" == b.type && b.origin == a.Ic && (E().fine("Storage", "Received reset message"), a.Yc = null)
            })
        }
        f.Ig = function() {
            E().fine("Storage", "Broadcasted reset message");
            this.h.broadcast({
                type: "amp-storage-reset",
                origin: this.Ic
            })
        };

        function kk(a) {
            this.obj = Qb(a);
            this.qh = 8;
            this.Aa = this.obj.vv || Object.create(null);
            this.obj.vv || (this.obj.vv = this.Aa)
        }
        kk.prototype.get = function(a) {
            return (a = this.Aa[a]) ? a.v : void 0
        };
        kk.prototype.set = function(a, b, c) {
            if (void 0 !== this.Aa[a]) {
                a = this.Aa[a];
                var d = Date.now();
                c && (d = a.t);
                a.v = b;
                a.t = d
            } else this.Aa[a] = K({
                v: b,
                t: Date.now()
            });
            b = Object.keys(this.Aa);
            if (b.length > this.qh) {
                var e = Infinity,
                    g = null;
                for (c = 0; c < b.length; c++) a = this.Aa[b[c]], a.t < e && (g = b[c], e = a.t);
                g && delete this.Aa[g]
            }
        };
        kk.prototype.remove = function(a) {
            delete this.Aa[a]
        };

        function mk(a) {
            this.win = a;
            try {
                if ("localStorage" in this.win) {
                    this.win.localStorage.getItem("test");
                    var b = !0
                } else b = !1
            } catch (c) {
                b = !1
            }
            this.Xd = b;
            this.Xd || (a = Error("localStorage not supported."), E().expectedError("Storage", a))
        }
        mk.prototype.loadBlob = function(a) {
            var b = this;
            return new Promise(function(c) {
                b.Xd ? c(b.win.localStorage.getItem("amp-store:" + a)) : c(null)
            })
        };
        mk.prototype.saveBlob = function(a, b) {
            var c = this;
            return new Promise(function(d) {
                c.Xd && c.win.localStorage.setItem("amp-store:" + a, b);
                d()
            })
        };

        function nk(a) {
            this.h = a
        }
        nk.prototype.loadBlob = function(a) {
            return this.h.sendMessageAwaitResponse("loadStore", K({
                origin: a
            })).then(function(a) {
                return a.blob
            })
        };
        nk.prototype.saveBlob = function(a, b) {
            return this.h.sendMessageAwaitResponse("saveStore", K({
                origin: a,
                blob: b
            })).catch(function(a) {
                throw E().createExpectedError("Storage", "Failed to save store: ", a);
            })
        };

        function ok(a) {
            S(a, "storage", function() {
                var b = W(a),
                    c = parseInt(b.getParam("storage"), 10) ? new nk(b) : new mk(a.win);
                b = new hk(a, b, c);
                lk(b);
                return b
            }, !0)
        };

        function pk(a) {
            this.win = a;
            this.Oh = this.win.Promise.resolve();
            this.Zh = 0;
            this.zd = {};
            this.ze = Date.now()
        }
        f = pk.prototype;
        f.timeSinceStart = function() {
            return Date.now() - this.ze
        };
        f.delay = function(a, b) {
            var c = this;
            if (!b) {
                var d = "p" + this.Zh++;
                this.Oh.then(function() {
                    c.zd[d] ? delete c.zd[d] : a()
                }).catch(zf);
                return d
            }
            return this.win.setTimeout(function() {
                try {
                    a()
                } catch (e) {
                    throw zf(e), e;
                }
            }, b)
        };
        f.cancel = function(a) {
            "string" == typeof a ? this.zd[a] = !0 : this.win.clearTimeout(a)
        };
        f.promise = function(a) {
            var b = this;
            return new this.win.Promise(function(c) {
                if (-1 == b.delay(c, a)) throw Error("Failed to schedule timer.");
            })
        };
        f.timeoutPromise = function(a, b, c) {
            function d() {
                e.cancel(g)
            }
            var e = this,
                g, h = new this.win.Promise(function(b, d) {
                    g = e.delay(function() {
                        d(C().createError(c || "timeout"))
                    }, a);
                    if (-1 == g) throw Error("Failed to schedule timer.");
                });
            if (!b) return h;
            b.then(d, d);
            return this.win.Promise.race([h, b])
        };
        f.poll = function(a, b) {
            var c = this;
            return new this.win.Promise(function(d) {
                var e = c.win.setInterval(function() {
                    b() && (c.win.clearInterval(e), d())
                }, a)
            })
        };

        function qk(a, b) {
            a = b || a.getRootNode();
            this.Cg = (a.ownerDocument || a).createElement("a");
            this.Ua = new mc
        }
        qk.installInEmbedWindow = function(a, b) {
            Zc(a, "url", new qk(b, a.document))
        };
        f = qk.prototype;
        f.parse = function(a, b) {
            return yc(this.Cg, a, b ? null : this.Ua)
        };

        function rk(a, b) {
            return "string" !== typeof b ? b : a.parse(b)
        }
        f.isProtocolValid = function(a) {
            return Fc(a)
        };
        f.getSourceOrigin = function(a) {
            return Jc(rk(this, a))
        };
        f.getSourceUrl = function(a) {
            return Ic(rk(this, a))
        };
        f.assertHttpsUrl = function(a, b, c) {
            return Dc(a, b, void 0 === c ? "source" : c)
        };
        f.assertAbsoluteHttpOrHttpsUrl = function(a) {
            F(/^https?:/i.test(a), 'URL must start with "http://" or "https://". Invalid value: %s', a);
            return O(a).href
        };
        f.isProxyOrigin = function(a) {
            return P(rk(this, a))
        };
        f.isSecure = function(a) {
            return Cc(rk(this, a))
        };
        f.getWinOrigin = function(a) {
            return a.origin || rk(this, a.location.href).origin
        };
        f.getCdnUrlOnOrigin = function(a) {
            if (P(a)) return a;
            var b = rk(this, a),
                c = b.hash,
                d = b.pathname,
                e = b.search,
                g = encodeURIComponent(b.host);
            return B.cdn + "/c/" + g + d + e + c
        };
        var sk = {
            navigationStart: 1,
            redirectStart: 1,
            redirectEnd: 1,
            fetchStart: 1,
            domainLookupStart: 1,
            domainLookupEnd: 1,
            connectStart: 1,
            secureConnectionStart: 1,
            connectEnd: 1,
            requestStart: 1,
            responseStart: 1,
            responseEnd: 1,
            domLoading: 2,
            domInteractive: 2,
            domContentLoaded: 2,
            domComplete: 2,
            loadEventStart: 3,
            loadEventEnd: 4
        };

        function tk(a, b, c) {
            var d = sk[b] || 3,
                e = Math.max(d, c ? sk[c] || 3 : d);
            if (1 === e) var g = x();
            else if (2 === e) g = zj(a.document);
            else if (3 === e) g = Oe(a);
            else if (4 === e) {
                var h = V(a);
                g = Oe(a).then(function() {
                    return h.promise(1)
                })
            }
            return g.then(function() {
                return uk(a, b, c)
            })
        }

        function uk(a, b, c) {
            var d = a.performance && a.performance.timing;
            if (d && 0 != d.navigationStart) {
                var e = void 0 === c ? d[b] : d[c] - d[b];
                if (Oa(e) && !(0 > e)) return e
            }
        }

        function vk(a, b) {
            var c = a.performance && a.performance.navigation;
            if (c && void 0 !== c[b]) return c[b]
        }

        function wk(a) {
            this.ampdoc = a;
            this.Ga = Object.create(null);
            this.Sd = !1;
            xk(this)
        }
        f = wk.prototype;
        f.qc = function() {
            this.initialize();
            this.Sd = !0
        };
        f.initialize = function() {};
        f.get = function(a) {
            this.Sd || this.qc();
            return this.Ga[a]
        };
        f.set = function(a, b) {
            a.indexOf("RETURN");
            this.Ga[a] = this.Ga[a] || {
                sync: void 0,
                async: void 0
            };
            this.Ga[a].sync = b;
            return this
        };
        f.setAsync = function(a, b) {
            a.indexOf("RETURN");
            this.Ga[a] = this.Ga[a] || {
                sync: void 0,
                async: void 0
            };
            this.Ga[a].async = b;
            return this
        };
        f.setBoth = function(a, b, c) {
            return this.set(a, b).setAsync(a, c)
        };
        f.getExpr = function(a, b) {
            this.Sd || this.qc();
            var c = Object.assign({}, this.Ga, a);
            return yk(this, Object.keys(c), b)
        };

        function yk(a, b, c) {
            xk(a) && (b = b.filter(function(b) {
                return xk(a).includes(b)
            }));
            c && (b = b.filter(function(a) {
                return c[a]
            }));
            if (0 === b.length) return /_^/g;
            b.sort(function(a, b) {
                return b.length - a.length
            });
            var d = "\\$?(" + b.map(function(a) {
                return "$" === a[0] ? "\\" + a : a
            }).join("|") + ")";
            return new RegExp(d, "g")
        }

        function xk(a) {
            if (a.He) return a.He;
            if (a.ampdoc.isSingleDoc()) {
                var b = a.ampdoc.getRootNode();
                if (rf(["\u26a14email", "amp4email"], b)) return a.He = [""], a.He
            }
        };

        function zk(a, b, c, d, e, g) {
            this.ia = a;
            this.ob = b;
            this.jf = c;
            this.jb = d;
            this.ka = e;
            this.Tg = !g
        }
        zk.prototype.expand = function(a) {
            if (!a.length) return this.jb ? a : Promise.resolve(a);
            var b = this.ia.getExpr(this.ob, this.ka);
            b = Ak(a, b);
            return b.length ? Bk(this, a, b) : this.jb ? a : Promise.resolve(a)
        };
        zk.prototype.getMacroNames = function(a) {
            var b = this.ia.getExpr(this.ob, this.ka);
            return (a = a.match(b)) ? a : []
        };

        function Ak(a, b) {
            var c = [];
            a.replace(b, function(a, b, g) {
                a = a.length;
                c.push({
                    start: g,
                    stop: a + g - 1,
                    name: b,
                    length: a
                })
            });
            return c
        }

        function Bk(a, b, c) {
            function d(r) {
                for (var u = "", w = [], z = []; g < b.length && h <= c.length;) {
                    var q = u.trim();
                    if (l && g === l.start) q && w.push(k ? sb(u) : u), u = void 0, u = a.ob && lb.call(a.ob, l.name) ? {
                        name: l.name,
                        prioritized: a.ob[l.name],
                        encode: r
                    } : Object.assign({}, a.ia.get(l.name), {
                        name: l.name,
                        encode: r
                    }), g = l.stop + 1, l = c[++h], "(" === b[g] ? (g++, k++, e.push(u), w.push(d(!1))) : w.push(Ck(a, u)), u = "";
                    else {
                        if ("`" === b[g]) n ? (n = !1, u.length && w.push(u)) : (n = !0, q && w.push(q)), u = "";
                        else if (k && "," === b[g] && !n) q && w.push(q), z.push(w), w = [], "," === b[g +
                            1] && (z.push([""]), g++), u = "";
                        else {
                            if (k && ")" === b[g] && !n) return g++, k--, u = e.pop(), q && w.push(q), z.push(w), Ck(a, u, z);
                            u += b[g]
                        }
                        g++
                    }
                    g === b.length && u.length && w.push(u)
                }
                return a.jb ? w.join("") : Promise.all(w).then(function(a) {
                    return a.join("")
                }).catch(function(a) {
                    hb(a);
                    return ""
                })
            }
            var e = [],
                g = 0,
                h = 0,
                l = c[h],
                k = 0,
                n = !1;
            return d(a.Tg)
        }

        function Ck(a, b, c) {
            var d = b.encode,
                e = b.name;
            if (void 0 != b.prioritized) var g = b.prioritized;
            else a.jb && void 0 != b.sync ? g = b.sync : a.jb ? (C().error("Expander", "ignoring async replacement key: ", b.name), g = "") : g = b.async || b.sync;
            return a.jb ? (a = Dk(a, g, e, c), d ? encodeURIComponent(a) : a) : Ek(a, g, e, c).then(function(a) {
                return d ? encodeURIComponent(a) : a
            })
        }

        function Ek(a, b, c, d) {
            try {
                var e = "function" === typeof b ? d ? Fk(d).then(function(a) {
                    return b.apply(null, a)
                }) : mb(b) : Promise.resolve(b);
                return e.then(function(b) {
                    Gk(a, c, b, d);
                    return null == b ? "" : b
                }).catch(function(b) {
                    hb(b);
                    Gk(a, c, "", d);
                    return Promise.resolve("")
                })
            } catch (g) {
                return hb(g), Gk(a, c, "", d), Promise.resolve("")
            }
        }

        function Fk(a) {
            return Promise.all(a.map(function(a) {
                return Promise.all(a).then(function(a) {
                    return a.join("")
                })
            }))
        }

        function Dk(a, b, c, d) {
            try {
                var e = b;
                "function" === typeof b && (e = b.apply(null, Hk(d)));
                if (e && e.then) {
                    C().error("Expander", "ignoring async macro resolution");
                    var g = ""
                } else "string" === typeof e || "number" === typeof e || "boolean" === typeof e ? (Gk(a, c, e, d), g = e.toString()) : (Gk(a, c, "", d), g = "");
                return g
            } catch (h) {
                return hb(h), Gk(a, c, "", d), ""
            }
        }

        function Hk(a) {
            return a ? a.map(function(a) {
                return a.join("")
            }) : a
        }

        function Gk(a, b, c, d) {
            if (a.jf) {
                var e = "";
                d && (e = "(" + d.filter(function(a) {
                    return "" !== a
                }).join(",") + ")");
                a.jf["" + b + e] = c || ""
            }
        };

        function Ik(a) {
            return function() {
                return (new Date)[a]()
            }
        }

        function Jk(a, b) {
            return function() {
                return a[b]
            }
        }

        function Kk(a) {
            wk.call(this, a);
            this.xe = null
        }
        m(Kk, wk);

        function Lk(a, b, c, d) {
            a.setBoth(b, function() {
                return uk(a.ampdoc.win, c, d)
            }, function() {
                return tk(a.ampdoc.win, c, d)
            })
        }
        Kk.prototype.initialize = function() {
            function a() {
                var a = Mk(b);
                return Ec(Nk(b, a.sourceUrl))
            }
            var b = this,
                c = this.ampdoc.win,
                d = this.ampdoc.getHeadNode(),
                e = xd(this.ampdoc);
            this.set("RANDOM", function() {
                return Math.random()
            });
            var g = Object.create(null);
            this.set("COUNTER", function(a) {
                return g[a] = (g[a] | 0) + 1
            });
            this.set("CANONICAL_URL", function() {
                return Mk(b).canonicalUrl
            });
            this.set("CANONICAL_HOST", function() {
                return O(Mk(b).canonicalUrl).host
            });
            this.set("CANONICAL_HOSTNAME", function() {
                return O(Mk(b).canonicalUrl).hostname
            });
            this.set("CANONICAL_PATH", function() {
                return O(Mk(b).canonicalUrl).pathname
            });
            this.setAsync("DOCUMENT_REFERRER", function() {
                return W(b.ampdoc).getReferrerUrl()
            });
            this.setAsync("EXTERNAL_REFERRER", function() {
                return W(b.ampdoc).getReferrerUrl().then(function(a) {
                    return a ? O(Ic(a)).hostname === c.location.hostname ? null : a : null
                })
            });
            this.set("TITLE", function() {
                var a = c.document;
                return a.originalTitle || a.title
            });
            this.set("AMPDOC_URL", function() {
                return Ec(Nk(b, c.location.href))
            });
            this.set("AMPDOC_HOST", function() {
                var a =
                    O(c.location.href);
                return a && a.host
            });
            this.set("AMPDOC_HOSTNAME", function() {
                var a = O(c.location.href);
                return a && a.hostname
            });
            this.setBoth("SOURCE_URL", function() {
                return a()
            }, function() {
                return qh().then(function() {
                    return a()
                })
            });
            this.set("SOURCE_HOST", function() {
                return O(Mk(b).sourceUrl).host
            });
            this.set("SOURCE_HOSTNAME", function() {
                return O(Mk(b).sourceUrl).hostname
            });
            this.set("SOURCE_PATH", function() {
                return O(Mk(b).sourceUrl).pathname
            });
            this.set("PAGE_VIEW_ID", function() {
                return Mk(b).pageViewId
            });
            this.setAsync("PAGE_VIEW_ID_64", function() {
                return Mk(b).pageViewId64
            });
            this.setBoth("QUERY_PARAM", function(a, c) {
                return Ok(b, a, void 0 === c ? "" : c)
            }, function(a, c) {
                c = void 0 === c ? "" : c;
                return qh().then(function() {
                    return Ok(b, a, c)
                })
            });
            this.set("FRAGMENT_PARAM", function(a, c) {
                c = void 0 === c ? "" : c;
                F(a, "The first argument to FRAGMENT_PARAM, the fragment string param is required");
                F("string" == typeof a, "param should be a string");
                var d = t(b.ampdoc.win.location.originalHash);
                return void 0 === d[a] ? c : d[a]
            });
            var h = null;
            this.setBoth("CLIENT_ID",
                function(a) {
                    return h ? h[a] : null
                },
                function(a, c, e) {
                    F(a, "The first argument to CLIENT_ID, the fallback Cookie name, is required");
                    var g = x();
                    c && (g = ld(d, "userNotificationManager", "amp-user-notification").then(function(a) {
                        return a.get(c)
                    }));
                    return gd(Yc(b.ampdoc), "cid").then(function(b) {
                        return b.get({
                            scope: a,
                            createCookieIfNotPresent: !0,
                            cookieName: e
                        }, g)
                    }).then(function(b) {
                        h || (h = Object.create(null));
                        var c = e || a;
                        b && "_ga" == c && ("string" === typeof b ? b = b.replace(/^(GA1|1)\.[\d-]+\./, "") : E().error("UrlReplacements",
                            "non-string cid, what is it?", Object.keys(b)));
                        return h[a] = b
                    })
                });
            this.setAsync("VARIANT", function(a) {
                return Pk(b, function(b) {
                    var c = b[a];
                    F(void 0 !== c, "The value passed to VARIANT() is not a valid experiment in <amp-experiment>:" + a);
                    return null === c ? "none" : c
                }, "VARIANT")
            });
            this.setAsync("VARIANTS", function() {
                return Pk(b, function(a) {
                    var b = [],
                        c;
                    for (c in a) b.push(c + "." + (a[c] || "none"));
                    return b.join("!")
                }, "VARIANTS")
            });
            this.setAsync("AMP_GEO", function(a) {
                return Qk(b, function(b) {
                    return a ? (F("ISOCountry" ===
                        a, "The value passed to AMP_GEO() is not valid name:" + a), b[a] || "unknown") : b.matchedISOCountryGroups.join(",")
                })
            });
            this.setAsync("SHARE_TRACKING_INCOMING", function() {
                return Rk(b, function(a) {
                    return a.incomingFragment
                }, "SHARE_TRACKING_INCOMING")
            });
            this.setAsync("SHARE_TRACKING_OUTGOING", function() {
                return Rk(b, function(a) {
                    return a.outgoingFragment
                }, "SHARE_TRACKING_OUTGOING")
            });
            this.set("TIMESTAMP", Ik("getTime"));
            this.set("TIMESTAMP_ISO", Ik("toISOString"));
            this.set("TIMEZONE", Ik("getTimezoneOffset"));
            this.set("SCROLL_HEIGHT",
                function() {
                    return e.getScrollHeight()
                });
            this.set("SCROLL_WIDTH", function() {
                return e.getScrollWidth()
            });
            this.set("VIEWPORT_HEIGHT", function() {
                return e.getHeight()
            });
            this.set("VIEWPORT_WIDTH", function() {
                return e.getWidth()
            });
            var l = c.screen;
            this.set("SCREEN_WIDTH", Jk(l, "width"));
            this.set("SCREEN_HEIGHT", Jk(l, "height"));
            this.set("AVAILABLE_SCREEN_HEIGHT", Jk(l, "availHeight"));
            this.set("AVAILABLE_SCREEN_WIDTH", Jk(l, "availWidth"));
            this.set("SCREEN_COLOR_DEPTH", Jk(l, "colorDepth"));
            this.set("DOCUMENT_CHARSET",
                function() {
                    var a = c.document;
                    return a.characterSet || a.charset
                });
            this.set("BROWSER_LANGUAGE", function() {
                var a = c.navigator;
                return (a.language || a.userLanguage || a.browserLanguage || "").toLowerCase()
            });
            this.set("USER_AGENT", function() {
                return c.navigator.userAgent
            });
            Lk(this, "PAGE_LOAD_TIME", "navigationStart", "loadEventStart");
            Lk(this, "DOMAIN_LOOKUP_TIME", "domainLookupStart", "domainLookupEnd");
            Lk(this, "TCP_CONNECT_TIME", "connectStart", "connectEnd");
            Lk(this, "SERVER_RESPONSE_TIME", "requestStart", "responseStart");
            Lk(this, "PAGE_DOWNLOAD_TIME", "responseStart", "responseEnd");
            Lk(this, "REDIRECT_TIME", "navigationStart", "fetchStart");
            Lk(this, "DOM_INTERACTIVE_TIME", "navigationStart", "domInteractive");
            Lk(this, "CONTENT_LOAD_TIME", "navigationStart", "domContentLoadedEventStart");
            this.setAsync("ACCESS_READER_ID", function() {
                return Sk(b, function(a) {
                    return a.getAccessReaderId()
                }, "ACCESS_READER_ID")
            });
            this.setAsync("AUTHDATA", function(a) {
                F(a, "The first argument to AUTHDATA, the field, is required");
                return Sk(b, function(b) {
                        return b.getAuthdataField(a)
                    },
                    "AUTHDATA")
            });
            this.setAsync("VIEWER", function() {
                return W(b.ampdoc).getViewerOrigin().then(function(a) {
                    return void 0 == a ? "" : a
                })
            });
            this.setAsync("TOTAL_ENGAGED_TIME", function() {
                return ld(d, "activity", "amp-analytics").then(function(a) {
                    return a.getTotalEngagedTime()
                })
            });
            this.setAsync("INCREMENTAL_ENGAGED_TIME", function(a, b) {
                return ld(d, "activity", "amp-analytics").then(function(c) {
                    return c.getIncrementalEngagedTime(a, "false" !== b)
                })
            });
            this.set("NAV_TIMING", function(a, b) {
                F(a, "The first argument to NAV_TIMING, the start attribute name, is required");
                return uk(c, a, b)
            });
            this.setAsync("NAV_TIMING", function(a, b) {
                F(a, "The first argument to NAV_TIMING, the start attribute name, is required");
                return tk(c, a, b)
            });
            this.set("NAV_TYPE", function() {
                return vk(c, "type")
            });
            this.set("NAV_REDIRECT_COUNT", function() {
                return vk(c, "redirectCount")
            });
            this.set("AMP_VERSION", function() {
                return "2006112352003"
            });
            this.set("BACKGROUND_STATE", function() {
                return b.ampdoc.isVisible() ? "0" : "1"
            });
            this.setAsync("VIDEO_STATE", function(a, c) {
                return bd(b.ampdoc, "video-manager").getVideoStateProperty(a,
                    c)
            });
            this.setAsync("AMP_STATE", function(a) {
                var c = b.ampdoc.getRootNode();
                return od(c.documentElement || c).then(function(b) {
                    return b ? b.getStateValue(a) || "" : ""
                })
            })
        };

        function Nk(a, b) {
            if (a = Mk(a).replaceParams) {
                b = Gc(b);
                var c = O(b);
                c = t(c.search);
                for (var d = K({}), e = Object.keys(a), g = 0; g < e.length; g++) lb.call(c, e[g]) || (d[e[g]] = a[e[g]]);
                a = Ac(b, d)
            } else a = b;
            return a
        }

        function Mk(a) {
            return sd(a.ampdoc)
        }

        function Sk(a, b, c) {
            a = a.ampdoc.getHeadNode();
            return Promise.all([md(a, "access", "amp-access"), md(a, "subscriptions", "amp-subscriptions")]).then(function(a) {
                a = a[0] || a[1];
                return a ? b(a) : (C().error("UrlReplacements", "Access or subsciptions service is not installed to access: ", c), null)
            })
        }

        function Ok(a, b, c) {
            F(b, "The first argument to QUERY_PARAM, the query string param is required");
            var d = O(Gc(a.ampdoc.win.location.href));
            d = t(d.search);
            a = Mk(a).replaceParams;
            return "undefined" !== typeof d[b] ? d[b] : a && "undefined" !== typeof a[b] ? a[b] : c
        }

        function Pk(a, b, c) {
            return md(a.ampdoc.getHeadNode(), "variant", "amp-experiment", !0).then(function(a) {
                F(a, "To use variable %s, amp-experiment should be configured", c);
                return a.getVariants()
            }).then(function(a) {
                return b(a)
            })
        }

        function Qk(a, b) {
            a = a.ampdoc.getHeadNode();
            return md(a, "geo", "amp-geo", !0).then(function(a) {
                F(a, "To use variable %s, amp-geo should be configured", "AMP_GEO");
                return b(a)
            })
        }

        function Rk(a, b, c) {
            a.xe || (a.xe = jd(a.ampdoc.win));
            return a.xe.then(function(a) {
                F(a, "To use variable %s, amp-share-tracking should be configured", c);
                return b(a)
            })
        }

        function Tk(a, b) {
            this.ampdoc = a;
            this.ia = b
        }
        f = Tk.prototype;
        f.expandStringSync = function(a, b, c) {
            return (new zk(this.ia, b, void 0, !0, c, !0)).expand(a)
        };
        f.expandStringAsync = function(a, b, c) {
            return (new zk(this.ia, b, void 0, void 0, c, !0)).expand(a)
        };
        f.expandUrlSync = function(a, b, c) {
            return Uk(a, (new zk(this.ia, b, void 0, !0, c)).expand(a))
        };
        f.expandUrlAsync = function(a, b, c, d) {
            return (new zk(this.ia, b, void 0, void 0, c, d)).expand(a).then(function(b) {
                return Uk(a, b)
            })
        };
        f.expandInputValueAsync = function(a) {
            return Vk(this, a, !1)
        };
        f.expandInputValueSync = function(a) {
            return Vk(this, a, !0)
        };

        function Vk(a, b, c) {
            "INPUT" == b.tagName && (b.getAttribute("type") || "").toLowerCase();
            var d = Wk(b);
            if (!d) return c ? b.value : Promise.resolve(b.value);
            void 0 === b["amp-original-value"] && (b["amp-original-value"] = b.value);
            a = (new zk(a.ia, void 0, void 0, c, d)).expand(b["amp-original-value"] || b.value);
            return c ? b.value = a : a.then(function(a) {
                return b.value = a
            })
        }

        function Wk(a, b) {
            if (a = a.getAttribute("data-amp-replace")) {
                var c = {};
                a.trim().split(/\s+/).forEach(function(a) {
                    !b || lb.call(b, a) ? c[a] = !0 : C().warn("URL", "Ignoring unsupported replacement", a)
                });
                return c
            }
        }
        f.maybeExpandLink = function(a, b) {
            var c = a.getAttribute("data-amp-addparams") || "",
                d = Wk(a, {
                    CLIENT_ID: !0,
                    QUERY_PARAM: !0,
                    PAGE_VIEW_ID: !0,
                    PAGE_VIEW_ID_64: !0,
                    NAV_TIMING: !0
                });
            if (d || c || b) {
                var e = a["amp-original-href"] || a.getAttribute("href"),
                    g = O(e);
                null == a["amp-original-href"] && (a["amp-original-href"] = e);
                a: {
                    var h = sd(this.ampdoc);
                    if (g.origin == O(h.canonicalUrl).origin || g.origin == O(h.sourceUrl).origin) g = !0;
                    else {
                        if (h = this.ampdoc.getMetaByName("amp-link-variable-allowed-origin")) {
                            h = h.trim().split(/\s+/);
                            for (var l =
                                    0; l < h.length; l++)
                                if (g.origin == O(h[l]).origin) {
                                    g = !0;
                                    break a
                                }
                        }
                        g = !1
                    }
                }
                var k = g;
                c && (k ? (g = c, g = d ? this.expandUrlSync(g, void 0, d) : g) : g = c, c = g, e = Ac(e, t(c)));
                if (!k) return d && C().warn("URL", "Ignoring link replacement %s because the link does not go to the document's source, canonical, or allowlisted origin.", e), a.href = e;
                b && (d && d.QUERY_PARAM || (b = this.expandUrlSync(b, void 0, {
                    QUERY_PARAM: !0
                })), e = Ac(e, t(b)));
                e = d ? this.expandUrlSync(e, void 0, d) : e;
                return a.href = e
            }
        };
        f.collectVars = function(a, b) {
            var c = Object.create(null);
            return (new zk(this.ia, b, c)).expand(a).then(function() {
                return c
            })
        };
        f.collectDisallowedVarsSync = function(a) {
            var b = a.getAttribute("src"),
                c = (new zk(this.ia)).getMacroNames(b),
                d = Wk(a);
            return d ? c.filter(function(a) {
                return !d[a]
            }) : c
        };

        function Uk(a, b) {
            var c = O(b, !0).protocol,
                d = O(a, !0).protocol;
            if (c != d) return C().error("UrlReplacements", "Illegal replacement of the protocol: ", a), a;
            F(Fc(b), "The replacement url has invalid protocol: %s", b);
            return b
        }
        f.getVariableSource = function() {
            return this.ia
        };

        function Xk(a) {
            S(a, "url-replace", function(a) {
                return new Tk(a, new Kk(a))
            })
        };
        var Yk = /^(https?:\/\/)((www[0-9]*|web|ftp|wap|home|mobile|amp|m)\.)+/i;

        function Zk(a) {
            var b = this;
            this.ampdoc = a;
            this.win = a.win;
            this.Db = Pb(this.win);
            this.la = !0;
            this.Jc = !1;
            this.$ = 1;
            this.ge = I();
            this.Dc = I();
            this.dg = new Y;
            this.af = new Y;
            this.Fc = this.bb = null;
            this.cb = [];
            this.Ab = I();
            a.isSingleDoc() && Object.assign(this.Ab, t(this.win.location.hash));
            this.la = !parseInt(a.getParam("off"), 10);
            E().fine("Viewer", "- runtimeOn:", this.la);
            this.Jc = !(!parseInt(a.getParam("history"), 10) && !this.Jc);
            E().fine("Viewer", "- history:", this.Jc);
            E().fine("Viewer", "- visibilityState:", this.ampdoc.getVisibilityState());
            this.$ = parseInt(a.getParam("prerenderSize"), 10) || this.$;
            E().fine("Viewer", "- prerenderSize:", this.$);
            $k(this);
            this.Cb = null;
            this.mh = P(O(this.ampdoc.win.location.href));
            var c = new L;
            this.rh = c.resolve;
            this.Na = al(this, c.promise);
            this.Ie = this.Za = null;
            var d = a.getParam("referrer");
            this.cd = this.isEmbedded() && null != d && !1 !== bl(this) ? d : this.win.document.referrer;
            this.Ih = new Promise(function(c) {
                b.isEmbedded() && null != a.getParam("referrer") ? b.isTrustedViewer().then(function(d) {
                    d ? c(a.getParam("referrer")) : (c(b.win.document.referrer),
                        b.cd != b.win.document.referrer && (E().expectedError("Viewer", "Untrusted viewer referrer override: " + b.cd + " at " + b.Fc), b.cd = b.win.document.referrer))
                }) : c(b.win.document.referrer)
            });
            this.Sc = Ec(this.win.location.href || "");
            this.fi = new Promise(function(c) {
                var d = a.getParam("viewerUrl");
                b.isEmbedded() && d ? b.isTrustedViewer().then(function(a) {
                    a ? b.Sc = d : E().expectedError("Viewer", "Untrusted viewer url override: " + d + " at " + b.Fc);
                    c(b.Sc)
                }) : c(b.Sc)
            });
            if (this.Ab.click) {
                var e = Ec(this.win.location.href);
                e != this.win.location.href &&
                    this.win.history.replaceState && (this.win.location.originalHash || (this.win.location.originalHash = this.win.location.hash), this.win.history.replaceState({}, "", e), delete this.Ab.click, E().fine("Viewer", "replace fragment:" + this.win.location.href))
            }
            this.ampdoc.whenFirstVisible().then(function() {
                b.maybeUpdateFragmentForCct()
            })
        }

        function $k(a) {
            1 !== a.$ && E().expectedError("Viewer", "prerenderSize (" + a.$ + ") is deprecated (#27167)")
        }

        function al(a, b) {
            return a.Db && !a.win.__AMP_TEST_IFRAME && (a.ampdoc.getParam("origin") || a.ampdoc.getParam("visibilityState") || -1 != a.win.location.search.indexOf("amp_js_v")) || a.isWebviewEmbedded() || a.isCctEmbedded() || !a.ampdoc.isSingleDoc() ? V(a.win).timeoutPromise(2E4, b, "initMessagingChannel timeout").catch(function(a) {
                (a = cl(a)) && rb(a.message, "initMessagingChannel timeout") && (a = E().createExpectedError(a));
                zf(a);
                throw a;
            }) : null
        }
        f = Zk.prototype;
        f.getAmpDoc = function() {
            return this.ampdoc
        };
        f.getParam = function(a) {
            return this.ampdoc.getParam(a)
        };
        f.hasCapability = function(a) {
            var b = this.ampdoc.getParam("cap");
            return b ? -1 != b.split(",").indexOf(a) : !1
        };
        f.isEmbedded = function() {
            return !!this.Na
        };
        f.isWebviewEmbedded = function() {
            return !this.Db && "1" == this.ampdoc.getParam("webview")
        };
        f.isCctEmbedded = function() {
            if (null != this.Cb) return this.Cb;
            this.Cb = !1;
            if (!this.Db) {
                var a = t(this.win.location.search);
                this.Cb = "1" === a.amp_gsa && N(a.amp_js_v || "", "a")
            }
            return this.Cb
        };
        f.isProxyOrigin = function() {
            return this.mh
        };
        f.maybeUpdateFragmentForCct = function() {
            if (this.isCctEmbedded() && this.win.history.replaceState) {
                var a = Jc(this.win.location.href),
                    b = sd(this.ampdoc).canonicalUrl,
                    c = Jc(b);
                dl(a, c) && (this.Ab.ampshare = b, this.win.history.replaceState({}, "", "#" + Bc(this.Ab)))
            }
        };

        function dl(a, b) {
            function c(a) {
                return 2 < a.split(".").length ? a.replace(Yk, "$1") : a
            }
            return c(a) == c(b)
        }
        f.isRuntimeOn = function() {
            return this.la
        };
        f.toggleRuntime = function() {
            this.la = !this.la;
            E().fine("Viewer", "Runtime state:", this.la);
            this.dg.fire(this.la)
        };
        f.onRuntimeState = function(a) {
            return this.dg.add(a)
        };
        f.isOvertakeHistory = function() {
            return this.Jc
        };
        f.getVisibilityState = function() {
            return this.ampdoc.getVisibilityState()
        };
        f.isVisible = function() {
            return this.ampdoc.isVisible()
        };
        f.hasBeenVisible = function() {
            return this.ampdoc.hasBeenVisible()
        };
        f.whenFirstVisible = function() {
            return this.ampdoc.whenFirstVisible()
        };
        f.whenNextVisible = function() {
            return this.ampdoc.whenNextVisible()
        };
        f.getFirstVisibleTime = function() {
            return this.ampdoc.getFirstVisibleTime()
        };
        f.getLastVisibleTime = function() {
            return this.ampdoc.getLastVisibleTime()
        };
        f.onVisibilityChanged = function(a) {
            return this.ampdoc.onVisibilityChanged(a)
        };
        f.getPrerenderSize = function() {
            return this.$
        };
        f.getResolvedViewerUrl = function() {
            return this.Sc
        };
        f.getViewerUrl = function() {
            return this.fi
        };
        f.maybeGetMessagingOrigin = function() {
            return this.Fc
        };
        f.getUnconfirmedReferrerUrl = function() {
            return this.cd
        };
        f.getReferrerUrl = function() {
            return this.Ih
        };
        f.isTrustedViewer = function() {
            if (!this.Za) {
                var a = bl(this);
                this.Za = void 0 !== a ? Promise.resolve(a) : this.Na.then(function(a) {
                    return a ? el(a) : !1
                })
            }
            return this.Za
        };

        function bl(a) {
            if (!a.isEmbedded()) return !1;
            if (a.win.location.ancestorOrigins && !a.isWebviewEmbedded() && !a.isCctEmbedded()) return 0 < a.win.location.ancestorOrigins.length && el(a.win.location.ancestorOrigins[0])
        }
        f.getViewerOrigin = function() {
            if (!this.Ie) {
                var a;
                this.isEmbedded() ? this.win.location.ancestorOrigins && 0 < this.win.location.ancestorOrigins.length && (a = this.win.location.ancestorOrigins[0]) : a = "";
                this.Ie = void 0 !== a ? Promise.resolve(a) : V(this.win).timeoutPromise(1E3, this.Na).catch(function() {
                    return ""
                })
            }
            return this.Ie
        };

        function el(a) {
            var b = O(a);
            a = b.protocol;
            return "x-thread:" == a ? !0 : "https:" != a ? !1 : B.trustedViewerHosts.some(function(a) {
                return a.test(b.hostname)
            })
        }
        f.onMessage = function(a, b) {
            var c = this.ge[a];
            c || (c = new Y, this.ge[a] = c);
            return c.add(b)
        };
        f.onMessageRespond = function(a, b) {
            var c = this;
            this.Dc[a] = b;
            return function() {
                c.Dc[a] === b && delete c.Dc[a]
            }
        };
        f.receiveMessage = function(a, b) {
            if ("visibilitychange" == a) {
                void 0 !== b.prerenderSize && (this.$ = b.prerenderSize, E().fine("Viewer", "- prerenderSize change:", this.$), $k(this));
                if (a = b.state) a = E().assertEnumValue(Ve, a, "VisibilityState"), "hidden" === a && (a = null != this.ampdoc.getLastVisibleTime() ? "inactive" : "prerender"), this.ampdoc.overrideVisibilityState(a), E().fine("Viewer", "visibilitychange event:", this.ampdoc.getVisibilityState());
                return x()
            }
            if ("broadcast" == a) return this.af.fire(b), x();
            var c = this.ge[a];
            c &&
                c.fire(b);
            var d = this.Dc[a];
            if (d) return d(b);
            if (c) return x();
            E().fine("Viewer", "unknown message:", a)
        };
        f.setMessageDeliverer = function(a, b) {
            var c = this;
            if (this.bb) throw Error("message channel can only be initialized once");
            if (null == b) throw Error("message channel must have an origin");
            E().fine("Viewer", "message channel established with origin: ", b);
            this.bb = a;
            this.Fc = b;
            this.rh(b);
            0 < this.cb.length && (a = this.cb.slice(0), this.cb = [], a.forEach(function(a) {
                var b = c.bb(a.eventType, a.data, a.awaitResponse);
                a.awaitResponse && a.responseResolver(b)
            }))
        };
        f.sendMessage = function(a, b, c) {
            fl(this, a, b, void 0 === c ? !1 : c, !1)
        };
        f.sendMessageAwaitResponse = function(a, b, c) {
            return fl(this, a, b, void 0 === c ? !1 : c, !0)
        };

        function fl(a, b, c, d, e) {
            if (a.bb) return mb(function() {
                return a.bb(b, c, e)
            });
            if (!a.Na) return e ? Promise.reject(cl()) : x();
            if (!d) return a.Na.then(function() {
                return a.bb(b, c, e)
            });
            var g = jg(a.cb, function(a) {
                return a.eventType == b
            }); - 1 != g ? (d = a.cb.splice(g, 1)[0], d.data = c, d.awaitResponse = d.awaitResponse || e) : (d = new L, d = {
                eventType: b,
                data: c,
                awaitResponse: e,
                responsePromise: d.promise,
                responseResolver: d.resolve
            });
            a.cb.push(d);
            return d.responsePromise
        }
        f.broadcast = function(a) {
            return this.Na ? fl(this, "broadcast", a, !1, !1).then(function() {
                return !0
            }, function() {
                return !1
            }) : Promise.resolve(!1)
        };
        f.onBroadcast = function(a) {
            return this.af.add(a)
        };
        f.whenMessagingReady = function() {
            return this.Na
        };
        f.replaceUrl = function(a) {
            if (a && this.ampdoc.isSingleDoc() && this.win.history.replaceState) try {
                var b = O(this.win.location.href),
                    c = O(Ec(a) + this.win.location.hash);
                b.origin == c.origin && Jc(b) == Jc(c) && (this.win.history.replaceState({}, "", c.href), this.win.location.originalHref = b.href, E().fine("Viewer", "replace url:" + c.href))
            } catch (d) {
                E().error("Viewer", "replaceUrl failed", d)
            }
        };

        function cl(a) {
            if (a instanceof Error) {
                a = fb(a);
                a.message = "No messaging channel: " + a.message;
                var b = a
            } else b = Error("No messaging channel: " + a);
            b.message = b.message.replace("\u200b\u200b\u200b", "");
            return b
        };

        function gl(a, b, c, d) {
            var e = new hl(a, b, c, d);
            return e.solveYValueFromXValue.bind(e)
        }

        function hl(a, b, c, d) {
            this.y0 = this.x0 = 0;
            this.x1 = a;
            this.y1 = b;
            this.x2 = c;
            this.y2 = d;
            this.y3 = this.x3 = 1
        }
        f = hl.prototype;
        f.solveYValueFromXValue = function(a) {
            return this.getPointY(this.solvePositionFromXValue(a))
        };
        f.solvePositionFromXValue = function(a) {
            var b = (a - this.x0) / (this.x3 - this.x0);
            if (0 >= b) return 0;
            if (1 <= b) return 1;
            for (var c = 0, d = 1, e = 0, g = 0; 8 > g; g++) {
                e = this.getPointX(b);
                var h = (this.getPointX(b + 1E-6) - e) / 1E-6;
                if (1E-6 > Math.abs(e - a)) return b;
                if (1E-6 > Math.abs(h)) break;
                else e < a ? c = b : d = b, b -= (e - a) / h
            }
            for (g = 0; 1E-6 < Math.abs(e - a) && 8 > g; g++) e < a ? (c = b, b = (b + d) / 2) : (d = b, b = (b + c) / 2), e = this.getPointX(b);
            return b
        };
        f.getPointX = function(a) {
            if (0 == a) return this.x0;
            if (1 == a) return this.x3;
            var b = this.lerp(this.x0, this.x1, a),
                c = this.lerp(this.x1, this.x2, a),
                d = this.lerp(this.x2, this.x3, a);
            b = this.lerp(b, c, a);
            c = this.lerp(c, d, a);
            return this.lerp(b, c, a)
        };
        f.getPointY = function(a) {
            if (0 == a) return this.y0;
            if (1 == a) return this.y3;
            var b = this.lerp(this.y0, this.y1, a),
                c = this.lerp(this.y1, this.y2, a),
                d = this.lerp(this.y2, this.y3, a);
            b = this.lerp(b, c, a);
            c = this.lerp(c, d, a);
            return this.lerp(b, c, a)
        };
        f.lerp = function(a, b, c) {
            return a + c * (b - a)
        };
        var il = gl(.25, .1, .25, 1),
            jl = gl(.42, 0, 1, 1),
            kl = gl(0, 0, .58, 1),
            ll = gl(.42, 0, .58, 1),
            ml = {
                linear: function(a) {
                    return a
                },
                ease: il,
                "ease-in": jl,
                "ease-out": kl,
                "ease-in-out": ll
            };

        function nl(a) {
            if (!a) return null;
            if ("string" == typeof a) {
                if (-1 != a.indexOf("cubic-bezier")) {
                    var b = a.match(/cubic-bezier\((.+)\)/);
                    if (b && (b = b[1].split(",").map(parseFloat), 4 == b.length)) {
                        for (var c = 0; 4 > c; c++)
                            if (isNaN(b[c])) return null;
                        return gl(b[0], b[1], b[2], b[3])
                    }
                    return null
                }
                return ml[a]
            }
            return a
        };

        function ol() {}

        function pl(a) {
            this.tb = a;
            this.A = wd(self);
            this.lf = null;
            this.X = []
        }

        function ql(a, b, c, d) {
            return (new pl(a)).setCurve(d).add(0, b, 1).start(c)
        }
        pl.prototype.setCurve = function(a) {
            a && (this.lf = nl(a));
            return this
        };
        pl.prototype.add = function(a, b, c, d) {
            this.X.push({
                delay: a,
                func: b,
                duration: c,
                curve: nl(d)
            });
            return this
        };
        pl.prototype.start = function(a) {
            return new rl(this.A, this.tb, this.X, this.lf, a)
        };

        function rl(a, b, c, d, e) {
            this.A = a;
            this.tb = b;
            this.X = [];
            for (a = 0; a < c.length; a++) {
                var g = c[a];
                this.X.push({
                    delay: g.delay,
                    func: g.func,
                    duration: g.duration,
                    curve: g.curve || d,
                    started: !1,
                    completed: !1
                })
            }
            this.Sg = e;
            this.ze = Date.now();
            this.Pa = !0;
            this.G = {};
            c = new L;
            this.Zf = c.promise;
            this.Nh = c.resolve;
            this.Jh = c.reject;
            this.ng = this.A.createAnimTask(this.tb, {
                mutate: this.Wh.bind(this)
            });
            this.A.canAnimate(this.tb) ? this.ng(this.G) : (E().warn("Animation", "cannot animate"), sl(this, !1, 0))
        }
        rl.prototype.then = function(a, b) {
            return a || b ? this.Zf.then(a, b) : this.Zf
        };
        rl.prototype.thenAlways = function(a) {
            a = a || ol;
            return this.then(a, a)
        };
        rl.prototype.halt = function(a) {
            sl(this, !1, a || 0)
        };

        function sl(a, b, c) {
            if (a.Pa) {
                a.Pa = !1;
                if (0 != c) {
                    1 < a.X.length && a.X.sort(function(a, b) {
                        return a.delay + a.duration - (b.delay + b.duration)
                    });
                    try {
                        if (0 < c)
                            for (c = 0; c < a.X.length; c++) a.X[c].func(1, !0);
                        else
                            for (var d = a.X.length - 1; 0 <= d; d--) a.X[d].func(0, !1)
                    } catch (e) {
                        E().error("Animation", "completion failed: " + e, e), b = !1
                    }
                }
                b ? a.Nh() : a.Jh()
            }
        }
        rl.prototype.Wh = function() {
            if (this.Pa) {
                for (var a = Date.now(), b = Math.min((a - this.ze) / this.Sg, 1), c = 0; c < this.X.length; c++) {
                    var d = this.X[c];
                    !d.started && b >= d.delay && (d.started = !0)
                }
                for (c = 0; c < this.X.length; c++)
                    if (d = this.X[c], d.started && !d.completed) a: {
                        var e;
                        if (0 < d.duration) {
                            var g = e = Math.min((b - d.delay) / d.duration, 1);
                            if (d.curve && 1 != g) try {
                                g = d.curve(e)
                            } catch (h) {
                                E().error("Animation", "step curve failed: " + h, h);
                                sl(this, !1, 0);
                                break a
                            }
                        } else g = e = 1;1 == e && (d.completed = !0);
                        try {
                            d.func(g, d.completed)
                        } catch (h) {
                            E().error("Animation",
                                "step mutate failed: " + h, h), sl(this, !1, 0)
                        }
                    }
                1 == b ? sl(this, !0, 0) : this.A.canAnimate(this.tb) ? this.ng(this.G) : (E().warn("Animation", "cancel animation"), sl(this, !1, 0))
            }
        };

        function tl(a) {
            return -1 !== a.tagName.indexOf("LIGHTBOX")
        }

        function ul(a, b, c, d, e) {
            var g = this;
            this.ampdoc = a;
            this.A = b;
            this.Eg = c;
            this.ic = this.P = d;
            this.$b = e && a.isSingleDoc();
            this.Ja = null;
            this.Og = 0;
            this.J = [];
            this.gd = new ri(a.win, function() {
                return g.update()
            });
            this.pc = null;
            this.mc = [];
            this.Xc = []
        }
        f = ul.prototype;
        f.enterLightbox = function(a, b) {
            var c = this,
                d = vl(this);
            d && d.setLightboxMode(!0);
            a && b && b.then(function() {
                wl(c, a, !0);
                xl(c);
                c.update()
            })
        };
        f.leaveLightbox = function() {
            var a = vl(this);
            a && a.setLightboxMode(!1);
            var b = ig(this.J, function(a) {
                return !!a.lightboxed
            });
            yl(this, b);
            this.J.length || zl(this)
        };
        f.setup = function() {
            if (!W(this.ampdoc).isEmbedded()) return !1;
            var a = this.ampdoc.getRootNode(),
                b = a.styleSheets;
            if (!b) return !0;
            this.mc.length = 0;
            for (var c = this.Xc.length = 0; c < b.length; c++) {
                var d = b[c];
                if (!d) return E().error("FixedLayer", "Aborting setup due to null stylesheet."), !0;
                var e = d,
                    g = e.ownerNode;
                e.disabled || !g || "STYLE" != g.tagName || g.hasAttribute("amp-boilerplate") || g.hasAttribute("amp-runtime") || g.hasAttribute("amp-extension") || Al(this, d.cssRules)
            }
            wl(this, a, void 0);
            xl(this);
            this.update();
            0 < this.J.length &&
                this.observeHiddenMutations();
            a = U(this.ampdoc.win);
            0 < this.J.length && !this.$b && a.isIos() && C().warn("FixedLayer", "Please test this page inside of an AMP Viewer such as Google's because the fixed or sticky positioning might have slightly different layout.");
            return !0
        };
        f.observeHiddenMutations = function() {
            Q(this.ampdoc.win, "hidden-mutation-observer") && Bl(this)
        };

        function zl(a) {
            a.gd.cancel();
            var b = a.pc;
            b && (b(), a.pc = null)
        }

        function Bl(a) {
            if (!a.pc) {
                var b = a.ampdoc.getRootNode();
                a.pc = Tc(b.documentElement || b, "hidden-observer").add(function() {
                    a.gd.isPending() || a.gd.schedule(16)
                })
            }
        }
        f.updatePaddingTop = function(a, b) {
            this.P = a;
            b || (this.ic = a);
            this.update()
        };
        f.transformMutate = function(a) {
            a ? this.J.forEach(function(b) {
                b.fixedNow && b.top && (X(b.element, "transition", "none"), b.transform && "none" != b.transform ? X(b.element, "transform", b.transform + " " + a) : X(b.element, "transform", a))
            }) : this.J.forEach(function(a) {
                a.fixedNow && a.top && re(a.element, {
                    transform: "",
                    transition: ""
                })
            })
        };
        f.addElement = function(a, b) {
            if (!Cl(this, a, "*", "fixed", b)) return x();
            xl(this);
            this.observeHiddenMutations();
            return this.update()
        };
        f.removeElement = function(a) {
            a = Dl(this, a);
            yl(this, a)
        };

        function yl(a, b) {
            0 < b.length && a.Ja && a.A.mutate(function() {
                for (var c = 0; c < b.length; c++) {
                    var d = b[c];
                    "fixed" == d.position && a.Ja.returnFrom(d)
                }
            })
        }
        f.isDeclaredFixed = function(a) {
            return !!a.__AMP_DECLFIXED
        };
        f.isDeclaredSticky = function(a) {
            return !!a.__AMP_DECLSTICKY
        };
        f.update = function() {
            var a = this;
            this.J.filter(function(b) {
                return !a.ampdoc.contains(b.element)
            }).forEach(function(b) {
                return Dl(a, b.element)
            });
            if (0 == this.J.length) return x();
            this.gd.cancel();
            var b = !1;
            return this.A.runPromise({
                measure: function(c) {
                    for (var d = a.J, e = [], g = a.ampdoc.win, h = 0; h < d.length; h++) pe(d[h].element, {
                        top: "",
                        bottom: "-9999vh",
                        transition: "none"
                    });
                    for (h = 0; h < d.length; h++) e.push(te(g, d[h].element).top);
                    for (h = 0; h < d.length; h++) X(d[h].element, "bottom", "");
                    for (h = 0; h < d.length; h++) {
                        var l = d[h],
                            k = l,
                            n = k.element,
                            r = k.forceTransfer;
                        k = te(g, n);
                        var u = n.offsetWidth,
                            w = n.offsetHeight,
                            z = n.offsetTop,
                            q = k,
                            p = void 0 === q.position ? "" : q.position,
                            M = void 0 === q.display ? "" : q.display;
                        n = q.bottom;
                        var H = q.zIndex,
                            la = parseFloat(k.opacity);
                        q = k[oe(k, "transform")];
                        k = k.top;
                        var ma = "fixed" === p && (r || 0 < u && 0 < w),
                            D = rb(p, "sticky");
                        if ("none" === M || !ma && !D) c[l.id] = {
                            fixed: !1,
                            sticky: !1,
                            transferrable: !1,
                            top: "",
                            zIndex: ""
                        };
                        else {
                            if ("auto" === k || e[h] !== k) k = ma && z === a.ic + a.Eg ? "0px" : "";
                            var G = !1;
                            ma && (G = !0 === r ? !0 : !1 === r ? !1 : 0 < la && 300 > w && !(!k && !n));
                            G && (b = !0);
                            c[l.id] = {
                                fixed: ma,
                                sticky: D,
                                transferrable: G,
                                top: k,
                                zIndex: H,
                                transform: q
                            }
                        }
                    }
                },
                mutate: function(c) {
                    b && a.$b && vl(a).update();
                    for (var d = a.J, e = 0; e < d.length; e++) {
                        var g = d[e],
                            h = c[g.id];
                        X(g.element, "transition", "none");
                        X(g.element, "transition", "");
                        if (h) {
                            var l = e,
                                k = h,
                                n = g.element,
                                r = g.fixedNow;
                            g.fixedNow = k.fixed;
                            g.stickyNow = k.sticky;
                            g.top = k.fixed || k.sticky ? k.top : "";
                            g.transform = k.transform;
                            !r || k.fixed && k.transferrable || !a.Ja || a.Ja.returnFrom(g);
                            k.top && (k.fixed || k.sticky) && !g.lightboxed && (k.fixed || !a.$b ? X(n,
                                "top", "calc(" + k.top + " + " + a.P + "px)") : a.ic === a.P ? X(n, "top", k.top) : X(n, "top", "calc(" + k.top + " - " + a.ic + "px)"));
                            a.$b && k.fixed && k.transferrable && vl(a).transferTo(g, l, k)
                        }
                    }
                }
            }, {}).catch(function(a) {
                E().error("FixedLayer", "Failed to mutate fixed elements:", a)
            })
        };

        function wl(a, b, c) {
            try {
                for (var d = 0; d < a.mc.length; d++)
                    for (var e = a.mc[d], g = b.querySelectorAll(e), h = 0; h < g.length && !(10 < a.J.length); h++) Cl(a, g[h], e, "fixed", void 0, c);
                for (d = 0; d < a.Xc.length; d++) {
                    var l = a.Xc[d],
                        k = b.querySelectorAll(l);
                    for (e = 0; e < k.length; e++) Cl(a, k[e], l, "sticky", void 0, c)
                }
            } catch (n) {
                E().error("FixedLayer", "Failed to setup fixed elements:", n)
            }
        }

        function Cl(a, b, c, d, e, g) {
            e || b.hasAttribute("style") && (qe(b, "top") || qe(b, "bottom")) && C().error("FixedLayer", "Inline styles with `top`, `bottom` and other CSS rules are not supported yet for fixed or sticky elements (#14186). Unexpected behavior may occur.", b);
            if (tl(b)) return !1;
            var h = Cb(b, tl);
            if (!g && h) return !1;
            g = a.J;
            for (var l = [], k = 0; k < g.length; k++) {
                var n = g[k].element;
                if (n === b) break;
                if (n.contains(b)) return !1;
                b.contains(n) && l.push(n)
            }
            for (k = 0; k < l.length; k++) a.removeElement(l[k]);
            k = null;
            for (n = 0; n < g.length; n++) {
                var r =
                    g[n];
                if (r.element == b && r.position == d) {
                    k = r;
                    break
                }
            }
            n = "fixed" == d;
            k ? k.selectors.includes(c) || k.selectors.push(c) : (a = "F" + a.Og++, b.setAttribute("i-amphtml-fixedid", a), n ? b.__AMP_DECLFIXED = !0 : b.__AMP_DECLSTICKY = !0, k = {
                id: a,
                element: b,
                position: d,
                selectors: [c],
                fixedNow: !1,
                stickyNow: !1,
                lightboxed: !!h
            }, g.push(k));
            k.forceTransfer = n ? e : !1;
            return !0
        }

        function Dl(a, b) {
            for (var c = [], d = 0; d < a.J.length; d++) {
                var e = a.J[d];
                e.element === b && (e.lightboxed || a.A.mutate(function() {
                    X(b, "top", "")
                }), a.J.splice(d, 1), c.push(e))
            }
            a.J.length || zl(a);
            return c
        }

        function xl(a) {
            a.J.sort(function(a, c) {
                var b = a.element,
                    e = c.element;
                return b === e ? 0 : b.compareDocumentPosition(e) & (Node.DOCUMENT_POSITION_PRECEDING | Node.DOCUMENT_POSITION_CONTAINS) ? 1 : -1
            })
        }

        function vl(a) {
            if (!a.$b || a.Ja) return a.Ja;
            a.Ja = new El(a.ampdoc.win.document, a.A);
            return a.Ja
        }

        function Al(a, b) {
            for (var c = 0; c < b.length; c++) {
                var d = b[c];
                if (4 == d.type || 12 == d.type) Al(a, d.cssRules);
                else if (1 == d.type) {
                    var e = d.selectorText;
                    d = d.style.position;
                    "*" !== e && d && ("fixed" === d ? a.mc.push(e) : rb(d, "sticky") && a.Xc.push(e))
                }
            }
        }

        function El(a, b) {
            this.Z = a;
            this.A = b;
            this.Da = a.body.cloneNode(!1);
            this.Da.removeAttribute("style");
            b = this.Da;
            var c = {
                position: "absolute",
                top: 0,
                left: 0,
                height: 0,
                width: 0,
                pointerEvents: "none",
                overflow: "hidden",
                animation: "none",
                background: "none",
                border: "none",
                borderImage: "none",
                boxSizing: "border-box",
                boxShadow: "none",
                float: "none",
                margin: 0,
                opacity: 1,
                outline: "none",
                padding: "none",
                transform: "none",
                transition: "none"
            };
            "display" in c && E().error("STYLE", "`display` style detected in styles. You must use toggle instead.");
            re(b, c);
            this.Da.style.display = "block";
            a.documentElement.appendChild(this.Da)
        }
        f = El.prototype;
        f.getRoot = function() {
            return this.Da
        };
        f.setLightboxMode = function(a) {
            var b = this;
            this.A.mutate(function() {
                var c = b.getRoot();
                a ? c.setAttribute("i-amphtml-lightbox", "") : c.removeAttribute("i-amphtml-lightbox")
            })
        };
        f.update = function() {
            for (var a = this.Z.body, b = this.Da, c = a.attributes, d = b.attributes, e = 0; e < c.length; e++) {
                var g = c[e];
                "style" !== g.name && d.setNamedItem(g.cloneNode(!1))
            }
            for (e = 0; e < d.length; e++) g = d[e].name, "style" === g || "i-amphtml-lightbox" === g || a.hasAttribute(g) || (b.removeAttribute(g), e--)
        };
        f.transferTo = function(a, b, c) {
            var d = a.element;
            if (d.parentElement != this.Da) {
                E().fine("FixedLayer", "transfer to fixed:", a.id, a.element);
                C().warn("FixedLayer", "In order to improve scrolling performance in Safari, we now move the element to a fixed positioning layer:", a.element);
                if (!a.placeholder) {
                    X(d, "pointer-events", "initial");
                    var e = a.placeholder = this.Z.createElement("i-amphtml-fpa");
                    se(e, !1);
                    e.setAttribute("i-amphtml-fixedid", a.id)
                }
                X(d, "zIndex", "calc(" + (1E4 + b) + " + " + (c.zIndex || 0) + ")");
                a.lightboxed &&
                    d.classList.add("i-amphtml-lightbox-element");
                d.parentElement.replaceChild(a.placeholder, d);
                this.Da.appendChild(d);
                a.selectors.some(function(a) {
                    try {
                        var b = Fb(d, a)
                    } catch (l) {
                        E().error("FixedLayer", "Failed to test query match:", l), b = !1
                    }
                    return b
                }) || (C().warn("FixedLayer", "Failed to move the element to the fixed position layer. This is most likely due to the compound CSS selector:", a.element), this.returnFrom(a))
            }
        };
        f.returnFrom = function(a) {
            if (a.placeholder && this.Z.contains(a.placeholder)) {
                var b = a.element,
                    c = a.placeholder;
                E().fine("FixedLayer", "return from fixed:", a.id, b);
                a.lightboxed && b.classList.remove("i-amphtml-lightbox-element");
                this.Z.contains(b) ? (X(a.element, "zIndex", ""), c.parentElement.replaceChild(b, c)) : c.parentElement.removeChild(c)
            }
        };

        function Fl(a, b) {
            for (b = b.lastElementChild; b; b = b.previousElementSibling)
                if (0 < b.getBoundingClientRect().height) {
                    var c = te(a, b);
                    if ("static" == c.position || "relative" == c.position) {
                        var d = c;
                        break
                    }
                } return d ? parseInt(d.marginBottom, 10) : 0
        };

        function Gl(a) {
            var b = this;
            this.win = a;
            this.A = wd(a);
            a = this.win.document;
            var c = a.documentElement,
                d = c.className;
            c.classList.add("i-amphtml-ios-embed");
            var e = a.createElement("html");
            this.Y = e;
            e.id = "i-amphtml-wrapper";
            e.className = d;
            this.Ia = new Y;
            this.Ha = new Y;
            this.sb = this.Uf.bind(this);
            this.rb = function() {
                return b.Ha.fire()
            };
            this.P = 0;
            this.fg = !1;
            vb(a, this.gg.bind(this));
            yj(a).then(function() {
                c.classList.add("i-amphtml-ios-overscroll")
            });
            E().fine("Viewport", "initialized ios-embed-wrapper viewport")
        }
        f = Gl.prototype;
        f.ensureReadyForElements = function() {
            this.gg()
        };
        f.gg = function() {
            if (!this.fg) {
                this.fg = !0;
                var a = this.win.document,
                    b = a.body;
                a.documentElement.appendChild(this.Y);
                this.Y.appendChild(b);
                Object.defineProperty(a, "body", {
                    get: function() {
                        return b
                    }
                });
                this.Uf()
            }
        };
        f.connect = function() {
            this.win.addEventListener("resize", this.rb);
            this.Y.addEventListener("scroll", this.sb)
        };
        f.disconnect = function() {
            this.win.removeEventListener("resize", this.rb);
            this.Y.removeEventListener("scroll", this.sb)
        };
        f.getBorderTop = function() {
            return 1
        };
        f.requiresFixedLayerTransfer = function() {
            return Q(this.win, "ios-fixed-no-transfer") ? 12.2 > parseFloat(U(this.win).getIosVersionString()) : !0
        };
        f.overrideGlobalScrollTo = function() {
            return !0
        };
        f.supportsPositionFixed = function() {
            return !0
        };
        f.onScroll = function(a) {
            this.Ia.add(a)
        };
        f.onResize = function(a) {
            this.Ha.add(a)
        };
        f.updatePaddingTop = function(a) {
            this.P = a;
            pe(this.Y, {
                "padding-top": a + "px"
            })
        };
        f.hideViewerHeader = function(a) {
            a || this.updatePaddingTop(0)
        };
        f.showViewerHeader = function(a, b) {
            a || this.updatePaddingTop(b)
        };
        f.disableScroll = function() {
            this.Y.classList.add("i-amphtml-scroll-disabled")
        };
        f.resetScroll = function() {
            this.Y.classList.remove("i-amphtml-scroll-disabled")
        };
        f.updateLightboxMode = function() {
            return x()
        };
        f.getSize = function() {
            return {
                width: this.win.innerWidth,
                height: this.win.innerHeight
            }
        };
        f.getScrollTop = function() {
            return this.Y.scrollTop
        };
        f.getScrollLeft = function() {
            return 0
        };
        f.getScrollWidth = function() {
            return this.Y.scrollWidth
        };
        f.getScrollHeight = function() {
            return this.Y.scrollHeight
        };
        f.getContentHeight = function() {
            var a = this.win.document.body,
                b = a.getBoundingClientRect().height,
                c = Fl(this.win, a);
            a = te(this.win, a);
            return parseInt(a.marginTop, 10) + this.P + b + c + parseInt(a.marginBottom, 10)
        };
        f.contentHeightChanged = function() {};
        f.getLayoutRect = function(a, b, c, d) {
            a = d || a.getBoundingClientRect();
            var e = void 0 != c ? c : this.getScrollTop(),
                g = void 0 != b ? b : this.getScrollLeft();
            return ec(Math.round(a.left + g), Math.round(a.top + e), Math.round(a.width), Math.round(a.height))
        };
        f.getRootClientRectAsync = function() {
            return Promise.resolve(null)
        };
        f.setScrollTop = function(a) {
            this.Y.scrollTop = a || 1
        };
        f.Uf = function(a) {
            0 == this.Y.scrollTop && (this.Y.scrollTop = 1, a && a.preventDefault());
            a && this.Ia.fire()
        };
        f.getScrollingElement = function() {
            return this.Y
        };
        f.getScrollingElementScrollsLikeViewport = function() {
            return !1
        };

        function Hl(a) {
            var b = this;
            this.ampdoc = a;
            this.win = a.win;
            this.ta = U(this.win);
            this.Ia = new Y;
            this.Ha = new Y;
            this.sb = this.Zg.bind(this);
            this.rb = function() {
                return b.Ha.fire()
            };
            E().fine("Viewport", "initialized natural viewport")
        }
        f = Hl.prototype;
        f.Zg = function() {
            this.Ia.fire()
        };
        f.connect = function() {
            this.win.addEventListener("scroll", this.sb);
            this.win.addEventListener("resize", this.rb)
        };
        f.disconnect = function() {
            this.win.removeEventListener("scroll", this.sb);
            this.win.removeEventListener("resize", this.rb)
        };
        f.ensureReadyForElements = function() {};
        f.getBorderTop = function() {
            return 0
        };
        f.requiresFixedLayerTransfer = function() {
            return !1
        };
        f.overrideGlobalScrollTo = function() {
            return !1
        };
        f.supportsPositionFixed = function() {
            return !0
        };
        f.onScroll = function(a) {
            this.Ia.add(a)
        };
        f.onResize = function(a) {
            this.Ha.add(a)
        };
        f.updatePaddingTop = function(a) {
            pe(this.win.document.documentElement, {
                "padding-top": a + "px"
            })
        };
        f.hideViewerHeader = function(a) {
            a || this.updatePaddingTop(0)
        };
        f.showViewerHeader = function(a, b) {
            a || this.updatePaddingTop(b)
        };
        f.disableScroll = function() {
            this.win.document.documentElement.classList.add("i-amphtml-scroll-disabled")
        };
        f.resetScroll = function() {
            this.win.document.documentElement.classList.remove("i-amphtml-scroll-disabled")
        };
        f.updateLightboxMode = function() {
            return x()
        };
        f.getSize = function() {
            var a = this.win.innerWidth,
                b = this.win.innerHeight;
            if (a && b) return {
                width: a,
                height: b
            };
            var c = this.win.document.documentElement;
            return {
                width: c.clientWidth,
                height: c.clientHeight
            }
        };
        f.getScrollTop = function() {
            var a = this.getScrollingElement().scrollTop || this.win.pageYOffset,
                b = this.ampdoc.getRootNode().host;
            return b ? a - b.offsetTop : a
        };
        f.getScrollLeft = function() {
            return 0
        };
        f.getScrollWidth = function() {
            return this.getScrollingElement().scrollWidth
        };
        f.getScrollHeight = function() {
            return this.getScrollingElement().scrollHeight
        };
        f.getContentHeight = function() {
            var a = this.getScrollingElement(),
                b = a.getBoundingClientRect(),
                c = b.top + this.getScrollTop(),
                d = U(this.win).isSafari() ? Fl(this.win, a) : 0;
            a = te(this.win, a);
            return c + parseInt(a.marginTop, 10) + b.height + d + parseInt(a.marginBottom, 10)
        };
        f.contentHeightChanged = function() {};
        f.getLayoutRect = function(a, b, c, d) {
            a = d || a.getBoundingClientRect();
            c = void 0 != c ? c : this.getScrollTop();
            b = void 0 != b ? b : this.getScrollLeft();
            return ec(Math.round(a.left + b), Math.round(a.top + c), Math.round(a.width), Math.round(a.height))
        };
        f.getRootClientRectAsync = function() {
            return Promise.resolve(null)
        };
        f.setScrollTop = function(a) {
            this.getScrollingElement().scrollTop = a
        };
        f.getScrollingElement = function() {
            var a = this.win.document;
            return a.scrollingElement ? a.scrollingElement : a.body && this.ta.isWebKit() ? a.body : a.documentElement
        };
        f.getScrollingElementScrollsLikeViewport = function() {
            return !0
        };

        function Il(a, b) {
            return function(c) {
                return a + (b - a) * c
            }
        };

        function Jl(a, b, c) {
            var d = this,
                e = a.win;
            this.ampdoc = a;
            this.Kd = this.ampdoc.win.document;
            this.o = b;
            this.h = c;
            this.ya = this.aa = this.Sb = null;
            this.ue = !1;
            this.Uc = null;
            this.P = Number(c.getParam("paddingTop") || 0);
            this.wc = 0;
            this.R = V(e);
            this.A = wd(e);
            this.ve = !1;
            this.we = null;
            this.Rh = 0;
            this.gf = new Y;
            this.Ia = new Y;
            this.Ha = new Y;
            this.ne = this.bc = void 0;
            this.N = null;
            this.createFixedLayer(ul);
            this.h.onMessage("viewport", this.ci.bind(this));
            this.h.onMessage("scroll", this.ei.bind(this));
            this.h.onMessage("disableScroll", this.Rg.bind(this));
            this.h.isEmbedded() && this.o.updatePaddingTop(this.P);
            this.o.onScroll(this.Sh.bind(this));
            this.o.onResize(this.cg.bind(this));
            this.onScroll(this.Th.bind(this));
            this.ja = !1;
            this.ampdoc.onVisibilityChanged(this.sg.bind(this));
            this.sg();
            var g = this.Kd.documentElement;
            a.isSingleDoc() && g.classList.add("i-amphtml-singledoc");
            c.isEmbedded() ? g.classList.add("i-amphtml-embedded") : g.classList.add("i-amphtml-standalone");
            Pb(e) && g.classList.add("i-amphtml-iframed");
            "1" === c.getParam("webview") && g.classList.add("i-amphtml-webview");
            Pb(e) && "scrollRestoration" in e.history && (e.history.scrollRestoration = "manual");
            if (this.o.overrideGlobalScrollTo()) try {
                Object.defineProperty(e, "scrollTo", {
                    value: function(a, b) {
                        return d.setScrollTop(b)
                    }
                }), ["pageYOffset", "scrollY"].forEach(function(a) {
                    Object.defineProperty(e, a, {
                        get: function() {
                            return d.getScrollTop()
                        }
                    })
                })
            } catch (h) {}
        }
        f = Jl.prototype;
        f.dispose = function() {
            this.o.disconnect()
        };
        f.ensureReadyForElements = function() {
            this.o.ensureReadyForElements()
        };
        f.sg = function() {
            var a = this.ampdoc.isVisible();
            a != this.ja && ((this.ja = a) ? (this.o.connect(), this.aa && this.cg(), this.ya && (this.ya = null, this.getScrollTop())) : this.o.disconnect())
        };
        f.getPaddingTop = function() {
            return this.P
        };
        f.getScrollTop = function() {
            null == this.ya && (this.ya = this.o.getScrollTop());
            return this.ya
        };
        f.getScrollLeft = function() {
            null == this.Uc && (this.Uc = this.o.getScrollLeft());
            return this.Uc
        };
        f.setScrollTop = function(a) {
            this.ya = null;
            this.o.setScrollTop(a)
        };
        f.updatePaddingBottom = function(a) {
            this.ampdoc.waitForBodyOpen().then(function(b) {
                X(b, "borderBottom", a + "px solid transparent")
            })
        };
        f.getSize = function() {
            if (this.aa) return this.aa;
            this.aa = this.o.getSize();
            if (0 == this.aa.width || 0 == this.aa.height) {
                var a = this.ampdoc.getVisibilityState();
                ("prerender" == a || "visible" == a) && .01 > Math.random() && E().error("Viewport", "viewport has zero dimensions")
            }
            return this.aa
        };
        f.getHeight = function() {
            return this.getSize().height
        };
        f.getWidth = function() {
            return this.getSize().width
        };
        f.getScrollWidth = function() {
            return this.o.getScrollWidth()
        };
        f.getScrollHeight = function() {
            return this.o.getScrollHeight()
        };
        f.getContentHeight = function() {
            return this.o.getContentHeight()
        };
        f.contentHeightChanged = function() {
            this.o.contentHeightChanged()
        };
        f.getRect = function() {
            if (null == this.Sb) {
                var a = this.getScrollTop(),
                    b = this.getScrollLeft(),
                    c = this.getSize();
                this.Sb = ec(b, a, c.width, c.height)
            }
            return this.Sb
        };
        f.getLayoutRect = function(a, b) {
            var c = this.getScrollLeft(),
                d = this.getScrollTop(),
                e = ed(a, this.ampdoc.win);
            return e ? (a = this.o.getLayoutRect(a, 0, 0, b), c = this.o.getLayoutRect(e, c, d), ec(Math.round(a.left + c.left), Math.round(a.top + c.top), Math.round(a.width), Math.round(a.height))) : this.o.getLayoutRect(a, c, d, b)
        };
        f.getClientRectAsync = function(a) {
            var b = this.A.measurePromise(function() {
                    return a.getBoundingClientRect()
                }),
                c = this.o.getRootClientRectAsync(),
                d = ed(a, this.ampdoc.win);
            d && (c = this.A.measurePromise(function() {
                return d.getBoundingClientRect()
            }));
            return Promise.all([b, c]).then(function(a) {
                var b = a[0];
                return (a = a[1]) ? hc(b, a.left, a.top) : ec(Number(b.left), Number(b.top), Number(b.width), Number(b.height))
            })
        };
        f.supportsPositionFixed = function() {
            return this.o.supportsPositionFixed()
        };
        f.isDeclaredFixed = function(a) {
            return this.N ? this.N.isDeclaredFixed(a) : !1
        };
        f.scrollIntoView = function(a) {
            var b = this;
            return Ml(this, a).then(function(c) {
                return Nl(b, a, c)
            })
        };

        function Nl(a, b, c) {
            var d = a.o.getLayoutRect(b).top;
            mb(function() {
                return Math.max(0, d - a.P)
            }).then(function(b) {
                return Ol(a, c, b)
            })
        }
        f.animateScrollIntoView = function(a, b, c, d) {
            var e = this;
            b = void 0 === b ? "top" : b;
            return Ml(this, a).then(function(g) {
                return e.animateScrollWithinParent(a, g, b, c, d)
            })
        };
        f.animateScrollWithinParent = function(a, b, c, d, e) {
            var g = this,
                h = this.o.getLayoutRect(a),
                l = (b == this.o.getScrollingElement() ? this.getSize() : this.getLayoutRect(b)).height;
            switch (c) {
                case "bottom":
                    var k = -l + h.height;
                    break;
                case "center":
                    k = -l / 2 + h.height / 2;
                    break;
                default:
                    k = 0
            }
            return Pl(this, b).then(function(a) {
                var c = Math.max(0, h.top - g.P + k);
                if (c != a) return Ql(g, b, a, c, d, e)
            })
        };

        function Ql(a, b, c, d, e, g) {
            g = void 0 === g ? "ease-in" : g;
            e = void 0 !== e ? e : Math.floor(Math.min(Math.max(.65 * Math.abs(c - d), 0), 500));
            var h = Il(c, d);
            return ql(b, function(c) {
                Ol(a, b, h(c))
            }, e, g).thenAlways(function() {
                Ol(a, b, d)
            })
        }

        function Ml(a, b) {
            return a.A.measurePromise(function() {
                return Eb(b, ".i-amphtml-scrollable") || a.o.getScrollingElement()
            })
        }

        function Ol(a, b, c) {
            b == a.o.getScrollingElement() ? a.o.setScrollTop(c) : a.A.mutate(function() {
                b.scrollTop = c
            })
        }

        function Pl(a, b) {
            return b == a.o.getScrollingElement() ? mb(function() {
                return a.getScrollTop()
            }) : a.A.measurePromise(function() {
                return b.scrollTop
            })
        }
        f.getScrollingElement = function() {
            return this.we ? this.we : this.we = this.o.getScrollingElement()
        };
        f.onChanged = function(a) {
            return this.gf.add(a)
        };
        f.onScroll = function(a) {
            return this.Ia.add(a)
        };
        f.onResize = function(a) {
            return this.Ha.add(a)
        };
        f.enterLightboxMode = function(a, b) {
            this.h.sendMessage("requestFullOverlay", {}, !0);
            this.enterOverlayMode();
            this.N && this.N.enterLightbox(a, b);
            a && this.maybeEnterFieLightboxMode(a);
            return this.o.updateLightboxMode(!0)
        };
        f.leaveLightboxMode = function(a) {
            this.h.sendMessage("cancelFullOverlay", {}, !0);
            this.N && this.N.leaveLightbox();
            this.leaveOverlayMode();
            a && this.maybeLeaveFieLightboxMode(a);
            return this.o.updateLightboxMode(!1)
        };
        f.isLightboxExperimentOn = function() {
            return Q(this.ampdoc.win, "amp-lightbox-a4a-proto")
        };
        f.maybeEnterFieLightboxMode = function(a) {
            var b = Rl(this, a);
            b && (this.isLightboxExperimentOn(), b.enterFullOverlayMode())
        };
        f.maybeLeaveFieLightboxMode = function(a) {
            (a = Rl(this, a)) && a.leaveFullOverlayMode()
        };

        function Rl(a, b) {
            var c = ed(b, a.ampdoc.win);
            return c && c.__AMP_EMBED__
        }
        f.enterOverlayMode = function() {
            this.disableTouchZoom();
            this.disableScroll()
        };
        f.leaveOverlayMode = function() {
            this.resetScroll();
            this.restoreOriginalTouchZoom()
        };
        f.disableScroll = function() {
            var a = this,
                b = this.ampdoc.win,
                c = b.document.documentElement,
                d;
            this.A.measure(function() {
                var e = te(b, c).marginRight;
                var g = a.ampdoc.win;
                g = g.innerWidth - g.document.documentElement.clientWidth;
                d = parseInt(e, 10) + g
            });
            this.A.mutate(function() {
                X(c, "margin-right", d, "px");
                a.o.disableScroll()
            })
        };
        f.resetScroll = function() {
            var a = this,
                b = this.ampdoc.win.document.documentElement;
            this.A.mutate(function() {
                X(b, "margin-right", "");
                a.o.resetScroll()
            })
        };
        f.resetTouchZoom = function() {
            var a = this,
                b = this.ampdoc.win.innerHeight,
                c = this.Kd.documentElement.clientHeight;
            b && c && b === c || this.disableTouchZoom() && this.R.delay(function() {
                a.restoreOriginalTouchZoom()
            }, 50)
        };
        f.disableTouchZoom = function() {
            var a = Sl(this);
            if (!a) return !1;
            var b = a.content,
                c = {
                    "maximum-scale": "1",
                    "user-scalable": "no"
                };
            var d = Object.create(null);
            if (b)
                for (var e = b.split(/,|;/), g = 0; g < e.length; g++) {
                    var h = e[g].split("="),
                        l = h[0].trim();
                    h = h[1];
                    h = (h || "").trim();
                    l && (d[l] = h)
                }
            e = !1;
            for (var k in c) d[k] !== c[k] && (e = !0, void 0 !== c[k] ? d[k] = c[k] : delete d[k]);
            if (e) {
                b = "";
                for (var n in d) 0 < b.length && (b += ","), b = d[n] ? b + (n + "=" + d[n]) : b + n;
                d = b
            } else d = b;
            return Tl(this, d)
        };
        f.restoreOriginalTouchZoom = function() {
            return void 0 !== this.ne ? Tl(this, this.ne) : !1
        };
        f.updateFixedLayer = function() {
            return this.N ? this.N.update() : x()
        };
        f.addToFixedLayer = function(a, b) {
            return this.N ? this.N.addElement(a, b) : x()
        };
        f.removeFromFixedLayer = function(a) {
            this.N && this.N.removeElement(a)
        };
        f.createFixedLayer = function(a) {
            var b = this;
            this.N = new a(this.ampdoc, this.A, this.o.getBorderTop(), this.P, this.o.requiresFixedLayerTransfer());
            this.ampdoc.whenReady().then(function() {
                return b.N.setup()
            })
        };

        function Tl(a, b) {
            return (a = Sl(a)) && a.content != b ? (E().fine("Viewport", "changed viewport meta to:", b), a.content = b, !0) : !1
        }

        function Sl(a) {
            if (Pb(a.ampdoc.win)) return null;
            void 0 === a.bc && (a.bc = a.Kd.querySelector("meta[name=viewport]"), a.bc && (a.ne = a.bc.content));
            return a.bc
        }
        f.ei = function(a) {
            this.setScrollTop(a.scrollTop)
        };
        f.ci = function(a) {
            var b = this,
                c = a.paddingTop,
                d = a.duration || 0,
                e = a.curve,
                g = a["transient"];
            if (void 0 != c && c != this.P) {
                this.wc = this.P;
                this.P = c;
                var h = Ul(this, d, e, g);
                c < this.wc ? this.o.hideViewerHeader(g, this.wc) : h.then(function() {
                    b.o.showViewerHeader(g, c)
                })
            }
        };
        f.Rg = function(a) {
            a ? this.disableScroll() : this.resetScroll()
        };

        function Ul(a, b, c, d) {
            a.N.updatePaddingTop(a.P, d);
            if (0 >= b) return x();
            var e = Il(a.wc - a.P, 0);
            return ql(a.ampdoc.getRootNode(), function(b) {
                b = e(b);
                a.N.transformMutate("translateY(" + b + "px)")
            }, b, c).thenAlways(function() {
                a.N.transformMutate(null)
            })
        }

        function Vl(a, b, c) {
            var d = a.getSize(),
                e = a.getScrollTop(),
                g = a.getScrollLeft();
            E().fine("Viewport", "changed event:", "relayoutAll=", b, "top=", e, "left=", g, "bottom=", e + d.height, "velocity=", c);
            a.gf.fire({
                relayoutAll: b,
                top: e,
                left: g,
                width: d.width,
                height: d.height,
                velocity: c
            })
        }
        f.Sh = function() {
            var a = this;
            this.Sb = null;
            this.Rh++;
            this.Uc = this.o.getScrollLeft();
            var b = this.o.getScrollTop();
            if (!(0 > b)) {
                this.ya = b;
                if (!this.ve) {
                    this.ve = !0;
                    var c = Date.now();
                    this.R.delay(function() {
                        a.A.measure(function() {
                            a.$c(c, b)
                        })
                    }, 36)
                }
                this.Ia.fire()
            }
        };
        f.$c = function(a, b) {
            var c = this,
                d = this.ya = this.o.getScrollTop(),
                e = Date.now(),
                g = 0;
            e != a && (g = (d - b) / (e - a));
            E().fine("Viewport", "scroll: scrollTop=" + d + "; velocity=" + g);
            .03 > Math.abs(g) ? (Vl(this, !1, g), this.ve = !1) : this.R.delay(function() {
                return c.A.measure(c.$c.bind(c, e, d))
            }, 20)
        };
        f.Th = function() {
            var a = this;
            this.ue || (this.ue = !0, this.A.measure(function() {
                a.ue = !1;
                a.h.sendMessage("scroll", K({
                    scrollTop: a.getScrollTop()
                }), !0)
            }))
        };
        f.cg = function() {
            var a = this;
            this.Sb = null;
            var b = this.aa;
            this.aa = null;
            var c = this.getSize();
            this.updateFixedLayer().then(function() {
                var d = !b || b.width != c.width;
                Vl(a, d, 0);
                (d || b.height != c.height) && a.Ha.fire({
                    relayoutAll: d,
                    width: c.width,
                    height: c.height
                })
            })
        };

        function Wl(a) {
            var b = W(a),
                c = a.win;
            c = a.isSingleDoc() && (U(c).isIos() && Pb(c) && b.isEmbedded() && !b.hasCapability("iframeScroll") ? Xl : Yl) == Xl ? new Gl(c) : new Hl(a);
            return new Jl(a, c, b)
        }
        var Yl = "natural",
            Xl = "natural-ios-embed";
        var Zl = ["<div class=i-amphtml-jank-meter></div>"];

        function $l(a) {
            this.w = a;
            this.Bc = this.Ac = this.Zb = this.fc = 0;
            this.Tb = null;
            this.wa = ad(a);
            this.Ib = this.Qe = this.Re = null;
            am(this)
        }
        $l.prototype.onScheduled = function() {
            bm(this) && null == this.Tb && (this.Tb = this.w.Date.now())
        };
        $l.prototype.onRun = function() {
            if (bm(this) && null != this.Tb) {
                var a = this.w.Date.now() - this.Tb;
                this.Tb = null;
                this.Zb++;
                16 < a && (this.fc++, E().info("JANK", "Paint latency: " + a + "ms"));
                if (this.wa && 200 == this.Zb) {
                    var b = this.w.Math.floor((this.Zb - this.fc) / this.Zb * 100);
                    this.wa.tickDelta("gfp", b);
                    this.wa.tickDelta("bf", this.fc);
                    this.Ib && (this.wa.tickDelta("lts", this.Bc), this.wa.tickDelta("ltc", this.Ac), this.Ib.disconnect(), this.Ib = null);
                    var c = 0;
                    this.Re && null != this.Qe && (c = this.w.Math.max(0, this.w.Math.floor(100 * this.Re.level -
                        this.Qe)), this.wa.tickDelta("bd", c));
                    this.wa.flush();
                    if (Q(this.w, "jank-meter")) {
                        var d = c,
                            e = this.w.document,
                            g = ke(e)(Zl);
                        g.textContent = "bf:" + this.fc + ", lts: " + this.Bc + ", ltc:" + (this.Ac + ", bd:" + d);
                        e.body.appendChild(g)
                    }
                }
            }
        };

        function bm(a) {
            return Q(a.w, "jank-meter") || a.wa && a.wa.isPerformanceTrackingOn() && 200 > a.Zb
        }

        function am(a) {
            bm(a) && cm(a.w) && (a.Ib = new a.w.PerformanceObserver(function(b) {
                for (var c = b.getEntries(), d = 0; d < c.length; d++)
                    if ("longtask" == c[d].entryType) {
                        var e = a.w.Math.floor(c[d].duration / 50);
                        "cross-origin-descendant" == c[d].name ? (a.Ac += e, C().info("LONGTASK", "from child frame " + c[d].duration + "ms")) : (a.Bc += e, E().info("LONGTASK", "from self frame " + c[d].duration + "ms"))
                    }
            }), a.Ib.observe({
                entryTypes: ["longtask"]
            }))
        }

        function cm(a) {
            return !!a.PerformanceObserver && !!a.TaskAttributionTiming && "containerName" in a.TaskAttributionTiming.prototype
        };

        function dm(a) {
            var b = oe(a, "visibilityState", !0);
            if (a[b]) return a[b];
            var c = oe(a, "hidden", !0);
            return a[c] ? a[c] ? "hidden" : "visible" : "visible"
        }

        function em(a, b) {
            if (a.addEventListener) {
                var c = fm(a);
                c && a.addEventListener(c, b)
            }
        }

        function gm(a, b) {
            if (a.removeEventListener) {
                var c = fm(a);
                c && a.removeEventListener(c, b)
            }
        }

        function fm(a) {
            a = oe(a, "hidden", !0);
            var b = a.indexOf("Hidden");
            return -1 != b ? a.substring(0, b) + "Visibilitychange" : "visibilitychange"
        };

        function hm(a) {
            this.win = a;
            this.Ba = rd(this.win);
            this.Hh = im(this);
            this.L = [];
            this.ke = [];
            this.Ae = [];
            this.je = [];
            this.ua = !1;
            this.ie = this.Gc = null;
            this.wd = this.Qh.bind(this);
            this.fh = new ri(this.win, this.wd, 16);
            this.Pe = new ri(this.win, this.wd, 40);
            this.vd = this.Ch.bind(this);
            if (this.Ba.isSingleDoc()) this.Ba.getSingleDoc().onVisibilityChanged(this.vd);
            else em(this.win.document, this.vd);
            this.Hf = new $l(this.win)
        }
        f = hm.prototype;
        f.dispose = function() {
            gm(this.win.document, this.vd)
        };
        f.Ch = function() {
            this.ua && jm(this)
        };
        f.run = function(a, b) {
            this.L.push(a);
            this.Ae.push(b || void 0);
            this.xa()
        };
        f.runPromise = function(a, b) {
            this.run(a, b);
            if (this.Gc) return this.Gc;
            a = new L;
            this.ie = a.resolve;
            return this.Gc = a.promise
        };
        f.createTask = function(a) {
            var b = this;
            return function(c) {
                b.run(a, c)
            }
        };
        f.mutate = function(a) {
            this.run({
                measure: void 0,
                mutate: a
            })
        };
        f.mutatePromise = function(a) {
            return this.runPromise({
                measure: void 0,
                mutate: a
            })
        };
        f.measure = function(a) {
            this.run({
                measure: a,
                mutate: void 0
            })
        };
        f.measurePromise = function(a) {
            var b = this;
            return new Promise(function(c) {
                b.measure(function() {
                    c(a())
                })
            })
        };
        f.canAnimate = function(a) {
            return km(this, a)
        };

        function km(a, b) {
            return "visible" != dm(a.win.document) ? !1 : a.Ba.isSingleDoc() ? a.Ba.getSingleDoc().isVisible() : b ? (a = a.Ba.getAmpDocIfAvailable(b), !a || a.isVisible()) : !0
        }
        f.runAnim = function(a, b, c) {
            if (!km(this, a)) return E().warn("VSYNC", "Did not schedule a vsync request, because document was invisible"), !1;
            this.run(b, c);
            return !0
        };
        f.createAnimTask = function(a, b) {
            var c = this;
            return function(d) {
                return c.runAnim(a, b, d)
            }
        };
        f.runAnimMutateSeries = function(a, b, c) {
            var d = this;
            return km(this, a) ? new Promise(function(e, g) {
                var h = Date.now(),
                    l = 0,
                    k = d.createAnimTask(a, {
                        mutate: function(a) {
                            var d = Date.now() - h;
                            b(d, d - l, a) ? c && d > c ? g(Error("timeout")) : (l = d, k(a)) : e()
                        }
                    });
                k({})
            }) : Promise.reject(Error("CANCELLED"))
        };
        f.xa = function() {
            this.ua || (this.ua = !0, this.Hf.onScheduled(), jm(this))
        };

        function jm(a) {
            km(a) ? (a.Hh(a.wd), a.Pe.schedule()) : a.fh.schedule()
        }
        f.Qh = function() {
            this.Pe.cancel();
            this.ua = !1;
            this.Hf.onRun();
            var a = this.L,
                b = this.Ae,
                c = this.ie;
            this.Gc = this.ie = null;
            this.L = this.ke;
            this.Ae = this.je;
            for (var d = 0; d < a.length; d++) a[d].measure && !lm(a[d].measure, b[d]) && (a[d].mutate = void 0);
            for (d = 0; d < a.length; d++) a[d].mutate && lm(a[d].mutate, b[d]);
            this.ke = a;
            this.je = b;
            this.ke.length = 0;
            this.je.length = 0;
            c && c()
        };

        function im(a) {
            var b = a.win.requestAnimationFrame || a.win.webkitRequestAnimationFrame;
            if (b) return b.bind(a.win);
            var c = 0;
            return function(b) {
                var d = Date.now(),
                    g = Math.max(0, 16 - (d - c));
                c = d + g;
                a.win.setTimeout(b, g)
            }
        }

        function lm(a, b) {
            try {
                void 0 !== a(b) && E().error("VSYNC", "callback returned a value but vsync cannot propogate it: %s", a.toString())
            } catch (c) {
                return hb(c), !1
            }
            return !0
        };

        function mm(a) {
            R(a, "crypto", gh);
            R(a, "batched-xhr", xg);
            R(a, "platform", sj);
            R(a, "templates", Se);
            R(a, "timer", pk);
            R(a, "timer", pk);
            R(a, "vsync", hm);
            R(a, "xhr", vg);
            R(a, "input", Yi);
            R(a, "preconnect", Cj)
        }

        function nm(a) {
            var b = !!a.getParent();
            S(a, "url", qk, !0);
            b ? id(a, "documentInfo") : S(a, "documentInfo", jh);
            b ? id(a, "cid") : S(a, "cid", Ng);
            b ? id(a, "viewer") : S(a, "viewer", Zk, !0);
            b ? id(a, "viewport") : S(a, "viewport", Wl, !0);
            S(a, "hidden-observer", Nh);
            b ? id(a, "history") : S(a, "history", di);
            b ? id(a, "resources") : S(a, "resources", Lj);
            b ? id(a, "owners") : S(a, "owners", ij);
            b ? id(a, "mutator") : S(a, "mutator", cj);
            b ? id(a, "url-replace") : Xk(a);
            S(a, "action", Nf, !0);
            S(a, "standard-actions", dk, !0);
            b ? id(a, "storage") : ok(a);
            S(a, "navigation", zh, !0);
            Kh(a)
        };
        var om = ["amp-ad", "amp-embed", "amp-video"],
            pm = ["amp-mustache"];

        function qm(a) {
            this.win = a;
            this.Ba = rd(a);
            this.Hd = {};
            this.Wa = null
        }
        f = qm.prototype;
        f.registerExtension = function(a, b, c) {
            var d = rm(this, a, !0);
            try {
                this.Wa = a, b(c, c._), d.loaded = !0, d.resolve && d.resolve(d.extension)
            } catch (e) {
                throw d.error = e, d.reject && d.reject(e), e;
            } finally {
                this.Wa = null
            }
        };
        f.waitForExtension = function(a, b, c) {
            return V(a).timeoutPromise(c || 16E3, sm(rm(this, b, !1)), "Render timeout waiting for extension " + b + " to be load.")
        };
        f.preloadExtension = function(a, b) {
            "amp-embed" == a && (a = "amp-ad");
            var c = rm(this, a, !1);
            if (c.loaded || c.error) var d = !1;
            else void 0 === c.scriptPresent && (d = tm(this, a), c.scriptPresent = 0 < d.length), d = !c.scriptPresent;
            if (d) {
                d = b;
                b = this.win.document.createElement("script");
                b.async = !0;
                N(a, "_") ? d = "" : b.setAttribute(0 <= pm.indexOf(a) ? "custom-template" : "custom-element", a);
                b.setAttribute("data-script", a);
                b.setAttribute("i-amphtml-inserted", "");
                var e = this.win.document.head.querySelector("script[nonce]");
                e && b.setAttribute("nonce",
                    e.getAttribute("nonce"));
                b.setAttribute("crossorigin", "anonymous");
                e = v().esm ? ".mjs" : ".js";
                var g = B.cdn;
                var h = v().rtvVersion;
                null == d && (d = "0.1");
                b.src = g + "/rtv/" + h + "/v0/" + a + (d ? "-" + d : "") + e;
                this.win.document.head.appendChild(b);
                c.scriptPresent = !0
            }
            return sm(c)
        };
        f.installExtensionForDoc = function(a, b, c) {
            var d = this,
                e = a.getRootNode(),
                g = e.__AMP_EXT_LDR;
            g || (g = e.__AMP_EXT_LDR = I());
            if (g[b]) return g[b];
            Qi(a.win, b);
            return g[b] = this.preloadExtension(b, c).then(function() {
                return d.installExtensionInDoc(a, b)
            })
        };
        f.reloadExtension = function(a) {
            var b = tm(this, a, !1),
                c = this.Hd[a];
            c && (c.scriptPresent = !1);
            b.forEach(function(b) {
                return b.setAttribute("i-amphtml-loaded-new-version", a)
            });
            c = mf(b[0].src);
            return this.preloadExtension(a, c.extensionVersion)
        };

        function tm(a, b, c) {
            c = void 0 === c ? !0 : c;
            a = a.win.document.head.querySelectorAll('script[src*="/' + b + '-"]:not([i-amphtml-loaded-new-version])' + (c ? "" : ":not([i-amphtml-inserted])"));
            for (var d = [], e = 0; e < a.length; e++) {
                var g = a[e];
                mf(g.src).extensionId === b && d.push(g)
            }
            return d
        }
        f.loadElementClass = function(a) {
            return this.preloadExtension(a).then(function(b) {
                return b.elements[a].implementationClass
            })
        };
        f.addElement = function(a, b, c) {
            um(this, a).extension.elements[a] = {
                implementationClass: b,
                css: c
            };
            this.addDocFactory(function(d) {
                vm(d, a, b, c)
            })
        };

        function vm(a, b, c, d) {
            d ? af(a, d, function() {
                wm(a.win, b, c)
            }, !1, b) : wm(a.win, b, c)
        }

        function wm(a, b, c) {
            var d = Ni(a);
            if (!d[b]) Ri(a, b, c);
            else if (d[b] != c)
                for (F(d[b] == gi, "%s is already registered. The script tag for %s is likely included twice in the page.", b, b), d[b] = c, d = 0; d < fi.length; d++) {
                    var e = fi[d].element;
                    e.tagName.toLowerCase() == b && e.ownerDocument.defaultView == a && (Oi(e, c), fi.splice(d--, 1))
                }
            R(a, b, xm)
        }
        f.addService = function(a, b) {
            um(this).extension.services.push({
                serviceName: a,
                serviceClass: b
            });
            this.addDocFactory(function(c) {
                S(c, a, b, !0)
            })
        };
        f.addDocFactory = function(a, b) {
            var c = um(this, b);
            c.docFactories.push(a);
            if (this.Wa && this.Ba.isSingleDoc()) {
                var d = this.Ba.getAmpDoc(this.win.document);
                (d.declaresExtension(this.Wa) || c.auto) && a(d)
            }
        };
        f.installExtensionsInDoc = function(a, b) {
            var c = this,
                d = [];
            b.forEach(function(b) {
                d.push(c.installExtensionInDoc(a, b))
            });
            return Promise.all(d)
        };
        f.installExtensionInDoc = function(a, b) {
            var c = rm(this, b, !1);
            return sm(c).then(function() {
                a.declareExtension(b);
                c.docFactories.forEach(function(c) {
                    try {
                        c(a)
                    } catch (e) {
                        hb("Doc factory failed: ", e, b)
                    }
                })
            })
        };

        function rm(a, b, c) {
            var d = a.Hd[b];
            d || (d = {
                extension: {
                    elements: {},
                    services: []
                },
                auto: c,
                docFactories: [],
                promise: void 0,
                resolve: void 0,
                reject: void 0,
                loaded: void 0,
                error: void 0,
                scriptPresent: void 0
            }, a.Hd[b] = d);
            return d
        }

        function um(a, b) {
            a.Wa || E().error("extensions", "unknown extension for ", b);
            return rm(a, a.Wa || "_UNKNOWN_", !0)
        }

        function sm(a) {
            if (!a.promise)
                if (a.loaded) a.promise = Promise.resolve(a.extension);
                else if (a.error) a.promise = Promise.reject(a.error);
            else {
                var b = new L;
                a.promise = b.promise;
                a.resolve = b.resolve;
                a.reject = b.reject
            }
            return a.promise
        }

        function ym(a) {
            om.forEach(function(b) {
                Qi(a, b)
            })
        }

        function xm() {
            return {}
        };
        (function() {
            jb = Za;
            E();
            C()
        })();
        (function(a) {
            self.__AMP_REPORT_ERROR = a
        })(function(a, b, c) {
            zf(b, c);
            b && a && Ua(b.message) && !(0 <= b.message.indexOf("\u200b\u200b\u200b\u200b")) && rd(a).isSingleDoc() && (b = K({
                errorName: b.name,
                errorMessage: b.message
            }), a = rd(a).getSingleDoc().getRootNode(), uf(a.documentElement || a.body || a, b))
        }.bind(null, self));

        function zm(a) {
            function b(a) {
                function b() {
                    g.then(function() {
                        "function" == typeof a ? a(c.AMP, c.AMP._) : e.registerExtension(a.n, a.f, c.AMP)
                    })
                }
                "function" != typeof a && a.i ? Am(e, a).then(function() {
                    return Bm(c, a, b)
                }) : Bm(c, a, b)
            }
            var c = self;
            if (c.__AMP_TAG) x();
            else {
                c.__AMP_TAG = !0;
                var d = c.AMP || [];
                R(c, "extensions", qm);
                var e = td(c);
                mm(c);
                ym(c);
                c.AMP = {
                    win: c,
                    _: c.AMP ? c.AMP._ : void 0
                };
                c.AMP.config = Sa;
                c.AMP.BaseElement = Pe;
                c.AMP.BaseTemplate = Re;
                c.AMP.registerElement = e.addElement.bind(e);
                c.AMP.registerTemplate = function(a, b) {
                    var d =
                        T(c, "templates");
                    if (d.Yb[a]) {
                        var e = d.Be[a];
                        F(e, "Duplicate template type: %s", a);
                        delete d.Be[a];
                        e(b)
                    } else d.Yb[a] = Promise.resolve(b)
                };
                c.AMP.registerServiceForDoc = e.addService.bind(e);
                c.AMP.isExperimentOn = Q.bind(null, c);
                c.AMP.toggleExperiment = Nc.bind(null, c);
                c.AMP.setLogLevel = Wa.bind(null);
                c.AMP.setTickFunction = function() {};
                var g = a(c, e);
                for (a = 0; a < d.length; a++) {
                    var h = d[a];
                    if (Cm(c, h)) d.splice(a--, 1);
                    else if ("function" == typeof h || "high" == h.p) {
                        try {
                            b(h)
                        } catch (l) {
                            E().error("runtime", "Extension failed: ",
                                l, h.n)
                        }
                        d.splice(a--, 1)
                    }
                }
                Dm(c, function() {
                    c.AMP.push = function(a) {
                        Cm(c, a) || b(a)
                    };
                    for (var a = 0; a < d.length; a++) {
                        var e = d[a];
                        if (!Cm(c, e)) try {
                            b(e)
                        } catch (n) {
                            E().error("runtime", "Extension failed: ", n, e.n)
                        }
                    }
                    d.length = 0
                });
                c.AMP.push || (c.AMP.push = d.push.bind(d));
                U(c).isIos() && X(c.document.documentElement, "cursor", "pointer");
                c.IntersectionObserver && c.IntersectionObserver !== yd && c.IntersectionObserverEntry || td(c).preloadExtension("amp-intersection-observer-polyfill")
            }
        }

        function Am(a, b) {
            if (Array.isArray(b.i)) return b = b.i.map(function(b) {
                return a.preloadExtension(b)
            }), Promise.all(b);
            if ("string" == typeof b.i) return a.preloadExtension(b.i);
            E().error("RUNTIME", "dependency is neither an array or a string", b.i);
            return x()
        }

        function Bm(a, b, c) {
            "function" == typeof b || "high" == b.p ? x().then(c) : (c.displayName = b.n, zi(a.document, c))
        }

        function Em() {
            zm(function(a) {
                Fm(a);
                Gm(a);
                return wb(a.document).then(function() {
                    Pi(a.AMP.ampdoc)
                })
            })
        }

        function Fm(a) {
            var b = a.document.documentElement,
                c = rd(a).getSingleDoc();
            a.AMP.ampdoc = c;
            c = W(b);
            a.AMP.viewer = c;
            v().development && (a.AMP.toggleRuntime = c.toggleRuntime.bind(c), a.AMP.resources = vd(b));
            b = xd(b);
            a.AMP.viewport = {};
            a.AMP.viewport.getScrollLeft = b.getScrollLeft.bind(b);
            a.AMP.viewport.getScrollWidth = b.getScrollWidth.bind(b);
            a.AMP.viewport.getWidth = b.getWidth.bind(b)
        }

        function Gm(a) {
            a.AMP.installAmpdocServices = nm.bind(null);
            a.AMP.combinedCss = nf + of
        }

        function Cm(a, b) {
            if (!Q(a, "version-locking") || "function" == typeof b || "2006112352003" == b.v) return !1;
            td(a).reloadExtension(b.n);
            return !0
        }

        function Dm(a, b) {
            Q(a, "pump-early-frame") ? a.document.body ? 0 < $e(a).length ? b() : V(a).delay(b, 1) : b() : b()
        };

        function Hm() {
            var a = self;
            wj(a.document, function() {
                return Im(a)
            })
        }

        function Im(a) {
            var b = 1500,
                c = a.performance;
            c && c.timing && c.timing.navigationStart && (b = Date.now() - c.timing.navigationStart);
            var d = Math.max(1, 2100 - b);
            a.setTimeout(function() {
                Jm(a);
                var b = a.document.styleSheets;
                if (b) {
                    for (var c = a.document.querySelectorAll('link[rel~="stylesheet"]:not([href^="' + String(B.cdn).replace(nb, ob) + '"])'), h = [], l = 0; l < c.length; l++) {
                        for (var k = c[l], n = !1, r = 0; r < b.length; r++)
                            if (b[r].ownerNode == k) {
                                n = !0;
                                break
                            } n || h.push(k)
                    }
                    l = {};
                    for (k = 0; k < h.length; l = {
                            qa: l.qa,
                            kd: l.kd
                        }, k++) l.qa = h[k], l.kd = l.qa.media ||
                        "all", l.qa.media = "print", l.qa.onload = function(b) {
                            return function() {
                                b.qa.media = b.kd;
                                Jm(a)
                            }
                        }(l), l.qa.setAttribute("i-amphtml-timeout", d), l.qa.parentNode.insertBefore(l.qa, l.qa.nextSibling)
                }
            }, d)
        }

        function Jm(a) {
            a = a.document;
            if (a.fonts && a.fonts.values)
                for (var b = a.fonts.values(); a = b.next();) {
                    var c = a.value;
                    if (!c) break;
                    "loading" == c.status && "display" in c && "auto" == c.display && (c.display = "swap")
                }
        };

        function Km(a) {
            return a.waitForBodyOpen().then(function() {
                var b = a.getBody(),
                    c = ub(b, function() {
                        return !!b.firstElementChild
                    });
                return V(a.win).timeoutPromise(2E3, c).then(function() {
                    return "AMP-STORY" === b.firstElementChild.tagName
                }, function() {
                    return !1
                })
            })
        };

        function Lm(a) {
            var b = a.win;
            rf(["\u26a1", "amp"], b.document) && a.isSingleDoc() && Ai(a, function() {
                Km(a).then(function(c) {
                    c || td(b).installExtensionForDoc(a, "amp-auto-lightbox")
                })
            })
        };

        function Mm(a) {
            this.win = a;
            this.Ub = null;
            var b = I();
            a.name && 0 == a.name.indexOf("__AMP__") && Object.assign(b, t(a.name.substring(7)));
            a.location && a.location.hash && Object.assign(b, t(a.location.hash));
            this.Ub = new Nm(a, {
                params: b
            });
            a.document.__AMPDOC = this.Ub;
            this.Ag = Sc(a);
            this.Of = !1
        }
        f = Mm.prototype;
        f.isSingleDoc = function() {
            return !!this.Ub
        };
        f.getSingleDoc = function() {
            return this.Ub
        };
        f.getAmpDocIfAvailable = function(a) {
            if (this.Ag) {
                for (var b = a; b;) {
                    var c = a.everAttached && "function" === typeof a.getAmpDoc ? a.getAmpDoc() : null;
                    if (c) return c;
                    b = Ab(b);
                    if (!b) break;
                    var d = b.__AMPDOC;
                    if (d) return d;
                    b = b.host ? b.host : ed(b, this.win)
                }
                return null
            }
            for (b = a; b;) {
                if (d = a.everAttached && "function" === typeof a.getAmpDoc ? a.getAmpDoc() : null) return d;
                if (d = ed(b, this.win)) b = d;
                else {
                    if (!this.Of) break;
                    b = 9 == b.nodeType ? b : lf(b);
                    if (!b) break;
                    if (d = b.__AMPDOC) return d;
                    b = b.host
                }
            }
            return this.Ub
        };
        f.getAmpDoc = function(a) {
            var b = this.getAmpDocIfAvailable(a);
            if (!b) throw E().createError("No ampdoc found for", a);
            return b
        };
        f.installShadowDoc = function(a, b, c) {
            this.Of = !0;
            a = new Om(this.win, a, b, c);
            return b.__AMPDOC = a
        };
        f.installFieDoc = function(a, b, c) {
            var d = b.document;
            a = new Pm(b, a, this.getAmpDoc(b.frameElement), c);
            return d.__AMPDOC = a
        };

        function Qm(a, b, c) {
            var d = this;
            this.win = a;
            this.$f = I();
            this.Kc = b;
            this.K = c && c.signals || new oi;
            this.pe = c && c.params || I();
            this.sa = null;
            this.mf = [];
            this.Je = c && c.visibilityState || this.pe.visibilityState && E().assertEnumValue(Ve, this.pe.visibilityState, "VisibilityState") || null;
            this.hd = null;
            this.yg = new Y;
            this.Lf = null;
            this.Fe = [];
            var e = this.Ge.bind(this);
            this.Kc && this.Fe.push(this.Kc.onVisibilityChanged(e));
            em(this.win.document, e);
            this.Fe.push(function() {
                return gm(d.win.document, e)
            });
            this.Ge()
        }
        f = Qm.prototype;
        f.dispose = function() {
            this.Fe.forEach(function(a) {
                return a()
            })
        };
        f.isSingleDoc = function() {
            return null
        };
        f.getParent = function() {
            return this.Kc
        };
        f.getWin = function() {
            return this.win
        };
        f.signals = function() {
            return this.K
        };
        f.getParam = function(a) {
            a = this.pe[a];
            return null == a ? null : a
        };
        f.getMeta = function() {
            var a = this;
            if (this.sa) return I(this.sa);
            this.sa = I();
            var b = this.win.document.head.querySelectorAll("meta[name]");
            Mb(b, function(b) {
                var c = b.getAttribute("name");
                b = b.getAttribute("content");
                c && null !== b && void 0 === a.sa[c] && (a.sa[c] = b)
            });
            return I(this.sa)
        };
        f.getMetaByName = function(a) {
            if (!a) return null;
            a = this.getMeta()[a];
            return void 0 !== a ? a : null
        };
        f.setMetaByName = function() {};
        f.declaresExtension = function(a) {
            return -1 != this.mf.indexOf(a)
        };
        f.declareExtension = function(a) {
            this.declaresExtension(a) || this.mf.push(a)
        };
        f.getRootNode = function() {
            return null
        };
        f.getHeadNode = function() {};
        f.isBodyAvailable = function() {
            return !1
        };
        f.getBody = function() {
            return null
        };
        f.waitForBodyOpen = function() {
            return null
        };
        f.isReady = function() {
            return null
        };
        f.whenReady = function() {
            return null
        };
        f.getUrl = function() {
            return null
        };
        f.getElementById = function(a) {
            return this.getRootNode().getElementById(a)
        };
        f.contains = function(a) {
            return this.getRootNode().contains(a)
        };
        f.overrideVisibilityState = function(a) {
            this.Je != a && (this.Je = a, this.Ge())
        };
        f.Ge = function() {
            for (var a = dm(this.win.document), b = "visible", c = this.Kc; c; c = c.getParent())
                if ("visible" != c.getVisibilityState()) {
                    b = c.getVisibilityState();
                    break
                } var d = this.Je || "visible";
            c = "visible" == d && "visible" == b && "visible" == a ? "visible" : "hidden" == a && "paused" == d ? a : "paused" == d || "inactive" == d ? d : "paused" == b || "inactive" == b ? b : "prerender" == d || "prerender" == a || "prerender" == b ? "prerender" : "hidden";
            this.hd != c && (this.hd = c, "visible" == c ? (this.Lf = Date.now(), this.K.signal("-ampdoc-first-visible"), this.K.signal("-ampdoc-next-visible")) :
                this.K.reset("-ampdoc-next-visible"), this.yg.fire())
        };
        f.whenFirstVisible = function() {
            return this.K.whenSignal("-ampdoc-first-visible").then(function() {})
        };
        f.whenNextVisible = function() {
            return this.K.whenSignal("-ampdoc-next-visible").then(function() {})
        };
        f.getFirstVisibleTime = function() {
            return this.K.get("-ampdoc-first-visible")
        };
        f.getLastVisibleTime = function() {
            return this.Lf
        };
        f.getVisibilityState = function() {
            return this.hd
        };
        f.isVisible = function() {
            return "visible" == this.hd
        };
        f.hasBeenVisible = function() {
            return null != this.getLastVisibleTime()
        };
        f.onVisibilityChanged = function(a) {
            return this.yg.add(a)
        };
        f.registerSingleton = function(a) {
            return this.$f[a] ? !1 : this.$f[a] = !0
        };

        function Nm(a, b) {
            Qm.call(this, a, null, b);
            var c = this;
            this.pb = this.win.document.body ? Promise.resolve(this.win.document.body) : wb(this.win.document).then(function() {
                return c.getBody()
            });
            this.Pb = yj(this.win.document)
        }
        m(Nm, Qm);
        f = Nm.prototype;
        f.isSingleDoc = function() {
            return !0
        };
        f.getRootNode = function() {
            return this.win.document
        };
        f.getUrl = function() {
            return this.win.location.href
        };
        f.getHeadNode = function() {
            return this.win.document.head
        };
        f.isBodyAvailable = function() {
            return !!this.win.document.body
        };
        f.getBody = function() {
            return this.win.document.body
        };
        f.waitForBodyOpen = function() {
            return this.pb
        };
        f.isReady = function() {
            return uj(this.win.document)
        };
        f.whenReady = function() {
            return this.Pb
        };

        function Om(a, b, c, d) {
            Qm.call(this, a, null, d);
            this.ac = b;
            this.hg = c;
            this.rd = null;
            var e = new L;
            this.pb = e.promise;
            this.Te = e.resolve;
            this.Rb = !1;
            var g = new L;
            this.Pb = g.promise;
            this.Qb = g.resolve
        }
        m(Om, Qm);
        f = Om.prototype;
        f.isSingleDoc = function() {
            return !1
        };
        f.getRootNode = function() {
            return this.hg
        };
        f.getUrl = function() {
            return this.ac
        };
        f.getHeadNode = function() {
            return this.hg
        };
        f.isBodyAvailable = function() {
            return !!this.rd
        };
        f.getBody = function() {
            return this.rd
        };
        f.setBody = function(a) {
            this.rd = a;
            this.Te(a);
            this.Te = void 0
        };
        f.waitForBodyOpen = function() {
            return this.pb
        };
        f.isReady = function() {
            return this.Rb
        };
        f.setReady = function() {
            this.Rb = !0;
            this.Qb();
            this.Qb = void 0
        };
        f.whenReady = function() {
            return this.Pb
        };
        f.getMeta = function() {
            return I(this.sa)
        };
        f.setMetaByName = function(a, b) {
            this.sa || (this.sa = I());
            this.sa[a] = b
        };

        function Pm(a, b, c, d) {
            Qm.call(this, a, c, d);
            var e = this;
            this.ac = b;
            this.pb = this.win.document.body ? Promise.resolve(this.win.document.body) : wb(this.win.document).then(function() {
                return e.getBody()
            });
            this.Rb = !1;
            a = new L;
            this.Pb = a.promise;
            this.Qb = a.resolve
        }
        m(Pm, Qm);
        f = Pm.prototype;
        f.isSingleDoc = function() {
            return !1
        };
        f.getRootNode = function() {
            return this.win.document
        };
        f.getUrl = function() {
            return this.ac
        };
        f.getHeadNode = function() {
            return this.win.document.head
        };
        f.isBodyAvailable = function() {
            return !!this.win.document.body
        };
        f.getBody = function() {
            return this.win.document.body
        };
        f.waitForBodyOpen = function() {
            return this.pb
        };
        f.isReady = function() {
            return this.Rb
        };
        f.whenReady = function() {
            return this.Pb
        };
        f.setReady = function() {
            this.Rb = !0;
            this.Qb();
            this.Qb = void 0
        };

        function Rm() {
            var a = self;
            R(a, "ampdoc", function() {
                return new Mm(a)
            })
        };
        var Sm = ["AMP-AD", "AMP-ANALYTICS", "AMP-PIXEL", "AMP-AD-EXIT"];

        function Tm(a, b, c) {
            a = Xc(a);
            return Um(a, b, function(a) {
                return a.isDisplayed() && (a.overlaps(c) || a.isFixed()) && a.prerenderAllowed() ? !0 : !1
            }).then(function(a) {
                var b = [];
                a.forEach(function(a) {
                    Sm.includes(a.element.tagName) || b.push(a.loadedOnce())
                });
                return Promise.all(b)
            })
        }

        function Um(a, b, c) {
            return a.signals().whenSignal("ready-scan").then(function() {
                var c = [];
                vd(a).get().forEach(function(a) {
                    a.hasBeenMeasured() || a.hostWin != b || a.hasOwner() || c.push(a.getPageLayoutBoxAsync())
                });
                return Promise.all(c)
            }).then(function() {
                return vd(a).get().filter(function(a) {
                    return a.hostWin == b && !a.hasOwner() && a.hasBeenMeasured() && c(a)
                })
            })
        };

        function Vm(a) {
            var b = this;
            this.win = a;
            this.vb = [];
            this.Ce = a.performance.timeOrigin || a.performance.timing.navigationStart;
            this.j = this.h = this.C = null;
            this.Gb = this.Zd = !1;
            this.qf = I();
            this.Me = "";
            this.eb = new oi;
            this.dc = this.Vc = 0;
            this.jg = !1;
            var c = this.win.PerformanceObserver && this.win.PerformanceObserver.supportedEntryTypes || [];
            c.includes("paint") || this.eb.rejectSignal("fcp", Error("First Contentful Paint not supported"));
            (this.Wb = c.includes("layout-shift")) || this.eb.rejectSignal("cls", Error("Cumulative Layout Shift not supported"));
            (this.lg = c.includes("first-input")) || this.eb.rejectSignal("fid", Error("First Input Delay not supported"));
            (this.Vb = c.includes("largest-contentful-paint")) || this.eb.rejectSignal("lcpv", Error("Largest Contentful Paint not supported"));
            this.Xh = c.includes("navigation");
            this.vc = this.uc = null;
            this.We = this.Bh.bind(this);
            this.me = this.me.bind(this);
            this.addEnabledExperiment("rtv-" + v(this.win).rtvVersion);
            yj(a.document).then(function() {
                b.tick("dr");
                b.flush()
            });
            zj(a.document).then(function() {
                b.tick("ol");
                if (!b.win.PerformancePaintTiming &&
                    b.win.chrome && "function" == typeof b.win.chrome.loadTimes) {
                    var a = 1E3 * b.win.chrome.loadTimes().firstPaintTime - b.win.performance.timing.navigationStart;
                    1 >= a || b.tickDelta("fp", a)
                }
                b.flush()
            });
            Wm(this);
            Xm(this)
        }
        f = Vm.prototype;
        f.coreServicesAvailable = function() {
            var a = this,
                b = this.win.document.documentElement;
            this.C = Xc(b);
            this.h = W(b);
            this.j = vd(b);
            this.Gb = this.h.isEmbedded() && "1" === this.h.getParam("csi");
            this.C.onVisibilityChanged(this.flush.bind(this));
            Ym(this);
            var c = this.h.whenMessagingReady();
            this.C.whenFirstVisible().then(function() {
                a.tick("ofv");
                a.flush()
            });
            if (this.Vb || this.Wb) this.win.addEventListener("visibilitychange", this.We, {
                capture: !0
            }), this.C.onVisibilityChanged(this.me);
            return c ? c.then(function() {
                a.tickDelta("msr",
                    a.win.performance.now());
                a.tick("timeOrigin", void 0, a.Ce);
                return Zm(a)
            }).then(function() {
                a.Zd = !0;
                $m(a);
                a.flush()
            }) : x()
        };

        function Zm(a) {
            var b = rd(a.win).getSingleDoc();
            return Km(b).then(function(b) {
                b && a.addEnabledExperiment("story")
            })
        }

        function Wm(a) {
            if ("inabox" !== v(a.win).runtime) {
                var b = !1,
                    c = !1,
                    d = !1,
                    e = !1,
                    g = function(g) {
                        if ("first-paint" != g.name || b)
                            if ("first-contentful-paint" != g.name || c) "first-input" !== g.entryType || d ? "layout-shift" === g.entryType ? g.hadRecentInput || (a.dc += g.value) : "largest-contentful-paint" === g.entryType ? (g.loadTime && (a.uc = g.loadTime), g.renderTime && (a.vc = g.renderTime)) : "navigation" != g.entryType || e || ("domComplete domContentLoadedEventEnd domContentLoadedEventStart domInteractive loadEventEnd loadEventStart requestStart responseStart".split(" ").forEach(function(b) {
                                return a.tick(b,
                                    g[b])
                            }), e = !0) : (h = g.processingStart - g.startTime, a.tickDelta("fid", h), a.tickSinceVisible("fidv", h), d = !0);
                            else {
                                var h = g.startTime + g.duration;
                                a.tickDelta("fcp", h);
                                a.tickSinceVisible("fcpv", h);
                                c = !0
                            }
                        else a.tickDelta("fp", g.startTime + g.duration), b = !0
                    },
                    h = [];
                a.win.PerformancePaintTiming && (a.win.performance.getEntriesByType("paint").forEach(g), h.push("paint"));
                a.lg && an(a, g).observe({
                    type: "first-input",
                    buffered: !0
                });
                a.Wb && an(a, g).observe({
                    type: "layout-shift",
                    buffered: !0
                });
                a.Vb && an(a, g).observe({
                    type: "largest-contentful-paint",
                    buffered: !0
                });
                a.Xh && an(a, g).observe({
                    type: "navigation",
                    buffered: !0
                });
                if (0 !== h.length) {
                    var l = an(a, g);
                    try {
                        l.observe({
                            entryTypes: h
                        })
                    } catch (k) {
                        E().warn(k)
                    }
                }
            }
        }

        function an(a, b) {
            return new a.win.PerformanceObserver(function(c) {
                c.getEntries().forEach(b);
                a.flush()
            })
        }

        function Xm(a) {
            if (a.win.perfMetrics && a.win.perfMetrics.onFirstInputDelay) a.win.perfMetrics.onFirstInputDelay(function(b) {
                a.tickDelta("fid-polyfill", b);
                a.flush()
            })
        }
        f.Bh = function() {
            "hidden" === this.win.document.visibilityState && (this.Wb && bn(this), this.Vb && cn(this), dn(this))
        };
        f.me = function() {
            "inactive" === this.C.getVisibilityState() && (this.Wb && bn(this), this.Vb && cn(this), dn(this))
        };

        function bn(a) {
            0 === a.Vc ? (a.tickDelta("cls", a.dc), a.flush(), a.Vc = 1) : 1 === a.Vc && (a.tickDelta("cls-2", a.dc), a.flush(), a.Vc = 2, a.win.removeEventListener("visibilitychange", a.We, {
                capture: !0
            }))
        }

        function dn(a) {
            a.jg || (a.j ? (a.jg = !0, a.tickDelta("ser", a.j.getSlowElementRatio()), a.flush()) : E().error("Performance", "Failed to tick ser due to null resources"))
        }

        function cn(a) {
            if (null !== a.uc) {
                a.tickDelta("lcpl", a.uc);
                var b = a.uc
            }
            null !== a.vc && (a.tickDelta("lcpr", a.vc), b = b || a.vc);
            null !== b && a.tickSinceVisible("lcpv", b);
            a.flush()
        }

        function Ym(a) {
            var b = !a.C.hasBeenVisible(),
                c = -1;
            a.C.whenFirstVisible().then(function() {
                c = a.win.performance.now();
                a.mark("visible")
            });
            en(a).then(function() {
                if (b) {
                    var d = -1 < c ? a.win.performance.now() - c : 0;
                    a.C.whenFirstVisible().then(function() {
                        a.tickDelta("pc", d)
                    });
                    fn(a, d);
                    a.mark("pc")
                } else a.tick("pc"), fn(a, a.win.performance.now() - c);
                a.flush()
            })
        }

        function en(a) {
            return a.j.whenFirstPass().then(function() {
                var b = a.win.document.documentElement,
                    c = xd(b).getSize();
                c = ec(0, 0, c.width, c.height);
                return Tm(b, a.win, c)
            })
        }
        f.tick = function(a, b, c) {
            var d = K({
                    label: a
                }),
                e;
            void 0 != b ? d.delta = e = Math.max(b, 0) : void 0 != c ? d.value = c : (this.mark(a), e = this.win.performance.now(), d.value = this.Ce + e);
            this.Zd && this.Gb ? this.h.sendMessage("tick", d) : (50 <= this.vb.length && this.vb.shift(), this.vb.push(d));
            this.eb.signal(a, e)
        };
        f.mark = function(a) {
            this.win.performance && this.win.performance.mark && 1 == arguments.length && this.win.performance.mark(a)
        };
        f.tickDelta = function(a, b) {
            this.tick(a, b)
        };
        f.tickSinceVisible = function(a, b) {
            b = b || this.Ce + this.win.performance.now();
            var c = this.C ? this.C.getFirstVisibleTime() : 0;
            this.tickDelta(a, c ? Math.max(b - c, 0) : 0)
        };
        f.flush = function() {
            this.Zd && this.Gb && this.h.sendMessage("sendCsi", K({
                ampexp: this.Me
            }), !0)
        };
        f.throttledFlush = function() {
            this.og || (this.og = pf(this.win, this.flush.bind(this), 100));
            this.og()
        };
        f.addEnabledExperiment = function(a) {
            this.qf[a] = !0;
            this.Me = Object.keys(this.qf).join(",")
        };

        function $m(a) {
            a.h && (a.Gb && a.vb.forEach(function(b) {
                a.h.sendMessage("tick", b)
            }), a.vb.length = 0)
        }

        function fn(a, b) {
            a.h && a.h.sendMessage("prerenderComplete", K({
                value: b
            }), !0)
        }
        f.isPerformanceTrackingOn = function() {
            return this.Gb
        };
        f.getMetric = function(a) {
            return this.eb.whenSignal(a)
        };

        function gn(a, b) {
            this.Z = a;
            this.H = b;
            this.bd = !1;
            this.ye = 0;
            this.$e = this.Ah.bind(this);
            this.Ze = this.zh.bind(this);
            this.Ye = this.yh.bind(this);
            this.Xe = this.xh.bind(this);
            this.Z.addEventListener("touchstart", this.$e, !0)
        }
        f = gn.prototype;
        f.cleanup = function() {
            hn(this);
            this.Z.removeEventListener("touchstart", this.$e, !0)
        };
        f.Ah = function(a) {
            this.bd || !a.touches || 1 != a.touches.length || 0 < this.H.getScrollTop() || (a = a.touches[0].clientY, this.bd = !0, this.ye = a, this.Z.addEventListener("touchmove", this.Ze, !0), this.Z.addEventListener("touchend", this.Ye, !0), this.Z.addEventListener("touchcancel", this.Xe, !0))
        };

        function hn(a) {
            a.bd = !1;
            a.ye = 0;
            a.Z.removeEventListener("touchmove", a.Ze, !0);
            a.Z.removeEventListener("touchend", a.Ye, !0);
            a.Z.removeEventListener("touchcancel", a.Xe, !0)
        }
        f.zh = function(a) {
            if (this.bd) {
                var b = a.touches[0].clientY - this.ye;
                0 < b && a.preventDefault();
                0 != b && hn(this)
            }
        };
        f.yh = function() {
            hn(this)
        };
        f.xh = function() {
            hn(this)
        };

        function jn(a) {
            var b = a.win;
            rf(["\u26a1", "amp"], b.document) && U(a.win).isStandalone() && Ai(a, function() {
                td(b).installExtensionForDoc(a, "amp-standalone").then(function() {
                    return ld(a.getBody(), "standalone", "amp-standalone")
                }).then(function(a) {
                    return a.initialize()
                })
            })
        };

        function kn() {
            var a = self,
                b = a.location.href;
            if (!N(b, "about:")) {
                var c = !1;
                v().development && (c = "0" !== t(a.location.originalHash || a.location.hash).validate);
                c ? ln(a.document, B.cdn + "/v0/validator.js").then(function() {
                    amp.validator.validateUrlAndLog(b, a.document)
                }) : v().examiner && ln(a.document, B.cdn + "/examiner.js")
            }
        }

        function ln(a, b) {
            var c = a.createElement("script");
            c.src = b;
            (b = a.head.querySelector("script[nonce]")) && c.setAttribute("nonce", b.getAttribute("nonce"));
            b = Oe(c).then(function() {
                a.head.removeChild(c)
            }, function() {});
            a.head.appendChild(c);
            return b
        };

        function mn(a, b) {
            zi(self.document, function() {
                mm(self);
                nm(a);
                b.coreServicesAvailable();
                rh()
            });
            zi(self.document, function() {
                Em()
            });
            zi(self.document, function() {
                var a = self;
                Ri(a, "amp-img", Ti);
                Ri(a, "amp-pixel", qj);
                Ri(a, "amp-layout", $i)
            });
            zi(self.document, function() {
                Pi(a)
            });
            zi(self.document, function() {
                var b = self,
                    d = b.document.documentElement;
                "0" == W(d).getParam("p2r") && U(b).isChrome() && new gn(b.document, xd(d));
                Lm(a);
                jn(a);
                kn();
                gf();
                Fj()
            }, !0);
            zi(self.document, function() {
                b.tick("e_is");
                vd(a).ampInitComplete();
                b.flush()
            })
        }
        if (!self.IS_AMP_ALT) {
            self.location && (self.location.originalHash = self.location.hash);
            var ampdocService;
            try {
                Cf(), Rm(), ampdocService = rd(self)
            } catch (a) {
                throw jf(self.document), a;
            }
            zi(self.document, function() {
                var a = ampdocService.getAmpDoc(self.document);
                R(self, "platform", sj);
                R(self, "performance", Vm);
                var b = T(self, "performance");
                self.document.documentElement.hasAttribute("i-amphtml-no-boilerplate") && b.addEnabledExperiment("no-boilerplate");
                v().esm && b.addEnabledExperiment("esm");
                Hm();
                b.tick("is");
                af(a, nf +
                    of ,
                    function() {
                        return mn(a, b)
                    }, !0, "amp-runtime")
            });
            self.console && (console.info || console.log).call(console, "Powered by AMP \u26a1 HTML \u2013 Version 2006112352003", self.location.href);
            self.document.documentElement.setAttribute("amp-version", "2006112352003")
        };
    })(AMP._ = AMP._ || {})
} catch (e) {
    setTimeout(function() {
        var s = document.body.style;
        s.opacity = 1;
        s.visibility = "visible";
        s.animation = "none";
        s.WebkitAnimation = "none;"
    }, 1000);
    throw e
};

//# sourceMappingURL=v0.js.map