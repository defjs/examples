export const dynamic = 'force-dynamic'

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

export async function GET(req: Request) {
  const url = new URL(req.url)
  const uid = url.searchParams.get('uid')
  const user = users.find(user => user.id === Number(uid)) || null
  return Response.json(user)
}
