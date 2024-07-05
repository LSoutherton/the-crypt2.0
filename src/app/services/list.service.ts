import { Injectable, OnInit } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class ListService {
    constructor() { }

    private list = new BehaviorSubject<[]>([]);

    public shareList = this.list.asObservable();

    updateList(newList: any) {
        this.list.next(newList);
    }
}