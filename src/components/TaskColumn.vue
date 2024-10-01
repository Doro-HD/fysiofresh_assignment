<script setup lang="ts">
    import { Ref, ref } from 'vue';
    import draggable from 'vuedraggable';

    import { Task as TaskType } from '@/types/kanban';
    import Task from './Task.vue';
    import TaskForm from './TaskForm.vue';

    const props = defineProps<{
        title: string;
    }>();

    const tasks: Ref<TaskType[]> = ref([]);

    function addTask(id: string, title: string, description: string) {
        tasks.value.push({ id, title, description });
    }
</script>

<template>
    <v-col class="bg-primary">
        <h4 class="text-center">{{ props.title }}</h4>

        <draggable v-model="tasks" group="tasks" item-key="id">
            <template #header>
                <TaskForm @submit="addTask"></TaskForm>
            </template>

            <template #item="{ element: card }">
                <Task class="mb-2" :title="card.title" :description="card.description"></Task>
            </template>
        </draggable>

    </v-col>
</template>

<style scoped>
    .dropzone {
        height: 100%;
    }

    .draggable {
        cursor: grab;
    }
</style>