from flask import Flask, escape, request, render_template

app = Flask(__name__)

@app.route('/home')
def home():
    return render_template('home.html')      

ela= ['cute','sweet','charm']

@app.route('/')
def about():
    return render_template('about.html', ela=ela)

if __name__ == '__main__':
    app.run()     
    