angular.module('analytics', []);

var AnalyticsProvider, AnalyticsService;

AnalyticsService = function(api) {
  this.track = api.track;
  this.identify = api.identify;
  this.isActive = api.isActive;
  return this;
};

AnalyticsProvider = (function(_this) {
  return function() {
    var hasApi;
    _this.api = null;
    hasApi = function(api) {
      return (api != null ? api.isActive : void 0) && (api != null ? api.applyScript : void 0) && (api != null ? api.identify : void 0) && (api != null ? api.track : void 0);
    };
    _this.setApi = function(api) {
      if (!hasApi(api)) {
        throw new Error("Api object must implement: isActive(), applyScript(), track(), identify()");
      }
      _this.api = api;
      if (!_this.api.isActive()) {
        return null;
      }
      return _this.api.applyScript();
    };
    _this.setApiMethod = function(name, method) {
      return _this.api[name] = method;
    };
    _this.$get = function($location, $routeParams) {
      if (!_this.api.isActive()) {
        return _this.api.track = function() {
          return console.warn('analyticsProvier.api.isActive() === false');
        };
      }
      return new AnalyticsService(_this.api);
    };
    return _this;
  };
})(this);

angular.module('analytics').provider('Analytics', AnalyticsProvider);

angular.module('analytics.analytics-track', ['analytics']);

var analyticsTrackDirective;

analyticsTrackDirective = function(Analytics) {
  return {
    restrict: 'A',
    link: function($scope, el, attr) {
      console.info('analyticsTrackDirective.click()');
      return el.on("click", (function(_this) {
        return function() {
          var data, name, ref;
          ref = JSON.parse(attr.analyticsTrack), name = ref.name, data = ref.data;
          console.info("Analytics.track", Analytics, Analytics.track, name, data);
          return Analytics.track(name, data);
        };
      })(this));
    }
  };
};

angular.module('analytics.analytics-track').directive('analyticsTrack', analyticsTrackDirective);
