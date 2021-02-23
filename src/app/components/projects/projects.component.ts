import { Component, OnInit } from '@angular/core';
import { Project} from '../../models/project';
import { ProjectService} from '../../services/project.service';
import { Global } from '../../services/global';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  providers: [ProjectService]
})
export class ProjectsComponent implements OnInit {

  public projects: Array<Project>;
  public url: string;

  constructor(
    private _projectService : ProjectService,
  ) {
    this.url = Global.url;
    this.projects = [];
  }

  ngOnInit() {
    this.getProjects();
  }

  getProjects(){
    this._projectService.getProjects().subscribe(
      response => {
        console.log(response);
        if (response.projects){
          this.projects = response.projects;
        }
      },
      error => {
        console.log(error as any);
      }
    );
  }

}
