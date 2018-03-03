export class QuestionSetModel {
    id?: number;
    questionSetName: string;
    totalTime: number;
    totalMark: number;
    selectedQuestionIds?: number[];
    question_id?: number;
    active?: boolean = true;
    created_at?: Date;
    updated_at?: Date;

    constructor(questionSetName: string, totalTime: number, 
        totalMark: number, selectedQuestionIds?: number[], id?: number) {
            this.id = id;
            this.questionSetName = questionSetName;
            this.totalMark = totalMark;
            this.totalTime = totalTime;
            this.selectedQuestionIds = selectedQuestionIds;
    }
}