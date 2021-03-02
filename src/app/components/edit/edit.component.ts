import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { UploadService } from '../../services/upload.service';
import { Global } from '../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [ProjectService, UploadService]
})
export class EditComponent implements OnInit {
  public title: string;
  public project: Project;
  public save_project: any;
  public status: string;
  public filesToUpload: Array<File>;
  public url: string;
  public date: Date;
  public year: number;

  constructor(
    private _projectService: ProjectService,
    private _uploadService: UploadService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.title = 'Editar proyecto';
    this.url = Global.url;
    this.date = new Date();
    this.year = this.date.getFullYear();
    this.status = '';
    this.filesToUpload = [];
    this.save_project = '';
    this.project = new Project('', '', '', '',  this.year, '', '');

  }

  ngOnInit(){
    this._route.params.subscribe(params => {
      let id = params.id;
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

  onSubmit(){
    this._projectService.updateProject(this.project).subscribe(
      response => {
        if(response.project){

          // Subir la imagen
          if(this.filesToUpload){
            this._uploadService.makeFileRequest(Global.url + 'upload-image/' + response.project._id, [], this.filesToUpload, 'image')
              .then((result: any) => {
                this.save_project = result.project;
                this.status = 'success';
              });
          }
          else{
            this.save_project = response.project;
            this.status = 'success';
          }

        }else{
          this.status = 'failed';
        }
      },
      error => {
        console.log(error as any);
      }
    );
  }


  fileChangeEvent(fileInput: any){
    this.filesToUpload = (fileInput.target.files as Array<File>);
  }



}
