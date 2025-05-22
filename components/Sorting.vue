<script setup>
const props = defineProps({
  sortValue: String,
  options: Array
})
const emit = defineEmits(['update:sort'])

function handleChange(event) {
  emit('update:sort', event.target.value)
}
</script>

<template>
  <select :value="sortValue" @change="handleChange" class="bg-gray-200 px-5 py-2.5 rounded-md font-medium outline-none">
    <option 
      v-for="option in options" 
      :key="option.value" 
      :value="option.value"
      class="text-base text-black"
    >
      {{ option.label }}
    </option>
  </select>
</template>