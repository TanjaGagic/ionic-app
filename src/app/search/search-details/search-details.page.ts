import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../search.service';


@Component({
  selector: 'app-search-details',
  templateUrl: './search-details.page.html',
  styleUrls: ['./search-details.page.scss'],
})


export class SearchDetailsPage implements OnInit {

  information = null;

  constructor(private activatedRoute: ActivatedRoute, private searchService: SearchService) { }


  ngOnInit() {

    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.searchService.getDetails(id).subscribe(result => {
      console.log(result);
      this.information = result;
    });
  }

  

 
  }

