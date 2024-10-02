<script setup lang="ts">
    import { Ref, ref } from 'vue';
    import TaskForm from './TaskForm.vue';
    import { delay } from '@/util/delay';

    const props = defineProps<{
        class: string
        id: string;
        title: string;
        description: string;
    }>();

    const emit = defineEmits<{
        (event: 'delete', id: string, isLoading: Ref<boolean, boolean>): void;
    }>();

    const title = ref(props.title);
    const description = ref(props.description);

    const isLoading = ref(false);
    const isFormLoading = ref(false);

    async function editSelf(_id: string, newTitle: string, newDescription: string, isFormOpen: Ref<boolean, boolean>) {
        isFormLoading.value = true;

        await delay(() => {
            title.value = newTitle;
            description.value = newDescription;
        }, 2);

        isFormLoading.value = false;
        isFormOpen .value = false;
    }

    function removeSelf() {
        emit('delete', props.id, isLoading)
    }
</script>

<template>
    <v-card :class="props.class" color="surface-light" :loading="isLoading" >
        <template #title>
            <v-card-title>{{ title }}</v-card-title>
        </template>

        <template #append>
            <v-btn @click="removeSelf" icon="mdi-delete" color="error" size="sm"></v-btn>

            <div class="mx-1"></div>

            <TaskForm card-title="Edit task" :init-title="title" :init-description="description" :reset-fields="false" @submit="editSelf" v-slot:default="slotProps" :is-loading="isFormLoading">
                <v-btn v-bind="slotProps.activationProps" icon="mdi-pencil" color="secondary" size="sm"></v-btn>
            </TaskForm>
        </template>

        <v-card-text>{{ description }}</v-card-text>
    </v-card>
</template>