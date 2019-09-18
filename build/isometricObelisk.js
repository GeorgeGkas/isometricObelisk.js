/*
 * George Gkasdrogkas - georgegkas@gmail.com
 * Version: 1.1.0 (currently stable), 7/6/2016
 * License: MIT
 * Project Page: https://github.com/GeorgeGkas/isometricObelisk.js
 * Documentation Page: https://github.com/GeorgeGkas/isometricObelisk.js/wiki
 */

var isometricObelisk = (function() {
  "use strict";

  var _DOM = {
    canvas: null,
    PointX: 200,
    PointY: 200,
    pixelView: null
  };

  var _OBJECT = {
    tag: null, // 'cube', 'pyramid', 'brick', 'sideX', 'slope*'
    finalPosition: null,
    position: {
      x: 0,
      y: 0,
      z: 0
    },
    finalDimension: null,
    dimension: {
      x: 80,
      y: 80,
      z: 80
    },
    border: true,
    finalColor: null,
    colorValues: {
      state: "full", // 'side'
      general: 0xeeeeee,
      top: 0xeeeeee,
      side: 0xeeeeee,
      front: 0xeeeeee
    }
  };

  // Constructor
  function isometricObelisk(canvasDOM) {
    _DOM.canvas = document.getElementById(canvasDOM.canvasId);
    _DOM.PointX = canvasDOM.PointX;
    _DOM.PointY = canvasDOM.PointY;

    var point = new obelisk.Point(_DOM.PointX, _DOM.PointY);

    _DOM.pixelView = new obelisk.PixelView(_DOM.canvas, point);
  }

  // Purpose: Checks if a parameter was added by the user
  // Return: true/false
  var _isParam = (param, obj) => {
    "use strict";
    if (obj.hasOwnProperty(param)) {
      if (obj[param].length !== 0) {
        return true;
      }
    }
    return false;
  };

  // Purpose: Returns Hex color from given rgb string
  // Return format: 0x??????
  function colorToHex(color) {
    "use strict";
    if (color[0] == "#" && color) {
      return parseInt("0x" + color.substr(1, 6).toString(16), 16);
    } else {
      return 0xeeeeee;
    }
  }

  var _setColorValues = function(fullPaint, sidePaint) {
    if (fullPaint != "custom") {
      _OBJECT.colorValues.state = "full";
      _OBJECT.colorValues.general = colorToHex(fullPaint);
    } else if (sidePaint != undefined) {
      _OBJECT.colorValues.state = "side";
      if (_isParam("top", sidePaint)) {
        _OBJECT.colorValues.top = colorToHex(sidePaint.top);
      }
      if (_isParam("side", sidePaint)) {
        _OBJECT.colorValues.side = colorToHex(sidePaint.side);
      }
      if (_isParam("front", sidePaint)) {
        _OBJECT.colorValues.front = colorToHex(sidePaint.front);
      }
    }
  };

  var _setDimensionValues = function(opt) {
    if (opt) {
      if (_isParam("x", opt)) {
        _OBJECT.dimension.x = opt.x;
      }
      if (_isParam("y", opt)) {
        _OBJECT.dimension.y = opt.y;
      }
      if (_isParam("z", opt)) {
        _OBJECT.dimension.z = opt.z;
      }
      if (_isParam("border", opt)) {
        _OBJECT.border = opt.border;
      }
    }
  };

  var _paintObject = function() {
    if (_OBJECT.tag == "cube") {
      if (_OBJECT.colorValues.state == "full") {
        _OBJECT.finalColor = new obelisk.CubeColor().getByHorizontalColor(
          _OBJECT.colorValues.general
        );
      } else {
        _OBJECT.finalColor = new obelisk.CubeColor(
          0x77000000,
          0x77000000,
          _OBJECT.colorValues.front,
          _OBJECT.colorValues.side,
          _OBJECT.colorValues.top
        );
      }
    } else if (_OBJECT.tag == "pyramid") {
      if (_OBJECT.colorValues.state == "full") {
        _OBJECT.finalColor = new obelisk.PyramidColor().getByRightColor(
          _OBJECT.colorValues.general
        );
      } else {
        _OBJECT.finalColor = new obelisk.PyramidColor(
          _OBJECT.colorValues.top,
          _OBJECT.colorValues.top,
          _OBJECT.colorValues.front,
          _OBJECT.colorValues.side
        );
      }
    } else if (_OBJECT.tag == "sideX" || _OBJECT.tag == "sideY") {
      if (_OBJECT.colorValues.state == "full") {
        _OBJECT.finalColor = new obelisk.SideColor().getByInnerColor(
          _OBJECT.colorValues.general
        );
      } else {
        _OBJECT.finalColor = new obelisk.SideColor(
          _OBJECT.colorValues.side,
          _OBJECT.colorValues.front
        );
      }
    } else if (_OBJECT.tag == "brick") {
      if (_OBJECT.colorValues.state == "full") {
        _OBJECT.finalColor = new obelisk.SideColor().getByInnerColor(
          _OBJECT.colorValues.general
        );
      } else {
        _OBJECT.finalColor = new obelisk.SideColor(
          _OBJECT.colorValues.side,
          _OBJECT.colorValues.top
        );
      }
    } else if (_OBJECT.tag == "slopeNorth") {
      if (_OBJECT.colorValues.state == "full") {
        _OBJECT.finalColor = new obelisk.SlopeColor().getByHorizontalColor(
          _OBJECT.colorValues.general
        );
      } else {
        _OBJECT.finalColor = new obelisk.SlopeColor(
          _OBJECT.colorValues.top,
          _OBJECT.colorValues.top,
          _OBJECT.colorValues.side,
          _OBJECT.colorValues.front
        );
      }
    } else if (_OBJECT.tag == "slopeEast") {
      if (_OBJECT.colorValues.state == "full") {
        _OBJECT.finalColor = new obelisk.SlopeColor().getByHorizontalColor(
          _OBJECT.colorValues.general
        );
      } else {
        _OBJECT.finalColor = new obelisk.SlopeColor(
          _OBJECT.colorValues.front,
          0x77000000,
          _OBJECT.colorValues.side,
          0x77000000
        );
      }
    } else if (_OBJECT.tag == "slopeSouth") {
      if (_OBJECT.colorValues.state == "full") {
        _OBJECT.finalColor = new obelisk.SlopeColor().getByHorizontalColor(
          _OBJECT.colorValues.general
        );
      } else {
        _OBJECT.finalColor = new obelisk.SlopeColor(
          _OBJECT.colorValues.top,
          _OBJECT.colorValues.top,
          0x77000000,
          _OBJECT.colorValues.front,
          _OBJECT.colorValues.side
        );
      }
    } else if (_OBJECT.tag == "slopeWest") {
      if (_OBJECT.colorValues.state == "full") {
        _OBJECT.finalColor = new obelisk.SlopeColor().getByHorizontalColor(
          _OBJECT.colorValues.general
        );
      } else {
        _OBJECT.finalColor = new obelisk.SlopeColor(
          _OBJECT.colorValues.top,
          _OBJECT.colorValues.top,
          _OBJECT.colorValues.side,
          _OBJECT.colorValues.front
        );
      }
    }
  };

  isometricObelisk.prototype.cube = function(Cube3d) {
    _OBJECT.tag = "cube";
    _setDimensionValues(Cube3d);

    _OBJECT.finalDimension = new obelisk.CubeDimension(
      _OBJECT.dimension.x,
      _OBJECT.dimension.y,
      _OBJECT.dimension.z
    );

    return this;
  };

  isometricObelisk.prototype.brick = function(Brick3d) {
    _OBJECT.tag = "brick";
    _setDimensionValues(Brick3d);

    _OBJECT.finalDimension = new obelisk.BrickDimension(
      _OBJECT.dimension.x,
      _OBJECT.dimension.y
    );

    return this;
  };

  isometricObelisk.prototype.pyramid = function(Pyramid3d = {}) {
    _OBJECT.tag = "pyramid";
    _setDimensionValues(Pyramid3d);

    if (Pyramid3d.hasOwnProperty("z") && Pyramid3d.z) {
      _OBJECT.finalDimension = new obelisk.PyramidDimension(
        _OBJECT.dimension.x,
        Pyramid3d.z
      );
    } else {
      _OBJECT.finalDimension = new obelisk.PyramidDimension(
        _OBJECT.dimension.x
      );
    }

    return this;
  };

  isometricObelisk.prototype.sideX = function(SideX3d) {
    _OBJECT.tag = "sideX";
    _setDimensionValues(SideX3d);

    _OBJECT.finalDimension = new obelisk.SideXDimension(
      _OBJECT.dimension.x,
      _OBJECT.dimension.y
    );

    return this;
  };

  isometricObelisk.prototype.sideY = function(SideY3d) {
    _OBJECT.tag = "sideY";
    _setDimensionValues(SideY3d);

    _OBJECT.finalDimension = new obelisk.SideYDimension(
      _OBJECT.dimension.x,
      _OBJECT.dimension.y
    );

    return this;
  };

  isometricObelisk.prototype.slopeNorth = function(slopeNorth3d) {
    _OBJECT.tag = "slopeNorth";
    _setDimensionValues(slopeNorth3d);

    _OBJECT.finalDimension = new obelisk.SlopeDimension(
      _OBJECT.dimension.x,
      _OBJECT.dimension.y
    );

    return this;
  };

  isometricObelisk.prototype.slopeEast = function(slopeEast3d) {
    _OBJECT.tag = "slopeEast";
    _setDimensionValues(slopeEast3d);

    _OBJECT.finalDimension = new obelisk.SlopeDimension(
      _OBJECT.dimension.x,
      _OBJECT.dimension.y
    );

    return this;
  };

  isometricObelisk.prototype.slopeSouth = function(slopeSouth3d) {
    _OBJECT.tag = "slopeSouth";
    _setDimensionValues(slopeSouth3d);

    _OBJECT.finalDimension = new obelisk.SlopeDimension(
      _OBJECT.dimension.x,
      _OBJECT.dimension.y
    );

    return this;
  };

  isometricObelisk.prototype.slopeWest = function(slopeWest3d) {
    _OBJECT.tag = "slopeWest";
    _setDimensionValues(slopeWest3d);

    _OBJECT.finalDimension = new obelisk.SlopeDimension(
      _OBJECT.dimension.x,
      _OBJECT.dimension.y
    );

    return this;
  };

  isometricObelisk.prototype.position = function(Coordinates) {
    if (Coordinates != undefined) {
      _OBJECT.position.x = Coordinates.x;
      _OBJECT.position.y = Coordinates.y;
      _OBJECT.position.z = Coordinates.z;
    } else {
      _OBJECT.position.x = 200;
      _OBJECT.position.y = 120;
      _OBJECT.position.z = 0;
    }

    _OBJECT.finalPosition = new obelisk.Point3D(
      _OBJECT.position.x,
      _OBJECT.position.y,
      _OBJECT.position.z
    );

    return this;
  };

  isometricObelisk.prototype.color = function(fullPaint, sidePaint) {
    _OBJECT.colorValues.state = "full";
    _OBJECT.colorValues.general = 0xeeeeee;
    _OBJECT.colorValues.top = 0xeeeeee;
    _OBJECT.colorValues.sidse = 0xeeeeee;
    _OBJECT.colorValues.state = 0xeeeeee;

    if (arguments.length > 0) {
      _setColorValues(fullPaint, sidePaint);
    }
    _paintObject();

    return this;
  };

  isometricObelisk.prototype.render = function() {
    var shapeObj = null;
    if (_OBJECT.tag == "cube") {
      shapeObj = new obelisk.Cube(
        _OBJECT.finalDimension,
        _OBJECT.finalColor,
        _OBJECT.border
      );
    } else if (_OBJECT.tag == "brick") {
      shapeObj = new obelisk.Brick(
        _OBJECT.finalDimension,
        _OBJECT.finalColor,
        _OBJECT.border
      );
    } else if (_OBJECT.tag == "pyramid") {
      shapeObj = new obelisk.Pyramid(
        _OBJECT.finalDimension,
        _OBJECT.finalColor,
        _OBJECT.border
      );
    } else if (_OBJECT.tag == "sideX") {
      shapeObj = new obelisk.SideX(
        _OBJECT.finalDimension,
        _OBJECT.finalColor,
        _OBJECT.border
      );
    } else if (_OBJECT.tag == "sideY") {
      shapeObj = new obelisk.SideY(
        _OBJECT.finalDimension,
        _OBJECT.finalColor,
        _OBJECT.border
      );
    } else if (_OBJECT.tag == "slopeNorth") {
      shapeObj = new obelisk.SlopeNorth(
        _OBJECT.finalDimension,
        _OBJECT.finalColor,
        _OBJECT.border
      );
    } else if (_OBJECT.tag == "slopeEast") {
      shapeObj = new obelisk.SlopeEast(
        _OBJECT.finalDimension,
        _OBJECT.finalColor,
        _OBJECT.border
      );
    } else if (_OBJECT.tag == "slopeSouth") {
      shapeObj = new obelisk.SlopeSouth(
        _OBJECT.finalDimension,
        _OBJECT.finalColor,
        _OBJECT.border
      );
    } else if (_OBJECT.tag == "slopeWest") {
      shapeObj = new obelisk.SlopeWest(
        _OBJECT.finalDimension,
        _OBJECT.finalColor,
        _OBJECT.border
      );
    }

    _DOM.pixelView.renderObject(shapeObj, _OBJECT.finalPosition);

    return this;
  };

  isometricObelisk.prototype.clear = function() {
    _DOM.pixelView.clear();
  };

  return isometricObelisk;
})();
