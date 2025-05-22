<script setup>
import { useOrderStore } from '@/stores/orderStore'
import { useRoute, useRouter } from 'vue-router'

const orderStore = useOrderStore()
orderStore.loadOrders()

const route = useRoute()
const router = useRouter()

const currentOrder = orderStore.getProductById(Number(route.params.id))

// Сделаем редактируемые копии:
const client = ref(currentOrder.client)
const category = ref(currentOrder.slug)
const status = ref(currentOrder.status)
const description = ref(currentOrder.description)
const budget = ref(currentOrder.budget)
const date = ref(currentOrder.createdAt.slice(0, 10))

const categories = ref([
  { label: 'Web development', value: 'web-development' },
  { label: 'Branding', value: 'branding' },
  { label: 'SEO', value: 'seo' },
  { label: 'Design', value: 'design' }
])

const statuses = ref([
  { label: 'Pending', value: 'pending' },
  { label: 'Done', value: 'done' },
  { label: 'In progress', value: 'in progress' }
])

function handleSubmit() {
  const updatedOrder = {
    id: currentOrder.id,
    client: client.value,
    slug: category.value,
    status: status.value,
    description: description.value,
    budget: parseFloat(budget.value),
    createdAt: new Date(date.value).toISOString()
  }

  orderStore.updateOrder(updatedOrder)
  router.push('/orders')
}
</script>

<template>
    <div class="py-10 pr-10 flex-1">
        <div class="container mx-auto">
            <h1 class="text-black text-3xl font-bold">Edit order</h1>
            <div class="max-w-[600px] mx-auto mt-5">
                <form @submit.prevent="handleSubmit">
                    <div class="flex flex-col gap-2">
                        <span>Client</span>
                        <input type="text" v-model="client" class="bg-gray-200 rounded-md font-medium text-black py-2.5 px-5 outline-none" />
                    </div>
                    <div class="flex flex-col gap-2 mt-5 w-full">
                        <span>Category</span>
                        <CategoryFilter 
                            :categories="categories"
                            :selectedCategory="category"
                            @update:category="category = $event"
                        />
                    </div>
                    <div class="flex flex-col gap-2 mt-5">
                        <span>Description</span>
                        <textarea type="text" v-model="description" class="bg-gray-200 h-48 rounded-md font-medium text-black py-2.5 px-5 outline-none"></textarea>
                    </div>
                    <div class="flex flex-col gap-2 mt-5">
                        <span>Budget</span>
                        <input type="text" v-model="budget" class="bg-gray-200 rounded-md font-medium text-black py-2.5 px-5 outline-none" />
                    </div>
                    <div class="flex flex-col gap-2 mt-5 w-full">
                        <span>Status</span>
                        <CategoryFilter 
                            :categories="statuses"
                            :selectedCategory="status"
                            @update:category="status = $event"
                        />
                    </div>
                    <div class="flex flex-col gap-2 mt-5 w-full">
                        <span>Date</span>
                        <input type="date" v-model="date" class="bg-gray-200 rounded-md font-medium text-black py-2.5 px-5 outline-none" />
                    </div>
                    <div class="flex mt-5 justify-center">
                        <button type="submit" class="bg-blue-900 text-white text-medium text-base hover:bg-gray-200 hover:text-black px-5 py-2.5 rounded-md">Save</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>