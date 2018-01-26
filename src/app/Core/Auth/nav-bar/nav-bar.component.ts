import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "./../auth-service/auth.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-nav-bar",
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.css"]
})
export class NavBarComponent implements OnInit {
  private menuStrategyArray: Array<string> = new Array<string>();
  public menuToLoad: Array<string>;
  public isLoggedIn$ = new BehaviorSubject<boolean>(false);

  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.hideLogin();
  }

  private getLoggedInUserRole() {
    const loggedInUserClaims = this.authService.getLoggedInUserClaims();

    if (loggedInUserClaims && loggedInUserClaims.Role) {
      this.menuToLoad = this.loadMenu(loggedInUserClaims.Role);

      this.isLoggedIn$.next(true);
    }
  }

  private loadMenu(role: string) {
    return this.menuStrategy(role);
  }

  private menuStrategy(role: string) {
    this.menuStrategyArray["GeneralManager"] = [
      { Title: "Customers", route: "/customer-manager/general-manager" },
      { Title: "Products", route: "/customer-manager/products" },
      { Title: "Orders", route: "customer-manager/orders" }
    ];

    this.menuStrategyArray["SectionManager"] = [
      { Title: "Customers", route: "/customer-manager/general-manager" },
      { Title: "Products", route: "customer-manager/products" },
      { Title: "Orders", route: "customer-manager/orders" }
    ];

    this.menuStrategyArray["ProductManager"] = [
      { Title: "Customers", route: "/customer-manager/general-manager" },
      { Title: "Products", route: "customer-manager/products" },
      { Title: "Orders", route: "customer-manager/orders" }
    ];

    this.menuStrategyArray["SupplyManager"] = [
      { Title: "Customers", route: "/customer-manager/general-manager" },
      { Title: "Products", route: "customer-manager/products" },
      { Title: "Orders", route: "customer-manager/orders" }
    ];

    return this.menuStrategyArray[role];
  }

  private logOut() {
    this.authService.logOut();
    this.isLoggedIn$.next(false);

    this.hideLogin();

    this.router.navigate(["/account/login"], {
      relativeTo: this.activatedRoute
    });
  }

  /**
   * Hides the menus when no token in local storage
   */
  hideLogin() {
    this.LoadMenuTabs();

    return this.authService.checkLocalStorageForToken();
  }

  private LoadMenuTabs() {
    if (this.authService.checkLocalStorageForToken()) {
      this.getLoggedInUserRole();
    }
  }
}
