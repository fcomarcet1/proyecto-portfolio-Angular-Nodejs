import { Injectable } from '@angular/core';
import { Global } from './global';

@Injectable()
export class UploadService{
  public url: string;

  constructor(){
    this.url = Global.url;
  }

  // Peticion Ajax clasica
  makeFileRequest(url: string, params: Array<string>, files: Array<File>, name: string){

    return new Promise(function(resolve, reject){

      // Simulamos un form clasico
      var formData: any = new FormData();
      var xhr = new XMLHttpRequest();

      // recorremos el array de archivos que nos llega
      for (let i = 0; i < files.length; i++){
        formData.append(name, files[i], files[i].name);
      }

      // Peticion Ajax
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            resolve(JSON.parse(xhr.response));
          }
          else {
            reject(xhr.response);
          }
        }
      },

      // Peticion POST
      xhr.open('POST', url, true);
      xhr.send(formData);
    });
  }

}
