# -*- coding: utf-8 -*-

import pandas as pd
from sklearn.model_selection import train_test_split, cross_val_score, GridSearchCV
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import confusion_matrix, classification_report
import numpy as np

class RegressaoLogistica:

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
        # print("Matriz de Confusao (Validacao):")
        # print(confusion_matrix(Y_val, Y_val_pred))
        # print("\nRelatorio de Classificacao (Validacao):")
        # print(classification_report(Y_val, Y_val_pred))

        # validacao cruzada
        cv_scores = cross_val_score(model, X_train, Y_train, cv=5)
        # print("Scores de Validacao Cruzada:", cv_scores)
        # print("Media dos Scores de Validacao Cruzada:", np.mean(cv_scores))
        # print("\n")

    def evaluate_test_model(model, X_test, Y_test):
        Y_test_pred = model.predict(X_test)
        # print("Matriz de Confusao (Teste):")
        # print(confusion_matrix(Y_test, Y_test_pred))
        # print("\nRelatorio de Classificacao (Teste):")
        # print(classification_report(Y_test, Y_test_pred))    

    # print("######      Inicio         #####")
    # Avaliar modelo , max interacao 1000
    log_reg_model = LogisticRegression(max_iter=1000, solver='liblinear')
    # print("Modelo de Regressao Logistica:")
    evaluate_model(log_reg_model, X_train, Y_train, X_val, Y_val)

    #hiperparametros
    param_grid = {
        'penalty': ['l1', 'l2'],  # Tipo de penalidade
        'C': [0.001, 0.01, 0.1, 1, 10, 100],  
    }

    grid_search = GridSearchCV(LogisticRegression(max_iter=1000, solver='liblinear'), param_grid, cv=5)

    grid_search.fit(X_train, Y_train)

    # print("Melhores Hiperparametros:")
    # print(grid_search.best_params_)

    best_log_reg_model = grid_search.best_estimator_
    # print("Modelo de Regressao Logistica com melhores hiperparametros:")
    evaluate_model(best_log_reg_model, X_train, Y_train, X_val, Y_val)

    # print("Avaliacao no conjunto de teste com o melhor modelo ajustado:")
    evaluate_test_model(best_log_reg_model, X_test, Y_test)