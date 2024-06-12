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

    def predictMu(self):
        data_df = pd.DataFrame([self.data], columns=['id','tamanho','peso','docura','crocancia','suculencia','maturacao','acidez']).T
        dtc_prediction = self.dtc_regressao.predict(data_df)
        dtc_prediction = 'boa' if dtc_prediction[0] == 1 else 'ruim'
        print('Previsao de fruta unica realizada com sucesso! - Regressao')
        return dtc_prediction


    def predict(self):
        data_list = [float(i) for i in self.data.split(',')]
        data_df = pd.DataFrame([data_list], columns=['id', 'tamanho', 'peso', 'docura', 'crocancia', 'suculencia', 'maturacao', 'acidez'])
        dtc_prediction = self.dtc_regressao.predict(data_df)
        dtc_predictionn = 'boa' if dtc_prediction[0] == 1 else 'ruim'
        print('Previsao de fruta unica realizada com sucesso! - Regressao')
        print(dtc_predictionn)
        return dtc_predictionn


class DadoMultiploReg:
    def __init__(self, dtc_regressao):
        self.dtc_regressao = dtc_regressao

    def predict_from_csv(self, input_csv_path):
        input_data_path = 'dados/' + input_csv_path
        print(input_data_path)
        input_data = pd.read_csv(input_data_path)
        feature_names = ['id','tamanho','peso','docura','crocancia','suculencia','maturacao','acidez']

        dtc_predictions = []

        for index, row in input_data.iterrows():
            X_new_data = pd.DataFrame([row.tolist()], columns=feature_names)
            dtc_prediction = self.dtc_regressao.predict(X_new_data)
            dtc_predictions.append('boa' if dtc_prediction[0] == 1 else 'ruim')

        input_data['resultado'] = dtc_predictions

        output_path = 'dados/' + input_csv_path
        input_data.to_csv(output_path, index=False)

        print('Previsao de frutas multiplas realizada com sucesso! - Regressao')
        print(f"Previsoes salvas em {output_path}")
        return ('Deu')

