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
    RiLoginCircleFill,
    IoCopy,
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
    RiLoginCircleFill,
    IoCopy,
)

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component('icon', OhVueIcon)

app.mount('#app')
