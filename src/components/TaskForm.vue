<script setup lang="ts">
    import { ref, Ref } from 'vue';

    const { initTitle = '', initDescription = '', cardTitle, resetFields, onSubmit } = defineProps<{
        cardTitle: string;
        initTitle?: string;
        initDescription?: string;
        resetFields: boolean;
        onSubmit: (title: string, description: string) => Promise<void>;
    }>();

    const title = ref(initTitle);
    const description = ref(initDescription);
    const isLoading = ref(false);

    async function submit(isDialogActive: Ref<boolean, boolean>) {
        isLoading.value = true;

        await onSubmit(title.value, description.value);
        console.log('hello from form')

        if (resetFields) {
            title.value = '';
            description.value = '';
        }

        isLoading.value = false;
        isDialogActive.value = false;
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
                    <v-btn form="task-form" type="submit" color="success" :disabled="isLoading">Save</v-btn>
                    <v-btn color="error" @click="isActive.value = false" :disabled="isLoading">cancel</v-btn>
                </v-card-actions>
            </v-card>
        </template>
    </v-dialog>
</template>