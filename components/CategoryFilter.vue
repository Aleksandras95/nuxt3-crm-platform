<script setup>
const props = defineProps({
  categories: Array,
  selectedCategory: String
})
const emit = defineEmits(['update:category'])
</script>

<template>
    <div>
    <select
      name="categories"
      id="categories"
      class="bg-gray-200 px-5 py-2.5 rounded-md font-medium outline-none w-full"
      :value="selectedCategory"
      @change="$emit('update:category', $event.target.value)"
    >
      <option
        v-for="cat in categories"
        :key="cat.value"
        :value="cat.value"
        class="text-base text-black"
      >
        {{ cat.label }}
      </option>
    </select>
  </div>
</template>