import { Component } from '@angular/core';
import { LoadingService } from '../service/Loader/loading.service';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  constructor(public loader: LoadingService) { }

}
