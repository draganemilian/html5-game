var e = document;
window._gaq || eval("var _gaq = [];");
_gaq.push(["_provide", "inpage_linkid", f]);
function f(c, g) {
  var l = /(?:^__utmli=|; ?__utmli=)([^;]*)/,
    d = this,
    m = function (a, b, d, c) {
      var h = "addEventListener",
        k = "attachEvent";
      if (a[h]) a[h](b, d, !!c);
      else if (a[k]) a[k]("on" + b, d);
    };
  this.e = function () {
    return "; path=/";
  };
  var n = c._trackPageview;
  c._trackPageview = function (a) {
    d.a();
    d.f && c._setXKey(12, 1, d.f);
    n.call(c, a);
  };
  this.g = function () {
    this.i ||
      ((this.i = !0),
      m(e, "click", function (a) {
        d.h(a);
      }));
  };
  this.h = function (a) {
    try {
      a = a || window.event;
      var b = a.target || a.srcElement;
      for (a = 0; 3 > a && !b.id && b != e.body; a++) b = b.parentNode;
      var c = b.id || "";
      d.d(c);
    } catch (g) {}
    return !0;
  };
  this.b = function (a, b) {
    f.prototype[a] = b;
  };
  this.d = function (a) {
    if (a && 100 > a.length) {
      a = a.replace(/[^-0-9a-z_:.]/gi, "");
      var b = new Date(new Date().getTime() + 3e4);
      e.cookie = "__utmli=" + a + "; expires=" + b.toUTCString() + this.e();
    } else this.a();
  };
  this.b("trackClickId", this.d);
  this.a = function () {
    e.cookie = "__utmli=; expires=Thu, 01-Jan-1970 00:00:01 GMT" + this.e();
  };
  this.b("deleteClickId", this.a);
  this.c = function (a) {
    var b = (l.exec(e.cookie) || ["", ""])[1];
    a && a(b);
    return b;
  };
  this.b("getClickId", this.c);
  this.f = this.c();
  g.disableAutoTrackLinkId || this.g();
}
