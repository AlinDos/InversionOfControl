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
    
    // Логирование в файл
    var today = new Date().toLocaleTimeString();
    fs.appendFile('work.log', 
                  (today + ' | ' + fnName + ' | ' + args + '\n'),
                  function(err) {});
    
    // Task #5 Находим и оборачиваем callback
    if (typeof(args.slice(-1)[0]) == 'function') {
      var last = args.pop();
      args.push(wrapCallback(last));
    }
    return fn.apply(undefined, args);
  }
}

// Task #5 Функция обертки callback
function wrapCallback(fn) {
  return function wrapper() {
    var args = [];
    Array.prototype.push.apply(args, arguments);
    console.log('Call: callback');
    
    // Сохранение "необычных" значений в приведении аргументов к типам
    var newArgs = [];
    for (var i = 0; i < args.length; i++) {
      if (args[i]) {
        newArgs.push(typeof(args[i]));
      }
      else {
        newArgs.push(args[i] + '');
      }
    }
    console.dir(newArgs);
    
    // Логирование в файл
    var today = new Date().toLocaleTimeString();
    fs.appendFile('work.log', 
                  (today + ' | callback | ' + newArgs + '\n'),
                  function(err) {});
    
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
