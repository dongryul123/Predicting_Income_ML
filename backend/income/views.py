from django.shortcuts import render
from .serializers import IncomeSerializer, IncomeRegisterSerializer, PredictSerializer
from .models import incomedata

import json
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.http import JsonResponse

from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from django.http import HttpResponse

from pandas import Series, DataFrame
from category_encoders.ordinal import OrdinalEncoder
import joblib
import numpy as np # linear algebra
import pandas as pd # data processing, CSV file I/O (e.g. pd.read_csv)
# Create your views here.

#학습 모델 임포트
LGBM = joblib.load('1LGBM.pkl')
Random = joblib.load('2RandomForest.pkl')
GB = joblib.load('3GradientBoosting.pkl')
Ada = joblib.load('4AdaBoost.pkl')
ExTree = joblib.load('5ExtraTrees.pkl')
GS = joblib.load('6Gaussian.pkl')
KNN = joblib.load('7KNeighbors.pkl')
SGD = joblib.load('8SGD.pkl')
SVC = joblib.load('9SVC.pkl')
XGB = joblib.load('10XGB.pkl')
models = [LGBM, Random, GB, Ada, ExTree, GS, KNN, SGD, SVC, XGB]
names = ['LGBM', 'Random', 'GB', 'Ada', 'ExTree', 'GS', 'KNN', 'SGD', 'SVC', 'XGB']

#인코더 설정
train = pd.read_csv('income/templates/train.csv')
train.drop(['id'], axis=1, inplace=True)
X = train.drop(['income'], axis=1)
y = train['income'] != '<=50K'
LE_encoder = OrdinalEncoder(list(X.columns))
LE_encoder.fit_transform(X, y)

def get_edu_num(edu):
    if edu == 'Preschool':
        edu_num = 1
    if edu == '1st-4th':
        edu_num = 2
    elif edu == '5th-6th':
        edu_num = 3
    elif edu == '7th-8th':
        edu_num = 4
    elif edu == '9th':
        edu_num = 5
    elif edu == '10th':
        edu_num = 6
    elif edu == '11th':
        edu_num = 7
    elif edu == '12th':
        edu_num = 8
    elif edu == 'HS-grad':
        edu_num = 9
    elif edu == 'Some-college':
        edu_num = 10
    elif edu == 'Assoc-acdm':
        edu_num = 11
    elif edu == 'Assoc-voc':
        edu_num = 12
    elif edu == 'Prof-school':
        edu_num = 14
    elif edu == 'Bachelors':
        edu_num = 13
    elif edu == 'Doctorate':
        edu_num = 15
    elif edu == 'Masters':
        edu_num = 16
    return edu_num

@permission_classes([IsAuthenticated])
@swagger_auto_schema(method='post', request_body=PredictSerializer, manual_parameters=[openapi.Parameter("Authorization", in_=openapi.IN_HEADER, 
        description='"Token {키값}"의 형태로 토큰을 입력하세요.', type=openapi.TYPE_STRING)])
@api_view(['POST'])
def test(request):
    # 전처리 부분. LEncoder 사용
    age = request.data.get('age')
    workclass = request.data.get('workclass')
    education = request.data.get('education')
    education_num = get_edu_num(education)
    marital_status = request.data.get('marital_status')
    relationship = request.data.get('relationship')
    hours_per_week = request.data.get('hours_per_week')
    occupation = request.data.get('occupation')
    sex = request.data.get('sex')

    A = dataProcessing(age, workclass, education, education_num, marital_status, occupation, relationship, sex, hours_per_week)
    result = []
    for i in range(len(models)):
        result.append(int(models[i].predict(A).astype(int)[0]))
    return JsonResponse(result, safe=False, status=status.HTTP_200_OK)

def dataProcessing(age, workclass, education, education_num, marital_status, occupation, relationship, sex, hours_per_week):
    a = {'age':[age], 'workclass':workclass, 'fnlwgt':[190304], 'education':education, 'education_num':[education_num], 'marital_status':marital_status, 
        'occupation':occupation, 'relationship':relationship, 'race':'White', 'sex':sex, 'capital_gain':[0], 'capital_loss':[0], 'hours_per_week':[hours_per_week],
        'native_country':'United-States'}
    df = DataFrame(a)

    # LE_encoder를 활용한 데이터 프레임 변환. 모두 int형으로
    df = LE_encoder.transform(df)
    return df

@swagger_auto_schema(method='post', request_body=IncomeSerializer, manual_parameters=[openapi.Parameter("Authorization", in_=openapi.IN_HEADER, 
        description='"Token {키값}"의 형태로 토큰을 입력하세요.', type=openapi.TYPE_STRING)])
