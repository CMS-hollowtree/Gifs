import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { RestProvider } from './../../providers/rest/rest';
import { PhotoLibrary } from '@ionic-native/photo-library';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	@ViewChild(Slides) slides: Slides;
	appName:string = 'Gifs';
	data:any;

  constructor(public navCtrl: NavController, public restProvider: RestProvider,  public photoLibrary: PhotoLibrary) {
  	this.getGifs(0);
  }

  slideChanged() {
    if(this.slides.isEnd()){
    	this.getGifs(this.data.length);
    }
  }


  saveToAlbum(url){
	let album = this.appName;
	  this.photoLibrary.saveImage(url,album).then((entry=>{
	    console.log('download complete: ' + entry.photoURL);
	  }),
	  (error) => {
	    // handle error
		console.log(error);
  		});
	}



  getGifs(offset){
  	this.restProvider.getData(offset)
  		.subscribe(res => {
  			if(offset > 0){
  				res.forEach(obj =>{
  					this.data.push(obj);
  				});
  				
  				console.log('getting more', this.data)
  			}else{
  				this.data = res;
  				console.log('less');
  			}

  		});
  }

}
