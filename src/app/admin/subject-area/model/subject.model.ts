export class Subject {

    id: number;
    subject: string;
    active: boolean;

    constructor(id: number, subject: string, active: boolean) {
        this.id = id;
        this.subject = subject;
        this.active = active;
    }
}