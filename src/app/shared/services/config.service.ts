import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HeadersService } from './headers.service';
import { NotificationsService } from './notifications.service';
import { Storage } from '@ionic/storage';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {
    constructor(
        private http: HttpClient,
        private router: Router,
        private storage: Storage,
        private notificationsService: NotificationsService,
        private headers: HeadersService,
    ) { }
    getConfig() {
        this.http.get('assets/data.json').subscribe(config => {
            this.storage.set('config', config);
        });
    }
}
