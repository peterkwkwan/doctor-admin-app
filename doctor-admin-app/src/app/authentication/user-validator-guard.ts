import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router
} from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user-service';

@Injectable()
export class UserValidatorService implements CanActivate {

    constructor(private router: Router, private http: HttpClient, private userService: UserService) { }

    canActivate(): boolean | Observable<boolean> | Promise<boolean> {
        this.userService.getUserInfo().subscribe(
            (res:any) => {
                if(res.given_name !== null) {
                    return true;
                } else {
                    return false;
                }
            },
            err => {
                return false;
            }
        )
        return false;
    }
}
