<script setup lang="ts">
import { ref } from 'vue';
import TaskColumn from './TaskColumn.vue';
import { Task } from '@/types/kanban';
import { taskStore } from '@/state/tasks';

const loadingTasks = ref(true);

// simulates fetch call
const simulator = setTimeout(fetchTasks, 3000);

function fetchTasks() {
    try {
        // do fetch call
        const serverTasks: Task[] = [
            { id: crypto.randomUUID(), title: 'Allow for user generated columns', description: 'Let the user create their own columns', status: 'backlog' },
            { id: crypto.randomUUID(), title: 'Testing', description: 'Create tests using vitest', status: 'backlog' },
            { id: crypto.randomUUID(), title: 'Allow for deleting and editing of the tasks', description: 'Let the user delete and edit task at their own leisure', status: 'done' },
            { id: crypto.randomUUID(), title: 'Create Kanban board', description: 'Make a kanban board with draggable card components, each card should have a title and description', status: 'done' }
        ];
        taskStore.addBulk(serverTasks);

        loadingTasks.value = false;
    } catch (err) {
        // handle error
    }

    clearTimeout(simulator);
}

</script>

<template>
    <v-container class="kanban bg-surface">
        <v-skeleton-loader color="primary" type="table-row" :loading="loadingTasks">
            <v-row>
                <TaskColumn title="Backlog" column-status="backlog"></TaskColumn>

                <TaskColumn title="Doing" column-status="doing"></TaskColumn>

                <TaskColumn title="Review" column-status="review"></TaskColumn>

                <TaskColumn title="Done" column-status="done"></TaskColumn>
            </v-row>
        </v-skeleton-loader>
    </v-container>
</template>

<style scoped>
    .kanban {
        min-height: 90%;
    }
</style>