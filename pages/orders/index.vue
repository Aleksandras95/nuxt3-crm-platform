<script setup>
import { useOrderStore } from '@/stores/orderStore';

const orderStore = useOrderStore()
orderStore.loadOrders()

const searchQuery = ref('')
const selectedCategory = ref('all')
const selectedStatus = ref('all')
const currentPage = ref(1)
const itemsPerPage = 6

const categories = ref([
    { label: 'All', value: 'all' },
    { label: 'Web development', value: 'web-development' },
    { label: 'Branding', value: 'branding' },
    { label: 'SEO', value: 'seo' },
    { label: 'Design', value: 'design'}
])

const statuses = ref([
    { label: 'All', value: 'all' },
    { label: 'Pending', value: 'pending' },
    { label: 'Done', value: 'done' },
    { label: 'In progress', value: 'in progress' }
])

const selectedSort = ref('default')

const sortOptions = ref([
  { label: 'No sorting', value: 'default' },
  { label: 'Date: newest first', value: 'dateDesc' },
  { label: 'Date: oldest first', value: 'dateAsc' },
  { label: 'Budget: lowest first', value: 'budgetAsc' },
  { label: 'Budget: highest first', value: 'budgetDesc' },
])

const sortedAndFilteredOrders = computed(() => {
  let result = orderStore.orders

  // Search
  if (searchQuery.value.trim() !== '') {
    result = result.filter(order =>
      order.client.toLowerCase().includes(searchQuery.value.trim().toLowerCase())
    )
  }

  // Filter
  result = result.filter(order => selectedCategory.value === 'all' || order.slug === selectedCategory.value)
  result = result.filter(order => selectedStatus.value === 'all' || order.status === selectedStatus.value)

  // Sorting
  switch (selectedSort.value) {
    case 'dateAsc':
      result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
      break
    case 'dateDesc':
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      break
    case 'budgetAsc':
      result.sort((a, b) => a.budget - b.budget)
      break
    case 'budgetDesc':
      result.sort((a, b) => b.budget - a.budget)
      break
  }

  return result
})

const paginatedOrders = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return sortedAndFilteredOrders.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(sortedAndFilteredOrders.value.length / itemsPerPage)
})

function changePage(page) {
  currentPage.value = page
}

watch([selectedCategory, selectedStatus, selectedSort, searchQuery], () => {
  currentPage.value = 1
})
</script>

<template>
    <div class="py-10 pr-10 flex-1">
        <div class="container mx-auto">
            <h1 class="text-black text-3xl font-bold">Our orders</h1>
            <div class="flex items-end justify-between mt-5">
                <div>
                    <div class="flex items-center gap-4">
                        <span>Filter by category:</span>
                        <CategoryFilter 
                            :categories="categories"
                            :selectedCategory="selectedCategory"
                            @update:category="selectedCategory = $event"
                        />
                    </div>
                    <div class="mt-5 flex items-center gap-4">
                        <span>Filter by status:</span>
                        <CategoryFilter 
                            :categories="statuses"
                            :selectedCategory="selectedStatus"
                            @update:category="selectedStatus = $event"
                        />
                    </div>
                    <div class="mt-5 flex items-center gap-4">
                        <span>Search for a client:</span>
                        <Search 
                            :searchQuery="searchQuery"
                            @update:searchQuery="(value) => searchQuery = value"
                        />
                    </div>
                </div>
                <div class="flex items-center gap-4">
                    <span>Sort by:</span>
                    <Sorting 
                        :sortValue="selectedSort"
                        :options="sortOptions"
                        @update:sort="selectedSort = $event"
                    />
                </div>
            </div>
            <div class="grid grid-cols-3 gap-4 mt-10">
                <Order v-for="order in paginatedOrders" :key="order.id" :order="order" />
            </div>
            <Pagination 
                :totalPages="totalPages"
                :currentPage="currentPage"
                @update:page="changePage"
            />
        </div>
    </div>
</template>