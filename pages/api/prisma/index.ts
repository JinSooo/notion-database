import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const result = await prisma.user.findMany({
		include: { posts: true },
	})
	res.status(200).json(result)
}
