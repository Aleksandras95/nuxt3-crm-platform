<template>
    <div class="w-64 bg-gray-100 border-r border-solid border-gray-300 min-h-[100dvh] h-full sticky top-0 left-0">
            <div class="flex flex-col justify-between min-h-[100dvh] h-full p-10">
                <div class="text-center">
                    <NuxtLink to="/" class="font-bold text-4xl text-black">CRM</NuxtLink>
                </div>
                <div class="flex flex-col justify-center gap-6 items-center">
                    <NuxtLink to="/" class="text-base text-black hover:text-blue-900 font-medium">Home</NuxtLink>
                    <NuxtLink to="/orders" class="text-base text-black hover:text-blue-900 font-medium">Orders</NuxtLink>
                    <NuxtLink to="/new-order" class="text-base text-black hover:text-blue-900 font-medium">Add new order</NuxtLink>
                </div>
                <div class="text-center">
                    <NuxtLink to="/" class="text-base text-black hover:text-blue-900 font-medium">Log in</NuxtLink>
                </div>
            </div>
    </div>
</template>