from django.urls import path, include
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token
from . import views

from rest_framework import routers

from .views import PostView

router = routers.DefaultRouter(trailing_slash=True)
router.register('users', views.UserViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/posts/', PostView.as_view()),
    path('api/token/', obtain_jwt_token, name='token_obtain_pair'),
    path('api/token/refresh/', refresh_jwt_token, name='token_refresh'),
    path('permissions/edit', views.UserPermissions.as_view()),
    path('login/', views.Login.as_view(), name="login"),
    path('logout/', views.logoutUser, name="logout"),
]
