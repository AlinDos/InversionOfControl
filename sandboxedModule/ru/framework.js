// Файл, демонстрирующий то, как фреймворк создает среду (песочницу) для
// исполнения приложения, загружает приложение, передает ему песочницу в
// качестве глобального контекста и получает ссылу на экспортируемый
// приложением интерфейс. 

// Фреймворк может явно зависеть от библиотек через dependency lookup
// Task #2 Добавляем библиотеку util
// Добавляем path для определения имени файла
var fs = require('fs'),
    vm = require('vm'),
    util = require('util'),
    path = require('path');

// Функция создания контекста-песочницы, которая станет глобальным контекстом приложения
function newSandboxFor(appName) {
  // Task #1 Пробросили в контекст setInterval и setTimeout
  // Task #2 Пробросили в контекст util
  // Task #4 Расширяем console
  // Task #6 Пробросили в контекст require 
  var context = { module: {}, 
                 console: extendedConsoleFor(appName),
                 setInterval: setInterval,
                 setTimeout: setTimeout,
                 util: util,
                 require: extendedRequire
  };
  context.global = context;
  return vm.createContext(context);
}

// Task #4 Функция создания расширенной console
function extendedConsoleFor(appName) {
  var extendedConsole = {};
  // Task #4 Оборачиваем console.log()
  extendedConsole.log = function() {
    var time = new Date().toLocaleTimeString();
    // Format of output
    var output = appName + " | " +
                 time + " | " +
                 arguments[0];
    console.log(output);
    
    // Task #5 Параллельная запись в файл
    fs.appendFile((appName + '.log'), (output + '\n'), function(err) {
      if (err) throw err; 
    });
  };
  return extendedConsole;
}

// Task #6 Функция создания расширенной require
function extendedRequire(moduleName) {
  var time = new Date().toLocaleTimeString();
  // Format of output
  var output = time + " | " + moduleName + " is required";
  console.log(output);
  
  //Параллельная запись в файл
  var appName = path.basename(process.argv[2]);
  fs.appendFile((appName + '.log'), (output + '\n'), function(err) {
      if (err) throw err; 
    });
  return require(moduleName);
}

// Task #3 Считываем все аргументы после "node framework"
var args = process.argv.slice(2);
// Task #3 Запускаем фреймворк с каждым аргументом
args.forEach(function(fileName) {
  // Проверяем имя файла
  if (!fileName.endsWith('.js')) {
    fileName = fileName + '.js';
  }
  
  // Читаем исходный код приложения из файла
  fs.readFile(fileName, function(err, src) {
    // Тут нужно обработать ошибки
    if (err) throw err; 
    
    // Создаем новую песочницу
    var sandbox = newSandboxFor(fileName);

    // Запускаем код приложения в песочнице
    var script = vm.createScript(src, fileName);
    script.runInNewContext(sandbox);

    // Забираем ссылку из sandbox.module.exports, можем ее исполнить,
    // сохранить в кеш, вывести на экран исходный код приложения и т.д.
    
    // Task #7 Экспортируем хеш и выводим его содержимое с указанием типов
    var hashTable = sandbox.module.exports;
    for (var key in hashTable) {
      console.log(key + ' | ' + typeof(hashTable[key]));
    }
  });
});