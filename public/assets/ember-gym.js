"use strict";

/* jshint ignore:start */



/* jshint ignore:end */

define('ember-gym/app', ['exports', 'ember', 'ember-gym/resolver', 'ember-load-initializers', 'ember-gym/config/environment'], function (exports, _ember, _emberGymResolver, _emberLoadInitializers, _emberGymConfigEnvironment) {

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = _ember['default'].Application.extend({
    modulePrefix: _emberGymConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _emberGymConfigEnvironment['default'].podModulePrefix,
    Resolver: _emberGymResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _emberGymConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
});
define('ember-gym/components/app-version', ['exports', 'ember-cli-app-version/components/app-version', 'ember-gym/config/environment'], function (exports, _emberCliAppVersionComponentsAppVersion, _emberGymConfigEnvironment) {

  var name = _emberGymConfigEnvironment['default'].APP.name;
  var version = _emberGymConfigEnvironment['default'].APP.version;

  exports['default'] = _emberCliAppVersionComponentsAppVersion['default'].extend({
    version: version,
    name: name
  });
});
define('ember-gym/controllers/application', ['exports', 'ember'], function (exports, _ember) {

  var untrainedRGB = [51, 193, 255]; //light blie
  var noviceRGB = [15, 8, 130]; //dark blue
  var intermediateRGB = [52, 255, 40]; //light greenv
  var advancedRGB = [13, 109, 7]; //dark green
  var eliteRGB = [250, 71, 71]; //light red
  var unknownRGB = [255, 255, 255]; //white

  exports['default'] = _ember['default'].Controller.extend({
    ajax: _ember['default'].inject.service(),
    actions: {
      sendRequest: function sendRequest() {
        var age = parseInt(this.get('age'));
        var bench = parseInt(this.get('benchMax'));
        var squat = parseInt(this.get('squatMax'));
        var deadlift = parseInt(this.get('deadMax'));

        return this.get('ajax').request('/lifts', {
          method: 'POST',
          data: {
            age: age,
            weight: 200,
            height: 66,
            male: true,
            bench: bench,
            squat: squat,
            deadlift: deadlift
          }
        });
      },
      calculateLifts: function calculateLifts() {
        //if validate input TODO
        this.set('isCalculated', true);
        var bench = parseInt(this.get('benchMax'));
        var squat = parseInt(this.get('squatMax'));
        var deadlift = parseInt(this.get('deadMax'));
        this.set('liftTotal', bench + squat + deadlift);

        var sex = this.get('sex');
        console.log(sex);
        this.set('sex', sex);

        var weight = parseInt(this.get('weight'));

        //used for color coding body diagram
        var benchRate = undefined,
            squatRate = undefined,
            deadRate = undefined;
        var benchColor = undefined,
            squatColor = undefined,
            deadColor = undefined;
        //all classifications estimated through exrx
        //http://www.exrx.net/Testing/WeightLifting/StrengthStandards.html
        if (bench < 0.75 * weight) {
          benchRate = 'Untrained';
          benchColor = untrainedRGB;
        } else if (bench >= 0.75 * weight && bench < weight) {
          benchRate = 'Novice';
          benchColor = noviceRGB;
        } else if (bench >= weight && bench < 1.25 * weight) {
          benchRate = 'Intermediate';
          benchColor = intermediateRGB;
        } else if (bench >= 1.25 * weight && bench < 2 * weight) {
          benchRate = 'Advanced';
          benchColor = advancedRGB;
        } else if (bench >= 2 * weight) {
          benchRate = 'Elite';
          benchColor = eliteRGB;
        } else {
          benchRate = 'Unknown';
          benchColor = unknownRGB;
        }
        this.set('benchClass', benchRate);

        if (squat < weight) {
          squatRate = 'Untrained';
          squatColor = untrainedRGB;
        } else if (squat >= weight && squat < weight * 1.5) {
          squatRate = 'Novice';
          squatColor = noviceRGB;
        } else if (squat >= weight * 1.5 && squat < weight * 2) {
          squatRate = 'Intermediate';
          squatColor = intermediateRGB;
        } else if (squat >= 2 * weight && squat < 2.5 * weight) {
          squatRate = 'Advanced';
          squatColor = advancedRGB;
        } else if (squat >= 2.5 * weight) {
          squatRate = 'Elite';
          squatColor = eliteRGB;
        } else {
          squatRate = 'Unknown';
          squatColor = unknownRGB;
        }
        this.set('squatClass', squatRate);

        if (deadlift < weight) {
          deadRate = 'Untrained';
          deadColor = untrainedRGB;
        } else if (deadlift >= weight && deadlift < weight * 1.5) {
          deadRate = 'Novice';
          deadColor = noviceRGB;
        } else if (deadlift >= weight * 1.5 && deadlift < weight * 2) {
          deadRate = 'Intermediate';
          deadColor = intermediateRGB;
        } else if (deadlift >= 2 * weight && deadlift < 2.5 * weight) {
          deadRate = 'Advanced';
          deadColor = advancedRGB;
        } else if (deadlift >= 2.5 * weight) {
          deadRate = 'Elite';
          deadColor = eliteRGB;
        } else {
          deadRate = 'Unknown';
          deadColor = unknownRGB;
        }
        this.set('deadClass', deadRate);

        //Wilks
        //for men, TODO women, gotta be a better way than this
        //oh, it's also incorrect TOFIX
        var weightKG = weight / 2.2;
        var wilks = (bench + squat + deadlift) / (-216.0475144 + weightKG * 16.2606339 + weightKG * weightKG * -0.002388645 + weightKG * weightKG * weightKG * -0.00113732 + weightKG * weightKG * weightKG * weightKG * 0.00000701863 + weightKG * weightKG * weightKG * weightKG * weightKG * -0.00000001291);
        this.set('wilks', wilks);

        var canvas = document.getElementById("canvas");
        var ctx = canvas.getContext("2d");

        var img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = draw;
        img.src = 'muscleMale.png';

        function draw() {
          //set body graph

          ctx.drawImage(img, 0, 0);
          console.log("image drawn");

          var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          var data = imgData.data;

          var red = undefined,
              green = undefined,
              blue = undefined,
              alpha = undefined;
          for (var i = 0; i < data.length; i += 4) {
            red = data[i + 0];
            green = data[i + 1];
            blue = data[i + 2];
            alpha = data[i + 3];

            if (red > 200 && green < 100 && blue < 100) {
              //bench muscles
              data[i] = benchColor[0];
              data[i + 1] = benchColor[1];
              data[i + 2] = benchColor[2];
            } else if (red < 100 && green < 50 && blue > 200) {
              //dl muscles
              data[i] = deadColor[0];
              data[i + 1] = deadColor[1];
              data[i + 2] = deadColor[2];
            } else if (red < 100 && green > 200 && blue < 100) {
              //squat muscles
              data[i] = squatColor[0];
              data[i + 1] = squatColor[1];
              data[i + 2] = squatColor[2];
            }
          }

          ctx.putImageData(imgData, 0, 0);
        }
      }
    }
  });
});
define('ember-gym/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _emberInflectorLibHelpersPluralize) {
  exports['default'] = _emberInflectorLibHelpersPluralize['default'];
});
define('ember-gym/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _emberInflectorLibHelpersSingularize) {
  exports['default'] = _emberInflectorLibHelpersSingularize['default'];
});
define('ember-gym/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'ember-gym/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _emberGymConfigEnvironment) {
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(_emberGymConfigEnvironment['default'].APP.name, _emberGymConfigEnvironment['default'].APP.version)
  };
});
define('ember-gym/initializers/container-debug-adapter', ['exports', 'ember-resolver/container-debug-adapter'], function (exports, _emberResolverContainerDebugAdapter) {
  exports['default'] = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _emberResolverContainerDebugAdapter['default']);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('ember-gym/initializers/data-adapter', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `data-adapter` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'data-adapter',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define('ember-gym/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data/-private/core'], function (exports, _emberDataSetupContainer, _emberDataPrivateCore) {

  /*
  
    This code initializes Ember-Data onto an Ember application.
  
    If an Ember.js developer defines a subclass of DS.Store on their application,
    as `App.StoreService` (or via a module system that resolves to `service:store`)
    this code will automatically instantiate it and make it available on the
    router.
  
    Additionally, after an application's controllers have been injected, they will
    each have the store made available to them.
  
    For example, imagine an Ember.js application with the following classes:
  
    App.StoreService = DS.Store.extend({
      adapter: 'custom'
    });
  
    App.PostsController = Ember.ArrayController.extend({
      // ...
    });
  
    When the application is initialized, `App.ApplicationStore` will automatically be
    instantiated, and the instance of `App.PostsController` will have its `store`
    property set to that instance.
  
    Note that this code will only be run if the `ember-application` package is
    loaded. If Ember Data is being used in an environment other than a
    typical application (e.g., node.js where only `ember-runtime` is available),
    this code will be ignored.
  */

  exports['default'] = {
    name: 'ember-data',
    initialize: _emberDataSetupContainer['default']
  };
});
define('ember-gym/initializers/export-application-global', ['exports', 'ember', 'ember-gym/config/environment'], function (exports, _ember, _emberGymConfigEnvironment) {
  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_emberGymConfigEnvironment['default'].exportApplicationGlobal !== false) {
      var value = _emberGymConfigEnvironment['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember['default'].String.classify(_emberGymConfigEnvironment['default'].modulePrefix);
      }

      if (!window[globalName]) {
        window[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete window[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('ember-gym/initializers/injectStore', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `injectStore` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'injectStore',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define('ember-gym/initializers/store', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `store` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'store',
    after: 'ember-data',
    initialize: _ember['default'].K
  };
});
define('ember-gym/initializers/transforms', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `transforms` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'transforms',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define("ember-gym/instance-initializers/ember-data", ["exports", "ember-data/-private/instance-initializers/initialize-store-service"], function (exports, _emberDataPrivateInstanceInitializersInitializeStoreService) {
  exports["default"] = {
    name: "ember-data",
    initialize: _emberDataPrivateInstanceInitializersInitializeStoreService["default"]
  };
});
define('ember-gym/models/lift', ['exports', 'ember-data/model', 'ember-data/attr'], function (exports, _emberDataModel, _emberDataAttr) {
  // import { belongsTo, hasMany } from 'ember-data/relationships';

  exports['default'] = _emberDataModel['default'].extend({
    age: (0, _emberDataAttr['default'])('number'),
    weight: (0, _emberDataAttr['default'])('number'),
    height: (0, _emberDataAttr['default'])('number'),
    male: (0, _emberDataAttr['default'])('boolean'),
    bench: (0, _emberDataAttr['default'])('number'),
    squat: (0, _emberDataAttr['default'])('number'),
    deadlift: (0, _emberDataAttr['default'])('number')
  });
});
define('ember-gym/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  exports['default'] = _emberResolver['default'];
});
define('ember-gym/router', ['exports', 'ember', 'ember-gym/config/environment'], function (exports, _ember, _emberGymConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _emberGymConfigEnvironment['default'].locationType
  });

  Router.map(function () {
    this.route('scientists');
    this.route('programmers');
    this.route('lift');
  });

  exports['default'] = Router;
});
define('ember-gym/routes/lift', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    model: function model() {
      return this.store.find('lifts');
    }
  });
});
define('ember-gym/serializers/application', ['exports', 'ember-data'], function (exports, _emberData) {
    exports['default'] = _emberData['default'].RESTSerializer.extend({
        primaryKey: '_id'
    });
});
define('ember-gym/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _emberAjaxServicesAjax) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberAjaxServicesAjax['default'];
    }
  });
});
define("ember-gym/templates/application", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.0",
          "loc": {
            "source": null,
            "start": {
              "line": 33,
              "column": 0
            },
            "end": {
              "line": 45,
              "column": 0
            }
          },
          "moduleName": "ember-gym/templates/application.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("button");
          var el2 = dom.createTextNode(" Send Result ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("h3");
          var el2 = dom.createTextNode(" Results ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("ul");
          var el2 = dom.createTextNode("\n   ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("li");
          var el3 = dom.createTextNode(" Estimated total: ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode(" ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n   ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("li");
          var el3 = dom.createTextNode(" ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode(" in Bench Press ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n   ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("li");
          var el3 = dom.createTextNode(" ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode(" in Squats ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n   ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("li");
          var el3 = dom.createTextNode(" ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode(" in Deadlifts ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n   ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("li");
          var el3 = dom.createTextNode(" Your Wilks score is: ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode(" ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n   ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("li");
          var el3 = dom.createTextNode(" Sex is: ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode(" ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [0]);
          var element1 = dom.childAt(fragment, [4]);
          var morphs = new Array(7);
          morphs[0] = dom.createElementMorph(element0);
          morphs[1] = dom.createMorphAt(dom.childAt(element1, [1]), 1, 1);
          morphs[2] = dom.createMorphAt(dom.childAt(element1, [3]), 1, 1);
          morphs[3] = dom.createMorphAt(dom.childAt(element1, [5]), 1, 1);
          morphs[4] = dom.createMorphAt(dom.childAt(element1, [7]), 1, 1);
          morphs[5] = dom.createMorphAt(dom.childAt(element1, [9]), 1, 1);
          morphs[6] = dom.createMorphAt(dom.childAt(element1, [11]), 1, 1);
          return morphs;
        },
        statements: [["element", "action", ["sendRequest"], [], ["loc", [null, [34, 8], [34, 32]]]], ["content", "liftTotal", ["loc", [null, [37, 25], [37, 38]]]], ["content", "benchClass", ["loc", [null, [38, 8], [38, 22]]]], ["content", "squatClass", ["loc", [null, [39, 8], [39, 22]]]], ["content", "deadClass", ["loc", [null, [40, 8], [40, 21]]]], ["content", "wilks", ["loc", [null, [41, 29], [41, 38]]]], ["content", "sex", ["loc", [null, [42, 16], [42, 23]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes", "wrong-type"]
        },
        "revision": "Ember@2.6.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 49,
            "column": 0
          }
        },
        "moduleName": "ember-gym/templates/application.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("head");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("link");
        dom.setAttribute(el2, "rel", "icon");
        dom.setAttribute(el2, "href", "ember-gymicon.png");
        dom.setAttribute(el2, "type", "image/png");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h2");
        var el2 = dom.createTextNode(" Ember Gym App ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\nAge: ");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\nWeight: ");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\nHeight(in): ");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\nSex: ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("select");
        var el2 = dom.createTextNode("\n      ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("option");
        dom.setAttribute(el2, "value", "male");
        var el3 = dom.createTextNode("Male");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n      ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("option");
        dom.setAttribute(el2, "value", "female");
        var el3 = dom.createTextNode("Female");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n     ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h3");
        var el2 = dom.createTextNode(" Lifts ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\nBench Press: ");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\nSquat: ");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\nDeadlift: ");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("button");
        var el2 = dom.createTextNode(" Calculate ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("canvas");
        dom.setAttribute(el1, "id", "canvas");
        dom.setAttribute(el1, "width", "500");
        dom.setAttribute(el1, "height", "500");
        var el2 = dom.createTextNode("\n  Your browser does not support HTML canvas! Can't display body graph!\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element2 = dom.childAt(fragment, [30]);
        var morphs = new Array(8);
        morphs[0] = dom.createMorphAt(fragment, 4, 4, contextualElement);
        morphs[1] = dom.createMorphAt(fragment, 8, 8, contextualElement);
        morphs[2] = dom.createMorphAt(fragment, 12, 12, contextualElement);
        morphs[3] = dom.createMorphAt(fragment, 20, 20, contextualElement);
        morphs[4] = dom.createMorphAt(fragment, 22, 22, contextualElement);
        morphs[5] = dom.createMorphAt(fragment, 24, 24, contextualElement);
        morphs[6] = dom.createElementMorph(element2);
        morphs[7] = dom.createMorphAt(fragment, 36, 36, contextualElement);
        return morphs;
      },
      statements: [["inline", "input", [], ["value", ["subexpr", "@mut", [["get", "age", ["loc", [null, [7, 19], [7, 22]]]]], [], []]], ["loc", [null, [7, 5], [7, 24]]]], ["inline", "input", [], ["value", ["subexpr", "@mut", [["get", "weight", ["loc", [null, [9, 22], [9, 28]]]]], [], []]], ["loc", [null, [9, 8], [9, 30]]]], ["inline", "input", [], ["value", ["subexpr", "@mut", [["get", "height", ["loc", [null, [11, 26], [11, 32]]]]], [], []]], ["loc", [null, [11, 12], [11, 34]]]], ["inline", "input", [], ["value", ["subexpr", "@mut", [["get", "benchMax", ["loc", [null, [21, 27], [21, 35]]]]], [], []], "enter", "calculateLifts"], ["loc", [null, [21, 13], [21, 60]]]], ["inline", "input", [], ["value", ["subexpr", "@mut", [["get", "squatMax", ["loc", [null, [22, 21], [22, 29]]]]], [], []], "enter", "calculateLifts"], ["loc", [null, [22, 7], [22, 54]]]], ["inline", "input", [], ["value", ["subexpr", "@mut", [["get", "deadMax", ["loc", [null, [23, 24], [23, 31]]]]], [], []], "enter", "calculateLifts"], ["loc", [null, [23, 10], [23, 56]]]], ["element", "action", ["calculateLifts"], [], ["loc", [null, [28, 8], [28, 35]]]], ["block", "if", [["get", "isCalculated", ["loc", [null, [33, 6], [33, 18]]]]], [], 0, null, ["loc", [null, [33, 0], [45, 7]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("ember-gym/templates/lift", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.0",
          "loc": {
            "source": null,
            "start": {
              "line": 2,
              "column": 0
            },
            "end": {
              "line": 6,
              "column": 0
            }
          },
          "moduleName": "ember-gym/templates/lift.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Age: ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("br");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\nBench: ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("br");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(2);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          morphs[1] = dom.createMorphAt(fragment, 4, 4, contextualElement);
          return morphs;
        },
        statements: [["content", "lift.age", ["loc", [null, [3, 5], [3, 17]]]], ["content", "lift.bench", ["loc", [null, [4, 7], [4, 21]]]]],
        locals: ["lift"],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type", "multiple-nodes"]
        },
        "revision": "Ember@2.6.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 7,
            "column": 0
          }
        },
        "moduleName": "ember-gym/templates/lift.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("Lifts!");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 3, 3, contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "each", [["get", "model", ["loc", [null, [2, 8], [2, 13]]]]], [], 0, null, ["loc", [null, [2, 0], [6, 9]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
/* jshint ignore:start */



/* jshint ignore:end */

/* jshint ignore:start */

define('ember-gym/config/environment', ['ember'], function(Ember) {
  var prefix = 'ember-gym';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

/* jshint ignore:end */

/* jshint ignore:start */

if (!runningTests) {
  require("ember-gym/app")["default"].create({"name":"ember-gym","version":"0.0.0+46f0419c"});
}

/* jshint ignore:end */
//# sourceMappingURL=ember-gym.map