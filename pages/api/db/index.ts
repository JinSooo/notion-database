import { NotionServer } from '../../../lib/NotionServer'
import type { NextApiRequest, NextApiResponse } from 'next'

const client = new NotionServer()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const query = await client.query()

	res.status(200).json(query)
}
