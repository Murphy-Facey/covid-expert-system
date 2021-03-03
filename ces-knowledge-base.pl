% this allows us to change the values in the 
% statistic predicate
:- dynamic stats/3.

% 1st represents the number of persons diagnose
% 2nd represents the number of persons with mild symptoms
% 3rd represents the number of persons with severe symptoms
stats(0,0,0).

symptom(low_blood, fainting).
symptom(low_blood, dizziness).
symptom(low_blood, blurry_vision).

% there are the symptoms related to low blood pressure
symptom("low blood pressure", "fainting").

% there are the symptoms related to covid
symptom("mild", "<insert_symptom_here>").
symptom("severe", "<insert_symptom_here>").

get_temperature(FahrTemp):-
    % not going to included the question because 
    % it is handled by the UI
    read(CelcTemp),
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

covid:-
    get_temperature(FahrTemp),
    fever(FeverEffect, FahrTemp),
	(FeverEffect == 1 -> write('Has fever'); write('does not have fever')).

low_blood_pressure(ListOfSymptoms, Effect) :-
    (check_symptom(low_blood,X, Effect).

check_symptom(low_blood, [], 0).
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
    
symptom(Effect, Symptom):-
    write(Symptom), write(" ?"),
    read(Response),
    ((Response == yes; Response == y) -> Effect is 1; Effect is 0)).
