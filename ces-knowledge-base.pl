% this allows us to change the values in the 
% statistic predicate
:- dynamic stats/3.

% 1st represents the number of persons diagnose
% 2nd represents the number of persons with mild symptoms
% 3rd represents the number of persons with severe symptoms
stats(0,0,0).

% there are the symptoms related to low blood pressure
symptom(low_blood_pressure, fainting).
symptom(low_blood_pressure, dizziness).
symptom(low_blood_pressure, blurry_vision).

% there are the symptoms related to covid
symptom(mild, fatigue).
symptom(mild, coughs).
symptom(mild, loss_of_taste).

symptom(severe, short_of_breath).
symptom(severe, chest_pain).
symptom(severe, loss_of_speech).

get_temperature(FahrTemp, CelcTemp):-
    % not going to included the question because 
    % it is handled by the UI
    FahrTemp is CelcTemp * 9 / 5 + 32.

fever(Effect, FahrTemp):-
    (FahrTemp >= 100.4 -> Effect is 1; Effect is 0).

% if there is two mild symptoms, the number of severe symptoms 
% are less than the number of mild symptoms then mild symptoms.
% else if severe symptoms are two or more than mild when mild
% is two, then severe else nothing. Please see [example] below.

% mild: (0,1,2), severe: X>2 <- this person suffers from severe symptoms
% mild: X<3, severe: (0,1)   <- this person suffers from mild symptoms
% mild: Y<1, severe: X<1     <- this person doesn't have covid

covid(ListOfMildSymptoms, ListOfSevereSymptoms, Temperature, Diagnosis):-
    check_mild_symptom(ListOfMildSymptoms, Temperature, MildEffect),
    check_severe_symptom(ListOfSevereSymptoms, SevereEffect),
    ((MildEffect < 3, SevereEffect > MildEffect; SevereEffect > 2) -> Diagnosis = 'severe';
     (MildEffect > 2, SevereEffect < MildEffect) -> Diagnosis = 'mild';
     Diagnosis = 'not_known').

check_mild_symptom(ListOfCovidSymptom, Temperature, TotalEffect):-
    get_temperature(FahrTemp, Temperature),
    fever(FeverEffect, FahrTemp),
    check_symptom(mild, ListOfCovidSymptom, Effect),
    TotalEffect is FeverEffect + Effect.

check_severe_symptom(ListOfCovidSymptom, TotalEffect):-
    check_symptom(severe, ListOfCovidSymptom, TotalEffect).

low_blood_pressure(ListOfSymptoms, Effect):-
    check_symptom(low_blood_pressure, ListOfSymptoms, Effect).

check_symptom(low_blood_pressure, [], 0).
check_symptom(mild, [], 0).
check_symptom(severe, [], 0).
check_symptom(X, [H|T], N):-
    symptom(X, H),
    check_symptom(X, T, NT),
    N is 1 + NT.

check_dia_sys_level:-
    check_diastolic_reading(DiaEffect),
    check_systolic_reading(SysEffect),
    ((DiaEffect == 1; SysEffect == 1) -> 
        write("might have low blood pressure");
        write("don't have low blood pressure")).

check_diastolic_reading(Effect):-
    read(Level),
    (Level < 60 -> Effect is 1; Effect is 0).

check_systolic_reading(Effect):-
    read(Level),
    (Level < 90 -> Effect is 1; Effect is 0).

update(Diagnosis):-
    (Diagnosis == 'severe' -> updateStats(0, 1);
     Diagnosis == 'mild' -> updateStats(1, 0);
     updateStats(0,0)).

updateStats(NM, NS):-
    stats(CT, CM, CS),
    NewTotal is CT + 1, NewMild is CM + NM, NewSevere is CS + NS,
    retractall(stats(_,_,__)),
    assert(stats(NewTotal, NewMild, NewSevere)).
    