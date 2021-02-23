import { Component, OnInit } from '@angular/core';
import { Project} from '../../models/project';
import { ProjectService} from '../../services/project.service';
import { Global} from '../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  providers: [ProjectService]
})
export class DetailComponent implements OnInit {
  public url: string;
  public project: Project;
  public year: number;
  public date: Date;

  constructor(
    private _projectService: ProjectService,
    private _router: Router,
    private _route: ActivatedRoute,
  ) {
    this.date = new Date();
    this.year = this.date.getFullYear();
    this.url = Global.url;
    this.project = new Project('', '', '', '',  this.year, '', '');
  }

  ngOnInit(){
    this._route.params.subscribe(params => {
      let id = params.id; // get id at url
      this.getProject(id);
    });
  }

  getProject(id: string){
    this._projectService.getProject(id).subscribe(
      response => {
        this.project = response.project;
      },
      error => {
        console.log(error as any);
      }
    );
  }
}
