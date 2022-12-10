// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import path from 'path'
import { promises as fs } from 'fs'
import type { NextApiRequest, NextApiResponse } from 'next'

type Card = {
  // Core Card Fields
  arena_id: number,
  id: string,
  lang: string,
  mtgo_id: number,
  mtgo_foil_id: number,
  multiverse_ids: number,
  tcgplayer_id: number,
  tcgplayer_etched_id: number,
  cardmarket_id: number,
  object: string,
  oracle_id: string,
  prints_search_uri: string,
  rulings_uri: string,
  scryfall_uri: string,
  uri: string,

  // Gameplay Fields
  name: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<[Card]>) {
  const { name } = req.query

  const dir = path.join(process.cwd(), 'json')
  const file = await fs.readFile(dir + '/cards.json', 'utf8')
  const cards : [Card] = JSON.parse(file)

  const result = cards.filter((card) => card.name.includes(name))
  res.status(200).json(result)
}
