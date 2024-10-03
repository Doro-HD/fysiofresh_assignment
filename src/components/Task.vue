<script setup lang="ts">
    import { Ref, ref } from 'vue';
    import TaskForm from './TaskForm.vue';

    const props = defineProps<{
        class: string
        id: string;
        title: string;
        description: string;
        onEdit: (taskId: string, newTitle: string, newDescription: string) => Promise<void>;
    }>();

    const emit = defineEmits<{
        (event: 'delete', id: string, isLoading: Ref<boolean, boolean>): void;
    }>();

    const title = ref(props.title);
    const description = ref(props.description);

    const isLoading = ref(false);

    async function editSelf(newTitle: string, newDescription: string) {
        await props.onEdit(props.id, newTitle, newDescription);

        title.value = newTitle;
        description.value = newDescription;
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

            <TaskForm card-title="Edit task" :init-title="title" :init-description="description" :reset-fields="false" v-slot:default="slotProps" :on-submit="editSelf">
                <v-btn v-bind="slotProps.activationProps" icon="mdi-pencil" color="secondary" size="sm"></v-btn>
            </TaskForm>
        </template>

        <v-card-text>{{ description }}</v-card-text>
    </v-card>
</template>