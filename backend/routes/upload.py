from config import get_db_connection
from flask import Blueprint, request, jsonify
from services.normalizacao import normalize_dataframe
from services.insercao import inserir_dados_no_banco
import pandas as pd
import uuid

upload_bp = Blueprint('upload', __name__)

@upload_bp.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'Nenhum arquivo encontrado'}), 400

    files = request.files.getlist('file')
    success_files = []
    failed_files = []

    for file in files:
        if file and file.filename.endswith('.csv'):
            try:
                # Ler o arquivo CSV
                df = pd.read_csv(file, encoding='ISO-8859-1', delimiter=';')
                
                # Normalizar o DataFrame
                df = normalize_dataframe(df)
                
                # Extrair o ano do nome do arquivo
                ano = int(file.filename[-8:-4])

                # Inserir os dados no banco
                inserir_dados_no_banco(df, str(uuid.uuid4()), ano)
                success_files.append(file.filename)
            except Exception as e:
                failed_files.append({'file': file.filename, 'error': str(e)})
        else:
            failed_files.append({'file': file.filename, 'error': 'Formato inválido'})
    
    response_message = {
        'success': success_files,
        'failed': failed_files
    }

    return jsonify(response_message), 200 if len(failed_files) == 0 else 207