# @permission_classes([IsAuthenticated])
@api_view(['POST'])
def inputdata(request):
    edu_num = get_edu_num(request.data.get('education'))

    data = {
        'age' : request.data.get('age'),
        'workclass' : request.data.get('workclass'),
        'education' : request.data.get('education'),
        'education_num' : edu_num,
        'capital_gain' : request.data.get('capital_gain', 0),
        'capital_loss' : request.data.get('capital_loss', 0),
        'hours_per_week' : request.data.get('hours_per_week'),
        'native_country' : 'others',
        'relationship' : request.data.get('relationship'),
        'sex' : request.data.get('sex'),
        'marital_status' : request.data.get('marital_status'),
        'occupation' : request.data.get('occupation'),
        'race' : 'others',
        'income' : request.data.get('income')
    }
    serializer = IncomeRegisterSerializer(data=data)
    if serializer.is_valid(raise_exception=True):
        serializer.save()
        return Response(status=status.HTTP_200_OK)
    return Response(status=status.HTTP_400_BAD_REQUEST)

############ pkl 파일 생성하는 부분

# ## 모델링 테스트
# def modeling():
#     # This Python 3 environment comes with many helpful analytics libraries installed
# # It is defined by the kaggle/python Docker image: https://github.com/kaggle/docker-python
# # For example, here's several helpful packages to load
#     from sklearn.ensemble import RandomForestClassifier, AdaBoostClassifier, ExtraTreesClassifier, GradientBoostingClassifier
#     from sklearn.svm import SVC
#     from sklearn.naive_bayes import GaussianNB
#     from sklearn.neighbors import KNeighborsClassifier
#     from sklearn.tree import DecisionTreeClassifier
#     from sklearn import metrics
#     from sklearn.model_selection import train_test_split
#     from lightgbm import LGBMClassifier
#     from xgboost import XGBClassifier
#     from sklearn.linear_model import SGDClassifier
#     # 시각화 라이브러리
#     import matplotlib.pyplot as plt
#     import seaborn as sns

#     # 모델링 라이브러리
#     from sklearn.model_selection import KFold
#     from lightgbm import LGBMClassifier
#     from sklearn.pipeline import make_pipeline
#     from sklearn.preprocessing import StandardScaler

#     # 기타 라이브러리
#     import random
#     import gc
#     import os
#     train = pd.read_csv('income/templates/train.csv')
#     test = pd.read_csv('income/templates/test.csv')
#     sample_submission = pd.read_csv('income/templates/sample_submission.csv')
#     train_and_test = [train, test]
#     print("HI!")
#     print(type(train['education_num'][0]))

#     train.drop(['id'], axis=1, inplace=True)
#     test.drop(['id'], axis=1, inplace=True)

#     y = train['income'] != '<=50K'
#     X = train.drop(['income'], axis=1)

#     LE_encoder = OrdinalEncoder(list(X.columns))
#     X = LE_encoder.fit_transform(X, y)
#     test = LE_encoder.transform(test)

#     NFOLDS = 5
#     folds = KFold(n_splits=NFOLDS)

#     columns = X.columns
#     splits = folds.split(X, y)
#     y_preds = np.zeros(test.shape[0])

#     feature_importances = pd.DataFrame()
#     feature_importances['feature'] = columns

#     #model = RandomForestClassifier(max_depth=2, random_state=0)
#     model = make_pipeline(StandardScaler(), SGDClassifier(max_iter=1000, tol=1e-3))
#     model.fit(X, y)

#     # for fold_n, (train_index, valid_index) in enumerate(splits):
#     #     print('Fold: ', fold_n+1)
#     #     X_train, X_valid = X.iloc[train_index], X.iloc[valid_index]
#     #     y_train, y_valid = y.iloc[train_index], y.iloc[valid_index]

#     #     evals = [(X_train, y_train), (X_valid, y_valid)]
#     #     model.fit(X_train, y_train, eval_metric='accuracy', eval_set=evals, verbose=True)
        
#     #     feature_importances[f'fold_{fold_n + 1}'] = model.feature_importances_
            
#     #     y_preds += model.predict(test).astype(int) / NFOLDS
        
#     #     del X_train, X_valid, y_train, y_valid
#     #     gc.collect()

#     # sample_submission['prediction'] = y_preds

#     # for ix, row in sample_submission.iterrows():
#     #     if row['prediction'] > 0.5:
#     #         sample_submission.loc[ix, 'prediction'] = 1
#     #     else:
#     #         sample_submission.loc[ix, 'prediction'] = 0

#     joblib.dump(model, 'New_model.pkl')
#     #Our_Model = joblib.load('model.pkl')
#     # sample_submission = sample_submission.astype({"prediction": int})
#     # sample_submission.to_csv('submission001.csv', index=False)
#     # return render(request, "train.html")
#     return joblib.load('New_model.pkl')

#Aa = modeling()
#print(type(Aa))
