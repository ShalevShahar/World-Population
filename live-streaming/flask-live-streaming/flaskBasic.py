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
df = df[0:234] #remove the last row which is the total world
 
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
script_start_time = time.time()

@app.route('/_allCountries', methods=['GET'])
def allCountries():
        dateNow = time.time()
        time_from_script_start = int(dateNow - script_start_time)
        timePassed = (int(dateNow) - timeJuly2019)
        df['popNow'] =(df['pop2019'] + df['popRate'] * timePassed).astype(int)
        df1 = df.sort_values(axis=0, ascending =False, by='popNow' )
        df1['rank'] = np.arange(1, len(df) + 1 ) 
        timePassedMinusOne = int(timePassed) - 2
        timePassedPlusFour = int(timePassed) + 2
        df1['popNowMinusSecond'] =(df1['pop2019'] + df1['popRate'] * timePassedMinusOne).astype(int)
        df1['popNowPlusFour'] =(df1['pop2019'] + df1['popRate'] * timePassedPlusFour).astype(int)
        df2 = df1.set_index('Location').loc[:, ['rank','popNow','popNowPlusFour','popNowMinusSecond']]
        #Filtering to send only 20 each time, excluding the first 20
        visualize_from_row = (11-((time_from_script_start // 10)%11))  * 20
        df2 = df2.iloc[visualize_from_row : visualize_from_row + 20, :]
        allCountries = df2.to_json(orient='index')
        return  allCountries     
    
@app.route('/_topCountries', methods=['GET'])
def topCountries():
        dateNow = time.time()
        timePassed = (int(dateNow) - timeJuly2019)
        df['popNow'] =(df['pop2019'] + df['popRate'] * timePassed).astype(int)
        df2 = df.sort_values(axis=0, ascending =False, by='popNow').head(20)
        df2['rank'] = np.arange(1, len(df2) + 1 ) 
        timePassedMinusOne = int(timePassed) - 2
        timePassedPlusFour = int(timePassed) + 2
        timePassedPlusFive = int(timePassed) + 2
        df2['popNowMinusSecond'] =(df2['pop2019'] + df2['popRate'] * timePassedMinusOne).astype(int)
        df2['popNowPlusFour'] =(df2['pop2019'] + df2['popRate'] * timePassedPlusFour).astype(int)
        df2['popNowPlusFive'] =(df2['pop2019'] + df2['popRate'] * timePassedPlusFive).astype(int)
        df3 = df2.set_index('Location').loc[:, ['rank','popNow', 'popNowMinusSecond','popNowPlusFour','popNowPlusFive']]
        #calculating pop minus 1 second
        topCountries = df3.to_json(orient='index')
        return  topCountries    




@app.route('/')
def index():
        return render_template('index.html')

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
