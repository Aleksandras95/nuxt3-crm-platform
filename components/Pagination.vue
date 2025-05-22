<script setup>
const props = defineProps({
  totalPages: Number,
  currentPage: Number
})
const emit = defineEmits(['update:page'])
</script>


<template>
    <div class="flex justify-center items-center gap-2 mt-8">
        <button 
            v-for="page in totalPages" 
            :key="page"
            @click="$emit('update:page', page)"
            :class="[
            'px-4 py-2 border rounded',
            currentPage === page ? 'bg-blue-900 text-white' : 'bg-white text-blue-900'
            ]"
        >
            {{ page }}
        </button>
    </div>
</template>