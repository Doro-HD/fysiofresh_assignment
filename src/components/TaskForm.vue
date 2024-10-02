<script setup lang="ts">
    import { ref, Ref } from 'vue';

    const { initTitle = '', initDescription = '', cardTitle, resetFields, isLoading } = defineProps<{
        initTitle?: string;
        initDescription?: string;
        cardTitle: string
        resetFields: boolean;
        isLoading: boolean
    }>();

    const emit = defineEmits<{
        (event: 'submit', id: string, title: string, description: string, isDialogActive: Ref<boolean, boolean>): void
    }>();

    const title = ref(initTitle);
    const description = ref(initDescription);

    function submit(isDialogActive: Ref<boolean, boolean>) {
        const id = crypto.randomUUID();
        emit('submit', id, title.value, description.value, isDialogActive);

        if (resetFields) {
            title.value = '';
            description.value = '';
        }
    }
</script>

<template>
    <v-dialog persistent max-width="500">
        <template v-slot:activator="{ props: activatorProps }">
            <slot :activationProps="activatorProps"></slot>
        </template>

        <template v-slot:default="{ isActive }">
            <v-card :loading="isLoading">
                <v-card-title>{{ cardTitle }}</v-card-title>

                <v-card-item>
                    <v-form id="task-form" @submit.prevent="submit(isActive)">
                        <v-text-field v-model="title" label="Task title"></v-text-field>
                        <v-textarea v-model="description" label="Task description"></v-textarea>

                    </v-form>
                </v-card-item>

                <v-card-actions>
                    <v-btn form="task-form" type="submit" color="success">Save</v-btn>
                    <v-btn color="error" @click="isActive.value = false">cancel</v-btn>
                </v-card-actions>
            </v-card>
        </template>
    </v-dialog>
</template>