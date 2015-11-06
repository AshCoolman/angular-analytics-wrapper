# Service
AnalyticsService = (api) ->
    @track = api.track
    @identify = api.identify
    @isActive = api.isActive
    @

# Provider
AnalyticsProvider = =>
    @api = null

    hasApi = (api) ->
        api?.isActive and
        api?.applyScript and
        api?.identify and
        api?.track

    # Config
    @setApi = (api) =>
        if not hasApi api
            throw new Error "Api object must implement: isActive(), applyScript(), track(), identify()"
        @api = api
        return null unless @api.isActive()
        @api.applyScript()

    @setApiMethod = (name, method) =>
        @api[name] = method

    # Service creation
    @$get = ($location, $routeParams) =>
        if not @api.isActive()
            return @api.track = () -> console.warn 'analyticsProvier.api.isActive() === false'
        new AnalyticsService @api

    @

angular
    .module 'analytics'
    .provider 'Analytics', AnalyticsProvider