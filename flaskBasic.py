# Modules and Libraries
from flask import Flask, escape, request, render_template
import pandas as pd
import numpy as np
import time

# Import data
data = pd.read_csv('static/World_Population/countries2019-2020.csv')
df = pd.DataFrame(data)
df = df[0:234] #remove the last row which is the total world
 
# Global variables
# epoch time of July 1th 2019 and July 1th 2020. Taken from https://www.epochconverter.com/
timeJuly2019 = 1561939200
timeJuly2020 = 1593561600
timeGap20192020 = timeJuly2020 - timeJuly2019

#pop 2019, 2020 and 
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
        timePassedMinus2 = int(timePassed) - 2
        timePassedPlus2 = int(timePassed) + 2
        df1['popNowMinus2'] =(df1['pop2019'] + df1['popRate'] * timePassedMinus2).astype(int)
        df1['popNowPlus2'] =(df1['pop2019'] + df1['popRate'] * timePassedPlus2).astype(int)
        df2 = df1.set_index('Location').loc[:, ['rank','popNow','popNowPlus2','popNowMinus2']]
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
        timePassedMinus2 = int(timePassed) - 2
        timePassedPlus2 = int(timePassed) + 2
        df2['popNowMinus2'] =(df2['pop2019'] + df2['popRate'] * timePassedMinus2).astype(int)
        df2['popNowPlus2'] =(df2['pop2019'] + df2['popRate'] * timePassedPlus2).astype(int)
        df3 = df2.set_index('Location').loc[:, ['rank','popNow', 'popNowMinus2','popNowPlus2']]
        #calculating pop minus 1 second
        topCountries = df3.to_json(orient='index')
        return  topCountries    

@app.route('/')
def index():
        return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
      