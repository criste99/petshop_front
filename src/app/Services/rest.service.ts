import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(public api: HttpClient) {}
  Url="http://127.0.0.1:8000/api/"
  public async Get (controller:string){
    var respo:any
    await this.api.get(this.Url+controller).toPromise().then((res=>{
      respo=res;
      console.log(respo);
    }))
    return respo;
  }
    async post(controller: string, body: any){
      var response:any
       await this.api.post(this.Url + controller, body).toPromise().then(res=> {
        response=res
      })
      return response
    }

    public async delete(controller: string, Id: String){
      return await this.api.delete(this.Url + controller + "/" + Id)
    }

    public async update(controller: string, id:string, body:any){
      return await this.api.put(this.Url + controller + "/" + id, body)
    }


}
