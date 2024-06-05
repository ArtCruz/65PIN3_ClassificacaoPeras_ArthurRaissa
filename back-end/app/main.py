import sys
sys.path.append('G:/Meu Drive/2024-1/Pin 3/65PIN3_ClassificacaoPeras_ArthurRaissa/back-end')

from treinamentoIA.arvoreDecisao import ArvoreDecisao
from treinamentoIA.regressaoLogistica import RegressaoLogistica

dtc_model = ArvoreDecisao.best_model
log_reg_model = RegressaoLogistica.best_log_reg_model


class Predictor:
    def __init__(self, dtc_model, log_reg_model):
        self.dtc_model = dtc_model
        self.log_reg_model = log_reg_model

    def predict(self, X):
        dtc_prediction = self.dtc_model.predict(X)
        log_reg_prediction = self.log_reg_model.predict(X)
        return dtc_prediction, log_reg_prediction


predictor = Predictor(dtc_model=dtc_model, log_reg_model=log_reg_model)

X_new_data = [[2003,0.430265328,2.58051832,0.46936441,0.938059721,1.339322289,-2.722897099,2.579043452]]
dtc_prediction, log_reg_prediction = predictor.predict(X_new_data)

if dtc_prediction == 0:
    print("Previsao da Arvore de Decisao:", str(dtc_prediction) + " Fruta Ruim")
else:
    print("Previsao da Arvore de Decisao:", str(dtc_prediction) + " Fruta Boa")

if log_reg_prediction == 0:
    print("Previsao da Regressao Logistica:", str(log_reg_prediction) + " Fruta Ruim")
else:
    print("Previsao da Regressao Logistica:", str(log_reg_prediction)+ " Fruta Boa")