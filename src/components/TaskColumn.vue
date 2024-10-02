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

    function removeTask(taskId: string) {
        tasks.value = tasks.value.filter(task => task.id !== taskId);
    }
</script>

<template>
    <v-col>
        <h4 class="text-center mb-2">{{ props.title }}</h4>
                
        <draggable class="h-100 bg-primary-darken-1" v-model="tasks" group="tasks" item-key="id">
            <template #header>
                <div class="mb-2">
                    <TaskForm card-title="Add task" :reset-fields="true" @submit="addTask" v-slot:default="slotProps">
                        <v-btn
                            v-bind="slotProps.activationProps"
                            block
                            color="secondary"
                            prepend-icon="mdi-plus"
                        >Add</v-btn>
                    </TaskForm>
                </div>
            </template>

            <template #item="{ element: task }">
                <Task
                    class="mb-2"
                    :id="task.id"
                    :title="task.title"
                    :description="task.description"
                    @delete="removeTask"
                >
                </Task>
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