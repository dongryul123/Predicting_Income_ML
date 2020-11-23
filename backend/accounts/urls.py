from django.urls import path
from django.conf.urls import url
from django.views.generic import TemplateView
from . import views
from django_rest_passwordreset.views import reset_password_confirm, reset_password_request_token
from .restauthviews import LogoutView, UserDetailsView, PasswordChangeView
from rest_auth.views import LoginView
from rest_auth.registration.views import RegisterView

# app_name="account"

urlpatterns=[
    path('delete/', views.user_delete, name="user_delete"),
    url(r'^password_reset/confirm/', reset_password_confirm, name="reset-password-confirm"),
    url(r'^password_reset/', reset_password_request_token, name="reset-password-request"),
    url(r'^login/', LoginView.as_view(), name="login"),
    url(r'^logout/', LogoutView.as_view(), name="logout"),
    url(r'^user/', UserDetailsView.as_view(), name="user_detail"),
    url(r'^password_change/', PasswordChangeView.as_view(), name="password-change"),
    url(r'^signup/', RegisterView.as_view(), name="signup"),
    url(r'^account_confirm_email/(?P<key>[-:\w]+)/', TemplateView.as_view(), name='account_confirm_email'),
    path('idcheck/', views.user_idcheck, name="user_idcheck"),
]