from django.shortcuts import render, get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from .models import Article, Comment

from .serializers import ArticleSerializer, ArticleListSerializer, ArticleDetailSerialzier, CommentListSerialzier, CommentSerialzier, ArticleBodySerializer, CommentBodySerializer
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
# Create your views here.

class ArticleListView(APIView):
    @swagger_auto_schema(response={ 200: ArticleListSerializer(many=True) })
    def get(self, request):
        """
            게시글 목록 조회
        """
        article = Article.objects.all().order_by('-created_at')
        serialzier = ArticleListSerializer(instance=article, many=True)
        return Response(serialzier.data, status=status.HTTP_200_OK)
    
    @permission_classes([IsAuthenticated])
    @swagger_auto_schema(request_body=ArticleBodySerializer, 
    manual_parameters=[openapi.Parameter("Authorization", in_=openapi.IN_HEADER, 
        description='"Token {키값}"의 형태로 토큰을 입력하세요.', type=openapi.TYPE_STRING)],
    response = {
        201 : ArticleSerializer,
        400: '잘못된 요청입니다.'
    })
    def post(self, request):
        """
            게시글 생성
        """
        serializer = ArticleSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)


class ArticleDetailView(APIView):
    def get_object(self, pk):
        return get_object_or_404(Article, pk=pk)

    @swagger_auto_schema(responses={200: ArticleDetailSerialzier })
    def get(self, request, article_pk):
        """
            게시글 조회
        """
        article = self.get_object(article_pk)
        serializer = ArticleDetailSerialzier(article)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(request_body=ArticleBodySerializer, 
    manual_parameters=[openapi.Parameter("Authorization", in_=openapi.IN_HEADER, 
        description='"Token {키값}"의 형태로 토큰을 입력하세요.', type=openapi.TYPE_STRING)],
    response = {
        200: ArticleSerializer,
        400: '잘못된 요청입니다.',
        401: '권한이 없습니다.'
    })
    @permission_classes([IsAuthenticated])
    def put(self, request, article_pk):
        """
            게시글 수정
        """
        article = self.get_object(article_pk)
        if request.user.id == article.user_id:
            serializer = ArticleSerializer(article, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(status=status.HTTP_401_UNAUTHORIZATED)
    
    @swagger_auto_schema(manual_parameters=[openapi.Parameter("Authorization", in_=openapi.IN_HEADER, 
        description='"Token {키값}"의 형태로 토큰을 입력하세요.', type=openapi.TYPE_STRING)],
    responses={
        204: 'success',
        401: '권한이 없습니다.'
    })
    @permission_classes([IsAuthenticated])
    def delete(self, request, article_pk):
        """
            게시글 삭제
        """
        article = self.get_object(article_pk)
        if request.user == article.user:
            article.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(status=status.HTTP_401_UNAUTHORIZED)

class CommentListView(APIView):
    def get_object(self, pk):
        return get_object_or_404(Article, pk=pk)

    @swagger_auto_schema(responses={ 200: CommentListSerialzier(many=True) })
    def get(self, request, article_pk):
        """
            댓글 목록 조회
        """
        comment = Comment.objects.filter(article_id=article_pk).order_by('-created_at')
        serializer = CommentListSerialzier(instance=comment, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @permission_classes([IsAuthenticated])
    @swagger_auto_schema(request_body=CommentBodySerializer, 
    manual_parameters=[openapi.Parameter("Authorization", in_=openapi.IN_HEADER, 
        description='"Token {키값}"의 형태로 토큰을 입력하세요.', type=openapi.TYPE_STRING)],
    responses={
        201: CommentSerialzier,
        400: '잘못된 요청입니다.'
    })
    def post(self, request, article_pk):
        """
            댓글 생성
        """
        serializer = CommentSerialzier(data=request.data)
        if serializer.is_valid(raise_exception=True):
            article = self.get_object(article_pk)
            serializer.save(user=request.user, article=article)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(statu=status.HTTP_400_BAD_REQUEST)

class CommentDetailView(APIView):
    def get_object(self, pk):
        return get_object_or_404(Comment, pk=pk)

    @swagger_auto_schema(responses={ 200: CommentSerialzier })
    def get(self, reqeust, comment_pk):
        """
            댓글 조회
        """
        comment = self.get_object(comment_pk)
        serializer = CommentSerialzier(comment)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @permission_classes([IsAuthenticated])
    @swagger_auto_schema(request_body=CommentBodySerializer,
    manual_parameters=[openapi.Parameter("Authorization", in_=openapi.IN_HEADER, 
        description='"Token {키값}"의 형태로 토큰을 입력하세요.', type=openapi.TYPE_STRING)],
    responses={
        201: CommentSerialzier,
        400: '잘못된 요청입니다.',
        401: '권한이 없습니다.'
    })
    def put(self, request, comment_pk):
        """
            댓글 수정
        """
        comment = self.get_object(comment_pk)
        if request.user == comment.user:
            serializer = CommentSerialzier(comment, data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    @permission_classes([IsAuthenticated])
    @swagger_auto_schema(manual_parameters=[openapi.Parameter("Authorization", in_=openapi.IN_HEADER, 
        description='"Token {키값}"의 형태로 토큰을 입력하세요.', type=openapi.TYPE_STRING)],
    responses={
        204: 'success',
        401: '권한이 없습니다.'
    })
    def delete(self, request, comment_pk):
        """
            댓글 삭제
        """
        comment = self.get_object(comment_pk)
        if request.user == comment.user:
            comment.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    