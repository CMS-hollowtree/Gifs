import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {
	url:string;
	offset:number;
	limit:number = 10;
	query:string = 'pepe the frog';
	apiKey:string = 'dc6zaTOxFJmzC';

  constructor(public http: HttpClient) {
    this.url = 'http://api.giphy.com/v1/gifs/search?q='+this.query+'&limit='+this.limit+'&offset=';

  }

  getData(offset){
  	return this.http.get(this.url+offset+'&api_key='+this.apiKey)
  		.map(res => (res['data']));
  }

}
