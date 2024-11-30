import pymysql

def get_db_connection():
    return pymysql.connect(
        host='localhost',
        user='root',
        password='Senha135',  #Senha do MySQL
        database='AMT',
        cursorclass=pymysql.cursors.DictCursor
    )