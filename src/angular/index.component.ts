import { Component, ChangeDetectorRef, Inject } from '@angular/core'
import e from '../event-bus'

@Component({
  selector: 'AngularApp',
  template: `
		<div style="margin-top: 100px;">
      <h1>Angular Components</h1>
      <h2>ข้อความจาก React</h2>
      <ul>
      <li *ngFor="let message of messages">
      {{ message }}
    </li>
      </ul>
		</div>
	`,
})
export default class AngularApp {
  messages = []

  constructor(@Inject(ChangeDetectorRef) private changeDetector: ChangeDetectorRef) {}

  ngAfterContentInit() {
    e.on('message', message => {
      this.messages = message.text
      console.log('angular ', this.messages)
      this.changeDetector.detectChanges()
      // this.returnMessageToReactWhenReceived()
    })
  }

  returnMessageToReactWhenReceived() {
    e.emit('received', { text: 'Woohoo! Hello from Angular! 🎉' })
  }
}
