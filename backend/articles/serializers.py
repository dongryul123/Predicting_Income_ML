from rest_framework import serializers
from .models import Article, Comment
from accounts.serializers import UserSerializer

class ArticleBodySerializer(serializers.Serializer):
    title = serializers.CharField(help_text="제목")
    content = serializers.CharField(help_text="내용")

class CommentBodySerializer(serializers.Serializer):
    content = serializers.CharField(help_text="내용")

class ArticleSerializer(serializers.ModelSerializer):
    user = UserSerializer(required=False)
    class Meta:
        model = Article
        fields = '__all__'

class ArticleListSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Article
        # fields = ['title', 'content', 'created_at', 'updated_at', 'user']
        fields = '__all__'

class CommentSerialzier(serializers.ModelSerializer):
    user = UserSerializer(required=False)
    article = ArticleSerializer(required=False)
    class Meta:
        model = Comment
        fields = '__all__'

class CommentListSerialzier(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Comment
        fields = '__all__'

class ArticleDetailSerialzier(serializers.ModelSerializer):
    user = UserSerializer()
    comments = serializers.SerializerMethodField()
    class Meta:
        model = Article
        fields = '__all__'

    def get_comments(self, request):
        comments = Comment.objects.filter(article=request).order_by('-created_at')
        serialzier = CommentListSerialzier(instance=comments, many=True)
        return serialzier.data
