import { NotionServer } from '../../../lib/NotionServer'
import type { NextApiRequest, NextApiResponse } from 'next'

const client = new NotionServer()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'POST') return res.status(404).json({ message: 'Only POST requests allowed' })

	const query = await client.create(req.body)

	res.status(200).json(query)
}
