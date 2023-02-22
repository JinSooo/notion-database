import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const id = (req.query.id as string) || ''

	const query = await prisma.user.findUnique({ where: { id: id } })

	res.status(200).json(query)
}
