import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class RouteService {
    constructor() { }

    private path = new BehaviorSubject<string>('test');

    public sharePath = this.path.asObservable();

    updatePath(text: string) {
        this.path.next(text);
    }
}