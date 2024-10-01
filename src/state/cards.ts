import { reactive } from 'vue'
import { type Card } from '@/types/kanban'

export const cardStore = reactive<{ cards: Card[]}>({
    cards: []
})