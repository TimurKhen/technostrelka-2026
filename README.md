# СБЕР ХАБ Нижний Новгород _by GZG Team_

Front-end для [Технострелки](https://tehnostrelka52.ru/) 
    цифровой вызов - Fullstack
Создано благодаря Angular 21.1.1, Angular Material и Capacitor

Процесс запуска.

Установите зависимости:
```bash
npm install
```

Компиляция и запуск веб версии:
---
## Dev

```bash
ng serve
```

Сервер будет запущен на `http://localhost:4200/`.

## Build 

Для билда проекта:

```bash
npm run build
```

Необходимо установить angular-http-server.

```bash
npm install -g angular-http-server
```

Перейдите в папку с приложением 
``` bash
cd dist/gzg-money/browser
``` 
Запустите
``` bash
angular-http-server --open
```

Компиляция и запуск версии под телефоны:
---

Если `capacitor` не установлен:

``` bash
npm install @capacitor/core @capacitor/cli
```

Инициализируйте capacitor
``` bash 
npx cap init
```
Рекомендуемое название: `gzgs`

(дальше просто нажимать enter)

## Android
`Необходимо иметь android studio`

``` bash
npx cap add android
```

``` bash
ng build
```

``` bash
npx cap copy
```

``` bash
npx cap sync
```

``` bash
npx cap open android
```

`Дальше компиляция через android studio.`


## IOS
`Необходимо иметь mac и XCode`
Необходимо запускать команды из sudo.

``` bash
brew install cocoapods
```

``` bash
npx cap add ios
```

``` bash
ng build
```

``` bash
npx cap copy
```

``` bash
npx cap sync ios
```

``` bash
npx cap open ios
```

`Дальше компиляция через Xcode.`
