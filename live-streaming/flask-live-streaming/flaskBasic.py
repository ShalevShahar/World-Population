# Modules and Libraries
from flask import Flask, escape, request, render_template, redirect,url_for,jsonify
from flask_socketio import SocketIO, emit
import pandas as pd
import numpy as np
import sys
import time


# Import data
data = pd.read_csv('static/countries2019-2020.csv')
df = pd.DataFrame(data)
df = df[0:235] #remove the last row which is the total world
 
# Global variables
# epoch time of July 1th 2019 and July 1th 2020. Taken from https://www.epochconverter.com/
timeJuly2019 = 1561939200
timeJuly2020 = 1593561600
timeGap20192020 = timeJuly2020 - timeJuly2019

#country name
countryName = df['Location']

#pop 2019, 2020 and gap

df['popGap'] = df['pop2020'] - df['pop2019']
df['popRate'] = df['popGap'] / timeGap20192020


# APP SERVER + connection to HTML
app = Flask(__name__)


@app.route('/_allCountries', methods=['GET'])
def allCountries():
        dateNow = time.time()
        timePassed = (int(dateNow) - timeJuly2019)
        df['popNow'] =(df['pop2019'] + df['popRate'] * timePassed).astype(int)
        df1 = df.set_index('Location').loc[:, 'popNow']
        df1 = df1.sort_values(axis=0, ascending =False)
        allCountries = df1.to_json()
        return  allCountries     
   
   


 
@app.route('/_topCountries', methods=['GET'])
def topCountries():
        dateNow = time.time()
        timePassed = (int(dateNow) - timeJuly2019)
        df['popNow'] =(df['pop2019'] + df['popRate'] * timePassed).astype(int)
        
        #calculating pop minus 1 second
        timePassedMinusOne = int(timePassed) - 2
        df['popNowMinusSecond'] =(df['pop2019'] + df['popRate'] * timePassedMinusOne).astype(int)
        
        df1 = df.set_index('Location').loc[:, ['popNow', 'popNowMinusSecond']]
        df1 = df1.sort_values(axis=0, ascending =False, by='popNow').head(20)
        
        topCountries = df1.to_json(orient='index')
        print(timePassedMinusOne)
        return  topCountries    




@app.route('/')
def index():
        return render_template('PopulationStreaming.html')

if __name__ == '__main__':
    app.run(debug=True)       
    
    
# @app.route('/test')
# def index2():
#     if not request.script_root:
#         # this assumes that the 'index' view function handles the path '/'
#         request.script_root = url_for('index', _external=True)

#     return render_template('PopulationStreaming.html')


# @app.route('/_china', methods=['GET'])
# def popStream():
#         dateNow = time.time()
#         timePassed = (int(dateNow) - timeJuly2019)
#         df['popNow'] =(df['pop2019'] + df['popRate'] * timePassed).astype(int)
#         china = df['popNow'][40].astype(int)
#         china = int(china)
#         return jsonify(china = china)
