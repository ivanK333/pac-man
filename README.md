# [Браузерная игра "Pac-man"](https://sprint-6--silver-beignet-543180.netlify.app/game)
Реализована в рамках курса ["Мидл фронтенд-разработчик"](https://practicum.yandex.ru/middle-frontend/) от Яндекс-практикум.

[Макет игры](https://www.figma.com/file/nkYREB7Z1jGgTfgTREfjVg/pacman?type=design&node-id=0-1&mode=design&t=mbv4aOLVpyIENO5y-0)

[Видео-демонстрация](https://www.loom.com/share/edcd20f603f448d69f80c758a56375c5?sid=8bae34a8-ee0f-4782-9990-ed8fd49705cf) работы за 5-6 спринт

![image](https://github.com/ivanK333/pac-man/assets/108727043/9162237a-0dc5-4f85-aaff-fdabfaf63049)

## О проекте 
Учебный проект включает в себя групповую работу по созданию браузерной игры, с возможностью участникам игы следить за своим прогрессом, продвижением по доске игроков и общаться на форуме. 

## Описание 
Pac-Man — одна из знаковых видеоигр всех времен.

Большинство людей (даже не геймеров) по крайней мере знакомы с ней. Цель игры очень проста — игрок находится в лабиринте, наполненном «едой» (изображенной в виде точек), и ему нужно съесть их все, чтобы пройти на следующий уровень. Задачу осложняют четыре призрака, преследующих пэкмена. Если пэкмен встретится с одним из привидений, он теряет жизнь и возвращается на начало, так же как съеденные им точки.

## Функционал игры
- Игрок может управлять пэкменом с помошью клавиш ↑ , ↓ , ← , →
- Реализован подсчет съеденной пэкменом еды
- Духи способны двигаться по своим базовым траекториям
- При контакте духа и пэкмена, пэкмен умирает.
  
### Как запускать?

1. Убедитесь что у вас установлен `node` и `docker`
2. Выполните команду `yarn bootstrap` - это обязательный шаг, без него ничего работать не будет :)
3. Выполните команду `yarn dev`
3. Выполните команду `yarn dev --scope=client` чтобы запустить только клиент
4. Выполните команду `yarn dev --scope=server` чтобы запустить только server


### Как добавить зависимости?
В этом проекте используется `monorepo` на основе [`lerna`](https://github.com/lerna/lerna)

Чтобы добавить зависимость для клиента 
```yarn lerna add {your_dep} --scope client```

Для сервера
```yarn lerna add {your_dep} --scope server```

И для клиента и для сервера
```yarn lerna add {your_dep}```


Если вы хотите добавить dev зависимость, проделайте то же самое, но с флагом `dev`
```yarn lerna add {your_dep} --dev --scope server```


### Тесты

Для клиента используется [`react-testing-library`](https://testing-library.com/docs/react-testing-library/intro/)

```yarn test```

### Линтинг

```yarn lint```

### Форматирование prettier

```yarn format```

### Production build

```yarn build```

И чтобы посмотреть что получилось


`yarn preview --scope client`
`yarn preview --scope server`

## Хуки
В проекте используется [lefthook](https://github.com/evilmartians/lefthook)
Если очень-очень нужно пропустить проверки, используйте `--no-verify` (но не злоупотребляйте :)

## Ой, ничего не работает :(

Откройте issue, я приду :)

## Автодеплой статики на vercel
Зарегистрируйте аккаунт на [vercel](https://vercel.com/)
Следуйте [инструкции](https://vitejs.dev/guide/static-deploy.html#vercel-for-git)
В качестве `root directory` укажите `packages/client`

Все ваши PR будут автоматически деплоиться на vercel. URL вам предоставит деплоящий бот

## Production окружение в докере
Перед первым запуском выполните `node init.js`


`docker compose up` - запустит три сервиса
1. nginx, раздающий клиентскую статику (client)
2. node, ваш сервер (server)
3. postgres, вашу базу данных (postgres)

Если вам понадобится только один сервис, просто уточните какой в команде
`docker compose up {sevice_name}`, например `docker compose up server`
