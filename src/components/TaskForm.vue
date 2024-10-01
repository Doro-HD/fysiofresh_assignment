<script setup lang="ts">
    import { ref, Ref } from 'vue';

    const emit = defineEmits<{
        (event: 'submit', id: string, title: string, description: string): void
    }>();

    let title = ref('');
    let description = ref('');

    function submit(isDialogActive: Ref<boolean, boolean>) {
        const id = crypto.randomUUID();
        emit('submit', id, title.value, description.value);

        title.value = '';
        description.value = '';

        isDialogActive.value = false;
    }
</script>

<template>
    <v-dialog>
        <template v-slot:activator="{ props: activatorProps }">
            <v-btn
                v-bind="activatorProps"
                block
                color="secondary"
                prepend-icon="mdi-plus"
            >Add</v-btn>
        </template>

        <template v-slot:default="{ isActive }">
            <v-card>
                <v-card-title>Add Card</v-card-title>

                <v-card-item>
                    <v-form @submit.prevent @submit="submit(isActive)">
                        <v-text-field v-model="title" label="Task title"></v-text-field>
                        <v-text-field v-model="description" label="Task description"></v-text-field>

                        <v-btn type="submit" color="success">Add</v-btn>
                    </v-form>
                </v-card-item>

                <v-card-actions>
                    <v-btn color="error" @click="isActive.value = false">Close</v-btn>
                </v-card-actions>
            </v-card>
        </template>
    </v-dialog>
</template>