import { Subject } from './../subject-area/model/subject.model';

export class MultiChoiceModel {
    id: number;
    subject_id: number;
    question: string;
    option_a: string;
    option_b: string;
    option_c: string;
    option_d: string;
    correct_option: string;
    level: number;
    active: boolean;
    subjectArea?: Subject;

    constructor(id: number, subjectId: number, question: string, optionA: string, optionB: string,
    optionC: string, optionD: string, correctOption: string, level: number, active: boolean) {
        this.id = id;
        this.subject_id = subjectId;
        this.question = question;
        this.option_a = optionA;
        this.option_b = optionB;
        this.option_c = optionC;
        this.option_d = optionD;
        this.correct_option = correctOption;
        this.level= level;
        this.active = active;
    }
}