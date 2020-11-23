from sklearn.ensemble import RandomForestClassifier, AdaBoostClassifier, ExtraTreesClassifier, GradientBoostingClassifier
from sklearn.svm import SVC
from sklearn.naive_bayes import GaussianNB
from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn import metrics
from sklearn.model_selection import train_test_split
from lightgbm import LGBMClassifier
from xgboost import XGBClassifier
from sklearn.linear_model import SGDClassifier

#rf_clf = RandomForestClassifier()
#lgbm_clf = LGBMClassifier()
#naive_bayes_clf = GaussianNB()
#adaboost_clf = AdaBoostClassifier(n_estimators=100, random_state=0)
#extra_tree_clf = ExtraTreesClassifier()
#gradient_clf = GradientBoostingClassifier()
#svm_clf = SVC()
#nn_clf = KNeighborsClassifier()

#decision_tree_clf = DecisionTreeClassifier() #? 파라미터

#xgb_clf = XGBClassifier()
#sgd_clf = SGDClassifier()

GNB = GaussianNB()
clf.fit(X, Y)

adaboost_clf = AdaBoostClassifier(n_estimators=100, random_state=0)
clf.fit(X, y)

xtree = ExtraTreesClassifier(n_estimators=5, random_state=2)
xtree.fit(X_train, y_train)

clf = make_pipeline(StandardScaler(), SVC(gamma='auto'))
clf.fit(X, y)

neigh = KNeighborsClassifier(n_neighbors=3)
neigh.fit(X, y)


clf= xgb.XGBClassifier()   # 파라미터 넣어줌.   모델생성
clf.fit()   

clf = make_pipeline(StandardScaler(), SGDClassifier(max_iter=1000, tol=1e-3))
clf.fit(X, Y)