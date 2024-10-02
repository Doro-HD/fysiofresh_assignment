<script setup lang="ts">
    import { Ref, ref, watch } from 'vue';
    import draggable from 'vuedraggable';

    import { taskStore } from '@/state/tasks';
    import { TaskStatus, Task as TaskType } from '@/types/kanban';
    import Task from './Task.vue';
    import TaskForm from './TaskForm.vue';
import { delay } from '@/util/delay';

    const props = defineProps<{
        // the task status that this column is associated with
        columnStatus: TaskStatus;
        title: string;
    }>();

    const tasks: Ref<TaskType[]> = ref(taskStore.filterByStatus(props.columnStatus));
    const isFormLoading = ref(false);

    watch(tasks, (newTasks, oldTasks) => {
        // check for task being moved to another column
        if (newTasks.length < oldTasks.length) {
            return;
        }

        const movedTaskIndex = newTasks.findIndex(task => task.status !== props.columnStatus);
        const movedTask = tasks.value[movedTaskIndex];

        if (movedTask) {
            tasks.value[movedTaskIndex].status = props.columnStatus;
            taskStore.changeStatus(movedTask.id, props.columnStatus);
        }
    });

    async function addTask(id: string, title: string, description: string, isFormOpen: Ref<boolean, boolean>) {
        isFormLoading.value = true;

        await delay(() => {
            const task = { id, title, description, status: props.columnStatus };

            taskStore.add(task);
            tasks.value.push(task);
        }, 2);

        isFormLoading.value = false;
        isFormOpen.value = false;
    }

    async function removeTask(taskId: string, isTaskLoading: Ref<boolean, boolean>) {
        isTaskLoading.value = true;

        await delay(() => {
            taskStore.remove(taskId);
            tasks.value = tasks.value.filter(task => task.id !== taskId);
        }, 2);

        isTaskLoading.value = false;
    }
</script>

<template>
    <v-col>
        <h4 class="text-center mb-2">{{ props.title }}</h4>
                
        <draggable class="h-100 bg-primary-darken-1" v-model="tasks" group="tasks" item-key="id">
            <template #header>
                <div class="mb-2">
                    <TaskForm card-title="Add task" :reset-fields="true" @submit="addTask" v-slot:default="slotProps" :is-loading="isFormLoading">
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