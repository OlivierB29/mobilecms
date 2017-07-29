import { Component, Input } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  moduleId: module.id,
  selector: 'app-imagelist',
  templateUrl: 'imagelist.component.html',
  styleUrls: ['imagelist.component.css']
})
export class ImageListComponent  {
  /**
  * offset for LazyLoadImageModule
  */
  offset = 100;

  /**
  * default image displayed by  for LazyLoadImageModule
  */
  defaultImage = environment.server + '/' + environment.public + '/resources/ring-alt-32.svg';


  @Input() images: any[];
}
