// Пример оборачивания функции в песочнице

var fs = require('fs'),
    vm = require('vm');

// Функция создания контекста-песочницы
function newSandboxFor(appName){
  var context = {
    module: {},
    console: console,
    // Помещаем ссылку на fs API в песочницу
    fs: fs
    // Task #2 Удаляем обертку таймера
  };
  // Преобразовываем хеш в контекст
  context.global = context;
  return vm.createContext(context);
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
