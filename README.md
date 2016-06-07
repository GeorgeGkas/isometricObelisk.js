<img width="300" height="300" src="https://i.imgur.com/szGmEA8.png"></img>
#IsometricObelisk.js
![](https://img.shields.io/badge/version-1.0%20stable-2980b9.svg?style=flat-square) ![](https://img.shields.io/badge/ECMAScript-2015%20/%20v6-1abc9c.svg?style=flat-square) ![](https://img.shields.io/badge/license-MIT-3498db.svg?style=flat-square) 

####A JavaScript module to create isometric shapes
----------

##What this project is

 The **isometricObelisk** module allows you to create basic isometric
 (2.5D) shapes such as cube, pyramid, bricks, and more for you html
 canvas project.

##Acknowledgements

This module is based on [Obelisk.js](https://github.com/nosir/obelisk.js),  written by Max Huag ([@nosir](https://github.com/nosir/)) and [contributed by github community](https://github.com/nosir/obelisk.js/graphs/contributors). This library was further improved by me ([@GeorgeGks](https://github.com/GeorgeGks)) with the development of this add-on module. I also want to thank all the users and my teachers who reviewed that Wiki Page and Logo Image.


##Before you Start

This project make use of the [Obelisk.js](https://github.com/nosir/obelisk.js). This means you have to include the *obelisk.js* file on top of this module in your project. 

##Getting Started
###Installation

Simply include isometricObelisk.js, (located under build folder in main project page) to your project:

```html
<script src="//path/to/isometricObelisk.min.js"></script>
```

###First moves

You interface to the isometricObelisk functionality through an instance of the isometricObelisk class:

```javascript
var _isometric = new isometricObelisk({
    canvasId: 'testCanvas',
    PointX: 380,
    PointY: 430
});
```

###Create a cube shape

```javascript
_isometric.cube().position().color().render();
```

##Documentation

I did my best to create a detailed documentation on how to use this module. Please go to [Wiki Page](https://github.com/GeorgeGks/isometricObelisk.js/wiki) of this project to find how to move in this module, what each parameters mean, and to view illustated tutorials with basic and advance usage.


