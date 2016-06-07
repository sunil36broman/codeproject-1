Projeto Laravel/AngularJS
===================

Projeto de estudos realizado feito curso com a code.education
**Requerimentos:** AngularJS 1.2+, Laravel 5.1, MySQL

## Utilizar:

1. Criar a base no mysql, e configurar o .env

    ```
    configurar o mysql no .env, e deixar o debug=true
    ```
    

2. Rodar Composer install

    ```
    composer install
    ```
    
3. Rodar Npm Install

    ```npm
    npm install
    ```

4. rodar o Bower install

    ```bower
    bower install
    ```

5. AppServiceProvider

    ```
    Desabilitar o código
    public function boot()
    {
        ProjectTask::created(function($task){
            Event::fire(new TaskWasIncluded($task));
        });
    }
    ```

6. rodar php migrate

    ```migrate
    php artisan migrate:refresh --seed
    ```

7. rodar o gulp

    ```gulp
    gulp watch-dev
    ```

#### .env:
```
APP_ENV=local
APP_DEBUG=true
APP_KEY=Gerar
```