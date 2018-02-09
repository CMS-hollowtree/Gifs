import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { RestProvider } from './../../providers/rest/rest';

import { PhotoLibrary } from '@ionic-native/photo-library';
import { SocialSharing } from '@ionic-native/social-sharing';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	@ViewChild(Slides) slides: Slides;
	appName:string = 'Gifs';
	data:any;

  constructor(public navCtrl: NavController, public restProvider: RestProvider,  public photoLibrary: PhotoLibrary, private socialSharing: SocialSharing, private admobFree : AdMobFree) {
  	this.getGifs(0);
  }

  ionViewDidLoad(){
  	this.showBannerAd();
  }

  slideChanged() {
  	this.showBannerAd();
    if(this.slides.isEnd()){
    	this.getGifs(this.data.length);
    }
  }

  showBannerAd(){
  	const bannerConfig: AdMobFreeBannerConfig = {
	 // add your config here
	 // for the sake of this example we will just use the test config
	 isTesting: true,
	 autoShow: true
	};
	this.admobFree.banner.config(bannerConfig);

	this.admobFree.banner.prepare()
	  .then(() => {
	    // banner Ad is ready
	    // if we set autoShow to false, then we will need to call the show method here
	  })
	  .catch(e => console.log(e));
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
	  var img = 'https://media.giphy.com/media/'+id+'/giphy.gif'
	  this.socialSharing.share(null, null, img, null);
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
