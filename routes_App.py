from flask import Blueprint, request, jsonify
from database import db
from models import User, Exercise, Routine

routes = Blueprint('routes', __name__)

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
    data = request.get_json()
    exercise = Exercise.query.get(data['exercise_id'])
    if exercise:
        exercise.weight = data['weight']
        exercise.repetitions = data['repetitions']
        db.session.commit()
        return jsonify({"message": "Ejercicio actualizado"}), 200
    return jsonify({"error": "Ejercicio no encontrado"}), 404