Mem.js
===================

[![Build Status](https://travis-ci.org/artyomtrityak/mem.js.png?branch=master)](https://travis-ci.org/artyomtrityak/mem.js)
<a href="https://twitter.com/intent/tweet?hashtags=&original_referer=https://github.com/&text=Check+out+Mem.js+for+managing+your+Backbone.js+objects+and+functions&tw_p=tweetbutton&url=https://github.com/artyomtrityak/mem.js" target="_blank">
  <img src="http://jpillora.com/github-twitter-button/img/tweet.png"></img>
</a>


JavaScript memory management library. Works good with Backbone.js apps

## Intro

Mem.js manages functions and objects. It allows save, get and cleanup outdates instanses.


It's often for MV* framerowks to "lost" some views / models which are not using any more but still present in memory.


Also it helps reuse views / models / widgets / functions after routing.

## API

### Mem.set

Store object / function etc in Mem.js for next reusage.
If object is function creates new function instance.

If object with same name and params already exist it will be reused (new instance will not be created).


All objects were set will not be removed next manage.


####Aruments

Unique name

Function / object etc to store

Arguments to be transfered to Function


```js
var View = Backbone.View({});

var headerViewIns = Mem.set('headerView', View, {el: 'body'});
```

### Mem.get

Returns stored object from Mem.js

#### Argument

Unique name


```js
var headerViewIns = Mem.get('headerView');
```

### Mem.unset

Removes stored object from Mem.js, calls `remove` and `dispose` methods automatocally.

#### Argument

Unique name (not required)


```js
Mem.set('headerView', View, {el: 'body'});

Mem.unset('headerView');

```

Without arguments unsets all stored objects.

```js
Mem.set('headerView', View, {el: 'body'});
Mem.set('headerModel', Model, {name: 'Artyom'});

Mem.unset();
```

### Mem.reset

Unsets stored functions and creates new one with same parameters.

#### Argument

Unique name (not required)

```js
Mem.set('headerView', View, {el: 'body'});

Mem.unset('headerView');
```

Without arguments resets all stored objects.

```js
Mem.set('headerView', View, {el: 'body'});
Mem.set('headerModel', Model, {name: 'Artyom'});

Mem.reset();
```

### Mem.manage

Manages stored objects, remove outdated.

Removes all outdated objects and make them available for next cleanup.
Mem.set removes objects from next cleanup list.

Simple manage:

```js
Mem.set('headerView', View, {el: 'body'});

// headerView will not be removed
Mem.manage();

// headerView will be removed
Mem.manage();
```

Manage with set:

```js
var ins1 = Mem.set('headerView', View, {el: 'body'});

// headerView will not be removed
Mem.manage();

// new headerView instanse will not be created because Mem.js stored same fn with same params.
// Old instsnse will be returned instead
ins1 = Mem.set('headerView', View, {el: 'body'});

// headerView will not be removed
Mem.manage();

// headerView will be removed
Mem.manage();

```


## Examples

[Just Test It](https://github.com/artyomtrityak/just-test-it/blob/master/static/screens/books/main.js)

## Usage

### Require.js AMD

```js
requirejs.config({
  baseUrl: 'static/',
  urlArgs: 'bust=' +  Date.now(),
  paths: {
    underscore: 'assets/js/underscore',
    mem: 'assets/js/mem'
  },

  shim: {
    mem: {
      deps: ['underscore'],
      exports: 'Mem'
    }
  }
});
```

### CommonJS

```js
var Mem = require('mem');

```

### Old style

```html
<script src="assets/js/underscore.js" />
<script src="assets/js/mem.js" />
```

##Dependencies

- [Underscore.js](http://underscorejs.org/) or [Lo-Dash](http://lodash.com/)
