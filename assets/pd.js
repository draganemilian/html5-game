var piScriptNum = 0;
var piScriptObj = new Array();
function checkNamespace(checkNamespace) {
  var namespaces = checkNamespace.split(".");
  var curNamespace = window;
  for (var namespaceNum = 0; namespaceNum < namespaces.length; namespaceNum++) {
    var namespace = namespaces[namespaceNum];
    if (!curNamespace[namespace]) {
      curNamespace[namespace] = {};
    }
    curNamespace = curNamespace[namespace];
  }
}
function piTracker(trackerURL) {
  checkNamespace("pi.tracker");
  pi.tracker.visitor_id = piGetCookie("visitor_id" + (piAId - 1e3));
  pi.tracker.pi_opt_in = piGetCookie("pi_opt_in" + (piAId - 1e3));
  if (
    pi.tracker.pi_opt_in != "false" ||
    (typeof pi.tracker.title != "undefined" && pi.tracker.notify_pi)
  ) {
    var pi_campaign_id = piGetParameter(document.URL, "pi_campaign_id");
    if (pi_campaign_id != null) pi.tracker.campaign_id = pi_campaign_id;
    else if (typeof piCId != "undefined" && piCId != "" && piCId != null)
      pi.tracker.campaign_id = piCId;
    else pi.tracker.campaign_id = null;
    pi.tracker.account_id = piAId;
    pi.tracker.title = encodeURIComponent(document.title);
    if (typeof piPoints != "undefined") pi.tracker.pi_points = piPoints;
    if (typeof trackerURL != "undefined")
      pi.tracker.url = encodeURIComponent(trackerURL);
    else pi.tracker.url = encodeURIComponent(document.URL);
    pi.tracker.referrer = document.referrer;
    if (pi.tracker.referrer == null)
      pi.tracker.referrer = piGetParameter(document.URL, "referrer");
    pi.tracker.referrer = encodeURIComponent(pi.tracker.referrer);
    var pi_ad_id = piGetParameter(document.URL, "pi_ad_id");
    if (pi_ad_id != null) pi.tracker.pi_ad_id = pi_ad_id;
    var adwords_creative = piGetParameter(document.URL, "creative");
    if (adwords_creative != null) pi.tracker.creative = adwords_creative;
    var adwords_matchtype = piGetParameter(document.URL, "matchtype");
    if (adwords_matchtype != null) pi.tracker.matchtype = adwords_matchtype;
    var adwords_keyword = piGetParameter(document.URL, "keyword");
    if (adwords_keyword != null) pi.tracker.keyword = adwords_keyword;
    var adwords_network = piGetParameter(document.URL, "network");
    if (adwords_network != null) pi.tracker.network = adwords_network;
    var adwords_device = piGetParameter(document.URL, "device");
    if (adwords_device != null) pi.tracker.device = adwords_device;
    if (typeof piIncludeInActivities != "undefined")
      pi.tracker.pi_include_in_activies = piIncludeInActivities;
    if (typeof piProfileId != "undefined")
      pi.tracker.pi_profile_id = piProfileId;
    var pi_profile_id = piGetParameter(document.URL, "pi_profile_id");
    if (pi_profile_id != null) pi.tracker.pi_profile_id = pi_profile_id;
    var pi_email = piGetParameter(document.URL, "pi_email");
    if (pi_email != null) pi.tracker.pi_email = pi_email;
    var pi_list_email = piGetParameter(document.URL, "pi_list_email");
    if (pi_list_email != null) pi.tracker.pi_list_email = pi_list_email;
    var campaign = piGetParameter(document.URL, "utm_campaign");
    if (campaign != null)
      pi.tracker.utm_campaign = encodeURIComponent(campaign);
    var medium = piGetParameter(document.URL, "utm_medium");
    if (medium != null) pi.tracker.utm_medium = encodeURIComponent(medium);
    var source = piGetParameter(document.URL, "utm_source");
    if (source != null) pi.tracker.utm_source = encodeURIComponent(source);
    var content = piGetParameter(document.URL, "utm_content");
    if (content != null) pi.tracker.utm_content = encodeURIComponent(content);
    var term = piGetParameter(document.URL, "utm_term");
    if (term == null) term = piGetParameter(document.URL, "_kk");
    if (term != null) pi.tracker.utm_term = encodeURIComponent(term);
    var gclid = piGetParameter(document.URL, "gclid");
    if (gclid != null) pi.tracker.gclid = gclid;
    var variables = "ver=3";
    for (property in pi.tracker) {
      variables += "&" + property + "=" + pi.tracker[property];
    }
    var prefix = false;
    try {
      prefix = location.protocol + "//";
    } catch (e) {}
    if (prefix == null) prefix = "http://";
    if (typeof piTUrl == "string" && piTUrl.indexOf("localhost") != -1) {
      var analytics_link = prefix + piTUrl + "/analytics?";
    } else {
      var analytics_link = prefix + "pi.pardot.com/analytics?";
    }
    var headID = document.getElementsByTagName("head")[0];
    piScriptObj[piScriptNum] = document.createElement("script");
    piScriptObj[piScriptNum].type = "text/javascript";
    piScriptObj[piScriptNum].src = analytics_link + variables;
    headID.appendChild(piScriptObj[piScriptNum]);
    piScriptObj[piScriptNum].onload = function () {
      return;
    };
  }
  piScriptNum++;
}
function piGetParameter(queryString, parameterName) {
  var parameterName = parameterName + "=";
  if (queryString.length > 0) {
    var begin = queryString.indexOf(parameterName);
    if (begin != -1) {
      begin += parameterName.length;
      var end = queryString.indexOf("&", begin);
      if (end == -1) {
        end = queryString.length;
      }
      return unescape(queryString.substring(begin, end));
    }
  }
  return null;
}
function piGetCookie(c_name) {
  if (document.cookie.length > 0) {
    c_start = document.cookie.indexOf(c_name + "=");
    if (c_start != -1) {
      c_start = c_start + c_name.length + 1;
      c_end = document.cookie.indexOf(";", c_start);
      if (c_end == -1) c_end = document.cookie.length;
      return unescape(document.cookie.substring(c_start, c_end));
    }
  }
  return "";
}
function piSetCookie(c_name, value, expiredays) {
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + expiredays);
  document.cookie =
    c_name +
    "=" +
    escape(value) +
    (expiredays == null
      ? ""
      : ";expires=" + exdate.toGMTString() + ";path=" + escape("/"));
}
piTracker();
(function () {
  function piLegacyIeGetElementsByClassName(className) {
    if (document.querySelectorAll) {
      return document.querySelectorAll("." + className);
    }
    var elms = document.getElementsByTagName("a");
    var ei = new Array();
    for (i = 0; i < elms.length; i++) {
      var classAttr = elms[i].getAttribute("class");
      if (!classAttr) {
        classAttr = elms[i].className;
      }
      ecl = classAttr.split(" ");
      for (j = 0; j < ecl.length; j++) {
        if (ecl[j].toLowerCase() == className.toLowerCase()) {
          ei.push(elms[i]);
        }
      }
    }
    return ei;
  }
  function piGetElementsByClassName(className) {
    if (typeof document.getElementsByClassName !== "function") {
      return piLegacyIeGetElementsByClassName(className);
    } else {
      return document.getElementsByClassName(className);
    }
  }
  function piPreclickSetup() {
    var elems, i, el;
    elems = piGetElementsByClassName("pardotTrackClick");
    for (i = 0; i < elems.length; i++) {
      el = elems[i];
      var trackClick = function (e) {
        var target = e.currentTarget ? e.currentTarget : e.srcElement;
        if (target) {
          var target_url = target.getAttribute("href");
          if (target_url) {
            piPreclick(target_url);
            if (e.preventDefault) {
              e.preventDefault();
            } else {
              e.returnValue = false;
            }
            return false;
          }
        }
      };
      if (el.addEventListener) {
        el.addEventListener("click", trackClick, false);
      } else if (el.attachEvent) {
        el.attachEvent("onclick", trackClick);
      }
    }
  }
  function piPreclick(target_url) {
    var pardot_url = "pi.pardot.com/analytics?";
    var params = {
      url: encodeURIComponent(target_url),
      title: "",
      referrer: pi.tracker.url,
    };
    var key;
    for (key in pi.tracker) {
      if (pi.tracker.hasOwnProperty(key) && !params.hasOwnProperty(key)) {
        params[key] = pi.tracker[key];
      }
      pardot_url += "&" + key + "=" + params[key];
    }
    var cb = "analyticsCB" + new Date().getTime();
    pardot_url += "&piClickCallback=" + cb;
    pi[cb] = function () {
      window.location = target_url;
    };
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src =
      ("https:" == document.location.protocol ? "https://" : "http://") +
      pardot_url;
    var c = document.getElementsByTagName("script")[0];
    c.parentNode.insertBefore(s, c);
  }
  piPreclickSetup();
})();
