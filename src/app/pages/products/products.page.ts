import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  products: Observable<any>;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.products = this.http.get('https://fakestoreapi.com/products');
  }

  webShare(){
    // check for support of web share API
    if (navigator.share) {
      navigator
        .share({
          title: "走地通下載連結",
          text: "按一按連結即可下載及安裝",
          url: "https://play.google.com/store/apps/details?id=com.rgtshk.app",
        })
        .then(() => console.log("Successful share"))
        .catch((error) => console.log("Error sharing", error));
    } else {
      console.error("Browser doesn't support Web Share API");
    }
  } //END; webShare(){


}