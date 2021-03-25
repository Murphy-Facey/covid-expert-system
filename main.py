import eel
from pyswip import Prolog

new_file = []

with open("ces-knowledge-base.pl", "r") as f:
    new_file = f.readlines()

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
    update_symptom_kb(type, symptom)
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
    have_covid_query = list(prolog.query(f'covid({mild_symptoms}, {severe_symptoms}, {temperature}, X).'))
    return extract_results(have_covid_query);

@eel.expose
def update_statistics(diagnosis):
    get_stats_query = list(prolog.query(f'update({diagnosis}), stats(X, Y, Z).'))
    stuff = extract_results_2(get_stats_query)
    update_kb(stuff)
    return stuff

@eel.expose
def get_treatments(diagnosis):
    t = list(prolog.query(f'treatment({diagnosis}, X).'))
    query = [str(elem) for elem in extract_results(t)[0]] 
    return query

# REGULAR PYTHON FUNCTIONS

def extract_results(query_result):
    result = []
    for item in query_result:
        result.append(item['X'])
    return result

def extract_results_2(query_result):
    result = []
    for item in query_result:
        result.append(item['X'])
        result.append(item['Y'])
        result.append(item['Z'])
    return result

def update_symptom_kb(type, symptom):
    global new_file
    line_number = 11
    if type == 'mild':
        line_number = new_file.index('symptom(mild, fatigue).\n')
    if type == 'severe':
        line_number = new_file.index('symptom(severe, short_of_breath).\n')

    new_file.insert(line_number, f'symptom({type}, {symptom}).\n')
    print(new_file[line_number])

def update_kb(value):
    global new_file
    new_file[8] = f'stats({value[0]}, {value[1]}, {value[2]}).\n'
    with open("ces-knowledge-base.pl", "w") as f:
        f.writelines(new_file)

eel.start('index.html', mode='electron')
