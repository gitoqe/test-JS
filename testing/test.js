/*		Задача №2
Необходимо разработать javascript-компонент для сортировки таблиц с данными.

Функционал

	1. Сортировка по столбцам: при нажатии на название столбца строки таблицы сортируются по возрастанию, при повторном клике - по убыванию. Графическим элементом или текстовым сообщением указывается направление сортировки.
	2. Клиентская пагинация: данные необходимо отображать постранично, максимум 50 элементов на страницу. Необходимо предоставить пользовательскую навигацию для перехода по страницам.
	3. Фильтрация: компонент предоставляет текстовое поле, в которое пользователь может ввести текст и строки таблицы, данные которых не содержат подстроку, введённую пользователем, скрываются. Перефильтрация осуществляется по нажатию на кнопку Найти.
	4. По клике на строку таблицы значения полей выводятся в дополнительном блоке под таблицей.
	5. Данные в таблицу загружаются с сервера. Способ загрузки с сервера на ваш выбор.

	Для демонстрации работы компонента необходимо сделать простую HTML страницу. Пользователю предлагается выбрать набор данных: маленький или большой. При выборе набора данных он загружается с сервера и по данным строится таблица.

Формат данных от сервера

Сервер возвращает JSON-массив данных. Пример данных:

[
	{
		id: 101,
		firstName: "Sue",
		lastName: "Corson",
		email: "DWhalley@in.gov",
		phone: "(612)211-6296",
		adress: {
			streetAddress: "9792 Mattis Ct",
			city: "Waukesha",
			state: "WI",
			zip: "22178"
		},
		description: "et lacus magna dolor..."
	}
}
Маленький объем данных берется по ссылке http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&adress={addressObject}&description={lorem|32}

Большой объем данных берется по ссылке http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&adress={addressObject}&description={lorem|32}

Замечания

	1. Особое внимание следует уделить скорости работы. Зависание интерфейса при выполнении операций загрузки данных, фильтрации, сортировки недопустимо.
	2. Во время загрузки данных стоит показать какой-то индикатор
	3. Разрешённые библиотеки: jQuery, Lodash/Underscore, Backbone, самописный. Но вам придется объяснить выбор и причину использования. Использование сторонних библиотек будет плюсом только в случае если это оправданно и вы сможете объяснить причину выбора. Показав свои знания в грамотном применении сторонних готовых решений, вы имеете шанс повысить свою профессиональную привлекательность для нас.
	4. Пишите код так, как бы вы его писали в работе - внутренности задания будут оцениваться даже тщательней, чем внешнее соответствие заданию. Код 5.должен быть организован так, чтобы его можно было заново использовать.
	5. Помните про обработку ошибок!
	6. Верстка может быть самая простая. Визуализацию и украшение делаете на ваш вкус. Мы не против использования http://getbootstrap.com/ или похожего UI фреймворк, но только для UI представления (нельзя использовать JS код для решения задачи, но можно использовать для оформительских эффектов(анимации и тому подобное))!
Дополнительным плюсом будет:

Использование TypeScript или ES6+(babel).
Схема визуального представления данных

	+------+------------+-----------------+-----------------+---------------+
	| id ▲ | firstName ▼| lastName      ▼ | email          ▼| phone        ▼|
	+------+------------+-----------------+-----------------+---------------+
	| 101  | Sue        | Corson          | DWhalley@in.gov | (612)211-6296 |
	+------+------------+-----------------+-----------------+---------------+
	| 102  | Lor        | Ipsumd          | dwhalley@in.gov | (612)211-6296 |
	+------+------------+-----------------+-----------------+---------------+
	| 103  | Ips        | Umdolo          | dwhalley@in.gov | (612)211-6296 |
	+------+------------+-----------------+-----------------+---------------+

	Если выбран пользователем с id = 101 , то под таблицей выводим следующую информацию:

	Выбран пользователь <b>Sue Corson</b>
	Описание:
	<textarea>
	et lacus magna dolor...
	</textarea>
	Адрес проживания: <b>9792 Mattis Ct</b>
	Город: <b>Waukesha</b>
	Провинция/штат: <b>WI</b>
	Индекс: <b>22178</b>
	Дополнительно напишите нам, как вы тестировали результат своей работы. Какие используете инструменты и как вы осуществляете тестирование.
*/

// http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&adress={addressObject}&description={lorem|32}

// частично по гайду: https://developer.mozilla.org/ru/docs/Learn/JavaScript/%D0%9E%D0%B1%D1%8A%D0%B5%D0%BA%D1%82%D1%8B/JSON

let requestURL = "http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&adress={addressObject}&description={lorem|32}";


let requestJSON = new XMLHttpRequest();	// новый экземпляр объекта запроса из конструктора XMLHttpRequest

requestJSON.open('GET', requestURL);

requestJSON.responseType = 'json'; //устанавливаем responseType в JSON, так что XHR знает, что сервер будет возвращать JSON и, что это должно быть преобразовано за кулисами в объект JavaScript
requestJSON.send();	// Запрос

let userData;

requestJSON.onload = function() {	// при упешном выполнении запроса и загрузке ответа выполняется функция
	userData = requestJSON.response;	// заполнение переменной
	console.log(userData)
}

/*
	+------+------------+-----------------+-----------------+---------------+
	| id ▲ | firstName ▼| lastName      ▼ | email          ▼| phone        ▼|
	+------+------------+-----------------+-----------------+---------------+
	| 101  | Sue        | Corson          | DWhalley@in.gov | (612)211-6296 |
	+------+------------+-----------------+-----------------+---------------+
	| 102  | Lor        | Ipsumd          | dwhalley@in.gov | (612)211-6296 |
	+------+------------+-----------------+-----------------+---------------+
	| 103  | Ips        | Umdolo          | dwhalley@in.gov | (612)211-6296 |
	+------+------------+-----------------+-----------------+---------------+
*/

/*
let dataHtmlTable = document.querySelector('.dataTable');
function makeHtmlTable(jsonObj){
	jsonObj.forEach(elementRow => {
		let tableRow = document.createElement('tr');
		
		let tableCell;
		elementRow.forEach(elementCell => {
			tableCell = document.createElement('td');
			tableCell.textContent = elementCell;
			tableRow.appendChild(tableCell);
		});
		for (let j = 0; j < jsonObj[i].length; j++) {
			
		}
		dataHtmlTable.appendChild(tableRow);
	});
	for (let i = 0; i < jsonObj.length; i++) {
		
	}
}
makeHtmlTable(userData);
makeHtmlTable(userData);

function populateHeader(jsonObj) {
	var myH1 = document.createElement('h1');
	myH1.textContent = jsonObj['squadName'];
	header.appendChild(myH1);
  
	var myPara = document.createElement('p');
	myPara.textContent = 'Hometown: ' + jsonObj['homeTown'] + ' // Formed: ' + jsonObj['formed'];
	header.appendChild(myPara);
  }*/