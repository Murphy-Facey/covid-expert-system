% covid diagnosis system

go :- hypothesize(Covid),
        write('I think you '),
        write(Covid), nl, undo.

/* HYPOTHOSES TO BE TESTED */
hypothesize('have covid') :- covid, !.
hypothesize('do not have covid').


/* -- RULES FOR DIAGNOSING COVID -- */
covid :-
verify(fever),
verify('dry cough'),
verify('shortness of breath'),
write('Advices and Suggestions'),
nl,
write('Quarantine for two weeks'),
nl.

/* -- RULES ASKING ABOUT THE SYMPTOMS -- */
ask(Symptom) :-
write('Do the patient have the following symptoms: '),
write(Symptom), write('? '),
read(Response), nl,
( (Response == yes; Response == y) ->
    assert(yes(Symptom));
    assert(no(Symptom)), fail).

:- dynamic yes/1,no/1.

verify(S) :- (yes(S) -> true; (no(S) -> fail; ask(S))).

/* -- UNDO ALL ASSERTIONS OF YES AND NO -- */
undo :- retract(yes(_)), fail.
undo :- retract(no(_)), fail.
undo.
