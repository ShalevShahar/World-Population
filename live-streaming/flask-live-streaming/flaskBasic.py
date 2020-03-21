# Modules and Libraries

from flask import Flask, escape, request, render_template, redirect,url_for
import pandas as pd
import numpy as np
import sys
# Global variables
data = pd.read_csv("/static/populationAllData.csv")
data['PopTotal'] = data['PopTotal'].astype(float)
print(data)
print('lalala        ssssssssssssssssss')
# Import data
 

ela = 'I am cute walaaaaaaa '

# APP SERVER + connection to HTML
app = Flask(__name__)
app.config['TEMPLATES_AUTO_RELOAD'] = True
@app.route('/')
def popStream():
    return render_template('PopulationStreaming.html', ela =ela)
if __name__ == '__main__':
    app.run(debug=True)       
    