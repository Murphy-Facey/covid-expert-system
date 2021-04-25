% this allows us to change the values in the 
% statistic predicate
:- dynamic stats/3.
:- dynamic symptom/2.

% 1st represents the number of persons diagnose
% 2nd represents the number of persons with mild symptoms
% 3rd represents the number of persons with severe symptoms
stats(0, 0, 0).

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


get_other_symptoms(Values):-
    symptom(X, Values), X \= low_blood_pressure.

% ------------------------------------------------------
%        U P D A T E   T H E   S Y M P T O M S
% ------------------------------------------------------
add_symptom(Type, Symptom, Message):-
    (symptom(Type, Symptom) -> Message = 'Symptom was not added'; assert(symptom(Type, Symptom)), Message = 'Symptom was added').

delete_symptom(Type, Symptom, Message):- 
    (symptom(Type, Symptom) -> retract(symptom(Type, Symptom)), Message = 'Symptom was removed'; Message = 'Symptom was not found').
    
get_temperature(FahrTemp, CelcTemp):-
    % not going to included the question because 
    % it is handled by the UI
    FahrTemp is CelcTemp * 9 / 5 + 32.

fever(Effect, FahrTemp):-
    (FahrTemp >= 100.4 -> Effect is 1; Effect is 0).

% ------------------------------------------------------
%          C O R O N A   -   C O V I D   1 9 
% ------------------------------------------------------
% if there is two mild symptoms, the number of severe 
% symptoms are less than the number of mild symptoms 
% then mild symptoms. Else if severe symptoms are two or 
% more than mild when mild is two, then severe else nothing. 
% ------------------------------------------------------
% Please see [example] below.
% ------------------------------------------------------
% mild: (0,1,2), severe: X>2 <- this person suffers from severe symptoms
% mild: X<3, severe: (0,1)   <- this person suffers from mild symptoms
% mild: Y<1, severe: X<1     <- this person doesn't have covid

covid(ListOfMildSymptoms, ListOfSevereSymptoms, Temperature, Diagnosis):-
    check_mild_symptom(ListOfMildSymptoms, Temperature, MildEffect),
    check_severe_symptom(ListOfSevereSymptoms, SevereEffect),
    ((MildEffect < 3, SevereEffect >= MildEffect; SevereEffect > 2) -> Diagnosis = 'severe';
     (MildEffect > 2, SevereEffect < MildEffect) -> Diagnosis = 'mild';
     Diagnosis = 'not_known').

check_mild_symptom(ListOfCovidSymptom, Temperature, TotalEffect):-
    get_temperature(FahrTemp, Temperature),
    fever(FeverEffect, FahrTemp),
    check_symptom(mild, ListOfCovidSymptom, Effect),
    TotalEffect is FeverEffect + Effect.

check_severe_symptom(ListOfCovidSymptom, TotalEffect):-
    check_symptom(severe, ListOfCovidSymptom, TotalEffect).

% ------------------------------------------------------
%          L O W   B L O O D   P R E S S U R E
% ------------------------------------------------------
% The following rules checks the patient's possibility
% of having low blood pressure. This is done by checks 
% what blood pressure related symptom the patient has if
% the patient has any. If the patient is suffering from
% any of the symptom, then their diastolic and systolic
% levels are check and the results returned to them.

low_blood_pressure(ListOfSymptoms, Effect):-
    check_symptom(low_blood_pressure, ListOfSymptoms, Effect).

% ------------------------------------------------------
%  UPDATES LOW BLOOD PRESSURE SYMPTOMS
% ------------------------------------------------------
add_low_blood_pressure_symptom(Symptom, Message):-
    (symptom(low_blood_pressure, Symptom) -> Message = 'already added'; assert(symptom(low_blood_pressure, Symptom)), Message = 'symptom added').

% ------------------------------------------------------
%  CHECKS FOR DIASTOLIC AND SYSTOLIC LEVELS         
% ------------------------------------------------------

check_dia_sys_level(Di_level, Sy_level, Effect):-
    check_diastolic_reading(DiaEffect, Di_level),
    check_systolic_reading(SysEffect, Sy_level),
    ((DiaEffect == 1; SysEffect == 1) -> 
        Effect is 1;
        Effect is 0).

% ------------------------------------------------------
%  CHECKS FOR DIASTOLIC LEVELS         
% ------------------------------------------------------
check_diastolic_reading(Effect, Level):-
    (Level < 60 -> Effect is 1; Effect is 0).

% ------------------------------------------------------
%  CHECKS FOR SYSTOLIC LEVELS         
% ------------------------------------------------------
check_systolic_reading(Effect, Level):-
    (Level < 90 -> Effect is 1; Effect is 0).


check_symptom(low_blood_pressure, [], 0).
check_symptom(mild, [], 0).
check_symptom(severe, [], 0).

check_symptom(X, [H|T], N):-
    symptom(X, H),
    check_symptom(X, T, NT),
    N is 1 + NT.

% ------------------------------------------------------
%   U P D A T E S   S T A T I S T I C S   V A L U E S           
% ------------------------------------------------------
update(Diagnosis):-
    (Diagnosis == 'severe' -> updateStats(0, 1);
     Diagnosis == 'mild' -> updateStats(1, 0);
     updateStats(0,0)).

updateStats(NM, NS):-
    stats(CT, CM, CS),
    NewTotal is CT + 1, NewMild is CM + NM, NewSevere is CS + NS,
    retractall(stats(_,_,__)),
    assert(stats(NewTotal, NewMild, NewSevere)).

% ------------------------------------------------------
%                  T R E A T M E N T S         
% ------------------------------------------------------
treatment(Diagnosis, Treatment):-
    ((Diagnosis == 'severe'; Diagnosis == 'mild') -> 
     Treatment = [
        'Call your health care provider or COVID-19 hotline to find out where and when to get a test.',
        'Cooperate with contact-tracing procedures to stop the spread of the virus.',
        'If testing is not available, stay home and away from others for 14 days.',
        'While you are in quarantine, do not go to work, to school or to public places. Ask someone to bring you supplies.',
        'Keep at least a 1-metre distance from others, even from your family members.',
        'Wear a medical mask to protect others, including if/when you need to seek medical care.',
        'Clean your hands frequently.',
        'Stay in a separate room from other family members, and if not possible, wear a medical mask.',
        'Keep the room well-ventilated.',
        'If you share a room, place beds at least 1 metre apart.',
        'Monitor yourself for any symptoms for 14 days.',
        'Call your health care provider immediately if you have any of these danger signs: difficulty breathing, loss of speech or mobility, confusion or chest pain.',
        'Stay positive by keeping in touch with loved ones by phone or online, and by exercising at home.'
	 ];
     Diagnosis == 'not_known' -> 
     Treatment = [
        'Stay home as much as you can',
        'Keep a safe distance (6ft or more)',
        'Wear a mask when leaving the comfort and safety of your home',
        'Wash hands often',
        'Cover your cough',
        'Feel sick? Call ahead'
	 ]).
    
