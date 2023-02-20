import { Client } from '@notionhq/client'

const AUTH = process.env.NOTION_ACCESS_TOKEN
const DATABASE_ID = process.env.NOTION_DATABASE_ID ?? ''

export class NotionServer {
	client: Client

	constructor() {
		this.client = new Client({ auth: AUTH })
	}

	// 数据库的所有数据
	async query() {
		const res = await this.client.databases.query({
			database_id: DATABASE_ID,
			// 按时间排序
			sorts: [
				{
					timestamp: 'created_time',
					direction: 'descending',
				},
			],
		})

		// return res.results
		return res.results.map(data => this.transformer(data))
	}

	// 数据库的所有数据
	async queryById(id: string) {
		console.log('🚀 ~ file: NotionServer.ts:25 ~ NotionServer ~ queryById ~ id', id)
		const res = await this.client.pages.retrieve({
			page_id: id,
		})

		return this.transformer(res)
	}

	// 插入一条数据
	async create(d: Partial<DData>) {
		const data: DData = {
			id: '',
			title: '',
			desc: '',
			category: '',
			option: '',
			explanation: '',
			created: '',
			...d,
		}

		const res = await this.client.pages.create({
			parent: {
				database_id: DATABASE_ID,
			},
			properties: {
				title: {
					title: [
						{
							text: {
								content: data.title,
							},
						},
					],
				},
				desc: {
					rich_text: [
						{
							text: {
								content: data.desc,
							},
						},
					],
				},
				explanation: {
					rich_text: [
						{
							text: {
								content: data.explanation,
							},
						},
					],
				},
				option: {
					rich_text: [
						{
							text: {
								content: data.option,
							},
						},
					],
				},
				category: {
					select: {
						name: data.category,
					},
				},
			},
		})

		return this.transformer(res)
	}

	// 数据库的所有数据
	async update(data: Partial<DData>) {
		const property: any = {}

		Object.keys(data).forEach(key => {
			switch (key) {
				case 'title':
					property[key] = {
						title: [
							{
								text: {
									content: data[key],
								},
							},
						],
					}
					break
				case 'title':
				case 'desc':
				case 'option':
				case 'explanation':
					property[key] = {
						rich_text: [
							{
								text: {
									content: data[key],
								},
							},
						],
					}
					break
				case 'option':
					property[key] = {
						select: {
							name: data[key],
						},
					}
					break
			}
		})

		const res = await this.client.pages.update({
			page_id: data.id!,
			properties: property,
		})

		return this.transformer(res)
	}

	// 将notion数据转变为正常数据
	private transformer(data: any): DData {
		let results: any = {
			id: data.id ?? '',
		}

		Object.keys(data.properties).forEach(key => {
			const property = data.properties[key]
			let value = ''

			switch (property.type) {
				case 'title':
					value = property.title[0].text.content
					break
				case 'rich_text':
					value = property.rich_text[0].text.content
					break
				case 'select':
					value = property.select.name
					break
				case 'created_time':
					value = property.created_time
					break
			}

			results[key] = value
		})

		return results as DData
	}
}
