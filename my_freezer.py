from flask_frozen import Freezer
from flaskBasic import app
freezer = Freezer(app)
if __name__ == '__main__':
    # app.run(debug=True)
    freezer.freeze() 