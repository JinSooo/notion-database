import { NotionServer } from '../../../lib/NotionServer'
import type { NextApiRequest, NextApiResponse } from 'next'

const client = new NotionServer()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { id } = req.query

	const query = await client.queryById(id as string)

	res.status(200).json(query)
}
