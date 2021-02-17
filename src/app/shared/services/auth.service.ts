import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { TokenStorageService } from './token-storage.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(
        private afAuth: AngularFireAuth,
        private tokenStorage: TokenStorageService,
        private router: Router,
        public ngZone: NgZone,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar
    ) { }

    doLogin(value: { email: string; password: string; }): Promise<any> {
        return this.afAuth.signInWithEmailAndPassword(value.email, value.password)
            .then(login => {
                login.user?.getIdTokenResult().then(token => {
                    this.tokenStorage.saveToken(token.token);
                });
                this.tokenStorage.saveUser(login);
                this.router.navigate(['/tabs']);
                return true;
            },
                err => {
                    console.log('err ' + err);
                    return err.message;
                }
            );
    }

    doNewToken(): void {
        this.afAuth.idToken.subscribe(
            (idToken) => {
                this.tokenStorage.saveToken(idToken);
            },
            (error) => {
                console.log(error);
            }
        );
    }

    doRegister(value: { email: string; password: string; }): Promise<any> {
        return this.afAuth.createUserWithEmailAndPassword(value.email, value.password).then(res => {
            console.log(res);
            res.user.sendEmailVerification();
            return 'Your account has been created';
        }, err => {
            console.log('err ' + err);
            return err.message;
        });
    }

    doLogout(): Promise<any> {
        this.tokenStorage.signOut();
        return this.afAuth.signOut()
            .then(
                () => true,
                err => {
                    console.log('err ' + err);
                    return err.message;
                }
            );
    }

    isLoggedIn(): void {
        this.afAuth.onAuthStateChanged(userInfo => {
            if (userInfo) {
                this.router.navigate(['/tabs']);
                this.splashScreen.hide();
            }
            else {
                this.router.navigate(['/auth/login']);
                this.splashScreen.hide();
            }
        });
        this.statusBar.styleDefault();
    }
}
