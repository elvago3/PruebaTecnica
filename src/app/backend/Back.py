import requests
import json
import time
import pytz
from pytz import timezone
from datetime import datetime


def hora_chile():
    zona_horaria = timezone("America/Santiago")
    print (zona_horaria)




def obtener_token():
    url_api = "https://devtest.a2g.io/api/Auth"

    mail = "renzohum@hotmail.com"
    password = "r7mTS5S7IDMddgJm4vSb"

    encabezados = {
    'Content-Type': 'application/json'}

    datos = {"email":mail,
        "password": password}
    
    response = requests.post(url_api, headers=encabezados, data=json.dumps(datos))

    if response.status_code == 200:
        token = response.json()['token']        
    else:
        print('Error al enviar los datos:', response.text)
    return token



def obtener_datos():
    sensor_id = 'fb76277a-5872-4d74-a80b-4cce592c9e12'

    url_api_sensor = f'https://devtest.a2g.io/api/Records/{sensor_id}'

    token = obtener_token()

    encabezados = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {token}'
    }


    sensor = requests.get(url_api_sensor, headers=encabezados)

    # VerificaciÃ³n de la respuesta
    if sensor.status_code == 200:
        datos=sensor.json()['data']    
    else:
        print('Error:', sensor.text)

    return datos

def reg_categoria():
    datos = obtener_datos()

    bajo = 0
    medio = 0
    alto = 0

    for dato in datos:
        

        if dato['value'] > 120:
            alto = alto + 1
        elif dato['value'] > 60:
            medio = medio + 1
        else:
            bajo = bajo + 1


    categoria = {"altos":alto,
             "medios":medio,
             "bajos":bajo}
    return alto,medio,bajo







def datos_entrefecha():   
    datos = obtener_datos()
    
    t1 = datetime(2023, 4, 10, 8, 0, 0, tzinfo=pytz.UTC)
    t2 = datetime(2023, 4, 11, 20, 0, 0, tzinfo=pytz.UTC)

    
    santiago_tz = pytz.timezone("Chile/Continental")
    t1_santiago = t1.astimezone(santiago_tz)
    t2_santiago = t2.astimezone(santiago_tz)


    count = 0
    for dato in datos:
        fecha = str(dato['ts']).split('T')
        
        hhmm = fecha[1].split('.')[0]
        hh = hhmm.split(':')[0]
        min = hhmm.split(':')[1]
        ss = hhmm.split(':')[2]
        dd = fecha[0].split('-')[2]
        mm = fecha[0].split('-')[1]
        yy = fecha[0].split('-')[0]
        ts_a = datetime(int(yy),int(mm),int(dd),int(hh),int(min),int(ss),tzinfo=pytz.UTC)
        ts_santiago = ts_a.astimezone(santiago_tz)
        
        if t1_santiago <= ts_santiago <= t2_santiago:
            count += 1
        
    
    
    resultado = f'Cantidad de datos entre el {t1_santiago} y {t2_santiago} : {count}'
    
    return count


def enviar_resultados():
    token = obtener_token()
    url_resultado = "https://devtest.a2g.io/api/Result"
    
    resultados = {"NoiseHigh": reg_categoria()[0],
                    "NoiseMedium": reg_categoria()[1],
                    "NoiseLow": reg_categoria()[2],
                    "RangeAmount": datos_entrefecha()}
    
    # print(resultados)

    encabezados = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {token}'
    }

    response = requests.post(url_resultado, headers=encabezados, data=json.dumps(resultados))

    if response.status_code == 200:
        print("Se enviaron los registros correctamente")        
    else:
        print('Error al enviar los datos:', response.text)   


enviar_resultados()

