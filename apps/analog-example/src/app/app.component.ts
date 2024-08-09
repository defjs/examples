import { HttpClient } from '@angular/common/http'
import { Component, afterNextRender, inject } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { isHttpResponseError } from '@defjs/core'
import { useGetUser } from '@lib/api/user'
import axios from 'axios'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: ` <router-outlet /> `,
  styles: [
    `
      :host {
        max-width: 1280px;
        margin: 0 auto;
        padding: 2rem;
        text-align: center;
      }
    `,
  ],
})
export class AppComponent {
  http = inject(HttpClient)

  constructor() {
    afterNextRender(() => {
      this.initUser()
      // this.initUserO()
      // this.initAxios()
      this.initXHR()
    })
  }

  async initUser() {
    const { doRequest } = useGetUser()
    try {
      const user = await doRequest()
      console.log(user)
    } catch (e) {
      if (isHttpResponseError(e)) {
        console.error(e.error)
      } else {
        console.error(e)
      }
    }
  }

  initUserO() {
    const sub = this.http
      .get('/api/v1/user', {
        params: {
          uid: 1,
        },
      })
      .subscribe({
        next: d => console.log(d),
        error: e => console.error(e),
      })

    setTimeout(() => {
      sub.unsubscribe()
    }, 2000)
  }

  async initAxios() {
    const signal = new AbortController()
    setTimeout(() => {
      signal.abort()
    }, 2000)

    try {
      const res = await axios.get('/api/v1/user?uid=1', {
        // signal: signal.signal,
        timeout: 3000,
      })
      console.log(res)
    } catch (e) {
      console.error(e)
    }
  }

  initXHR() {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', '/api/v1/user?uid=1')
    xhr.timeout = 0
    xhr.addEventListener('timeout', e => {
      console.error('TIMEPUT', e, xhr)
    })
    xhr.addEventListener('error', e => {
      console.error('ERROR', e, xhr)
    })
    xhr.addEventListener('abort', e => {
      console.error('abort', e, xhr)
    })
    xhr.send()
  }
}
