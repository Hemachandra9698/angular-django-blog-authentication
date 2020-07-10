# angular-django-blog-authentication
A small project for integrating angular 10 and django using DRF, CORS, JWT

This app consists of frontend developed on angular 10 and backend in Django.

A small application that makes REST api calls from angular to django and renders the json data onto templates received from DRF apis.

Written a custom api for checking the permissions for a user for editing a text in a table.

Also implemented a small piece of code for JWT token authentication based on djangorestframework-jwt module.

Used Angular material design for login page.

Stored the token received from the server into localstorage.


## Django Run
```cmd
cd blogpost
pip install -r requirements.txt
python manage.py runserver 8000
```
For admin login credentials are
username: admin
password: admin

After logging in you can change the permissions and groups of a user.

## Angular Run
```cmd
cd frontend
npm install
ng serve
```


