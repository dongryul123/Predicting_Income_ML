from django.shortcuts import render

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from django.http import HttpResponse
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

from .models import User
#django_rest_passwordreset
from django.core.mail import EmailMultiAlternatives
from django.dispatch import receiver
from django.template.loader import render_to_string
from django.urls import reverse

from django_rest_passwordreset.signals import reset_password_token_created
# Create your views here.

from pandas import Series, DataFrame
from category_encoders.ordinal import OrdinalEncoder
import joblib
import numpy as np # linear algebra
import pandas as pd # data processing, CSV file I/O (e.g. pd.read_csv)

@swagger_auto_schema(method='delete', manual_parameters=[openapi.Parameter('Authorization', in_=openapi.IN_HEADER, 
    description='"Token {키값}"의 형태로 토큰을 입력하세요.', type=openapi.TYPE_STRING)])
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def user_delete(request):
    """
        회원 탈퇴
    """
    request.user.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

## django rest passowrreset
@receiver(reset_password_token_created)
def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):
    """
    Handles password reset tokens
    When a token is created, an e-mail needs to be sent to the user
    :param sender: View Class that sent the signal
    :param instance: View Instance that sent the signal
    :param reset_password_token: Token Model Object
    :param args:
    :param kwargs:
    :return:
    """
    # send an e-mail to the user
    context = {
        'current_user': reset_password_token.user,
        'username': reset_password_token.user.username,
        'email': reset_password_token.user.email,
        'reset_password_url': reset_password_token.key,
    }

    # render email text
    email_html_message = render_to_string('accounts/user_reset_password.html', context)
    email_plaintext_message = render_to_string('accounts/user_reset_password.txt', context)

    msg = EmailMultiAlternatives(
        # title:
        "Password Reset for <프로젝트명>",
        # message:
        email_plaintext_message,
        # from:
        'ssafy3pjt@gmail.com',
        # to:
        [reset_password_token.user.email]
    )
    msg.attach_alternative(email_html_message, "text/html")
    msg.send()


@swagger_auto_schema(method='post', request_body=openapi.Schema(type=openapi.TYPE_OBJECT, 
    properties={'username' : openapi.Schema(type=openapi.TYPE_STRING, description="username")}))
@api_view(['POST'])
def user_idcheck(request):
    """
        username 중복 체크
    """
    if User.objects.filter(username=request.data.get('username')).exists():
        return Response(status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(status=status.HTTP_200_OK)

def test(request):
    return render(request, "test.html", {})


## 모델링 테스트
def modeling():
    # This Python 3 environment comes with many helpful analytics libraries installed
# It is defined by the kaggle/python Docker image: https://github.com/kaggle/docker-python
# For example, here's several helpful packages to load

    # 시각화 라이브러리
    import matplotlib as mpl
    import matplotlib.pyplot as plt
    import seaborn as sns

    # 모델링 라이브러리
    from sklearn.model_selection import KFold
    from lightgbm import LGBMClassifier

    # 기타 라이브러리
    import random
    import gc
    import os
    train = pd.read_csv('accounts/templates/train.csv')
    test = pd.read_csv('accounts/templates/test.csv')
    sample_submission = pd.read_csv('accounts/templates/sample_submission.csv')
    train_and_test = [train, test]
    print("HI!")
    print(type(train['education_num'][0]))

    train.drop(['id'], axis=1, inplace=True)
    test.drop(['id'], axis=1, inplace=True)

    y = train['income'] != '<=50K'
    X = train.drop(['income'], axis=1)

    LE_encoder = OrdinalEncoder(list(X.columns))
    X = LE_encoder.fit_transform(X, y)
    test = LE_encoder.transform(test)

    NFOLDS = 5
    folds = KFold(n_splits=NFOLDS)

    columns = X.columns
    splits = folds.split(X, y)
    y_preds = np.zeros(test.shape[0])

    feature_importances = pd.DataFrame()
    feature_importances['feature'] = columns

    model = LGBMClassifier(objective='binary', verbose=400, random_state=91)


    for fold_n, (train_index, valid_index) in enumerate(splits):
        print('Fold: ', fold_n+1)
        X_train, X_valid = X.iloc[train_index], X.iloc[valid_index]
        y_train, y_valid = y.iloc[train_index], y.iloc[valid_index]

        evals = [(X_train, y_train), (X_valid, y_valid)]
        model.fit(X_train, y_train, eval_metric='accuracy', eval_set=evals, verbose=True)
        
        feature_importances[f'fold_{fold_n + 1}'] = model.feature_importances_
            
        y_preds += model.predict(test).astype(int) / NFOLDS
        
        del X_train, X_valid, y_train, y_valid
        gc.collect()

    sample_submission['prediction'] = y_preds

    for ix, row in sample_submission.iterrows():
        if row['prediction'] > 0.5:
            sample_submission.loc[ix, 'prediction'] = 1
        else:
            sample_submission.loc[ix, 'prediction'] = 0

    joblib.dump(model, 'model.pkl')
    #Our_Model = joblib.load('model.pkl')
    # sample_submission = sample_submission.astype({"prediction": int})
    # sample_submission.to_csv('submission001.csv', index=False)
    # return render(request, "train.html")
    return joblib.load('model.pkl')

Our_Model = modeling() # 한 번만 실행되는건가..? 

def train(request):
    
    #a = Cal(40, 1, 114537, 13, 11, 1, 10, 1, 1, 1, 0, 0, 50, 1)
    # a = {'age':[40], 'workclass':['Private'], 'fnlwgt':[114537], 'education':['Assoc-voc'], 'education_num':[11], 'marital_status':['Married-civ-spouse'], 
    #     'occupation':['Exec-managerial'], 'relationship':['Husband'], 'race':['White'], 'sex':['Male'], 'capital_gain':[0], 'capital_loss':[0], 'hours_per_week':[50],
    #     'native_country':['United-States']}
    # a = DataFrame(a)

    # train = pd.read_csv('accounts/templates/train.csv')
    # train.drop(['id'], axis=1, inplace=True)
    # X = train.drop(['income'], axis=1)
    # y = train['income'] != '<=50K'
    # LE_encoder = OrdinalEncoder(list(X.columns))
    # X = LE_encoder.fit_transform(X, y)
    # a = LE_encoder.transform(a)
    #print(B)
    print("정확도 : ", Cal(40, 'Private', 114537, 'Assoc-voc', 11, 'Married-civ-spouse', 'Exec-managerial', 'Husband', 'White', 'Male', 0, 0, 50, 'United-States'))


    #
    return render(request, "train.html")

def Cal(age, workclass, fnlwgt, education, education_num, marital_status, occupation, relationship, race, sex, capital_gain, capital_loss, hours_per_week, native_country):
    a = {'age':[age], 'workclass':[workclass], 'fnlwgt':[fnlwgt], 'education':[education], 'education_num':[education_num], 'marital_status':[marital_status], 
        'occupation':occupation, 'relationship':relationship, 'race':race, 'sex':sex, 'capital_gain':capital_gain, 'capital_loss':capital_loss, 'hours_per_week':hours_per_week,
        'native_country':native_country}
    df = DataFrame(a)

    # LE_encoder를 활용한 데이터 프레임 변환. 모두 int형으로
    train = pd.read_csv('accounts/templates/train.csv')
    train.drop(['id'], axis=1, inplace=True)
    X = train.drop(['income'], axis=1)
    y = train['income'] != '<=50K'
    LE_encoder = OrdinalEncoder(list(X.columns))
    X = LE_encoder.fit_transform(X, y)

    df = LE_encoder.transform(df)

    answer = Our_Model.predict(df).astype(int)
    return answer