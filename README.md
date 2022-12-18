# Серверная часть для проекта Movies-explorer.[ссылка](https://api.beatfilm.learnproject.nomoredomains.icu/).

### Что это? 
Бэкенд для проекта [Movies-explorer](https://beatfilm.learnproject.nomoredomains.icu/)  
в котором пользователь может находить фильмы по запросу,  
сохранять их в личном кабинете, а также менять данные своего аккаунта.

### Как это сделано?  
Бэкенд написан на Node.js с использованием express.js.  
Написано несколько обработчиков запросов, отвечающих  
за:   
 * Регистрация нового пользователя;  
 * Вход пользователя на сайт через свой существующий аккаунт;  
 * Получение данных текущего пользователя;  
 * Обновление данных пользователя; 
 * Получение списка сохраненных пользователем фильмов;
 * Добавление нового фильма в список сохраненных фильмов;  
 * Удаление фильма из списка сохраненных фильмов;  

Все роуты, кроме Регистрации и Входа защищены авторизацией.  

###
Для хранения информации о пользователях используется  
база данных MongoDB;  

###
Используются переменные окружения для более надежного хранения  
некоторых данных.  

для проверки введенных данных пользователем в полях ввода  
используются регулярные выражения.  

Реализованы обработчики ошибок в зависимости от результата  
работы запроса.    

###

[backend](https://api.beatfilm.learnproject.nomoredomains.icu/)
