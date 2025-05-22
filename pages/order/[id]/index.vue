<script setup>
import { useOrderStore } from '@/stores/orderStore';

const orderStore = useOrderStore()
orderStore.loadOrders()
const route = useRoute()
const router = useRouter()

const order = orderStore.getProductById(Number(route.params.id))

function handleRemove(id) {
  orderStore.removeFromOrders(id)
}
</script>

<template>
    <div class="py-10 pr-10 flex-1">
        <div class="container mx-auto">
            <div class="flex items-center justify-between">
                <h1 class="text-black text-3xl font-bold">{{ order.client }}</h1>
                <div class="flex items-center gap-4">
                    <Icon @click="router.push(`/edit-order/${order.id}`)" name="mdi:file-edit" style="color: gray; font-size: 23px; cursor: pointer;" />
                    <Icon @click="handleRemove(order.id)" name="mdi:delete" style="color: gray; font-size: 25px; cursor: pointer;" />
                </div>
            </div>
            <div v-if="order.status === 'done'" class="flex items-center gap-2 capitalize bg-blue-900 rounded-md p-2 text-white text-sm max-w-24 justify-center mt-5"><div class="bg-red-500 rounded-full w-2 h-2"></div> {{ order.status }}</div>
            <div v-if="order.status === 'pending'" class="flex items-center gap-2 capitalize bg-blue-900 rounded-md p-2 text-white text-sm max-w-24 justify-center mt-5"><div class="bg-yellow-500 rounded-full w-2 h-2"></div> {{ order.status }}</div>
            <div v-if="order.status === 'in progress'" class="flex items-center gap-2 capitalize bg-blue-900 rounded-md p-2 text-white text-sm max-w-32 justify-center mt-5"><div class="bg-green-500 rounded-full w-2 h-2"></div> {{ order.status }}</div>
            <div class="flex items-center gap-2 text-black text-base mt-5">
                Category: <span class="text-blue-700 font-medium">{{ order.category }}</span>
            </div>
            <div class="flex items-center gap-2 text-black text-base mt-2">
                Budget: <span class="text-blue-700 font-medium">{{ order.budget }} $</span>
            </div>
            <div class="flex items-center gap-2 text-black text-base mt-2">
                Created: <span class="text-blue-700 font-medium">{{ order.createdAt }}</span>
            </div>
            <p class="mt-5 text-black text-base leading-normal">
                {{ order.description }}
            </p>
        </div>
    </div>
</template>