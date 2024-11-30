from config import get_db_connection

def inserir_dados_no_banco(df, file_id, ano):
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        meses = ['janeiro', 'fevereiro', 'marco', 'abril', 'maio', 'junho', 
                 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro']

        for _, row in df.iterrows():
            query = f"""
                INSERT INTO coleta_residuos (file_id, tipo_residuo, {', '.join(meses)}, total, ano)
                VALUES (%s, %s, {', '.join(['%s'] * len(meses))}, %s, %s)
            """
            valores = [
                file_id,
                row.get('tipo_residuo', 'Desconhecido'),
                *[row.get(mes, 0) for mes in meses],
                row.get('total', 0),
                ano
            ]

            # Verificar os valores que estão sendo inseridos
            print(f"Valores para inserção no banco: {valores}")  # Depuração
            
            cursor.execute(query, tuple(valores))
        
        conn.commit()
    except Exception as e:
        conn.rollback()
        print("Erro ao inserir dados no banco:", e)
        raise e
    finally:
        cursor.close()
        conn.close()
