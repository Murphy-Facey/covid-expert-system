import eel
from pyswip import Prolog

prolog = Prolog()
prolog.consult('ces-knowledge-base.pl')

eel.init('ui')

# GLOBAL VARIABLES
full_name = ''
diagnosis = ''
# this stores the value for both the diastolic and systolic levels
levels = [0, 0]
temperature = 0

# FUNCTIONS


@eel.expose
def get_symptoms(type):
    symptoms_query = list(prolog.query(f'symptom({type}, X).'))
    return extract_results(symptoms_query)


@eel.expose
def get_types():
    type_query = list(prolog.query('symptom(X, _).'))
    return extract_results(type_query)


@eel.expose
def have_hypotension(symptoms):
    hypotension = list(prolog.query(f'low_blood_pressure({symptoms}, X).'))
    return extract_results(hypotension)


@eel.expose
def check_level(di_level, sy_level):
    check_level_query = list(prolog.query(
        f'check_dia_sys_level({di_level}, {sy_level}, X).'))
    return extract_results(check_level_query)


@eel.expose
def update_symptoms(type, symptom):
    update_symptom_query = list(prolog.query(
        f'add_symptom({type}, {symptom}, X).'))
    return extract_results(update_symptom_query)


@eel.expose
def remove_symptom(type, symptom):
    remove_symptom_query = list(prolog.query(
        f'delete_symptom({type}, {symptom}, X).'))
    return extract_results(remove_symptom_query)


@eel.expose
def get_other_symptoms():
    get_symptom_query = list(prolog.query(
        f'get_other_symptoms(X).'))
    return extract_results(get_symptom_query)


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


eel.start('index.html', mode='electron')
