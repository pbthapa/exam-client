export class QuestionSetModel {
    id?: number;
    question_set_name: string;
    total_time: number;
    total_mark: number;
    selectedQuestionIds?: number[];
    question_id?: number;
    active?: boolean = true;
    created_at?: Date;
    updated_at?: Date;

    constructor(questionSetName: string, totalTime: number, 
        totalMark: number, selectedQuestionIds?: number[], id?: number) {
            this.id = id;
            this.question_set_name = questionSetName;
            this.total_mark = totalMark;
            this.total_time = totalTime;
            this.selectedQuestionIds = selectedQuestionIds;
    }
}