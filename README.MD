# char-bag

A simple, lightweight, and fast character bag implementation for Javascript.
It is designed to be used in a Node.js environment, but can be used in the browser as well.

### Installation

```bash
npm install char-bag
```

### Usage without normalization

```javascript
const Transformer = require('char-bag');

const transformer = new Transformer();

console.log(transformer.encode('Hello World!'));
```

### Output

```javascript
[
  [72, 101, 108, 108, 111],
  [87, 111, 114, 108, 100, 33],
];
```

### Usage with normalization

```javascript
const Transformer = require('char-bag');

const transformer = new Transformer({
  normalized: true,
});

console.log(transformer.encode('Hello World!'));
```

### Output

```javascript
[
  [-0.4375, -0.2109375, -0.15625, -0.15625, -0.1328125],
  [-0.3203125, -0.1328125, -0.109375, -0.15625, -0.21875, -0.7421875],
];
```

### Decode Example

```javascript
const Transformer = require('char-bag');

const transformer = new Transformer({
  normalized: true,
});

console.log(
  transformer.decode([
    [-0.4375, -0.2109375, -0.15625, -0.15625, -0.1328125],
    [-0.3203125, -0.1328125, -0.109375, -0.15625, -0.21875, -0.7421875],
  ])
);
```

### Output

```javascript
'Hello World!';
```
