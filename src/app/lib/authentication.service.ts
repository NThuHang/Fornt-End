import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private userSubject: BehaviorSubject<User>;
    public User: Observable<User>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('User')));
        this.User = this.userSubject.asObservable();
    }

    public get userValue(): User {
        return this.userSubject.value;
    }

    login(username: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}/api/users/xacthuctk`, { username, password })
        .pipe(map(User => {
            //debugger;
            // lưu trữ tài khoản và mã jwt token trong bộ nhớ cục bộ để giữ cho người dùng luôn đăng nhập giữa các lần làm mới trang
            localStorage.setItem('User', JSON.stringify(User));
            this.userSubject.next(User);
            return User;
        }));
    }

    logout() {
        // Đăng xuất tài khoản trở lại trang login
        localStorage.removeItem('User');
        this.userSubject.next(null);
        this.router.navigate(['/login']);
    }

    remove() {
        // Xóa tài khoản
        localStorage.removeItem('User');
        this.userSubject.next(null);
    }
}
