from flask import Flask
from routes_App import routes
from database import db  # Importación desde el nuevo archivo
import config  # Archivo opcional para configuración

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///gym.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)  # Inicializar la base de datos con Flask

app.register_blueprint(routes)