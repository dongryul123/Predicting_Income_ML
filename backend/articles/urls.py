from django.urls import path
from . import views
from rest_framework.views import APIView

app_name="article"

urlpatterns = [
    path('', views.ArticleListView.as_view()),
    path('<int:article_pk>/', views.ArticleDetailView.as_view()),
    path('comments/<int:article_pk>/', views.CommentListView.as_view()),
    path('<int:comment_pk>/comments/', views.CommentDetailView.as_view()),
]