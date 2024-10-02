<script setup lang="ts">
    import { ref } from 'vue';
    import TaskForm from './TaskForm.vue';

    const props = defineProps<{
        class: string
        id: string;
        title: string;
        description: string;
    }>();

    defineEmits<{
        (event: 'delete', id: string): void;
    }>();

    const title = ref(props.title);
    const description = ref(props.description);

    function edit(id: string, newTitle: string, newDescription: string) {
       title.value = newTitle;
       description.value = newDescription;
    }
</script>

<template>
    <v-card :class="props.class" color="surface-light" >
        <template #title>
            <v-card-title>{{ title }}</v-card-title>
        </template>

        <template #append>
            <v-btn @click="$emit('delete',  props.id)" icon="mdi-delete" color="error" size="sm"></v-btn>

            <div class="mx-1"></div>

            <TaskForm card-title="Edit task" :init-title="title" :init-description="description" :reset-fields="false" @submit="edit" v-slot:default="slotProps">
                <v-btn v-bind="slotProps.activationProps" icon="mdi-pencil" color="secondary" size="sm"></v-btn>
            </TaskForm>
        </template>

        <v-card-text>{{ description }}</v-card-text>
    </v-card>
</template>