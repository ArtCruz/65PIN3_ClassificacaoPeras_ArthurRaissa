import pandas as pd
import sys
sys.path.append('G:/Meu Drive/2024-1/Pin 3/65PIN3_ClassificacaoPeras_ArthurRaissa/back-end')


from treinamentoIA.arvoreDecisao import ArvoreDecisao

dtc_arvore = ArvoreDecisao.best_model


class DadoUnicoArvore:
    def __init__(self, data, dtc_arvore):
        self.data = data
        self.dtc_arvore= dtc_arvore
        self.resultado = self.predict()

    def predictMu(self):
        data_df = pd.DataFrame(self.data, columns=['id','tamanho','peso','docura','crocancia','suculencia','maturacao','acidez']).T
        dtc_arvore = self.dtc_arvore.predict(data_df)
        dtc_prediction = 'boa' if dtc_arvore[0] == 1 else 'ruim'
        print('Previsao de fruta unica realizada com sucesso! - Arvore')
        return dtc_prediction

    def predict(self):
            data_list = [float(i) for i in self.data.split(',')]
            data_df = pd.DataFrame([data_list], columns=['id', 'tamanho', 'peso', 'docura', 'crocancia', 'suculencia', 'maturacao', 'acidez'])
            dtc_arvore = self.dtc_arvore.predict(data_df)
            dtc_predictionn = 'boa' if dtc_arvore[0] == 1 else 'ruim'
            print('Previsao de fruta unica realizada com sucesso! - Regressao')
            print(dtc_predictionn)
            return dtc_predictionn

# data = [225,-2.002139587,-2.625820278,-0.908798685,-1.780175222,1.197048603,3.678592367,-4.434327674]
# dado_unico = DadoUnico(data=data, dtc_arvore=dtc_arvore)
# print(dado_unico.resultado)


class DadoMultiplo:
    def __init__(self, dtc_arvore):
        self.dtc_arvore = dtc_arvore

    def predict_from_csv(self, input_csv_path):
        input_data_path = 'dados/' + input_csv_path
        input_data = pd.read_csv(input_data_path)
        feature_names = ['id','tamanho','peso','docura','crocancia','suculencia','maturacao','acidez']

        dtc_predictions = []

        for index, row in input_data.iterrows():
            X_new_data = pd.DataFrame([row.tolist()], columns=feature_names)
            dtc_prediction = self.dtc_arvore.predict(X_new_data)
            dtc_predictions.append('boa' if dtc_prediction[0] == 1 else 'ruim')

        input_data['Previsao_ArvoreDecisao'] = dtc_predictions

        output_path = 'dados/' + input_csv_path
        input_data.to_csv(output_path, index=False)

        print('Previsao de frutas multiplas realizada com sucesso! - Arvore')
        print(f"Previsoes salvas em {output_path}")
        return ('Deu')

