// Вывод из глобального контекста модуля
console.log('From application global context');

// Task #2 Удаляем вызов таймера и добавляем работу с файлом
function read() {
  fs.readFile('README.md', function(err, src) {});
}

// Task #6 Добавление ещё одной fs-функции
function write() {
  fs.appendFile('message.txt', 'data to append ');
}

// Task #7 Добавляем таймеры на функции
setInterval(read, 6000);
setInterval(write, 4000);