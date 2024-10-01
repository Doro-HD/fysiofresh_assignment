<script setup lang="ts">
    import { type Card } from '@/types/kanban';
    import { cardStore } from '@/state/cards';

    const props = defineProps<{
        title: string;
    }>();

    const columnId = crypto.randomUUID();

    const cards = cardStore.cards.filter(card => card.columnId === columnId);

    function onDrag(event: DragEvent, card: Card) {
        console.log('drag')
    }

    function onDrop(event: DragEvent, card: Card) {
    }
</script>

<template>
    <v-col class="bg-primary">
        <h4 class="text-center">{{ props.title }}</h4>

        <v-btn class="bg-secondary" prepend-icon="mdi-plus">Add card</v-btn>

        <div class="dropzone" @dragover.prevent @dragenter.prevent @drop="onDrop($event, title)">

            <div class="draggable" draggable="true" @dragstart="onDrag($event, card)"  v-for="card in cards" :key="card.title">
                <Card class="mb-2" :title="card.title" :description="card.description"></Card>
            </div>
        </div>
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