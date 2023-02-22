import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const query = await prisma.post.findMany({
		where: { published: true },
		include: { author: true },
	})

	res.status(200).json(query)
}
