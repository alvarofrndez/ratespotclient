<script setup>
    import { defineProps } from 'vue'
    import { spotStore } from '@/stores/spot'
    import { userStore } from '@/stores/user'

    const spot_s = spotStore()
    const user_s = userStore()

    const { spot } = defineProps(['spot'])
</script>

<template>
    <table v-if='spot.rates.length > 0'>
        <tbody>
            <tr>
                <th v-for="rate in spot.rates" :key="rate.id">
                    {{ rate.user.username }}
                </th>
            </tr>
            <tr>
                <td v-for="rate in spot.rates" :key="rate.id">
                    {{ rate.rate }}
                </td>
            </tr>
        </tbody>
    </table>
    <div v-else>
        <p>Lugar sin puntuaciones</p>
    </div>
</template>

<style scoped lang='scss'>
    @import '@/assets/style.scss';

    table{
        width: 100%;
        border-collapse: collapse;

        thead{
            background-color: $h-c-background;
        }

        th, td{
            padding: 0.5rem;
        }

        tbody td:nth-child(even), tbody th:nth-child(odd){
            background-color: $h-c-border;
        }
    }

    div{
        // size
        width: 100%;

        // display
        @include flex();

        p{
            // decoration
            font-size: $h-f-text !important;
            color: $h-c-secondary !important;
        }
    }
</style>