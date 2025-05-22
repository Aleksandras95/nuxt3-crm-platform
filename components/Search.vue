<script setup>
const props = defineProps({
  searchQuery: String
})
const emit = defineEmits(['update:searchQuery'])
</script>

<template>
    <div>
        <input 
            :value="searchQuery" 
            @input="$emit('update:searchQuery', $event.target.value)"
            type="text" 
            placeholder="Search for client..." 
            class="bg-gray-200 px-5 py-2.5 rounded-md font-medium outline-none text-base text-black"
        />
    </div>
</template>

<style scoped>
::placeholder {
    color: black;
}
</style>