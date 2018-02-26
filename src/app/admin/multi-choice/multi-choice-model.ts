import { Subject } from './../subject-area/model/subject.model';

export class MultiChoiceModel {
    id: number;
    subjectId: number;
    question: string;
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
    correctOption: string;
    level: number;
    active: boolean;
    subjectArea?: Subject;

    constructor(id: number, subjectId: number, question: string, optionA: string, optionB: string,
    optionC: string, optionD: string, correctOption: string, level: number, active: boolean) {
        this.id = id;
        this.subjectId = subjectId;
        this.question = question;
        this.optionA = optionA;
        this.optionB = optionB;
        this.optionC = optionC;
        this.optionD = optionD;
        this.correctOption = correctOption;
        this.level= level;
        this.active = active;
    }
}