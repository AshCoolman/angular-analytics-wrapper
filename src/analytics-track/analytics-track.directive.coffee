analyticsTrackDirective = (Analytics) ->
    restrict: 'A'
    link: ($scope, el, attr) ->
        console.info 'analyticsTrackDirective.click()'
        el.on "click", ->
            console.info('analyticsTrack:', attr.analyticsTrack);
            # { name, data } = JSON.parse attr.analyticsTrack
            # console.info "Analytics.track", Analytics, Analytics.track, name, data
            # Analytics.track name, data
angular
    .module 'analytics.analytics-track'
    .directive 'analyticsTrack', analyticsTrackDirective