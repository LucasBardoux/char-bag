// tests for char-bag module (../index.js)
// using jest (https://jestjs.io/)

const Transformer = require('../index');

describe('Transformer', () => {
  describe('constructor', () => {
    it('should create an instance of Transformer', () => {
      const transformer = new Transformer();
      expect(transformer).toBeInstanceOf(Transformer);
    });
  });

  describe('encode', () => {
    it('should encode string to charbag', () => {
      const transformer = new Transformer();
      const result = transformer.encode('Hello World!');
      expect(result).toStrictEqual([
        [72, 101, 108, 108, 111],
        [87, 111, 114, 108, 100, 33],
      ]);
    });

    it('should encode string to normalized charbag', () => {
      const transformer = new Transformer({ normalized: true });
      const result = transformer.encode('Hello World!');
      expect(result).toStrictEqual([
        [-0.4375, -0.2109375, -0.15625, -0.15625, -0.1328125],
        [-0.3203125, -0.1328125, -0.109375, -0.15625, -0.21875, -0.7421875],
      ]);
    });

    it('should encode string to flatten charbag', () => {
      const transformer = new Transformer({ flatten: true });
      const result = transformer.encode('Hello World!');
      expect(result).toStrictEqual([
        72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100, 33,
      ]);
    });

    it('should encode string to normalized flatten charbag', () => {
      const transformer = new Transformer({ normalized: true, flatten: true });
      const result = transformer.encode('Hello World!');
      expect(result).toStrictEqual([
        -0.4375, -0.2109375, -0.15625, -0.15625, -0.1328125, -1, -0.3203125,
        -0.1328125, -0.109375, -0.15625, -0.21875, -0.7421875,
      ]);
    });
  });

  describe('decode', () => {
    it('shoud decode charbag to string', () => {
      const transformer = new Transformer();
      const result = transformer.decode([
        [72, 101, 108, 108, 111],
        [87, 111, 114, 108, 100, 33],
      ]);
      expect(result).toBe('Hello World!');
    });

    it('should decode normalized charbag', () => {
      const transformer = new Transformer({ normalized: true });
      const result = transformer.decode([
        [-0.4375, -0.2109375, -0.15625, -0.15625, -0.1328125],
        [-0.3203125, -0.1328125, -0.109375, -0.15625, -0.21875, -0.7421875],
      ]);

      expect(result).toBe('Hello World!');
    });

    it('should decode flatten charbag', () => {
      const transformer = new Transformer({ flatten: true });
      const result = transformer.decode([
        72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100, 33,
      ]);

      expect(result).toBe('Hello World!');
    });

    it('should decode normalized flatten charbag', () => {
      const transformer = new Transformer({ normalized: true, flatten: true });
      const result = transformer.decode([
        -0.4375, -0.2109375, -0.15625, -0.15625, -0.1328125, -1, -0.3203125,
        -0.1328125, -0.109375, -0.15625, -0.21875, -0.7421875,
      ]);

      expect(result).toBe('Hello World!');
    });
  });
});
