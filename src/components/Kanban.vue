<script setup lang="ts">
import TaskColumn from './TaskColumn.vue';

</script>

<template>
    <v-container>
        <v-row>
           <TaskColumn title="Backlog"></TaskColumn>

           <TaskColumn title="Doing"></TaskColumn>

           <TaskColumn title="Review"></TaskColumn>

           <TaskColumn title="Done"></TaskColumn>
        </v-row>
    </v-container>
</template>