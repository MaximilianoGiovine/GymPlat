from database import db  # En lugar de importar desde app.py

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)

class Exercise(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    repetitions = db.Column(db.Integer, nullable=False)
    weight = db.Column(db.Float, nullable=True)
    last_updated = db.Column(db.DateTime, default=db.func.current_timestamp())

class Routine(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    day = db.Column(db.String(50), nullable=False)  # "Lunes", "Martes", etc.
    exercise_id = db.Column(db.Integer, db.ForeignKey('exercise.id'), nullable=False)