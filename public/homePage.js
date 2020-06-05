// petr@demo.ru
//  password: demo


// Выход по кнопке "Выход"
const logout = new LogoutButton();

logout.action = logoutClick => ApiConnector.logout(response =>{

if  (response.success){
    location.reload();
}});

// Заполнение формы донных пользователя

ApiConnector.current(response => {
    if  (response.success){
        ProfileWidget.showProfile(response.data);
    }});


// Получение текущих курсов валюты

const myRatesBoard = new RatesBoard;

function newStocks(){
    ApiConnector.getStocks(response => {
    if  (response.success){
        myRatesBoard.clearTable();
        myRatesBoard.fillTable(response.data)
}})
console.log('Данные по курсам валют обновились');
}
newStocks();
let timerId = setInterval(newStocks, 60000);

// Вариант 2 - получение курса валют
//  let timerId = setInterval(
//         ApiConnector.getStocks(response => {
//         if  (response.success){
//             console.log('Данные по курсам валют обновились');
//             myRatesBoard.clearTable();
//             myRatesBoard.fillTable(response.data)
//     }})
//     , 60000);



// clearInterval(timerId);

// Операции с деньгами

// Пополнение баланса
const myMoneyManager = new MoneyManager();

 myMoneyManager.addMoneyCallback = data => ApiConnector.addMoney({ currency: data.currency, amount: data.amount}, response => {
     if (response.success){
        ProfileWidget.showProfile(response.data);
        // console.log('Баланс успешно пополнен');
        myMoneyManager.setMessage("", `Кошелек успешно пополнен на ${data.amount} ${data.currency}`);
        
     }
     else{
        myMoneyManager.setMessage(isError = "Пополнить баланс не удалось", "Пополнить баланс не удалось");
     }
    });

//  Конвертация валюты:

// myMoneyManager.conversionMoneyCallback = data => console.log(data);

myMoneyManager.conversionMoneyCallback = data => ApiConnector.convertMoney({ fromCurrency: data.fromCurrency, targetCurrency: data.targetCurrency, fromAmount: data.fromAmount}, response =>{
if (response.success){
    ProfileWidget.showProfile(response.data);
    myMoneyManager.setMessage("", `Конвертация проведена`);
 }
 else{
    myMoneyManager.setMessage(isError = `Конвертация не была произведена`, `Конвертация не была произведена` );
 }
});

// Реализуйте перевод валюты:

myMoneyManager.sendMoneyCallback = data => ApiConnector.transferMoney({to: data.to, currency: data.currency, amount: data.amount }, response =>{
    if (response.success){
        ProfileWidget.showProfile(response.data);
        myMoneyManager.setMessage("", `Перевод на ${data.amount} ${data.currency} совершен`);
     }
     else{
        myMoneyManager.setMessage(isError = `Не удалось совершить перевод`, `Не удалось совершить перевод`);
     }
    });
    

// Работа с избранным

// Запрос начального списка 
const myFavoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites(response => {
    if (response.success){
        myFavoritesWidget.clearTable();
        myFavoritesWidget.fillTable(response.data);
        myMoneyManager.updateUsersList(response.data);
        myFavoritesWidget.setMessage('' ,'Список получен');
}});


// Добавление пользователя в список избранных. 

myFavoritesWidget.addUserCallback = data => ApiConnector.addUserToFavorites({id: data.id, name: data.name}, response =>{
    if (response.success){
        myFavoritesWidget.clearTable();
        myFavoritesWidget.fillTable(response.data);
        myMoneyManager.updateUsersList(response.data);
        myFavoritesWidget.setMessage("", `Пользователь ${data.name} добавлен в список избранных`);
    } else {
        myFavoritesWidget.setMessage(isError = "Не удалось добавить пользователя", "Не удалось добавить пользователя")
    }});

// Удаление пользователя из избранного

myFavoritesWidget.removeUserCallback = data => ApiConnector.removeUserFromFavorites(data, response =>{
    if (response.success){
        myFavoritesWidget.clearTable();
        myFavoritesWidget.fillTable(response.data);
        myMoneyManager.updateUsersList(response.data);
        myFavoritesWidget.setMessage("", `Пользователь удален`);
    } else {
        myFavoritesWidget.setMessage(isError = "Не удалось удалить пользователя", "Не удалось удалить пользователя")
    }});

