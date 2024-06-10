from flask import Flask, request, jsonify, send_file
from io import StringIO
from treinamentoIA.arvoreDecisao import ArvoreDecisao
from treinamentoIA.regressaoLogistica import RegressaoLogistica
from app.ControlerArvoreDesicao import DadoUnico
from app.ControlerArvoreDesicao import DadoMultiplo

app = Flask(__name__)
dtc_arvore = ArvoreDecisao.best_model
dtc_regressao = RegressaoLogistica.best_log_reg_model

@app.route('/inicio')
def inicio():
    return 'Rodando...'



@app.route('/unicoArvore', methods=['POST'])
def prever_fruta_arvore():
    data = request.json['data']  # Recebe os dados de entrada do corpo da solicitação
    dado_unico = DadoUnico(data, dtc_arvore)
    resultado = dado_unico.resultado    
    return jsonify({'resultado': resultado})




@app.route('/multiploArvore', methods=['POST'])
def processar_csv_arvore():
    arquivo_csv = request.files['arquivo']
    if arquivo_csv:
        arquivo_csv_data = arquivo_csv.read()
        dado_multiplo = DadoMultiplo(dtc_arvore=dtc_arvore)
        output_csv_data = dado_multiplo.predict_from_csv(arquivo_csv_data)
        return send_file(
            StringIO(output_csv_data),
            mimetype='text/csv',
            as_attachment=True,
            attachment_filename='saida.csv'
        )



@app.route('/unicoRegressao', methods=['POST'])
def prever_fruta_regressao():
    data = request.json['data']
    dado_unico = DadoUnico(data, dtc_regressao)
    resultado = dado_unico.resultado    
    return jsonify({'resultado': resultado})




@app.route('/multiploRegressao', methods=['POST'])
def processar_csv_regressao():
    arquivo_csv = request.files['arquivo']
    if arquivo_csv:
        arquivo_csv_data = arquivo_csv.read()
        dado_multiplo = DadoMultiplo(dtc_regressao=dtc_regressao)
        output_csv_data = dado_multiplo.predict_from_csv(arquivo_csv_data)
        return send_file(
            StringIO(output_csv_data),
            mimetype='text/csv',
            as_attachment=True,
            attachment_filename='saida.csv'
        )
    



if __name__ == '__main__':
    app.run(debug=True)
