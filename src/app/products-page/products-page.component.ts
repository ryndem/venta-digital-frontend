import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'app/model/product';
import {
  ProductResponse,
  ProductsService,
  SearchProductProps,
} from 'app/services/products.service';

@Component({
  selector: 'products-page',
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.scss',
})
export class ProductsPageComponent implements OnInit {
  productPage: ProductResponse | null = null;

  totalResults: number = 0;
  sortDirection: string = 'ASC';
  productss: Product[] = [];
  isLoading: boolean = false;

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private currentRoute: ActivatedRoute,
  ) {}

  async ngOnInit(): Promise<void> {
    this.currentRoute.queryParams.subscribe(async (params) => {
      const searchParams = {
        page: params['page'] || 1,
        sortDirection: params['sortDirection'] || 'ASC',
        category: params['category'] || null,
        q: params['searchTerm'] || null,
      };
      this.sortDirection = searchParams.sortDirection;
      this.loadPage(searchParams);
    });
  }

  async loadPage(searchParams: any) {
    this.isLoading = true;
    this.productPage =
      await this.productsService.listProductsByCategory(searchParams);
    this.isLoading = false;
  }

  toggleSortDirection() {
    this.sortDirection = this.sortDirection == 'ASC' ? 'DESC' : 'ASC';

    this.router.navigate([], {
      relativeTo: this.currentRoute,
      queryParams: {
        sortDirection: this.sortDirection,
      },
      queryParamsHandling: 'merge',
    });
  }
}
