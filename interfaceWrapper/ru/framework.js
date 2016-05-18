// Пример оборачивания функции в песочнице

var fs = require('fs'),
    vm = require('vm');

// Функция создания контекста-песочницы
function newSandboxFor(appName){
  var context = {
    module: {},
    console: console,
    // Помещаем ссылку на fs API в песочницу
    // Task #3 Передаем в песочницу склонированный интерфейс
    fs: cloneInterface(fs)
    // Task #2 Удаляем обертку таймера
  };
  // Преобразовываем хеш в контекст
  context.global = context;
  return vm.createContext(context);
}

// Task #3 Функция для клонирования интерфейса
function cloneInterface(anInterface) {
  var clone = {};
  for (var key in anInterface) {
    // Task #4 Применяем обертку при клонировании
    clone[key] = wrapFunction(key, anInterface[key]);
  }
  return clone;
}

// Task #4 Обертка функции, возвращает функцию-замыкание
function wrapFunction(fnName, fn) {
  return function wrapper() {
    var args = [];
    Array.prototype.push.apply(args, arguments);
    console.log('Call: ' + fnName);
    console.dir(args);
    return fn.apply(undefined, args);
  }
}

// Читаем исходный код приложения из файла
var fileName = './application.js';
fs.readFile(fileName, function(err, src) {
  
  // Создаем новую песочницу
  var sandbox = newSandboxFor(fileName);
  
  // Запускаем код приложения в песочнице
  var script = vm.createScript(src, fileName);
  script.runInNewContext(sandbox);
});
