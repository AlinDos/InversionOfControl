// Файл, демонстрирующий то, как фреймворк создает среду (песочницу) для
// исполнения приложения, загружает приложение, передает ему песочницу в
// качестве глобального контекста и получает ссылу на экспортируемый
// приложением интерфейс. 

// Фреймворк может явно зависеть от библиотек через dependency lookup
// Task #2 Добавляем библиотеку util
var fs = require('fs'),
    vm = require('vm'),
    util = require('util');

// Создаем контекст-песочницу, которая станет глобальным контекстом приложения
// Task #1 Пробросили в контекст setInterval и setTimeout
// Task #2 Пробросили в контекст util
var context = { module: {}, 
               console: console,
               setInterval: setInterval,
               setTimeout: setTimeout,
               util: util
};
context.global = context;
var sandbox = vm.createContext(context);

// Task #3 Считываем все аргументы после "node framework"
var args = process.argv.slice(2);
// Task #3 Запускаем фреймворк с каждым аргументом
args.forEach(function(fileName){
    // Task #3 Проверяем имя файла
    if (!fileName.endsWith('.js')) {
      fileName = fileName + '.js';
    }
  
    // Читаем исходный код приложения из файла
    fs.readFile(fileName, function(err, src) {
    // Тут нужно обработать ошибки

    // Запускаем код приложения в песочнице
    var script = vm.createScript(src, fileName);
    script.runInNewContext(sandbox);

    // Забираем ссылку из sandbox.module.exports, можем ее исполнить,
    // сохранить в кеш, вывести на экран исходный код приложения и т.д.
  });
});

