import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { IProduct } from "./product";
import { ProductService } from "./product.service";

@Component({
  selector: "pm-products",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"]
})
export class ProductListComponent implements OnInit {
  pageTitle: string = "Product List";
  imageWidth: Number = 50;
  imageMargin: Number = 2;
  showImage: boolean = false;
  errorMessage: string = "";
  sub$: Subscription;
  private _listFilter: string = "";
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    console.log("In setter:", value);
    this.filteredProducts = this.performFilter(value);
  }

  filteredProducts: IProduct[] = [];
  products: IProduct[] = [];
  toggleImage(): void {
    this.showImage = !this.showImage;
  }
  constructor(private productservice: ProductService) {}
  ngOnInit(): void {
    this.sub$ = this.productservice.getProducts().subscribe({
      next: products => {
        this.products = products;
        this.filteredProducts = this.products;
      },
      error: err => (this.errorMessage = err)
    });
    this.filteredProducts = this.products;
    //this.listFilter = "cart";
  }
  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }
  onRatingClicked(message: string): void {
    this.pageTitle = "Product List: " + message;
  }
  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: IProduct) =>
      product.productName.toLocaleLowerCase().includes(filterBy)
    );
  }
}
