<script setup>
import { useOrderStore } from '@/stores/orderStore';

const orderStore = useOrderStore()
orderStore.loadOrders()

const total = computed(() => orderStore.totalOrders)
const done = computed(() => orderStore.doneOrders)
const inProgress = computed(() => orderStore.inProgressOrders)
const pending = computed(() => orderStore.pendingOrders)
</script>

<template>
    <div class="py-10 pr-10 flex-1">
        <div class="container mx-auto">
            <h1 class="text-black text-3xl font-bold">Welcome to CRM</h1>
            <div class="grid grid-cols-4 gap-6 mt-10">
            <div class="bg-blue-900 text-white p-6 rounded-lg">
                <h2 class="text-xl font-bold">All Orders</h2>
                <p class="text-4xl mt-2">{{ total }}</p>
            </div>
            <div class="bg-red-500 text-white p-6 rounded-lg">
                <h2 class="text-xl font-bold">Done</h2>
                <p class="text-4xl mt-2">{{ done }}</p>
            </div>
            <div class="bg-yellow-500 text-white p-6 rounded-lg">
                <h2 class="text-xl font-bold">Pending</h2>
                <p class="text-4xl mt-2">{{ pending }}</p>
            </div>
            <div class="bg-green-500 text-white p-6 rounded-lg">
                <h2 class="text-xl font-bold">In Progress</h2>
                <p class="text-4xl mt-2">{{ inProgress }}</p>
            </div>
            </div>
        </div>
    </div>
</template>