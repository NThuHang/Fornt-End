import { Component, OnInit, AfterViewInit, Renderer2 } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit,AfterViewInit {
  title = 'Front-End';
  constructor(private renderer: Renderer2){}
  ngOnInit() {

  }

  ngAfterViewInit() {
   // this.loadScripts();
  }

  public loadScripts() {
    this.renderExternalScript('assets/js/core/jquery.3.2.1.min.js').onload = () => {
    }
  }

  public renderExternalScript(src: string): HTMLScriptElement {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    script.async = true;
    script.defer = true;
    this.renderer.appendChild(document.body, script);
    return script;
  }

}
