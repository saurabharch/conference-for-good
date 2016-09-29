import { Component, ViewChild, OnInit, NgZone } from '@angular/core';

import { Speaker } from '../../shared/speaker.model';
import { SpeakerService } from '../../shared/speaker.service';
import { AuthService } from '../../shared/auth.service';
import { TransitionService } from '../../shared/transition.service';
import { ToastComponent } from '../../shared/toast.component';

@Component({
   selector: 'headshot',
   templateUrl: './headshot.component.html',
   styleUrls: ['./headshot.component.scss']
})

export class HeadshotComponent implements OnInit {

    @ViewChild('toast') toast: ToastComponent;

    speaker: Speaker;

    constructor(private transitionService: TransitionService,
                private authService: AuthService,
                private speakerService: SpeakerService) {

        this.authService.user.subscribe(user => {
            this.speaker = this.speakerService.getSpeaker(user._id);
        });

    };

    private zone: NgZone;
    private options: Object = {
        url: 'http://localhost:4200/api/upload',
        filterExtensions: true,
        allowedExtensions: ['image/png', 'image/jpg'],
        calculateSpeed: true
    };
    private progress: number = 0;
    private response: any = {};

    ngOnInit() {
        this.transitionService.transition();
        this.zone = new NgZone({ enableLongStackTrace: false });
    }

    handleUpload(data: any): void {
        this.zone.run(() => {
            this.response = data;
            this.progress = Math.floor(data.progress.percent / 100);
        });
    }
}