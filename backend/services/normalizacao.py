import pandas as pd
import re

def normalize_dataframe(df):
    # Mapeamento de possíveis nomes de colunas
    column_mappings = {
        'tipo_residuo': ['TIPO DE RESÍDUO', 'Tipo Residuo', 'resíduo', 'Tipo', 'Resíduo', 'Tipo de resíduo - Toneladas'],
        'total': ['TOTAL', 'total', 'Total', 'TOTAL 2018']
    }

    # Adicionar meses ao mapeamento (sem o ano)
    meses = ['janeiro', 'fevereiro', 'marco', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro']
    meses_abreviados = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']

    # Renomear colunas conforme o mapeamento
    for standard_name, possible_names in column_mappings.items():
        for name in possible_names:
            if name in df.columns:
                df.rename(columns={name: standard_name}, inplace=True)
                break

    # Detectar colunas de meses com ano e renomeá-las
    for mes, mes_abreviado in zip(meses, meses_abreviados):
        for col in df.columns:
            # Verifica se a coluna está no formato "mes/ano" ou "mes_abreviado/ano"
            if re.match(fr'^{mes_abreviado}/\d{{2}}$', col) or re.match(fr'^{mes}/\d{{2}}$', col):
                df.rename(columns={col: mes}, inplace=True)

    # Preencher valores ausentes
    for col in df.columns:
        if col in meses or col == 'total':
            df[col] = df[col].fillna(0)  # Preencher valores ausentes com 0

    # Padronizar valores numéricos
    for col in df.columns:
        if col in meses or col == 'total':
            # Substituir a vírgula pelo ponto e converter para numérico
            df[col] = pd.to_numeric(df[col].astype(str).str.replace(',', '.'), errors='coerce').fillna(0)

    return df

