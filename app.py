from flask import Flask
from flask_cors import CORS  # Importar CORS
from routes_App import routes
from database import db  # Importación desde el nuevo archivo
import config  # Archivo opcional para configuración

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///gym.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

CORS(app)  # Habilitar CORS en toda la aplicación

db.init_app(app)

# Crear la base de datos si aún no existe
with app.app_context():
    db.create_all()

app.register_blueprint(routes)

# Iniciar el servidor solo si ejecutamos `app.py` directamente
if __name__ == "__main__":
    app.run(debug=True)