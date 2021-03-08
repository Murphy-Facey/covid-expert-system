import eel
from pyswip import Prolog

prolog = Prolog()
eel.init('ui')

# GLOBAL VARIABLES 
full_name = ''
diagnosis = ''
levels = [0,0] # this stores the value for both the diastolic and systolic levels
temperature = 0

# FUNCTIONS
@eel.expose
def get_symptoms(type):
    symptoms_query = list(prolog.query(f'symptom({type}, X).'))
    return extract_results(symptoms_query)

@eel.expose
def have_hypotension(symptoms):
    hypotension = list(prolog.query(f'low_blood_pressure({symptom}, X).'))
    return extract_results(hypotension)

@eel.expose
def check_level(levels):
    pass

@eel.expose
def update_symptoms(symptom):
    pass

@eel.expose
def have_covid(mild_symptoms, severe_symptoms, temperature):
    pass

# REGULAR PYTHON FUNCTIONS 
def extract_results(query_result):
    result = []
    for item in query_result:
        result.append(item['X'])
    return result

def update_statistics(diagnosis):
    prolog.query(f'update({diagnosis}).')
    # call javascript function here

def get_treatments(diagnosis):
    t = list(prolog.query(f'treatment({diagnosis}).'))
    # call javascript function here

eel.start('main.html', mode='electron')