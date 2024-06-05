# -*- coding: utf-8 -*-

import pandas as pd
from sklearn.model_selection import train_test_split, cross_val_score, GridSearchCV
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import confusion_matrix, classification_report
import numpy as np

class ArvoreDecisao:

    df = pd.read_csv('back-end/dados/peras.csv', encoding='latin-1')

    df.iloc[:, -1] = df.iloc[:, -1].replace({'boa': 1, 'ruim': 0})

    X = df.iloc[:, :-1]  # variaveis independentes
    Y = df.iloc[:, -1]   # variavel dependente

    # treinamento 70% resto 30%
    X_train, X_temp, Y_train, Y_temp = train_test_split(X, Y, test_size=0.3, random_state=17)

    # validação 15% teste 15%
    X_val, X_test, Y_val, Y_test = train_test_split(X_temp, Y_temp, test_size=0.5, random_state=17)

    Y_train = Y_train.astype(int)
    Y_val = Y_val.astype(int)
    Y_test = Y_test.astype(int)

    def evaluate_model(model, X_train, Y_train, X_val, Y_val):
        model.fit(X_train, Y_train)

        # validacao
        Y_val_pred = model.predict(X_val)
        print("Matriz de Confusao (Validacao):")
        print(confusion_matrix(Y_val, Y_val_pred))
        print("\nRelatorio de Classificacao (Validacao):")
        print(classification_report(Y_val, Y_val_pred))

        # validacao cruzada
        cv_scores = cross_val_score(model, X_train, Y_train, cv=5)
        print("Scores de Validacao Cruzada:", cv_scores)
        print("Media dos Scores de Validacao Cruzada:", np.mean(cv_scores))
        print("\n")

    print("######      Inicio         #####")
    # modelo com critério de entropia
    dtc_entropy = DecisionTreeClassifier(criterion='entropy')
    print("Modelo com criterio de Entropia:")
    evaluate_model(dtc_entropy, X_train, Y_train, X_val, Y_val)

    # modelo com critério de gini
    dtc_gini = DecisionTreeClassifier(criterion='gini')
    print("Modelo com criterio de Gini:")
    evaluate_model(dtc_gini, X_train, Y_train, X_val, Y_val)

    # hiperparâmetros usando GridSearchCV
    param_grid = {
        'criterion': ['gini', 'entropy'],
        'max_depth': [None, 10, 20, 30, 40, 50], #profundidade
        'min_samples_split': [2, 10, 20], #amostras p dividir
        'min_samples_leaf': [1, 10, 20] #amostras presente
    }

    grid_search = GridSearchCV(DecisionTreeClassifier(), param_grid, cv=5, scoring='accuracy')
    grid_search.fit(X_train, Y_train)

    print("Melhores parametros encontrados:")
    print(grid_search.best_params_)

    best_model = grid_search.best_estimator_
    print("Melhor modelo ajustado:")
    evaluate_model(best_model, X_train, Y_train, X_val, Y_val)

    print("Conjunto de teste, no melhor modelo")
    # Avaliação no conjunto de teste usando o melhor modelo encontrado
    Y_test_pred = best_model.predict(X_test)
    print("Matriz de Confusao (Teste):")
    print(confusion_matrix(Y_test, Y_test_pred))
    print("\nRelatorio de Classificacao (Teste):")
    print(classification_report(Y_test, Y_test_pred))