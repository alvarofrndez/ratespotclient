import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { 
    HiSolidHome,
    MdLocationonSharp,
    FaUser,
    CoReload,
    MdBookmarkaddOutlined,
    HiStar,
    MdBookmarkaddedRound,
    MdDelete,
    IoExitOutline,
    IoChevronBackOutline,
    MdEditRound,
    IoAddCircle,
} from 'oh-vue-icons/icons'

addIcons(
    HiSolidHome,
    MdLocationonSharp,
    FaUser,
    CoReload,
    MdBookmarkaddOutlined,
    HiStar,
    MdBookmarkaddedRound,
    MdDelete,
    IoExitOutline,
    IoChevronBackOutline,
    MdEditRound,
    IoAddCircle,
)

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component('icon', OhVueIcon)

app.mount('#app')
