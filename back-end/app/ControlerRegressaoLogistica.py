import pandas as pd
import sys
sys.path.append('G:/Meu Drive/2024-1/Pin 3/65PIN3_ClassificacaoPeras_ArthurRaissa/back-end')


from treinamentoIA.regressaoLogistica import RegressaoLogistica

dtc_regressao = RegressaoLogistica.best_log_reg_model


class DadoUnicoReg:
    def __init__(self, data, dtc_regressao):
        self.data = data
        print(self.data)
        self.dtc_regressao= dtc_regressao
        self.resultado = self.predict()

    def predict(self):
        data_df = pd.DataFrame([self.data], columns=['id','tamanho','peso','docura','crocancia','suculencia','maturacao','acidez']).T
        dtc_prediction = self.dtc_regressao.predict(data_df)
        dtc_prediction = 'boa' if dtc_prediction[0] == 1 else 'ruim'
        print('Previsao de fruta unica realizada com sucesso! - Regressao')
        return dtc_prediction


class DadoMultiploReg:
    def __init__(self, dtc_regressao):
        self.dtc_regressao = dtc_regressao

    def predict_from_csv(self, input_csv_path):
        input_data = pd.read_csv(input_csv_path)
        feature_names = ['id','tamanho','peso','docura','crocancia','suculencia','maturacao','acidez']

        dtc_predictions = []

        for index, row in input_data.iterrows():
            X_new_data = pd.DataFrame([row.tolist()], columns=feature_names)
            dtc_prediction = self.dtc_regressao.predict(X_new_data)
            dtc_predictions.append('boa' if dtc_prediction[0] == 1 else 'ruim')

        input_data['Previsao_RegressaoLogistica'] = dtc_predictions

        output_csv_data = input_data.to_csv(index=False)

        print('Previsao de frutas multiplas realizada com sucesso! - Regressao')
        return output_csv_data

