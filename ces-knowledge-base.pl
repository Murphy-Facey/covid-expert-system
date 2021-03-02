% this allows us to change the values in the 
% statistic predicate
:- dynamic stats/3.

% 1st represents the number of persons diagnose
% 2nd represents the number of persons with mild symptoms
% 3rd represents the number of persons with severe symptoms
stats(0,0,0).

symptom("low blood pressure", "fainting").
symptom("unknown", "fainting").

symptom(fever).
lowBloodSym(fever).

get_temperature(FahrTemp):-
    % not going to included the question because 
    % it is handled by the UI
    read(CelcTemp),
    FahrTemp is CelcTemp * 9 / 5 + 32.

fever(Effect, FahrTemp):-
    (FahrTemp >= 100.4 -> Effect is 1; Effect is 0).

% mild: 2, severe: 2 -> 
% mild: 2, severe: 2
% mild: 3, severe: 1
% mild: 1, severe: 1


% if there is two mild symptoms, the number of severe symptoms 
% are less than the number of mild symptoms then mild symptoms.
% else if severe symptoms are two or more than mild when mild
% is two, then severe
% else nothing

covid:-
    get_temperature(FahrTemp),
    fever(FeverEffect, FahrTemp),
	(FeverEffect == 1 -> write('Has fever'); write('does not have fever')).

lowBloodSym(low_blood_pressure).
symp(low_blood_pressure).

low_blood(Sym1, Sym2, Sym3, Effect) :-
    (lowBloodSym(Sym1); lowBloodSym(Sym2); lowBloodSym(Sym3) -> 
    Effect is 1; Effect is 0).

/*low_blood_pressure(...):-
    symptom(DizzyEffect, Symp1),
    symptom(FaintEffect, "fainting"),
    symptom(BlurEffect, "blurry vision"),
    TotalEffect is DizzyEffect + BlurEffect + FaintEffect,
    (TotalEffect > 1 -> check_dia_sys_level; fail).*/

check_dia_sys_level:-
    check_diastolic_reading(DiaEffect),
    check_systolic_reading(SysEffect),
    ((DiaEffect == 1, SysEffect == 1) -> write("might have low blood pressure");write("don't have low blood pressure")).

check_diastolic_reading(Effect):-
    read(
    
    
symptom(Effect, Symptom):-
    write(Symptom), write(" ?"),
    read(Response),
    ((Response == yes; Response == y) -> Effect is 1; Effect is 0)).
