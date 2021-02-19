import { Component, OnInit } from '@angular/core';
import { Project} from '../../models/project';
import { ProjectService} from '../../services/project.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [ProjectService]
})
export class CreateComponent implements OnInit {

  public title: string;
  public project: Project;
  public date: Date;
  public year: number;
  public status: string;

  constructor( private _projectService: ProjectService) {
    this.title = 'Create project';
    this.date = new Date();
    this.year = this.date.getFullYear();
    // Create empty object to fill with form (2-way-databinding)
    this.project = new Project('', '', '', '',  this.year, '', '');
    this.status = '';
  }

  ngOnInit(): void {
  }

  onSubmit(form: any){
    console.log(this.project);

    // Almacenamos datos del form
    this._projectService.saveProject(this.project).subscribe(
        response => {
          console.log(response);
          if (response.project){
            this.status = 'success';
          }
          else{
            this.status = 'failed';
          }
        },
        error => {
          console.log(error as any);
        });

  }
}
