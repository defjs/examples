import { defineEventHandler, getQuery } from 'h3'

export type User = {
  id: number
  name: string
}

const users: User[] = [
  { id: 1, name: 'Jack' },
  { id: 2, name: 'Jill' },
  { id: 3, name: 'John' },
  { id: 4, name: 'Jane' },
  { id: 5, name: 'Jim' },
  { id: 6, name: 'Jenny' },
  { id: 7, name: 'Jerry' },
  { id: 8, name: 'Jasmine' },
  { id: 9, name: 'Jesse' },
  { id: 10, name: 'Jocelyn' },
  { id: 11, name: 'Jody' },
  { id: 12, name: 'Joel' },
  { id: 13, name: 'Joey' },
]

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export default defineEventHandler(async event => {
  const { uid } = getQuery<{ uid: string }>(event)
  const user = users.find(user => user.id === Number(uid)) || null
  // await delay(100000000)
  return Response.json(user)
})
