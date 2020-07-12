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

Get into the admin panel and add your permissions and groups for the selected users. I have created and assigned my user to the group "updator". You can also add a user from the panel. Run the Angular app and login into the app with the created user credentials.Try to delete a post shown from the available posts. As of now in the Backend we are checking whether the logged in user has the group "updator". If the user has the group then we allow to edit the posts. If not, we don't. 

## Development
```
Add a button for requesting permissions to edit a post for the user. We store the requests in the user table in the backend and when a admin logs in, we show a personalized page to him and we show the number of requests from the other users. If admin approved then we assign the user to "updator" group and so the user can edit the posts. If declined we don't add the group and rest is same.
```
