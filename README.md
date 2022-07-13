# movies-explorer-api



## Ссылка на api

https://amir.movies-explorer.nomoreparties.sbs/api



## Эндпоинты:


### Пользователь

* Регистрация пользователя

  ссылка - ``` /signup ```

  метод запроса - ``` POST ```

  тело запроса - ``` { email: "string, required, email", name: "string, required, min - 2, max - 2 ", password: "required, string"  } ```

  ответ - ``` { email: "string", name: "string" } ```

* Авторизация пользователя

  ссылка - ``` /signin ``` 

  метод запроса - ``` POST ```

  тело запроса - ``` { email: string, password: string  } ```

  ответ - ``` { message: "string", token: "string" } ```

* Получение данных пользователя

  ссылка - ``` /users/me ``` 

  метод запроса - ``` GET ```

  заголовки - ``` Authorization - "Bearer $token" ```

  ответ - ``` { email: "string", name: "string" } ```

* Редактирование данных пользователя

  ссылка - ``` /users/me``` 

  метод запроса - ``` PATCH ```

  тело запроса - ``` { email: string, name: string } ```

  заголовки - ``` Authorization - "Bearer $token" ```

  ответ - ``` { email: string, name: string } ```


### Фильмы

* Получение всех фильмов

  ссылка - ``` /movies ``` 

  метод запроса - ``` GET ```

  заголовки - ``` Authorization - "Bearer $token" ```

  ответ - ``` [<{ country: string, director: string, duration: number, year: string, description: string, image: string, trailerLink: string, thumbnail: string, movieId: number, nameRU: string, nameEN: string }>] ```

* Добавление фильма

  ссылка - ``` /movies ``` 

  метод запроса - ``` POST ```

  тело запроса - ``` { country: string, director: string, duration: number, year: string, description: string, image: string, trailerLink: string, thumbnail: string, movieId: number, nameRU: string, nameEN: string } ```

  заголовки - ``` Authorization - "Bearer $token" ```

  ответ - ``` [{ country: string, director: string, duration: number, year: string, description: string, image: string, trailerLink: string, thumbnail: string, movieId: number, nameRU: string, nameEN: string }] ```

* Удаление фильма

  ссылка - ``` /movies:movieId ``` 

  метод запроса - ``` POST ```

  данные - ``` { movieId: number  } ```

  ответ - ``` { country: string, director: string, duration: number, year: string, description: string, image: string, trailerLink: string, thumbnail: string, movieId: number, nameRU: string, nameEN: string } ```
