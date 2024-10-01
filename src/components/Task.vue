<script setup lang="ts">
    const props = defineProps<{
        class: string
        title: string;
        description: string;
    }>()
</script>

<template>
    <v-card :class="props.class">
        <v-card-title>{{ props.title }}</v-card-title>

        <v-card-text>{{ props.description }}</v-card-text>
    </v-card>
</template>