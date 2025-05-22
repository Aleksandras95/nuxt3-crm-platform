<script setup>
import { useOrderStore } from '@/stores/orderStore';

const orderStore = useOrderStore()
orderStore.loadOrders()

const props = defineProps({
    order: {
        type: Object,
        default: () => {}
    }
})

function handleRemove(id) {
  orderStore.removeFromOrders(id)
}
</script>

<template>
    <NuxtLink :to="`/order/${order.id}`" class="bg-gray-200 shadow-md rounded-md p-10 relative">
        <div class="flex items-center justify-between">
            <h3 class="text-black text-base font-medium">{{ order.client }}</h3>
            <div v-if="order.status === 'done'" class="flex items-center gap-2 capitalize bg-blue-900 rounded-md p-2 text-white text-sm"><div class="bg-red-500 rounded-full w-2 h-2"></div> {{ order.status }}</div>
            <div v-if="order.status === 'pending'" class="flex items-center gap-2 capitalize bg-blue-900 rounded-md p-2 text-white text-sm"><div class="bg-yellow-500 rounded-full w-2 h-2"></div> {{ order.status }}</div>
            <div v-if="order.status === 'in progress'" class="flex items-center gap-2 capitalize bg-blue-900 rounded-md p-2 text-white text-sm"><div class="bg-green-500 rounded-full w-2 h-2"></div> {{ order.status }}</div>
        </div>
        <p class="mt-5 text-black text-base leading-normal">
            {{ order.description.slice(0, 150) + '...' }}
        </p>
        <div class="flex items-center gap-2 text-black text-base mt-5">
            Category: <span class="text-blue-700 font-medium capitalize">{{ order.category }}</span>
        </div>
        <div class="flex items-center gap-2 text-black text-base mt-2">
            Budget: <span class="text-blue-700 font-medium">{{ order.budget }} $</span>
        </div>
         <div class="flex items-center gap-2 text-black text-base mt-2">
            Created: <span class="text-blue-700 font-medium">{{ order.createdAt }}</span>
        </div>
        <div class="absolute bottom-2 right-4 cursor-pointer" @click="handleRemove(order.id)">
            <Icon name="mdi:delete" style="color: gray; font-size: 25px;" />
        </div>
    </NuxtLink>
</template>