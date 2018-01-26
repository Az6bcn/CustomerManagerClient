import { Component, OnInit } from "@angular/core";
import { ProductServiceService } from "../../Shared/Services/product-service.service";
import { Product } from "../../Model/Product";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"]
})
export class ProductsComponent implements OnInit {
  public dataForTable: Array<Product>;
  isLoading$ = new BehaviorSubject<boolean>(false);

  constructor(private productService: ProductServiceService) {}

  ngOnInit() {
    this.getProducts();
  }

  private getProducts() {
    this.isLoading$.next(true);

    this.productService.getProducts().subscribe(response => {
      this.dataForTable = response;

      this.isLoading$.next(false);
    });
  }

  private getHeaderObject(): Object {
    const tableHeader = {
      name: "ProductName",
      package: "Package",
      unitPrice: "UnitPrice",
      IsDiscontinued: "IsDiscontinued",
      productName: "productName"
    };

    return tableHeader;
  }

  private getModelType() {
    return "Products";
  }
}
