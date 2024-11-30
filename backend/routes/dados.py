from flask import Blueprint, request, jsonify
from config import get_db_connection

dados_bp = Blueprint('dados', __name__)

@dados_bp.route('/dados', methods=['GET'])
def get_dados():
    year = request.args.get('year')
    tipos_residuo = request.args.getlist('tipo_residuo')
    mes_inicio = request.args.get('mes_inicio')
    mes_fim = request.args.get('mes_fim')

    conn = get_db_connection()
    cursor = conn.cursor()

    # Meses para filtrar
    month_columns = ['janeiro', 'fevereiro', 'marco', 'abril', 'maio', 'junho', 
                     'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro']

    # Construção da consulta SQL base
    query = "SELECT ano, tipo_residuo, "
    params = []

    # Verifique o intervalo de meses
    if mes_inicio and mes_fim:
        start_index = month_columns.index(mes_inicio)
        end_index = month_columns.index(mes_fim) + 1
        selected_months = month_columns[start_index:end_index]
        query += ', '.join(selected_months)
    elif mes_inicio:
        selected_months = [mes_inicio]
        query += mes_inicio
    elif mes_fim:
        selected_months = [mes_fim]
        query += mes_fim
    else:
        selected_months = month_columns  # Se nenhum mês for especificado, selecione todos
        query += ', '.join(month_columns)

    query += " FROM coleta_residuos WHERE 1=1"

    # Filtro por ano
    if year:
        query += " AND ano = %s"
        params.append(year)

    # Filtro por tipo de resíduo
    if tipos_residuo:
        placeholders = ', '.join(['%s'] * len(tipos_residuo))  # Cria os placeholders
        query += f" AND tipo_residuo IN ({placeholders})"
        params.extend(tipos_residuo)  # Adiciona cada tipo de resíduo separadamente

    try:
        cursor.execute(query, tuple(params))
        results = cursor.fetchall()
        return jsonify(results), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        cursor.close()
        conn.close()
