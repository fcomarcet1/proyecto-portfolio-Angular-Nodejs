import { Component, OnInit } from '@angular/core';
import { Project} from '../../models/project';
import { ProjectService} from '../../services/project.service';
import { UploadService} from '../../services/upload.service';
import { Global} from '../../services/global';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [ProjectService, UploadService]
})
export class CreateComponent implements OnInit {

  public title: string;
  public project: Project;
  public date: Date;
  public year: number;
  public status: string;
  public filesToUpload: Array<File>;

  constructor(private _projectService: ProjectService, private _uploadService: UploadService) {
    this.title = 'Create project';
    this.date = new Date();
    this.year = this.date.getFullYear();
    // Create empty object to fill with form (2-way-databinding)
    this.project = new Project('', '', '', '',  this.year, '', '');
    this.status = '';
    this.filesToUpload = [];
  }

  ngOnInit(): void {
  }

  onSubmit(form: any){
    // Guardar datos básicos
    this._projectService.saveProject(this.project).subscribe(
      response => {
        if (response.project){
          // Upload image
          if (this.filesToUpload) {
            this._uploadService.makeFileRequest(Global.url+"upload-image/"+response.project._id, [], this.filesToUpload, 'image')              .then((result: any) => {
                console.log(result);
                this.status = 'success';
                form.reset();
              });
          }
        }
        else {
          this.status = 'failed';
        }
      },
      error => {
        console.log(<any> error);
      }
    );
  }

  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>> fileInput.target.files;
  }

}
