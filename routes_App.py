from flask import render_template, Blueprint, request, jsonify, redirect
from database import db
from models import User, Exercise, Routine
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import datetime
from functools import wraps

routes = Blueprint('routes', __name__)

SECRET_KEY = "tu_clave_secreta"  # Usa una clave secreta fuerte y guárdala segura

@routes.route('/')
def main_page():
    users = User.query.all()
    exercises = Exercise.query.all()
    return render_template('index.html', users=users, exercises=exercises)

@routes.route('/get_routine/<int:user_id>', methods=['GET'])
def get_routine(user_id):
    """Obtener rutina del usuario"""
    routine = Routine.query.filter_by(user_id=user_id).all()
    routine_data = [{
        "day": r.day,
        "exercise": Exercise.query.get(r.exercise_id).name,
        "repetitions": Exercise.query.get(r.exercise_id).repetitions,
        "weight": Exercise.query.get(r.exercise_id).weight
    } for r in routine]
    return jsonify(routine_data)

@routes.route('/update_exercise', methods=['POST'])
def update_exercise():
    """Actualizar el peso y repeticiones de un ejercicio"""
    if request.content_type == 'application/json':
        data = request.get_json()
    else:
        return jsonify({"error": "Formato de solicitud no soportado"}), 415
    
    if 'exercise_id' not in data:
        return jsonify({"error": "Falta 'exercise_id' en la solicitud"}), 400
    
    exercise = Exercise.query.get(data['exercise_id'])
    
    if not exercise:
        return jsonify({"error": "Ejercicio no encontrado"}), 404

    exercise.weight = data.get('weight', exercise.weight)
    exercise.repetitions = data.get('repetitions', exercise.repetitions)
    
    db.session.commit()
    return jsonify({"message": "Ejercicio actualizado"}), 200

@routes.route('/register_user', methods=['POST'])
def register_user():
    """Registrar un nuevo usuario desde formulario o JSON"""
    if request.content_type == 'application/json':
        data = request.get_json()
        name = data.get('name')
        email = data.get('email')
        password = data.get('password')
    else:
        name = request.form.get('name')
        email = request.form.get('email')
        password = request.form.get('password')

    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({"error": "El usuario ya existe"}), 400

    hashed_password = generate_password_hash(password)
    new_user = User(name=name, email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "Usuario registrado correctamente"}), 201

@routes.route('/register_exercise', methods=['POST'])
def register_exercise():
    """Registrar un nuevo ejercicio desde formulario o JSON"""
    if request.content_type == 'application/json':
        data = request.get_json()
        user_id = data.get('user_id')
        name = data.get('name')
        repetitions = data.get('repetitions')
        weight = data.get('weight')
    else:
        user_id = request.form.get('user_id')
        name = request.form.get('name')
        repetitions = request.form.get('repetitions')
        weight = request.form.get('weight')

    new_exercise = Exercise(user_id=user_id, name=name, repetitions=repetitions, weight=weight)
    db.session.add(new_exercise)
    db.session.commit()

    return jsonify({"message": "Ejercicio registrado correctamente"}), 201

@routes.route('/login_user', methods=['POST'])
def login_user():
    """Iniciar sesión de usuario"""
    if request.content_type == 'application/json':
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
    else:
        return jsonify({"error": "Formato de solicitud no soportado"}), 415

    user = User.query.filter_by(email=email).first()
    if user and check_password_hash(user.password, password):
        token = jwt.encode({
            'user_id': user.id,
            'name': user.name,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=2)  # Expira en 2 horas
        }, SECRET_KEY, algorithm='HS256')
        return jsonify({"message": "Login exitoso", "token": token, "name": user.name}), 200
    return jsonify({"error": "Credenciales incorrectas"}), 401

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            token = request.headers['Authorization'].split(" ")[1]
        if not token:
            return jsonify({'error': 'Token es requerido'}), 401
        try:
            data = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
            current_user = User.query.get(data['user_id'])
        except Exception as e:
            return jsonify({'error': 'Token inválido o expirado'}), 401
        return f(current_user, *args, **kwargs)
    return decorated

# Ejemplo de uso:
@routes.route('/dashboard_data', methods=['GET'])
@token_required
def dashboard_data(current_user):
    return jsonify({"message": f"Bienvenido {current_user.name}!"})