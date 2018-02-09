import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { RestProvider } from './../../providers/rest/rest';
import { PhotoLibrary } from '@ionic-native/photo-library';
import { SocialSharing } from '@ionic-native/social-sharing';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	@ViewChild(Slides) slides: Slides;
	appName:string = 'Gifs';
	data:any;

  constructor(public navCtrl: NavController, public restProvider: RestProvider,  public photoLibrary: PhotoLibrary, private socialSharing: SocialSharing) {
  	this.getGifs(0);
  }

  slideChanged() {
    if(this.slides.isEnd()){
    	this.getGifs(this.data.length);
    }
  }


  saveToAlbum(id){
  	this.photoLibrary.requestAuthorization().then(() => {
	 	let album = this.appName;
		let url = 'https://media.giphy.com/media/'+id+'/giphy.gif'
		  this.photoLibrary.saveImage(url,album).then((entry=>{
		    console.log('download complete: ' + entry.photoURL);
		  }),
	  	(error) => {
	    	// handle error
			alert(error);
  			});
		}).catch(err => alert('permissions weren\'t granted'));
	
	}

	regularShare(id){
	  var msg = 'https://giphy.com/embed/'+id
	  this.socialSharing.share(msg, null, null, null);
	}


  getGifs(offset){
  	this.restProvider.getData(offset)
  		.subscribe(res => {
  			if(offset > 0){
  				res.forEach(obj =>{
  					this.data.push(obj);
  					console.log(obj);
  				});
  				
  				console.log('getting more', this.data)
  			}else{
  				this.data = res;
  				console.log('less');
  			}

  		});
  }

}
