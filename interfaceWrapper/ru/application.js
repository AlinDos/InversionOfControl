// Вывод из глобального контекста модуля
console.log('From application global context');

// Task #2 Удаляем вызов таймера и добавляем работу с файлом
var fileName = './README.md';
console.log('Application going to read ' + fileName);
fs.readFile(fileName, function(err, src) {
  console.log('File ' + fileName + ' size ' + src.length);
});


// Task #6 Добавление ещё одной fs-функции
fs.appendFile('message.txt', 'data to append', function(err) {
  console.log('The "data to append" was appended to file!');
});