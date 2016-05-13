// Task #3 Ещё одно приложение для тестирования
console.log('From oneMoreApp global context');

// Task #7 Задаем хеш
module.exports = {
  variable: 'Exported variable',
  print: function() {
    console.log('Exported function');
  },
  sum: function(a, b) {
    return a + b;
  }
};