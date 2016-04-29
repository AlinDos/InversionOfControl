// Файл содержит маленький кусочек основного модуля демонстрационного
// прикладного приложения, загружаемого в песочницу демонстрационным
// кусочком фреймворка.

// Вывод из глобального контекста модуля
console.log('From application global context');

module.exports = function() {
  // Вывод из контекста экспортируемой функции
  console.log('From application exported function');
};

// Task #1 Выводим setInterval и setTimeout
setInterval(function(){
  console.log('setInterval');
}, 500);
setTimeout(function(){
  console.log('setTimeout');
}, 1500);

// Task #2 Используем пару функций util
var today = new Date();
console.log(today + 
            "\n util.isDate: " + util.isDate(today) +
            "\n util.isNumber: " + util.isNumber(today) +
            "\n util.isPrimitive " + util.isPrimitive(today));