import { defineStore } from 'pinia'

export const useOrderStore = defineStore('order', {
    state: () => ({
        orders: [
            {
                id: 1,
                client: 'Amazon',
                category: 'SEO',
                slug: 'seo',
                description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
                budget: 3500,
                status: 'done',
                createdAt: new Date().toISOString()
            },
            {
                id: 2,
                client: 'Jonas Petrauskas',
                category: 'Website development',
                slug: 'web-development',
                description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
                budget: 650,
                status:'pending',
                createdAt: new Date().toISOString()
            },
            {
                id: 3,
                client: 'Google',
                category: 'Branding',
                slug: 'branding',
                description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
                budget: 8000,
                status:'pending',
                createdAt: new Date().toISOString()
            },
            {
                id: 4,
                client: 'Thomas Gutenberg',
                category: 'Design',
                slug: 'design',
                description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
                budget: 1000,
                status:'in progress',
                createdAt: new Date().toISOString()
            },
            {
                id: 5,
                client: 'Digitalgeeks',
                category: 'Web development',
                slug: 'web-development',
                description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
                budget: 350,
                status:'in progress',
                createdAt: new Date().toISOString()
            },
            {
                id: 6,
                client: 'Kompiuteriu draugas',
                category: 'Web development',
                slug: 'web-development',
                description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
                budget: 550,
                status:'done',
                createdAt: new Date().toISOString()
            },
            {
                id: 7,
                client: 'Good to know',
                category: 'Design',
                slug: 'design',
                description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
                budget: 950,
                status:'done',
                createdAt: new Date().toISOString()
            }
        ]
    }),
    actions: {
        addOrder(newOrder) {
            this.orders.push(newOrder)
            localStorage.setItem('orders', JSON.stringify(this.orders))
            this.saveOrders()
        },
        saveOrders() {
            if (process.client) {
                localStorage.setItem('orders', JSON.stringify(this.orders))
            }
        },
        loadOrders() {
            if (process.client) {
                const order = localStorage.getItem('orders')
                if (order) {
                this.orders = JSON.parse(order)
                }
            }
        },
        removeFromOrders(id) {
            this.orders = this.orders.filter(order => order.id !== id)
            this.saveOrders()
        },
        updateOrder(updatedOrder) {
            const index = this.orders.findIndex(o => o.id === updatedOrder.id)
            if (index !== -1) {
                this.orders[index] = { ...updatedOrder }
                localStorage.setItem('orders', JSON.stringify(this.orders))
            }
        }
    },
    getters: {
        getProductById: (state) => {
            return (id) => state.orders.find(item => item.id === id)
        },
        totalOrders: (state) => state.orders.length,
        doneOrders: (state) => state.orders.filter(o => o.status === 'done').length,
        inProgressOrders: (state) => state.orders.filter(o => o.status === 'in progress').length,
        pendingOrders: (state) => state.orders.filter(o => o.status === 'pending').length
    }
})