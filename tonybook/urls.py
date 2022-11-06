"""tonybook URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, re_path
from website import views
from django.conf.urls.static import static
from django.conf import settings
from rest_framework.authtoken import views as auth_views


urlpatterns = [
    path('admin/', admin.site.urls),
    re_path(r'^api/posts/$', views.posts_list),
    re_path(r'^api/posts/user/(.+)$', views.posts_list),
    re_path(r'^api/posts/([0-9]+)$', views.posts_detail),
    re_path(r'^api/reactions/([0-9]+)$', views.post_reactions),
    re_path(r'^api/reactions/$', views.post_reactions),
    re_path(r'^api/reaction_types/$', views.reaction_types),
    re_path(r'^api/notifications/([0-9]+)$', views.notification_detail),
    re_path(r'^api/notifications/user/([0-9]+)$', views.user_notifications),
    re_path(r'^api/posts/([0-9]+)/comments$', views.comments),
    re_path(r'^api/users/$', views.users),
    re_path(r'^api/users/(.+)$', views.user_detail),
    re_path(r'^api/user_from_token/(.+)$', views.user_from_token),
    path('api/api-token-auth/', auth_views.obtain_auth_token),
]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)