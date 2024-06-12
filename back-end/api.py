from flask import Flask, request, jsonify, send_file
from io import StringIO
from treinamentoIA.arvoreDecisao import ArvoreDecisao
from treinamentoIA.regressaoLogistica import RegressaoLogistica
from app.ControlerArvoreDesicao import DadoUnicoArvore
from app.ControlerArvoreDesicao import DadoMultiplo
from app.ControlerRegressaoLogistica import DadoUnicoReg
from app.ControlerRegressaoLogistica import DadoMultiploReg
from flask_cors import CORS
import os


app = Flask(__name__)
# CORS(app)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})
dtc_arvore = ArvoreDecisao.best_model
dtc_regressao = RegressaoLogistica.best_log_reg_model

UPLOAD_FOLDER = os.path.join(os.getcwd(), 'uploads')
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/inicio')
def inicio():
    return 'Rodando...'



@app.route('/unicoArvore', methods=['POST'])
def prever_fruta_arvore():
    data = request.json['data']  # Recebe os dados de entrada do corpo da solicitação
    dado_unico = DadoUnicoArvore(data, dtc_arvore)
    resultado = dado_unico.resultado    
    return jsonify({'resultado': resultado})




@app.route('/multiploArvore', methods=['POST'])
def processar_csv_arvore():
    print("arquivo csv: ",request)
    arquivo_csv = request.json
    dado_multiplo = DadoMultiplo(dtc_arvore=dtc_arvore)
    output = dado_multiplo.predict_from_csv(arquivo_csv['file_name'])
    print(output)
    return jsonify({"message": "Previsões realizadas com sucesso!"})

# def processar_csv_arvore():
#     arquivo_csv = request.files['arquivo']
#     if arquivo_csv:
#         arquivo_csv_data = arquivo_csv.read()
#         dado_multiplo = DadoMultiplo(dtc_arvore=dtc_arvore)
#         output_csv_data = dado_multiplo.predict_from_csv(arquivo_csv_data)
#         return send_file(
#             StringIO(output_csv_data),
#             mimetype='text/csv',
#             as_attachment=True,
#             attachment_filename='saida.csv'
#         )

# @app.route('/upload', methods=['POST'])
# def upload_file():
#     if 'file' not in request.files:
#         return jsonify({'message': 'Nenhum arquivo enviado'}), 400
    
#     file = request.files['file']
#     if file.filename == '':
#         return jsonify({'message': 'Nenhum arquivo selecionado'}), 400
    
#     if file:
#         if not os.path.exists(app.config['UPLOAD_FOLDER']):
#             os.makedirs(app.config['UPLOAD_FOLDER'])
        
#         filepath = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
#         file.save(filepath)
#         return jsonify({"message": f"File {file.filename} uploaded successfully"}), 200

# @app.route('/calcular', methods=['POST'])
# def calcular():
#     model_type = request.form['model_type']
#     file_path = os.path.join(app.config['UPLOAD_FOLDER'], request.form['file_name'])
    
#     if model_type == 'ArvoreDecisao':
#         dado_multiplo = DadoMultiplo(dtc_arvore)
#         output_csv_data = dado_multiplo.predict_from_csv(file_path)
        
#         # Aqui você pode salvar a nova tabela no local ou realizar qualquer outra operação necessária
        
#         return jsonify({'message': 'Previsão de frutas múltiplas realizada com sucesso! - Arvore'}), 200
#     elif model_type == 'RegressaoLogistica':
#         # Lógica para a regressão logística
#         return jsonify({'message': 'Previsão de frutas múltiplas realizada com sucesso! - Regressão Logística'}), 200
#     else:
#         return jsonify({'message': 'Tipo de modelo não suportado'}), 400



@app.route('/unicoRegressao', methods=['POST'])
def prever_fruta_regressao():
    data = request.get_json()
    print("aaaaaaaaaaaaqqqqqqqqqqqqquuuuuuuuuuiiiiiiiii")
    print(data)
    dado_unico = DadoUnicoReg(data, dtc_regressao)
    # resultado = dado_unico.resultado   
    resultado = dado_unico.predict
    response = jsonify({'resultado': resultado})
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
    return response




@app.route('/multiploRegressao', methods=['POST'])
def processar_csv_regressao():
    print("arquivo csv: ",request)
    arquivo_csv = request.json
    dado_multiplo = DadoMultiploReg(dtc_regressao=dtc_regressao)
    output = dado_multiplo.predict_from_csv(arquivo_csv['file_name'])
    print(output)
    return jsonify({"message": "Previsões realizadas com sucesso!"})

    # if arquivo_csv:
    #     arquivo_csv_data = arquivo_csv.read()
    #     dado_multiplo = DadoMultiploReg(dtc_regressao=dtc_regressao)
    #     output_csv_data = dado_multiplo.predict_from_csv(arquivo_csv_data)
    #     return send_file(
    #         StringIO(output_csv_data),
    #         mimetype='text/csv',
    #         as_attachment=True,
    #         attachment_filename='saida.csv'
    #     )
    



if __name__ == '__main__':
    app.run(debug=True)
