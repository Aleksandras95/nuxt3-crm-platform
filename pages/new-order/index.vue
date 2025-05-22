<script setup>
import { useOrderStore } from '@/stores/orderStore'

const orderStore = useOrderStore()
const router = useRouter()

const client = ref('')
const description = ref('')
const budget = ref('')
const selectedCategory = ref('web-development')
const selectedStatus = ref('pending')
const selectedDate = ref('')

const categories = ref([
    { label: 'Web development', value: 'web-development' },
    { label: 'Branding', value: 'branding' },
    { label: 'SEO', value: 'seo' },
    { label: 'Design', value: 'design'}
])

const statuses = ref([
    { label: 'Pending', value: 'pending' },
    { label: 'Done', value: 'done' },
    { label: 'In progress', value: 'in progress' }
])

function handleSubmit(event) {
  event.preventDefault()

  // Simple validation
  if (!client.value || !description.value || !budget.value || !selectedDate.value) {
    alert('Please fill in all fields')
    return
  }

  // Create new order
  const newOrder = {
    id: Date.now(),
    client: client.value,
    slug: selectedCategory.value,
    description: description.value,
    budget: parseFloat(budget.value),
    category: selectedCategory.value,
    status: selectedStatus.value,
    createdAt: new Date(selectedDate.value).toISOString()
  }

  // Save data to store
  orderStore.addOrder(newOrder)

  // Redirect to orders page
  router.push('/orders')
}
</script>

<template>
    <div class="py-10 pr-10 flex-1">
        <div class="container mx-auto">
            <h1 class="text-black text-3xl font-bold">Create new order</h1>
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
                            :selectedCategory="selectedCategory"
                            @update:category="selectedCategory = $event"
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
                            :selectedCategory="selectedStatus"
                            @update:category="selectedStatus = $event"
                        />
                    </div>
                    <div class="flex flex-col gap-2 mt-5 w-full">
                        <span>Date</span>
                        <input type="date" v-model="selectedDate" class="bg-gray-200 rounded-md font-medium text-black py-2.5 px-5 outline-none" />
                    </div>
                    <div class="flex mt-5 justify-center">
                        <button type="submit" class="bg-blue-900 text-white text-medium text-base hover:bg-gray-200 hover:text-black px-5 py-2.5 rounded-md">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>