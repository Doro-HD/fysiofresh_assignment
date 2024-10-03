<script setup lang="ts">
    import { Ref, ref, watch } from 'vue';
    import draggable from 'vuedraggable';

    import { columnStore } from '@/state/tasks';
    import { delay } from '@/util/delay';
    import { Task as TaskType } from '@/types/kanban';
    import Task from './Task.vue';
    import TaskForm from './TaskForm.vue';

    const props = defineProps<{
        // the task status that this column is associated with
        id: string;
        name: string;
        tasks: TaskType[];
    }>();

    const tasks = ref(props.tasks);

    watch(tasks, (newTasks, _oldTasks) => {
        console.log('hello from watch')
        columnStore.updateColumnTasks(props.id, newTasks);
    }, { deep: true });

    async function addTask(title: string, description: string) {
        await delay(() => {
            const id = crypto.randomUUID();
            const task = { id, title, description };

            tasks.value.push(task);
        }, 2);
    }

    async function editTask(taskId: string, newTitle: string, newDescription: string) {
        await delay(() => {
            const taskIndex = tasks.value.findIndex(task => task.id === taskId);
            if (taskIndex < 0) {
                return;
            }

            // modifying in place to avoid reordering of tasks in ui
            tasks.value[taskIndex] = { id: taskId, title: newTitle, description: newDescription };
        }, 2);
    }

    async function removeTask(taskId: string, isTaskLoading: Ref<boolean, boolean>) {
        isTaskLoading.value = true;

        await delay(() => {
            const taskIndex = tasks.value.findIndex(task => task.id === taskId);
            if (taskIndex < 0) {
                return;
            }

            tasks.value.splice(taskIndex, 1);
        }, 2);

        isTaskLoading.value = false;
    }

</script>

<template>
    <v-col>
        <h4 class="text-center mb-2">{{ props.name }}</h4>
                
        <draggable class="h-100 bg-primary-darken-1" v-model="tasks" group="tasks" item-key="id">
            <template #header>
                <div class="mb-2">
                    <TaskForm card-title="Add task" :reset-fields="true" @submit="addTask" v-slot:default="slotProps" :on-submit="addTask">
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
                    :on-edit="editTask"
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