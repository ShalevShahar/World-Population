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
app.config['TEMPLATES_AUTO_RELOAD'] = True
app.config['SECRET_KEY'] = 'secret'
socketio = SocketIO(app)

@socketio.on('my event')


def test_message(message):                        # test_message() is the event callback function.
    emit('my response', {'data': 'got it!'})  


@app.route('/', methods=['GET'])
def popStream():
        dateNow = time.time()
        timePassed = (int(dateNow) - timeJuly2019)
        df['popNow'] =(df['pop2019'] + df['popRate'] * timePassed).astype(int)
        return render_template('PopulationStreaming.html', ela =df['popNow'][40])
    


if __name__ == '__main__':
    socketio.run(app,debug=True)       
    