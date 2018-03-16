import { OnInit, Component } from "@angular/core";
import { SubjectAreaService } from "../subject-area/service/subject-area.service";

@Component({
    selector: 'exam',
    templateUrl: './exam.component.html'
})
export class ExamComponent implements OnInit {

    constructor(private _subjectService: SubjectAreaService) { }

    ngOnInit(): void {
    }

    startExam() {
        console.log("clicked");
        this._subjectService.prepareExam()
            .then(response => { console.log(response); })
            .catch(error => { console.log(error); });
    }
}