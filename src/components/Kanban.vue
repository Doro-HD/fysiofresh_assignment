<script setup lang="ts">
import { ref } from 'vue';
import TaskColumn from './TaskColumn.vue';
import { Column } from '@/types/kanban';
import { columnStore } from '@/state/tasks';

const loadingTasks = ref(true);

// simulates fetch call
const simulator = setTimeout(fetchTasks, 3000);

function fetchTasks() {
    try {
        // do fetch call
        const serverData: Column[] = [
            { id: crypto.randomUUID(), name:'Backlog', order: 0, tasks: [
                { id: crypto.randomUUID(), title: 'Add tests', description: 'using vitest, add tests to the project' },
                { id: crypto.randomUUID(), title: 'User generated columns', description: 'Allow for the user to create their own columns' }
            ]},
            { id: crypto.randomUUID(), name: 'Doing', order: 1, tasks: [] },
            { id: crypto.randomUUID(), name: 'Review', order: 2, tasks: [] },
            { id: crypto.randomUUID(), name: 'Done', order: 3, tasks: [
                { id: crypto.randomUUID(), title: 'Kanban board', description: 'Create a functional Kanban board with draggable card components' },
            ] },
        ];
        columnStore.addColumnBulk(serverData);

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
                <TaskColumn v-for="column in columnStore.columns" :key="column.id" :id="column.id" :name="column.name" :tasks="column.tasks"></TaskColumn>
            </v-row>
        </v-skeleton-loader>
    </v-container>
</template>

<style scoped>
    .kanban {
        min-height: 90%;
    }
</style>