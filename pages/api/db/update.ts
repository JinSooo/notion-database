import { NotionServer } from '../../../lib/NotionServer'
import type { NextApiRequest, NextApiResponse } from 'next'

const client = new NotionServer()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'POST') return res.status(404).json({ message: 'Only POST requests allowed' })

	if (!req.body.id) return res.status(404).json({ message: 'Need page_id' })

	const query = await client.update(req.body)

	res.status(200).json(query)
}
